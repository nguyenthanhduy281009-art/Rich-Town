// invites.js
(function() {
    // Hàm hiển thị Popup
    function showInvitePopup(inviteData, key) {
        if (document.getElementById('invite-popup')) return; // Không hiển thị đè

        const div = document.createElement('div');
        div.id = 'invite-popup';
        div.style = "position:fixed; bottom:20px; right:20px; background:#111827; padding:20px; border-radius:15px; border:1px solid #ffd54a; z-index:99999; box-shadow:0 10px 30px rgba(0,0,0,0.5); color:white; min-width:250px;";
        
        div.innerHTML = `
            <div style="margin-bottom:10px; font-weight:bold;">Lời mời chơi game!</div>
            <div style="margin-bottom:15px; font-size:14px;">Phòng: <b>${inviteData.roomId}</b></div>
            <div style="display:flex; gap:10px;">
                <button id="join-btn" style="background:#34d399; border:none; padding:8px 15px; border-radius:8px; cursor:pointer;">Vào ngay</button>
                <button id="close-btn" style="background:#fb7185; border:none; padding:8px 15px; border-radius:8px; cursor:pointer;">Bỏ qua</button>
            </div>
        `;

        document.body.appendChild(div);

        document.getElementById('join-btn').onclick = () => {
            const user = firebase.auth().currentUser;
            if(user) firebase.database().ref(`users/${user.uid}/invites/${key}`).remove();
            location.href = `room.html?id=${inviteData.roomId}`;
        };

        document.getElementById('close-btn').onclick = () => {
            const user = firebase.auth().currentUser;
            if(user) firebase.database().ref(`users/${user.uid}/invites/${key}`).remove();
            div.remove();
        };
    }

    // Tự động lắng nghe khi auth thay đổi
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("Invites listener: Đã kết nối, đang chờ lời mời...");
            firebase.database().ref(`users/${user.uid}/invites`).on('child_added', (snap) => {
                const invite = snap.val();
                if (invite) showInvitePopup(invite, snap.key);
            });
        }
    });
})();
