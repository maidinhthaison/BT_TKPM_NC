import {apiRoomClient, apiOrderlient, apiKhachHangClient} from "./client.js";
export const getAllRooms = async () => {
  const response = await apiRoomClient.get('api/room/getAll');
  return response.data;
}
export const getAllOrders = async () => {
  const response = await apiOrderlient.get('api/order/getAll');
  return response.data;
}

export const getAllKhachHang = async () => {
  const response = await apiKhachHangClient.get('api/user/kh/getAll');
  return response.data;
}

export const getAllLoaiPhong = async () => {
  const response = await apiRoomClient.get('api/room/getAllLoaiPhong');
  return response.data;
}

export const capNhatGiaPhong = async (params) => {
  const response = await apiRoomClient.post('api/room/updateRoomUnitPrice', params);
  return response.data;
} 