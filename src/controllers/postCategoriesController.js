import { connection } from '../database/database.js';

const postCategoriesController = async (req, res) => {
    const { name } = req.body;
    const query = "INSERT INTO categories(name) VALUES($1)";
    const bindParams = [name];
    try {
        await connection.query(query, bindParams);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.status(500).send("Houve um erro ao criar a categoria!");
    }
};

export default postCategoriesController;