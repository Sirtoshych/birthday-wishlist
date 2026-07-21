async function readItems(kv) {
  const raw = await kv.get('items');
  return raw ? JSON.parse(raw) : [];
}

async function writeItems(kv, items) {
  await kv.put('items', JSON.stringify(items));
}

export async function onRequestGet({ env }) {
  const items = await readItems(env.ITEMS_KV);
  return Response.json(items);
}

export async function onRequestPost({ request, env }) {
  const body = await request.json();
  if (!body.name || typeof body.name !== 'string') {
    return new Response('Item name is required', { status: 400 });
  }
  const items = await readItems(env.ITEMS_KV);
  const item = {
    id: crypto.randomUUID(),
    name: body.name,
    link: body.link || '',
    image: body.image || '',
    price: body.price || '',
    notes: body.notes || '',
    claimed: false
  };
  items.push(item);
  await writeItems(env.ITEMS_KV, items);
  return Response.json(item);
}
