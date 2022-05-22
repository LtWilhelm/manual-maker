<script lang="ts">
  import { onDestroy } from "svelte";

  import { fly } from "svelte/transition";
  import { FancyModeStore } from "../../stores/FancyMode";
  import Icon from "../Icon.svelte";
  import MenuItem from "./MenuItem.svelte";

  let shown: boolean = false;
  export let width: number;

  const unsub = FancyModeStore.subscribe((val) =>
    localStorage.setItem("fancyMode", JSON.stringify(val))
  );
  onDestroy(unsub);

  const transitionConfig = { duration: 500, x: 0, y: 0 };
  width > 425 ? (transitionConfig.y = -200) : (transitionConfig.x = -200);

  function toggleFancy () {
    FancyModeStore.update(val => !val);
  }
</script>

<menu class:shown on:click={() => (shown = !shown)}>
  <div class="menu-icon"><img src="/favicon.png" alt="" /></div>

  {#if shown}
    <ul transition:fly={transitionConfig}>
      <MenuItem to="/">Home</MenuItem>
      <li><button on:click={toggleFancy}>Turn {$FancyModeStore ? 'off' : 'on'} fancy mode</button></li>
    </ul>
  {/if}
</menu>

<style>
  div.menu-icon {
    cursor: pointer;
    font-size: 2em;
    margin: 0;
    background-image: radial-gradient(#654545, #00000000 30%);
    animation: glow 1s ease-in-out normal forwards;
    background-position: 50% 50%;
    width: 3rem;
    height: 3rem;

    display: grid;
  }

  div.menu-icon:hover {
    background-image: radial-gradient(#454565, #00000000 30%);
  }

  .menu-icon img {
    width: 2rem;
    transition: 0.2s;
    place-self: center;
  }
  .menu-icon:hover img {
    width: 2.2rem;
  }

  :not(.shown) div.menu-icon {
    animation: glow 3s ease-in-out infinite alternate;
    text-align: center;
  }

  @keyframes glow {
    from {
      background-size: 100% 100%;
    }
    to {
      background-size: 200% 200%;
    }
  }

  menu {
    flex-basis: 5%;
    transition: 500ms;
    padding: 0 20px;
    margin: 0;
  }

  menu.shown {
    flex-basis: 10%;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  @media only screen and (max-width: 425px) {
    menu,
    menu.shown {
      flex-basis: 100%;
    }

    menu {
      position: sticky;
      top: 0;
    }
  }
</style>
