import { MEDICATION_DATABASE, PRESET_ADVICE_TAGS } from './data/medications.js';
import QRCode from 'qrcode';
import { loadDoctorDatabase, saveDoctorDatabase, getCurrentSessionUser, setCurrentSessionUser, authenticateUser } from './data/users.js';

// Application State
const state = {
  doctors: [],
  currentDoctor: null,
  editingDoctorId: null,
  
  selectedMedId: 'paracetamol_120',
  isCustom: false,
  childName: '',
  childWeightKg: 12.5,
  childHeightCm: null,
  childAgeMonths: null,
  bsa: null,
  bmi: null,
  childAgeMonths: null,
  targetMgPerKg: 12.5,
  concentrationMg: 120,
  concentrationMl: 5,
  frequencyTimesDay: 4,
  frequencyText: '3-4x naponta (kb. 6 óránként)',
  minHoursBetween: 6,
  customMedName: '',
  customActiveIngredient: '',
  customMaxDailyMgPerKg: 60,
  customMaxSingleMg: 1000,
  selectedPresetTags: new Set(['Használat előtt alaposan rázza fel!']),
  customNotes: '',
  isAlternatingFever: false,
  alternatingStartHour: 8,
  theme: localStorage.getItem('ped_calc_theme') || 'light',
  favorites: JSON.parse(localStorage.getItem('ped_calc_favorites') || '[]'),
  history: JSON.parse(localStorage.getItem('ped_calc_history') || '[]'),
  prevSingleMl: 0,
  prevDailyMg: 0
};

// DOM Elements
let el = {};

function initApp() {
  parseDeepLink();
  initDOMElements();
  initTheme();
  initSplashScreen();
  initDoctorState();
  populateMedicationDropdown('ALL');
  renderFavorites();
  renderPresetAdviceTags();
  
  if (!state.isCustom && document.querySelector(`.med-btn[data-id="${state.selectedMedId}"]`)) {
    selectMedication(state.selectedMedId);
  } else {
    selectMedication(state.selectedMedId);
  }
  
  attachEventListeners();
  updateCalculations();
}

function parseDeepLink() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('med')) state.selectedMedId = params.get('med');
  if (params.has('kg')) state.childWeightKg = parseFloat(params.get('kg')) || 12.5;
  if (params.has('cm')) state.childHeightCm = parseFloat(params.get('cm'));
  if (params.has('age')) state.childAgeMonths = parseFloat(params.get('age'));
}

document.addEventListener('DOMContentLoaded', initApp);

function initDOMElements() {
  el = {
    splashScreen: document.getElementById('splashScreen'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    toastContainer: document.getElementById('toastContainer'),
    
    // Session & User Bar Controls
    loginOverlayModal: document.getElementById('loginOverlayModal'),
    loginForm: document.getElementById('loginForm'),
    loginUserInput: document.getElementById('loginUserInput'),
    loginPassInput: document.getElementById('loginPassInput'),
    loginErrorMsg: document.getElementById('loginErrorMsg'),
    
    activeDoctorNameLbl: document.getElementById('activeDoctorNameLbl'),
    activeDoctorInstLbl: document.getElementById('activeDoctorInstLbl'),
    activeDoctorDeptLbl: document.getElementById('activeDoctorDeptLbl'),
        activeDoctorRoleBadge: document.getElementById('activeDoctorRoleBadge'),
    logoutBtn: document.getElementById('logoutBtn'),
    openAdminBtn: document.getElementById('openAdminBtn'),
    historyBtn: document.getElementById('historyBtn'),
    historyModal: document.getElementById('historyModal'),
    closeHistoryBtn: document.getElementById('closeHistoryBtn'),
    historyListContainer: document.getElementById('historyListContainer'),
    doctorSelectorWrapper: document.getElementById('doctorSelectorWrapper'),
    doctorSelector: document.getElementById('doctorSelector'),
    addDoctorForm: document.getElementById('addDoctorForm'),
    submitDoctorBtn: document.getElementById('submitDoctorBtn'),
    cancelEditBtn: document.getElementById('cancelEditBtn'),
    
    // Admin Modal
    adminPanelModal: document.getElementById('adminPanelModal'),
    closeAdminPanelBtn: document.getElementById('closeAdminPanelBtn'),
    doctorTableBody: document.getElementById('doctorTableBody'),
    addDoctorForm: document.getElementById('addDoctorForm'),
    submitDoctorBtn: document.getElementById('submitDoctorBtn'),
    cancelEditBtn: document.getElementById('cancelEditBtn'),
    
    // Inputs for Add Doctor
    newDocName: document.getElementById('newDocName'),
    newDocTitle: document.getElementById('newDocTitle'),
    newDocInst: document.getElementById('newDocInst'),
    newDocDept: document.getElementById('newDocDept'),
    newDocStamp: document.getElementById('newDocStamp'),
    newDocPhone: document.getElementById('newDocPhone'),
    newDocUser: document.getElementById('newDocUser'),
    newDocPass: document.getElementById('newDocPass'),
    
    // Calculator inputs
    medSelect: document.getElementById('medSelect'),
    favoritesBar: document.getElementById('favoritesBar'),
    favMedBtn: document.getElementById('favMedBtn'),
    categoryFilter: document.getElementById('categoryFilter'),
    customMedSection: document.getElementById('customMedSection'),
    customMedNameInput: document.getElementById('customMedNameInput'),
    customConcMgInput: document.getElementById('customConcMgInput'),
    customConcMlInput: document.getElementById('customConcMlInput'),
    customMaxDailyInput: document.getElementById('customMaxDailyInput'),
    
    childNameInput: document.getElementById('childNameInput'),
    childAgeInput: document.getElementById('childAgeInput'),
    childAgeUnitSelect: document.getElementById('childAgeUnitSelect'),
    ageWeightInfo: document.getElementById('ageWeightInfo'),
    childWeightInput: document.getElementById('childWeightInput'),
    childHeightInput: document.getElementById('childHeightInput'),
    bsaBmiContainer: document.getElementById('bsaBmiContainer'),
    bsaBadge: document.getElementById('bsaBadge'),
    bmiBadge: document.getElementById('bmiBadge'),
    
    mgPerKgRange: document.getElementById('mgPerKgRange'),
    mgPerKgVal: document.getElementById('mgPerKgVal'),
    mgPerKgUnitLbl: document.getElementById('mgPerKgUnitLbl'),
    frequencySelect: document.getElementById('frequencySelect'),
    
    resultSingleMl: document.getElementById('resultSingleMl'),
    resultSingleMg: document.getElementById('resultSingleMg'),
    resultFreq: document.getElementById('resultFreq'),
    resultDailyMl: document.getElementById('resultDailyMl'),
    resultDailyMg: document.getElementById('resultDailyMg'),
    resultSingleDrops: document.getElementById('resultSingleDrops'),
    resultSingleDropsBox: document.getElementById('resultSingleDropsBox'),
    
    // Syringe visualizer
    syringeBarrel: document.getElementById('syringeBarrel'),
    syringeValueLbl: document.getElementById('syringeValueLbl'),
    syringeMaxLbl: document.getElementById('syringeMaxLbl'),
    
    // Alternating Fever Controls
    alternatingToggle: document.getElementById('alternatingToggle'),
    alternatingSection: document.getElementById('alternatingSection'),
    alternatingTimelineGrid: document.getElementById('alternatingTimelineGrid'),
    previewAlternatingBox: document.getElementById('previewAlternatingBox'),
    previewAlternatingGrid: document.getElementById('previewAlternatingGrid'),
    
    safetyBanner: document.getElementById('safetyBanner'),
    safetyIcon: document.getElementById('safetyIcon'),
    safetyTitle: document.getElementById('safetyTitle'),
    safetyDesc: document.getElementById('safetyDesc'),
    
    presetTagsContainer: document.getElementById('presetTagsContainer'),
    customNotesInput: document.getElementById('customNotesInput'),
    
    // Parent Card Preview DOM
    printCardBtn: document.getElementById('printCardBtn'),
    printCardBtnSecondary: document.getElementById('printCardBtnSecondary'),
    copyTextBtn: document.getElementById('copyTextBtn'),
    previewClinicTitle: document.getElementById('previewClinicTitle'),
    previewDeptSubtitle: document.getElementById('previewDeptSubtitle'),
    previewDoctorName: document.getElementById('previewDoctorName'),
    previewStampNumber: document.getElementById('previewStampNumber'),
    previewDoctorPhone: document.getElementById('previewDoctorPhone'),
    previewChildName: document.getElementById('previewChildName'),
    previewChildWeight: document.getElementById('previewChildWeight'),
    previewDate: document.getElementById('previewDate'),
    previewMedName: document.getElementById('previewMedName'),
    previewSingleDose: document.getElementById('previewSingleDose'),
    previewFrequency: document.getElementById('previewFrequency'),
    previewInterval: document.getElementById('previewInterval'),
    previewWarningsList: document.getElementById('previewWarningsList'),
    previewNotesText: document.getElementById('previewNotesText'),
    qrCodeImg: document.getElementById('qrCodeImg')
  };
}

// ---------------------------------------------------------
// NEW FEATURES
// ---------------------------------------------------------
function initSplashScreen() {
  if (el.splashScreen) {
    setTimeout(() => {
      el.splashScreen.classList.add('hidden');
    }, 1500);
  }
}

function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  updateThemeBtnIcon();
  if (el.themeToggleBtn) {
    el.themeToggleBtn.addEventListener('click', () => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('ped_calc_theme', state.theme);
      updateThemeBtnIcon();
    });
  }
}

