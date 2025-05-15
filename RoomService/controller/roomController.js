
import { xulyGetAllRooms, searchRooms, getAllLoaiPhongService, capNhatGiaTheoLoaiPhongService } from "../services/roomService.js";
export const getAllRoomsController = async (req, res, next) => {
  try {
    const response = await xulyGetAllRooms(); 
    console.log(JSON.stringify(response, null, 2));
    
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

export const capNhatGiaTheoLoaiPhongController = async (req, res) => {
  try {
    const params = req.body;
    const response = await capNhatGiaTheoLoaiPhongService(params); 
    console.log('capNhatGiaTheoLoaiPhongController>>>', JSON.stringify(response, null, 2));
    
    res.status(200).send(response);
  } catch (error) {
    console.log(res.status);
    res.status(400).send(error.message);
  }
};


