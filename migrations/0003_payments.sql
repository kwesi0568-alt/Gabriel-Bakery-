alter table orders add column if not exists payment_method text not null default 'pickup';
alter table orders add column if not exists payment_status text not null default 'pay_at_pickup';
alter table orders add column if not exists paid_cents integer;
alter table orders add column if not exists card_last4 text;
alter table orders add column if not exists card_brand text;
alter table orders add column if not exists paid_at timestamptz;

create table if not exists payments (
  id serial primary key,
  order_id integer not null references orders(id) on delete cascade,
  user_id text not null,
  amount_cents integer not null,
  status text not null,
  card_last4 text,
  card_brand text,
  created_at timestamptz not null default now()
);
create index if not exists payments_user_id_idx on payments (user_id);
create index if not exists payments_order_id_idx on payments (order_id);