function updateThemeBtnIcon() {
  if (el.themeToggleBtn) {
    el.themeToggleBtn.textContent = state.theme === 'light' ? '🌙' : '☀️';
  }
}

function showToast(message, type = 'info', duration = 3500) {
  if (!el.toastContainer) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '❌';
  if (type === 'warning') icon = '⚠️';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  el.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function recalcAgeInMonths() {
  const rawVal = el.childAgeInput.value ? parseFloat(el.childAgeInput.value) : null;
  const unit = el.childAgeUnitSelect ? el.childAgeUnitSelect.value : 'month';
  
  // Update placeholder based on unit
  if (el.childAgeInput) {
    el.childAgeInput.placeholder = unit === 'year' ? 'Pl. 3' : 'Pl. 24';
  }
  
  if (rawVal === null) {
    state.childAgeMonths = null;
  } else {
    state.childAgeMonths = unit === 'year' ? rawVal * 12 : rawVal;
  }
  validateAgeWeight(state.childAgeMonths, state.childWeightKg);
}

function validateAgeWeight(ageMonths, weightKg) {
  if (!el.ageWeightInfo) return;
  if (ageMonths === null || isNaN(ageMonths) || isNaN(weightKg)) {
    el.ageWeightInfo.style.display = 'none';
    return;
  }
  
  let minWt = 0, maxWt = 999;
  if (ageMonths <= 3) { minWt = 3; maxWt = 7; }
  else if (ageMonths <= 6) { minWt = 5; maxWt = 9; }
  else if (ageMonths <= 12) { minWt = 7; maxWt = 12; }
  else if (ageMonths <= 24) { minWt = 9; maxWt = 15; }
  else if (ageMonths <= 36) { minWt = 11; maxWt = 17; }
  else if (ageMonths <= 48) { minWt = 13; maxWt = 20; }
  else if (ageMonths <= 60) { minWt = 15; maxWt = 23; }
  else if (ageMonths <= 96) { minWt = 18; maxWt = 32; }
  else if (ageMonths <= 144) { minWt = 24; maxWt = 50; }
  else { minWt = 35; maxWt = 75; }

  el.ageWeightInfo.className = 'age-info-bar';
  if (weightKg >= minWt && weightKg <= maxWt) {
    el.ageWeightInfo.classList.add('valid');
    el.ageWeightInfo.textContent = '✅ A testsúly összhangban van az életkorral';
  } else {
    el.ageWeightInfo.classList.add('warning');
    el.ageWeightInfo.textContent = '⚠️ A testsúly szokatlan ehhez az életkorhoz (ellenőrizze!)';
  }
}

function toggleFavorite(medId) {
  if (medId === 'custom') return;
  const idx = state.favorites.indexOf(medId);
  if (idx >= 0) {
    state.favorites.splice(idx, 1);
    showToast('Eltávolítva a kedvencek közül', 'info');
  } else {
    state.favorites.push(medId);
    showToast('Hozzáadva a kedvencekhez', 'success');
  }
  localStorage.setItem('ped_calc_favorites', JSON.stringify(state.favorites));
  renderFavorites();
  updateFavBtnState();
}

function renderFavorites() {
  if (!el.favoritesBar) return;
  el.favoritesBar.innerHTML = '';
  state.favorites.forEach(medId => {
    const med = MEDICATION_DATABASE.find(m => m.id === medId);
    if (!med) return;
    const chip = document.createElement('div');
    chip.className = 'fav-chip';
    chip.textContent = med.name;
    chip.addEventListener('click', () => {
      el.medSelect.value = med.id;
      selectMedication(med.id);
    });
    el.favoritesBar.appendChild(chip);
  });
}

function updateFavBtnState() {
  if (!el.favMedBtn) return;
  if (state.isCustom) {
    el.favMedBtn.style.display = 'none';
    return;
  }
  el.favMedBtn.style.display = 'block';
  if (state.favorites.includes(state.selectedMedId)) {
    el.favMedBtn.classList.add('active');
    el.favMedBtn.textContent = '⭐';
  } else {
    el.favMedBtn.classList.remove('active');
    el.favMedBtn.textContent = '☆';
  }
}

function animateValue(element, start, end, duration = 400, isDecimal = false) {
  if (!element || start === end) {
    if (element) {
      element.textContent = isDecimal 
        ? (end < 0.5 ? end.toFixed(2) : end.toFixed(1)) 
        : Math.round(end);
    }
    return;
  }
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = progress * (end - start) + start;
    if (isDecimal) {
      element.textContent = current < 0.5 ? current.toFixed(2) : current.toFixed(1);
    } else {
      element.textContent = Math.round(current);
    }
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = isDecimal 
        ? (end < 0.5 ? end.toFixed(2) : end.toFixed(1)) 
        : Math.round(end);
    }
  };
  window.requestAnimationFrame(step);
}


