// ============================================================
// cards.js — النظام الشامل للمتجر (آمن، مرتب، ويمنع التكرار)
// ============================================================
var cardsState = { currentCategory: null, currentCompany: null, categories: [], orderQty: 1, currentProduct: null };
var isCheckingOut = false;

// ---------- واجهة المتجر للعميل ----------
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
      var stockBadge = p.fulfillment_type === 'auto_code' ? (p.stock > 0 ? '<span style="color:var(--primary); font-size:12px;">متوفر: ' + p.stock + '</span>' : '<span style="color:#e74c3c; font-size:12px;">نفد</span>') : '<span style="color:var(--accent); font-size:12px;">تسليم يدوي</span>';
      var canBuy = p.fulfillment_type === 'manual' || p.stock > 0;
      html += '<div class="card" style="padding:15px; display:flex; justify-content:space-between; align-items:center; ' + (!canBuy ? 'opacity:0.5;' : '') + '"><div style="display:flex; gap:10px; align-items:center;">' + (p.image_url ? '<img src="' + escHtml(p.image_url) + '" style="width:60px; height:40px; object-fit:cover; border-radius:6px;">' : '') + '<div><div style="font-weight:bold; font-size:16px;">' + escHtml(p.name) + '</div><div style="font-size:12px; color:var(--text-muted); margin-top:4px;">القيمة: ' + p.value + ' | السعر: <b style="color:var(--accent);">' + p.price + ' ' + t('currency') + '</b></div><div style="margin-top:6px;">' + stockBadge + '</div></div></div>' + (canBuy ? '<button class="btn btn-primary" style="margin:0; padding:10px 20px;" onclick="openQuantityModal(' + JSON.stringify(p).replace(/"/g, '&quot;') + ')">اختيار</button>' : '<button class="btn" style="margin:0; background:#ccc; color:#666; cursor:not-allowed; padding:10px 20px;" disabled>نفد</button>') + '</div>';
    });
    document.getElementById('products-grid').innerHTML = html;
  }).catch(handleError);
}

function openQuantityModal(product) {
  cardsState.orderQty = 1; cardsState.currentProduct = product;
  var maxQty = product.fulfillment_type === 'manual' ? 99 : Math.min(product.stock, 99);
  Swal.fire({
    title: escHtml(product.name),
    html: '<p style="color:var(--accent); font-weight:bold; margin-bottom:15px;">' + product.price + ' ' + t('currency') + ' للوحدة</p><div style="display:flex; align-items:center; justify-content:center; gap:15px; margin-bottom:20px;"><button type="button" onclick="changeQty(-1)" style="width:50px; height:50px; border-radius:50%; border:2px solid var(--primary); background:white; color:var(--primary); font-size:24px; font-weight:bold; cursor:pointer;">−</button><div id="qty-display" style="font-size:36px; font-weight:bold; min-width:70px; color:var(--primary);">1</div><button type="button" onclick="changeQty(1)" style="width:50px; height:50px; border-radius:50%; border:none; background:var(--primary); color:white; font-size:24px; font-weight:bold; cursor:pointer;">+</button></div><div id="total-display" style="font-size:18px; font-weight:bold; color:var(--accent);">الإجمالي: ' + product.price + ' ' + t('currency') + '</div><div id="stock-warning" style="color:#e74c3c; font-size:12px; margin-top:8px; display:none;">الكمية تجاوزت المتوفر (' + maxQty + ')</div>',
    confirmButtonText: 'أضف للسلة', showCancelButton: true, cancelButtonText: t('cancel'),
    didOpen: function() { window._maxQty = maxQty; window._unitPrice = Number(product.price); },
    preConfirm: function() { if (cardsState.orderQty < 1 || cardsState.orderQty > maxQty) { Swal.showValidationMessage('الكمية غير صحيحة'); return false; } return true; }
  }).then(function(r) { if (r.isConfirmed) addToCart(product.id, cardsState.orderQty); });
}

