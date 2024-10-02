import * as SQLite from 'expo-sqlite/legacy';
// import SQLite from 'react-native-sqlite-storage';


// Open or create the database
const db = SQLite.openDatabase('EasyDayDB.db');

// Create tables function
export const createTables = () => {
  db.transaction(tx => {
    // Create Users table
    // tx.executeSql(
    //   `CREATE TABLE IF NOT EXISTS Users (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     username TEXT NOT NULL,
    //     email TEXT NOT NULL UNIQUE,
    //     password TEXT NOT NULL
    //   );`,
    //   [],
    //   () => { console.log('Users table created successfully'); },
    //   (tx, error) => { console.log('Error creating Users table', error); }
    // );

    // // Create Tasks table
    // tx.executeSql(
    //   `CREATE TABLE IF NOT EXISTS Tasks (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     user_id INTEGER NOT NULL,
    //     task TEXT NOT NULL,
    //     repeat TEXT,
    //     set_time_start TEXT,
    //     set_time_end TEXT,
    //     task_state TEXT,
    //     set_date DATE,
    //     reminder INTEGER DEFAULT 0,
    //     FOREIGN KEY(user_id) REFERENCES Users(id)
    //   );`,
    //   [],
    //   () => { console.log('Tasks table created successfully'); },
    //   (tx, error) => { console.log('Error creating Tasks table', error); }
    // );

    // Create Birthdays table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Birthdays (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        day INTEGER, 
        month TEXT, 
        customDay TEXT
      );`,
      [],
      () => { console.log('Birthdays table created successfully'); },
      (tx, error) => { console.log('Error creating Birthdays table', error); }
    );
  });
};

export default db;