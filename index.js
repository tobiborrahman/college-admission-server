const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());

// college-admission
// xoXqjsJ1UBpXPw3L

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ytasiev.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		// await client.connect();
		// Send a ping to confirm a successful connection

		const collegeCollection = client
			.db('college-admission')
			.collection('colleges');
		const admittedColleges = client
			.db('college-admission')
			.collection('admittedColleges');

		const candidateColleges = client
			.db('college-admission')
			.collection('candidateColleges');

		app.get('/colleges', async (req, res) => {
			const result = await collegeCollection.find().toArray();
			res.send(result);
		});

		app.get('/colleges/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: new ObjectId(id) };
			const result = await collegeCollection.findOne(query);
			res.send(result);
		});

		app.get('/admittedColleges', async (req, res) => {
			const result = await admittedColleges.find().toArray();
			res.send(result);
		});

		app.get('/admittedColleges/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: new ObjectId(id) };
			const result = await admittedColleges.findOne(query);
			res.send(result);
		});

		app.post('/candidateColleges', async (req, res) => {
			const query = req.body;
			const result = await candidateColleges.insertOne(query);
			res.send(result);
		});

		await client.db('admin').command({ ping: 1 });
		console.log(
			'Pinged your deployment. You successfully connected to MongoDB!'
		);
	} finally {
		// Ensures that the client will close when you finish/error
		// await client.close();
	}
}
run().catch(console.dir);

app.get('/', (req, res) => {
	res.send('College Admission is running');
});

app.listen(port, () => {
	console.log('Admission is Ongoing');
});
