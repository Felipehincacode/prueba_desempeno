import router from "./router/index.js"

// Función para manejar los clics en los enlaces de la SPA
function handleNavigation(event) {
  const anchor = event.target.closest("a")

  if (!anchor || !anchor.matches("[data-link]")) {
    return
  }

  event.preventDefault()
  router.navigate(anchor.pathname)
}

// Escuchar todos los clics en el documento para delegación de eventos
document.addEventListener("click", handleNavigation)

// Resolver la ruta inicial cuando el DOM está cargado
document.addEventListener("DOMContentLoaded", () => {
  router.resolveRoute()
})

// Manejar navegación del navegador (botones atrás/adelante)
window.addEventListener("popstate", () => {
  router.resolveRoute()
})
