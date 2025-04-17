import { xuLyDangNhapService } from "../services/UserService.js";
export const xuLyDangNhapController = async (req, res, next) => {
  const params = req.body.params;
  const response = await xuLyDangNhapService(params.maSo, params.matKhau); 
  try {
    if(response.status === "OK"){
      res.status(200).send(response);
    }
    else {
      res.status(401).send(response);
    }
  } catch (error) {
    console.log(res.status);
    res.status(500).send(error.message);
    
  }    
};

// export const searchRoomsController = async (req, res, next) => {
//   try {
//     const params = req.body.params;
//     const response = await searchRooms(params.keyword); 
//     res.status(200).send(response);
//   } catch (error) {
//     console.log(res.status);
//     res.status(400).send(error.message);
//   }
// };
