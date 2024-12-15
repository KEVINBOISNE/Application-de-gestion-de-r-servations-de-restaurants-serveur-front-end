const bcrypt = require('bcrypt');
const db = require('./database');

async function createUser (nom, prenom, mot_de_passe, adresse, email, carte_bancaire) {
    try {
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        await db.query("INSERT INTO Compte_utilisateur (nom, prenom, mot_de_passe, adresse, email, carte_bancaire) VALUES (?, ?, ?, ?, ?, ?)", [nom, prenom, hashedPassword, adresse, email, carte_bancaire]);
    } catch (err) {
        console.error('Erreur lors de la création de l\'utilisateur:', err);
        throw err;
    }
};


async function getUsers() {
    try {
        const [rows] = await db.query("SELECT * FROM Compte_utilisateur");
        return rows;
    } catch (err) {
        console.error('Erreur lors de la récupération des utilisateurs:', err);
    }
};


async function getUserById(id_compte_utilisateur) {
    try {
        const [rows] = await db.query("SELECT * FROM Compte_utilisateur WHERE id_compte_utilisateur = ?", [id_compte_utilisateur]);
        return rows[0];
    } catch (err) {
        console.error('Erreur lors de la récupération de l\'utilisateur par ID:', err);
        throw err;
    }
};

async function updateUser(id_compte_utilisateur, nom, prenom, mot_de_passe, adresse, email, carte_bancaire) {
    try {
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        await db.query("UPDATE Compte_utilisateur SET nom = ?, prenom = ?, mot_de_passe = ?, adresse = ?, email = ?, carte_bancaire = ? WHERE id_compte_utilisateur = ?", [nom, prenom, hashedPassword, adresse, email, carte_bancaire, id_compte_utilisateur]);
    } catch (err) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
        throw err;
    }
};

async function deleteUser(id_compte_utilisateur) {
    try {
        await db.query("DELETE FROM Compte_utilisateur WHERE id_compte_utilisateur = ?", [id_compte_utilisateur]);
    } catch (err) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', err);
        throw err;
    }
};
async function checkAuthentification(email, mot_de_passe) {
    try {
    const [rows] = await db.query("SELECT * FROM Compte_utilisateur WHERE email = ?", [email]);
    const userAuthen = rows[0];
     if(userAuthen && await bcrypt.compare(mot_de_passe, userAuthen.mot_de_passe)) { 
        return userAuthen;
     }
        return null;

    } catch (err) {
        console.error('Erreur lors de la vérification de l\'authentification:', err);
        throw err;
    }

}

async function isUserRegistered(email) {
    try {
            const [rows] = await db.query("SELECT * FROM Compte_utilisateur WHERE email = ?", [email]);
            return rows.length > 0;
    } catch (err) {
            console.error('Erreur lors de la vérification de l\'utilisateur:', err);
            throw err;
    }
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    checkAuthentification,
    createUser,
    isUserRegistered
};