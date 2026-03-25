import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export async function getSortedEvents() {
	return (await getCollection('events')).toSorted(
		(a, b) => a.data.dateISO.getTime() - b.data.dateISO.getTime()
	);
}

export async function getSiteSettings() {
	const settingsEntry = await getEntry('settings', 'site');

	if (!settingsEntry) {
		throw new Error('Missing site settings content entry.');
	}

	return settingsEntry.data;
}

export function eventHref(event: Pick<CollectionEntry<'events'>, 'id'>) {
	return `/events/${event.id}/`;
}
