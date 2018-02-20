import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import users from './routes/users';
const PORT = process.env.PORT || 2828;

let app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/v1/api/users', users);
app.listen(PORT, () => console.log(`running on localhost: ${PORT}`));
