<script lang="ts">
  import type { Section } from "../../classes/Manual/Section";
  import { Table as dataTable } from "../../classes/Manual/Table";

  import { ActiveSection } from "../../stores/ActiveSection";
  import { ManualStore } from "../../stores/Manual";
  import BodyFormatter from "./BodyFormatter.svelte";

  export let edit: boolean;
  let section: Section = $ActiveSection;

  $: {
    section = $ActiveSection;
    ManualStore.update((m) => m.updateSection(section));
  }

  function deleteSection() {
    ManualStore.update((m) => m.removeSection(section.uuid));
  }

  const updateBody = ({ detail }) => {
    section = section.updateBody(detail);
  };

  const updateTable = ({ detail }) => {
    section = section.updateTable(detail);
  };
  const updateList = ({ detail }) => {
    section = section.updateList(detail);
  };
  const addTable = () => {
    section = section.addTable(new dataTable());
  };
  const addList = () => {
    section = section.addList();
  };
</script>

{#if edit}
  <h2 contenteditable bind:innerHTML={section.title} />
  <!-- <p contenteditable bind:innerHTML={section.body} /> -->
  <BodyFormatter
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
  />
  <button on:click={deleteSection}>Delete</button>
{:else}
  <h2>{section.title}</h2>
  <p>{section.body}</p>
{/if}
