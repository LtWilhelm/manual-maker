<script lang="ts">
  import { fly } from "svelte/transition";
  import Icon from "../Icon.svelte";
  import MenuItem from "./MenuItem.svelte";

  let shown: boolean = false;
  export let width: number;
</script>

<menu class:shown on:click={() => (shown = !shown)}>
  <div class="menu-icon"><img src="/favicon.png" alt="" /></div>

  {#if shown}
    {#if width > 425}
      <ul transition:fly={{ duration: 500, x: -200 }}>
        <MenuItem to="/">Home</MenuItem>
      </ul>
    {:else}
      <ul transition:fly={{ duration: 500, y: -200 }}>
        <MenuItem to="/">Home</MenuItem>
      </ul>
    {/if}
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
