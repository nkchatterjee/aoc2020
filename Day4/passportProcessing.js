const fs = require('fs');
const data = fs.readFileSync("input").toString().split('\n\n');
const required_keys =  ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
let [out1, out2] = [0, 0];

data.forEach((PassportData) => {
    const row = PassportData.split(/[\n ]{1,}/g);
    const entries = row.reduce((accum, info) => {
        accum.push(info.split(":"));
        return accum;
    }, []);
    const d = Object.fromEntries(entries);
    const keys = Object.keys(d);
    let flag = true;
    required_keys.forEach((key) => {
        if (! keys.includes(key)) {
            flag = false;
            return
        }
    })
    if(flag){

        out1++;
        if (2002 >= Number(d['byr']) &&  Number(d['byr']) >= 1920
            && 2020 >= Number(d['iyr']) && Number(d['iyr']) >= 2010
            && 2030 >= Number(d['eyr']) && Number(d['eyr'])>= 2020 
            && ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(d['ecl'])
            && d['hcl'].match(/^#[0-9a-f]{6}$/) 
            && d['pid'].match(/^\d{9}$/)
            ){
            const height = d['hgt'];
            if ((height.slice(-2) === 'cm' && 150 <= Number(height.slice(0,-2)) &&  Number(height.slice(0,-2)) <= 193)
            || (height.slice(-2) === 'in' && 59 <= Number(height.slice(0,-2)) && Number(height.slice(0,-2)) <= 76)){

                out2++;
            }
        }
    }    
})
console.log(`There are ${out1} valid passports according to part 1.`);
console.log(`There are ${out2} valid passports according to part 2.`);