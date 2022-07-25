import { connection } from '../database/database.js';

const deleteRentalController = async (req, res) => {
    const { id } = req.params;
    try {
        await connection.query(`DELETE FROM rentals where id = $1`,[id])
    } catch (err) {
        console.error(err);
        res.status(500).send("Houve um erro ao apagar o aluguél!");
    }
};

export default deleteRentalController;