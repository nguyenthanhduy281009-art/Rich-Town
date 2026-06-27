import { allCharacters } from './characters/index.js';

function updateUI(char) {
    // 1. Update Preview (Nhân vật)
    const head = document.querySelector('.head');
    const ears = document.querySelectorAll('.ear');
    head.style.setProperty('--color', char.avatarColor);
    head.style.setProperty('--color-glow', char.avatarColor + '80');
    ears.forEach(e => e.style.backgroundColor = char.avatarColor);

    // 2. Update Stats
    document.getElementById('charName').innerText = char.name;
    const statsContainer = document.getElementById('statsDisplay');
    statsContainer.innerHTML = Object.entries(char.stats).map(([k, v]) => `
        <div class="stat-row">
            <span>${k.toUpperCase()}</span>
            <div class="progress-bg"><div class="progress-fill" style="width:${v}%"></div></div>
        </div>
    `).join('');
}
