import rentalSchema from "../schemas/rentalSchema.js";
import { connection } from "../database/database.js";

const validatePostGamesMiddleware = async (req, res, next) => {
    const customerId = Number(req.body.customerId)
    const gameId = Number(req.body.gameId);
    const daysRented = Number(req.body.daysRented)
    

    try {
        await rentalSchema.validateAsync({ customerId, gameId, daysRented });

        try {
            const { rows: customer } = await connection.query('SELECT * FROM customers WHERE id = $1', [customerId]);
            if (customer.length === 0) return res.sendStatus(400);

            const { rows: game } = await connection.query('SELECT * FROM games WHERE id = $1', [gameId]);
            if (game.length === 0) return res.sendStatus(400);

            const { rows: currentRentedGames} = await connection.query('SELECT COUNT FROM rentals WHERE "gameId" = $1', [gameId]);
            if(currentRentedGames[0].gameId >= game[0].stockTotal) return res.sendStatus(400);
            
            res.locals.rentalData = { customerId,gameId,daysRented};
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

export default validatePostGamesMiddleware;