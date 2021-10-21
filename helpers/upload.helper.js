const path = require('path')
const { v4: uuidv4 } = require('uuid');

const uploadArchive = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
  
  return new Promise((resolve, reject) => {
    const { archive } = files;

    const separated = archive.name.split('.');
    const ext = separated[separated.length - 1]

    if(!validExtensions.includes(ext)) {
      return reject(`${ext} extension is not allowed.`)
    }

    const tmpName = uuidv4()+ '.' + ext;
    const uploadPath = path.join(__dirname, '../uploads/', folder, tmpName);

    archive.mv(uploadPath, (err) => {
      if(err) {
        return reject(err)
      }

      resolve(`${tmpName}`)
    })
  })
}

module.exports = {
  uploadArchive
}