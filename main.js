import { allCharacters } from './characters/index.js';

const renderStats = (stats) => {
    const container = document.getElementById('statsContainer');
    container.innerHTML = Object.entries(stats).map(([key, val]) => `
        <label>${key.toUpperCase()}</label>
        <div class="stat-bar"><div class="progress" style="width:${val}%"></div></div>
    `).join('');
};

const updateUI = (char) => {
    document.getElementById('charName').innerText = char.name;
    document.getElementById('charLevel').innerText = char.level;
    renderStats(char.baseStats);
    
    // Cập nhật dropdown skin
    const skinSelect = document.getElementById('skinSelect');
    skinSelect.innerHTML = char.skins.map(s => `<option>${s}</option>`).join('');
};

// Khởi tạo
const init = () => {
    const list = document.getElementById('charList');
    Object.values(allCharacters).forEach(char => {
        const div = document.createElement('div');
        div.className = 'char-card';
        div.innerHTML = `${char.name} <span class="check"></span>`;
        div.onclick = () => updateUI(char);
        list.appendChild(div);
    });
};

init();
