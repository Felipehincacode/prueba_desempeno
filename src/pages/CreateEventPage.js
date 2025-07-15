// CreateEventPage.js
// Página para crear un nuevo evento. Muestra un formulario y llama al servicio para guardar el evento.
// Si la creación es exitosa, redirige al dashboard. Si hay error, muestra alerta.
// Utiliza el componente Navbar y el servicio createEvent.

import Navbar from "../components/Navbar.js"
import { createEvent } from "../services/events.service.js"
import router from "../router/index.js"

export default function CreateEventPage() {
  const page = document.createElement("div")
  page.appendChild(Navbar())

  const formContainer = document.createElement("div")
  formContainer.classList.add("form-container")
  formContainer.innerHTML = `
    <form id="create-event-form" class="event-form">
      <h2>Crear Nuevo Evento</h2>
      <div class="form-group">
        <label for="name">Nombre del Evento:</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div class="form-group">
        <label for="date">Fecha:</label>
        <input type="date" id="date" name="date" required>
      </div>
      <div class="form-group">
        <label for="description">Descripción:</label>
        <textarea id="description" name="description" required></textarea>
      </div>
      <div class="form-group">
        <label for="capacity">Capacidad:</label>
        <input type="number" id="capacity" name="capacity" min="1" required>
      </div>
      <button type="submit">Crear Evento</button>
    </form>
  `

  formContainer.querySelector("#create-event-form").addEventListener("submit", async (e) => {
    e.preventDefault()
    const form = e.target
    const submitBtn = form.querySelector('button[type="submit"]')

    try {
      submitBtn.disabled = true
      submitBtn.textContent = "Creando..."

      const eventData = {
        name: form.name.value,
        date: form.date.value,
        description: form.description.value,
        capacity: Number.parseInt(form.capacity.value, 10),
      }

      await createEvent(eventData)
      alert("Evento creado exitosamente")
      router.navigate("/dashboard")
    } catch (error) {
      alert("Error al crear el evento: " + error.message)
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = "Crear Evento"
    }
  })

  page.appendChild(formContainer)
  return page
}
