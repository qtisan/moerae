/**
* 检验18位身份证号码（15位号码可以只检测生日是否正确即可）
* @author lennon
* @param cid 18为的身份证号码
* @return Boolean 是否合法
**/
export const isCnNewID = (cid) => {
  const arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
  const arrValid = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];// 校验码
  if (/^[1-9][0-7]\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/i.test(cid)) {
    let sum = 0; let idx = 0;
    for (let i = 0; i < cid.length - 1; i++) {
      // 对前17位数字与权值乘积求和
      sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
    }
    // 计算模（固定算法）
    idx = sum % 11;
    // 检验第18为是否与校验码相等
    // eslint-disable-next-line eqeqeq
    return arrValid[idx] == cid.substr(17, 1).toUpperCase();
  } else {
    return false;
  }
};
