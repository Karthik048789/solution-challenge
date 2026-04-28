@echo off
setlocal
cd /d "%~dp0"

echo [1/3] Setting up Backend...
if not exist "backend\.venv" (
    echo Creating virtual environment...
    python -m venv backend\.venv
)

echo Activating virtual environment and installing dependencies...
call backend\.venv\Scripts\activate
pip install -r backend\requirements.txt

echo [2/3] Setting up Frontend...
cd frontend
if not exist "node_modules" (
    echo Installing npm dependencies...
    call npm install
)
cd ..

echo [3/3] Launching Project...
echo Starting Backend in a new window...
start cmd /k "cd backend && .venv\Scripts\activate && uvicorn app.main:app --reload"

echo Starting Frontend in a new window...
start cmd /k "cd frontend && npm run dev"

echo.
echo ======================================================
echo BiasX-Ray is starting!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo ======================================================
pause
