import multer from "multer"
import path from "path"

const uploadpath =path.join(process.cwd(),"Public/Temp")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadpath)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })