import { connection } from '../database/database.js';

const getCustomersController = async (req, res) => {
    const { cpf } = req.query;
    let query =`SELECT * FROM customers `;

    try {
        if (cpf) {
            query += ` where cpf LIKE $1 || '%'`;
            const { rows: customers } = await connection.query(query, [cpf]);
            return res.send(customers)
        }

        const { rows: customers } = await connection.query(query);
        res.send(customers)
    } catch (err) {
        console.error(err);
        res.status(500).send("Houve um erro ao buscar os usuários!");
    }
}

export default getCustomersController