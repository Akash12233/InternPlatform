import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/temp")// cb used to asynchorous way to crate and update the filename
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
export const upload = multer({
     storage, 
    });