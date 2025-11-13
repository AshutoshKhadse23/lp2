const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your real MongoDB URI (e.g., MongoDB Atlas or local mongodb://localhost:27017/eventsdb)
const MONGO_URI = 'mongodb://localhost:27017/';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(e => console.error('MongoDB connection error', e));

const regSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  eventId: String,
  createdAt: { type: Date, default: Date.now }
});
const Registration = mongoose.model('Registration', regSchema);

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, mobile, eventId } = req.body;
    if (!name || !email || !mobile) return res.status(400).json({ error: 'Missing fields' });
    const doc = await Registration.create({ name, email, mobile, eventId });
    res.json({ ok: true, id: doc._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

app.get('/api/participants/:eventId', async (req, res) => {
  const { eventId } = req.params;
  const list = await Registration.find(eventId ? { eventId } : {}).sort('-createdAt').lean();
  res.json(list);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));
