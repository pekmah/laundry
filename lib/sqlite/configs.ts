import * as SQLite from "expo-sqlite";

export const getDBConnection = async () =>
  await SQLite.openDatabaseAsync("app.db");
