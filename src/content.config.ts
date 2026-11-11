import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// src/content/blog/ にある記事ファイル（.md / .mdx）を読み込む
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// 記事の先頭に書く情報のルール
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			category: z.enum(['kids', 'money', 'ai', 'trend']).default('trend'),
			tags: z.array(z.string()).default([]),
			// 商品紹介リンクを含む記事は true（記事の上に「PR」表記が出る）
			hasPR: z.boolean().default(true),
			// true にすると公開されない（下書き）
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
