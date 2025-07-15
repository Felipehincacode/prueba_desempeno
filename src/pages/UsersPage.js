// UsersPage.js
// Página de gestión de usuarios (solo admin). Permite ver, editar y eliminar usuarios.
// Utiliza Navbar y servicios de usuarios.

import Navbar from "../components/Navbar.js"
import { getUsers, deleteUser } from "../services/users.service.js"
import { getUserId } from "../helpers/auth.helper.js"
import router from "../router/index.js"

export default function UsersPage() {
  const page = document.createElement("div")
  page.appendChild(Navbar())

  const content = document.createElement("div")
  content.classList.add("dashboard-content")
  page.appendChild(content)

  async function loadUsers() {
    try {
      const users = await getUsers()
      const currentUserId = getUserId()

      let usersHtml = `
        <div class="page-header">
          <h2>Gestión de Usuarios</h2>
        </div>
      `

      if (users.length === 0) {
        usersHtml += "<p>No hay usuarios registrados.</p>"
      } else {
        usersHtml += `
          <div class="users-table-container">
            <table class="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
        `

        users.forEach((user) => {
          const isCurrentUser = user.id == currentUserId
          usersHtml += `
            <tr>
              <td>${user.id}</td>
              <td>${user.email}</td>
              <td>
                <span class="role-badge ${user.role === "administrator" ? "admin" : "visitor"}">
                  ${user.role === "administrator" ? "Administrador" : "Visitante"}
                </span>
              </td>
              <td>
                <div class="table-actions">
                  <button class="edit-btn" data-id="${user.id}">Editar</button>
                  ${!isCurrentUser ? `<button class="delete-btn" data-id="${user.id}">Eliminar</button>` : ""}
                </div>
              </td>
            </tr>
          `
        })

        usersHtml += `
              </tbody>
            </table>
          </div>
        `
      }

      content.innerHTML = usersHtml
      addEventListeners()
    } catch (error) {
      content.innerHTML = `<p>Error al cargar usuarios: ${error.message}</p>`
    }
  }

  function addEventListeners() {
    content.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        router.navigate(`/dashboard/users/edit/${e.target.dataset.id}`)
      })
    })

    content.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id
        if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
          try {
            await deleteUser(id)
            loadUsers() // Recargar
          } catch (error) {
            alert("Error al eliminar usuario: " + error.message)
          }
        }
      })
    })
  }

  loadUsers()
  return page
}
