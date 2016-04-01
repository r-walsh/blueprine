import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';

import sessionConfig from './server/config/sessionConfig';
import passportConfig from './server/features/auth/passport';
import masterRoutes from './server/masterRoutes';

const app = express();
const port = 8080;
const dbName = `blueprint`;
const mongoUri = `mongodb://localhost:27017/${ dbName }`;

mongoose.connect(mongoUri);
mongoose.connection.once(`open`, () => console.log(`Connected to MongoDB at ${ mongoUri }`));

passportConfig( passport );
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(`${ __dirname }/dist`));
app.use(session( sessionConfig ));
app.use(passport.initialize());
app.use(passport.session());

masterRoutes( app );

app.get(`*`, ( req, res ) => {
	res.sendFile(`${ __dirname }/dist/index.html`);
});

app.listen( port, () => console.log(`Listening on ${ port }`));