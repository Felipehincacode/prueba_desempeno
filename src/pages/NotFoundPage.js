// NotFoundPage.js
// Página para rutas no encontradas o sin permiso. Muestra mensaje 404 y enlace al inicio.

export default function NotFoundPage() {
  const page = document.createElement("div")
  page.classList.add("not-found-container")
  page.innerHTML = `
    <h1>404</h1>
    <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm9nb2s0dHFoN3R0NjU0NW5ucGh3aGJscmJ3d2VxNjlsZXZndGk4eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UkaZpqcieR38c/giphy.gif" alt="Página no encontrada" />
    <p>Página no encontrada o no tienes permiso para acceder a ella.</p>
    <a href="/" data-link>Volver al inicio</a>
  `
  return page
}
