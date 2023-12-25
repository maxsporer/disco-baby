import AWS from 'aws-sdk'
import { AWS_PUBLIC_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from '$env/static/private';
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
    throw error;
  }
}

