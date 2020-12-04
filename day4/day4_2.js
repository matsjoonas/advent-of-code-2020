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
    const fieldDefs = [
      {
        name: 'byr',
        required: true,
        length: 4,
        min: 1920,
        max: 2002,
      },
      {
        name: 'iyr',
        required: true,
        length: 4,
        min: 2010,
        max: 2020,
      },
      {
        name: 'eyr',
        required: true,
        length: 4,
        min: 2020,
        max: 2030,
      },
      {
        name: 'hgt',
        required: true,
      },
      {
        name: 'hcl',
        required: true,
        length: 7,
      },
      {
        name: 'ecl',
        required: true,
        length: 3,
        acceptedValues: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
      },
      {
        name: 'pid',
        required: true,
        length: 9,
      },
      {
        name: 'cid',
        required: false,
      },
    ];

    return passports.reduce((acc, cur) => {
      let isValid = true;
      const fields = {};
      cur.split(' ')
        .map(item => item.split(':'))
        .forEach(item => {
          fields[item[0]] = item[1];
        });

      fieldDefs.forEach(def => {
        const thisFieldValue = fields[def.name];
        if (def.required && !thisFieldValue) {
          isValid = false;
          return;
        }

        if (def.length && thisFieldValue.length !== def.length) {
          isValid = false;
          return;
        }

        if (def.min && parseInt(thisFieldValue) < def.min) {
          isValid = false;
          return;
        }

        if (def.max && parseInt(thisFieldValue) > def.max) {
          isValid = false;
          return;
        }

        if (def.acceptedValues && !def.acceptedValues.includes(thisFieldValue)) {
          isValid = false;
          return;
        }

        if (def.name === 'hgt') {

          const unit = thisFieldValue.substring(thisFieldValue.length - 2);
          const height = parseInt(thisFieldValue.substring(0, thisFieldValue.length - 2));

          if (unit !== 'cm' && unit !== 'in') {
            isValid = false;
            return;
          }

          if (unit === 'cm') {
            if (height < 150 || height > 193) {
              isValid = false;
              return;
            }
          }

          if (unit === 'in') {
            if (height < 59 || height > 76) {
              isValid = false;
              return;
            }
          }
        }

        if (def.name === 'hcl') {

          const firstChar = thisFieldValue.substring(0, 1);
          const value = thisFieldValue.substring(1)

          if (firstChar !== '#') {
            isValid = false;
            return;
          }
          const regex = /^[0-9_a-zA-Z]+$/g;
          if (!regex.test(value)) {
            isValid = false;
            return;
          }
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
