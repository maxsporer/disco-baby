import AWS from 'aws-sdk'
import { AWS_PUBLIC_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { postRedirectPath, challengeTrack } from '$lib/stores/stores.js';
import type { ChallengeData } from '$lib/types.js';

export async function load({ cookies, url }) {
	if (!cookies.get('allowed')) {
		postRedirectPath.set(url.pathname + url.search);
		throw redirect(307, '/');
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
		return data;
	} catch (error) {
		console.log("Error", error);
		throw error;
	}
}
