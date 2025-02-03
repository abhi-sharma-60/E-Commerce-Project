const express = require("express");
const authToken = require("../middleware/authToken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const userSignUpController = require("../controller/user//userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const UploadPorductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProductOne = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDtails = require("../controller/product/getProductDetails");

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
router.get("/get-categoryProduct", getCategoryProductOne);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDtails);



module.exports = router;
