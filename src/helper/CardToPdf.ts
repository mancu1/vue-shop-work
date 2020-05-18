import jsPDF from "jspdf";
import axios from "axios";
import moment from "moment";
import { Buffer } from "buffer/";
import { CartItemType } from "@/types/CartItemType";

function getBase64(url: string) {
  return axios
    .get(url, {
      responseType: "arraybuffer",
    })
    .then((response) =>
      Buffer.from(response.data, "binary").toString("base64")
    );
}

function createPdf(size: number) {
  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: [size * 15 + 200, 240],
    putOnlyUsedFonts: true,
  });
  return new Promise<jsPDF>((resolve, reject) => {
    getBase64(require("../assets/fonts/PTSans-Regular.ttf"))
      .then((base64) => {
        doc.addFileToVFS("PTSans-Regular-normal.ttf", base64);
        doc.addFont("PTSans-Regular-normal.ttf", "PTSans-Regular", "normal");
        doc.setFont("PTSans-Regular"); // set font
        resolve(doc);
      })
      .catch(() => reject());
  });
}

export default async function (cart: CartItemType[]) {
  const doc = await createPdf(cart.length);
  doc.setFont("PTSans-Regular"); // set font
  doc.setFontSize(20);
  doc.text("Чек продажи", 10, 20);
  doc.setFontSize(13);
  doc.text("Новая касса", 10, 50);
  doc.text(moment().locale("ru").format("DD MMMM YYYY"), 10, 60);
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.count;
    doc.text(
      `${item.name} - ${item.count} * ${item.price}  = ${
        item.price + item.count
      }`,
      10,
      90 + 15 * index
    );
  });
  doc.setFontSize(16);
  doc.text(`Итог = ${total}`, 10, 110 + cart.length * 15);
  doc.save("result.pdf");
}
