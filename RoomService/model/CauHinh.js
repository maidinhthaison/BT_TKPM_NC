export class CauHinh {
    constructor({
      id,
      khachToiDa,
      dongiaPhong,
      ngayCapNhat
    }) {
      this.id = id;
      this.khachToiDa = khachToiDa,
      this.dongiaPhong = dongiaPhong,
      this.ngayCapNhat = ngayCapNhat
    }
  
    static fromJson(json) {
      return new CauHinh(json);
    }
  
    static fromJsonArray(jsonArray) {
      return jsonArray.map((item) => new CauHinh(item));
    }
  }
  