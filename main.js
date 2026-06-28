import { characters } from './data.js';

let currentView = 'hero'; // 'hero' hoặc 'skin'
let selectedHero = characters[0];

// Render danh sách (Tướng hoặc Trang phục)
function renderList() {
    const list = document.querySelector('.col-left');
    list.innerHTML = currentView === 'hero' 
        ? characters.map(h => `<div class="item ${selectedHero.id === h.id ? 'active' : ''}">${h.name}</div>`).join('')
        : selectedHero.skins.map(s => `<div class="item">${s}</div>`).join('');
}

// Xử lý click
document.querySelector('.col-left').addEventListener('click', (e) => {
    if (!e.target.classList.contains('item')) return;
    // Update logic: Chọn tướng hoặc chọn skin tại đây
    renderUI();
});
