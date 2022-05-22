<script lang="ts">
  import { isLoading } from "../stores/Status";
</script>

{#if $isLoading}
  <loader>
    <bars>
      <div><span /></div>
      <div><span /></div>
      <div><span /></div>
      <div><span /></div>
      <div><span /></div>
    </bars>
    <p>Working...</p>
  </loader>
{/if}


<style>
  loader {
    position: fixed;
    top: 2rem;
    right: 2rem;
    
    /* height: 7rem; */
    
  }
  
  bars {
    display: grid;
    
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 50px auto;
    /* column-gap: 1rem; */
    background-color: #00000080;
    border-radius: 50%;
    overflow: hidden;
    margin: auto;
    width: max-content;
  }

  div {
    position: relative;
    overflow: hidden;
    width: 10px;
  }

  span {
    display: block;
    width: 100%;
    /* background-color: orange; */
    /* border: red dashed 2px; */
    background-color: lightblue;
    animation: bar 1000ms linear infinite;
    position: absolute;
    /* min-height: 0; */
    /* left: 50%; */
    /* left: calc((100% + 10px)/2); */
    /* left: calc(50% - 1.5px); */
  }

  div:nth-child(2) span {
    animation-delay: 300ms;
    animation-duration: 3500ms;
  }
  div:nth-child(3) span {
    animation-delay: 600ms;
    animation-duration: 1000ms;
    background-color: white;
  }
  div:nth-child(4) span {
    animation-delay: 400ms;
    animation-duration: 2500ms;
  }
  div:nth-child(5) span {
    animation-delay: 300ms;
    animation-duration: 1500ms;
  }
  div:nth-child(2) span,div:nth-child(4) span {
    background-color: pink;
  }

  p {
    grid-column: span 5;
    margin: 0;
  }
  
  @keyframes bar {
    /* 0% {
      top: 0;
    }
    50% {
      top: 0;
      bottom: 0;
    }
    100% {
      top: 7rem;
      bottom: 0;
    } */
    from {
      top: -70px;
      height: 0;
    }
    to {
      top: 70px;
      height: 500px;
    }
  }
</style>
