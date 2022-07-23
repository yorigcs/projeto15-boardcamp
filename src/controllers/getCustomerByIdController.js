import { connection } from '../database/database.js';

const getCustomerByIdController = async (req, res) => {
    const customerId = Number(req.params.id);
    if(isNaN(customerId)) {
        return res.sendStatus(400);
    }
    let query =`SELECT * FROM customers WHERE id = $1`;

    try {
        const { rows: customers } = await connection.query(query,[customerId]);
        if(customers.length === 0) {
            return res.sendStatus(404);
        }
        res.send(customers[0])
    } catch (err) {
        console.error(err);
        res.status(500).send("Houve um erro ao buscar o usuário!");
    }
}

export default getCustomerByIdController