const productService = require("../services/productService");
const { validateProduct, validateCategory } = require("../utils");

module.exports = {
  /**
   * Gets a list of products
   */
  getProductList: async (context) => {
    const products = productService.getList();

    context.res = {
      body: { values: products },
      statusCode: 200
    };
  },

  /**
   * Get a list of products filtered by category
   */
  getProductListByCategory: async (context, req) => {
    validateCategory(context, req);
    if (!context.category) {
      return;
    }

    const products = productService.getList().filter((product) => product.categoryId === context.category.id);

    context.res = {
      body: { value: products },
      statusCode: 200
    };
  },

  /**
   * Gets the metadata for the specified product id
   */
  getProduct: async (context, req) => {
    validateProduct(context, req);
    if (!context.product) {
      return;
    }

    context.res = {
      body: { value: context.product },
      statusCode: 200
    };
  },

  /**
   * Creates a new product
   */
  postProduct: async (context, req) => {
    let product = req.body;

    if (!product) {
      context.res = {
        body: { message: "Product is required" },
        statusCode: 400
      };
      return;
    }

    try {
      delete product.id;
      product = productService.save(product);
    } catch (err) {
      context.res = {
        body: { message: err.message },
        statusCode: 409
      };

      return;
    }

    context.res = {
      body: { value: product },
      statusCode: 201
    };
  },

  /**
   * Updates a product with the specified id
   */
  putProduct: async (context, req) => {
    validateProduct(context, req);
    if (!context.product) {
      return;
    }

    const product = req.body;
    if (!product) {
      context.res = {
        body: { message: "Product is required" },
        statusCode: 400
      };
      return;
    }

    const updatedProduct = {
      ...req.body,
      id: req.params.productId
    };

    productService.save(updatedProduct);

    context.res = {
      body: null,
      statusCode: 204
    };
  },

  /**
   * Merges an update with the product at the specified id
   */
  patchProduct: async (context, req) => {
    validateProduct(context, req);
    if (!context.product) {
      return;
    }

    const udpatedProduct = {
      ...context.product,
      ...req.body,
      id: req.params.productId
    };

    productService.save(udpatedProduct);

    context.res = {
      body: null,
      statusCode: 204
    };
  },

  /**
   * Delete a product with the specified id
   */
  deleteProduct: async (context, req) => {
    validateProduct(context, req);
    if (!context.product) {
      return;
    }

    productService.remove(req.params.productId);

    context.res = {
      body: null,
      statusCode: 204
    };
  }
};
