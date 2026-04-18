// Sistem Saati
function updateClock() {
    const time = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('clock').textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

// Başlat Menüsü Toggle
const startBtn = document.querySelector('.start-btn');
const startMenu = document.getElementById('start-menu');

startBtn.onclick = (e) => {
    e.stopPropagation();
    startMenu.classList.toggle('show');
};

document.body.onclick = () => startMenu.classList.remove('show');

// Pencere Oluşturma Sistemi
let zIndexCount = 100;

function createWindow(title) {
    const win = document.createElement('div');
    win.className = 'window';
    win.style.top = '100px';
    win.style.left = '100px';
    win.style.zIndex = ++zIndexCount;

    win.innerHTML = `
        <div class="win-titlebar">
            <span>${title}</span>
            <div class="win-controls">
                <div class="min">_</div>
                <div class="max">▢</div>
                <div class="close" onclick="this.closest('.window').remove()">✕</div>
            </div>
        </div>
        <div class="win-content" style="padding:20px;">
            <h3>Klasör Boş</h3>
            <p>Bu simülasyon gerçek dosya sistemine erişemez.</p>
        </div>
    `;

    document.getElementById('desktop').appendChild(win);
    makeDraggable(win);
}

// Sürükleme Fonksiyonu (Daha Smooth)
function makeDraggable(el) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = el.querySelector('.win-titlebar');
    
    header.onmousedown = (e) => {
        zIndexCount++;
        el.style.zIndex = zIndexCount;
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
            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
        };
    };
}

// Masaüstü simgesine tıklandığında pencere aç
document.querySelector('[data-app="pc"]').ondblclick = () => createWindow('Bu Bilgisayar');
