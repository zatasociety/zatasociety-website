const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const invoices = require('./routes/invoices');
const utilityPayments = require('./routes/utilityPayments');
const ledgerEntries = require('./routes/ledgerEntries');
const accountingDocuments = require('./routes/accountingDocuments');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/utility-payments', require('./routes/utilityPayments'));
app.use('/api/invoices', invoices);
app.use('/api/utilityPayments', utilityPayments);
app.use('/api/ledgerEntries', ledgerEntries);
app.use('/api/accountingDocuments', accountingDocuments);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
