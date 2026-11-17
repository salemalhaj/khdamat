var _supabase = supabase.createClient('https://ggaxlmhzdeczhgyjwyct.supabase.co', 'sb_publishable_Dy1TLIvbtiEEJM89KY9JzQ_eip7fCUI');
var currentLang = localStorage.getItem('lang') || 'ar';
var currentUser = null, userProfile = null, platformSettings = {};

var translations = {
    ar: { app_name: "منصة خدمات", app_name_short: "خدمات", login_title: "سجل دخولك", email: "البريد الإلكتروني", password: "كلمة المرور", login_btn: "دخول", create_acc: "أنشئ حساباً جديداً", signup_title: "حساب جديد", full_name: "الاسم الكامل", phone: "رقم الهاتف", role_user: "صاحب عمل", role_provider: "مزود خدمة", signup_btn: "تسجيل", have_acc: "لديك حساب؟ سجل الدخول", nav_home: "الرئيسية", nav_services: "الخدمات", nav_wallet: "المحفظة", nav_orders: "طلباتي", nav_messages: "الرسائل", nav_my_services: "خدماتي", nav_admin: "الإدارة", welcome: "مرحباً، ", balance_title: "رصيد محفظتك", currency: "د.ل", deposit: "شحن", request_service: "طلب خدمة", add_service: "أضف خدمتك", admin_panel_btn: "لوحة الإدارة", tab_card: "بطاقة شحن", tab_bank: "تحويل بنكي", tab_withdraw: "سحب", tab_transfer: "تحويل", card_code: "أدخل كود البطاقة", confirm: "تأكيد", bank: "المصرف", name: "الاسم", account: "الحساب", transfer_amt: "المبلغ المحول", send_review: "إرسال للمراجعة", withdraw_note: "يتم السحب بعد موافقة الإدارة.", amount: "المبلغ", bank_name: "اسم المصرف", acc_num: "رقم الحساب", send: "إرسال", transfer_note: "حول فوراً عبر رقم هاتف المستخدم.", search: "بحث", transfer_now: "تحويل الآن", services_title: "الخدمات", new_service: "خدمة جديدة", status: "الحالة", approved: "معتمدة", pending: "قيد المراجعة", rejected: "مرفوضة", no_services: "لا يوجد خدمات.", no_services_avail: "لا يوجد خدمات متاحة.", request: "طلب", add_service_title: "إضافة خدمة", price: "السعر", desc: "الوصف", cancel: "إلغاء", orders_title: "طلباتي", no_orders: "لا يوجد طلبات.", admin_title: "الإدارة", users: "المستخدمون", total_money: "إجمالي الأموال", withdrawals: "سحب", transfers: "تحويلات", cards: "بطاقات", approve: "موافقة", reject: "رفض", view_receipt: "عرض الإيصال", generate: "توليد", card_value: "قيمة البطاقة", count: "العدد", alert: "تنبيه", error: "خطأ", success: "تم", fill_fields: "ملء جميع الحقول", login_failed: "فشل الدخول", invalid_creds: "البريد الإلكتروني غير مؤكد، أو كلمة المرور خاطئة", profile_not_found: "الملف الشخصي غير موجود", creating: "جاري الإنشاء...", created_login: "تم إنشاء الحساب! يرجى تفقد بريدك الإلكتروني لتأكيد الحساب، ثم قم بتسجيل الدخول.", verifying: "جاري التحقق...", sending: "جاري الإرسال...", uploading: "جاري الرفع...", request_sent: "تم إرسال الطلب", upload_failed: "فشل رفع الملف", number_not_found: "رقم غير موجود", transferring: "جاري التحويل...", transfer_success: "تم التحويل بنجاح", insufficient_balance: "رصيد غير كافٍ", top_up: "اشحن محفظتك", confirm_order: "تأكيد", deduct_for: "خصم {amount} لطلب {title}؟", yes: "نعم", ordering: "جاري الطلب...", order_success: "تم الطلب بنجاح", loading: "جاري التحميل...", generating: "جاري التوليد...", generated: "تم التوليد", reject_reason: "سبب الرفض", rejected_msg: "تم الرفض", approved_msg: "تمت الموافقة", bal_insufficient: "الرصيد غير كافٍ", added_msg: "تمت الإضافة", profile: "الملف الشخصي", role: "الدور", role_admin: "مدير", role_provider: "مزود", role_user: "مستخدم", close: "إغلاق", card_redeemed: "تم شحن البطاقة بنجاح!", card_error: "البطاقة غير صالحة أو مستخدمة" },
    en: { app_name: "Khdamat", app_name_short: "Khdamat", login_title: "Login", email: "Email", password: "Password", login_btn: "Login", create_acc: "Create Account", signup_title: "New Account", full_name: "Full Name", phone: "Phone", role_user: "Client", role_provider: "Provider", signup_btn: "Sign Up", have_acc: "Have an account? Login", nav_home: "Home", nav_services: "Services", nav_wallet: "Wallet", nav_orders: "Orders", nav_my_services: "My Services", nav_admin: "Admin", welcome: "Welcome, ", balance_title: "Wallet Balance", currency: "LYD", deposit: "Deposit", request_service: "Request Service", add_service: "Add your service", admin_panel_btn: "Admin Panel", tab_card: "Recharge Card", tab_bank: "Bank Transfer", tab_withdraw: "Withdraw", tab_transfer: "Transfer", card_code: "Enter card code", confirm: "Confirm", bank: "Bank", name: "Name", account: "Account", transfer_amt: "Amount", send_review: "Send for Review", withdraw_note: "Requires admin approval.", amount: "Amount", bank_name: "Bank Name", acc_num: "Account Number", send: "Send", transfer_note: "Transfer via phone number.", search: "Search", transfer_now: "Transfer Now", services_title: "Services", new_service: "New Service", status: "Status", approved: "Approved", pending: "Pending", rejected: "Rejected", no_services: "No services found.", no_services_avail: "No services available.", request: "Request", add_service_title: "Add Service", price: "Price", desc: "Description", cancel: "Cancel", orders_title: "My Orders", no_orders: "No orders found.", admin_title: "Admin Panel", users: "Users", total_money: "Total Money", withdrawals: "Withdrawals", transfers: "Transfers", cards: "Cards", approve: "Approve", reject: "Reject", view_receipt: "View Receipt", generate: "Generate", card_value: "Card Value", count: "Count", alert: "Alert", error: "Error", success: "Done", fill_fields: "Please fill all fields", login_failed: "Login Failed", invalid_creds: "Invalid credentials", profile_not_found: "Profile not found", creating: "Creating...", created_login: "Created! Login now", verifying: "Verifying...", sending: "Sending...", uploading: "Uploading...", request_sent: "Request sent", upload_failed: "Upload failed", number_not_found: "Number not found", transferring: "Transferring...", transfer_success: "Transferred!", insufficient_balance: "Insufficient balance", top_up: "Top up your wallet", confirm_order: "Confirm", deduct_for: "Deduct {amount} for {title}?", yes: "Yes", ordering: "Ordering...", order_success: "Order successful", loading: "Loading...", generating: "Generating...", generated: "Generated!", reject_reason: "Rejection reason", rejected_msg: "Rejected", approved_msg: "Approved", bal_insufficient: "Insufficient balance", added_msg: "Added!", profile: "Profile", role: "Role", role_admin: "Admin", role_provider: "Provider", role_user: "User", close: "Close", card_redeemed: "Card redeemed!", card_error: "Invalid or used card" }
};

