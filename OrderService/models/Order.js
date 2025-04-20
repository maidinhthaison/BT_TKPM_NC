import { KhachHang } from './KhachHang.js';
import { Phong } from '../../RoomService/model/Phong.js'
export class Order {
    constructor(id, ngayThue, ngayTra, tongtien, khachHang, phong) {
        this.id = id;
        this.ngayThue = ngayThue;
        this.ngayTra = ngayTra;
        this.tongtien = tongtien;
        this.khachHang = new KhachHang(khachHang.cccd, khachHang.hoTen, khachHang.ngaySinh,
            khachHang.diaChi, khachHang.dienThoai
        );
        this.phong = new Phong(phong.id, phong.tenPhong, phong.trangThai,
            phong.loaiPhong, phong.khuVuc, phong.hinh
        );
    }
}
