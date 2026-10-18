@echo off
title Helpniche Landing Page Local Server
echo ======================================================
echo   Helpniche Landing Page Local Server
echo   Running at: http://localhost:5000
echo ======================================================
echo Press Ctrl+C to stop the server anytime.
echo.
python -m http.server 5000
pause
