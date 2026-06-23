console.log("DEBUG: invites.js đã được tải");

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("DEBUG: Đã xác định user:", user.uid);
        startInviteListener(user.uid);
    } else {
        console.log("DEBUG: Chưa đăng nhập, không lắng nghe lời mời");
    }
});

function startInviteListener(uid) {
    const inviteRef = firebase.database().ref(`invites/${uid}`);
    console.log("DEBUG: Đang bắt đầu lắng nghe tại:", `invites/${uid}`);
    
    inviteRef.off(); // Xóa listener cũ

    inviteRef.on("child_added", (snap) => {
        console.log("DEBUG: Phát hiện lời mời mới!", snap.val());
        const invite = snap.val();
        if (!invite) return;

        const accept = confirm(`${invite.fromName || "Ai đó"} đã mời bạn vào phòng ${invite.roomId}. Tham gia ngay?`);
        
        snap.ref.remove();

        if (accept) {
            window.location.href = `room.html?id=${invite.roomId}`;
        }
    }, (error) => {
        console.error("DEBUG: Lỗi khi lắng nghe Firebase:", error);
    });
}