function t(key) { return translations[currentLang][key] || key; }

function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(function(el) { el.innerText = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) { el.placeholder = t(el.getAttribute('data-i18n-placeholder')); });
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
    loadNotifications(); 
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
    if (page === 'messages') renderMessages();
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
        if (res.error || !res.data.success) { Swal.fire(t('error'), res.data ? res.data.message : t('error'), 'error'); return; }
        Swal.fire(t('success'), t('transfer_success'), 'success');
        renderWallet();
    });
}

function renderServices() {
    var c = '';
    if (userProfile.role === 'provider') {
        c += '<button class="btn btn-accent" onclick="showAddService()"><i class="fa-solid fa-plus"></i> ' + t('new_service') + '</button>';
        _supabase.from('services').select('*').eq('provider_id', currentUser.id).then(function(res) {
            if (res.data && res.data.length > 0) {
                for (var i=0; i<res.data.length; i++) {
                    var s = res.data[i];
                    c += '<div class="card" style="padding:15px; margin-bottom:10px;"><strong>' + s.title + '</strong> - ' + s.price + ' ' + t('currency') + '<p style="font-size:12px; color:var(--text-muted);">' + t('status') + ': ' + (s.status === 'approved' ? '✅ ' + t('approved') : (s.status === 'pending' ? '⏳ ' + t('pending') : '❌ ' + t('rejected'))) + '</p></div>';
                }
            } else c += '<div class="card"><p style="text-align:center;">' + t('no_services') + '</p></div>';
            document.getElementById('page-services').innerHTML = c;
        });
    } else {
        _supabase.from('services').select('*').eq('status', 'approved').then(function(res) {
            if (res.data && res.data.length > 0) {
                for (var i=0; i<res.data.length; i++) {
                    var s = res.data[i];
                     c += '<div class="card" style="padding:15px; margin-bottom:10px;">' + (s.image_url ? '<img src="' + s.image_url + '" style="width:100%; height:150px; object-fit:cover; border-radius:8px; margin-bottom:10px;">' : '') + '<h4 style="color:var(--primary); margin-bottom:5px;">' + s.title + '</h4><p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">' + (s.description || '') + '</p><div style="display:flex; justify-content:space-between; align-items:center;"><strong style="color:var(--accent);">' + s.price + ' ' + t('currency') + '</strong><button class="btn btn-primary btn-sm" onclick="orderService(\'' + s.id + '\')">' + t('request') + '</button></div></div>';
                }
            } else c += '<div class="card"><p style="text-align:center;">' + t('no_services_avail') + '</p></div>';
            document.getElementById('page-services').innerHTML = c;
        });
    }
}

