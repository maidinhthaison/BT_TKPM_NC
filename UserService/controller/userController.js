import { xuLyDangNhapService } from "../services/UserService.js";
export const xuLyDangNhapController = async (req, res, next) => {
  const params = req.body.params;
  if (!params) {
    return res.status(400).send({ message: "Thiếu tham số" });
  }
  const response = await xuLyDangNhapService(params.maSo, params.matKhau); 
  console.log(`response: ${JSON.stringify(response, null, 2)}`);
  
  if(response.status === "OK"){
    res.status(200).send(response);
  }
  else {
    res.status(401).send(response);
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
