import { connection } from "../database/database.js";

const putCustomerController = async (req, res) => {
    const { customerData } = res.locals;
    const query =
        `
        UPDATE customers
        SET name = $1, phone = $2, cpf = $3, birthday = $4
        WHERE id = $5
        `;

    const bindParams = [customerData.name, customerData.phone, customerData.cpf, customerData.birthday, customerData.customerId];
    try {
        await connection.query(query, bindParams)
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Houve um erro ao atualizar o usuário!");
    }
}

export default putCustomerController;


