import { Client } from 'pg';
import { dBOptions } from './pg-client';

export const getProductsById = async (event) => {
  const { productId } = event.pathParameters;
  console.log(productId);
  const client = new Client(dBOptions);
  await client.connect();

  try {
    const { rows } = await client.query(`
      select p.id, title, description, price, count from products p
      inner join stocks s on p.id=s.product_id where p.id='${productId}'
    `);
    const product = rows[0];

    if (!product) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ error: 'Product not found' }),
      };
    }
  
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
};
