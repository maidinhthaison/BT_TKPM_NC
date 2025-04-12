import { LoaiPhong } from './LoaiPhong.js';
import { Tang } from './Tang.js';
export class Phong {
  constructor({
    id, tenPhong, trangThai, loaiPhong, tang
  }) {
    this.id = id;
    this.tenPhong = tenPhong;
    this.trangThai = trangThai;
    this.loaiPhong = LoaiPhong.fromJson(loaiPhong);
    this.tang = Tang.fromJson(tang);
  }

  static fromJson(json) {
    return new Phong(json);
  }

  static fromJsonArray(jsonArray) {
    return jsonArray.map(item => new Phong(item));
  }
  
}
