// EditUserPage.js
// Página para editar un usuario existente. Permite cambiar email, rol y contraseña.
// Si la actualización es exitosa, redirige a la gestión de usuarios. Si hay error, muestra alerta.
// Utiliza Navbar y servicios de usuarios.

import Navbar from "../components/Navbar.js"
import { getUserById, updateUser } from "../services/users.service.js"
import router from "../router/index.js"

export default function EditUserPage(params) {
  const userId = params.id
  const page = document.createElement("div")
  page.appendChild(Navbar())

  const formContainer = document.createElement("div")
  formContainer.classList.add("form-container")
  formContainer.innerHTML = `<h2>Cargando datos del usuario...</h2>`
  page.appendChild(formContainer)

  async function loadUserData() {
    try {
      const user = await getUserById(userId)
      formContainer.innerHTML = `
        <form id="edit-user-form" class="user-form">
          <h2>Editar Usuario</h2>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="${user.email}" required>
          </div>
          <div class="form-group">
            <label for="role">Rol:</label>
            <select id="role" name="role" required>
              <option value="visitor" ${user.role === "visitor" ? "selected" : ""}>Visitante</option>
              <option value="administrator" ${user.role === "administrator" ? "selected" : ""}>Administrador</option>
            </select>
          </div>
          <div class="form-group">
            <label for="password">Nueva Contraseña (opcional):</label>
            <input type="password" id="password" name="password" minlength="6">
            <small>Deja en blanco para mantener la contraseña actual</small>
          </div>
          <button type="submit">Actualizar Usuario</button>
        </form>
      `

      formContainer.querySelector("#edit-user-form").addEventListener("submit", async (e) => {
        e.preventDefault()
        const form = e.target
        const submitBtn = form.querySelector('button[type="submit"]')

        try {
          submitBtn.disabled = true
          submitBtn.textContent = "Actualizando..."

          const updatedData = {
            email: form.email.value,
            role: form.role.value,
          }

          // Solo incluir password si se proporcionó uno nuevo
          if (form.password.value.trim()) {
            updatedData.password = form.password.value
          } else {
            updatedData.password = user.password // Mantener la contraseña actual
          }

          await updateUser(userId, updatedData)
          alert("Usuario actualizado exitosamente")
          router.navigate("/dashboard/users")
        } catch (error) {
          alert("Error al actualizar el usuario: " + error.message)
        } finally {
          submitBtn.disabled = false
          submitBtn.textContent = "Actualizar Usuario"
        }
      })
    } catch (error) {
      formContainer.innerHTML = `<p>Error al cargar el usuario: ${error.message}</p>`
    }
  }

  loadUserData()
  return page
}
