create table if not exists menu_items (
  id serial primary key,
  slug text not null unique,
  name text not null,
  description text not null,
  category text not null,
  price_cents integer not null,
  image_path text not null,
  featured boolean not null default false,
  serves text,
  allergens text,
  sort_order integer not null default 0
);

create table if not exists ratings (
  id serial primary key,
  user_id text not null,
  item_id integer not null references menu_items(id) on delete cascade,
  stars integer not null check (stars between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  unique (user_id, item_id)
);
create index if not exists ratings_item_id_idx on ratings (item_id);
create index if not exists ratings_user_id_idx on ratings (user_id);

create table if not exists orders (
  id serial primary key,
  user_id text not null,
  kind text not null check (kind in ('pickup', 'bulk', 'catering')),
  status text not null default 'requested',
  event_date date,
  event_time text,
  guest_count integer,
  contact_name text,
  contact_phone text,
  notes text,
  created_at timestamptz not null default now()
);
create index if not exists orders_user_id_idx on orders (user_id);

create table if not exists order_items (
  id serial primary key,
  order_id integer not null references orders(id) on delete cascade,
  item_id integer not null references menu_items(id),
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null
);

insert into menu_items (slug, name, description, category, price_cents, image_path, featured, serves, allergens, sort_order)
values
  (
    'country-sourdough',
    'Country Sourdough',
    'A naturally leavened boule with a blistered caramel crust and an open, tangy crumb. Mixed the night before and baked on the stone before dawn.',
    'bread',
    800,
    '/images/sourdough.jpg',
    true,
    '8–10 slices',
    'Wheat',
    10
  ),
  (
    'olive-focaccia',
    'Olive Focaccia',
    'Dimpled slab bread soaked in our own olive oil, studded with green olives and rosemary. Tear it at the table.',
    'bread',
    900,
    '/images/focaccia.jpg',
    true,
    'Serves 6',
    'Wheat',
    20
  ),
  (
    'seeded-rye',
    'Seeded Rye',
    'Dark, moist rye with sunflower, flax, and sesame. Built for smoked fish, sharp cheese, and a long afternoon.',
    'bread',
    850,
    '/images/rye.jpg',
    false,
    '10 slices',
    'Wheat, rye, sesame',
    30
  ),
  (
    'brioche-loaf',
    'Brioche Loaf',
    'A golden, egg-rich loaf with a buttery crumb. Toast it, or let it become tomorrow’s French toast.',
    'bread',
    1000,
    '/images/brioche.jpg',
    false,
    '10 slices',
    'Wheat, egg, milk',
    40
  ),
  (
    'butter-croissant',
    'Butter Croissant',
    'Seventy-two layers of European butter. Shatter on the first bite, honeycomb within.',
    'pastry',
    450,
    '/images/croissant.jpg',
    true,
    '1 pastry',
    'Wheat, milk, egg',
    50
  ),
  (
    'almond-croissant',
    'Almond Croissant',
    'Yesterday’s croissant, split and filled with frangipane, baked again until the almonds toast.',
    'pastry',
    550,
    '/images/almond-croissant.jpg',
    false,
    '1 pastry',
    'Wheat, milk, egg, tree nuts',
    60
  ),
  (
    'kouign-amann',
    'Kouign-Amann',
    'Breton sugar pastry, caramelized at the edges and still tender at the heart. A little salt, a lot of butter.',
    'pastry',
    600,
    '/images/kouign-amann.jpg',
    false,
    '1 pastry',
    'Wheat, milk',
    70
  ),
  (
    'morning-bun',
    'Morning Bun',
    'A croissant spiral rolled in cinnamon, orange zest, and sugar. Best still warm from the oven.',
    'pastry',
    475,
    '/images/morning-bun.jpg',
    false,
    '1 pastry',
    'Wheat, milk, egg',
    80
  ),
  (
    'olive-oil-citrus-cake',
    'Olive Oil Citrus Cake',
    'A whole cake for the table: tender crumb, lemon glaze, candied citrus. We bake them on Fridays and Saturdays.',
    'cake',
    3800,
    '/images/citrus-cake.jpg',
    true,
    'Serves 8–10',
    'Wheat, egg',
    90
  ),
  (
    'chocolate-ganache-torte',
    'Chocolate Ganache Torte',
    'Dense, quiet chocolate. A thin mirror of ganache. Meant to be sliced thin after dinner.',
    'cake',
    4200,
    '/images/chocolate-torte.jpg',
    false,
    'Serves 10',
    'Wheat, egg, milk',
    100
  ),
  (
    'seasonal-fruit-tart',
    'Seasonal Fruit Tart',
    'A flaky shell, almond cream, and whatever fruit is honest this week — stone fruit in summer, citrus in winter.',
    'cake',
    3600,
    '/images/fruit-tart.jpg',
    false,
    'Serves 8',
    'Wheat, egg, milk, tree nuts',
    110
  ),
  (
    'ham-gruyere-croissant',
    'Ham & Gruyère Croissant',
    'Our butter croissant, folded around smoked ham and melted Gruyère. The lunch we make for ourselves.',
    'savory',
    650,
    '/images/ham-gruyere.jpg',
    false,
    '1 sandwich',
    'Wheat, milk, egg',
    120
  ),
  (
    'spinach-feta-danish',
    'Spinach & Feta Danish',
    'Laminated pastry with wilted spinach, lemon, and salty feta. A savory pause between the sweet things.',
    'savory',
    525,
    '/images/spinach-feta.jpg',
    false,
    '1 pastry',
    'Wheat, milk, egg',
    130
  )
on conflict (slug) do nothing;
