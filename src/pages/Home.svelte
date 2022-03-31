<script lang="ts">
  import { onMount } from "svelte";
  import { Manual } from "../classes/Manual/Manual";
  import { link } from "svelte-spa-router";

  import ManualService from "../services/ManualService";
  import { idb } from "../utils/idb";

  let manuals: Manual[] = [];
  onMount(getManuals);

  async function getManuals() {
    const temp = await ManualService.getAll();
    console.log(temp);
    manuals = temp.map((m: Manual) => new Manual(m));
  }

  async function createManual() {
    const manual = new Manual();
    await ManualService.create(manual);
  }

  const formatBody = (s: string) => {
    s = s.replaceAll(/<[^>]*>/g, "");
    return s.slice(0, 300) + (s.length > 300 ? "..." : "");
  };
</script>

<h1>Manual Maker</h1>
<p>
  Manual Maker is a user friendly tool made to easily organize any type of
  Manual.
</p>

<card-container>
  {#each manuals as manual}
    <card class="pane">
      <a href={"/manual/" + manual._id} use:link>
        <div>
          {#if manual.img}
            <div class="image-container">
              <img src={manual.img} alt={manual.title + " manual image"} />
            </div>
          {/if}
          <h2>{manual.title}</h2>
          <p>
            {formatBody(manual.bodies[0])}
          </p>
          <p>
            {manual.sections.length} sections
          </p>
        </div>
      </a>
    </card>
  {/each}
  <card class="pane">
    <button on:click={createManual}>+</button>
  </card>
</card-container>

<style>
  card-container {
    display: grid;
    column-gap: 2rem;
    row-gap: 2rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: 400px;
  }

  card-container card {
    /* margin: 1rem; */
    flex-basis: 30%;
  }

  card {
    /* border: 1px solid var(--text); */
    /* border-radius: 2rem; */
    /* background-color: rgba(0,0,0,0);
    backdrop-filter: blur(10px); */
    /* padding: 1rem; */
    overflow: hidden;
  }

  card>a>div {
    width: 100%;
    height: 100%;
    padding-top: 1rem;
  }

  card>a>div>*:not(.image-container) {
    margin: 1rem;
  }
  card>a>div>*:first-child {
    margin-top: 0;
  }

  card button {
    margin: 0;
    width: 100%;
    height: 100%;
    font-size: 700%;
    border: none;
  }

  card a {
    text-decoration: none;
  }

  .image-container {
    width: 100%;
    height: 130px;
    overflow: hidden;
  }

  .image-container img {
    width: 100%;
  }

  @media screen and (max-width: 425px) {
    card-container {
      grid-template-columns: 1fr;
    }
  }
</style>
