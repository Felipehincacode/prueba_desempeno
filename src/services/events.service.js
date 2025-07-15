// events.service.js
// Servicio para operaciones CRUD de eventos contra la API simulada.
// Incluye obtener, crear, actualizar y eliminar eventos.
import { getSession } from "../helpers/auth.helper.js"

const API_URL = "http://localhost:3001"

function getAuthHeaders() {
  const session = getSession()
  return {
    "Content-Type": "application/json",
    // Agregar headers de autenticación si es necesario
    ...(session?.token && { Authorization: `Bearer ${session.token}` }),
  }
}

export async function getEvents() {
  try {
    const response = await fetch(`${API_URL}/events`)
    if (!response.ok) throw new Error("No se pudieron cargar los eventos.")
    return response.json()
  } catch (error) {
    throw new Error("Error al cargar eventos: " + error.message)
  }
}

export async function getEventById(id) {
  try {
    const response = await fetch(`${API_URL}/events/${id}`)
    if (!response.ok) throw new Error("Evento no encontrado.")
    return response.json()
  } catch (error) {
    throw new Error("Error al cargar evento: " + error.message)
  }
}

export async function createEvent(eventData) {
  try {
    const response = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData),
    })
    if (!response.ok) throw new Error("No se pudo crear el evento.")
    return response.json()
  } catch (error) {
    throw new Error("Error al crear evento: " + error.message)
  }
}

export async function updateEvent(id, eventData) {
  try {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData),
    })
    if (!response.ok) throw new Error("No se pudo actualizar el evento.")
    return response.json()
  } catch (error) {
    throw new Error("Error al actualizar evento: " + error.message)
  }
}

export async function deleteEvent(id) {
  try {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })
    if (!response.ok) throw new Error("No se pudo eliminar el evento.")
    return response.json()
  } catch (error) {
    throw new Error("Error al eliminar evento: " + error.message)
  }
}
