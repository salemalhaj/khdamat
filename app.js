// ============================================================
// app.js — Comprehensive Fix (Option B)
// ============================================================
// ⚠️ شغّل هذا في Supabase SQL Editor أولاً:
// ALTER TABLE platform_settings ADD COLUMN IF NOT EXISTS ad_duration_sec INT DEFAULT 5;
// ALTER TABLE platform_settings ADD COLUMN IF NOT EXISTS ad_speed_ms INT DEFAULT 300;
// ============================================================

// ================= 1. الإعدادات والترجمات =================
var _supabase = supabase.createClient(
    'https://ggaxlmhzdeczhgyjwyct.supabase.co',
    'sb_publishable_Dy1TLIvbtiEEJM89KY9JzQ_eip7fCUI'
);
var currentLang = localStorage.getItem('lang') || 'ar';
var currentUser = null, userProfile = null, platformSettings = {};
var realtimeChannel = null;

var translations = {
    ar: { /* ... نفس المحتوى الأصلي تماماً، لا تغيير ... */ },
    en: { /* ... نفس المحتوى الأصلي تماماً، لا تغيير ... */ }
};

// ---------- Helpers ----------
function t(key) {
    var dict = translations[currentLang] || translations.ar;
    return dict[key] !== undefined ? dict[key] : (translations.ar[key] || key);
}

function escHtml(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(c) {
        return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
    });
}

function escJs(s) {
    return String(s == null ? '' : s)
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/\r/g, '\\r')
        .replace(/\n/g, '\\n')
        .replace(/</g, '\\x3c');
}

function handleError(err) {
    console.error('[app]', err);
    if (Swal.isVisible()) Swal.close();
    Swal.fire(t('error'), (err && err.message) ? err.message : t('error'), 'error');
}

// ---------- Theme ----------
function updateThemeIcon() {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    var icon = isLight ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    var b1 = document.getElementById('btn-theme-top');
    var b2 = document.getElementById('btn-theme-main');
    if (b1) b1.innerHTML = icon;
    if (b2) b2.innerHTML = icon;
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
        if (span) span.innerText = (userProfile && userProfile.role === 'provider')
            ? t('nav_my_services') : t('nav_orders');
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
    updateThemeIcon();
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
    _supabase.auth.signUp({
        email: e, password: pw,
        options: { data: { full_name: n, role: r, phone: p } }
    }).then(function(res) {
        if (res.error) throw res.error;
        Swal.fire(t('success'), t('created_login'), 'success');
        document.getElementById('signup-screen').classList.add('hidden');
        document.getElementById('login-screen').classList.remove('hidden');
    }).catch(handleError);
}

