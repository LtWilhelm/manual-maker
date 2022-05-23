import { v4 } from "uuid";
import { Section } from "./Section";

export class Manual {
  uuid: string;
  _id: string;
  title: string;
  sections: Section[];
  bodies?: string[];
  img?: string;

  isEditable: boolean;

  constructor(m?: Manual, reparent?: boolean) {
    this.uuid = m?.uuid || v4();
    this._id = m?._id || '';
    this.title = m?.title || 'Title 🖊';
    this.bodies = m?.bodies || [''];
    this.isEditable = m?.isEditable || true;
    this.img = m?.img;
    // this.sections = m?.sections?.map(s => new Section(s)) || [];

    if (reparent) {
      this.sections = Manual.reparentSections(m?.sections?.map(s => new Section(s)) || []);
    } else {
      this.sections = m?.sections?.map(s => new Section(s)) || [];
    }
  }

  addSection = (s: Section) => {
    this.sections.push(s);
    return this;
  }

  findSection = (id: string) => {
    for (let i = 0; i < this.sections.length; i++) {
      const section = this.sections[i];
      let found;
      if (section.findSection)
        found = section.findSection(id);
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

  static reparentSections = (sections: Section[]) => {
    const sectionMap = new Map<string, Section>();
    const parented: Section[] = [];
    for (const section of sections) {
      console.log(section);
      sectionMap.set(section.uuid, section);
      if (section.parent) {
        const parent = sectionMap.get(section.parent);
        if (parent) {
          parent.sections = parent.sections || [];
          parent.sections.push(section);
          parent.type = 'group';
        }
      } else {
        parented.push(section);
      }
    }
    return parented;
  }
}

export class ManualSave extends Manual {
  constructor(m: Manual) {
    super(m);
    this.sections = [];
    for (const section of m.sections) {
      this.sections.push(...ManualSave.extractSections(section));
    }
  }

  static extractSections = (s: Section) => {
    const sections: Section[] = [s];
    for (const section of s.sections || []) {
      section.parent = s.uuid;
      sections.push(...ManualSave.extractSections(section));
    }
    delete s.sections;
    return sections;
  }
}
