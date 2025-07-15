// auth.guard.js
// Funciones de protección de rutas (guards) para el router.
// authGuard: Permite acceso solo si el usuario está autenticado.
// adminGuard: Permite acceso solo a administradores.
// publicOnlyGuard: Solo permite acceso si NO está autenticado.
import { isAuthenticated, getUserRole } from "../helpers/auth.helper.js"

export function authGuard() {
  if (isAuthenticated()) {
    return true
  }
  return "/" // Redirige al login si no está autenticado
}

export function adminGuard() {
  if (isAuthenticated() && getUserRole() === "administrator") {
    return true
  }
  // Redirige a not-found para no revelar la existencia de la ruta de admin
  return "/not-found"
}

export function publicOnlyGuard() {
  if (isAuthenticated()) {
    return "/dashboard" // Si ya está logueado, lo manda al dashboard
  }
  return true
}
