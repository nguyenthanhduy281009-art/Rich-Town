// invites.js
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        startInviteListener(user.uid);
    }
});

function startInviteListener(uid) {
    const inviteRef = firebase.database().ref(`invites/${uid}`);
    inviteRef.off(); // Dọn dẹp listener cũ

    inviteRef.on("child_added", (snap) => {
        const invite = snap.val();
        if (!invite) return;

        // Hiển thị lời mời
        const accept = confirm(`${invite.fromName || "Ai đó"} đã mời bạn vào phòng ${invite.roomId}. Tham gia ngay?`);
        
        // CHỈ XÓA KHI ĐÃ ĐƯỢC XỬ LÝ (CHẤP NHẬN HOẶC TỪ CHỐI)
        if (accept) {
            snap.ref.remove(); // Xóa sau khi đã đồng ý
            window.location.href = `room.html?id=${invite.roomId}`;
        } else {
            // Nếu không muốn xóa khi nhấn Cancel thì bỏ dòng này. 
            // Nếu muốn xóa luôn để tránh bị làm phiền thì giữ nguyên:
            snap.ref.remove(); 
        }
    });
}
