const express = require("express");
const app = express();
const cors = require("cors");
// Load the MySQL pool connection
const pool = require("./data/config");
var bodyParser = require('body-parser');
//var jsonParser = bodyParser.json();
app.use(cors());
app.use(bodyParser.json());
//app.options('*', cors());

app.get('/client/:clientId', function (req, res) {
  if (!req.params) {
    respuesta = {
      error: true,
      codigo: 502,
      mensaje: 'El campo id no se encuentra'
    };
    res.send(respuesta);
    return;
  } 
  pool.query('SELECT C.id AS Cedula, C.name AS Nombre, C.mail AS Correo, C.addres AS Direccion, C.phone AS Celular, S.id AS AhorroID, S.Cant AS Ahorro, T.id AS TipoID, T.name AS Tipo, AST.id AS CuentaID, AST.name AS Cuenta, CA.name AS Tarjetas FROM Client c INNER JOIN Type T ON C.typeID = T.id INNER JOIN saving S ON C.savingsD = S.id INNER JOIN accountstatus AST ON C.accountStID = AST.id INNER JOIN clientcard CC ON CC.idClient = C.id INNER JOIN card CA ON CC.idCard = CA.id WHERE C.id ="' +req.params.clientId + '"', (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

app.post('/client', (request, response) => {
  pool.query('INSERT INTO client SET ?', request.body, (error, result) => {
      if (error) throw error;
      response.send(result);
  });
});

app.post('/newClient', (request, response) => {
  pool.query('INSERT INTO clientcard SET ?', request.body, (error, result) => {
      if (error) throw error;
      response.send(result);
  });
});

app.put('/client/:id', (request, response) => {
  const id = request.params.id;
  pool.query('UPDATE client SET  ? WHERE id = ?', [request.body, id], (error, result) => {
      if (error) throw error;
      response.send(result);
  });
});

app.delete('/client/:id', (request, response) => {
  const id = request.params.id;
  
  pool.query('DELETE FROM client WHERE id = ?', id, (error, result) => {
      if (error) throw error;

      response.send('User deleted.');
  });
});

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});