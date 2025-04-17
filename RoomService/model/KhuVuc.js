import { Tang } from './Tang.js';

export class KhuVuc {
  constructor(id, tenKv, tang) {
    this.id = id;
    this.tenKv = tenKv;
    this.tang = Array.isArray(tang) ? tang.map((t) => new Tang(t.id, t.tenTang)) : [];
  }
}