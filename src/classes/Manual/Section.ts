import { v4 } from "uuid";
import { Table } from "./Table";

export interface IFormattable {
  table?: Table;
  list?: string[];
}

export class Section implements IFormattable {
  uuid: string;
  title: string;
  type: 'group' | 'standalone';
  body?: string;
  sections?: Section[];
  table?: Table;
  list?: string[];

  constructor(s?: Section) {
    this.uuid = s?.uuid || v4();
    this.title = s?.title || 'Title 🖊';
    this.type = s?.type || 'standalone';
    this.body = s?.body || 'Body 🖊';
    this.sections = s?.sections?.map(s => new Section(s));

    this.table = s?.table ? new Table(s.table) : undefined;
    this.list = s?.list;
  }

  addTable = (t: Table) => {
    this.table = t;
    return this;
  }
  addList = () => {
    this.list = [];
    return this;
  }

  addSection = (s: Section) => {
    this.sections ? this.sections.push(s) : this.sections = [s];
    return this;
  }

  findSection = (id: string) => {
    if (id === this.uuid) return this;
    if (this.sections?.length)
      for (let i = 0; i < this.sections.length; i++) {
        const section = this.sections[i];
        let found = section.findSection(id);
        if (found) return found;
      }
  }

  updateBody = (body?: string) => {
    this.body = body;
    return this;
  }
  updateTable = (table?: Table) => {
    this.table = table ? new Table(table) : undefined;
    return this;
  }
  updateList = (list: string[]) => {
    this.list = list;
    return this;
  }

  updateSection = (section: Section) => {
    if (section.uuid === this.uuid) {
      this.title = section.title;
      this.type = section.type;
      this.body = section.body;
      this.sections = section.sections;
      if (!this.sections?.length) this.type = 'standalone';
      return true;
    }
    if (this.sections?.length)
      for (let i = 0; i < this.sections.length; i++) {
        const section = this.sections[i];
        const found = section.updateSection(section);
        if (found) return found;
      }
  }

  removeSection = (id: string) => {
    if (this.uuid === id) return true;
    if (this.sections?.length)
      for (let i = 0; i < this.sections.length; i++) {
        const section = this.sections[i];
        const found = section.removeSection(id);
        if (found) {
          this.sections.splice(i, 1);
          return { success: true };
        };
      }
  }

  hasSection = (id: string): boolean => {
    return this.sections?.some(s => s.uuid === id);
  }
}