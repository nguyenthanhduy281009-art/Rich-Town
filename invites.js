// invites.js
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        startInviteListener(user.uid);
    }
});

function startInviteListener(uid) {
    const inviteRef = firebase.database().ref(`invites/${uid}`);
    
    // Xóa listener cũ nếu có để tránh trùng lặp
    inviteRef.off();

    inviteRef.on("child_added", (snap) => {
        const invite = snap.val();
        if (!invite) return;

        // Hiển thị thông báo
        const accept = confirm(`${invite.fromName || "Ai đó"} đã mời bạn vào phòng ${invite.roomId}. Tham gia ngay?`);
        
        // Xóa lời mời ngay sau khi người dùng phản hồi
        snap.ref.remove();

        if (accept) {
            window.location.href = `room.html?id=${invite.roomId}`;
        }
    });
}
