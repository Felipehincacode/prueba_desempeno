// Router.js
// Implementa un enrutador SPA simple. Gestiona rutas, navegación y guards.
// Renderiza la vista correspondiente según la URL y verifica permisos con guards.

class Router {
  /**
   * Constructor del Router
   * @param {Array} routes - Lista de rutas con path, view y guard opcional
   * Guarda las rutas y referencia al elemento raíz donde se renderizan las vistas.
   * Escucha el evento popstate para manejar navegación con el historial del navegador.
   */
  constructor(routes) {
    this.routes = routes
    this.rootElem = document.getElementById("app")

    // Escucha cambios en el historial del navegador (botones atrás/adelante)
    window.addEventListener("popstate", () => this.resolveRoute())
  }

  /**
   * Navega a una ruta específica y resuelve la vista correspondiente
   * @param {string} path - Ruta a la que se desea navegar
   */
  navigate(path) {
    history.pushState({}, "", path)
    this.resolveRoute()
  }

  /**
   * Resuelve la ruta actual: busca coincidencia, ejecuta guard y renderiza la vista
   * Si la ruta tiene parámetros (ej: /edit/:id), los extrae y los pasa a la vista.
   * Si hay guard, lo ejecuta y actúa según su resultado (true, string de redirección, etc).
   * Si no encuentra la ruta, muestra la página de not-found.
   */
  resolveRoute() {
    const path = window.location.pathname
    // Busca la ruta que coincida con la URL actual
    let route = this.routes.find((r) => {
      const routePathSegments = r.path.split("/").filter(Boolean)
      const currentPathSegments = path.split("/").filter(Boolean)

      // Si el número de segmentos no coincide, descarta la ruta
      if (routePathSegments.length !== currentPathSegments.length) {
        return false
      }

      // Extrae parámetros dinámicos (ej: :id)
      const params = {}
      const match = routePathSegments.every((segment, i) => {
        if (segment.startsWith(":")) {
          params[segment.slice(1)] = currentPathSegments[i]
          return true
        }
        return segment === currentPathSegments[i]
      })

      if (match) {
        r.params = params
      }
      return match
    })

    // Limpia el contenido anterior
    this.rootElem.innerHTML = ""

    if (route) {
      // Si hay guard, lo ejecuta
      const guardResult = route.guard ? route.guard() : true
      if (guardResult === true) {
        // Renderiza la vista correspondiente
        const view = route.view(route.params)
        this.rootElem.appendChild(view)
      } else if (typeof guardResult === "string") {
        // Si el guard retorna una ruta, navega a ella (redirección)
        this.navigate(guardResult)
      }
    } else {
      // Si no se encuentra la ruta, busca la de not-found
      route = this.routes.find((r) => r.path === "/not-found")
      if (route) {
        const view = route.view()
        this.rootElem.appendChild(view)
      }
    }
  }
}

export default Router
