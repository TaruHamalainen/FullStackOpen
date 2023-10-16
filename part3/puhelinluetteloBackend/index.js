import express from "express";

const app = express();
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

// Get all persons
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

// Get info
app.get("/info", (req, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`
  );
});

// get person by id
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// delete person
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

// add new person
app.post("/api/persons", (req, res) => {
  const person = req.body;
  const id = Math.floor(Math.random() * 1000);
  person.id = id;
  console.log(person);
  res.json(person);
});

const PORT = 3000;
app.listen(PORT);
console.log("Server running at port", PORT);
