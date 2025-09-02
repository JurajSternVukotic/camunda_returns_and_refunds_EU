const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; 

app.use(bodyParser.json());

app.post('/refund', (req, res) => {
  console.log('REFUND SERVICE: Received request:', req.body);
  
  const { orderId, refundAmount } = req.body;

  if (!orderId || refundAmount === undefined) {
    return res.status(400).json({ error: 'Nedostaje orderId ili refundAmount' });
  }

  const transactionId = `TXN-${Date.now()}`;
  
  const response = {
    status: 'success',
    transactionId: transactionId,
    message: `Povrat novca ${refundAmount} EUR za narudžbu ${orderId} je procesirana.`
  };

  console.log('REFUND SERVICE: Sending response:', response);
  
  res.status(200).json(response);
});

app.listen(port, () => {
  console.log(`Refund Service listening at http://localhost:${port}`);
});

