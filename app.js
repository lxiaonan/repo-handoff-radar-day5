const storageKey = "repo-handoff-radar-day5-state";
const textFileLimit = 420;
const maxReadBytes = 220000;
const ignoredDirectoryNames = ["node_modules", ".git", "dist", "build", "coverage", ".next", "vendor", "target", "out", "__pycache__", ".turbo"];

const i18n = {
  zh: {
    eyebrow: "Repo Handoff Radar",
    heroTitle: "导入代码库，直接生成真实可用的交接雷达",
    heroText: "这个工具会在浏览器里真实读取你选择的项目文件夹，分析技术栈、入口文件、依赖、TODO、文档缺口和变更范围，再导出交接包。",
    chipOne: "本地文件夹导入",
    chipTwo: "技术栈与风险扫描",
    chipThree: "交接包导出",
    sampleBtn: "载入示例仓库",
    clearBtn: "清空数据",
    filesLabel: "已分析文件",
    filesHint: "等待导入项目",
    stackLabel: "识别技术信号",
    stackHint: "检测框架与配置",
    riskLabel: "交接风险项",
    riskHint: "找出文档和流程缺口",
    historyLabel: "历史快照",
    historyHint: "本地持久化保存",
    importKicker: "Step 1",
    importTitle: "导入代码库",
    uploadBtn: "选择项目文件夹",
    uploadTitle: "真实本地分析",
    uploadText: "选择本地项目文件夹后，浏览器会直接读取文件名与可解析文本文件，不会上传到服务器。",
    importSummaryTitle: "当前导入状态",
    toAnalysis: "查看分析结果",
    analysisKicker: "Step 2",
    analysisTitle: "结构、技术栈与风险分析",
    toScope: "进入变更交接",
    stackSignalsTitle: "技术栈信号",
    entryFilesTitle: "关键入口",
    moduleMapTitle: "模块地图",
    dependencyTitle: "依赖与配置",
    todoTitle: "TODO / FIXME 热点",
    gapTitle: "文档与流程缺口",
    riskHotspotTitle: "模块风险热点",
    pathSearchTitle: "文件路径搜索",
    scopeKicker: "Step 3",
    scopeTitle: "变更范围与交接包",
    toExport: "进入导出",
    scopeInputTitle: "粘贴变更文件路径",
    refreshScope: "刷新范围分析",
    scopeImpactTitle: "影响范围",
    scopeChecklistTitle: "Scoped checklist",
    handoffTitle: "交接包预览",
    exportKicker: "Step 4",
    exportTitle: "快照、对比与导出",
    saveSnapshot: "保存快照",
    copyMarkdown: "复制 Markdown",
    exportMarkdown: "导出 Markdown",
    exportJson: "导出 JSON",
    importJson: "导入 JSON",
    snapshotTitle: "已保存快照",
    compareTitle: "快照对比",
    coverageTitle: "代码库覆盖概况",
    insightTitle: "即时建议",
    readingOrderTitle: "建议阅读顺序",
    steps: [
      { title: "导入", detail: "读取本地项目文件夹" },
      { title: "分析", detail: "识别结构、依赖和风险" },
      { title: "交接", detail: "生成变更范围交接包" },
      { title: "导出", detail: "保存快照并导出结果" },
    ],
    importFacts: [
      "真正读取你选择的文件夹内容，而不是只展示假数据。",
      "支持检测 package.json、requirements.txt、pom.xml、Cargo.toml 等配置文件。",
      "扫描 TODO、FIXME、HACK，帮助判断哪里最需要先看。",
      "默认忽略 node_modules、dist、build 等噪音目录，避免布局和结果被生成文件污染。",
      "支持粘贴变更文件路径，自动生成 scoped handoff。"
    ],
    emptyState: "还没有导入项目。可以载入示例仓库，或者选择一个本地项目文件夹。",
    importReady: "已读取文件夹，可进入下一步。",
    binaryNote: "已跳过二进制或过大文件",
    stackFallback: "暂未识别到明显框架",
    noTodos: "未扫描到明显 TODO / FIXME 热点。",
    noDeps: "没有识别到常见依赖清单。",
    noEntries: "没有识别到典型入口文件。",
    noGaps: "未发现明显文档缺口，说明这个仓库相对完整。",
    noScope: "还没有输入变更路径，交接包会基于整个仓库。",
    noHotspots: "当前还没有明显热点模块。",
    noPathResults: "没有匹配到文件路径。",
    noSnapshots: "还没有保存快照。",
    copySuccess: "Markdown 已复制。",
    saveSuccess: "快照已保存。",
    importSuccess: "JSON 已导入。",
    deleteText: "删除",
    loadText: "载入",
    compareText: "对比",
    recommendations: [
      "如果 README、agents.md 和测试目录都缺失，这个仓库的交接成本通常会偏高。",
      "先看入口文件和构建配置，再看高频 TODO 区域，理解速度会更快。",
      "如果变更路径集中在一个顶层目录，优先围绕那个模块写 handoff。"
    ],
    gapText: {
      missingReadme: "缺少 README.md",
      missingAgents: "缺少 agents.md",
      missingTests: "未识别到明显测试目录",
      missingCi: "未识别到 CI 工作流",
      missingEnvExample: "存在 .env 相关使用痕迹，但缺少 .env.example"
    },
    factKeys: {
      root: "根目录",
      files: "总文件数",
      analyzedText: "已分析文本文件",
      ignoredNoise: "忽略噪音文件",
      skipped: "跳过文件",
      estimatedTokens: "估算上下文 tokens"
    },
    riskLabels: {
      docCoverage: "文档覆盖",
      testCoverage: "测试信号",
      handoffReadiness: "交接就绪度"
    },
    handoffSections: {
      title: "代码库交接包",
      snapshot: "仓库快照",
      stack: "识别技术栈",
      entries: "建议先看的入口",
      modules: "模块地图",
      scope: "本次变更范围",
      checklist: "Scoped checklist",
      todos: "高优先 TODO 热点",
      gaps: "文档与流程缺口",
      next: "建议交接问题"
    }
  },
  en: {
    eyebrow: "Repo Handoff Radar",
    heroTitle: "Import a repo and generate a real handoff radar",
    heroText: "The app reads the project folder you choose in the browser, detects stack and entry files, scans dependencies, TODOs, documentation gaps, and change scope, then exports a handoff pack.",
    chipOne: "Local folder import",
    chipTwo: "Stack and risk scanning",
    chipThree: "Handoff export",
    sampleBtn: "Load sample repo",
    clearBtn: "Clear data",
    filesLabel: "Analyzed files",
    filesHint: "Waiting for a project import",
    stackLabel: "Stack signals",
    stackHint: "Detect frameworks and config",
    riskLabel: "Handoff risks",
    riskHint: "Find doc and workflow gaps",
    historyLabel: "Snapshots",
    historyHint: "Saved locally",
    importKicker: "Step 1",
    importTitle: "Import a codebase",
    uploadBtn: "Choose project folder",
    uploadTitle: "Real local analysis",
    uploadText: "After you choose a local project folder, the browser reads file names and parseable text files directly. Nothing is uploaded to a server.",
    importSummaryTitle: "Current import status",
    toAnalysis: "Review analysis",
    analysisKicker: "Step 2",
    analysisTitle: "Structure, stack, and risk analysis",
    toScope: "Go to scoped handoff",
    stackSignalsTitle: "Stack signals",
    entryFilesTitle: "Key entry points",
    moduleMapTitle: "Module map",
    dependencyTitle: "Dependencies and config",
    todoTitle: "TODO / FIXME hotspots",
    gapTitle: "Documentation and workflow gaps",
    riskHotspotTitle: "Module risk hotspots",
    pathSearchTitle: "File path search",
    scopeKicker: "Step 3",
    scopeTitle: "Change scope and handoff pack",
    toExport: "Go to export",
    scopeInputTitle: "Paste changed file paths",
    refreshScope: "Refresh scope analysis",
    scopeImpactTitle: "Impact scope",
    scopeChecklistTitle: "Scoped checklist",
    handoffTitle: "Handoff preview",
    exportKicker: "Step 4",
    exportTitle: "Snapshots, compare, and export",
    saveSnapshot: "Save snapshot",
    copyMarkdown: "Copy Markdown",
    exportMarkdown: "Export Markdown",
    exportJson: "Export JSON",
    importJson: "Import JSON",
    snapshotTitle: "Saved snapshots",
    compareTitle: "Snapshot compare",
    coverageTitle: "Repo coverage overview",
    insightTitle: "Instant guidance",
    readingOrderTitle: "Suggested reading order",
    steps: [
      { title: "Import", detail: "Read a local project folder" },
      { title: "Analyze", detail: "Detect structure, deps, and risks" },
      { title: "Handoff", detail: "Generate a scoped handoff pack" },
      { title: "Export", detail: "Save snapshots and export" },
    ],
    importFacts: [
      "It reads the folder you choose instead of pretending with empty UI.",
      "It detects package.json, requirements.txt, pom.xml, Cargo.toml, and more.",
      "It scans TODO, FIXME, and HACK markers to show where attention is needed.",
      "It ignores noisy generated directories such as node_modules, dist, and build by default.",
      "It supports pasted changed-file paths to generate scoped handoff output."
    ],
    emptyState: "No project is imported yet. Load the sample repo or choose a local project folder.",
    importReady: "Folder loaded. You can move to the next step.",
    binaryNote: "Skipped binary or oversized files",
    stackFallback: "No obvious framework was detected yet",
    noTodos: "No obvious TODO / FIXME hotspots were found.",
    noDeps: "No common dependency lists were detected.",
    noEntries: "No typical entry files were detected.",
    noGaps: "No obvious documentation gaps were found, so the repo looks relatively complete.",
    noScope: "No changed paths yet, so the handoff pack covers the whole repo.",
    noHotspots: "No clear hotspot modules were detected yet.",
    noPathResults: "No file paths matched the search.",
    noSnapshots: "No snapshots saved yet.",
    copySuccess: "Markdown copied.",
    saveSuccess: "Snapshot saved.",
    importSuccess: "JSON imported.",
    deleteText: "Delete",
    loadText: "Load",
    compareText: "Compare",
    recommendations: [
      "If README, agents.md, and test folders are all missing, handoff cost is usually high.",
      "Read entry files and build config before diving into TODO hotspots.",
      "When changed paths cluster under one top-level folder, center the handoff on that module first."
    ],
    gapText: {
      missingReadme: "README.md is missing",
      missingAgents: "agents.md is missing",
      missingTests: "No obvious tests detected",
      missingCi: "No CI workflow detected",
      missingEnvExample: ".env.example is missing while env usage is implied"
    },
    factKeys: {
      root: "Root",
      files: "Total files",
      analyzedText: "Text files analyzed",
      ignoredNoise: "Ignored noisy files",
      skipped: "Skipped files",
      estimatedTokens: "Estimated context tokens"
    },
    riskLabels: {
      docCoverage: "Doc coverage",
      testCoverage: "Test signal",
      handoffReadiness: "Handoff readiness"
    },
    handoffSections: {
      title: "Repository Handoff Pack",
      snapshot: "Repo snapshot",
      stack: "Detected stack",
      entries: "Recommended entry files",
      modules: "Module map",
      scope: "Changed scope",
      checklist: "Scoped checklist",
      todos: "High-priority TODO hotspots",
      gaps: "Documentation and workflow gaps",
      next: "Recommended handoff questions"
    }
  }
};

