import { v4 } from "uuid";

export interface ITable {
  columns: string[];
  rows: Row[];
}

export class Table implements ITable {
  constructor(t?: Table) {
    this.columns = t?.columns || [];
    this.rows = t?.rows ? t.rows.map(r => new Row(r, this.columns)) : [];
    this.uuid = t?.uuid || v4();
  }
  columns: string[];
  rows: Row[];
  uuid: string;

  addColumn = () => {
    this.columns.push('');
    return this;
  }
  addRow = () => {
    this.rows.push(new Row(undefined, this.columns));
    return this;
  }
}

export class Row {
  [key: string]: string;
  constructor(r?: Row, cols?: string[]) {
    cols?.forEach(c => this[c] = r ? r[c] : '');
  }
}