function showAddService() {
    Swal.fire({ 
        title: t('add_service_title'), 
        html: '<input id="s-t" class="swal2-input" placeholder="' + t('name') + '"><input id="s-p" class="swal2-input" type="number" placeholder="' + t('price') + '"><textarea id="s-d" class="swal2-textarea" placeholder="' + t('desc') + '"></textarea><input id="s-img" type="file" class="swal2-file" accept="image/*" style="margin-top:10px;">', 
        confirmButtonText: t('send'), 
        showCancelButton: true, 
        cancelButtonText: t('cancel') 
    }).then(function(r) {
        if (r.isConfirmed) {
            var title = document.getElementById('s-t').value;
            var price = document.getElementById('s-p').value;
            var desc = document.getElementById('s-d').value;
            var file = document.getElementById('s-img').files[0];
            
            if (!title || !price) return Swal.fire(t('alert'), t('fill_fields'), 'warning');
            
            Swal.fire({ title: t('uploading'), didOpen: function() { Swal.showLoading(); } });
            
            var processService = function(imageUrl) {
                _supabase.from('services').insert([{ 
                    provider_id: currentUser.id, 
                    title: title, 
                    description: desc, 
                    price: parseFloat(price), 
                    status: 'pending',
                    image_url: imageUrl 
                }]).then(function() {
                    _supabase.rpc('notify_admins', { p_title: 'New Service', p_message: userProfile.full_name + ' added "' + title + '"' });
                    Swal.fire(t('success'), t('request_sent'), 'success');
                    renderServices();
                });
            };

            if (file) {
                var fileName = Date.now() + '_' + currentUser.id + '.' + file.name.split('.').pop();
                _supabase.storage.from('services').upload(fileName, file).then(function(upRes) {
                    if (upRes.error) {
                        processService(''); // إذا فشل الرفع، نضيف الخدمة بدون صورة
                    } else {
                        var publicUrl = _supabase.storage.from('services').getPublicUrl(fileName).data.publicUrl;
                        processService(publicUrl);
                    }
                });
            } else {
                processService(''); // إذا لم يختر صورة
            }
        }
    });
}

