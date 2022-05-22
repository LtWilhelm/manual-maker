<script lang="ts">
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import Menu from "./components/menu/Menu.svelte";
  import { FancyModeStore } from "./stores/FancyMode";
import Spinner from './components/Spinner.svelte';

  let width: number;
</script>

<main class={$FancyModeStore ? 'fancyMode' : ''} bind:clientWidth={width}>
  <Menu {width} />
  <div>
    <Router {routes} />
  </div>
  <Spinner />
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    /* background-color: #00000080; */
    background-image: linear-gradient(
      165deg,
      #00000080,
      #00000080 40%,
      var(--bg) 40%
    );
    margin: 0;
    overflow: auto;
    /* backdrop-filter: blur(1px); */
    display: flex;
  }
  div {
    /* margin: 1.5em; */
    flex: 1;
    margin: 0 3rem 0 0;
  }

  @media only screen and (max-width: 420px) {
    main {
      display: block;
    }
    div {
      margin: 0 1.5em;
    }
  }
</style>
