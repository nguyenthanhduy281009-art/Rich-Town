// invites.js - Dùng trực tiếp đối tượng firebase toàn cục
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        startInviteListener(user.uid);
    }
});

function startInviteListener(uid) {
    // Sử dụng trực tiếp firebase.database()
    const inviteRef = firebase.database().ref(`invites/${uid}`);
    
    // Xóa listener cũ trước khi gắn mới để tránh trùng lặp
    inviteRef.off();

    inviteRef.on("child_added", (snap) => {
        const invite = snap.val();
        if (!invite) return;

        // Hiển thị lời mời
        const accept = confirm(`${invite.fromName || "Ai đó"} đã mời bạn vào phòng ${invite.roomId}. Tham gia ngay?`);
        
        // Xóa lời mời ngay sau khi đã xử lý
        snap.ref.remove();

        if (accept) {
            window.location.href = `room.html?id=${invite.roomId}`;
        }
    });
}