function orderService(id) {
    _supabase.from('services').select('*').eq('id', id).maybeSingle().then(function(sRes) {
        if (!sRes.data) return;
        var s = sRes.data;
        _supabase.from('wallets').select('balance').eq('user_id', currentUser.id).maybeSingle().then(function(wRes) {
            if (!wRes.data || wRes.data.balance < s.price) { Swal.fire(t('insufficient_balance'), t('top_up'), 'warning'); return; }
            var msg = t('deduct_for').replace('{amount}', s.price + ' ' + t('currency')).replace('{title}', s.title);
            Swal.fire({ title: t('confirm_order'), text: msg, showCancelButton: true, confirmButtonText: t('yes'), cancelButtonText: t('cancel') }).then(function(r) {
                if (!r.isConfirmed) return;
                Swal.fire({ title: t('ordering'), didOpen: function() { Swal.showLoading(); } });
                _supabase.from('wallets').update({ balance: wRes.data.balance - s.price }).eq('user_id', currentUser.id).then(function() {
                    _supabase.from('orders').insert([{ client_id: currentUser.id, service_id: s.id, total_amount: s.price, status: 'in_progress' }]).then(function() {
                        Swal.fire(t('success'), t('order_success'), 'success');
                        navTo('orders');
                    });
                });
            });
        });
    });
}

function renderOrders() {
    var c = '';
    if (userProfile.role === 'provider') {
        _supabase.from('services').select('id').eq('provider_id', currentUser.id).then(function(ms) {
            var ids = [];
            if (ms.data) for(var i=0; i<ms.data.length; i++) ids.push(ms.data[i].id);
            if (!ids.length) { document.getElementById('page-orders').innerHTML = '<div class="card"><p style="text-align:center;">' + t('no_orders') + '</p></div>'; return; }
            _supabase.from('orders').select('*, services(title)').in('service_id', ids).then(function(os) {
                if (os.data) for(var j=0; j<os.data.length; j++) { var o = os.data[j]; c += '<div class="card" style="padding:15px; margin-bottom:10px;"><strong>' + (o.services ? o.services.title : '') + '</strong><p style="color:var(--accent); font-weight:bold;">' + o.total_amount + ' ' + t('currency') + '</p></div>'; }
                document.getElementById('page-orders').innerHTML = c || '<div class="card"><p style="text-align:center;">' + t('no_orders') + '</p></div>';
            });
        });
    } else {
        _supabase.from('orders').select('*, services(title)').eq('client_id', currentUser.id).order('created_at', { ascending: false }).then(function(os) {
            if (os.data) for(var k=0; k<os.data.length; k++) { var o = os.data[k]; c += '<div class="card" style="padding:15px; margin-bottom:10px;"><strong>' + (o.services ? o.services.title : '') + '</strong><p style="color:var(--accent); font-weight:bold;">' + o.total_amount + ' ' + t('currency') + '</p></div>'; }
            document.getElementById('page-orders').innerHTML = c || '<div class="card"><p style="text-align:center;">' + t('no_orders') + '</p></div>';
        });
    }
}

