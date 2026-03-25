import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const events = defineCollection({
	loader: glob({ base: './src/content/events', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		dateDisplay: z.string(),
		dateISO: z.coerce.date(),
		day: z.string(),
		time: z.string(),
		timeDetail: z.string(),
		category: z.string().optional(),
		descriptionFr: z.string(),
		descriptionEn: z.string(),
		artists: z.array(z.string()).default([]),
		sponsorHighlight: z.string().optional(),
		image: z.string(),
		ticketUrl: z.union([z.string().url(), z.literal('')]),
		specialNotes: z.array(z.string()).default([]),
		primaryReservationEmail: z.string().email().optional(),
		secondaryReservationEmail: z.string().email().optional()
	})
});

const settings = defineCollection({
	loader: glob({ base: './src/content/settings', pattern: 'site.json' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		dateRangeLabel: z.string(),
		location: z.string(),
		heroEyebrow: z.string(),
		heroTitle: z.string(),
		heroIntro: z.string(),
		reservationEmail: z.string().email(),
		dinnerMenuPath: z.string(),
		builderName: z.string(),
		builderUrl: z.string().url(),
		footerNote: z.string(),
		socialImage: z.string(),
		ticketPolicyFr: z.string(),
		ticketPolicyEn: z.string()
	})
});

export const collections = { events, settings };
