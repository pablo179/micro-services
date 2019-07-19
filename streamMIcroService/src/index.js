const http = require("http"), //Importa el protocolo http desde node
  app = require("./app"), //importar archivo app
  server = http.createServer(app); //crea servidor con protocolo http y archivo app
server.listen(8000, () => console.log("Servidor en el puero 8000")); //levantar servidor
