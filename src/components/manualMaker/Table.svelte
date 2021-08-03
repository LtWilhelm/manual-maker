<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { Table } from "../../classes/Manual/Table";
  export let dataTable: Table;
  let table: Table = dataTable;
  export let edit: boolean;

  const dispatch = createEventDispatcher();

  $: {
    dispatch("table", table);
  }

  function addColumn() {
    table = table.addColumn();
  }
  function addRow() {
    table = table.addRow();
  }
</script>

<table-container>
  <table>
    <thead>
      <tr>
        {#each table.columns as column}
          {#if !table.rows.length}
            <th contenteditable bind:innerHTML={column} />
          {:else}
            <th>{column}</th>
          {/if}
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each table.rows as row}
        <tr>
          {#each table.columns as column}
            <td contenteditable bind:innerHTML={row[column]} />
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
  {#if edit}
    {#if !table.rows.length}
      <button on:click={addColumn}>Add Column</button>
    {/if}
    <button on:click={addRow}>Add Row</button>
  {/if}
</table-container>

<style>
  table-container {
    max-width: 100vw;
    overflow-x: auto;
  }

  th,
  td {
    min-height: 1em;
    min-width: 5em;
  }
</style>
