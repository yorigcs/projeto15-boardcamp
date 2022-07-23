import { connection } from "../database/database.js";

const postCustomerController = async (req, res) => {
    const { customerData } = res.locals;
    const query =
        `
        INSERT INTO customers ("name","phone","cpf","birthday")
        VALUES ($1,$2,$3,$4);
        `;

    const bindParams = [customerData.name, customerData.phone, customerData.cpf, customerData.birthday];
    try {
        await connection.query(query, bindParams)
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.status(500).send("Houve um erro ao cadastrar o usuário!");
    }
}

export default postCustomerController;


