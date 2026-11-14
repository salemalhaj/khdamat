var _supabase = supabase.createClient('https://ggaxlmhzdeczhgyjwyct.supabase.co', 'sb_publishable_Dy1TLIvbtiEEJM89KY9JzQ_eip7fCUI');
var currentLang = localStorage.getItem('lang') || 'ar';
var currentUser = null, userProfile = null, platformSettings = {};

var translations = {
    ar: { app_name: "منصة خدمات", app_name_short: "خدمات", login_title: "سجل دخولك", email: "البريد الإلكتروني", password: "كلمة المرور", login_btn: "دخول", create_acc: "أنشئ حساباً جديداً", signup_title: "حساب جديد", full_name: "الاسم الكامل", phone: "رقم الهاتف", role_user: "صاحب عمل (أطلب خدمة)", role_provider: "مزود خدمة (أقدم خدمة)", signup_btn: "تسجيل", have_acc: "لديك حساب؟ سجل الدخول", nav_home: "الرئيسية", nav_services: "الخدمات", nav_wallet: "المحفظة", nav_orders: "طلباتي", nav_my_services: "خدماتي", nav_admin: "الإدارة", welcome: "مرحباً، ", balance_title: "رصيد محفظتك", currency: "د.ل", deposit: "شحن", request_service: "طلب خدمة", add_service: "أضف خدمتك", admin_panel_btn: "لوحة الإدارة", tab_card: "بطاقة شحن", tab_bank: "تحويل بنكي", tab_withdraw: "سحب", tab_transfer: "تحويل", card_code: "أدخل كود البطاقة", confirm: "تأكيد", bank: "المصرف", name: "الاسم", account: "الحساب", transfer_amt: "المبلغ المحول", send_review: "إرسال للمراجعة", withdraw_note: "يتم السحب بعد موافقة الإدارة.", amount: "المبلغ", bank_name: "اسم المصرف", acc_num: "رقم الحساب", send: "إرسال", transfer_note: "حول فوراً عبر رقم هاتف المستخدم.", search: "بحث", transfer_now: "تحويل الآن", services_title: "الخدمات", new_service: "خدمة جديدة", status: "الحالة", approved: "معتمدة", pending: "قيد المراجعة", rejected: "مرفوضة", no_services: "لا يوجد خدمات.", no_services_avail: "لا يوجد خدمات متاحة.", request: "طلب", add_service_title: "إضافة خدمة", price: "السعر", desc: "الوصف", cancel: "إلغاء", orders_title: "طلباتي", no_orders: "لا يوجد طلبات.", admin_title: "الإدارة", users: "المستخدمون", total_money: "إجمالي الأموال", withdrawals: "سحب", transfers: "تحويلات", cards: "بطاقات", approve: "موافقة", reject: "رفض", view_receipt: "عرض الإيصال", generate: "توليد", card_value: "قيمة البطاقة", count: "العدد", alert: "تنبيه", error: "خطأ", success: "تم", fill_fields: "ملء جميع الحقول", login_failed: "فشل الدخول", invalid_creds: "بيانات غير صحيحة", profile_not_found: "الملف الشخصي غير موجود", creating: "جاري الإنشاء...", created_login: "تم الإنشاء! سجل الدخول الآن", verifying: "جاري التحقق...", sending: "جاري الإرسال...", uploading: "جاري الرفع...", request_sent: "تم إرسال الطلب", upload_failed: "فشل رفع الملف", number_not_found: "رقم غير موجود", transferring: "جاري التحويل...", transfer_success: "تم التحويل بنجاح", insufficient_balance: "رصيد غير كافٍ", top_up: "اشحن محفظتك", confirm_order: "تأكيد", deduct_for: "خصم {amount} لطلب {title}؟", yes: "نعم", ordering: "جاري الطلب...", order_success: "تم الطلب بنجاح", loading: "جاري التحميل...", generating: "جاري التوليد...", generated: "تم التوليد", reject_reason: "سبب الرفض", rejected_msg: "تم الرفض", approved_msg: "تمت الموافقة", bal_insufficient: "الرصيد غير كافٍ", added_msg: "تمت الإضافة", profile: "الملف الشخصي", role: "الدور", role_admin: "مدير", role_provider: "مزود", role_user: "مستخدم", close: "إغلاق", card_redeemed: "تم شحن البطاقة بنجاح!", card_error: "البطاقة غير صالحة أو مستخدمة" },
    en: { app_name: "Khdamat Platform", app_name_short: "Khdamat", login_title: "Login to your account", email: "Email", password: "Password", login_btn: "Login", create_acc: "Create a new account", signup_title: "New Account", full_name: "Full Name", phone: "Phone Number", role_user: "Client (Request Service)", role_provider: "Provider (Offer Service)", signup_btn: "Sign Up", have_acc: "Have an account? Login", nav_home: "Home", nav_services: "Services", nav_wallet: "Wallet", nav_orders: "My Orders", nav_my_services: "My Services", nav_admin: "Admin", welcome: "Welcome, ", balance_title: "Wallet Balance", currency: "LYD", deposit: "Deposit", request_service: "Request Service", add_service: "Add your service", admin_panel_btn: "Admin Panel", tab_card: "Recharge Card", tab_bank: "Bank Transfer", tab_withdraw: "Withdraw", tab_transfer: "Transfer", card_code: "Enter card code", confirm: "Confirm", bank: "Bank", name: "Name", account: "Account", transfer_amt: "Transferred Amount", send_review: "Send for Review", withdraw_note: "Withdrawal requires admin approval.", amount: "Amount", bank_name: "Bank Name", acc_num: "Account Number", send: "Send", transfer_note: "Transfer instantly via user's phone number.", search: "Search", transfer_now: "Transfer Now", services_title: "Services", new_service: "New Service", status: "Status", approved: "Approved", pending: "Pending", rejected: "Rejected", no_services: "No services found.", no_services_avail: "No services available.", request: "Request", add_service_title: "Add Service", price: "Price", desc: "Description", cancel: "Cancel", orders_title: "My Orders", no_orders: "No orders found.", admin_title: "Admin Panel", users: "Users", total_money: "Total Money", withdrawals: "Withdrawals", transfers: "Transfers", cards: "Cards", approve: "Approve", reject: "Reject", view_receipt: "View Receipt", generate: "Generate", card_value: "Card Value", count: "Count", alert: "Alert", error: "Error", success: "Done", fill_fields: "Please fill all fields", login_failed: "Login Failed", invalid_creds: "Invalid credentials", profile_not_found: "Profile not found", creating: "Creating...", created_login: "Created! Login now", verifying: "Verifying...", sending: "Sending...", uploading: "Uploading...", request_sent: "Request sent", upload_failed: "File upload failed", number_not_found: "Number not found", transferring: "Transferring...", transfer_success: "Transferred successfully", insufficient_balance: "Insufficient balance", top_up: "Please top up your wallet", confirm_order: "Confirm", deduct_for: "Deduct {amount} for ordering {title}?", yes: "Yes", ordering: "Ordering...", order_success: "Order successful", loading: "Loading...", generating: "Generating...", generated: "Generated successfully", reject_reason: "Rejection reason", rejected_msg: "Rejected", approved_msg: "Approved", bal_insufficient: "Insufficient balance", added_msg: "Added successfully", profile: "Profile", role: "Role", role_admin: "Admin", role_provider: "Provider", role_user: "User", close: "Close", card_redeemed: "Card redeemed successfully!", card_error: "Invalid or used card" }
};

