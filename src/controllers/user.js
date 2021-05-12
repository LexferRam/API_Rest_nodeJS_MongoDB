const User = require("../models/user");
const Car = require("../models/cars");

module.exports = {
  index: async function (req, res, next) {
    const users = await User.find();
    //throw new Error('errooorrrr')//probando captura de errores
    res.status(200).json(users);
  },

  newUser: async (req, res, next) => {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(200).json(user);
  },

  getUser: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  },

  replaceUser: async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;
    const oldUser = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ success: true, oldUser });
  },

  deleteUser: async (req, res, next) => {
    const { userId } = req.params;
    const oldUser = await User.findByIdAndRemove(userId);
    res.status(200).json({ success: true });
  },

  //obteniendo toda la info de un user con la info de los carros tambien
  getUsersCars: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("cars");
    res.status(200).json(user);
  },

  //añadiendo un carro a un usuario que se pase por id
  newUserCar: async (req, res, next) => {
    const { userId } = req.params; //captura el id del user
    const newCar = new Car(req.body); //instanciar el modelo car con sus datos
    const user = await User.findById(userId); //buscar user por id

    newCar.seller = user; //aosciando el user al carro
    await newCar.save(); //guardando datos del carro

    user.cars.push(newCar);
    await user.save();

    res.status(201).json(newCar);
  },
};
