const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const [rules, input] = text.split("\n\n");

//Part one redone
ruleRegex = buildRulesV2(rules);
console.log(ruleRegex)
console.log(input.split('\n').filter(str => ruleRegex.test(str)).length);

function buildRulesV2(rules) {
  let ruleObj = {};
  rules.split('\n').forEach(r => {
    [key, d] = r.split(': ');
    if (['"a"', '"b"'].includes(d)) {
      ruleObj[key] = {'rule': d.replace(/"/g, ''), 'solved': true};
    } else {
      ruleObj[key] = {'rule': d, 'solved': d === '"a"'};
    }
  });
  
  return new RegExp('^' + giveRuleRegex('0').replace(/ /g, '') + '$');
  
  function giveRuleRegex(ruleKey) {
    const rule = ruleObj[ruleKey];
    if (rule.solved) {
      return rule.rule;
    } 
    rule.rule = '(?:' + rule.rule.replace(/[0-9]+/ig, giveRuleRegex) + ')';
    rule.solved = true;
    return rule.rule
  }
}


