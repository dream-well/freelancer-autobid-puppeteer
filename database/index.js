var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../data/projects.db');

db.serialize(function() {
    console.log("db connected")
    db.run("CREATE TABLE projects (info TEXT) IF NOT EXISTS `projects`");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});

// db.close();