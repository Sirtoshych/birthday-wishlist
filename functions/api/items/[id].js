async function readItems(kv) {
  const raw = await kv.get('items');
  return raw ? JSON.parse(raw) : [];
}

async function writeItems(kv, items) {
  await kv.put('items', JSON.stringify(items));
}

export async function onRequestPut({ request, env, params }) {
  const patch = await request.json();
  const items = await readItems(env.ITEMS_KV);
  const idx = items.findIndex((i) => i.id === params.id);
  if (idx === -1) {
    return new Response('Item not found', { status: 404 });
  }
  const allowed = ['name', 'link', 'image', 'price', 'notes', 'claimed'];
  for (const key of allowed) {
    if (key in patch) items[idx][key] = patch[key];
  }
  await writeItems(env.ITEMS_KV, items);
  return Response.json(items[idx]);
}

export async function onRequestDelete({ env, params }) {
  const items = await readItems(env.ITEMS_KV);
  const next = items.filter((i) => i.id !== params.id);
  await writeItems(env.ITEMS_KV, next);
  return new Response(null, { status: 204 });
}
