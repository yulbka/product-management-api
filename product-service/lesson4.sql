create table products (
 id uuid primary KEY default uuid_generate_v4(),
 title text not null,
 description text,
 price integer
)

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


create table stocks (
id uuid primary key default uuid_generate_v4(),
product_id uuid,
count integer,
foreign key ("product_id") references "products" ("id")
)

insert into stocks (product_id, count) values
('d241cb32-a3cb-4a4c-85ab-5b44f655a81f', 15),
('7e3487d7-436a-4ebe-bb83-61305541b60c', 3),
('665a77bc-955e-44a9-a5da-58029abbc2b4', 11),
('aab81d81-d83c-43f7-81d8-56cf6f049946', 22),
('f6616b31-08b4-4d91-9e33-54497ce9e2a6', 5),
('cfcc8c30-a23e-460c-80dc-f216fb6f2e82', 18),
('55c048f7-2ddf-47da-9256-d2f281b98f77', 34),
('5dbd87a8-e00f-4f00-b754-0e748fa61f46', 25),
('66ff40e2-497b-4d49-becf-0fde41834f4c', 5),
('d4ab5f0b-ff91-4463-a1b6-8245b740149d', 7),
('8a7bc65a-7a4e-4b5d-b088-9a76e1dd9baa', 8),
('67ffdca9-968b-4963-a597-b3339512e8c2', 10),
('5baee5da-a7a9-431a-9d85-93f1490bce76', 4),
('49f17905-88aa-460d-b12a-b85e702a1395', 6),
('aed9c4c5-5ab3-46e5-8130-5796df0defff', 9),
('6844ac2d-ca63-4c00-a65b-90780501da82', 3),
('2180d431-ae85-4a88-b560-620d0689e551', 7),
('d9b14766-8940-4035-9e7a-f51554068dd8', 10)

create extension if not exists "uuid-ossp"
