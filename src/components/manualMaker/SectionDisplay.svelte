<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { Manual } from "../../classes/Manual/Manual";

  import { Section } from "../../classes/Manual/Section";
  import ManualService from "../../services/ManualService";

  import { ActiveSectionId } from "../../stores/ActiveSection";
  import { ManualStore } from "../../stores/Manual";
  import { isLoading } from "../../stores/Status";

  export let edit: boolean;
  let section: Section;

  $: section && updateSection(section);
  $: $ActiveSectionId && getSection();
  // onMount(getSection);

  let timer: NodeJS.Timeout;
  function updateSection(s: Section) {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      if (!$isLoading && s.uuid && s.manualId) {
        isLoading.set(true);
        await ManualService.updateSection(s);
        ManualStore.set(
          new Manual(await ManualService.getById($ManualStore._id), true)
        );
      }
      isLoading.set(false);
    }, 2000);
  }

  async function deleteSection() {
    isLoading.set(true);
    await ManualService.deleteSection($ManualStore._id, section.uuid);
    ManualStore.set(
      new Manual(await ManualService.getById($ManualStore._id), true)
    );
    isLoading.set(false);
  }

  async function getSection() {
    isLoading.set(true);
    clearTimeout(timer);
    const sec = await ManualService.getSection(
      $ManualStore._id,
      $ActiveSectionId
    );
    section = new Section(sec, $ManualStore._id);
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
