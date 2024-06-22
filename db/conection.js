import mysql from 'mysql2/promise';

export const connection = await mysql.createConnection({
    host: '172.16.101.146',
    port: '22',
    database: 'trainer',
    user: 'camper',
    password: 'campus2023'
});
