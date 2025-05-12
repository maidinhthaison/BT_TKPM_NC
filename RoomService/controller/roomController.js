import { xulyGetAllRooms, searchRooms, getAllLoaiPhongService } from "../services/roomService.js";
export const getAllRoomsController = async (req, res, next) => {
  try {
    const response = await xulyGetAllRooms(); 
    res.status(200).send(response);
  } catch (error) {
    console.log(res.status);
    res.status(400).send(error.message);
  }
};

export const searchRoomsController = async (req, res, next) => {
  try {
    const params = req.body.params;
    const response = await searchRooms(params.keyword); 
    res.status(200).send(response);
  } catch (error) {
    console.log(res.status);
    res.status(400).send(error.message);
  }
};

export const getAllLoaiPhongController = async (req, res) => {
  try {
    const response = await getAllLoaiPhongService(); 
    res.status(200).send(response);
  } catch (error) {
    console.log(res.status);
    res.status(400).send(error.message);
  }
};


