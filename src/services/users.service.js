// users.service.js
// Servicio para operaciones CRUD de usuarios contra la API simulada.
// Incluye obtener, actualizar y eliminar usuarios.
import { getSession } from "../helpers/auth.helper.js"

const API_URL = "http://localhost:3001"

function getAuthHeaders() {
  const session = getSession()
  return {
    "Content-Type": "application/json",
    ...(session?.token && { Authorization: `Bearer ${session.token}` }),
  }
}

export async function getUsers() {
  try {
    const response = await fetch(`${API_URL}/users`)
    if (!response.ok) throw new Error("No se pudieron cargar los usuarios.")
    return response.json()
  } catch (error) {
    throw new Error("Error al cargar usuarios: " + error.message)
  }
}

export async function getUserById(id) {
  try {
    const response = await fetch(`${API_URL}/users/${id}`)
    if (!response.ok) throw new Error("Usuario no encontrado.")
    return response.json()
  } catch (error) {
    throw new Error("Error al cargar usuario: " + error.message)
  }
}

export async function updateUser(id, userData) {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    })
    if (!response.ok) throw new Error("No se pudo actualizar el usuario.")
    return response.json()
  } catch (error) {
    throw new Error("Error al actualizar usuario: " + error.message)
  }
}

export async function deleteUser(id) {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })
    if (!response.ok) throw new Error("No se pudo eliminar el usuario.")
    return response.json()
  } catch (error) {
    throw new Error("Error al eliminar usuario: " + error.message)
  }
}
