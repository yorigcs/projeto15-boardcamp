import { connection } from '../database/database.js';

const getCategoriesController = async (req, res) => {
    try {
        const { rows: categories } = await connection.query("SELECT * FROM categories");
        res.send(categories);
    } catch (err) {
        console.error(err);
        res.status(500).send("Houve um erro ao carregar as categorias!");
    }
};

export default getCategoriesController;