function t(key) { return translations[currentLang][key] || key; }

function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    var elements = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < elements.length; i++) elements[i].innerText = t(elements[i].getAttribute('data-i18n'));
    var inputs = document.querySelectorAll('[data-i18n-placeholder]');
    for (var j = 0; j < inputs.length; j++) inputs[j].placeholder = t(inputs[j].getAttribute('data-i18n-placeholder'));
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
    Swal.fire({ title: currentLang === 'ar' ? 'تم تغيير اللغة' : 'Language Changed', text: currentLang === 'ar' ? 'اللغة الآن: العربية' : 'Language is now: English', icon: 'success', timer: 1500, showConfirmButton: false });
}

function toggleTheme() {
    var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcons(next);
}

function updateThemeIcons(theme) {
    var icon = theme === 'light' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    var b1 = document.getElementById('btn-theme-top');
    var b2 = document.getElementById('btn-theme-main');
    if (b1) b1.innerHTML = icon;
    if (b2) b2.innerHTML = icon;
}

function showSignup(e) { if (e) e.preventDefault(); document.getElementById('login-screen').classList.add('hidden'); document.getElementById('signup-screen').classList.remove('hidden'); }
function showLogin(e) { if (e) e.preventDefault(); document.getElementById('signup-screen').classList.add('hidden'); document.getElementById('login-screen').classList.remove('hidden'); }