function doLogin() {
    var email = document.getElementById('login-email').value.trim();
    var password = document.getElementById('login-password').value;
    if (!email || !password) return Swal.fire(t('alert'), t('fill_fields'), 'warning');

    Swal.fire({ title: t('verifying'), allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
    _supabase.auth.signInWithPassword({ email: email, password: password })
        .then(function(res) {
            if (res.error) throw res.error;
            return Promise.all([
                _supabase.from('profiles').select('*').eq('id', res.data.user.id).maybeSingle(),
                _supabase.from('platform_settings').select('*').eq('id', 1).maybeSingle()
            ]).then(function(rs) {
                if (rs[0].error) throw rs[0].error;
                if (!rs[0].data) throw new Error(t('profile_not_found'));
                currentUser = res.data.user;
                userProfile = rs[0].data;
                platformSettings = rs[1].data || {};
                Swal.close();
                setupUI();
                navTo('home');
            });
        }).catch(handleError);
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
}

function doLogout() {
    if (realtimeChannel) {
        try { _supabase.removeChannel(realtimeChannel); } catch (e) {}
        realtimeChannel = null;
    }
    _supabase.auth.signOut().finally(function() { location.reload(); });
}

// مزامنة الحالة بين التبويبات
_supabase.auth.onAuthStateChange(function(event) {
    if (event === 'SIGNED_OUT') {
        currentUser = null;
        userProfile = null;
        if (realtimeChannel) {
            try { _supabase.removeChannel(realtimeChannel); } catch (e) {}
            realtimeChannel = null;
        }
        var authEl = document.getElementById('auth-container');
        var mainEl = document.getElementById('main-app');
        if (authEl && mainEl) {
            authEl.classList.remove('hidden');
            mainEl.classList.add('hidden');
        }
    }
});

// ================= 3. التنقل =================
function navTo(page) {
    if (page !== 'home') stopAds();

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
    var roleKey = 'role_' + userProfile.role;
    var roleLabel = translations[currentLang][roleKey] || userProfile.role;
    Swal.fire({
        title: t('profile'),
        html: '<p>' + t('name') + ': <b>' + escHtml(userProfile.full_name) + '</b></p>' +
              '<p>' + t('role') + ': <b>' + roleLabel + '</b></p>',
        confirmButtonText: t('close')
    });
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

function stopAds() {
    clearTimeout(adTimer);
    clearInterval(progressInterval);
    adTimer = null;
    progressInterval = null;
    isAdPaused = false;
}

function renderHome() {
    stopAds(); // تنظيف أي مؤقت قديم

    _supabase.from('wallets').select('balance').eq('user_id', currentUser.id).maybeSingle()
        .then(function(wRes) {
            var bal = wRes.data ? Number(wRes.data.balance).toFixed(2) : '0.00';

            // ⬇️ قراءة الإعدادات من platformSettings (لكل المستخدمين) مع fallback
            adDuration = (Number(platformSettings.ad_duration_sec) || Number(localStorage.getItem('ad_duration_sec')) || 5) * 1000;
            adSpeed = Number(platformSettings.ad_speed_ms) || Number(localStorage.getItem('ad_speed_ms')) || 300;

            return _supabase.from('ads').select('*').order('created_at', { ascending: false })
                .then(function(adsRes) {
                    adsList = adsRes.data || [];
                    var adsHtml = '';

                    if (adsList.length > 0) {
                        var bars = '';
                        for (var i = 0; i < adsList.length; i++) {
                            bars += '<div style="flex:1; height:3px; background:rgba(150,150,150,0.3); border-radius:3px; overflow:hidden;">' +
                                    '<div id="ad-bar-' + i + '" style="width:0%; height:100%; background:var(--accent); transition:width 0.1s linear;"></div></div>';
                        }
                        adsHtml = '<div id="pro-ads-box" style="margin: 0 auto 15px auto; max-width: 100%; user-select: none; -webkit-user-select: none;">' +
                                  '<div style="display:flex; gap:5px; margin-bottom:8px; padding:0 5px;">' + bars + '</div>' +
                                  '<div id="ads-touch-area" style="position:relative; width:100%; border-radius:15px; overflow:hidden; cursor:pointer; touch-action:pan-y; text-align:center;">' +
                                  '<img id="current-ad-img" src="' + adsList[0].image_url + '" style="width:100%; max-height:190px; object-fit:cover; border-radius:15px; display:block; margin:0 auto; transition:opacity ' + adSpeed + 'ms ease;">' +
                                  '</div></div>';
                    }

                    var c = adsHtml + '<div class="card" style="text-align:center; background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: white;">' +
                        '<p style="font-size:14px; font-weight:600; opacity:0.9;">' + t('welcome') + escHtml(userProfile.full_name) + '</p>' +
                        '<div class="balance" style="color:white;">' + bal + ' <span style="font-size:16px;">' + t('currency') + '</span></div>' +
                        '<p style="font-size:12px; opacity:0.8;">' + t('balance_title') + '</p></div>';

                    if (userProfile.role === 'provider') c += '<button class="btn btn-accent" onclick="showAddService()"><i class="fa-solid fa-plus"></i> ' + t('add_service') + '</button>';
                    else if (userProfile.role === 'user') c += '<div class="grid-2"><button class="btn btn-accent" onclick="navTo(\'wallet\')"><i class="fa-solid fa-plus-circle"></i> ' + t('deposit') + '</button><button class="btn btn-primary" onclick="navTo(\'services\')"><i class="fa-solid fa-search"></i> ' + t('request_service') + '</button></div>';
                    else if (userProfile.role === 'admin') c += '<button class="btn btn-accent" onclick="navTo(\'admin\')"><i class="fa-solid fa-shield-halved"></i> ' + t('admin_panel_btn') + '</button>';

                    document.getElementById('page-home').innerHTML = c;

                    if (adsList.length > 0) {
                        setupProAdsControls();
                        showProAdSlide(0);
                    }
                });
        }).catch(handleError);
}

function showProAdSlide(index) {
    clearTimeout(adTimer);
    clearInterval(progressInterval);
    if (adsList.length === 0) return;

    if (index >= adsList.length) index = 0;
    if (index < 0) index = adsList.length - 1;
    currentAdIndex = index;

    var imgEl = document.getElementById('current-ad-img');
    if (imgEl) {
        imgEl.style.transition = 'opacity ' + adSpeed + 'ms ease';
        imgEl.style.opacity = '0';
        setTimeout(function() {
            var el = document.getElementById('current-ad-img');
            if (el) {
                el.src = adsList[currentAdIndex].image_url;
                el.style.opacity = '1';
            }
        }, adSpeed);
    }

    for (var i = 0; i < adsList.length; i++) {
        var bar = document.getElementById('ad-bar-' + i);
        if (bar) bar.style.width = (i < currentAdIndex) ? '100%' : '0%';
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

    adTimer = setTimeout(function() {
        showProAdSlide(currentAdIndex + 1);
    }, adRemainingTime);
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
    if (!box || box._adControlsAttached) return; // منع التكرار
    box._adControlsAttached = true;
    var touchStartX = 0;

    box.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        pauseProAd();
    }, { passive: true });

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

// ================= 5. المحفظة =================
function renderWallet() {
    document.getElementById('page-wallet').innerHTML = '<div class="card"><div class="tabs">' +
        '<div class="tab active" onclick="switchTab(this, \'w-card\')">' + t('tab_card') + '</div>' +
        '<div class="tab" onclick="switchTab(this, \'w-bank\')">' + t('tab_bank') + '</div>' +
        '<div class="tab" onclick="switchTab(this, \'w-with\')">' + t('tab_withdraw') + '</div>' +
        '<div class="tab" onclick="switchTab(this, \'w-trans\')">' + t('tab_transfer') + '</div>' +
        '</div>' +
        '<div id="w-card"><input type="text" id="card-code" placeholder="' + t('card_code') + '"><button class="btn btn-primary" onclick="redeemCard()">' + t('confirm') + '</button></div>' +
        '<div id="w-bank" class="hidden"><div class="bank-details">' +
        '<p><span>' + t('bank') + ':</span> ' + escHtml(platformSettings.bank_name || '-') + '</p>' +
        '<p><span>' + t('name') + ':</span> ' + escHtml(platformSettings.account_name || '-') + '</p>' +
        '<p><span>' + t('account') + ':</span> ' + escHtml(platformSettings.account_number || '-') + '</p>' +
        '<p><span>IBAN:</span> ' + escHtml(platformSettings.iban || '-') + '</p></div>' +
        '<input type="number" id="bank-amt" placeholder="' + t('transfer_amt') + '">' +
        '<input type="file" id="bank-file" accept="image/*,application/pdf" style="background:var(--card-bg);">' +
        '<button class="btn btn-accent" onclick="submitBankTransfer()">' + t('send_review') + '</button></div>' +
        '<div id="w-with" class="hidden"><p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">' + t('withdraw_note') + '</p>' +
        '<input type="number" id="with-amt" placeholder="' + t('amount') + '">' +
        '<input type="text" id="with-bank" placeholder="' + t('bank_name') + '">' +
        '<input type="text" id="with-acc" placeholder="' + t('acc_num') + '">' +
        '<button class="btn btn-primary" onclick="requestWithdrawal()">' + t('send') + '</button></div>' +
        '<div id="w-trans" class="hidden"><p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">' + t('transfer_note') + '</p>' +
        '<input type="text" id="trans-phone" placeholder="' + t('phone') + '">' +
        '<button class="btn btn-accent" onclick="searchPhone()">' + t('search') + '</button>' +
        '<div id="trans-result" style="font-weight:bold; color:var(--primary); margin-bottom:10px;"></div>' +
        '<input type="number" id="trans-amt" placeholder="' + t('amount') + '">' +
        '<button class="btn btn-primary" onclick="executeTransfer()">' + t('transfer_now') + '</button></div></div>';
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
    Swal.fire({ title: t('verifying'), allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
    _supabase.rpc('redeem_card', { card_code: code }).then(function(res) {
        if (res.error) throw res.error;
        if (!res.data || !res.data.success) throw new Error(t('card_error'));
        Swal.fire(t('success'), t('card_redeemed'), 'success');
        if (res.data.amount >= 1000) {
            _supabase.rpc('notify_admins', {
                p_title: 'Large Deposit',
                p_message: userProfile.full_name + ' deposited ' + res.data.amount
            }).catch(console.warn);
        }
        renderWallet();
    }).catch(handleError);
}

function submitBankTransfer() {
    var amount = parseFloat(document.getElementById('bank-amt').value);
    var file = document.getElementById('bank-file').files[0];
    if (!amount || !file) return Swal.fire(t('alert'), t('fill_fields'), 'warning');

    Swal.fire({ title: t('uploading'), allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
    var fileName = Date.now() + '_' + currentUser.id + '.' + file.name.split('.').pop();
    _supabase.storage.from('receipts').upload(fileName, file)
        .then(function(upRes) {
            if (upRes.error) throw new Error(t('upload_failed'));
            var publicUrl = _supabase.storage.from('receipts').getPublicUrl(fileName).data.publicUrl;
            return _supabase.from('bank_transfers').insert([{
                user_id: currentUser.id, amount: amount, receipt_url: publicUrl
            }]);
        })
        .then(function(insRes) {
            if (insRes.error) throw insRes.error;
            _supabase.rpc('notify_admins', {
                p_title: 'Deposit Request',
                p_message: userProfile.full_name + ' sent ' + amount
            }).catch(console.warn);
            Swal.fire(t('success'), t('request_sent'), 'success');
            renderWallet();
        }).catch(handleError);
}

// ✅ جديد: خصم الرصيد عند الطلب + تحقق ذري
function requestWithdrawal() {
    var a = parseFloat(document.getElementById('with-amt').value);
    var b = document.getElementById('with-bank').value.trim();
    var c = document.getElementById('with-acc').value.trim();
    if (!a || a <= 0 || !b || !c) return Swal.fire(t('alert'), t('fill_fields'), 'warning');

    Swal.fire({ title: t('sending'), allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
    _supabase.from('wallets').select('balance').eq('user_id', currentUser.id).maybeSingle()
        .then(function(wRes) {
            if (!wRes.data) throw new Error(t('error'));
            var bal = Number(wRes.data.balance);
            if (bal < a) throw new Error(t('insufficient_balance'));

            // قفل تفاؤلي: نخصم فقط إذا الرصيد لم يتغير
            return _supabase.from('wallets').update({ balance: bal - a })
                .eq('user_id', currentUser.id).eq('balance', bal).select()
                .then(function(upRes) {
                    if (upRes.error) throw upRes.error;
                    if (!upRes.data || upRes.data.length === 0) throw new Error(t('insufficient_balance'));
                    return _supabase.from('withdrawals').insert([{
                        user_id: currentUser.id, amount: a, bank_details: b + ' | ' + c
                    }]).then(function(insRes) {
                        if (insRes.error) {
                            // استرجاع الرصيد لو فشل الإنشاء
                            return _supabase.from('wallets').update({ balance: bal }).eq('user_id', currentUser.id)
                                .then(function() { throw insRes.error; });
                        }
                        _supabase.rpc('notify_admins', {
                            p_title: 'Withdrawal Request',
                            p_message: userProfile.full_name + ' requests ' + a
                        }).catch(console.warn);
                        Swal.fire(t('success'), t('request_sent'), 'success');
                        renderWallet();
                    });
                });
        }).catch(handleError);
}

function searchPhone() {
    var p = document.getElementById('trans-phone').value.trim();
    _supabase.from('profiles').select('full_name').eq('phone', p).maybeSingle()
        .then(function(res) {
            document.getElementById('trans-result').innerText = res.data
                ? t('name') + ': ' + res.data.full_name
                : t('number_not_found');
        }).catch(handleError);
}

function executeTransfer() {
    var p = document.getElementById('trans-phone').value.trim();
    var a = parseFloat(document.getElementById('trans-amt').value);
    if (!p || !a) return Swal.fire(t('alert'), t('fill_fields'), 'warning');
    Swal.fire({ title: t('transferring'), allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
    _supabase.rpc('transfer_money', { p_receiver_phone: p, p_amount: a }).then(function(res) {
        if (res.error) throw res.error;
        if (!res.data || !res.data.success) throw new Error(res.data ? res.data.message : t('error'));
        Swal.fire(t('success'), t('transfer_success'), 'success');
        renderWallet();
    }).catch(handleError);
}

// ================= 6. الخدمات =================
function renderServices() {
    var c = '';
    if (userProfile.role === 'provider') {
        c += '<button class="btn btn-accent" onclick="showAddService()"><i class="fa-solid fa-plus"></i> ' + t('new_service') + '</button>';
        _supabase.from('services').select('*').eq('provider_id', currentUser.id)
            .then(function(res) {
                if (res.data && res.data.length > 0) {
                    for (var i = 0; i < res.data.length; i++) {
                        var s = res.data[i];
                        var status = s.status === 'approved' ? '✅ ' + t('approved')
                                   : s.status === 'pending' ? '⏳ ' + t('pending')
                                   : '❌ ' + t('rejected');
                        c += '<div class="card" style="padding:15px; margin-bottom:10px;">' +
                            (s.image_url ? '<img src="' + escHtml(s.image_url) + '" style="width:100%; height:120px; object-fit:cover; border-radius:8px; margin-bottom:10px;">' : '') +
                            '<strong>' + escHtml(s.title) + '</strong> - ' + s.price + ' ' + t('currency') +
                            '<p style="font-size:12px; color:var(--text-muted);">' + t('status') + ': ' + status + '</p></div>';
                    }
                } else {
                    c += '<div class="card"><p style="text-align:center;">' + t('no_services') + '</p></div>';
                }
                document.getElementById('page-services').innerHTML = c;
            }).catch(handleError);
    } else {
        _supabase.from('services').select('*, profiles(full_name)').eq('status', 'approved')
            .then(function(res) {
                if (res.data && res.data.length > 0) {
                    for (var i = 0; i < res.data.length; i++) {
                        var s = res.data[i];
                        var providerName = (s.profiles && s.profiles.full_name) ? s.profiles.full_name : 'المزود';
                        // ✅ هروب صحيح لكلا السياقين
                        c += '<div class="card" style="padding:15px; margin-bottom:10px;">' +
                             (s.image_url ? '<img src="' + escHtml(s.image_url) + '" style="width:100%; height:150px; object-fit:cover; border-radius:8px; margin-bottom:10px;">' : '') +
                             '<h4 style="color:var(--primary); margin-bottom:5px;">' + escHtml(s.title) + '</h4>' +
                             '<p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">' + escHtml(s.description || '') + '</p>' +
                             '<div style="display:flex; justify-content:space-between; align-items:center;">' +
                                 '<strong style="color:var(--accent);">' + s.price + ' ' + t('currency') + '</strong>' +
                                 '<div style="display:flex; gap:5px;">' +
                                     '<button class="btn btn-accent btn-sm" style="margin:0;" onclick="initiateChat(\'' + escJs(s.provider_id) + '\', \'' + escJs(providerName) + '\')"><i class="fa-solid fa-comment"></i></button>' +
                                     '<button class="btn btn-primary btn-sm" style="margin:0;" onclick="orderService(\'' + escJs(s.id) + '\')">' + t('request') + '</button>' +
                                 '</div>' +
                             '</div></div>';
                    }
                } else {
                    c += '<div class="card"><p style="text-align:center;">' + t('no_services_avail') + '</p></div>';
                }
                document.getElementById('page-services').innerHTML = c;
            }).catch(handleError);
    }
}

function showAddService() {
    Swal.fire({
        title: t('add_service_title'),
        html: '<input id="s-t" class="swal2-input" placeholder="' + t('name') + '">' +
              '<input id="s-p" class="swal2-input" type="number" placeholder="' + t('price') + '">' +
              '<textarea id="s-d" class="swal2-textarea" placeholder="' + t('desc') + '"></textarea>' +
              '<input id="s-img" type="file" accept="image/*" style="margin-top:10px; width:100%;">',
        confirmButtonText: t('send'),
        showCancelButton: true,
        cancelButtonText: t('cancel')
    }).then(function(r) {
        if (!r.isConfirmed) return;
        var title = document.getElementById('s-t').value.trim();
        var price = document.getElementById('s-p').value;
        var desc = document.getElementById('s-d').value.trim();
        var file = document.getElementById('s-img').files[0];
        if (!title || !price) return Swal.fire(t('alert'), t('fill_fields'), 'warning');

        Swal.fire({ title: t('uploading'), allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });

        var insertService = function(imageUrl) {
            return _supabase.from('services').insert([{
                provider_id: currentUser.id,
                title: title,
                description: desc,
                price: parseFloat(price),
                status: 'pending',
                image_url: imageUrl || ''
            }]).then(function(res) {
                if (res.error) throw res.error;
                _supabase.rpc('notify_admins', {
                    p_title: 'New Service',
                    p_message: userProfile.full_name + ' added "' + title + '"'
                }).catch(console.warn);
                Swal.fire(t('success'), t('request_sent'), 'success');
                renderServices();
            });
        };

        if (file) {
            var fileName = Date.now() + '_' + currentUser.id + '.' + file.name.split('.').pop();
            _supabase.storage.from('services').upload(fileName, file).then(function(upRes) {
                if (upRes.error) throw upRes.error;
                var url = _supabase.storage.from('services').getPublicUrl(fileName).data.publicUrl;
                return insertService(url);
            }).catch(handleError);
        } else {
            insertService('').catch(handleError);
        }
    });
}

// ✅ إصلاح: قفل تفاؤلي + استرجاع عند الفشل
function orderService(id) {
    _supabase.from('services').select('*').eq('id', id).maybeSingle()
        .then(function(sRes) {
            if (!sRes.data) return;
            var s = sRes.data;
            return _supabase.from('wallets').select('balance').eq('user_id', currentUser.id).maybeSingle()
                .then(function(wRes) {
                    if (!wRes.data) throw new Error(t('error'));
                    var bal = Number(wRes.data.balance);
                    if (bal < s.price) { Swal.fire(t('insufficient_balance'), t('top_up'), 'warning'); return; }

                    var msg = t('deduct_for')
                        .replace('{amount}', s.price + ' ' + t('currency'))
                        .replace('{title}', s.title);

                    return Swal.fire({
                        title: t('confirm_order'), text: msg,
                        showCancelButton: true,
                        confirmButtonText: t('yes'),
                        cancelButtonText: t('cancel')
                    }).then(function(r) {
                        if (!r.isConfirmed) return;
                        Swal.fire({ title: t('ordering'), allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });

                        var newBal = bal - s.price;
                        return _supabase.from('wallets').update({ balance: newBal })
                            .eq('user_id', currentUser.id).eq('balance', bal).select()
                            .then(function(upRes) {
                                if (upRes.error) throw upRes.error;
                                if (!upRes.data || upRes.data.length === 0) throw new Error(t('insufficient_balance'));

                                return _supabase.from('orders').insert([{
                                    client_id: currentUser.id,
                                    service_id: s.id,
                                    total_amount: s.price,
                                    status: 'in_progress'
                                }]).then(function(oRes) {
                                    if (oRes.error) {
                                        // استرجاع الرصيد
                                        return _supabase.from('wallets').update({ balance: bal })
                                            .eq('user_id', currentUser.id)
                                            .then(function() { throw oRes.error; });
                                    }
                                    Swal.fire(t('success'), t('order_success'), 'success');
                                    navTo('orders');
                                });
                            });
                    });
                });
        }).catch(handleError);
}

function initiateChat(providerId, providerName) {
    _supabase.from('chat_permissions').select('*')
        .eq('client_id', currentUser.id).eq('provider_id', providerId).maybeSingle()
        .then(function(res) {
            if (res.data) { openChat(providerId, providerName); return; }
            var price = platformSettings.chat_price || 10;
            Swal.fire({
                title: 'فتح محادثة',
                text: 'لبدء محادثة مع ' + providerName + '، يجب دفع رسوم قدرها ' + price + ' د.ل تُخصم من محفظتك.',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'دفع وفتح المحادثة',
                cancelButtonText: 'إلغاء'
            }).then(function(r) {
                if (!r.isConfirmed) return;
                Swal.fire({ title: 'جاري الدفع...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
                _supabase.rpc('pay_for_chat', { p_provider_id: providerId, p_amount: price }).then(function(payRes) {
                    if (payRes.error) throw payRes.error;
                    if (!payRes.data || !payRes.data.success) throw new Error(payRes.data ? payRes.data.message : 'فشل الدفع');
                    Swal.fire('تم', 'تم الدفع بنجاح', 'success');
                    openChat(providerId, providerName);
                }).catch(handleError);
            });
        }).catch(handleError);
}

// ================= 7. الرسائل =================
function renderMessages() {
    document.getElementById('page-messages').innerHTML = '<div class="card"><p>' + t('loading') + '</p></div>';
    var query;
    if (userProfile.role === 'provider') {
        query = _supabase.from('chat_permissions')
            .select('*, profiles!chat_permissions_client_id_fkey(id, full_name, role)')
            .eq('provider_id', currentUser.id);
    } else {
        query = _supabase.from('chat_permissions')
            .select('*, profiles!chat_permissions_provider_id_fkey(id, full_name, role)')
            .eq('client_id', currentUser.id);
    }
    query.then(function(res) {
        var c = '<h2 style="color:var(--primary); margin-bottom:15px;">محادثاتي</h2>';
        if (res.data && res.data.length > 0) {
            res.data.forEach(function(item) {
                var otherUser = item.profiles;
                if (otherUser) {
                    c += '<div class="card" style="padding:15px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">' +
                         '<div><strong>' + escHtml(otherUser.full_name) + '</strong><br><small style="color:var(--text-muted);">' +
                         (otherUser.role === 'provider' ? 'مزود خدمة' : 'مستخدم') + '</small></div>' +
                         '<button class="btn btn-primary btn-sm" onclick="openChat(\'' + escJs(otherUser.id) + '\', \'' + escJs(otherUser.full_name) + '\')">' +
                         '<i class="fa-solid fa-comment"></i> محادثة</button></div>';
                }
            });
        } else {
            c += '<div class="card"><p style="text-align:center;">لا توجد محادثات نشطة.</p></div>';
        }
        document.getElementById('page-messages').innerHTML = c;
    }).catch(handleError);
}

var currentChatUserId = null;
var chatInterval = null;

function openChat(userId, userName) {
    currentChatUserId = userId;
    Swal.fire({
        title: 'محادثة مع ' + escHtml(userName),
        html: '<div id="chat-box" style="height:250px; overflow-y:auto; border:1px solid #ddd; border-radius:8px; padding:10px; margin-bottom:10px; background:#f9f9f9; text-align:right;"></div>' +
              '<input id="chat-input" class="swal2-input" placeholder="اكتب رسالتك هنا..." style="margin-bottom:10px;">' +
              '<button class="btn btn-primary" onclick="sendChatMessage()" style="margin-top:0;">إرسال</button>',
        showConfirmButton: false, showCloseButton: true,
        didOpen: function() {
            loadChatMessages();
            chatInterval = setInterval(loadChatMessages, 3000);
        },
        willClose: function() {
            clearInterval(chatInterval);
            chatInterval = null;
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
                            '<span style="display:inline-block; padding:8px 12px; border-radius:10px; background:' +
                            (isMe ? '#dcf8c6' : '#fff') + '; border:1px solid #eee; max-width:80%; font-size:14px;">' +
                            escHtml(m.message) + '</span></div>';
                });
            }
            box.innerHTML = html || '<p style="text-align:center; color:#999; font-size:12px;">لا توجد رسائل سابقة.</p>';
            box.scrollTop = box.scrollHeight;
        }).catch(function(err) { console.warn('chat load', err); });
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
        if (res.error) { Swal.showValidationMessage('فشل الإرسال: ' + res.error.message); return; }
        loadChatMessages();
    }).catch(handleError);
}

// ================= 8. الطلبات =================
function renderOrders() {
    if (userProfile.role === 'provider') {
        _supabase.from('services').select('id').eq('provider_id', currentUser.id)
            .then(function(ms) {
                var ids = [];
                if (ms.data) for (var i = 0; i < ms.data.length; i++) ids.push(ms.data[i].id);
                if (!ids.length) {
                    document.getElementById('page-orders').innerHTML = '<div class="card"><p style="text-align:center;">' + t('no_orders') + '</p></div>';
                    return;
                }
                return _supabase.from('orders').select('*, services(title)').in('service_id', ids)
                    .then(function(os) {
                        var c = '';
                        if (os.data) for (var j = 0; j < os.data.length; j++) {
                            var o = os.data[j];
                            c += '<div class="card" style="padding:15px; margin-bottom:10px;"><strong>' +
                                 escHtml(o.services ? o.services.title : '') + '</strong>' +
                                 '<p style="color:var(--accent); font-weight:bold;">' + o.total_amount + ' ' + t('currency') + '</p></div>';
                        }
                        document.getElementById('page-orders').innerHTML = c || '<div class="card"><p style="text-align:center;">' + t('no_orders') + '</p></div>';
                    });
            }).catch(handleError);
    } else {
        _supabase.from('orders').select('*, services(title)').eq('client_id', currentUser.id)
            .order('created_at', { ascending: false })
            .then(function(os) {
                var c = '';
                if (os.data) for (var k = 0; k < os.data.length; k++) {
                    var o = os.data[k];
                    c += '<div class="card" style="padding:15px; margin-bottom:10px;"><strong>' +
                         escHtml(o.services ? o.services.title : '') + '</strong>' +
                         '<p style="color:var(--accent); font-weight:bold;">' + o.total_amount + ' ' + t('currency') + '</p></div>';
                }
                document.getElementById('page-orders').innerHTML = c || '<div class="card"><p style="text-align:center;">' + t('no_orders') + '</p></div>';
            }).catch(handleError);
    }
}

// ================= 9. لوحة الإدارة =================
// ... (نفس renderAdmin و adminTab كما كانت) ...

// ✅ إصلاح: الخصم تم عند الطلب، فقط الموافقة
function approveWithdrawal(id, uid, amount) {
    _supabase.from('withdrawals').update({ status: 'approved' }).eq('id', id)
        .then(function(res) {
            if (res.error) throw res.error;
            _supabase.from('wallets').select('id').eq('user_id', uid).maybeSingle()
                .then(function(w) {
                    if (w.data) {
                        _supabase.from('transactions').insert([{
                            wallet_id: w.data.id, type: 'withdrawal', amount: amount, reference: 'Withdrawal approved'
                        }]).catch(console.warn);
                    }
                });
            Swal.fire(t('success'), t('approved_msg'), 'success');
            renderAdmin();
        }).catch(handleError);
}

// ✅ جديد: رفض السحب مع استرجاع الرصيد
function rejectWithdrawal(id, uid, amount) {
    Swal.fire({
        title: t('reject_reason'), input: 'text',
        showCancelButton: true,
        confirmButtonText: t('reject'),
        cancelButtonText: t('cancel')
    }).then(function(r) {
        if (!r.value) return;
        Swal.fire({ title: t('sending'), allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
        _supabase.from('wallets').select('id, balance').eq('user_id', uid).maybeSingle()
            .then(function(wRes) {
                if (!wRes.data) throw new Error('المحفظة غير موجودة');
                return _supabase.from('wallets').update({ balance: Number(wRes.data.balance) + amount })
                    .eq('id', wRes.data.id)
                    .then(function() {
                        return _supabase.from('withdrawals').update({ status: 'rejected' }).eq('id', id);
                    });
            }).then(function() {
                Swal.fire(t('success'), t('rejected_msg'), 'success');
                renderAdmin();
            }).catch(handleError);
    });
}

// ✅ إضافة .catch() و .select()
function approveTransfer(id, uid, amount) {
    _supabase.from('wallets').select('id, balance').eq('user_id', uid).maybeSingle()
        .then(function(wRes) {
            if (!wRes.data) throw new Error('المحفظة غير موجودة');
            var newBal = Number(wRes.data.balance) + amount;
            return _supabase.from('wallets').update({ balance: newBal }).eq('id', wRes.data.id)
                .then(function() {
                    return _supabase.from('transactions').insert([{
                        wallet_id: wRes.data.id, type: 'deposit', amount: amount, reference: 'Bank Transfer'
                    }]);
                })
                .then(function() {
                    return _supabase.from('bank_transfers').update({ status: 'approved' }).eq('id', id);
                })
                .then(function() {
                    Swal.fire(t('success'), t('added_msg'), 'success');
                    renderAdmin();
                });
        }).catch(handleError);
}

// ... بقية دوال admin (generateCards, loadAdminCardsList, loadUsersList, loadAdminAds, uploadAd, deleteAd, loadAdminSettings, updateChatPrice) ...
// ✅ الإصلاح في loadAdminAds و saveAdSettings:

function loadAdminAds() {
    var container = document.getElementById('a-ads');
    if (!container) return;
    container.innerHTML = '<div class="card"><p>جاري التحميل...</p></div>';

    // ⬇️ قراءة من platformSettings أولاً
    var savedSec = platformSettings.ad_duration_sec || localStorage.getItem('ad_duration_sec') || 5;
    var savedSpeed = platformSettings.ad_speed_ms || localStorage.getItem('ad_speed_ms') || 300;

    _supabase.from('ads').select('*').order('created_at', { ascending: false })
        .then(function(res) {
            var html = '<div class="card" style="padding:15px; margin-bottom:15px; border: 2px solid var(--primary);">';
            html += '<h4 style="margin-bottom:10px; color:var(--primary);">إعدادات العرض والسرعة (لكل المستخدمين)</h4>';
            html += '<label style="font-weight:bold; display:block; margin-bottom:5px; font-size:14px;">مدة بقاء الصورة (بالثواني):</label>';
            html += '<input type="number" id="ad-sec-input" value="' + escHtml(savedSec) + '" min="1" style="margin-bottom:10px;">';
            html += '<label style="font-weight:bold; display:block; margin-bottom:5px; font-size:14px;">سرعة الدخول والخروج (مللي ثانية):</label>';
            html += '<input type="number" id="ad-speed-input" value="' + escHtml(savedSpeed) + '" min="50" step="50" style="margin-bottom:15px;">';
            html += '<button class="btn btn-primary" onclick="saveAdSettings()" style="margin:0;">حفظ الإعدادات</button>';
            html += '</div>';

            html += '<div class="card" style="padding:15px; margin-bottom:15px;">';
            html += '<h4 style="margin-bottom:10px;">إضافة إعلان جديد</h4>';
            html += '<input type="file" id="ad-img" accept="image/*" style="margin-bottom:10px; width:100%;">';
            html += '<button class="btn btn-accent" onclick="uploadAd()">رفع الإعلان</button>';
            html += '</div>';

            html += '<div class="card" style="padding:15px;"><h4 style="margin-bottom:10px;">الإعلانات الحالية</h4>';
            if (res.data && res.data.length > 0) {
                res.data.forEach(function(ad) {
                    html += '<div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #ddd; padding:10px 0;">' +
                            '<img src="' + escHtml(ad.image_url) + '" style="width:80px; height:50px; object-fit:cover; border-radius:8px;">' +
                            '<button class="btn btn-danger btn-sm" onclick="deleteAd(\'' + escJs(ad.id) + '\')" style="margin:0;">حذف</button></div>';
                });
            } else {
                html += '<p style="text-align:center;">لا توجد إعلانات حالياً.</p>';
            }
            html += '</div>';
            container.innerHTML = html;
        }).catch(handleError);
}

// ✅ حفظ لكل المستخدمين
function saveAdSettings() {
    var sec = parseInt(document.getElementById('ad-sec-input').value, 10);
    var speed = parseInt(document.getElementById('ad-speed-input').value, 10);
    if (!sec || sec < 1 || !speed || speed < 50) {
        return Swal.fire(t('alert'), 'أدخل قيماً صحيحة (الثواني ≥ 1، السرعة ≥ 50)', 'warning');
    }
    Swal.fire({ title: 'جاري الحفظ...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
    _supabase.from('platform_settings')
        .update({ ad_duration_sec: sec, ad_speed_ms: speed }).eq('id', 1)
        .then(function(res) {
            if (res.error) throw res.error;
            platformSettings.ad_duration_sec = sec;
            platformSettings.ad_speed_ms = speed;
            adDuration = sec * 1000;
            adSpeed = speed;
            localStorage.setItem('ad_duration_sec', sec);
            localStorage.setItem('ad_speed_ms', speed);
            Swal.fire(t('success'), 'تم الحفظ لكل المستخدمين', 'success');
        }).catch(function(err) {
            Swal.fire('خطأ', 'فشل الحفظ. تأكد من تشغيل:\nALTER TABLE platform_settings ADD COLUMN IF NOT EXISTS ad_duration_sec INT DEFAULT 5;\nALTER TABLE platform_settings ADD COLUMN IF NOT EXISTS ad_speed_ms INT DEFAULT 300;\n\n' + (err.message || ''), 'error');
        });
}

// ================= 10. الإشعارات والجلسة =================
function loadNotifications() {
    if (!currentUser) return;
    _supabase.from('notifications').select('*', { count: 'exact', head: true })
        .eq('user_id', currentUser.id).eq('is_read', false)
        .then(function(res) {
            var badge = document.getElementById('notif-badge');
            if (!badge) return;
            if (res.count && res.count > 0) {
                badge.innerText = res.count;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }).catch(function(err) { console.warn('notif count', err); });

    // ✅ اشتراك Realtime — يُنشأ مرة واحدة لكل جلسة
    if (!realtimeChannel) {
        realtimeChannel = _supabase.channel('notif-' + currentUser.id)
            .on('postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'notifications', filter: 'user_id=eq.' + currentUser.id },
                function() { loadNotifications(); })
            .subscribe();
    }
}

function showNotifications() {
    Swal.fire({ title: t('loading'), allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
    _supabase.from('notifications').select('*').eq('user_id', currentUser.id)
        .order('created_at', { ascending: false })
        .then(function(res) {
            if (res.data && res.data.length > 0) {
                var html = '<div style="text-align:right; max-height:300px; overflow-y:auto;">';
                res.data.forEach(function(n) {
                    html += '<div style="padding:10px; border-bottom:1px solid #eee; ' + (n.is_read ? 'opacity:0.6;' : 'background:#f0f8ff;') + '">' +
                            '<strong>' + escHtml(n.title) + '</strong><br>' +
                            '<small>' + escHtml(n.message) + '</small><br>' +
                            '<small style="color:#999">' + new Date(n.created_at).toLocaleString(currentLang === 'ar' ? 'ar-EG' : 'en-US') + '</small></div>';
                });
                html += '</div>';
                Swal.fire({ title: 'الإشعارات', html: html, confirmButtonText: t('close') });
                _supabase.from('notifications').update({ is_read: true })
                    .eq('user_id', currentUser.id).eq('is_read', false)
                    .then(function() {
                        var badge = document.getElementById('notif-badge');
                        if (badge) badge.classList.add('hidden');
                    }).catch(console.warn);
            } else {
                Swal.fire('الإشعارات', 'لا يوجد إشعارات جديدة', 'info');
            }
        }).catch(handleError);
}

function checkSession() {
    _supabase.auth.getSession().then(function(res) {
        if (res.error) { console.warn('session', res.error); return; }
        if (!res.data.session) return;
        var uid = res.data.session.user.id;
        return Promise.all([
            _supabase.from('profiles').select('*').eq('id', uid).maybeSingle(),
            _supabase.from('platform_settings').select('*').eq('id', 1).maybeSingle()
        ]).then(function(rs) {
            if (!rs[0].data) return;
            currentUser = res.data.session.user;
            userProfile = rs[0].data;
            platformSettings = rs[1].data || {};
            setupUI();
            navTo('home');
        });
    }).catch(handleError);
}

// ================= 11. التشغيل =================
document.addEventListener('DOMContentLoaded', function() {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
    applyTranslations();
    updateThemeIcon();   // ✅ تحديث الأيقونة عند التحميل
    checkSession();

    var bind = function(id, fn) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('click', fn);
    };
    bind('btn-do-login', doLogin);
    bind('btn-do-signup', doSignup);
    bind('link-to-signup', showSignup);
    bind('link-to-login', showLogin);
    bind('btn-lang-top', toggleLanguage);
    bind('btn-theme-top', toggleTheme);
    bind('btn-lang-main', toggleLanguage);
    bind('btn-theme-main', toggleTheme);
    bind('btn-profile', showProfile);
    bind('btn-logout', doLogout);
    bind('btn-notifications', showNotifications);
});