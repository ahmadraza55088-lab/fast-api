from fastapi import FastAPI, HTTPException, Path, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field

import sqlite3
from contextlib import contextmanager, asynccontextmanager

# 1. Database connection manager
@contextmanager
def get_db_connection():
    conn = sqlite3.connect("library.db")
    conn.row_factory = sqlite3.Row

    try:
        yield conn
    finally:
        conn.close()

# 2. Create table
def create_tables():
    with get_db_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS books (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    description TEXT,
                    author TEXT NOT NULL,
                    price REAL NOT NULL,
                    type TEXT NOT NULL
                )
            """)

# Fixed Lifespan Handler
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Runs on startup
    create_tables()
    yield
    # Runs on shutdown (optional cleanup goes here)


# Pass lifespan into FastAPI()
app = FastAPI(lifespan=lifespan)


origins = [
    "http://localhost:5173",  # React Vite
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Book(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str = Field(min_length=3, max_length=50)
    description: str = Field(min_length=5, max_length=500)
    author: str = Field(min_length=3, max_length=50)
    price: int = Field(gt=0, le=100000)
    type: str = Field(min_length=3, max_length=30)


@app.get("/")
async def read_root():
    return {"message": "This is todo app"}

@app.get('/books')
async def get_books():
    with get_db_connection() as conn:
        res = conn.execute("SELECT * FROM books")
        rows = res.fetchall()

    # Convert sqlite3.Row objects into standard Python dicts so FastAPI can return JSON
    books = [dict(row) for row in rows]
    return books

@app.post('/create-book')
async def create_book(request_data: Book):
    with get_db_connection() as conn:
            cursor = conn.execute(
                """
                INSERT INTO books(name, description, author, price, type)
                VALUES(?, ?, ?, ?, ?)
                """,
                (
                    request_data.name,
                    request_data.description,
                    request_data.author,
                    request_data.price,
                    request_data.type,
                ),
            )
            conn.commit()

    return {
        "message": "New Book Added Successfuly!"
    }


# Need to convert into Sqlite
@app.delete('/delete/{book_id}')
async def delete_book(book_id: int = Path(gt=0)):
    with get_db_connection() as conn:
        cursor = conn.execute(
            "DELETE FROM books WHERE id = ?",
            (book_id,)
        )
        conn.commit()

        if cursor.rowcount == 0:
            raise HTTPException(
                status_code=404,
                detail="Book not found!"
            )
    
    return {
        "status_code": 200,
        "message": "Successfully removed book!"
    }

@app.put('/update/{book_id}')
async def update_book(request_data: Book, book_id: int = Path(gt=0)):
    with get_db_connection() as conn:
        cursor = conn.execute(
            "UPDATE books SET name = ?, description = ?, author = ?, price = ?, type = ? WHERE id = ?",
            (
                request_data.name,
                request_data.description,
                request_data.author,
                request_data.price,
                request_data.type,
                book_id,
            ),
        )

        conn.commit()
    
    if cursor.rowcount == 0:
        raise HTTPException(
            status_code=404,
            detail="Book not found!"
        )
        
    return {
        "message": "Successfully updated book!"
    }

@app.get('/book/')
async def search(q: str = Query(min_length=3)):
    search = f"%{q}%"
    with get_db_connection() as conn:
        res = conn.execute(
            """
                SELECT * FROM books WHERE
                type LIKE ? OR
                name LIKE ? OR
                author LIKE ?
            """,
            (
                search,
                search,
                search,
            ))
        rows = res.fetchall()
        books = [dict(row) for row in rows]
        if len(books):
            return books
        else:
            return {
                "message": f"{q} No results found!",
                "keyword": q
            }

@app.get('/book/{book_id}')
async def get_book_by_id(book_id: int = Path(gt=0)):

    with get_db_connection() as conn:
        res = conn.execute("SELECT * FROM books WHERE id = ?",(book_id,))
        row = res.fetchone()

        if row is None:
            raise HTTPException(
                status_code=404,
                detail=f"Book with ID {book_id} not found!"
            )
        
        return dict(row)

