import { Router } from 'express';
import { db } from '../db.js';
const router = Router();

/**
 * GET /api/duas
 * - Query parameters:
 *    - ?limit=
 *    - ?offset=
 *    - ?search= (searches title or translation)
 *    - ?tag= (comma or single tag)
 *    - ?subcategory_id=
 *    - ?category_id=  (joins subcategories -> categories)
 */
router.get('/', async (req, res) => {
  try {
    const { limit, offset, search, tag, subcategory_id, category_id } =
      req.query;

    let baseQuery = 'SELECT d.* FROM duas d';
    const joins: string[] = [];
    const where: string[] = [];
    const params: any[] = [];

    if (category_id) {
      joins.push('INNER JOIN subcategories s ON d.subcategory_id = s.id');
      where.push('s.category_id = ?');
      params.push(Number(category_id));
    }

    if (subcategory_id) {
      where.push('d.subcategory_id = ?');
      params.push(Number(subcategory_id));
    }

    if (search) {
      where.push('(d.title LIKE ? OR d.translation LIKE ? OR d.arabic LIKE ?)');
      const s = `%${String(search)}%`;
      params.push(s, s, s);
    }

    if (tag) {
      // simple LIKE search on tags column
      where.push('d.tags LIKE ?');
      params.push(`%${String(tag)}%`);
    }

    const sql = [
      baseQuery,
      joins.length ? joins.join(' ') : '',
      where.length ? `WHERE ${where.join(' AND ')}` : '',
      'ORDER BY d.id',
      limit ? `LIMIT ${Number(limit)}` : '',
      offset ? `OFFSET ${Number(offset)}` : '',
    ]
      .filter(Boolean)
      .join(' ');

    const rows = await db.all(sql, ...params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch duas' });
  }
});

/**
 * GET /api/duas/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const dua = await db.get('SELECT * FROM duas WHERE id = ?', id);
    if (!dua) return res.status(404).json({ error: 'Dua not found' });
    res.json(dua);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dua' });
  }
});

/**
 * POST /api/duas
 * - Add a dua (simple creation route for testing)
 * Body: { subcategory_id?, title, arabic?, transliteration?, translation?, reference?, tags? }
 */
router.post('/', async (req, res) => {
  try {
    const {
      subcategory_id,
      title,
      arabic,
      transliteration,
      translation,
      reference,
      tags,
    } = req.body;
    if (!title) return res.status(400).json({ error: 'Missing title' });
    const result = await db.run(
      `INSERT INTO duas (subcategory_id, title, arabic, transliteration, translation, reference, tags) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      subcategory_id || null,
      title,
      arabic || null,
      transliteration || null,
      translation || null,
      reference || null,
      tags || null
    );
    const inserted = await db.get(
      'SELECT * FROM duas WHERE id = ?',
      result.lastID
    );
    res.status(201).json(inserted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create dua' });
  }
});

/**
 * PUT /api/duas/:id
 * - Update a dua
 */
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existing = await db.get('SELECT * FROM duas WHERE id = ?', id);
    if (!existing) return res.status(404).json({ error: 'Dua not found' });

    const {
      subcategory_id,
      title,
      arabic,
      transliteration,
      translation,
      reference,
      tags,
    } = req.body;
    await db.run(
      `UPDATE duas SET subcategory_id = ?, title = ?, arabic = ?, transliteration = ?, translation = ?, reference = ?, tags = ? WHERE id = ?`,
      subcategory_id || null,
      title ?? existing.title,
      arabic ?? existing.arabic,
      transliteration ?? existing.transliteration,
      translation ?? existing.translation,
      reference ?? existing.reference,
      tags ?? existing.tags,
      id
    );

    const updated = await db.get('SELECT * FROM duas WHERE id = ?', id);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update dua' });
  }
});

/**
 * DELETE /api/duas/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.run('DELETE FROM duas WHERE id = ?', id);
    res.json({ ok: true, deletedId: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete dua' });
  }
});

export default router;
