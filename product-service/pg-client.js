import { Client } from 'pg';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

export const dBOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,  
  },
  connectionTimeoutMillis: 5000,
};

export async function invokeDB() {
  const client = new Client(dBOptions);
  await client.connect();

  try {
    const table1 = await client.query(`
      create table if not exists products (
      id uuid primary KEY default uuid_generate_v4(),
      title text not null,
      description text,
      price integer
      )`);
    const table2 = await client.query(`
      create table if not exists stocks (
      id uuid primary key default uuid_generate_v4(),
      product_id uuid,
      count integer,
      foreign key ("product_id") references "products" ("id")
      )`);
    console.log(table1, table2);

    const result1 = await client.query(`
      insert into products (title, description, price) values
      ('Sid Meier"s Civilization: The Board Game', 'Lead your civilization to greatness in military, arts, science or economy', 40),
      ('Eclipse: Second Dawn for the Galaxy', 'Build an interstellar civilization by exploration, research, conquest, and diplomacy', 150),
      ('Through the Ages: A New Story of Civilization', 'Rewrite history as you build up your civilization in this epic card drafting game!', 50),
      ('Orléans', 'Craftsmen, scholars & monks can help you reign supreme—but who will turn up to help?', 45),
      ('Mage Knight Board Game', 'Build your hero"s spells, abilities, and artifacts as you explore & conquer cities', 80),
      ('Kemet', 'Play as warring Egyptian Gods and build the most powerful army to dominate Egypt.', 45),
      ('The Castles of Burgundy', 'Plan, trade, and build your Burgundian estate to prosperity and prominence', 40),
      ('Terraforming Mars', 'Compete with rival CEOs to make Mars habitable and build your corporate empire', 70),
      ('Sword & Sorcery', 'Heroes are resurrected to face dark forces and ancient evil assaulting Talon Coast', 80),
      ('Concordia', 'Lead your Roman dynasty and build the greatest trading empire in the Mediterranean', 45),
      ('Twilight Struggle', 'Relive the Cold War and rewrite history in an epic clash between the USA and USSR', 55),
      ('Brass: Birmingham', 'Build networks, grow industries, and navigate the world of the Industrial Revolution', 65),
      ('Twilight Imperium: Fourth Edition', 'Build an intergalactic empire through trade, research, conquest and grand politics', 140),
      ('Eldritch Horror', 'An unknown Elder God approaches the world—and you must solve mysteries to stop it', 55),
      ('Wingspan', 'Attract a beautiful and diverse collection of birds to your wildlife reserve', 45),
      ('Nemesis', 'Survive an alien-infested spaceship but beware of other players and their agendas', 170),
      ('Everdell', 'Use resources to build a village of critters and constructions in this woodland game', 45),
      ('Viticulture Essential Edition', 'Create the most prosperous winery in Italy from the Tuscan vineyard you"ve inherited', 85)
    `);

    const result2 = await client.query(`
      insert into stocks (product_id, count) values
      ((select id from products where title = 'Sid Meier"s Civilization: The Board Game'), 4),
      ((select id from products where title = 'Eclipse: Second Dawn for the Galaxy'), 7),
      ((select id from products where title = 'Through the Ages: A New Story of Civilization'), 8),
      ((select id from products where title = 'Orléans'), 1),
      ((select id from products where title = 'Mage Knight Board Game'), 2),
      ((select id from products where title = 'Kemet'), 11),
      ((select id from products where title = 'The Castles of Burgundy'), 6),
      ((select id from products where title = 'Terraforming Mars'), 2),
      ((select id from products where title = 'Sword & Sorcery'), 4),
      ((select id from products where title = 'Concordia'), 9),
      ((select id from products where title = 'Twilight Struggle'), 8),
      ((select id from products where title = 'Brass: Birmingham'), 1),
      ((select id from products where title = 'Twilight Imperium: Fourth Edition'), 2),
      ((select id from products where title = 'Eldritch Horror'), 11),
      ((select id from products where title = 'Wingspan'), 6),
      ((select id from products where title = 'Nemesis'), 2),
      ((select id from products where title = 'Everdell'), 4),
      ((select id from products where title = 'Viticulture Essential Edition'), 9);
    `);
    console.log(result1, result2);
  } catch (error) {
    console.log(`DB request error: ${error}`);
  } finally {
    client.end();
  }
};
