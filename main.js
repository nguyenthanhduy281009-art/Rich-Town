// File: main.js
import { characters } from './data.js';

let selectedHero = characters[0]; // Mặc định chọn tướng đầu tiên

// 1. Hàm render danh sách tướng bên trái
function renderHeroList() {
    const listContainer = document.querySelector('.hero-list-container');
    listContainer.innerHTML = characters.map(hero => `
        <div class="hero-item ${selectedHero.id === hero.id ? 'active' : ''}" data-id="${hero.id}">
            ${hero.name}
        </div>
    `).join('');
}

// 2. Hàm cập nhật thông tin cột giữa và phải
function updateDetails() {
    // Cập nhật tên và level
    document.querySelector('.hero-name').innerText = selectedHero.name;
    document.querySelector('.hero-level').innerText = `LEVEL ${selectedHero.level}`;
    
    // Nút nâng cấp: Disable nếu level max
    const btnUpgrade = document.querySelector('.btn-upgrade');
    btnUpgrade.disabled = (selectedHero.level >= selectedHero.maxLevel);

    // Cập nhật thanh chỉ số (Ví dụ HP)
    document.querySelector('.hp-bar').style.width = `${selectedHero.hp}%`;
    
    renderHeroList(); // Render lại để cập nhật class 'active'
}

// 3. Lắng nghe sự kiện click
document.querySelector('.hero-list-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('hero-item')) {
        const id = e.target.getAttribute('data-id');
        selectedHero = characters.find(h => h.id === id);
        updateDetails();
    }
});

// Chạy lần đầu
renderHeroList();
updateDetails();
