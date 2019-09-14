const productService = require("./services/productService");
const categoryService = require("./services/categoryService");

module.exports = {
  validateProduct: (context, req) => {
    if (!req.params.productId) {
      context.res = {
        body: { message: "ProductId is required" },
        statusCode: 400
      };
      return;
    }

    const product = productService.get(req.params.productId);
    if (!product) {
      context.res = {
        body: { message: "Product not found" },
        statusCode: 404
      };
      return;
    }

    context.product = product;
  },

  validateCategory: (context, req) => {
    if (!req.params.categoryId) {
      context.res = {
        body: { message: "CategoryId is required" },
        statusCode: 400
      };
      return;
    }

    const category = categoryService.get(req.params.categoryId);
    if (!category) {
      context.res = {
        body: { message: "Category not found" },
        statusCode: 404
      };
      return;
    }

    context.category = category;
  }
};
