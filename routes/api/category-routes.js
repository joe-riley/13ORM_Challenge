const router = require('express').Router();
const { Category, Product } = require('../../models');
const { Op } = require ('sequelize');

/** 
* Get all categories
* @param {Request} req - Request object.
* @return {Response.json} All categories collated with all products associated with them.
*/ 
router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
      },
    ],
  }).then(allCategories => {
    res.json(allCategories);
  });
});

/** 
* Get category by id
* @param {Request.param} id - Request object.
* @return {Response.json} A category collated with all products associated with.
*/ 
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: {
        [Op.eq]: req.params.id,
      }
    },
    include: [
      {
        model: Product,
      },
    ]
  }).then(categoryWithProducts => {
    res.json(categoryWithProducts);
  })
});

/** 
* Create a category
* @param {Request.body.json} req - Request object with a json body.
*   ex. { "category_name": your_name }
* @return {Response.json} A json object with the new id and the category_name.
*/ 
router.post('/', (req, res) => {
  const { category_name } = req.body;
  Category.create({
    category_name: category_name,
  }).then(category => {
    res.json(category);
  });
});

/** 
* Update a category name by id
* @name put/api/category/:id
* @param {Request.params} id - Request object with a json body.
* @param {Request.body.json} req - Request object with a json body.
*   ex. { 
*         "id": 7,
*         "category_name": category_name 
*       }
* @return {Response.json} "Successfully updated category name with id ${id} to the ${category_name}".
*/ 
router.put('/:id', (req, res) => {
  const { category_name } = req.body;
  Category.update({
    category_name: category_name,
  },
  {
    where: {
      id: req.params.id,
    }
  }).then(category => {
    res.json(
      {
        "message": `Successfully updated category name with id ${req.params.id} to the ${category_name}`,
      }
    );
  });
});

/** 
* Delete a category
* @param {Request.params} id - Request object with a json body.
* @return {Response.json} "Successfully deleted category with the id ${id}".
*/ 
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    }
  }).then(category => {
    res.json(
      {
        "message": `Successfully deleted category with id ${req.params.id}`,
      }
    );
  });
});

module.exports = router;
