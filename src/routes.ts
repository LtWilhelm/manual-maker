import NotFound from './pages/NotFound.svelte';
import Home from './pages/Home.svelte';
import Manual from './components/manualMaker/Manual.svelte';
import Editor from './pages/Editor.svelte';

export default {
  '/': Home,
  '/manual/view/:id': Editor,
  '/manual/:id': Editor,
  '*':NotFound
}