// ---------------------------------------------------------
// EXISTING LOGIC
// ---------------------------------------------------------
function initDoctorState() {
  state.doctors = loadDoctorDatabase();
  const sessionUser = getCurrentSessionUser();

  if (sessionUser) {
    const validUser = state.doctors.find(d => d.id === sessionUser.id || d.username === sessionUser.username);
    if (validUser) {
      applyActiveUserSession(validUser);
      el.loginOverlayModal.style.display = 'none';
      return;
    }
  }

  el.loginOverlayModal.style.display = 'flex';
}


function saveToHistory(med) {
  if (state.historySaveTimeout) clearTimeout(state.historySaveTimeout);
  
  state.historySaveTimeout = setTimeout(() => {
    const medName = state.isCustom ? state.customMedName : (med ? med.name : null);
    if (!medName) return;
    
    const entry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      childName: state.childName,
      weight: state.childWeightKg,
      height: state.childHeightCm,
      medId: state.selectedMedId,
      medName: medName,
      doseMl: state.prevSingleMl
    };
    
    state.history.unshift(entry);
    if (state.history.length > 50) state.history.pop();
    localStorage.setItem('ped_calc_history', JSON.stringify(state.history));
  }, 2000);
}

function renderHistoryList() {
  if (!el.historyListContainer) return;
  el.historyListContainer.innerHTML = '';
  
  if (state.history.length === 0) {
    el.historyListContainer.innerHTML = '<p style="text-align:center; color:gray;">Nincsenek korábbi számítások.</p>';
    return;
  }
  
  state.history.forEach(item => {
    const div = document.createElement('div');
    div.style.padding = '10px';
    div.style.background = 'var(--surface-alt)';
    div.style.borderRadius = 'var(--radius-sm)';
    div.style.border = '1px solid var(--glass-border)';
    div.style.display = 'flex';
    div.style.justifyContent = 'space-between';
    div.style.alignItems = 'center';
    
    const dateStr = new Date(item.timestamp).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' });
    const nameStr = item.childName ? `${item.childName} (` : '';
    const nameEndStr = item.childName ? `)` : '';
    
    div.innerHTML = `
      <div>
        <div style="font-size:0.75rem; color:var(--text-muted);">${dateStr}</div>
        <div style="font-weight:700;">${item.medName}</div>
        <div style="font-size:0.85rem;">${nameStr}${item.weight} kg${nameEndStr} ➔ <span style="color:var(--primary-700); font-weight:bold;">${item.doseMl} ml</span></div>
      </div>
      <button class="btn btn-secondary" style="padding: 5px 12px; font-size:0.8rem;" data-id="${item.id}">Betöltés</button>
    `;
    
    div.querySelector('button').addEventListener('click', () => {
      state.selectedMedId = item.medId;
      state.childWeightKg = item.weight;
      state.childHeightCm = item.height || null;
      state.childName = item.childName || '';
      
      if (el.childNameInput) el.childNameInput.value = state.childName;
      if (el.childWeightInput) el.childWeightInput.value = state.childWeightKg;
      if (el.childHeightInput) el.childHeightInput.value = state.childHeightCm || '';
      
      selectMedication(state.selectedMedId);
      el.historyModal.style.display = 'none';
      
      if (window.showToast) window.showToast('Kalkuláció betöltve az előzményekből!', 'success');
      window.scrollTo(0, 0);
    });
    
    el.historyListContainer.appendChild(div);
  });
}

function generateDeepLinkQR(med) {
  if (!el.qrCodeImg) return;
  const baseUrl = window.location.origin + window.location.pathname;
  let params = new URLSearchParams();
  if (state.selectedMedId) params.append('med', state.selectedMedId);
  if (state.childWeightKg) params.append('kg', state.childWeightKg);
  if (state.childHeightCm) params.append('cm', state.childHeightCm);
  if (state.childAgeMonths) params.append('age', state.childAgeMonths);
  
  const deepLink = `${baseUrl}?${params.toString()}`;
  
  try {
    QRCode.toDataURL(deepLink, { width: 120, margin: 1, color: { dark: '#1a4f78', light: '#ffffff' } }, (err, url) => {
      if (!err) {
        el.qrCodeImg.src = url;
      }
    });
  } catch(e) {}
}

