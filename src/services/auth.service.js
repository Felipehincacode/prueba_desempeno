// auth.service.js
// Servicio de autenticación: login y registro de usuarios contra la API simulada.
// login: Busca usuario por email y password, retorna datos de sesión simulados.
// register: Crea un nuevo usuario si el email no existe.
const API_URL = "http://localhost:3001"

export async function login(credentials) {
  try {
    // Obtener todos los usuarios
    const response = await fetch(`${API_URL}/users`)
    if (!response.ok) {
      throw new Error("No se puede conectar al servidor")
    }

    const users = await response.json()
    const user = users.find((u) => u.email === credentials.email && u.password === credentials.password)

    if (!user) {
      throw new Error("Las credenciales son incorrectas.")
    }

    // Simular token de autenticación
    const sessionData = {
      user: user,
      token: `token-${user.id}-${Date.now()}`,
      timestamp: Date.now(),
    }

    return sessionData
  } catch (error) {
    throw new Error(error.message || "Error de conexión")
  }
}

export async function register(userData) {
  try {
    // Verificar si el email ya existe
    const usersResponse = await fetch(`${API_URL}/users`)
    if (!usersResponse.ok) {
      throw new Error("No se puede conectar al servidor")
    }

    const users = await usersResponse.json()
    const existingUser = users.find((u) => u.email === userData.email)

    if (existingUser) {
      throw new Error("El correo electrónico ya está en uso.")
    }

    // Crear nuevo usuario
    const newUser = {
      ...userData,
      id: Date.now(), // ID simple basado en timestamp
    }

    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })

    if (!response.ok) {
      throw new Error("Error al crear el usuario")
    }

    return response.json()
  } catch (error) {
    throw new Error(error.message || "Error en el registro")
  }
}
