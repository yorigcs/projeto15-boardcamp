import { connection } from '../database/database.js';


const validateDeleteRental = async (req, res, next) => {
    const { id } = req.params;
    const query = `
    SELECT *
    FROM rentals
    WHERE id = $1
    `
    try {
        const { rows: rentalData } = await connection.query(query, [id]);
        //is there a rental?
        if (rentalData.length === 0) {
            return res.sendStatus(404)
        }
        //is finished?
        if (!rentalData[0].returnDate) {
            return res.sendStatus(400)
        }
        next();

    } catch (err) { 
        console.error(err);
        res.status(500).send("Houve um erro ao validar os dados do aluguel!");
    }

}

export default validateDeleteRental;