// Create web server
// npm install express
// npm install body-parser
// npm install morgan
// npm install cors

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// Create the server
const app = express();

// Enable CORS
app.use(cors());

// Enable body parser
app.use(bodyParser.json());

// Enable logging
app.use(morgan('combined'));

// Define the comments
const comments = [
  { id: 1, author: 'John', text: 'Hello!' },
  { id: 2, author: 'Tom', text: 'Hi!' },
  { id: 3, author: 'Alice', text: 'Good morning!' },
];

// Define the next id
let nextId = 4;

// Define the routes
app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
    const comment = {
        id: nextId++,
        author: req.body.author,
        text: req.body.text
    };
    comments.push(comment);
    res.json(comment);
}
);

app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = comments.findIndex(comment => comment.id === id);
    if (index !== -1) {
        comments.splice(index, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
}
);

app.put('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = comments.findIndex(comment => comment.id === id);
    if (index !== -1) {
        comments[index].author = req.body.author;
        comments[index].text = req.body.text;
        res.json(comments[index]);
    } else {
        res.sendStatus(404);
    }
}
);

app.get('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
        res.json(comment);
    } else {
        res.sendStatus(404);
    }
}
);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
// Run the server
// node comments.js
// Open a browser and go to http://localhost:3000/comments