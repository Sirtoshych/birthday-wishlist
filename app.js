const api = {
  async list() {
    const res = await fetch('/api/items');
    if (!res.ok) return [];
    return res.json();
  },
  async add(item) {
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    return res.json();
  },
  async update(id, patch) {
    const res = await fetch('/api/items/' + encodeURIComponent(id), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch)
    });
    return res.json();
  },
  async remove(id) {
    await fetch('/api/items/' + encodeURIComponent(id), { method: 'DELETE' });
  },
  async claim(id, claimed) {
    return this.update(id, { claimed });
  }
};
