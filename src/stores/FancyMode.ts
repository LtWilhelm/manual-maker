import { writable } from 'svelte/store';

export const FancyModeStore = writable(JSON.parse(localStorage.getItem('fancyMode') || 'true'));