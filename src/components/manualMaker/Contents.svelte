<script lang="ts">
  import { Section as Sec } from "../../classes/Manual/Section";
  import Section from "./Section.svelte";
  import { fly } from "svelte/transition";
  import Icon from "../Icon.svelte";
  import { IsMobile } from "../../stores/IsMobile";
  import { ManualStore as manual, ManualStore } from "../../stores/Manual";
  import { ActiveSectionId } from "../../stores/ActiveSection";
  import { flip } from "svelte/animate";
  import ManualService from "../../services/ManualService";
  import { Manual } from "../../classes/Manual/Manual";

  let visible = false;

  async function addSection() {
    const sec = new Sec();
    sec.manualId = $ManualStore._id;
    await ManualService.createSection(sec);
    ManualStore.set(
      new Manual(await ManualService.getById($ManualStore._id), true)
    );
  }
</script>

<contents class:visible class="thin-scroller">
  <div>
    <button class="show" on:click={() => (visible = !visible)}
      ><Icon icon="telescope" /></button
    >
    <div>
      {#if visible || !$IsMobile}
        <div class="pane" transition:fly={{ duration: 300, x: -200 }}>
          <h3 on:click={() => ActiveSectionId.set("")}>{$manual.title}</h3>
          {#each $manual.sections as section (section.uuid)}
            <div animate:flip={{ duration: 300 }}>
              <Section {section} on:close={() => (visible = !visible)} />
            </div>
          {/each}
        </div>
      {/if}
      <button class="add green" on:click={addSection}>Add Section</button>
    </div>
  </div>
</contents>

<style>
  contents {
    /* border-right: 1px solid white;
    border-image: linear-gradient(
        to bottom,
        var(--trans) 5%,
        white,
        var(--trans) 95%
      )
      1 100%; */
    /* direction: rtl; */
  }

  .pane {
    margin: 1rem;
    margin-left: 0;
  }
  .pane > h3 {
    margin-top: 0;
  }

  contents > div > div {
    max-width: 100%;
    max-height: 100vh;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
  }

  h3 {
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
  }

  button.show {
    display: none;
    position: absolute;
    /* top: 0; */
    bottom: 5px;
    left: calc(100% + 5px);
    font-size: 8px;
  }

  button.add {
    /* font-weight: bold; */
    /* font-size: large; */
    /* text-align: center; */
    margin-left: auto;
  }

  @media only screen and (min-width: 425px) {
    contents {
      flex-basis: 15%;
      /* margin-right: 1em;
      padding-right: 10px; */
    }
  }
  @media only screen and (max-width: 425px) {
    contents {
      position: fixed;
      top: 0;
      /* bottom: 0; */
      height: 100%;
      right: 100%;
      background-color: black;
      transition: 300ms ease-out;
      left: 0;
      z-index: 1;
    }

    contents.visible {
      right: 10%;
    }

    /* contents > div > div {
      overflow-x: hidden;
      white-space: nowrap;
    } */

    button.show {
      display: inline-block;
    }
    contents > div {
      position: relative;
    }
  }
</style>
