import dayjs from 'dayjs';
import { connection } from '../database/database.js';

const getRentalsController = async (req, res) => {
    const { customerId, gameId } = req.query;
    let query = `
    SELECT r.*, c."name" as "customerName", g."name" as "gameName", g."categoryId", c2."name" as "categoryName"
    FROM rentals r 
    JOIN customers c ON r."customerId"  = c.id  
    JOIN games g ON r."gameId" = g.id
    JOIN categories c2 ON g."categoryId" = c2.id`;
    
    try {
        let resRentalData = [];
        if (customerId) {
            query += ` WHERE c.id = $1`
            const { rows: rentalData } = await connection.query(query, [customerId]);
            resRentalData = rentalData;
        } else if (gameId) {
            query += ` WHERE g.id = $1`
            const { rows: rentalData } = await connection.query(query, [gameId]);
            resRentalData = rentalData;
        } else {
            const { rows: rentalData } = await connection.query(query);
            resRentalData = rentalData;
        }

        const resRental = resRentalData.map(rental => {
            return (
                {
                    id: rental.id,
                    customerId: rental.customerId,
                    gameId: rental.gameId,
                    rentDate: dayjs(rental.rentDate).format('YYYY-MM-DD'),
                    daysRented: rental.daysRented,
                    returnDate: rental.returnDate,
                    originalPrice: rental.originalPrice,
                    delayFee: rental.delayFee,
                    customer: {
                        id: rental.customerId,
                        name: rental.customerName,
                    },
                    game: {
                        id: rental.gameId,
                        name: rental.gameName,
                        categoryId: rental.categoryId,
                        categoryName: rental.categoryName,
                    }
                }
            )
        })
        res.send(resRental)

    } catch (err) {
        console.error(err);
        res.status(500).send("Houve um erro ao buscar os dados do aluguel!");
    }

};

export default getRentalsController;