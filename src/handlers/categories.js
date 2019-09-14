const categoryService = require("../services/categoryService");
const { validateCategory } = require("../utils");

module.exports = {
  /**
   * Gets a list of categories
   */
  getCategoryList: async (context) => {
    const categories = categoryService.getList();

    context.res = {
      body: { value: categories },
      statusCode: 200
    };
  },

  /**
   * Gets the metadata for the specified category id
   */
  getCategory: async (context, req) => {
    validateCategory(context, req);
    if (!context.category) {
      return;
    }

    context.res = {
      body: context.category,
      statusCode: 200
    };
  },

  /**
   * Creates a new category
   */
  postCategory: async (context, req) => {
    let category = req.body;

    if (!category) {
      context.res = {
        body: { message: "Category is required" },
        statusCode: 400
      };
      return;
    }

    try {
      delete category.id;
      category = categoryService.save(category);
    } catch (err) {
      context.res = {
        body: { message: err.message },
        statusCode: 409
      };
      return;
    }

    context.res = {
      body: { value: category },
      statusCode: 201
    };
  },

  /**
   * Updates a category with the specified id
   */
  putCategory: async (context, req) => {
    validateCategory(context, req);
    if (!context.category) {
      return;
    }

    const category = context.req.body;
    if (!category) {
      context.res = {
        body: { message: "Category is required" },
        statusCode: 400
      };
      return;
    }

    const updatedCategory = {
      ...context.req.body,
      id: context.req.params.categoryId
    };

    categoryService.save(updatedCategory);

    context.res = {
      body: null,
      statusCode: 204
    };
  },

  /**
   * Merges an update with the category at the specified id
   */
  patchCategory: async (context, req) => {
    validateCategory(context, req);
    if (!context.category) {
      return;
    }

    const udpatedCategory = {
      ...context.category,
      ...context.req.body,
      id: context.req.params.categoryId
    };

    categoryService.save(udpatedCategory);

    context.res = {
      body: null,
      statusCode: 204
    };
  },

  /**
   * Delete a category with the specified id
   */
  deleteCategory: async (context, req) => {
    validateCategory(context, req);
    if (!context.category) {
      return;
    }

    categoryService.remove(context.req.params.categoryId);
    context.res = {
      body: null,
      statusCode: 204
    };
  }
};
