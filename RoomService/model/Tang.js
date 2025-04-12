export class Tang {
    constructor({
      id,
      tenTang,
    }) {
      this.id = id;
      this.tenTang = tenTang;
    }
    static fromJson(json) {
      return new Tang(json);
    }
  
    static fromJsonArray(jsonArray) {
      return jsonArray.map((item) => new Tang(item));
    }
  }
  