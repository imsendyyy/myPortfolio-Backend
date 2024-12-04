const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/projects', require('./routes/project'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/userInfo', require('./routes/user'));
app.use('/api/testimonial', require('./routes/testimonial'));
app.use('/api/blogs', require('./routes/blogs'));

app.use('/api/auth', require('./routes/auth'));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
