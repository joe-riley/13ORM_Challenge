const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { Op } = require('sequelize');


router.get('/', async (req, res) => {
  const allTags = await Tag.findAll({
    include: {
      model: Product,
    },
  });
  res.json(allTags);
});

router.get('/:id', async (req, res) => {
  const tag = await Tag.findOne({
    where: {
      id: {
        [Op.eq]: req.params.id,
      }
    },
    include: {
      model: Product,
    }
  })
  res.json(tag);
});

router.post('/', async (req, res) => {
  const newTag = await Tag.create({
    tag_name: req.body.tag_name,
  })
  res.json(newTag);
});

router.put('/:id', (req, res) => {
  const tag_name = req.body.tag_name
  const tag = Tag.update({
    tag_name: tag_name,
  },
  {
    where: {
      id: req.params.id,
    }
  })
  res.json(
    {
      "message": `Successfully updated tag name with id ${req.params.id} to the ${tag_name}`,
    }
  );
});

router.delete('/:id', async (req, res) => {
  const tag = await Tag.destroy({
    where: {
      id: req.params.id,
    }
  })
  res.json(
    {
      "message": `Successfully deleted tag with id ${req.params.id}`,
    }
  );
});

module.exports = router;
