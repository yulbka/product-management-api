import AWS from 'aws-sdk';
import csv from 'csv-parser';

const BUCKET = 'task-5-data';

export async function importFileParser(event) {
    const s3 = new AWS.S3({ region: 'eu-west-1', signatureVersion: 'v4' });
    event.Records.forEach(record => {    
      console.log(`record: ${record}`);    
      const s3Stream = s3.getObject({
          Bucket: BUCKET,
          Key: record.s3.object.key
      }).createReadStream();

      s3Stream.pipe(csv())
          .on('data', (data) => {
              console.log(`importFileParser data: ${data}`);
          });
  });
}