const defaults = {
  lang: "zh",
  step: 0,
  compareId: null,
  scopeInput: "",
  dataset: null,
  analysis: null,
  history: []
};

const sampleRepo = [
  { path: "README.md", content: "# Insight Board\nA small React + FastAPI workspace for article triage.\n" },
  { path: "package.json", content: JSON.stringify({ name: "insight-board", scripts: { dev: "vite" }, dependencies: { react: "^19.0.0", vite: "^7.0.0", recharts: "^2.12.0" } }, null, 2) },
  { path: "requirements.txt", content: "fastapi==0.116.0\nuvicorn==0.35.0\npydantic==2.11.0\n" },
  { path: "src/main.tsx", content: "import React from 'react';\nimport App from './App';\n// TODO: wire session persistence\n" },
  { path: "src/App.tsx", content: "export default function App(){ return <div>Insight Board</div>; }\n" },
  { path: "src/components/ChartPanel.tsx", content: "// FIXME: support compare mode for multiple feeds\nexport function ChartPanel() { return null; }\n" },
  { path: "src/features/intake/IntakeForm.tsx", content: "// TODO: validate duplicate links\n" },
  { path: "backend/app/main.py", content: "from fastapi import FastAPI\napp = FastAPI()\n" },
  { path: "backend/app/routes/summary.py", content: "# HACK: temporary response cache key\n" },
  { path: ".github/workflows/deploy.yml", content: "name: Deploy\n" },
  { path: "docs/architecture.md", content: "## Architecture\nclient + api\n" },
  { path: ".env.example", content: "API_BASE_URL=http://localhost:8000\n" }
];

