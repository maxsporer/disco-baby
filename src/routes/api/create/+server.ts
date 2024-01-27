import AWS from 'aws-sdk'
import { AWS_PUBLIC_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from '$env/static/private';
import {v4 as uuidv4} from 'uuid';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
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
			'preview': {'S': selection['preview']},
			'cover': {'S': selection['album']['cover_xl']}
		},
	};

	dynamodb.putItem(params, function(err) {
		if (err) {
			console.log("Error: ", err);
			return err;
		}
	});

	return json(myuuid);
}
