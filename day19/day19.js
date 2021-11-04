const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const [rulesPartOne, input] = text.split("\n\n");
const text2 = fs.readFileSync("input2.txt", { encoding: "utf-8"});
const [rulesPartTwo] = text2.split('\n\n');
const tests = input.split('\n');
//Part one redone
let ruleObj = {};
const ruleRegex = buildRulesV2(rulesPartOne);
const partOneMatches = tests.filter(str => ruleRegex.test(str)).length;
console.log('Part 1: ' + partOneMatches);

//Part two
//Manual job 
Object.keys(ruleObj).forEach(key => {
  if (key !== '123' || key !== '97')
  ruleObj[key].solved = false;
})
ruleObj['8'].rule = '(?:(?:' + ruleObj['42'].rule + ')+)';
ruleObj['8'].solved = true;
for (let i = 0; i < 15; i++) {
  ruleObj['11'].rule = '(?:' + ruleObj['11'].rule + '|' + ruleObj['42'].rule + ruleObj['11'].rule + ruleObj['31'].rule + ')';
} 
ruleObj['11'].solved = true;
const ruleRegex2 = buildRuleRegex('0');
const partTwoMatches = tests.filter(str => ruleRegex2.test(str)).length;
console.log('Part 2: ' + partTwoMatches);

function buildRulesV2(rules) {
  rules.split('\n').forEach(r => {
    [key, d] = r.split(': ');
    if (['"a"', '"b"'].includes(d)) {
      ruleObj[key] = {'rule': d.replace(/"/g, ''), 'solved': true};
    } else {
      ruleObj[key] = {'rule': d, 'solved': d === '"a"'};
    }
  });

  return buildRuleRegex('0');
}

function buildRuleRegex(ruleKey) {
  return new RegExp('^' + regexLoop(ruleKey).replace(/ /g, '') + '$');

  function regexLoop(ruleKey) {
    const rule = ruleObj[ruleKey];
    if (rule.solved) {
      return rule.rule;
    } 
    if (ruleKey === '8') {
      return '(?:' + regexLoop('42') +')+'
    }
    rule.rule = '(?:' + rule.rule.replace(/[0-9]+/ig, regexLoop) + ')';
    rule.solved = true;
    return rule.rule
  } 
}