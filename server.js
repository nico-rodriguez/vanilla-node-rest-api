const http = require('http');
const productController = require('./controllers/product');

const httpServer = http.createServer((req, res) => {
  if (req.url === '/api/products' && req.method === 'GET') {
    productController.getPRoducts(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === 'GET'
  ) {
    const id = req.url.split('/')[3];
    productController.getOneProduct(req, res, id);
  } else if (req.url === '/api/products' && req.method === 'POST') {
    productController.createProduct(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === 'PUT'
  ) {
    const id = req.url.split('/')[3];
    productController.updateProduct(req, res, id);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.split('/')[3];
    productController.deleteProduct(req, res, id);
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ message: 'route not found' }));
  }
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
