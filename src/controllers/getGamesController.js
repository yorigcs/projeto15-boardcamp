import { connection } from '../database/database.js';

const getGamesController = async (req, res) => {
    const { name } = req.query;
    let query =
        `SELECT g.*, c.name AS "categoryName"
         FROM games g 
         JOIN categories c 
         ON g."categoryId" = c.id 
        `;

    try {
        if (name) {
            query += ` where LOWER(g.name) LIKE LOWER($1 || '%')`;
            const { rows: games } = await connection.query(query, [name]);
            return res.send(games)
        }

        const { rows: games } = await connection.query(query);
        res.send(games)
    } catch (err) {
        console.error(err);
        res.status(500).send("Houve um erro ao buscar os jogos!");
    }
}

export default getGamesController