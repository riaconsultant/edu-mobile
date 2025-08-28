// API Endpoints for the mobile app

const BASE_URL = 'http://localhost:3000/api'; // Replace with your actual base URL
// const BASE_URL = 'http://localhost:3000'; 
const LOGIN_API_URL = `http://localhost:3000/user/authenticate`; // Replace with your actual API endpoint

export const ENDPOINTS = {
  PROFILE: `${BASE_URL}/profile`,
  MESSAGES: `${BASE_URL}/messages`,
  GALLERY: `${BASE_URL}/gallery`,
  ANNOUNCEMENTS: `${BASE_URL}/announcement`,
  ATTENDANCE: `${BASE_URL}/attendance`,
  ASSIGNMENTS: `${BASE_URL}/assignments`,
  FEES: `${BASE_URL}/fees`,
  DIARY: `${BASE_URL}/diary`,
  EXAMS: `${BASE_URL}/exams`,
  SUBJECTS: `${BASE_URL}/subjects`,
  NOTIFICATIONS: `${BASE_URL}/notifications`,
  LEAVE: `${BASE_URL}/leave`,
  SETTINGS: `${BASE_URL}/settings`,
  SUPPORT: `${BASE_URL}/support`,
  EVENTS: `${BASE_URL}/events`,
  LIBRARY: `${BASE_URL}/library`,
  TRANSPORT: `${BASE_URL}/transport`,
};
