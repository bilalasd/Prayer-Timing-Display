git pull
call npm install -g serve
start /min serve .\client\build\ -p=3000
cd ./server/
call npm install
cd ..
start /min node .\server\index.js
timeout /t 15
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" http://localhost:3000 --kiosk