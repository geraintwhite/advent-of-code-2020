const fs = require('fs');

const data = fs.readFileSync(__dirname + '/data.txt').toString();

const lines = data.split('\n\n').map(x => x.replace(/\n/g, ' ')).filter(Boolean);

const testData = [
  'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm',
  'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884 hcl:#cfa07d byr:1929',
  'hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm',
  'hcl:#cfa07d eyr:2025 pid:166559648 iyr:2011 ecl:brn hgt:59in'
];

const fields = [
  { key: 'byr', name: '(Birth Year)', validate: value => value.length === 4 && parseInt(value) >= 1920 && parseInt(value) <= 2002 },
  { key: 'iyr', name: '(Issue Year)', validate: value => value.length === 4 && parseInt(value) >= 2010 && parseInt(value) <= 2020 },
  { key: 'eyr', name: '(Expiration Year)', validate: value => value.length === 4 && parseInt(value) >= 2020 && parseInt(value) <= 2030 },
  { key: 'hgt', name: '(Height)', validate: value => /^\d+cm$/.test(value) ? (parseInt(value) >= 150 && parseInt(value) <= 193) : /^\d+in$/.test(value) ? (parseInt(value) >= 59 && parseInt(value) <= 76) : false},
  { key: 'hcl', name: '(Hair Color)', validate: value => /^#[0-9a-f]{6}$/.test(value) },
  { key: 'ecl', name: '(Eye Color)', validate: value => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value) },
  { key: 'pid', name: '(Passport ID)', validate: value => /^[0-9]{9}$/.test(value) },
  { key: 'cid', name: '(Country ID)', optional: true }
];

const validatePassport = (passport, field) => {
  return passport[field.key] ? field.validate(passport[field.key]) : false;
};

const parsePassport = (passport, validate) => {
  const obj = passport.split(' ').reduce((output, part) => {
    const [key, value] = part.split(':');
    return { ...output, [key]: value };
  }, {});


  return fields.every(f => f.optional || f.key in obj && !validate || validatePassport(obj, f));
};

const checkPassports = (passports, validate = false) => passports.filter(passport => parsePassport(passport, validate)).length;

console.log('04-a-test', checkPassports(testData));

console.log('04-a-live', checkPassports(lines));

console.log('04-b-test', checkPassports(testData, true));

console.log('04-b-live', checkPassports(lines, true));
