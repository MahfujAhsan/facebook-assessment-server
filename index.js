const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
// Middleware
app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@interview-assignment.txusb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try {
        await client.connect();

        const contentList = client.db('contentList').collection('giveindia');

        app.get("/content", async (req, res) => {
            const query = {};
            const cursor = contentList.find(query);
            const giveIndia = await cursor.toArray();
            res.send(giveIndia);
        })
    }
    finally {

    }
}

run().catch(console.dir);

app.get("/", (req, res) => {
    res.send('Server Running')
});

app.listen(port, () => {
    console.log('Facebook Server')
})

