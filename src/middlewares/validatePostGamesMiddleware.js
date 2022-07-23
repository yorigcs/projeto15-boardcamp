import gameSchema from "../schemas/gamesSchema.js";
import { connection } from "../database/database.js";

const validatePostGamesMiddleware = async (req, res, next) => {
    const { name, image } = req.body;
    const stockTotal = Number(req.body.stockTotal)
    const pricePerDay = Number(req.body.pricePerDay) * 100;
    const categoryId = Number(req.body.categoryId)

    try {
        await gameSchema.validateAsync({ name, stockTotal, pricePerDay,categoryId });

        try {
            const { rows: categorieAvailable } = await connection.query('SELECT * FROM categories WHERE id = $1', [categoryId]);
            if (categorieAvailable.length === 0) {
                return res.sendStatus(400);
            }
            const { rows: nameAvailable } = await connection.query('SELECT * FROM games WHERE name = $1', [name]);
            if (nameAvailable.length !== 0) {
                return res.sendStatus(409);
            }
            res.locals.gameData = { name, image, stockTotal, pricePerDay, categoryId };
            next();
        } catch (err) {
            console.error(err);
            res.status(500).send("Houve um erro ao validar os dados do jogo!");
        }
    } catch (err) {
        console.log(err)
        return res.sendStatus(400);
    }
}

export default validatePostGamesMiddleware;