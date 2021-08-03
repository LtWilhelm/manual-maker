<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import Manual from "../components/manualMaker/Manual.svelte";
  import ManualService from "../services/ManualService";
  import { ActiveSectionId } from "../stores/ActiveSection";
  import { ManualStore } from "../stores/Manual";
  import { queryParser } from "../utils/queryParser";
  const url = window.location.href.split("?")[1];

  const section = queryParser(url || "").get("section");
  let activeId: string;
  const unsub = ActiveSectionId.subscribe((val) => (activeId = val));
  if (section && section !== activeId) {
    ActiveSectionId.set(section);
  }
  onDestroy(unsub);

  export let params: any & { id?: string } = {};

  onMount(() => {
    if (params.id && $ManualStore.uuid !== params.id) {
      ManualService.getById(params.id);
    }
  });
</script>

<Manual />
