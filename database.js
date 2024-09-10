import SQLite from 'react-native-sqlite-storage';

// Open or create the database
const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

// Initialize the database (create tables)
export const initializeDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS User (
         id INTEGER PRIMARY KEY AUTOINCREMENT,      -- Unique ID for each user
         username TEXT UNIQUE NOT NULL              -- Username must be unique and not null
         email TEXT UNIQUE NOT NULL                 -- Email must be unique and not null
       );`
    );
    
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ToDoTask (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         user_id INTEGER NOT NULL,
         description TEXT,
         repeat TEXT CHECK(repeat IN ('Once', 'Daily', 'Mon to Fri', 'Customize')),
         start_time TIME,
         end_time TIME,
         task_state TEXT CHECK(task_state IN ('ToDo', 'InProgress', 'Complete')),
         set_date DATE,
         reminder DATETIME,
         FOREIGN KEY (user_id) REFERENCES User(id)
       );`
    );
    
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Birthday (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         user_id INTEGER NOT NULL,
         name TEXT,
         day_month DATE,
         reminder TEXT CHECK(reminder IN ('1 day before', '3 days before', '1 week before')),
         FOREIGN KEY (user_id) REFERENCES User(id)
       );`
    );
  });
};
