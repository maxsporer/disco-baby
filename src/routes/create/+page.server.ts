import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import AWS from 'aws-sdk'
import { AWS_PUBLIC_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from '$env/static/private';

export function load({ cookies }) {
	if (!cookies.get('allowed')) {
		throw error(403, 'Forbidden');
	}
}

export const actions = {
	redirect: ({ cookies }) => {
		cookies.delete('allowed', { path: '/' });
		throw redirect(303, '/');
	},
	search: async ({ request }) => {
		const data = await request.formData();
		const q = data.get('query');
		try {
			const payload = await searchDeezerTracks(String(q))
			return { data : payload.data };
		} catch (error) {
			console.error('Error:', error)
		}
	}
};

async function searchDeezerTracks(q: string) {
	const api = `https://api.deezer.com/search?q=${q}`;

	try {
    const data = await fetch(api);
    return data.json();
  } catch (error) {
    console.error('Error invoking Lambda function:', error);
    throw error; // You can handle the error as needed
  }
}

async function searchSpotifyTracks(q: string, type: string = 'track', limit: number = 5) {
	// Configure AWS SDK with your credentials and region
	AWS.config.update({
		accessKeyId: AWS_PUBLIC_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
		region: 'us-east-2',
	});

	// Create an instance of the Lambda client
	const lambda = new AWS.Lambda();

	// Specify the parameters for the Lambda function invocation
	const params = {
		FunctionName: 'search_song',
		Payload: JSON.stringify({
			'params': {
				'q': q,
				'type': type,
				'limit': limit,
			}
		})
	};

	try {
    // Invoke the Lambda function
    const data = await lambda.invoke(params).promise();
    
    // Parse and return the payload
    return JSON.parse(data.Payload);
  } catch (error) {
    console.error('Error invoking Lambda function:', error);
    throw error; // You can handle the error as needed
  }
}
