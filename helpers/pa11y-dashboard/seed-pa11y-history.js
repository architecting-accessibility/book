// seed-pa11y-history.js
const SEED_TAG = "ten-week-improvement";
const WEEKS = 10;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const tasks = db.getCollection("tasks");
const results = db.getCollection("results");

const task = tasks.find({}).sort({_id: 1}).limit(1).toArray()[0];

if (!task) {
  throw new Error("No Pa11y tasks found. Add and run at least one site first.");
}

print(`Selected task: ${task.name || "(unnamed)"}`);
print(`Task ID: ${task._id}`);
print(`URL: ${task.url || "(no URL)"}`);

const cleanup = results.deleteMany({task: task._id, bookSeed: SEED_TAG});
if (cleanup.deletedCount) {
  print(`Removed ${cleanup.deletedCount} previously seeded result(s).`);
}

const latest = results.find({
  task: task._id,
  bookSeed: {$ne: SEED_TAG}
}).sort({date: -1}).limit(1).toArray()[0];

if (!latest) {
  throw new Error("The selected task has no scan results. Run Pa11y once, then rerun this script.");
}
if (!latest.count) {
  throw new Error("Latest result has no count object.");
}

const finalCounts = {
  error: Number(latest.count.error || 0),
  warning: Number(latest.count.warning || 0),
  notice: Number(latest.count.notice || 0)
};
finalCounts.total = finalCounts.error + finalCounts.warning + finalCounts.notice;

const latestIssues = Array.isArray(latest.results) ? latest.results : [];
const latestIgnore = Array.isArray(latest.ignore) ? latest.ignore : [];

const endDate = Date.now();

results.updateOne({_id: latest._id}, {$set: {date: endDate}});

function issuesOfType(type) {
  return latestIssues.filter(i => i && i.type === type);
}

const finalByType = {
  error: issuesOfType("error"),
  warning: issuesOfType("warning"),
  notice: issuesOfType("notice")
};

const extraAtOldest = {
  error: Math.max(18, Math.ceil(finalCounts.error * 1.5)),
  warning: Math.max(12, Math.ceil(finalCounts.warning * 1.25)),
  notice: Math.max(8, Math.ceil(finalCounts.notice * 1.0))
};

function countForWeek(type, weekIndex) {
  const stepsRemaining = (WEEKS - 1) - weekIndex;
  const extra = Math.round(extraAtOldest[type] * (stepsRemaining / (WEEKS - 1)));
  return finalCounts[type] + extra;
}

function syntheticIssue(type, index, weekIndex) {
  const typeCode = type === "error" ? 1 : type === "warning" ? 2 : 3;
  return {
    code: `BOOK.DEMO.${type.toUpperCase()}.${weekIndex}.${index}`,
    context: `<div data-demo-issue="${type}-${index}">Example historical issue</div>`,
    message: `Synthetic ${type} used to demonstrate improvement over time.`,
    selector: `html > body > div:nth-child(${index + 1})`,
    type,
    typeCode
  };
}

function buildIssues(type, targetCount, weekIndex) {
  const output = finalByType[type].slice(0, targetCount);
  while (output.length < targetCount) {
    output.push(syntheticIssue(type, output.length + 1, weekIndex + 1));
  }
  return output;
}

const inserts = [];

for (let weekIndex = 0; weekIndex < WEEKS - 1; weekIndex++) {
  const weeksBeforeToday = (WEEKS - 1) - weekIndex;
  const date = endDate - (weeksBeforeToday * WEEK_MS);

  const error = countForWeek("error", weekIndex);
  const warning = countForWeek("warning", weekIndex);
  const notice = countForWeek("notice", weekIndex);

  inserts.push({
    task: task._id,
    date,
    count: {
      total: error + warning + notice,
      error,
      warning,
      notice
    },
    ignore: latestIgnore,
    results: [
      ...buildIssues("error", error, weekIndex),
      ...buildIssues("warning", warning, weekIndex),
      ...buildIssues("notice", notice, weekIndex)
    ],
    bookSeed: SEED_TAG,
    bookSeedVersion: 1
  });
}

results.insertMany(inserts);

print("");
print("Created 10 weekly data points ending today:");
print("");

const series = results.find({
  task: task._id,
  date: {
    $gte: endDate - ((WEEKS - 1) * WEEK_MS),
    $lte: endDate
  }
}).sort({date: 1}).toArray();

series.forEach((r, i) => {
  const d = new Date(r.date).toISOString().slice(0, 10);
  const c = r.count || {};
  const marker = r._id.equals(latest._id) ? " (latest genuine scan)" : "";
  print(`${String(i + 1).padStart(2, " ")}. ${d}  errors=${c.error || 0}  warnings=${c.warning || 0}  notices=${c.notice || 0}  total=${c.total || 0}${marker}`);
});

print("");
print("Done. Refresh Pa11y Dashboard to view the history.");
