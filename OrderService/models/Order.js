import { KhachHang } from './KhachHang.js';
import { Phong } from '../../RoomService/model/Phong.js'
export class Order {
    constructor(id, ngayThue, ngayTra, tongtien, khachHangCccd, phongId) {
        this.id = id;
        this.ngayThue = ngayThue;
        this.ngayTra = ngayTra;
        this.tongtien = tongtien;
        this.khachHangCccd = khachHangCccd;
        this.phongId = phongId;
    }
}