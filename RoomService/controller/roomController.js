import { xulyGetAllRooms } from "../services/roomService.js";
export const getAllRooms = async (req, res, next) => {
  try {
    //const params = req.body.params;
    //console.log(`Params: ${JSON.stringify(params)}`);

    const response = await xulyGetAllRooms(); 
    console.log(`Response: ${JSON.stringify(response, null, 2)}`);

    res.status(200).send(response);
  } catch (error) {
    console.log(res.status);
    res.status(400).send(error.message);
  }
};
