from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field

app = FastAPI()

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

BOOKS = [
    {
        "id": 1,
        "name": "Harry Potter",
        "description": "A fantasy book",
        "author": "J.K. Rowling",
        "price": 400,
        "type": "Fantasy"
    },
    {
        "id": 2,
        "name": "The Hobbit",
        "description": "An adventure fantasy novel",
        "author": "J.R.R. Tolkien",
        "price": 350,
        "type": "Fantasy"
    },
    {
        "id": 3,
        "name": "Atomic Habits",
        "description": "A self-help book about building good habits",
        "author": "James Clear",
        "price": 500,
        "type": "Self-Help"
    },
    {
        "id": 4,
        "name": "The Alchemist",
        "description": "A philosophical novel about following your dreams",
        "author": "Paulo Coelho",
        "price": 400,
        "type": "Fiction"
    },
    {
        "id": 5,
        "name": "Rich Dad Poor Dad",
        "description": "A personal finance and investment book",
        "author": "Robert T. Kiyosaki",
        "price": 450,
        "type": "Finance"
    }
]

class Book(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: int
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
    return BOOKS

@app.post('/create-book')
async def create_book(request_data: Book):
    BOOKS.append(request_data)
    return {
        "message": "New Book Added Successfuly!",
        "newBook": request_data
    }

@app.delete('/delete/{book_id}')
async def delete_book(book_id: int):
    for book in BOOKS:
        if book["id"] == book_id:
            BOOKS.remove(book)
            break
    return {
        "message": "Successfully removed book!"
    }

@app.put('/edit')
async def update_book(request_data: Book):
    for index in range(0, len(BOOKS)):
        if BOOKS[index]["id"] == request_data.id:
            BOOKS[index] = request_data
            break
    return {
        "message": "Successfully updated book!"
    }

@app.get('/book/')
async def get_book_by_type(type: str):
    bucket  = []
    for book in BOOKS:
        if (book["type"] == type):
            bucket.append(book)

    return bucket


