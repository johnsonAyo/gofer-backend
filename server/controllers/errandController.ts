import Errand from "../models/ErrandModel";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  getAllByUser,
} from "./handlerFactory";

const updateErrand = updateOne(Errand);
const deleteErrand = deleteOne(Errand);
const getAllErrand = getAll(Errand);
const getErrand = getOne(Errand, "");
const createErrand = createOne(Errand);
const getAllUserErrand = getAllByUser(Errand);

export {
    deleteErrand,
    updateErrand,
    createErrand,
    getAllErrand,
    getErrand,
    getAllUserErrand
};
