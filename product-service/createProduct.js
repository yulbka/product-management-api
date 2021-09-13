import { Client } from 'pg';
import { dBOptions } from './pg-client';

export const createProduct = async (event) => {
  const { title, description = '', price, count } = JSON.parse(event.body);
  console.log(title, description, price, count);
  const client = new Client(dBOptions);
  await client.connect();

  try {
    const { rows } = await client.query(`
      insert into products(title, description, price) values ($1, $2, $3) returning *
    `, [title, description, price]);
    console.log(rows);

    const { id } = rows[0];
    await client.query(`
      insert into stocks (product_id, count) values ($1, $2)
    `, [id, count]);

    const product = { ...rows[0], count };

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        product,
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
}