@echo off
if not "%1"=="am_admin" (
    powershell -Command "Start-Process -Verb RunAs -FilePath '%0' -ArgumentList 'am_admin'"
    exit /b
) 

xcopy "..\dist\Shaitan DELAY.vst3" "C:\Program Files\Common Files\VST3\Shaitan DELAY.vst3" /E /H /C /I
pause