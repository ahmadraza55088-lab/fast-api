from fastapi import FastAPI, Body

app = FastAPI()

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


@app.get("/")
async def read_root():
    return {"message": "This is todo app"}


@app.get('/books')
async def get_books():
    return BOOKS

@app.post('/create-book')
async def create_book(request_data = Body()):
    if not isinstance(request_data, dict):
        return {
            "error": "Data is not valid"
        }

    # validate key data as per our book schema

    BOOKS.append(request_data)
    return {
        "message": "New Book Added Successfuly!",
        "newBook": request_data
    }

@app.delete('/delete/{book_id}')
async def delete_book(book_id):
    b_id = int(book_id)
    if not isinstance(b_id, int):
        return {
            "error": "Book id is not a valid id!"
        }

    for book in BOOKS:
        if book["id"] == b_id:
            BOOKS.remove(book)
            break
    return {
        "message": "Successfully removed book!"
    }

@app.put('/edit')
async def update_book(request_data = Body()):

    if not isinstance(request_data, dict):
        return {
            "error": "Data is not valid"
        }

    for index in range(0, len(BOOKS)):
        print(index)
        print(BOOKS[index]["id"])
        if BOOKS[index]["id"] == request_data["id"]:
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


