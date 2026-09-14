/* philosophers.js
 * 13位哲学家的分支诘问题库
 * 修改诘问轮数：在节点间增加/删除层级即可，但请保证最终节点 id 以 _end 结尾
 * 编辑分支：修改每个节点的 options[].nextNodeId 指向
 */
const PHILOSOPHERS = [
  {
    name: "苏格拉底",
    school: "古希腊辩证法",
    intro: "相信自知其无知，以诘问揭示人思想之中潜藏的矛盾，不断审视我们的信念。",
    img: "images/socrates.png",
    startNode: "s1",
    nodes: {
      s1: { question: "你认为，我们所认定的‘善’，是天生就知道，还是后天学习而来？", options: [
        { text: "善是天生存在于人的灵魂里", nextNodeId: "s2a" },
        { text: "善依靠后天教育与生活习得", nextNodeId: "s2b" },
        { text: "善不存在固定标准，因人而异", nextNodeId: "s2c" }
      ]},
      s2a: { question: "如果善本就在灵魂之中，为何大多数人无法时刻行善？", options: [
        { text: "被欲望遮蔽，忘记了内在的善", nextNodeId: "s3a" },
        { text: "没有足够的智慧发掘它", nextNodeId: "s3b" },
        { text: "灵魂里的善微弱，难以掌控", nextNodeId: "s3c" }
      ]},
      s2b: { question: "如果善依靠教育习得，那教授善的人，又是从何处得到善的知识？", options: [
        { text: "由更有智慧的前人传授", nextNodeId: "s3a" },
        { text: "在生活经验里慢慢总结", nextNodeId: "s3b" },
        { text: "社会习俗定义了何为善", nextNodeId: "s3c" }
      ]},
      s2c: { question: "倘若善没有统一标准，我们凭什么评判他人行为的对错？", options: [
        { text: "依靠自己内心感受判断", nextNodeId: "s3a" },
        { text: "尊重每个人自己的善恶", nextNodeId: "s3b" },
        { text: "群体约定就是评判依据", nextNodeId: "s3c" }
      ]},
      s3a: { question: "那你觉得，知道善的人，会主动选择作恶吗？", options: [
        { text: "不会，人知善就必然行善", nextNodeId: "s4_end" },
        { text: "会，明知善依旧选择欲望", nextNodeId: "s4_end" },
        { text: "要看环境对人的影响", nextNodeId: "s4_end" }
      ]},
      s3b: { question: "那么，无知是不是一切恶行的根源？", options: [
        { text: "是的，恶行来自无知", nextNodeId: "s4_end" },
        { text: "不是，还有欲望作祟", nextNodeId: "s4_end" },
        { text: "无知只是一部分原因", nextNodeId: "s4_end" }
      ]},
      s3c: { question: "如果善恶由群体约定，群体会不会集体犯下错误？", options: [
        { text: "群体也会陷入谬误", nextNodeId: "s4_end" },
        { text: "多数人的选择即是正确", nextNodeId: "s4_end" },
        { text: "没有办法判断群体对错", nextNodeId: "s4_end" }
      ]},
      s4_end: { question: "（本轮诘问结束）", options: [] }
    }
  },
  {
    name: "柏拉图",
    school: "理念论",
    intro: "认为可见世界只是虚幻的影子，真正真实的是永恒不变的理念世界。",
    img: "images/plato.png",
    startNode: "p1",
    nodes: {
      p1: { question: "你眼前看到的万物，是事物本身真实的样子吗？", options: [
        { text: "肉眼所见，就是真实", nextNodeId: "p2a" },
        { text: "只是表象，另有真实本体", nextNodeId: "p2b" },
        { text: "没有永恒不变的真实", nextNodeId: "p2c" }
      ]},
      p2a: { question: "事物会不断变化衰败，变化之物怎么会是终极真实？", options: [
        { text: "真实本就处于不断变化", nextNodeId: "p3a" },
        { text: "感官足够可靠，可以认识世界", nextNodeId: "p3b" },
        { text: "人只能接受感官看到的一切", nextNodeId: "p3c" }
      ]},
      p2b: { question: "那我们该用什么，才能看见表象背后的理念？", options: [
        { text: "依靠理性思考", nextNodeId: "p3a" },
        { text: "依靠灵感与想象", nextNodeId: "p3b" },
        { text: "依靠长期的学习训练", nextNodeId: "p3c" }
      ]},
      p2c: { question: "如果不存在永恒真实，那正义、美这类概念从何而来？", options: [
        { text: "是人类创造出来的名词", nextNodeId: "p3a" },
        { text: "只是大家相似的感受", nextNodeId: "p3b" },
        { text: "在不同时代有不同含义", nextNodeId: "p3c" }
      ]},
      p3a: { question: "如果依靠理性认识理念，普通人是否具备这种能力？", options: [
        { text: "人人都拥有，只是需要唤醒", nextNodeId: "p4_end" },
        { text: "只有少数人可以做到", nextNodeId: "p4_end" },
        { text: "大部分人永远无法抵达", nextNodeId: "p4_end" }
      ]},
      p3b: { question: "灵感是否可靠？灵感会不会带来虚假的幻象？", options: [
        { text: "灵感是通往真理的道路", nextNodeId: "p4_end" },
        { text: "灵感真假，需要理性检验", nextNodeId: "p4_end" },
        { text: "灵感大多只是想象", nextNodeId: "p4_end" }
      ]},
      p3c: { question: "学习的目的，是学习新知识，还是回忆灵魂已知的理念？", options: [
        { text: "学习是回忆灵魂见过的理念", nextNodeId: "p4_end" },
        { text: "学习收集全新外界知识", nextNodeId: "p4_end" },
        { text: "二者同时存在", nextNodeId: "p4_end" }
      ]},
      p4_end: { question: "（本轮诘问结束）", options: [] }
    }
  },
  {
    name: "亚里士多德",
    school: "逻辑学、经验论",
    intro: "重视观察现实世界，建立逻辑体系，认为事物都有自身的目的。",
    img: "images/aristotle.png",
    startNode: "ar1",
    nodes: {
      ar1: { question: "想要认识事物，应当先观察现实，还是先依靠抽象推理？", options: [
        { text: "先观察现实，从经验出发", nextNodeId: "ar2a" },
        { text: "先建立理论，再对照现实", nextNodeId: "ar2b" },
        { text: "经验和理论同等重要", nextNodeId: "ar2c" }
      ]},
      ar2a: { question: "如果只依靠感官观察，感官会不会欺骗我们？", options: [
        { text: "仔细观察就能避开欺骗", nextNodeId: "ar3a" },
        { text: "感官需要逻辑来修正", nextNodeId: "ar3b" },
        { text: "感官本身就不可信赖", nextNodeId: "ar3c" }
      ]},
      ar2b: { question: "脱离现实观察的理论，会不会变成空洞猜想？", options: [
        { text: "纯粹推理也可以得到真理", nextNodeId: "ar3a" },
        { text: "理论必须接受现实检验", nextNodeId: "ar3b" },
        { text: "理论不需要完全贴合现实", nextNodeId: "ar3c" }
      ]},
      ar2c: { question: "经验与理性冲突的时候，你选择相信哪一方？", options: [
        { text: "优先相信现实经验", nextNodeId: "ar3a" },
        { text: "优先相信逻辑理性", nextNodeId: "ar3b" },
        { text: "等待更多证据再判断", nextNodeId: "ar3c" }
      ]},
      ar3a: { question: "万物都存在其目的吗？石头、草木也拥有目的吗？", options: [
        { text: "一切事物都有内在目的", nextNodeId: "ar4_end" },
        { text: "只有生命才拥有目的", nextNodeId: "ar4_end" },
        { text: "事物本身没有目的", nextNodeId: "ar4_end" }
      ]},
      ar3b: { question: "人的最高目的，是追求快乐，还是追求沉思？", options: [
        { text: "幸福来自沉思思辨", nextNodeId: "ar4_end" },
        { text: "幸福来自适度的愉悦", nextNodeId: "ar4_end" },
        { text: "幸福没有统一答案", nextNodeId: "ar4_end" }
      ]},
      ar3c: { question: "美德是天生本性，还是长期习惯养成？", options: [
        { text: "美德依靠反复习惯养成", nextNodeId: "ar4_end" },
        { text: "美德是人天生的潜能", nextNodeId: "ar4_end" },
        { text: "二者共同造就美德", nextNodeId: "ar4_end" }
      ]},
      ar4_end: { question: "（本轮诘问结束）", options: [] }
    }
  },
  {
    name: "第欧根尼",
    school: "犬儒学派",
    intro: "抛弃世俗财富、礼法与虚荣，追求自然简朴的生活，批判文明社会的矫饰。",
    img: "images/diogenes.png",
    startNode: "dio1",
    nodes: {
      dio1: { question: "财富、名声与舒适的生活，会让人更加自由吗？", options: [
        { text: "是的，物质带来自由", nextNodeId: "dio2a" },
        { text: "物质会成为人的枷锁", nextNodeId: "dio2b" },
        { text: "适度物质不影响自由", nextNodeId: "dio2c" }
      ]},
      dio2a: { question: "倘若失去财富，你是否会立刻失去自由？", options: [
        { text: "失去物质就失去自由", nextNodeId: "dio3a" },
        { text: "内心自由不受财富影响", nextNodeId: "dio3b" },
        { text: "自由需要基础物质保障", nextNodeId: "dio3c" }
      ]},
      dio2b: { question: "世俗礼法与习俗，是束缚，还是保护人的规则？", options: [
        { text: "习俗大多是虚伪的枷锁", nextNodeId: "dio3a" },
        { text: "礼法维持社会秩序", nextNodeId: "dio3b" },
        { text: "习俗有好有坏，需要分辨", nextNodeId: "dio3c" }
      ]},
      dio2c: { question: "当物质足够维持生存，继续追求更多享受有意义吗？", options: [
        { text: "追求更多享乐是人之常情", nextNodeId: "dio3a" },
        { text: "多余欲望只会带来烦恼", nextNodeId: "dio3b" },
        { text: "看个人想要怎样生活", nextNodeId: "dio3c" }
      ]},
      dio3a: { question: "人最需要的东西，是欲望满足，还是精神自足？", options: [
        { text: "精神自足才是真正富足", nextNodeId: "dio4_end" },
        { text: "满足基础欲望最重要", nextNodeId: "dio4_end" },
        { text: "两者缺一不可", nextNodeId: "dio4_end" }
      ]},
      dio3b: { question: "如果世俗规则违背自然本性，应当遵从吗？", options: [
        { text: "应当遵从自然本性", nextNodeId: "dio4_end" },
        { text: "不能无视社会规则", nextNodeId: "dio4_end" },
        { text: "在安全范围内遵从本性", nextNodeId: "dio4_end" }
      ]},
      dio3c: { question: "简朴生活，会不会舍弃人生很多乐趣？", options: [
        { text: "舍弃浮华，收获安宁", nextNodeId: "dio4_end" },
        { text: "简朴会失去许多美好体验", nextNodeId: "dio4_end" },
        { text: "乐趣的定义本就不同", nextNodeId: "dio4_end" }
      ]},
      dio4_end: { question: "（本轮诘问结束）", options: [] }
    }
  },
  {
    name: "皮浪",
    school: "怀疑论",
    intro: "主张悬置所有判断，不轻易断定事物真假，以此获得内心安宁。",
    img: "images/pyrrho.png",
    startNode: "pyr1",
    nodes: {
      pyr1: { question: "我们是否可以确定，一件事物本身是真实还是虚假？", options: [
        { text: "可以分辨事物真假", nextNodeId: "pyr2a" },
        { text: "无法得到确定答案", nextNodeId: "pyr2b" },
        { text: "部分事情可以确定", nextNodeId: "pyr2c" }
      ]},
      pyr2a: { question: "不同人对同一件事物感受完全相反，谁才掌握真相？", options: [
        { text: "理性之人能够分辨真相", nextNodeId: "pyr3a" },
        { text: "多数人的感受即为真相", nextNodeId: "pyr3b" },
        { text: "不存在统一标准答案", nextNodeId: "pyr3c" }
      ]},
      pyr2b: { question: "如果悬置判断，不对事物下结论，生活如何继续？", options: [
        { text: "依照习俗与表象生活", nextNodeId: "pyr3a" },
        { text: "悬置判断会使人停滞", nextNodeId: "pyr3b" },
        { text: "只保留怀疑，不否定表象", nextNodeId: "pyr3c" }
      ]},
      pyr2c: { question: "哪些事情可以确定，哪些永远无法确定？", options: [
        { text: "感官直接体验可以确定", nextNodeId: "pyr3a" },
        { text: "一切判断都存在争议", nextNodeId: "pyr3b" },
        { text: "逻辑公理是确定的", nextNodeId: "pyr3c" }
      ]},
      pyr3a: { question: "怀疑一切，会不会让人陷入无尽迷茫？", options: [
        { text: "怀疑反而带来心灵平静", nextNodeId: "pyr4_end" },
        { text: "怀疑只会带来迷茫痛苦", nextNodeId: "pyr4_end" },
        { text: "怀疑需要把握限度", nextNodeId: "pyr4_end" }
      ]},
      pyr3b: { question: "我们的感受，是否等同于事物本身的性质？", options: [
        { text: "感受不等于事物本性", nextNodeId: "pyr4_end" },
        { text: "感受就是事物展现的样子", nextNodeId: "pyr4_end" },
        { text: "我们永远触碰不到事物本性", nextNodeId: "pyr4_end" }
      ]},
      pyr3c: { question: "当两种论证都合理对立，该选择支持哪一方？", options: [
        { text: "悬置判断，不下定论", nextNodeId: "pyr4_end" },
        { text: "选择更贴合经验的一方", nextNodeId: "pyr4_end" },
        { text: "权衡利弊做出取舍", nextNodeId: "pyr4_end" }
      ]},
      pyr4_end: { question: "（本轮诘问结束）", options: [] }
    }
  },
  {
    name: "伊壁鸠鲁",
    school: "伊壁鸠鲁学派",
    intro: "追求心灵宁静，认为快乐是善，要远离痛苦，节制欲望。",
    img: "images/epicurus.png",
    startNode: "ep1",
    nodes: {
      ep1: { question: "人生追求的快乐，是短暂感官刺激，还是长久安宁？", options: [
        { text: "短暂感官愉悦就是快乐", nextNodeId: "ep2a" },
        { text: "心灵长久安宁才是快乐", nextNodeId: "ep2b" },
        { text: "二者都需要拥有", nextNodeId: "ep2c" }
      ]},
      ep2a: { question: "追逐持续的感官快乐，会不会带来后续更大痛苦？", options: [
        { text: "及时享乐不必考虑后患", nextNodeId: "ep3a" },
        { text: "很多享乐会埋下痛苦", nextNodeId: "ep3b" },
        { text: "可以适度控制，规避痛苦", nextNodeId: "ep3c" }
      ]},
      ep2b: { question: "想要心灵安宁，需要舍弃大部分欲望吗？", options: [
        { text: "舍弃多余欲望，守住必需", nextNodeId: "ep3a" },
        { text: "压抑欲望本身就是痛苦", nextNodeId: "ep3b" },
        { text: "区分自然欲望与虚妄欲望", nextNodeId: "ep3c" }
      ]},
      ep2c: { question: "感官快乐和心灵宁静发生冲突，优先选择哪一个？", options: [
        { text: "优先感官当下快乐", nextNodeId: "ep3a" },
        { text: "优先守护心灵安宁", nextNodeId: "ep3b" },
        { text: "寻找两者平衡", nextNodeId: "ep3c" }
      ]},
      ep3a: { question: "你害怕死亡吗？死亡会带来痛苦吗？", options: [
        { text: "死亡本身没有痛苦", nextNodeId: "ep4_end" },
        { text: "死亡的恐惧才是痛苦", nextNodeId: "ep4_end" },
        { text: "死亡是最大的苦难", nextNodeId: "ep4_end" }
      ]},
      ep3b: { question: "友谊对获得安宁与快乐，是否必不可少？", options: [
        { text: "友谊是守护安宁的支撑", nextNodeId: "ep4_end" },
        { text: "独处就可以获得宁静", nextNodeId: "ep4_end" },
        { text: "友谊有好有坏，需要谨慎", nextNodeId: "ep4_end" }
      ]},
      ep3c: { question: "美德本身值得追求，还是美德只是获得快乐的工具？", options: [
        { text: "美德是获得快乐的工具", nextNodeId: "ep4_end" },
        { text: "美德本身就有价值", nextNodeId: "ep4_end" },
        { text: "二者无法分割", nextNodeId: "ep4_end" }
      ]},
      ep4_end: { question: "（本轮诘问结束）", options: [] }
    }
  },
  {
    name: "芝诺",
    school: "斯多葛学派",
    intro: "顺应自然与理性，控制自身情绪，接纳无法改变之事，坚守内在德性。",
    img: "images/zeno.png",
    startNode: "z1",
    nodes: {
      z1: { question: "发生在我们身上的遭遇，哪些由我们掌控，哪些不由我们掌控？", options: [
        { text: "外界事件大多不由我们掌控", nextNodeId: "z2a" },
        { text: "人可以改变外界大部分事情", nextNodeId: "z2b" },
        { text: "命运已经预先安排一切", nextNodeId: "z2c" }
      ]},
      z2a: { question: "面对无法改变的苦难，应当抵抗还是接纳？", options: [
        { text: "接纳，守住内心理性", nextNodeId: "z3a" },
        { text: "即便无力，也要抗争到底", nextNodeId: "z3b" },
        { text: "接纳不等于放弃努力", nextNodeId: "z3c" }
      ]},
      z2b: { question: "如果人能掌控外界，失败与不幸从何而来？", options: [
        { text: "源于自身选择与行动", nextNodeId: "z3a" },
        { text: "受到命运与他人限制", nextNodeId: "z3b" },
        { text: "能力不足造成结果", nextNodeId: "z3c" }
      ]},
      z2c: { question: "一切早已注定，人的选择还有意义吗？", options: [
        { text: "人依旧要坚守德性选择", nextNodeId: "z3a" },
        { text: "既然注定，选择无意义", nextNodeId: "z3b" },
        { text: "顺应命运而行", nextNodeId: "z3c" }
      ]},
      z3a: { question: "强烈愤怒、悲伤这类情绪，是否是我们可以控制的？", options: [
        { text: "情绪根源是我们的判断，可以修正", nextNodeId: "z4_end" },
        { text: "情绪是本能，难以控制", nextNodeId: "z4_end" },
        { text: "可以练习，减少情绪扰动", nextNodeId: "z4_end" }
      ]},
      z3b: { question: "德性之外，健康、财富这些外物是否属于真正的善？", options: [
        { text: "只有德性才是真正的善", nextNodeId: "z4_end" },
        { text: "健康财富也是重要的善", nextNodeId: "z4_end" },
        { text: "外物是中性，无善恶", nextNodeId: "z4_end" }
      ]},
      z3c: { question: "顺应自然，代表被动躺平，还是依照理性行动？", options: [
        { text: "顺应理性主动行动", nextNodeId: "z4_end" },
        { text: "顺应自然就是被动接受", nextNodeId: "z4_end" },
        { text: "遵从世界秩序做好本分", nextNodeId: "z4_end" }
      ]},
      z4_end: { question: "（本轮诘问结束）", options: [] }
    }
  },
  {
    name: "笛卡尔",
    school: "近代唯理论",
    intro: "主张普遍怀疑，通过怀疑寻找不可怀疑的根基，我思故我在。",
    img: "images/descartes.png",
    startNode: "de1",
    nodes: {
      de1: { question: "感官经常欺骗我们，我们是否可以怀疑感官带来的一切？", options: [
        { text: "感官不可靠，可以怀疑", nextNodeId: "de2a" },
        { text: "日常感官经验值得信赖", nextNodeId: "de2b" },
        { text: "区分哪些感官可信，哪些不可信", nextNodeId: "de2c" }
      ]},
      de2a: { question: "如果怀疑所见所感，有没有一件事情绝对无法怀疑？", options: [
        { text: "正在怀疑这件事无法怀疑", nextNodeId: "de3a" },
        { text: "不存在任何不可怀疑之物", nextNodeId: "de3b" },
        { text: "数学公理无法被怀疑", nextNodeId: "de3c" }
      ]},
      de2b: { question: "梦境和现实有时难以分辨，如何证明当下不是在做梦？", options: [
        { text: "清醒与梦境有明显差别", nextNodeId: "de3a" },
        { text: "无法绝对证明不是梦境", nextNodeId: "de3b" },
        { text: "依靠连贯的现实判断", nextNodeId: "de3c" }
      ]},
      de2c: { question: "我们依靠什么标准，挑选值得怀疑与值得相信的事物？", options: [
        { text: "清晰明白，才可以相信", nextNodeId: "de3a" },
        { text: "反复验证之后才能相信", nextNodeId: "de3b" },
        { text: "遵从内心直觉判断", nextNodeId: "de3c" }
      ]},
      de3a: { question: "‘我在思考，故我存在’，这里的我，是身体还是心灵？", options: [
        { text: "我是思考的心灵，和身体不同", nextNodeId: "de4_end" },
        { text: "心灵无法脱离身体单独存在", nextNodeId: "de4_end" },
        { text: "心灵与身体是一体", nextNodeId: "de4_end" }
      ]},
      de3b: { question: "如果一切都可怀疑，知识还存在稳固根基吗？", options: [
        { text: "怀疑本身就是知识起点", nextNodeId: "de4_end" },
        { text: "普遍怀疑会摧毁所有知识", nextNodeId: "de4_end" },
        { text: "只能保留或然性的知识", nextNodeId: "de4_end" }
      ]},
      de3c: { question: "数学真理，是否独立于我们的感知而永恒存在？", options: [
        { text: "数学真理永恒不变", nextNodeId: "de4_end" },
        { text: "数学是人创造的工具", nextNodeId: "de4_end" },
        { text: "依赖人的理性才能显现", nextNodeId: "de4_end" }
      ]},
      de4_end: { question: "（本轮诘问结束）", options: [] }
    }
  },
  {
    name: "休谟",
    school: "经验怀疑论",
    intro: "知识全部来自感官经验，我们无法真正证明因果关系。",
    img: "images/hume.png",
    startNode: "hu1",
    nodes: {
      hu1: { question: "我们所说的因果，是事物本身自带的规律，还是人的习惯联想？", options: [
        { text: "因果是事物真实存在的规律", nextNodeId: "hu2a" },
        { text: "因果只是我们习惯的联想", nextNodeId: "hu2b" },
        { text: "两者同时成立", nextNodeId: "hu2c" }
      ]},
      hu2a: { question: "我们只反复看见两件事先后发生，凭什么确定必然有因果？", options: [
        { text: "反复出现就证明因果存在", nextNodeId: "hu3a" },
        { text: "逻辑推理证明因果关系", nextNodeId: "hu3b" },
        { text: "我们只能假设存在因果", nextNodeId: "hu3c" }
      ]},
      hu2b: { question: "如果因果只是习惯联想，科学预测为什么常常有效？", options: [
        { text: "习惯刚好符合自然运行", nextNodeId: "hu3a" },
        { text: "过去的规律未必延续到未来", nextNodeId: "hu3b" },
        { text: "有效不等于必然因果", nextNodeId: "hu3c" }
      ]},
      hu2c: { question: "因果如果不完全真实，我们日常生活还能不能依靠它？", options: [
        { text: "生活只能依靠习惯与经验", nextNodeId: "hu3a" },
        { text: "没有因果，行动失去依据", nextNodeId: "hu3b" },
        { text: "可以使用，但不能绝对确信", nextNodeId: "hu3c" }
      ]},
      hu3a: { question: "自我，是一个持续不变的实体，还是一堆零散感知？", options: [
        { text: "自我只是一连串知觉集合", nextNodeId: "hu4_end" },
        { text: "存在稳定不变的自我", nextNodeId: "hu4_end" },
        { text: "自我无法被直接感知", nextNodeId: "hu4_end" }
      ]},
      hu3b: { question: "道德善恶来自理性推导，还是人的情感感受？", options: [
        { text: "善恶源于人的情感感受", nextNodeId: "hu4_end" },
        { text: "依靠理性分辨善恶", nextNodeId: "hu4_end" },
        { text: "情感和理性共同作用", nextNodeId: "hu4_end" }
      ]},
      hu3c: { question: "我们可以证明未来一定和过去相似吗？", options: [
        { text: "无法证明未来一定相似", nextNodeId: "hu4_end" },
        { text: "自然规律不会轻易改变", nextNodeId: "hu4_end" },
        { text: "经验可以作为可靠推测", nextNodeId: "hu4_end" }
      ]},
      hu4_end: { question: "（本轮诘问结束）", options: [] }
    }
  },
  {
    name: "康德",
    school: "德国古典批判哲学",
    intro: "探究理性的边界，区分现象与物自体，提出道德定言命令。",
    img: "images/kant.png",
    startNode: "k1",
    nodes: {
      k1: { question: "我们看见的世界，是事物本身，还是经过我们心灵加工后的表象？", options: [
        { text: "我们看见的就是事物本体", nextNodeId: "k2a" },
        { text: "只能看见表象，物自体不可知", nextNodeId: "k2b" },
        { text: "表象和本体没有区别", nextNodeId: "k2c" }
      ]},
      k2a: { question: "时间与空间，属于客观世界，还是我们心灵的先天框架？", options: [
        { text: "时空是客观存在的", nextNodeId: "k3a" },
        { text: "时空是人感知的先天形式", nextNodeId: "k3b" },
        { text: "时空是人类后天总结概念", nextNodeId: "k3c" }
      ]},
      k2b: { question: "既然物自体不可知，理性的边界在哪里？", options: [
        { text: "理性只能认识现象世界", nextNodeId: "k3a" },
        { text: "理性可以突破边界认识本体", nextNodeId: "k3b" },
        { text: "理性永远存在局限", nextNodeId: "k3c" }
      ]},
      k2c: { question: "如果表象就是全部现实，道德法则从何处获得普遍性？", options: [
        { text: "道德法则来自人的理性本身", nextNodeId: "k3a" },
        { text: "道德来自社会习俗约定", nextNodeId: "k3b" },
        { text: "道德没有普遍法则", nextNodeId: "k3c" }
      ]},
      k3a: { question: "一件行为是否道德，看结果好坏，还是看动机是否遵从义务？", options: [
        { text: "道德看动机，遵从义务", nextNodeId: "k4_end" },
        { text: "道德由行为结果评判", nextNodeId: "k4_end" },
        { text: "动机和结果都要考虑", nextNodeId: "k4_end" }
      ]},
      k3b: { question: "道德法则：你愿意这条准则成为所有人都遵守的普遍法则吗？", options: [
        { text: "应当遵守普遍道德律令", nextNodeId: "k4_end" },
        { text: "道德应当因人而异", nextNodeId: "k4_end" },
        { text: "兼顾普遍法则与特殊情况", nextNodeId: "k4_end" }
      ]},
      k3c: { question: "人应当只把他人当作手段，还是同时当作目的本身？", options: [
        { text: "人永远应当作为目的，不是单纯手段", nextNodeId: "k4_end" },
        { text: "人际交往难免互相利用", nextNodeId: "k4_end" },
        { text: "分场景看待这个问题", nextNodeId: "k4_end" }
      ]},
      k4_end: { question: "（本轮诘问结束）", options: [] }
    }
  },
  {
    name: "黑格尔",
    school: "辩证法、绝对精神",
    intro: "辩证法正-反-合，精神不断自我发展，认识在矛盾中前进。",
    img: "images/hegel.png",
    startNode: "he1",
    nodes: {
      he1: { question: "矛盾是错误缺陷，还是事物发展必不可少的动力？", options: [
        { text: "矛盾是事物发展的动力", nextNodeId: "he2a" },
        { text: "矛盾代表认知的错误", nextNodeId: "he2b" },
        { text: "矛盾需要尽快消除", nextNodeId: "he2c" }
      ]},
      he2a: { question: "一个观点（正）出现对立观点（反），最终走向更高的合，这是不是认知的规律？", options: [
        { text: "一切认识都遵循这个辩证运动", nextNodeId: "he3a" },
        { text: "只是思考的模式，不是世界规律", nextNodeId: "he3b" },
        { text: "部分领域适用，不是全部", nextNodeId: "he3c" }
      ]},
      he2b: { question: "如果矛盾只是错误，历史与思想如何不断向前发展？", options: [
        { text: "依靠积累正确知识进步", nextNodeId: "he3a" },
        { text: "思想依靠推翻旧观点前进", nextNodeId: "he3b" },
        { text: "进步来自不断修正谬误", nextNodeId: "he3c" }
      ]},
      he2c: { question: "消除矛盾之后，新的矛盾还会不会再次产生？", options: [
        { text: "新矛盾会持续不断生成", nextNodeId: "he3a" },
        { text: "最终可以抵达无矛盾终点", nextNodeId: "he3b" },
        { text: "矛盾多少，视事物而定", nextNodeId: "he3c" }
      ]},
      he3a: { question: "个体精神，是独立存在，还是绝对精神自我展开的一部分？", options: [
        { text: "个体是绝对精神的一环", nextNodeId: "he4_end" },
        { text: "人的精神完全独立", nextNodeId: "he4_end" },
        { text: "二者相互依存", nextNodeId: "he4_end" }
      ]},
      he3b: { question: "真理是不是一次性获得，而是在历史过程中慢慢完成？", options: [
        { text: "真理在历史进程中逐步实现", nextNodeId: "he4_end" },
        { text: "真理永恒不变，等待发现", nextNodeId: "he4_end" },
        { text: "不存在完整的终极真理", nextNodeId: "he4_end" }
      ]},
      he3c: { question: "历史发展有内在必然方向，还是无数偶然事件堆砌？", options: [
        { text: "历史拥有内在理性方向", nextNodeId: "he4_end" },
        { text: "历史充满偶然，无必然方向", nextNodeId: "he4_end" },
        { text: "必然借由偶然展现", nextNodeId: "he4_end" }
      ]},
      he4_end: { question: "（本轮诘问结束）", options: [] }
    }
  },
  {
    name: "孔子",
    school: "儒家",
    intro: "主张仁、礼，重视人伦，追求君子德行，克己复礼。",
    img: "images/confucius.png",
    startNode: "c1",
    nodes: {
      c1: { question: "人与人相处的核心，是外在礼法，还是内在的仁心？", options: [
        { text: "内在仁心是根本", nextNodeId: "c2a" },
        { text: "外在礼法规范人的行为", nextNodeId: "c2b" },
        { text: "仁与礼不可分离", nextNodeId: "c2c" }
      ]},
      c2a: { question: "仁心发自内心，那是否不需要礼法约束？", options: [
        { text: "仁心自然会合乎礼", nextNodeId: "c3a" },
        { text: "仁仍需要礼来节制", nextNodeId: "c3b" },
        { text: "仁为本，礼是外在表现", nextNodeId: "c3c" }
      ]},
      c2b: { question: "只有礼法，内心没有仁，会不会流于虚伪？", options: [
        { text: "没有仁的礼就是虚伪", nextNodeId: "c3a" },
        { text: "礼法本身可以教化人心", nextNodeId: "c3b" },
        { text: "礼法可以慢慢涵养仁心", nextNodeId: "c3c" }
      ]},
      c2c: { question: "仁是爱人，那应当优先爱亲人，还是无差别爱所有人？", options: [
        { text: "爱有亲疏，由近及远", nextNodeId: "c3a" },
        { text: "应当平等爱护所有人", nextNodeId: "c3b" },
        { text: "先亲后众，推己及人", nextNodeId: "c3c" }
      ]},
      c3a: { question: "君子修身，首要目标是安人，还是安顿自己？", options: [
        { text: "先修养自身，而后安人", nextNodeId: "c4_end" },
        { text: "修身为了安顿天下众人", nextNodeId: "c4_end" },
        { text: "自修与济世同时并行", nextNodeId: "c4_end" }
      ]},
      c3b: { question: "面对过错，最重要的是掩盖，还是反省改过？", options: [
        { text: "过则勿惮改，勇于反省", nextNodeId: "c4_end" },
        { text: "顾及名声，谨慎遮掩", nextNodeId: "c4_end" },
        { text: "看场合权衡处理", nextNodeId: "c4_end" }
      ]},
      c3c: { question: "德行修养，依靠天生本性，还是持续学习践行？", options: [
        { text: "依靠后天不断学习践行", nextNodeId: "c4_end" },
        { text: "本性之中已有善根", nextNodeId: "c4_end" },
        { text: "本性需要学习打磨", nextNodeId: "c4_end" }
      ]},
      c4_end: { question: "（本轮诘问结束）", options: [] }
    }
  },
  {
    name: "老子",
    school: "道家",
    intro: "道法自然，无为而治，推崇朴素，不刻意争强。",
    img: "images/laozi.png",
    startNode: "l1",
    nodes: {
      l1: { question: "‘道法自然’，这里的自然，是山川大自然，还是事物本来的样子？", options: [
        { text: "指万物自身本然的状态", nextNodeId: "l2a" },
        { text: "指客观的自然界", nextNodeId: "l2b" },
        { text: "二者都包含在内", nextNodeId: "l2c" }
      ]},
      l2a: { question: "无为，是消极什么都不做，还是不刻意强行妄为？", options: [
        { text: "无为是不妄为，顺其本性", nextNodeId: "l3a" },
        { text: "无为就是躺平不作为", nextNodeId: "l3b" },
        { text: "不强行干预，顺势而为", nextNodeId: "l3c" }
      ]},
      l2b: { question: "人为改造万物，是成全万物，还是破坏其自然本性？", options: [
        { text: "人为干预容易破坏本性", nextNodeId: "l3a" },
        { text: "人的改造可以成全万物", nextNodeId: "l3b" },
        { text: "适度改造，不违背根本", nextNodeId: "l3c" }
      ]},
      l2c: { question: "大道看不见摸不着，那我们如何体会道？", options: [
        { text: "放下执念，静下来体悟", nextNodeId: "l3a" },
        { text: "依靠文字典籍学习大道", nextNodeId: "l3b" },
        { text: "在生活之中感受大道", nextNodeId: "l3c" }
      ]},
      l3a: { question: "柔弱胜刚强，水看似柔软，为何反而更有力量？", options: [
        { text: "柔软可以持久，刚强易折", nextNodeId: "l4_end" },
        { text: "刚强才是真正力量", nextNodeId: "l4_end" },
        { text: "强弱随形势互相转化", nextNodeId: "l4_end" }
      ]},
      l3b: { question: "智慧越多、知识越丰富，人距离大道更近还是更远？", options: [
        { text: "过多智巧，会背离大道", nextNodeId: "l4_end" },
        { text: "知识助人理解大道", nextNodeId: "l4_end" },
        { text: "去除浮华智巧，回归朴素", nextNodeId: "l4_end" }
      ]},
      l3c: { question: "事物盛极必衰，我们抵达顶峰之后应当如何自处？", options: [
        { text: "知止不盈，懂得收敛", nextNodeId: "l4_end" },
        { text: "抓住时机继续进取", nextNodeId: "l4_end" },
        { text: "顺应变化，不执着高位", nextNodeId: "l4_end" }
      ]},
      l4_end: { question: "（本轮诘问结束）", options: [] }
    }
  }
];