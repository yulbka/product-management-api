import AWS from 'aws-sdk';

const BUCKET = 'task-5-data';

export async function importProductsFile(event) {
  try {
    const { name } = event.queryStringParameters;
    const key = `uploaded/${name}`;
    const s3 = new AWS.S3({ region: 'eu-west-1', signatureVersion: 'v4' });
    const params = {
      Bucket: BUCKET,
      Key: key,
      ContentType: 'text/csv',
    };  
    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
    console.log(signedUrl);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        signedUrl,
        null,
        2
      ),
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ error }),
    }
  }  
}