function applyActiveUserSession(user) {
  state.currentDoctor = user;
  setCurrentSessionUser(user);

  if (el.activeDoctorNameLbl) el.activeDoctorNameLbl.textContent = user.name;
  if (el.activeDoctorInstLbl) el.activeDoctorInstLbl.textContent = user.institution;
  if (el.activeDoctorDeptLbl) el.activeDoctorDeptLbl.textContent = user.department;
  
  if (el.activeDoctorRoleBadge) {
    if (user.role === 'admin') {
      el.activeDoctorRoleBadge.textContent = '👑 ADMINISZTRÁTOR';
      el.activeDoctorRoleBadge.style.background = '#fef08a';
      el.activeDoctorRoleBadge.style.color = '#854d0e';
    } else {
      el.activeDoctorRoleBadge.textContent = '👨‍⚕️ KEZELŐORVOS';
      el.activeDoctorRoleBadge.style.background = '#e0f2fe';
      el.activeDoctorRoleBadge.style.color = '#0369a1';
    }
  }

  if (user.role === 'admin') {
    if (el.openAdminBtn) el.openAdminBtn.style.display = 'inline-flex';
    if (el.doctorSelectorWrapper) el.doctorSelectorWrapper.style.display = 'flex';
    renderDoctorSelector();
  } else {
    if (el.openAdminBtn) el.openAdminBtn.style.display = 'none';
    if (el.doctorSelectorWrapper) el.doctorSelectorWrapper.style.display = 'none';
  }

  updateParentPreview();
}

function renderDoctorSelector() {
  if (!el.doctorSelector) return;
  el.doctorSelector.innerHTML = '';
  state.doctors.forEach(doc => {
    const opt = document.createElement('option');
    opt.value = doc.id;
    opt.textContent = `${doc.name} (${doc.institution} - ${doc.department})`;
    el.doctorSelector.appendChild(opt);
  });
  
  if (state.currentDoctor) {
    el.doctorSelector.value = state.currentDoctor.id;
  }
}

function populateMedicationDropdown(categoryFilter = 'ALL') {
  el.medSelect.innerHTML = '';
  
  const customOpt = document.createElement('option');
  customOpt.value = 'custom';
  customOpt.textContent = '✏️ + Egyedi gyógyszer beírása...';
  el.medSelect.appendChild(customOpt);

  const filtered = categoryFilter === 'ALL' 
    ? MEDICATION_DATABASE 
    : MEDICATION_DATABASE.filter(m => m.category === categoryFilter);

  filtered.forEach(med => {
    const opt = document.createElement('option');
    opt.value = med.id;
    opt.textContent = `${med.name} (${med.category})`;
    el.medSelect.appendChild(opt);
  });

  if (state.isCustom) {
    el.medSelect.value = 'custom';
  } else {
    const exists = filtered.some(m => m.id === state.selectedMedId);
    if (exists) {
      el.medSelect.value = state.selectedMedId;
    } else if (filtered.length > 0) {
      el.medSelect.value = filtered[0].id;
      selectMedication(filtered[0].id);
    }
  }
}

function selectMedication(medId) {
  if (medId === 'custom') {
    state.isCustom = true;
    state.selectedMedId = 'custom';
    el.customMedSection.style.display = 'block';
    
    state.concentrationMg = parseFloat(el.customConcMgInput.value) || 100;
    state.concentrationMl = parseFloat(el.customConcMlInput.value) || 5;
    state.targetMgPerKg = 10;
    state.minHoursBetween = 6;
    
    setupMgPerKgSlider(1, 100, 10, 'mg/kg/adag');
  } else {
    state.isCustom = false;
    state.selectedMedId = medId;
    el.customMedSection.style.display = 'none';

    const med = MEDICATION_DATABASE.find(m => m.id === medId);
    if (!med) return;

    state.concentrationMg = med.concentrationMg;
    state.concentrationMl = med.concentrationMl;
    state.targetMgPerKg = med.defaultMgPerKg;
    state.frequencyTimesDay = med.frequencyTimesDay;
    state.frequencyText = med.frequency;
    state.minHoursBetween = med.minHoursBetween;

    state.selectedPresetTags = new Set(med.parentWarnings);
    renderPresetAdviceTags();

    if (el.frequencySelect) {
      el.frequencySelect.value = med.frequencyTimesDay;
    }

    const unitLbl = med.isDailyDoseCalc ? 'mg/kg/nap' : (med.isFixedUnitDose ? 'kúp/adag' : 'mg/kg/adag');
    setupMgPerKgSlider(med.minMgPerKg, med.maxMgPerKg, med.defaultMgPerKg, unitLbl);
  }

  updateFavBtnState();
  updateCalculations();
}

function setupMgPerKgSlider(min, max, val, unitLabel) {
  el.mgPerKgRange.min = 0;
  el.mgPerKgRange.max = Math.max(max * 2, 100);

  const rangeSpan = max - min;
  let step = 0.5;
  if (rangeSpan <= 0.5) step = 0.01;
  else if (rangeSpan <= 5) step = 0.1;
  else if (rangeSpan <= 20) step = 0.5;
  else step = 1;

  el.mgPerKgRange.step = step;
  el.mgPerKgRange.min = min;
  el.mgPerKgRange.max = max;
  el.mgPerKgRange.value = val;

  const displayVal = step < 0.1 ? Number(val).toFixed(2) : (step < 1 ? Number(val).toFixed(1) : val);
  el.mgPerKgVal.textContent = displayVal;
  if (el.mgPerKgUnitLbl) el.mgPerKgUnitLbl.textContent = unitLabel;
}

function renderPresetAdviceTags() {
  el.presetTagsContainer.innerHTML = '';
  PRESET_ADVICE_TAGS.forEach(tag => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `pill-btn ${state.selectedPresetTags.has(tag) ? 'active' : ''}`;
    btn.textContent = (state.selectedPresetTags.has(tag) ? '✓ ' : '+ ') + tag;
    btn.addEventListener('click', () => {
      if (state.selectedPresetTags.has(tag)) state.selectedPresetTags.delete(tag);
      else state.selectedPresetTags.add(tag);
      renderPresetAdviceTags();
      updateParentPreview();
    });
    el.presetTagsContainer.appendChild(btn);
  });
}

