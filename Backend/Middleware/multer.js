import multer from "multer";

// it is used to handle the image
const storage = multer.diskStorage
(
    {
    destination: function (req, file, cb)
    {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb)
    {
        cb(null, file.originalname);
    }
    }
)

const upload = multer({ storage: storage });

export default upload;