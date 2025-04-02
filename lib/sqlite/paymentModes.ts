import { IPaymentType } from "components/view_order/Payment";
import { openDatabaseAsync } from "expo-sqlite";

const TABLE_NAME = "PAYMENT_MODES";
// create table paymentModes
export async function createTable() {
  const DB = await openDatabaseAsync("app.db");
  try {
    await DB.execAsync(
      `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name VARCHAR(100),
         createdAt DATETIME NOT NULL default CURRENT_TIMESTAMP
    )`
    );
  } catch (error) {
    throw error;
  }
}

// insert into paymentModes
export async function insertPaymentMode(name: string) {
  const DB = await openDatabaseAsync("app.db");
  try {
    await createTable();
    await DB.runAsync(`INSERT INTO ${TABLE_NAME} (name) VALUES ('${name}')`);
  } catch (error) {
    throw error;
  }
}

// select all from paymentModes
export async function selectAllPaymentModes(): Promise<IPaymentType[]> {
  const DB = await openDatabaseAsync("app.db");
  try {
    await createTable();

    const rows = await DB.getAllAsync(`SELECT * FROM ${TABLE_NAME}`);

    return rows as IPaymentType[];
  } catch (error) {
    throw error;
  }
}

// delete from paymentModes
export async function deletePaymentMode(id: number) {
  const DB = await openDatabaseAsync("app.db");
  try {
    await DB.runAsync(`DELETE FROM ${TABLE_NAME} WHERE id = ${id}`);
  } catch (error) {
    throw error;
  }
}

// update paymentMode
export async function updatePaymentMode(id: number, name: string) {
  const DB = await openDatabaseAsync("app.db");
  try {
    await DB.runAsync(
      `UPDATE ${TABLE_NAME} SET name = '${name}' WHERE id = ${id}`
    );
  } catch (error) {
    throw error;
  }
}
