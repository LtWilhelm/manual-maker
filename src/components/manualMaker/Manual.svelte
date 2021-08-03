<script lang="ts">
  import Contents from "./Contents.svelte";
  import { Manual } from "../../classes/Manual/Manual";
  import { ManualStore } from "../../stores/Manual";
  import { onDestroy, onMount } from "svelte";
  import { ActiveSection } from "../../stores/ActiveSection";
  import SectionDisplay from "./SectionDisplay.svelte";
  import { slimGet, slimPut } from "../../utils/slimFetch";

  let manual: Manual;
  const unsub = ManualStore.subscribe((val) => (manual = val));

  // onMount(() => {
  //   getFromServer();
  // })

  $: {
    localStorage.setItem("manual", JSON.stringify(manual));
  }

  onDestroy(unsub);

  async function saveToServer() {
    // await fetch("/api/manual", {
    //   method: "PUT",
    //   body: JSON.stringify(manual),
    // });
    await slimPut('/api/manual', manual);
  }

  async function getFromServer() {
    const data = await slimGet("/api/manual");
    manual = new Manual(data);
  }
</script>

<manual>
  <Contents />
  <div>
    {#if manual.isEditable}
      <h1 contenteditable bind:innerHTML={manual.title} />
      {#if !$ActiveSection}
        <manual-body contenteditable bind:innerHTML={manual.bodies[0]} />
      {:else}
        <SectionDisplay edit={true} />
      {/if}
      <button on:click={saveToServer}>Save To Server</button>
      <button on:click={getFromServer}>Get From Server</button>
    {:else}
      <h1>{manual.title}</h1>
      {#if !$ActiveSection}
        <manual-body>{manual.bodies[0]}</manual-body>
      {:else}
        <SectionDisplay edit={false} />
      {/if}
    {/if}
  </div>
</manual>

<style>
  manual {
    display: flex;
    padding: 0 1.5em;
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
