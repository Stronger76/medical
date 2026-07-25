// Multi-User & Admin Database Module with Strict Isolation

export const INITIAL_DOCTORS = [
  {
    id: 'doc_andrea',
    username: 'andrea',
    password: 'szigyarto',
    name: 'Dr. Szigyártó Andrea',
    title: 'Gyermekgyógyász Főorvos',
    institution: 'Semmelweis Egyetem Gyermekgyógyászati Klinika',
    department: 'Csecsemő- és Gyermekosztály',
    phone: '+36 1 459 1500',
    stampNumber: '64821',
    role: 'admin'
  },
  {
    id: 'doc_kovacs',
    username: 'marta',
    password: '1234',
    name: 'Dr. Kovács Márta',
    title: 'Házi Gyermekorvos',
    institution: 'Napraforgó Gyermekorvosi Rendelő',
    department: 'I. sz. Gyermekszakrendelő',
    phone: '+36 1 234 5678',
    stampNumber: '51294',
    role: 'doctor'
  }
];

export function loadDoctorDatabase() {
  const saved = localStorage.getItem('ped_calc_doctors_db');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing doctors DB:', e);
    }
  }
  localStorage.setItem('ped_calc_doctors_db', JSON.stringify(INITIAL_DOCTORS));
  return INITIAL_DOCTORS;
}

export function saveDoctorDatabase(doctors) {
  localStorage.setItem('ped_calc_doctors_db', JSON.stringify(doctors));
}

export function getCurrentSessionUser() {
  const savedSession = localStorage.getItem('ped_calc_active_session');
  if (savedSession) {
    try {
      return JSON.parse(savedSession);
    } catch (e) {
      console.error('Error parsing session user:', e);
    }
  }
  return null;
}

export function setCurrentSessionUser(user) {
  if (user) {
    localStorage.setItem('ped_calc_active_session', JSON.stringify(user));
  } else {
    localStorage.removeItem('ped_calc_active_session');
  }
}

export function authenticateUser(username, password) {
  const db = loadDoctorDatabase();
  const found = db.find(u => u.username.toLowerCase() === username.toLowerCase().trim() && u.password === password.trim());
  return found || null;
}
