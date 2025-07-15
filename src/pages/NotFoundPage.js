// NotFoundPage.js
// Página para rutas no encontradas o sin permiso. Muestra mensaje 404 y enlace al inicio.

export default function NotFoundPage() {
  const page = document.createElement("div")
  page.classList.add("not-found-container")
  page.innerHTML = `
    <h1>404</h1>
    <p>Página no encontrada o no tienes permiso para acceder a ella.</p>
    <a href="/" data-link>Volver al inicio</a>
  `
  return page
}
