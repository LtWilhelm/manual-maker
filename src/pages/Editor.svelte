<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Manual } from "../classes/Manual/Manual";

  import ManualEditor from "../components/manualMaker/ManualEditor.svelte";
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

  onMount(async () => {
    if (params.id && $ManualStore?.uuid !== params.id) {
      const temp = await ManualService.getById(params.id);
      ManualStore.set(new Manual(temp, true));
    }
  });
</script>

{#if $ManualStore}
  <ManualEditor />
{:else}
  <p>LOADING</p>
{/if}
