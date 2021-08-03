import { readable, writable } from 'svelte/store';
import { Manual } from '../classes/Manual/Manual';

export const ManualStore = writable(new Manual());

export const ReadOnlyManualStore = readable(new Manual());