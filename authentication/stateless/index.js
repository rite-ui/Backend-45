import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/user.routes.js';
import privateRoutes from './routes/private.routes.js';

dotenv.config();
const app = express();
app.use(express.json());

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));



app.use('/api/auth',authRoutes);
app.use('/api/private',privateRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});