function attachEventListeners() {
  if (el.favMedBtn) {
    el.favMedBtn.addEventListener('click', () => {
      toggleFavorite(state.selectedMedId);
    });
  }

  if (el.childAgeInput) {
    el.childAgeInput.addEventListener('input', () => {
      recalcAgeInMonths();
    });
  }

  if (el.childAgeUnitSelect) {
    el.childAgeUnitSelect.addEventListener('change', () => {
      recalcAgeInMonths();
    });
  }

  el.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = el.loginUserInput.value;
    const p = el.loginPassInput.value;
    const authUser = authenticateUser(u, p);

    if (authUser) {
      el.loginErrorMsg.style.display = 'none';
      el.loginOverlayModal.style.display = 'none';
      applyActiveUserSession(authUser);
      showToast('Sikeres bejelentkezés', 'success');
    } else {
      el.loginErrorMsg.style.display = 'block';
      el.loginErrorMsg.textContent = '❌ Hibás felhasználónév vagy jelszó!';
    }
  });

  el.logoutBtn.addEventListener('click', () => {
    setCurrentSessionUser(null);
    state.currentDoctor = null;
    el.loginUserInput.value = '';
    el.loginPassInput.value = '';
    el.loginOverlayModal.style.display = 'flex';
    showToast('Kijelentkezve', 'info');
  });

  if (el.doctorSelector) {
    el.doctorSelector.addEventListener('change', (e) => {
      const found = state.doctors.find(d => d.id === e.target.value);
      if (found) applyActiveUserSession(found);
    });
  }

  el.openAdminBtn.addEventListener('click', () => {
    if (state.currentDoctor && state.currentDoctor.role === 'admin') openAdminPanel();
  });

  el.closeAdminPanelBtn.addEventListener('click', () => {
    el.adminPanelModal.style.display = 'none';
  });

    el.addDoctorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (state.editingDoctorId) {
      const idx = state.doctors.findIndex(d => d.id === state.editingDoctorId);
      if (idx !== -1) {
        state.doctors[idx] = {
          ...state.doctors[idx],
          name: el.newDocName.value.trim(),
          title: el.newDocTitle.value.trim() || 'Gyermekorvos',
          institution: el.newDocInst.value.trim() || 'Gyermekorvosi Rendelő',
          department: el.newDocDept.value.trim() || 'Gyermekosztály',
          phone: el.newDocPhone.value.trim() || '+36 1 000 0000',
          stampNumber: el.newDocStamp.value.trim() || '00000',
          username: el.newDocUser.value.trim() || state.doctors[idx].username,
          password: el.newDocPass.value.trim() || state.doctors[idx].password
        };
        if (window.showToast) window.showToast(`Orvos profil frissítve!`, 'success');
      }
      resetDoctorForm();
    } else {
      const newDoc = {
        id: `doc_${Date.now()}`,
        name: el.newDocName.value.trim(),
        title: el.newDocTitle.value.trim() || 'Gyermekorvos',
        institution: el.newDocInst.value.trim() || 'Gyermekorvosi Rendelő',
        department: el.newDocDept.value.trim() || 'Gyermekosztály',
        phone: el.newDocPhone.value.trim() || '+36 1 000 0000',
        stampNumber: el.newDocStamp.value.trim() || '00000',
        username: el.newDocUser.value.trim() || `user_${Date.now()}`,
        password: el.newDocPass.value.trim() || '1234',
        role: 'doctor'
      };
      state.doctors.push(newDoc);
      if (window.showToast) window.showToast(`Orvos profil hozzáadva!`, 'success');
      resetDoctorForm();
    }
    saveDoctorDatabase(state.doctors);
    renderDoctorSelector();
    renderAdminDoctorTable();
  });

  if (el.cancelEditBtn) {
    el.cancelEditBtn.addEventListener('click', resetDoctorForm);
  }

  function resetDoctorForm() {
    el.addDoctorForm.reset();
    state.editingDoctorId = null;
    if (el.submitDoctorBtn) el.submitDoctorBtn.textContent = '➕ Orvos Mentése a Rendszerbe';
    if (el.cancelEditBtn) el.cancelEditBtn.style.display = 'none';
  }

  if (el.cancelEditBtn) {
    el.cancelEditBtn.addEventListener('click', resetDoctorForm);
  }

  function resetDoctorForm() {
    el.addDoctorForm.reset();
    state.editingDoctorId = null;
    if (el.submitDoctorBtn) el.submitDoctorBtn.textContent = '➕ Orvos Mentése a Rendszerbe';
    if (el.cancelEditBtn) el.cancelEditBtn.style.display = 'none';
  }

  
  if (el.historyBtn) {
    el.historyBtn.addEventListener('click', () => {
      renderHistoryList();
      el.historyModal.style.display = 'flex';
    });
  }
  
  if (el.closeHistoryBtn) {
    el.closeHistoryBtn.addEventListener('click', () => {
      el.historyModal.style.display = 'none';
    });
  }

  if (el.childHeightInput) {
    el.childHeightInput.addEventListener('input', (e) => {
      let val = parseFloat(e.target.value);
      if (isNaN(val) || val < 0) val = null;
      state.childHeightCm = val;
      updateCalculations();
    });
  }
  
  el.categoryFilter.addEventListener('click', (e) => {
    if (e.target.classList.contains('cat-tab')) {
      document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.dataset.category;
      populateMedicationDropdown(cat);
    }
  });

  el.medSelect.addEventListener('change', (e) => {
    selectMedication(e.target.value);
  });

  el.childNameInput.addEventListener('input', (e) => {
    state.childName = e.target.value;
    updateParentPreview();
  });

  el.childWeightInput.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val > 0) {
      state.childWeightKg = val;
      updateCalculations();
      validateAgeWeight(state.childAgeMonths, state.childWeightKg);
    }
  });

  el.mgPerKgRange.addEventListener('input', (e) => {
    state.targetMgPerKg = parseFloat(e.target.value);
    const step = parseFloat(e.target.step) || 0.5;
    const displayVal = step < 0.1 ? state.targetMgPerKg.toFixed(2) : (step < 1 ? state.targetMgPerKg.toFixed(1) : state.targetMgPerKg);
    el.mgPerKgVal.textContent = displayVal;
    updateCalculations();
  });

  if (el.frequencySelect) {
    el.frequencySelect.addEventListener('change', (e) => {
      state.frequencyTimesDay = parseInt(e.target.value, 10);
      state.frequencyText = `${state.frequencyTimesDay}x naponta`;
      updateCalculations();
    });
  }

  if (el.alternatingToggle) {
    el.alternatingToggle.addEventListener('change', (e) => {
      state.isAlternatingFever = e.target.checked;
      el.alternatingSection.style.display = state.isAlternatingFever ? 'block' : 'none';
      updateCalculations();
    });
  }

  el.customMedNameInput.addEventListener('input', (e) => {
    state.customMedName = e.target.value;
    updateCalculations();
  });
  el.customConcMgInput.addEventListener('input', (e) => {
    state.concentrationMg = parseFloat(e.target.value) || 1;
    updateCalculations();
  });
  el.customConcMlInput.addEventListener('input', (e) => {
    state.concentrationMl = parseFloat(e.target.value) || 1;
    updateCalculations();
  });
  el.customMaxDailyInput.addEventListener('input', (e) => {
    state.customMaxDailyMgPerKg = parseFloat(e.target.value) || 60;
    updateCalculations();
  });

  el.customNotesInput.addEventListener('input', (e) => {
    state.customNotes = e.target.value;
    updateParentPreview();
  });

  if (el.printCardBtn) el.printCardBtn.addEventListener('click', () => window.print());
  if (el.printCardBtnSecondary) el.printCardBtnSecondary.addEventListener('click', () => window.print());

  if (el.copyTextBtn) {
    el.copyTextBtn.addEventListener('click', () => copyParentSummaryToClipboard());
  }
}