let state = loadState();

const els = {
  langToggle: document.querySelector("#langToggle"),
  sampleBtn: document.querySelector("#sampleBtn"),
  clearBtn: document.querySelector("#clearBtn"),
  folderInput: document.querySelector("#folderInput"),
  stepper: document.querySelector("#stepper"),
  filesValue: document.querySelector("#filesValue"),
  filesHint: document.querySelector("#filesHint"),
  stackValue: document.querySelector("#stackValue"),
  stackHint: document.querySelector("#stackHint"),
  riskValue: document.querySelector("#riskValue"),
  riskHint: document.querySelector("#riskHint"),
  historyValue: document.querySelector("#historyValue"),
  historyHint: document.querySelector("#historyHint"),
  importFacts: document.querySelector("#importFacts"),
  importSummary: document.querySelector("#importSummary"),
  stackSignals: document.querySelector("#stackSignals"),
  entryFiles: document.querySelector("#entryFiles"),
  moduleMap: document.querySelector("#moduleMap"),
  dependencyList: document.querySelector("#dependencyList"),
  todoList: document.querySelector("#todoList"),
  gapList: document.querySelector("#gapList"),
  riskHotspots: document.querySelector("#riskHotspots"),
  pathSearchInput: document.querySelector("#pathSearchInput"),
  pathSearchResults: document.querySelector("#pathSearchResults"),
  scopeInput: document.querySelector("#scopeInput"),
  scopeImpact: document.querySelector("#scopeImpact"),
  scopeChecklist: document.querySelector("#scopeChecklist"),
  handoffPreview: document.querySelector("#handoffPreview"),
  coverageBars: document.querySelector("#coverageBars"),
  insightList: document.querySelector("#insightList"),
  readingOrder: document.querySelector("#readingOrder"),
  snapshotList: document.querySelector("#snapshotList"),
  comparePanel: document.querySelector("#comparePanel"),
  toAnalysisBtn: document.querySelector("#toAnalysisBtn"),
  toScopeBtn: document.querySelector("#toScopeBtn"),
  toExportBtn: document.querySelector("#toExportBtn"),
  refreshScopeBtn: document.querySelector("#refreshScopeBtn"),
  saveSnapshotBtn: document.querySelector("#saveSnapshotBtn"),
  copyMarkdownBtn: document.querySelector("#copyMarkdownBtn"),
  exportMarkdownBtn: document.querySelector("#exportMarkdownBtn"),
  exportJsonBtn: document.querySelector("#exportJsonBtn"),
  importJsonBtn: document.querySelector("#importJsonBtn"),
  importJsonInput: document.querySelector("#importJsonInput")
};

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || "null");
    return parsed ? { ...structuredClone(defaults), ...parsed } : structuredClone(defaults);
  } catch {
    return structuredClone(defaults);
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function t(key) { return i18n[state.lang][key]; }

function persistAndRender() {
  saveState();
  render();
}

function updateI18n() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => { node.textContent = t(node.dataset.i18n); });
  els.langToggle.textContent = state.lang === "zh" ? "EN" : "中文";
  els.scopeInput.placeholder = els.scopeInput.dataset[`placeholder${state.lang === "zh" ? "Zh" : "En"}`];
  els.pathSearchInput.placeholder = els.pathSearchInput.dataset[`placeholder${state.lang === "zh" ? "Zh" : "En"}`];
}

