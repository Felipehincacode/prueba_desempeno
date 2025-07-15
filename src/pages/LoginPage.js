// LoginPage.js
// Página de inicio de sesión. Muestra formulario de login y gestiona autenticación.
// Si el login es exitoso, guarda la sesión y redirige al dashboard. Si hay error, muestra alerta.

import { login } from "../services/auth.service.js"
import { saveSession } from "../helpers/auth.helper.js"
import router from "../router/index.js"

export default function LoginPage() {
  const formContainer = document.createElement("div")
  formContainer.classList.add("form-container")

  formContainer.innerHTML = `
    <form id="login-form">
      <h2>Iniciar Sesión</h2>
      <div class="form-group">
        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required>
      </div>
      <button type="submit">Ingresar</button>
      <p>¿No tienes cuenta? <a href="/register" data-link>Regístrate aquí</a></p>
    </form>
  `

  const form = formContainer.querySelector("#login-form")
  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const submitBtn = form.querySelector('button[type="submit"]')

    try {
      submitBtn.disabled = true
      submitBtn.textContent = "Ingresando..."

      const email = form.email.value
      const password = form.password.value

      const sessionData = await login({ email, password })
      saveSession(sessionData)
      document.dispatchEvent(new CustomEvent("authChange"))
      router.navigate("/dashboard")
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message)
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = "Ingresar"
    }
  })

  return formContainer
}
