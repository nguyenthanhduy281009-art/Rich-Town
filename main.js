// 1. Dữ liệu nhân vật
const allCharacters = {
    hunter: { id: 'hunter', name: 'Hunter', desc: 'Tốc độ cực cao', rarity: 'rare', pattern: 'stripes', stats: { HP: 60, Speed: 90, Stamina: 70 } },
    tank: { id: 'tank', name: 'Tanker', desc: 'Phòng thủ trâu bò', rarity: 'epic', pattern: 'dots', stats: { HP: 100, Speed: 40, Stamina: 80 } },
    scout: { id: 'scout', name: 'Scout', desc: 'Tầm nhìn rộng', rarity: 'common', pattern: 'bolt', stats: { HP: 50, Speed: 80, Stamina: 90 } }
};

// 2. Mock dữ liệu sở hữu (Giả lập từ Database)
const ownedIds = ['hunter', 'tank']; 

// 3. Render logic
function renderList() {
    const listEl = document.getElementById('charList');
    ownedIds.forEach(id => {
        const char = allCharacters[id];
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h4>${char.name}</h4><p>${char.rarity}</p>`;
        card.onclick = () => selectChar(char);
        listEl.appendChild(card);
    });
}

function selectChar(char) {
    document.getElementById('charName').innerText = char.name;
    document.getElementById('charDesc').innerText = char.desc;
    
    // Set pattern
    const patternEl = document.getElementById('avatarPattern');
    patternEl.className = 'pattern-overlay pattern-' + char.pattern;
    
    // Render Stats
    const statsEl = document.getElementById('statsContainer');
    statsEl.innerHTML = Object.entries(char.stats).map(([k, v]) => `
        <div class="stat-row">
            <div>${k}</div>
            <div class="progress-bg"><div class="progress-fill" style="width: ${v}%"></div></div>
        </div>
    `).join('');
}

// Chạy khi khởi động
window.onload = () => {
    renderList();
    selectChar(allCharacters[ownedIds[0]]); // Chọn mặc định
};