function doSignup() {
    var n = document.getElementById('signup-name').value.trim();
    var e = document.getElementById('signup-email').value.trim();
    var p = document.getElementById('signup-phone').value.trim();
    var pw = document.getElementById('signup-password').value;
    var r = document.getElementById('signup-role').value;
    if (!n || !e || !p || !pw) return Swal.fire(t('alert'), t('fill_fields'), 'warning');
    
    Swal.fire({ title: t('creating'), allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
    _supabase.auth.signUp({ email: e, password: pw, options: { data: { full_name: n, role: r, phone: p } } }).then(function(res) {
        if (res.error) { Swal.fire(t('error'), res.error.message, 'error'); return; }
        Swal.fire(t('success'), t('created_login'), 'success');
        document.getElementById('signup-screen').classList.add('hidden');
        document.getElementById('login-screen').classList.remove('hidden');
    });
}

function doLogin() {
    var email = document.getElementById('login-email').value.trim();
    var password = document.getElementById('login-password').value;
    if (!email || !password) return Swal.fire(t('alert'), t('fill_fields'), 'warning');
    
    Swal.fire({ title: t('verifying'), allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
    _supabase.auth.signInWithPassword({ email: email, password: password }).then(function(res) {
        if (res.error) { Swal.fire(t('login_failed'), t('invalid_creds'), 'error'); return; }
        
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
}

function doLogout() { _supabase.auth.signOut(); location.reload(); }

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
    if (page === 'admin') renderAdmin();
}

function showProfile() {
    if (!userProfile) return;
    Swal.fire({ title: t('profile'), html: '<p>' + t('name') + ': <b>' + userProfile.full_name + '</b></p><p>' + t('role') + ': <b>' + t('role_' + userProfile.role) + '</b></p>', confirmButtonText: t('close') });
}

function renderHome() {
    _supabase.from('wallets').select('balance').eq('user_id', currentUser.id).maybeSingle().then(function(wRes) {
        var bal = wRes.data ? Number(wRes.data.balance).toFixed(2) : '0.00';
        var c = '<div class="card" style="text-align:center; background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: white;"><p style="font-size:13px; opacity:0.9;">' + t('welcome') + userProfile.full_name + '</p><div class="balance" style="color:white;">' + bal + ' <span style="font-size:16px;">' + t('currency') + '</span></div><p style="font-size:12px; opacity:0.8;">' + t('balance_title') + '</p></div>';
        if (userProfile.role === 'provider') c += '<button class="btn btn-accent" onclick="showAddService()"><i class="fa-solid fa-plus"></i> ' + t('add_service') + '</button>';
        else if (userProfile.role === 'user') c += '<div class="grid-2"><button class="btn btn-accent" onclick="navTo(\'wallet\')"><i class="fa-solid fa-plus-circle"></i> ' + t('deposit') + '</button><button class="btn btn-primary" onclick="navTo(\'services\')"><i class="fa-solid fa-search"></i> ' + t('request_service') + '</button></div>';
        else if (userProfile.role === 'admin') c += '<button class="btn btn-accent" onclick="navTo(\'admin\')"><i class="fa-solid fa-shield-halved"></i> ' + t('admin_panel_btn') + '</button>';
        document.getElementById('page-home').innerHTML = c;
    });
}

function renderWallet() {
    document.getElementById('page-wallet').innerHTML = '<div class="card"><div class="tabs"><div class="tab active" onclick="switchTab(this, \'w-card\')">' + t('tab_card') + '</div><div class="tab" onclick="switchTab(this, \'w-bank\')">' + t('tab_bank') + '</div><div class="tab" onclick="switchTab(this, \'w-with\')">' + t('tab_withdraw') + '</div><div class="tab" onclick="switchTab(this, \'w-trans\')">' + t('tab_transfer') + '</div></div><div id="w-card"><input type="text" id="card-code" placeholder="' + t('card_code') + '"><button class="btn btn-primary" onclick="redeemCard()">' + t('confirm') + '</button></div><div id="w-bank" class="hidden"><div class="bank-details"><p><span>' + t('bank') + ':</span> ' + (platformSettings.bank_name || '-') + '</p><p><span>' + t('name') + ':</span> ' + (platformSettings.account_name || '-') + '</p><p><span>' + t('account') + ':</span> ' + (platformSettings.account_number || '-') + '</p><p><span>IBAN:</span> ' + (platformSettings.iban || '-') + '</p></div><input type="number" id="bank-amt" placeholder="' + t('transfer_amt') + '"><input type="file" id="bank-file" accept="image/*,application/pdf" style="background:var(--card-bg);"><button class="btn btn-accent" onclick="submitBankTransfer()">' + t('send_review') + '</button></div><div id="w-with" class="hidden"><p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">' + t('withdraw_note') + '</p><input type="number" id="with-amt" placeholder="' + t('amount') + '"><input type="text" id="with-bank" placeholder="' + t('bank_name') + '"><input type="text" id="with-acc" placeholder="' + t('acc_num') + '"><button class="btn btn-primary" onclick="requestWithdrawal()">' + t('send') + '</button></div><div id="w-trans" class="hidden"><p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">' + t('transfer_note') + '</p><input type="text" id="trans-phone" placeholder="' + t('phone') + '"><button class="btn btn-accent" onclick="searchPhone()">' + t('search') + '</button><div id="trans-result" style="font-weight:bold; color:var(--primary); margin-bottom:10px;"></div><input type="number" id="trans-amt" placeholder="' + t('amount') + '"><button class="btn btn-primary" onclick="executeTransfer()">' + t('transfer_now') + '</button></div></div>';
}

function switchTab(el, id) {
    var tabs = el.parentElement.querySelectorAll('.tab');
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
    el.classList.add('active');
    var contents = ['w-card', 'w-bank', 'w-with', 'w-trans'];
    for (var j = 0; j < contents.length; j++) { var e = document.getElementById(contents[j]); if (e) e.classList.add('hidden'); }
    var active = document.getElementById(id); if (active) active.classList.remove('hidden');
}

function redeemCard() {
    var code = document.getElementById('card-code').value.trim();
    if (!code) return Swal.fire(t('alert'), t('card_code'), 'warning');
    Swal.fire({ title: t('verifying'), didOpen: function() { Swal.showLoading(); } });
    _supabase.rpc('redeem_card', { card_code: code }).then(function(res) {
        if (res.error || !res.data.success) { Swal.fire(t('error'), res.error ? t('error') : t('card_error'), 'error'); return; }
        Swal.fire(t('success'), t('card_redeemed'), 'success');
        if (res.data.amount >= 1000) _supabase.rpc('notify_admins', { p_title: 'Large Deposit', p_message: userProfile.full_name + ' deposited ' + res.data.amount });
        renderWallet();
    });
}

function submitBankTransfer() {
    var amount = parseFloat(document.getElementById('bank-amt').value);
    var file = document.getElementById('bank-file').files[0];
    if (!amount || !file) return Swal.fire(t('alert'), t('fill_fields'), 'warning');
    Swal.fire({ title: t('uploading'), didOpen: function() { Swal.showLoading(); } });
    var fileName = Date.now() + '_' + currentUser.id + '.' + file.name.split('.').pop();
    _supabase.storage.from('receipts').upload(fileName, file).then(function(upRes) {
        if (upRes.error) { Swal.fire(t('error'), t('upload_failed'), 'error'); return; }
        var publicUrl = _supabase.storage.from('receipts').getPublicUrl(fileName).data.publicUrl;
        _supabase.from('bank_transfers').insert([{ user_id: currentUser.id, amount: amount, receipt_url: publicUrl }]).then(function() {
            _supabase.rpc('notify_admins', { p_title: 'Deposit Request', p_message: userProfile.full_name + ' sent ' + amount });
            Swal.fire(t('success'), t('request_sent'), 'success');
            renderWallet();
        });
    });
}

function requestWithdrawal() {
    var a = parseFloat(document.getElementById('with-amt').value);
    var b = document.getElementById('with-bank').value;
    var c = document.getElementById('with-acc').value;
    if (!a || !b || !c) return Swal.fire(t('alert'), t('fill_fields'), 'warning');
    Swal.fire({ title: t('sending'), didOpen: function() { Swal.showLoading(); } });
    _supabase.from('withdrawals').insert([{ user_id: currentUser.id, amount: a, bank_details: b + ' | ' + c }]).then(function() {
        _supabase.rpc('notify_admins', { p_title: 'Withdrawal Request', p_message: userProfile.full_name + ' requests ' + a });
        Swal.fire(t('success'), t('request_sent'), 'success');
        renderWallet();
    });
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
        if (res.erro
