<script lang="ts">
  import Contents from "./Contents.svelte";
  import type { Manual } from "../../classes/Manual/Manual";
  import { ManualStore } from "../../stores/Manual";
  import { onDestroy } from "svelte";
  import { ActiveSection } from "../../stores/ActiveSection";
  import SectionDisplay from "./SectionDisplay.svelte";
  import { idb } from "../../utils/idb";

  let manual: Manual;
  const unsub = ManualStore.subscribe((val) => (manual = val));

  let timer: NodeJS.Timeout;
  $: {
    update(manual);
  }

  function update(m: Manual) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      idb("manuals", "put", JSON.parse(JSON.stringify(m)));
    }, 2000);
  }

  onDestroy(unsub);
</script>

<manual>
  <Contents />
  <div>
    {#if manual.isEditable}
      <h1 class="pane" contenteditable bind:innerHTML={manual.title} />
      {#if !$ActiveSection}
        <manual-body class="pane" contenteditable bind:innerHTML={manual.bodies[0]} />
      {:else}
        <SectionDisplay edit={true} />
      {/if}
    {:else}
      <h1 class="pane">{manual.title}</h1>
      {#if !$ActiveSection}
        <manual-body class="pane">{manual.bodies[0]}</manual-body>
      {:else}
        <SectionDisplay edit={false} />
      {/if}
    {/if}
  </div>
</manual>

<style>
  manual {
    display: flex;
    /* padding: 0 1.5em; */
  }
  div {
    flex-basis: 85%;
  }
  @media only screen and (max-width: 425px) {
    /* manual {
      position: relative;
    } */
    div {
      flex-basis: 100%;
    }
  }

  manual-body {
    display: block;
    min-height: 1em;
    /* min-width: 30em; */
  }
</style>
