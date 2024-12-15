// Vérifier l'authentification au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('crudSection').style.display = 'block';
        document.getElementById('authError').style.display = 'none';
    } else {
        document.getElementById('crudSection').style.display = 'none';
        document.getElementById('authError').style.display = 'block';
    }
});

// Gestionnaire d'événements pour l'inscription
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const password = document.getElementById('password').value;
    const adresse = document.getElementById('adresse').value;
    const email = document.getElementById('email').value;
    const carte_bancaire = document.getElementById('carte_bancaire').value;

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nom, prenom, password, adresse, email, carte_bancaire })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'inscription');
        }

        const data = await response.json();
        alert(data.message);
        if (data.token) {
            localStorage.setItem('token', data.token);
            document.getElementById('crudSection').style.display = 'block';
            document.getElementById('authError').style.display = 'none';
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'inscription');
    }
});

// Gestionnaire d'événements pour l'authentification
document.getElementById('authenticateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;

    try {
        const response = await fetch('http://localhost:3000/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'authentification');
        }

        const data = await response.json();
        alert(data.message);
        if (data.token) {
            localStorage.setItem('token', data.token);
            document.getElementById('crudSection').style.display = 'block';
            document.getElementById('authError').style.display = 'none';
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'authentification');
    }
});

// Gestionnaire d'événements pour récupérer les utilisateurs
document.getElementById('getUsers').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Vous devez être authentifié pour effectuer cette action.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des utilisateurs');
        }

        const users = await response.json();
        const usersList = document.getElementById('usersList');
        const userSelect = document.getElementById('userSelect');
        usersList.innerHTML = '';
        userSelect.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.nom} ${user.prenom} - ${user.email}`;
            usersList.appendChild(li);

            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = `${user.nom} ${user.prenom}`;
            userSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la récupération des utilisateurs');
    }
});

// Gestionnaire d'événements pour afficher les détails de l'utilisateur sélectionné
document.getElementById('selectUser').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Vous devez être authentifié pour effectuer cette action.');
        return;
    }
    const userId = document.getElementById('userSelect').value;

    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération de l\'utilisateur');
        }

        const user = await response.json();
        const selectedUser = document.getElementById('selectedUser');
        selectedUser.innerHTML = '';
        const li = document.createElement('li');
        li.textContent = `${user.nom} ${user.prenom} - ${user.email}`;
        selectedUser.appendChild(li);

        // Remplir le formulaire de modification avec les informations de l'utilisateur
        document.getElementById('editNom').value = user.nom;
        document.getElementById('editPrenom').value = user.prenom;
        document.getElementById('editPassword').value = user.password;
        document.getElementById('editAdresse').value = user.adresse;
        document.getElementById('editEmail').value = user.email;
        document.getElementById('editCarteBancaire').value = user.carte_bancaire;
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la récupération de l\'utilisateur');
    }
});

// Gestionnaire d'événements pour modifier l'utilisateur sélectionné
document.getElementById('editUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Vous devez être authentifié pour effectuer cette action.');
        return;
    }
    const userId = document.getElementById('userSelect').value;
    const nom = document.getElementById('editNom').value;
    const prenom = document.getElementById('editPrenom').value;
    const password = document.getElementById('editPassword').value;
    const adresse = document.getElementById('editAdresse').value;
    const email = document.getElementById('editEmail').value;
    const carte_bancaire = document.getElementById('editCarteBancaire').value;

    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nom, prenom, password, adresse, email, carte_bancaire })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la modification de l\'utilisateur');
        }

        alert('Utilisateur modifié avec succès');
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la modification de l\'utilisateur');
    }
});

// Gestionnaire d'événements pour supprimer l'utilisateur sélectionné
document.getElementById('deleteUser').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Vous devez être authentifié pour effectuer cette action.');
        return;
    }
    const userId = document.getElementById('userSelect').value;

    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la suppression de l\'utilisateur');
        }

        alert('Utilisateur supprimé avec succès');
        // Mettre à jour la liste des utilisateurs
        document.getElementById('getUsers').click();
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la suppression de l\'utilisateur');
    }
});

// Gestionnaire d'événements pour la déconnexion
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    document.getElementById('crudSection').style.display = 'none';
    document.getElementById('authError').style.display = 'block';
    alert('Vous avez été déconnecté.');
});