const fs = require('fs');
fs.readFile('./input.txt', (e, data) => {

  const input = data.toString().trim().split('\r\n');

  const passports = [];
  let passportCount = 0;
  input.forEach(line => {
    if (line === '') {
      passportCount++;
    }

    if (passports[passportCount]) {
      passports[passportCount] = passports[passportCount] + ' ' + line;
    } else {
      passports[passportCount] = line;
    }
  });

  function countValidPassports(passports) {
    const fields = [
      {
        name: 'byr',
        required: true,
      },
      {
        name: 'iyr',
        required: true,
      },
      {
        name: 'eyr',
        required: true,
      },
      {
        name: 'hgt',
        required: true,
      },
      {
        name: 'hcl',
        required: true,
      },
      {
        name: 'ecl',
        required: true,
      },
      {
        name: 'pid',
        required: true,
      },
      {
        name: 'cid',
        required: false,
      },
    ];


    return passports.reduce((acc, cur) => {
      let isValid = true;
      fields.forEach(field => {
        if (field.required && !cur.includes(field.name + ':')) {
          isValid = false;
          return;
        }
      });

      if (isValid) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
  }
  
  console.log(countValidPassports(passports));
});
