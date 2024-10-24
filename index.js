const express = require('express');
const { sequelize } = require('./models'); // Importa la conexión a la base de datos

// Importa las rutas individuales
const eventDetailsRoutes = require('./routes/eventDetails');
const attendeesRoutes = require('./routes/attendees');
const eventHistoryRoutes = require('./routes/eventHistory');
const localEventRoutes = require('./routes/localEvents');
const localOrganizerRoutes = require('./routes/localOrganizers');
const localPerformerRoutes = require('./routes/localPerformers');
const localTicketRoutes = require('./routes/localTickets');

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para parsear JSON

// Probar la conexión con la base de datos
sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa.'))
  .catch((error) => console.error('No se pudo conectar a la base de datos:', error));

// Usar rutas separadas para cada recurso
app.use('/event-details', eventDetailsRoutes);
app.use('/attendees', attendeesRoutes);
app.use('/event-history', eventHistoryRoutes);
app.use('/events', localEventRoutes);
app.use('/organizers', localOrganizerRoutes);
app.use('/performers', localPerformerRoutes);
app.use('/tickets', localTicketRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
