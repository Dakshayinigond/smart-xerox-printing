const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'smartprinting',
  password: 'postgres',
  port: 5432,
});

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected:', res.rows);
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    pool.end();
  }
})();
