import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
export let db;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
async function initalizedb() {
    db = await open({
        filename: path.join(__dirname, '..', 'database.sqlite'),
        driver: sqlite3.Database,
    });
    await db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS subcategories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS duas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subcategory_id INTEGER,
      title TEXT NOT NULL,
      arabic TEXT,
      transliteration TEXT,
      translation TEXT,
      reference TEXT,
      tags TEXT,
      FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL
    );
  `);
}
export default initalizedb;
