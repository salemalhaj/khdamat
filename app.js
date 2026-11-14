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
