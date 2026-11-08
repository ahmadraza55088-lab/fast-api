from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get('/get-user')
async def get_user_root():
    return [
        {
            "name": "Ahmad Raza",
            "address": "Sambhal",
            "Id": 1
        },
        {
            "name": "Faizan Khan",
            "address": "Lehra Kamangar",
            "Id": 2
        }
    ]

# This post end-point cant be access via browser direct url
# Becuase in browser always making get request in URL
# This post end point is for just explaning post route in future we will get data from request
@app.post('/create-user')
async def create_user_root():
    return {
        "message": "User created successfully!"
    }