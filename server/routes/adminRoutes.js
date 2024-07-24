const express = require("express");
const verifyToken = require('../utils/verifyToken');
const { authUser, registerUser, addVehicle, getAllVehicles, getVehicle, deleteVehicle, getForgotPasswordLink, resetPassword } = require("../controller/adminController");
const multer = require('multer');

const router = express.Router();


//To handle the file upload
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "../server/assets/images");
    },
    filename: function (req, file, cb) {
      const imageName = Date.now() + '-' + file.originalname;
      cb(null, imageName);
    }
  });
  
  const upload = multer({ storage: storage });

router.post('/login', authUser)
router.post('/register', registerUser)
router.get('/getVehicles',verifyToken, getAllVehicles)
router.post('/addVehicle', verifyToken, upload.array('recfile', 4), addVehicle)
router.get('/getVehicle/:id',verifyToken, getVehicle)
router.delete('/deleteVehicle/:id',verifyToken, deleteVehicle)
router.post("/get-link", getForgotPasswordLink)
router.post("/reset-password", resetPassword)

module.exports = router;
