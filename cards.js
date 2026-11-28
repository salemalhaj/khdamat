// ============================================================
// cards.js — النسخة النهائية (مع الشراء الآمن 100% + إفراغ السلة)
// ============================================================
var cardsState = { currentCategory: null, currentCompany: null, categories: [], orderQty: 1, currentProduct: null };
var isCheckingOut = false;

function renderCardsPage() {
  if (cardsState.currentCompany) return renderCardProducts();
  if (cardsState.currentCategory) return renderCardCompanies();
  var container = document.getElementById('page-cards');
  container.innerHTML = '<h2 style="color:var(--primary); margin-bottom:15px;"><i class="fa-solid fa-store"></i> المتجر</h2><div id="cards-cats-grid" class="grid-2" style="gap:12px;"></div>';
  _supabase.from('card_categories').select('*').order('display_order').then(function(res) {
    if (!res.data || !res.data.length) { document.getElementById('cards-cats-grid').innerHTML = '<p style="text-align:center; grid-column:1/-1;">لا توجد فئات</p>'; return; }
    cardsState.categories = res.data;
    var html = '';
    res.data.forEach(function(cat) {
      html += '<button class="card" style="padding:20px; text-align:center; cursor:pointer; border:none; background:linear-gradient(135deg,var(--primary),var(--primary-light)); color:white;" onclick="openCategory(\'' + escJs(cat.id) + '\')"><i class="fa-solid ' + escHtml(cat.icon || 'fa-tag') + '" style="font-size:32px; margin-bottom:10px;"></i><div style="font-weight:bold;">' + escHtml(currentLang === 'ar' ? cat.name_ar : cat.name_en) + '</div></button>';
    });
    document.getElementById('cards-cats-grid').innerHTML = html;
  }).catch(handleError);
}

function openCategory(catId) { cardsState.currentCategory = catId; cardsState.currentCompany = null; renderCardCompanies(); }
function openCompany(company) { cardsState.currentCompany = company; renderCardProducts(); }
function backToCategories() { cardsState.currentCategory = null; cardsState.currentCompany = null; renderCardsPage(); }
function backToCompanies() { cardsState.currentCompany = null; renderCardCompanies(); }

