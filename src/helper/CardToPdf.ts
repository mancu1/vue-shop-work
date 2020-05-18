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
    format: [size * 45 + 300, 300],
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
  doc.text("Чек продажи", 15, 25);
  doc.setFontSize(13);
  doc.text("Электронная касса", 15, 50);
  doc.text(moment().locale("ru").format("DD MMMM YYYY hh:mm"), 15, 60);
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.count;
    doc.text(
      `${item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name} ${
        item.size
      }`,
      15,
      90 + 35 * index
    );
    doc.text(
      `${item.count} шт. * ${item.price} ₽ = ${item.price * item.count} ₽`,
      210,
      100 + 35 * index,
      null,
      null,
      "right"
    );
  });
  doc.setFontSize(16);
  doc.text(`Итог = ${total} ₽`, 15, 150 + cart.length * 35);
  doc.save("result.pdf");
}
