// 「3 張」「30 天」：數字與緊接的中文單位之間改用不斷行空格，換行時不會被拆開
export function keepNumberWithUnit(s) {
  return s.replace(/(\d) (?=[㐀-鿿])/g, '$1 ');
}
