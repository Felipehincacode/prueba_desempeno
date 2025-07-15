// Script para verificar que el servidor esté funcionando
async function checkServer() {
  try {
    console.log("Verificando servidor en http://localhost:3001...")

    const response = await fetch("http://localhost:3001/users")

    if (response.ok) {
      const data = await response.json()
      console.log("✅ Servidor funcionando correctamente")
      console.log("Usuarios encontrados:", data.length)
    } else {
      console.log("❌ Servidor responde pero con error:", response.status)
    }
  } catch (error) {
    console.log("❌ No se puede conectar al servidor:", error.message)
    console.log("Asegúrate de ejecutar: npm run server-only")
  }
}

checkServer()
