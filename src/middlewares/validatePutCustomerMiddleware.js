import customersScheme from "../schemas/customersScheme.js";
import { connection } from "../database/database.js";
import dayjs from "dayjs";

const validatePutCustomerMiddleware = async (req, res, next) => {
    const { name, phone, cpf } = req.body;
    const birthday = dayjs(req.body.birthday).format('YYYY-MM-DD');

    const customerId = Number(req.params.id);
    if (isNaN(customerId)) {
        return res.sendStatus(400);
    }

    try {
        await customersScheme.validateAsync({ name, phone, cpf, birthday });

        try {
            const { rows: isCpfAvailable } = await connection.query('SELECT * FROM customers WHERE cpf = $1 and id != $2', [cpf, customerId]);
            if (isCpfAvailable.length !== 0) {
                return res.sendStatus(409);
            }
            res.locals.customerData = { name, phone, cpf, birthday, customerId };
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

export default validatePutCustomerMiddleware;