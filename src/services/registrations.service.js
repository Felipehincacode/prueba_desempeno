// registrations.service.js
// Servicio para gestionar inscripciones de usuarios a eventos.
// Incluye registrar, obtener inscripciones y validaciones.
import { getSession, getUserId } from "../helpers/auth.helper.js"

const API_URL = "http://localhost:3001"

function getAuthHeaders() {
  const session = getSession()
  return {
    "Content-Type": "application/json",
    ...(session?.token && { Authorization: `Bearer ${session.token}` }),
  }
}

export async function registerForEvent(eventId) {
  try {
    const userId = getUserId()
    if (!userId) {
      throw new Error("Usuario no autenticado")
    }

    // Verificar si ya está registrado
    const existingRegsResponse = await fetch(`${API_URL}/registrations?userId=${userId}&eventId=${eventId}`)
    if (!existingRegsResponse.ok) {
      throw new Error("Error al verificar inscripciones existentes.")
    }
    const existing = await existingRegsResponse.json()

    if (existing.length > 0) {
      throw new Error("Ya estás inscrito en este evento")
    }

    const response = await fetch(`${API_URL}/registrations`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        userId: Number(userId),
        eventId: Number(eventId),
        registrationDate: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error al registrarse en el evento:", errorText)
      throw new Error("No se pudo registrar en el evento.")
    }
    return response.json()
  } catch (error) {
    console.error("Error en registerForEvent:", error)
    throw new Error("Error al inscribirse: " + error.message)
  }
}

export async function getRegistrationsForEvent(eventId) {
  try {
    const response = await fetch(`${API_URL}/registrations?eventId=${eventId}`)
    if (!response.ok) throw new Error("No se pudieron obtener las inscripciones.")
    return response.json()
  } catch (error) {
    console.error("Error en getRegistrationsForEvent:", error)
    throw new Error("Error al obtener inscripciones: " + error.message)
  }
}

export async function getMyRegistrations() {
  try {
    const userId = getUserId()
    if (!userId) {
      return [] // Si no hay usuario, no hay inscripciones
    }

    // Asegurarse de que el ID del usuario sea un número para la consulta
    const response = await fetch(`${API_URL}/registrations?userId=${Number(userId)}&_expand=event`)
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error al obtener mis inscripciones:", errorText)
      throw new Error("No se pudieron obtener tus inscripciones.")
    }
    const registrations = await response.json()

    // Filtrar inscripciones donde el evento no se pudo expandir (event es null/undefined)
    // Esto puede ocurrir si el eventId en registrations no tiene un evento correspondiente en db.json
    return registrations.filter((reg) => reg.event)
  } catch (error) {
    console.error("Error en getMyRegistrations:", error)
    throw new Error("Error al obtener mis inscripciones: " + error.message)
  }
}