function renderStepper() {
  els.stepper.innerHTML = "";
  t("steps").forEach((step, index) => {
    const button = document.createElement("button");
    button.className = `step-button${state.step === index ? " active" : ""}`;
    button.innerHTML = `<strong>${index + 1}. ${step.title}</strong><span>${step.detail}</span>`;
    button.addEventListener("click", () => { state.step = index; persistAndRender(); });
    els.stepper.appendChild(button);
  });
  document.querySelectorAll("[data-step-panel]").forEach((panel) => {
    panel.classList.toggle("hidden", Number(panel.dataset.stepPanel) !== state.step);
  });
}

function normalizePath(value) {
  return value.replace(/\\/g, "/");
}

function shouldIgnorePath(path) {
  const parts = normalizePath(path).split("/");
  return parts.some((part) => ignoredDirectoryNames.includes(part));
}

function isTextLike(path) {
  const lower = path.toLowerCase();
  const binaryExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico", ".zip", ".jar", ".woff", ".woff2", ".ttf", ".mp4", ".mov", ".pdf", ".exe", ".dll", ".so", ".bin", ".class"];
  if (binaryExtensions.some((ext) => lower.endsWith(ext))) return false;
  return true;
}

async function filesToDataset(files) {
  const items = [];
  let skipped = 0;
  let ignored = 0;
  for (const file of Array.from(files)) {
    const path = normalizePath(file.webkitRelativePath || file.name);
    if (shouldIgnorePath(path)) {
      ignored += 1;
      continue;
    }
    const item = { path, size: file.size };
    if (isTextLike(path) && file.size <= maxReadBytes && items.length < textFileLimit) {
      item.content = await file.text();
    } else if (!isTextLike(path) || file.size > maxReadBytes) {
      skipped += 1;
    }
    items.push(item);
  }
  return { files: items, skipped, ignored, root: deriveRoot(items.map((item) => item.path)) };
}

function deriveRoot(paths) {
  const first = paths[0] || "";
  return first.includes("/") ? first.split("/")[0] : first || "project";
}

function extOf(path) {
  const base = path.split("/").pop() || "";
  const idx = base.lastIndexOf(".");
  return idx >= 0 ? base.slice(idx).toLowerCase() : "";
}

function topDir(path) {
  const parts = path.split("/");
  return parts.length > 1 ? parts[0] : "(root)";
}

function pushUnique(list, value) {
  if (value && !list.includes(value)) list.push(value);
}

function parseDependencies(dataset) {
  const deps = [];
  const stackSignals = [];
  for (const file of dataset.files) {
    if (!file.content) continue;
    const base = file.path.split("/").pop();
    if (base === "package.json") {
      try {
        const pkg = JSON.parse(file.content);
        Object.keys(pkg.dependencies || {}).slice(0, 12).forEach((dep) => deps.push(`npm: ${dep}`));
        if (pkg.dependencies?.react) pushUnique(stackSignals, "React");
        if (pkg.dependencies?.vue) pushUnique(stackSignals, "Vue");
        if (pkg.dependencies?.next) pushUnique(stackSignals, "Next.js");
        if (pkg.dependencies?.vite || pkg.devDependencies?.vite) pushUnique(stackSignals, "Vite");
      } catch {}
    }
    if (base === "requirements.txt") {
      file.content.split(/\r?\n/).filter(Boolean).slice(0, 12).forEach((line) => deps.push(`pip: ${line.split("==")[0]}`));
      pushUnique(stackSignals, "Python");
    }
    if (base === "pyproject.toml") pushUnique(stackSignals, "Python");
    if (base === "pom.xml") {
      pushUnique(stackSignals, "Java");
      (file.content.match(/<artifactId>([^<]+)<\/artifactId>/g) || []).slice(0, 10).forEach((raw) => deps.push(`maven: ${raw.replace(/<\/?artifactId>/g, "")}`));
    }
    if (base === "Cargo.toml") pushUnique(stackSignals, "Rust");
    if (base === "go.mod") pushUnique(stackSignals, "Go");
  }

  const extensions = new Set(dataset.files.map((file) => extOf(file.path)));
  if (extensions.has(".tsx")) pushUnique(stackSignals, "TypeScript UI");
  if (extensions.has(".ts")) pushUnique(stackSignals, "TypeScript");
  if (extensions.has(".py")) pushUnique(stackSignals, "Python");
  if (extensions.has(".java")) pushUnique(stackSignals, "Java");
  if (extensions.has(".rs")) pushUnique(stackSignals, "Rust");
  if (extensions.has(".vue")) pushUnique(stackSignals, "Vue SFC");

  return { deps: Array.from(new Set(deps)).slice(0, 24), stackSignals };
}

