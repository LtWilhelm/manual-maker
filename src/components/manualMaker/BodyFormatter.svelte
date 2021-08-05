<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { IFormattable } from "../../classes/Manual/Section";

  import type { Table as dataTable } from "../../classes/Manual/Table";
  import Table from "./Table.svelte";
  import List from "./List.svelte";
  import { interlace } from "../../utils/interlace";

  export let body: string;
  export let table: dataTable;
  export let list: string[];
  export let id: string;
  export let edit: boolean;

  let currendId: string = id;

  const tableRegex = /{{(?:table|list)}}/g;

  let bodyArr: string[] = [body];
  let insertions: (keyof IFormattable)[] = [];

  const dispatch = createEventDispatcher();

  $: {
    if (currendId !== id) bodyArr = [body];
  }

  $: {
    insertions = Array.from<RegExpMatchArray, keyof IFormattable>(
      body.matchAll(tableRegex),
      (e) => e[0].replaceAll(/{|}/g, "") as keyof IFormattable
    );
  }
  $: {
    if (tableRegex.test(body) && bodyArr.length < insertions.length + 1) {
      bodyArr = body.split(tableRegex);
    }
  }

  $: dispatch(
    "body",
    interlace(
      bodyArr,
      insertions.map((e) => `{{${e}}}`)
    ).join("")
  );

  function removeTable() {
    body = body.replace(/{{table}}/, " ");
    bodyArr = [body];
    dispatch("table", undefined);
  }

  function addTable() {
    dispatch("addTable");
  }
  function addList() {
    dispatch("addList");
  }
</script>

{#each bodyArr as segment, i}
  <div class="pane" contenteditable bind:innerHTML={segment} />
  {#if insertions[i] === "table" && table}
    <Table dataTable={table} on:table {edit} />
  {:else if insertions[i] === "list" && list}
    <List {list} on:list {edit} />
  {/if}
{/each}
<button on:click={addTable}>Add Table</button>
<button on:click={addList}>Add List</button>
{#if table}
  <button on:click={removeTable}>Remove Table</button>
{/if}
