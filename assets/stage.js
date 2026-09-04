const SPINNER = ["·", "∘", "○", "◎", "●"];
const FALLBACK_PLACEHOLDER = "Message · @ file · paste · / commands";

function stageText(key, fallback) {
  const d = typeof dict === "function" ? dict().stage : null;
  return d?.[key] ?? fallback;
}

function permissionLabels() {
  const labels = stageText("permissions", null);
  return Array.isArray(labels) ? labels : ["1  once", "2  session", "3  always", "4  never", "5  deny once"];
}

function placeholderText() {
  const d = typeof dict === "function" ? dict().stage : null;
  return (d && d.placeholder) || FALLBACK_PLACEHOLDER;
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(t);
        reject(new DOMException("aborted", "AbortError"));
      },
      { once: true }
    );
  });
}

function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}

function scrollStage() {
  const body = document.getElementById("stage-body");
  if (body) body.scrollTop = body.scrollHeight;
}

function append(log, node) {
  log.appendChild(node);
  scrollStage();
  return node;
}

async function typeText(node, text, signal, cps = 36) {
  let out = "";
  for (const ch of text) {
    if (signal.aborted) throw new DOMException("aborted", "AbortError");
    out += ch;
    node.textContent = out;
    await sleep(ch === " " ? 18 : 1000 / cps, signal);
  }
}

function userRow(text) {
  const row = el("div", "tui-row");
  row.append(el("span", "tui-gt", "&gt; "), el("span", "tui-user", text));
  return row;
}

function assistantRow(text) {
  return el("div", "tui-row tui-asst", text);
}

function toolRow(mark, label, live) {
  const row = el("div", "tui-row tui-tool");
  const spin = el("span", live ? "tui-spin" : "tui-star", live ? mark : "*");
  row.append(spin, document.createTextNode(" " + label));
  return row;
}

function diffBlock(lines) {
  const box = el("div", "tui-diff");
  for (const line of lines) {
    const add = line.startsWith("+");
    const row = el("div", add ? "tui-add" : "tui-ctx");
    row.append(el("span", "tui-rail", "▎"), document.createTextNode(line));
    box.append(row);
  }
  return box;
}

function systemRow(text) {
  return el("div", "tui-row tui-sys", text);
}

function showSheet(title, detail, selected) {
  const sheet = document.getElementById("stage-sheet");
  document.getElementById("stage-sheet-title").textContent = title;
  document.getElementById("stage-sheet-detail").textContent = " " + detail;
  const box = document.getElementById("stage-sheet-choices");
  box.replaceChildren();
  permissionLabels().forEach((label, i) => {
    const on = i === selected;
    box.append(el("div", on ? "tui-choice on" : "tui-choice", `${on ? "❯ " : "  "}${label}`));
  });
  sheet.hidden = false;
  scrollStage();
}

function hideSheet() {
  const sheet = document.getElementById("stage-sheet");
  if (sheet) sheet.hidden = true;
}

function setInput(text, placeholder) {
  const n = document.getElementById("stage-input");
  if (!n) return;
  n.textContent = text || placeholderText();
  n.classList.toggle("tui-ph", placeholder || !text);
}

async function spinTool(row, signal, ms) {
  const mark = row.querySelector(".tui-spin");
  if (!mark) return;
  const start = Date.now();
  let i = 0;
  while (Date.now() - start < ms) {
    if (signal.aborted) throw new DOMException("aborted", "AbortError");
    mark.textContent = SPINNER[i % SPINNER.length];
    i += 1;
    await sleep(90, signal);
  }
  mark.textContent = "*";
  mark.className = "tui-star";
}

function finalFrame(log) {
  log.replaceChildren();
  append(log, userRow(stageText("request", "add an expiry check to verify_token")));
  append(log, assistantRow(stageText("response", "I'll add a guard in src/auth.rs and keep the existing parse path.")));
  append(log, toolRow("*", stageText("write", "write src/auth.rs"), false));
  append(
    log,
    diffBlock([
      "  pub fn verify_token(raw: &str) -> Result<Claims, AuthError> {",
      "      let token = Token::parse(raw)?;",
      "+     if token.expired() {",
      "+         return Err(AuthError::Expired);",
      "+     }",
      "      Ok(token.claims())",
    ])
  );
  showSheet(stageText("write", "write src/auth.rs"), "src/auth.rs", 0);
  setInput("", true);
}

async function playLoop(signal) {
  const log = document.getElementById("stage-log");
  if (!log) return;
  if (prefersReducedMotion()) {
    finalFrame(log);
    return;
  }
  while (!signal.aborted) {
    log.replaceChildren();
    hideSheet();
    setInput("", true);

    const draft = stageText("request", "add an expiry check to verify_token");
    const input = document.getElementById("stage-input");
    input.classList.remove("tui-ph");
    input.textContent = "";
    const caret = el("span", "tui-caret");
    input.append(caret);
    let typed = "";
    for (const ch of draft) {
      if (signal.aborted) throw new DOMException("aborted", "AbortError");
      typed += ch;
      input.textContent = typed;
      input.append(el("span", "tui-caret"));
      await sleep(ch === " " ? 18 : 28, signal);
    }
    await sleep(280, signal);
    setInput("", true);
    append(log, userRow(draft));
    await sleep(420, signal);

    const asst = append(log, assistantRow(""));
    await typeText(
      asst,
      stageText("response", "I'll add a guard in src/auth.rs and keep the existing parse path."),
      signal,
      42
    );
    await sleep(360, signal);

    const tool = append(log, toolRow(SPINNER[0], stageText("write", "write src/auth.rs"), true));
    await spinTool(tool, signal, 700);
    append(
      log,
      diffBlock([
        "  pub fn verify_token(raw: &str) -> Result<Claims, AuthError> {",
        "      let token = Token::parse(raw)?;",
        "+     if token.expired() {",
        "+         return Err(AuthError::Expired);",
        "+     }",
        "      Ok(token.claims())",
      ])
    );
    await sleep(400, signal);

    showSheet(stageText("write", "write src/auth.rs"), "src/auth.rs", 0);
    setInput(stageText("queued", "type to queue · 1–5 / enter grant · esc deny"), true);
    await sleep(900, signal);
    showSheet(stageText("write", "write src/auth.rs"), "src/auth.rs", 0);
    await sleep(350, signal);
    hideSheet();
    append(log, systemRow(stageText("allowed", "allowed once: write src/auth.rs")));
    setInput("", true);
    await sleep(400, signal);

    const run = append(log, toolRow(SPINNER[0], stageText("run", "run cargo test -p ledger -- auth"), true));
    await spinTool(run, signal, 900);
    append(log, el("div", "tui-out", stageText("passed", "ok: 3 passed; 0 failed")));
    await sleep(1800, signal);
  }
}

let stageAbort = null;

function startStage() {
  stageAbort?.abort();
  stageAbort = new AbortController();
  playLoop(stageAbort.signal).catch((err) => {
    if (err?.name !== "AbortError") console.warn(err);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("stage")) return;
  startStage();
});
document.addEventListener("caw-lang", () => {
  if (document.getElementById("stage")) startStage();
});
