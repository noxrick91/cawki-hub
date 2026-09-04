const LANGS = ["zh", "en"];
const I18N = {
  zh: {
    meta: {
      title: "Cawki — 真正动手的终端编程搭档",
      desc: "让 Cawki 在你的项目里理解代码、完成修改并运行测试。操作范围和权限由你掌控，支持多模型、MCP 与自动化。",
      docsTitle: "文档 — Cawki",
      docsDesc: "安装、升级、斜杠命令、权限，以及无头模式。",
    },
    nav: { home: "首页", download: "下载", docs: "文档", github: "GitHub" },
    hero: {
      kicker: "从理解代码到通过测试",
      title: "一个真正会动手的\n终端编程搭档",
      lede: "它能理解你的项目、直接修改文件并运行测试。默认只在工作区内操作；写入文件和执行命令前，会先征得你的确认。",
      install: "立即安装",
      quickStart: "快速开始",
      manual: "手动下载",
      downloading: "加载中…",
      docs: "文档",
      waiting: "正在加载最新版",
    },
    install: {
      unix: "Linux / macOS",
      linux: "Linux",
      mac: "macOS",
      win: "Windows",
      copy: "复制",
      copied: "已复制",
    },
    howto: {
      install: "安装",
      update: "更新",
      uninstall: "卸载",
      docs: "安装说明",
      installHint: "安装到 ~/.cawki/bin；完成后请新开一个终端。",
      updateHint: "下载并替换为最新版本。请先退出正在运行的 Cawki，完成后新开终端确认版本。",
      uninstallHint: "删除安装目录；全局配置、密钥和 MCP 包也会一并删除。项目内的 .cawki/ 不受影响。",
      macUnavailable: "macOS 预编译包暂未开放",
      macHint: "当前公开版本仅提供 Linux 与 Windows 安装包。",
    },
    proof: {
      checksum: "安装器自动校验下载文件",
      platformsT: "Linux + Windows",
      platforms: "Linux 与 Windows，支持 x64 / ARM64",
      modelsT: "模型任选",
      models: "云端 API、兼容网关或本地 Ollama",
    },
    sec: {
      install: "安装",
      howto: "安装",
      why: "从需求到通过测试",
      download: "手动下载",
    },
    cards: {
      capT: "不只回答，直接完成",
      cap: "理解现有代码，完成修改，再运行测试验证结果。整个过程都在你的项目里发生。",
      safeT: "边界由你决定",
      safe: "文件操作默认限制在工作区，写入和命令默认先询问；权限可按项目精细调整。",
      seeT: "每一步都看得见",
      see: "读取、修改和执行都会实时呈现。你可以随时介入、拒绝或叫停。",
      modelT: "模型由你选择",
      model: "支持 OpenAI、Anthropic、DeepSeek、Qwen、OpenAI 兼容网关和本地 Ollama。",
      extendT: "接入现有工具链",
      extend: "通过 MCP 和技能连接浏览器、文档、图像、CAD，以及你自己的工具。",
      automateT: "人机协作，也能自动跑",
      automate: "在 TUI 中共同完成任务，或使用无头模式、结构化输出和本地 REST / SSE 接入自动化。",
    },
    docs: {
      loading: "正在加载文档…",
      fail: "文档加载失败。请用本地 HTTP 服务打开，不要用 file://。",
      toc: "目录",
      onpage: "本页目录",
      search: "搜索文档…",
      searchTitle: "搜索文档",
      product: "Cawki",
      prev: "上一页",
      next: "下一页",
      nohits: "没有匹配的页面。",
      contents: "目录",
    },
    table: {
      platform: "平台",
      build: "版本",
      size: "大小",
      this: "本版",
      total: "累计",
      here: "本机",
      checksum: "校验和",
      caption: "各平台最新版本下载",
      loading: "加载中…",
      stats: (a, b, n) => `本版 ${a} 次，一共 ${b} 次 · ${n} 个版本`,
      meta: (tag, label, date, a, b) =>
        `${tag} · ${label}${date ? ` · ${date}` : ""}`,
    },
    dl: {
      prefix: "下载",
      unavailable: "暂无可用版本",
      error: "最新版暂时读不到，用上面的命令安装即可。",
      releases: "用安装命令",
      unsupported: "macOS 预编译包暂未开放",
    },
    footer: {
      tagline: "Cawki · 让终端真正动手干活",
      docs: "安装文档",
      releases: "Releases",
      changelog: "更新记录",
      feedback: "反馈问题",
    },
    stage: {
      title: "Cawki · ~/ledger",
      sandbox: "sandbox",
      ask: "先询问",
      files: "文件",
      allow: "允许一次",
      deny: "拒绝",
      statusWrite: "写入 src/auth.rs · 等待确认",
      statusOk: "已写入 src/auth.rs",
      statusTest: "运行 cargo test -p ledger -- auth",
      statusPass: "测试通过 · 3 passed",
      placeholder: "输入消息 · @ 文件 · 粘贴 · / 命令",
      mode: "默认模式",
      sheetHint: "↑↓ 选择 · 1–5 快捷键 · esc 拒绝",
      permissions: ["1  仅本次", "2  本次会话", "3  始终允许", "4  永不允许", "5  拒绝一次"],
      request: "给 verify_token 加上过期校验",
      response: "我会在 src/auth.rs 中添加校验，并保留现有解析流程。",
      write: "写入 src/auth.rs",
      run: "运行 cargo test -p ledger -- auth",
      allowed: "已允许：仅本次写入 src/auth.rs",
      queued: "输入可排队 · 1–5 / 回车允许 · esc 拒绝",
      passed: "通过：3 passed；0 failed",
    },
    notfound: { title: "没有这一页。", back: "回首页" },
  },
  en: {
    meta: {
      title: "Cawki — a terminal coding partner that gets things done",
      desc: "Let Cawki understand your project, make changes, and run tests. You control its scope and permissions, with multi-model, MCP, and automation support.",
      docsTitle: "Docs — Cawki",
      docsDesc: "Install, upgrade, slash commands, permissions, and headless mode.",
    },
    nav: { home: "Home", download: "Download", docs: "Docs", github: "GitHub" },
    hero: {
      kicker: "From understanding to passing tests",
      title: "A terminal coding partner\nthat gets things done",
      lede: "It understands your project, edits files, and runs tests. By default, it stays inside the workspace and asks before writing files or running commands.",
      install: "Install now",
      quickStart: "Quick start",
      manual: "Manual downloads",
      downloading: "Loading…",
      docs: "Docs",
      waiting: "Loading the latest build",
    },
    install: {
      unix: "Linux / macOS",
      linux: "Linux",
      mac: "macOS",
      win: "Windows",
      copy: "Copy",
      copied: "Copied",
    },
    howto: {
      install: "Install",
      update: "Update",
      uninstall: "Uninstall",
      docs: "Install docs",
      installHint: "Installs into ~/.cawki/bin. Open a new terminal when it finishes.",
      updateHint: "Downloads and replaces the current build. Close Cawki first, then open a new terminal to verify the version.",
      uninstallHint: "Deletes the install directory, including global config, keys, and MCP packs. Project .cawki/ folders are left intact.",
      macUnavailable: "macOS prebuilt packages are temporarily unavailable",
      macHint: "The current public release only provides Linux and Windows builds.",
    },
    proof: {
      checksum: "The installer verifies every download",
      platformsT: "Linux + Windows",
      platforms: "Linux and Windows on x64 / ARM64",
      modelsT: "Choose any model",
      models: "Cloud APIs, compatible gateways, or local Ollama",
    },
    sec: {
      install: "Install",
      howto: "Install",
      why: "From request to passing tests",
      download: "Manual downloads",
    },
    cards: {
      capT: "Beyond answers to outcomes",
      cap: "It understands existing code, makes the change, then runs tests to verify the result — all inside your project.",
      safeT: "You set the boundaries",
      safe: "File operations stay in the workspace by default, and writes or commands ask first. Tune permissions per project.",
      seeT: "Every step stays visible",
      see: "Reads, edits, and commands appear live on screen. Step in, deny, or stop the run at any time.",
      modelT: "Your model, your choice",
      model: "Works with OpenAI, Anthropic, DeepSeek, Qwen, OpenAI-compatible gateways, and local Ollama.",
      extendT: "Connect your toolchain",
      extend: "Use MCP and skills to connect browsers, documents, images, CAD, and your own tools.",
      automateT: "Collaborate or automate",
      automate: "Work together in the TUI, or integrate through headless mode, structured output, and local REST / SSE.",
    },
    docs: {
      loading: "Loading docs…",
      fail: "Could not load the docs. Serve this site over HTTP, not file://.",
      toc: "Contents",
      onpage: "On this page",
      search: "Search the docs…",
      searchTitle: "Search documentation",
      product: "Cawki",
      prev: "Previous",
      next: "Next",
      nohits: "No matching pages.",
      contents: "Contents",
    },
    table: {
      platform: "Platform",
      build: "Version",
      size: "Size",
      this: "This build",
      total: "All time",
      here: "yours",
      checksum: "Checksums",
      caption: "Latest downloads for each platform",
      loading: "Loading…",
      stats: (a, b, n) => `${a} this build · ${b} all time · ${n} versions`,
      meta: (tag, label, date, a, b) =>
        `${tag} · ${label}${date ? ` · ${date}` : ""}`,
    },
    dl: {
      prefix: "Download",
      unavailable: "No build yet",
      error: "Could not load the latest build. Use the install command above.",
      releases: "Use the install command",
      unsupported: "macOS prebuilt packages are temporarily unavailable",
    },
    footer: {
      tagline: "Cawki · put your terminal to work",
      docs: "Install docs",
      releases: "Releases",
      changelog: "Changelog",
      feedback: "Report an issue",
    },
    stage: {
      title: "Cawki · ~/ledger",
      sandbox: "sandbox",
      ask: "ask first",
      files: "files",
      allow: "allow once",
      deny: "deny",
      statusWrite: "write src/auth.rs · waiting",
      statusOk: "wrote src/auth.rs",
      statusTest: "run cargo test -p ledger -- auth",
      statusPass: "tests passed · 3 passed",
      placeholder: "Message · @ file · paste · / commands",
      mode: "default",
      sheetHint: "↑↓ select · 1–5 shortcut · esc deny",
      permissions: ["1  once", "2  session", "3  always", "4  never", "5  deny once"],
      request: "add an expiry check to verify_token",
      response: "I'll add a guard in src/auth.rs and keep the existing parse path.",
      write: "write src/auth.rs",
      run: "run cargo test -p ledger -- auth",
      allowed: "allowed once: write src/auth.rs",
      queued: "type to queue · 1–5 / enter grant · esc deny",
      passed: "ok: 3 passed; 0 failed",
    },
    notfound: { title: "This page is not here.", back: "Home" },
  },
};

