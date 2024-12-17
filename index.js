const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateID = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((p) => Number(p.id))) : 0;
  return String(maxId + 1);
};

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/info", (request, response) => {
  const date = new Date();
  const message = `<h2>PhoneBook has info for ${persons.length} people <br/>
  ${date}
  </h2>`;

  response.send(message);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);

  if (!person) {
    return response.status(404).json({ error: "Person not exist" });
  }

  persons.filter((p) => p !== id);

  response.json(person);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const name = body.name;

  const foundPerson = persons.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );

  if (foundPerson) {
    return response.status(400).json({ error: "Name must be unique" });
  }

  if (!body.name) {
    return response.status(400).json({ error: `content of name missing` });
  }

  if (!body.number) {
    return response.status(400).json({ error: `content of number missing` });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateID(),
  };

  persons.concat(person);

  response.json(person);
});

const PORT = 3001;

app.listen(PORT);
