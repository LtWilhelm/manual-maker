import { Manual } from "../classes/Manual/Manual";
import { ManualStore } from "../stores/Manual"
import { idb } from "../utils/idb"

export default {
  getById: async (id: string) => {
    const manual = await idb('manuals', "getOne", { uuid: id });
    ManualStore.set(new Manual(manual));
  },
  getAll: async () => await idb('manuals', 'get'),
}