const router = require("express-promise-router")();
//permite capturar errores en los controladores sin usar un try-catch
const {
  index,
  newUser,
  getUser,
  replaceUser,
  deleteUser,
  getUsersCars,
  newUserCar,
} = require("../controllers/user"); //logica (controllers)

router.get("/", index);
router.post("/", newUser);
router.get("/:userId", getUser);
router.put("/:userId", replaceUser);
router.delete("/:userId", deleteUser);
router.get("/:userId/cars", getUsersCars);
router.post("/:userId/cars", newUserCar);

module.exports = router;
