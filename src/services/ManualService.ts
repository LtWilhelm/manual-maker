import type { Manual } from "../classes/Manual/Manual";
import { ManualStore } from "../stores/Manual"
import { idb } from "../utils/idb"
import { slimGet, slimPost, slimPut } from "../utils/slimFetch";
import { ConfigService } from "./ConfigService";

export default {
  // getById: async (id: string) => {
  //   const manual = await idb('manuals', "getOne", { uuid: id });
  //   ManualStore.set(new Manual(manual));
  // },
  getAll: () => slimGet(ConfigService.get('site.server')),
  getById: (id: string) => slimGet(ConfigService.get('site.server') + '/' + id),
  create: (manual: Manual) => slimPost(ConfigService.get('site.server'), manual),
  update: (manual: Manual) => slimPut(ConfigService.get('site.server'), manual)
}