import customersScheme from "../schemas/customersScheme.js";
import { connection } from "../database/database.js";

const validatePostCustomerMiddleware = async (req, res, next) => {
    const { name, phone, cpf, birthday } = req.body;

    try {
        await customersScheme.validateAsync({ name, phone, cpf, birthday });

        try {
            const { rows: isCustomerRegistered } = await connection.query('SELECT * FROM customers WHERE cpf = $1', [cpf]);
            if (isCustomerRegistered.length !== 0) {
                return res.sendStatus(409);
            }
            res.locals.customerData = { name, phone, cpf, birthday };
            next();
        } catch (err) {
            console.error(err);
            res.status(500).send("Houve um erro ao validar os dados do usuário!");
        }
    } catch (err) {
        console.log(err)
        return res.sendStatus(400);
    }
}

export default validatePostCustomerMiddleware;