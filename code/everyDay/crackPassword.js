// LCR 164. 破解闯关密码
var crackPassword = function (password) {
  let sorted = false;

  while (!sorted) {
    sorted = true;
    for (let i = 0; i < password.length - 1; i++) {
      let x = password[i].toString() + password[i + 1].toString();
      let y = password[i + 1].toString() + password[i].toString();

      // console.log(+x < +y, x, y, i, password);
      if (+x > +y) {
        let tem = password[i];
        password[i] = password[i + 1];
        password[i + 1] = tem;
        sorted = false;
      }
    }
  }

  return password.join("");
};

const password = [1, 2, 3, 1];
crackPassword(password);
