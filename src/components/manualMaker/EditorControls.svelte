<script>
  function format(command, value) {
    document.execCommand(command, false, value);
  }
</script>

<div class="pane editor-controls">
  <div
    on:click={(e) => {
      e.preventDefault();
      format("bold");
    }}
  >
    <strong>B</strong>
  </div>
  <div
    on:click={(e) => {
      e.preventDefault();
      format("italic");
    }}
  >
    <em>i</em>
  </div>
  <div
    on:click={(e) => {
      e.preventDefault();
      format("underline");
    }}
  >
    <u>U</u>
  </div>
</div>

<style>
  .editor-controls {
    display: flex;
  }
  .editor-controls div {
    width: 2rem;
    height: 2rem;
    border-radius: 3px;
    display: grid;
    place-content: center;
    cursor: pointer;
  }

  .editor-controls div:hover {
    background-color: #ffffff30;
  }
</style>
