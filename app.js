// ================= 1. الإعدادات والترجمات =================
var _supabase = supabase.createClient('https://ggaxlmhzdeczhgyjwyct.supabase.co', 'sb_publishable_Dy1TLIvbtiEEJM89KY9JzQ_eip7fCUI');
var currentLang = localStorage.getItem('lang') || 'ar';
var currentUser = null, userProfile = null, platformSettings = {};

var translations = {
    ar: { app_name: "منصة خدمات", app_name_short: "خدمات", login_title: "سجل دخولك", email: "البريد الإلكتروني", password: "كلمة المرور", login_btn: "دخول", create_acc: "أنشئ حساباً جديداً", signup_title: "حساب جديد", full_name: "الاسم الكامل", phone: "رقم الهاتف", role_user: "صاحب عمل", role_provider: "مزود خدمة", signup_btn: "تسجيل", have_acc: "لديك حساب؟ سجل الدخول", nav_home: "الرئيسية", nav_services: "الخدمات", nav_wallet: "المحفظة", nav_orders: "طلباتي", nav_my_services: "خدماتي", nav_messages: "الرسائل", nav_admin: "الإدارة", nav_store: "المتجر", nav_cart: "السلة", nav_purchases: "مشترياتي", welcome: "مرحباً، ", balance_title: "رصيد محفظتك", currency: "د.ل", deposit: "شحن", request_service: "طلب خدمة", add_service: "أضف خدمتك", admin_panel_btn: "لوحة الإدارة", tab_card: "بطاقة شحن", tab_bank: "تحويل بنكي", tab_withdraw: "سحب", tab_transfer: "تحويل", card_code: "أدخل كود البطاقة", confirm: "تأكيد", bank: "المصرف", name: "الاسم", account: "الحساب", branch: "الفرع", iban: "رقم الحساب الدولي (IBAN)", transfer_amt: "المبلغ المحول", send_review: "إرسال للمراجعة", withdraw_note: "سيتم تجميد المبلغ فوراً ويُعاد إليك عند الإلغاء أو الرفض. لا يمكن الإلغاء بعد بدء المعالجة.", pending_withdrawals: "طلبات السحب المعلقة", processing_withdrawals: "قيد المعالجة", cancel_request: "إلغاء الطلب", amount: "المبلغ", bank_name: "اسم المصرف", acc_num: "رقم الحساب", send: "إرسال", transfer_note: "حول فوراً عبر رقم هاتف المستخدم.", search: "بحث", transfer_now: "تحويل الآن", services_title: "الخدمات", new_service: "خدمة جديدة", status: "الحالة", approved: "معتمدة", pending: "قيد المراجعة", rejected: "مرفوضة", no_services: "لا يوجد خدمات.", no_services_avail: "لا يوجد خدمات متاحة.", request: "طلب", add_service_title: "إضافة خدمة", price: "السعر", desc: "الوصف", cancel: "إلغاء", orders_title: "طلباتي", no_orders: "لا يوجد طلبات.", admin_title: "الإدارة", users: "المستخدمون", total_money: "إجمالي الأموال", my_balance: "رصيد محفظتي", withdrawals: "سحب", transfers: "تحويلات", cards: "بطاقات", approve: "موافقة", reject: "رفض", view_receipt: "عرض الإيصال", generate: "توليد", card_value: "قيمة البطاقة", count: "العدد", alert: "تنبيه", error: "خطأ", success: "تم", fill_fields: "ملء جميع الحقول", login_failed: "فشل الدخول", invalid_creds: "البريد غير مؤكد أو كلمة المرور خاطئة", profile_not_found: "الملف الشخصي غير موجود", creating: "جاري الإنشاء...", created_login: "تم إنشاء الحساب! يرجى تفقد بريدك الإلكتروني لتأكيد الحساب، ثم قم بتسجيل الدخول.", verifying: "جاري التحقق...", sending: "جاري الإرسال...", uploading: "جاري الرفع...", request_sent: "تم إرسال الطلب", upload_failed: "فشل رفع الملف", number_not_found: "رقم غير موجود", transferring: "جاري التحويل...", transfer_success: "تم التحويل بنجاح", insufficient_balance: "رصيد غير كافٍ", top_up: "اشحن محفظتك", confirm_order: "تأكيد", deduct_for: "خصم {amount} لطلب {title}؟", yes: "نعم", ordering: "جاري الطلب...", order_success: "تم الطلب بنجاح", loading: "جاري التحميل...", generating: "جاري التوليد...", generated: "تم التوليد", reject_reason: "سبب الرفض", rejected_msg: "تم الرفض", approved_msg: "تمت الموافقة", bal_insufficient: "الرصيد غير كافٍ", added_msg: "تمت الإضافة", profile: "الملف الشخصي", role: "الدور", role_admin: "مدير", role_provider: "مزود", role_user: "مستخدم", close: "إغلاق", card_redeemed: "تم شحن البطاقة بنجاح!", card_error: "البطاقة غير صالحة أو مستخدمة" },
    en: { app_name: "Khdamat", app_name_short: "Khdamat", login_title: "Login", email: "Email", password: "Password", login_btn: "Login", create_acc: "Create Account", signup_title: "New Account", full_name: "Full Name", phone: "Phone", role_user: "Client", role_provider: "Provider", signup_btn: "Sign Up", have_acc: "Have an account? Login", nav_home: "Home", nav_services: "Services", nav_wallet: "Wallet", nav_orders: "Orders", nav_my_services: "My Services", nav_messages: "Messages", nav_admin: "Admin", nav_store: "Store", nav_cart: "Cart", nav_purchases: "My Purchases", welcome: "Welcome, ", balance_title: "Wallet Balance", currency: "LYD", deposit: "Deposit", request_service: "Request Service", add_service: "Add your service", admin_panel_btn: "Admin Panel", tab_card: "Recharge Card", tab_bank: "Bank Transfer", tab_withdraw: "Withdraw", tab_transfer: "Transfer", card_code: "Enter card code", confirm: "Confirm", bank: "Bank", name: "Name", account: "Account", branch: "Branch", iban: "IBAN", transfer_amt: "Amount", send_review: "Send for Review", withdraw_note: "Amount will be frozen and refunded on cancel/reject. Cannot cancel after processing starts.", pending_withdrawals: "Pending Withdrawals", processing_withdrawals: "Processing", cancel_request: "Cancel Request", amount: "Amount", bank_name: "Bank Name", acc_num: "Account Number", send: "Send", transfer_note: "Transfer via phone number.", search: "Search", transfer_now: "Transfer Now", services_title: "Services", new_service: "New Service", status: "Status", approved: "Approved", pending: "Pending", rejected: "Rejected", no_services: "No services found.", no_services_avail: "No services available.", request: "Request", add_service_title: "Add Service", price: "Price", desc: "Description", cancel: "Cancel", orders_title: "My Orders", no_orders: "No orders found.", admin_title: "Admin Panel", users: "Users", total_money: "Total Money", my_balance: "My Balance", withdrawals: "Withdrawals", transfers: "Transfers", cards: "Cards", approve: "Approve", reject: "Reject", view_receipt: "View Receipt", generate: "Generate", card_value: "Card Value", count: "Count", alert: "Alert", error: "Error", success: "Done", fill_fields: "Please fill all fields", login_failed: "Login Failed", invalid_creds: "Email not confirmed or wrong password", profile_not_found: "Profile not found", creating: "Creating...", created_login: "Account created! Please check your email to confirm, then login.", verifying: "Verifying...", sending: "Sending...", uploading: "Uploading...", request_sent: "Request sent", upload_failed: "Upload failed", number_not_found: "Number not found", transferring: "Transferring...", transfer_success: "Transferred!", insufficient_balance: "Insufficient balance", top_up: "Top up your wallet", confirm_order: "Confirm", deduct_for: "Deduct {amount} for {title}?", yes: "Yes", ordering: "Ordering...", order_success: "Order successful", loading: "Loading...", generating: "Generating...", generated: "Generated!", reject_reason: "Rejection reason", rejected_msg: "Rejected", approved_msg: "Approved", bal_insufficient: "Insufficient balance", added_msg: "Added!", profile: "Profile", role: "Role", role_admin: "Admin", role_provider: "Provider", role_user: "User", close: "Close", card_redeemed: "Card redeemed!", card_error: "Invalid or used card" }
};

function t(key) { return translations[currentLang][key] || key; }

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

