﻿import { jsPDF } from "jspdf"
var callAddFont = function () {
this.addFileToVFS('NotoSansSymbols2-Regular-normal.ttf', font);
this.addFont('NotoSansSymbols2-Regular-normal.ttf', 'NotoSansSymbols2-Regular', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])