const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const groups = data.split(/\r\n{2,}/);

const rules = {};

groups[0].split(/\n/).forEach((rule) => {
  let [name, ranges] = rule.split(":");
  [name, ranges] = [name.trim(), ranges.split(/ or /)];
  rules[name] = rules[name] || [];
  ranges.forEach((range) => {
    rules[name].push(range.split("-").map((x) => +x.trim()));
  });
});
const rulesAll = Object.values(rules);

const tickets = groups[2]
  .split(/\n/)
  .map((raw, i) => {
    if (i === 0) return;
    const values = raw.split(",").map(Number);
    const good = values.every((value) =>
      rulesAll.some((ranges) => ranges.some(([low, high]) => value >= low && value <= high))
    );
    return good ? values : null;
  })
  .filter(Boolean);

const mine = groups[1].split(/\n/)[1].split(",").map(Number);
tickets.unshift(mine);

const allFieldNames = Object.keys(rules);
let candidates = Array.from({ length: tickets[0].length }, () => [...allFieldNames]);

tickets.forEach((values) =>
  values.forEach((v, ind) => {
    candidates[ind] = candidates[ind].filter((name) => rules[name].some(([low, high]) => v >= low && v <= high));
  })
);

do {
  const found = candidates.filter(options => options.length === 1).map(options => options[0]);
  candidates = candidates.map(options => (options.length === 1 ? options : options.filter(name => !found.includes(name))))
  if (found.length === allFieldNames.length) break;
} while (true);

const result = candidates.reduce((acc, [name], ind) => name.startsWith("departure") ? acc * mine[ind] : acc, 1)
console.log(result);
