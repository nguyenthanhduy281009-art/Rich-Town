// invites.js
async function watchInvites(uid) {
    if (!uid) return;
    
    console.log("Đang theo dõi lời mời cho:", uid); // Kiểm tra xem hàm có chạy không
    
    const invitesRef = db.ref(`invites/${uid}`);

    // Sử dụng 'child_added' để nhận lời mời mới
    invitesRef.on('child_added', (snapshot) => {
        const invite = snapshot.val();
        const inviteKey = snapshot.key;
        
        console.log("Có lời mời mới!", invite);
        
        // Hiển thị thông báo (ví dụ dùng confirm hoặc một modal tùy chỉnh)
        if (confirm(`Bạn nhận được lời mời từ ${invite.fromName}. Vào phòng ${invite.roomId} ngay?`)) {
            // Xóa lời mời sau khi chấp nhận
            invitesRef.child(inviteKey).remove();
            // Chuyển hướng
            window.location.href = `room.html?id=${invite.roomId}`;
        } else {
            // Chỉ xóa lời mời nếu từ chối
            invitesRef.child(inviteKey).remove();
        }
    });
}
