const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; 

app.use(bodyParser.json());

app.post('/validate', (req, res) => {
  console.log('VALIDATION SERVICE: Received request:', req.body);

  const { orderId, purchaseDate } = req.body;

  if (!orderId || !purchaseDate) {
    return res.status(400).json({ error: 'Nedostaje orderId ili purchaseDate' });
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const purchase = new Date(purchaseDate);
  const isApproved = purchase > thirtyDaysAgo;
  
  const response = {
    approved: isApproved,
    reason: isApproved ? 'Povratni period je validan.' : 'Prošlo je 30 dana za povrat.'
  };

  console.log('VALIDATION SERVICE: Sending response:', response);
  res.status(200).json(response);
});

app.listen(port, () => {
  console.log(`Validation Service listening at http://localhost:${port}`);
});
