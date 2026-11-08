from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Todo(BaseModel):
    name: str
    description: str

@app.get("/")
async def read_root():
    return {"message": "This is todo app"}

@app.post("/add-todo")
async def create_todo(request_data: Todo):
    print("API request name: ", request_data.name)
    print("API request description: ", request_data.description)
    # now we are getting name and description 
    return {
        "msg": "Server succesfully got post request data!",
        "data": {
            "name": request_data.name,
            "description": request_data.description
        }
    }

