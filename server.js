/* server.js
 * 只处理自由提问阶段的 /ask 请求
 * 【API 密钥配置】在 Render 环境变量里设置 DEEPSEEK_API_KEY，不要写死在代码里
 */
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
console.log("密钥加载状态：", !!process.env.DEEPSEEK_API_KEY);
// CORS：全部放行
app.use(cors());
app.use(express.json());
// ====== 限流：单 IP 每日 30 次 + 全局每日 2000 次 ======
const DAY = 24 * 60 * 60 * 1000;
const ipLimiter = rateLimit({
  windowMs: DAY, max: 30,
  keyGenerator: req => req.ip,
  message: { reply: "今日提问次数已用完，请明天再来。" }
});
const globalLimiter = rateLimit({
  windowMs: DAY, max: 2000,
  keyGenerator: () => "global",
  message: { reply: "今日全局提问额度已用完，请明天再来。" }
});
// ====== 健康检查 ======
app.get("/health", (req, res) => res.json({ status: "ok" }));
// ====== 自由提问 ======
app.post("/ask", ipLimiter, globalLimiter, async (req, res) => {
  const { philName, philSchool, philIntro, userQuestion } = req.body || {};
  if (!userQuestion) {
    return res.status(400).json({ reply: "问题不能为空。" });
  }
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ reply: "服务端未配置 DEEPSEEK_API_KEY。" });
  }
  const systemPrompt =
    `你是哲学家${philName}，属于${philSchool}学派。简介：${philIntro}。` +
    `只用你的学派思想回答用户的问题，保持人设，不要反问用户，不要跳出角色。`;
  try {
    const resp = await axios.post(
      "https://api.deepseek.com/chat/completions",
      {
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user",   content: userQuestion }
        ],
        temperature: 0.4,
        top_p: 0.9,
        max_tokens: 500
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        timeout: 30000
      }
    );
    const reply = resp.data?.choices?.[0]?.message?.content?.trim()
      || "（哲学家沉默不语）";
    res.json({ reply });
  } catch (err) {
    console.error("DeepSeek 调用失败：", err.message);
    res.status(502).json({ reply: "AI 暂不可用，请稍后再试。" });
  }
});
// Render 会注入 PORT 环境变量
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
