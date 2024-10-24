# Sistema de Gestión de Eventos Locales y Conciertos

Este proyecto es un **Sistema de Gestión de Eventos Locales y Conciertos**, desarrollado con **Node.js**, **Express** y **Sequelize** como ORM para gestionar la base de datos. El sistema permite administrar eventos locales, entradas (tickets), asistentes, organizadores, artistas (performers), historial de eventos y detalles del evento.

## Características

- **Gestión de Eventos Locales:** Crear, leer, actualizar y eliminar eventos.
- **Gestión de Entradas (Tickets):** Crear, leer, actualizar y eliminar entradas generales y VIP.
- **Gestión de Artistas (Performers):** Crear, leer, actualizar y eliminar artistas para eventos.
- **Gestión de Organizadores:** Crear, leer, actualizar y eliminar organizadores de eventos.
- **Gestión de Asistentes:** Crear y gestionar asistentes con sus entradas y eventos a los que asistieron.
- **Historial de Eventos:** Registro de eventos a los que han asistido los usuarios.
- **Detalles del Evento:** Información detallada sobre los artistas, horarios y descripciones de los eventos.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para la creación de APIs y rutas.
- **Sequelize**: ORM para gestionar la base de datos.
- **MySQL**: Base de datos relacional.
- **Postman**: Herramienta utilizada para probar las APIs.

## Instalación

1. Clona este repositorio:

 
   git clone https://github.com/usuario/repositorio.git
Navega a la carpeta del proyecto:


cd nombre-del-proyecto
Instala las dependencias del proyecto:


npm install
Configura la conexión a tu base de datos en el archivo config/config.json con los detalles de tu base de datos MySQL.

Ejecuta las migraciones para crear las tablas necesarias en la base de datos:


npx sequelize-cli db:migrate
Inicia el servidor:

npm start
El servidor estará corriendo en http://localhost:3000.

Endpoints
Tickets
GET /tickets: Obtener todos los tickets.
POST /tickets: Crear un nuevo ticket.
json

{
  "ticket_type": "General",
  "price": 50.00,
  "availability": 100,
  "id_event": 1
}
PUT /tickets/:id: Actualizar un ticket por su ID.
DELETE /tickets/:id: Eliminar un ticket por su ID.
Performers (Artistas)
GET /performers: Obtener todos los performers.
POST /performers: Crear un nuevo performer.
json

{
  "performer_name": "Artista Prueba",
  "genre": "Rock",
  "id_event": 1
}
PUT /performers/:id: Actualizar un performer por su ID.
DELETE /performers/:id: Eliminar un performer por su ID.
Events (Eventos)
GET /events: Obtener todos los eventos.
POST /events: Crear un nuevo evento.
json

{
  "event_name": "Evento de Prueba",
  "event_date": "2024-12-25",
  "location": "Auditorio Prueba",
  "description": "Descripción del evento de prueba",
  "id_organizer": 1
}
PUT /events/:id: Actualizar un evento por su ID.
DELETE /events/:id: Eliminar un evento por su ID.
Organizers (Organizadores)
GET /organizers: Obtener todos los organizadores.
POST /organizers: Crear un nuevo organizador.
json

{
  "organizer_name": "Organizador Prueba",
  "contact_info": "organizador@prueba.com"
}
PUT /organizers/:id: Actualizar un organizador por su ID.
DELETE /organizers/:id: Eliminar un organizador por su ID.
Attendees (Asistentes)
GET /attendees: Obtener todos los asistentes.
POST /attendees: Crear un nuevo asistente.
json

{
  "attendee_name": "Asistente Prueba",
  "email": "asistente@prueba.com",
  "id_ticket": 1
}
PUT /attendees/:id: Actualizar un asistente por su ID.
DELETE /attendees/:id: Eliminar un asistente por su ID.
Event History (Historial de Eventos)
GET /event-history: Obtener el historial de eventos.
POST /event-history: Crear un nuevo historial de evento.
json

{
  "attended_date": "2024-12-25",
  "id_attendee": 1,
  "id_event": 1,
  "id_ticket": 1
}
PUT /event-history/:id: Actualizar un historial por su ID.
DELETE /event-history/:id: Eliminar un historial por su ID.
Event Details (Detalles del Evento)
GET /event-details: Obtener todos los detalles de los eventos.
POST /event-details: Crear un nuevo detalle de evento.
json

{
  "schedule": "18:00:00",
  "description": "Descripción del evento de prueba",
  "id_event": 1,
  "id_performer": 1
}
PUT /event-details/:id: Actualizar un detalle de evento por su ID.
DELETE /event-details/:id: Eliminar un detalle de evento por su ID.
Base de Datos
El sistema utiliza MySQL como base de datos relacional. Asegúrate de configurar correctamente tu conexión a la base de datos en el archivo config/config.json antes de ejecutar las migraciones.

Tablas Principales
localevents: Gestión de eventos locales.
localtickets: Gestión de entradas (tickets) para eventos.
localperformers: Gestión de artistas que participan en los eventos.
localorganizers: Gestión de organizadores de eventos.
attendees: Gestión de asistentes a los eventos.
eventhistories: Historial de eventos a los que asistieron los usuarios.
eventdetails: Descripción y detalles de los eventos, como horario y artistas.
Contribución
Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

Crea un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y haz un commit (git commit -m 'Agregar nueva funcionalidad').
Envía tus cambios (git push origin feature/nueva-funcionalidad).
Crea un Pull Request.

### Explicación del contenido:

- **Descripción general** del sistema y sus características.
- **Instrucciones de instalación y configuración** para que los usuarios puedan ejecutar el proyecto localmente.
- **Listado de endpoints** que ya tienes configurados, junto con ejemplos de solicitudes **POST** en formato JSON.
- **Detalles sobre la base de datos** y las tablas principales utilizadas en el sistema.
- **Instrucciones para contribuir** y la licencia del proyecto.
