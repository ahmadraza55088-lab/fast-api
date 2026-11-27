@echo off

echo Starting FastAPI and React development servers...

:: Start FastAPI
start "FastAPI Server" cmd /k "cd /d %~dp0fast-api && call env\Scripts\activate.bat && uvicorn main:app --reload"

:: Start React
start "React Server" cmd /k "cd /d %~dp0react-app && npm run dev"

echo Both development servers launched!