const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'Gestion_Restaurant'
});

async function initializeDatabase() {
    try {
        const connection = await db.getConnection();
        console.log('Vous etes Connecté à la base de données');
    } catch (err) {
        console.error('Erreur lors de la connexion à la base de données:', err);
    }
}

initializeDatabase();

module.exports = db;