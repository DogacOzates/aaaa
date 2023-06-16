CREATE TABLE users (  
  id INTEGER NOT NULL PRIMARY KEY, 
  name TEXT NOT NULL, 
  profile TEXT, 
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')), 
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);

CREATE TABLE rooms (
	id INTEGER NOT NULL PRIMARY KEY,
	name TEXT NOT NULL,
	created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')), 
	updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);

.tables: show all tables
.schema: show data of tables
.exit: finish sqlite

INSERT INTO rooms (name) VALUES ("Music");
INSERT INTO rooms (name) VALUES ("Anime");
INSERT INTO rooms (name) VALUES ("Sports");


INSERT INTO users (name, profile) VALUES ("Subaru", "エミリアたんマジ天使！");

 "start": "nodemon app/app.js",