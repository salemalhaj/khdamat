var _supabase = supabase.createClient('https://ggaxlmhzdeczhgyjwyct.supabase.co', 'sb_publishable_Dy1TLIvbtiEEJM89KY9JzQ_eip7fCUI');
var currentLang = localStorage.getItem('lang') || 'ar';
var currentUser = null, userProfile = null, platformSettings = {};

var translations = {
    ar: { app_name: "منصة خدمات", app_name_short: "خدمات", login_title: "سجل دخولك", email: "البريد الإلكتروني", password: "كلمة المرور", login_btn: "دخول", create_acc: "أنشئ حساباً جديداً", signup_title: "حساب جديد", full_name: "الاسم الكامل", phone: "رقم الهاتف", role_user: "صاحب عمل", role_provider: "مزود خدمة", signup_btn: "تسجيل", have_acc: "لديك حساب؟ سجل الدخول", nav_home: "الرئيسية", nav_services: "الخدمات", nav_wallet: "المحفظة", nav_orders: "طلباتي", nav_admin: "الإدارة", close: "إغلاق", profile: "الملف الشخصي", name: "الاسم", role: "الدور", role_admin: "مدير", role_provider: "مزود", role_user: "مستخدم" },
    en: { app_name: "Khdamat", app_name_short: "Khdamat", login_title: "Login", email: "Email", password: "Password", login_btn: "Login", create_acc: "Create Account", signup_title: "New Account", full_name: "Full Name", phone: "Phone", role_user: "Client", role_provider: "Provider", signup_btn: "Sign Up", have_acc: "Have an account? Login", nav_home: "Home", nav_services: "Services", nav_wallet: "Wallet", nav_orders: "Orders", nav_admin: "Admin", close: "Close", profile: "Profile", name: "Name", role: "Role", role_admin: "Admin", role_provider: "Provider", role_user: "User" }
};

function t(key) { return translations[currentLang][key] || key; }

function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(function(el) { el.innerText = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) { el.placeholder = t(el.getAttribute('data-i18n-placeholder')); });
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', currentLang);
    applyTranslations();
    Swal.fire({ title: 'Language Changed', icon: 'success', timer: 1000, showConfirmButton: false });
}

function toggleTheme() {
    var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    var icon = next === 'light' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    document.getElementById('btn-theme-top').innerHTML = icon;
    document.getElementById('btn-theme-main').innerHTML = icon;
}

function showSignup(e) { if (e) e.preventDefault(); document.getElementById('login-screen').classList.add('hidden'); document.getElementById('signup-screen').classList.remove('hidden'); }
function showLogin(e) { if (e) e.preventDefault(); document.getElementById('signup-screen').classList.add('hidden'); document.getElementById('login-screen').classList.remove('hidden'); }

function doSignup() {
    var n = document.getElementById('signup-name').value.trim();
    var e = document.getElementById('signup-email').value.trim();
    var p = document.getElementById('signup-phone').value.trim();
    var pw = document.getElementById('signup-password').value;
    var r = document.getElementById('signup-role').value;
    if (!n || !e || !p || !pw) return Swal.fire('تنبيه', 'ملء جميع الحقول', 'warning');
    
    Swal.fire({ title: 'جاري الإنشاء...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
    _supabase.auth.signUp({ email: e, password: pw, options: { data: { full_name: n, role: r, phone: p } } }).then(function(res) {
        if (res.error) { Swal.fire('خطأ', res.error.message, 'error'); return; }
        Swal.fire('تم', 'تم الإنشاء! سجل الدخول الآن', 'success');
        document.getElementById('signup-screen').classList.add('hidden');
        document.getElementById('login-screen').classList.remove('hidden');
    });
}

function doLogin() {
    var email = document.getElementById('login-email').value.trim();
    var password = document.getElementById('login-password').value;
    if (!email || !password) return Swal.fire('تنبيه', 'أدخل البريد وكلمة المرور', 'warning');
    
    Swal.fire({ title: 'جاري التحقق...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
    _supabase.auth.signInWithPassword({ email: email, password: password }).then(function(res) {
        if (res.error) { Swal.fire('فشل الدخول', 'بيانات غير صحيحة', 'error'); return; }
        
        _supabase.from('profiles').select('*').eq('id', res.data.user.id).maybeSingle().then(function(pRes) {
            Swal.close();
            if (!pRes.data) { Swal.fire('خطأ', 'الملف الشخصي غير موجود', 'error'); return; }
            
            currentUser = res.data.user;
            userProfile = pRes.data;
            document.getElementById('auth-container').classList.add('hidden');
            document.getElementById('main-app').classList.remove('hidden');
            
            if (userProfile.role === 'admin') {
                document.getElementById('nav-admin').classList.remove('hidden');
                document.getElementById('nav-services').classList.add('hidden');
                document.getElementById('nav-orders').classList.add('hidden');
            }
            navTo('home');
        });
    });
}

function navTo(page) {
    document.querySelectorAll('.page').forEach(function(p) { p.classList.add('hidden'); });
    document.getElementById('page-' + page).classList.remove('hidden');
    document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
    document.getElementById('nav-' + page).classList.add('active');
    
    if (page === 'home') document.getElementById('page-home').innerHTML = '<div class="card"><h2>أهلاً بك يا ' + userProfile.full_name + '</h2><p>تم تسجيل الدخول بنجاح! الأزرار تعمل الآن.</p></div>';
    else document.getElementById('page-' + page).innerHTML = '<div class="card"><h2>هذه صفحة ' + page + '</h2><p>سنبني هذه الصفحة في الخطوة القادمة.</p></div>';
}

function doLogout() { _supabase.auth.signOut(); location.reload(); }
function showProfile() { Swal.fire({ title: 'الملف الشخصي', html: '<p>الاسم: ' + userProfile.full_name + '</p><p>الدور: ' + userProfile.role + '</p>', confirmButtonText: 'إغلاق' }); }

document.addEventListener('DOMContentLoaded', function() {
    var savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    applyTranslations();

    var btnLogin = document.getElementById('btn-do-login');
    if (btnLogin) btnLogin.addEventListener('click', doLogin);
    var btnSignup = document.getElementById('btn-do-signup');
    if (btnSignup) btnSignup.addEventListener('click', doSignup);
    var linkSignup = document.getElementById('link-to-signup');
    if (linkSignup) linkSignup.addEventListener('click', showSignup);
    var linkLogin = document.getElementById('link-to-login');
    if (linkLogin) linkLogin.addEventListener('click', showLogin);
    var btnLangTop = document.getElementById('btn-lang-top');
    if (btnLangTop) btnLangTop.addEventListener('click', toggleLanguage);
    var btnThemeTop = document.getElementById('btn-theme-top');
    if (btnThemeTop) btnThemeTop.addEventListener('click', toggleTheme);
    var btnLangMain = document.getElementById('btn-lang-main');
    if (btnLangMain) btnLangMain.addEventListener('click', toggleLanguage);
    var btnThemeMain = document.getElementById('btn-theme-main');
    if (btnThemeMain) btnThemeMain.addEventListener('click', toggleTheme);
    var btnProfile = document.getElementById('btn-profile');
    if (btnProfile) btnProfile.addEventListener('click', showProfile);
    var btnLogout = document.getElementById('btn-logout');
    if (btnLogout) btnLogout.addEventListener('click', doLogout);
});
