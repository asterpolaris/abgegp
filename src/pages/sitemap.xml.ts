import type { APIRoute } from 'astro';
import { getSortedEvents, eventHref } from '../lib/site';

const site = 'https://abgegp.com';

export const GET: APIRoute = async () => {
	const events = await getSortedEvents();
	const urls = [
		{ loc: `${site}/`, priority: '1.0' },
		...events.map((event) => ({
			loc: `${site}${eventHref(event)}`,
			priority: '0.8'
		}))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(url) => `  <url>
    <loc>${url.loc}</loc>
    <priority>${url.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
};
