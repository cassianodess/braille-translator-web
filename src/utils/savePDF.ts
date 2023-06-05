import {jsPDF} from "jspdf";
import "../assets/fonts/NotoSansSymbols2-Regular-normal.js"

export function savePDF(text: string, filename: string) {
    const doc = new jsPDF();
    doc.setFont("NotoSansSymbols2-Regular");
    doc.setFontSize(12);
    doc.text(text, 10, 10, {
        align: "justify",
        maxWidth: 200,
        lineHeightFactor: 1.5,
    });
    doc.save(`${filename}.pdf`);

}