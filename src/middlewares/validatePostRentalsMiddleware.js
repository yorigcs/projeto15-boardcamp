import rentalSchema from "../schemas/rentalSchema.js";
import { connection } from "../database/database.js";
import dayjs from "dayjs";

const validatePostRentalsMiddleware = async (req, res, next) => {
    const customerId = Number(req.body.customerId)
    const gameId = Number(req.body.gameId);
    const daysRented = Number(req.body.daysRented)


    try {
        await rentalSchema.validateAsync({ customerId, gameId, daysRented });

        try {
            //check if user exists
            const { rows: customer } = await connection.query('SELECT * FROM customers WHERE id = $1', [customerId]);
            if (customer.length === 0) return res.sendStatus(400);

            //check if game exists
            const { rows: game } = await connection.query('SELECT * FROM games WHERE id = $1', [gameId]);
            if (game.length === 0) return res.sendStatus(400);

            //check if game is in stock
            const { rows: currentRentedGames } = await connection.query('SELECT COUNT(*) FROM rentals WHERE "gameId" = $1', [gameId]);
            if (Number(currentRentedGames[0].count) >= game[0].stockTotal) return res.sendStatus(400);

            const rentDate = dayjs().format('YYYY-MM-DD');
            const originalPrice = daysRented * game[0].pricePerDay;
            const returnDate = null;
            const delayFee = null;
            res.locals.rentalData = { customerId, gameId, daysRented, rentDate, originalPrice, returnDate, delayFee };
            next();
        } catch (err) {
            console.error(err);
            res.status(500).send("Houve um erro ao validar os dados do aluguel!");
        }
    } catch (err) {
        console.log(err)
        return res.sendStatus(400);
    }
}

export default validatePostRentalsMiddleware;