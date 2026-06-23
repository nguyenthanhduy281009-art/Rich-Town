// invites.js
const auth = firebase.auth();
const db = firebase.database();

// Lắng nghe trạng thái đăng nhập để biết UID mà bắt đầu theo dõi
auth.onAuthStateChanged(user => {
    if (user) {
        startInviteListener(user.uid);
    }
});

function startInviteListener(uid) {
    const inviteRef = db.ref(`invites/${uid}`);
    
    // Tắt listener cũ trước khi tạo mới để tránh trùng lặp
    inviteRef.off();

    inviteRef.on("child_added", (snap) => {
        const invite = snap.val();
        if (!invite) return;

        // Hiển thị lời mời
        const accept = confirm(`Bạn nhận được lời mời vào phòng: ${invite.roomId}\nTham gia ngay?`);
        
        // Xóa ngay lập tức sau khi xử lý
        snap.ref.remove();

        if (accept) {
            window.location.href = `room.html?id=${invite.roomId}`;
        }
    });
}
