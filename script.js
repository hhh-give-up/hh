/* script.js
 * 前端主逻辑
 *
 * 【修改后端地址】把 API_BASE 改成你 Render 部署后的地址
 * 【修改诘问轮数】题库在 philosophers.js 里改节点层级
 * 【替换图片】放 images/ 下同名文件即可
 */

// ====== 配置区 ======
const API_BASE = "https://hh-lp1e.onrender.com/"; // ← 部署后改这里
// ===================

// ====== 全局状态 ======
let metPhilosophers = [];     // 已遇见的哲学家 name 数组
let currentPhil = null;       // 当前哲学家对象
let currentNodeId = null;     // 当前节点 id
let currentRound = 0;         // 当前诘问轮次（从 1 开始计数）
const MAX_ROUND = 4;          // 诘问总轮数

// ====== DOM ======
const $ = id => document.getElementById(id);
const startScreen = $("startScreen");
const gameScreen  = $("gameScreen");
const dialogBox   = $("dialogBox");
const optionsBox  = $("optionsBox");
const freeAskBox  = $("freeAskBox");
const aiReply     = $("aiReply");
const globalCircle= $("globalCircle");

// ====== 开局 ======
$("startCircle").addEventListener("click", () => {
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  renderMetList();
  nextPhilosopher();
});

// ====== 随机抽取未见过的哲学家 ======
function pickPhilosopher() {
  const unseen = PHILOSOPHERS.filter(p => !metPhilosophers.includes(p.name));
  if (unseen.length === 0) {
    // 13 位全见完，自动重置（也可让玩家手动点重置）
    metPhilosophers = [];
    return PHILOSOPHERS[Math.floor(Math.random() * PHILOSOPHERS.length)];
  }
  return unseen[Math.floor(Math.random() * unseen.length)];
}

function nextPhilosopher() {
  currentPhil = pickPhilosopher();
  if (!metPhilosophers.includes(currentPhil.name)) {
    metPhilosophers.push(currentPhil.name);
  }
  renderMetList();

  currentNodeId = currentPhil.startNode;
  currentRound = 1;
  aiReply.style.display = "none";
  freeAskBox.style.display = "none";
  globalCircle.style.display = "none";
  optionsBox.style.display = "flex";

  renderPhilosopherHeader();
  renderNode();
}

// ====== 渲染哲学家信息 ======
function renderPhilosopherHeader() {
  $("philName").textContent  = currentPhil.name;
  $("philSchool").textContent = currentPhil.school;
  $("philImg").src = currentPhil.img;
  $("philImgName").textContent = currentPhil.name;
  $("roundInfo").textContent = `诘问轮次：${currentRound} / ${MAX_ROUND}`;
}

// ====== 渲染当前节点（问题 + 选项） ======
function renderNode() {
  const node = currentPhil.nodes[currentNodeId];
  if (!node) return;

  $("roundInfo").textContent = `诘问轮次：${currentRound} / ${MAX_ROUND}`;

  // 到达结束节点
  if (currentNodeId.endsWith("_end") || node.options.length === 0) {
    dialogBox.textContent = "诘问已结束。你可以选择向这位哲学家提问，也可以直接跳过。";
    optionsBox.innerHTML = "";
    optionsBox.style.display = "none";
    freeAskBox.style.display = "block";
    globalCircle.style.display = "block"; // 圆形按钮 = 跳过
    return;
  }

  dialogBox.textContent = node.question;
  optionsBox.innerHTML = "";
  optionsBox.style.display = "flex";

  node.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = "▸ " + opt.text;
    btn.addEventListener("click", () => {
      currentNodeId = opt.nextNodeId;
      currentRound++;
      renderNode();
      renderPhilosopherHeader();
    });
    optionsBox.appendChild(btn);
  });
}

// ====== 跳过 ======
$("skipBtn").addEventListener("click", nextPhilosopher);
globalCircle.addEventListener("click", nextPhilosopher);

// ====== 自由提问（调用后端） ======
$("askBtn").addEventListener("click", async () => {
  const q = $("questionInput").value.trim();
  if (!q) { alert("请先输入问题"); return; }

  aiReply.style.display = "block";
  aiReply.textContent = "哲学家正在思考……";

  try {
    const res = await fetch(`${API_BASE}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        philName: currentPhil.name,
        philSchool: currentPhil.school,
        philIntro: currentPhil.intro,
        userQuestion: q
      })
    });
    if (!res.ok) throw new Error("bad status " + res.status);
    const data = await res.json();
    aiReply.textContent = data.reply || "（哲学家沉默不语）";
  } catch (err) {
    aiReply.textContent = "⚠ AI 暂不可用，自由提问功能暂时关闭。你仍可继续诘问、跳过或切换哲学家。";
  }
});

// ====== 遇见名单 ======
function renderMetList() {
  const box = $("metList");
  box.innerHTML = PHILOSOPHERS.map(p => {
    const met = metPhilosophers.includes(p.name);
    return `<span class="${met ? "done" : "undone"}">${met ? "✓" : "○"} ${p.name}</span>`;
  }).join("");
}

// ====== 重置遇见记录 ======
$("resetBtn").addEventListener("click", () => {
  metPhilosophers = [];
  renderMetList();
  alert("遇见记录已重置，将重新开始随机抽取。");
});