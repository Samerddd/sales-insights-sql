import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { pathToFileURL } from 'node:url';

const sql = (name) => readFileSync(new URL(name, import.meta.url), 'utf8');

function isDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '')) return false;
  const date = new Date(value);
  return Number.isFinite(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

export function monthlyRevenue(from, until) {
  if (!isDate(from) || !isDate(until) || from >= until) {
    throw new Error('Provide an increasing date range as YYYY-MM-DD YYYY-MM-DD.');
  }

  const db = new DatabaseSync(':memory:');
  try {
    db.exec(sql('schema.sql'));
    db.exec(sql('sample.sql'));
    return db.prepare(sql('monthly-revenue.sql')).all(from, until).map((row) => ({ ...row }));
  } finally {
    db.close();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    console.log(JSON.stringify(monthlyRevenue(...process.argv.slice(2)), null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
