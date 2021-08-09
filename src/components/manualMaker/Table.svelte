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

  function deleteColumn(name: string) {
    table = table.deleteColumn(name);
  }
  function deleteRow(index: number) {
    table = table.deleteRow(index)
  }
</script>

<table-container>
  <table>
    <thead>
      <tr>
        {#each table.columns as column}
          {#if !table.rows.length}
            <th class="pane" on:dblclick={() => deleteColumn(column)} contenteditable bind:innerHTML={column} />
          {:else}
            <th class="pane" on:dblclick={() => deleteColumn(column)}>{column}</th>
          {/if}
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each table.rows as row, i}
        <tr on:dblclick={() => deleteRow(i)}>
          {#each table.columns as column}
            <td class="pane" contenteditable bind:innerHTML={row[column]} />
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
