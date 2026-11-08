# FastAPI – Learning & Practical Examples

A practical repository to learn **FastAPI** from fundamentals to advanced backend development using Python.

This repository contains hands-on examples, code snippets, mini-projects, and practical exercises to understand FastAPI and modern REST API development.

## 🎯 Learning Objectives

- Understand FastAPI fundamentals and architecture.
- Build REST APIs using Python and FastAPI.
- Learn request handling, routing, and HTTP methods.
- Implement request validation using Pydantic.
- Work with path parameters, query parameters, and request bodies.
- Handle errors and exceptions.
- Integrate databases with FastAPI.
- Implement authentication and authorization.
- Understand middleware and dependency injection.
- Write unit and integration tests.
- Learn API documentation using Swagger and ReDoc.
- Understand production deployment.

## 🛠️ Tech Stack

- **Language:** Python
- **Framework:** FastAPI
- **Validation:** Pydantic
- **ASGI Server:** Uvicorn
- **Database:** SQLite, PostgreSQL
- **ORM:** SQLAlchemy
- **Authentication:** JWT, OAuth2
- **Testing:** Pytest
- **API Documentation:** Swagger UI, ReDoc
- **Package Management:** pip / uv

## 📚 Learning Roadmap

### 01. Python Fundamentals

- Python variables and data types
- Lists, tuples, sets, and dictionaries
- Functions and modules
- Classes and objects
- Exception handling
- File handling
- Type hints
- Async and await

### 02. FastAPI Fundamentals

- What is FastAPI?
- FastAPI vs Flask vs Django
- Creating your first FastAPI application
- Running applications with Uvicorn
- Understanding ASGI
- Automatic API documentation
- Project structure

### 03. Routing & HTTP Methods

- GET requests
- POST requests
- PUT requests
- PATCH requests
- DELETE requests
- Route parameters
- Query parameters
- Multiple endpoints
- HTTP status codes

### 04. Request & Response Handling

- Request body
- Path parameters
- Query parameters
- Headers and cookies
- Response models
- Response status codes
- Custom responses
- JSON responses

### 05. Pydantic & Data Validation

- Pydantic BaseModel
- Field validation
- Required and optional fields
- Default values
- Email validation
- Regex validation
- Nested models
- Custom validators
- Serialization

### 06. Dependency Injection

- Understanding Depends()
- Reusable dependencies
- Database dependencies
- Authentication dependencies
- Dependency scopes
- Dependency overrides

### 07. Database Integration

- SQLite integration
- PostgreSQL integration
- SQLAlchemy ORM
- Database models
- CRUD operations
- Relationships
- Database migrations using Alembic
- Connection management

### 08. Authentication & Authorization

- Password hashing
- JWT authentication
- OAuth2 password flow
- Access tokens
- Refresh tokens
- Role-based authorization
- Protected routes

### 09. Advanced FastAPI

- Middleware
- CORS configuration
- Exception handlers
- Background tasks
- File uploads
- Static files
- WebSockets
- Async database operations
- Lifespan events
- API versioning

### 10. Testing

- Introduction to Pytest
- Testing API endpoints
- TestClient
- Unit testing
- Integration testing
- Mocking dependencies
- Testing authentication

### 11. Production & Deployment

- Environment variables
- Configuration management
- Logging
- Error handling
- Docker integration
- Production server configuration
- Reverse proxy with Nginx
- API security
- Deployment best practices

## 📂 Repository Structure

```text
fast-api/
│
├── 01-python-fundamentals/
│
├── 02-fastapi-fundamentals/
│
├── 03-routing-http-methods/
│
├── 04-request-response/
│
├── 05-pydantic-validation/
│
├── 06-dependency-injection/
│
├── 07-database-integration/
│
├── 08-authentication-authorization/
│
├── 09-advanced-fastapi/
│
├── 10-testing/
│
├── 11-production-deployment/
│
├── projects/
│
├── exercises/
│
└── README.md
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd fast-api
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
```

Activate the environment:

**Windows:**

```bash
venv\Scripts\activate
```

**Linux / macOS:**

```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install fastapi uvicorn
```

### 4. Create Your First Application

Create `main.py`:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello, FastAPI!"}
```

### 5. Run the Application

```bash
uvicorn main:app --reload
```

Open your browser:

- Application: http://127.0.0.1:8000
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## 💡 Practical Projects

The repository will gradually include the following projects:

1. **Todo API** – Basic CRUD operations.
2. **User Management API** – Pydantic validation and user operations.
3. **Authentication API** – JWT-based authentication.
4. **Blog API** – Database relationships and CRUD.
5. **E-commerce API** – Products, categories, orders, and users.
6. **File Upload API** – Upload and manage files.
7. **Background Task API** – Asynchronous background processing.

## 📖 Learning Approach

Each topic will include:

- Concept explanation
- Practical code examples
- Expected output
- API testing examples
- Common mistakes and solutions
- Hands-on exercises

## 🎯 Goal

The ultimate goal of this repository is to gain practical knowledge of FastAPI and become confident in building scalable, maintainable, secure, and production-ready backend applications using Python.

**Learn by building. Practice by coding. Improve by solving problems.**
