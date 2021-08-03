import { derived, writable } from 'svelte/store';
import { ManualStore } from './Manual';

export const ActiveSectionId = writable('');
export const ActiveSection = derived([ActiveSectionId, ManualStore], ([$ActiveSectionId, $ManualStore]) => $ManualStore.findSection($ActiveSectionId));