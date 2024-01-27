import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { q } = await request.json();
  
  try {
    const payload = await searchDeezerTracks(String(q))
		return json(payload.data);
  } catch (error) {
    console.error('Error searching for tracks:', error);
		throw error;
  }
}

async function searchDeezerTracks(q: string) {
	const api = `https://api.deezer.com/search?q=${q}`;

	try {
    const data = await fetch(api);
    return data.json();
  } catch (error) {
    console.error('Error fetching from Deezer api', error);
    throw error;
  }
}