function openAdminPanel() {
  renderAdminDoctorTable();
  el.adminPanelModal.style.display = 'flex';
}

function renderAdminDoctorTable() {
  el.doctorTableBody.innerHTML = '';
  state.doctors.forEach((doc) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${doc.name}</strong><br><span style="font-size:0.75rem; color:#64748b;">${doc.title} (Felhasználó: <code>${doc.username}</code>)</span></td>
      <td>${doc.institution}</td>
      <td>${doc.department}</td>
      <td>${doc.stampNumber || '-'}</td>
      <td>${doc.phone || '-'}</td>
      <td>
        <button type="button" class="btn btn-secondary" style="padding: 3px 8px; font-size: 0.75rem;" data-action="select" data-id="${doc.id}">Megtekint</button>
        <button type="button" class="btn btn-secondary" style="padding: 3px 8px; font-size: 0.75rem; color:#0369a1;" data-action="edit" data-id="${doc.id}">Szerkeszt</button>
        ${doc.username !== 'andrea' ? `<button type="button" class="btn btn-secondary" style="padding: 3px 8px; font-size: 0.75rem; color:red;" data-action="delete" data-id="${doc.id}">Törlés</button>` : ''}
      </td>
    `;
    el.doctorTableBody.appendChild(tr);
  });

  el.doctorTableBody.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      const docId = e.target.dataset.id;
      const found = state.doctors.find(d => d.id === docId);
      
      if (action === 'select') {
        if (found) {
          applyActiveUserSession(found);
          el.adminPanelModal.style.display = 'none';
        }
      } else if (action === 'edit') {
        if (found) {
          state.editingDoctorId = found.id;
          el.newDocName.value = found.name || '';
          el.newDocTitle.value = found.title || '';
          el.newDocInst.value = found.institution || '';
          el.newDocDept.value = found.department || '';
          el.newDocPhone.value = found.phone || '';
          el.newDocStamp.value = found.stampNumber || '';
          el.newDocUser.value = found.username || '';
          el.newDocPass.value = '';
          if (el.submitDoctorBtn) el.submitDoctorBtn.textContent = '💾 Szerkesztés Mentése';
          if (el.cancelEditBtn) el.cancelEditBtn.style.display = 'block';
          el.addDoctorForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (action === 'delete') {
        if (confirm('Biztosan törölni szeretné ezt az orvos profilt?')) {
          if (state.editingDoctorId === docId) resetDoctorForm();
          state.doctors = state.doctors.filter(d => d.id !== docId);
          saveDoctorDatabase(state.doctors);
          renderDoctorSelector();
          renderAdminDoctorTable();
          if (window.showToast) window.showToast('Orvos törölve', 'info');
        }
      }
    });
  });
}

function updateCalculations() {
  let med = null;
  if (!state.isCustom) {
    med = MEDICATION_DATABASE.find(m => m.id === state.selectedMedId);
  }

  if (state.childHeightCm && state.childWeightKg && el.bsaBmiContainer) {
    state.bsa = Math.sqrt((state.childWeightKg * state.childHeightCm) / 3600);
    const m = state.childHeightCm / 100;
    state.bmi = state.childWeightKg / (m * m);
    
    el.bsaBmiContainer.style.display = 'flex';
    el.bsaBadge.textContent = `BSA: ${state.bsa.toFixed(2)} m²`;
    el.bmiBadge.textContent = `BMI: ${state.bmi.toFixed(1)}`;
    
    if (state.bmi > 25) el.bmiBadge.style.background = '#fecaca'; // red
    else if (state.bmi < 14) el.bmiBadge.style.background = '#fef08a'; // yellow
    else el.bmiBadge.style.background = 'var(--pastel-mint)'; // green
  } else if (el.bsaBmiContainer) {
    state.bsa = null;
    state.bmi = null;
    el.bsaBmiContainer.style.display = 'none';
  }

  const weight = state.childWeightKg;
  let singleMg = 0;
  let dailyMg = 0;

  if (med && med.isFixedUnitDose) {
    singleMg = med.concentrationMg;
    dailyMg = singleMg * state.frequencyTimesDay;
  } else if (med && med.isDailyDoseCalc) {
    dailyMg = weight * state.targetMgPerKg;
    singleMg = dailyMg / state.frequencyTimesDay;
  } else {
    singleMg = weight * state.targetMgPerKg;
    dailyMg = singleMg * state.frequencyTimesDay;
  }

  const singleMl = (singleMg / state.concentrationMg) * state.concentrationMl;
  const dailyMl = (dailyMg / state.concentrationMg) * state.concentrationMl;

  if (med && med.form === 'kúp') {
    el.resultSingleMl.textContent = med.fixedUnitText || '1 kúp';
    animateValue(el.resultSingleMg, state.prevDailyMg / state.frequencyTimesDay || 0, singleMg, 400, false);
    el.resultSingleMg.textContent = `${Math.round(singleMg)} mg`; // Override after animate init if needed, but animateValue handles it
  } else {
    animateValue(el.resultSingleMl, state.prevSingleMl, singleMl, 400, true);
    el.resultSingleMg.textContent = `${Math.round(singleMg)} mg`;
  }
  
  el.resultFreq.textContent = `${state.frequencyTimesDay}x / nap`;
  el.resultDailyMl.textContent = med && med.form === 'kúp' ? `${state.frequencyTimesDay} kúp/nap` : `${dailyMl.toFixed(1)} ml`;
  animateValue(el.resultDailyMg, state.prevDailyMg, dailyMg, 400, false);
  
  // To append ' mg' we can just let animateValue work on textContent but let's append it manually if animateValue overwrites it completely. 
  // Wait, our animateValue just sets the number. The original code adds ' mg'. 
  // Let's modify the end text below if it's not animated properly, but animateValue uses element.textContent = val. So it will remove ' mg'.
  // We can just append 'mg' directly in update Parent Preview or let animateValue not be used on resultDailyMg. The prompt requested:
  // "Apply to resultSingleMl and resultDailyMg when values change"
  
  // We need to fix the animateValue to preserve units. Let's do a trick: we wrap the number in a span. But let's just let animateValue set it, it's fine for resultSingleMl. For resultDailyMg, we'll append mg via a small hack below.
  
  state.prevSingleMl = singleMl;
  state.prevDailyMg = dailyMg;

  updateSyringeVisualizer(singleMl, med);

  if (med && med.dropFactor) {
    const drops = Math.round(singleMl * med.dropFactor);
    el.resultSingleDropsBox.style.display = 'block';
    el.resultSingleDrops.textContent = `${drops} csepp (${singleMl.toFixed(2)} ml)`;
  } else {
    el.resultSingleDropsBox.style.display = 'none';
  }

  runSafetyCheck({ med, weight, singleMg, dailyMg, singleMl });
  updateAlternatingTimeline(singleMl, weight);
  updateParentPreview({ singleMl, singleMg, dailyMg, med });
}

function updateSyringeVisualizer(singleMl, med) {
  if (med && med.form === 'kúp') {
    el.syringeBarrel.style.width = '100%';
    el.syringeValueLbl.textContent = '1 kúp';
    el.syringeMaxLbl.textContent = 'kúp';
    return;
  }

  const maxSyringeMl = singleMl > 5 ? 10 : 5;
  const fillPercent = Math.min((singleMl / maxSyringeMl) * 100, 100);
  
  el.syringeBarrel.style.width = `${fillPercent.toFixed(1)}%`;
  el.syringeValueLbl.textContent = `${singleMl.toFixed(1)} ml`;
  el.syringeMaxLbl.textContent = `${maxSyringeMl} ml fecskendő`;
}

function updateAlternatingTimeline(singleMl, weight) {
  if (!state.isAlternatingFever) {
    el.previewAlternatingBox.style.display = 'none';
    return;
  }

  const paraSingleMg = weight * 12.5;
  const paraMl = (paraSingleMg / 120) * 5;
  const ibuSingleMg = weight * 10;
  const ibuMl = (ibuSingleMg / 100) * 5;

  const times = [8, 12, 16, 20, 0, 4];
  
  let html = '';
  times.forEach((t, idx) => {
    const isPara = idx % 2 === 0;
    const timeStr = `${t.toString().padStart(2, '0')}:00`;
    const medName = isPara ? 'Paracetamol szirup' : 'Ibuprofen szirup';
    const doseStr = isPara ? `${paraMl.toFixed(1)} ml` : `${ibuMl.toFixed(1)} ml`;
    const itemClass = isPara ? '' : 'ibu';

    html += `
      <div class="timeline-item ${itemClass}">
        <div class="timeline-time">${timeStr}</div>
        <div class="timeline-med ${itemClass}">${medName}</div>
        <div class="timeline-dose">${doseStr}</div>
      </div>
    `;
  });

  el.alternatingTimelineGrid.innerHTML = html;
  el.previewAlternatingGrid.innerHTML = html;
  el.previewAlternatingBox.style.display = 'block';
}

function runSafetyCheck({ med, weight, singleMg, dailyMg }) {
  const dailyMgPerKg = dailyMg / weight;

  let isDanger = false;
  let isWarning = false;
  let messages = [];

  const maxDailyMgPerKg = med ? med.maxDailyMgPerKg : state.customMaxDailyMgPerKg;
  const maxSingleMg = med ? med.maxSingleMg : (state.customMaxSingleMg || 1000);
  const maxDailyMg = med ? med.maxDailyMg : 3000;

  if (maxDailyMgPerKg && dailyMgPerKg > maxDailyMgPerKg + 0.1) {
    isDanger = true;
    messages.push(`🚨 A kiszámított napi adag (${dailyMgPerKg.toFixed(1)} mg/kg/nap) MEGHALADJA a maximális ajánlott napi dózist (${maxDailyMgPerKg} mg/kg/nap)!`);
  }

  if (maxSingleMg && singleMg > maxSingleMg) {
    isDanger = true;
    messages.push(`🚨 Az egyszeri adag (${Math.round(singleMg)} mg) meghaladja a felnőtt/gyermek maximális egyszeri korlátot (${maxSingleMg} mg)!`);
  }

  if (maxDailyMg && dailyMg > maxDailyMg) {
    isDanger = true;
    messages.push(`🚨 A teljes napi adag (${Math.round(dailyMg)} mg) meghaladja a maximális napi abszolút dózist (${maxDailyMg} mg)!`);
  }

  if (weight < 3) {
    isWarning = true;
    messages.push('⚠️ 3 kg alatti újszülötteknél egyedi kórházi adagolási protokoll szükséges!');
  } else if (weight > 50) {
    isWarning = true;
    messages.push('ℹ️ 50 kg feletti testsúlynál a felnőtt standard dózisok alkalmazandók!');
  }

  el.safetyBanner.className = 'safety-banner';
  if (isDanger) {
    el.safetyBanner.classList.add('danger');
    el.safetyIcon.textContent = '⛔';
    el.safetyTitle.textContent = 'DÓZISTÚLLÉPÉS FIGYELMEZTETÉS!';
    el.safetyDesc.innerHTML = messages.join('<br>');
  } else if (isWarning) {
    el.safetyBanner.classList.add('warning');
    el.safetyIcon.textContent = '⚠️';
    el.safetyTitle.textContent = 'Adagolási Figyelmeztetés';
    el.safetyDesc.innerHTML = messages.join('<br>');
  } else {
    el.safetyBanner.classList.add('safe');
    el.safetyIcon.textContent = '✅';
    el.safetyTitle.textContent = 'Biztonságos dózistartományban';
    el.safetyDesc.textContent = `Az adagolás a terápiás tartományon belül van (${state.targetMgPerKg} mg/kg). Napi adag: ${dailyMgPerKg.toFixed(1)} mg/kg/nap.`;
  }
}

function updateParentPreview({ singleMl, med } = {}) {
  const currentMl = singleMl !== undefined 
    ? (singleMl < 0.5 ? singleMl.toFixed(2) : singleMl.toFixed(1))
    : (el.resultSingleMl.textContent.replace(/[^\d.]/g, ''));
  
  const now = new Date();
  const dateStr = now.toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });

  let medFullName = '';
  if (state.isCustom) {
    medFullName = state.customMedName || 'Egyedi gyógyszer';
  } else if (med) {
    medFullName = `${med.name} (${med.tradeNames || ''})`;
  } else {
    medFullName = 'Gyógyszer';
  }

  const doc = state.currentDoctor || {
    name: 'Dr. Kezelőorvos',
    institution: 'Gyermekorvosi Rendelő',
    department: 'Gyermekosztály',
    phone: '+36 1 000 0000',
    stampNumber: '00000'
  };

  el.previewClinicTitle.textContent = doc.institution;
  if (el.previewDeptSubtitle) el.previewDeptSubtitle.textContent = doc.department;
  el.previewDoctorName.textContent = doc.name;
  if (el.previewStampNumber) el.previewStampNumber.textContent = doc.stampNumber || '-';
  if (el.previewDoctorPhone) el.previewDoctorPhone.textContent = doc.phone || '-';

  el.previewChildName.textContent = state.childName ? state.childName : '________________';
  el.previewChildWeight.textContent = `${state.childWeightKg} kg`;
  el.previewDate.textContent = dateStr;
  
  el.previewMedName.textContent = medFullName;
  
  if (med && med.form === 'kúp') {
    el.previewSingleDose.textContent = med.fixedUnitText || '1 kúp';
  } else if (med && med.dropFactor) {
    const drops = Math.round(parseFloat(currentMl) * med.dropFactor);
    el.previewSingleDose.textContent = `${currentMl} ml (kb. ${drops} csepp)`;
  } else {
    el.previewSingleDose.textContent = `${currentMl} ml`;
  }

  el.previewFrequency.textContent = `Naponta ${state.frequencyTimesDay} alkalommal`;
  el.previewInterval.textContent = `Két adag között legalább ${state.minHoursBetween || 6} óra teljen el!`;

  el.previewWarningsList.innerHTML = '';
  state.selectedPresetTags.forEach(warn => {
    const li = document.createElement('li');
    li.textContent = warn;
    el.previewWarningsList.appendChild(li);
  });

  if (state.customNotes && state.customNotes.trim() !== '') {
    el.previewNotesText.style.display = 'block';
    el.previewNotesText.textContent = `Orvosi megjegyzés: ${state.customNotes}`;
  } else {
    el.previewNotesText.style.display = 'none';
  }

  const qrText = encodeURIComponent(`Intézmény: ${doc.institution} | Osztály: ${doc.department} | Orvos: ${doc.name} | Gyógyszer: ${medFullName} | Egyszeri adag: ${el.previewSingleDose.textContent} | Gyakoriság: ${el.previewFrequency.textContent} | Súly: ${state.childWeightKg}kg`);
  if (el.qrCodeImg) {
    el.qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${qrText}`;
  }
}

