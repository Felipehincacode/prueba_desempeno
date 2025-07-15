// DashboardPage.js
// Página principal tras login. Muestra eventos disponibles y, si es visitante, sus inscripciones.
// Los administradores pueden crear, editar y eliminar eventos. Los visitantes pueden inscribirse.
// Utiliza Navbar, servicios de eventos y registros, y helpers de autenticación.

import Navbar from "../components/Navbar.js"
import { getEvents, deleteEvent } from "../services/events.service.js"
import { registerForEvent, getRegistrationsForEvent, getMyRegistrations } from "../services/registrations.service.js"
import { getUserRole, getUserId } from "../helpers/auth.helper.js"
import router from "../router/index.js"

export default function DashboardPage() {
  const page = document.createElement("div")
  page.appendChild(Navbar())

  const content = document.createElement("div")
  content.classList.add("dashboard-content")
  page.appendChild(content)

  const myRegistrationsContainer = document.createElement("div")
  myRegistrationsContainer.id = "my-registrations"
  page.appendChild(myRegistrationsContainer)

  const isAdmin = getUserRole() === "administrator"
  const currentUserId = getUserId()

  async function loadEvents() {
    content.innerHTML = '<p class="loading">Cargando eventos...</p>'
    try {
      const events = await getEvents()
      const allRegistrations = await (await fetch("http://localhost:3001/registrations")).json()
      const myRegistrations = !isAdmin ? await getMyRegistrations() : []

      let eventsHtml = `
        <div class="page-header">
          <h2>Eventos Disponibles</h2>
          ${isAdmin ? '<button id="create-event-btn">Crear Nuevo Evento</button>' : ""}
        </div>
      `

      if (events.length === 0) {
        eventsHtml += "<p>No hay eventos disponibles.</p>"
      } else {
        eventsHtml += '<div class="events-grid">'
        events.forEach((event) => {
          // Calcular inscritos para ESTE evento
          const registeredCount = allRegistrations.filter((reg) => reg.eventId === event.id).length
          const isRegistered = myRegistrations.some((reg) => reg.eventId === event.id && reg.userId == currentUserId)
          const isFull = registeredCount >= event.capacity

          eventsHtml += `
            <div class="event-card">
              <h3>${event.name}</h3>
              <p><strong>Fecha:</strong> ${event.date}</p>
              <p>${event.description}</p>
              <p><strong>Inscritos:</strong> ${registeredCount} / ${event.capacity}</p>
              <div class="visitor-actions">
                ${
                  !isAdmin
                    ? `
                  <button class="register-btn" data-id="${event.id}" data-capacity="${event.capacity}" ${
                    isRegistered || isFull ? "disabled" : ""
                  }>
                    ${isRegistered ? "Inscrito" : isFull ? "Lleno" : "Inscribirme"}
                  </button>
                `
                    : ""
                }
              </div>
              <div class="admin-actions">
                ${
                  isAdmin
                    ? `
                  <button class="edit-btn" data-id="${event.id}">Editar</button>
                  <button class="delete-btn" data-id="${event.id}">Eliminar</button>
                `
                    : ""
                }
              </div>
            </div>
          `
        })
        eventsHtml += "</div>"
      }

      content.innerHTML = eventsHtml
      addEventListeners()
    } catch (error) {
      content.innerHTML = `<p class="alert alert-error">Error al cargar eventos: ${error.message}</p>`
    }
  }

  async function loadMyRegistrations() {
    if (isAdmin) {
      myRegistrationsContainer.innerHTML = ""
      return
    }
    myRegistrationsContainer.innerHTML = '<p class="loading">Cargando mis inscripciones...</p>'
    try {
      const myRegistrations = await getMyRegistrations()
      let myRegsHtml = "<h2>Mis Inscripciones</h2>"
      if (myRegistrations.length === 0) {
        myRegsHtml += "<p>Todavía no te has inscrito a ningún evento.</p>"
      } else {
        myRegsHtml += '<div class="my-regs-grid">'
        myRegistrations.forEach((reg) => {
          if (reg.event) {
            myRegsHtml += `
              <div class="event-card">
                <h3>${reg.event.name}</h3>
                <p><strong>Fecha:</strong> ${reg.event.date}</p>
                <p>${reg.event.description}</p>
              </div>
            `
          }
        })
        myRegsHtml += "</div>"
      }
      myRegistrationsContainer.innerHTML = myRegsHtml
    } catch (error) {
      myRegistrationsContainer.innerHTML = `<p class="alert alert-error">Error al cargar tus inscripciones: ${error.message}</p>`
    }
  }

  function addEventListeners() {
    const createBtn = content.querySelector("#create-event-btn")
    if (createBtn) {
      createBtn.addEventListener("click", () => {
        router.navigate("/dashboard/events/create")
      })
    }

    if (isAdmin) {
      content.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          router.navigate(`/dashboard/events/edit/${e.target.dataset.id}`)
        })
      })

      content.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const id = e.target.dataset.id
          if (confirm("¿Estás seguro de que quieres eliminar este evento?")) {
            try {
              await deleteEvent(id)
              loadEvents()
            } catch (error) {
              alert("Error al eliminar evento: " + error.message)
            }
          }
        })
      })
    } else {
      content.querySelectorAll(".register-btn").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const eventId = e.target.dataset.id
          const capacity = Number.parseInt(e.target.dataset.capacity, 10)

          e.target.disabled = true
          e.target.textContent = "Procesando..."

          try {
            const registrations = await getRegistrationsForEvent(eventId)
            if (registrations.length >= capacity) {
              alert("Lo sentimos, el evento ya está lleno.")
              e.target.textContent = "Lleno"
              return
            }
            await registerForEvent(eventId)
            alert("¡Inscripción exitosa!")
            loadEvents()
            loadMyRegistrations()
          } catch (error) {
            alert("Error al inscribirse: " + error.message)
            e.target.disabled = false
            e.target.textContent = "Inscribirme"
          }
        })
      })
    }
  }

  loadEvents()
  loadMyRegistrations()

  return page
}
