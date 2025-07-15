// index.js (router)
// Define las rutas de la aplicación y sus guards. Exporta una instancia de Router.

import Router from "./Router.js"

// Importar Vistas
import LoginPage from "../pages/LoginPage.js"
import RegisterPage from "../pages/RegisterPage.js"
import DashboardPage from "../pages/DashboardPage.js"
import CreateEventPage from "../pages/CreateEventPage.js"
import EditEventPage from "../pages/EditEventPage.js"
import UsersPage from "../pages/UsersPage.js"
import EditUserPage from "../pages/EditUserPage.js"
import NotFoundPage from "../pages/NotFoundPage.js"

// Importar Guardianes
import { authGuard, adminGuard, publicOnlyGuard } from "../guards/auth.guard.js"

const routes = [
  { path: "/", view: LoginPage, guard: publicOnlyGuard },
  { path: "/register", view: RegisterPage, guard: publicOnlyGuard },
  { path: "/dashboard", view: DashboardPage, guard: authGuard },
  { path: "/dashboard/events/create", view: CreateEventPage, guard: adminGuard },
  { path: "/dashboard/events/edit/:id", view: EditEventPage, guard: adminGuard },
  { path: "/dashboard/users", view: UsersPage, guard: adminGuard },
  { path: "/dashboard/users/edit/:id", view: EditUserPage, guard: adminGuard },
  { path: "/not-found", view: NotFoundPage },
]

const router = new Router(routes)

export default router
