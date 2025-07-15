# Gestor de Eventos - SPA con Vanilla JS


Felipe Hincapié Murillo
clan lovelace
correo: fotopipets@gmail.com
CC: 1020493388

Una aplicación de página única (SPA) para la gestión de eventos, construida desde cero con HTML, CSS y JavaScript puro, sin frameworks de UI.

## Descripción del Proyecto

Este proyecto implementa una aplicación web completa para la gestión de eventos. Incluye un sistema de autenticación con dos roles (administrador y visitante), persistencia de sesión, un enrutador del lado del cliente con rutas protegidas y operaciones CRUD completas para los eventos.

## Stack Tecnológico

• **Frontend**: HTML5, CSS3, JavaScript (ESM)= modular
• **Entorno de Desarrollo**: Vite
• **API Mock/Simulada**: json-server

## Características

• **Sistema de Autenticación**: Registro y Login de usuarios.
• **Roles de Usuario**:
  ○ Administrador: Puede crear, leer, actualizar y eliminar eventos.
  ○ Visitante: Puede ver eventos e inscribirse en ellos.
• **Enrutamiento del Cliente**: Navegación fluida sin recargas de página, implementado con la History API.
• **Rutas Protegidas**: Guardianes de ruta para restringir el acceso según el rol y el estado de autenticación.
• **Persistencia de Sesión**: La sesión del usuario se mantiene activa entre recargas gracias a localStorage.
• **Interfaz Responsiva**: Diseño adaptable a diferentes tamaños de pantalla.

## Instalación

Para levantar este proyecto localmente, sigue estos pasos:

1. **Clona el repositorio:**
\`\`\`bash
git clone https://github.com/Felipehincacode/prueba_desempeno.git
cd prueba_desempeno
\`\`\`

2. **Instala las dependencias:**
\`\`\`bash
npm install
\`\`\`

## Uso

Una vez instaladas las dependencias, puedes iniciar el entorno de desarrollo completo con un solo comando:

\`\`\`bash
npm start
\`\`\`

Este comando levantará dos servidores simultáneamente:
• **Servidor de desarrollo Vite (Frontend)**: Accesible en http://localhost:5173
• **Servidor de API JSON-Server (Backend)**: Accesible en http://localhost:3001

### Credenciales por defecto:

**Administrador:**
• Email: admin@example.com
• Contraseña: password123

**Usuario Visitante:**
• Email: user@example.com
• Contraseña: password456




## Funcionalidades

### Para Administradores:
- Crear nuevos eventos
- Editar eventos existentes
- Eliminar eventos
- Ver lista de todos los eventos

### Para Visitantes:
- Ver eventos disponibles
- Inscribirse a eventos
- Ver mis inscripciones

## Información del Desarrollador

• **Nombre**: Felipe Hincapie Murillo
• **Proyecto**: CRUD para eventos
• **Tecnologías**: JavaScript Vanilla, CSS, HTML
• **Licencia**: MIT

## Scripts Disponibles

- \`npm start\`: Inicia ambos servidores (frontend y backend)
- \`npm run dev\`: Solo servidor de desarrollo (Vite)
- \`npm run api\`: Solo servidor de API (json-server)

## Notas Técnicas

- La aplicación usa localStorage para persistir la sesión del usuario
- El enrutamiento se maneja completamente del lado del cliente
- La autenticación es simulada usando json-server
- Todos los datos se almacenan en db.json
