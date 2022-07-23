import { connection } from "../database/database.js";
const postGamesController = async (req, res) => {
    const { gameData } = res.locals;
    const query =
        `
        INSERT INTO games ("name","image","stockTotal","categoryId","pricePerDay")
        VALUES ($1,$2,$3,$4,$5);
        `;

    const bindParams = [gameData.name, gameData.image, gameData.stockTotal, gameData.categoryId, gameData.pricePerDay];
    try {
        await connection.query(query, bindParams)
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.status(500).send("Houve um erro ao cadastrar os dados do jogo!");
    }
}

export default postGamesController;