function changeQty(delta) {
  var maxQty = window._maxQty || 1; var newQty = cardsState.orderQty + delta;
  if (delta < 0 && newQty < 1) return;
  if (delta > 0 && newQty > maxQty) { document.getElementById('stock-warning').style.display = 'block'; return; }
  cardsState.orderQty = newQty;
  document.getElementById('qty-display').innerText = newQty;
  document.getElementById('stock-warning').style.display = 'none';
  document.getElementById('total-display').innerText = 'الإجمالي: ' + (newQty * window._unitPrice).toFixed(2) + ' ' + t('currency');
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

function renderCart() {
  document.getElementById('page-cart').innerHTML = '<h2 style="color:var(--primary); margin-bottom:15px;"><i class="fa-solid fa-cart-shopping"></i> السلة</h2><div id="cart-body"><p>' + t('loading') + '</p></div>';
  _supabase.from('cart_items').select('*, card_products(name, price, value, company_id, companies(name))').eq('user_id', currentUser.id).then(function(res) {
    if (!res.data || !res.data.length) { document.getElementById('cart-body').innerHTML = '<div class="card" style="text-align:center; padding:40px 20px;"><i class="fa-solid fa-cart-shopping" style="font-size:48px; color:var(--text-muted); margin-bottom:15px;"></i><p>السلة فارغة</p><button class="btn btn-primary" onclick="navTo(\'cards\')" style="margin-top:15px;">تصفح المتجر</button></div>'; return; }
    var total = 0; var html = '';
    res.data.forEach(function(item) {
      var p = item.card_products; if (!p) return;
      var sub = Number(p.price) * item.quantity; total += sub;
      html += '<div class="card" style="padding:15px; margin-bottom:10px;"><div style="display:flex; justify-content:space-between; margin-bottom:10px;"><div><strong>' + escHtml(p.name) + '</strong><br><small style="color:var(--text-muted);">' + escHtml(p.companies ? p.companies.name : '') + '</small></div><button onclick="removeCartItem(\'' + escJs(item.id) + '\')" style="background:none; border:none; color:#e74c3c; font-size:18px; cursor:pointer;"><i class="fa-solid fa-trash"></i></button></div><div style="display:flex; justify-content:space-between; align-items:center;"><div style="display:flex; align-items:center; gap:10px;"><button onclick="updateCartQty(\'' + escJs(item.id) + '\', -1, ' + item.quantity + ')" style="width:32px; height:32px; border-radius:50%; border:2px solid var(--primary); background:white; color:var(--primary); font-size:16px; cursor:pointer;">−</button><span style="font-weight:bold; font-size:16px; min-width:30px; text-align:center;">' + item.quantity + '</span><button onclick="updateCartQty(\'' + escJs(item.id) + '\', 1, ' + item.quantity + ')" style="width:32px; height:32px; border-radius:50%; border:none; background:var(--primary); color:white; font-size:16px; cursor:pointer;">+</button></div><strong style="color:var(--accent);">' + sub.toFixed(2) + ' ' + t('currency') + '</strong></div></div>';
    });
    html += '<div class="card" style="padding:15px; background:linear-gradient(135deg,var(--primary),var(--primary-light)); color:white;"><div style="display:flex; justify-content:space-between; align-items:center; font-size:18px; font-weight:bold;"><span>الإجمالي:</span><span>' + total.toFixed(2) + ' ' + t('currency') + '</span></div></div><button class="btn btn-accent" style="margin-top:15px; width:100%; padding:15px; font-size:16px;" onclick="checkoutCart()"><i class="fa-solid fa-check-circle"></i> تأكيد الشراء</button>';
    document.getElementById('cart-body').innerHTML = html;
  }).catch(handleError);
}

function updateCartQty(itemId, delta, currentQty) {
  var newQty = currentQty + delta; if (newQty < 1) return removeCartItem(itemId); if (newQty > 99) return;
  _supabase.from('cart_items').update({ quantity: newQty }).eq('id', itemId).then(function(res) { if (res.error) throw res.error; renderCart(); updateCartBadge(); }).catch(handleError);
}

function removeCartItem(itemId) {
  _supabase.from('cart_items').delete().eq('id', itemId).then(function() { renderCart(); updateCartBadge(); }).catch(handleError);
}

function checkoutCart() {
  if (isCheckingOut) return;
  Swal.fire({ title: 'تأكيد الشراء؟', text: 'سيتم خصم المبلغ من محفظتك وتحويله للمدير. هل أنت متأكد؟', icon: 'question', showCancelButton: true, confirmButtonText: 'نعم، اشترِ الآن', cancelButtonText: t('cancel') }).then(function(r) {
    if (!r.isConfirmed) return;
    isCheckingOut = true;
    Swal.fire({ title: 'جاري تنفيذ الشراء...', allowOutsideClick: false, didOpen: function() { Swal.showLoading(); } });
    _supabase.rpc('purchase_cart', { p_user_id: currentUser.id }).then(function(res) {
      if (res.error) throw res.error; if (!res.data || !res.data.success) throw new Error(res.data ? res.data.message : 'فشل الشراء');
      var items = res.data.items || []; var itemsHtml = ''; var cardIndex = 0;
      items.forEach(function(item) {
        if (item.codes && item.codes.length > 0) {
          item.codes.forEach(function(code) {
            cardIndex++; var barcodeId = 'barcode-' + Date.now() + '-' + cardIndex; var barcodeValue = String(code.pin || code.serial || '0');
            itemsHtml += '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; padding: 20px; margin-bottom: 15px; color: white; text-align: center; box-shadow: 0 8px 20px rgba(102,126,234,0.4);"><div style="font-size: 12px; opacity: 0.85; margin-bottom: 4px;">' + escHtml(item.company_name) + '</div><div style="font-size: 18px; font-weight: bold; margin-bottom: 15px;">' + escHtml(item.product_name) + '</div><div style="background: rgba(255,255,255,0.15); border-radius: 12px; padding: 15px;"><div style="text-align: right; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 10px;"><div style="font-size: 11px; opacity: 0.8; margin-bottom: 4px;">الرقم التسلسلي</div><div style="font-size: 17px; font-weight: bold; font-family: \'Courier New\', monospace; direction: ltr; letter-spacing: 1px;">' + escHtml(code.serial || '---') + '</div></div><div style="text-align: right; margin-bottom: 12px;"><div style="font-size: 11px; opacity: 0.8; margin-bottom: 4px;">الرقم السري</div><div style="font-size: 17px; font-weight: bold; font-family: \'Courier New\', monospace; direction: ltr; letter-spacing: 2px;">' + escHtml(code.pin || '---') + '</div></div><div style="background: white; border-radius: 8px; padding: 8px; margin-top: 10px;"><svg id="' + barcodeId + '" style="width: 100%; height: auto; display: block;"></svg></div></div><button onclick="copyCardDetails(\'' + escJs(code.serial || '') + '\', \'' + escJs(code.pin || '') + '\')" style="background: white; color: #667eea; border: none; padding: 10px 24px; border-radius: 24px; margin-top: 12px; font-weight: bold; cursor: pointer; font-size: 14px;"><i class="fa-solid fa-copy"></i> نسخ البيانات</button></div>';
            setTimeout(function() {
              var svg = document.getElementById(barcodeId);
              if (svg && typeof JsBarcode !== 'undefined') { try { JsBarcode(svg, barcodeValue, { format: 'CODE128', width: 2, height: 55, displayValue: true, fontSize: 14, background: '#ffffff', lineColor: '#000000', margin: 5 }); } catch (e) { svg.outerHTML = '<div style="color:#666; font-size:12px; padding:10px;">' + escHtml(barcodeValue) + '</div>'; } }
            }, 150);
          });
        } else {
          itemsHtml += '<div style="background: #fef3c7; border: 2px dashed #f59e0b; border-radius: 16px; padding: 20px; margin-bottom: 15px; text-align: center;"><i class="fa-solid fa-clock" style="font-size: 36px; color: #f59e0b; margin-bottom: 10px; display: block;"></i><div style="font-weight: bold; color: #92400e; margin-bottom: 5px; font-size: 15px;">' + escHtml(item.product_name) + '</div><div style="font-size: 12px; color: #78350f;">سيتم التسليم يدوياً من قبل الإدارة قريباً</div></div>';
        }
      });
      Swal.fire({ title: '✅ تم الشراء بنجاح!', html: '<div style="text-align: center; padding: 10px 0; margin-bottom: 15px; background: rgba(102,126,234,0.1); border-radius: 10px;"><div style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px;">الإجمالي المدفوع</div><div style="font-size: 22px; font-weight: bold; color: var(--accent);">' + res.data.total + ' ' + t('currency') + '</div></div><div style="max-height: 450px; overflow-y: auto; padding: 5px;">' + (itemsHtml || '<p style="text-align:center;">لا توجد عناصر</p>') + '</div>', confirmButtonText: 'حسناً', width: 500 });
      updateCartBadge(); isCheckingOut = false;
    }).catch(function(err) { isCheckingOut = false; handleError(err); });
  });
}

function copyCardDetails(serial, pin) {
  var text = 'Serial Number: ' + serial + '\nPIN Code: ' + pin;
  if (navigator.clipboard) { navigator.clipboard.writeText(text).then(function() { Swal.fire({ title: 'تم نسخ البيانات ✓', icon: 'success', timer: 1200, showConfirmButton: false, toast: true, position: 'top-end' }); }).catch(function() { Swal.fire('البيانات', '<pre style="text-align:left; direction:ltr;">' + escHtml(text) + '</pre>', 'info'); }); }
}

// ---------- لوحة إدارة المتجر (نظام التبويبات الشامل) ----------
function loadAdminStore() {
  document.getElementById('a-store').innerHTML = `
    <div class="tabs" style="margin-bottom: 15px;">
      <div class="tab active" onclick="storeTab(this,'st-cats')">الفئات الرئيسية</div>
      <div class="tab" onclick="storeTab(this,'st-companies')">الشركات</div>
      <div class="tab" onclick="storeTab(this,'st-products')">البطاقات (المنتجات)</div>
      <div class="tab" onclick="storeTab(this,'st-orders')">الطلبات</div>
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
  box.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;"><h4 style="margin:0;">الفئات الرئيسية</h4><button class="btn btn-primary" style="margin:0; padding:8px 15px;" onclick="addMainCategoryForm()"><i class="fa-solid fa-plus"></i> إضافة فئة</button></div><div id="admin-cats-list"><p>جاري التحميل...</p></div>`;
  _supabase.from('card_categories').select('*').order('display_order').then(function(res) {
    var html = '';
    if (res.data && res.data.length > 0) {
      res.data.forEach(function(c) {
        html += `<div class="card" style="padding:12px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;"><div style="display:flex; align-items:center; gap:10px;"><i class="fa-solid ${escHtml(c.icon || 'fa-tag')}" style="font-size:24px; color:var(--primary);"></i><strong>${escHtml(currentLang === 'ar' ? c.name_ar : c.name_en)}</strong></div><div style="display:flex; gap:5px;"><button class="btn btn-sm" style="margin:0; background:#f39c12; color:white;" onclick="editMainCategoryForm('${escJs(c.id)}')"><i class="fa-solid fa-pen"></i></button><button class="btn btn-sm" style="margin:0; background:#e74c3c; color:white;" onclick="deleteMainCategory('${escJs(c.id)}')"><i class="fa-solid fa-trash"></i></button></div></div>`;
      });
    } else { html = '<p style="text-align:center;">لا توجد فئات رئيسية.</p>'; }
    document.getElementById('admin-cats-list').innerHTML = html;
  }).catch(handleError);
}

function addMainCategoryForm() {
  Swal.fire({ title: 'إضافة فئة رئيسية', html: `<input id="cat-name-ar" class="swal2-input" placeholder="الاسم بالعربية (مثال: بطاقات محلية)"><input id="cat-name-en" class="swal2-input" placeholder="الاسم بالإنجليزية (اختياري)"><input id="cat-icon" class="swal2-input" placeholder="أيقونة (مثال: fa-credit-card)" value="fa-tag">`, confirmButtonText: 'حفظ', showCancelButton: true, cancelButtonText: t('cancel'), preConfirm: function() { var nameAr = document.getElementById('cat-name-ar').value.trim(); if (!nameAr) { Swal.showValidationMessage('الاسم بالعربية مطلوب'); return false; } return { name_ar: nameAr, name_en: document.getElementById('cat-name-en').value.trim() || nameAr, icon: document.getElementById('cat-icon').value.trim() || 'fa-tag' }; } }).then(function(r) {
    if (!r.isConfirmed) return;
    Swal.fire({ title: 'جاري الحفظ...', didOpen: function() { Swal.showLoading(); } });
    _supabase.from('card_categories').insert([{ id: 'cat_' + Date.now(), name_ar: r.value.name_ar, name_en: r.value.name_en, icon: r.value.icon, display_order: 0 }]).then(function() { Swal.fire(t('success'), t('added_msg'), 'success'); loadAdminStoreCats(); }).catch(handleError);
  });
}

function editMainCategoryForm(id) {
  _supabase.from('card_categories').select('*').eq('id', id).maybeSingle().then(function(res) {
    if (!res.data) return;
    var c = res.data;
    Swal.fire({ title: 'تعديل الفئة الرئيسية', html: `<input id="cat-name-ar" class="swal2-input" placeholder="الاسم بالعربية" value="${escHtml(c.name_ar)}"><input id="cat-name-en" class="swal2-input" placeholder="الاسم بالإنجليزية" value="${escHtml(c.name_en)}"><input id="cat-icon" class="swal2-input" placeholder="أيقونة" value="${escHtml(c.icon)}">`, confirmButtonText: 'حفظ', showCancelButton: true, cancelButtonText: t('cancel'), preConfirm: function() { var nameAr = document.getElementById('cat-name-ar').value.trim(); if (!nameAr) { Swal.showValidationMessage('الاسم بالعربية مطلوب'); return false; } return { name_ar: nameAr, name_en: document.getElementById('cat-name-en').value.trim() || nameAr, icon: document.getElementById('cat-icon').value.trim() || 'fa-tag' }; } }).then(function(r) {
      if (!r.isConfirmed) return;
      Swal.fire({ title: 'جاري الحفظ...', didOpen: function() { Swal.showLoading(); } });
      _supabase.from('card_categories').update(r.value).eq('id', id).then(function() { Swal.fire(t('success'), 'تم التعديل', 'success'); loadAdminStoreCats(); }).catch(handleError);
    });
  });
}

function deleteMainCategory(id) {
  Swal.fire({ title: 'حذف الفئة الرئيسية؟', text: 'سيتم حذف جميع الشركات والبطاقات المرتبطة بها!', icon: 'warning', showCancelButton: true, confirmButtonText: 'نعم، احذف', cancelButtonText: t('cancel') }).then(function(r) {
    if (!r.isConfirmed) return;
    _supabase.from('card_categories').delete().eq('id', id).then(function() { Swal.fire(t('success'), 'تم الحذف', 'success'); loadAdminStoreCats(); }).catch(handleError);
  });
}

function loadAdminStoreCompanies() {
  var box = document.getElementById('st-companies');
  box.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;"><h4 style="margin:0;">الشركات</h4><button class="btn btn-primary" style="margin:0; padding:8px 15px;" onclick="addCompanyForm()"><i class="fa-solid fa-plus"></i> إضافة شركة</button></div><div id="admin-companies-list"><p>جاري التحميل...</p></div>`;
  _supabase.from('companies').select('*, card_categories(name_ar)').order('display_order').then(function(res) {
    var html = '';
    if (res.data && res.data.length > 0) {
      res.data.forEach(function(c) {
        html += `<div class="card" style="padding:12px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;"><div style="display:flex; align-items:center; gap:10px;">${c.logo_url ? `<img src="${escHtml(c.logo_url)}" style="width:40px; height:40px; border-radius:8px; object-fit:cover;">` : `<div style="width:40px; height:40px; background:var(--primary); border-radius:8px; color:white; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-building"></i></div>`}<div><strong>${escHtml(c.name)}</strong><br><small style="color:var(--text-muted);">${c.card_categories ? escHtml(c.card_categories.name_ar) : 'بدون فئة'}</small></div></div><div style="display:flex; gap:5px;"><button class="btn btn-sm" style="margin:0; background:#f39c12; color:white;" onclick="editCompanyForm('${escJs(c.id)}')"><i class="fa-solid fa-pen"></i></button><button class="btn btn-sm" style="margin:0; background:#e74c3c; color:white;" onclick="deleteCompany('${escJs(c.id)}')"><i class="fa-solid fa-trash"></i></button></div></div>`;
      });
    } else { html = '<p style="text-align:center;">لا توجد شركات.</p>'; }
    document.getElementById('admin-companies-list').innerHTML = html;
  }).catch(handleError);
}

function addCompanyForm() {
  _supabase.from('card_categories').select('id, name_ar').then(function(catsRes) {
    var catOpts = '';
    if (catsRes.data) { catsRes.data.forEach(function(c) { catOpts += `<option value="${escHtml(c.id)}">${escHtml(c.name_ar)}</option>`; }); }
    if (!catOpts) return Swal.fire('تنبيه', 'يجب إضافة فئة رئيسية أولاً', 'warning');
    Swal.fire({ title: 'إضافة شركة', html: `<input id="c-name" class="swal2-input" placeholder="اسم الشركة"><select id="c-cat" class="swal2-input">${catOpts}</select><label style="display:block; text-align:right; font-size:12px; margin-bottom:5px;">شعار الشركة:</label><input id="c-logo-file" type="file" accept="image/*" style="width:100%; margin-bottom:10px;">`, confirmButtonText: 'حفظ', showCancelButton: true, cancelButtonText: t('cancel'), preConfirm: function() { var name = document.getElementById('c-name').value.trim(); if (!name) { Swal.showValidationMessage('اسم الشركة مطلوب'); return false; } return { name: name, category_id: document.getElementById('c-cat').value, file: document.getElementById('c-logo-file').files[0] }; } }).then(function(r) {
      if (!r.isConfirmed) return;
      Swal.fire({ title: 'جاري الحفظ...', didOpen: function() { Swal.showLoading(); } });
      uploadStoreFile(r.value.file, 'company_logos').then(function(url) {
        var data = { name: r.value.name, category_id: r.value.category_id }; if (url) data.logo_url = url;
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
      if(catsRes.data) { catsRes.data.forEach(function(cat) { catOpts += `<option value="${escHtml(cat.id)}" ${cat.id === c.category_id ? 'selected' : ''}>${escHtml(cat.name_ar)}</option>`; }); }
      Swal.fire({ title: 'تعديل شركة', html: `<input id="c-name" class="swal2-input" placeholder="اسم الشركة" value="${escHtml(c.name)}"><select id="c-cat" class="swal2-input">${catOpts}</select><label style="display:block; text-align:right; font-size:12px; margin-bottom:5px;">تغيير الشعار (اختياري):</label><input id="c-logo-file" type="file" accept="image/*" style="width:100%; margin-bottom:10px;">`, confirmButtonText: 'حفظ', showCancelButton: true, cancelButtonText: t('cancel'), preConfirm: function() { var name = document.getElementById('c-name').value.trim(); if (!name) { Swal.showValidationMessage('اسم الشركة مطلوب'); return false; } return { name: name, category_id: document.getElementById('c-cat').value, file: document.getElementById('c-logo-file').files[0] }; } }).then(function(r) {
        if (!r.isConfirmed) return;
        Swal.fire({ title: 'جاري الحفظ...', didOpen: function() { Swal.showLoading(); } });
        uploadStoreFile(r.value.file, 'company_logos').then(function(url) {
          var data = { name: r.value.name, category_id: r.value.category_id }; if (url) data.logo_url = url;
          return _supabase.from('companies').update(data).eq('id', id);
        }).then(function() { Swal.fire(t('success'), 'تم التعديل', 'success'); loadAdminStoreCompanies(); }).catch(handleError);
      });
    });
  });
}

function deleteCompany(id) { Swal.fire({ title: 'حذف الشركة وكل فئاتها؟', icon: 'warning', showCancelButton: true, confirmButtonText: 'نعم احذف', cancelButtonText: t('cancel') }).then(function(r) { if (r.isConfirmed) { _supabase.from('companies').delete().eq('id', id).then(function() { Swal.fire(t('success'), 'تم الحذف', 'success'); loadAdminStoreCompanies(); }).catch(handleError); } }); }

function loadAdminStoreProducts() {
  var box = document.getElementById('st-products');
  box.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;"><h4 style="margin:0;">البطاقات (المنتجات)</h4><button class="btn btn-primary" style="margin:0; padding:8px 15px;" onclick="addProductForm()"><i class="fa-solid fa-plus"></i> إضافة بطاقة</button></div><div id="admin-products-list"><p>جاري التحميل...</p></div>`;
  _supabase.from('card_products').select('*, companies(name)').order('created_at', { ascending: false }).then(function(res) {
    var html = '';
    if (res.data && res.data.length > 0) {
      res.data.forEach(function(p) {
        html += `<div class="card" style="padding:12px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;"><div style="display:flex; align-items:center; gap:10px;">${p.image_url ? `<img src="${escHtml(p.image_url)}" style="width:50px; height:30px; object-fit:cover; border-radius:4px;">` : ''}<div><strong>${escHtml(p.name)}</strong><br><small style="color:var(--text-muted);">${p.companies ? escHtml(p.companies.name) : ''} - السعر: ${p.price} - مخزون: ${p.stock || 0}</small></div></div><div style="display:flex; gap:5px;"><button class="btn btn-sm" style="margin:0; background:var(--primary); color:white;" onclick="addCodesForm('${escJs(p.id)}')" title="إضافة أكواد"><i class="fa-solid fa-key"></i></button><button class="btn btn-sm" style="margin:0; background:#f39c12; color:white;" onclick="editProductForm('${escJs(p.id)}')"><i class="fa-solid fa-pen"></i></button><button class="btn btn-sm" style="margin:0; background:#e74c3c; color:white;" onclick="deleteProduct('${escJs(p.id)}')"><i class="fa-solid fa-trash"></i></button></div></div>`;
      });
    } else { html = '<p style="text-align:center;">لا توجد بطاقات.</p>'; }
    document.getElementById('admin-products-list').innerHTML = html;
  }).catch(handleError);
}

function addProductForm() {
  _supabase.from('companies').select('id, name').then(function(compRes) {
    var compOpts = '';
    if (compRes.data) { compRes.data.forEach(function(c) { compOpts += `<option value="${escHtml(c.id)}">${escHtml(c.name)}</option>`; }); }
    if (!compOpts) return Swal.fire('تنبيه', 'يجب إضافة شركة أولاً', 'warning');
    Swal.fire({ title: 'إضافة بطاقة (منتج)', html: `<select id="p-company" class="swal2-input">${compOpts}</select><input id="p-name" class="swal2-input" placeholder="اسم البطاقة / الفئة (مثال: 10 د.ل)"><input id="p-value" class="swal2-input" type="number" placeholder="القيمة الاسمية"><input id="p-price" class="swal2-input" type="number" placeholder="سعر البيع"><select id="p-fulfill" class="swal2-input"><option value="auto_code">تسليم آلي (أكواد)</option><option value="manual">تسليم يدوي</option></select><label style="display:block; text-align:right; font-size:12px; margin-bottom:5px;">صورة البطاقة (اختياري):</label><input id="p-img-file" type="file" accept="image/*" style="width:100%; margin-bottom:10px;">`, confirmButtonText: 'حفظ', showCancelButton: true, cancelButtonText: t('cancel'), preConfirm: function() { var name = document.getElementById('p-name').value.trim(); var price = parseFloat(document.getElementById('p-price').value); if (!name || !price) { Swal.showValidationMessage('الاسم والسعر مطلوبان'); return false; } return { company_id: document.getElementById('p-company').value, name: name, value: parseFloat(document.getElementById('p-value').value) || price, price: price, fulfillment_type: document.getElementById('p-fulfill').value, file: document.getElementById('p-img-file').files[0] }; } }).then(function(r) {
      if (!r.isConfirmed) return;
      Swal.fire({ title: 'جاري الحفظ...', didOpen: function() { Swal.showLoading(); } });
      uploadStoreFile(r.value.file, 'card_images').then(function(url) {
        var data = { company_id: r.value.company_id, name: r.value.name, value: r.value.value, price: r.value.price, fulfillment_type: r.value.fulfillment_type }; if (url) data.image_url = url;
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
      if(compRes.data) { compRes.data.forEach(function(c) { compOpts += `<option value="${escHtml(c.id)}" ${c.id === p.company_id ? 'selected' : ''}>${escHtml(c.name)}</option>`; }); }
      Swal.fire({ title: 'تعديل البطاقة', html: `<select id="p-company" class="swal2-input">${compOpts}</select><input id="p-name" class="swal2-input" placeholder="اسم البطاقة" value="${escHtml(p.name)}"><input id="p-value" class="swal2-input" type="number" placeholder="القيمة الاسمية" value="${p.value}"><input id="p-price" class="swal2-input" type="number" placeholder="سعر البيع" value="${p.price}"><select id="p-fulfill" class="swal2-input"><option value="auto_code" ${p.fulfillment_type==='auto_code'?'selected':''}>تسليم آلي (أكواد)</option><option value="manual" ${p.fulfillment_type==='manual'?'selected':''}>تسليم يدوي</option></select><label style="display:block; text-align:right; font-size:12px; margin-bottom:5px;">تغيير الصورة (اختياري):</label><input id="p-img-file" type="file" accept="image/*" style="width:100%; margin-bottom:10px;">`, confirmButtonText: 'حفظ', showCancelButton: true, cancelButtonText: t('cancel'), preConfirm: function() { var name = document.getElementById('p-name').value.trim(); var price = parseFloat(document.getElementById('p-price').value); if (!name || !price) { Swal.showValidationMessage('الاسم والسعر مطلوبان'); return false; } return { company_id: document.getElementById('p-company').value, name: name, value: parseFloat(document.getElementById('p-value').value) || price, price: price, fulfillment_type: document.getElementById('p-fulfill').value, file: document.getElementById('p-img-file').files[0] }; } }).then(function(r) {
        if (!r.isConfirmed) return;
        Swal.fire({ title: 'جاري الحفظ...', didOpen: function() { Swal.showLoading(); } });
        uploadStoreFile(r.value.file, 'card_images').then(function(url) {
          var data = { company_id: r.value.company_id, name: r.value.name, value: r.value.value, price: r.value.price, fulfillment_type: r.value.fulfillment_type }; if (url) data.image_url = url;
          return _supabase.from('card_products').update(data).eq('id', id);
        }).then(function() { Swal.fire(t('success'), 'تم التعديل', 'success'); loadAdminStoreProducts(); }).catch(handleError);
      });
    });
  });
}

function deleteProduct(id) { Swal.fire({ title: 'حذف الفئة؟', icon: 'warning', showCancelButton: true, confirmButtonText: 'نعم احذف', cancelButtonText: t('cancel') }).then(function(r) { if (r.isConfirmed) { _supabase.from('card_products').delete().eq('id', id).then(function() { Swal.fire(t('success'), 'تم الحذف', 'success'); loadAdminStoreProducts(); }).catch(handleError); } }); }

function loadAdminStoreOrders() {
  document.getElementById('st-orders').innerHTML = '<p>' + t('loading') + '</p>';
  _supabase.from('card_orders').select('*, profiles(full_name), card_order_items(*)').order('created_at', { ascending: false }).limit(50).then(function(res) {
    var html = ''; 
    (res.data || []).forEach(function(o) { 
      var itemsHtml = (o.card_order_items || []).map(function(i) { return '<li>' + escHtml(i.product_name) + ' × ' + i.quantity + ' = ' + i.subtotal + ' ' + t('currency') + '</li>'; }).join(''); 
      html += '<div class="card" style="padding:12px; margin-bottom:10px;"><div style="display:flex; justify-content:space-between; margin-bottom:8px;"><strong>' + escHtml(o.profiles ? o.profiles.full_name : '') + '</strong><span style="color:var(--accent); font-weight:bold;">' + o.total_amount + ' ' + t('currency') + '</span></div><ul style="margin:0; padding-right:20px; font-size:12px;">' + itemsHtml + '</ul><small style="color:var(--text-muted);">' + new Date(o.created_at).toLocaleString('ar-EG') + '</small></div>'; 
    });
    document.getElementById('st-orders').innerHTML = html || '<p>لا توجد طلبات بعد.</p>';
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
  Swal.fire({ title: 'إضافة أكواد', html: '<p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">أدخل الرقم التسلسلي والرقم السري لكل كود في سطر منفصل (مثال: SERIAL123 , PIN123)</p><textarea id="cd-data" class="swal2-textarea" placeholder="مثال:&#10;SERIAL123 , PIN123&#10;SERIAL124 , PIN124" style="min-height:150px; direction:ltr; text-align:left;"></textarea>', confirmButtonText: 'رفع', showCancelButton: true, cancelButtonText: t('cancel'), preConfirm: function() { var raw = document.getElementById('cd-data').value; var lines = raw.split(/\r?\n/).map(function(x) { return x.trim(); }).filter(Boolean); if (!lines.length) { Swal.showValidationMessage('أدخل كوداً واحداً على الأقل'); return false; } return lines; } }).then(function(r) {
    if (!r.isConfirmed) return;
    var rows = r.value.map(function(line) { var parts = line.split(',').map(function(p) { return p.trim(); }); return { product_id: productId, serial_number: parts[0], pin_code: parts[1] || '' }; });
    Swal.fire({ title: 'جاري الرفع...', didOpen: function() { Swal.showLoading(); } });
    _supabase.from('digital_codes').insert(rows).then(function(insRes) { if (insRes.error) throw insRes.error; return _supabase.from('digital_codes').select('*', { count: 'exact', head: true }).eq('product_id', productId).eq('is_used', false).then(function(cntRes) { return _supabase.from('card_products').update({ stock: cntRes.count }).eq('id', productId); }); }).then(function() { Swal.fire(t('success'), 'تم رفع ' + rows.length + ' كود', 'success'); loadAdminStoreProducts(); }).catch(handleError);
  });
}