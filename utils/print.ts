import { BluetoothEscposPrinter } from "@brooons/react-native-bluetooth-escpos-printer";
import moment from "moment";
import { NewOrder } from "types/order";
import { formatToKES } from "utils";

async function printNewLines(lines: number) {
  const newLines = Array(lines).fill("\r\n").join("");

  return await BluetoothEscposPrinter.printText(newLines, {});
}

const printCenterBoldText = async (text: string) => {
  return Promise.all([
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER
    ),
    await BluetoothEscposPrinter.printText(text, {
      codepage: 0,
    }),
    await printNewLines(1),
  ]);
};

const printLeftText = async (text: string) => {
  await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
  await BluetoothEscposPrinter.printText(text, {});
  await printNewLines(1);
};

const printHeader = async () => {
  await BluetoothEscposPrinter.printerAlign(
    BluetoothEscposPrinter.ALIGN.CENTER
  );
  await printCenterBoldText("The DON Laundry Services");
  await printCenterBoldText("Order Receipt");
  await printNewLines(1);
};

const printFooter = async () => {
  //empty space
  await printCenterBoldText(`Support Tel: 254712345887`); // Replace with actual phone number
  await printCenterBoldText(`Address: 123 Embakasi, Nairobi, Kenya`); // Replace with actual address
  await printCenterBoldText(`Thank you for your business!`); // Replace with actual address

  await printCenterBoldText("Powered By Cruiz Tech ");
  await printCenterBoldText("\n");

  await printNewLines(3);
  await BluetoothEscposPrinter.cutOnePoint();
};

export const handlePrintReceipt = async (order: NewOrder, balance?: number) => {
  try {
    // Print header
    await printHeader();

    // Print order details

    await printLeftText(
      `Order Date: ${moment(new Date(), "yyyy-mm-dd h:MM:ss")}`
    );
    await printLeftText(`Order ID: #FUA321142`);
    await printNewLines(1);
    await printLeftText(`Customer Details:`);
    await printLeftText(`Name: ${order.customerName || "N/A"}`);
    await printLeftText(`Phone: ${order.customerPhone || "N/A"}`);
    await printNewLines(1);
    // Print laundry items
    await printLeftText("Laundry Items:");
    for (const item of order.laundryItems) {
      await printLeftText(
        `${item.laundryCategory.name} - ${item.quantity} ${
          item.laundryCategory.unit
        }(s) @ ${formatToKES(item.laundryCategory.unitPrice)}`
      );
    }
    await printNewLines(1);
    await printLeftText(`Total: ${formatToKES(order.totalAmount) || 0}`);
    await printLeftText(
      `Amount to pay: ${formatToKES(order.paymentAmount || 0)}`
    );
    if (balance !== undefined) {
      await printLeftText(`Balance: ${formatToKES(balance)}`);
    }

    // Footer
    await printNewLines(1);
    await printFooter();
  } catch (error) {
    console.error("Error while printing receipt:", error);
  }
};
