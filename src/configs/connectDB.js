const sql = require('mssql');

const config = {
    server: 'localhost',
    user: 'dungg',
    password: 'dung144202',
    database: 'TikTok',
    synchronize: true,
    trustServerCertificate: true,
};
const connection = () => {
    sql.connect(config, (err) => {
        if (err) console.log(err);
    });
};
module.exports = connection;