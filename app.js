// ============================================================
// app.js — الجزء 1 من 8
// ============================================================

var _supabase = supabase.createClient('https://ggaxlmhzdeczhgyjwyct.supabase.co', 'sb_publishable_Dy1TLIvbtiEEJM89KY9JzQ_eip7fCUI');
var currentLang = localStorage.getItem('lang') || 'ar';
var currentUser = null, userProfile = null, platformSettings = {};

var translations = {
    ar: {
        app_name: "منصة خدمات", app_name_short: "خدمات", login_title: "سجل دخولك",
        email: "البريد الإلكتروني", password: "كلمة المرور", login_btn: "دخول",
        create_acc: "أنشئ حساباً جديداً", signup_title: "حساب جديد", full_name: "الاسم الكامل",
        phone: "رقم الهاتف", role_user: "صاحب عمل", role_provider: "مزود خدمة",
        signup_btn: "تسجيل", have_acc: "لديك حساب؟ سجل الدخول", nav_home: "الرئيسية",
        nav_services: "الخدمات", nav_wallet: "المحفظة", nav_orders: "طلباتي",
        nav_my_services: "خدماتي", nav_messages: "الرسائل", nav_admin: "الإدارة",
        nav_store: "المتجر", nav_cart: "السلة", nav_purchases: "مشترياتي",
        welcome: "مرحباً، ", balance_title: "رصيد محفظتك", currency: "د.ل",
        deposit: "شحن", request_service: "طلب خدمة", add_service: "أضف خدمتك",
        admin_panel_btn: "لوحة الإدارة", tab_card: "بطاقة شحن", tab_bank: "تحويل بنكي",
        tab_withdraw: "سحب", tab_transfer: "تحويل", card_code: "أدخل كود البطاقة",
        confirm: "تأكيد", bank: "المصرف", name: "الاسم", account: "الحساب",
        branch: "الفرع", iban: "رقم الحساب الدولي (IBAN)", acc_num: "رقم الحساب",
        send: "إرسال", transfer_note: "حول فوراً عبر رقم هاتف المستخدم.",
        search: "بحث", transfer_now: "تحويل الآن", services_title: "الخدمات",
        new_service: "خدمة جديدة", status: "الحالة", approved: "معتمدة",
        pending: "قيد المراجعة", rejected: "مرفوضة", no_services: "لا يوجد خدمات.",
        no_services_avail: "لا يوجد خدمات متاحة.", request: "طلب",
        add_service_title: "إضافة خدمة", price: "السعر", desc: "الوصف",
        cancel: "إلغاء", orders_title: "طلباتي", no_orders: "لا يوجد طلبات.",
        admin_title: "الإدارة", users: "المستخدمون", total_money: "إجمالي الأموال",
        my_balance: "رصيد محفظتي", withdrawals: "سحب", transfers: "تحويلات",
        cards: "بطاقات", approve: "موافقة", reject: "رفض", view_receipt: "عرض الإيصال",
        generate: "توليد", card_value: "قيمة البطاقة", count: "العدد",
        alert: "تنبيه", error: "خطأ", success: "تم", fill_fields: "ملء جميع الحقول",
        login_failed: "فشل الدخول", invalid_creds: "البريد غير مؤكد أو كلمة المرور خاطئة",
        profile_not_found: "الملف الشخصي غير موجود", creating: "جاري الإنشاء...",
        created_login: "تم إنشاء الحساب! يرجى تفقد بريدك الإلكتروني لتأكيد الحساب، ثم قم بتسجيل الدخول.",
        verifying: "جاري التحقق...", sending: "جاري الإرسال...", uploading: "جاري الرفع...",
        request_sent: "تم إرسال الطلب", upload_failed: "فشل رفع الملف",
        number_not_found: "رقم غير موجود", transferring: "جاري التحويل...",
        transfer_success: "تم التحويل بنجاح", insufficient_balance: "رصيد غير كافٍ",
        top_up: "اشحن محفظتك", confirm_order: "تأكيد",
        deduct_for: "خصم {amount} لطلب {title}؟", yes: "نعم",
        ordering: "جاري الطلب...", order_success: "تم الطلب بنجاح",
        loading: "جاري التحميل...", generating: "جاري التوليد...", generated: "تم التوليد",
        reject_reason: "سبب الرفض", rejected_msg: "تم الرفض", approved_msg: "تمت الموافقة",
        bal_insufficient: "الرصيد غير كافٍ", added_msg: "تمت الإضافة",
        profile: "الملف الشخصي", role: "الدور", role_admin: "مدير",
        role_provider: "مزود", role_user: "مستخدم", close: "إغلاق",
        card_redeemed: "تم شحن البطاقة بنجاح!",
        card_error: "البطاقة غير صالحة أو مستخدمة", date_joined: "تاريخ الانضمام",
        reject_transfer: "رفض التحويل",
        logout_confirm: "هل أنت متأكد من تسجيل الخروج؟", yes_logout: "نعم، سجّل الخروج",
        today: "اليوم", yesterday: "أمس",
        time_ago_seconds: "منذ لحظات", time_ago_minute: "منذ دقيقة",
        time_ago_minutes: "منذ {n} دقائق", time_ago_hour: "منذ ساعة",
        time_ago_hours: "منذ {n} ساعات", time_ago_day: "منذ يوم",
        time_ago_days: "منذ {n} أيام", time_ago_week: "منذ أسبوع",
        time_ago_weeks: "منذ {n} أسابيع", time_ago_month: "منذ شهر",
        time_ago_months: "منذ {n} أشهر",
        chat_expires_in: "متبقي", chat_expired: "انتهت مدة المحادثة",
        extend_chat: "تمديد المحادثة",
        tab_requests: "📋 الطلبات", tab_transactions: "📜 سجل المعاملات",
        pending_offers: "عروض تنتظر ردك",
        send_payment_request: "💸 إرسال طلب دفع", request_payment_title: "إرسال طلب دفع",
        full_payment: "كامل المبلغ", deposit_payment: "عربون (دفعة مقدمة)",
        pay_now: "ادفع الآن", reject_offer: "رفض",
        type_message: "اكتب رسالتك...", record_voice: "تسجيل صوتي",
        attach_image: "صورة", attach_file: "ملف PDF", emoji: "إيموجي",
        recording: "جاري التسجيل... اضغط للإرسال",
        
        // --- الكلمات الجديدة التي حلت مشكلة الصور ---
        amount: "المبلغ",
        bank_name: "اسم المصرف",
        withdraw_note: "ملاحظة: سيتم خصم المبلغ من رصيدك حتى تتم الموافقة على الطلب.",
        transfer_amt: "مبلغ التحويل",
        send_review: "إرسال للمراجعة",
        cancel_request: "إلغاء الطلب"
    },
    en: {
        app_name: "Khdamat", app_name_short: "Khdamat", login_title: "Login",
        email: "Email", password: "Password", login_btn: "Login",
        create_acc: "Create Account", signup_title: "New Account", full_name: "Full Name",
        phone: "Phone", role_user: "Client", role_provider: "Provider",
        signup_btn: "Sign Up", have_acc: "Have an account? Login", nav_home: "Home",
        nav_services: "Services", nav_wallet: "Wallet", nav_orders: "Orders",
        nav_my_services: "My Services", nav_messages: "Messages", nav_admin: "Admin",
        nav_store: "Store", nav_cart: "Cart", nav_purchases: "My Purchases",
        welcome: "Welcome, ", balance_title: "Wallet Balance", currency: "LYD",
        deposit: "Deposit", request_service: "Request Service", add_service: "Add your service",
        admin_panel_btn: "Admin Panel", tab_card: "Recharge Card", tab_bank: "Bank Transfer",
        tab_withdraw: "Withdraw", tab_transfer: "Transfer", card_code: "Enter card code",
        confirm: "Confirm", bank: "Bank", name: "Name", account: "Account",
        branch: "Branch", iban: "IBAN", acc_num: "Account Number", send: "Send",
        transfer_note: "Transfer via phone number.", search: "Search", transfer_now: "Transfer Now",
        services_title: "Services", new_service: "New Service",
        status: "Status", approved: "Approved", pending: "Pending", rejected: "Rejected",
        no_services: "No services found.", no_services_avail: "No services available.",
        request: "Request", add_service_title: "Add Service", price: "Price", desc: "Description",
        cancel: "Cancel", orders_title: "My Orders", no_orders: "No orders found.",
        admin_title: "Admin Panel", users: "Users", total_money: "Total Money",
        my_balance: "My Balance", withdrawals: "Withdrawals", transfers: "Transfers",
        cards: "Cards", approve: "Approve", reject: "Reject", view_receipt: "View Receipt",
        generate: "Generate", card_value: "Card Value", count: "Count",
        alert: "Alert", error: "Error", success: "Done", fill_fields: "Please fill all fields",
        login_failed: "Login Failed", invalid_creds: "Email not confirmed or wrong password",
        profile_not_found: "Profile not found", creating: "Creating...",
        created_login: "Account created! Please check your email to confirm, then login.",
        verifying: "Verifying...", sending: "Sending...", uploading: "Uploading...",
        request_sent: "Request sent", upload_failed: "Upload failed",
        number_not_found: "Number not found", transferring: "Transferring...",
        transfer_success: "Transferred!", insufficient_balance: "Insufficient balance",
        top_up: "Top up your wallet", confirm_order: "Confirm",
        deduct_for: "Deduct {amount} for {title}?", yes: "Yes",
        ordering: "Ordering...", order_success: "Order successful",
        loading: "Loading...", generating: "Generating...", generated: "Generated!",
        reject_reason: "Rejection reason", rejected_msg: "Rejected", approved_msg: "Approved",
        bal_insufficient: "Insufficient balance", added_msg: "Added!",
        profile: "Profile", role: "Role", role_admin: "Admin",
        role_provider: "Provider", role_user: "User", close: "Close",
        card_redeemed: "Card redeemed!",
        card_error: "Invalid or used card", date_joined: "Joined Date",
        reject_transfer: "Reject Transfer",
        logout_confirm: "Are you sure you want to logout?", yes_logout: "Yes, logout",
        today: "Today", yesterday: "Yesterday",
        time_ago_seconds: "Just now", time_ago_minute: "A minute ago",
        time_ago_minutes: "{n} minutes ago", time_ago_hour: "An hour ago",
        time_ago_hours: "{n} hours ago", time_ago_day: "A day ago",
        time_ago_days: "{n} days ago", time_ago_week: "A week ago",
        time_ago_weeks: "{n} weeks ago", time_ago_month: "A month ago",
        time_ago_months: "{n} months ago",
        chat_expires_in: "Remaining", chat_expired: "Chat expired",
        extend_chat: "Extend chat",
        tab_requests: "📋 Requests", tab_transactions: "📜 Transactions",
        pending_offers: "Offers awaiting reply",
        send_payment_request: "💸 Send Payment Request", request_payment_title: "Send Payment Request",
        full_payment: "Full amount", deposit_payment: "Deposit (advance)",
        pay_now: "Pay Now", reject_offer: "Reject",
        type_message: "Type your message...", record_voice: "Voice",
        attach_image: "Image", attach_file: "PDF", emoji: "Emoji",
        recording: "Recording... tap to send",

        // --- الكلمات الجديدة ---
        amount: "Amount",
        bank_name: "Bank Name",
        withdraw_note: "Note: The amount will be deducted from your balance until the request is approved.",
        transfer_amt: "Transfer Amount",
        send_review: "Send for Review",
        cancel_request: "Cancel Request"
    }
};

function t(key) { return (translations[currentLang] && translations[currentLang][key]) || translations.ar[key] || key; }
function tr(key, vars) { var s = t(key); if (vars) Object.keys(vars).forEach(function(k) { s = s.replace('{' + k + '}', vars[k]); }); return s; }


// ============================================================
// app.js — الجزء 2 من 8: الدوال المساعدة
// ============================================================

function escHtml(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(c) {
        return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
    });
}
function escJs(s) {
    return String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/</g, '\\x3c');
}
function escAttr(s) { return escHtml(escJs(s)); }

function handleError(err) {
    console.error('[app]', err);
    if (Swal.isVisible()) Swal.close();
    Swal.fire(t('error'), (err && err.message) ? err.message : t('error'), 'error');
}

function parseBankDetails(str) {
    var parts = String(str || '').split(' | ');
    return {
        full_name: parts[0] || '-',
        bank_name: parts[1] || '-',
        branch: parts[2] || '-',
        account_number: parts[3] || '-',
        iban: parts[4] || '-'
    };
}

// ✅ حساب الوقت النسبي بالفصحى
function getRelativeTime(date) {
    if (!date) return '';
    var d = (date instanceof Date) ? date : new Date(date);
    var diff = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diff < 60) return t('time_ago_seconds');
    var mins = Math.floor(diff / 60);
    if (mins === 1) return t('time_ago_minute');
    if (mins < 60) return tr('time_ago_minutes', { n: mins });
    var hours = Math.floor(mins / 60);
    if (hours === 1) return t('time_ago_hour');
    if (hours < 24) return tr('time_ago_hours', { n: hours });
    var days = Math.floor(hours / 24);
    if (days === 1) return t('time_ago_day');
    if (days < 7) return tr('time_ago_days', { n: days });
    var weeks = Math.floor(days / 7);
    if (weeks === 1) return t('time_ago_week');
    if (weeks < 4) return tr('time_ago_weeks', { n: weeks });
    var months = Math.floor(days / 30);
    if (months === 1) return t('time_ago_month');
    return tr('time_ago_months', { n: months });
}

// ✅ عدّاد حي يتحدث كل دقيقة
var _liveTimersInterval = null;
function startLiveTimers() {
    if (_liveTimersInterval) clearInterval(_liveTimersInterval);
    _liveTimersInterval = setInterval(function() {
        document.querySelectorAll('[data-rel-time]').forEach(function(el) {
            var ts = el.getAttribute('data-rel-time');
            if (ts) el.innerText = getRelativeTime(new Date(ts));
        });
        document.querySelectorAll('[data-chat-timer]').forEach(function(el) {
            var ts = el.getAttribute('data-chat-timer');
            if (!ts) return;
            var left = new Date(ts).getTime() - Date.now();
            if (left <= 0) {
                el.innerText = '⏰ ' + t('chat_expired');
                el.classList.add('danger');
                return;
            }
            var hours = Math.floor(left / 3600000);
            var days = Math.floor(hours / 24);
            var txt = '';
            if (days > 0) txt = '⏳ ' + t('chat_expires_in') + ' ' + days + ' يوم';
            else if (hours > 0) txt = '⏳ ' + t('chat_expires_in') + ' ' + hours + ' ساعة';
            else {
                var mins = Math.floor(left / 60000);
                txt = '⏳ ' + t('chat_expires_in') + ' ' + mins + ' دقيقة';
            }
            el.innerText = txt;
            if (left < 24 * 3600000) el.classList.add('warning');
            if (left < 3600000) {
                el.classList.remove('warning');
                el.classList.add('danger');
            }
        });
    }, 60000);
}

// ✅ التحقق من قوة كلمة المرور
function validatePassword(pw) {
    if (!pw || pw.length < 8) return 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    if (!/[A-Z]/.test(pw)) return 'كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل';
    if (!/[a-z]/.test(pw)) return 'كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل';
    if (!/[0-9]/.test(pw)) return 'كلمة المرور يجب أن تحتوي على رقم واحد على الأقل';
    return null;
}

// ✅ تبديل قسم الاستعادة في التسجيل
function toggleRecoverySection() {
    var fields = document.getElementById('recovery-fields');
    var header = document.querySelector('.recovery-header');
    if (!fields) return;
    if (fields.classList.contains('hidden')) {
        fields.classList.remove('hidden');
        if (header) header.classList.add('open');
    } else {
        fields.classList.add('hidden');
        if (header) header.classList.remove('open');
    }
}

function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        el.innerText = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
        el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
    var ordersNav = document.getElementById('nav-orders');
    if (ordersNav) {
        var span = ordersNav.querySelector('span');
        if (span) span.innerText = (userProfile && userProfile.role === 'provider') ? t('nav_my_services') : t('nav_orders');
    }
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
    var b1 = document.getElementById('btn-theme-top');
    var b2 = document.getElementById('btn-theme-main');
    if (b1) b1.innerHTML = icon;
    if (b2) b2.innerHTML = icon;
}


// ============================================================
// app.js — الجزء 3 من 8: بصمة الجهاز + التسجيل
// ============================================================

// ✅ بصمة الجهاز
async function getDeviceFingerprint() {
    try {
        var parts = [
            navigator.userAgent || '',
            navigator.language || '',
            navigator.platform || '',
            (screen.width || 0) + 'x' + (screen.height || 0),
            screen.colorDepth || '',
            (new Date()).getTimezoneOffset(),
            (Intl.DateTimeFormat().resolvedOptions().timeZone) || '',
            navigator.hardwareConcurrency || '',
            navigator.deviceMemory || '',
            navigator.maxTouchPoints || 0
        ];
        var raw = parts.join('|');
        if (window.crypto && window.crypto.subtle && window.crypto.subtle.digest) {
            var hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
            var hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
        }
    } catch(e) { console.warn('[fingerprint]', e); }
    var raw2 = (navigator.userAgent || '') + (screen.width || 0) + (screen.height || 0) + ((new Date()).getTimezoneOffset());
    var hash = 0;
    for (var i = 0; i < raw2.length; i++) { hash = ((hash << 5) - hash) + raw2.charCodeAt(i); hash |= 0; }
    return 'fp_' + Math.abs(hash).toString(16);
}

async function getIPAddress() {
    try {
        var controller = new AbortController();
        var timeout = setTimeout(function() { controller.abort(); }, 3000);
        var res = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
        clearTimeout(timeout);
        var data = await res.json();
        return data.ip || null;
    } catch(e) { return null; }
}

function getBrowserInfo() {
    var ua = navigator.userAgent;
    var browser = 'Unknown', os = 'Unknown';
    if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
    else if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
    else if (ua.indexOf('Safari') > -1) browser = 'Safari';
    else if (ua.indexOf('Edge') > -1) browser = 'Edge';
    if (ua.indexOf('Windows') > -1) os = 'Windows';
    else if (ua.indexOf('Mac') > -1) os = 'MacOS';
    else if (ua.indexOf('Linux') > -1) os = 'Linux';
    else if (ua.indexOf('Android') > -1) os = 'Android';
    else if (ua.indexOf('iOS') > -1 || ua.indexOf('iPhone') > -1) os = 'iOS';
    return {
        browser: browser,
        os: os,
        screen: (screen.width || 0) + 'x' + (screen.height || 0),
        language: navigator.language || '',
        timezone: (Intl.DateTimeFormat().resolvedOptions().timeZone) || ''
    };
}

function showSignup(e) {
    if (e) e.preventDefault();
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('signup-screen').classList.remove('hidden');
}
function showLogin(e) {
    if (e) e.preventDefault();
    document.getElementById('signup-screen').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
}

