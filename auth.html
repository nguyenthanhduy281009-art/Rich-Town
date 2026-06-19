<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác thực - RICH TOWN</title>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>
    <style>
        :root { --primary: #FFD700; }
        body { font-family: sans-serif; background: #121212; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .box { background: #1e1e1e; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.5); width: 320px; text-align: center; color: white; }
        .brand-name { font-size: 32px; font-weight: 900; margin-bottom: 5px; color: var(--primary); letter-spacing: 1px; }
        #title { margin: 0 0 20px; font-size: 16px; color: #aaa; }
        .input-group { position: relative; margin: 8px 0; }
        input { width: 100%; padding: 12px; border: 1px solid #333; border-radius: 8px; box-sizing: border-box; background: #000; color: #fff; margin-bottom: 8px; }
        .show-btn { position: absolute; right: 10px; top: 10px; background: #333; border: none; padding: 5px; border-radius: 4px; font-size: 10px; cursor: pointer; color: #fff; }
        button.main { width: 100%; padding: 12px; background: var(--primary); color: #000; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; margin-top: 10px; }
        .link { margin-top: 15px; font-size: 13px; color: var(--primary); cursor: pointer; }
        .forgot { display: block; text-align: right; font-size: 12px; color: #777; margin-bottom: 10px; cursor: pointer; }
        #error { color: #ff5555; font-size: 12px; margin-top: 10px; min-height: 15px; }
    </style>
</head>
<body>
<div class="box">
    <div class="brand-name">RICH TOWN</div>
    <h2 id="title">ĐĂNG NHẬP</h2>
    <input type="text" id="username" placeholder="Tên nhân vật" style="display: none;">
    <input type="email" id="email" placeholder="Email">
    <div class="input-group">
        <input type="password" id="pass" placeholder="Mật khẩu">
        <button class="show-btn" onclick="togglePass()">HIỆN</button>
    </div>
    <a class="forgot" id="forgotBtn" onclick="forgotPass()">Quên mật khẩu?</a>
    <button class="main" onclick="handleAuth()" id="btnSubmit">ĐĂNG NHẬP</button>
    <div id="error"></div>
    <div class="link" onclick="switchMode()" id="toggleTxt">Chưa có tài khoản? Đăng ký ngay</div>
</div>

<script>
const firebaseConfig = {
    apiKey: "AIzaSyCeg9m4AuIJxr6PCxYnC7WJ4hmWgJPB180",
    authDomain: "rich-town.firebaseapp.com",
    databaseURL: "https://rich-town-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "rich-town",
    storageBucket: "rich-town.firebasestorage.app",
    messagingSenderId: "404583018538",
    appId: "1:404583018538:web:2bdeb6f2d26f7aa4221353"
};
    
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

let isLogin = true;

function togglePass() {
    const p = document.getElementById("pass");
    p.type = p.type === "password" ? "text" : "password";
    event.target.innerText = p.type === "password" ? "HIỆN" : "ẨN";
}

function switchMode() {
    isLogin = !isLogin;
    document.getElementById("title").innerText = isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ";
    document.getElementById("btnSubmit").innerText = isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ";
    document.getElementById("toggleTxt").innerText = isLogin ? "Chưa có tài khoản? Đăng ký ngay" : "Đã có tài khoản? Đăng nhập";
    document.getElementById("username").style.display = isLogin ? "none" : "block";
    document.getElementById("forgotBtn").style.display = isLogin ? "block" : "none";
    document.getElementById("error").innerText = "";
}

async function forgotPass() {
    const email = document.getElementById("email").value;
    if (!email) return alert("Vui lòng nhập Email!");
    try {
        await auth.sendPasswordResetEmail(email);
        alert("Link đặt lại mật khẩu đã được gửi!");
    } catch (e) { alert("Lỗi: " + e.message); }
}

async function handleAuth() {
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("pass").value;
    const nickname = document.getElementById("username").value.trim();
    const err = document.getElementById("error");
    
    if(!email || !pass || (!isLogin && !nickname)) return err.innerText = "Điền đầy đủ thông tin!";
    err.innerText = "Đang xử lý...";

    try {
        if (isLogin) {
            await auth.signInWithEmailAndPassword(email, pass);
            window.location.href = "index.html";
        } else {
            if (nickname.length < 3) return err.innerText = "Tên ít nhất 3 ký tự!";
            const res = await auth.createUserWithEmailAndPassword(email, pass);
            const nameCheck = await db.ref('users').orderByChild('name').equalTo(nickname).once('value');
            if (nameCheck.exists()) {
                await res.user.delete();
                return err.innerText = "Tên này đã có người dùng!";
            }
            await res.user.updateProfile({ displayName: nickname });
            await db.ref('users/' + res.user.uid).set({
                name: nickname,
                email: email,
                coins: 0,
                createdAt: Date.now()
            });
            window.location.href = "index.html";
        }
    } catch (e) { err.innerText = e.message; }
}
</script>
</body>
</html>
