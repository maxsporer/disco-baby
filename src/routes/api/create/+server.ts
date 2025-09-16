import AWS from 'aws-sdk'
import { AWS_PUBLIC_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from '$env/static/private';
import {v4 as uuidv4} from 'uuid';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, setHeaders }) {
  // Prevent caching of this endpoint
  setHeaders({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });

  const { selection } = await request.json();

  // Configure AWS SDK with your credentials and region
	AWS.config.update({
		accessKeyId: AWS_PUBLIC_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
		region: 'us-east-2',
	});

  // Create an instance of the DynamoDB client
	const dynamodb = new AWS.DynamoDB();

	const myuuid = uuidv4();

	const params = {
		TableName: "challenges",
		Item: {
			'id': {'S': myuuid},
			'deezer_id': {'S': selection['id'].toString()},
			'title': {'S': selection['title']},
			'artist': {'S': selection['artist']['name']},
			'artist_id': {'S': selection['artist']['id'].toString()},
			'cover': {'S': selection['album']['cover_xl']}
		},
	};

	try {
		await dynamodb.putItem(params).promise();
		return json(myuuid);
	} catch (err) {
		console.log("Error: ", err);
		return json({ error: 'Failed to create challenge' }, { status: 500 });
	}
}
