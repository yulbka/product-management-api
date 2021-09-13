import { Client } from 'pg';
import { dBOptions } from './pg-client';

export const getProductsList = async () => {
  const client = new Client(dBOptions);
  await client.connect();

  try {
    const { rows } = await client.query(`
      select p.id, title, description, price, count from products p
      inner join stocks s on p.id=s.product_id
    `);
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        rows,
        null,
        2
      ),
    };
  } catch (error) {
    console.log(`DB error: ${error}`);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ error: 'Something went wrong' }),
    }
  } finally {
    client.end();
  }
};
