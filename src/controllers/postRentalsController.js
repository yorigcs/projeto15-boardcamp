import { connection } from '../database/database.js';

const postRentalsController = async (req, res) => {
    const { rentalData } = res.locals;
    const query = `
        INSERT INTO 
        rentals
            (
            "customerId",
            "gameId",
            "daysRented",
            "rentDate",
            "originalPrice",
            "returnDate",
            "delayFee"
            )
        VALUES($1, $2, $3, $4, $5, $6, $7)`;
        const bindParams =
            [
                rentalData.customerId,
                rentalData.gameId,
                rentalData.daysRented,
                rentalData.rentDate,
                rentalData.originalPrice,
                rentalData.returnDate,
                rentalData.delayFee
            ];
    try {
        await connection.query(query, bindParams);
        res.sendStatus(201)
    } catch (err) {
        console.error(err);
        res.status(500).send("Houve um erro ao inserir os dados do aluguel!");
    }
};

export default postRentalsController;