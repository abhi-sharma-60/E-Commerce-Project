const express = require("express");
const authToken = require("../middleware/authToken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const userSignUpController = require("../controller/userSignUp");
const userSignInController = require("../controller/userSignIn");
const userDetailsController = require("../controller/userDetails");
const userLogout = require("../controller/userLogout");
const allUsers = require("../controller/allUsers");
const updateUser = require("../controller/updateUser");
const UploadPorductController = require("../controller/uploadProduct");
const getProductController = require("../controller/getProduct");
const updateProductController = require("../controller/updateProduct");

router.post("/signup", userSignUpController);

router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
// admin panel
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);
router.post("/update-product", authToken, updateProductController);
// product 
router.post("/upload-product", authToken, UploadPorductController);
// get product
router.get("/get-product", getProductController);

module.exports = router;
