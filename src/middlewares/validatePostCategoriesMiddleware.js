import nameSchema from "../schemas/categoriesSchema.js";
import { connection } from "../database/database.js";

const validatePostCategoriesMiddleware = async (req, res, next) => {
    const { name } = req.body;
    try {
        await nameSchema.validateAsync(name);
        try {
            let query = "SELECT * FROM categories where name = $1";
            const bindParams = [name];

            const { rows: availableCategorie } = await connection.query(query, bindParams);
            if (availableCategorie.length !== 0) {
                return res.sendStatus(409);
            }
            next();

        } catch (err) {
            console.error(err);
            res.status(500).send("Houve um erro ao Verificar as categorias!");
        }
    } catch (err) {
        res.sendStatus(400);
    }
}

export default validatePostCategoriesMiddleware;