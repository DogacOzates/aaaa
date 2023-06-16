const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = "app/db/database.sqlite3";
const bodyParser = require("body-parser");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const run = async (sql, db, res, message) => {
  return new Promise((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) {
        res.status(500).send(err);
        return reject();
      } else {
        res.json({ message: message });
        return resolve();
      }
    });
  });
};

const db = new sqlite3.Database(dbPath);

app.get("/api/v1/rooms", (req, res) => {
  db.all("SELECT * FROM rooms", (err, rows) => {
    res.json(rows);
  });
});

app.get("/api/v1/rooms/:id", (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM rooms WHERE id = ${id}`, (err, row) => {
    res.json(row);
  });
});

app.post("/api/v1/rooms", async (req, res) => {
  const name = req.body.name;
  await run(
    `INSERT INTO rooms (name) VALUES ("${name}")`,
    db,
    res,
    "Create a new room"
  );
});

app.put("/api/v1/rooms/:id", async (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM rooms WHERE id=${id}`, async (err, row) => {
    const name = req.body.name ? req.body.name : row.name;
    await run(
      `UPDATE rooms SET name="${name}" WHERE id=${id}`,
      db,
      res,
      "Updated room information"
    );
  });
});

app.delete("/api/v1/rooms/:id", async (req, res) => {
  const id = req.params.id;
  await run(
    `DELETE FROM rooms WHERE id=${id}`,
    db,
    res,
    "Deleted room information"
  );
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/chat.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (message) => {
    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(port, () => {
  console.log("Listen on port: " + port);
});
