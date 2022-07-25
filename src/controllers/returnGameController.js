import dayjs from 'dayjs';
import { connection } from '../database/database.js';
const returnGameController = async (req, res) => {
    const { returnGameData } = res.locals;

    const today = dayjs();
    const rentDate = dayjs(returnGameData.rentDate);
    const daysDiff = today.diff(rentDate, 'day');
    let delayFee = null;
    //check if has delayFee
    if (daysDiff > returnGameData.daysRented) {
        delayFee = daysDiff - returnGameData.daysRented;
    }
    try {
        await connection.query(`UPDATE rentals SET "delayFee" = $1, "returnDate" = $2 WHERE id = $3`, [delayFee, today.format('YYYY-MM-DD'), returnGameData.id])
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Houve um erro ao atualizar os dados do aluguel!");
    }

};

export default returnGameController