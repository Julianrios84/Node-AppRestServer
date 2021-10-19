const { Model, isValidObjectId } = require("mongoose");
const { User, Category, Product, Role } = require("../models");
const { emit } = require("../models/user.model");

const allowedCollections = ["user", "category", "product", "role"];

const searchRecord = async (
  collection = Model,
  concept = "",
  stringFields = null,
  numberFields = null,
  populates = null,
  res
) => {

  const mongoID = isValidObjectId(concept);

  if (mongoID) {
    // concept.match(/^[0-9a-fA-F]{24}$/)
    // Yes, it's a valid ObjectId, proceed with `findById` call.
    const record = await collection.findById(concept).populate(populates);
    return res.json({
      results: record ? [record] : [],
    });
  }

  if (numberFields !== null) {
    if (!isNaN(concept)) {
      let fieldsNumbers = numberFields.reduce(function (result, item, index) {
        var value = item;
        var obj = {};
        obj[value] = concept;
        result.push(obj);
        return result;
      }, []);

      const record = await collection.find({
        $or: fieldsNumbers,
        $and: [{ status: true }],
      }).populate(populates);

      return res.json({
        results: record ? record : [],
      });
    }
  }

  const regexp = new RegExp(concept, "i");

  let fieldsStrings = stringFields.reduce(function (result, item, index) {
    var value = item;
    var obj = {};
    obj[value] = regexp;
    result.push(obj);
    return result;
  }, []);

  const records = await collection.find({
    $or: fieldsStrings,
    $and: [{ status: true }],
  }).populate(populates);

  res.json({
    results: records,
  });
};

const search = (req, res) => {
  const { collection, concept } = req.params;

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      message: `the ${collection} collections are not allowed for searches`,
    });
  }

  switch (collection) {
    case "user":
      searchRecord(User, concept, ["name", "email"], null, null, res);
      break;

    case "category":
      searchRecord(
        Category,
        concept,
        ["name"],
        null,
        [{ path: "user", select: "name" }],
        res
      );
      break;

    case "product":
      searchRecord(
        Product,
        concept,
        ["name", "description"],
        ["price"],
        [{ path: "category", select: "name" }, { path: "user", select: "name" }],
        res
      );
      break;

    default:
      res.status(500).json({
        message: `Search not found`,
      });
      break;
  }
};

module.exports = {
  search,
};
