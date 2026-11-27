# React + FastAPI – Learning & Practical Examples

A practical monorepo for learning and building full-stack applications using **React** on the frontend and **FastAPI** on the backend.

The repository keeps both applications in one root directory:

- `react-app/` – React frontend
- `fast-api/` – FastAPI backend

This guide covers the complete setup process, including creating a Python virtual environment, exporting dependencies to `requirements.txt`, setting up the project on another PC, installing React dependencies, and running both applications.

---

## 📂 Project Structure

```text
react-fastapi/
│
├── fast-api/
│   ├── .vscode/
│   ├── backup/
│   ├── venv/                  # Python virtual environment (do not commit)
│   ├── __pycache__/            # Python cache (do not commit)
│   ├── library.db              # SQLite database
│   ├── main.py                 # FastAPI application entry point
│   ├── requirements.txt        # Python dependencies
│   └── README.md               # Backend learning notes (if maintained separately)
│
├── react-app/
│   ├── node_modules/           # Installed npm packages (do not commit)
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── index.html
│
├── start.bat                   # Optional root-level startup script
├── start2.bat                  # Optional root-level startup script
└── README.md                   # This file
```

> The `venv/` and `node_modules/` folders are generated locally. They should not be copied between PCs or committed to Git. Recreate them by following this README.

---

# 1. Prerequisites

Install these tools on your PC:

- **Python 3** – https://www.python.org/downloads/
- **Node.js (LTS)** – https://nodejs.org/
- **npm** – included with Node.js
- **Git** – https://git-scm.com/downloads (if cloning the repository)

Verify the installations:

```bash
python --version
pip --version
node --version
npm --version
```

On some Windows installations, use `py` instead of `python`.

# 2. FastAPI Backend Setup

All backend commands in this section should be run from the `fast-api/` directory.

## 2.1 Move to the backend directory

From the repository root:

```bash
cd fast-api
```

## 2.2 Create a virtual environment

Create the environment only if it does not already exist:

```bash
python -m venv venv
```

This creates the `venv/` directory inside `fast-api/`.

## 2.3 Activate the virtual environment

**Windows CMD:**

```cmd
venv\Scripts\activate.bat
```

**Windows PowerShell:**

```powershell
.\venv\Scripts\Activate.ps1
```

**Linux / macOS:**

```bash
source venv/bin/activate
```

After successful activation, the terminal prompt normally starts with `(venv)`.

To leave the environment:

```bash
deactivate
```

> Activate the virtual environment whenever you open a new terminal for backend work.

## 2.4 Install backend packages

With the virtual environment activated, install packages as needed. For example:

```bash
python -m pip install --upgrade pip
python -m pip install fastapi "uvicorn[standard]"
```

Install any other packages your backend code uses in the same activated environment.

## 2.5 Generate or update `requirements.txt`

Whenever you install, remove, or upgrade backend packages and want to capture the environment's installed packages, run this command from `fast-api/` with the virtual environment activated:

```bash
python -m pip freeze > requirements.txt
```

This writes the installed Python package versions to `requirements.txt`.

Example:

```text
fastapi==...
uvicorn==...
pydantic==...
```

The exact entries and versions depend on the packages installed in your environment.

To view the file:

```bash
type requirements.txt
```

PowerShell also supports:

```powershell
Get-Content requirements.txt
```

> Run `pip freeze` from the correct activated virtual environment. Otherwise, packages from another Python installation or environment may be captured.

## 2.6 Install dependencies from `requirements.txt`

Whenever you set up the backend on a new PC, create and activate a fresh virtual environment first, then run:

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

This installs the packages and versions listed in `requirements.txt`.

## 2.7 Run FastAPI

From the `fast-api/` directory, with `venv` activated:

```bash
python -m uvicorn main:app --reload
```

Open these URLs:

- API: http://127.0.0.1:8000
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

Using `python -m uvicorn` runs Uvicorn through the active Python interpreter and avoids relying on the `uvicorn` executable being found separately on PATH.

# 3. React Frontend Setup

All frontend commands in this section should be run from the `react-app/` directory.

## 3.1 Move to the frontend directory

Open another terminal at the repository root:

```bash
cd react-app
```

## 3.2 Install dependencies

The repository contains both `package.json` and `package-lock.json`. Use:

```bash
npm ci
```

`npm ci` installs the exact dependency versions recorded in `package-lock.json`. It is recommended for a fresh setup or a new PC.

For normal development, if you intentionally change dependencies, use:

```bash
npm install
```

Commit the updated `package-lock.json` whenever dependencies change.

## 3.3 Run React

For a Vite project, run:

```bash
npm run dev
```

