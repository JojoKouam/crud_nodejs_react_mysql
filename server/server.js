import express from 'express';
import mysql from 'mysql'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
// Créer une connexion à la base de données MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
// Vérifier la connexion à la base de données
db.connect(err => {
    // Vérifier si la connexion a réussi
    // Si une erreur se produit, elle sera affichée dans la console
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connecté à la base de données MySQL.');
});
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM student';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête SQL:', err);
            return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
        }
        res.json(result);
    });
}
);
// Route pour créer un étudiant
// Cette route est utilisée pour ajouter un nouvel étudiant à la base de données
// Elle prend les valeurs du corps de la requête et utilise une requête SQL INSERT pour ajouter l'étudiant
// Elle renvoie un message de succès ou d'erreur en fonction du résultat de la requête
app.post('/student', (req, res) => {
    const sql = 'INSERT INTO student (name, email) VALUES (?, ?)';
    const values = [req.body.name, req.body.email];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion dans la base de données:', err);
            return res.status(500).json({ error: 'Erreur lors de l\'insertion dans la base de données' });
        }
        res.json({ message: 'Etudiant créé avec succès', id: result.insertId });
    });
}
);
// Route pour supprimer un étudiant
// Cette route est utilisée pour supprimer un étudiant de la base de données
// Elle prend l'ID de l'étudiant dans l'URL et utilise une requête SQL DELETE pour supprimer l'étudiant
// Elle renvoie un message de succès ou d'erreur en fonction du résultat de la requête
// La route est définie avec la méthode DELETE et l'ID de l'étudiant est passé en tant que paramètre d'URL
app.delete('/delete/:id', (req, res) => {
    const sql = 'DELETE FROM student WHERE id = ?';
    const values = [req.params.id];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression dans la base de données:', err);
            return res.status(500).json({ error: 'Erreur lors de la suppression dans la base de données' });
        }
        res.json({ message: 'Etudiant supprimé avec succès' });
    });
}
);
// Route pour mettre à jour un étudiant
// Cette route est utilisée pour modifier les informations d'un étudiant existant
// Elle prend l'ID de l'étudiant dans l'URL et les nouvelles valeurs dans le corps de la requête
// Elle utilise une requête SQL UPDATE pour mettre à jour les informations de l'étudiant dans la base de données
// Elle renvoie un message de succès ou d'erreur en fonction du résultat de la requête
app.put('/update/:id', (req, res) => {
    const sql = 'UPDATE student SET name = ?, email = ? WHERE id = ?';
    const values = [req.body.name, req.body.email, req.params.id];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour dans la base de données:', err);
            return res.status(500).json({ error: 'Erreur lors de la mise à jour dans la base de données' });
        }
        res.json({ message: 'Etudiant mis à jour avec succès' });
    });
}
);
// Route pour récupérer un étudiant par son ID
// Cette route est utilisée pour afficher les détails d'un étudiant spécifique
app.get('/read/:id', (req, res) => {
    const sql = 'SELECT * FROM student WHERE id = ?';
    const values = [req.params.id];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'étudiant:', err);
            return res.status(500).json({ error: 'Erreur lors de la récupération de l\'étudiant' });
        }
        res.json(result);
    });
}
);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}`);
}
);