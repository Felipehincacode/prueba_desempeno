// Navbar.js
// Componente de barra de navegación superior. Muestra enlaces según el estado de autenticación y el rol del usuario.
// Si el usuario está autenticado y es administrador, muestra enlaces de administración. Si no, muestra enlaces de login/registro.
// Permite cerrar sesión y actualiza la barra al cambiar el estado de autenticación.
import { isAuthenticated, logout, getUserRole } from "../helpers/auth.helper.js"
import router from "../router/index.js"

export default function Navbar() {
  // Crea el elemento nav
  const nav = document.createElement("nav")
  nav.classList.add("navbar")

  // Función para actualizar los enlaces según el estado de autenticación
  const updateNav = () => {
    const isAuth = isAuthenticated()
    const isAdmin = getUserRole() === "administrator"

    let links = ""
    if (isAuth) {
      // Enlaces para usuarios autenticados
      links = `
        <div>
          <a href="/dashboard" data-link>Dashboard</a>
          ${isAdmin ? `<a href="/dashboard/events/create" data-link>Crear Evento</a>` : ""}
          ${isAdmin ? `<a href="/dashboard/users" data-link>Usuarios</a>` : ""}
        </div>
        <button id="logout-btn">Cerrar Sesión</button>
      `
    } else {
      // Enlaces para usuarios no autenticados
      links = `
        <div>
          <a href="/" data-link>Login</a>
          <a href="/register" data-link>Registro</a>
        </div>
        <div></div>
      `
    }
    nav.innerHTML = links

    // Asigna el evento de logout si corresponde
    if (isAuth) {
      const logoutBtn = nav.querySelector("#logout-btn")
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          logout()
          router.navigate("/")
          document.dispatchEvent(new CustomEvent("authChange"))
        })
      }
    }
  }

  // Escucha cambios de autenticación para actualizar la barra
  document.addEventListener("authChange", updateNav)
  updateNav()

  return nav
}
