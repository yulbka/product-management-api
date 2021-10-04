import { createProduct } from './createProduct';

export async function catalogBatchProcess(event) {
  console.log(`Batch event: ${event}`);
  try {
    for (const record of event.Records) {
      const product = await createProduct(event.body);
    }

    return {
      statusCode: 200,
    };
  } catch (err) {
    console.log(`Batch error: ${err}`);
  }
}