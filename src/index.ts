import express from "express";
import dotenv from 'dotenv';

dotenv.config();
import cors from "cors";
import { dbConnect } from './db/config';
const app = express();

// Base de datos
dbConnect();


// Directorio Público
app.use( express.static('dist'));

// CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json({ limit: '10mb' }));
app.use( express.urlencoded({ extended: true, limit: '10mb' }));


// Rutas
// import authRouter from './routers/auth';
import carRouter from './routers/car';
// import userRouter from './routers/user';


// app.use("/api/auth", authRouter);
app.use("/api/car", carRouter);
// app.use("/api/user", userRouter);

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});