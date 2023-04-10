
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define el puerto en el que se ejecutará el servidor
const port = 3000;

// Crea el servidor HTTP
const server = http.createServer((req, res) => {
  // Determina la ruta de archivo solicitada
  let filePath = '.' + req.url;
  if (filePath == './') {
    filePath = './test.html';
  }

  // Obtiene la extensión del archivo
  const extname = String(path.extname(filePath)).toLowerCase();

  // Define los tipos MIME de los archivos
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
  };

  // Define el tipo MIME del archivo solicitado
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Lee el archivo solicitado
  fs.readFile(filePath, function(error, content) {
    if (error) {
      if(error.code == 'ENOENT'){
        // Archivo no encontrado
        fs.readFile('./404.html', function(error, content) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        // Error del servidor
        res.writeHead(500);
        res.end('Error del servidor: '+error.code+' ..\n');
        res.end(); 
      }
    } else {
      // Archivo encontrado
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Inicia el servidor HTTP
server.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});