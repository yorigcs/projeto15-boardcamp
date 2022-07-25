import { connection } from '../database/database.js'

const validateReturnGame = async (req, res, next) => {
    const { id } = req.params;
    const query = `
    SELECT r.*, g."pricePerDay"  
    FROM rentals r 
    JOIN games g on r."gameId" = g.id  
    WHERE r.id = $1
    `
    try {
        const { rows: rentalData } = await connection.query(query, [id]);
        //is there a rental?
        if (rentalData.length === 0) {
            return res.sendStatus(404)
        }
        //is finished?
        if (rentalData[0].returnDate) {
            return res.sendStatus(400)
        }
        res.locals.returnGameData = rentalData[0];
        next();

    } catch (err) { 
        console.error(err);
        res.status(500).send("Houve um erro ao validar os dados do aluguel!");
    }

}

export default validateReturnGame;