// ================= 2. المصادقة =================
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
    if (typeof loadNotifications === 'function') loadNotifications();
    if (typeof updateCartBadge === 'function') updateCartBadge();
    if (userProfile.role === 'admin') startAdminRealtimeListeners();
}

function doLogout() {
    if (adminWithdrawChannel) _supabase.removeChannel(adminWithdrawChannel);
    if (adminTransferChannel) _supabase.removeChannel(adminTransferChannel);
    if (adminWithdrawalUpdatesChannel) _supabase.removeChannel(adminWithdrawalUpdatesChannel);
    _supabase.auth.signOut();
    location.reload();
}

// ================= 3. التنقل =================
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

function showProfile() {
    if (!userProfile) return;
    Swal.fire({ title: t('profile'), html: '<p>' + t('name') + ': <b>' + escHtml(userProfile.full_name) + '</b></p><p>' + t('role') + ': <b>' + t('role_' + userProfile.role) + '</b></p>', confirmButtonText: t('close') });
}

// ================= 4. الصفحة الرئيسية والإعلانات =================
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
        var savedSec = localStorage.getItem('ad_duration_sec');
        if (savedSec) adDuration = Number(savedSec) * 1000;
        var savedSpeed = localStorage.getItem('ad_speed_ms');
        if (savedSpeed) adSpeed = Number(savedSpeed);

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

            if (userProfile.role === 'provider') c += '<button class="btn btn-accent" onclick="showAddService()"><i class="fa-solid fa-plus"></i> ' + t('add_service') + '</button>';
            else if (userProfile.role === 'user') c += '<div class="grid-2"><button class="btn btn-accent" onclick="navTo(\'wallet\')"><i class="fa-solid fa-plus-circle"></i> ' + t('deposit') + '</button><button class="btn btn-primary" onclick="navTo(\'services\')"><i class="fa-solid fa-search"></i> ' + t('request_service') + '</button></div>';
            else if (userProfile.role === 'admin') c += '<button class="btn btn-accent" onclick="navTo(\'admin\')"><i class="fa-solid fa-shield-halved"></i> ' + t('admin_panel_btn') + '</button>';

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
        setTimeout(function() { imgEl.src = adsList[currentAdIndex].image_url; imgEl.style.opacity = '1'; }, adSpeed);
    }
    for (var i = 0; i < adsList.length; i++) {
        var bar = document.getElementById('ad-bar-' + i);
        if (bar) { if (i < currentAdIndex) bar.style.width = '100%'; else bar.style.width = '0%'; }
    }
    adRemainingTime = adDuration;
    startProAdTimer();
}

function startProAdTimer() {
    isAdPaused = false; adStartTime = Date.now();
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

function pauseProAd() { if (isAdPaused) return; isAdPaused = true; clearTimeout(adTimer); clearInterval(progressInterval); adRemainingTime -= (Date.now() - adStartTime); if (adRemainingTime < 0) adRemainingTime = 0; }
function resumeProAd() { if (!isAdPaused) return; startProAdTimer(); }

function setupProAdsControls() {
    var box = document.getElementById('ads-touch-area');
    if (!box) return;
    var touchStartX = 0;
    box.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; pauseProAd(); }, { passive: true });
    box.addEventListener('touchend', function(e) {
        var touchEndX = e.changedTouches[0].clientX;
        var diff = touchStartX - touchEndX;
        resumeProAd();
        if (Math.abs(diff) > 40) { if (diff > 0) showProAdSlide(currentAdIndex + 1); else showProAdSlide(currentAdIndex - 1); }
    });
    box.addEventListener('mousedown', pauseProAd);
    box.addEventListener('mouseup', resumeProAd);
    box.addEventListener('mouseleave', function() { if (isAdPaused) resumeProAd(); });
}

// ================= 5. المحفظة =================
function renderWallet() {
    _supabase.from('wallets').select('id, balance').eq('user_id', currentUser.id).maybeSingle().then(function(wRes) {
        if (!wRes.data) {
            document.getElementById('page-wallet').innerHTML = '<div class="card"><p style="text-align:center;">' + t('error') + ' — لا توجد محفظة</p></div>';
            return;
        }
        var bal = Number(wRes.data.balance).toFixed(2);
        var walletId = wRes.data.id;

        Promise.all([
            _supabase.from('transactions').select('*').eq('wallet_id', walletId).order('created_at', { ascending: false }).limit(20),
            _supabase.from('withdrawals').select('*').eq('user_id', currentUser.id).in('status', ['pending', 'processing']).order('created_at', { ascending: false })
        ]).then(function(results) {
            var txRes = results[0];
            var pwRes = results[1];

            var balCard = '<div class="card" style="text-align:center; background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: white; margin-bottom:15px;"><p style="font-size:14px; opacity:0.9;">' + t('balance_title') + '</p><div style="font-size:32px; font-weight:bold;">' + bal + ' <span style="font-size:16px;">' + t('currency') + '</span></div></div>';

            var tabsHtml = '<div class="card"><div class="tabs"><div class="tab active" onclick="switchTab(this, \'w-card\')">' + t('tab_card') + '</div><div class="tab" onclick="switchTab(this, \'w-bank\')">' + t('tab_bank') + '</div><div class="tab" onclick="switchTab(this, \'w-with\')">' + t('tab_withdraw') + '</div><div class="tab" onclick="switchTab(this, \'w-trans\')">' + t('tab_transfer') + '</div></div>' +
                '<div id="w-card"><input type="text" id="card-code" placeholder="' + t('card_code') + '"><button class="btn btn-primary" onclick="redeemCard()">' + t('confirm') + '</button></div>' +
                '<div id="w-bank" class="hidden"><div class="bank-details"><p><span>' + t('bank') + ':</span> ' + escHtml(platformSettings.bank_name || '-') + '</p><p><span>' + t('name') + ':</span> ' + escHtml(platformSettings.account_name || '-') + '</p><p><span>' + t('account') + ':</span> ' + escHtml(platformSettings.account_number || '-') + '</p><p><span>IBAN:</span> ' + escHtml(platformSettings.iban || '-') + '</p></div><input type="number" id="bank-amt" placeholder="' + t('transfer_amt') + '"><input type="file" id="bank-file" accept="image/*,application/pdf" style="background:var(--card-bg);"><button class="btn btn-accent" onclick="submitBankTransfer()">' + t('send_review') + '</button></div>' +
                '<div id="w-with" class="hidden"><p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">' + t('withdraw_note') + '</p>' +
                    '<input type="number" id="with-amt" placeholder="' + t('amount') + '">' +
                    '<input type="text" id="with-name" value="' + escHtml(userProfile.full_name || '') + '" placeholder="' + t('full_name') + '">' +
                    '<input type="text" id="with-bank" placeholder="' + t('bank_name') + '">' +
                    '<input type="text" id="with-branch" placeholder="' + t('branch') + '">' +
                    '<input type="text" id="with-acc" placeholder="' + t('acc_num') + '">' +
                    '<input type="text" id="with-iban" placeholder="' + t('iban') + '" dir="ltr">' +
                    '<button class="btn btn-primary" onclick="requestWithdrawal()">' + t('send') + '</button></div>' +
                '<div id="w-trans" class="hidden"><p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">' + t('transfer_note') + '</p><input type="text" id="trans-phone" placeholder="' + t('phone') + '"><button class="btn btn-accent" onclick="searchPhone()">' + t('search') + '</button><div id="trans-result" style="font-weight:bold; color:var(--primary); margin-bottom:10px;"></div><input type="number" id="trans-amt" placeholder="' + t('amount') + '"><button class="btn btn-primary" onclick="executeTransfer()">' + t('transfer_now') + '</button></div></div>';

            var pwHtml = '';
            if (pwRes.data && pwRes.data.length > 0) {
                pwHtml += '<div class="card" style="margin-top:15px;"><h4 style="margin-bottom:15px; color:var(--primary);"><i class="fa-solid fa-hourglass-half"></i> ' + t('pending_withdrawals') + '</h4>';
                pwRes.data.forEach(function(w) {
                    var isPending = w.status === 'pending';
                    var statusText = isPending ? '🟠 ' + t('pending') : '🔵 ' + t('processing_withdrawals');
                    var statusColor = isPending ? '#f39c12' : '#3498db';
                    var d = parseBankDetails(w.bank_details);
                    var actionHtml = isPending
                        ? '<button class="btn btn-danger btn-sm" style="margin:0; flex:1;" onclick="cancelWithdrawal(\'' + escJs(w.id) + '\')"><i class="fa-solid fa-xmark"></i> ' + t('cancel_request') + '</button>'
                        : '<div style="font-size:12px; color:#3498db; font-weight:bold; flex:1; text-align:center;"><i class="fa-solid fa-lock"></i> لا يمكن الإلغاء بعد بدء المعالجة</div>';
                    pwHtml += '<div style="border:1px solid #ddd; border-radius:8px; padding:12px; margin-bottom:10px; border-right:4px solid ' + statusColor + ';">' +
                        '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">' +
                            '<span style="background:' + statusColor + '; color:white; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:bold;">' + statusText + '</span>' +
                            '<strong style="color:var(--accent);">' + escHtml(w.amount) + ' ' + t('currency') + '</strong>' +
                        '</div>' +
                        '<div style="font-size:12px; line-height:1.7; color:var(--text-muted); margin-bottom:8px;">' +
                            '<div>' + t('bank') + ': <b>' + escHtml(d.bank_name) + '</b> | ' + t('branch') + ': <b>' + escHtml(d.branch) + '</b></div>' +
                            '<div>' + t('account') + ': <b dir="ltr">' + escHtml(d.account_number) + '</b></div>' +
                        '</div>' +
                        '<div style="display:flex; gap:6px;">' + actionHtml + '</div>' +
                    '</div>';
                });
                pwHtml += '</div>';
            }

            var txHtml = '<div class="card" style="margin-top:15px;"><h4 style="margin-bottom:15px; color:var(--primary);"><i class="fa-solid fa-clock-rotate-left"></i> سجل المعاملات</h4>';
            if (txRes.data && txRes.data.length > 0) {
                txRes.data.forEach(function(tx) {
                    var isAdd = (tx.type === 'deposit' || tx.type === 'earning');
                    var icon = isAdd ? 'fa-arrow-down' : 'fa-arrow-up';
                    var color = isAdd ? '#27ae60' : '#e74c3c';
                    var sign = isAdd ? '+' : '-';
                    var typeAr = tx.type === 'deposit' ? 'إيداع / شحن' : (tx.type === 'withdrawal' ? 'سحب' : (tx.type === 'payment' ? 'دفع / خصم' : 'أرباح'));
                    var date = new Date(tx.created_at).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

                    txHtml += '<div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; padding:12px 0;">' +
                        '<div style="display:flex; align-items:center; gap:12px;">' +
                            '<div style="width:40px; height:40px; border-radius:50%; background:' + color + '15; color:' + color + '; display:flex; align-items:center; justify-content:center; font-size:18px;"><i class="fa-solid ' + icon + '"></i></div>' +
                            '<div><div style="font-weight:bold; font-size:14px; color:var(--text);">' + typeAr + '</div>' +
                            '<div style="font-size:12px; color:var(--text-muted); margin-top:2px;">' + escHtml(tx.reference || 'معاملة مالية') + '</div>' +
                            '<div style="font-size:10px; color:#999; margin-top:4px;"><i class="fa-regular fa-calendar"></i> ' + escHtml(date) + '</div></div>' +
                        '</div>' +
                        '<div style="text-align:left;"><div style="font-weight:bold; color:' + color + '; font-size:16px;">' + sign + escHtml(tx.amount) + ' ' + t('currency') + '</div></div>' +
                    '</div>';
                });
            } else {
                txHtml += '<p style="text-align:center; color:var(--text-muted); padding:20px 0;">لا توجد معاملات سابقة.</p>';
            }
            txHtml += '</div>';

            document.getElementById('page-wallet').innerHTML = balCard + tabsHtml + pwHtml + txHtml;
        });
    });
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
    var file = document.getElementById('bank-file').files[0];
    if (!amount || !file) return Swal.fire(t('alert'), t('fill_fields'), 'warning');
    Swal.fire({ title: t('uploading'), didOpen: function() { Swal.showLoading(); } });
    var fileName = Date.now() + '_' + currentUser.id + '.' + file.name.split('.').pop();
    _supabase.storage.from('receipts').upload(fileName, file).then(function(upRes) {
        if (upRes.error) { Swal.fire(t('error'), t('upload_failed'), 'error'); return; }
        var publicUrl = _supabase.storage.from('receipts').getPublicUrl(fileName).data.publicUrl;
        _supabase.from('bank_transfers').insert([{ user_id: currentUser.id, amount: amount, receipt_url: publicUrl, status: 'pending' }]).then(function() {
            _supabase.rpc('notify_admins', { p_title: 'Deposit Request', p_message: userProfile.full_name + ' sent ' + amount });
            Swal.fire(t('success'), t('request_sent'), 'success');
            renderWallet();
        });
    });
}

