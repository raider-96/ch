'use strict';

/*
  Trivia Game Server (Express + JSON DB)
  - مصادقة بسيطة بجلسات
  - إدارة مستخدمين (أدمن)
  - بنك أسئلة JSON
  - بدء مباراة / لوحة / سؤال / مساعدات / إجابة / نتائج
  - منع تكرار الأصناف بين الفريقين
  - تعديل نقاط ديناميكي (+100 / -100)
*/

const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

const app = express();

// ======================== الإعدادات العامة ========================
const PORT = process.env.PORT || 3000;
const DB_DIR = path.join(__dirname, 'database');

const CONFIG = {
  categoriesPerTeam: 3,          // عدد الأصناف لكل فريق
  questionsPerDifficulty: 2,     // عدد الأسئلة المختارة لكل صعوبة من كل صنف
  helps: { remove2: 1, extraTime: 1, changeQ: 1 },
  extraTimeSeconds: 30,
  allowNegativeScore: false,     // منع النقاط السالبة إذا false
  cors: {
    allowAll: true,              // لو عندك دومين محدد عدّلها إلى false وأضف origins
    origins: ['http://localhost:3000']
  },
  session: {
    secret: process.env.SESSION_SECRET || 'chigar-secret-key-2024',
    cookieDays: 1
  },
  admin: {
    user: process.env.ADMIN_USER || 'reder',
    pass: process.env.ADMIN_PASS || 'reder11'
  }
};