Vite will print the local development URL in the terminal (commonly http://localhost:5173).

To see all scripts configured by the project:

```bash
npm run
```

# 4. Setup on Another PC (Fresh Installation)

Follow these steps after cloning or copying the repository to another PC.

## Step 1: Get the project

If using Git:

```bash
git clone <repository-url>
cd react-fastapi
```

If you copied the project manually, open a terminal in the `react-fastapi/` root directory.

## Step 2: Set up FastAPI

```bash
cd fast-api
python -m venv venv
```

Activate the environment.

**CMD:**

```cmd
venv\Scripts\activate.bat
```

**PowerShell:**

```powershell
.\venv\Scripts\Activate.ps1
```

Install all backend dependencies:

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Run the backend:

```bash
python -m uvicorn main:app --reload
```

Keep this terminal running.

## Step 3: Set up React

Open a **second terminal** at the repository root, then run:

```bash
cd react-app
npm ci
npm run dev
```

Keep this terminal running.

## Step 4: Verify both applications

- Open the React URL printed by Vite.
- Open http://127.0.0.1:8000/docs to verify FastAPI.

Both applications should now be running independently.

---

# 5. Daily Development Workflow

You generally need two terminals.

**Terminal 1 – FastAPI**

```bash
cd fast-api
```

Activate the environment if it is not already active:

```cmd
venv\Scripts\activate.bat
```

Start the backend:

```bash
python -m uvicorn main:app --reload
```

**Terminal 2 – React**

```bash
cd react-app
npm run dev
```

Stop either development server with `Ctrl + C`.

# 6. Updating Dependencies

## Python backend

After installing or updating Python packages:

```bash
cd fast-api
```

Activate `venv`, then regenerate the dependency file:

```bash
python -m pip freeze > requirements.txt
```

Commit the updated `requirements.txt` so another PC can install the same package versions.

## React frontend

Install or update a package from `react-app/`, for example:

```bash
cd react-app
npm install <package-name>
```

This updates `package.json` and `package-lock.json`. Commit both files.

On another PC, run `npm ci` to install from the committed lock file.

# 7. Git Ignore Recommendations

Do not commit generated environments, installed dependencies, Python cache files, or local secrets.

Add these entries to the repository's root `.gitignore` (or the relevant folder-level `.gitignore` files):

```gitignore
# Python
**/venv/
**/.venv/
**/__pycache__/
**/*.py[cod]
**/.pytest_cache/

# Node
**/node_modules/
**/dist/

# Environment variables / secrets
**/.env
**/.env.*
!**/.env.example

# Local editor / OS files
.vscode/
.DS_Store
Thumbs.db
```

Keep `fast-api/requirements.txt`, `react-app/package.json`, and `react-app/package-lock.json` in Git. These files are required to recreate the environments on another PC.

> If `library.db` contains data you need to preserve, back it up separately. A new clone will not automatically contain an untracked local SQLite database.

# 8. Troubleshooting

### `uvicorn` is not recognized

Make sure the backend virtual environment is activated, then run:

```bash
python -m uvicorn main:app --reload
```

If Uvicorn is not installed:

```bash
python -m pip install "uvicorn[standard]"
```

### `No module named uvicorn` or another missing Python module

Confirm that the virtual environment is active and that the terminal is in `fast-api/`:

```bash
python -c "import sys; print(sys.executable)"
python -m pip install -r requirements.txt
```

The printed Python path should point to `fast-api\venv\...`.

### PowerShell does not allow environment activation

If PowerShell reports that script execution is disabled, either use CMD:

```cmd
venv\Scripts\activate.bat
```

Or use the appropriate PowerShell execution-policy setting for your machine. Do not change the machine-wide policy unnecessarily.

### `npm ci` fails

Verify that Node.js and npm are installed:

```bash
node --version
npm --version
```

Run `npm ci` from the directory containing `package.json` and `package-lock.json` (`react-app/`).

### React cannot connect to FastAPI

- Confirm FastAPI is running at http://127.0.0.1:8000.
- Confirm the frontend is using the correct backend API URL.
- Check the FastAPI CORS configuration and allow the React development origin.
- Check the browser console and Network tab for the actual request error.

---

# 9. FastAPI Learning Roadmap

## Learning Objectives

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

## Tech Stack

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

## Learning Topics

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

- GET, POST, PUT, PATCH, and DELETE
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

- Understanding `Depends()`
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

# 10. Practical Projects

The repository will gradually include:

1. **Todo API** – Basic CRUD operations.
2. **User Management API** – Pydantic validation and user operations.
3. **Authentication API** – JWT-based authentication.
4. **Blog API** – Database relationships and CRUD.
5. **E-commerce API** – Products, categories, orders, and users.
6. **File Upload API** – Upload and manage files.
7. **Background Task API** – Asynchronous background processing.

# 11. Learning Approach

Each topic will include:

- Concept explanation
- Practical code examples
- Expected output
- API testing examples
- Common mistakes and solutions
- Hands-on exercises

## Goal

Gain practical knowledge of React and FastAPI and become confident in building maintainable, secure, and production-ready full-stack applications.

**Learn by building. Practice by coding. Improve by solving problems.**
