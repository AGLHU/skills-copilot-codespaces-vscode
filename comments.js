// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Use the body-parser middleware
app.use(bodyParser.json());

// Create a new comment
app.post('/comments', (req, res) => {
  // Read the comments from comments.json
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments.json');
      return;
    }

    // Parse the JSON data
    const comments = JSON.parse(data);
    // Add the new comment
    comments.push(req.body);
    // Write the comments back to the file
    fs.writeFile('comments.json', JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error writing comments.json');
        return;
      }
      res.send('Comment added');
    });
  });
});

// Get all comments
app.get('/comments', (req, res) => {
  // Read the comments from comments.json
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments.json');
      return;
    }

    // Parse the JSON data
    const comments = JSON.parse(data);
    res.send(comments);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});