const Product = require('../models/product');
const { getRequestBody } = require('../utils');

// @desc Get all products
// @route GET /api/products
async function getPRoducts(req, res) {
  try {
    const products = await Product.findAll();

    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.error(error);
  }
}

// @desc Get one product by its id
// @route GET /api/products/:id
async function getOneProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'product not found' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.error(error);
  }
}

// @desc Create a product
// @route POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getRequestBody(req);

    // Parse the stringified body to an object
    const { name, description, price } = JSON.parse(body);
    const product = { name, description, price };

    const newProduct = await Product.create(product);

    res.writeHead(201, {
      'Content-Type': 'application/json',
    });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.error(error);
  }
}

// @desc Update a product
// @route PUT /api/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'product not found' }));
    } else {
      const body = await getRequestBody(req);

      // Parse the stringified body to an object
      const { name, description, price } = JSON.parse(body);
      const updatedProduct = {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
      };

      const newProduct = await Product.update(id, updatedProduct);

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      return res.end(JSON.stringify(newProduct));
    }
  } catch (error) {
    console.error(error);
  }
}

// @desc Delete one product by its id
// @route DELETE /api/products/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'product not found' }));
    } else {
      await Product.remove(id);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: `product ${id} removed` }));
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getPRoducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