let chosenLang = null;

function getLang() {
  if (LANGS.includes(chosenLang)) return chosenLang;
  const q = new URLSearchParams(location.search).get("lang");
  if (LANGS.includes(q)) return q;
  try {
    const saved = localStorage.getItem("caw-lang");
    if (LANGS.includes(saved)) return saved;
  } catch {
    /* ignore */
  }
  return (navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en";
}

function dict() {
  return I18N[getLang()] || I18N.zh;
}

function setLang(lang) {
  if (!LANGS.includes(lang)) return;
  chosenLang = lang;
  try {
    localStorage.setItem("caw-lang", lang);
  } catch {
    /* ignore */
  }
  const url = new URL(location.href);
  url.searchParams.set("lang", lang);
  history.replaceState(null, "", url);
  applyI18n();
  document.dispatchEvent(new CustomEvent("caw-lang", { detail: lang }));
}

function applyI18n(root = document) {
  const d = dict();
  document.documentElement.lang = getLang() === "zh" ? "zh-CN" : "en";
  const title = document.querySelector("title");
  if (title && title.dataset.i18nTitle) {
    const key = title.dataset.i18nTitle;
    title.textContent = key === "docs" ? d.meta.docsTitle : d.meta.title;
  }
  const desc = document.querySelector('meta[name="description"]');
  if (desc && desc.dataset.i18nDesc) {
    desc.content = desc.dataset.i18nDesc === "docs" ? d.meta.docsDesc : d.meta.desc;
  }
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    const val = lookup(d, el.getAttribute("data-i18n"));
    if (val != null) el.textContent = val;
  });
  root.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const val = lookup(d, el.getAttribute("data-i18n-html"));
    if (val != null) el.innerHTML = String(val).replace(/\n/g, "<br>");
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const val = lookup(d, el.getAttribute("data-i18n-placeholder"));
    if (val != null) el.setAttribute("placeholder", val);
  });
  root.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === getLang()));
  });
  root.querySelectorAll("a[data-keep-lang]").forEach((a) => {
    const href = a.getAttribute("href") || "./";
    const hashAt = href.indexOf("#");
    const hash = hashAt >= 0 ? href.slice(hashAt) : "";
    const before = hashAt >= 0 ? href.slice(0, hashAt) : href;
    const path = before.split("?")[0];
    a.setAttribute("href", `${path}?lang=${getLang()}${hash}`);
  });
}

function lookup(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
}

function bindLangSwitch(root = document) {
  root.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyI18n();
  bindLangSwitch();
});
