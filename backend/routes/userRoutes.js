const router = require("express").Router();

const auth =
    require("../middleware/auth");

const controller =
    require("../controllers/userController");

const {
    userValidation
} = require("../middleware/validation");

router.get("/", auth, controller.getUsers);

router.get("/:id", auth, controller.getUserById);

router.post(
    "/",
    auth,
    userValidation,
    controller.createUser
);

router.put(
    "/:id",
    auth,
    userValidation,
    controller.updateUser
);

router.delete(
    "/:id",
    auth,
    controller.deleteUser
);

module.exports = router;