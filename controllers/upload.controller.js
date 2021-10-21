const path = require('path');
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { uploadArchive } = require('../helpers');
const { User, Product } = require('../models');

const uploadFile = async (req, res) => {

  try {
    const nameArchive = await uploadArchive(res.files, ['png', 'jpg', 'jpeg', 'gif'], 'texts');
    res.json({ message: nameArchive })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

const updateImage = async (req, res) => {

  // Parameters
  const { id, collection } = req.params

  // collections array
  const collections = {
    user: User,
    product: Product
  }
  // we validate the collection
  if(!collections[collection]) {
    return res.status(500).json({ 
      message: `the collection ${collection} has not been validated` 
    })
  }
  // We get a record of the collection
  let record = await collections[collection].findById(id);

  // Validate if there is a record
  if(!record) {
    return res.status(400).json({
      message: `There is no record with this id: ${id}`
    })
  }

  // Remove Image
  if(record.image) {
    const pathImage = path.join(__dirname, '../uploads/', collection, record.image);
    if(fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage)
    }
  }

  // Upload image & obtain name
  const nameArchive = await uploadArchive(req.files, undefined, collection)
  // Update record with archive name
  record.image = nameArchive
  // Save record in db
  await record.save();
  // Response
  res.json(record)

}

const viewImage = async (req, res) => {

  const { id, collection } = req.params

  const collections = {
    user: User,
    product: Product
  }

  if(!collections[collection]) {
    return res.status(500).json({ 
      message: `the collection ${collection} has not been validated` 
    })
  }

  let record = await collections[collection].findById(id);

  if(!record) {
    return res.status(400).json({
      message: `There is no record with this id: ${id}`
    })
  }

  if(record.image) {
    const pathImage = path.join(__dirname, '../uploads/', collection, record.image);
    if(fs.existsSync(pathImage)) {
      return res.sendFile(pathImage)
    }
  }

  const pathImage = path.join(__dirname, '../assets/no-image.jpg');
  res.sendFile(pathImage)

}

// ================================================== //

const updateImageCloudinary = async (req, res) => {

  const { id, collection } = req.params

  const collections = {
    user: User,
    product: Product
  }

  if(!collections[collection]) {
    return res.status(500).json({ 
      message: `the collection ${collection} has not been validated` 
    })
  }

  let record = await collections[collection].findById(id);

  if(!record) {
    return res.status(400).json({
      message: `There is no record with this id: ${id}`
    })
  }

  // Remove Image
  if(record.image) {
    const array = record.image.split('/');
    const [ public_id ] = array[array.length - 1].split('.');
    cloudinary.uploader.destroy(public_id);
  }


  const { tempFilePath } = req.files.archive;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

  record.image = secure_url
  await record.save();

  res.json(record)

}


module.exports = {
  uploadFile, updateImage, viewImage, updateImageCloudinary
}