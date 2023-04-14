import type { PageServerLoad, Actions } from './$types';
import prisma from '$lib/prisma';
import { fail, redirect, error } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const recordSchema = z.object({
	title: z.string().min(1).max(100).trim(),
	content: z.string().min(1).max(500).trim(),
});

export const load: PageServerLoad = async () => {
	const records = await prisma.record.findMany();

	const form = await superValidate(recordSchema);

	return { form, records };
};

export const actions: Actions = {
	createRecord: async ({ request, locals }) => {
		const { user, session } = await locals.auth.validateUser();
		if (!(user && session)) {
			throw redirect(302, '/');
		}

		const form = await superValidate(request, recordSchema);
		console.log(form);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { title, content } = form.data;

		try {
			await prisma.record.create({
				data: {
					title,
					content,
					authUserId: user.userId,
				},
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'не удалось создать' });
		}

		return { status: 201 };
	},

	deleteRecord: async ({ url, locals }) => {
		const id = url.searchParams.get('id');

		if (!id) {
			return fail(400, { message: 'плохой реквест' });
		}

		const { user, session } = await locals.auth.validateUser();
		if (!(user && session)) {
			throw redirect(302, '/');
		}

		const record = await prisma.record.findUniqueOrThrow({
			where: {
				id: id,
			},
		});

		if (record.authUserId !== user.userId) {
			throw error(403, 'Вы не можете удалять чужие записи');
		}

		try {
			await prisma.record.delete({ where: { id: id } });
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'не удалось создать' });
		}

		return { status: 200 };
	},
};