function renderAdmin() {
    document.getElementById('page-admin').innerHTML = '<div class="card"><p>' + t('loading') + '</p></div>';
    _supabase.from('profiles').select('*', { count: 'exact', head: true }).then(function(ucRes) {
        _supabase.from('wallets').select('balance').then(function(wsRes) {
            var total = 0; if(wsRes.data) for(var i=0; i<wsRes.data.length; i++) total += Number(wsRes.data[i].balance);
            _supabase.from('services').select('*').eq('status', 'pending').then(function(psRes) {
                _supabase.from('withdrawals').select('*').eq('status', 'pending').then(function(pwRes) {
                    _supabase.from('bank_transfers').select('*').eq('status', 'pending').then(function(ptRes) {
                        var c = '<h2 style="color:var(--accent); margin-bottom:15px;"><i class="fa-solid fa-shield-halved"></i> ' + t('admin_title') + '</h2><div class="grid-2" style="margin-bottom:15px;"><div class="stat-box"><h3>' + (ucRes.count || 0) + '</h3><p>' + t('users') + '</p></div><div class="stat-box"><h3>' + total.toFixed(0) + '</h3><p>' + t('total_money') + '</p></div></div><div class="tabs"><div class="tab active" onclick="adminTab(this, \'a-serv\')">' + t('nav_services') + ' (' + (psRes.data ? psRes.data.length : 0) + ')</div><div class="tab" onclick="adminTab(this, \'a-with\')">' + t('withdrawals') + ' (' + (pwRes.data ? pwRes.data.length : 0) + ')</div><div class="tab" onclick="adminTab(this, \'a-trans\')">' + t('transfers') + ' (' + (ptRes.data ? ptRes.data.length : 0) + ')</div><div class="tab" onclick="adminTab(this, \'a-cards\')">' + t('cards') + '</div><div class="tab" onclick="adminTab(this, \'a-users\')">المستخدمون</div></div><div id="a-serv">';
                        if(psRes.data) for(var j=0; j<psRes.data.length; j++) { var s = psRes.data[j]; c += '<div class="card" style="padding:15px; margin-bottom:10px;"><strong>' + s.title + '</strong> - ' + s.price + ' ' + t('currency') + '<div style="display:flex; gap:8px; margin-top:10px;"><button class="btn btn-primary btn-sm" onclick="approveService(\'' + s.id + '\')">' + t('approve') + '</button><button class="btn btn-danger btn-sm" onclick="rejectService(\'' + s.id + '\')">' + t('reject') + '</button></div></div>'; }
                        if (!psRes.data || !psRes.data.length) c += '<p style="text-align:center;">' + t('no_services') + '</p>';
                        c += '</div><div id="a-with" class="hidden">';
                        if(pwRes.data) for(var k=0; k<pwRes.data.length; k++) { var w = pwRes.data[k]; c += '<div class="card" style="padding:15px; margin-bottom:10px;"><strong>' + t('amount') + ': ' + w.amount + ' ' + t('currency') + '</strong><p style="font-size:12px; color:var(--text-muted);">' + w.bank_details + '</p><button class="btn btn-primary btn-sm" style="margin-top:10px;" onclick="approveWithdrawal(\'' + w.id + '\', \'' + w.user_id + '\', ' + w.amount + ')">' + t('approve') + '</button></div>'; }
                        if (!pwRes.data || !pwRes.data.length) c += '<p style="text-align:center;">' + t('no_orders') + '</p>';
                        c += '</div><div id="a-trans" class="hidden">';
                        if(ptRes.data) for(var m=0; m<ptRes.data.length; m++) { var tx = ptRes.data[m]; c += '<div class="card" style="padding:15px; margin-bottom:10px;"><strong>' + t('amount') + ': ' + tx.amount + ' ' + t('currency') + '</strong><a href="' + tx.receipt_url + '" target="_blank" style="color:var(--accent); font-size:13px; display:block; margin:5px 0;">' + t('view_receipt') + '</a><button class="btn btn-primary btn-sm" onclick="approveTransfer(\'' + tx.id + '\', \'' + tx.user_id + '\', ' + tx.amount + ')">' + t('approve') + '</button></div>'; }
                        if (!ptRes.data || !ptRes.data.length) c += '<p style="text-align:center;">' + t('no_orders') + '</p>';
                        c += '</div><div id="a-cards" class="hidden"><div class="card" style="padding:15px; margin-bottom:15px;"><h4 style="margin-bottom:10px;">توليد بطاقات جديدة</h4><input type="number" id="gen-amt" placeholder="' + t('card_value') + '"><input type="number" id="gen-cnt" placeholder="' + t('count') + '" value="1"><button class="btn btn-accent" onclick="generateCards()">' + t('generate') + '</button><div id="cards-out" style="margin-top:10px; font-family:monospace; font-size:12px; color:green;"></div></div><div class="card" style="padding:15px;"><h4 style="margin-bottom:10px;">سجل البطاقات</h4><div id="cards-list" style="font-size:13px;">جاري التحميل...</div></div></div>';
                        c += '</div><div id="a-users" class="hidden"></div>';
                        document.getElementById('page-admin').innerHTML = c;
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
    var contents = ['a-serv', 'a-with', 'a-trans', 'a-cards', 'a-users'];
    for (var j = 0; j < contents.length; j++) { var e = document.getElementById(contents[j]); if (e) e.classList.add('hidden'); }
    var active = document.getElementById(id); if (active) active.classList.remove('hidden');
    
    if (id === 'a-cards') loadAdminCardsList();
    if (id === 'a-users') loadUsersList();
}

function approveService(id) { _supabase.from('services').update({ status: 'approved' }).eq('id', id).then(function() { Swal.fire(t('success'), t('approved_msg'), 'success'); renderAdmin(); }); }
function rejectService(id) {
    Swal.fire({ title: t('reject_reason'), input: 'text', showCancelButton: true, confirmButtonText: t('reject'), cancelButtonText: t('cancel') }).then(function(r) {
        if (r.value) { _supabase.from('services').update({ status: 'rejected', rejection_reason: r.value }).eq('id', id).then(function() { Swal.fire(t('success'), t('rejected_msg'), 'success'); renderAdmin(); }); }
    });
}
function approveWithdrawal(id, uid, amount) {
    _supabase.from('wallets').select('id, balance').eq('user_id', uid).maybeSingle().then(function(wRes) {
        if (!wRes.data || wRes.data.balance < amount) { Swal.fire(t('error'), t('bal_insufficient'), 'error'); return; }
        _supabase.from('wallets').update({ balance: wRes.data.balance - amount }).eq('id', wRes.data.id).then(function() {
            _supabase.from('transactions').insert([{ wallet_id: wRes.data.id, type: 'withdrawal', amount: amount, reference: 'Bank Withdrawal' }]).then(function() {
                _supabase.from('withdrawals').update({ status: 'approved' }).eq('id', id).then(function() {
                    Swal.fire(t('success'), t('approved_msg'), 'success'); renderAdmin();
                });
            });
        });
    });
}
function approveTransfer(id, uid, amount) {
    _supabase.from('wallets').select('id, balance').eq('user_id', uid).maybeSingle().then(function(wRes) {
        if (!wRes.data) return;
        _supabase.from('wallets').update({ balance: wRes.data.balance + amount }).eq('id', wRes.data.id).then(function() {
            _supabase.from('transactions').insert([{ wallet_id: wRes.data.id, type: 'deposit', amount: amount, reference: 'Bank Transfer' }]).then(function() {
                _supabase.from('bank_transfers').update({ status: 'approved' }).eq('id', id).then(function() {
                    Swal.fire(t('success'), t('added_msg'), 'success'); renderAdmin();
                });
            });
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
            for(var i=0; i<res.data.length; i++) out += '<div>' + res.data[i].code + ' - ' + res.data[i].amount + ' ' + t('currency') + '</div>';
            document.getElementById('cards-out').innerHTML = out;
            Swal.fire(t('success'), t('generated'), 'success');
        } else { Swal.fire(t('error'), 'لم يتم توليد أي بطاقات', 'error'); }
    });
}
function loadAdminCardsList() {
    var tableContainer = document.getElementById('cards-list');
    if (!tableContainer) return;
    tableContainer.innerHTML = '<p>جاري تحميل السجل...</p>';

    _supabase.from('recharge_cards')
        .select('*, profiles!recharge_cards_used_by_fkey(full_name, phone, email)')
        .order('created_at', { ascending: false })
        .then(function(res) {
            if (res.error) {
                tableContainer.innerHTML = '<p style="color:red;">خطأ: ' + res.error.message + '</p>';
                return;
            }
            if (!res.data || res.data.length === 0) {
                tableContainer.innerHTML = '<p>لا توجد بطاقات مولدة.</p>';
                return;
            }

            var html = '<div style="overflow-x:auto;"><table style="width:100%; border-collapse:collapse; font-size:12px; text-align:right;">';
            html += '<tr style="background:#eee; border-bottom:2px solid #ccc;"><th style="padding:5px;">التسلسل</th><th style="padding:5px;">الكود</th><th style="padding:5px;">القيمة</th><th style="padding:5px;">الحالة</th><th style="padding:5px;">مستخدم البطاقة</th></tr>';
            
            res.data.forEach(function(card) {
                var statusText = card.status === 'active' ? 'جديدة' : 'مستخدمة';
                var statusColor = card.status === 'active' ? 'var(--primary)' : 'red';
                var userInfo = '-';
                
                // إذا كان هناك مستخدم قام بتعبئتها
                if (card.profiles) {
                    userInfo = '<b>' + card.profiles.full_name + '</b><br>' + 
                               '<small>' + (card.profiles.phone || 'لا يوجد هاتف') + '</small><br>' + 
                               '<small>' + (card.profiles.email || 'لا يوجد إيميل') + '</small>';
                }
                
                html += '<tr style="border-bottom:1px solid #ddd;">';
                html += '<td style="padding:8px; font-weight:bold;">' + (card.serial_number || '-') + '</td>';
                html += '<td style="padding:8px; font-family:monospace; color:var(--primary);">' + card.code + '</td>';
                html += '<td style="padding:8px;">' + card.amount + ' د.ل</td>';
                html += '<td style="padding:8px; color:' + statusColor + '; font-weight:bold;">' + statusText + '</td>';
                html += '<td style="padding:8px;">' + userInfo + '</td>';
                html += '</tr>';
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
        if (res.error) {
            container.innerHTML = '<div class="card"><p style="color:red;">خطأ: ' + res.error.message + '</p></div>';
            return;
        }
        
        var html = '<div class="card" style="padding:15px;"><h4 style="margin-bottom:15px;">قائمة المستخدمين والمزودين</h4>';
        html += '<div style="overflow-x:auto;"><table style="width:100%; border-collapse:collapse; font-size:12px; text-align:right;">';
        html += '<tr style="background:#eee; border-bottom:2px solid #ccc;"><th style="padding:5px;">الاسم</th><th style="padding:5px;">الدور</th><th style="padding:5px;">الهاتف</th><th style="padding:5px;">الإيميل</th><th style="padding:5px;">الرصيد</th></tr>';
        
        if (res.data && res.data.length > 0) {
            res.data.forEach(function(user) {
                var roleText = user.role === 'admin' ? 'مدير' : (user.role === 'provider' ? 'مزود' : 'مستخدم');
                var roleColor = user.role === 'admin' ? 'var(--accent)' : (user.role === 'provider' ? 'var(--primary)' : '#007bff');
                var bal = user.wallets ? Number(user.wallets.balance).toFixed(2) : '0.00';
                
                html += '<tr style="border-bottom:1px solid #ddd;">';
                html += '<td style="padding:8px; font-weight:bold;">' + user.full_name + '</td>';
                html += '<td style="padding:8px; color:' + roleColor + '; font-weight:bold;">' + roleText + '</td>';
                html += '<td style="padding:8px;" dir="ltr">' + (user.phone || '-') + '</td>';
                html += '<td style="padding:8px;">' + (user.email || '-') + '</td>';
                html += '<td style="padding:8px; font-weight:bold; color:var(--primary);">' + bal + ' د.ل</td>';
                html += '</tr>';
            });
        } else {
            html += '<tr><td colspan="5" style="text-align:center; padding:10px;">لا يوجد مستخدمين.</td></tr>';
        }
        html += '</table></div></div>';
        container.innerHTML = html;
    });
}

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
}

function renderMessages() {
    document.getElementById('page-messages').innerHTML = '<div class="card"><p>جاري تحميل جهات الاتصال...</p></div>';
    _supabase.from('profiles').select('id, full_name, role').neq('id', currentUser.id).then(function(res) {
        var c = '<h2 style="color:var(--primary); margin-bottom:15px;">اختر مستخدماً للمحادثة</h2>';
        if (res.data && res.data.length > 0) {
            res.data.forEach(function(user) {
                c += '<div class="card" style="padding:15px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">' +
                     '<div><strong>' + user.full_name + '</strong><br><small style="color:var(--text-muted);">' + (user.role === 'provider' ? 'مزود خدمة' : 'مستخدم') + '</small></div>' +
                     '<button class="btn btn-primary btn-sm" onclick="openChat(\'' + user.id + '\', \'' + user.full_name + '\')"><i class="fa-solid fa-comment"></i> محادثة</button>' +
                     '</div>';
            });
        } else {
            c += '<div class="card"><p style="text-align:center;">لا يوجد مستخدمون آخرون.</p></div>';
        }
        document.getElementById('page-messages').innerHTML = c;
    });
}

var currentChatUserId = null;
var chatInterval = null;

function openChat(userId, userName) {
    currentChatUserId = userId;
    Swal.fire({
        title: 'محادثة مع ' + userName,
        html: '<div id="chat-box" style="height:250px; overflow-y:auto; border:1px solid #ddd; border-radius:8px; padding:10px; margin-bottom:10px; background:#f9f9f9; text-align:right;"></div>' +
              '<input id="chat-input" class="swal2-input" placeholder="اكتب رسالتك هنا..." style="margin-bottom:10px;">' +
              '<button class="btn btn-primary" onclick="sendChatMessage()" style="margin-top:0;">إرسال</button>',
        showConfirmButton: false,
        showCloseButton: true,
        didOpen: function() {
            loadChatMessages();
            chatInterval = setInterval(loadChatMessages, 3000);
        },
        willClose: function() {
            clearInterval(chatInterval);
            currentChatUserId = null;
        }
    });
}

function loadChatMessages() {
    if (!currentChatUserId) return;
    _supabase.from('messages').select('*')
    .or('and(sender_id.eq.' + currentUser.id + ',receiver_id.eq.' + currentChatUserId + '),and(sender_id.eq.' + currentChatUserId + ',receiver_id.eq.' + currentUser.id + ')')
    .order('created_at', { ascending: true })
    .then(function(res) {
        var box = document.getElementById('chat-box');
        if (!box) return;
        var html = '';
        if (res.data) {
            res.data.forEach(function(m) {
                var isMe = m.sender_id === currentUser.id;
                html += '<div style="margin-bottom:8px; text-align:' + (isMe ? 'left' : 'right') + ';">' +
                        '<span style="display:inline-block; padding:8px 12px; border-radius:10px; background:' + (isMe ? '#dcf8c6' : '#fff') + '; border:1px solid #eee; max-width:80%; font-size:14px;">' + m.message + '</span>' +
                        '</div>';
            });
        }
        box.innerHTML = html || '<p style="text-align:center; color:#999; font-size:12px;">لا توجد رسائل سابقة. ابدأ المحادثة!</p>';
        box.scrollTop = box.scrollHeight;
    });
}

function sendChatMessage() {
    var input = document.getElementById('chat-input');
    var msg = input.value.trim();
    if (!msg || !currentChatUserId) return;
    input.value = ''; 
    _supabase.from('messages').insert([{
        sender_id: currentUser.id,
        receiver_id: currentChatUserId,
        message: msg
    }]).then(function(res) {
        if (res.error) {
            Swal.showValidationMessage('فشل الإرسال: ' + res.error.message);
        } else {
            loadChatMessages();
        }
    });
}

function loadNotifications() {
    if (!currentUser) return;
    _supabase.from('notifications').select('*', { count: 'exact', head: true }).eq('user_id', currentUser.id).eq('is_read', false).then(function(res) {
        var badge = document.getElementById('notif-badge');
        if (badge) {
            if (res.count && res.count > 0) {
                badge.innerText = res.count;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    });
}

function showNotifications() {
    Swal.fire({ title: 'جاري التحميل...', didOpen: function() { Swal.showLoading(); } });
    _supabase.from('notifications').select('*').eq('user_id', currentUser.id).order('created_at', { ascending: false }).then(function(res) {
        if (res.data && res.data.length > 0) {
            var html = '<div style="text-align:right; max-height:300px; overflow-y:auto;">';
            res.data.forEach(function(n) {
                html += '<div style="padding:10px; border-bottom:1px solid #eee; ' + (n.is_read ? 'opacity:0.6;' : 'background:#f0f8ff;') + '">';
                html += '<strong>' + n.title + '</strong><br><small>' + n.message + '</small><br><small style="color:#999">' + new Date(n.created_at).toLocaleString('ar-EG') + '</small>';
                html += '</div>';
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
document.addEventListener('DOMContentLoaded', function() {
    var savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    applyTranslations();
    checkSession();

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

    var btnNotif = document.getElementById('btn-notifications');
    if (btnNotif) btnNotif.addEventListener('click', showNotifications);
});
// معالجة رابط تأكيد البريد الإلكتروني (الطريقة الصحيحة)
(function handleEmailConfirmation() {
    // نقرأ الرابط الذي يحتوي على token_hash
    var urlParams = new URLSearchParams(window.location.search);
    var tokenHash = urlParams.get('token_hash');
    var type = urlParams.get('type');

    // إذا وجدنا token_hash ونوعه signup، نبدأ عملية التأكيد
    if (tokenHash && type === 'signup') {
        Swal.fire({
            title: 'جاري تأكيد البريد...',
            allowOutsideClick: false,
            didOpen: function() { Swal.showLoading(); }
        });

        // نرسل الرمز إلى Supabase للتحقق منه
        _supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: 'signup'
        }).then(function(res) {
            if (res.error) {
                Swal.fire('خطأ', 'فشل تأكيد البريد: ' + res.error.message, 'error');
            } else {
                Swal.fire('تم', 'تم تأكيد بريدك الإلكتروني بنجاح! يمكنك الآن تسجيل الدخول.', 'success');
                // ننظف الرابط من الرموز
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        });
    }
})();