import { Router } from 'express';
import { db } from '../db.js';
const router = Router();
/**
 * GET /api/subcategories
 * - Returns all subcategories (optionally filter by ?category_id=)
 */
router.get('/', async (req, res) => {
    try {
        const categoryId = req.query.category_id
            ? Number(req.query.category_id)
            : null;
        let rows;
        if (categoryId) {
            rows = await db.all('SELECT * FROM subcategories WHERE category_id = ? ORDER BY id', categoryId);
        }
        else {
            rows = await db.all('SELECT * FROM subcategories ORDER BY id');
        }
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch subcategories' });
    }
});
/**
 * GET /api/subcategories/:id
 * - Return one subcategory
 */
router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const row = await db.get('SELECT * FROM subcategories WHERE id = ?', id);
        if (!row)
            return res.status(404).json({ error: 'Subcategory not found' });
        res.json(row);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch subcategory' });
    }
});
/**
 * GET /api/subcategories/:id/duas
 * - Returns all duas under a subcategory
 */
router.get('/:id/duas', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const rows = await db.all('SELECT * FROM duas WHERE subcategory_id = ? ORDER BY id', id);
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch duas for subcategory' });
    }
});
export default router;
