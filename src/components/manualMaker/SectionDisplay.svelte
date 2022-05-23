<script lang="ts">
  import { onDestroy, onMount } from "svelte";
import { Manual } from '../../classes/Manual/Manual';

  import { Section } from "../../classes/Manual/Section";
  import ManualService from "../../services/ManualService";

  import { ActiveSectionId } from "../../stores/ActiveSection";
  import { ManualStore } from "../../stores/Manual";

  export let edit: boolean;
  let section: Section;

  $: section && updateSection(section);
  $: $ActiveSectionId && getSection();
  onMount(async () => {
    const s = await getSection();

    section = new Section(s, $ManualStore._id);
  });

  let timer: NodeJS.Timeout;
  function updateSection(s: Section) {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      console.log(s);
      if (s.uuid && s.manualId) await ManualService.updateSection(s);
    }, 2000);
  }

  async function deleteSection() {
    await ManualService.deleteSection($ManualStore._id, section.uuid);
    ManualStore.set(new Manual(await ManualService.getById($ManualStore._id), true));
  }

  async function getSection() {
    return await ManualService.getSection(
      $ManualStore._id,
      $ActiveSectionId
    );
  }
</script>

{#if section}
  {#if edit}
    <h2 class="pane" contenteditable bind:innerHTML={section.title} />
    <p class="pane" contenteditable bind:innerHTML={section.body} />

    <button class="red" on:click={deleteSection}>Delete Section</button>
  {:else}
    <h2 class="pane">{section.title}</h2>
    <p class="pane">{section.body}</p>
  {/if}
{/if}
