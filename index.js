// import express from 'express'; // ES6 modules
const express = require('express'); // CommonJS module, equivalent to above
const shortid = require('shortid'); // short id generator

const server = express();

server.use(express.json()); // teaches express how to read JSON from req.body

let hubs = [
    {
        id: shortid.generate(),
        name: 'web 30 node intro',
        lessonId: 1,
        cohort: 'web 30'
    },
    {
        id: shortid.generate(),
        name: 'web 30 node intro',
        lessonId: 101,
        cohort: 'web 30'
    }
];

let lessons = [
    {
        id: shortid.generate(),
        name: 'node intro'
    },
    {
        id: shortid.generate(),
        name: 'java intro'
    }
];

server.get('/', (req, res) => {
    res.status(200).send('<h1>Hello Web 31</h1>')
});

server.get('/api/hubs', (req, res) => {
    res.status(200).json(hubs)
});

server.get('/api/lessons', (req, res) => {
    res.status(200).json(lessons)
});

server.post('/api/hubs', (req, res) => {
    const newHub = req.body; // needs express.json() middleware

    newHub.id = shortid.generate();

    hubs.push(newHub);

    res.status(201).json(newHub);
});

server.post('/api/lessons', (req, res) => {
    const newLesson = req.body;

    newLesson.id = shortid.generate();

    lessons.push(newLesson);

    res.status(201).json(newLesson);
});

server.delete('/api/hubs/:id', (req, res) => {
    const id = req.params.id;

    const deleted = hubs.find(h => h.id === id);

    hubs = hubs.filter(h => h.id !== id);

    res.status(200).json(deleted)
});

server.put('/api/hubs/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    let found = hubs.findIndex(h => h.id === id);

    if(found) {
        // found a hub
        found = Object.assign(found, changes); // same as using the spread operator { ...found, changes }
        res.status(200).json(found);
    } else {
        // did not find a hub with that id
        res.status(404).json({ message: "Hub not found" });
    }

});

const PORT = 8000; // we visit http://localhost:8000/ to see the api
server.listen(PORT, () => console.log(`server running on port ${PORT}`))
