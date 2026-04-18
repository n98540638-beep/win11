// Saat Güncelleme
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerHTML = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

// Başlat Menüsü Aç/Kapat
const startBtn = document.querySelector('.start-btn');
const startMenu = document.getElementById('start-menu');

startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    startMenu.classList.toggle('show');
});

document.addEventListener('click', () => startMenu.classList.remove('show'));
startMenu.addEventListener('click', (e) => e.stopPropagation());

// Pencere Oluşturma
function createWindow(title) {
    const win = document.createElement('div');
    win.className = 'window';
    win.style.top = '100px';
    win.style.left = '200px';
    
    win.innerHTML = `
        <div class="win-header">
            <span>${title}</span>
            <div class="close-btn" onclick="this.parentElement.parentElement.remove()">✕</div>
        </div>
        <div style="padding: 20px;">
            <p>Windows 11 Simülasyonuna Hoş Geldiniz.</p>
            <p>Bu bir eğitim ve şaka projesidir.</p>
        </div>
    `;
    
    document.getElementById('desktop').appendChild(win);
    dragElement(win);
}

// Sürükleme Fonksiyonu
function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = elmnt.querySelector('.win-header');
    header.onmousedown = (e) => {
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };
        document.onmousemove = (e) => {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        };
    };
}
