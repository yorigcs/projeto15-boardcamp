import routeCategories from './routes/route-categories.js';
import routeGames from './routes/routeGames.js'
import routeCustomers from './routes/routeCustomers.js'
import routeRentals from './routes/routeRentals.js'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT || 4000;

const server = express();
server.use([cors(), express.json(), routeCategories, routeGames, routeCustomers, routeRentals]);

server.listen(PORT, () => console.log('listening on port ' + PORT));