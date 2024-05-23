const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get('/map', (req, res) => {
  const { start, finish } = req.query;
  if (!start || !finish) {
    return res.status(400).send('Start and finish parameters are required.');
  }
  const route = `Route from ${start} to ${finish}`;
  res.json({ route: `Route from ${start} to ${finish}` });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
