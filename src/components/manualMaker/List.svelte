<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let list: string[];
  let dataList = list;
  export let edit: boolean;

  const dispatch = createEventDispatcher();

  function addItem() {
    dataList = [...dataList, ""];
  }

  $: dispatch("list", dataList);
</script>

<ul>
  {#each dataList as listItem}
    {#if edit}
      <li contenteditable bind:innerHTML={listItem} />
    {:else}
      <li>{listItem}</li>
    {/if}
  {/each}
</ul>
<button on:click={addItem}>Add Item</button>

<style>
  li {
    min-width: 3em;
  }

  ul {
    list-style-type: circle;
  }
</style>
