const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const [rulesPartOne, input] = text.split("\n\n");
const text2 = fs.readFileSync("input2.txt", { encoding: "utf-8"});
const [rulesPartTwo] = text2.split('\n\n');
const tests = input.split('\n');

//Part One V2
const ruleObj1 = buildRuleObject(rulesPartOne);
const ruleRegex1 = buildRuleRegex(ruleObj1, '0');
const partOneMatches = tests.filter(str => ruleRegex1.test(str)).length;
console.log('Part 1: ' + partOneMatches);

//Part Two
const longest = tests.reduce(
  function (a, b) {
      return a.length > b.length ? a : b;
  }
).length;
const ruleObj2 = buildRuleObject(rulesPartTwo);
const ruleRegex2 = buildRuleRegex(ruleObj2, '0');


function buildRuleObject(rules) {
  let object = {};
  rules.split('\n').forEach(r => {
    [key, d] = r.split(': ');
    if (['"a"', '"b"'].includes(d)) {
      object[key] = {'rule': d.replace(/"/g, ''), 'solved': true};
    } else {
      object[key] = {'rule': d, 'solved': d === '"a"'};
    }
  });

  return object;
}

function buildRuleRegex(ruleObj, ruleKey) {
  return new RegExp('^' + regexLoop(ruleKey).replace(/ /g, '') + '$');

  function regexLoop(ruleKey) {
    const rule = ruleObj[ruleKey];
    if (rule.solved) {
      return rule.rule;
    } 
    if (rule.rule.split(' ').includes(ruleKey)) {
      //We have a loop!!
      if (ruleKey == 8) {
        //For rule 8 we can just use regex trickery
        rule.rule = '(?:' + regexLoop('42') + ')+';
      } else {
        //Rule 11 is essentially a palindrome which we know is 
        //impossible to test for with raw regex
        const rule42 = regexLoop('42');
        const rule32 = regexLoop('32');
        const iterations = longest / (rule42.replace(/[^ab]/g, '').length + rule32.replace(/[^ab]/g, '').length);
        for (let i = 0; i < iterations; i++) {
          rule.rule = '(?:' + rule.rule + ')'
        }
      }
    } else {
      rule.rule = '(?:' + rule.rule.replace(/[0-9]+/ig, regexLoop) + ')';
    }
    
    rule.solved = true;
    return rule.rule
  } 
}