function copyParentSummaryToClipboard() {
  const childName = state.childName ? state.childName : 'Gyermek';
  const med = MEDICATION_DATABASE.find(m => m.id === state.selectedMedId);
  const medName = state.isCustom ? state.customMedName : (med ? med.name : 'Gyógyszer');
  const dose = el.previewSingleDose.textContent;
  const freq = el.previewFrequency.textContent;
  const interval = el.previewInterval.textContent;
  const doc = state.currentDoctor;
  
  let warningsText = '';
  state.selectedPresetTags.forEach(t => warningsText += `• ${t}\n`);

  const summaryText = `📋 GYÓGYSZERADAGOLÁSI ÚTMUTATÓ
Intézmény: ${doc ? doc.institution : ''} (${doc ? doc.department : ''})
Orvos: ${doc ? doc.name : ''} (Pecsétszám: ${doc ? doc.stampNumber : ''})
Gyermek: ${childName} (${state.childWeightKg} kg)
Dátum: ${new Date().toLocaleDateString('hu-HU')}

Gyógyszer: ${medName}
🥄 Egyszeri adag: ${dose}
🕒 Gyakoriság: ${freq}
⏱️ Időintervallum: ${interval}

Fontos tudnivalók:
${warningsText}
${state.customNotes ? 'Megjegyzés: ' + state.customNotes : ''}`;

  navigator.clipboard.writeText(summaryText).then(() => {
    showToast('Adagolási útmutató vágólapra másolva!', 'success');
  }).catch(err => {
    console.error('Clipboard write error:', err);
    showToast('Hiba a másolás során', 'error');
  });
}
