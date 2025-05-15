import { LoaiPhong } from './LoaiPhong.js';
import { KhuVuc } from './KhuVuc.js';
import { config } from '../config.js';
export class Phong {
  constructor(id, tenPhong, trangThai, loaiPhong, khuVuc, hinh) {
    this.id = id;
    this.tenPhong = tenPhong;
    this.trangThai = trangThai === "1" ? TrangThaiPhong.TRONG : TrangThaiPhong.DA_DUOC_THUE;
    this.loaiPhong = new LoaiPhong(
      loaiPhong.id,
      loaiPhong.tenLoaiPhong,
      loaiPhong.dongiaPhong,
      loaiPhong.tienNghi,
      loaiPhong.khachToiDa,
      loaiPhong.cauHinh
    );
    this.khuVuc = new KhuVuc(
      khuVuc.id,
      khuVuc.tenKv,
      khuVuc.tang
    );
    this.hinh = hinh;
    this.formatLinkHinh = `${config.cdn_url}/images/rooms/${this.hinh}`;
    this.formatTenPhong = this.khuVuc.tenKv + '-' + this.khuVuc.tang[0].tenTang + '-' + this.tenPhong;
  }
}
const TrangThaiPhong = Object.freeze({
  TRONG: "Đang trống",
  DA_DUOC_THUE: "Đã được thuê"
});

 //formatCurrency(loaiPhong.dongiaPhong, 'vi-VN', 'VND') + '/giờ'