// --- CẤU HÌNH GIAO DIỆN (Thêm CSS vào trang) ---
const style = document.createElement('style');
style.innerHTML = `
    .invite-toast { position: fixed; bottom: 20px; right: 20px; width: 320px; background: rgba(17, 24, 39, 0.9); backdrop-filter: blur(10px); padding: 20px; border-radius: 16px; border: 1px solid rgba(255, 213, 74, 0.3); color: white; box-shadow: 0 10px 25px rgba(0,0,0,0.5); z-index: 99999; animation: slideIn 0.5s ease; }
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    .invite-btn { border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer; font-weight: bold; transition: 0.3s; }
    .btn-join { background: #34d399; color: white; }
    .btn-join:hover { background: #10b981; }
    .btn-close { background: #4b5563; color: white; margin-left: 10px; }
    .btn-close:hover { background: #374151; }
`;
document.head.appendChild(style);

// 1. Hàm Mời bạn bè
window.inviteFriend = function(uid, name) {
    const sender = firebase.auth().currentUser;
    if (!sender) return;

    firebase.database().ref(`users/${uid}/invites`).push({
        roomId: new URLSearchParams(window.location.search).get("id"),
        senderName: sender.displayName || "Người chơi khác",
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    alert("Đã gửi lời mời đến " + name);
};

// 2. Hàm dọn dẹp
window.cleanOldInvites = async function(uid) {
    await firebase.database().ref(`users/${uid}/invites`).remove();
};

// 3. Hàm lắng nghe (Đã nâng cấp giao diện)
function watchInvites(uid) {
    firebase.database().ref(`users/${uid}/invites`).on('child_added', (snap) => {
        const invite = snap.val();
        if (!invite || document.getElementById('invite-popup')) return;

        const div = document.createElement('div');
        div.id = 'invite-popup';
        div.className = 'invite-toast';
        div.innerHTML = `
            <div style="font-size: 16px; margin-bottom: 8px;"><b>${invite.senderName}</b> muốn mời bạn vào phòng!</div>
            <div style="font-size: 14px; color: #ffd54a; margin-bottom: 15px;">Mã phòng: <b>${invite.roomId}</b></div>
            <div style="display: flex;">
                <button id="join-btn" class="invite-btn btn-join">Vào ngay</button>
                <button id="close-btn" class="invite-btn btn-close">Bỏ qua</button>
            </div>
        `;
        document.body.appendChild(div);

        document.getElementById('join-btn').onclick = () => {
            firebase.database().ref(`users/${uid}/invites/${snap.key}`).remove();
            location.href = `room.html?id=${invite.roomId}`;
        };
        document.getElementById('close-btn').onclick = () => {
            firebase.database().ref(`users/${uid}/invites/${snap.key}`).remove();
            div.remove();
        };
    });
}

// 4. Kích hoạt
firebase.auth().onAuthStateChanged((user) => {
    if (user) watchInvites(user.uid);
});