// 🛡️ نسخة دفاعية: تُجبر الحالة على pending حتى لو غيّرها trigger
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

    _supabase.from('wallets').select('id, balance').eq('user_id', currentUser.id).maybeSingle().then(function(wr) {
        if (!wr.data) return Swal.fire('خطأ', 'محفظتك غير موجودة', 'error');
        var bal = Number(wr.data.balance);
        if (bal < amt) return Swal.fire(t('insufficient_balance'), 'رصيدك غير كافٍ', 'warning');

        var newBal = bal - amt;
        var details = name + ' | ' + bank + ' | ' + branch + ' | ' + acc + ' | ' + iban;

        // 1) تجميد الرصيد
        _supabase.from('wallets').update({ balance: newBal }).eq('id', wr.data.id).then(function(upd) {
            if (upd.error) return handleError(upd.error);

            // 2) إدراج الطلب
            _supabase.from('withdrawals').insert([{
                user_id: currentUser.id,
                amount: amt,
                bank_details: details,
                status: 'pending'
            }]).select().then(function(ins) {
                if (ins.error) {
                    _supabase.from('wallets').update({ balance: bal }).eq('id', wr.data.id);
                    return handleError(ins.error);
                }
                var row = ins.data && ins.data[0];
                if (!row) {
                    _supabase.from('wallets').update({ balance: bal }).eq('id', wr.data.id);
                    return handleError(new Error('لم يتم إنشاء الطلب'));
                }

                var finish = function() {
                    _supabase.from('transactions').insert([{ wallet_id: wr.data.id, type: 'withdrawal', amount: amt, reference: 'طلب سحب (مجمّد)' }]);
                    _supabase.rpc('notify_admins', { p_title: 'Withdrawal Request', p_message: name + ' requests ' + amt });
                    Swal.fire(t('success'), 'تم إرسال طلب السحب وتجميد ' + amt + ' ' + t('currency'), 'success');
                    renderWallet();
                };

                // 3) إذا غيّر trigger الحالة → أعِدها pending قسرياً
                if (row.status === 'pending') {
                    finish();
                } else {
                    console.warn('[withdrawal] trigger غيّر الحالة إلى', row.status, '— إعادة إلى pending');
                    _supabase.from('withdrawals').update({ status: 'pending' }).eq('id', row.id).then(function(u) {
                        if (u.error) {
                            _supabase.from('withdrawals').delete().eq('id', row.id);
                            _supabase.from('wallets').update({ balance: bal }).eq('id', wr.data.id);
                            return handleError(u.error);
                        }
                        finish();
                    });
                }
            });
        });
    }).catch(handleError);
}

