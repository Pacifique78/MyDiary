document.getElementById('login-btn').addEventListener('click', () => {
    document.getElementById('login').style.display = 'flex';
    document.getElementById('login-form').style.display = 'inline';
});
document.getElementById('close-form').addEventListener('click', () => {
    document.getElementById('login').style.display = 'none';
});
document.getElementById('create-account-btn').addEventListener('click', () => {
    document.getElementById('create').style.display = 'flex';
    document.getElementById('create-account').style.display = 'inline';
});
document.getElementById('close-create-form').addEventListener('click', () => {
    document.getElementById('create').style.display = 'none';
});
window.onload = document.getElementById('homeBtn').click();
let createAccount = document.getElementById('new-account');
createAccount.addEventListener('click', () =>{ 
    window.location.assign('html/user-page.html');
});
let loginBtn = document.getElementById('login-page-btn');
loginBtn.addEventListener('click', () =>{ 
    window.location.assign('html/user-page.html');
});
