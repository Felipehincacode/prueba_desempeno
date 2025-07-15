// EditEventPage.js
// Página para editar un evento existente. Carga los datos y permite modificarlos.
// Si la actualización es exitosa, redirige al dashboard. Si hay error, muestra alerta.
// Utiliza Navbar y servicios de eventos.

import Navbar from "../components/Navbar.js"
import { getEventById, updateEvent } from "../services/events.service.js"
import router from "../router/index.js"

export default function EditEventPage(params) {
  const eventId = params.id
  const page = document.createElement("div")
  page.appendChild(Navbar())

  const formContainer = document.createElement("div")
  formContainer.classList.add("form-container")
  formContainer.innerHTML = `<h2>Cargando datos del evento...</h2>`
  page.appendChild(formContainer)

  async function loadEventData() {
    try {
      const event = await getEventById(eventId)
      formContainer.innerHTML = `
        <form id="edit-event-form" class="event-form">
          <h2>Editar Evento</h2>
          <div class="form-group">
            <label for="name">Nombre del Evento:</label>
            <input type="text" id="name" name="name" value="${event.name}" required>
          </div>
          <div class="form-group">
            <label for="date">Fecha:</label>
            <input type="date" id="date" name="date" value="${event.date}" required>
          </div>
          <div class="form-group">
            <label for="description">Descripción:</label>
            <textarea id="description" name="description" required>${event.description}</textarea>
          </div>
          <div class="form-group">
            <label for="capacity">Capacidad:</label>
            <input type="number" id="capacity" name="capacity" value="${event.capacity}" min="1" required>
          </div>
          <button type="submit">Actualizar Evento</button>
        </form>
      `

      formContainer.querySelector("#edit-event-form").addEventListener("submit", async (e) => {
        e.preventDefault()
        const form = e.target
        const submitBtn = form.querySelector('button[type="submit"]')

        try {
          submitBtn.disabled = true
          submitBtn.textContent = "Actualizando..."

          const updatedData = {
            name: form.name.value,
            date: form.date.value,
            description: form.description.value,
            capacity: Number.parseInt(form.capacity.value, 10),
          }

          await updateEvent(eventId, updatedData)
          alert("Evento actualizado exitosamente")
          router.navigate("/dashboard")
        } catch (error) {
          alert("Error al actualizar el evento: " + error.message)
        } finally {
          submitBtn.disabled = false
          submitBtn.textContent = "Actualizar Evento"
        }
      })
    } catch (error) {
      formContainer.innerHTML = `<p>Error al cargar el evento: ${error.message}</p>`
    }
  }

  loadEventData()
  return page
}
