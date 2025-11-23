import { Router } from 'express';
import { db } from '../db.js';
const router = Router();
/**
 * GET /api/categories
 * - Returns all categories
 */
router.get('/', async (req, res) => {
    try {
        const rows = await db.all('SELECT * FROM categories ORDER BY id');
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});
/**
 * GET /api/categories/:id
 * - Returns a single category
 */
router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const row = await db.get('SELECT * FROM categories WHERE id = ?', id);
        if (!row)
            return res.status(404).json({ error: 'Category not found' });
        res.json(row);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
});
/**
 * GET /api/categories/:id/subcategories
 * - Returns all subcategories for a category (joined)
 */
router.get('/:id/subcategories', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const rows = await db.all('SELECT * FROM subcategories WHERE category_id = ? ORDER BY id', id);
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch subcategories' });
    }
});
export default router;
