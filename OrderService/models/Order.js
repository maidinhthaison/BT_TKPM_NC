import { KhachHang } from './KhachHang.js';
export class Order {
    constructor(id, ngayThue, ngayTra, tongtien, khachHang) {
        this.id = id;
        this.ngayThue = ngayThue;
        this.ngayTra = ngayTra;
        this.tongtien = tongtien;
        this.khachHang = new KhachHang(khachHang.cccd, khachHang.hoTen, 
            khachHang.ngaySinh, khachHang.diaChi, khachHang.dienThoai);
    }
}