// ======================== Middleware & Static ========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS مبسّط (مع اعتماد allowAll بشكل افتراضي)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (CONFIG.cors.allowAll) {
    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
  } else if (CONFIG.cors.origins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// جلسات
app.set('trust proxy', 1);
app.use(session({
  secret: CONFIG.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: CONFIG.session.cookieDays * 24 * 60 * 60 * 1000,
    secure: false,        // اجعله true خلف HTTPS
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// ======================== Utilities ========================
function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function readJSON(filename) {
  try {
    const fp = path.join(DB_DIR, filename);
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
  } catch (e) {
    console.error('خطأ قراءة', filename, e.message);
    return null;
  }
}

function writeJSON(filename, data) {
  try {
    const fp = path.join(DB_DIR, filename);
    const tmp = fp + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tmp, fp);
  } catch (e) {
    console.error('خطأ كتابة', filename, e.message);
  }
}

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function uid(prefix) {
  return prefix + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

// دالة مساعدة لإضافة الحقول الافتراضية لو رغبت تستخدمها لاحقًا (اختياري)
function prepQuestions(qs) {
  return qs.map(q => ({
    id: q.id,
    text: q.text,
    options: q.options,
    correctIndex: q.correctIndex,
    difficulty: q.difficulty,
    points: q.points,
    image: q.image || '',
    usedByUsers: Array.isArray(q.usedByUsers) ? q.usedByUsers : []
  }));
}

// ======================== بيانات أولية ========================
// مولد مستخدمين افتراضيين
function getPresetUsers() {
  const users = [];
  for (let i = 1; i <= 20; i++) {
    users.push({
      id: 'u' + i,
      username: i === 1 ? '1' : 'player' + String(i).padStart(2, '0'),
      password: i === 1 ? '1' : 'jkar2024',
      active: true,
      usedQuestions: []
    });
  }
  return {
    admin: { username: CONFIG.admin.user, password: CONFIG.admin.pass },
    users
  };
}

// ضع الأسئلة هنا (سيتم كتابتها لأول مرة فقط)
// ==============================
// TODO: املأ الأصناف والأسئلة هنا. يجب أن تُعيد كائنًا بالشكل:
// { categories: [ { id:'...', name:'...', icon:'...', questions: prepQuestions([ ... ]) }, ... ] }
// اتركها فارغة إذا كنت ستكتب questions.json بنفسك.
// ==============================
function getQuestionsData() {
  return {
    categories: [
      // TODO: اكتب أصنافك هنا. مثال (احذفه عند الاستخدام):
      // { id: 'sample', name: 'مثال', icon: '⭐', questions: prepQuestions([
      //   { id:'s1', text:'2+2؟', options:['3','4','5','6'], correctIndex:1, difficulty:'easy', points:100 },
      //   { id:'s2', text:'3×3؟', options:['6','8','9','12'], correctIndex:2, difficulty:'easy', points:100 }
      // ]) }
    ]
  };
}

// تهيئة قاعدة البيانات (لن يكتب فوق ملفات موجودة)
function initDB() {
  console.log('=== تهيئة قاعدة البيانات ===');
  ensureDir(DB_DIR);

  const usersPath = path.join(DB_DIR, 'users.json');
  const gamesPath = path.join(DB_DIR, 'games.json');
  const questionsPath = path.join(DB_DIR, 'questions.json');

  if (!fs.existsSync(usersPath)) {
    const usersData = getPresetUsers();
    writeJSON('users.json', usersData);
    console.log('تم إنشاء users.json');
  }

  if (!fs.existsSync(gamesPath)) {
    writeJSON('games.json', { games: [] });
    console.log('تم إنشاء games.json');
  }

  if (!fs.existsSync(questionsPath)) {
    const qData = getQuestionsData(); // <-- هنا تضيف أسئلتك لاحقًا
    writeJSON('questions.json', qData);
    console.log('تم إنشاء questions.json (فارغ/مبدئي)');
  }

  console.log('=== التهيئة اكتملت ===');
}

// ======================== مصادقة ========================
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const data = readJSON('users.json');
  if (!data) return res.json({ success: false, message: 'خطأ في قاعدة البيانات' });

  if (data.admin && username === data.admin.username && password === data.admin.password) {
    req.session.userId = 'admin';
    req.session.username = 'admin';
    req.session.isAdmin = true;
    return res.json({ success: true, message: 'مرحباً أدمن!', isAdmin: true });
  }

  const user = (data.users || []).find(u => u.username === username && u.password === password);
  if (!user) return res.json({ success: false, message: 'بيانات غير صحيحة' });
  if (!user.active) return res.json({ success: false, message: 'الحساب معطّل' });

  req.session.userId = user.id;
  req.session.username = user.username;
  req.session.isAdmin = false;
  res.json({ success: true, message: 'مرحباً ' + username + '!' });
});

app.get('/api/auth/me', (req, res) => {
  if (req.session && req.session.userId) {
    return res.json({
      loggedIn: true,
      userId: req.session.userId,
      username: req.session.username,
      isAdmin: !!req.session.isAdmin
    });
  }
  res.json({ loggedIn: false });
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

// ======================== واجهة الأدمن ========================
function requireAdmin(req, res) {
  if (!req.session || !req.session.isAdmin) {
    res.json({ success: false, message: 'غير مصرّح' });
    return false;
  }
  return true;
}

app.get('/api/admin/users', (req, res) => {
  if (!requireAdmin(req, res)) return;
  const data = readJSON('users.json');
  if (!data) return res.json({ success: false });
  res.json({ success: true, users: data.users });
});

app.post('/api/admin/add-user', (req, res) => {
  if (!requireAdmin(req, res)) return;
  const data = readJSON('users.json');
  if (!data) return res.json({ success: false });

  const { username, password } = req.body;
  if (!username || !password) return res.json({ success: false, message: 'بيانات ناقصة' });
  if (data.users.find(u => u.username === username)) {
    return res.json({ success: false, message: 'المستخدم موجود' });
  }

  data.users.push({ id: uid('u'), username, password, active: true, usedQuestions: [] });
  writeJSON('users.json', data);
  res.json({ success: true, message: 'تمت الإضافة' });
});

app.post('/api/admin/toggle-user', (req, res) => {
  if (!requireAdmin(req, res)) return;
  const data = readJSON('users.json');
  if (!data) return res.json({ success: false });

  const user = data.users.find(u => u.id === req.body.userId);
  if (!user) return res.json({ success: false, message: 'غير موجود' });
  user.active = !user.active;

  writeJSON('users.json', data);
  res.json({ success: true, active: user.active });
});

app.post('/api/admin/delete-user', (req, res) => {
  if (!requireAdmin(req, res)) return;
  const data = readJSON('users.json');
  if (!data) return res.json({ success: false });

  data.users = data.users.filter(u => u.id !== req.body.userId);
  writeJSON('users.json', data);
  res.json({ success: true });
});

app.post('/api/admin/reset-user-questions', (req, res) => {
  if (!requireAdmin(req, res)) return;
  const userId = req.body.userId;
  const usersData = readJSON('users.json');
  const questionsData = readJSON('questions.json');
  if (!usersData || !questionsData) return res.json({ success: false });

  const user = usersData.users.find(u => u.id === userId);
  if (user) user.usedQuestions = [];

  // إزالة userId من usedByUsers داخل كل سؤال
  (questionsData.categories || []).forEach(cat => {
    (cat.questions || []).forEach(q => {
      if (!Array.isArray(q.usedByUsers)) q.usedByUsers = [];
      const idx = q.usedByUsers.indexOf(userId);
      if (idx !== -1) q.usedByUsers.splice(idx, 1);
    });
  });

  writeJSON('users.json', usersData);
  writeJSON('questions.json', questionsData);
  res.json({ success: true, message: 'تم إعادة تعيين الأسئلة' });
});

// ======================== اللعبة ========================
// جلب الأصناف
app.get('/api/categories', (req, res) => {
  const data = readJSON('questions.json');
  if (!data || !data.categories) return res.json({ success: false, categories: [] });

  const cats = data.categories.map(c => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
    totalQuestions: (c.questions || []).length
  }));
  res.json({ success: true, categories: cats });
});

// بدء مباراة (مع منع تكرار صنف داخل/بين الفريقين)
app.post('/api/games/start', (req, res) => {
  const t1 = req.body.team1Name;
  const t2 = req.body.team2Name;
  const t1c = req.body.team1Categories || [];
  const t2c = req.body.team2Categories || [];

  if (!t1 || !t2 || t1c.length !== CONFIG.categoriesPerTeam || t2c.length !== CONFIG.categoriesPerTeam) {
    return res.json({ success: false, message: 'بيانات ناقصة أو عدد أصناف غير صحيح' });
  }

  const userId = req.session.userId || 'guest';
  const qData = readJSON('questions.json');
  const gData = readJSON('games.json');
  if (!qData || !gData) return res.json({ success: false, message: 'خطأ في قاعدة البيانات' });

  const idToCat = {};
  (qData.categories || []).forEach(c => { idToCat[c.id] = c; });

  const findDups = arr => {
    const seen = new Set(), d = [];
    arr.forEach(v => { if (seen.has(v)) d.push(v); else seen.add(v); });
    return d;
  };
  const intersect = (a, b) => {
    const setB = new Set(b);
    return a.filter(v => setB.has(v));
  };

  // تكرار داخل نفس الفريق
  const dup1 = findDups(t1c);
  if (dup1.length) {
    return res.json({ success: false, code: 'DUP_TEAM1', duplicateNames: dup1.map(id => idToCat[id]?.name || id) });
  }
  const dup2 = findDups(t2c);
  if (dup2.length) {
    return res.json({ success: false, code: 'DUP_TEAM2', duplicateNames: dup2.map(id => idToCat[id]?.name || id) });
  }

  // تضارب بين الفريقين
  const conflict = intersect(t1c, t2c);
  if (conflict.length) {
    return res.json({ success: false, code: 'CATEGORY_CONFLICT', duplicateNames: conflict.map(id => idToCat[id]?.name || id) });
  }

  // أصناف غير معروفة
  const allCats = t1c.concat(t2c);
  const invalid = allCats.filter(id => !idToCat[id]);
  if (invalid.length) {
    return res.json({ success: false, code: 'INVALID_CATEGORY', invalid });
  }

  // بناء الأسئلة
  const gameId = uid('game');
  const gameQuestions = [];
  const diffs = ['easy', 'medium', 'hard'];

  allCats.forEach(catId => {
    const cat = idToCat[catId];
    diffs.forEach(df => {
      const avail = (cat.questions || []).filter(q =>
        q.difficulty === df &&
        Array.isArray(q.usedByUsers) &&
        q.usedByUsers.indexOf(userId) === -1
      );

      let need = CONFIG.questionsPerDifficulty;
      if (avail.length < need) need = avail.length; // خذ المتاح فقط
      const sel = shuffleArray(avail).slice(0, need);

      sel.forEach(sq => {
        gameQuestions.push({
          questionId: sq.id,
          categoryId: catId,
          categoryName: cat.name,
          text: sq.text,
          options: sq.options,
          correctIndex: sq.correctIndex,
          difficulty: df,
          points: sq.points,
          image: sq.image || '',
          answered: false,
          answeredBy: null,
          isCorrect: null,
          selectedOption: null
        });
        sq.usedByUsers.push(userId);
      });
    });
  });

  writeJSON('questions.json', qData);

  gData.games.push({
    id: gameId,
    userId,
    team1: { name: t1, categories: t1c, score: 0, helps: { ...CONFIG.helps } },
    team2: { name: t2, categories: t2c, score: 0, helps: { ...CONFIG.helps } },
    questions: gameQuestions,
    status: 'playing',
    createdAt: new Date().toISOString()
  });
  writeJSON('games.json', gData);

  res.json({ success: true, gameId });
});

// لوحة المباراة
app.get('/api/games/:gameId/board', (req, res) => {
  const gData = readJSON('games.json');
  if (!gData) return res.json({ success: false });

  const game = gData.games.find(g => g.id === req.params.gameId);
  if (!game) return res.json({ success: false });
  if (game.status === 'finished') return res.json({ success: true, status: 'finished' });

  const board = {};
  game.questions.forEach(q => {
    if (!board[q.categoryId]) {
      board[q.categoryId] = { categoryId: q.categoryId, categoryName: q.categoryName, easy: [], medium: [], hard: [] };
    }
    board[q.categoryId][q.difficulty].push({ questionId: q.questionId, answered: q.answered, points: q.points });
  });

  const arr = Object.keys(board).map(k => board[k]);
  res.json({
    success: true,
    board: arr,
    team1: { name: game.team1.name, score: game.team1.score, helps: game.team1.helps },
    team2: { name: game.team2.name, score: game.team2.score, helps: game.team2.helps },
    status: game.status
  });
});

// جلب سؤال
app.get('/api/games/:gameId/question/:questionId', (req, res) => {
  const gData = readJSON('games.json');
  if (!gData) return res.json({ success: false });

  const game = gData.games.find(g => g.id === req.params.gameId);
  if (!game) return res.json({ success: false });

  const q = game.questions.find(qq => qq.questionId === req.params.questionId);
  if (!q || q.answered) return res.json({ success: false });

  res.json({
    success: true,
    question: {
      questionId: q.questionId,
      categoryName: q.categoryName,
      text: q.text,
      options: q.options,
      difficulty: q.difficulty,
      points: q.points,
      image: q.image
    }
  });
});

// استخدام مساعدات
app.post('/api/games/:gameId/use-help', (req, res) => {
  const { helpType, team, questionId } = req.body;
  const gData = readJSON('games.json');
  if (!gData) return res.json({ success: false });

  const game = gData.games.find(g => g.id === req.params.gameId);
  if (!game) return res.json({ success: false });

  const td = (team === 'team1') ? game.team1 : game.team2;
  if (!td || !td.helps[helpType] || td.helps[helpType] <= 0) {
    return res.json({ success: false, message: 'المساعدة غير متاحة' });
  }

  if (helpType === 'remove2') {
    const q = game.questions.find(x => x.questionId === questionId);
    if (!q) return res.json({ success: false, message: 'سؤال غير موجود' });
    const wrong = q.options.map((_, i) => i).filter(i => i !== q.correctIndex);
    td.helps.remove2--;
    writeJSON('games.json', gData);
    return res.json({
      success: true,
      helpType: 'remove2',
      removeIndexes: shuffleArray(wrong).slice(0, 2),
      helps: td.helps
    });
  }

  if (helpType === 'extraTime') {
    td.helps.extraTime--;
    writeJSON('games.json', gData);
    return res.json({ success: true, helpType: 'extraTime', extraSeconds: CONFIG.extraTimeSeconds, helps: td.helps });
  }

  if (helpType === 'changeQ') {
    const oldIdx = game.questions.findIndex(x => x.questionId === questionId);
    if (oldIdx === -1) return res.json({ success: false, message: 'سؤال غير موجود' });

    const oldQ = game.questions[oldIdx];
    const qData = readJSON('questions.json');

    const cat = (qData.categories || []).find(c => c.id === oldQ.categoryId);
    if (!cat) return res.json({ success: false, message: 'صنف غير موجود' });

    const avail = (cat.questions || []).filter(qq =>
      qq.difficulty === oldQ.difficulty &&
      qq.id !== oldQ.questionId &&
      (game.questions.findIndex(gq => gq.questionId === qq.id) === -1) &&
      Array.isArray(qq.usedByUsers) &&
      qq.usedByUsers.indexOf(game.userId) === -1
    );

    if (avail.length === 0) {
      return res.json({ success: false, message: 'لا يوجد بديل مناسب' });
    }

    const nq = avail[Math.floor(Math.random() * avail.length)];
    game.questions[oldIdx] = {
      questionId: nq.id,
      categoryId: oldQ.categoryId,
      categoryName: oldQ.categoryName,
      text: nq.text,
      options: nq.options,
      correctIndex: nq.correctIndex,
      difficulty: nq.difficulty,
      points: nq.points,
      image: nq.image || '',
      answered: false,
      answeredBy: null,
      isCorrect: null,
      selectedOption: null
    };
    nq.usedByUsers.push(game.userId);

    td.helps.changeQ--;
    writeJSON('games.json', gData);
    writeJSON('questions.json', qData);

    return res.json({
      success: true,
      helpType: 'changeQ',
      helps: td.helps,
      newQuestion: {
        questionId: nq.id,
        categoryName: oldQ.categoryName,
        text: nq.text,
        options: nq.options,
        difficulty: nq.difficulty,
        points: nq.points,
        image: nq.image || ''
      }
    });
  }

  res.json({ success: false, message: 'نوع مساعدة غير معروف' });
});

// تقديم إجابة
app.post('/api/games/:gameId/answer', (req, res) => {
  const { questionId, selectedOption, team } = req.body;

  const gData = readJSON('games.json');
  if (!gData) return res.json({ success: false });

  const game = gData.games.find(g => g.id === req.params.gameId);
  if (!game) return res.json({ success: false });

  const q = game.questions.find(qq => qq.questionId === questionId && !qq.answered);
  if (!q) return res.json({ success: false });

  const isCorrect = (Number(selectedOption) === q.correctIndex);
  q.answered = true;
  q.answeredBy = team;
  q.isCorrect = isCorrect;
  q.selectedOption = Number(selectedOption);

  if (isCorrect) {
    if (team === 'team1') game.team1.score += q.points;
    else game.team2.score += q.points;
  }

  const remaining = game.questions.filter(qq => !qq.answered).length;
  if (remaining === 0) game.status = 'finished';

  writeJSON('games.json', gData);
  res.json({
    success: true,
    isCorrect,
    correctIndex: q.correctIndex,
    pointsEarned: isCorrect ? q.points : 0,
    team1Score: game.team1.score,
    team2Score: game.team2.score,
    finished: game.status === 'finished',
    remaining
  });
});

// تعديل النقاط ديناميكيًا (+100 أو -100)
app.post('/api/games/:gameId/edit-score', (req, res) => {
  const team = req.body.team;              // 'team1' أو 'team2'
  const delta = Number(req.body.delta);    // 100 أو -100

  if (team !== 'team1' && team !== 'team2') {
    return res.json({ success: false, message: 'team غير صالح' });
  }
  if (delta !== 100 && delta !== -100) {
    return res.json({ success: false, message: 'delta يجب أن يكون 100 أو -100' });
  }

  const gData = readJSON('games.json');
  if (!gData) return res.json({ success: false });

  const game = gData.games.find(g => g.id === req.params.gameId);
  if (!game) return res.json({ success: false });

  if (team === 'team1') {
    game.team1.score += delta;
    if (!CONFIG.allowNegativeScore && game.team1.score < 0) game.team1.score = 0;
  } else {
    game.team2.score += delta;
    if (!CONFIG.allowNegativeScore && game.team2.score < 0) game.team2.score = 0;
  }

  writeJSON('games.json', gData);
  res.json({ success: true, delta, team, team1Score: game.team1.score, team2Score: game.team2.score });
});

// النتائج
app.get('/api/games/:gameId/results', (req, res) => {
  const gData = readJSON('games.json');
  if (!gData) return res.json({ success: false });

  const game = gData.games.find(g => g.id === req.params.gameId);
  if (!game) return res.json({ success: false });

  let winner = 'تعادل!';
  if (game.team1.score > game.team2.score) winner = game.team1.name;
  else if (game.team2.score > game.team1.score) winner = game.team2.name;

  const stats = {};
  game.questions.forEach(q => {
    if (!stats[q.categoryId]) stats[q.categoryId] = { categoryId: q.categoryId, categoryName: q.categoryName, total: 0, correct: 0, points: 0 };
    stats[q.categoryId].total++;
    if (q.isCorrect) { stats[q.categoryId].correct++; stats[q.categoryId].points += q.points; }
  });

  res.json({
    success: true,
    team1: { name: game.team1.name, score: game.team1.score },
    team2: { name: game.team2.name, score: game.team2.score },
    winner,
    categoryStats: stats
  });
});

// ======================== خدمات مساعدة/صحة ========================
app.get('/health', (req, res) => res.json({ ok: true }));
app.get('/version', (req, res) => res.json({ version: '1.0.0' }));

// الصفحة الرئيسية
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// ======================== تشغيل ========================
initDB();
app.listen(PORT, () => {
  console.log('========================================');
  console.log('  السيرفر يعمل: http://localhost:' + PORT);
  console.log('  أدمن:', CONFIG.admin.user, '/', CONFIG.admin.pass);
  console.log('========================================');
});