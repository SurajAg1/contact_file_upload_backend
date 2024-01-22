const express = require('express');
const cors = require('cors');
const multer = require('multer');
const csv = require('csv-parser'); // Install with: npm install csv-parser

const app = express();
const port = 3001;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // Assuming the file is in CSV format
  const results = [];
  
  file.buffer // Access the buffer containing the file data
    .toString('utf-8')
    .split('\n')
    .forEach(line => {
      // Parse CSV lines and push them to the results array
      const values = line.split(',');
      results.push(values);
    });

  return res.status(200).json({ message: 'File uploaded successfully.', data: results });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
