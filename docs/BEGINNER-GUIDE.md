# Beginner Guide | 小白使用文档

## 中文

### 这个项目适合谁

- 刚接手一个老项目，不知道该从哪里开始看的人
- 想在交接前把仓库结构、风险点、文档缺口讲清楚的人
- 想让 AI 帮忙，但又不想先把整个项目压缩成一团糟上下文的人

### 先理解它能做什么

这个工具会在浏览器里读取你选中的本地项目文件夹，帮你看技术栈、入口文件、模块地图、TODO 热点、文档缺口和变更范围，然后生成一份更像“真实交接包”的东西。

它不是直接改代码的 IDE，也不是云端代码托管服务。

### 第一次使用时最推荐的走法

1. 先点“载入示例仓库”。
2. 跟着 Step 1 到 Step 4 走一遍，看看它每一步输出什么。
3. 等你知道页面结构后，再导入自己的项目文件夹。

### 你在导入自己仓库前最好准备什么

- 本地已经有项目源码
- 你大概知道这次要交接的是整个仓库，还是某一批变更
- 如果你只想做范围交接，最好提前整理出改过的文件路径列表

### 小白最稳的使用顺序

#### Step 1：导入代码库

1. 点击“选择项目文件夹”。
2. 选你的仓库根目录，不要只选某个零散子目录。
3. 等导入完成后，看“当前导入状态”和顶部指标，确认它确实扫描到了文件。

#### Step 2：先看整体分析

这一块最值得先看的是：

- 技术栈信号
- 关键入口
- 模块地图
- TODO / FIXME 热点
- 文档与流程缺口
- 模块风险热点

如果你完全不熟这个仓库，建议按“建议阅读顺序”往下看。

#### Step 3：再做范围交接

1. 如果你只交接最近这次改动，就把修改过的文件路径粘到“变更范围与交接包”。
2. 一行一个路径，越接近真实改动越好。
3. 刷新范围分析后，看它生成的影响范围和 scoped checklist。
4. 这一步特别适合发版前交接、请假交接、多人协作同步。

#### Step 4：导出和存档

1. 当分析结果和交接包都差不多了，先保存快照。
2. 导出 Markdown 给人看。
3. 导出 JSON 给后续工具继续处理。

### 一个很适合新手的场景

假设你刚接手一个前端项目：

1. 先导入整个仓库。
2. 看技术栈信号，确定它是 React、Vue 还是别的。
3. 看关键入口和模块地图，先找到主入口文件和核心目录。
4. 看 TODO / FIXME 和风险热点，快速知道哪里最容易踩坑。
5. 如果同事只让你接一个新功能，就把该功能涉及的文件路径贴进去，生成 scoped handoff。

### 新手最常见的误区

- 误区 1：只看 README，不看入口文件和模块地图。
  很多老项目 README 已经过时了。
- 误区 2：导入后立刻导出，不先看风险热点。
  真正容易出问题的地方往往藏在 TODO、缺测试和配置缺口里。
- 误区 3：范围交接时只写目录名，不写真实文件路径。
  路径越具体，交接包越有价值。

### 数据和隐私

- 这个工具主要在浏览器本地解析你导入的文件。
- 默认不需要后端和模型 key。
- 重要交接结果请导出，因为浏览器本地数据不适合作为唯一长期存档。

### 本地运行

```bash
python -m http.server 4185
```

然后访问 `http://127.0.0.1:4185/`。

## English

### Who This Is For

- People inheriting an old repository and not knowing where to start
- Anyone who wants to explain repo structure, risks, and documentation gaps before handoff
- People who want a cleaner repo summary before involving AI or teammates

### What It Actually Does

The app reads a local project folder in the browser and helps you inspect stack signals, entry files, module structure, TODO hotspots, documentation gaps, and scoped changes, then turns that into a more practical handoff pack.

It is not an IDE and it is not a cloud code host.

### Best First-Time Approach

1. Click `Load sample repo` first.
2. Walk through Step 1 to Step 4 so you understand the output structure.
3. Only then import your own local repository.

### What To Prepare Before Importing Your Own Repo

- A local copy of the project source code
- A rough sense of whether you want full-repo understanding or change-scope handoff
- If you only need scoped handoff, prepare the changed file paths in advance

### Recommended Beginner Workflow

#### Step 1: Import The Repository

1. Click `Choose project folder`.
2. Select the repository root, not just one random child folder.
3. After import, check the top metrics and current import summary to confirm the scan worked.

#### Step 2: Review The Whole-Repo Analysis First

The most useful areas for beginners are:

- stack signals
- key entry files
- module map
- TODO / FIXME hotspots
- documentation and process gaps
- module risk hotspots

If the repo is unfamiliar, follow the suggested reading order.

#### Step 3: Build A Scoped Handoff

1. If you only need to hand off the latest changes, paste the changed file paths into the scoped handoff step.
2. Use one path per line.
3. Refresh the scope analysis and review the impact summary plus scoped checklist.
4. This is especially helpful for release handoff, vacation handoff, or collaboration sync.

#### Step 4: Export And Archive

1. Save a snapshot once the analysis looks useful.
2. Export Markdown for people.
3. Export JSON for further processing by other tools.

### A Good Beginner Scenario

Imagine you just inherited a frontend project:

1. Import the whole repo.
2. Use stack signals to confirm whether it is React, Vue, or something else.
3. Review entry files and module map to find the main starting points.
4. Review TODO hotspots and risk areas to avoid the worst surprises.
5. If a teammate only hands over one feature, paste the changed paths and generate a scoped handoff.

### Common Beginner Mistakes

- Mistake 1: reading only the README.
  In older repos, the README may already be outdated.
- Mistake 2: exporting immediately without checking risk hotspots.
  Real problems are often hidden in TODOs, missing tests, and configuration gaps.
- Mistake 3: using vague folder names instead of real file paths in scoped handoff.
  Specific paths produce a much more useful handoff pack.

### Data And Privacy

- The tool mainly parses imported files locally in the browser.
- It does not need a backend or model key for the main workflow.
- Export important results because browser-local storage should not be your only archive.

### Run Locally

```bash
python -m http.server 4185
```

Then open `http://127.0.0.1:4185/`.
