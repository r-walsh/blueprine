import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(`${ __dirname }/dist`));


app.get(`*`, ( req, res ) => {
	res.sendFile(`${ __dirname }/dist/index.html`);
});

app.listen( port, () => console.log(`Listening on ${ port }`));