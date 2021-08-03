import { Section } from "./Section";

export class Manual {
  title: string;
  sections: Section[];
  bodies?: string[];

  isEditable: boolean;

  constructor(m?: Manual) {
    this.title = m?.title || 'Title 🖊';
    this.sections = m ? m?.sections.map(s => new Section(s)) : [];
    this.bodies = m?.bodies || [''];
    this.isEditable = m?.isEditable || true;
  }

  addSection = (s: Section) => {
    this.sections.push(s);
    return this;
  }

  findSection = (id: string) => {
    for (let i = 0; i < this.sections.length; i++) {
      const section = this.sections[i];
      let found = section.findSection(id);
      if (found) return found;
    }
  }
  updateSection = (section: Section) => {
    for (let i = 0; i < this.sections.length; i++) {
      const section = this.sections[i];
      let found = section.updateSection(section);
    }
    return this;
  }

  removeSection = (id: string) => {
    for (let i = 0; i < this.sections.length; i++) {
      const section = this.sections[i];
      const found = section.removeSection(id);
      if (found === true) {
        this.sections.splice(i, 1);
        break;
      } else if (found?.success) {
        break;
      };
    }
    return this;
  }
}