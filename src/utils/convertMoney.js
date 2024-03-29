var ChuSo = new Array(
  ' không ',
  ' một ',
  ' hai ',
  ' ba ',
  ' bốn ',
  ' năm ',
  ' sáu ',
  ' bảy ',
  ' tám ',
  ' chín ',
);
var Tien = new Array('', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ', ' triệu tỷ');

//1. Hàm đọc số có 3 chữ số
function DocSo3ChuSo(baso, isFirst) {
  var tram;
  var chuc;
  var donvi;
  var KetQua = '';
  tram = parseInt(baso / 100);
  chuc = parseInt((baso % 100) / 10);
  donvi = baso % 10;
  if (tram == 0 && chuc == 0 && donvi == 0) return '';
  if (!isFirst) {
    KetQua += ChuSo[tram] + ' trăm ';
    if (chuc == 0 && donvi != 0) KetQua += ' linh ';
  } else {
    if (tram != 0) {
      KetQua += ChuSo[tram] + ' trăm ';
      if (chuc == 0 && donvi != 0) KetQua += ' linh ';
    }
  }
  if (chuc != 0 && chuc != 1) {
    KetQua += ChuSo[chuc] + ' mươi';
    if (chuc == 0 && donvi != 0) KetQua = KetQua + ' linh ';
  }
  if (chuc == 1) KetQua += ' mười ';
  switch (donvi) {
    case 1:
      if (chuc != 0 && chuc != 1) {
        KetQua += ' mốt ';
      } else if (chuc == 1) {
        KetQua += ' một ';
      } else {
        KetQua += ChuSo[donvi];
      }
      break;
    case 5:
      if (chuc == 0) {
        KetQua += ChuSo[donvi];
      } else {
        KetQua += ' lăm ';
      }
      break;
    default:
      if (donvi != 0) {
        KetQua += ChuSo[donvi];
      }
      break;
  }
  return KetQua;
} // End fucntion Docsoco3chuso
//2. Hàm đọc thành chữ (Sử dụng hàng đọc có 3 chữ số)
export const convertMoney = function(value, typeCurrence = 'VND') {
  var SoTien = value;
  var _typeCurrence = typeCurrence;
  var strTienNguyen = SoTien.toString().split('.')[0];
  var strTienLe = SoTien.toString().split('.')[1];
  var strDocTienLe = '';
  var lan = 0;
  var i = 0;
  var so = 0;
  var KetQua = '';
  var tmp = '';
  var ViTri = new Array();
  if (SoTien < 0) return 'Số tiền âm !';
  if (SoTien == 0) {
    if (typeCurrence === 'VND') {
      return 'Không đồng';
    } else {
      if (typeCurrence === 'USD') {
        return 'Không đô la Mỹ';
      }
    }
  }
  if (SoTien > 0) {
    so = SoTien;
  } else {
    so = -SoTien;
  }
  if (SoTien > 8999999999999999) {
    //SoTien = 0;
    return 'Sô quá lớn!';
  }
  ViTri[5] = Math.floor(so / 1000000000000000);
  if (isNaN(ViTri[5])) ViTri[5] = '0';
  so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
  ViTri[4] = Math.floor(so / 1000000000000);
  if (isNaN(ViTri[4])) ViTri[4] = '0';
  so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
  ViTri[3] = Math.floor(so / 1000000000);
  if (isNaN(ViTri[3])) ViTri[3] = '0';
  so = so - parseFloat(ViTri[3].toString()) * 1000000000;
  ViTri[2] = parseInt(so / 1000000);
  if (isNaN(ViTri[2])) ViTri[2] = '0';
  ViTri[1] = parseInt((so % 1000000) / 1000);
  if (isNaN(ViTri[1])) ViTri[1] = '0';
  ViTri[0] = parseInt(so % 1000);
  if (isNaN(ViTri[0])) ViTri[0] = '0';
  if (ViTri[5] > 0) {
    lan = 5;
  } else if (ViTri[4] > 0) {
    lan = 4;
  } else if (ViTri[3] > 0) {
    lan = 3;
  } else if (ViTri[2] > 0) {
    lan = 2;
  } else if (ViTri[1] > 0) {
    lan = 1;
  } else {
    lan = 0;
  }
  for (i = lan; i >= 0; i--) {
    tmp = DocSo3ChuSo(ViTri[i], i == lan);
    KetQua += tmp;
    if (ViTri[i] > 0) KetQua += Tien[i];
    if (i > 0 && tmp.length > 0) KetQua += ','; //&& (!string.IsNullOrEmpty(tmp))
  }
  if (KetQua.substring(KetQua.length - 1) == ',') {
    KetQua = KetQua.substring(0, KetQua.length - 1);
  }
  if (strTienLe !== undefined && parseFloat(strTienLe) !== 0) {
    strTienLe = strTienLe + '00';
    strDocTienLe = DocSo3ChuSo(strTienLe.substring(0, 2), false);
    if (_typeCurrence == 'VND') {
      KetQua =
        KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2) + ' đồng';
    } else {
      KetQua =
        KetQua.substring(1, 2).toUpperCase() +
        KetQua.substring(2) +
        ' đô la Mỹ và ' +
        strDocTienLe +
        ' xu';
    }
  } else {
    if (_typeCurrence == 'VND') {
      KetQua =
        KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2) + ' đồng';
    } else {
      KetQua =
        KetQua.substring(1, 2).toUpperCase() +
        KetQua.substring(2) +
        ' đô la Mỹ';
    }
  }
  return KetQua;
};