function cancelWithdrawal(id) {
    _supabase.from('withdrawals').select('status, amount, user_id').eq('id', id).maybeSingle().then(function(r) {
        if (!r.data) return Swal.fire('خطأ', 'الطلب غير موجود', 'error');
        if (r.data.user_id !== currentUser.id) return Swal.fire('خطأ', 'هذا ليس طلبك', 'error');
        if (r.data.status !== 'pending') {
            var msg = r.data.status === 'processing' ? 'لا يمكن الإلغاء: الإدارة بدأت المعالجة.' : 'لا يمكن الإلغاء: حالة الطلب "' + r.data.status + '".';
            return Swal.fire('تنبيه', msg, 'warning');
        }
        Swal.fire({
            title: t('cancel_request') + '؟',
            html: 'سيتم إرجاع <b>' + r.data.amount + ' ' + t('currency') + '</b> إلى محفظتك.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم، إلغاء',
            cancelButtonText: 'تراجع'
        }).then(function(conf) {
            if (!conf.isConfirmed) return;
            Swal.fire({ title: 'جاري التنفيذ...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
            _supabase.from('withdrawals').update({ status: 'cancelled' }).eq('id', id).eq('status', 'pending').select().then(function(upd) {
                if (upd.error) return handleError(upd.error);
                if (!upd.data || !upd.data.length) {
                    return Swal.fire('تنبيه', 'تعذّر الإلغاء: الإدارة بدأت المعالجة للتو.', 'warning').then(function() { renderWallet(); });
                }
                _supabase.from('wallets').select('id, balance').eq('user_id', currentUser.id).maybeSingle().then(function(wr) {
                    if (!wr.data) return handleError(new Error('محفظة غير موجودة'));
                    var newBal = Number(wr.data.balance) + Number(r.data.amount);
                    _supabase.from('wallets').update({ balance: newBal }).eq('id', wr.data.id).then(function() {
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
            return Swal.fire(t('error'), msg, 'error');
        }
        Swal.fire(t('success'), t('transfer_success'), 'success');
        renderWallet();
    }).catch(handleError);
}

// ================= 6. الخدمات والشات =================
function renderServices() {
    var c = '';
    if (userProfile.role === 'provider') {
        c += '<button class="btn btn-accent" onclick="showAddService()"><i class="fa-solid fa-plus"></i> ' + t('new_service') + '</button>';
        _supabase.from('services').select('*').eq('provider_id', currentUser.id).then(function(res) {
            if (res.data && res.data.length > 0) {
                for (var i=0; i<res.data.length; i++) {
                    var s = res.data[i];
                    c += '<div class="card" style="padding:15px; margin-bottom:10px;">' +
                        (s.image_url ? '<img src="' + escHtml(s.image_url) + '" style="width:100%; height:120px; object-fit:cover; border-radius:8px; margin-bottom:10px;">' : '') +
                        '<strong>' + escHtml(s.title) + '</strong> - ' + escHtml(s.price) + ' ' + t('currency') +
                        '<p style="font-size:12px; color:var(--text-muted);">' + t('status') + ': ' +
                        (s.status === 'approved' ? '✅ ' + t('approved') : (s.status === 'pending' ? '⏳ ' + t('pending') : '❌ ' + t('rejected'))) +
                        '</p></div>';
                }
            } else { c += '<div class="card"><p style="text-align:center;">' + t('no_services') + '</p></div>'; }
            document.getElementById('page-services').innerHTML = c;
        });
    } else {
        _supabase.from('services').select('*, profiles(full_name)').eq('status', 'approved').then(function(res) {
            if (res.data && res.data.length > 0) {
                for (var i=0; i<res.data.length; i++) {
                    var s = res.data[i];
                    var providerName = (s.profiles && s.profiles.full_name) ? escAttr(s.profiles.full_name) : 'المزود';
                    c += '<div class="card" style="padding:15px; margin-bottom:10px;">' +
                        (s.image_url ? '<img src="' + escHtml(s.image_url) + '" style="width:100%; height:150px; object-fit:cover; border-radius:8px; margin-bottom:10px;">' : '') +
                        '<h4 style="color:var(--primary); margin-bottom:5px;">' + escHtml(s.title) + '</h4>' +
                        '<p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">' + escHtml(s.description || '') + '</p>' +
                        '<div style="display:flex; justify-content:space-between; align-items:center;">' +
                            '<strong style="color:var(--accent);">' + escHtml(s.price) + ' ' + t('currency') + '</strong>' +
                            '<div style="display:flex; gap:5px;">' +
                                '<button class="btn btn-accent btn-sm" style="margin:0;" onclick="initiateChat(\'' + escJs(s.provider_id) + '\', \'' + providerName + '\')"><i class="fa-solid fa-comment"></i></button>' +
                                '<button class="btn btn-primary btn-sm" style="margin:0;" onclick="orderService(\'' + escJs(s.id) + '\')">' + t('request') + '</button>' +
                            '</div>' +
                        '</div></div>';
                }
            } else { c += '<div class="card"><p style="text-align:center;">' + t('no_services_avail') + '</p></div>'; }
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

function orderService(id) {
    _supabase.from('services').select('*').eq('id', id).maybeSingle().then(function(sRes) {
        if (!sRes.data) return;
        var s = sRes.data;
        var price = Number(s.price);
        _supabase.from('wallets').select('id, balance').eq('user_id', currentUser.id).maybeSingle().then(function(wRes) {
            var userBal = wRes.data ? Number(wRes.data.balance) : 0;
            if (!wRes.data || userBal < price) { Swal.fire(t('insufficient_balance'), t('top_up'), 'warning'); return; }
            var msg = t('deduct_for').replace('{amount}', price + ' ' + t('currency')).replace('{title}', s.title);

            Swal.fire({ title: t('confirm_order'), text: msg, showCancelButton: true, confirmButtonText: t('yes'), cancelButtonText: t('cancel') }).then(function(r) {
                if (!r.isConfirmed) return;
                Swal.fire({ title: t('ordering'), didOpen: function() { Swal.showLoading(); } });

                _supabase.from('wallets').update({ balance: userBal - price }).eq('user_id', currentUser.id).then(function() {
                    _supabase.from('wallets').select('id, balance').eq('user_id', s.provider_id).maybeSingle().then(function(pwRes) {
                        if (pwRes.data) {
                            var provBal = Number(pwRes.data.balance);
                            _supabase.from('wallets').update({ balance: provBal + price }).eq('id', pwRes.data.id);
                            _supabase.from('transactions').insert([{ wallet_id: pwRes.data.id, type: 'earning', amount: price, reference: 'أرباح طلب خدمة: ' + s.title }]);
                        }
                        _supabase.from('transactions').insert([{ wallet_id: wRes.data.id, type: 'payment', amount: price, reference: 'طلب خدمة: ' + s.title }]).then(function() {
                            _supabase.from('orders').insert([{ client_id: currentUser.id, service_id: s.id, total_amount: price, status: 'in_progress' }]).then(function() {
                                Swal.fire(t('success'), t('order_success'), 'success');
                                navTo('orders');
                            });
                        });
                    });
                });
            });
        });
    });
}

function initiateChat(providerId, providerName) {
    _supabase.from('chat_permissions').select('*').eq('client_id', currentUser.id).eq('provider_id', providerId).maybeSingle().then(function(res) {
        if (res.data) { openChat(providerId, providerName); }
        else {
            var price = (platformSettings.chat_price !== undefined && platformSettings.chat_price !== null) ? Number(platformSettings.chat_price) : 10;
            Swal.fire({ title: 'فتح محادثة', text: 'لبدء محادثة مع ' + providerName + '، يجب دفع رسوم قدرها ' + price + ' د.ل تُخصم من محفظتك.', icon: 'info', showCancelButton: true, confirmButtonText: 'دفع وفتح المحادثة', cancelButtonText: 'إلغاء', confirmButtonColor: 'var(--primary)' }).then(function(r) {
                if (r.isConfirmed) {
                    Swal.fire({ title: 'جاري الدفع...', didOpen: function() { Swal.showLoading(); } });
                    _supabase.rpc('pay_for_chat', { p_provider_id: providerId, p_amount: price }).then(function(payRes) {
                        if (payRes.error || !payRes.data || !payRes.data.success) {
                            Swal.fire('خطأ', payRes.error ? payRes.error.message : (payRes.data ? payRes.data.message : 'فشل الدفع'), 'error');
                        } else { Swal.fire('تم', 'تم الدفع بنجاح', 'success'); openChat(providerId, providerName); }
                    });
                }
            });
        }
    });
}

// ================= 7. الرسائل =================
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
                if (otherUser) {
                    c += '<div class="card" style="padding:15px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;"><div><strong>' + escHtml(otherUser.full_name) + '</strong><br><small style="color:var(--text-muted);">' + (otherUser.role === 'provider' ? 'مزود خدمة' : 'مستخدم') + '</small></div><button class="btn btn-primary btn-sm" onclick="openChat(\'' + escJs(otherUser.id) + '\', \'' + escAttr(otherUser.full_name) + '\')"><i class="fa-solid fa-comment"></i> محادثة</button></div>';
                }
            });
        } else { c += '<div class="card"><p style="text-align:center;">لا توجد محادثات نشطة.</p></div>'; }
        document.getElementById('page-messages').innerHTML = c;
    });
}

var currentChatUserId = null;
var chatInterval = null;

function openChat(userId, userName) {
    currentChatUserId = userId;
    Swal.fire({
        title: 'محادثة مع ' + escHtml(userName),
        html: '<div id="chat-box" style="height:250px; overflow-y:auto; border:1px solid #ddd; border-radius:8px; padding:10px; margin-bottom:10px; background:#f9f9f9; text-align:right;"></div><input id="chat-input" class="swal2-input" placeholder="اكتب رسالتك هنا..." style="margin-bottom:10px;"><button class="btn btn-primary" onclick="sendChatMessage()" style="margin-top:0;">إرسال</button>',
        showConfirmButton: false, showCloseButton: true,
        didOpen: function() { loadChatMessages(); chatInterval = setInterval(loadChatMessages, 3000); },
        willClose: function() { clearInterval(chatInterval); currentChatUserId = null; }
    });
}

function loadChatMessages() {
    if (!currentChatUserId) return;
    _supabase.from('messages').select('*').or('and(sender_id.eq.' + currentUser.id + ',receiver_id.eq.' + currentChatUserId + '),and(sender_id.eq.' + currentChatUserId + ',receiver_id.eq.' + currentUser.id + ')').order('created_at', { ascending: true }).then(function(res) {
        var box = document.getElementById('chat-box');
        if (!box) return;
        var html = '';
        if (res.data) {
            res.data.forEach(function(m) {
                var isMe = m.sender_id === currentUser.id;
                html += '<div style="margin-bottom:8px; text-align:' + (isMe ? 'left' : 'right') + ';"><span style="display:inline-block; padding:8px 12px; border-radius:10px; background:' + (isMe ? '#dcf8c6' : '#fff') + '; border:1px solid #eee; max-width:80%; font-size:14px;">' + escHtml(m.message) + '</span></div>';
            });
        }
        box.innerHTML = html || '<p style="text-align:center; color:#999; font-size:12px;">لا توجد رسائل سابقة.</p>';
        box.scrollTop = box.scrollHeight;
    });
}

function sendChatMessage() {
    var input = document.getElementById('chat-input');
    var msg = input.value.trim();
    if (!msg || !currentChatUserId) return;
    input.value = '';
    _supabase.from('messages').insert([{ sender_id: currentUser.id, receiver_id: currentChatUserId, message: msg }]).then(function(res) {
        if (res.error) {
            Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: 'فشل الإرسال: ' + res.error.message, showConfirmButton: false, timer: 3000 });
        } else { loadChatMessages(); }
    }).catch(handleError);
}

// ================= 8. الطلبات =================
function renderOrders() {
    var c = '';
    if (userProfile.role === 'provider') {
        _supabase.from('services').select('id').eq('provider_id', currentUser.id).then(function(ms) {
            var ids = [];
            if (ms.data) for(var i=0; i<ms.data.length; i++) ids.push(ms.data[i].id);
            if (!ids.length) { document.getElementById('page-orders').innerHTML = '<div class="card"><p style="text-align:center;">' + t('no_orders') + '</p></div>'; return; }
            _supabase.from('orders').select('*, services(title)').in('service_id', ids).then(function(os) {
                if (os.data) for(var j=0; j<os.data.length; j++) { var o = os.data[j]; c += '<div class="card" style="padding:15px; margin-bottom:10px;"><strong>' + escHtml(o.services ? o.services.title : '') + '</strong><p style="color:var(--accent); font-weight:bold;">' + escHtml(o.total_amount) + ' ' + t('currency') + '</p></div>'; }
                document.getElementById('page-orders').innerHTML = c || '<div class="card"><p style="text-align:center;">' + t('no_orders') + '</p></div>';
            });
        });
    } else {
        _supabase.from('orders').select('*, services(title)').eq('client_id', currentUser.id).order('created_at', { ascending: false }).then(function(os) {
            if (os.data) for(var k=0; k<os.data.length; k++) { var o = os.data[k]; c += '<div class="card" style="padding:15px; margin-bottom:10px;"><strong>' + escHtml(o.services ? o.services.title : '') + '</strong><p style="color:var(--accent); font-weight:bold;">' + escHtml(o.total_amount) + ' ' + t('currency') + '</p></div>'; }
            document.getElementById('page-orders').innerHTML = c || '<div class="card"><p style="text-align:center;">' + t('no_orders') + '</p></div>';
        });
    }
}

// ================= 9. لوحة الإدارة =================
function renderAdmin() {
    document.getElementById('page-admin').innerHTML = '<div class="card"><p>' + t('loading') + '</p></div>';
    _supabase.from('profiles').select('*', { count: 'exact', head: true }).then(function(ucRes) {
        _supabase.from('wallets').select('balance').then(function(wsRes) {
            var total = 0; if(wsRes.data) for(var i=0; i<wsRes.data.length; i++) total += Number(wsRes.data[i].balance);
            _supabase.from('wallets').select('balance').eq('user_id', currentUser.id).maybeSingle().then(function(myWRes) {
                var myBal = myWRes.data ? Number(myWRes.data.balance).toFixed(2) : '0.00';
                _supabase.from('services').select('*').eq('status', 'pending').then(function(psRes) {
                    _supabase.from('withdrawals').select('*').in('status', ['pending', 'processing']).then(function(pwRes) {
                        _supabase.from('bank_transfers').select('*').eq('status', 'pending').then(function(ptRes) {
                            var c = '<h2 style="color:var(--accent); margin-bottom:15px;"><i class="fa-solid fa-shield-halved"></i> ' + t('admin_title') + '</h2>';
                            c += '<div class="grid-2" style="margin-bottom:15px;">';
                            c += '<div class="stat-box"><h3>' + (ucRes.count || 0) + '</h3><p>' + t('users') + '</p></div>';
                            c += '<div class="stat-box"><h3>' + total.toFixed(0) + '</h3><p>' + t('total_money') + '</p></div>';
                            c += '<div class="stat-box" style="background:linear-gradient(135deg,#27ae60,#2ecc71); color:white;"><h3>' + myBal + '</h3><p>' + t('my_balance') + ' (' + t('currency') + ')</p></div>';
                            c += '</div>';
                            c += '<div class="tabs">';
                            c += '<div class="tab active" onclick="adminTab(this, \'a-serv\')">' + t('nav_services') + ' (' + (psRes.data ? psRes.data.length : 0) + ')</div>';
                            c += '<div class="tab" onclick="adminTab(this, \'a-with\')">' + t('withdrawals') + ' (' + (pwRes.data ? pwRes.data.length : 0) + ')</div>';
                            c += '<div class="tab" onclick="adminTab(this, \'a-trans\')">' + t('transfers') + ' (' + (ptRes.data ? ptRes.data.length : 0) + ')</div>';
                            c += '<div class="tab" onclick="adminTab(this, \'a-cards\')">' + t('cards') + '</div>';
                            c += '<div class="tab" onclick="adminTab(this, \'a-users\')">مستخدمون</div>';
                            c += '<div class="tab" onclick="adminTab(this, \'a-ads\')">الإعلانات</div>';
                            c += '<div class="tab" onclick="adminTab(this, \'a-settings\')">الإعدادات</div>';
                            c += '<div class="tab" onclick="adminTab(this, \'a-store\')">المتجر</div>';
                            c += '</div><div id="a-serv">';
                            if(psRes.data) for(var j=0; j<psRes.data.length; j++) { var s = psRes.data[j]; c += '<div class="card" style="padding:15px; margin-bottom:10px;"><strong>' + escHtml(s.title) + '</strong> - ' + escHtml(s.price) + ' ' + t('currency') + '<div style="display:flex; gap:8px; margin-top:10px;"><button class="btn btn-primary btn-sm" onclick="approveService(\'' + escJs(s.id) + '\')">' + t('approve') + '</button><button class="btn btn-danger btn-sm" onclick="rejectService(\'' + escJs(s.id) + '\')">' + t('reject') + '</button></div></div>'; }
                            if (!psRes.data || !psRes.data.length) c += '<p style="text-align:center;">' + t('no_services') + '</p>';
                            c += '</div><div id="a-with" class="hidden"></div><div id="a-trans" class="hidden">';
                            if(ptRes.data) for(var m=0; m<ptRes.data.length; m++) { var tx = ptRes.data[m]; c += '<div class="card" style="padding:15px; margin-bottom:10px;"><strong>' + t('amount') + ': ' + escHtml(tx.amount) + ' ' + t('currency') + '</strong><a href="' + escHtml(tx.receipt_url || '#') + '" target="_blank" rel="noopener noreferrer" style="color:var(--accent); font-size:13px; display:block; margin:5px 0;">' + t('view_receipt') + '</a><button class="btn btn-primary btn-sm" onclick="approveTransfer(\'' + escJs(tx.id) + '\', \'' + escJs(tx.user_id) + '\', ' + Number(tx.amount) + ')">' + t('approve') + '</button></div>'; }
                            if (!ptRes.data || !ptRes.data.length) c += '<p style="text-align:center;">' + t('no_orders') + '</p>';
                            c += '</div><div id="a-cards" class="hidden"><div class="card" style="padding:15px; margin-bottom:15px;"><h4 style="margin-bottom:10px;">توليد بطاقات جديدة</h4><input type="number" id="gen-amt" placeholder="' + t('card_value') + '"><input type="number" id="gen-cnt" placeholder="' + t('count') + '" value="1"><button class="btn btn-accent" onclick="generateCards()">' + t('generate') + '</button><div id="cards-out" style="margin-top:10px; font-family:monospace; font-size:12px; color:green;"></div></div><div class="card" style="padding:15px;"><h4 style="margin-bottom:10px;">سجل البطاقات</h4><div id="cards-list" style="font-size:13px;">جاري التحميل...</div></div>';
                            c += '</div><div id="a-users" class="hidden"></div>';
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
}

function adminTab(el, id) {
    var tabs = el.parentElement.querySelectorAll('.tab');
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
    el.classList.add('active');
    var contents = ['a-serv', 'a-with', 'a-trans', 'a-cards', 'a-users', 'a-ads', 'a-settings', 'a-store'];
    for (var j = 0; j < contents.length; j++) { var e = document.getElementById(contents[j]); if (e) e.classList.add('hidden'); }
    var active = document.getElementById(id); if (active) active.classList.remove('hidden');
    if (id === 'a-with') loadAdminWithdrawals();
    if (id === 'a-cards') loadAdminCardsList();
    if (id === 'a-users') loadUsersList();
    if (id === 'a-ads') loadAdminAds();
    if (id === 'a-settings') loadAdminSettings();
    if (id === 'a-store') loadAdminStore();
}

function approveService(id) { _supabase.from('services').update({ status: 'approved' }).eq('id', id).then(function() { Swal.fire(t('success'), t('approved_msg'), 'success'); renderAdmin(); }); }
function rejectService(id) {
    Swal.fire({ title: t('reject_reason'), input: 'text', showCancelButton: true, confirmButtonText: t('reject'), cancelButtonText: t('cancel') }).then(function(r) {
        if (r.value) { _supabase.from('services').update({ status: 'rejected', rejection_reason: r.value }).eq('id', id).then(function() { Swal.fire(t('success'), t('rejected_msg'), 'success'); renderAdmin(); }); }
    });
}

function approveTransfer(id, uid, amount) {
    var amt = Number(amount);
    Swal.fire({
        title: 'تأكيد قبول الإيداع؟',
        html: 'سيتم خصم <b>' + amt + ' ' + t('currency') + '</b> من محفظتك (المدير) وإضافتها لمحفظة العميل.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'نعم، اقبل',
        cancelButtonText: 'إلغاء'
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
            if (tRow.status !== 'pending') {
                return Swal.fire('تنبيه', 'تمت معالجة هذا الطلب مسبقاً (الحالة: ' + tRow.status + ')', 'warning').then(function() { renderAdmin(); });
            }
            if (Number(adminW.balance) < amt) {
                return Swal.fire('تنبيه', 'رصيد محفظتك (' + Number(adminW.balance).toFixed(2) + ') لا يكفي لتنفيذ العملية', 'warning');
            }
            _supabase.from('bank_transfers').update({ status: 'approved' }).eq('id', id).eq('status', 'pending').select().then(function(upd) {
                if (upd.error) return handleError(upd.error);
                if (!upd.data || !upd.data.length) {
                    return Swal.fire('تنبيه', 'الطلب تغيّر، أعد التحميل', 'warning').then(function() { renderAdmin(); });
                }
                _supabase.from('wallets').update({ balance: Number(adminW.balance) - amt }).eq('id', adminW.id).then(function() {
                    _supabase.from('wallets').update({ balance: Number(userW.balance) + amt }).eq('id', userW.id).then(function() {
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
        }).catch(handleError);
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
            for(var i=0; i<res.data.length; i++) out += '<div>رقم (' + escHtml(res.data[i].serial_number) + ') - كود: ' + escHtml(res.data[i].code) + '</div>';
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
            if (card.profiles) { userInfo = '<b>' + escHtml(card.profiles.full_name) + '</b><br><small>' + escHtml(card.profiles.phone || 'لا يوجد هاتف') + '</small><br><small>' + escHtml(card.profiles.email || 'لا يوجد إيميل') + '</small>'; }
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
        html += '<label style="font-weight:bold; display:block; margin-bottom:5px; font-size:14px;">مدة بقاء الصورة (بالثواني):</label>';
        html += '<input type="number" id="ad-sec-input" value="' + escHtml(savedSec) + '" min="1" placeholder="مثال: 5" style="margin-bottom:10px;">';
        html += '<label style="font-weight:bold; display:block; margin-bottom:5px; font-size:14px;">سرعة الدخول والخروج (مللي ثانية):</label>';
        html += '<input type="number" id="ad-speed-input" value="' + escHtml(savedSpeed) + '" min="50" step="50" placeholder="مثال: 300" style="margin-bottom:15px;">';
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
    if (!sec || sec < 1 || !speed || speed < 50) { return Swal.fire('تنبيه', 'أدخل قيماً صحيحة للوقت والسرعة (السرعة 50 أو أكثر)', 'warning'); }
    localStorage.setItem('ad_duration_sec', sec);
    localStorage.setItem('ad_speed_ms', speed);
    adDuration = Number(sec) * 1000;
    adSpeed = Number(speed);
    Swal.fire('تم', 'تم حفظ الإعدادات (الوقت: ' + sec + 'ث، السرعة: ' + speed + 'مللي)', 'success');
}
function uploadAd() {
    var fileInput = document.getElementById('ad-img');
    var file = fileInput.files[0];
    if (!file) return Swal.fire('تنبيه', 'اختر صورة للإعلان أولاً', 'warning');
    Swal.fire({ title: 'جاري الرفع...', didOpen: function() { Swal.showLoading(); } });
    var fileName = 'ad_' + Date.now() + '.' + file.name.split('.').pop();
    _supabase.storage.from('services').upload(fileName, file).then(function(upRes) {
        if (upRes.error) return Swal.fire('خطأ', upRes.error.message, 'error');
        var publicUrl = _supabase.storage.from('services').getPublicUrl(fileName).data.publicUrl;
        _supabase.from('ads').insert([{ image_url: publicUrl }]).then(function(insRes) {
            if (insRes.error) return Swal.fire('خطأ', insRes.error.message, 'error');
            Swal.fire('تم', 'تم إضافة الإعلان بنجاح', 'success');
            loadAdminAds();
        });
    });
}
function deleteAd(id) {
    Swal.fire({ title: 'حذف الإعلان؟', icon: 'warning', showCancelButton: true, confirmButtonText: 'نعم، احذف', cancelButtonText: 'إلغاء' }).then(function(r) {
        if (r.isConfirmed) {
            _supabase.from('ads').delete().eq('id', id).then(function() { Swal.fire('تم', 'تم الحذف', 'success'); loadAdminAds(); });
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
        Swal.fire('تم', 'تم تحديث سعر المحادثة بنجاح', 'success');
    });
}

function loadAdminWithdrawals() {
    var box = document.getElementById('a-with');
    if (!box) return;
    box.innerHTML = '<p>جاري التحميل...</p>';

    _supabase.from('withdrawals')
        .select('*')
        .in('status', ['pending', 'processing'])
        .order('created_at', { ascending: false })
        .then(function(res) {
            if (res.error) { box.innerHTML = '<p style="color:red;">خطأ: ' + escHtml(res.error.message) + '</p>'; return; }
            if (!res.data || !res.data.length) {
                box.innerHTML = '<div class="card"><p style="text-align:center;">لا توجد طلبات سحب معلقة.</p></div>';
                return;
            }

            var userIds = res.data.map(function(w) { return w.user_id; });
            Promise.all([
                _supabase.from('profiles').select('id, full_name, phone, email, role, created_at').in('id', userIds),
                _supabase.from('wallets').select('user_id, balance').in('user_id', userIds)
            ]).then(function(rs) {
                if (rs[0].error) { box.innerHTML = '<p style="color:red;">خطأ: ' + escHtml(rs[0].error.message) + '</p>'; return; }
                var profilesMap = {};
                (rs[0].data || []).forEach(function(p) { profilesMap[p.id] = p; });
                var balances = {};
                (rs[1].data || []).forEach(function(w) { balances[w.user_id] = w.balance; });

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

                    html += '<div class="card" style="padding:15px; margin-bottom:12px; border-right:4px solid ' + statusColor + ';">' +
                        '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">' +
                            '<span style="background:' + statusColor + '; color:white; padding:4px 10px; border-radius:12px; font-size:12px; font-weight:bold;">' + statusLabel + '</span>' +
                            '<strong style="color:var(--accent); font-size:18px;">' + escHtml(w.amount) + ' ' + t('currency') + '</strong>' +
                        '</div>' +
                        '<div style="font-size:13px; line-height:1.9; background:#eef5ff; padding:12px; border-radius:8px; margin-bottom:8px; border:1px solid #bce;">' +
                            '<div style="font-weight:bold; color:var(--primary); margin-bottom:6px; font-size:14px;"><i class="fa-solid fa-user-circle"></i> الملف الشخصي للمستخدم</div>' +
                            '<div><i class="fa-solid fa-user"></i> الاسم: <b>' + escHtml(cust.full_name || 'غير معروف') + '</b></div>' +
                            '<div><i class="fa-solid fa-phone"></i> الهاتف: <b dir="ltr">' + escHtml(cust.phone || '-') + '</b></div>' +
                            '<div><i class="fa-solid fa-envelope"></i> الإيميل: <b>' + escHtml(cust.email || '-') + '</b></div>' +
                            '<div><i class="fa-solid fa-id-badge"></i> الدور: <b>' + roleText + '</b></div>' +
                            '<div><i class="fa-solid fa-wallet"></i> الرصيد الحالي: <b style="color:var(--accent);">' + userBalance + ' ' + t('currency') + '</b></div>' +
                            '<div><i class="fa-regular fa-calendar"></i> عضو منذ: <b>' + createdDate + '</b></div>' +
                            '<div style="font-size:11px; color:#666; margin-top:3px; word-break:break-all;">ID: <span style="font-family:monospace; direction:ltr;">' + escHtml(String(w.user_id)) + '</span></div>' +
                        '</div>' +
                        '<div style="font-size:13px; line-height:1.9; background:#fff8e5; padding:12px; border-radius:8px; border:1px solid #fce5a8;">' +
                            '<div style="font-weight:bold; color:#c97d00; margin-bottom:6px; font-size:14px;"><i class="fa-solid fa-money-bill-transfer"></i> بيانات السحب المطلوبة</div>' +
                            '<div><i class="fa-solid fa-user-tag"></i> الاسم في الحساب البنكي: <b>' + escHtml(d.full_name) + '</b></div>' +
                            '<div><i class="fa-solid fa-building-columns"></i> اسم المصرف: <b>' + escHtml(d.bank_name) + '</b></div>' +
                            '<div><i class="fa-solid fa-code-branch"></i> الفرع: <b>' + escHtml(d.branch) + '</b></div>' +
                            '<div><i class="fa-solid fa-hashtag"></i> رقم الحساب: <b style="font-family:monospace; direction:ltr;">' + escHtml(d.account_number) + '</b></div>' +
                            '<div><i class="fa-solid fa-globe"></i> IBAN: <b style="direction:ltr; display:inline-block; font-family:monospace; word-break:break-all;">' + escHtml(d.iban) + '</b></div>' +
                            '<div style="margin-top:6px; color:#666; font-size:12px;"><i class="fa-regular fa-clock"></i> تاريخ الطلب: ' + new Date(w.created_at).toLocaleString('ar-EG') + '</div>' +
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
            }).catch(handleError);
        }).catch(handleError);
}

function startProcessingWithdrawal(id) {
    Swal.fire({
        title: 'بدء المعالجة؟',
        html: 'سيتم نقل الطلب إلى <b>قيد المعالجة</b>.<br><b>لن يتمكن المستخدم من الإلغاء بعد ذلك.</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'نعم، ابدأ',
        cancelButtonText: 'إلغاء'
    }).then(function(r) {
        if (!r.isConfirmed) return;
        Swal.fire({ title: 'جاري التنفيذ...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
        _supabase.from('withdrawals').update({ status: 'processing' }).eq('id', id).eq('status', 'pending').select().then(function(upd) {
            if (upd.error) return handleError(upd.error);
            if (!upd.data || !upd.data.length) {
                return Swal.fire('تنبيه', 'الطلب لم يعد في انتظار الموافقة (ربما ألغاه المستخدم).', 'warning').then(function() { loadAdminWithdrawals(); });
            }
            Swal.fire('تم', 'الطلب قيد المعالجة', 'success');
            loadAdminWithdrawals();
        });
    });
}

function completeWithdrawal(id) {
    Swal.fire({
        title: 'تأكيد إتمام السحب؟',
        html: 'سيتم:<br>• إضافة المبلغ إلى <b>محفظتك (المدير)</b>.<br>• تسجيل العملية في سجل العميل.<br><br><b>⚠️ تأكد أنك حوّلت المبلغ فعلياً للعميل قبل المتابعة.</b>',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'نعم، تم السحب',
        cancelButtonText: 'إلغاء'
    }).then(function(r) {
        if (!r.isConfirmed) return;
        Swal.fire({ title: 'جاري التنفيذ...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
        _supabase.from('withdrawals').select('amount, user_id, status').eq('id', id).maybeSingle().then(function(w) {
            if (!w.data) return Swal.fire('خطأ', 'الطلب غير موجود', 'error');
            if (w.data.status !== 'processing') {
                var msg = w.data.status === 'cancelled' ? 'تم إلغاء الطلب من المستخدم.' : 'الطلب ليس قيد المعالجة (الحالة: ' + w.data.status + ').';
                return Swal.fire('تنبيه', msg, 'warning').then(function() { loadAdminWithdrawals(); });
            }
            var amt = Number(w.data.amount);

            _supabase.from('withdrawals').update({ status: 'completed' }).eq('id', id).eq('status', 'processing').select().then(function(upd) {
                if (upd.error) return handleError(upd.error);
                if (!upd.data || !upd.data.length) {
                    return Swal.fire('تنبيه', 'الطلب تغيّر، أعد التحميل.', 'warning').then(function() { loadAdminWithdrawals(); });
                }
                _supabase.from('wallets').select('id, balance').eq('user_id', currentUser.id).maybeSingle().then(function(aw) {
                    if (!aw.data) return Swal.fire('خطأ', 'محفظتك غير موجودة', 'error');
                    var newBal = Number(aw.data.balance) + amt;
                    _supabase.from('wallets').update({ balance: newBal }).eq('id', aw.data.id).then(function() {
                        _supabase.from('transactions').insert([{ wallet_id: aw.data.id, type: 'deposit', amount: amt, reference: 'سحب مكتمل من عميل' }]).then(function() {
                            _supabase.from('wallets').select('id').eq('user_id', w.data.user_id).maybeSingle().then(function(uw) {
                                if (uw.data) {
                                    _supabase.from('transactions').insert([{ wallet_id: uw.data.id, type: 'withdrawal', amount: amt, reference: 'تم تنفيذ السحب' }]);
                                }
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
        Swal.fire({ title: 'جاري التنفيذ...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
        _supabase.from('withdrawals').select('amount, user_id, status').eq('id', id).maybeSingle().then(function(w) {
            if (!w.data) return Swal.fire('خطأ', 'الطلب غير موجود', 'error');
            if (w.data.status === 'cancelled' || w.data.status === 'completed' || w.data.status === 'rejected') {
                return Swal.fire('تنبيه', 'الطلب لم يعد قابلاً للرفض (الحالة: ' + w.data.status + ').', 'warning').then(function() { loadAdminWithdrawals(); });
            }
            var amt = Number(w.data.amount);

            _supabase.from('withdrawals').update({ status: 'rejected', rejection_reason: r.value || 'مرفوض' }).eq('id', id).in('status', ['pending', 'processing']).select().then(function(upd) {
                if (upd.error) return handleError(upd.error);
                if (!upd.data || !upd.data.length) {
                    return Swal.fire('تنبيه', 'الطلب تغيّر، أعد التحميل.', 'warning').then(function() { loadAdminWithdrawals(); });
                }
                _supabase.from('wallets').select('id, balance').eq('user_id', w.data.user_id).maybeSingle().then(function(uw) {
                    if (!uw.data) return Swal.fire('خطأ', 'محفظة العميل غير موجودة', 'error');
                    var newBal = Number(uw.data.balance) + amt;
                    _supabase.from('wallets').update({ balance: newBal }).eq('id', uw.data.id).then(function() {
                        _supabase.from('transactions').insert([{ wallet_id: uw.data.id, type: 'deposit', amount: amt, reference: 'إرجاع مبلغ سحب مرفوض' }]).then(function() {
                            Swal.fire('تم', 'تم رفض الطلب وإرجاع ' + amt + ' ' + t('currency') + ' للعميل.', 'success');
                            loadAdminWithdrawals();
                        });
                    });
                });
            });
        });
    });
}

// ================= 10. الإشعارات =================
function loadNotifications() {
    if (!currentUser) return;
    _supabase.from('notifications').select('*', { count: 'exact', head: true }).eq('user_id', currentUser.id).eq('is_read', false).then(function(res) {
        var badge = document.getElementById('notif-badge');
        if (badge) { if (res.count && res.count > 0) { badge.innerText = res.count; badge.classList.remove('hidden'); } else { badge.classList.add('hidden'); } }
    });
}
function showNotifications() {
    Swal.fire({ title: 'جاري التحميل...', didOpen: function() { Swal.showLoading(); } });
    _supabase.from('notifications').select('*').eq('user_id', currentUser.id).order('created_at', { ascending: false }).then(function(res) {
        if (res.data && res.data.length > 0) {
            var html = '<div style="text-align:right; max-height:300px; overflow-y:auto;">';
            res.data.forEach(function(n) { html += '<div style="padding:10px; border-bottom:1px solid #eee; ' + (n.is_read ? 'opacity:0.6;' : 'background:#f0f8ff;') + '"><strong>' + escHtml(n.title) + '</strong><br><small>' + escHtml(n.message) + '</small><br><small style="color:#999">' + new Date(n.created_at).toLocaleString('ar-EG') + '</small></div>'; });
            html += '</div>';
            Swal.fire({ title: 'الإشعارات', html: html, confirmButtonText: 'إغلاق' });
            _supabase.from('notifications').update({ is_read: true }).eq('user_id', currentUser.id).eq('is_read', false).then(function() { var badge = document.getElementById('notif-badge'); if (badge) badge.classList.add('hidden'); });
        } else { Swal.fire('الإشعارات', 'لا يوجد إشعارات جديدة', 'info'); }
    });
}

// ================= 11. إشعارات المدير الفورية =================
var adminAlertAudio = new Audio('convert.mp3');
var adminWithdrawChannel = null;
var adminTransferChannel = null;
var adminWithdrawalUpdatesChannel = null;

function showAdminAlert(title, message) {
    adminAlertAudio.play().catch(function(e) { console.log("الصوت محظور", e); });

    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: title,
        text: message,
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        didOpen: function(toast) {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    if (typeof loadNotifications === 'function') loadNotifications();

    // ✅ حدّث فقط التبويب المفتوح، لا تمسح الصفحة كلها
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
                var roleText = 'مستخدم';
                var nameText = 'مستخدم';
                if (userRes.data) {
                    nameText = userRes.data.full_name;
                    roleText = userRes.data.role === 'provider' ? 'مزود خدمة' : (userRes.data.role === 'admin' ? 'مدير' : 'مستخدم');
                }
                showAdminAlert('طلب سحب جديد! 🚨', roleText + ' (' + nameText + ') يطلب سحب ' + amount + ' د.ل.');
            });
        })
        .subscribe();

    if (adminTransferChannel) _supabase.removeChannel(adminTransferChannel);
    adminTransferChannel = _supabase.channel('admin-transfers')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bank_transfers' }, function(payload) {
            var amount = payload.new.amount;
            var userId = payload.new.user_id;
            _supabase.from('profiles').select('full_name, role').eq('id', userId).maybeSingle().then(function(userRes) {
                var roleText = 'مستخدم';
                var nameText = 'مستخدم';
                if (userRes.data) {
                    nameText = userRes.data.full_name;
                    roleText = userRes.data.role === 'provider' ? 'مزود خدمة' : (userRes.data.role === 'admin' ? 'مدير' : 'مستخدم');
                }
                showAdminAlert('طلب إيداع جديد! 💰', roleText + ' (' + nameText + ') أرسل طلب إيداع ' + amount + ' د.ل.');
            });
        })
        .subscribe();

    if (adminWithdrawalUpdatesChannel) _supabase.removeChannel(adminWithdrawalUpdatesChannel);
    adminWithdrawalUpdatesChannel = _supabase.channel('admin-withdrawal-updates')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'withdrawals' }, function(payload) {
            if (payload.new && payload.new.status === 'cancelled') {
                Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: 'قام أحد المستخدمين بإلغاء طلب سحب', showConfirmButton: false, timer: 4000 });
                var aWith = document.getElementById('a-with');
                if (aWith && !aWith.classList.contains('hidden')) loadAdminWithdrawals();
            }
        })
        .subscribe();
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

// ================= 12. التشغيل =================
document.addEventListener('DOMContentLoaded', function() {
    var savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    applyTranslations();

    var navMessages = document.getElementById('nav-messages');
    if (navMessages && !document.getElementById('nav-cards')) {
        var navCards = document.createElement('div');
        navCards.className = 'nav-item';
        navCards.id = 'nav-cards';
        navCards.setAttribute('onclick', "navTo('cards')");
        navCards.innerHTML = '<i class="fa-solid fa-store"></i><span data-i18n="nav_store">' + t('nav_store') + '</span>';

        var navCart = document.createElement('div');
        navCart.className = 'nav-item';
        navCart.id = 'nav-cart';
        navCart.style.position = 'relative';
        navCart.setAttribute('onclick', "navTo('cart')");
        navCart.innerHTML = '<i class="fa-solid fa-cart-shopping"></i><span data-i18n="nav_cart">' + t('nav_cart') + '</span><span id="cart-badge" class="hidden" style="position:absolute; top:-4px; right:0; background:var(--accent); color:white; font-size:10px; padding:2px 6px; border-radius:10px; font-weight:bold;">0</span>';

        var navPurchases = document.createElement('div');
        navPurchases.className = 'nav-item';
        navPurchases.id = 'nav-my-purchases';
        navPurchases.setAttribute('onclick', "navTo('my-purchases')");
        navPurchases.innerHTML = '<i class="fa-solid fa-receipt"></i><span data-i18n="nav_purchases">' + t('nav_purchases') + '</span>';

        navMessages.parentNode.insertBefore(navCards, navMessages.nextSibling);
        navCards.parentNode.insertBefore(navCart, navCards.nextSibling);
        navCart.parentNode.insertBefore(navPurchases, navCart.nextSibling);
    }

    var pageMessages = document.getElementById('page-messages');
    if (pageMessages && !document.getElementById('page-cards')) {
        var pageCards = document.createElement('div');
        pageCards.id = 'page-cards';
        pageCards.className = 'page hidden';
        var pageCart = document.createElement('div');
        pageCart.id = 'page-cart';
        pageCart.className = 'page hidden';
        var pagePurchases = document.createElement('div');
        pagePurchases.id = 'page-my-purchases';
        pagePurchases.className = 'page hidden';
        pageMessages.parentNode.insertBefore(pageCards, pageMessages.nextSibling);
        pageCards.parentNode.insertBefore(pageCart, pageCards.nextSibling);
        pageCart.parentNode.insertBefore(pagePurchases, pageCart.nextSibling);
    }

    var navItemEl = document.querySelector('.nav-item');
    if (navItemEl && navItemEl.parentNode) {
        var navParent = navItemEl.parentNode;
        navParent.style.overflowX = 'auto';
        navParent.style.flexWrap = 'nowrap';
        navParent.style.justifyContent = 'flex-start';
        navParent.style.webkitOverflowScrolling = 'touch';
        navParent.style.scrollbarWidth = 'none';

        var styleInject = document.createElement('style');
        styleInject.textContent =
            '.nav-item { min-width: 60px !important; flex-shrink: 0 !important; }' +
            '.nav-item span { font-size: 11px !important; white-space: nowrap; }' +
            '.nav-item::-webkit-scrollbar, nav::-webkit-scrollbar, [class*="bottom"]::-webkit-scrollbar { display: none !important; }';
        document.head.appendChild(styleInject);
    }

    if (!window.QRCode) {
        var qrScript = document.createElement('script');
        qrScript.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js';
        document.head.appendChild(qrScript);
    }

    if (typeof renderCardsPage !== 'function') {
        var cardsScript = document.createElement('script');
        cardsScript.src = 'cards.js';
        cardsScript.onload = function() { if (typeof updateCartBadge === 'function' && currentUser) updateCartBadge(); };
        document.head.appendChild(cardsScript);
    }

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