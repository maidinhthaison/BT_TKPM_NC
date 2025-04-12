import { CauHinh } from "./CauHinh.js";

export class LoaiPhong {
  constructor({
    id,
    tenLoaiPhong,
    dongiaPhong,
    tienNghi,
    khachToiDa,
    cauHinh,
  }) {
    this.id = id;
    this.tenLoaiPhong = tenLoaiPhong;
    this.dongiaPhong = dongiaPhong;
    this.tienNghi = tienNghi;
    this.khachToiDa = khachToiDa;
    this.cauHinh = CauHinh.fromJson(cauHinh);
  }

  static fromJson(json) {
    return new LoaiPhong(json);
  }

  static fromJsonArray(jsonArray) {
    return jsonArray.map((item) => new LoaiPhong(item));
  }
}
