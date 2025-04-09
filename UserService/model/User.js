import { KhuVuc } from './KhuVuc.js';
export class User {
  constructor({
    hoTen, maSo, tenDangNhap, matKhau,
    dienThoai, kv
  }) {
    this.hoTen = hoTen;
    this.maSo = maSo;
    this.tenDangNhap = tenDangNhap;
    this.matKhau = matKhau;
    this.dienThoai = dienThoai;
    this.kv = kv
  }

  static fromJson(json) {
    return new User(json);
  }

  static fromJsonArray(jsonArray) {
    return jsonArray.map(item => new User(item));
  }
  
}
