// auth.helper.js
// Funciones auxiliares para la gestión de sesión y autenticación en localStorage.
// Incluye guardar sesión, obtener usuario, token, rol, etc.
const SESSION_KEY = "app_session"

export function saveSession(data) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(data))
}

export function getSession() {
  const sessionData = localStorage.getItem(SESSION_KEY)
  return sessionData ? JSON.parse(sessionData) : null
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export function isAuthenticated() {
  const session = getSession()
  return !!session && !!session.user
}

export function getUserRole() {
  const session = getSession()
  return session && session.user ? session.user.role : null
}

export function getUserId() {
  const session = getSession()
  return session && session.user ? session.user.id : null
}

export function getAuthToken() {
  const session = getSession()
  return session ? session.token : null
}
