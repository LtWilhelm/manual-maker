<script lang="ts">
  import { Section } from "../../classes/Manual/Section";
  import { ActiveSectionId } from "../../stores/ActiveSection";
  import { ManualStore } from "../../stores/Manual";
  import { flip } from "svelte/animate";
  import { createEventDispatcher } from "svelte";

  export let section: Section;
  let active = $ActiveSectionId === section.uuid;

  $: {
    active = $ActiveSectionId === section.uuid;
  }

  const dispatch = createEventDispatcher();

  function selectSection(e: Event) {
    e.stopPropagation();
    ActiveSectionId.set(section.uuid);
    const url = window.location.href.split('?');
    url[1] = `section=${section.uuid}`
    window.location.href = url.join('?');
    dispatch("close");
  }

  function addSection() {
    section.type = "group";
    ManualStore.update((m) =>
      m.updateSection(section.addSection(new Section()))
    );
  }
</script>

<manual-section
  class:group={section.type === "group"}
  class:active
  on:click={selectSection}
>
  <div class="title">
    <span>{section.title}</span>
    {#if active}
      <button on:click={addSection}>+</button>
    {/if}
  </div>
  {#if section.type === "group"}
    <children class:active={section.hasSection($ActiveSectionId)}>
      {#each section.sections as section (section.uuid)}
        <div class="child" animate:flip={{ duration: 300 }}>
          <child /><svelte:self {section} on:close />
        </div>
      {/each}
    </children>
  {/if}
</manual-section>

<style>
  manual-section {
    transition: 300ms;
    padding: 0;
    margin-right: 10px;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    width: 100%;
  }
  manual-section.group > .title > span {
    font-weight: bold;
  }
  manual-section.active > .title > span {
    border-bottom: 1px solid white;
    border-image: linear-gradient(
        to right,
        var(--trans) 5%,
        white,
        var(--trans) 95%
      )
      1 1;
    /* border-radius: 5px; */
    padding: 5px;
  }

  div.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div.title button {
    font-weight: bold;
    font-size: large;
    width: 1.5em;
    height: 1.5em;
  }

  children {
    display: block;
    width: 100%;
    border-left: var(--trans) 1px solid;
    margin-left: 5px;
  }
  children:hover,
  children:hover manual-section children:not(.active) {
    border-left: #dcdcdc80 1px solid;
  }
  children.active {
    border-left: #dcdcdcf0 1px solid;
    /* border-left: white 1px solid; */
  }

  div.child {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  child {
    min-width: 1em;
    height: 1em;
    margin-right: 3px;
    position: relative;
  }

  .notches manual-section child::before {
    content: "";
    border-left: solid 1px #dcdcdc80;
    border-bottom: solid 1px #dcdcdc80;
    width: 0.5em;
    height: 0.5em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
