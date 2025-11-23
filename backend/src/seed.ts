/**
 * Run with: npm run seed
 * This will insert example categories, subcategories and duas if tables are empty.
 */
import initalizedb from './db.js';
import { db } from './db.js';

async function seed() {
  await initalizedb();

  const catCount = await db.get('SELECT COUNT(*) as c FROM categories');
  if (catCount.c === 0) {
    console.log('Seeding categories...');
    await db.run(
      'INSERT INTO categories (name, description) VALUES (?,?)',
      'Daily Duas',
      'Common daily supplications'
    );
    await db.run(
      'INSERT INTO categories (name, description) VALUES (?,?)',
      'Duas from Quran',
      'Supplications from the Quran'
    );
  }

  const subCount = await db.get('SELECT COUNT(*) as c FROM subcategories');
  if (subCount.c === 0) {
    console.log('Seeding subcategories...');
    await db.run(
      'INSERT INTO subcategories (category_id, name, description) VALUES (?,?,?)',
      1,
      'Morning Duas',
      'Supplications for morning'
    );
    await db.run(
      'INSERT INTO subcategories (category_id, name, description) VALUES (?,?,?)',
      1,
      'Evening Duas',
      'Supplications for evening'
    );
    await db.run(
      'INSERT INTO subcategories (category_id, name, description) VALUES (?,?,?)',
      2,
      'Quranic Duas',
      'Duas mentioned in the Quran'
    );
  }

  const duaCount = await db.get('SELECT COUNT(*) as c FROM duas');
  if (duaCount.c === 0) {
    console.log('Seeding duas...');
    await db.run(
      `INSERT INTO duas (subcategory_id, title, arabic, transliteration, translation, reference, tags) VALUES (?,?,?,?,?,?,?)`,
      1,
      'Dua for beginning the day',
      'اَللّٰهُمَّ بِكَ أَصْبَحْنَا',
      'Allahumma bika asbahna',
      'O Allah, by You we enter the morning.',
      'authentic',
      'morning,daily'
    );

    await db.run(
      `INSERT INTO duas (subcategory_id, title, arabic, transliteration, translation, reference, tags) VALUES (?,?,?,?,?,?,?)`,
      2,
      'Dua for protection in the evening',
      'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ',
      'Amsayna wa amsal mulku lillah',
      'We have entered the evening and the whole kingdom belongs to Allah.',
      'sunan',
      'evening,daily'
    );
  }

  console.log('Seeding complete.');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
