import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	redirect(308, '/images/brand_strategy_logo_white.svg');
};
