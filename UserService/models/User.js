import { KhuVuc } from "./KhuVuc.js";

export class User {
  constructor(hoTen, maSo, tenDangNhap, matKhau, dienThoai, kv = []) {
    this.hoTen = hoTen;
    this.maSo = maSo;
    this.tenDangNhap = tenDangNhap;
    this.matKhau = matKhau;
    this.dienThoai = dienThoai;
    this.khuVuc = kv.map((item) => new KhuVuc(item.id, item.tenKv));
  }
}
