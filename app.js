alert("1. ملف الأكواد يعمل!");

document.addEventListener('DOMContentLoaded', function() {
    var btnLogin = document.getElementById('btn-do-login');
    if (btnLogin) {
        btnLogin.addEventListener('click', function() {
            alert("2. زر الدخول استجاب!");
        });
    } else {
        alert("3. لم يجد زر الدخول في الصفحة!");
    }
    
    if (typeof supabase === 'undefined') {
        alert("4. مكتبة Supabase لم تُحمل!");
    } else {
        alert("5. مكتبة Supabase تعمل!");
    }
});
