const http = require('http');

const ports = [process.env.PORT || 8080, 3000];

ports.forEach(port => {
  http.createServer((req, res) => {
    res.write(`I'm alive on port ${port}`);
    res.end();
  }).listen(port, () => {
    console.log(`Keep-alive server running on port ${port}`);
  });
});
