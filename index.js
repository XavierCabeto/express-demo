const express = require("express");

const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  return res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send("The course with the give ID was not found.");

  return res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);

  return res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send("The course with the give ID was not found.");

  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error);

  course.name = req.body.name;

  return res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course)
    res.status(404).send("The course with the give ID was not found.");

  const index = courses.indexOf(course);

  courses.splice(index, 1);

  return res.send(course);
});

function validateCourse(course) {
  if (!course.name) return { error: "Name is required." };

  if (course.name.length < 3)
    return { error: "Name should be minimun 3 characters." };

  return { error: null };
}

app.listen(3000);
