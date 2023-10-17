import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

const app = express();

// morgan
morgan("tiny");
morgan.token("showData", function (req) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms | :showData"
  )
);

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

// generate random id
const generateId = () => {
  const id = Math.floor(Math.random() * 1000);
  return id;
};

// Get all persons
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

// get info
app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info for ${persons.length} people <br> ${new Date()}`
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

// add person
app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({
      error: "Name is missing",
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: "Number is missing",
    });
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  res.json(person);
});

// listen to port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