function renderCardCompanies() {
  var catName = '';
  cardsState.categories.forEach(function(c) { if (c.id === cardsState.currentCategory) catName = currentLang === 'ar' ? c.name_ar : c.name_en; });
  document.getElementById('page-cards').innerHTML = '<div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;"><button onclick="backToCategories()" style="background:none; border:none; color:var(--primary); font-size:20px; cursor:pointer;"><i class="fa-solid fa-arrow-right"></i></button><h2 style="color:var(--primary); margin:0;">' + escHtml(catName) + '</h2></div><div id="companies-grid" class="grid-2" style="gap:12px;"><p style="text-align:center; grid-column:1/-1;">' + t('loading') + '</p></div>';
  _supabase.from('companies').select('*').eq('category_id', cardsState.currentCategory).eq('is_active', true).order('display_order').then(function(res) {
    if (!res.data || !res.data.length) { document.getElementById('companies-grid').innerHTML = '<p style="text-align:center; grid-column:1/-1;">لا توجد شركات</p>'; return; }
    var html = '';
    res.data.forEach(function(c) {
      var logo = c.logo_url ? '<img src="' + escHtml(c.logo_url) + '" style="width:60px; height:60px; object-fit:contain; border-radius:12px;">' : '<div style="width:60px; height:60px; background:var(--primary); border-radius:12px; display:flex; align-items:center; justify-content:center; color:white; font-size:24px;"><i class="fa-solid fa-building"></i></div>';
      html += '<button class="card" style="padding:15px; text-align:center; cursor:pointer; border:none; display:flex; flex-direction:column; align-items:center; gap:10px;" onclick="openCompany(' + JSON.stringify(c).replace(/"/g, '&quot;') + ')">' + logo + '<div style="font-weight:bold; color:var(--text);">' + escHtml(c.name) + '</div></button>';
    });
    document.getElementById('companies-grid').innerHTML = html;
  }).catch(handleError);
}

function renderCardProducts() {
  var company = cardsState.currentCompany;
  document.getElementById('page-cards').innerHTML = '<div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;"><button onclick="backToCompanies()" style="background:none; border:none; color:var(--primary); font-size:20px; cursor:pointer;"><i class="fa-solid fa-arrow-right"></i></button><h2 style="color:var(--primary); margin:0;">' + escHtml(company.name) + '</h2></div><div id="products-grid" style="display:flex; flex-direction:column; gap:10px;"><p style="text-align:center;">' + t('loading') + '</p></div>';
  _supabase.from('card_products').select('*').eq('company_id', company.id).eq('is_active', true).order('display_order').then(function(res) {
    if (!res.data || !res.data.length) { document.getElementById('products-grid').innerHTML = '<p style="text-align:center;">لا توجد فئات</p>'; return; }
    var html = '';
    res.data.forEach(function(p) {
      var stockBadge = p.fulfillment_type === 'auto_code' ? (p.stock > 0 ? '<span style="color:#27ae60; font-size:12px;"><i class="fa-solid fa-check-circle"></i> متوفر</span>' : '<span style="color:#e74c3c; font-size:12px;"><i class="fa-solid fa-times-circle"></i> نفد</span>') : '<span style="color:var(--accent); font-size:12px;">تسليم يدوي</span>';
      var canBuy = p.fulfillment_type === 'manual' || p.stock > 0;
      html += '<div class="card" style="padding:15px; display:flex; justify-content:space-between; align-items:center; ' + (!canBuy ? 'opacity:0.5;' : '') + '"><div style="display:flex; gap:10px; align-items:center;">' + (p.image_url ? '<img src="' + escHtml(p.image_url) + '" style="width:60px; height:40px; object-fit:cover; border-radius:6px;">' : '') + '<div><div style="font-weight:bold; font-size:16px;">' + escHtml(p.name) + '</div><div style="font-size:12px; color:var(--text-muted); margin-top:4px;">القيمة: ' + p.value + ' | السعر: <b style="color:var(--accent);">' + p.price + ' ' + t('currency') + '</b></div><div style="margin-top:6px;">' + stockBadge + '</div></div></div>' + (canBuy ? '<button class="btn btn-primary" style="margin:0; padding:10px 20px;" onclick="openQuantityModal(' + JSON.stringify(p).replace(/"/g, '&quot;') + ')">اختيار</button>' : '<button class="btn" style="margin:0; background:#ccc; color:#666; cursor:not-allowed; padding:10px 20px;" disabled>نفد</button>') + '</div>';
    });
    document.getElementById('products-grid').innerHTML = html;
  }).catch(handleError);
}

function openQuantityModal(product) {
  cardsState.orderQty = 1; cardsState.currentProduct = product;
  var maxQty = product.fulfillment_type === 'manual' ? 99 : Math.max(0, Number(product.stock) || 0);
  if (maxQty < 1) return Swal.fire('تنبيه', 'هذه البطاقة غير متوفرة حالياً', 'warning');
  Swal.fire({
    title: escHtml(product.name),
    html: '<p style="color:var(--accent); font-weight:bold; margin-bottom:15px;">' + product.price + ' ' + t('currency') + ' للوحدة</p><div style="display:flex; align-items:center; justify-content:center; gap:15px; margin-bottom:20px;"><button type="button" onclick="changeQty(-1)" style="width:50px; height:50px; border-radius:50%; border:2px solid var(--primary); background:white; color:var(--primary); font-size:24px; font-weight:bold; cursor:pointer;">−</button><div id="qty-display" style="font-size:36px; font-weight:bold; min-width:70px; color:var(--primary);">1</div><button type="button" onclick="changeQty(1)" style="width:50px; height:50px; border-radius:50%; border:none; background:var(--primary); color:white; font-size:24px; font-weight:bold; cursor:pointer;">+</button></div><div id="total-display" style="font-size:18px; font-weight:bold; color:var(--accent);">الإجمالي: ' + product.price + ' ' + t('currency') + '</div><div id="stock-warning" style="color:#e74c3c; font-size:12px; margin-top:8px; display:none;"></div>',
    confirmButtonText: 'أضف للسلة', showCancelButton: true, cancelButtonText: t('cancel'),
    didOpen: function() { window._maxQty = maxQty; window._unitPrice = Number(product.price); },
    preConfirm: function() { if (cardsState.orderQty < 1) { Swal.showValidationMessage('الكمية غير صحيحة'); return false; } return true; }
  }).then(function(r) { if (r.isConfirmed) addToCart(product.id, cardsState.orderQty); });
}

function changeQty(delta) {
  var maxQty = window._maxQty || 99; var newQty = cardsState.orderQty + delta;
  if (delta < 0 && newQty < 1) return;
  if (delta > 0 && newQty > maxQty) { var warn = document.getElementById('stock-warning'); warn.innerText = 'الكمية المتاحة: ' + maxQty; warn.style.display = 'block'; return; }
  cardsState.orderQty = newQty; document.getElementById('qty-display').innerText = newQty; document.getElementById('stock-warning').style.display = 'none'; document.getElementById('total-display').innerText = 'الإجمالي: ' + (newQty * window._unitPrice).toFixed(2) + ' ' + t('currency');
}

function addToCart(productId, quantity) {
  Swal.fire({ title: t('sending'), allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
  _supabase.from('cart_items').select('*').eq('user_id', currentUser.id).eq('product_id', productId).maybeSingle().then(function(res) {
    if (res.data) return _supabase.from('cart_items').update({ quantity: res.data.quantity + quantity }).eq('id', res.data.id);
    return _supabase.from('cart_items').insert([{ user_id: currentUser.id, product_id: productId, quantity: quantity }]);
  }).then(function() { Swal.fire(t('success'), t('added_msg'), 'success'); updateCartBadge(); }).catch(handleError);
}

function updateCartBadge() {
  if (!currentUser) return;
  _supabase.from('cart_items').select('quantity').eq('user_id', currentUser.id).then(function(res) {
    var total = 0; if (res.data) res.data.forEach(function(i) { total += i.quantity; });
    var badge = document.getElementById('cart-badge');
    if (badge) { if (total > 0) { badge.innerText = total; badge.classList.remove('hidden'); } else badge.classList.add('hidden'); }
  }).catch(console.warn);
}

// ✅ النسخة المُحدّثة: تصفّي العناصر اليتيمة وتحذفها تلقائياً
function renderCart() {
  document.getElementById('page-cart').innerHTML = '<h2 style="color:var(--primary); margin-bottom:15px;"><i class="fa-solid fa-cart-shopping"></i> السلة</h2><div id="cart-body"><p>' + t('loading') + '</p></div>';
  _supabase.from('cart_items').select('*, card_products(name, price, value, company_id, stock, fulfillment_type, companies(name))').eq('user_id', currentUser.id).then(function(res) {
    var allItems = res.data || [];

    // ✅ فصل العناصر الصالحة عن اليتيمة (التي حُذف منتجها)
    var validItems = allItems.filter(function(item) { return item.card_products != null; });
    var orphans = allItems.filter(function(item) { return item.card_products == null; });

    // ✅ حذف العناصر اليتيمة تلقائياً من قاعدة البيانات
    if (orphans.length > 0) {
      var orphanIds = orphans.map(function(i) { return i.id; });
      _supabase.from('cart_items').delete().in('id', orphanIds).then(function() { updateCartBadge(); }).catch(console.warn);
    }

    // ✅ إذا لم تبقَ عناصر صالحة → أظهر "السلة فارغة"
    if (!validItems.length) {
      document.getElementById('cart-body').innerHTML = '<div class="card" style="text-align:center; padding:40px 20px;"><i class="fa-solid fa-cart-shopping" style="font-size:48px; color:var(--text-muted); margin-bottom:15px;"></i><p>السلة فارغة</p><button class="btn btn-primary" onclick="navTo(\'cards\')" style="margin-top:15px;">تصفح المتجر</button></div>';
      return;
    }

    var total = 0; var html = '';
    validItems.forEach(function(item) {
      var p = item.card_products;
      var sub = Number(p.price) * item.quantity; total += sub;
      html += '<div class="card" style="padding:15px; margin-bottom:10px;"><div style="display:flex; justify-content:space-between; margin-bottom:10px;"><div><strong>' + escHtml(p.name) + '</strong><br><small style="color:var(--text-muted);">' + escHtml(p.companies ? p.companies.name : '') + '</small></div><button onclick="removeCartItem(\'' + escJs(item.id) + '\')" style="background:none; border:none; color:#e74c3c; font-size:18px; cursor:pointer;"><i class="fa-solid fa-trash"></i></button></div><div style="display:flex; justify-content:space-between; align-items:center;"><div style="display:flex; align-items:center; gap:10px;"><button onclick="updateCartQty(\'' + escJs(item.id) + '\', -1, ' + item.quantity + ')" style="width:32px; height:32px; border-radius:50%; border:2px solid var(--primary); background:white; color:var(--primary); font-size:16px; cursor:pointer;">−</button><span style="font-weight:bold; font-size:16px; min-width:30px; text-align:center;">' + item.quantity + '</span><button onclick="updateCartQty(\'' + escJs(item.id) + '\', 1, ' + item.quantity + ', ' + (p.stock || 0) + ')" style="width:32px; height:32px; border-radius:50%; border:none; background:var(--primary); color:white; font-size:16px; cursor:pointer;">+</button></div><strong style="color:var(--accent);">' + sub.toFixed(2) + ' ' + t('currency') + '</strong></div></div>';
    });
    html += '<div class="card" style="padding:15px; background:linear-gradient(135deg,var(--primary),var(--primary-light)); color:white;"><div style="display:flex; justify-content:space-between; align-items:center; font-size:18px; font-weight:bold;"><span>الإجمالي:</span><span>' + total.toFixed(2) + ' ' + t('currency') + '</span></div></div><button class="btn btn-accent" style="margin-top:15px; width:100%; padding:15px; font-size:16px;" onclick="checkoutCart()"><i class="fa-solid fa-check-circle"></i> تأكيد الشراء</button>';
    document.getElementById('cart-body').innerHTML = html;
  }).catch(handleError);
}

function updateCartQty(itemId, delta, currentQty, maxStock) {
  var newQty = currentQty + delta;
  if (newQty < 1) return removeCartItem(itemId);
  if (delta > 0 && maxStock > 0 && newQty > maxStock) { Swal.fire('تنبيه', 'الكمية المتاحة: ' + maxStock, 'warning'); return; }
  if (newQty > 99) return;
  _supabase.from('cart_items').update({ quantity: newQty }).eq('id', itemId).then(function(res) { if (res.error) throw res.error; renderCart(); updateCartBadge(); }).catch(handleError);
}

function removeCartItem(itemId) {
  _supabase.from('cart_items').delete().eq('id', itemId).then(function() { renderCart(); updateCartBadge(); }).catch(handleError);
}

// ✅ النسخة المُحدّثة: تحذف السلة من DB بعد نجاح RPC وتعيد رسمها فارغة
function checkoutCart() {
  if (isCheckingOut) return;
  Swal.fire({ title: 'تأكيد الشراء؟', text: 'سيتم خصم المبلغ من محفظتك.', icon: 'question', showCancelButton: true, confirmButtonText: 'نعم، اشترِ الآن', cancelButtonText: t('cancel') }).then(function(r) {
    if (!r.isConfirmed) return;
    isCheckingOut = true;
    Swal.fire({ title: 'جاري تنفيذ الشراء...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });

    _supabase.rpc('purchase_cart', { p_user_id: currentUser.id }).then(function(res) {
      if (res.error) throw res.error;
      if (!res.data || !res.data.success) throw new Error(res.data ? res.data.message : 'فشل الشراء');

      var rpcData = res.data;

      // ✅ الحل الأساسي: احذف كل عناصر السلة بعد نجاح الشراء
      return _supabase.from('cart_items').delete().eq('user_id', currentUser.id).then(function(delRes) {
        if (delRes.error) console.warn('[cart clear]', delRes.error);
        return rpcData;
      });
    }).then(function(data) {
      var items = data.items || [];
      var itemsHtml = '';
      var cardIndex = 0;
      items.forEach(function(item) {
        var codesToShow = (item.codes || []).slice(0, item.quantity);
        if (codesToShow.length > 0) {
          codesToShow.forEach(function(code) {
            cardIndex++;
            var qrId = 'qr-' + Date.now() + '-' + cardIndex;
            itemsHtml +=
              '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; padding: 20px; margin-bottom: 15px; color: white; text-align: center; box-shadow: 0 8px 20px rgba(102,126,234,0.4);">' +
                '<div style="font-size: 12px; opacity: 0.85; margin-bottom: 4px;">' + escHtml(item.company_name) + '</div>' +
                '<div style="font-size: 18px; font-weight: bold; margin-bottom: 15px;">' + escHtml(item.product_name) + '</div>' +
                '<div style="background: rgba(255,255,255,0.15); border-radius: 12px; padding: 15px;">' +
                  '<div style="text-align: right; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 10px;">' +
                    '<div style="display:flex; justify-content:space-between; align-items:center;">' +
                      '<div><div style="font-size: 11px; opacity: 0.8; margin-bottom: 4px;">الرقم التسلسلي</div>' +
                      '<div style="font-size: 16px; font-weight: bold; font-family: \'Courier New\', monospace; direction: ltr; letter-spacing: 1px;">' + escHtml(code.serial || '---') + '</div></div>' +
                      '<button onclick="copySingle(\'' + escJs(code.serial || '') + '\', this)" style="background: rgba(255,255,255,0.25); border: none; color: white; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 14px;"><i class="fa-solid fa-copy"></i></button>' +
                    '</div>' +
                  '</div>' +
                  '<div style="text-align: right; margin-bottom: 12px;">' +
                    '<div style="display:flex; justify-content:space-between; align-items:center;">' +
                      '<div><div style="font-size: 11px; opacity: 0.8; margin-bottom: 4px;">الرقم السري</div>' +
                      '<div style="font-size: 16px; font-weight: bold; font-family: \'Courier New\', monospace; direction: ltr; letter-spacing: 2px;">' + escHtml(code.pin || '---') + '</div></div>' +
                      '<button onclick="copySingle(\'' + escJs(code.pin || '') + '\', this)" style="background: rgba(255,255,255,0.25); border: none; color: white; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 14px;"><i class="fa-solid fa-copy"></i></button>' +
                    '</div>' +
                  '</div>' +
                  '<div style="background: white; border-radius: 8px; padding: 10px; margin-top: 10px; display: inline-block;"><div id="' + qrId + '"><div style="color:#666; font-size:10px;">جاري تكوين QR...</div></div></div>' +
                '</div>' +
              '</div>';
            setTimeout(function() {
              var el = document.getElementById(qrId);
              if (!el) return;
              if (!code.pin) { el.innerHTML = '<div style="color:#666; font-size:11px;">لا يوجد PIN</div>'; return; }
              var qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=' + encodeURIComponent(code.pin);
              el.innerHTML = '<img src="' + qrUrl + '" style="width:130px; height:130px; border-radius:8px; display:block;" alt="QR Code">';
            }, 200);
          });
        } else {
          itemsHtml += '<div style="background: #fef3c7; border: 2px dashed #f59e0b; border-radius: 16px; padding: 20px; margin-bottom: 15px; text-align: center;"><i class="fa-solid fa-clock" style="font-size: 36px; color: #f59e0b; margin-bottom: 10px; display: block;"></i><div style="font-weight: bold; color: #92400e; margin-bottom: 5px; font-size: 15px;">' + escHtml(item.product_name) + '</div><div style="font-size: 12px; color: #78350f;">سيتم التسليم يدوياً من قبل الإدارة</div></div>';
        }
      });
      Swal.fire({
        title: '✅ تم الشراء بنجاح!',
        html: '<div style="text-align: center; padding: 10px 0; margin-bottom: 15px; background: rgba(102,126,234,0.1); border-radius: 10px;"><div style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px;">الإجمالي المدفوع</div><div style="font-size: 22px; font-weight: bold; color: var(--accent);">' + data.total + ' ' + t('currency') + '</div></div><div style="max-height: 500px; overflow-y: auto; padding: 5px;">' + (itemsHtml || '<p style="text-align:center;">لا توجد عناصر</p>') + '</div>',
        confirmButtonText: 'حسناً', width: 500
      });
      updateCartBadge();
      isCheckingOut = false;

      // ✅ الحل الأساسي 2: أعد رسم صفحة السلة فوراً لتظهر فارغة
      var cartPage = document.getElementById('page-cart');
      if (cartPage && !cartPage.classList.contains('hidden')) {
        renderCart();
      }
    }).catch(function(err) {
      isCheckingOut = false;
      handleError(err);
    });
  });
}

function copySingle(text, btn) {
  if (!text || text === '---') return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function() {
      var original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i>';
      btn.style.background = '#27ae60';
      setTimeout(function() { btn.innerHTML = original; btn.style.background = 'rgba(255,255,255,0.25)'; }, 1500);
    });
  }
}

// ---------- مشترياتي (للعميل والمزود) ----------
function renderMyPurchases() {
  var container = document.getElementById('page-my-purchases');
  if (!container) return;
  container.innerHTML = '<h2 style="color:var(--primary); margin-bottom:15px;"><i class="fa-solid fa-receipt"></i> مشترياتي</h2><div id="purchases-body"><p>' + t('loading') + '</p></div>';

  _supabase.from('card_orders')
    .select('*, card_order_items(*), digital_codes(*)')
    .eq('user_id', currentUser.id)
    .order('created_at', { ascending: false })
    .then(function(res) {
      if (!res.data || !res.data.length) {
        document.getElementById('purchases-body').innerHTML = '<div class="card" style="text-align:center; padding:40px 20px;"><i class="fa-solid fa-receipt" style="font-size:48px; color:var(--text-muted); margin-bottom:15px;"></i><p>لا توجد مشتريات بعد</p><button class="btn btn-primary" onclick="navTo(\'cards\')" style="margin-top:15px;">تصفح المتجر</button></div>';
        return;
      }
      var html = '';
      res.data.forEach(function(order) {
        var d = new Date(order.created_at);
        var dateStr = d.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        var timeStr = d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
        var itemsHtml = (order.card_order_items || []).map(function(i) {
          return '<li style="margin-bottom:5px;">' + escHtml(i.product_name) + ' × ' + i.quantity + ' = ' + i.subtotal + ' ' + t('currency') + '</li>';
        }).join('');

        var codesHtml = '';
        if (order.digital_codes && order.digital_codes.length > 0) {
          codesHtml = '<div style="margin-top:10px; border-top:1px dashed #ccc; padding-top:10px;"><strong style="font-size:12px; color:var(--primary);">الأكواد:</strong>';
          order.digital_codes.forEach(function(c, i) {
            var pinId = 'pin-' + order.id + '-' + i;
            var serId = 'ser-' + order.id + '-' + i;
            var qrUrl = c.pin_code ? 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=' + encodeURIComponent(c.pin_code) : '';
            codesHtml += `
              <div style="background:#f9f9f9; padding:10px; border-radius:8px; margin-top:8px; border:1px solid #eee;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                  <span style="font-size:12px; color:#666;">رقم تسلسلي:</span>
                  <div>
                    <span id="${serId}" style="font-family:monospace; font-weight:bold; direction:ltr;">••••••••</span>
                    <button onclick="toggleVisibility('${serId}', '${escJs(c.serial_number)}')" style="background:none; border:none; color:var(--primary); cursor:pointer;"><i class="fa-solid fa-eye"></i></button>
                    <button onclick="copySingle('${escJs(c.serial_number)}', this)" style="background:none; border:none; color:var(--primary); cursor:pointer;"><i class="fa-solid fa-copy"></i></button>
                  </div>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:12px; color:#666;">رقم سري:</span>
                  <div>
                    <span id="${pinId}" style="font-family:monospace; font-weight:bold; direction:ltr;">••••••••</span>
                    <button onclick="toggleVisibility('${pinId}', '${escJs(c.pin_code)}')" style="background:none; border:none; color:var(--primary); cursor:pointer;"><i class="fa-solid fa-eye"></i></button>
                    <button onclick="copySingle('${escJs(c.pin_code)}', this)" style="background:none; border:none; color:var(--primary); cursor:pointer;"><i class="fa-solid fa-copy"></i></button>
                  </div>
                </div>
                ${qrUrl ? '<div style="text-align:center; margin-top:8px;"><img src="' + qrUrl + '" style="width:100px; height:100px; border-radius:8px;" alt="QR"></div>' : ''}
              </div>
            `;
          });
          codesHtml += '</div>';
        }

        html += '<div class="card" style="padding:15px; margin-bottom:12px;">' +
                '<div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:10px;">' +
                  '<div><div style="font-size:11px; color:var(--text-muted);">طلب #' + String(order.id).substring(0, 8) + '</div>' +
                  '<div style="font-size:12px; color:var(--text-muted);"><i class="fa-regular fa-calendar"></i> ' + dateStr + '</div>' +
                  '<div style="font-size:12px; color:var(--text-muted);"><i class="fa-regular fa-clock"></i> ' + timeStr + '</div></div>' +
                  '<div style="text-align:left;"><div style="font-size:20px; font-weight:bold; color:var(--accent);">' + order.total_amount + ' ' + t('currency') + '</div>' +
                  '<div style="font-size:11px; color:#27ae60;">' + (order.status === 'completed' ? '✓ مكتمل' : order.status) + '</div></div>' +
                '</div>' +
                '<ul style="margin:0; padding-right:20px; font-size:13px; border-top:1px solid #eee; padding-top:10px;">' + itemsHtml + '</ul>' +
                codesHtml +
                '</div>';
      });
      document.getElementById('purchases-body').innerHTML = html;
    }).catch(handleError);
}

function toggleVisibility(id, actualValue) {
  var el = document.getElementById(id);
  if (!el) return;
  if (el.innerText.includes('•')) { el.innerText = actualValue || '---'; }
  else { el.innerText = '••••••••'; }
}

// ---------- لوحة إدارة المتجر ----------
function loadAdminStore() {
  document.getElementById('a-store').innerHTML = `
    <div class="tabs" style="margin-bottom: 15px;">
      <div class="tab active" onclick="storeTab(this,'st-cats')">الفئات الرئيسية</div>
      <div class="tab" onclick="storeTab(this,'st-companies')">الشركات</div>
      <div class="tab" onclick="storeTab(this,'st-products')">البطاقات</div>
      <div class="tab" onclick="storeTab(this,'st-orders')">طلبات المتجر</div>
    </div>
    <div id="st-cats"></div>
    <div id="st-companies" class="hidden"></div>
    <div id="st-products" class="hidden"></div>
    <div id="st-orders" class="hidden"></div>
  `;
  loadAdminStoreCats();
}

function storeTab(el, id) {
  var tabs = el.parentElement.querySelectorAll('.tab');
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
  el.classList.add('active');
  ['st-cats', 'st-companies', 'st-products', 'st-orders'].forEach(function(x) {
    var e = document.getElementById(x);
    if (e) e.classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
  if (id === 'st-cats') loadAdminStoreCats();
  if (id === 'st-companies') loadAdminStoreCompanies();
  if (id === 'st-products') loadAdminStoreProducts();
  if (id === 'st-orders') loadAdminStoreOrders();
}

function loadAdminStoreCats() {
  var box = document.getElementById('st-cats');
  box.innerHTML = '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;"><h4 style="margin:0;">الفئات الرئيسية</h4><button class="btn btn-primary" style="margin:0; padding:8px 15px;" onclick="addMainCategoryForm()"><i class="fa-solid fa-plus"></i> إضافة فئة</button></div><div id="admin-cats-list"><p>جاري التحميل...</p></div>';
  _supabase.from('card_categories').select('*').order('display_order').then(function(res) {
    var html = '';
    if (res.data && res.data.length > 0) {
      res.data.forEach(function(c) {
        html += '<div class="card" style="padding:12px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;"><div style="display:flex; align-items:center; gap:10px;"><i class="fa-solid ' + escHtml(c.icon || 'fa-tag') + '" style="font-size:24px; color:var(--primary);"></i><div><strong>' + escHtml(currentLang === 'ar' ? c.name_ar : c.name_en) + '</strong><br><small style="color:var(--text-muted);">ترتيب: ' + (c.display_order || 0) + '</small></div></div><div style="display:flex; gap:5px;"><button class="btn btn-sm" style="margin:0; background:#f39c12; color:white;" onclick="editMainCategoryForm(\'' + escJs(c.id) + '\')"><i class="fa-solid fa-pen"></i></button><button class="btn btn-sm" style="margin:0; background:#e74c3c; color:white;" onclick="deleteMainCategory(\'' + escJs(c.id) + '\')"><i class="fa-solid fa-trash"></i></button></div></div>';
      });
    } else { html = '<p style="text-align:center;">لا توجد فئات.</p>'; }
    document.getElementById('admin-cats-list').innerHTML = html;
  }).catch(handleError);
}

function addMainCategoryForm() {
  Swal.fire({ title: 'إضافة فئة رئيسية', html: '<input id="cat-name-ar" class="swal2-input" placeholder="الاسم بالعربية"><input id="cat-name-en" class="swal2-input" placeholder="الاسم بالإنجليزية"><input id="cat-icon" class="swal2-input" placeholder="أيقونة (مثال: fa-credit-card)" value="fa-tag"><input id="cat-order" class="swal2-input" type="number" placeholder="ترتيب العرض" value="0">', confirmButtonText: 'حفظ', showCancelButton: true, cancelButtonText: t('cancel'), preConfirm: function() { var nameAr = document.getElementById('cat-name-ar').value.trim(); if (!nameAr) { Swal.showValidationMessage('الاسم بالعربية مطلوب'); return false; } return { name_ar: nameAr, name_en: document.getElementById('cat-name-en').value.trim() || nameAr, icon: document.getElementById('cat-icon').value.trim() || 'fa-tag', display_order: parseInt(document.getElementById('cat-order').value) || 0 }; } }).then(function(r) {
    if (!r.isConfirmed) return;
    Swal.fire({ title: 'جاري الحفظ...', didOpen: function() { Swal.showLoading(); } });
    var data = Object.assign({ id: 'cat_' + Date.now() }, r.value);
    _supabase.from('card_categories').insert([data]).then(function() { Swal.fire(t('success'), t('added_msg'), 'success'); loadAdminStoreCats(); }).catch(handleError);
  });
}

function editMainCategoryForm(id) {
  _supabase.from('card_categories').select('*').eq('id', id).maybeSingle().then(function(res) {
    if (!res.data) return;
    var c = res.data;
    Swal.fire({ title: 'تعديل الفئة', html: '<input id="cat-name-ar" class="swal2-input" placeholder="الاسم بالعربية" value="' + escHtml(c.name_ar) + '"><input id="cat-name-en" class="swal2-input" placeholder="الاسم بالإنجليزية" value="' + escHtml(c.name_en) + '"><input id="cat-icon" class="swal2-input" placeholder="أيقونة" value="' + escHtml(c.icon) + '"><input id="cat-order" class="swal2-input" type="number" placeholder="ترتيب العرض" value="' + (c.display_order || 0) + '">', confirmButtonText: 'حفظ', showCancelButton: true, cancelButtonText: t('cancel'), preConfirm: function() { var nameAr = document.getElementById('cat-name-ar').value.trim(); if (!nameAr) { Swal.showValidationMessage('الاسم مطلوب'); return false; } return { name_ar: nameAr, name_en: document.getElementById('cat-name-en').value.trim() || nameAr, icon: document.getElementById('cat-icon').value.trim() || 'fa-tag', display_order: parseInt(document.getElementById('cat-order').value) || 0 }; } }).then(function(r) {
      if (!r.isConfirmed) return;
      _supabase.from('card_categories').update(r.value).eq('id', id).then(function() { Swal.fire(t('success'), 'تم التعديل', 'success'); loadAdminStoreCats(); }).catch(handleError);
    });
  });
}

function deleteMainCategory(id) {
  Swal.fire({ title: 'حذف الفئة؟', text: 'سيتم حذف كل الشركات والبطاقات المرتبطة بها!', icon: 'warning', showCancelButton: true, confirmButtonText: 'نعم احذف', cancelButtonText: t('cancel') }).then(function(r) {
    if (!r.isConfirmed) return;
    _supabase.from('card_categories').delete().eq('id', id).then(function() { Swal.fire(t('success'), 'تم الحذف', 'success'); loadAdminStoreCats(); }).catch(handleError);
  });
}

function loadAdminStoreCompanies() {
  var box = document.getElementById('st-companies');
  box.innerHTML = '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;"><h4 style="margin:0;">الشركات</h4><button class="btn btn-primary" style="margin:0; padding:8px 15px;" onclick="addCompanyForm()"><i class="fa-solid fa-plus"></i> إضافة شركة</button></div><div id="admin-companies-list"><p>جاري التحميل...</p></div>';
  _supabase.from('companies').select('*, card_categories(name_ar)').order('display_order').then(function(res) {
    var html = '';
    if (res.data && res.data.length > 0) {
      res.data.forEach(function(c) {
        html += '<div class="card" style="padding:12px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;"><div style="display:flex; align-items:center; gap:10px;">' + (c.logo_url ? '<img src="' + escHtml(c.logo_url) + '" style="width:40px; height:40px; border-radius:8px; object-fit:cover;">' : '<div style="width:40px; height:40px; background:var(--primary); border-radius:8px; color:white; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-building"></i></div>') + '<div><strong>' + escHtml(c.name) + '</strong><br><small style="color:var(--text-muted);">' + (c.card_categories ? escHtml(c.card_categories.name_ar) : 'بدون فئة') + ' | ترتيب: ' + (c.display_order || 0) + '</small></div></div><div style="display:flex; gap:5px;"><button class="btn btn-sm" style="margin:0; background:#f39c12; color:white;" onclick="editCompanyForm(\'' + escJs(c.id) + '\')"><i class="fa-solid fa-pen"></i></button><button class="btn btn-sm" style="margin:0; background:#e74c3c; color:white;" onclick="deleteCompany(\'' + escJs(c.id) + '\')"><i class="fa-solid fa-trash"></i></button></div></div>';
      });
    } else { html = '<p style="text-align:center;">لا توجد شركات.</p>'; }
    document.getElementById('admin-companies-list').innerHTML = html;
  }).catch(handleError);
}

function addCompanyForm() {
  _supabase.from('card_categories').select('id, name_ar').then(function(catsRes) {
    var catOpts = '';
    if (catsRes.data) catsRes.data.forEach(function(c) { catOpts += '<option value="' + escHtml(c.id) + '">' + escHtml(c.name_ar) + '</option>'; });
    if (!catOpts) return Swal.fire('تنبيه', 'أضف فئة رئيسية أولاً', 'warning');
    Swal.fire({ title: 'إضافة شركة', html: '<input id="c-name" class="swal2-input" placeholder="اسم الشركة"><select id="c-cat" class="swal2-input">' + catOpts + '</select><input id="c-order" class="swal2-input" type="number" placeholder="ترتيب العرض" value="0"><label style="display:block; text-align:right; font-size:12px; margin-bottom:5px;">شعار الشركة:</label><input id="c-logo-file" type="file" accept="image/*" style="width:100%; margin-bottom:10px;">', confirmButtonText: 'حفظ', showCancelButton: true, cancelButtonText: t('cancel'), preConfirm: function() { var name = document.getElementById('c-name').value.trim(); if (!name) { Swal.showValidationMessage('اسم الشركة مطلوب'); return false; } return { name: name, category_id: document.getElementById('c-cat').value, display_order: parseInt(document.getElementById('c-order').value) || 0, file: document.getElementById('c-logo-file').files[0] }; } }).then(function(r) {
      if (!r.isConfirmed) return;
      Swal.fire({ title: 'جاري الحفظ...', didOpen: function() { Swal.showLoading(); } });
      uploadStoreFile(r.value.file, 'company_logos').then(function(url) {
        var data = { name: r.value.name, category_id: r.value.category_id, display_order: r.value.display_order };
        if (url) data.logo_url = url;
        return _supabase.from('companies').insert([data]);
      }).then(function() { Swal.fire(t('success'), t('added_msg'), 'success'); loadAdminStoreCompanies(); }).catch(handleError);
    });
  });
}

function editCompanyForm(id) {
  _supabase.from('companies').select('*').eq('id', id).maybeSingle().then(function(res) {
    if (!res.data) return;
    var c = res.data;
    _supabase.from('card_categories').select('id, name_ar').then(function(catsRes) {
      var catOpts = '';
      if (catsRes.data) catsRes.data.forEach(function(cat) { catOpts += '<option value="' + escHtml(cat.id) + '" ' + (cat.id === c.category_id ? 'selected' : '') + '>' + escHtml(cat.name_ar) + '</option>'; });
      Swal.fire({ title: 'تعديل شركة', html: '<input id="c-name" class="swal2-input" placeholder="اسم الشركة" value="' + escHtml(c.name) + '"><select id="c-cat" class="swal2-input">' + catOpts + '</select><input id="c-order" class="swal2-input" type="number" placeholder="ترتيب العرض" value="' + (c.display_order || 0) + '"><label style="display:block; text-align:right; font-size:12px; margin-bottom:5px;">تغيير الشعار:</label><input id="c-logo-file" type="file" accept="image/*" style="width:100%; margin-bottom:10px;">', confirmButtonText: 'حفظ', showCancelButton: true, cancelButtonText: t('cancel'), preConfirm: function() { var name = document.getElementById('c-name').value.trim(); if (!name) { Swal.showValidationMessage('اسم الشركة مطلوب'); return false; } return { name: name, category_id: document.getElementById('c-cat').value, display_order: parseInt(document.getElementById('c-order').value) || 0, file: document.getElementById('c-logo-file').files[0] }; } }).then(function(r) {
        if (!r.isConfirmed) return;
        Swal.fire({ title: 'جاري الحفظ...', didOpen: function() { Swal.showLoading(); } });
        uploadStoreFile(r.value.file, 'company_logos').then(function(url) {
          var data = { name: r.value.name, category_id: r.value.category_id, display_order: r.value.display_order };
          if (url) data.logo_url = url;
          return _supabase.from('companies').update(data).eq('id', id);
        }).then(function() { Swal.fire(t('success'), 'تم التعديل', 'success'); loadAdminStoreCompanies(); }).catch(handleError);
      });
    });
  });
}

function deleteCompany(id) { Swal.fire({ title: 'حذف الشركة وكل بطاقاتها؟', icon: 'warning', showCancelButton: true, confirmButtonText: 'نعم احذف', cancelButtonText: t('cancel') }).then(function(r) { if (r.isConfirmed) { _supabase.from('companies').delete().eq('id', id).then(function() { Swal.fire(t('success'), 'تم الحذف', 'success'); loadAdminStoreCompanies(); }).catch(handleError); } }); }

function loadAdminStoreProducts() {
  var box = document.getElementById('st-products');
  box.innerHTML = '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;"><h4 style="margin:0;">البطاقات</h4><button class="btn btn-primary" style="margin:0; padding:8px 15px;" onclick="addProductForm()"><i class="fa-solid fa-plus"></i> إضافة بطاقة</button></div><div id="admin-products-list"><p>جاري التحميل...</p></div>';
  _supabase.from('card_products').select('*, companies(name)').order('display_order').then(function(res) {
    var html = '';
    if (res.data && res.data.length > 0) {
      res.data.forEach(function(p) {
        html += '<div class="card" style="padding:12px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;"><div style="display:flex; align-items:center; gap:10px;">' + (p.image_url ? '<img src="' + escHtml(p.image_url) + '" style="width:50px; height:30px; object-fit:cover; border-radius:4px;">' : '') + '<div><strong>' + escHtml(p.name) + '</strong><br><small style="color:var(--text-muted);">' + (p.companies ? escHtml(p.companies.name) : '') + ' - السعر: ' + p.price + ' - مخزون: ' + (p.stock || 0) + '</small></div></div><div style="display:flex; gap:5px;">' +
        '<button class="btn btn-sm" style="margin:0; background:#3498db; color:white;" onclick="viewProductCodes(\'' + escJs(p.id) + '\', \'' + escJs(p.name) + '\')" title="عرض الأكواد"><i class="fa-solid fa-list"></i></button>' +
        '<button class="btn btn-sm" style="margin:0; background:var(--primary); color:white;" onclick="addCodesForm(\'' + escJs(p.id) + '\')" title="إضافة أكواد"><i class="fa-solid fa-key"></i></button>' +
        '<button class="btn btn-sm" style="margin:0; background:#f39c12; color:white;" onclick="editProductForm(\'' + escJs(p.id) + '\')"><i class="fa-solid fa-pen"></i></button>' +
        '<button class="btn btn-sm" style="margin:0; background:#e74c3c; color:white;" onclick="deleteProduct(\'' + escJs(p.id) + '\')"><i class="fa-solid fa-trash"></i></button>' +
        '</div></div>';
      });
    } else { html = '<p style="text-align:center;">لا توجد بطاقات.</p>'; }
    document.getElementById('admin-products-list').innerHTML = html;
  }).catch(handleError);
}

function addProductForm() {
  _supabase.from('companies').select('id, name').then(function(compRes) {
    var compOpts = '';
    if (compRes.data) compRes.data.forEach(function(c) { compOpts += '<option value="' + escHtml(c.id) + '">' + escHtml(c.name) + '</option>'; });
    if (!compOpts) return Swal.fire('تنبيه', 'أضف شركة أولاً', 'warning');
    Swal.fire({ title: 'إضافة بطاقة', html: '<select id="p-company" class="swal2-input">' + compOpts + '</select><input id="p-name" class="swal2-input" placeholder="اسم البطاقة"><input id="p-value" class="swal2-input" type="number" placeholder="القيمة الاسمية"><input id="p-price" class="swal2-input" type="number" placeholder="سعر البيع"><select id="p-fulfill" class="swal2-input"><option value="auto_code">تسليم آلي (أكواد)</option><option value="manual">تسليم يدوي</option></select><input id="p-order" class="swal2-input" type="number" placeholder="ترتيب العرض" value="0"><label style="display:block; text-align:right; font-size:12px; margin-bottom:5px;">صورة البطاقة:</label><input id="p-img-file" type="file" accept="image/*" style="width:100%; margin-bottom:10px;">', confirmButtonText: 'حفظ', showCancelButton: true, cancelButtonText: t('cancel'), preConfirm: function() { var name = document.getElementById('p-name').value.trim(); var price = parseFloat(document.getElementById('p-price').value); if (!name || !price) { Swal.showValidationMessage('الاسم والسعر مطلوبان'); return false; } return { company_id: document.getElementById('p-company').value, name: name, value: parseFloat(document.getElementById('p-value').value) || price, price: price, fulfillment_type: document.getElementById('p-fulfill').value, display_order: parseInt(document.getElementById('p-order').value) || 0, file: document.getElementById('p-img-file').files[0] }; } }).then(function(r) {
      if (!r.isConfirmed) return;
      Swal.fire({ title: 'جاري الحفظ...', didOpen: function() { Swal.showLoading(); } });
      uploadStoreFile(r.value.file, 'card_images').then(function(url) {
        var data = { company_id: r.value.company_id, name: r.value.name, value: r.value.value, price: r.value.price, fulfillment_type: r.value.fulfillment_type, display_order: r.value.display_order };
        if (url) data.image_url = url;
        return _supabase.from('card_products').insert([data]);
      }).then(function() { Swal.fire(t('success'), t('added_msg'), 'success'); loadAdminStoreProducts(); }).catch(handleError);
    });
  });
}

function editProductForm(id) {
  _supabase.from('card_products').select('*').eq('id', id).maybeSingle().then(function(res) {
    if (!res.data) return;
    var p = res.data;
    _supabase.from('companies').select('id, name').then(function(compRes) {
      var compOpts = '';
      if (compRes.data) compRes.data.forEach(function(c) { compOpts += '<option value="' + escHtml(c.id) + '" ' + (c.id === p.company_id ? 'selected' : '') + '>' + escHtml(c.name) + '</option>'; });
      Swal.fire({ title: 'تعديل البطاقة', html: '<select id="p-company" class="swal2-input">' + compOpts + '</select><input id="p-name" class="swal2-input" placeholder="اسم البطاقة" value="' + escHtml(p.name) + '"><input id="p-value" class="swal2-input" type="number" placeholder="القيمة" value="' + p.value + '"><input id="p-price" class="swal2-input" type="number" placeholder="السعر" value="' + p.price + '"><select id="p-fulfill" class="swal2-input"><option value="auto_code" ' + (p.fulfillment_type === 'auto_code' ? 'selected' : '') + '>آلي</option><option value="manual" ' + (p.fulfillment_type === 'manual' ? 'selected' : '') + '>يدوي</option></select><input id="p-order" class="swal2-input" type="number" placeholder="ترتيب" value="' + (p.display_order || 0) + '"><label style="display:block; text-align:right; font-size:12px; margin-bottom:5px;">تغيير الصورة:</label><input id="p-img-file" type="file" accept="image/*" style="width:100%; margin-bottom:10px;">', confirmButtonText: 'حفظ', showCancelButton: true, cancelButtonText: t('cancel'), preConfirm: function() { var name = document.getElementById('p-name').value.trim(); var price = parseFloat(document.getElementById('p-price').value); if (!name || !price) { Swal.showValidationMessage('الاسم والسعر مطلوبان'); return false; } return { company_id: document.getElementById('p-company').value, name: name, value: parseFloat(document.getElementById('p-value').value) || price, price: price, fulfillment_type: document.getElementById('p-fulfill').value, display_order: parseInt(document.getElementById('p-order').value) || 0, file: document.getElementById('p-img-file').files[0] }; } }).then(function(r) {
        if (!r.isConfirmed) return;
        Swal.fire({ title: 'جاري الحفظ...', didOpen: function() { Swal.showLoading(); } });
        uploadStoreFile(r.value.file, 'card_images').then(function(url) {
          var data = { company_id: r.value.company_id, name: r.value.name, value: r.value.value, price: r.value.price, fulfillment_type: r.value.fulfillment_type, display_order: r.value.display_order };
          if (url) data.image_url = url;
          return _supabase.from('card_products').update(data).eq('id', id);
        }).then(function() { Swal.fire(t('success'), 'تم التعديل', 'success'); loadAdminStoreProducts(); }).catch(handleError);
      });
    });
  });
}

function deleteProduct(id) { Swal.fire({ title: 'حذف البطاقة؟', icon: 'warning', showCancelButton: true, confirmButtonText: 'نعم احذف', cancelButtonText: t('cancel') }).then(function(r) { if (r.isConfirmed) { _supabase.from('card_products').delete().eq('id', id).then(function() { Swal.fire(t('success'), 'تم الحذف', 'success'); loadAdminStoreProducts(); }).catch(handleError); } }); }

function loadAdminStoreOrders() {
  var box = document.getElementById('st-orders');
  box.innerHTML = '<p>' + t('loading') + '</p>';
  _supabase.from('card_orders')
    .select('*, profiles(full_name, phone, email), card_order_items(*), digital_codes(*)')
    .order('created_at', { ascending: false }).limit(100)
    .then(function(res) {
      if (!res.data || !res.data.length) { box.innerHTML = '<p style="text-align:center;">لا توجد طلبات بعد.</p>'; return; }
      var html = '';
      res.data.forEach(function(o) {
        var d = new Date(o.created_at);
        var dateStr = d.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' - ' + d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
        var relTime = typeof getRelativeTime === 'function' ? getRelativeTime(d) : '';
        var itemsHtml = (o.card_order_items || []).map(function(i) {
          return '<li style="margin-bottom:5px; padding:8px; background:#f9f9f9; border-radius:6px;"><strong>' + escHtml(i.product_name) + '</strong> × ' + i.quantity + ' = ' + i.subtotal + ' ' + t('currency') + '</li>';
        }).join('');
        var codesHtml = '';
        if (o.digital_codes && o.digital_codes.length > 0) {
          codesHtml = '<div style="margin-top:10px; padding:10px; background:#f0f8ff; border-radius:8px; border:1px solid #bce;"><strong style="font-size:12px; color:var(--primary);">الأكواد المباعة:</strong><ul style="margin:5px 0 0 0; padding-right:15px; font-size:12px; direction:ltr; text-align:left;">';
          o.digital_codes.forEach(function(c) { codesHtml += '<li>Serial: <b>' + escHtml(c.serial_number) + '</b> | PIN: <b>' + escHtml(c.pin_code) + '</b></li>'; });
          codesHtml += '</ul></div>';
        }
        var cust = o.profiles || {};
        html += '<div class="card" style="padding:15px; margin-bottom:12px; border-right:4px solid var(--primary);"><div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:10px;"><div style="flex:1;"><div style="font-size:11px; color:var(--text-muted);">#' + String(o.id).substring(0, 8) + '</div><div style="font-weight:bold; color:var(--primary); margin:4px 0;"><i class="fa-solid fa-user"></i> ' + escHtml(cust.full_name || 'غير معروف') + '</div><div style="font-size:12px; color:var(--text-muted);"><i class="fa-solid fa-phone"></i> ' + escHtml(cust.phone || '-') + '</div><div style="font-size:12px; color:var(--text-muted);"><i class="fa-solid fa-envelope"></i> ' + escHtml(cust.email || '-') + '</div><div style="font-size:11px; color:var(--text-muted); margin-top:6px;"><i class="fa-regular fa-calendar"></i> ' + dateStr + '</div><div style="font-size:11px; color:var(--accent); margin-top:3px;"><i class="fa-solid fa-clock-rotate-left"></i> ' + relTime + '</div></div><div style="text-align:left;"><div style="font-size:22px; font-weight:bold; color:var(--accent);">' + o.total_amount + '</div><div style="font-size:11px; color:var(--text-muted);">' + t('currency') + '</div></div></div><ul style="margin:0; padding-right:0; list-style:none; font-size:13px; border-top:1px solid #eee; padding-top:10px;">' + itemsHtml + '</ul>' + codesHtml + '</div>';
      });
      box.innerHTML = html;
    }).catch(handleError);
}

function uploadStoreFile(file, folder) {
  return new Promise(function(resolve, reject) {
    if (!file) return resolve('');
    var fileName = folder + '/' + Date.now() + '_' + file.name;
    _supabase.storage.from('services').upload(fileName, file).then(function(res) { if (res.error) reject(res.error); else resolve(_supabase.storage.from('services').getPublicUrl(fileName).data.publicUrl); });
  });
}

function addCodesForm(productId) {
  Swal.fire({ title: 'إضافة أكواد', html: '<p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">أدخل التسلسلي , السري (سطر لكل كود)</p><textarea id="cd-data" class="swal2-textarea" placeholder="SERIAL123 , PIN123&#10;SERIAL124 , PIN124" style="min-height:150px; direction:ltr; text-align:left;"></textarea>', confirmButtonText: 'رفع', showCancelButton: true, cancelButtonText: t('cancel'), preConfirm: function() { var raw = document.getElementById('cd-data').value; var lines = raw.split(/\r?\n/).map(function(x) { return x.trim(); }).filter(Boolean); if (!lines.length) { Swal.showValidationMessage('أدخل كوداً واحداً على الأقل'); return false; } return lines; } }).then(function(r) {
    if (!r.isConfirmed) return;
    var rows = r.value.map(function(line) { var parts = line.split(',').map(function(p) { return p.trim(); }); return { product_id: productId, serial_number: parts[0], pin_code: parts[1] || '' }; });
    Swal.fire({ title: 'جاري الرفع...', didOpen: function() { Swal.showLoading(); } });
    _supabase.from('digital_codes').insert(rows).then(function(insRes) { if (insRes.error) throw insRes.error; return _supabase.from('digital_codes').select('*', { count: 'exact', head: true }).eq('product_id', productId).eq('is_used', false).then(function(cntRes) { return _supabase.from('card_products').update({ stock: cntRes.count }).eq('id', productId); }); }).then(function() { Swal.fire(t('success'), 'تم رفع ' + rows.length + ' كود', 'success'); loadAdminStoreProducts(); }).catch(handleError);
  });
}

// ✅ دالة عرض الأكواد لكل منتج
function viewProductCodes(productId, productName, filterMode) {
    if (!filterMode) filterMode = 'all';
    Swal.fire({ title: 'جاري التحميل...', didOpen: function() { Swal.showLoading(); } });
    _supabase.from('digital_codes')
        .select('*, profiles!digital_codes_used_by_fkey(full_name, phone)')
        .eq('product_id', productId)
        .order('created_at', { ascending: false })
        .then(function(res) {
            if (res.error) return Swal.fire('خطأ', res.error.message, 'error');
            var codes = res.data || [];
            var total = codes.length;
            var usedCount = codes.filter(function(c) { return c.is_used; }).length;
            var availableCount = total - usedCount;

            var filtered = codes;
            if (filterMode === 'available') filtered = codes.filter(function(c) { return !c.is_used; });
            else if (filterMode === 'used') filtered = codes.filter(function(c) { return c.is_used; });

            var html = '<div style="text-align:right;">';
            html += '<h4 style="margin-bottom:12px; color:var(--primary); font-size:15px;">📦 ' + escHtml(productName) + '</h4>';
            
            html += '<div style="display:flex; gap:8px; margin-bottom:12px;">' +
                '<div style="flex:1; background:#e8f5e9; padding:8px; border-radius:8px; text-align:center;"><div style="font-size:18px; font-weight:bold; color:#27ae60;">' + availableCount + '</div><div style="font-size:10px;">متاح</div></div>' +
                '<div style="flex:1; background:#fee; padding:8px; border-radius:8px; text-align:center;"><div style="font-size:18px; font-weight:bold; color:#e74c3c;">' + usedCount + '</div><div style="font-size:10px;">مستخدم</div></div>' +
                '<div style="flex:1; background:#eef5ff; padding:8px; border-radius:8px; text-align:center;"><div style="font-size:18px; font-weight:bold; color:#3498db;">' + total + '</div><div style="font-size:10px;">الإجمالي</div></div>' +
            '</div>';

            html += '<div style="display:flex; gap:5px; margin-bottom:12px; background:#f0f0f0; padding:4px; border-radius:10px;">' +
                '<button onclick="viewProductCodes(\'' + escJs(productId) + '\', \'' + escJs(productName) + '\', \'all\')" style="flex:1; padding:8px; border:none; border-radius:8px; cursor:pointer; font-weight:bold; font-size:12px; ' + (filterMode === 'all' ? 'background:var(--primary); color:white;' : 'background:transparent; color:#666;') + '">الكل (' + total + ')</button>' +
                '<button onclick="viewProductCodes(\'' + escJs(productId) + '\', \'' + escJs(productName) + '\', \'available\')" style="flex:1; padding:8px; border:none; border-radius:8px; cursor:pointer; font-weight:bold; font-size:12px; ' + (filterMode === 'available' ? 'background:#27ae60; color:white;' : 'background:transparent; color:#666;') + '">المتاح (' + availableCount + ')</button>' +
                '<button onclick="viewProductCodes(\'' + escJs(productId) + '\', \'' + escJs(productName) + '\', \'used\')" style="flex:1; padding:8px; border:none; border-radius:8px; cursor:pointer; font-weight:bold; font-size:12px; ' + (filterMode === 'used' ? 'background:#e74c3c; color:white;' : 'background:transparent; color:#666;') + '">المستخدم (' + usedCount + ')</button>' +
            '</div>';

            if (filtered.length === 0) {
                html += '<p style="text-align:center; color:#888; padding:20px;">لا توجد أكواد ' + (filterMode === 'available' ? 'متاحة' : filterMode === 'used' ? 'مستخدمة' : '') + ' لهذا المنتج.</p>';
            } else {
                html += '<div style="max-height:340px; overflow-y:auto; border:1px solid #ddd; border-radius:8px;">';
                html += '<table style="width:100%; border-collapse:collapse; font-size:12px;">';
                html += '<thead><tr style="background:var(--primary); color:white; position:sticky; top:0; z-index:1;">' +
                    '<th style="padding:8px; text-align:right;">#</th>' +
                    '<th style="padding:8px; text-align:right;">التسلسلي</th>' +
                    '<th style="padding:8px; text-align:right;">الرقم السري</th>' +
                    '<th style="padding:8px; text-align:center;">الحالة</th>' +
                    '<th style="padding:8px; text-align:right;">المشتري / التاريخ</th>' +
                    '<th style="padding:8px; text-align:center;">إجراء</th>' + // العمود الجديد
                    '</tr></thead><tbody>';
                filtered.forEach(function(c, i) {
                    var statusBadge = c.is_used 
                        ? '<span style="background:#e74c3c; color:white; padding:2px 8px; border-radius:10px; font-size:10px; white-space:nowrap;">مستخدم</span>' 
                        : '<span style="background:#27ae60; color:white; padding:2px 8px; border-radius:10px; font-size:10px; white-space:nowrap;">متاح</span>';
                    var buyer = '-';
                    if (c.is_used && c.profiles) {
                        var soldDate = c.used_at ? new Date(c.used_at).toLocaleDateString('ar-EG') : (c.updated_at ? new Date(c.updated_at).toLocaleDateString('ar-EG') : '');
                        buyer = '<b>' + escHtml(c.profiles.full_name) + '</b><br><small style="color:#888;">' + escHtml(c.profiles.phone || '-') + '</small>' + (soldDate ? '<br><small style="color:#27ae60;">📅 ' + soldDate + '</small>' : '');
                    }
                    html += '<tr style="border-bottom:1px solid #eee; ' + (c.is_used ? 'background:#fff5f5;' : '') + '">' +
                        '<td style="padding:6px;">' + (i + 1) + '</td>' +
                        '<td style="padding:6px; font-family:monospace; direction:ltr; font-size:11px;">' + escHtml(c.serial_number || '-') + '</td>' +
                        '<td style="padding:6px; font-family:monospace; direction:ltr; font-weight:bold; color:var(--primary); font-size:11px;">' + escHtml(c.pin_code || '-') + '</td>' +
                        '<td style="padding:6px; text-align:center;">' + statusBadge + '</td>' +
                        '<td style="padding:6px; font-size:11px;">' + buyer + '</td>' +
                        // زر التعديل الجديد
                        '<td style="padding:6px; text-align:center;"><button class="btn btn-primary btn-sm" style="margin:0; padding:4px 8px;" onclick="editDigitalCode(\'' + escJs(c.id) + '\', \'' + escJs(c.serial_number || '') + '\', \'' + escJs(c.pin_code || '') + '\', \'' + escJs(productId) + '\', \'' + escJs(productName) + '\', \'' + filterMode + '\')"><i class="fa-solid fa-pen"></i></button></td>' +
                    '</tr>';
                });
                html += '</tbody></table></div>';
                
                if (filterMode !== 'used') {
                    var availableCodes = codes.filter(function(c) { return !c.is_used; });
                    if (availableCodes.length > 0) {
                        var codesList = availableCodes.map(function(c) { return (c.serial_number || '') + ' , ' + (c.pin_code || ''); }).join('\n');
                        html += '<button onclick="copyCodesToClipboard(this)" data-codes="' + escAttr(codesList) + '" style="width:100%; margin-top:12px; padding:10px; background:var(--accent); color:white; border:none; border-radius:8px; font-weight:bold; cursor:pointer;"><i class="fa-solid fa-copy"></i> نسخ الأكواد المتاحة (' + availableCodes.length + ')</button>';
                    }
                }
            }
            html += '</div>';
            Swal.fire({ title: '📋 أكواد البطاقات', html: html, confirmButtonText: 'إغلاق', width: 650 });
        }).catch(handleError);
}

// ✅ نسخ الأكواد للحافظة
function copyCodesToClipboard(btn) {
    var codes = btn.getAttribute('data-codes');
    if (!codes) return;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(codes).then(function() {
            var original = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check"></i> تم النسخ!';
            btn.style.background = '#27ae60';
            setTimeout(function() { btn.innerHTML = original; btn.style.background = 'var(--accent)'; }, 1500);
        });
    } else {
        var textarea = document.createElement('textarea');
        textarea.value = codes;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        btn.innerHTML = '<i class="fa-solid fa-check"></i> تم النسخ!';
    }
}

function editDigitalCode(codeId, currentSerial, currentPin, productId, productName, filterMode) {
    Swal.fire({
        title: 'تعديل الكود',
        html: '<div style="text-align:right;">' +
              '<label style="font-weight:bold; display:block; margin-bottom:5px; font-size:12px;">الرقم التسلسلي:</label>' +
              '<input id="edit-serial" class="swal2-input" value="' + escHtml(currentSerial) + '" dir="ltr" style="margin-bottom:15px;">' +
              '<label style="font-weight:bold; display:block; margin-bottom:5px; font-size:12px;">الرقم السري (PIN):</label>' +
              '<input id="edit-pin" class="swal2-input" value="' + escHtml(currentPin) + '" dir="ltr">' +
              '</div>',
        confirmButtonText: 'حفظ التعديل',
        showCancelButton: true,
        cancelButtonText: t('cancel'),
        preConfirm: function() {
            var s = document.getElementById('edit-serial').value.trim();
            var p = document.getElementById('edit-pin').value.trim();
            if (!s) { Swal.showValidationMessage('الرقم التسلسلي مطلوب'); return false; }
            return { serial: s, pin: p };
        }
    }).then(function(r) {
        if (!r.isConfirmed) return;
        
        Swal.fire({ title: 'جاري الحفظ...', didOpen: function() { Swal.showLoading(); } });
        
        _supabase.from('digital_codes').update({
            serial_number: r.value.serial,
            pin_code: r.value.pin
        }).eq('id', codeId).then(function(res) {
            if (res.error) return Swal.fire('خطأ', res.error.message, 'error');
            
            Swal.fire({ title: 'تم', text: 'تم تعديل الكود بنجاح', icon: 'success', timer: 1500, showConfirmButton: false });
            
            // إعادة فتح القائمة بعد ثانية ونصف لتحديث البيانات أمامك
            setTimeout(function() {
                viewProductCodes(productId, productName, filterMode);
            }, 1500);
        }).catch(handleError);
    });
}