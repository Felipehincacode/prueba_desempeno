// RegisterPage.js
// Página de registro de usuario. Muestra formulario y llama al servicio para registrar.
// Si el registro es exitoso, redirige al login. Si hay error, muestra alerta.

import { register } from "../services/auth.service.js"
import router from "../router/index.js"

export default function RegisterPage() {
  const formContainer = document.createElement("div")
  formContainer.classList.add("form-container")

  formContainer.innerHTML = `
    <form id="register-form">
      <h2>Registro</h2>
      <div class="form-group">
        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" minlength="6" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirmar Contraseña:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" minlength="6" required>
      </div>
      <button type="submit">Registrarse</button>
      <p>¿Ya tienes cuenta? <a href="/" data-link>Inicia sesión</a></p>
    </form>
  `

  const form = formContainer.querySelector("#register-form")
  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const submitBtn = form.querySelector('button[type="submit"]')

    try {
      const email = form.email.value
      const password = form.password.value
      const confirmPassword = form.confirmPassword.value

      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden")
        return
      }

      submitBtn.disabled = true
      submitBtn.textContent = "Registrando..."

      await register({ email, password, role: "visitor" })
      alert("Registro exitoso. Ahora puedes iniciar sesión.")
      router.navigate("/")
    } catch (error) {
      alert("Error en el registro: " + error.message)
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = "Registrarse"
    }
  })

  return formContainer
}
