// 1. Hàm Mời bạn bè
window.inviteFriend = function(uid, name) {
    const sender = firebase.auth().currentUser;
    if (!sender) return;

    firebase.database().ref(`users/${uid}/invites`).push({
        roomId: new URLSearchParams(window.location.search).get("id"),
        senderName: sender.displayName || "Bạn",
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    alert("Đã gửi lời mời đến " + name);
};

// 2. Hàm dọn dẹp lời mời cũ (Bổ sung hàm này)
window.cleanOldInvites = async function(uid) {
    try {
        await firebase.database().ref(`users/${uid}/invites`).remove();
    } catch (e) {
        console.error("Lỗi dọn dẹp lời mời:", e);
    }
};

// 3. Hàm lắng nghe lời mời
function watchInvites(uid) {
    firebase.database().ref(`users/${uid}/invites`).on('child_added', (snap) => {
        const invite = snap.val();
        if (!invite) return;
        
        const key = snap.key;
        if (document.getElementById('invite-popup')) return;

        const div = document.createElement('div');
        div.id = 'invite-popup';
        div.style = "position:fixed; bottom:20px; right:20px; background:#111827; padding:20px; border-radius:15px; border:1px solid #ffd54a; z-index:99999; box-shadow:0 10px 30px rgba(0,0,0,0.5); color:white; min-width:250px;";
        div.innerHTML = `
            <div style="margin-bottom:10px; font-weight:bold;">Lời mời chơi game!</div>
            <div style="margin-bottom:15px; font-size:14px;">Phòng: <b>${invite.roomId}</b></div>
            <div style="display:flex; gap:10px;">
                <button id="join-btn" style="background:#34d399; border:none; padding:8px 15px; border-radius:8px; cursor:pointer;">Vào ngay</button>
                <button id="close-btn" style="background:#fb7185; border:none; padding:8px 15px; border-radius:8px; cursor:pointer;">Bỏ qua</button>
            </div>
        `;
        document.body.appendChild(div);

        document.getElementById('join-btn').onclick = () => {
            firebase.database().ref(`users/${uid}/invites/${key}`).remove();
            location.href = `room.html?id=${invite.roomId}`;
        };
        document.getElementById('close-btn').onclick = () => {
            firebase.database().ref(`users/${uid}/invites/${key}`).remove();
            div.remove();
        };
    });
}

// 4. Tự kích hoạt khi auth thay đổi
firebase.auth().onAuthStateChanged((user) => {
    if (user) watchInvites(user.uid);
});

if (firebase.auth().currentUser) {
    watchInvites(firebase.auth().currentUser.uid);
}