// ✅ التسجيل الكامل (بصمة + مكافأة + استعادة)
async function doSignup() {
    var n = document.getElementById('signup-name').value.trim();
    var e = document.getElementById('signup-email').value.trim();
    var p = document.getElementById('signup-phone').value.trim();
    var pw = document.getElementById('signup-password').value;
    var r = document.getElementById('signup-role').value;

    if (!n || !e || !p || !pw) return Swal.fire(t('alert'), t('fill_fields'), 'warning');
    var pwErr = validatePassword(pw);
    if (pwErr) return Swal.fire(t('alert'), pwErr, 'warning');

    try {
        Swal.fire({ title: 'جاري التحقق من الجهاز...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
        var fingerprint = await getDeviceFingerprint();
        var ipAddress = await getIPAddress();
        var browserInfo = getBrowserInfo();

        try {
            var checkRes = await _supabase.rpc('check_device_registered', { p_fingerprint: fingerprint });
            if (!checkRes.error && checkRes.data && checkRes.data.registered) {
                var registeredEmail = checkRes.data.email || 'بريد آخر';
                return Swal.fire({
                    title: '⚠️ جهاز مسجل مسبقاً',
                    html: '<div style="text-align:right; line-height:1.9; font-size:15px;">' +
                        '<p>هذا الجهاز مسجل بالفعل بحساب آخر <b dir="ltr" style="color:var(--accent);">(' + escHtml(registeredEmail) + ')</b>.</p>' +
                        '<p style="background:#fef3c7; padding:10px; border-radius:8px; border-right:3px solid #f59e0b; font-size:13px;">' +
                        '<i class="fa-solid fa-circle-info"></i> مسموح بحساب واحد فقط لكل جهاز.</p>' +
                        '<p style="font-size:12px; color:#666; margin-top:10px;">إذا كان حسابك السابق معطلاً، تواصل مع الإدارة.</p>' +
                        '</div>',
                    icon: 'warning', confirmButtonText: 'حسناً', confirmButtonColor: '#e74c3c'
                });
            }
        } catch(checkErr) { console.warn('[device check]', checkErr); }

        Swal.fire({ title: t('creating'), allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
        var res = await _supabase.auth.signUp({ email: e, password: pw, options: { data: { full_name: n, role: r, phone: p } } });
        if (res.error) return Swal.fire(t('error'), res.error.message, 'error');

        if (res.data && res.data.user) {
            try {
                await _supabase.rpc('register_device', {
                    p_fingerprint: fingerprint, p_email: e,
                    p_user_id: res.data.user.id, p_ip: ipAddress, p_browser_info: browserInfo
                });
            } catch(regErr) { console.warn('[device register]', regErr); }

            var recoveryData = {
                user_id: res.data.user.id,
                national_id: (document.getElementById('signup-national-id') || {}).value || null,
                id_card_number: (document.getElementById('signup-id-card') || {}).value || null,
                passport_number: (document.getElementById('signup-passport') || {}).value || null,
                bank_name: (document.getElementById('signup-bank-name') || {}).value || null,
                bank_branch: (document.getElementById('signup-bank-branch') || {}).value || null,
                bank_account: (document.getElementById('signup-bank-account') || {}).value || null,
                iban: (document.getElementById('signup-iban') || {}).value || null,
                phone_registered: p
            };
            var hasRecoveryData = ['national_id','id_card_number','passport_number','bank_name','bank_branch','bank_account','iban']
                .some(function(k) { return recoveryData[k]; });
            if (hasRecoveryData) {
                try { await _supabase.from('account_recovery').insert([recoveryData]); }
                catch(recErr) { console.warn('[recovery save]', recErr); }
            }

            var bonusResult = null;
            try {
                var bonusRes = await _supabase.rpc('grant_welcome_bonus_to_user', { p_user_id: res.data.user.id });
                if (bonusRes && bonusRes.data) bonusResult = bonusRes.data;
            } catch(bonusErr) { console.warn('[welcome bonus]', bonusErr); }

            var bonusHtml = '';
            if (bonusResult && bonusResult.success) {
                bonusHtml = '<div style="background:linear-gradient(135deg,#667eea,#764ba2); color:white; padding:18px; border-radius:14px; margin:15px 0; box-shadow:0 6px 20px rgba(102,126,234,0.3);">' +
                    '<div style="font-size:11px; opacity:0.85;">🎁 مكافأة ترحيبية</div>' +
                    '<div style="font-size:36px; font-weight:bold; margin:5px 0;">+2 <span style="font-size:16px;">د.ل</span></div>' +
                    '<div style="font-size:12px; opacity:0.9;">أُضيفت تلقائياً إلى محفظتك</div></div>';
            } else if (bonusResult && bonusResult.message === 'insufficient_admin_balance') {
                bonusHtml = '<div style="background:#fff3cd; color:#856404; padding:12px; border-radius:10px; margin:15px 0; font-size:13px; border-right:3px solid #f59e0b;">⚠️ مكافأة الترحيب غير متاحة حالياً (رصيد الإدارة غير كافٍ).</div>';
            }

            Swal.fire({
                title: '🎉 أهلاً بك!',
                html: '<div style="text-align:center; line-height:1.9;">' +
                    '<p style="font-size:16px; margin-bottom:15px;">تم إنشاء حسابك بنجاح!</p>' +
                    bonusHtml +
                    '<div style="background:#e8f5e9; padding:10px; border-radius:8px; font-size:13px; color:#2e7d32; border-right:3px solid #27ae60;">' +
                    '<i class="fa-solid fa-envelope-circle-check"></i> يرجى تفقد بريدك الإلكتروني لتأكيد الحساب، ثم سجّل الدخول.</div></div>',
                icon: 'success', confirmButtonText: 'حسناً، فهمت', width: 420
            });
        }

        document.getElementById('signup-screen').classList.add('hidden');
        document.getElementById('login-screen').classList.remove('hidden');
    } catch(err) {
        console.error('[signup]', err);
        handleError(err);
    }
}


// ============================================================
// app.js — الجزء 4 من 8: الدخول + الخروج + الملف الشخصي
// ============================================================

function doLogin() {
    var email = document.getElementById('login-email').value.trim();
    var password = document.getElementById('login-password').value;
    if (!email || !password) return Swal.fire(t('alert'), t('fill_fields'), 'warning');
    Swal.fire({ title: t('verifying'), allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
    _supabase.auth.signInWithPassword({ email: email, password: password }).then(function(res) {
        if (res.error) { Swal.fire(t('login_failed'), res.error.message, 'error'); return; }
        _supabase.from('profiles').select('*').eq('id', res.data.user.id).maybeSingle().then(function(pRes) {
            _supabase.from('platform_settings').select('*').eq('id', 1).maybeSingle().then(function(sRes) {
                Swal.close();
                if (!pRes.data) { Swal.fire(t('error'), t('profile_not_found'), 'error'); return; }
                currentUser = res.data.user;
                userProfile = pRes.data;
                platformSettings = sRes.data || {};
                setupUI();
                navTo('home');
            });
        });
    });
}

function setupUI() {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');
    document.getElementById('nav-admin').classList.add('hidden');
    document.getElementById('nav-services').classList.remove('hidden');
    document.getElementById('nav-orders').classList.remove('hidden');
    if (userProfile.role === 'admin') {
        document.getElementById('nav-admin').classList.remove('hidden');
        document.getElementById('nav-services').classList.add('hidden');
        document.getElementById('nav-orders').classList.add('hidden');
    }
    applyTranslations();
    startLiveTimers();
    if (typeof loadNotifications === 'function') loadNotifications();
    if (typeof updateCartBadge === 'function') updateCartBadge();
    if (userProfile.role === 'admin') startAdminRealtimeListeners();
}

// ✅ تسجيل خروج مع تأكيد + إصلاح مشكلة البقاء
function doLogout() {
    Swal.fire({
        title: '🚪 تسجيل الخروج',
        text: t('logout_confirm'),
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: t('yes_logout'),
        cancelButtonText: t('cancel'),
        confirmButtonColor: '#e74c3c'
    }).then(function(r) {
        if (!r.isConfirmed) return;
        Swal.fire({ title: 'جاري تسجيل الخروج...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
        try {
            if (typeof adminWithdrawChannel !== 'undefined' && adminWithdrawChannel) _supabase.removeChannel(adminWithdrawChannel);
            if (typeof adminTransferChannel !== 'undefined' && adminTransferChannel) _supabase.removeChannel(adminTransferChannel);
            if (typeof adminWithdrawalUpdatesChannel !== 'undefined' && adminWithdrawalUpdatesChannel) _supabase.removeChannel(adminWithdrawalUpdatesChannel);
        } catch(e) { console.warn(e); }

        _supabase.auth.signOut().then(function() {
            try { localStorage.removeItem('sb-ggaxlmhzdeczhgyjwyct-auth-token'); } catch(e) {}
            try { sessionStorage.clear(); } catch(e) {}
            location.reload();
        }).catch(function(err) {
            console.warn('[logout]', err);
            try { localStorage.removeItem('sb-ggaxlmhzdeczhgyjwyct-auth-token'); } catch(e) {}
            location.reload();
        });
    });
}

function showProfile() {
    if (!userProfile) return;
    _supabase.from('wallets').select('balance').eq('user_id', currentUser.id).maybeSingle().then(function(w) {
        var bal = w.data ? Number(w.data.balance).toFixed(2) : '0.00';
        var created = userProfile.created_at ? new Date(userProfile.created_at).toLocaleDateString('ar-EG') : '-';
        var html = '<div style="text-align:right; line-height: 2; font-size:15px;">' +
            '<div style="background:var(--card-bg); padding:15px; border-radius:10px; border:1px solid #ddd;">' +
            '<p><i class="fa-solid fa-user" style="color:var(--primary);"></i> <b>' + t('name') + ':</b> ' + escHtml(userProfile.full_name) + '</p>' +
            '<p><i class="fa-solid fa-envelope" style="color:var(--primary);"></i> <b>' + t('email') + ':</b> <span dir="ltr">' + escHtml(userProfile.email) + '</span></p>' +
            '<p><i class="fa-solid fa-phone" style="color:var(--primary);"></i> <b>' + t('phone') + ':</b> <span dir="ltr">' + escHtml(userProfile.phone || '-') + '</span></p>' +
            '<p><i class="fa-solid fa-id-badge" style="color:var(--primary);"></i> <b>' + t('role') + ':</b> ' + t('role_' + userProfile.role) + '</p>' +
            '<p><i class="fa-solid fa-wallet" style="color:var(--accent);"></i> <b>' + t('balance_title') + ':</b> <b style="color:var(--accent);">' + bal + ' ' + t('currency') + '</b></p>' +
            '<p><i class="fa-regular fa-calendar" style="color:var(--primary);"></i> <b>' + t('date_joined') + ':</b> ' + created + '</p>' +
            '</div></div>';
        Swal.fire({ title: t('profile'), html: html, confirmButtonText: t('close') });
    });
}


// ============================================================
// app.js — الجزء 5 من 8: الاستعادة + التنقل
// ============================================================

// ✅ استعادة كلمة المرور
function showForgotPassword() {
    Swal.fire({
        title: '🔐 نسيت كلمة المرور',
        html: '<p style="font-size:13px; margin-bottom:15px; text-align:right;">أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين.</p>' +
              '<input id="forgot-email-input" class="swal2-input" type="email" placeholder="بريدك الإلكتروني">',
        confirmButtonText: 'إرسال رابط الاستعادة',
        cancelButtonText: t('cancel'),
        showCancelButton: true,
        preConfirm: function() {
            var em = document.getElementById('forgot-email-input').value.trim();
            if (!em) { Swal.showValidationMessage('أدخل بريدك الإلكتروني'); return false; }
            if (!/^\S+@\S+\.\S+$/.test(em)) { Swal.showValidationMessage('بريد غير صالح'); return false; }
            return em;
        }
    }).then(function(r) {
        if (!r.isConfirmed) return;
        Swal.fire({ title: 'جاري الإرسال...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
        var redirectUrl = window.location.origin + window.location.pathname + '?reset=1';
        _supabase.auth.resetPasswordForEmail(r.value, { redirectTo: redirectUrl }).then(function(res) {
            if (res.error) return Swal.fire(t('error'), res.error.message, 'error');
            Swal.fire({
                title: '✅ تم الإرسال',
                html: '<p style="text-align:right; line-height:1.9;">راجع بريدك الإلكتروني <b dir="ltr">' + escHtml(r.value) + '</b><br>واضغط على الرابط لإعادة تعيين كلمة المرور.</p>' +
                      '<p style="font-size:12px; color:#666; margin-top:10px;">إذا لم تجد الرسالة، تحقق من مجلد الرسائل غير المرغوبة (Spam).</p>',
                icon: 'success'
            });
        }).catch(handleError);
    });
}

// ✅ شاشة تغيير كلمة المرور الإجبارية (بعد رابط الاستعادة)
function showForcedPasswordChange() {
    Swal.fire({
        title: '🔐 تعيين كلمة مرور جديدة',
        html: '<p style="font-size:13px; margin-bottom:15px; text-align:right;">يجب تعيين كلمة مرور جديدة لإكمال العملية.</p>' +
              '<input id="new-pw-1" class="swal2-input" type="password" placeholder="كلمة المرور الجديدة">' +
              '<input id="new-pw-2" class="swal2-input" type="password" placeholder="تأكيد كلمة المرور">' +
              '<p style="font-size:11px; color:#666; text-align:right; margin-top:10px;">8 أحرف على الأقل، حرف كبير، حرف صغير، رقم</p>',
        confirmButtonText: 'تغيير كلمة المرور',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: true,
        cancelButtonText: 'تسجيل الخروج',
        preConfirm: function() {
            var pw1 = document.getElementById('new-pw-1').value;
            var pw2 = document.getElementById('new-pw-2').value;
            if (pw1 !== pw2) { Swal.showValidationMessage('كلمتا المرور غير متطابقتين'); return false; }
            var err = validatePassword(pw1);
            if (err) { Swal.showValidationMessage(err); return false; }
            return pw1;
        }
    }).then(function(r) {
        if (r.dismiss === Swal.DismissReason.cancel) {
            _supabase.auth.signOut().then(function() { location.reload(); });
            return;
        }
        if (!r.isConfirmed) return;
        Swal.fire({ title: 'جاري التغيير...', didOpen: function() { Swal.showLoading(); } });
        _supabase.auth.updateUser({ password: r.value }).then(function(res) {
            if (res.error) return Swal.fire(t('error'), res.error.message, 'error');
            Swal.fire('✅ تم', 'تم تغيير كلمة المرور بنجاح. يمكنك الآن استخدامها للدخول.', 'success').then(function() {
                _supabase.auth.signOut().then(function() { location.reload(); });
            });
        }).catch(handleError);
    });
}

// ✅ استعادة البريد الإلكتروني (بالحقول الأمنية)
function showForgotEmail() {
    Swal.fire({
        title: '📧 نسيت بريدك الإلكتروني',
        html: '<p style="font-size:13px; margin-bottom:15px; text-align:right;">أدخل البيانات التي سجلتها لاستعادة بريدك.<br><b>رقم الهاتف إجباري</b>، وباقي الحقول املأ ما تتذكره.</p>' +
              '<input id="rec-phone" class="swal2-input" type="tel" placeholder="رقم الهاتف المسجل *">' +
              '<input id="rec-national" class="swal2-input" placeholder="الرقم الوطني">' +
              '<input id="rec-id-card" class="swal2-input" placeholder="رقم بطاقة التعريف">' +
              '<input id="rec-passport" class="swal2-input" placeholder="رقم جواز السفر">' +
              '<input id="rec-bank-name" class="swal2-input" placeholder="اسم المصرف">' +
              '<input id="rec-bank-branch" class="swal2-input" placeholder="الفرع">' +
              '<input id="rec-bank-account" class="swal2-input" placeholder="رقم الحساب المصرفي">' +
              '<input id="rec-iban" class="swal2-input" placeholder="IBAN" dir="ltr">',
        confirmButtonText: 'بحث',
        cancelButtonText: t('cancel'),
        showCancelButton: true,
        width: 500,
        preConfirm: function() {
            var ph = document.getElementById('rec-phone').value.trim();
            if (!ph || ph.length < 5) { Swal.showValidationMessage('رقم الهاتف مطلوب'); return false; }
            return {
                p_phone: ph,
                p_national_id: document.getElementById('rec-national').value.trim() || null,
                p_id_card: document.getElementById('rec-id-card').value.trim() || null,
                p_passport: document.getElementById('rec-passport').value.trim() || null,
                p_bank_name: document.getElementById('rec-bank-name').value.trim() || null,
                p_bank_branch: document.getElementById('rec-bank-branch').value.trim() || null,
                p_bank_account: document.getElementById('rec-bank-account').value.trim() || null,
                p_iban: document.getElementById('rec-iban').value.trim() || null
            };
        }
    }).then(function(r) {
        if (!r.isConfirmed) return;
        Swal.fire({ title: 'جاري البحث...', didOpen: function() { Swal.showLoading(); } });
        _supabase.rpc('recover_email_by_security', r.value).then(function(res) {
            if (res.error) return Swal.fire(t('error'), res.error.message, 'error');
            var d = res.data;
            if (!d || !d.success) {
                var msg = 'لم يتم العثور على حساب مطابق. تأكد من البيانات أو تواصل مع الإدارة.';
                if (d && d.message === 'too_many_attempts') msg = 'محاولات كثيرة. حاول بعد ساعة.';
                else if (d && d.message === 'multiple_matches') msg = 'يوجد أكثر من حساب مطابق. تواصل مع الإدارة.';
                else if (d && d.message === 'phone_required') msg = 'رقم الهاتف مطلوب.';
                return Swal.fire('❌', msg, 'warning');
            }
            Swal.fire({
                title: '✅ تم العثور على حسابك',
                html: '<p style="font-size:13px; text-align:right; margin-bottom:10px;">بريدك الإلكتروني هو:</p>' +
                      '<div style="background:#e8f5e9; padding:15px; border-radius:10px; border:2px solid #27ae60;">' +
                      '<div dir="ltr" style="font-family:monospace; font-size:15px; font-weight:bold; color:#2e7d32; word-break:break-all;">' + escHtml(d.email) + '</div>' +
                      '</div>' +
                      '<p style="font-size:12px; color:#666; margin-top:15px;">إذا نسيت كلمة المرور أيضاً، اضغط على "نسيت كلمة المرور؟" في شاشة الدخول.</p>',
                icon: 'success',
                confirmButtonText: 'نسخ البريد',
                showCancelButton: true,
                cancelButtonText: 'إغلاق'
            }).then(function(cr) {
                if (cr.isConfirmed && navigator.clipboard) {
                    navigator.clipboard.writeText(d.email).then(function() {
                        Swal.fire({ title: 'تم النسخ', icon: 'success', timer: 1200, showConfirmButton: false });
                    });
                }
            });
        }).catch(handleError);
    });
}

// ================= 6. التنقل =================
function navTo(page) {
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) pages[i].classList.add('hidden');
    var target = document.getElementById('page-' + page);
    if (target) target.classList.remove('hidden');
    var navs = document.querySelectorAll('.nav-item');
    for (var j = 0; j < navs.length; j++) navs[j].classList.remove('active');
    var navTarget = document.getElementById('nav-' + page);
    if (navTarget) navTarget.classList.add('active');
    if (page === 'home') renderHome();
    if (page === 'wallet') renderWallet();
    if (page === 'services') renderServices();
    if (page === 'orders') renderOrders();
    if (page === 'messages') renderMessages();
    if (page === 'admin') renderAdmin();
    if (page === 'cards') renderCardsPage();
    if (page === 'cart') renderCart();
    if (page === 'my-purchases') renderMyPurchases();
}


// ============================================================
// app.js — الجزء 6 من 9: الرئيسية + المحفظة
// ============================================================

// ================= 7. الرئيسية والإعلانات =================
var adsList = [];
var adDuration = 5000;
var adSpeed = 300;
var adTimer = null;
var progressInterval = null;
var currentAdIndex = 0;
var adRemainingTime = 0;
var isAdPaused = false;
var adStartTime = 0;

function renderHome() {
    _supabase.from('wallets').select('balance').eq('user_id', currentUser.id).maybeSingle().then(function(wRes) {
        var bal = wRes.data ? Number(wRes.data.balance).toFixed(2) : '0.00';
        var savedSec = localStorage.getItem('ad_duration_sec'); if (savedSec) adDuration = Number(savedSec) * 1000;
        var savedSpeed = localStorage.getItem('ad_speed_ms'); if (savedSpeed) adSpeed = Number(savedSpeed);
        _supabase.from('ads').select('*').order('created_at', { ascending: false }).then(function(adsRes) {
            adsList = adsRes.data || [];
            var adsHtml = '';
            if (adsList.length > 0) {
                var bars = '';
                for (var i = 0; i < adsList.length; i++) {
                    bars += '<div style="flex:1; height:3px; background:rgba(150,150,150,0.3); border-radius:3px; overflow:hidden;"><div id="ad-bar-' + i + '" style="width:0%; height:100%; background:var(--accent); transition:width 0.1s linear;"></div></div>';
                }
                adsHtml = '<div id="pro-ads-box" style="margin: 0 auto 15px auto; max-width: 100%; user-select: none; -webkit-user-select: none;"><div style="display:flex; gap:5px; margin-bottom:8px; padding:0 5px;">' + bars + '</div><div id="ads-touch-area" style="position:relative; width:100%; border-radius:15px; overflow:hidden; cursor:pointer; touch-action:pan-y; text-align:center;"><img id="current-ad-img" src="' + escHtml(adsList[0].image_url || '') + '" style="width:100%; max-height:190px; object-fit:cover; border-radius:15px; display:block; margin:0 auto; transition:opacity ' + adSpeed + 'ms ease;"></div></div>';
            }
            var c = adsHtml + '<div class="card" style="text-align:center; background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: white;"><p style="font-size:14px; font-weight:600; opacity:0.9;">' + t('welcome') + escHtml(userProfile.full_name) + '</p><div class="balance" style="color:white;">' + bal + ' <span style="font-size:16px;">' + t('currency') + '</span></div><p style="font-size:12px; opacity:0.8;">' + t('balance_title') + '</p></div>';
            if (userProfile.role !== 'admin') {
                c += '<div class="card" style="padding:15px; background:linear-gradient(135deg,#667eea,#764ba2); color:white; cursor:pointer;" onclick="navTo(\'cards\')"><div style="display:flex; justify-content:space-between; align-items:center;"><div><div style="font-size:16px; font-weight:bold;"><i class="fa-solid fa-store"></i> متجر البطاقات</div><div style="font-size:12px; opacity:0.85; margin-top:3px;">بطاقات، ألعاب، اشتراكات...</div></div><i class="fa-solid fa-chevron-left" style="font-size:20px;"></i></div></div>';
            }
            if (userProfile.role === 'provider') {
                c += '<button class="btn btn-accent" onclick="showAddService()"><i class="fa-solid fa-plus"></i> ' + t('add_service') + '</button>';
            } else if (userProfile.role === 'user') {
                c += '<div class="grid-2"><button class="btn btn-accent" onclick="navTo(\'wallet\')"><i class="fa-solid fa-plus-circle"></i> ' + t('deposit') + '</button><button class="btn btn-primary" onclick="navTo(\'services\')"><i class="fa-solid fa-search"></i> ' + t('request_service') + '</button></div>';
            } else if (userProfile.role === 'admin') {
                c += '<button class="btn btn-accent" onclick="navTo(\'admin\')"><i class="fa-solid fa-shield-halved"></i> ' + t('admin_panel_btn') + '</button>';
            }
            document.getElementById('page-home').innerHTML = c;
            if (adsList.length > 0) { setupProAdsControls(); showProAdSlide(0); }
        });
    });
}

function showProAdSlide(index) {
    clearTimeout(adTimer); clearInterval(progressInterval);
    if (adsList.length === 0) return;
    if (index >= adsList.length) index = 0;
    if (index < 0) index = adsList.length - 1;
    currentAdIndex = index;
    var imgEl = document.getElementById('current-ad-img');
    if (imgEl) {
        imgEl.style.transition = 'opacity ' + adSpeed + 'ms ease';
        imgEl.style.opacity = '0';
        setTimeout(function() {
            imgEl.src = adsList[currentAdIndex].image_url;
            imgEl.style.opacity = '1';
        }, adSpeed);
    }
    for (var i = 0; i < adsList.length; i++) {
        var bar = document.getElementById('ad-bar-' + i);
        if (bar) { if (i < currentAdIndex) bar.style.width = '100%'; else bar.style.width = '0%'; }
    }
    adRemainingTime = adDuration;
    startProAdTimer();
}

function startProAdTimer() {
    isAdPaused = false;
    adStartTime = Date.now();
    var currentBar = document.getElementById('ad-bar-' + currentAdIndex);
    progressInterval = setInterval(function() {
        if (!isAdPaused) {
            var elapsed = Date.now() - adStartTime;
            var totalElapsed = (adDuration - adRemainingTime) + elapsed;
            var percent = Math.min((totalElapsed / adDuration) * 100, 100);
            if (currentBar) currentBar.style.width = percent + '%';
        }
    }, 50);
    adTimer = setTimeout(function() { showProAdSlide(currentAdIndex + 1); }, adRemainingTime);
}

function pauseProAd() {
    if (isAdPaused) return;
    isAdPaused = true;
    clearTimeout(adTimer);
    clearInterval(progressInterval);
    adRemainingTime -= (Date.now() - adStartTime);
    if (adRemainingTime < 0) adRemainingTime = 0;
}

function resumeProAd() {
    if (!isAdPaused) return;
    startProAdTimer();
}

function setupProAdsControls() {
    var box = document.getElementById('ads-touch-area');
    if (!box) return;
    var touchStartX = 0;
    box.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; pauseProAd(); }, { passive: true });
    box.addEventListener('touchend', function(e) {
        var touchEndX = e.changedTouches[0].clientX;
        var diff = touchStartX - touchEndX;
        resumeProAd();
        if (Math.abs(diff) > 40) {
            if (diff > 0) showProAdSlide(currentAdIndex + 1);
            else showProAdSlide(currentAdIndex - 1);
        }
    });
    box.addEventListener('mousedown', pauseProAd);
    box.addEventListener('mouseup', resumeProAd);
    box.addEventListener('mouseleave', function() { if (isAdPaused) resumeProAd(); });
}

// ================= 8. المحفظة (مع التبويبات السفلية) =================
function renderWallet() {
    _supabase.from('wallets').select('id, balance').eq('user_id', currentUser.id).maybeSingle().then(function(wRes) {
        if (!wRes.data) {
            document.getElementById('page-wallet').innerHTML = '<div class="card"><p style="text-align:center;">' + t('error') + ' — لا توجد محفظة</p></div>';
            return;
        }
        var bal = Number(wRes.data.balance).toFixed(2);
        var walletId = wRes.data.id;

        Promise.all([
            _supabase.from('transactions').select('*').eq('wallet_id', walletId).order('created_at', { ascending: false }).limit(30),
            _supabase.from('withdrawals').select('*').eq('user_id', currentUser.id).order('created_at', { ascending: false }).limit(15),
            _supabase.from('bank_transfers').select('*').eq('user_id', currentUser.id).order('created_at', { ascending: false }).limit(15)
        ]).then(function(results) {
            var txRes = results[0];
            var wdRes = results[1];
            var btRes = results[2];

            var balCard = '<div class="card" style="text-align:center; background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: white; margin-bottom:15px;"><p style="font-size:14px; opacity:0.9;">' + t('balance_title') + '</p><div style="font-size:32px; font-weight:bold;">' + bal + ' <span style="font-size:16px;">' + t('currency') + '</span></div></div>';

            var tabsHtml = '<div class="card"><div class="tabs">' +
                '<div class="tab active" onclick="switchTab(this, \'w-card\')">' + t('tab_card') + '</div>' +
                '<div class="tab" onclick="switchTab(this, \'w-bank\')">' + t('tab_bank') + '</div>' +
                '<div class="tab" onclick="switchTab(this, \'w-with\')">' + t('tab_withdraw') + '</div>' +
                '<div class="tab" onclick="switchTab(this, \'w-trans\')">' + t('tab_transfer') + '</div>' +
                '</div>' +
                '<div id="w-card"><input type="text" id="card-code" placeholder="' + t('card_code') + '"><button class="btn btn-primary" onclick="redeemCard()">' + t('confirm') + '</button></div>' +
                '<div id="w-bank" class="hidden"><div class="bank-details"><p><span>' + t('bank') + ':</span> ' + escHtml(platformSettings.bank_name || '-') + '</p><p><span>' + t('name') + ':</span> ' + escHtml(platformSettings.account_name || '-') + '</p><p><span>' + t('account') + ':</span> ' + escHtml(platformSettings.account_number || '-') + '</p><p><span>IBAN:</span> ' + escHtml(platformSettings.iban || '-') + '</p></div>' +
                '<input type="number" id="bank-amt" placeholder="' + t('transfer_amt') + '">' +
                '<input type="text" id="bank-name" value="' + escHtml(userProfile.full_name || '') + '" placeholder="' + t('full_name') + '">' +
                '<input type="text" id="bank-name-target" placeholder="' + t('bank_name') + '">' +
                '<input type="text" id="bank-branch" placeholder="' + t('branch') + '">' +
                '<input type="text" id="bank-acc" placeholder="' + t('acc_num') + '">' +
                '<input type="text" id="bank-iban" placeholder="' + t('iban') + '" dir="ltr">' +
                '<input type="file" id="bank-file" accept="image/*,application/pdf" style="background:var(--card-bg);"><button class="btn btn-accent" onclick="submitBankTransfer()">' + t('send_review') + '</button></div>' +
                '<div id="w-with" class="hidden"><p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">' + t('withdraw_note') + '</p>' +
                '<input type="number" id="with-amt" placeholder="' + t('amount') + '">' +
                '<input type="text" id="with-name" value="' + escHtml(userProfile.full_name || '') + '" placeholder="' + t('full_name') + '">' +
                '<input type="text" id="with-bank" placeholder="' + t('bank_name') + '">' +
                '<input type="text" id="with-branch" placeholder="' + t('branch') + '">' +
                '<input type="text" id="with-acc" placeholder="' + t('acc_num') + '">' +
                '<input type="text" id="with-iban" placeholder="' + t('iban') + '" dir="ltr">' +
                '<button class="btn btn-primary" onclick="requestWithdrawal()">' + t('send') + '</button></div>' +
                '<div id="w-trans" class="hidden"><p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">' + t('transfer_note') + '</p><input type="text" id="trans-phone" placeholder="' + t('phone') + '"><button class="btn btn-accent" onclick="searchPhone()">' + t('search') + '</button><div id="trans-result" style="font-weight:bold; color:var(--primary); margin-bottom:10px;"></div><input type="number" id="trans-amt" placeholder="' + t('amount') + '"><button class="btn btn-primary" onclick="executeTransfer()">' + t('transfer_now') + '</button></div></div>';

            var bottomTabs = '<div class="wallet-bottom-tabs">' +
                '<div class="wallet-bottom-tab active" onclick="switchWalletBottomTab(\'requests\')">' + t('tab_requests') + '</div>' +
                '<div class="wallet-bottom-tab" onclick="switchWalletBottomTab(\'transactions\')">' + t('tab_transactions') + '</div>' +
                '</div>';

            var requestsSection = renderWalletRequestsSection(wdRes.data, btRes.data);
            var txSection = renderWalletTransactionsSection(txRes.data);

            document.getElementById('page-wallet').innerHTML = balCard + tabsHtml + bottomTabs +
                '<div id="wallet-requests-section">' + requestsSection + '</div>' +
                '<div id="wallet-transactions-section" class="hidden">' + txSection + '</div>';
        });
    });
}

function switchWalletBottomTab(tab) {
    var tabs = document.querySelectorAll('.wallet-bottom-tab');
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
    if (event && event.target) event.target.classList.add('active');
    var reqSec = document.getElementById('wallet-requests-section');
    var txSec = document.getElementById('wallet-transactions-section');
    if (tab === 'requests') {
        if (reqSec) reqSec.classList.remove('hidden');
        if (txSec) txSec.classList.add('hidden');
    } else {
        if (reqSec) reqSec.classList.add('hidden');
        if (txSec) txSec.classList.remove('hidden');
    }
}


// ============================================================
// app.js — الجزء 7 من 9: عرض طلبات المحفظة + المعاملات + العمليات
// ============================================================

// ✅ عرض طلبات السحب والإيداع (مع التاريخ + الوقت النسبي)
function renderWalletRequestsSection(wdData, btData) {
    var allReqs = [];
    if (wdData) wdData.forEach(function(w) { w.reqType = 'سحب'; allReqs.push(w); });
    if (btData) btData.forEach(function(b) { b.reqType = 'إيداع'; allReqs.push(b); });
    allReqs.sort(function(a, b) { return new Date(b.created_at) - new Date(a.created_at); });

    if (!allReqs.length) {
        return '<div class="card" style="text-align:center; padding:20px;"><p style="color:var(--text-muted); font-size:13px;">لا توجد طلبات سحب أو إيداع.</p></div>';
    }

    var html = '<div class="card"><h4 style="margin-bottom:15px; color:var(--primary);"><i class="fa-solid fa-list-check"></i> طلبات السحب والإيداع</h4>';

    allReqs.forEach(function(req) {
        var isPending = req.status === 'pending';
        var isProcessing = req.status === 'processing';
        var isRejected = req.status === 'rejected';
        var isCancelled = req.status === 'cancelled';
        var isCompleted = req.status === 'completed' || req.status === 'approved';

        var statusText = '';
        var statusColor = '';
        if (isPending) { statusText = '🟠 في انتظار الموافقة'; statusColor = '#f39c12'; }
        else if (isProcessing) { statusText = '🔵 قيد المعالجة'; statusColor = '#3498db'; }
        else if (isRejected) { statusText = '🔴 مرفوض'; statusColor = '#e74c3c'; }
        else if (isCancelled) { statusText = '⚫ ملغي'; statusColor = '#7f8c8d'; }
        else if (isCompleted) { statusText = '🟢 مكتمل'; statusColor = '#27ae60'; }

        var d = parseBankDetails(req.bank_details);
        var createdDate = new Date(req.created_at);
        var absDate = createdDate.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        var absTime = createdDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

        html += '<div style="border:1px solid #ddd; border-radius:8px; padding:12px; margin-bottom:10px; border-right:4px solid ' + statusColor + ';">' +
            '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">' +
                '<span style="background:' + statusColor + '; color:white; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold;">' + statusText + ' (' + req.reqType + ')</span>' +
                '<strong style="color:var(--accent);">' + escHtml(req.amount) + ' ' + t('currency') + '</strong>' +
            '</div>' +
            '<div style="font-size:11px; color:var(--text-muted); margin-bottom:8px; padding-bottom:6px; border-bottom:1px dashed #ddd; line-height:1.6;">' +
                '<div><i class="fa-regular fa-calendar"></i> <b>تاريخ الطلب:</b> ' + absDate + ' - ' + absTime + '</div>' +
                '<div style="color:var(--accent); margin-top:3px;"><i class="fa-solid fa-clock-rotate-left"></i> <span data-rel-time="' + req.created_at + '">' + getRelativeTime(createdDate) + '</span></div>' +
            '</div>';

        if (req.reqType === 'سحب') {
            html += '<div style="font-size:12px; line-height:1.7; color:var(--text-muted); margin-bottom:8px;">' +
                '<div>' + t('bank') + ': <b>' + escHtml(d.bank_name) + '</b> | ' + t('branch') + ': <b>' + escHtml(d.branch) + '</b></div>' +
                '<div>' + t('account') + ': <b dir="ltr">' + escHtml(d.account_number) + '</b></div>' +
                '</div>';
        }

        if (isRejected && req.rejection_reason) {
            html += '<div style="background:#fee; border:1px solid #fcc; padding:8px; border-radius:6px; font-size:13px; color:#c0392b; margin-bottom:8px;"><b>سبب الرفض:</b> ' + escHtml(req.rejection_reason) + '</div>';
        }

        if (req.updated_at && req.updated_at !== req.created_at && !isPending) {
            var updDate = new Date(req.updated_at);
            var updAbs = updDate.toLocaleDateString('ar-EG', { weekday: 'long', month: 'long', day: 'numeric' }) + ' - ' + updDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
            html += '<div style="font-size:11px; color:var(--text-muted); margin-bottom:8px; background:#f0f8ff; padding:6px 8px; border-radius:6px; border-right:3px solid ' + statusColor + ';">' +
                '<i class="fa-solid fa-clock-rotate-left"></i> <b>آخر تحديث:</b> ' + updAbs +
                ' <span data-rel-time="' + req.updated_at + '" style="color:var(--accent);">(' + getRelativeTime(updDate) + ')</span></div>';
        }

        if (isPending && req.reqType === 'سحب') {
            html += '<button class="btn btn-danger btn-sm" style="margin:0; width:100%;" onclick="cancelWithdrawal(\'' + escJs(req.id) + '\')"><i class="fa-solid fa-xmark"></i> ' + t('cancel_request') + '</button>';
        } else if (isProcessing && req.reqType === 'سحب') {
            html += '<div style="font-size:12px; color:#3498db; font-weight:bold; text-align:center;"><i class="fa-solid fa-lock"></i> لا يمكن الإلغاء بعد بدء المعالجة</div>';
        }

        html += '</div>';
    });

    html += '</div>';
    return html;
}

// ✅ عرض سجل المعاملات (مع الوقت النسبي)
function renderWalletTransactionsSection(txData) {
    var html = '<div class="card"><h4 style="margin-bottom:15px; color:var(--primary);"><i class="fa-solid fa-clock-rotate-left"></i> سجل المعاملات المكتملة</h4>';
    if (txData && txData.length > 0) {
        txData.forEach(function(tx) {
            var isAdd = (tx.type === 'deposit' || tx.type === 'earning');
            var icon = isAdd ? 'fa-arrow-down' : 'fa-arrow-up';
            var color = isAdd ? '#27ae60' : '#e74c3c';
            var sign = isAdd ? '+' : '-';
            var typeAr = tx.type === 'deposit' ? 'إيداع / شحن' : (tx.type === 'withdrawal' ? 'سحب' : (tx.type === 'payment' ? 'دفع / خصم' : 'أرباح'));
            var createdDate = new Date(tx.created_at);
            var absDate = createdDate.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

            html += '<div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; padding:12px 0;">' +
                '<div style="display:flex; align-items:center; gap:12px;">' +
                    '<div style="width:40px; height:40px; border-radius:50%; background:' + color + '15; color:' + color + '; display:flex; align-items:center; justify-content:center; font-size:18px;"><i class="fa-solid ' + icon + '"></i></div>' +
                    '<div>' +
                        '<div style="font-weight:bold; font-size:14px; color:var(--text);">' + typeAr + '</div>' +
                        '<div style="font-size:12px; color:var(--text-muted); margin-top:2px;">' + escHtml(tx.reference || 'معاملة مالية') + '</div>' +
                        '<div style="font-size:10px; color:#999; margin-top:4px;"><i class="fa-regular fa-calendar"></i> ' + escHtml(absDate) + '</div>' +
                        '<div style="font-size:10px; color:var(--accent); margin-top:2px;"><span data-rel-time="' + tx.created_at + '">' + getRelativeTime(createdDate) + '</span></div>' +
                    '</div>' +
                '</div>' +
                '<div style="text-align:left;"><div style="font-weight:bold; color:' + color + '; font-size:16px;">' + sign + escHtml(tx.amount) + ' ' + t('currency') + '</div></div>' +
            '</div>';
        });
    } else {
        html += '<p style="text-align:center; color:var(--text-muted); padding:20px 0;">لا توجد معاملات سابقة.</p>';
    }
    html += '</div>';
    return html;
}

function switchTab(el, id) {
    var tabs = el.parentElement.querySelectorAll('.tab');
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
    el.classList.add('active');
    var contents = ['w-card', 'w-bank', 'w-with', 'w-trans'];
    for (var j = 0; j < contents.length; j++) {
        var e = document.getElementById(contents[j]);
        if (e) e.classList.add('hidden');
    }
    var active = document.getElementById(id);
    if (active) active.classList.remove('hidden');
}

function redeemCard() {
    var code = document.getElementById('card-code').value.trim();
    if (!code) return Swal.fire(t('alert'), t('card_code'), 'warning');
    Swal.fire({ title: t('verifying'), didOpen: function() { Swal.showLoading(); } });
    _supabase.rpc('redeem_card', { card_code: code }).then(function(res) {
        if (res.error || !res.data || !res.data.success) {
            return Swal.fire(t('error'), res.error ? res.error.message : t('card_error'), 'error');
        }
        Swal.fire(t('success'), t('card_redeemed'), 'success');
        if (Number(res.data.amount) >= 1000) {
            _supabase.rpc('notify_admins', { p_title: 'Large Deposit', p_message: userProfile.full_name + ' deposited ' + res.data.amount });
        }
        renderWallet();
    }).catch(handleError);
}

function submitBankTransfer() {
    var amount = parseFloat(document.getElementById('bank-amt').value);
    var name = document.getElementById('bank-name').value.trim();
    var bank = document.getElementById('bank-name-target').value.trim();
    var branch = document.getElementById('bank-branch').value.trim();
    var acc = document.getElementById('bank-acc').value.trim();
    var iban = document.getElementById('bank-iban').value.trim();
    var file = document.getElementById('bank-file').files[0];

    if (!amount || !name || !bank || !branch || !acc || !iban || !file) {
        return Swal.fire(t('alert'), t('fill_fields'), 'warning');
    }

    Swal.fire({ title: t('uploading'), didOpen: function() { Swal.showLoading(); } });
    var fileName = Date.now() + '_' + currentUser.id + '.' + file.name.split('.').pop();
    _supabase.storage.from('receipts').upload(fileName, file).then(function(upRes) {
        if (upRes.error) { Swal.fire(t('error'), t('upload_failed'), 'error'); return; }
        var publicUrl = _supabase.storage.from('receipts').getPublicUrl(fileName).data.publicUrl;
        var details = name + ' | ' + bank + ' | ' + branch + ' | ' + acc + ' | ' + iban;
        _supabase.from('bank_transfers').insert([{
            user_id: currentUser.id,
            amount: amount,
            receipt_url: publicUrl,
            bank_details: details,
            status: 'pending'
        }]).then(function(res) {
            if (res.error) return handleError(res.error);
            _supabase.rpc('notify_admins', { p_title: 'Deposit Request', p_message: userProfile.full_name + ' sent ' + amount });
            Swal.fire(t('success'), t('request_sent'), 'success');
            renderWallet();
        });
    });
}

function requestWithdrawal() {
    var amt = parseFloat(document.getElementById('with-amt').value);
    var name = document.getElementById('with-name').value.trim();
    var bank = document.getElementById('with-bank').value.trim();
    var branch = document.getElementById('with-branch').value.trim();
    var acc = document.getElementById('with-acc').value.trim();
    var iban = document.getElementById('with-iban').value.trim();

    if (!amt || !name || !bank || !branch || !acc || !iban) return Swal.fire(t('alert'), t('fill_fields'), 'warning');
    if (amt <= 0) return Swal.fire(t('alert'), 'المبلغ غير صحيح', 'warning');

    Swal.fire({ title: t('sending'), didOpen: function() { Swal.showLoading(); } });
    
    var details = name + ' | ' + bank + ' | ' + branch + ' | ' + acc + ' | ' + iban;

    // استدعاء الدالة الآمنة في قاعدة البيانات
    _supabase.rpc('request_withdrawal_rpc', { 
        p_amount: amt, 
        p_bank_details: details 
    }).then(function(res) {
        if (res.error || !res.data || !res.data.success) {
            var msg = res.error ? res.error.message : (res.data ? res.data.message : 'فشل');
            if (res.data && res.data.message === 'insufficient_balance') msg = 'رصيدك غير كافٍ';
            return Swal.fire('خطأ', msg, 'error');
        }
        
        _supabase.rpc('notify_admins', { p_title: 'Withdrawal Request', p_message: name + ' requests ' + amt });
        Swal.fire(t('success'), 'تم إرسال طلب السحب وتجميد ' + amt + ' ' + t('currency'), 'success');
        renderWallet();
    }).catch(handleError);
}

function cancelWithdrawal(id) {
    _supabase.from('withdrawals').select('status, amount, user_id').eq('id', id).maybeSingle().then(function(r) {
        if (!r.data) return Swal.fire('خطأ', 'الطلب غير موجود', 'error');
        if (r.data.user_id !== currentUser.id) return Swal.fire('خطأ', 'هذا ليس طلبك', 'error');
        if (r.data.status !== 'pending') return Swal.fire('تنبيه', 'لا يمكن الإلغاء. الحالة: ' + r.data.status, 'warning');
        Swal.fire({
            title: 'إلغاء الطلب؟',
            html: 'سيتم إرجاع <b>' + r.data.amount + ' ' + t('currency') + '</b> إلى محفظتك.',
            icon: 'warning', showCancelButton: true, confirmButtonText: 'نعم، إلغاء', cancelButtonText: 'تراجع'
        }).then(function(conf) {
            if (!conf.isConfirmed) return;
            Swal.fire({ title: 'جاري التنفيذ...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
            _supabase.from('withdrawals').update({ status: 'cancelled' }).eq('id', id).eq('status', 'pending').select().then(function(upd) {
                if (upd.error) return handleError(upd.error);
                if (!upd.data || !upd.data.length) return Swal.fire('تنبيه', 'تعذّر الإلغاء.', 'warning').then(function() { renderWallet(); });
                _supabase.from('wallets').select('id, balance').eq('user_id', currentUser.id).maybeSingle().then(function(wr) {
                    if (!wr.data) return handleError(new Error('محفظة غير موجودة'));
                    _supabase.from('wallets').update({ balance: Number(wr.data.balance) + Number(r.data.amount) }).eq('id', wr.data.id).then(function() {
                        _supabase.from('transactions').insert([{ wallet_id: wr.data.id, type: 'deposit', amount: r.data.amount, reference: 'إلغاء طلب سحب' }]);
                        Swal.fire('تم', 'تم إلغاء الطلب وإرجاع المبلغ.', 'success');
                        renderWallet();
                    });
                });
            });
        });
    }).catch(handleError);
}

function searchPhone() {
    var p = document.getElementById('trans-phone').value.trim();
    _supabase.from('profiles').select('full_name').eq('phone', p).maybeSingle().then(function(res) {
        document.getElementById('trans-result').innerText = res.data ? t('name') + ': ' + res.data.full_name : t('number_not_found');
    });
}

function executeTransfer() {
    var p = document.getElementById('trans-phone').value.trim();
    var a = parseFloat(document.getElementById('trans-amt').value);
    if (!p || !a) return Swal.fire(t('alert'), t('fill_fields'), 'warning');
    Swal.fire({ title: t('transferring'), didOpen: function() { Swal.showLoading(); } });
    _supabase.rpc('transfer_money', { p_receiver_phone: p, p_amount: a }).then(function(res) {
        if (res.error || !res.data || !res.data.success) {
            var msg = res.error ? res.error.message : (res.data && res.data.message ? res.data.message : t('error'));
            if (res.data && res.data.message === 'cannot_transfer_to_self') msg = '⚠️ لا يمكن التحويل لنفسك';
            return Swal.fire(t('error'), msg, 'error');
        }
        Swal.fire(t('success'), t('transfer_success'), 'success');
        renderWallet();
    }).catch(handleError);
}


// ============================================================
// app.js — الجزء 8 من 10: الخدمات + المحادثة + الطلبات
// ============================================================

function renderServices() {
    var c = '';
    if (userProfile.role === 'provider') {
        c += '<button class="btn btn-accent" onclick="showAddService()"><i class="fa-solid fa-plus"></i> ' + t('new_service') + '</button>';
        _supabase.from('services').select('*').eq('provider_id', currentUser.id).then(function(res) {
            if (res.data && res.data.length > 0) {
                for (var i = 0; i < res.data.length; i++) {
                    var s = res.data[i];
                    c += '<div class="card" style="padding:15px; margin-bottom:10px;">' + (s.image_url ? '<img src="' + escHtml(s.image_url) + '" style="width:100%; height:120px; object-fit:cover; border-radius:8px; margin-bottom:10px;">' : '') + '<strong>' + escHtml(s.title) + '</strong> - ' + escHtml(s.price) + ' ' + t('currency') + '<p style="font-size:12px; color:var(--text-muted);">' + t('status') + ': ' + (s.status === 'approved' ? '✅ ' + t('approved') : (s.status === 'pending' ? '⏳ ' + t('pending') : '❌ ' + t('rejected'))) + '</p></div>';
                }
            } else {
                c += '<div class="card"><p style="text-align:center;">' + t('no_services') + '</p></div>';
            }
            document.getElementById('page-services').innerHTML = c;
        });
    } else {
        _supabase.from('services').select('*, profiles(full_name)').eq('status', 'approved').then(function(res) {
            if (res.data && res.data.length > 0) {
                for (var i = 0; i < res.data.length; i++) {
                    var s = res.data[i];
                    var providerName = (s.profiles && s.profiles.full_name) ? escAttr(s.profiles.full_name) : 'المزود';
                    c += '<div class="card" style="padding:15px; margin-bottom:10px;">' + (s.image_url ? '<img src="' + escHtml(s.image_url) + '" style="width:100%; height:150px; object-fit:cover; border-radius:8px; margin-bottom:10px;">' : '') + '<h4 style="color:var(--primary); margin-bottom:5px;">' + escHtml(s.title) + '</h4><p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">' + escHtml(s.description || '') + '</p><div style="display:flex; justify-content:space-between; align-items:center;"><strong style="color:var(--accent);">' + escHtml(s.price) + ' ' + t('currency') + '</strong><div style="display:flex; gap:5px;"><button class="btn btn-accent btn-sm" style="margin:0;" onclick="initiateChat(\'' + escJs(s.provider_id) + '\', \'' + providerName + '\')"><i class="fa-solid fa-comment"></i></button><button class="btn btn-primary btn-sm" style="margin:0;" onclick="orderService(\'' + escJs(s.id) + '\')">' + t('request') + '</button></div></div></div>';
                }
            } else {
                c += '<div class="card"><p style="text-align:center;">' + t('no_services_avail') + '</p></div>';
            }
            document.getElementById('page-services').innerHTML = c;
        });
    }
}

function showAddService() {
    Swal.fire({ title: t('add_service_title'), html: '<input id="s-t" class="swal2-input" placeholder="' + t('name') + '"><input id="s-p" class="swal2-input" type="number" placeholder="' + t('price') + '"><textarea id="s-d" class="swal2-textarea" placeholder="' + t('desc') + '"></textarea><input id="s-img" type="file" class="swal2-file" accept="image/*" style="margin-top:10px;">', confirmButtonText: t('send'), showCancelButton: true, cancelButtonText: t('cancel') }).then(function(r) {
        if (r.isConfirmed) {
            var title = document.getElementById('s-t').value;
            var price = document.getElementById('s-p').value;
            var desc = document.getElementById('s-d').value;
            var file = document.getElementById('s-img').files[0];
            if (!title || !price) return Swal.fire(t('alert'), t('fill_fields'), 'warning');
            Swal.fire({ title: t('uploading'), didOpen: function() { Swal.showLoading(); } });
            var processService = function(imageUrl) {
                _supabase.from('services').insert([{ provider_id: currentUser.id, title: title, description: desc, price: parseFloat(price), status: 'pending', image_url: imageUrl }]).then(function(res) {
                    if (res.error) { Swal.fire('خطأ', res.error.message, 'error'); return; }
                    _supabase.rpc('notify_admins', { p_title: 'New Service', p_message: userProfile.full_name + ' added "' + title + '"' });
                    Swal.fire(t('success'), t('request_sent'), 'success');
                    renderServices();
                });
            };
            if (file) {
                var fileName = Date.now() + '_' + currentUser.id + '.' + file.name.split('.').pop();
                _supabase.storage.from('services').upload(fileName, file).then(function(upRes) {
                    if (upRes.error) { Swal.fire('خطأ', upRes.error.message, 'error'); }
                    else { var publicUrl = _supabase.storage.from('services').getPublicUrl(fileName).data.publicUrl; processService(publicUrl); }
                });
            } else { processService(''); }
        }
    });
}

// ✅ طلب الخدمة - محمي بشروط المحادثة
function orderService(id) {
    _supabase.from('services').select('*, profiles(full_name)').eq('id', id).maybeSingle().then(function(sRes) {
        if (!sRes.data) return;
        var s = sRes.data;
        var providerId = s.provider_id;
        var providerName = s.profiles ? s.profiles.full_name : 'المزود';

        _supabase.from('chat_permissions').select('*').eq('client_id', currentUser.id).eq('provider_id', providerId).maybeSingle().then(function(chatRes) {
            if (!chatRes.data || !chatRes.data.expires_at || new Date(chatRes.data.expires_at) < new Date()) {
                return Swal.fire({
                    title: '⚠️ يجب محادثة المزود أولاً',
                    text: 'لفهم الخدمة وتحديد السعر المناسب، يجب فتح محادثة مع المزود.',
                    icon: 'warning', showCancelButton: true,
                    confirmButtonText: '💬 فتح المحادثة', cancelButtonText: 'إلغاء'
                }).then(function(r) {
                    if (r.isConfirmed) initiateChat(providerId, providerName);
                });
            }
            _supabase.from('messages').select('sender_id').or('and(sender_id.eq.' + currentUser.id + ',receiver_id.eq.' + providerId + '),and(sender_id.eq.' + providerId + ',receiver_id.eq.' + currentUser.id + ')').then(function(msgRes) {
                var clientMsgs = 0, providerMsgs = 0;
                (msgRes.data || []).forEach(function(m) {
                    if (m.sender_id === currentUser.id) clientMsgs++;
                    else if (m.sender_id === providerId) providerMsgs++;
                });
                if (clientMsgs === 0 || providerMsgs === 0) {
                    return Swal.fire('⚠️ لم يكتمل التفاهم بعد', 'يجب أن ترسل رسالة وأن يرد المزود قبل الطلب.', 'warning');
                }
                Swal.fire({
                    title: '✅ يمكنك الطلب',
                    html: '<p style="text-align:right; line-height:1.9;">اتفق مع المزود على التفاصيل.<br><br>سيرسل لك المزود <b>عرض سعر</b> عبر المحادثة لتأكيد الدفع.</p>',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: '💬 فتح المحادثة',
                    cancelButtonText: 'إغلاق'
                }).then(function(r) {
                    if (r.isConfirmed) openChat(providerId, providerName, chatRes.data);
                });
            });
        });
    });
}

// ✅ بدء المحادثة - مع التحقق من الصلاحية والانتهاء
function initiateChat(providerId, providerName) {
    _supabase.from('chat_permissions').select('*').eq('client_id', currentUser.id).eq('provider_id', providerId).maybeSingle().then(function(res) {
        var now = new Date();
        var price = (platformSettings.chat_price !== undefined && platformSettings.chat_price !== null) ? Number(platformSettings.chat_price) : 10;

        if (res.data && res.data.expires_at && new Date(res.data.expires_at) > now) {
            openChat(providerId, providerName, res.data);
        } else if (res.data && res.data.expires_at && new Date(res.data.expires_at) <= now) {
            Swal.fire({
                title: '⏰ انتهت مدة المحادثة',
                text: 'لتمديد المحادثة مع ' + providerName + '، يجب دفع ' + price + ' د.ل لمدة 10 أيام إضافية.',
                icon: 'info', showCancelButton: true,
                confirmButtonText: 'تمديد 10 أيام (' + price + ' د.ل)',
                cancelButtonText: 'إلغاء'
            }).then(function(r) {
                if (r.isConfirmed) payAndExtendChat(providerId, providerName, price);
            });
        } else {
            Swal.fire({
                title: 'فتح محادثة',
                text: 'لبدء محادثة مع ' + providerName + '، يجب دفع ' + price + ' د.ل لمدة 10 أيام.',
                icon: 'info', showCancelButton: true,
                confirmButtonText: 'دفع وفتح المحادثة (' + price + ' د.ل)',
                cancelButtonText: 'إلغاء'
            }).then(function(r) {
                if (r.isConfirmed) payAndExtendChat(providerId, providerName, price);
            });
        }
    });
}

function payAndExtendChat(providerId, providerName, price) {
    Swal.fire({ title: 'جاري الدفع...', didOpen: function() { Swal.showLoading(); } });
    _supabase.rpc('extend_chat_permission', { p_provider_id: providerId, p_amount: price }).then(function(res) {
        if (res.error || !res.data || !res.data.success) {
            Swal.fire('خطأ', res.error ? res.error.message : (res.data ? res.data.message : 'فشل الدفع'), 'error');
        } else {
            Swal.fire({ title: '✅ تم', text: 'تم فتح المحادثة لمدة 10 أيام', icon: 'success', timer: 1500, showConfirmButton: false });
            setTimeout(function() {
                _supabase.from('chat_permissions').select('*').eq('client_id', currentUser.id).eq('provider_id', providerId).maybeSingle().then(function(r) {
                    if (r.data) openChat(providerId, providerName, r.data);
                });
            }, 1500);
        }
    });
}

function renderMessages() {
    document.getElementById('page-messages').innerHTML = '<div class="card"><p>جاري تحميل المحادثات...</p></div>';
    var query;
    if (userProfile.role === 'provider') {
        query = _supabase.from('chat_permissions').select('*, profiles!chat_permissions_client_id_fkey(id, full_name, role)').eq('provider_id', currentUser.id);
    } else {
        query = _supabase.from('chat_permissions').select('*, profiles!chat_permissions_provider_id_fkey(id, full_name, role)').eq('client_id', currentUser.id);
    }
    query.then(function(res) {
        var c = '<h2 style="color:var(--primary); margin-bottom:15px;">محادثاتي</h2>';
        if (res.data && res.data.length > 0) {
            res.data.forEach(function(item) {
                var otherUser = item.profiles;
                if (!otherUser) return;
                var isExpired = item.expires_at && new Date(item.expires_at) < new Date();
                var expiryText = isExpired ? '⏰ منتهية' : (item.expires_at ? '⏳ ' + new Date(item.expires_at).toLocaleDateString('ar-EG') : '');
                c += '<div class="card" style="padding:15px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;"><div><strong>' + escHtml(otherUser.full_name) + '</strong><br><small style="color:var(--text-muted);">' + (otherUser.role === 'provider' ? 'مزود خدمة' : 'مستخدم') + '</small>' + (expiryText ? '<br><small style="color:' + (isExpired ? '#e74c3c' : '#27ae60') + '; font-weight:bold;">' + expiryText + '</small>' : '') + '</div><button class="btn btn-primary btn-sm" onclick="openChat(\'' + escJs(otherUser.id) + '\', \'' + escAttr(otherUser.full_name) + '\', null)"><i class="fa-solid fa-comment"></i> محادثة</button></div>';
            });
        } else {
            c += '<div class="card"><p style="text-align:center;">لا توجد محادثات نشطة.</p></div>';
        }
        document.getElementById('page-messages').innerHTML = c;
    });
}

function renderOrders() {
    var c = '';
    // ✅ عرض العروض المعلقة (للعميل)
    if (userProfile.role !== 'provider' && userProfile.role !== 'admin') {
        _supabase.from('payment_requests').select('*, profiles!payment_requests_provider_id_fkey(full_name)').eq('client_id', currentUser.id).eq('status', 'pending').order('created_at', { ascending: false }).then(function(pr) {
            if (pr.data && pr.data.length > 0) {
                var offersHtml = '<div class="pending-offers"><div class="pending-offers-title">💸 ' + t('pending_offers') + ' (' + pr.data.length + ')</div>';
                pr.data.forEach(function(o) {
                    var providerName = o.profiles ? o.profiles.full_name : 'المزود';
                    var timeLeft = Math.max(0, Math.floor((new Date(o.expires_at) - Date.now()) / 3600000));
                    offersHtml += '<div class="offer-card"><div style="font-size:12px; color:#92400e;">' + escHtml(providerName) + '</div><div class="offer-amount">' + o.amount + ' ' + t('currency') + '</div>' + (o.note ? '<div style="font-size:12px; color:#78350f;">' + escHtml(o.note) + '</div>' : '') + '<div class="offer-time-left">⏳ ينتهي خلال ' + timeLeft + ' ساعة</div></div>';
                });
                offersHtml += '</div>';
                c += offersHtml;
            }
            renderOrdersList(c);
        });
    } else {
        renderOrdersList(c);
    }
}

function renderOrdersList(prefixHtml) {
    var c = prefixHtml || '';
    if (userProfile.role === 'provider') {
        _supabase.from('services').select('id').eq('provider_id', currentUser.id).then(function(ms) {
            var ids = [];
            if (ms.data) for (var i = 0; i < ms.data.length; i++) ids.push(ms.data[i].id);
            if (!ids.length) {
                document.getElementById('page-orders').innerHTML = c + '<div class="card"><p style="text-align:center;">' + t('no_orders') + '</p></div>';
                return;
            }
            _supabase.from('orders').select('*, services(title)').in('service_id', ids).then(function(os) {
                if (os.data) for (var j = 0; j < os.data.length; j++) {
                    var o = os.data[j];
                    c += '<div class="card" style="padding:15px; margin-bottom:10px;"><strong>' + escHtml(o.services ? o.services.title : '') + '</strong><p style="color:var(--accent); font-weight:bold;">' + escHtml(o.total_amount) + ' ' + t('currency') + '</p></div>';
                }
                document.getElementById('page-orders').innerHTML = c || '<div class="card"><p style="text-align:center;">' + t('no_orders') + '</p></div>';
            });
        });
    } else {
        _supabase.from('orders').select('*, services(title)').eq('client_id', currentUser.id).order('created_at', { ascending: false }).then(function(os) {
            if (os.data) for (var k = 0; k < os.data.length; k++) {
                var o = os.data[k];
                c += '<div class="card" style="padding:15px; margin-bottom:10px;"><strong>' + escHtml(o.services ? o.services.title : '') + '</strong><p style="color:var(--accent); font-weight:bold;">' + escHtml(o.total_amount) + ' ' + t('currency') + '</p></div>';
            }
            document.getElementById('page-orders').innerHTML = c || '<div class="card"><p style="text-align:center;">' + t('no_orders') + '</p></div>';
        });
    }
}


// ============================================================
// app.js — الجزء 9أ من 11: المحادثة (الهيكل الأساسي)
// ============================================================

var currentChatUserId = null;
var currentChatUserName = null;
var currentChatPermission = null;
var chatInterval = null;
var replyToMessage = null;

function openChat(userId, userName, permission) {
    currentChatUserId = userId;
    currentChatUserName = userName;
    currentChatPermission = permission;

    if (!permission) {
        _supabase.from('chat_permissions').select('*')
            .or('and(client_id.eq.' + currentUser.id + ',provider_id.eq.' + userId + '),and(client_id.eq.' + userId + ',provider_id.eq.' + currentUser.id + ')')
            .maybeSingle().then(function(r) {
                currentChatPermission = r.data;
                renderChatInterface();
            });
    } else {
        renderChatInterface();
    }
}

function renderChatInterface() {
    var isExpired = currentChatPermission && currentChatPermission.expires_at && new Date(currentChatPermission.expires_at) < new Date();
    var expiresAt = currentChatPermission ? currentChatPermission.expires_at : null;
    var isProvider = userProfile && userProfile.role === 'provider';

    var chatHtml = '<div class="chat-fullscreen" id="chat-fullscreen">' +
        '<div class="chat-header">' +
            '<button class="chat-back" onclick="closeChat()"><i class="fa-solid fa-arrow-right"></i></button>' +
            (isProvider && !isExpired ? '<button id="chat-payment-btn" class="chat-back" onclick="openSendPaymentRequestModal()" style="background:rgba(243,146,0,0.55);" title="إرسال عرض سعر"><i class="fa-solid fa-money-bill-wave"></i></button>' : '') +
            '<div class="chat-info">' +
                '<div class="chat-name">' + escHtml(currentChatUserName) + '</div>' +
                '<div class="chat-status" id="chat-status">' + (isExpired ? '⏰ ' + t('chat_expired') : '🟢 نشطة') + '</div>' +
            '</div>' +
            (expiresAt && !isExpired ? '<div class="chat-timer" id="chat-timer-top" data-chat-timer="' + expiresAt + '">⏳</div>' : '') +
        '</div>' +
        (isExpired ? '<div class="chat-expired-banner">⏰ ' + t('chat_expired') + ' <button onclick="extendChatFromChat()" style="background:white; color:#e67e22; border:none; padding:6px 15px; border-radius:20px; font-weight:bold; margin-right:10px; cursor:pointer;">🔄 ' + t('extend_chat') + '</button></div>' : '') +
        '<div class="chat-messages" id="chat-messages"><p style="text-align:center; color:#999; font-size:12px;">' + t('loading') + '</p></div>' +
        '<div class="chat-typing" id="chat-typing"></div>' +
        (isExpired ? '' :
        '<div class="chat-input-bar" id="chat-input-bar">' +
            '<button class="chat-input-btn" onclick="toggleEmojiPicker()" style="background:var(--accent);"><i class="fa-solid fa-face-smile"></i></button>' +
            '<input type="file" id="chat-image-input" accept="image/*" style="display:none;" onchange="handleImageUpload(this)">' +
            '<button class="chat-input-btn" onclick="document.getElementById(\'chat-image-input\').click()" style="background:#3498db;"><i class="fa-solid fa-image"></i></button>' +
            '<input type="text" id="chat-input" placeholder="' + t('type_message') + '" onkeypress="if(event.key===\'Enter\')sendChatMessage()">' +
            '<button class="chat-input-btn" id="chat-record-btn" onclick="toggleVoiceRecording()" style="background:#e74c3c;"><i class="fa-solid fa-microphone"></i></button>' +
            '<button class="chat-input-btn" onclick="sendChatMessage()"><i class="fa-solid fa-paper-plane"></i></button>' +
        '</div>') +
        '<div id="emoji-picker-container" style="position:relative; display:none;"><div class="chat-emoji-picker" id="emoji-picker"></div></div>' +
        '<div id="chat-recording-indicator" class="chat-recording-indicator hidden"><i class="fa-solid fa-circle"></i> ' + t('recording') + ' <span id="rec-time">00:00</span></div>' +
        '<input type="file" id="chat-pdf-input" accept="application/pdf" style="display:none;" onchange="handlePDFUpload(this)">' +
    '</div>';

    var existing = document.getElementById('chat-fullscreen');
    if (existing) existing.remove();

    var div = document.createElement('div');
    div.innerHTML = chatHtml;
    document.body.appendChild(div.firstChild);

    loadChatMessages();
    if (chatInterval) clearInterval(chatInterval);
    chatInterval = setInterval(loadChatMessages, 3000);
    startLiveTimers();

    setTimeout(function() {
        var timer = document.getElementById('chat-timer-top');
        if (timer && expiresAt) {
            var left = new Date(expiresAt).getTime() - Date.now();
            if (left > 0) {
                var days = Math.floor(left / 86400000);
                var hours = Math.floor((left % 86400000) / 3600000);
                if (days > 0) timer.innerText = '⏳ ' + days + 'ي';
                else timer.innerText = '⏳ ' + hours + 'س';
                if (left < 86400000) timer.classList.add('warning');
                if (left < 3600000) timer.classList.add('danger');
            }
        }
    }, 500);
}

function closeChat() {
    if (chatInterval) { clearInterval(chatInterval); chatInterval = null; }
    var el = document.getElementById('chat-fullscreen');
    if (el) el.remove();
    currentChatUserId = null;
    currentChatUserName = null;
    currentChatPermission = null;
    replyToMessage = null;
    var pageMessages = document.getElementById('page-messages');
    if (pageMessages && !pageMessages.classList.contains('hidden')) renderMessages();
}

function loadChatMessages() {
    if (!currentChatUserId) return;
    _supabase.from('messages').select('*')
        .or('and(sender_id.eq.' + currentUser.id + ',receiver_id.eq.' + currentChatUserId + '),and(sender_id.eq.' + currentChatUserId + ',receiver_id.eq.' + currentUser.id + ')')
        .order('created_at', { ascending: true })
        .then(function(res) {
            var box = document.getElementById('chat-messages');
            if (!box) return;
            var html = '';
            var lastDate = null;
            var messages = (res.data || []).filter(function(m) { return !m.is_deleted; });

            var unreadIds = messages.filter(function(m) { return m.sender_id === currentChatUserId && !m.read_at; }).map(function(m) { return m.id; });
            if (unreadIds.length > 0) {
                _supabase.from('messages').update({ read_at: new Date().toISOString() }).in('id', unreadIds).then(function() {});
            }

            messages.forEach(function(m) {
                var msgDate = new Date(m.created_at).toLocaleDateString('ar-EG');
                if (msgDate !== lastDate) {
                    html += '<div style="text-align:center; margin:15px 0;"><span class="chat-date-divider">' + msgDate + '</span></div>';
                    lastDate = msgDate;
                }
                html += renderChatBubble(m, messages);
            });

            box.innerHTML = html || '<p style="text-align:center; color:#999; font-size:12px;">لا توجد رسائل سابقة.</p>';
            box.scrollTop = box.scrollHeight;
        });
}

function renderChatBubble(m, allMessages) {
    var isMe = m.sender_id === currentUser.id;
    var reply = null;
    if (m.reply_to_id) {
        reply = allMessages.find(function(x) { return x.id === m.reply_to_id; });
    }
    var time = new Date(m.created_at).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    var readMarks = '';
    if (isMe) {
        readMarks = m.read_at
            ? '<span class="read-marks blue">✓✓</span>'
            : '<span class="read-marks gray">✓✓</span>';
    }

    var content = '';
    if (m.message_type === 'image' && m.media_url) {
        content = '<img src="' + escHtml(m.media_url) + '" class="chat-image" onclick="window.open(this.src)" alt="">' + (m.message ? '<div style="margin-top:6px;">' + escHtml(m.message) + '</div>' : '');
    } else if (m.message_type === 'audio' && m.media_url) {
        content = '<audio controls class="chat-audio" src="' + escHtml(m.media_url) + '"></audio>';
    } else if (m.message_type === 'file' && m.media_url) {
        content = '<a href="' + escHtml(m.media_url) + '" target="_blank" style="color:inherit; text-decoration:none; display:flex; align-items:center; gap:8px;"><i class="fa-solid fa-file-pdf" style="font-size:24px;"></i><span style="text-decoration:underline;">' + escHtml(m.message || 'ملف PDF') + '</span></a>';
    } else if (m.message_type === 'payment_request') {
        content = renderPaymentRequestBubble(m);
    } else {
        content = escHtml(m.message || '');
        if (m.is_edited) content += ' <small style="opacity:0.6; font-size:10px;">(معدّلة)</small>';
    }

    var replyHtml = '';
    if (reply) {
        var replyText = reply.message || ('[' + (reply.message_type || 'message') + ']');
        replyHtml = '<div class="chat-reply-preview"><b>' + (reply.sender_id === currentUser.id ? 'أنت' : escHtml(currentChatUserName)) + ':</b> ' + escHtml(replyText.substring(0, 50)) + '</div>';
    }

    var actionsHtml = isMe
        ? '<div class="chat-bubble-actions"><button onclick="deleteChatMessage(\'' + escJs(m.id) + '\')" title="حذف"><i class="fa-solid fa-trash"></i></button>' + (m.message_type === 'text' || !m.message_type ? '<button onclick="editChatMessage(\'' + escJs(m.id) + '\', \'' + escJs(m.message || '') + '\')" title="تعديل"><i class="fa-solid fa-pen"></i></button>' : '') + '</div>'
        : '';

    return '<div class="chat-bubble-row ' + (isMe ? 'mine' : 'theirs') + '">' +
        actionsHtml +
        '<div class="chat-bubble">' +
            replyHtml +
            content +
            '<div class="chat-bubble-time">' + time + ' ' + readMarks + '</div>' +
        '</div>' +
        (!isMe ? '<div class="chat-bubble-actions"><button onclick="replyToChatMessage(\'' + escJs(m.id) + '\', \'' + escJs((m.message || '').substring(0, 40)) + '\')" title="رد"><i class="fa-solid fa-reply"></i></button></div>' : '') +
    '</div>';
}

function sendChatMessage() {
    var input = document.getElementById('chat-input');
    if (!input) return;
    var msg = input.value.trim();
    if (!msg || !currentChatUserId) return;
    if (currentChatPermission && currentChatPermission.expires_at && new Date(currentChatPermission.expires_at) < new Date()) {
        return Swal.fire('⏰', t('chat_expired'), 'warning');
    }
    input.value = '';
    var payload = {
        sender_id: currentUser.id,
        receiver_id: currentChatUserId,
        message: msg,
        message_type: 'text'
    };
    if (replyToMessage) {
        payload.reply_to_id = replyToMessage.id;
        replyToMessage = null;
        var bar = document.getElementById('chat-reply-bar');
        if (bar) bar.remove();
    }
    _supabase.from('messages').insert([payload]).then(function(res) {
        if (res.error) {
            Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: 'فشل الإرسال: ' + res.error.message, showConfirmButton: false, timer: 3000 });
        } else {
            loadChatMessages();
        }
    }).catch(handleError);
}

function replyToChatMessage(msgId, text) {
    replyToMessage = { id: msgId };
    var existing = document.getElementById('chat-reply-bar');
    if (existing) existing.remove();
    var bar = document.createElement('div');
    bar.id = 'chat-reply-bar';
    bar.style.cssText = 'background:var(--card-bg); border-top:2px solid var(--primary); padding:8px 12px; font-size:12px; display:flex; justify-content:space-between; align-items:center;';
    bar.innerHTML = '<div style="border-right:3px solid var(--primary); padding-right:8px;"><b>رد على:</b> ' + escHtml(text) + '</div><button onclick="cancelReply()" style="background:none; border:none; color:#e74c3c; font-size:16px; cursor:pointer;"><i class="fa-solid fa-times"></i></button>';
    var inputBar = document.getElementById('chat-input-bar');
    if (inputBar) inputBar.parentNode.insertBefore(bar, inputBar);
    var input = document.getElementById('chat-input');
    if (input) input.focus();
}

function cancelReply() {
    replyToMessage = null;
    var bar = document.getElementById('chat-reply-bar');
    if (bar) bar.remove();
}

function deleteChatMessage(msgId) {
    Swal.fire({
        title: 'حذف الرسالة؟',
        text: 'سيتم حذفها عند الطرفين.',
        icon: 'warning', showCancelButton: true,
        confirmButtonText: 'نعم، احذف', cancelButtonText: t('cancel')
    }).then(function(r) {
        if (!r.isConfirmed) return;
        _supabase.from('messages').update({ is_deleted: true }).eq('id', msgId).then(function() {
            loadChatMessages();
        }).catch(handleError);
    });
}

function editChatMessage(msgId, currentText) {
    Swal.fire({
        title: 'تعديل الرسالة',
        input: 'text',
        inputValue: currentText,
        showCancelButton: true,
        confirmButtonText: 'حفظ',
        cancelButtonText: t('cancel')
    }).then(function(r) {
        if (!r.isConfirmed || !r.value) return;
        _supabase.from('messages').update({ message: r.value, is_edited: true }).eq('id', msgId).then(function() {
            loadChatMessages();
        }).catch(handleError);
    });
}


// ============================================================
// app.js — الجزء 9ب من 11: وسائط المحادثة
// ============================================================

// ✅ منتقي الإيموجي
var chatEmojis = ['😀','😁','😂','🤣','😊','😍','😘','😎','🤔','😅','😢','😭','😡','👍','👎','🙏','👏','💪','❤️','💔','🔥','⭐','✅','❌','🎉','🎁','💰','💸','📱','📞','📧','📷','🎤','🎵','⏰','⏳','🔔','📌','📍','🚀'];
function toggleEmojiPicker() {
    var container = document.getElementById('emoji-picker-container');
    var picker = document.getElementById('emoji-picker');
    if (!container || !picker) return;
    if (container.style.display === 'none') {
        if (!picker.innerHTML) {
            chatEmojis.forEach(function(e) {
                picker.innerHTML += '<span onclick="insertEmoji(\'' + e + '\')">' + e + '</span>';
            });
        }
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}
function insertEmoji(e) {
    var input = document.getElementById('chat-input');
    if (input) { input.value += e; input.focus(); }
    var container = document.getElementById('emoji-picker-container');
    if (container) container.style.display = 'none';
}

// ✅ رفع الصور
function handleImageUpload(input) {
    var file = input.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
        return Swal.fire('تنبيه', 'حجم الصورة يجب أن يكون أقل من 5 ميجا', 'warning');
    }
    if (!file.type.startsWith('image/')) {
        return Swal.fire('تنبيه', 'الملف ليس صورة', 'warning');
    }
    if (currentChatPermission && currentChatPermission.expires_at && new Date(currentChatPermission.expires_at) < new Date()) {
        return Swal.fire('⏰', t('chat_expired'), 'warning');
    }
    Swal.fire({ title: t('uploading'), didOpen: function() { Swal.showLoading(); } });
    var fileName = 'chat_' + currentUser.id + '_' + Date.now() + '.' + file.name.split('.').pop();
    _supabase.storage.from('chat-media').upload(fileName, file).then(function(upRes) {
        if (upRes.error) { return Swal.fire('خطأ', upRes.error.message, 'error'); }
        var url = _supabase.storage.from('chat-media').getPublicUrl(fileName).data.publicUrl;
        _supabase.from('messages').insert([{
            sender_id: currentUser.id,
            receiver_id: currentChatUserId,
            message: '',
            message_type: 'image',
            media_url: url,
            media_size: file.size,
            media_mime: file.type
        }]).then(function() {
            Swal.close();
            input.value = '';
            loadChatMessages();
        });
    }).catch(handleError);
}

// ✅ رفع PDF
function handlePDFUpload(input) {
    var file = input.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
        return Swal.fire('تنبيه', 'حجم الملف يجب أن يكون أقل من 5 ميجا', 'warning');
    }
    if (file.type !== 'application/pdf') {
        return Swal.fire('تنبيه', 'الملف يجب أن يكون PDF', 'warning');
    }
    if (currentChatPermission && currentChatPermission.expires_at && new Date(currentChatPermission.expires_at) < new Date()) {
        return Swal.fire('⏰', t('chat_expired'), 'warning');
    }
    Swal.fire({ title: t('uploading'), didOpen: function() { Swal.showLoading(); } });
    var fileName = 'chat_' + currentUser.id + '_' + Date.now() + '.pdf';
    _supabase.storage.from('chat-media').upload(fileName, file).then(function(upRes) {
        if (upRes.error) { return Swal.fire('خطأ', upRes.error.message, 'error'); }
        var url = _supabase.storage.from('chat-media').getPublicUrl(fileName).data.publicUrl;
        _supabase.from('messages').insert([{
            sender_id: currentUser.id,
            receiver_id: currentChatUserId,
            message: file.name,
            message_type: 'file',
            media_url: url,
            media_size: file.size,
            media_mime: file.type
        }]).then(function() {
            Swal.close();
            input.value = '';
            loadChatMessages();
        });
    }).catch(handleError);
}

// ✅ تسجيل الصوت
var mediaRecorder = null;
var audioChunks = [];
var recordingStartTime = null;
var recordingTimerInterval = null;
var isRecording = false;

function toggleVoiceRecording() {
    if (!isRecording) { startVoiceRecording(); }
    else { stopVoiceRecording(); }
}

function startVoiceRecording() {
    if (currentChatPermission && currentChatPermission.expires_at && new Date(currentChatPermission.expires_at) < new Date()) {
        return Swal.fire('⏰', t('chat_expired'), 'warning');
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return Swal.fire('خطأ', 'المتصفح لا يدعم تسجيل الصوت', 'error');
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
        audioChunks = [];
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = function(e) { if (e.data.size > 0) audioChunks.push(e.data); };
        mediaRecorder.onstop = function() {
            stream.getTracks().forEach(function(t) { t.stop(); });
            var blob = new Blob(audioChunks, { type: 'audio/webm' });
            if (blob.size > 2 * 1024 * 1024) {
                Swal.fire('تنبيه', 'حجم التسجيل يجب أن يكون أقل من 2 ميجا', 'warning');
                resetRecordingUI();
                return;
            }
            uploadAudioBlob(blob);
        };
        mediaRecorder.start();
        isRecording = true;
        recordingStartTime = Date.now();
        var btn = document.getElementById('chat-record-btn');
        if (btn) btn.classList.add('recording');
        var ind = document.getElementById('chat-recording-indicator');
        if (ind) ind.classList.remove('hidden');
        recordingTimerInterval = setInterval(function() {
            var sec = Math.floor((Date.now() - recordingStartTime) / 1000);
            var el = document.getElementById('rec-time');
            if (el) el.innerText = String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(sec % 60).padStart(2, '0');
            if (sec >= 120) { stopVoiceRecording(); }
        }, 1000);
    }).catch(function(err) {
        Swal.fire('خطأ', 'تعذر الوصول إلى الميكروفون: ' + err.message, 'error');
    });
}

function stopVoiceRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
    isRecording = false;
    if (recordingTimerInterval) { clearInterval(recordingTimerInterval); recordingTimerInterval = null; }
    resetRecordingUI();
}

function resetRecordingUI() {
    var btn = document.getElementById('chat-record-btn');
    if (btn) btn.classList.remove('recording');
    var ind = document.getElementById('chat-recording-indicator');
    if (ind) ind.classList.add('hidden');
    var el = document.getElementById('rec-time');
    if (el) el.innerText = '00:00';
}

function uploadAudioBlob(blob) {
    Swal.fire({ title: t('uploading'), didOpen: function() { Swal.showLoading(); } });
    var fileName = 'chat_' + currentUser.id + '_' + Date.now() + '.webm';
    _supabase.storage.from('chat-media').upload(fileName, blob, { contentType: 'audio/webm' }).then(function(upRes) {
        if (upRes.error) { return Swal.fire('خطأ', upRes.error.message, 'error'); }
        var url = _supabase.storage.from('chat-media').getPublicUrl(fileName).data.publicUrl;
        _supabase.from('messages').insert([{
            sender_id: currentUser.id,
            receiver_id: currentChatUserId,
            message: '',
            message_type: 'audio',
            media_url: url,
            media_size: blob.size,
            media_mime: 'audio/webm'
        }]).then(function() {
            Swal.close();
            loadChatMessages();
        });
    }).catch(handleError);
}

// ✅ تمديد المحادثة من داخل الشات
function extendChatFromChat() {
    if (!currentChatUserId) return;
    var price = (platformSettings.chat_price !== undefined && platformSettings.chat_price !== null) ? Number(platformSettings.chat_price) : 10;
    Swal.fire({
        title: '🔄 تمديد المحادثة',
        text: 'تمديد لمدة 10 أيام مقابل ' + price + ' د.ل',
        icon: 'question', showCancelButton: true,
        confirmButtonText: 'تمديد (' + price + ' د.ل)', cancelButtonText: t('cancel')
    }).then(function(r) {
        if (!r.isConfirmed) return;
        Swal.fire({ title: 'جاري الدفع...', didOpen: function() { Swal.showLoading(); } });
        _supabase.rpc('extend_chat_permission', { p_provider_id: currentChatUserId, p_amount: price }).then(function(res) {
            if (res.error || !res.data || !res.data.success) {
                return Swal.fire('خطأ', res.error ? res.error.message : (res.data ? res.data.message : 'فشل'), 'error');
            }
            Swal.fire('✅ تم', 'تم تمديد المحادثة 10 أيام', 'success');
            closeChat();
            setTimeout(function() { initiateChat(currentChatUserId, currentChatUserName); }, 500);
        });
    });
}

// ✅ عرض السعر داخل المحادثة
function renderPaymentRequestBubble(m) {
    var data = {};
    try { data = JSON.parse(m.message || '{}'); } catch(e) { data = {}; }
    var isMe = m.sender_id === currentUser.id;
    var amount = data.amount || 0;
    var type = data.type || 'full';
    var note = data.note || '';
    var requestId = data.request_id || '';
    var status = data.status || 'pending';
    var statusBadge = '';
    if (status === 'paid') statusBadge = '<span style="background:#27ae60; padding:4px 10px; border-radius:10px; font-size:11px;">✅ مدفوع</span>';
    else if (status === 'rejected') statusBadge = '<span style="background:#e74c3c; padding:4px 10px; border-radius:10px; font-size:11px;">❌ مرفوض</span>';
    else if (status === 'expired') statusBadge = '<span style="background:#95a5a6; padding:4px 10px; border-radius:10px; font-size:11px;">⏰ منتهي</span>';
    else statusBadge = '<span style="background:#f39c12; padding:4px 10px; border-radius:10px; font-size:11px;">⏳ ينتظر</span>';

    var actionsHtml = '';
    if (!isMe && status === 'pending') {
        actionsHtml = '<div class="pr-actions">' +
            '<button class="accept" onclick="payPaymentRequest(\'' + escJs(requestId) + '\')">💳 ' + t('pay_now') + '</button>' +
            '<button class="reject" onclick="rejectPaymentRequest(\'' + escJs(requestId) + '\')">' + t('reject_offer') + '</button>' +
            '</div>';
    }

    return '<div class="payment-request-bubble">' +
        '<div class="pr-title">💸 ' + t('request_payment_title') + '</div>' +
        '<div class="pr-amount">' + amount + ' ' + t('currency') + '</div>' +
        '<div class="pr-type">' + (type === 'deposit' ? t('deposit_payment') : t('full_payment')) + '</div>' +
        (note ? '<div class="pr-note">' + escHtml(note) + '</div>' : '') +
        '<div style="margin-top:8px;">' + statusBadge + '</div>' +
        actionsHtml +
        '</div>';
}

// ✅ دفع عرض السعر
function payPaymentRequest(requestId) {
    if (!requestId) return;
    Swal.fire({
        title: '💳 اختر طريقة الدفع',
        html: '<p style="margin-bottom:15px; font-size:13px;">كيف تريد الدفع؟</p>',
        showCancelButton: true,
        confirmButtonText: 'من المحفظة',
        cancelButtonText: 'تحويل بالهاتف',
        showDenyButton: true,
        denyButtonText: 'إلغاء',
        denyButtonColor: '#95a5a6'
    }).then(function(r) {
        if (r.isConfirmed) { payFromWallet(requestId); }
        else if (r.dismiss === Swal.DismissReason.cancel) { payViaPhone(requestId); }
    });
}

function payFromWallet(requestId) {
    Swal.fire({ title: 'جاري الدفع...', didOpen: function() { Swal.showLoading(); } });
    _supabase.rpc('accept_payment_request', { p_request_id: requestId }).then(function(res) {
        if (res.error || !res.data || !res.data.success) {
            var msg = res.error ? res.error.message : (res.data ? res.data.message : 'فشل');
            if (res.data && res.data.message === 'insufficient_balance') msg = 'الرصيد غير كافٍ. اشحن محفظتك أولاً.';
            return Swal.fire('خطأ', msg, 'error');
        }
        Swal.fire('✅ تم الدفع', 'تم الدفع بنجاح', 'success');
        loadChatMessages();
    }).catch(handleError);
}

function payViaPhone(requestId) {
    _supabase.from('payment_requests').select('*, profiles!payment_requests_provider_id_fkey(full_name, phone)').eq('id', requestId).maybeSingle().then(function(r) {
        if (!r.data || !r.data.profiles) return Swal.fire('خطأ', 'تعذر جلب بيانات المزود', 'error');
        var providerName = r.data.profiles.full_name;
        var providerPhone = r.data.profiles.phone;
        var amount = r.data.amount;
        Swal.fire({
            title: '💸 تحويل بالهاتف',
            html: '<div style="text-align:right; line-height:1.9; font-size:14px;">' +
                '<p>حوّل المبلغ إلى:</p>' +
                '<div style="background:#e8f5e9; padding:12px; border-radius:10px; margin:10px 0;">' +
                '<div><b>👤 الاسم:</b> ' + escHtml(providerName) + '</div>' +
                '<div><b>📱 الهاتف:</b> <span dir="ltr" style="font-family:monospace; font-weight:bold;">' + escHtml(providerPhone) + '</span></div>' +
                '<div><b>💰 المبلغ:</b> ' + amount + ' ' + t('currency') + '</div>' +
                '</div>' +
                '<p>بعد التحويل، ارفع صورة إشعار التحويل:</p>' +
                '<input type="file" id="phone-receipt" accept="image/*" class="swal2-file" style="font-size:13px;">' +
                '</div>',
            confirmButtonText: '✅ تم التحويل',
            cancelButtonText: t('cancel'),
            showCancelButton: true,
            preConfirm: function() {
                var file = document.getElementById('phone-receipt').files[0];
                if (!file) { Swal.showValidationMessage('ارفع صورة إشعار التحويل'); return false; }
                return file;
            }
        }).then(function(res) {
            if (!res.isConfirmed) return;
            var file = res.value;
            Swal.fire({ title: t('uploading'), didOpen: function() { Swal.showLoading(); } });
            var fileName = 'receipt_' + currentUser.id + '_' + Date.now() + '.' + file.name.split('.').pop();
            _supabase.storage.from('payment-receipts').upload(fileName, file).then(function(up) {
                if (up.error) return Swal.fire('خطأ', up.error.message, 'error');
                var url = _supabase.storage.from('payment-receipts').getPublicUrl(fileName).data.publicUrl;
                _supabase.rpc('mark_payment_paid_via_transfer', { p_request_id: requestId, p_receipt_url: url }).then(function(res2) {
                    if (res2.error) return Swal.fire('خطأ', res2.error.message, 'error');
                    Swal.fire('✅ تم', 'تم إرسال إشعار التحويل. في انتظار تأكيد المزود.', 'success');
                    loadChatMessages();
                });
            }).catch(handleError);
        });
    });
}

function rejectPaymentRequest(requestId) {
    Swal.fire({
        title: t('reject_offer'),
        input: 'text',
        inputPlaceholder: 'سبب الرفض (اختياري)',
        showCancelButton: true,
        confirmButtonText: 'رفض',
        cancelButtonText: t('cancel'),
        confirmButtonColor: '#e74c3c'
    }).then(function(r) {
        if (!r.isConfirmed) return;
        Swal.fire({ title: 'جاري...', didOpen: function() { Swal.showLoading(); } });
        _supabase.rpc('reject_payment_request', { p_request_id: requestId, p_reason: r.value || null }).then(function(res) {
            if (res.error || !res.data || !res.data.success) {
                return Swal.fire('خطأ', res.error ? res.error.message : 'فشل', 'error');
            }
            Swal.fire('تم', 'تم رفض العرض', 'success');
            loadChatMessages();
        });
    });
}

// ✅ إرسال عرض سعر (من المزود)
function openSendPaymentRequestModal() {
    if (!currentChatUserId) return;
    Swal.fire({
        title: '💸 ' + t('request_payment_title'),
        html: '<input id="pr-amount" class="swal2-input" type="number" placeholder="المبلغ (د.ل)">' +
              '<select id="pr-type" class="swal2-input">' +
                '<option value="full">' + t('full_payment') + '</option>' +
                '<option value="deposit">' + t('deposit_payment') + '</option>' +
              '</select>' +
              '<textarea id="pr-note" class="swal2-textarea" placeholder="ملاحظة (اختياري)"></textarea>',
        confirmButtonText: 'إرسال',
        cancelButtonText: t('cancel'),
        showCancelButton: true,
        preConfirm: function() {
            var amt = parseFloat(document.getElementById('pr-amount').value);
            if (!amt || amt <= 0) { Swal.showValidationMessage('أدخل مبلغاً صحيحاً'); return false; }
            return {
                amount: amt,
                type: document.getElementById('pr-type').value,
                note: document.getElementById('pr-note').value.trim() || null
            };
        }
    }).then(function(r) {
        if (!r.isConfirmed) return;
        Swal.fire({ title: 'جاري الإرسال...', didOpen: function() { Swal.showLoading(); } });
        _supabase.rpc('create_payment_request', {
            p_client_id: currentChatUserId,
            p_amount: r.value.amount,
            p_payment_type: r.value.type,
            p_note: r.value.note,
            p_service_id: null
        }).then(function(res) {
            if (res.error || !res.data || !res.data.success) {
                return Swal.fire('خطأ', res.error ? res.error.message : 'فشل', 'error');
            }
            var requestId = res.data.request_id;
            var payload = JSON.stringify({
                amount: r.value.amount,
                type: r.value.type,
                note: r.value.note,
                request_id: requestId,
                status: 'pending'
            });
            _supabase.from('messages').insert([{
                sender_id: currentUser.id,
                receiver_id: currentChatUserId,
                message: payload,
                message_type: 'payment_request'
            }]).then(function() {
                Swal.close();
                loadChatMessages();
            });
        }).catch(handleError);
    });
}


// ============================================================
// app.js — الجزء 10أ من 12: لوحة الإدارة + الأجهزة + العروض
// ============================================================

function renderAdmin() {
    document.getElementById('page-admin').innerHTML = '<div class="card"><p>' + t('loading') + '</p></div>';
    _supabase.from('profiles').select('*', { count: 'exact', head: true }).then(function(ucRes) {
        _supabase.from('wallets').select('balance').then(function(wsRes) {
            var total = 0;
            if (wsRes.data) for (var i = 0; i < wsRes.data.length; i++) total += Number(wsRes.data[i].balance);
            _supabase.from('wallets').select('balance').eq('user_id', currentUser.id).maybeSingle().then(function(myWRes) {
                var myBal = myWRes.data ? Number(myWRes.data.balance).toFixed(2) : '0.00';
                _supabase.from('services').select('*').eq('status', 'pending').then(function(psRes) {
                    _supabase.from('withdrawals').select('*').in('status', ['pending', 'processing']).then(function(pwRes) {
                        _supabase.from('bank_transfers').select('*').eq('status', 'pending').then(function(ptRes) {
                            _supabase.from('payment_requests').select('*').eq('status', 'pending').then(function(prRes) {
                                var prCount = prRes.data ? prRes.data.length : 0;
                                var c = '<h2 style="color:var(--accent); margin-bottom:15px;"><i class="fa-solid fa-shield-halved"></i> ' + t('admin_title') + '</h2>';
                                c += '<div class="grid-2" style="margin-bottom:15px;">';
                                c += '<div class="stat-box"><h3>' + (ucRes.count || 0) + '</h3><p>' + t('users') + '</p></div>';
                                c += '<div class="stat-box"><h3>' + total.toFixed(0) + '</h3><p>' + t('total_money') + '</p></div>';
                                c += '<div class="stat-box" style="background:linear-gradient(135deg,#27ae60,#2ecc71); color:white;"><h3>' + myBal + '</h3><p>' + t('my_balance') + ' (' + t('currency') + ')</p></div>';
                                c += '</div>';
                                c += '<div class="tabs" style="overflow-x:auto;">';
                                c += '<div class="tab active" onclick="adminTab(this, \'a-serv\')">' + t('nav_services') + ' (' + (psRes.data ? psRes.data.length : 0) + ')</div>';
                                c += '<div class="tab" onclick="adminTab(this, \'a-with\')">' + t('withdrawals') + ' (' + (pwRes.data ? pwRes.data.length : 0) + ')</div>';
                                c += '<div class="tab" onclick="adminTab(this, \'a-trans\')">' + t('transfers') + ' (' + (ptRes.data ? ptRes.data.length : 0) + ')</div>';
                                c += '<div class="tab" onclick="adminTab(this, \'a-offers\')">💸 عروض (' + prCount + ')</div>';
                                c += '<div class="tab" onclick="adminTab(this, \'a-devices\')">📱 الأجهزة</div>';
                                c += '<div class="tab" onclick="adminTab(this, \'a-cards\')">' + t('cards') + '</div>';
                                c += '<div class="tab" onclick="adminTab(this, \'a-users\')">مستخدمون</div>';
                                c += '<div class="tab" onclick="adminTab(this, \'a-ads\')">الإعلانات</div>';
                                c += '<div class="tab" onclick="adminTab(this, \'a-settings\')">الإعدادات</div>';
                                c += '<div class="tab" onclick="adminTab(this, \'a-store\')">المتجر</div>';
                                c += '</div><div id="a-serv">';
                                if (psRes.data) for (var j = 0; j < psRes.data.length; j++) {
                                    var s = psRes.data[j];
                                    c += '<div class="card" style="padding:15px; margin-bottom:10px;"><strong>' + escHtml(s.title) + '</strong> - ' + escHtml(s.price) + ' ' + t('currency') + '<div style="display:flex; gap:8px; margin-top:10px;"><button class="btn btn-primary btn-sm" onclick="approveService(\'' + escJs(s.id) + '\')">' + t('approve') + '</button><button class="btn btn-danger btn-sm" onclick="rejectService(\'' + escJs(s.id) + '\')">' + t('reject') + '</button></div></div>';
                                }
                                if (!psRes.data || !psRes.data.length) c += '<p style="text-align:center;">' + t('no_services') + '</p>';
                                c += '</div>';
                                c += '<div id="a-with" class="hidden"></div>';
                                c += '<div id="a-trans" class="hidden">';
                                if (ptRes.data) for (var m = 0; m < ptRes.data.length; m++) {
                                    var tx = ptRes.data[m];
                                    var d = parseBankDetails(tx.bank_details);
                                    c += '<div class="card" style="padding:15px; margin-bottom:10px; border-right:4px solid var(--primary);"><div style="display:flex; justify-content:space-between; margin-bottom:8px;"><strong>' + t('amount') + ': ' + escHtml(tx.amount) + ' ' + t('currency') + '</strong></div><div style="font-size:13px; line-height:1.9; background:#eef5ff; padding:12px; border-radius:8px; margin-bottom:8px; border:1px solid #bce;"><div><i class="fa-solid fa-user"></i> ' + escHtml(d.full_name) + '</div><div><i class="fa-solid fa-building-columns"></i> ' + escHtml(d.bank_name) + '</div><div><i class="fa-solid fa-hashtag"></i> <span dir="ltr">' + escHtml(d.account_number) + '</span></div></div><a href="' + escHtml(tx.receipt_url || '#') + '" target="_blank" style="color:var(--accent); font-size:13px; display:block; margin:5px 0;"><i class="fa-solid fa-image"></i> ' + t('view_receipt') + '</a><div style="display:flex; gap:8px; margin-top:10px;"><button class="btn btn-primary btn-sm" style="flex:1;" onclick="approveTransfer(\'' + escJs(tx.id) + '\', \'' + escJs(tx.user_id) + '\', ' + Number(tx.amount) + ')">' + t('approve') + '</button><button class="btn btn-danger btn-sm" style="flex:1;" onclick="rejectTransfer(\'' + escJs(tx.id) + '\')">' + t('reject_transfer') + '</button></div></div>';
                                }
                                if (!ptRes.data || !ptRes.data.length) c += '<p style="text-align:center;">' + t('no_orders') + '</p>';
                                c += '</div>';
                                c += '<div id="a-offers" class="hidden"></div>';
                                c += '<div id="a-devices" class="hidden"></div>';
                                c += '<div id="a-cards" class="hidden"><div class="card" style="padding:15px; margin-bottom:15px;"><h4 style="margin-bottom:10px;">توليد بطاقات جديدة</h4><input type="number" id="gen-amt" placeholder="' + t('card_value') + '"><input type="number" id="gen-cnt" placeholder="' + t('count') + '" value="1"><button class="btn btn-accent" onclick="generateCards()">' + t('generate') + '</button><div id="cards-out" style="margin-top:10px; font-family:monospace; font-size:12px; color:green;"></div></div><div class="card" style="padding:15px;"><h4 style="margin-bottom:10px;">سجل البطاقات</h4><div id="cards-list" style="font-size:13px;">جاري التحميل...</div></div></div>';
                                c += '<div id="a-users" class="hidden"></div>';
                                c += '<div id="a-ads" class="hidden"></div>';
                                c += '<div id="a-settings" class="hidden"></div>';
                                c += '<div id="a-store" class="hidden"></div>';
                                document.getElementById('page-admin').innerHTML = c;
                            });
                        });
                    });
                });
            });
        });
    });
}

function adminTab(el, id) {
    var tabs = el.parentElement.querySelectorAll('.tab');
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
    el.classList.add('active');
    var contents = ['a-serv', 'a-with', 'a-trans', 'a-offers', 'a-devices', 'a-cards', 'a-users', 'a-ads', 'a-settings', 'a-store'];
    for (var j = 0; j < contents.length; j++) {
        var e = document.getElementById(contents[j]);
        if (e) e.classList.add('hidden');
    }
    var active = document.getElementById(id);
    if (active) active.classList.remove('hidden');
    if (id === 'a-with') loadAdminWithdrawals();
    if (id === 'a-offers') loadAdminPendingOffers();
    if (id === 'a-devices') loadAdminDevices();
    if (id === 'a-cards') loadAdminCardsList();
    if (id === 'a-users') loadUsersList();
    if (id === 'a-ads') loadAdminAds();
    if (id === 'a-settings') loadAdminSettings();
    if (id === 'a-store') loadAdminStore();
}

function approveService(id) {
    _supabase.from('services').update({ status: 'approved' }).eq('id', id).then(function() {
        Swal.fire(t('success'), t('approved_msg'), 'success'); renderAdmin();
    });
}

function rejectService(id) {
    Swal.fire({ title: t('reject_reason'), input: 'text', showCancelButton: true, confirmButtonText: t('reject'), cancelButtonText: t('cancel') }).then(function(r) {
        if (r.value) {
            _supabase.from('services').update({ status: 'rejected', rejection_reason: r.value }).eq('id', id).then(function() {
                Swal.fire(t('success'), t('rejected_msg'), 'success'); renderAdmin();
            });
        }
    });
}

// ✅ تبويب الأجهزة المسجلة (جديد)
function loadAdminDevices() {
    var box = document.getElementById('a-devices');
    if (!box) return;
    box.innerHTML = '<p>' + t('loading') + '</p>';
    
    // جلب الأجهزة
    _supabase.from('registered_devices').select('*').order('created_at', { ascending: false }).then(function(res) {
        if (res.error) { 
            box.innerHTML = '<p style="color:red;">حدث خطأ: ' + escHtml(res.error.message) + '</p>'; 
            return; 
        }
        
        if (!res.data || res.data.length === 0) { 
            box.innerHTML = '<div class="card"><p style="text-align:center;">لا توجد أجهزة مسجلة حتى الآن.</p></div>'; 
            return; 
        }
        
        var userIds = res.data.map(function(d) { return d.user_id; }).filter(function(id) { return id; });
        
        // جلب بيانات المستخدمين
        _supabase.from('profiles').select('id, full_name, email, phone, role').in('id', userIds).then(function(pRes) {
            var profilesMap = {};
            if (pRes.data) pRes.data.forEach(function(p) { profilesMap[p.id] = p; });
            
            var html = '<div class="card" style="padding:15px;"><h4 style="margin-bottom:15px;">📱 الأجهزة المسجلة (' + res.data.length + ')</h4><div style="overflow-x:auto;"><table class="devices-table"><thead><tr><th>المستخدم</th><th>البريد</th><th>التاريخ</th><th>IP</th><th>البصمة</th><th>إجراء</th></tr></thead><tbody>';
            
            res.data.forEach(function(dev) {
                var p = profilesMap[dev.user_id] || { full_name: 'غير معروف', role: 'مستخدم', email: dev.email }; 
                var created = new Date(dev.created_at).toLocaleDateString('ar-EG');
                var relTime = getRelativeTime(dev.created_at);
                var fp = dev.device_fingerprint || '';
                var fpShort = fp.length > 16 ? fp.substring(0, 16) + '...' : fp;
                var browserInfo = dev.browser_info || {};
                var browserTxt = browserInfo.browser ? (browserInfo.browser + ' / ' + (browserInfo.os || '')) : '-';
                
                html += '<tr>';
                html += '<td><b>' + escHtml(p.full_name || 'غير معروف') + '</b><br><small style="color:#888;">' + (p.role === 'provider' ? 'مزود' : p.role === 'admin' ? 'مدير' : 'مستخدم') + '</small></td>';
                html += '<td><span dir="ltr" style="font-size:10px;">' + escHtml(dev.email || p.email || '-') + '</span></td>';
                html += '<td><div style="font-size:11px;">' + created + '</div><div style="font-size:10px; color:#27ae60;">' + relTime + '</div></td>';
                html += '<td><span dir="ltr" style="font-family:monospace; font-size:10px;">' + escHtml(dev.ip_address || '-') + '</span></td>';
                html += '<td><div class="fp-code" title="' + escHtml(fp) + '">' + escHtml(fpShort) + '</div><div style="font-size:10px; color:#666;">' + escHtml(browserTxt) + '</div></td>';
                html += '<td><button class="btn btn-danger btn-sm" style="margin:0; padding:6px 10px; font-size:11px;" onclick="deleteDeviceFingerprint(\'' + escJs(dev.id) + '\', \'' + escJs(p.full_name || '') + '\')" title="حذف البصمة"><i class="fa-solid fa-trash"></i></button></td>';
                html += '</tr>';
            });
            html += '</tbody></table></div></div>';
            box.innerHTML = html;
        });
    }).catch(handleError);
}

function deleteDeviceFingerprint(id, userName) {
    Swal.fire({
        title: 'حذف بصمة الجهاز؟',
        html: 'سيتمكن الجهاز <b>' + escHtml(userName) + '</b> من التسجيل من جديد.<br><br><b>⚠️ استخدم هذا فقط عند الحاجة القصوى.</b>',
        icon: 'warning', showCancelButton: true,
        confirmButtonText: 'نعم، احذف', cancelButtonText: t('cancel'),
        confirmButtonColor: '#e74c3c'
    }).then(function(r) {
        if (!r.isConfirmed) return;
        _supabase.from('registered_devices').delete().eq('id', id).then(function(res) {
            if (res.error) return Swal.fire('خطأ', res.error.message, 'error');
            Swal.fire('تم', 'تم حذف البصمة', 'success');
            loadAdminDevices();
        });
    });
}

// ✅ تبويب العروض المعلقة (جديد)
function loadAdminPendingOffers() {
    var box = document.getElementById('a-offers');
    if (!box) return;
    box.innerHTML = '<p>' + t('loading') + '</p>';
    
    // جلب العروض أولاً
    _supabase.from('payment_requests').select('*').in('status', ['pending', 'paid']).order('created_at', { ascending: false }).limit(50).then(function(res) {
        if (res.error) { box.innerHTML = '<p style="color:red;">' + escHtml(res.error.message) + '</p>'; return; }
        if (!res.data || !res.data.length) { box.innerHTML = '<div class="card"><p style="text-align:center;">لا توجد عروض.</p></div>'; return; }
        
        // استخراج معرفات العملاء والمزودين
        var userIds = [];
        res.data.forEach(function(pr) {
            if (pr.client_id) userIds.push(pr.client_id);
            if (pr.provider_id) userIds.push(pr.provider_id);
        });
        userIds = [...new Set(userIds)]; // إزالة التكرار
        
        // جلب بيانات المستخدمين يدوياً
        _supabase.from('profiles').select('id, full_name, phone').in('id', userIds).then(function(pRes) {
            var profilesMap = {};
            if (pRes.data) pRes.data.forEach(function(p) { profilesMap[p.id] = p; });
            
            var html = '<div class="card" style="padding:15px;"><h4 style="margin-bottom:15px;">💸 عروض الأسعار (' + res.data.length + ')</h4>';
            res.data.forEach(function(pr) {
                var provider = profilesMap[pr.provider_id] || {}; // ربط المزود
                var client = profilesMap[pr.client_id] || {};     // ربط العميل
                
                var statusColor = pr.status === 'paid' ? '#27ae60' : '#f39c12';
                var statusText = pr.status === 'paid' ? '✅ مدفوع' : '⏳ معلق';
                var paymentMethod = pr.payment_method === 'wallet' ? '💳 محفظة' : pr.payment_method === 'phone_transfer' ? '📱 تحويل هاتف' : '-';
                var created = new Date(pr.created_at).toLocaleDateString('ar-EG');
                var relTime = getRelativeTime(pr.created_at);
                var expiresLeft = Math.max(0, Math.floor((new Date(pr.expires_at) - Date.now()) / 3600000));
                html += '<div style="border:1px solid #ddd; border-radius:10px; padding:12px; margin-bottom:10px; border-right:4px solid ' + statusColor + ';">' +
                    '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">' +
                        '<span style="background:' + statusColor + '; color:white; padding:3px 10px; border-radius:10px; font-size:11px; font-weight:bold;">' + statusText + '</span>' +
                        '<strong style="color:var(--accent); font-size:18px;">' + escHtml(pr.amount) + ' ' + t('currency') + '</strong>' +
                    '</div>' +
                    '<div style="font-size:12px; line-height:1.8;">' +
                        '<div>👤 <b>المزود:</b> ' + escHtml(provider.full_name || '-') + ' <span dir="ltr">(' + escHtml(provider.phone || '-') + ')</span></div>' +
                        '<div>👤 <b>العميل:</b> ' + escHtml(client.full_name || '-') + ' <span dir="ltr">(' + escHtml(client.phone || '-') + ')</span></div>' +
                        '<div>💳 <b>طريقة الدفع:</b> ' + paymentMethod + '</div>' +
                        '<div>📝 <b>النوع:</b> ' + (pr.payment_type === 'deposit' ? 'عربون' : 'كامل المبلغ') + '</div>' +
                        (pr.note ? '<div>💬 <b>ملاحظة:</b> ' + escHtml(pr.note) + '</div>' : '') +
                        '<div style="color:#666; font-size:11px; margin-top:5px;">📅 ' + created + ' - ' + relTime + '</div>' +
                        (pr.status === 'pending' ? '<div style="color:#f39c12; font-size:11px;">⏳ ينتهي خلال ' + expiresLeft + ' ساعة</div>' : '') +
                    '</div>';
                if (pr.receipt_url) {
                    html += '<a href="' + escHtml(pr.receipt_url) + '" target="_blank" style="color:var(--accent); font-size:12px; display:block; margin-top:8px;"><i class="fa-solid fa-image"></i> عرض إشعار التحويل</a>';
                }
                html += '</div>';
            });
            html += '</div>';
            box.innerHTML = html;
        });
    }).catch(handleError);
}


// ============================================================
// app.js — الجزء 10ب من 12: باقي دوال الإدارة
// ============================================================

function approveTransfer(id, uid, amount) {
    var amt = Number(amount);
    Swal.fire({
        title: 'تأكيد قبول الإيداع؟',
        html: 'سيتم خصم <b>' + amt + ' ' + t('currency') + '</b> من محفظتك وإضافتها لمحفظة العميل.',
        icon: 'question', showCancelButton: true,
        confirmButtonText: 'نعم، اقبل', cancelButtonText: 'إلغاء'
    }).then(function(conf) {
        if (!conf.isConfirmed) return;
        Swal.fire({ title: 'جاري التنفيذ...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
        Promise.all([
            _supabase.from('wallets').select('id, balance').eq('user_id', currentUser.id).maybeSingle(),
            _supabase.from('wallets').select('id, balance').eq('user_id', uid).maybeSingle(),
            _supabase.from('bank_transfers').select('status').eq('id', id).maybeSingle()
        ]).then(function(rs) {
            var adminW = rs[0].data, userW = rs[1].data, tRow = rs[2].data;
            if (!adminW) return Swal.fire('خطأ', 'محفظتك غير موجودة', 'error');
            if (!userW) return Swal.fire('خطأ', 'محفظة المستخدم غير موجودة', 'error');
            if (!tRow) return Swal.fire('خطأ', 'طلب التحويل غير موجود', 'error');
            if (tRow.status !== 'pending') return Swal.fire('تنبيه', 'تمت معالجة هذا الطلب مسبقاً', 'warning').then(function() { renderAdmin(); });
            if (Number(adminW.balance) < amt) return Swal.fire('تنبيه', 'رصيد محفظتك (' + Number(adminW.balance).toFixed(2) + ') لا يكفي', 'warning');

            _supabase.from('bank_transfers').update({ status: 'approved' }).eq('id', id).eq('status', 'pending').select().then(function(upd) {
                if (upd.error) return handleError(upd.error);
                if (!upd.data || !upd.data.length) return Swal.fire('تنبيه', 'الطلب تغيّر', 'warning').then(function() { renderAdmin(); });

                _supabase.from('wallets').update({ balance: Number(adminW.balance) - amt }).eq('id', adminW.id).then(function() {
                    _supabase.from('wallets').select('id, balance').eq('id', userW.id).maybeSingle().then(function(currentUserW) {
                        var newUserBal = Number(currentUserW.data.balance) + amt;
                        _supabase.from('wallets').update({ balance: newUserBal }).eq('id', userW.id).then(function() {
                            _supabase.from('transactions').insert([
                                { wallet_id: adminW.id, type: 'withdrawal', amount: amt, reference: 'تحويل بنكي لعميل' },
                                { wallet_id: userW.id, type: 'deposit', amount: amt, reference: 'تحويل بنكي مقبول' }
                            ]).then(function() {
                                Swal.fire(t('success'), t('added_msg'), 'success');
                                renderAdmin();
                            });
                        });
                    });
                });
            });
        }).catch(handleError);
    });
}

function rejectTransfer(id) {
    Swal.fire({
        title: t('reject_transfer'), input: 'text',
        inputPlaceholder: 'اكتب سبب الرفض...',
        showCancelButton: true, confirmButtonText: t('reject'), cancelButtonText: t('cancel')
    }).then(function(r) {
        if (!r.isConfirmed) return;
        var reason = (r.value && r.value.trim() !== '') ? r.value.trim() : 'مرفوض من الإدارة';
        Swal.fire({ title: 'جاري التنفيذ...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
        _supabase.from('bank_transfers').update({ status: 'rejected', rejection_reason: reason }).eq('id', id).then(function(res) {
            if (res.error) return handleError(res.error);
            Swal.fire('تم', 'تم رفض التحويل', 'success');
            renderAdmin();
        });
    });
}

function generateCards() {
    var a = parseFloat(document.getElementById('gen-amt').value);
    var c = parseInt(document.getElementById('gen-cnt').value);
    if (!a || !c) return Swal.fire(t('alert'), t('fill_fields'), 'warning');
    Swal.fire({ title: t('generating'), didOpen: function() { Swal.showLoading(); } });
    _supabase.rpc('generate_recharge_cards', { p_amount: a, p_count: c, p_admin_id: currentUser.id }).then(function(res) {
        if (res.error) { Swal.fire(t('error'), 'فشل التوليد: ' + res.error.message, 'error'); return; }
        if (res.data && res.data.length > 0) {
            var out = '';
            for (var i = 0; i < res.data.length; i++) out += '<div>رقم (' + escHtml(res.data[i].serial_number) + ') - كود: ' + escHtml(res.data[i].code) + '</div>';
            document.getElementById('cards-out').innerHTML = out;
            Swal.fire(t('success'), t('generated'), 'success');
            loadAdminCardsList();
        } else { Swal.fire(t('error'), 'لم يتم توليد أي بطاقات', 'error'); }
    });
}

function loadAdminCardsList() {
    var tableContainer = document.getElementById('cards-list');
    if (!tableContainer) return;
    tableContainer.innerHTML = '<p>جاري تحميل السجل...</p>';
    _supabase.from('recharge_cards').select('*, profiles!recharge_cards_used_by_fkey(full_name, phone, email)').order('created_at', { ascending: false }).then(function(res) {
        if (res.error) { tableContainer.innerHTML = '<p style="color:red;">خطأ: ' + escHtml(res.error.message) + '</p>'; return; }
        if (!res.data || res.data.length === 0) { tableContainer.innerHTML = '<p>لا توجد بطاقات مولدة.</p>'; return; }
        var html = '<div style="overflow-x:auto;"><table style="width:100%; border-collapse:collapse; font-size:12px; text-align:right;">';
        html += '<tr style="background:#eee; border-bottom:2px solid #ccc;"><th style="padding:5px;">التسلسل</th><th style="padding:5px;">الكود</th><th style="padding:5px;">القيمة</th><th style="padding:5px;">الحالة</th><th style="padding:5px;">مستخدم البطاقة</th></tr>';
        res.data.forEach(function(card) {
            var statusText = card.status === 'active' ? 'جديدة' : 'مستخدمة';
            var statusColor = card.status === 'active' ? 'var(--primary)' : 'red';
            var userInfo = '-';
            if (card.profiles) userInfo = '<b>' + escHtml(card.profiles.full_name) + '</b><br><small>' + escHtml(card.profiles.phone || '-') + '</small>';
            html += '<tr style="border-bottom:1px solid #ddd;"><td style="padding:8px; font-weight:bold;">' + escHtml(card.serial_number || '-') + '</td><td style="padding:8px; font-family:monospace; color:var(--primary);">' + escHtml(card.code) + '</td><td style="padding:8px;">' + escHtml(card.amount) + ' د.ل</td><td style="padding:8px; color:' + statusColor + '; font-weight:bold;">' + statusText + '</td><td style="padding:8px;">' + userInfo + '</td></tr>';
        });
        html += '</table></div>';
        tableContainer.innerHTML = html;
    });
}

function loadUsersList() {
    var container = document.getElementById('a-users');
    if (!container) return;
    container.innerHTML = '<div class="card"><p>جاري تحميل بيانات المستخدمين...</p></div>';
    _supabase.from('profiles').select('*, wallets(balance)').order('created_at', { ascending: false }).then(function(res) {
        if (res.error) { container.innerHTML = '<div class="card"><p style="color:red;">خطأ: ' + escHtml(res.error.message) + '</p></div>'; return; }
        var html = '<div class="card" style="padding:15px;"><h4 style="margin-bottom:15px;">قائمة المستخدمين والمزودين</h4><div style="overflow-x:auto;"><table style="width:100%; border-collapse:collapse; font-size:12px; text-align:right;">';
        html += '<tr style="background:#eee; border-bottom:2px solid #ccc;"><th style="padding:5px;">الاسم</th><th style="padding:5px;">الدور</th><th style="padding:5px;">الهاتف</th><th style="padding:5px;">الإيميل</th><th style="padding:5px;">الرصيد</th></tr>';
        if (res.data && res.data.length > 0) {
            res.data.forEach(function(user) {
                var roleText = user.role === 'admin' ? 'مدير' : (user.role === 'provider' ? 'مزود' : 'مستخدم');
                var roleColor = user.role === 'admin' ? 'var(--accent)' : (user.role === 'provider' ? 'var(--primary)' : '#007bff');
                var bal = user.wallets ? Number(user.wallets.balance).toFixed(2) : '0.00';
                html += '<tr style="border-bottom:1px solid #ddd;"><td style="padding:8px; font-weight:bold;">' + escHtml(user.full_name) + '</td><td style="padding:8px; color:' + roleColor + '; font-weight:bold;">' + roleText + '</td><td style="padding:8px;" dir="ltr">' + escHtml(user.phone || '-') + '</td><td style="padding:8px;">' + escHtml(user.email || '-') + '</td><td style="padding:8px; font-weight:bold; color:var(--primary);">' + bal + ' د.ل</td></tr>';
            });
        } else { html += '<tr><td colspan="5" style="text-align:center; padding:10px;">لا يوجد مستخدمين.</td></tr>'; }
        html += '</table></div></div>';
        container.innerHTML = html;
    });
}

function loadAdminAds() {
    var container = document.getElementById('a-ads');
    if (!container) return;
    container.innerHTML = '<div class="card"><p>جاري التحميل...</p></div>';
    var savedSec = localStorage.getItem('ad_duration_sec') || 5;
    var savedSpeed = localStorage.getItem('ad_speed_ms') || 300;
    _supabase.from('ads').select('*').order('created_at', { ascending: false }).then(function(res) {
        var html = '<div class="card" style="padding:15px; margin-bottom:15px; border: 2px solid var(--primary);">';
        html += '<h4 style="margin-bottom:10px; color:var(--primary);">إعدادات العرض والسرعة</h4>';
        html += '<label style="font-weight:bold; display:block; margin-bottom:5px; font-size:14px;">مدة بقاء الصورة (ثواني):</label>';
        html += '<input type="number" id="ad-sec-input" value="' + escHtml(savedSec) + '" min="1" style="margin-bottom:10px;">';
        html += '<label style="font-weight:bold; display:block; margin-bottom:5px; font-size:14px;">سرعة الانتقال (مللي ثانية):</label>';
        html += '<input type="number" id="ad-speed-input" value="' + escHtml(savedSpeed) + '" min="50" step="50" style="margin-bottom:15px;">';
        html += '<button class="btn btn-primary" onclick="saveAdSettings()" style="margin:0;">حفظ الإعدادات</button>';
        html += '</div>';
        html += '<div class="card" style="padding:15px; margin-bottom:15px;"><h4 style="margin-bottom:10px;">إضافة إعلان جديد</h4><input type="file" id="ad-img" accept="image/*" class="swal2-file" style="margin-bottom:10px;"><button class="btn btn-accent" onclick="uploadAd()">رفع الإعلان</button></div>';
        html += '<div class="card" style="padding:15px;"><h4 style="margin-bottom:10px;">الإعلانات الحالية</h4>';
        if (res.data && res.data.length > 0) {
            res.data.forEach(function(ad) {
                html += '<div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #ddd; padding:10px 0;"><img src="' + escHtml(ad.image_url) + '" style="width:80px; height:50px; object-fit:cover; border-radius:8px;"><button class="btn btn-danger btn-sm" onclick="deleteAd(\'' + escJs(ad.id) + '\')" style="margin:0;">حذف</button></div>';
            });
        } else { html += '<p style="text-align:center;">لا توجد إعلانات حالياً.</p>'; }
        html += '</div>';
        container.innerHTML = html;
    });
}

function saveAdSettings() {
    var sec = document.getElementById('ad-sec-input').value;
    var speed = document.getElementById('ad-speed-input').value;
    if (!sec || sec < 1 || !speed || speed < 50) return Swal.fire('تنبيه', 'أدخل قيماً صحيحة', 'warning');
    localStorage.setItem('ad_duration_sec', sec);
    localStorage.setItem('ad_speed_ms', speed);
    adDuration = Number(sec) * 1000;
    adSpeed = Number(speed);
    Swal.fire('تم', 'تم حفظ الإعدادات', 'success');
}

function uploadAd() {
    var fileInput = document.getElementById('ad-img');
    var file = fileInput.files[0];
    if (!file) return Swal.fire('تنبيه', 'اختر صورة للإعلان', 'warning');
    Swal.fire({ title: 'جاري الرفع...', didOpen: function() { Swal.showLoading(); } });
    var fileName = 'ad_' + Date.now() + '.' + file.name.split('.').pop();
    _supabase.storage.from('services').upload(fileName, file).then(function(upRes) {
        if (upRes.error) return Swal.fire('خطأ', upRes.error.message, 'error');
        var publicUrl = _supabase.storage.from('services').getPublicUrl(fileName).data.publicUrl;
        _supabase.from('ads').insert([{ image_url: publicUrl }]).then(function(insRes) {
            if (insRes.error) return Swal.fire('خطأ', insRes.error.message, 'error');
            Swal.fire('تم', 'تم إضافة الإعلان', 'success');
            loadAdminAds();
        });
    });
}

function deleteAd(id) {
    Swal.fire({ title: 'حذف الإعلان؟', icon: 'warning', showCancelButton: true, confirmButtonText: 'نعم، احذف', cancelButtonText: 'إلغاء' }).then(function(r) {
        if (r.isConfirmed) {
            _supabase.from('ads').delete().eq('id', id).then(function() {
                Swal.fire('تم', 'تم الحذف', 'success');
                loadAdminAds();
            });
        }
    });
}

function loadAdminSettings() {
    var container = document.getElementById('a-settings');
    if (!container) return;
    var currentPrice = platformSettings.chat_price || 10;
    var html = '<div class="card" style="padding:20px;"><h4 style="margin-bottom:15px; color:var(--primary);">إعدادات المنصة</h4><label style="font-weight:bold; display:block; margin-bottom:5px;">سعر فتح المحادثة (د.ل):</label><input type="number" id="chat-price-setting" value="' + escHtml(currentPrice) + '" style="margin-bottom:15px;"><button class="btn btn-primary" onclick="updateChatPrice()">حفظ السعر</button></div>';
    container.innerHTML = html;
}

function updateChatPrice() {
    var newPrice = parseFloat(document.getElementById('chat-price-setting').value);
    if (isNaN(newPrice) || newPrice < 0) return Swal.fire('تنبيه', 'أدخل سعراً صحيحاً', 'warning');
    Swal.fire({ title: 'جاري الحفظ...', didOpen: function() { Swal.showLoading(); } });
    _supabase.from('platform_settings').update({ chat_price: newPrice }).eq('id', 1).then(function(res) {
        if (res.error) return Swal.fire('خطأ', res.error.message, 'error');
        platformSettings.chat_price = newPrice;
        Swal.fire('تم', 'تم تحديث السعر', 'success');
    });
}


// ============================================================
// app.js — الجزء 10ج من 12: إدارة السحب
// ============================================================

function loadAdminWithdrawals() {
    var box = document.getElementById('a-with');
    if (!box) return;
    box.innerHTML = '<p>' + t('loading') + '</p>';

    _supabase.from('withdrawals').select('*').in('status', ['pending', 'processing']).order('created_at', { ascending: false }).then(function(res) {
        if (res.error) { box.innerHTML = '<p style="color:red;">' + escHtml(res.error.message) + '</p>'; return; }
        if (!res.data || !res.data.length) { box.innerHTML = '<div class="card"><p style="text-align:center;">لا توجد طلبات سحب معلقة.</p></div>'; return; }

        var userIds = res.data.map(function(w) { return w.user_id; });
        Promise.all([
            _supabase.from('profiles').select('id, full_name, phone, email, role, created_at').in('id', userIds),
            _supabase.from('wallets').select('user_id, balance').in('user_id', userIds)
        ]).then(function(rs) {
            if (rs[0].error) { box.innerHTML = '<p style="color:red;">' + escHtml(rs[0].error.message) + '</p>'; return; }
            var profilesMap = {}; (rs[0].data || []).forEach(function(p) { profilesMap[p.id] = p; });
            var balances = {}; (rs[1].data || []).forEach(function(w) { balances[w.user_id] = w.balance; });

            var html = '';
            res.data.forEach(function(w) {
                var cust = profilesMap[w.user_id] || {};
                var isPending = w.status === 'pending';
                var statusLabel = isPending ? '🟠 في انتظار الموافقة' : '🔵 قيد المعالجة';
                var statusColor = isPending ? '#f39c12' : '#3498db';
                var roleText = cust.role === 'admin' ? 'مدير' : (cust.role === 'provider' ? 'مزود خدمة' : 'مستخدم');
                var userBalance = (balances[w.user_id] !== undefined && balances[w.user_id] !== null) ? Number(balances[w.user_id]).toFixed(2) : '-';
                var createdDate = cust.created_at ? new Date(cust.created_at).toLocaleDateString('ar-EG') : '-';
                var d = parseBankDetails(w.bank_details);
                var reqDate = new Date(w.created_at);
                var reqAbsDate = reqDate.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                var reqAbsTime = reqDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

                html += '<div class="card" style="padding:15px; margin-bottom:12px; border-right:4px solid ' + statusColor + ';">' +
                    '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">' +
                        '<span style="background:' + statusColor + '; color:white; padding:4px 10px; border-radius:12px; font-size:12px; font-weight:bold;">' + statusLabel + '</span>' +
                        '<strong style="color:var(--accent); font-size:18px;">' + escHtml(w.amount) + ' ' + t('currency') + '</strong>' +
                    '</div>' +
                    '<div style="font-size:11px; color:var(--text-muted); margin-bottom:8px; padding-bottom:6px; border-bottom:1px dashed #ddd; line-height:1.6;">' +
                        '<div><i class="fa-regular fa-calendar"></i> <b>تاريخ الطلب:</b> ' + reqAbsDate + ' - ' + reqAbsTime + '</div>' +
                        '<div style="color:var(--accent); margin-top:3px;"><i class="fa-solid fa-clock-rotate-left"></i> <span data-rel-time="' + w.created_at + '">' + getRelativeTime(reqDate) + '</span></div>' +
                    '</div>' +
                    '<div style="font-size:13px; line-height:1.9; background:#eef5ff; padding:12px; border-radius:8px; margin-bottom:8px; border:1px solid #bce;">' +
                        '<div style="font-weight:bold; color:var(--primary); margin-bottom:6px; font-size:14px;"><i class="fa-solid fa-user-circle"></i> بيانات العميل</div>' +
                        '<div><i class="fa-solid fa-user"></i> الاسم: <b>' + escHtml(cust.full_name || 'غير معروف') + '</b></div>' +
                        '<div><i class="fa-solid fa-phone"></i> الهاتف: <b dir="ltr">' + escHtml(cust.phone || '-') + '</b></div>' +
                        '<div><i class="fa-solid fa-envelope"></i> الإيميل: <b>' + escHtml(cust.email || '-') + '</b></div>' +
                        '<div><i class="fa-solid fa-id-badge"></i> الدور: <b>' + roleText + '</b></div>' +
                        '<div><i class="fa-solid fa-wallet"></i> الرصيد الحالي: <b style="color:var(--accent);">' + userBalance + ' ' + t('currency') + '</b></div>' +
                        '<div><i class="fa-regular fa-calendar"></i> عضو منذ: <b>' + createdDate + '</b></div>' +
                    '</div>' +
                    '<div style="font-size:13px; line-height:1.9; background:#fff8e5; padding:12px; border-radius:8px; border:1px solid #fce5a8;">' +
                        '<div style="font-weight:bold; color:#c97d00; margin-bottom:6px; font-size:14px;"><i class="fa-solid fa-money-bill-transfer"></i> بيانات السحب</div>' +
                        '<div><i class="fa-solid fa-user-tag"></i> الاسم: <b>' + escHtml(d.full_name) + '</b></div>' +
                        '<div><i class="fa-solid fa-building-columns"></i> المصرف: <b>' + escHtml(d.bank_name) + '</b></div>' +
                        '<div><i class="fa-solid fa-code-branch"></i> الفرع: <b>' + escHtml(d.branch) + '</b></div>' +
                        '<div><i class="fa-solid fa-hashtag"></i> الحساب: <b style="font-family:monospace; direction:ltr;">' + escHtml(d.account_number) + '</b></div>' +
                        '<div><i class="fa-solid fa-globe"></i> IBAN: <b style="direction:ltr; display:inline-block; font-family:monospace; word-break:break-all;">' + escHtml(d.iban) + '</b></div>' +
                    '</div>' +
                    '<div style="display:flex; gap:8px; margin-top:12px; flex-wrap:wrap;">' +
                        (isPending ?
                            '<button class="btn btn-primary btn-sm" style="margin:0; flex:1; min-width:130px;" onclick="startProcessingWithdrawal(\'' + escJs(w.id) + '\')"><i class="fa-solid fa-play"></i> بدء المعالجة</button>' :
                            '<button class="btn btn-accent btn-sm" style="margin:0; flex:1; min-width:130px;" onclick="completeWithdrawal(\'' + escJs(w.id) + '\')"><i class="fa-solid fa-check-circle"></i> تم السحب ← محفظتي</button>'
                        ) +
                        '<button class="btn btn-danger btn-sm" style="margin:0; flex:1; min-width:130px;" onclick="rejectAdminWithdrawal(\'' + escJs(w.id) + '\')"><i class="fa-solid fa-undo"></i> رفض وإرجاع</button>' +
                    '</div>' +
                '</div>';
            });
            box.innerHTML = html;
            startLiveTimers();
        }).catch(handleError);
    }).catch(handleError);
}

function startProcessingWithdrawal(id) {
    Swal.fire({
        title: 'بدء المعالجة؟',
        html: 'سيتم نقل الطلب إلى <b>قيد المعالجة</b>.<br><b>لن يتمكن المستخدم من الإلغاء بعد ذلك.</b>',
        icon: 'question', showCancelButton: true,
        confirmButtonText: 'نعم، ابدأ', cancelButtonText: 'إلغاء'
    }).then(function(r) {
        if (!r.isConfirmed) return;
        Swal.fire({ title: 'جاري التنفيذ...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
        _supabase.from('withdrawals').update({ status: 'processing' }).eq('id', id).eq('status', 'pending').select().then(function(upd) {
            if (upd.error) return handleError(upd.error);
            if (!upd.data || !upd.data.length) return Swal.fire('تنبيه', 'الطلب لم يعد في انتظار الموافقة.', 'warning').then(function() { loadAdminWithdrawals(); });
            Swal.fire('تم', 'الطلب قيد المعالجة', 'success');
            loadAdminWithdrawals();
        });
    });
}

function completeWithdrawal(id) {
    Swal.fire({
        title: 'تأكيد إتمام السحب؟',
        html: 'سيتم:<br>• إضافة المبلغ إلى <b>محفظتك (المدير)</b>.<br>• تسجيل العملية في سجل العميل.<br><br><b>⚠️ تأكد أنك حوّلت المبلغ فعلياً للعميل قبل المتابعة.</b>',
        icon: 'info', showCancelButton: true,
        confirmButtonText: 'نعم، تم السحب', cancelButtonText: 'إلغاء'
    }).then(function(r) {
        if (!r.isConfirmed) return;
        Swal.fire({ title: 'جاري التنفيذ...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
        _supabase.from('withdrawals').select('amount, user_id, status').eq('id', id).maybeSingle().then(function(w) {
            if (!w.data) return Swal.fire('خطأ', 'الطلب غير موجود', 'error');
            if (w.data.status !== 'processing') return Swal.fire('تنبيه', 'الطلب ليس قيد المعالجة.', 'warning').then(function() { loadAdminWithdrawals(); });
            var amt = Number(w.data.amount);
            _supabase.from('withdrawals').update({ status: 'completed' }).eq('id', id).eq('status', 'processing').select().then(function(upd) {
                if (upd.error) return handleError(upd.error);
                if (!upd.data || !upd.data.length) return Swal.fire('تنبيه', 'الطلب تغيّر.', 'warning').then(function() { loadAdminWithdrawals(); });
                _supabase.from('wallets').select('id, balance').eq('user_id', currentUser.id).maybeSingle().then(function(aw) {
                    if (!aw.data) return Swal.fire('خطأ', 'محفظتك غير موجودة', 'error');
                    _supabase.from('wallets').update({ balance: Number(aw.data.balance) + amt }).eq('id', aw.data.id).then(function() {
                        _supabase.from('transactions').insert([{ wallet_id: aw.data.id, type: 'deposit', amount: amt, reference: 'سحب مكتمل من عميل' }]).then(function() {
                            _supabase.from('wallets').select('id').eq('user_id', w.data.user_id).maybeSingle().then(function(uw) {
                                if (uw.data) _supabase.from('transactions').insert([{ wallet_id: uw.data.id, type: 'withdrawal', amount: amt, reference: 'تم تنفيذ السحب' }]);
                            });
                            Swal.fire('تم', 'تمت العملية. المبلغ الآن في محفظتك.', 'success');
                            loadAdminWithdrawals();
                        });
                    });
                });
            });
        });
    });
}

function rejectAdminWithdrawal(id) {
    Swal.fire({
        title: 'سبب الرفض',
        html: 'سيتم إرجاع المبلغ إلى <b>محفظة العميل</b>.',
        input: 'text',
        inputPlaceholder: 'اكتب سبب الرفض...',
        showCancelButton: true,
        confirmButtonText: 'رفض وإرجاع للعميل',
        cancelButtonText: 'إلغاء'
    }).then(function(r) {
        if (!r.isConfirmed) return;
        var reason = (r.value && r.value.trim() !== '') ? r.value.trim() : 'مرفوض من الإدارة';
        Swal.fire({ title: 'جاري التنفيذ...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
        _supabase.from('withdrawals').select('amount, user_id, status').eq('id', id).maybeSingle().then(function(w) {
            if (!w.data) return Swal.fire('خطأ', 'الطلب غير موجود', 'error');
            if (w.data.status === 'cancelled' || w.data.status === 'completed' || w.data.status === 'rejected') {
                return Swal.fire('تنبيه', 'الطلب لم يعد قابلاً للرفض.', 'warning').then(function() { loadAdminWithdrawals(); });
            }
            var amt = Number(w.data.amount);
            _supabase.from('withdrawals').update({ status: 'rejected', rejection_reason: reason }).eq('id', id).in('status', ['pending', 'processing']).select().then(function(upd) {
                if (upd.error) return handleError(upd.error);
                if (!upd.data || !upd.data.length) return Swal.fire('تنبيه', 'الطلب تغيّر.', 'warning').then(function() { loadAdminWithdrawals(); });
                _supabase.from('wallets').select('id, balance').eq('user_id', w.data.user_id).maybeSingle().then(function(uw) {
                    if (!uw.data) return Swal.fire('خطأ', 'محفظة العميل غير موجودة', 'error');
                    _supabase.from('wallets').update({ balance: Number(uw.data.balance) + amt }).eq('id', uw.data.id).then(function() {
                        _supabase.from('transactions').insert([{ wallet_id: uw.data.id, type: 'deposit', amount: amt, reference: 'إرجاع مبلغ سحب مرفوض - ' + reason }]).then(function() {
                            Swal.fire('تم', 'تم رفض الطلب وإرجاع ' + amt + ' ' + t('currency') + ' للعميل.', 'success');
                            loadAdminWithdrawals();
                        });
                    });
                });
            });
        });
    });
}


// ============================================================
// app.js — الجزء 11 من 12: الإشعارات + زر عرض السعر + التشغيل
// ============================================================

// ================= 12. الإشعارات =================
function loadNotifications() {
    if (!currentUser) return;
    _supabase.from('notifications').select('*', { count: 'exact', head: true }).eq('user_id', currentUser.id).eq('is_read', false).then(function(res) {
        var badge = document.getElementById('notif-badge');
        if (badge) {
            if (res.count && res.count > 0) { badge.innerText = res.count; badge.classList.remove('hidden'); }
            else { badge.classList.add('hidden'); }
        }
    });
}

function showNotifications() {
    Swal.fire({ title: 'جاري التحميل...', didOpen: function() { Swal.showLoading(); } });
    _supabase.from('notifications').select('*').eq('user_id', currentUser.id).order('created_at', { ascending: false }).then(function(res) {
        if (res.data && res.data.length > 0) {
            var html = '<div style="text-align:right; max-height:400px; overflow-y:auto;">';
            res.data.forEach(function(n) {
                var relTime = getRelativeTime(n.created_at);
                html += '<div style="padding:10px; border-bottom:1px solid #eee; ' + (n.is_read ? 'opacity:0.6;' : 'background:#f0f8ff;') + '">' +
                    '<strong>' + escHtml(n.title) + '</strong><br>' +
                    '<small>' + escHtml(n.message) + '</small><br>' +
                    '<small style="color:#999;">' + new Date(n.created_at).toLocaleString('ar-EG') + ' - ' + relTime + '</small></div>';
            });
            html += '</div>';
            Swal.fire({ title: 'الإشعارات', html: html, confirmButtonText: 'إغلاق' });
            _supabase.from('notifications').update({ is_read: true }).eq('user_id', currentUser.id).eq('is_read', false).then(function() {
                var badge = document.getElementById('notif-badge');
                if (badge) badge.classList.add('hidden');
            });
        } else {
            Swal.fire('الإشعارات', 'لا يوجد إشعارات جديدة', 'info');
        }
    });
}

// ================= 13. إشعارات المدير الفورية =================
var adminAlertAudio = new Audio('convert.mp3');
var adminWithdrawChannel = null;
var adminTransferChannel = null;
var adminWithdrawalUpdatesChannel = null;

function showAdminAlert(title, message) {
    adminAlertAudio.play().catch(function(e) { console.log("الصوت محظور", e); });
    Swal.fire({
        toast: true, position: 'top-end', icon: 'warning',
        title: title, text: message, showConfirmButton: false,
        timer: 6000, timerProgressBar: true,
        didOpen: function(toast) {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });
    if (typeof loadNotifications === 'function') loadNotifications();
    var aWith = document.getElementById('a-with');
    if (aWith && !aWith.classList.contains('hidden')) loadAdminWithdrawals();
    var aTrans = document.getElementById('a-trans');
    if (aTrans && !aTrans.classList.contains('hidden')) {
        var activeTab = document.querySelector('.tab.active');
        renderAdmin();
        if (activeTab) {
            var tabText = activeTab.getAttribute('onclick') || '';
            if (tabText.indexOf('a-trans') > -1) {
                setTimeout(function() {
                    var tabs = document.querySelectorAll('.tab');
                    for (var i = 0; i < tabs.length; i++) {
                        if ((tabs[i].getAttribute('onclick') || '').indexOf('a-trans') > -1) {
                            adminTab(tabs[i], 'a-trans');
                            break;
                        }
                    }
                }, 100);
            }
        }
    }
}

function startAdminRealtimeListeners() {
    if (!userProfile || userProfile.role !== 'admin') return;
    if (adminWithdrawChannel) _supabase.removeChannel(adminWithdrawChannel);
    adminWithdrawChannel = _supabase.channel('admin-withdrawals')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'withdrawals' }, function(payload) {
            var amount = payload.new.amount;
            var userId = payload.new.user_id;
            _supabase.from('profiles').select('full_name, role').eq('id', userId).maybeSingle().then(function(userRes) {
                var roleText = 'مستخدم', nameText = 'مستخدم';
                if (userRes.data) {
                    nameText = userRes.data.full_name;
                    roleText = userRes.data.role === 'provider' ? 'مزود خدمة' : (userRes.data.role === 'admin' ? 'مدير' : 'مستخدم');
                }
                showAdminAlert('طلب سحب جديد! 🚨', roleText + ' (' + nameText + ') يطلب سحب ' + amount + ' د.ل.');
            });
        }).subscribe();

    if (adminTransferChannel) _supabase.removeChannel(adminTransferChannel);
    adminTransferChannel = _supabase.channel('admin-transfers')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bank_transfers' }, function(payload) {
            var amount = payload.new.amount;
            var userId = payload.new.user_id;
            _supabase.from('profiles').select('full_name, role').eq('id', userId).maybeSingle().then(function(userRes) {
                var roleText = 'مستخدم', nameText = 'مستخدم';
                if (userRes.data) {
                    nameText = userRes.data.full_name;
                    roleText = userRes.data.role === 'provider' ? 'مزود خدمة' : (userRes.data.role === 'admin' ? 'مدير' : 'مستخدم');
                }
                showAdminAlert('طلب إيداع جديد! 💰', roleText + ' (' + nameText + ') أرسل طلب إيداع ' + amount + ' د.ل.');
            });
        }).subscribe();

    if (adminWithdrawalUpdatesChannel) _supabase.removeChannel(adminWithdrawalUpdatesChannel);
    adminWithdrawalUpdatesChannel = _supabase.channel('admin-withdrawal-updates')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'withdrawals' }, function(payload) {
            if (payload.new && payload.new.status === 'cancelled') {
                Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: 'قام أحد المستخدمين بإلغاء طلب سحب', showConfirmButton: false, timer: 4000 });
                var aWith = document.getElementById('a-with');
                if (aWith && !aWith.classList.contains('hidden')) loadAdminWithdrawals();
            }
        }).subscribe();
}

// ================= 14. إضافة زر "عرض سعر" في المحادثة =================
var _origOpenChat = openChat;
openChat = function(u, n, p) {
    _origOpenChat(u, n, p);
    setTimeout(addPaymentRequestButtonToChat, 300);
};

function addPaymentRequestButtonToChat() {
    if (userProfile.role !== 'provider') return;
    var header = document.querySelector('.chat-header');
    if (!header) return;
    if (document.getElementById('chat-payment-btn')) return;
    var isExpired = currentChatPermission && currentChatPermission.expires_at && new Date(currentChatPermission.expires_at) < new Date();
    if (isExpired) return;

    var btn = document.createElement('button');
    btn.id = 'chat-payment-btn';
    btn.className = 'chat-back';
    btn.style.background = 'rgba(243,146,0,0.5)';
    btn.innerHTML = '<i class="fa-solid fa-money-bill-wave"></i>';
    btn.title = 'إرسال عرض سعر';
    btn.onclick = openSendPaymentRequestModal;
    var closeBtn = header.querySelector('.chat-back');
    if (closeBtn && closeBtn.nextSibling) header.insertBefore(btn, closeBtn.nextSibling);
    else header.appendChild(btn);
}

// ================= 15. فحص الجلسة =================
function checkSession() {
    _supabase.auth.getSession().then(function(res) {
        if (res.data.session) {
            _supabase.from('profiles').select('*').eq('id', res.data.session.user.id).maybeSingle().then(function(pRes) {
                if (pRes.data) {
                    currentUser = res.data.session.user;
                    userProfile = pRes.data;
                    _supabase.from('platform_settings').select('*').eq('id', 1).maybeSingle().then(function(sRes) {
                        platformSettings = sRes.data || {};
                        setupUI();
                        navTo('home');
                    });
                }
            });
        }
    });

    // ✅ استماع لحدث استعادة كلمة المرور
    _supabase.auth.onAuthStateChange(function(event, session) {
        if (event === 'PASSWORD_RECOVERY') {
            setTimeout(function() { showForcedPasswordChange(); }, 500);
        }
    });
}

// ================= 16. التشغيل النهائي =================
document.addEventListener('DOMContentLoaded', function() {
    var savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    applyTranslations();

    // ✅ فحص رابط إعادة تعيين كلمة المرور
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reset') === '1') {
        setTimeout(function() {
            _supabase.auth.getSession().then(function(r) {
                if (r.data.session) showForcedPasswordChange();
            });
        }, 800);
    }

    // تمرير أفقي للشريط السفلي
    var navItemEl = document.querySelector('.nav-item');
    if (navItemEl && navItemEl.parentNode) {
        var navParent = navItemEl.parentNode;
        navParent.style.overflowX = 'auto';
        navParent.style.flexWrap = 'nowrap';
        navParent.style.justifyContent = 'flex-start';
        navParent.style.webkitOverflowScrolling = 'touch';
        navParent.style.scrollbarWidth = 'none';
        var styleInject = document.createElement('style');
        styleInject.textContent = '.nav-item { min-width: 60px !important; flex-shrink: 0 !important; } .nav-item span { font-size: 10px !important; white-space: nowrap; } .nav-item::-webkit-scrollbar, nav::-webkit-scrollbar { display: none !important; }';
        document.head.appendChild(styleInject);
    }

    // تحميل cards.js
    if (typeof renderCardsPage !== 'function') {
        var cardsScript = document.createElement('script');
        cardsScript.src = 'cards.js';
        cardsScript.onload = function() {
            if (typeof updateCartBadge === 'function' && currentUser) updateCartBadge();
        };
        document.head.appendChild(cardsScript);
    }

    checkSession();

    // ربط الأزرار
    var btnLogin = document.getElementById('btn-do-login');
    if (btnLogin) btnLogin.addEventListener('click', doLogin);
    var btnSignup = document.getElementById('btn-do-signup');
    if (btnSignup) btnSignup.addEventListener('click', doSignup);
    var linkSignup = document.getElementById('link-to-signup');
    if (linkSignup) linkSignup.addEventListener('click', showSignup);
    var linkLogin = document.getElementById('link-to-login');
    if (linkLogin) linkLogin.addEventListener('click', showLogin);

    // ✅ روابط الاستعادة الجديدة
    var linkForgotPassword = document.getElementById('link-forgot-password');
    if (linkForgotPassword) linkForgotPassword.addEventListener('click', function(e) { e.preventDefault(); showForgotPassword(); });
    var linkForgotEmail = document.getElementById('link-forgot-email');
    if (linkForgotEmail) linkForgotEmail.addEventListener('click', function(e) { e.preventDefault(); showForgotEmail(); });

    // أزرار الثيم واللغة
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
    var btnNotif = document.getElementById('btn-notifications');
    if (btnNotif) btnNotif.addEventListener('click', showNotifications);
});