require('dotenv').config();
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getUsers, getUserById, createUser, updateUser, deleteUser,checkAuthentification , isUserRegistered } = require('./userRepository');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


let authenticatedUsers = {}; // Objet global pour stocker les utilisateurs authentifiés

app.use(express.json());

// Middleware personnalisé pour journaliser les requêtes reçues dans un fichier
app.use((req, res, next) => {
    const log = `${new Date().toISOString()} ${req.method} ${req.url} ${JSON.stringify(req.body)}\n`;
    fs.appendFile(path.join(__dirname, 'access.log'), log, (err) => {
        if (err) {
            console.error('Error writing to log file', err);
        }
    });
    next();
});

const generateToken = () => {
    return Math.random().toString(36).substring(2);
};

app.use((req, res, next) => {
    console.log('Headers:', req.headers);
    next();
});

app.use(express.static(path.join(__dirname, 'public'))); // Servir les fichiers statiques

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    const user = await checkAuthentification(email, password);
    if (user) {
        const authToken = uuidv4();
        authenticatedUsers[authToken] = { email };
        console.log(`Utilisateur authentifié: ${email}, Token: ${authToken}`);
        res.status(200).json({ message: 'Authentification réussie', token: `Bearer ${authToken}` });
    } else {
        res.status(403).json({ message: 'authentification échouée' });
    }
});

app.post('/register', async (req, res) => {
    const { nom, prenom, password, adresse, email, carte_bancaire } = req.body;
    if (await isUserRegistered(email)) {
        res.status(403).json({ message: 'Utilisateur déjà enregistré' });
    } else {
        await createUser(nom, prenom, password, adresse, email, carte_bancaire);
        const authToken = uuidv4();
        authenticatedUsers[authToken] = { email };
        console.log(`Utilisateur enregistré: ${email}, Token: ${authToken}`);
        res.status(200).json({ message: 'Utilisateur enregistré', token: `Bearer ${authToken}` });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message:'Erreur lors de la récupération des utilisateurs' });
    }
});


app.get('/users/:id_compte_utilisateur', async (req, res) => {
    try {
        const user = await getUserById(req.params.id_compte_utilisateur);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateurs' });
    }
});

app.put('/users/:id_compte_utilisateur', async (req, res) => {
    const { nom, prenom, password, adresse, email, carte_bancaire } = req.body;
    try {
        await updateUser(req.params.id_compte_utilisateur, nom, prenom, password, adresse, email, carte_bancaire);
        res.status(200).json({ message: 'Utilisateur modifié' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la modification de l\'utilisateurs' });
    }
});

app.delete('/users/:id_compte_utilisateur', async (req, res) => {
    try {
        await deleteUser(req.params.id_compte_utilisateur);
        res.status(200).json({ message: 'Utilisateur supprimé'});
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de le suppresion d\'un utilisateur'});
    }
});

const unrestrictedUrls = ['/', '/authenticate', '/register'];
const firewall = (req, res, next) => {
    if (unrestrictedUrls.includes(req.url)) {
        next();
    } else {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            if (authenticatedUsers[token]) {
                next();
            } else {
                res.status(403).send({ message: 'Accès refusé : token incorrect' });
            }
        } else {
            res.status(403).send({ message: 'Accès refusé : token manquant' });
        }
    }
};

app.use(firewall);

app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});