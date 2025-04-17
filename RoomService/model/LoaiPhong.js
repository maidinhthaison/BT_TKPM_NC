import { CauHinh } from './CauHinh.js';

export class LoaiPhong {
  constructor(id, tenLoaiPhong, dongiaPhong, tienNghi, khachToiDa, cauHinh) {
    this.id = id;
    this.tenLoaiPhong = tenLoaiPhong;
    this.dongiaPhong = dongiaPhong;
    this.tienNghi = tienNghi;
    this.khachToiDa = khachToiDa;
    this.cauHinh = new CauHinh(
      cauHinh.id,
      cauHinh.khachToiDa,
      cauHinh.dongiaPhong,
      cauHinh.ngayCapNhat
    );
  }
}