import pool from '../db/config';

export const dropTables = () => {
    const dropTablesQuerry = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS entries CASCADE;`;
    pool.query(dropTablesQuerry)
        .then(() => console.log('tables deleted successfully ...'))
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};
export default pool;
require('make-runnable');
