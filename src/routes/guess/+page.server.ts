import AWS from 'aws-sdk'
import { AWS_PUBLIC_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { postRedirectPath } from '$lib/stores/stores.js';

export async function load({ cookies, url }) {
	if (!cookies.get('allowed')) {
		postRedirectPath.set(url.pathname + url.search);
		redirect(307, '/');
	}

	const id: string = url.searchParams.get('id') ?? '';

	// Configure AWS SDK with your credentials and region
	AWS.config.update({
		accessKeyId: AWS_PUBLIC_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
		region: 'us-east-2',
	});

	// Create an instance of the DynamoDB client
	const dynamodb = new AWS.DynamoDB();
	
	var params: AWS.DynamoDB.GetItemInput = {
		TableName: "challenges",
		Key: {
			'id': {S: id},
		},
	};

	try {
		const data = await dynamodb.getItem(params).promise();
		
		// Check if no item was found or if the item is missing required fields
		if (!data.Item || !data.Item.deezer_id || !data.Item.deezer_id.S) {
			redirect(307, '/error?message=Challenge not found');
		}
		
		// If we found the challenge, fetch fresh preview URL from Deezer
		const deezerTrack = await fetchDeezerTrack(data.Item.deezer_id.S);
		if (deezerTrack && deezerTrack.preview) {
			// Add the fresh preview URL to the response
			data.Item.preview = { S: deezerTrack.preview };
		}
		
		return data;
	} catch (error) {
		console.log("Error", error);
		redirect(307, '/error?message=Database error');
	}
}

async function fetchDeezerTrack(trackId: string) {
	const api = `https://api.deezer.com/track/${trackId}`;
	
	try {
		const response = await fetch(api);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching track from Deezer:', error);
		return null;
	}
}
