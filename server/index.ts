import express from "express"
import cors from "cors"

const app = express()
app.use(cors())

app.get('/', (_req, res) => {
    res.json({
        message: 'Hello World'
    });
});

app.get('/:name', async (req, res) => {
    const name = req.params.name;
    res.json({
        message: `Hello ${name}`
    });
});

app.listen(1337, () => {
    console.log('Server is listening on port 1337');
});