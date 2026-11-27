
@echo off

echo Starting FastAPI and React development servers...

wt.exe new-tab --title "FastAPI Server" -d "%~dp0fast-api" cmd /k "call venv\Scripts\activate.bat && uvicorn main:app --reload" ; new-tab --title "React Server" -d "%~dp0react-app" cmd /k "npm run dev"

echo Both development servers launched!