function detectEntries(dataset) {
  const candidates = [];
  const markers = [/^README\.md$/i, /src\/main\./i, /src\/App\./i, /main\.py$/i, /app\.py$/i, /server\.(js|ts)$/i, /index\.html$/i, /\.github\/workflows\//i];
  dataset.files.forEach((file) => {
    if (markers.some((pattern) => pattern.test(file.path))) candidates.push(file.path);
  });
  return candidates.slice(0, 12);
}

function shortenSnippet(value, maxLength = 180) {
  const compact = value.replace(/\s+/g, " ").trim();
  return compact.length > maxLength ? `${compact.slice(0, maxLength - 1)}…` : compact;
}

function scanTodos(dataset) {
  const todos = [];
  dataset.files.forEach((file) => {
    if (!file.content) return;
    file.content.split(/\r?\n/).forEach((line, index) => {
      if (/(TODO|FIXME|HACK|BUG)/i.test(line) && todos.length < 24) {
        todos.push({ path: file.path, line: index + 1, text: shortenSnippet(line) });
      }
    });
  });
  return todos;
}

function buildModules(dataset) {
  const map = new Map();
  dataset.files.forEach((file) => {
    const dir = topDir(file.path);
    if (!map.has(dir)) map.set(dir, { dir, files: 0, textFiles: 0, exts: new Map() });
    const item = map.get(dir);
    item.files += 1;
    if (file.content) item.textFiles += 1;
    const ext = extOf(file.path) || "(none)";
    item.exts.set(ext, (item.exts.get(ext) || 0) + 1);
  });
  return Array.from(map.values())
    .sort((a, b) => b.files - a.files)
    .map((item) => ({
      ...item,
      exts: Array.from(item.exts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([ext, count]) => `${ext} × ${count}`)
    }));
}

function buildModuleHotspots(dataset, todos) {
  const byDir = new Map();
  dataset.files.forEach((file) => {
    const dir = topDir(file.path);
    if (!byDir.has(dir)) {
      byDir.set(dir, { dir, files: 0, todos: 0, configs: 0 });
    }
    const item = byDir.get(dir);
    item.files += 1;
    if (/package\.json|requirements\.txt|pom\.xml|pyproject\.toml|cargo\.toml|go\.mod/i.test(file.path)) {
      item.configs += 1;
    }
  });

  todos.forEach((todo) => {
    const dir = topDir(todo.path);
    if (!byDir.has(dir)) {
      byDir.set(dir, { dir, files: 0, todos: 0, configs: 0 });
    }
    byDir.get(dir).todos += 1;
  });

  return Array.from(byDir.values())
    .map((item) => ({
      ...item,
      risk: Math.min(99, item.todos * 18 + item.configs * 8 + Math.min(24, item.files))
    }))
    .sort((a, b) => b.risk - a.risk)
    .slice(0, 8);
}

function detectGaps(dataset) {
  const paths = dataset.files.map((file) => file.path.toLowerCase());
  const gaps = [];
  if (!paths.includes("readme.md")) gaps.push("missingReadme");
  if (!paths.includes("agents.md")) gaps.push("missingAgents");
  if (!paths.some((path) => path.includes("test") || path.includes("spec"))) gaps.push("missingTests");
  if (!paths.some((path) => path.includes(".github/workflows"))) gaps.push("missingCi");
  if (!paths.includes(".env.example") && paths.some((path) => path.includes(".env"))) gaps.push("missingEnvExample");
  return gaps;
}

function estimateTokens(textChars) {
  return Math.max(120, Math.round(textChars / 4));
}

function analyzeDataset(dataset) {
  const analyzedText = dataset.files.filter((file) => file.content).length;
  const charCount = dataset.files.reduce((sum, file) => sum + (file.content?.length || 0), 0);
  const modules = buildModules(dataset);
  const { deps, stackSignals } = parseDependencies(dataset);
  const entries = detectEntries(dataset);
  const todos = scanTodos(dataset);
  const gaps = detectGaps(dataset);
  const hotspots = buildModuleHotspots(dataset, todos);
  const estimatedTokens = estimateTokens(charCount);
  const coverage = {
    docCoverage: Math.max(0, 100 - gaps.filter((item) => item.toLowerCase().includes("readme") || item.toLowerCase().includes("agents")).length * 35),
    testCoverage: Math.max(0, dataset.files.some((file) => /test|spec/i.test(file.path)) ? 80 : 22),
    handoffReadiness: Math.max(10, 92 - gaps.length * 16 - Math.min(24, todos.length * 2))
  };
  return {
    root: dataset.root,
    fileCount: dataset.files.length,
    analyzedText,
    ignored: dataset.ignored || 0,
    skipped: dataset.skipped,
    estimatedTokens,
    modules,
    stackSignals,
    deps,
    entries,
    todos,
    gaps,
    hotspots,
    filePaths: dataset.files.map((file) => file.path),
    coverage,
    readingOrder: [...entries.slice(0, 4), ...modules.slice(0, 4).map((item) => item.dir)].filter(Boolean)
  };
}

function parseScopeInput(text) {
  return text.split(/\r?\n/).map((line) => normalizePath(line.trim())).filter(Boolean);
}

function deriveScopeReport(analysis, scopeInput) {
  const changedPaths = parseScopeInput(scopeInput);
  const checklist = [];
  if (!changedPaths.length) {
    return {
      changedPaths,
      impactedModules: [],
      summary: t("noScope"),
      checklist: [
        state.lang === "zh" ? "没有限定变更范围时，先从入口文件和部署配置开始看。" : "Without a narrowed scope, start with entry files and deployment config.",
        state.lang === "zh" ? "确认 README、agents.md 和测试说明是否与当前仓库一致。" : "Check whether README, agents.md, and test notes still match the repo."
      ]
    };
  }
  const impactedModules = Array.from(new Set(changedPaths.map((path) => topDir(path))));
  const directEntries = analysis.entries.filter((entry) => changedPaths.some((path) => entry.includes(path) || path.includes(entry)));
  const todoHits = analysis.todos.filter((todo) => changedPaths.some((path) => todo.path.includes(path) || path.includes(todo.path)));
  if (directEntries.length) {
    checklist.push(state.lang === "zh" ? "优先阅读受影响入口文件，确认调用链和初始化逻辑。" : "Read the impacted entry files first to confirm boot flow and call chains.");
  }
  if (todoHits.length) {
    checklist.push(state.lang === "zh" ? "检查变更范围内已有 TODO / FIXME，避免踩历史坑。" : "Inspect existing TODO / FIXME items inside the scope before changing behavior.");
  }
  if (impactedModules.length > 1) {
    checklist.push(state.lang === "zh" ? "这次改动跨多个模块，交接里要明确责任边界和联动点。" : "This change crosses modules, so the handoff should call out ownership boundaries and touchpoints.");
  }
  checklist.push(state.lang === "zh" ? "确认是否需要同步更新 README、agents.md 或部署脚本。" : "Confirm whether README, agents.md, or deployment scripts also need updates.");
  return {
    changedPaths,
    impactedModules,
    directEntries,
    todoHits,
    summary: `${changedPaths.length} paths / ${impactedModules.length} modules`,
    checklist
  };
}

function buildHandoffMarkdown(analysis, scopeReport) {
  const sections = t("handoffSections");
  const scopeLines = scopeReport.changedPaths.length ? scopeReport.changedPaths.map((item) => `- ${item}`).join("\n") : `- ${t("noScope")}`;
  const todoLines = (scopeReport.todoHits?.length ? scopeReport.todoHits : analysis.todos).slice(0, 8).map((todo) => `- ${todo.path}:${todo.line} ${todo.text}`).join("\n") || `- ${t("noTodos")}`;
  const gapLines = (analysis.gaps.length ? analysis.gaps.map((gap) => t("gapText")[gap]) : [t("noGaps")]).map((gap) => `- ${gap}`).join("\n");
  const moduleLines = analysis.modules.slice(0, 8).map((module) => `- ${module.dir}: ${module.files} files (${module.exts.join(", ")})`).join("\n");
  const entryLines = (analysis.entries.length ? analysis.entries : [t("noEntries")]).map((entry) => `- ${entry}`).join("\n");
  const checklistLines = (scopeReport.checklist?.length ? scopeReport.checklist : [t("noScope")]).map((item) => `- ${item}`).join("\n");
  const questions = [
    state.lang === "zh" ? "- 哪些目录是本次改动的真正责任边界？" : "- Which directories define the real ownership boundary for this change?",
    state.lang === "zh" ? "- 是否存在需要同步更新的 README、agents.md 或部署脚本？" : "- Are README, agents.md, or deployment scripts also affected?",
    state.lang === "zh" ? "- TODO 热点里有哪些是本次改动会踩到的遗留问题？" : "- Which TODO hotspots are likely to be touched by this change?",
  ].join("\n");

  return `# ${sections.title}

## ${sections.snapshot}
- ${state.lang === "zh" ? "根目录" : "Root"}: ${analysis.root}
- ${state.lang === "zh" ? "总文件数" : "Total files"}: ${analysis.fileCount}
- ${state.lang === "zh" ? "已分析文本文件" : "Text files analyzed"}: ${analysis.analyzedText}
- ${state.lang === "zh" ? "估算上下文 tokens" : "Estimated context tokens"}: ${analysis.estimatedTokens}

## ${sections.stack}
${(analysis.stackSignals.length ? analysis.stackSignals : [t("stackFallback")]).map((item) => `- ${item}`).join("\n")}

## ${sections.entries}
${entryLines}

## ${sections.modules}
${moduleLines}

## ${sections.scope}
${scopeLines}

## ${sections.checklist}
${checklistLines}

## ${sections.todos}
${todoLines}

## ${sections.gaps}
${gapLines}

## ${sections.next}
${questions}
`;
}

function renderMetrics() {
  const analysis = state.analysis;
  els.importFacts.innerHTML = t("importFacts").map((item) => `<li>${item}</li>`).join("");
  els.historyValue.textContent = String(state.history.length);
  if (!analysis) {
    els.filesValue.textContent = "0";
    els.stackValue.textContent = "0";
    els.riskValue.textContent = "0";
    els.importSummary.innerHTML = `<div class="kv-item">${t("emptyState")}</div>`;
    return;
  }

  els.filesValue.textContent = String(analysis.fileCount);
  els.stackValue.textContent = String(analysis.stackSignals.length);
  els.riskValue.textContent = String(analysis.gaps.length);

  const facts = [
    [t("factKeys").root, analysis.root],
    [t("factKeys").files, analysis.fileCount],
    [t("factKeys").analyzedText, analysis.analyzedText],
    [t("factKeys").ignoredNoise, analysis.ignored],
    [t("factKeys").skipped, analysis.skipped],
    [t("factKeys").estimatedTokens, analysis.estimatedTokens],
  ];
  els.importSummary.innerHTML = facts.map(([key, value]) => `<div class="kv-item"><strong>${key}</strong><div>${value}</div></div>`).join("");
}

function renderAnalysis() {
  const analysis = state.analysis;
  if (!analysis) {
    els.stackSignals.innerHTML = `<div class="list-card">${t("emptyState")}</div>`;
    els.entryFiles.innerHTML = `<div class="list-card">${t("emptyState")}</div>`;
    els.moduleMap.innerHTML = `<div class="list-card">${t("emptyState")}</div>`;
    els.dependencyList.innerHTML = `<div class="list-card">${t("emptyState")}</div>`;
    els.todoList.innerHTML = `<div class="list-card">${t("emptyState")}</div>`;
    els.gapList.innerHTML = `<div class="list-card">${t("emptyState")}</div>`;
    els.riskHotspots.innerHTML = `<div class="list-card">${t("emptyState")}</div>`;
    els.pathSearchResults.innerHTML = `<div class="list-card">${t("emptyState")}</div>`;
    els.readingOrder.innerHTML = `<div class="list-card">${t("emptyState")}</div>`;
    return;
  }
  els.stackSignals.innerHTML = (analysis.stackSignals.length ? analysis.stackSignals : [t("stackFallback")]).map((item) => `<span class="chip active">${item}</span>`).join("");
  els.entryFiles.innerHTML = (analysis.entries.length ? analysis.entries : [t("noEntries")]).map((item) => `<div class="list-card">${item}</div>`).join("");
  els.moduleMap.innerHTML = analysis.modules.slice(0, 10).map((item) => `
    <article class="module-item">
      <header><strong>${item.dir}</strong><span>${item.files}</span></header>
      <div>${item.exts.join(" · ")}</div>
    </article>`).join("");
  els.dependencyList.innerHTML = (analysis.deps.length ? analysis.deps : [t("noDeps")]).map((item) => `<div class="list-card">${item}</div>`).join("");
  els.todoList.innerHTML = (analysis.todos.length ? analysis.todos.slice(0, 10).map((todo) => `${todo.path}:${todo.line} ${todo.text}`) : [t("noTodos")]).map((item) => `<div class="list-card">${item}</div>`).join("");
  els.gapList.innerHTML = (analysis.gaps.length ? analysis.gaps.map((item) => t("gapText")[item]) : [t("noGaps")]).map((item) => `<div class="list-card">${item}</div>`).join("");
  els.riskHotspots.innerHTML = (analysis.hotspots.length ? analysis.hotspots.map((item) => `${item.dir} · risk ${item.risk}% · ${item.todos} TODOs · ${item.files} files`) : [t("noHotspots")]).map((item) => `<div class="list-card">${item}</div>`).join("");
  renderPathSearch();
  els.readingOrder.innerHTML = analysis.readingOrder.map((item, index) => `<div class="list-card">${index + 1}. ${item}</div>`).join("");
}

function renderPathSearch() {
  const analysis = state.analysis;
  if (!analysis) {
    els.pathSearchResults.innerHTML = `<div class="list-card">${t("emptyState")}</div>`;
    return;
  }
  const query = els.pathSearchInput.value.trim().toLowerCase();
  const matches = (query ? analysis.filePaths.filter((path) => path.toLowerCase().includes(query)) : analysis.filePaths.slice(0, 8)).slice(0, 12);
  els.pathSearchResults.innerHTML = (matches.length ? matches : [t("noPathResults")]).map((item) => `<div class="list-card">${item}</div>`).join("");
}

function renderCoverage() {
  const analysis = state.analysis;
  els.coverageBars.innerHTML = "";
  if (!analysis) return;
  Object.entries(analysis.coverage).forEach(([key, value]) => {
    const row = document.createElement("article");
    row.className = "signal-item";
    row.innerHTML = `<header><strong>${t("riskLabels")[key]}</strong><span>${value}%</span></header><div class="signal-track"><div class="signal-fill" style="width:${value}%"></div></div>`;
    els.coverageBars.appendChild(row);
  });
  els.insightList.innerHTML = t("recommendations").map((item) => `<li>${item}</li>`).join("");
}

function renderScope() {
  const analysis = state.analysis;
  els.scopeInput.value = state.scopeInput;
  if (!analysis) {
    els.scopeImpact.innerHTML = `<div class="list-card">${t("emptyState")}</div>`;
    els.scopeChecklist.innerHTML = `<div class="list-card">${t("emptyState")}</div>`;
    els.handoffPreview.textContent = t("emptyState");
    return;
  }
  const scopeReport = deriveScopeReport(analysis, state.scopeInput);
  const impactLines = [
    scopeReport.summary,
    ...(scopeReport.impactedModules?.length ? scopeReport.impactedModules.map((item) => `${state.lang === "zh" ? "模块" : "Module"}: ${item}`) : []),
    ...(scopeReport.directEntries?.length ? scopeReport.directEntries.map((item) => `${state.lang === "zh" ? "入口" : "Entry"}: ${item}`) : [])
  ];
  els.scopeImpact.innerHTML = impactLines.map((item) => `<div class="list-card">${item}</div>`).join("");
  els.scopeChecklist.innerHTML = (scopeReport.checklist?.length ? scopeReport.checklist : [t("noScope")]).map((item) => `<div class="list-card">${item}</div>`).join("");
  els.handoffPreview.textContent = buildHandoffMarkdown(analysis, scopeReport);
}

function renderHistory() {
  if (!state.history.length) {
    els.snapshotList.innerHTML = `<div class="history-item">${t("noSnapshots")}</div>`;
    els.comparePanel.innerHTML = t("noSnapshots");
    return;
  }
  els.snapshotList.innerHTML = state.history.slice().reverse().map((entry) => `
    <article class="history-item" data-id="${entry.id}">
      <header><strong>${entry.analysis.root}</strong><span>${entry.analysis.fileCount}</span></header>
      <div>${new Date(entry.savedAt).toLocaleString()}</div>
      <div class="action-row left">
        <button class="button ghost load-btn">${t("loadText")}</button>
        <button class="button ghost compare-btn">${t("compareText")}</button>
        <button class="button ghost delete-btn">${t("deleteText")}</button>
      </div>
    </article>`).join("");
  els.snapshotList.querySelectorAll(".history-item").forEach((node) => {
    const id = node.dataset.id;
    node.querySelector(".load-btn").addEventListener("click", () => {
      const hit = state.history.find((item) => item.id === id);
      if (!hit) return;
      state.dataset = hit.dataset;
      state.analysis = hit.analysis;
      state.scopeInput = hit.scopeInput || "";
      state.step = 2;
      persistAndRender();
    });
    node.querySelector(".compare-btn").addEventListener("click", () => {
      state.compareId = id;
      persistAndRender();
    });
    node.querySelector(".delete-btn").addEventListener("click", () => {
      state.history = state.history.filter((item) => item.id !== id);
      if (state.compareId === id) state.compareId = null;
      persistAndRender();
    });
  });

  const compare = state.history.find((item) => item.id === state.compareId);
  if (!compare || !state.analysis) {
    els.comparePanel.innerHTML = t("noSnapshots");
    return;
  }
  const fileDelta = state.analysis.fileCount - compare.analysis.fileCount;
  const todoDelta = state.analysis.todos.length - compare.analysis.todos.length;
  const gapDelta = state.analysis.gaps.length - compare.analysis.gaps.length;
  els.comparePanel.innerHTML = `
    <strong>${compare.analysis.root}</strong>
    <ul class="bullet-list">
      <li>${state.lang === "zh" ? "文件数变化" : "File delta"}: ${fileDelta >= 0 ? "+" : ""}${fileDelta}</li>
      <li>${state.lang === "zh" ? "TODO 数变化" : "TODO delta"}: ${todoDelta >= 0 ? "+" : ""}${todoDelta}</li>
      <li>${state.lang === "zh" ? "风险项变化" : "Risk delta"}: ${gapDelta >= 0 ? "+" : ""}${gapDelta}</li>
    </ul>`;
}

function render() {
  updateI18n();
  renderStepper();
  renderMetrics();
  renderAnalysis();
  renderCoverage();
  renderScope();
  renderHistory();
}

function downloadBlob(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "");
}

