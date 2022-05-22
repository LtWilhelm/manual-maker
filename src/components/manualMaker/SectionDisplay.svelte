<script lang="ts">
  import type { Section } from "../../classes/Manual/Section";

  import { ActiveSection } from "../../stores/ActiveSection";
  import { ManualStore } from "../../stores/Manual";

  export let edit: boolean;
  let section: Section = $ActiveSection;

  $: {
    section = $ActiveSection;
    ManualStore.update((m) => m.updateSection(section));
  }

  function deleteSection() {
    ManualStore.update((m) => m.removeSection(section.uuid));
  }

</script>

{#if edit}
  <h2 class="pane" contenteditable bind:innerHTML={section.title} />
  <p class="pane" contenteditable bind:innerHTML={section.body} />
  <!-- <BodyFormatter
    body={section.body}
    table={section.table}
    list={section.list}
    id={section.uuid}
    {edit}
    on:body={updateBody}
    on:table={updateTable}
    on:list={updateList}
    on:addTable={addTable}
    on:addList={addList}
  /> -->
  <button class="red" on:click={deleteSection}>Delete Section</button>
{:else}
  <h2 class="pane">{section.title}</h2>
  <p class="pane">{section.body}</p>
{/if}
