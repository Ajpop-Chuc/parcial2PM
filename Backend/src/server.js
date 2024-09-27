const express = require('express');
const productoRoutes = require('./routes/productoRoutes');
require('dotenv').config();
const cors = require('cors');

// Crear una instancia de express
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/productos', productoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