async function loadDataset(dataset) {
  state.dataset = dataset;
  state.analysis = analyzeDataset(dataset);
  state.scopeInput = "";
  state.step = 1;
  persistAndRender();
}

function hydrateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("demo") === "sample") {
    const dataset = { files: sampleRepo.map((item) => ({ ...item, size: item.content.length })), skipped: 0, ignored: 0, root: "insight-board" };
    state.dataset = dataset;
    state.analysis = analyzeDataset(dataset);
    state.scopeInput = "src/App.tsx\nsrc/components/ChartPanel.tsx\nbackend/app/routes/summary.py";
    state.step = Number(params.get("step") || 1);
    if (params.get("history") === "1") {
      state.history = [{
        id: "demo-snapshot",
        savedAt: new Date("2026-04-22T13:20:00+08:00").toISOString(),
        dataset,
        analysis: { ...state.analysis, fileCount: state.analysis.fileCount - 2, gaps: ["agents.md missing"] },
        scopeInput: "src/main.tsx"
      }];
      state.compareId = "demo-snapshot";
    }
  }
  if (params.get("lang") === "en") state.lang = "en";
}

function attachListeners() {
  els.langToggle.addEventListener("click", () => {
    state.lang = state.lang === "zh" ? "en" : "zh";
    persistAndRender();
  });

  els.sampleBtn.addEventListener("click", async () => {
    await loadDataset({ files: sampleRepo.map((item) => ({ ...item, size: item.content.length })), skipped: 0, ignored: 0, root: "insight-board" });
  });

  els.clearBtn.addEventListener("click", () => {
    state = { ...structuredClone(defaults), history: state.history };
    persistAndRender();
  });

  els.folderInput.addEventListener("change", async (event) => {
    const files = event.target.files;
    if (!files?.length) return;
    const dataset = await filesToDataset(files);
    await loadDataset(dataset);
  });

  els.toAnalysisBtn.addEventListener("click", () => { state.step = 1; persistAndRender(); });
  els.toScopeBtn.addEventListener("click", () => { state.step = 2; persistAndRender(); });
  els.toExportBtn.addEventListener("click", () => { state.step = 3; persistAndRender(); });

  els.scopeInput.addEventListener("input", (event) => {
    state.scopeInput = event.target.value;
    saveState();
    renderScope();
  });
  els.pathSearchInput.addEventListener("input", () => {
    renderPathSearch();
  });
  els.refreshScopeBtn.addEventListener("click", () => renderScope());

  els.saveSnapshotBtn.addEventListener("click", () => {
    if (!state.analysis) return;
    state.history.push({
      id: crypto.randomUUID(),
      savedAt: new Date().toISOString(),
      dataset: state.dataset,
      analysis: state.analysis,
      scopeInput: state.scopeInput
    });
    persistAndRender();
    window.alert(t("saveSuccess"));
  });

  els.copyMarkdownBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(els.handoffPreview.textContent);
    window.alert(t("copySuccess"));
  });
  els.exportMarkdownBtn.addEventListener("click", () => {
    if (!state.analysis) return;
    downloadBlob(`${slugify(state.analysis.root)}-handoff.md`, els.handoffPreview.textContent, "text/markdown;charset=utf-8");
  });
  els.exportJsonBtn.addEventListener("click", () => {
    downloadBlob("repo-handoff-radar.json", JSON.stringify(state, null, 2), "application/json;charset=utf-8");
  });
  els.importJsonBtn.addEventListener("click", () => els.importJsonInput.click());
  els.importJsonInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    state = { ...structuredClone(defaults), ...JSON.parse(await file.text()) };
    persistAndRender();
    window.alert(t("importSuccess"));
  });
}

hydrateFromUrl();
attachListeners();
render();
