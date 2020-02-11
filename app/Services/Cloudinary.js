'use strict'

const cloudinary = use('cloudinary')
const Env = use('Env')

cloudinary.config({

  cloud_name: Env.get('CLOUDINARY_CLOUD_NAME'),
  api_key: Env.get('CLOUDINARY_API_KEY'),
  api_secret: Env.get('CLOUDINARY_API_SECRET')
})

module.exports = {

  upload: async (file) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const response = await cloudinary.uploader.upload(file.tmpPath, { folder: 'test' })

        resolve({ status: true, url: response.secure_url })
      } catch (error) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ status: false, url: error.message })
      }
    })
  }
}
