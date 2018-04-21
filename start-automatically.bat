git pull
call npm install -g serve
start serve .\client\build\ -p=3000
timeout /t 15
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" http://localhost:3000 --kiosk