import {readable} from "svelte/store";

export const IsMobile = readable(null, set => {
  set(window.innerWidth <= 425); 
})