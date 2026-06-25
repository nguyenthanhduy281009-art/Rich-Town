// invites.js

const INVITE_EXPIRE_TIME = 60000; // 60 giây

// ======================
// GỬI LỜI MỜI
// ======================
window.inviteFriend = async function(uid, name) {

```
if (!currentUser) return;

try {

    const inviteData = {
        fromUid: currentUser.uid,
        fromName:
            currentUserData?.name ||
            currentUser.displayName ||
            "Người chơi",

        roomId: roomId,
        createdAt: Date.now()
    };

    await db.ref(`invites/${uid}`).push(inviteData);

    alert(`Đã gửi lời mời cho ${name}`);

} catch (err) {

    console.error("Invite error:", err);
    alert("Không gửi được lời mời");

}
```

};

// ======================
// NHẬN LỜI MỜI
// ======================
window.watchInvites = function(uid) {

```
if (!uid) return;

const invitesRef = db.ref(`invites/${uid}`);

invitesRef.on("child_added", async (snap) => {

    const invite = snap.val();
    const inviteKey = snap.key;

    if (!invite) return;

    // bỏ qua invite quá cũ
    if (
        invite.createdAt &&
        Date.now() - invite.createdAt > INVITE_EXPIRE_TIME
    ) {

        invitesRef.child(inviteKey).remove();
        return;
    }

    const accepted = confirm(
        `${invite.fromName} mời bạn vào phòng ${invite.roomId}\n\nBạn có muốn tham gia không?`
    );

    // xóa lời mời sau khi xử lý
    await invitesRef.child(inviteKey).remove();

    if (!accepted) return;

    window.location.href =
        `room.html?id=${invite.roomId}`;

});
```

};

// ======================
// DỌN INVITE CŨ
// ======================
window.cleanOldInvites = async function(uid) {

```
if (!uid) return;

try {

    const snap =
        await db.ref(`invites/${uid}`).once("value");

    const invites = snap.val();

    if (!invites) return;

    const updates = {};

    Object.entries(invites).forEach(([key, invite]) => {

        if (
            invite.createdAt &&
            Date.now() - invite.createdAt >
            INVITE_EXPIRE_TIME
        ) {

            updates[key] = null;
        }

    });

    if (Object.keys(updates).length) {

        await db
            .ref(`invites/${uid}`)
            .update(updates);

    }

} catch (err) {

    console.error(err);

}
```

};
