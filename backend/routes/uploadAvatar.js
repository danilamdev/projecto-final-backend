import express from 'express'
import multer from 'multer'

const router = express.Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'user-avatars/')
  },
  filename: function (req, file, cb) {
    console.log('FILE', req.user)
    cb(null, req.user._id.toString() )
  }
})

const upload = multer({ storage: storage })

router.post('/:userId', upload.single('avatar'), (req, res) => {
  const { userId } = req.params
  res.json({ status: 'ok' })
  console.log(req.file)
  console.log({userId})
} )

router.get('/:userId', (req, res) => {
  const { userId } = req.params
  console.log({userId})
  res.sendFile(userId, { root: 'user-avatars' })
})

export default router