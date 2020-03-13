import pool from '../db/config';

export const createTables = () => {
    const createTablesQuerry = `CREATE TABLE IF NOT EXISTS
    users(
        id serial,
        firstname character varying(30) NOT NULL,
        lastname character varying(30) NOT NULL,
        email character varying(50) NOT NULL,
        password character varying(500) NOT NULL,
        notification character varying(5) NOT NULL,
        PRIMARY KEY(id)
    );
    CREATE TABLE IF NOT EXISTS
    entries(
        id serial,
        createdby integer NOT NULL,
        createdon character varying(30) NOT NULL,
        title character varying(30) NOT NULL,
        description character varying(5000) NOT NULL,
        editedon character varying(30),
        PRIMARY KEY (id)
    );`;
    pool.query(createTablesQuerry)
        .then(() => console.log('tables created successfully...'))
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};
export default pool;
require('make-runnable');
