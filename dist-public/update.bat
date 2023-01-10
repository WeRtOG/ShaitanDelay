@echo off

:: BatchGotAdmin
:-------------------------------------
REM  --> Check for permissions
    IF "%PROCESSOR_ARCHITECTURE%" EQU "amd64" (
>nul 2>&1 "%SYSTEMROOT%\SysWOW64\cacls.exe" "%SYSTEMROOT%\SysWOW64\config\system"
) ELSE (
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
)

REM --> If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    %SystemRoot%\system32\WindowsPowerShell\v1.0\powershell.exe -Command "Start-Process -Verb RunAs -FilePath '%0' -ArgumentList 'am_admin'"
    exit /b

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"
:--------------------------------------    
CD /D "%~dp0"
RMDIR /S /Q "C:\Program Files\Common Files\VST3\Shaitan DELAY.vst3"
%SystemRoot%\System32\xcopy.exe "Shaitan DELAY.vst3" "C:\Program Files\Common Files\VST3\Shaitan DELAY.vst3" /E /H /C /I