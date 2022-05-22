import { v4 } from "uuid";

export class Section {
  uuid: string;
  title: string;
  type: 'group' | 'standalone';
  body?: string;
  sections?: Section[];

  constructor(s?: Section) {
    this.uuid = s?.uuid || v4();
    this.title = s?.title || 'Title 🖊';
    this.type = s?.type || 'standalone';
    this.body = s?.body || 'Body 🖊';
    this.sections = s?.sections?.map(s => new Section(s));

  }

  addSection = (s: Section) => {
    this.sections ? this.sections.push(s) : this.sections = [s];
    return this;
  }

  findSection = (id: string): Section | undefined=> {
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

  updateSection = (section: Section): boolean => {
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
        if (found) return !!found;
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