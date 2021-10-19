const { Product } = require("../models");

const getall = async (req, res) => {
  const { limit = 5, skip = 0 } = req.query;

  const [total, products] = await Promise.all([
    Product.countDocuments({ status: true }),
    Product.find({ status: true })
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(skip))
      .limit(Number(limit)),
  ]);
  res.json({
    total,
    products,
  });
};

const getone = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");
  res.json(product);
};

const create = async (req, res) => {
  const { status, user, ...body} = req.body;
  const productDB = await Product.findOne({ name: body.name });

  if (productDB) {
    return res.status(400).json({
      message: `${body.name} product, already exists`,
    });
  }

  const data = {
    name: body.name.toUpperCase(),
    user: req.user._id,
    ...body
  };

  const product = new Product(data);
  await product.save();

  res.status(201).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  if(data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  res.json(product);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.json(product);
};

module.exports = {
  getall,
  getone,
  create,
  update,
  remove,
};
