var express = require('express');
var session = require('express-session');
var fs = require('fs');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;
var DB_DIR = path.join(__dirname, 'database');

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1);
app.use(session({
    secret: 'chigar-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000, secure: false, httpOnly: true, sameSite: 'lax' }
}));


// ===== مساعدة JSON =====
function readJSON(filename) {
    try {
        var fp = path.join(DB_DIR, filename);
        if (!fs.existsSync(fp)) return null;
        return JSON.parse(fs.readFileSync(fp, 'utf8'));
    } catch (e) {
        console.log('خطأ قراءة ' + filename + ':', e.message);
        return null;
    }
}

function writeJSON(filename, data) {
    try {
        var fp = path.join(DB_DIR, filename);
        fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
        console.log('خطأ كتابة ' + filename + ':', e.message);
    }
}

function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
}

// ===== اليوزرات =====
function getPresetUsers() {
    return {
        admin: { username: 'reder', password: 'reder11' },
        users: [
            { id: 'u1', username: '1', password: '1', active: true, usedQuestions: [] },
            { id: 'u2', username: 'player02', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u3', username: 'player03', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u4', username: 'player04', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u5', username: 'player05', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u6', username: 'player06', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u7', username: 'player07', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u8', username: 'player08', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u9', username: 'player09', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u10', username: 'player10', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u11', username: 'player11', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u12', username: 'player12', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u13', username: 'player13', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u14', username: 'player14', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u15', username: 'player15', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u16', username: 'player16', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u17', username: 'player17', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u18', username: 'player18', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u19', username: 'player19', password: 'jkar2024', active: true, usedQuestions: [] },
            { id: 'u20', username: 'player20', password: 'jkar2024', active: true, usedQuestions: [] }
        ]
    };
}

// ===== بنك الأسئلة (مختصر للمثال) =====

function getQuestionsData() {
    function prepQuestions(qs) {
    var arr = [];
    for (var i = 0; i < qs.length; i++) {
        arr.push({
            id: qs[i].id, text: qs[i].text, options: qs[i].options,
            correctIndex: qs[i].correctIndex, difficulty: qs[i].difficulty,
            points: qs[i].points, image: '', usedByUsers: []
        });
    }
    return arr;
} 
    var data = { categories: [] };

// ==================== 1 مسلسلات عربية ==========================================================================================
var arabSeries = { id: 'arab_series', name: 'مسلسلات عربية', icon: '🎭', qs: [
    // سهل (20 سؤال)
        { id:'as1', text:'من بطل مسلسل باب الحارة؟', options:['تيم حسن','عباس النوري','وائل شرف','سامر المصري'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'as2', text:'مسلسل الهيبة من بطولة من؟', options:['باسم مغنية','تيم حسن','قصي خولي','مكسيم خليل'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'as3', text:'بطل مسلسل عمر المختار؟', options:['أنتوني كوين','عمر الشريف','أحمد مظهر','العلايلي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'as4', text:'من بطل مسلسل ليالي الحلمية؟', options:['يحيى الفخراني','نور الشريف','صلاح السعدني','محمود عبد العزيز'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'as5', text:'بطل مسلسل رأفت الهجان؟', options:['محمود عبد العزيز','عادل إمام','نور الشريف','أحمد زكي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'as6', text:'من بطل مسلسل الكبير أوي؟', options:['محمد سعد','أحمد مكي','أحمد حلمي','محمد رمضان'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'as7', text:'مسلسل الذي تدور أحداثه في حارة دمشقية؟', options:['باب الحارة','ليالي الحلمية','الجماعة','رأفت الهجان'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'as8', text:'من بطل مسلسل ابن حلال؟', options:['محمد رمضان','محمد سعد','أحمد العوضي','عمرو يوسف'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'as9', text:'بطلة مسلسل لن أعيش في جلباب أبي؟', options:['نور الشريف','يسرا','حنان ترك','سعاد حسني'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'as10', text:'من بطل مسلسل الاختيار؟', options:['أمير كرارة','كريم عبد العزيز','محمد رمضان','ياسر جلال'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'as11', text:'مسلسل سعودي شهير من بطولة ناصر القصبي؟', options:['طاش ما طاش','سيلفي','العاصوف','بكرا أحلى'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'as12', text:'من بطل مسلسل الجماعة؟', options:['هاني سلامة','عمرو يوسف','أحمد فهمي','أحمد بدير'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'as13', text:'بطل مسلسل الفتوة؟', options:['ياسر جلال','عمرو سعد','محمد رمضان','أحمد العوضي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'as14', text:'مسلسل عراقي شهير عن الأحياء الشعبية؟', options:['الذئب وعيون المدينة','تحت موسى','النسر','بيوت الطين'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'as15', text:'من بطل مسلسل العاصوف؟', options:['ناصر القصبي','عبدالله السدحان','فايز المالكي','حبيب الحبيب'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'as16', text:'بطل مسلسل قيامة أرطغرل العربي؟', options:['تركي','سوري','مصري','خليجي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'as17', text:'مسلسل خليجي شهير من بطولة حياة الفهد؟', options:['أم البنات','رحيل','زوارة الخميس','كل ما سبق'], correctIndex:3, difficulty:'easy', points:100 },
        { id:'as18', text:'بطل مسلسل وجه القمر؟', options:['جمال سليمان','بسام كوسا','عابد فهد','مكسيم خليل'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'as19', text:'من بطل مسلسل الشهد والدموع؟', options:['يحيى الفخراني','محمود ياسين','نور الشريف','حسين فهمي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'as20', text:'مسلسل بدوي عن قصة عنترة؟', options:['عنترة بن شداد','الزير سالم','صقر قريش','ربيع قرطبة'], correctIndex:0, difficulty:'easy', points:100 },
        // متوسط (20 سؤال)
        { id:'as21', text:'كم جزء من مسلسل باب الحارة؟', options:['8','10','11','12'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'as22', text:'متى عرض مسلسل رأفت الهجان لأول مرة؟', options:['1986','1988','1990','1992'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'as23', text:'في أي عام عرض مسلسل ليالي الحلمية؟', options:['1985','1987','1989','1991'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'as24', text:'من مؤلف مسلسل ليالي الحلمية؟', options:['أسامة أنور عكاشة','وحيد حامد','محفوظ عبد الرحمن','يوسف معاطي'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'as25', text:'كم جزء من مسلسل الهيبة؟', options:['3','4','5','6'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'as26', text:'من إخراج مسلسل الجماعة؟', options:['محمد ياسين','وحيد حامد','عثمان أبو لبن','مجدي أحمد علي'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'as27', text:'مسلسل الاختيار كم جزء؟', options:['1','2','3','4'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'as28', text:'من بطلة مسلسل زهرة وأزواجها الخمسة؟', options:['ليلى علوي','يسرا','نيللي','ميرفت أمين'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'as29', text:'مسلسل الاجتياح يتحدث عن؟', options:['القضية الفلسطينية','الحرب اللبنانية','الحرب العراقية','الثورة المصرية'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'as30', text:'بطل مسلسل ضوء النهار؟', options:['تيم حسن','عابد فهد','جمال سليمان','بسام كوسا'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'as31', text:'من بطل مسلسل خواطر؟', options:['أحمد الشقيري','عمرو خالد','مصطفى حسني','معز مسعود'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'as32', text:'بطلة مسلسل عائلة الحاج متولي؟', options:['غادة عبد الرازق','ليلى علوي','سهير رمزي','يسرا'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'as33', text:'مسلسل خمسة ونص بطولة من؟', options:['كريم عبد العزيز','أحمد عز','أحمد السقا','عمرو يوسف'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'as34', text:'كم سنة عمل ياسر العظمة في مرايا؟', options:['10','15','20','25'], correctIndex:3, difficulty:'medium', points:200 },
        { id:'as35', text:'من بطل مسلسل الزير سالم؟', options:['سلوم حداد','عابد فهد','جمال سليمان','بسام كوسا'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'as36', text:'مسلسل صلاح الدين الأيوبي بطولة من؟', options:['جمال سليمان','بسام كوسا','عابد فهد','تيم حسن'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'as37', text:'بطل مسلسل البرنس؟', options:['محمد رمضان','محمد إمام','عمرو يوسف','أحمد عز'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'as38', text:'من إخراج مسلسل ليالي الحلمية؟', options:['إسماعيل عبد الحافظ','محمد فاضل','يوسف شاهين','نور الدمرداش'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'as39', text:'مسلسل أبو العروسة بطولة؟', options:['سيد رجب','صلاح عبد الله','محمد رياض','محمود البزاوي'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'as40', text:'بطل مسلسل العار؟', options:['نور الشريف','حسين فهمي','محمود ياسين','محمود عبد العزيز'], correctIndex:0, difficulty:'medium', points:200 },
        // صعب (20 سؤال)
        { id:'as41', text:'من مؤلف مسلسل رأفت الهجان؟', options:['صالح مرسي','أسامة أنور عكاشة','وحيد حامد','محفوظ عبد الرحمن'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'as42', text:'كم عدد حلقات الجزء الأول من باب الحارة؟', options:['28','30','32','34'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'as43', text:'من إخراج مسلسل الزير سالم؟', options:['حاتم علي','نجدت إسماعيل أنزور','المثنى صبح','الليث حجو'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'as44', text:'في أي سنة عرض مسلسل التغريبة الفلسطينية؟', options:['2002','2004','2006','2008'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'as45', text:'من مؤلف مسلسل التغريبة الفلسطينية؟', options:['وليد سيف','حاتم علي','ممدوح عدوان','نهاد سيريس'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'as46', text:'كم عدد أجزاء مسلسل عمر؟', options:['25','30','31','35'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'as47', text:'من بطل مسلسل سيرة آل المغربي؟', options:['عبدالله غيث','نور الشريف','يحيى الفخراني','محمود ياسين'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'as48', text:'في أي سنة بدأ مسلسل طاش ما طاش؟', options:['1993','1995','1997','1999'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'as49', text:'من مؤلف مسلسل الجماعة؟', options:['وحيد حامد','أسامة أنور عكاشة','محفوظ عبد الرحمن','يوسف القعيد'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'as50', text:'بطل مسلسل الاجتياح؟', options:['كاريس بشار','تيم حسن','عابد فهد','جمال سليمان'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'as51', text:'كم جزء من مسلسل الاختيار؟', options:['2','3','4','5'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'as52', text:'من إخراج مسلسل الكبير أوي؟', options:['أحمد الجندي','وائل إحسان','رؤوف عبد العزيز','محمد علي'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'as53', text:'كم حلقة في مسلسل لن أعيش في جلباب أبي؟', options:['25','29','30','35'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'as54', text:'من مؤلف مسلسل عمر؟', options:['وليد سيف','حاتم علي','وحيد حامد','أسامة أنور عكاشة'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'as55', text:'في أي سنة عرض مسلسل صلاح الدين الأيوبي؟', options:['2001','2003','2005','2007'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'as56', text:'مسلسل أبو جانتي بطولة؟', options:['باسم ياخور','تيم حسن','عابد فهد','جمال سليمان'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'as57', text:'من مؤلف مسلسل المتمردة؟', options:['ريم حنا','حسن سامي يوسف','نجيب نصير','حازم سليمان'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'as58', text:'بطل مسلسل لعبة الموت؟', options:['كريم عبد العزيز','أحمد عز','يوسف الشريف','يحيى الفخراني'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'as59', text:'كم جزء من مسلسل سلسال الدم؟', options:['5','6','7','8'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'as60', text:'من بطل مسلسل ولد الغلابة؟', options:['محمد رمضان','محمد سعد','عمرو سعد','أحمد العوضي'], correctIndex:0, difficulty:'hard', points:400 }
    ]};
    data.categories.push({ id:arabSeries.id, name:arabSeries.name, icon:arabSeries.icon, questions: prepQuestions(arabSeries.qs) });
// ==================== 2مسلسلات خليجية ============================================================================================
var gulfSeries = { id:'gulfSeries', name:'مسلسلات خليجية', icon:'🌴', qs:[
    // سهل
    { id:'gs1', text:'من بطل مسلسل "طاش ما طاش" إلى جانب عبدالله السدحان؟', options:['ناصر القصبي','طارق العلي','حسن عسيري','داود حسين'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs2', text:'من بطل مسلسل "خمسة بنك"؟', options:['طارق العلي','ناصر القصبي','حسن عسيري','محمد المنصور'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs3', text:'من بطلة مسلسل "أميمة في دار الأيتام"؟', options:['حياة الفهد','سعاد عبدالله','هدى حسين','إلهام الفضالة'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs4', text:'من بطلة مسلسل "السندريلا"؟', options:['هدى حسين','حياة الفهد','سعاد عبدالله','شجون الهاجري'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs5', text:'من بطل مسلسل "حيالله"؟', options:['طارق العلي','حسن عسيري','خالد أمين','داود حسين'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs6', text:'من بطل مسلسل "سعد وخواته"؟', options:['حسن عسيري','طارق العلي','ناصر القصبي','محمد العجمي'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs7', text:'من بطلة مسلسل "الميراث"؟', options:['سعاد عبدالله','حياة الفهد','هدى حسين','إلهام الفضالة'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs8', text:'من بطلة مسلسل "أم هارون"؟', options:['حياة الفهد','سعاد عبدالله','شجون الهاجري','هيا عبدالسلام'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs9', text:'من بطل مسلسل "ماي عيني"؟', options:['داود حسين','طارق العلي','حسن عسيري','خالد أمين'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs10', text:'من بطل مسلسل "راس الغول"؟', options:['ناصر القصبي','طارق العلي','حسن عسيري','عبدالمحسن النمر'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs11', text:'على أي قناة عُرض مسلسل "شباب البومب"؟', options:['MBC','السعودية','أبوظبي','دبي'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs12', text:'على أي قناة عُرض مسلسل "مسامير"؟', options:['MBC','السعودية','قناة دبي','الكويت'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs13', text:'من بطل مسلسل "الديرفة"؟', options:['عبدالمحسن النمر','طارق العلي','حسن عسيري','ناصر القصبي'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs14', text:'من بطل مسلسل "عودة أبو الهنا"؟', options:['محمد المنصور','طارق العلي','حسن عسيري','خالد أمين'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs15', text:'من بطل مسلسل "فيفا أطفال"؟', options:['طارق العلي','حسن عسيري','محمد العجمي','داود حسين'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs16', text:'من بطل مسلسل "السرقة"؟', options:['إبراهيم الحساوي','طارق العلي','حسن عسيري','عبدالمحسن النمر'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs17', text:'من بطل مسلسل "بوكرة أحلى"؟', options:['خالد أمين','طارق العلي','داود حسين','حسن عسيري'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs18', text:'من بطل مسلسل "الخيمة" الكويتي الكلاسيكي؟', options:['عبدالحسين عبدالرضا','سعد الفرج','خالد النفيسي','محمد المنصور'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs19', text:'من بطلة مسلسل "الوصية"؟', options:['سعاد عبدالله','حياة الفهد','هدى حسين','إلهام الفضالة'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'gs20', text:'من بطل مسلسل "العاصوف"؟', options:['ناصر القصبي','طارق العلي','حسن عسيري','عبدالمحسن النمر'], correctIndex:0, difficulty:'easy', points:100 },
    // متوسط
    { id:'gs21', text:'من مخرج مسلسل "العاصوف"؟', options:['أحمد الجابري','منير الزعبي','فهد الهليل','محمد جمال العدل'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs22', text:'كم جزءً لمسلسل "العاصوف"؟', options:['3','2','4','5'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs23', text:'من مؤلف رواية "العاصوف" الأصلية؟', options:['تركي آل الشيخ','ناصر القصبي','فهد العليوة','عبدالحسين عبدالرضا'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs24', text:'من مخرج مسلسل "أم هارون"؟', options:['محمد جمال العدل','أحمد الجابري','منير الزعبي','فهد الهليل'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs25', text:'من مخرج مسلسل "الميراث"؟', options:['منير الزعبي','أحمد الجابري','فهد الهليل','محمد جمال العدل'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs26', text:'من مخرج مسلسل "شباب البومب"؟', options:['أحمد الجابري','منير الزعبي','فهد الهليل','عبدالخالق الغانم'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs27', text:'على أي قناة عُرض "خمسة بنك"؟', options:['MBC','السعودية','أبوظبي','الكويت'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs28', text:'على أي قناة عُرض "العاصوف"؟', options:['MBC','السعودية','أبوظبي','الكويت'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs29', text:'من مؤلف مسلسل "طاش ما طاش" الأصلي؟', options:['ناصر القصبي وعبدالله السدحان','تركي آل الشيخ','فهد العليوة','عبدالحسين عبدالرضا'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs30', text:'من مخرج مسلسل "حيالله"؟', options:['فهد الهليل','أحمد الجابري','منير الزعبي','عبدالخالق الغانم'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs31', text:'من بطلة مسلسل "الوتر" الكويتي؟', options:['سعاد عبدالله','حياة الفهد','هدى حسين','إلهام الفضالة'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs32', text:'من بطل مسلسل "أبو الملايين"؟', options:['سعد الفرج','عبدالحسين عبدالرضا','محمد المنصور','خالد النفيسي'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs33', text:'من بطل مسلسل "على الدنيا السلام"؟', options:['عبدالحسين عبدالرضا','سعد الفرج','محمد المنصور','خالد النفيسي'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs34', text:'من بطلة مسلسل "ضحايا حلال"؟', options:['سعاد عبدالله','حياة الفهد','هدى حسين','إلهام الفضالة'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs35', text:'من بطل مسلسل "الحيالة"؟', options:['طارق العلي','حسن عسيري','ناصر القصبي','داود حسين'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs36', text:'من بطل مسلسل "الدنيا ريشة في هوا"؟', options:['إبراهيم الحساوي','طارق العلي','حسن عسيري','خالد أمين'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs37', text:'من بطل مسلسل "ساهر الليل" الكويتي؟', options:['يعقوب عبدالله','طارق العلي','حسن عسيري','سعد الفرج'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs38', text:'من بطل مسلسل "أنا وخالتي" الكويتي؟', options:['محمد المنصور','سعد الفرج','عبدالحسين عبدالرضا','خالد النفيسي'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs39', text:'من بطل مسلسل "عائلتي وأنا" الكويتي الكلاسيكي؟', options:['عبدالحسين عبدالرضا','سعد الفرج','محمد المنصور','خالد النفيسي'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'gs40', text:'من بطلة مسلسل "القارئة" الكويتي؟', options:['حياة الفهد','سعاد عبدالله','هدى حسين','إلهام الفضالة'], correctIndex:0, difficulty:'medium', points:200 },
    // صعب
    { id:'gs41', text:'في أي سنة عُرض الجزء الأول من "طاش ما طاش"؟', options:['1992','1990','1995','1989'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs42', text:'من مؤلف مسلسل "الوتر" الكويتي؟', options:['فهد العليوة','عبدالحسين عبدالرضا','منير الزعبي','تركي آل الشيخ'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs43', text:'من مخرج مسلسل "السندريلا" الكويتي؟', options:['منير الزعبي','فهد الهليل','أحمد الجابري','عبدالخالق الغانم'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs44', text:'من مؤلف مسلسل "الخيمة" الكويتي الكلاسيكي؟', options:['عبدالحسين عبدالرضا','سعد الفرج','فهد العليوة','منير الزعبي'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs45', text:'من مؤلف مسلسل "على الدنيا السلام"؟', options:['عبدالحسين عبدالرضا','سعد الفرج','فهد العليوة','منير الزعبي'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs46', text:'من بطل مسلسل "العائد" الكويتي؟', options:['جاسم النبهان','محمد المنصور','سعد الفرج','عبدالحسين عبدالرضا'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs47', text:'من بطل مسلسل "سايكو" السعودي؟', options:['محمد العلوي','حسن عسيري','طارق العلي','ناصر القصبي'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs48', text:'من مخرج مسلسل "الديرفة" السعودي؟', options:['عبدالمحسن النمر','أحمد الجابري','فهد الهليل','منير الزعبي'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs49', text:'من مؤلف مسلسل "راس الغول"؟', options:['ناصر القصبي','عبدالله السدحان','تركي آل الشيخ','فهد العليوة'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs50', text:'من بطل مسلسل "العيال كبرت" السعودي الكلاسيكي؟', options:['راشد الشمراني','ناصر القصبي','حسن عسيري','طارق العلي'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs51', text:'من بطل مسلسل "هذي الرياض" السعودي؟', options:['راشد الشمراني','ناصر القصبي','حسن عسيري','طارق العلي'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs52', text:'من مخرج مسلسل "الحيالة" الكويتي؟', options:['فهد الهليل','أحمد الجابري','منير الزعبي','عبدالخالق الغانم'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs53', text:'من بطل مسلسل "السرقة" الكويتي؟', options:['إبراهيم الحساوي','طارق العلي','حسن عسيري','عبدالمحسن النمر'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs54', text:'من مخرج مسلسل "فيفا أطفال" الكويتي؟', options:['عمر الديني','فهد الهليل','أحمد الجابري','منير الزعبي'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs55', text:'من مخرج مسلسل "أنا وخالتي" الكويتي؟', options:['محمد المنصور','فهد الهليل','أحمد الجابري','منير الزعبي'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs56', text:'على أي قناة عُرض مسلسل "الميراث" الكويتي الطويل؟', options:['MBC','السعودية','أبوظبي','الكويت'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs57', text:'على أي قناة عُرض مسلسل "أم هارون" الكويتي-الإماراتي؟', options:['MBC','السعودية','أبوظبي','الكويت'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs58', text:'في أي سنة عُرض الجزء الأول من "العاصوف"؟', options:['2019','2017','2020','2015'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs59', text:'كم جزءً تقريبًا لمسلسل "طاش ما طاش"؟', options:['18 جزءًا','10 أجزاء','25 جزءًا','15 جزءًا'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'gs60', text:'شركة "مركوت" السعودية هي منتجة لأي عمل؟', options:['مسامير','شباب البومب','العاصوف','طاش ما طاش'], correctIndex:0, difficulty:'hard', points:400 }
]};
data.categories.push({ id:gulfSeries.id, name:gulfSeries.name, icon:gulfSeries.icon, questions: prepQuestions(gulfSeries.qs) });
// ==================== 4 مسلسلات أجنبية ==========================================================================================
var foreignSeries = { id:'foreign_series', name:'مسلسلات أجنبية', icon:'🎬', qs:[
    // سهل
        { id:'fs1', text:'من بطل مسلسل Breaking Bad؟', options:['Bryan Cranston','Aaron Paul','Bob Odenkirk','Anna Gunn'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fs2', text:'مسلسل Game of Thrones مأخوذ عن روايات؟', options:['George R.R. Martin','J.K. Rowling','Stephen King','Tolkien'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fs3', text:'كم موسم من مسلسل Friends؟', options:['8','9','10','11'], correctIndex:2, difficulty:'easy', points:100 },
        { id:'fs4', text:'من بطل مسلسل Sherlock؟', options:['Benedict Cumberbatch','Robert Downey Jr','Tom Hardy','Tom Hiddleston'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fs5', text:'مسلسل The Walking Dead عن؟', options:['الزومبي','المصاصين','الأشباح','الفضائيين'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fs6', text:'بطل مسلسل Vikings؟', options:['Travis Fimmel','Chris Hemsworth','Tom Hardy','Jason Momoa'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fs7', text:'كم موسم من Game of Thrones؟', options:['6','7','8','9'], correctIndex:2, difficulty:'easy', points:100 },
        { id:'fs8', text:'مسلسل Stranger Things على أي منصة؟', options:['Netflix','HBO','Disney+','Amazon'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fs9', text:'بطل مسلسل Money Heist؟', options:['Álvaro Morte','Pedro Alonso','Úrsula Corberó','Najwa Nimri'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fs10', text:'مسلسل Money Heist من أي بلد؟', options:['إسبانيا','المكسيك','الأرجنتين','إيطاليا'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fs11', text:'بطلة مسلسل Wednesday؟', options:['Jenna Ortega','Millie Bobby Brown','Sadie Sink','Maya Hawke'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fs12', text:'مسلسل The Crown عن؟', options:['الملكة إليزابيث','الملك تشارلز','الأميرة ديانا','الأمير هاري'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fs13', text:'بطل مسلسل Peaky Blinders؟', options:['Cillian Murphy','Tom Hardy','Paul Anderson','Joe Cole'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fs14', text:'مسلسل Lost عن؟', options:['ناجين على جزيرة','مدرسة سحرية','مدينة فاسدة','حرب نووية'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fs15', text:'بطل مسلسل Dexter؟', options:['Michael C. Hall','Bryan Cranston','Hugh Laurie','Kiefer Sutherland'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fs16', text:'مسلسل Squid Game من أي بلد؟', options:['كوريا الجنوبية','اليابان','الصين','تايلاند'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fs17', text:'بطل مسلسل House MD؟', options:['Hugh Laurie','Patrick Dempsey','Eric Dane','Justin Chambers'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fs18', text:'مسلسل Grey\'s Anatomy عن؟', options:['الأطباء','المحامين','الشرطة','المدرسين'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fs19', text:'بطل مسلسل The Office (الأمريكي)؟', options:['Steve Carell','John Krasinski','Rainn Wilson','Ed Helms'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fs20', text:'بطل مسلسل The Mandalorian؟', options:['Pedro Pascal','Oscar Isaac','Ewan McGregor','Hayden Christensen'], correctIndex:0, difficulty:'easy', points:100 },
        // متوسط
        { id:'fs21', text:'كم موسم من Breaking Bad؟', options:['4','5','6','7'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'fs22', text:'في أي سنة بدأ مسلسل Game of Thrones؟', options:['2009','2010','2011','2012'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'fs23', text:'من مبتكر مسلسل Lost؟', options:['J.J. Abrams','Damon Lindelof','Vince Gilligan','David Lynch'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fs24', text:'كم موسم من The Walking Dead؟', options:['9','10','11','12'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'fs25', text:'بطل مسلسل True Detective الموسم الأول؟', options:['Matthew McConaughey','Woody Harrelson','كلاهما','Colin Farrell'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'fs26', text:'مسلسل Better Call Saul فرع من؟', options:['Breaking Bad','The Wire','True Detective','Mad Men'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fs27', text:'مبتكر مسلسل Game of Thrones؟', options:['David Benioff','D.B. Weiss','كلاهما','J.J. Abrams'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'fs28', text:'بطلة مسلسل Killing Eve؟', options:['Sandra Oh','Jodie Comer','كلاهما','Kim Bodnia'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'fs29', text:'مسلسل Westworld على أي قناة؟', options:['HBO','Netflix','Amazon','Disney+'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fs30', text:'كم موسم من Vikings؟', options:['5','6','7','8'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'fs31', text:'بطل مسلسل Mr. Robot؟', options:['Rami Malek','Christian Slater','Carly Chaikin','Portia Doubleday'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fs32', text:'مسلسل Fargo مأخوذ عن فيلم؟', options:['Coen Brothers','Tarantino','Scorsese','Spielberg'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fs33', text:'كم موسم من Sherlock البريطاني؟', options:['3','4','5','6'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'fs34', text:'بطل مسلسل Narcos؟', options:['Wagner Moura','Pedro Pascal','Boyd Holbrook','Diego Luna'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fs35', text:'مسلسل Black Mirror مبتكره؟', options:['Charlie Brooker','J.J. Abrams','Vince Gilligan','David Lynch'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fs36', text:'بطل مسلسل The Boys؟', options:['Karl Urban','Antony Starr','Jack Quaid','Erin Moriarty'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fs37', text:'مسلسل Chernobyl كم موسم؟', options:['1','2','3','4'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fs38', text:'بطل مسلسل The Last of Us؟', options:['Pedro Pascal','Bella Ramsey','كلاهما','Joel Smallbone'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'fs39', text:'كم موسم من Stranger Things حتى 2024؟', options:['3','4','5','6'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'fs40', text:'مسلسل House of Cards الأمريكي بطولة؟', options:['Kevin Spacey','Robin Wright','كلاهما','Michael Kelly'], correctIndex:2, difficulty:'medium', points:200 },
        // صعب
        { id:'fs41', text:'من مبتكر Breaking Bad؟', options:['Vince Gilligan','David Chase','Matthew Weiner','David Simon'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'fs42', text:'كم حلقة في مسلسل Breaking Bad كاملاً؟', options:['52','62','72','82'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'fs43', text:'في أي سنة انتهى مسلسل Lost؟', options:['2009','2010','2011','2012'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'fs44', text:'كم جائزة Emmy حصل عليها Game of Thrones؟', options:['38','47','59','65'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fs45', text:'مسلسل The Wire من إنتاج أي قناة؟', options:['HBO','AMC','FX','Showtime'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'fs46', text:'مبتكر مسلسل The Sopranos؟', options:['David Chase','David Simon','Vince Gilligan','Matthew Weiner'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'fs47', text:'كم موسم من Mad Men؟', options:['6','7','8','9'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'fs48', text:'بطل The Sopranos؟', options:['James Gandolfini','Edie Falco','Michael Imperioli','Steve Buscemi'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'fs49', text:'في أي سنة بدأ The Wire؟', options:['2000','2001','2002','2003'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fs50', text:'كم حلقة في الموسم الأخير من Game of Thrones؟', options:['4','5','6','7'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fs51', text:'مبتكر The Walking Dead؟', options:['Frank Darabont','Robert Kirkman','كلاهما','David Slade'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fs52', text:'كم حلقة في Breaking Bad الموسم الأخير؟', options:['8','13','16','20'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fs53', text:'بطل True Blood؟', options:['Anna Paquin','Stephen Moyer','Alexander Skarsgård','Sam Trammell'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'fs54', text:'في أي سنة بدأ The Office الأمريكي؟', options:['2003','2004','2005','2006'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fs55', text:'كم موسم من The Big Bang Theory؟', options:['10','11','12','13'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fs56', text:'مسلسل Twin Peaks مبتكره؟', options:['David Lynch','Mark Frost','كلاهما','J.J. Abrams'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fs57', text:'كم حلقة في Friends كاملاً؟', options:['200','220','236','250'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fs58', text:'بطل مسلسل Suits الرئيسي؟', options:['Gabriel Macht','Patrick J. Adams','كلاهما','Rick Hoffman'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fs59', text:'كم موسم من How I Met Your Mother؟', options:['7','8','9','10'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fs60', text:'بطل مسلسل The X-Files؟', options:['David Duchovny','Gillian Anderson','كلاهما','Mitch Pileggi'], correctIndex:2, difficulty:'hard', points:400 }
    ]};
    data.categories.push({ id:foreignSeries.id, name:foreignSeries.name, icon:foreignSeries.icon, questions: prepQuestions(foreignSeries.qs) });
// ==================== 5 مسلسلات أنمي ==========================================================================================
var anime = { id:'anime', name:'مسلسلات أنمي', icon:'🍥', qs:[
        // سهل
        { id:'an1', text:'بطل أنمي Naruto؟', options:['ناروتو أوزوماكي','ساسكي','كاكاشي','ساكورا'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an2', text:'بطل أنمي One Piece؟', options:['لوفي','زورو','سانجي','نامي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an3', text:'أنمي Death Note عن؟', options:['دفتر الموت','صياد الأرواح','الأشباح','المصاصين'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an4', text:'بطل أنمي Dragon Ball؟', options:['غوكو','فيجيتا','بيكولو','تشي تشي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an5', text:'أنمي Attack on Titan عن؟', options:['العمالقة','المصاصين','الزومبي','الفضائيين'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an6', text:'بطل أنمي Detective Conan؟', options:['كونان','شينيتشي','كوغورو','هيجي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an7', text:'بطل أنمي Bleach؟', options:['إيتشيغو','روكيا','رينجي','أوريهيمي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an8', text:'أنمي Pokemon بطله؟', options:['آش','بيكاتشو','بروك','ميستي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an9', text:'بطل أنمي Hunter X Hunter؟', options:['غون','كيلوا','كوراپيكا','ليوريو'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an10', text:'أنمي Demon Slayer بطله؟', options:['تانجيرو','نيزوكو','زينيتسو','إينوسوكي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an11', text:'بطل أنمي Fullmetal Alchemist؟', options:['إدوارد إلريك','ألفونس إلريك','روي مصطنع','وينري'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an12', text:'أنمي My Hero Academia بطله؟', options:['ديكو','باكوغو','تودوروكي','أول مايت'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an13', text:'بطل أنمي Tokyo Ghoul؟', options:['كانيكي','توكا','أمون','ريزي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an14', text:'أنمي Sword Art Online بطله؟', options:['كيريتو','أسونا','سينون','سوغوها'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an15', text:'بطل أنمي One Punch Man؟', options:['سايتاما','جينوس','كينغ','تاتسوماكي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an16', text:'أنمي Jujutsu Kaisen بطله؟', options:['يوجي إيتادوري','ميغومي','نوبارا','غوجو'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an17', text:'بطل أنمي Black Clover؟', options:['أستا','يونو','نويل','يامي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an18', text:'أنمي Fairy Tail بطله؟', options:['ناتسو','لوسي','غراي','إرزا'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an19', text:'بطل أنمي Inuyasha؟', options:['إنوياشا','كاغومي','شيپو','ميروكو'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'an20', text:'أنمي Yu-Gi-Oh بطله؟', options:['يوغي','كايبا','جوي','تيا'], correctIndex:0, difficulty:'easy', points:100 },
        // متوسط
        { id:'an21', text:'كم حلقة من Naruto الأصلي؟', options:['200','220','240','260'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'an22', text:'كم حلقة من One Piece حتى 2024؟', options:['+800','+900','+1000','+1100'], correctIndex:3, difficulty:'medium', points:200 },
        { id:'an23', text:'مبتكر أنمي Naruto؟', options:['ماساشي كيشيموتو','إييشيرو أودا','أكيرا تورياما','تيتي كوبو'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'an24', text:'مبتكر One Piece؟', options:['إييشيرو أودا','ماساشي كيشيموتو','أكيرا تورياما','تيتي كوبو'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'an25', text:'كم موسم من Attack on Titan؟', options:['3','4','5','6'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'an26', text:'مبتكر Death Note؟', options:['تسوغومي أوبا','تاكيشي أوباتا','كلاهما','أكيرا تورياما'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'an27', text:'في أي سنة بدأ One Piece؟', options:['1997','1998','1999','2000'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'an28', text:'مبتكر Dragon Ball؟', options:['أكيرا تورياما','إييشيرو أودا','هاياو ميازاكي','ماساشي كيشيموتو'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'an29', text:'استوديو إنتاج Demon Slayer؟', options:['Ufotable','MAPPA','Wit Studio','Pierrot'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'an30', text:'مبتكر Attack on Titan؟', options:['Hajime Isayama','Eiichiro Oda','Masashi Kishimoto','Akira Toriyama'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'an31', text:'استوديو إنتاج Jujutsu Kaisen؟', options:['MAPPA','Ufotable','Wit Studio','Pierrot'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'an32', text:'كم حلقة من Fullmetal Alchemist Brotherhood؟', options:['52','64','75','85'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'an33', text:'مبتكر One Punch Man؟', options:['ONE','Yusuke Murata','كلاهما','Eiichiro Oda'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'an34', text:'كم حلقة من Bleach الأصلي؟', options:['300','350','366','400'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'an35', text:'مبتكر Hunter X Hunter؟', options:['Yoshihiro Togashi','Eiichiro Oda','Masashi Kishimoto','Akira Toriyama'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'an36', text:'استوديو Studio Ghibli مؤسسه؟', options:['Hayao Miyazaki','Isao Takahata','كلاهما','Toshio Suzuki'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'an37', text:'مبتكر My Hero Academia؟', options:['Kohei Horikoshi','Eiichiro Oda','Masashi Kishimoto','Akira Toriyama'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'an38', text:'في أي سنة بدأ Naruto؟', options:['1999','2001','2002','2003'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'an39', text:'استوديو إنتاج Naruto؟', options:['Pierrot','MAPPA','Ufotable','Toei'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'an40', text:'كم فيلم من Detective Conan؟', options:['+20','+25','+27','+30'], correctIndex:2, difficulty:'medium', points:200 },
        // صعب
        { id:'an41', text:'في أي سنة انتهى Naruto Shippuden؟', options:['2015','2016','2017','2018'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'an42', text:'كم مجلد من مانجا One Piece حتى 2024؟', options:['+95','+100','+105','+110'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'an43', text:'مخرج Spirited Away؟', options:['Hayao Miyazaki','Isao Takahata','Mamoru Hosoda','Makoto Shinkai'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'an44', text:'في أي سنة بدأ Dragon Ball الأصلي؟', options:['1984','1986','1988','1990'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'an45', text:'كم فصل من مانجا Naruto؟', options:['650','700','720','750'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'an46', text:'مبتكر Tokyo Ghoul؟', options:['Sui Ishida','Kohei Horikoshi','Eiichiro Oda','Hajime Isayama'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'an47', text:'في أي سنة بدأ Attack on Titan الأنمي؟', options:['2011','2012','2013','2014'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'an48', text:'استوديو Wit Studio أنتج؟', options:['Attack on Titan','Vinland Saga','كلاهما','Demon Slayer'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'an49', text:'كم حلقة من Inuyasha؟', options:['167','193','215','230'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'an50', text:'مبتكر Bleach؟', options:['Tite Kubo','Eiichiro Oda','Masashi Kishimoto','Akira Toriyama'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'an51', text:'في أي سنة بدأت سلسلة Pokemon؟', options:['1995','1996','1997','1998'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'an52', text:'استوديو Mappa أنتج؟', options:['Jujutsu Kaisen','Chainsaw Man','كلاهما','Demon Slayer'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'an53', text:'مبتكر Fullmetal Alchemist؟', options:['Hiromu Arakawa','Eiichiro Oda','Masashi Kishimoto','Akira Toriyama'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'an54', text:'في أي سنة بدأ Detective Conan؟', options:['1994','1996','1998','2000'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'an55', text:'مبتكر Demon Slayer؟', options:['Koyoharu Gotouge','Hajime Isayama','Eiichiro Oda','Sui Ishida'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'an56', text:'كم حلقة من Death Note؟', options:['37','40','42','45'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'an57', text:'في أي سنة بدأ My Hero Academia الأنمي؟', options:['2014','2015','2016','2017'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'an58', text:'مبتكر Chainsaw Man؟', options:['Tatsuki Fujimoto','Koyoharu Gotouge','Hajime Isayama','Eiichiro Oda'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'an59', text:'كم حلقة من Code Geass الأصلي؟', options:['25','50','75','100'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'an60', text:'مبتكر Code Geass؟', options:['Goro Taniguchi','Ichiro Okouchi','كلاهما','Sunrise'], correctIndex:2, difficulty:'hard', points:400 }
]};
data.categories.push({ id:anime.id, name:anime.name, icon:anime.icon, questions: prepQuestions(anime.qs) });
// ==================== 6 باب الحارة ==============================================================================================
var babAlHara = { id:'babAlHara', name:'باب الحارة', icon:'🧿', qs:[
// سهل
{ id:'bh1', text:'في أي مدينة تدور أحداث باب الحارة؟', options:['دمشق','حلب','بيروت','عمّان'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh2', text:'ما اسم الحارة في المسلسل؟', options:['حارة الضبع','حارة القلعة','حارة السوق','حارة النهر'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh3', text:'في أي فترة زمنية تدور الأحداث؟', options:['فترة الانتداب الفرنسي','العصر العباسي','العصر الأموي','العصر المملوكي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh4', text:'من هو حكيم الحارة (الطبيب)؟', options:['أبو عصام','أبو حاتم','أبو جودت','أبو بدر'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh5', text:'من صاحب مقهى الحارة؟', options:['أبو حاتم','أبو بدر','أبو بشير','أبو غالب'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh6', text:'من يجسّد شخصية أبو عصام؟', options:['عباس النوري','بسام كوسا','أيمن زيدان','سلوم حداد'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh7', text:'من تجسّد شخصية أم عصام؟', options:['صباح الجزائري','منى واصف','سلاف فواخرجي','كاريس بشار'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh8', text:'من هو العكيد في الأجزاء الأولى؟', options:['أبو شهاب','معتز','عصام','أبو بدر'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh9', text:'من يجسّد شخصية العكيد أبو شهاب؟', options:['سامر المصري','وائل شرف','ميلاد يوسف','قصي خولي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh10', text:'من أصبح عكيد الحارة لاحقًا؟', options:['معتز','عصام','أبو غالب','أبو بشير'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh11', text:'من يجسّد شخصية معتز في الأجزاء الأولى؟', options:['وائل شرف','قصي خولي','باسم ياخور','محمود نصر'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh12', text:'من يجسّد شخصية عصام؟', options:['ميلاد يوسف','معتصم النهار','فارس الحلو','مهيار خضور'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh13', text:'من يجسّد شخصية النمس؟', options:['مصطفى الخاني','محمد حداقي','أيمن رضا','قاسم ملحو'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh14', text:'من يجسّد شخصية أبو بدر؟', options:['محمد خير الجراح','أيمن رضا','زهير عبد الكريم','حسام تحسين بك'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh15', text:'من تجسّد شخصية فوزية زوجة أبو بدر؟', options:['شكران مرتجى','سلافة معمار','نادين تحسين بيك','أمل عرفة'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh16', text:'من تجسّد شخصية فريال؟', options:['وفاء موصللي','منى واصف','ليليا الأطرش','صفاء سلطان'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh17', text:'من يجسّد شخصية أبو جودت ضابط المخفر؟', options:['زهير رمضان','تاج حيدر','علي كريم','توفيق العشا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh18', text:'من تجسّد شخصية أم زكي (الداية)؟', options:['هدى شعراوي','أمانة والي','إمارات رزق','سلمى المصري'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh19', text:'ما مهنة أبو بشير؟', options:['فرّان','حلاق','عطّار','نجّار'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'bh20', text:'على أي قناة عُرض المسلسل أولًا؟', options:['MBC','روتانا','سوريا دراما','أبو ظبي'], correctIndex:0, difficulty:'easy', points:100 },
// متوسط
{ id:'bh21', text:'في أي سنة عُرض الجزء الأول من باب الحارة؟', options:['2006','2004','2008','2010'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh22', text:'من هو مخرج الأجزاء الأولى؟', options:['بسام الملا','شوقي الماجري','ناجي طعمي','حاتم علي'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh23', text:'من كتب الأجزاء الأولى؟', options:['مروان قاووق','سامر رضوان','فؤاد حميرة','خالد خليفة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh24', text:'اسم المقهى في الحارة؟', options:['قهوة أبو حاتم','قهوة النمس','قهوة السوق','قهوة الحريم'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh25', text:'من يجسّد شخصية أبو حاتم؟', options:['وفيق الزعيم','رضوان عقيلي','خالد تاجا','جار القمر'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh26', text:'من زوجة عصام الأولى؟', options:['لطفية','خيرية','سارة','هدى'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh27', text:'من تجسّد شخصية لطفية؟', options:['ليليا الأطرش','كاريس بشار','صفاء سلطان','ديما قندلفت'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh28', text:'من زوجة معتز في الأجزاء الأولى؟', options:['خيرية','سارة','دلال','جميلة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh29', text:'أي من التالي ليس مكانًا في باب الحارة؟', options:['الإيري','حارة الضبع','خان الحارة','بيت أبو عصام'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh30', text:'من أدى شخصية مأمون بيك (الشرير)؟', options:['فايز قزق','قاسم ملحو','عبد الهادي الصباغ','تيّم حسن'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh31', text:'من أدى شخصية أبو غالب؟', options:['نزار أبو حجر','ياسر العظمة','أحمد رافع','حسام تحسين بك'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh32', text:'ما مهنة أبو غالب؟', options:['بائع عرقسوس','حدّاد','صبّاغ','سمكري'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh33', text:'ما معنى لقب "العكيد" في سياق المسلسل؟', options:['زعيم رجال الحارة وحاميها','إمام الجامع','كاتب العرائض','شيخ الكار'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh34', text:'غالبًا ما يُعرض المسلسل في موسم؟', options:['رمضان','عيد الفطر','الشتاء','موسم الصيف'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh35', text:'ما اللهجة الغالبة على حوارات المسلسل؟', options:['الشامية','الحلبية','الحجازية','المصرية'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh36', text:'ما اسم ابنة أبو عصام؟', options:['دلال','لطفية','خيرية','نور'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh37', text:'من شارك لاحقًا في الإخراج إلى جانب بسام الملا؟', options:['مؤمن الملا','الليث حجو','رشا شربتجي','حاتم علي'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh38', text:'أي شركة تولت إنتاج أجزاء متأخرة من العمل؟', options:['قبنض للإنتاج الفني','ميسلون','سامه للإنتاج','آرت برودكشن'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh39', text:'القوة الأجنبية المحتلة في زمن أحداث المسلسل؟', options:['الفرنسيون','العثمانيون','الإيطاليون','الإنجليز'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'bh40', text:'أي من التالي شخصية كوميدية بامتياز؟', options:['أبو بدر','مأمون بيك','أبو جودت','النمس'], correctIndex:0, difficulty:'medium', points:200 },
// صعب
{ id:'bh41', text:'في أي جزء عاد أبو عصام بعد غيابه؟', options:['الجزء الخامس','الجزء الثالث','الجزء السابع','الجزء التاسع'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh42', text:'ظهر النمس لأول مرة في أي جزء تقريبًا؟', options:['الجزء الرابع','الجزء الأول','الجزء السادس','الجزء الثامن'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh43', text:'ابتداءً من أي جزء تغيّر ممثل شخصية معتز؟', options:['الجزء الثامن','الجزء الخامس','الجزء السابع','الجزء العاشر'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh44', text:'من يجسّد شخصية أبو بشير الفرّان؟', options:['حسن دكاك','حسام تحسين بك','رشيد عساف','زهير عبد الكريم'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh45', text:'من اشتهر بعبارة "يا عيب الشوم"؟', options:['أبو جودت','أبو بدر','أبو شهاب','فريال'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh46', text:'من الذي يلعب دور أم زكي (الداية)؟', options:['هدى شعراوي','سلمى المصري','أمانة والي','إمارات رزق'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh47', text:'من الممثلة التي تجسّد فوزية زوجة أبو بدر؟', options:['شكران مرتجى','صفاء سلطان','ديما قندلفت','سلافة معمار'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh48', text:'شخصية "مأمون بيك" تمثل غالبًا دور؟', options:['العميل والخائن للحارة','الشيخ الصالح','الحكواتي','الحدّاد'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh49', text:'أي من هذه القيم يبرزها المسلسل كثيرًا؟', options:['النخوة والفزعة','الأنانية','الجبن','الفوضى'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh50', text:'أي من التالي ليس شخصية من باب الحارة؟', options:['جون سنو','أبو شهاب','أبو بدر','النمس'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh51', text:'أي مهنة ظهرت بوضوح في الحارة؟', options:['العطّار','الطيار','مهندس برمجيات','قبطان سفينة'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh52', text:'أين تدور أحداث المسلسل داخل دمشق؟', options:['في الحارات العتيقة من دمشق القديمة','في المدينة الجامعية','في ضواحي حديثة','على الساحل'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh53', text:'العلاقة بين فريال ولطفية؟', options:['أم وابنة','جارتان فقط','خالتها','ابنة عمّها'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh54', text:'من الممثل الذي رحل عام 2014 وكان يجسّد شخصية محورية في المقهى؟', options:['وفيق الزعيم','حسن دكاك','خالد تاجا','رياض شحرور'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh55', text:'الشخصية التي كثيرًا ما تُخاصم زوجها أبو بدر؟', options:['فوزية','فريال','أم عصام','سارة'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh56', text:'ما السلاح الأبيض الشعبي الذي يظهر بكثرة مع رجال الحارة؟', options:['الخنجر الشامي','السيف الطويل','العصا اليابانية','الرمح'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh57', text:'أي مما يلي ليس من بيئة أو مفردات باب الحارة؟', options:['وينترفيل','الزقاق','المضافة','المخفر'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh58', text:'أي من هذه الشخصيات تعمل في المقهى؟', options:['أبو حاتم','أبو بشير','أبو غالب','أبو عصام'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh59', text:'من المعروف أنه كثير الدهاء ويحاول إشعال الفتن؟', options:['النمس','أبو بشير','أبو بدر','المختار'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'bh60', text:'كم جزءًا تقريبًا صدر من باب الحارة حتى عام 2023؟', options:['13','9','7','5'], correctIndex:0, difficulty:'hard', points:400 }
]};
data.categories.push({ id:babAlHara.id, name:babAlHara.name, icon:babAlHara.icon, questions: prepQuestions(babAlHara.qs) });
// ==================== 7 جيم أوف ثرونز ==============================================================================================
var got = { id:'got', name:'جيم أوف ثرونز', icon:'🐲', qs:[
// سهل
{ id:'got1', text:'كم عدد مواسم مسلسل جيم أوف ثرونز؟', options:['8','7','6','9'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got2', text:'ما الشبكة التي أنتجت المسلسل؟', options:['إتش بي أو','نتفليكس','أمازون برايم فيديو','إيه إم سي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got3', text:'ما عاصمة الممالك السبع؟', options:['كينغز لاندينغ','وينترفيل','برافوس','دورن'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got4', text:'ما اسم قلعة آل ستارك؟', options:['وينترفيل','التوأمان','الإيري (العشّ)','هارنهال'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got5', text:'ما اسم القارة التي تقع فيها الممالك السبع؟', options:['ويستروس','إيسوس','سوثوريوس','فاليريا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got6', text:'ما لقب دينيرس تارجاريان؟', options:['أم التنانين','ملكة الأشواك','السيدة الحمراء','روح الشمال'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got7', text:'أيٌّ من التالي اسم أحد تنانين دينيرس؟', options:['درُوغون','سموغ','راثيون','سبايرو'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got8', text:'ما اسم الجدار الجليدي الضخم في الشمال؟', options:['الجدار','الجرف','المرصد','الحد العظيم'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got9', text:'من يحرس الجدار ويرتدي السواد؟', options:['حرس الليل','الحرس الذهبي','اللاملوّثون','أبناء الهاربي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got10', text:'ما لقب غريغور كليغان؟', options:['الجبل','الكلب','الذئب','النمر'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got11', text:'ما لقب ساندور كليغان؟', options:['الكلب','الغراب','الثعلب','الصقر'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got12', text:'ما اسم ذئب جون سنو الرهيب؟', options:['غوست','سمر','نايميريا','غراي ويند'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got13', text:'شعار آل ستارك هو؟', options:['ذئب رهيب','أسد ذهبي','غزال متوّج','كراكن'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got14', text:'شعار آل لانيستر هو؟', options:['أسد ذهبي','ذئب رهيب','أخطبوط','سيفان متقاطعان'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got15', text:'كلمات آل ستارك الشهيرة؟', options:['الشتاء قادم','اسمعوا زئيري','النار والدم','نحن لا نزرع'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got16', text:'من زوج دينيرس من الدوثراكي؟', options:['خالد دروغو','جوراه مورمونت','داريو ناهاريس','إيورون غريجوي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got17', text:'من هو الأخ التوأم لسيرسي لانيستر؟', options:['جيمي لانيستر','تايوين لانيستر','تيريون لانيستر','لوراس تايريل'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got18', text:'إلى أي بيت ينتمي تيريون؟', options:['لانيستر','ستارك','تارغيريان','غريجوي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got19', text:'ما اسم القلعة الجزيرة مقرّ آل تارجاريان؟', options:['دراجونستون','هايغاردن','بوابة القمر','هارنهال'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got20', text:'ما اسم القارة شرق البحر الضيق؟', options:['إيسوس','سوثوريوس','فاليريا','أثمان'], correctIndex:0, difficulty:'easy', points:100 },
// متوسط
{ id:'got21', text:'ما اسم سيف جون سنو المصنوع من الفولاذ الفاليري؟', options:['لونغكلو','آيس','عويل الأرملة','حافظة القسم'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got22', text:'من درّب آريا ستارك على المبارزة في كينغز لاندينغ؟', options:['سيريو فوريل','جاكن هغار','برين أوف تارث','نيد ستارك'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got23', text:'إلى أي إله تتبع جماعة الوجوه بلا ملامح؟', options:['الإله عديد الوجوه','إله الغرق','ربّ النور','الآلهة السبعة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got24', text:'في أي مدينة يوجد بيت الأسود والأبيض؟', options:['برافوس','ميرين','فولنتس','كارت'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got25', text:'من ابن سيرسي الأكبر؟', options:['جوفري','تومِن','لوراس','بران'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got26', text:'من كانت العقل المدبر لقتل الملك جوفري؟', options:['أولينا تايريل','بيتر بايليش','سيرسي لانيستر','مارجيري تايريل'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got27', text:'من قتل تايوين لانيستر؟', options:['تيريون لانيستر','جيمي لانيستر','برون','آريا ستارك'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got28', text:'من أُعلن ملك الشمال في نهاية الموسم السادس؟', options:['جون سنو','روبين آرين','ستانيس باراثيون','رامزي بولتون'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got29', text:'من قتلت رامزي بولتون؟', options:['سانسا ستارك','جون سنو','ثيون غريجوي','بران ستارك'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got30', text:'ما اسم شقيق دينيرس الذي طمع في العرش؟', options:['فيسيريس تارجاريان','ريغار تارجاريان','أيمون تارجاريان','إيغون تارجاريان'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got31', text:'ما اسم المادة الخضراء التي استُخدمت في معركة بلاك ووتر؟', options:['النار البرية','الدراجون غلاس','الزيت الحار','بارود القلعة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got32', text:'ما اسم معقل آل فراي عند النهر؟', options:['التوأمان','هارنهال','ريفررن','هايغاردن'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got33', text:'ما اسم أخت ثيون غريجوي في المسلسل؟', options:['يارا','آشا','ليانا','إيلاريا'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got34', text:'إلى أي إله تؤمن ميليساندرا؟', options:['ربّ النور (رهلور)','الإله عديد الوجوه','إله الغرق','الآلهة السبعة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got35', text:'ما كلمات بيت تارجاريان؟', options:['النار والدم','نحن لا نزرع','اسمعوا زئيري','الشتاء قادم'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got36', text:'من قتل ملك الليل؟', options:['آريا ستارك','جون سنو','بران ستارك','دينيرس تارجاريان'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got37', text:'من هو "ليتل فينغر"؟', options:['بيتر بايليش','فاريس','قايبرن','تورموند'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got38', text:'من مستشار الأسرار الملقّب بـ"العنكبوت"؟', options:['فاريس','بيتر بايليش','قايبرن','بادريك'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got39', text:'ما اسم جيش الخصيان الذي يخدم دينيرس؟', options:['اللاملوّثون (Unsullied)','الدوثراكي','أبناء الهاربي','الحرس الذهبي'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got40', text:'ما اسم القلعة المرتفعة في الوادي (فالي)؟', options:['الإيري (العشّ)','بوابة القمر','هايغاردن','ريفررن'], correctIndex:0, difficulty:'medium', points:200 },
// صعب
{ id:'got41', text:'كم عدد حلقات المسلسل؟', options:['73','70','75','80'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got42', text:'من هما والدا جون سنو الحقيقيان؟', options:['ريغار تارجاريان وليانا ستارك','روبرت باراثيون وليانا ستارك','نيد ستارك وكاتلين تولي','إيغون تارجاريان وداينا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got43', text:'ما اسم السيف الضخم لآل ستارك المصنوع من الفولاذ الفاليري؟', options:['آيس','لونغكلو','عويل الأرملة','حافظة القسم'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got44', text:'إلى أي سيفين أُعيدت صياغة "آيس"؟', options:['حافظة القسم وعويل الأرملة','لونغكلو وحافظة القسم','آيس ولونغكلو','السهم الأسود وحافظة القسم'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got45', text:'جون سنو هو اللورد القائد رقم كم لحرس الليل؟', options:['998','997','999','1000'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got46', text:'ما اسم سيف آريا ستارك الصغير؟', options:['إبرة','شوكة','السهم','الشعاع'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got47', text:'أين وُلدت دينيرس (ستورم بورن)؟', options:['دراجونستون','بنتوس','ميرين','فاليريا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got48', text:'من وجّه الطعنة القاتلة لروب ستارك؟', options:['روز بولتون','والدر فراي','رامزي بولتون','تايوين لانيستر'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got49', text:'من قتلت والدر فراي انتقامًا للزفاف الأحمر؟', options:['آريا ستارك','سانسا ستارك','برين أوف تارث','كاتلين ستارك'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got50', text:'من كان قائد حرس المدينة (العباءات الذهبية) الذي خان نِد ستارك؟', options:['جانوس سلينت','مِرين ترانت','إيلين باين','مانس رايدر'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got51', text:'رمز بيت غريجوي هو؟', options:['الكراكن','الغزال المتوَّج','الأسد الذهبي','السمكة الفضية'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got52', text:'ما عاصمة إقليم دورن؟', options:['سنسبير','هايغاردن','ريفررن','أولدتاون'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got53', text:'ما اسم سيف جوفري المصنوع من الفولاذ الفاليري؟', options:['عويل الأرملة','حافظة القسم','لونغكلو','آيس'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got54', text:'ما اسم السيف الذي أعطاه جيمي لانيستر لبرين؟', options:['حافظة القسم','عويل الأرملة','لونغكلو','آيس'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got55', text:'ما اللقب الذي يحمله بران ستارك في المواسم الأخيرة؟', options:['الغراب ذو الثلاث عيون','ملك الشمال','الذئب الرمادي','الممسوس'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got56', text:'من العالم الذي أعاد غريغور كليغان (الجبل) للحياة؟', options:['قايبرن','بايسل','فاريس','تايوين'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got57', text:'من التي أدارت طقوس حرق شيرين باراثيون؟', options:['ميليساندرا','سيرسي لانيستر','كاتلين ستارك','ديانيرا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got58', text:'أي مدينة في خليج العبيد حكمتها دينيرس لفترة؟', options:['ميرين','يُنْكاي','أستابور','فولانتس'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got59', text:'كم تنينًا بقي مع دينيرس مع نهاية السلسلة؟', options:['واحد','اثنان','ثلاثة','لا شيء'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got60', text:'من قتل الملك المجنون إيريس الثاني؟', options:['جيمي لانيستر','نيد ستارك','روبرت باراثيون','تايوين لانيستر'], correctIndex:0, difficulty:'hard', points:400 }
]};
data.categories.push({ id:got.id, name:got.name, icon:got.icon, questions: prepQuestions(got.qs) });
// ==================== 8 أفلام عربية ==============================================================================================
var arabMovies = { id:'arab_movies', name:'أفلام عربية', icon:'🎞️', qs:[
        // سهل
        { id:'am1', text:'بطل فيلم الإرهاب والكباب؟', options:['عادل إمام','نور الشريف','محمود عبد العزيز','أحمد زكي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am2', text:'بطل فيلم اللمبي؟', options:['محمد سعد','أحمد حلمي','محمد هنيدي','هاني رمزي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am3', text:'بطل فيلم رمضان مبروك أبو العلمين حمودة؟', options:['محمد هنيدي','محمد سعد','أحمد حلمي','هاني رمزي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am4', text:'بطل فيلم الناظر؟', options:['علاء ولي الدين','محمد سعد','محمد هنيدي','أحمد حلمي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am5', text:'بطل فيلم زكي شان؟', options:['أحمد حلمي','محمد سعد','محمد هنيدي','كريم عبد العزيز'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am6', text:'بطلة فيلم سهر الليالي؟', options:['منى زكي','حنان ترك','هند صبري','يسرا'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am7', text:'بطل فيلم الجزيرة؟', options:['أحمد السقا','أحمد عز','كريم عبد العزيز','عمرو واكد'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am8', text:'بطل فيلم أسد سيناء؟', options:['أحمد عز','محمد رمضان','أحمد السقا','كريم عبد العزيز'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am9', text:'بطل فيلم تيتو؟', options:['أحمد السقا','هاني سلامة','أحمد عز','كريم عبد العزيز'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am10', text:'بطل فيلم ابن الحاج أحمد؟', options:['محمد رمضان','أحمد السقا','عمرو يوسف','محمد سعد'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am11', text:'بطل فيلم الباشا تلميذ؟', options:['كريم عبد العزيز','أحمد عز','أحمد السقا','محمد رمضان'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am12', text:'بطل فيلم بوحة؟', options:['محمد سعد','محمد هنيدي','أحمد حلمي','هاني رمزي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am13', text:'بطل فيلم صعيدي في الجامعة الأمريكية؟', options:['محمد هنيدي','محمد سعد','أحمد حلمي','هاني رمزي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am14', text:'بطل فيلم ميدو مشاكل؟', options:['أحمد حلمي','محمد سعد','محمد هنيدي','هاني رمزي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am15', text:'بطل فيلم عسل أسود؟', options:['أحمد حلمي','محمد سعد','محمد هنيدي','كريم عبد العزيز'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am16', text:'بطل فيلم 1000 مبروك؟', options:['أحمد حلمي','أحمد عز','أحمد السقا','محمد رمضان'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am17', text:'بطل فيلم الكنز؟', options:['محمد رمضان','محمد سعد','هاني سلامة','عمرو يوسف'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am18', text:'بطل فيلم الحريف؟', options:['عادل إمام','أحمد زكي','نور الشريف','محمود عبد العزيز'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'am19', text:'بطل فيلم الكيت كات؟', options:['محمود عبد العزيز','نور الشريف','عادل إمام','أحمد زكي'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'am20', text:'بطل فيلم البريء؟', options:['أحمد زكي','محمود عبد العزيز','نور الشريف','عادل إمام'], correctIndex:0, difficulty:'easy', points:100 },
        // متوسط
        { id:'am21', text:'في أي سنة عرض فيلم اللمبي؟', options:['2000','2001','2002','2003'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'am22', text:'مخرج فيلم الإرهاب والكباب؟', options:['شريف عرفة','يوسف شاهين','محمد خان','عاطف الطيب'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'am23', text:'بطل فيلم الكيف؟', options:['محمود عبد العزيز','يحيى الفخراني','نور الشريف','أحمد زكي'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'am24', text:'في أي سنة عرض فيلم الباشا تلميذ؟', options:['2002','2003','2004','2005'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'am25', text:'مخرج فيلم تيتو؟', options:['طارق العريان','شريف عرفة','محمد خان','عاطف الطيب'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'am26', text:'بطلة فيلم بحب السيما؟', options:['ليلى علوي','منى زكي','هند صبري','يسرا'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'am27', text:'مخرج فيلم الأرض؟', options:['يوسف شاهين','شادي عبد السلام','صلاح أبو سيف','نيازي مصطفى'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'am28', text:'بطل فيلم بحب السيما؟', options:['محمود حميدة','نور الشريف','أحمد السقا','عمرو واكد'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'am29', text:'مخرج فيلم عمارة يعقوبيان؟', options:['مروان حامد','شريف عرفة','يوسف شاهين','محمد خان'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'am30', text:'بطل فيلم الفرح؟', options:['خالد صالح','محمد رمضان','عمرو واكد','محمود عبد العزيز'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'am31', text:'في أي سنة عرض فيلم رصاصة في القلب؟', options:['1944','1945','1946','1947'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'am32', text:'بطل فيلم سواق الأتوبيس؟', options:['نور الشريف','محمود عبد العزيز','عادل إمام','أحمد زكي'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'am33', text:'مخرج فيلم الكيت كات؟', options:['داود عبد السيد','عاطف الطيب','محمد خان','يوسف شاهين'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'am34', text:'بطل فيلم زي النهاردة؟', options:['كريم عبد العزيز','أحمد عز','أحمد السقا','محمد رمضان'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'am35', text:'في أي سنة عرض فيلم الجزيرة؟', options:['2005','2006','2007','2008'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'am36', text:'بطل فيلم زواج بقرار جمهوري؟', options:['عمرو يوسف','أحمد السقا','أحمد عز','كريم عبد العزيز'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'am37', text:'مخرج فيلم الجزيرة؟', options:['شريف عرفة','عمرو سلامة','مروان حامد','محمد خان'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'am38', text:'بطل فيلم بئر الخيانة؟', options:['أحمد زكي','محمود عبد العزيز','نور الشريف','عادل إمام'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'am39', text:'في أي سنة عرض فيلم اللص والكلاب؟', options:['1962','1963','1964','1965'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'am40', text:'بطل فيلم رد قلبي؟', options:['شكري سرحان','عمر الشريف','أحمد مظهر','يحيى شاهين'], correctIndex:0, difficulty:'medium', points:200 },
        // صعب
        { id:'am41', text:'مخرج فيلم المومياء (يوم أن تحصى السنين)؟', options:['شادي عبد السلام','يوسف شاهين','صلاح أبو سيف','توفيق صالح'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'am42', text:'في أي سنة عرض فيلم باب الحديد؟', options:['1956','1958','1960','1962'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'am43', text:'مخرج فيلم باب الحديد؟', options:['يوسف شاهين','صلاح أبو سيف','حسن الإمام','نيازي مصطفى'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'am44', text:'بطل فيلم الزوجة الثانية؟', options:['شكري سرحان','عمر الشريف','أحمد مظهر','صلاح ذو الفقار'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'am45', text:'في أي سنة فاز يوسف شاهين بالسعفة الذهبية؟', options:['1995','1997','1999','2001'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'am46', text:'بطل فيلم الأبيض والأسود؟', options:['نور الشريف','محمود عبد العزيز','أحمد زكي','عادل إمام'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'am47', text:'مخرج فيلم عمارة يعقوبيان كم استغرق؟', options:['سنة','سنتين','3 سنوات','4 سنوات'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'am48', text:'في أي سنة عرض فيلم الأرض؟', options:['1968','1969','1970','1971'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'am49', text:'بطل فيلم العصفور؟', options:['محسنة توفيق','صلاح قابيل','محمود المليجي','نجلاء فتحي'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'am50', text:'مخرج فيلم العصفور؟', options:['يوسف شاهين','صلاح أبو سيف','عاطف الطيب','محمد خان'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'am51', text:'في أي سنة عرض فيلم اللص والكلاب؟', options:['1960','1962','1964','1966'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'am52', text:'بطل فيلم النوم في العسل؟', options:['عادل إمام','محمود عبد العزيز','أحمد زكي','نور الشريف'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'am53', text:'مخرج فيلم الكرنك؟', options:['علي بدرخان','حسين كمال','يوسف شاهين','محمد خان'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'am54', text:'في أي سنة عرض فيلم البريء؟', options:['1984','1986','1988','1990'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'am55', text:'مخرج فيلم البريء؟', options:['عاطف الطيب','محمد خان','داود عبد السيد','خيري بشارة'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'am56', text:'بطل فيلم الحرام؟', options:['فاتن حمامة','عبد الله غيث','زبيدة ثروت','صلاح ذو الفقار'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'am57', text:'مخرج فيلم الحرام؟', options:['هنري بركات','صلاح أبو سيف','يوسف شاهين','حسن الإمام'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'am58', text:'في أي سنة عرض فيلم سواق الأتوبيس؟', options:['1982','1983','1984','1985'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'am59', text:'مخرج فيلم سواق الأتوبيس؟', options:['عاطف الطيب','محمد خان','داود عبد السيد','خيري بشارة'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'am60', text:'بطل فيلم زوجتي والكلب؟', options:['نور الشريف','محمود مرسي','شكري سرحان','صلاح قابيل'], correctIndex:1, difficulty:'hard', points:400 }
]};
 data.categories.push({ id:arabMovies.id, name:arabMovies.name, icon:arabMovies.icon, questions: prepQuestions(arabMovies.qs) });
// ==================== 9 أفلام أجنبية =============================================================================================
 var foreignMovies = { id:'foreign_movies', name:'أفلام أجنبية', icon:'🎥', qs:[
        // سهل
        { id:'fm1', text:'بطل فيلم Titanic؟', options:['Leonardo DiCaprio','Brad Pitt','Tom Cruise','Johnny Depp'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fm2', text:'بطلة فيلم Titanic؟', options:['Kate Winslet','Nicole Kidman','Julia Roberts','Sandra Bullock'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fm3', text:'بطل فيلم Avatar؟', options:['Sam Worthington','Chris Evans','Chris Hemsworth','Channing Tatum'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fm4', text:'بطل فيلم The Dark Knight؟', options:['Christian Bale','Ben Affleck','Robert Pattinson','Michael Keaton'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fm5', text:'من لعب دور Joker في The Dark Knight؟', options:['Heath Ledger','Joaquin Phoenix','Jared Leto','Jack Nicholson'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fm6', text:'بطل فيلم Forrest Gump؟', options:['Tom Hanks','Tom Cruise','Brad Pitt','Will Smith'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fm7', text:'بطل سلسلة Mission Impossible؟', options:['Tom Cruise','Tom Hanks','Brad Pitt','Will Smith'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fm8', text:'بطل فيلم The Matrix؟', options:['Keanu Reeves','Tom Hanks','Brad Pitt','Will Smith'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fm9', text:'بطل فيلم Gladiator؟', options:['Russell Crowe','Brad Pitt','Tom Cruise','Mel Gibson'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fm10', text:'بطل فيلم The Wolf of Wall Street؟', options:['Leonardo DiCaprio','Brad Pitt','Matt Damon','Tom Cruise'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fm11', text:'بطل سلسلة Pirates of the Caribbean؟', options:['Johnny Depp','Orlando Bloom','Brad Pitt','Tom Cruise'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fm12', text:'بطل فيلم Inception؟', options:['Leonardo DiCaprio','Brad Pitt','Tom Cruise','Matt Damon'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fm13', text:'بطل فيلم Forrest Gump؟', options:['Tom Hanks','Tom Cruise','Brad Pitt','Will Smith'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fm14', text:'بطل سلسلة James Bond الأخيرة؟', options:['Daniel Craig','Pierce Brosnan','Sean Connery','Roger Moore'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fm15', text:'بطل فيلم Joker (2019)؟', options:['Joaquin Phoenix','Heath Ledger','Jared Leto','Jack Nicholson'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'fm16', text:'بطل فيلم Avengers: Endgame كأبطال؟', options:['Robert Downey Jr','Chris Evans','Chris Hemsworth','جميع ما سبق'], correctIndex:3, difficulty:'easy', points:100 },
        { id:'fm17', text:'بطل سلسلة Fast and Furious؟', options:['Vin Diesel','Paul Walker','كلاهما','Dwayne Johnson'], correctIndex:2, difficulty:'easy', points:100 },
        { id:'fm18', text:'بطل سلسلة The Hangover؟', options:['Bradley Cooper','Zach Galifianakis','Ed Helms','جميع ما سبق'], correctIndex:3, difficulty:'easy', points:100 },
        { id:'fm19', text:'بطل فيلم Saving Private Ryan؟', options:['Tom Hanks','Matt Damon','كلاهما','Brad Pitt'], correctIndex:2, difficulty:'easy', points:100 },
        { id:'fm20', text:'بطلة فيلم The Hunger Games؟', options:['Jennifer Lawrence','Kristen Stewart','Emma Stone','Anne Hathaway'], correctIndex:0, difficulty:'easy', points:100 },
        // متوسط
        { id:'fm21', text:'مخرج فيلم Titanic؟', options:['James Cameron','Steven Spielberg','Christopher Nolan','Martin Scorsese'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fm22', text:'في أي سنة عرض فيلم Titanic؟', options:['1995','1996','1997','1998'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'fm23', text:'مخرج سلسلة The Dark Knight؟', options:['Christopher Nolan','Tim Burton','Zack Snyder','Joel Schumacher'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fm24', text:'مخرج فيلم Inception؟', options:['Christopher Nolan','Steven Spielberg','James Cameron','Martin Scorsese'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fm25', text:'مخرج فيلم Pulp Fiction؟', options:['Quentin Tarantino','Martin Scorsese','Steven Spielberg','David Fincher'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fm26', text:'مخرج فيلم The Godfather؟', options:['Francis Ford Coppola','Martin Scorsese','Steven Spielberg','Stanley Kubrick'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fm27', text:'بطل فيلم The Godfather؟', options:['Marlon Brando','Al Pacino','كلاهما','Robert De Niro'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'fm28', text:'مخرج فيلم Schindler\'s List؟', options:['Steven Spielberg','Martin Scorsese','Roman Polanski','Stanley Kubrick'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fm29', text:'مخرج فيلم Avatar؟', options:['James Cameron','Steven Spielberg','Christopher Nolan','Peter Jackson'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fm30', text:'في أي سنة عرض فيلم Avatar؟', options:['2007','2008','2009','2010'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'fm31', text:'مخرج فيلم Forrest Gump؟', options:['Robert Zemeckis','Steven Spielberg','Ron Howard','Frank Darabont'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fm32', text:'مخرج سلسلة Lord of the Rings؟', options:['Peter Jackson','Steven Spielberg','James Cameron','George Lucas'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fm33', text:'بطل سلسلة Lord of the Rings (Frodo)؟', options:['Elijah Wood','Sean Astin','Ian McKellen','Viggo Mortensen'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fm34', text:'بطل سلسلة Harry Potter؟', options:['Daniel Radcliffe','Rupert Grint','Emma Watson','جميع ما سبق'], correctIndex:3, difficulty:'medium', points:200 },
        { id:'fm35', text:'كم عدد أفلام Harry Potter؟', options:['7','8','9','10'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'fm36', text:'مخرج فيلم Saving Private Ryan؟', options:['Steven Spielberg','James Cameron','Ridley Scott','Christopher Nolan'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fm37', text:'مخرج فيلم Gladiator؟', options:['Ridley Scott','Steven Spielberg','James Cameron','Christopher Nolan'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fm38', text:'بطل فيلم The Revenant؟', options:['Leonardo DiCaprio','Brad Pitt','Tom Hardy','Matt Damon'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fm39', text:'مخرج فيلم The Revenant؟', options:['Alejandro González Iñárritu','Christopher Nolan','Quentin Tarantino','Martin Scorsese'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'fm40', text:'مخرج فيلم Joker (2019)؟', options:['Todd Phillips','Christopher Nolan','James Mangold','David Fincher'], correctIndex:0, difficulty:'medium', points:200 },
        // صعب
        { id:'fm41', text:'كم جائزة Oscar حصل عليها فيلم Titanic؟', options:['9','10','11','12'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fm42', text:'في أي سنة عرض فيلم The Godfather؟', options:['1970','1971','1972','1973'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fm43', text:'كم جائزة Oscar حصل عليها فيلم The Lord of the Rings: Return of the King؟', options:['9','10','11','12'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fm44', text:'في أي سنة فاز Leonardo DiCaprio بأوسكاره الأول؟', options:['2014','2015','2016','2017'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fm45', text:'في أي سنة عرض فيلم Pulp Fiction؟', options:['1992','1993','1994','1995'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fm46', text:'مخرج فيلم Schindler\'s List حصل على؟', options:['أوسكار أفضل مخرج','أوسكار أفضل فيلم','كلاهما','شيء آخر'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fm47', text:'في أي سنة عرض فيلم Citizen Kane؟', options:['1939','1941','1943','1945'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'fm48', text:'مخرج فيلم Citizen Kane؟', options:['Orson Welles','Alfred Hitchcock','John Ford','Frank Capra'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'fm49', text:'في أي سنة عرض فيلم Casablanca؟', options:['1940','1942','1944','1946'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'fm50', text:'بطل فيلم Casablanca؟', options:['Humphrey Bogart','Cary Grant','Gary Cooper','James Stewart'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'fm51', text:'مخرج فيلم 2001: A Space Odyssey؟', options:['Stanley Kubrick','Steven Spielberg','George Lucas','Ridley Scott'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'fm52', text:'في أي سنة عرض فيلم Star Wars الأصلي؟', options:['1975','1977','1979','1981'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'fm53', text:'مخرج فيلم Star Wars الأصلي؟', options:['George Lucas','Steven Spielberg','James Cameron','Ridley Scott'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'fm54', text:'بطل فيلم Apocalypse Now؟', options:['Martin Sheen','Marlon Brando','كلاهما','Robert Duvall'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fm55', text:'مخرج فيلم Apocalypse Now؟', options:['Francis Ford Coppola','Martin Scorsese','Stanley Kubrick','Oliver Stone'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'fm56', text:'كم جائزة Oscar حصلت عليها La La Land؟', options:['4','5','6','7'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fm57', text:'مخرج فيلم Parasite؟', options:['Bong Joon-ho','Park Chan-wook','Kim Ki-duk','Lee Chang-dong'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'fm58', text:'في أي سنة فاز Parasite بأوسكار أفضل فيلم؟', options:['2018','2019','2020','2021'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'fm59', text:'مخرج فيلم Inglourious Basterds؟', options:['Quentin Tarantino','Martin Scorsese','David Fincher','Paul Thomas Anderson'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'fm60', text:'في أي سنة عرض فيلم Goodfellas؟', options:['1988','1989','1990','1991'], correctIndex:2, difficulty:'hard', points:400 }
 ]};
 data.categories.push({ id:foreignMovies.id, name:foreignMovies.name, icon:foreignMovies.icon, questions: prepQuestions(foreignMovies.qs) });
// ==================== 10 أسئلة دين ==============================================================================================
var religion = { id:'religion', name:'أسئلة دين', icon:'🕌', qs:[
        // ===== سهل (20 سؤال) =====
        { id:'rl1', text:'كم عدد أركان الإسلام؟', options:['3','4','5','6'], correctIndex:2, difficulty:'easy', points:100 },
        { id:'rl2', text:'كم عدد أركان الإيمان؟', options:['4','5','6','7'], correctIndex:2, difficulty:'easy', points:100 },
        { id:'rl3', text:'كم عدد ركعات صلاة الظهر؟', options:['2','3','4','5'], correctIndex:2, difficulty:'easy', points:100 },
        { id:'rl4', text:'كم عدد ركعات صلاة الفجر؟', options:['2','3','4','5'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'rl5', text:'كم عدد ركعات صلاة المغرب؟', options:['2','3','4','5'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'rl6', text:'في أي شهر يصوم المسلمون؟', options:['شعبان','رمضان','شوال','ذو الحجة'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'rl7', text:'كم عدد سور القرآن الكريم؟', options:['110','114','116','120'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'rl8', text:'ما هي أول سورة في القرآن؟', options:['البقرة','الفاتحة','الناس','العلق'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'rl9', text:'ما هي آخر سورة في القرآن؟', options:['الفلق','الناس','الإخلاص','الكوثر'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'rl10', text:'ما هي أطول سورة في القرآن؟', options:['البقرة','آل عمران','النساء','المائدة'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'rl11', text:'في أي مدينة وُلد النبي محمد ﷺ؟', options:['مكة','المدينة','الطائف','جدة'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'rl12', text:'في أي مدينة دُفن النبي محمد ﷺ؟', options:['مكة','المدينة','الطائف','القدس'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'rl13', text:'من هو أول الخلفاء الراشدين؟', options:['أبو بكر الصديق','عمر بن الخطاب','عثمان بن عفان','علي بن أبي طالب'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'rl14', text:'كم عدد الخلفاء الراشدين؟', options:['3','4','5','6'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'rl15', text:'ما اسم زوجة النبي الأولى؟', options:['عائشة','خديجة','حفصة','أم سلمة'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'rl16', text:'ما اسم والد النبي محمد ﷺ؟', options:['عبد المطلب','عبد الله','أبو طالب','حمزة'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'rl17', text:'ما اسم والدة النبي محمد ﷺ؟', options:['آمنة','خديجة','عائشة','فاطمة'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'rl18', text:'في أي شهر وُلد النبي محمد ﷺ؟', options:['ربيع الأول','رمضان','محرم','شعبان'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'rl19', text:'كم سنة عاش النبي محمد ﷺ؟', options:['60','63','65','70'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'rl20', text:'ما هي قبلة المسلمين؟', options:['الكعبة','القدس','المدينة','الطور'], correctIndex:0, difficulty:'easy', points:100 },
        // ===== متوسط (20 سؤال) =====
        { id:'rl21', text:'كم عدد آيات سورة البقرة؟', options:['282','284','286','288'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'rl22', text:'في أي سنة هجرية فُرضت الصلاة؟', options:['قبل الهجرة','السنة 1','السنة 2','السنة 3'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'rl23', text:'كم عدد الأنبياء المذكورين في القرآن؟', options:['20','25','30','35'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'rl24', text:'ما هي أول معركة في الإسلام؟', options:['أحد','بدر','الخندق','حنين'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'rl25', text:'في أي سنة هجرية وقعت غزوة بدر؟', options:['1','2','3','4'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'rl26', text:'من هو أول من أسلم من الرجال؟', options:['أبو بكر','علي بن أبي طالب','عمر','عثمان'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'rl27', text:'من هو أول من أسلم من الصبيان؟', options:['أبو بكر','علي بن أبي طالب','زيد بن حارثة','أسامة'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'rl28', text:'من هو أول من أسلم من الموالي؟', options:['زيد بن حارثة','بلال','سلمان الفارسي','صهيب'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'rl29', text:'كم سنة استمر النبي ﷺ يدعو في مكة قبل الهجرة؟', options:['10','13','15','20'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'rl30', text:'ما اسم الغار الذي اختبأ فيه النبي وأبو بكر؟', options:['غار حراء','غار ثور','غار الكهف','غار المرسلات'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'rl31', text:'ما اسم الغار الذي نزل فيه الوحي على النبي؟', options:['غار حراء','غار ثور','غار الكهف','غار النور'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'rl32', text:'ما هي السورة التي تُقرأ يوم الجمعة؟', options:['يس','الكهف','الملك','الواقعة'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'rl33', text:'كم عدد آيات سورة الفاتحة؟', options:['5','6','7','8'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'rl34', text:'ما هي السورة التي تعدل ثلث القرآن؟', options:['الفاتحة','يس','الإخلاص','الكوثر'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'rl35', text:'من هو خاتم الأنبياء والمرسلين؟', options:['عيسى','موسى','محمد','إبراهيم'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'rl36', text:'من هو نبي الله الذي كلمه الله مباشرة؟', options:['محمد','عيسى','موسى','إبراهيم'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'rl37', text:'كم عدد الكتب السماوية؟', options:['3','4','5','6'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'rl38', text:'على من نزل كتاب الزبور؟', options:['داود','سليمان','موسى','عيسى'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'rl39', text:'على من نزل الإنجيل؟', options:['موسى','عيسى','داود','محمد'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'rl40', text:'على من نزلت التوراة؟', options:['عيسى','داود','موسى','إبراهيم'], correctIndex:2, difficulty:'medium', points:200 },
        // ===== صعب (20 سؤال) =====
        { id:'rl41', text:'كم عدد آيات القرآن الكريم؟', options:['6236','6346','6446','6536'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'rl42', text:'كم عدد كلمات القرآن الكريم تقريباً؟', options:['77,000','77,439','78,000','79,000'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'rl43', text:'كم عدد أحرف القرآن الكريم تقريباً؟', options:['320,000','323,015','330,000','340,000'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'rl44', text:'كم عدد السور المكية في القرآن؟', options:['82','86','89','92'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'rl45', text:'كم عدد السور المدنية في القرآن؟', options:['25','27','29','31'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'rl46', text:'في أي سنة هجرية فُرض الصيام؟', options:['1','2','3','4'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'rl47', text:'في أي سنة هجرية فُرضت الزكاة؟', options:['1','2','3','4'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'rl48', text:'في أي سنة هجرية فُرض الحج؟', options:['7','8','9','10'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'rl49', text:'كم سنة استمرت خلافة أبي بكر الصديق؟', options:['سنتان','3 سنوات','4 سنوات','5 سنوات'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'rl50', text:'كم سنة استمرت خلافة عمر بن الخطاب؟', options:['8','10','12','14'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'rl51', text:'كم سنة استمرت خلافة عثمان بن عفان؟', options:['10','12','14','16'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'rl52', text:'كم سنة استمرت خلافة علي بن أبي طالب؟', options:['3','4','5','6'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'rl53', text:'ما اسم أول مسجد بُني في الإسلام؟', options:['قباء','النبوي','الحرام','الأقصى'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'rl54', text:'كم عدد الذين هاجروا في الهجرة الأولى للحبشة؟', options:['10','12','15','20'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'rl55', text:'من هو الصحابي الذي كان يكتب الوحي؟', options:['زيد بن ثابت','معاوية بن أبي سفيان','أبي بن كعب','جميع ما سبق'], correctIndex:3, difficulty:'hard', points:400 },
        { id:'rl56', text:'في عهد أي خليفة جُمع القرآن في مصحف واحد؟', options:['أبي بكر','عمر','عثمان','علي'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'rl57', text:'من هو الصحابي الملقب بـ "أمين الأمة"؟', options:['أبو بكر','عمر','أبو عبيدة بن الجراح','معاذ بن جبل'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'rl58', text:'من هو الصحابي الملقب بـ "سيف الله المسلول"؟', options:['عمر بن الخطاب','خالد بن الوليد','علي بن أبي طالب','حمزة'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'rl59', text:'من هو الصحابي الذي قال عنه النبي "إن الجنة تشتاق إليه"؟', options:['عمر','علي','سلمان الفارسي','عمار بن ياسر'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'rl60', text:'كم عدد غزوات الرسول ﷺ؟', options:['25','27','29','30'], correctIndex:1, difficulty:'hard', points:400 }
]};
 data.categories.push({ id:religion.id, name:religion.name, icon:religion.icon, questions: prepQuestions(religion.qs) });
// ==================== 11 سيارات ==============================================================================================
var cars = { id:'cars', name:'سيارات', icon:'🚗', qs:[
        // سهل
        { id:'car1', text:'ما هو شعار شركة BMW؟', options:['دائرة زرقاء وبيضاء','نجمة ثلاثية','حصان جامح','أربع حلقات'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'car2', text:'ما هو شعار مرسيدس؟', options:['أربع حلقات','نجمة ثلاثية','حصان','أسد'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'car3', text:'ما هو شعار أودي؟', options:['ثلاث حلقات','أربع حلقات','نجمة','صليب'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'car4', text:'من أي بلد تويوتا؟', options:['ألمانيا','اليابان','كوريا','أمريكا'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'car5', text:'من أي بلد بي إم دبليو؟', options:['ألمانيا','إيطاليا','فرنسا','بريطانيا'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'car6', text:'من أي بلد فيراري؟', options:['ألمانيا','إيطاليا','فرنسا','إسبانيا'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'car7', text:'من أي بلد لامبورغيني؟', options:['ألمانيا','إيطاليا','فرنسا','بريطانيا'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'car8', text:'من أي بلد هيونداي؟', options:['اليابان','الصين','كوريا الجنوبية','تايوان'], correctIndex:2, difficulty:'easy', points:100 },
        { id:'car9', text:'من أي بلد فولكس فاجن؟', options:['ألمانيا','النمسا','هولندا','بلجيكا'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'car10', text:'من أي بلد رولز رويس؟', options:['ألمانيا','بريطانيا','فرنسا','إيطاليا'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'car11', text:'ما هو شعار فيراري؟', options:['أسد','حصان جامح','ثور','نمر'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'car12', text:'ما هو شعار لامبورغيني؟', options:['حصان','ثور','أسد','نمر'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'car13', text:'ما هو شعار بيجو؟', options:['حصان','أسد','ثور','نسر'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'car14', text:'ما هو شعار جاكوار؟', options:['أسد','نمر','جاكوار','فهد'], correctIndex:2, difficulty:'easy', points:100 },
        { id:'car15', text:'ما هو شعار فيراري بالألوان؟', options:['أحمر وأسود','أصفر وأسود','أبيض وأسود','أزرق وأبيض'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'car16', text:'من أي بلد فولفو؟', options:['ألمانيا','السويد','النرويج','الدنمارك'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'car17', text:'من أي بلد سيات؟', options:['إيطاليا','إسبانيا','البرتغال','فرنسا'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'car18', text:'من أي بلد سكودا؟', options:['ألمانيا','تشيكيا','بولندا','المجر'], correctIndex:1, difficulty:'easy', points:100 },
        { id:'car19', text:'من أي بلد أوبل؟', options:['ألمانيا','بريطانيا','فرنسا','إيطاليا'], correctIndex:0, difficulty:'easy', points:100 },
        { id:'car20', text:'من أي بلد كرايسلر؟', options:['ألمانيا','أمريكا','كندا','بريطانيا'], correctIndex:1, difficulty:'easy', points:100 },

        // متوسط
        { id:'car21', text:'في أي عام تأسست شركة فيراري؟', options:['1929','1939','1947','1955'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'car22', text:'في أي عام تأسست تويوتا؟', options:['1925','1937','1945','1950'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'car23', text:'في أي عام تأسست بي إم دبليو؟', options:['1916','1925','1935','1945'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'car24', text:'من مؤسس فيراري؟', options:['إنزو فيراري','فيرنشيو لامبورغيني','هنري فورد','كارل بنز'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'car25', text:'من مؤسس لامبورغيني؟', options:['إنزو لامبورغيني','فيرنشيو لامبورغيني','هنري لامبورغيني','كارل لامبورغيني'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'car26', text:'من مؤسس فورد؟', options:['هنري فورد','جون فورد','جيمس فورد','ويليام فورد'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'car27', text:'ما هي أسرع سيارة إنتاج في العالم؟', options:['بوغاتي شيرون','هينيسي فينوم','كونيغسيج جيسكو','SSC توتارا'], correctIndex:3, difficulty:'medium', points:200 },
        { id:'car28', text:'ما هي أغلى سيارة في العالم؟', options:['بوغاتي لا فواتور نوار','رولز رويس بوت تيل','بوغاتي شيرون','فيراري 250 GTO'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'car29', text:'من مؤسس تسلا؟', options:['إيلون ماسك','مارتن إيبرهارد','نيكولا تسلا','جيف بيزوس'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'car30', text:'في أي عام تأسست تسلا؟', options:['2001','2003','2005','2007'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'car31', text:'ما اسم أول سيارة من تسلا؟', options:['Model S','Model 3','Roadster','Model X'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'car32', text:'ما هي الشركة الأم لـ بنتلي؟', options:['BMW','فولكس فاجن','مرسيدس','أودي'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'car33', text:'ما هي الشركة الأم لـ بوغاتي؟', options:['BMW','فولكس فاجن','مرسيدس','بورش'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'car34', text:'ما هي الشركة الأم لـ رولز رويس؟', options:['BMW','فولكس فاجن','مرسيدس','جاكوار'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'car35', text:'ما هي الشركة الأم لـ ميني؟', options:['BMW','فولكس فاجن','مرسيدس','تويوتا'], correctIndex:0, difficulty:'medium', points:200 },
        { id:'car36', text:'ما هي الشركة الأم لـ لكزس؟', options:['هوندا','تويوتا','نيسان','مازدا'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'car37', text:'ما هي الشركة الأم لـ إنفينيتي؟', options:['تويوتا','هوندا','نيسان','مازدا'], correctIndex:2, difficulty:'medium', points:200 },
        { id:'car38', text:'ما هي الشركة الأم لـ أكورا؟', options:['تويوتا','هوندا','نيسان','مازدا'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'car39', text:'كم سرعة بوغاتي شيرون القصوى؟', options:['350 كم/س','420 كم/س','490 كم/س','520 كم/س'], correctIndex:1, difficulty:'medium', points:200 },
        { id:'car40', text:'ما هو أكثر طراز سيارة مبيعاً في التاريخ؟', options:['تويوتا كورولا','فورد F-150','فولكس فاجن جولف','هوندا سيفيك'], correctIndex:0, difficulty:'medium', points:200 },

        // صعب
        { id:'car41', text:'في أي عام اخترع كارل بنز أول سيارة؟', options:['1876','1886','1896','1906'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'car42', text:'ما اسم أول سيارة في العالم؟', options:['فورد T','بنز موتورفاجن','فولكس بيتل','مرسيدس A'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'car43', text:'كم محرك تستخدم بوغاتي شيرون؟', options:['V8','V10','V12','W16'], correctIndex:3, difficulty:'hard', points:400 },
        { id:'car44', text:'كم حصاناً قوة بوغاتي شيرون؟', options:['1200','1500','1800','2000'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'car45', text:'في أي عام أُسست بورش؟', options:['1921','1931','1941','1951'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'car46', text:'من مؤسس بورش؟', options:['فرديناند بورش','كارل بورش','هانز بورش','أوتو بورش'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'car47', text:'في أي عام أُنتجت أول سيارة فولكس فاجن بيتل؟', options:['1928','1938','1948','1958'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'car48', text:'كم عدد عجلات سيارة فورمولا 1؟', options:['4','6','8','4 + بدلاء'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'car49', text:'كم تكلفة محرك سيارة فورمولا 1 تقريباً؟', options:['5 مليون $','10 مليون $','15 مليون $','20 مليون $'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'car50', text:'من بطل العالم في فورمولا 1 لعام 2023؟', options:['لويس هاميلتون','ماكس فيرستابن','شارل لوكلير','جورج راسل'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'car51', text:'كم بطولة عالم حصد ميشيل شوماخر؟', options:['5','6','7','8'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'car52', text:'كم بطولة عالم حصد لويس هاميلتون؟', options:['5','6','7','8'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'car53', text:'ما اسم أقدم شركة سيارات لا تزال تعمل؟', options:['مرسيدس','بنز','بيجو','رينو'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'car54', text:'في أي عام تأسست بيجو؟', options:['1810','1830','1850','1870'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'car55', text:'ما اسم محرك مازدا الفريد؟', options:['روتاري','تيربو','هايبرد','V-Twin'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'car56', text:'ما هي السيارة التي ظهرت في فيلم Back to the Future؟', options:['فيراري','ديلوريان DMC-12','بورش','مستانج'], correctIndex:1, difficulty:'hard', points:400 },
        { id:'car57', text:'ما هي سيارة جيمس بوند الشهيرة؟', options:['أستون مارتن','فيراري','بنتلي','جاكوار'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'car58', text:'كم لتر يستهلك محرك بوغاتي في 100 كم؟', options:['25 لتر','35 لتر','60 لتر','95 لتر'], correctIndex:2, difficulty:'hard', points:400 },
        { id:'car59', text:'ما اسم مالك ومؤسس شركة كونيغسيج؟', options:['كريستيان فون كونيغسيج','إنزو كونيغسيج','هانز كونيغسيج','أرنولد كونيغسيج'], correctIndex:0, difficulty:'hard', points:400 },
        { id:'car60', text:'كم تكلفة سيارة Rolls-Royce Boat Tail؟', options:['10 مليون $','20 مليون $','28 مليون $','35 مليون $'], correctIndex:2, difficulty:'hard', points:400 }
]};
 data.categories.push({ id:cars.id, name:cars.name, icon:cars.icon, questions: prepQuestions(cars.qs) });
// ==================== 12 مشاهير عرب ==============================================================================================
var arabCelebs = { id:'arabCelebs', name:'مشاهير عرب', icon:'⭐', qs:[
// سهل
{ id:'ac1', text:'ما لقب أم كلثوم؟', options:['كوكب الشرق','سيدة الشاشة العربية','العندليب الأسمر','فنان العرب'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac2', text:'ما جنسية فيروز؟', options:['لبنانية','سورية','مصرية','أردنية'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac3', text:'ما لقب عمرو دياب؟', options:['الهضبة','القيصر','الكينغ','السفير'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac4', text:'من يُعرف بلقب الزعيم في الكوميديا المصرية؟', options:['عادل إمام','يحيى الفخراني','محمد هنيدي','أحمد حلمي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac5', text:'ما لقب عبد الحليم حافظ؟', options:['العندليب الأسمر','صوت الأرض','الكينغ','الأسطورة'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac6', text:'من يُلقّب بسلطان الطرب؟', options:['جورج وسوف','وائل كفوري','ملحم بركات','راغب علامة'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac7', text:'من يُلقّب بفنان العرب؟', options:['محمد عبده','كاظم الساهر','حسين الجسمي','عبد المجيد عبد الله'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac8', text:'من نجم كرة القدم المصري المحترف في ليفربول؟', options:['محمد صلاح','محمود تريزيغيه','أحمد حجازي','مصطفى محمد'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac9', text:'من تُعرف بسيدة الشاشة العربية؟', options:['فاتن حمامة','سعاد حسني','يسرا','لبنى عبد العزيز'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac10', text:'من صاحبة أغنية "يا مرايتي"؟', options:['إليسا','نانسي عجرم','شيرين عبد الوهاب','نجوى كرم'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac11', text:'من المطرب المغربي صاحب أغنية "إنت معلم"؟', options:['سعد لمجرد','عبد الحفيظ الدوزي','حسني','حاتم عمور'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac12', text:'من مقدّم برنامج "خواطر"؟', options:['أحمد الشقيري','مصطفى الآغا','عمرو أديب','جورج قرداحي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac13', text:'من بطل مسلسل "الهيبة"؟', options:['تيم حسن','قصي خولي','باسل خياط','مكسيم خليل'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac14', text:'من الفنانة اللبنانية الملقبة بـ"الشحرورة"؟', options:['صباح','نجاة الصغيرة','هيفاء وهبي','ماجدة الرومي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac15', text:'من المطرب العراقي الملقب بـ"القيصر"؟', options:['كاظم الساهر','ماجد المهندس','حسام الرسام','نصرت البدر'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac16', text:'من الروائي المصري الحائز نوبل للأدب 1988؟', options:['نجيب محفوظ','يوسف إدريس','توفيق الحكيم','أحمد خالد توفيق'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac17', text:'من المطرب المصري الملقب بـ"الكينغ"؟', options:['محمد منير','حميد الشاعري','تامر حسني','محمد فؤاد'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac18', text:'من صاحبة أغنية "يا بنات"؟', options:['نانسي عجرم','شيرين عبد الوهاب','إليسا','كارول سماحة'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac19', text:'من بطل فيلم "الجزيرة"؟', options:['أحمد السقا','أحمد عز','أحمد حلمي','أحمد مكي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ac20', text:'من صاحب أغنية "بشرة خير"؟', options:['حسين الجسمي','راشد الماجد','راغب علامة','وائل جسار'], correctIndex:0, difficulty:'easy', points:100 },
// متوسط
{ id:'ac21', text:'ما الاسم الحقيقي لعمر الشريف؟', options:['ميشيل ديمتري شلهوب','أشرف زكي','يوسف شاهين','عزت أبو عوف'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac22', text:'ما الاسم الحقيقي لشادية؟', options:['فاطمة أحمد شاكر','فاطمة إبراهيم السيد','زهرة عفت','سامية جمال'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac23', text:'من ملحّن أغنية "الأطلال" لأم كلثوم؟', options:['رياض السنباطي','محمد عبد الوهاب','بليغ حمدي','زكريا أحمد'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac24', text:'من شاعر قصيدة "الأطلال"؟', options:['إبراهيم ناجي','نزار قباني','أحمد شوقي','صلاح جاهين'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac25', text:'في أي عام حصل نجيب محفوظ على جائزة نوبل؟', options:['1988','1986','1990','1994'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac26', text:'من يُلقّب بـ"صوت الأرض"؟', options:['طلال مدّاح','محمد عبده','عبد المجيد عبد الله','عبادي الجوهر'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac27', text:'من كاتب كلمات "رسالة من تحت الماء" لعبد الحليم؟', options:['نزار قباني','عبد الرحمن الأبنودي','صلاح جاهين','حسين السيد'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac28', text:'من ملحّن "قارئة الفنجان"؟', options:['محمد الموجي','كمال الطويل','بليغ حمدي','حلمي بكر'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac29', text:'في أي محافظة وُلدت أم كلثوم؟', options:['الدقهلية','القاهرة','الغربية','المنيا'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac30', text:'ما جنسية المطربة وردة؟', options:['جزائرية','مصرية','مغربية','تونسية'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac31', text:'من كان زوج فيروز وشريكها الفني؟', options:['عاصي الرحباني','منصور الرحباني','زياد الرحباني','إلياس الرحباني'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac32', text:'من مخرج فيلم "الكيت كات"؟', options:['داود عبد السيد','يوسف شاهين','خالد يوسف','علي بدرخان'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac33', text:'من المخرج الفلسطيني لفيلم "عمر" المرشّح للأوسكار؟', options:['هاني أبو أسعد','إيليا سليمان','ميشيل خليفي','آن ماري جاسر'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac34', text:'من مخرج فيلم "المصير"؟', options:['يوسف شاهين','شريف عرفة','محمد خان','إيناس الدغيدي'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac35', text:'من مؤلف رواية "رجال في الشمس"؟', options:['غسان كنفاني','عبد الرحمن منيف','سهيل إدريس','إلياس خوري'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac36', text:'ما جنسية المطربة سميرة سعيد؟', options:['مغربية','جزائرية','مصرية','تونسية'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac37', text:'من مؤلف السيرة "الأيام"؟', options:['طه حسين','عباس محمود العقاد','إحسان عبد القدوس','مصطفى لطفي المنفلوطي'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac38', text:'ما لقب أحمد شوقي؟', options:['أمير الشعراء','شاعر النيل','شاعر المرأة','شاعر العرب'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac39', text:'من تُلقّب "سندريلا الشاشة العربية"؟', options:['سعاد حسني','فاتن حمامة','نادية لطفي','نجلاء فتحي'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ac40', text:'من صاحب أغنية "الأماكن"؟', options:['محمد عبده','طلال مدّاح','عبد المجيد عبد الله','ماجد المهندس'], correctIndex:0, difficulty:'medium', points:200 },// صعب
{ id:'ac41', text:'ما الاسم الحقيقي لفيروز؟', options:['نهاد وديع حدّاد','فاطمة الزهراء','جانيت فغالي','نوال الزغبي'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac42', text:'ما الاسم الحقيقي لوردة الجزائرية؟', options:['وردة فتوكي','وردة قنديل','وردة رباح','وردة الأطرش'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac43', text:'ما الاسم الحقيقي لأم كلثوم؟', options:['فاطمة إبراهيم السيد البلتاجي','آمال محمد علي','فاطمة أحمد شاكر','فاطمة ساسي'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac44', text:'من شاعر قصيدة "أنا وليلى"؟', options:['حسن المرواني','نزار قباني','عبد الوهاب البياتي','بدر شاكر السياب'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac45', text:'من ملحّن أغنية "أنا وليلى"؟', options:['كاظم الساهر','رياض السنباطي','محمد الموجي','بليغ حمدي'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac46', text:'من مخرج فيلم "باب الحديد" (1958)؟', options:['يوسف شاهين','صلاح أبو سيف','هنري بركات','كمال الشيخ'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac47', text:'في أي سنة توفيت سعاد حسني؟', options:['2001','1999','2003','1997'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac48', text:'من ملحّن "أمل حياتي" لأم كلثوم؟', options:['محمد عبد الوهاب','بليغ حمدي','زكريا أحمد','رياض السنباطي'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac49', text:'في أي مدينة وُلد نزار قباني؟', options:['دمشق','حلب','بيروت','بغداد'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac50', text:'من مؤلف رواية "الخبز الحافي"؟', options:['محمد شكري','الطيب صالح','إدريس الشرايبي','أمين معلوف'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac51', text:'من غنّى "مقادير" أولًا؟', options:['طلال مدّاح','محمد عبده','عبد المجيد عبد الله','راشد الماجد'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac52', text:'من مخرج فيلم "المخدوعون" (1972)؟', options:['توفيق صالح','يوسف شاهين','محمد ملص','مصطفى العقاد'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac53', text:'من مؤلف رواية "اللص والكلاب"؟', options:['نجيب محفوظ','إبراهيم أصلان','يوسف إدريس','بهاء طاهر'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac54', text:'من يُلقّب بـ"صوت الجبل"؟', options:['وديع الصافي','نصري شمس الدين','راغب علامة','ملحم زين'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac55', text:'من مؤلف كتاب "عبقرية محمد"؟', options:['عباس محمود العقاد','طه حسين','مصطفى محمود','أحمد أمين'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac56', text:'من مؤلف رواية "عودة الروح"؟', options:['توفيق الحكيم','إحسان عبد القدوس','يحيى حقي','محمد حسين هيكل'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac57', text:'من مؤلف "موسم الهجرة إلى الشمال"؟', options:['الطيب صالح','جمال الغيطاني','عبد الرحمن منيف','يوسف زيدان'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac58', text:'في أي مدينة وُلد عمر الشريف؟', options:['الإسكندرية','القاهرة','المنصورة','بورسعيد'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac59', text:'ما الاسم الحقيقي للفنانة صباح؟', options:['جانيت جرجس فغالي','بولا إليزا','نوال ظاهر الزيد','سعاد محمد'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ac60', text:'من كاتب نشيد "موطني"؟', options:['إبراهيم طوقان','فدوى طوقان','سعيد عقل','أحمد شوقي'], correctIndex:0, difficulty:'hard', points:400 }
]};
data.categories.push({ id:arabCelebs.id, name:arabCelebs.name, icon:arabCelebs.icon, questions: prepQuestions(arabCelebs.qs) });
// ==================== 13 ألعاب الفيديو ==============================================================================================
var videoGames = { id:'videoGames', name:'ألعاب الفيديو', icon:'🎮', qs:[
// سهل
{ id:'vg1', text:'بطل سلسلة سوبر ماريو؟', options:['ماريو','لويجي','واريو','يوشي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg2', text:'بطل سلسلة أسطورة زيلدا؟', options:['لينك','زيلدا','غانوندورف','إيبونا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg3', text:'الشركة التي طورت ماينكرافت؟', options:['موجانغ ستوديوز','بيثيسدا','فالف','بليزارد'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg4', text:'الشخصية الكهربائية الأشهر في بوكيمون؟', options:['بيكاتشو','تشاريزارد','بولباسور','سكويرتل'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg5', text:'بطل سلسلة غود أوف وور؟', options:['كراتوس','أتريوس','زيوس','آريس'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg6', text:'بطل هيلو يُعرف باسم؟', options:['ماستر تشيف','الأربيتر','كورتانا','نوبل سيكس'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg7', text:'في أي لعبة يظهر مخلوق كريبر؟', options:['ماينكرافت','تيراريا','فورتنايت','روبلوكس'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg8', text:'سلسلة كرة القدم الشهيرة من EA؟', options:['فيفا','بي إي إس','فوتبول مانجر','إي فوتبول'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg9', text:'سلسلة غراند ثفت أوتو من تطوير؟', options:['روكستار غيمز','يوبيسوفت','إلكترونيك آرتس','سكوير إنكس'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg10', text:'الشخصية الزرقاء السريعة من سيغا؟', options:['سونيك','ميغا مان','كراش','سبايرو'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg11', text:'اسم الأميرة التي يحاول ماريو إنقاذها غالبًا؟', options:['الأميرة بيتش','الأميرة زيلدا','ديزي','روزالينا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg12', text:'الخريطة الشهيرة "داست 2" تعود لأي لعبة؟', options:['كاونتر-سترايك','كول أوف ديوتي','أوفر واتش','فالورانت'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg13', text:'اللعبة الاجتماعية التي تضم أدوار محتال وطاقم؟', options:['أمونغ آس','فال غايز','أوفر كوكد','فالورانت'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg14', text:'سلسلة سباقات مع شخصيات ماريو؟', options:['ماريو كارت','نيد فور سبيد','غران تورزمو','فورزا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg15', text:'اللعبة التي تجمع بين السيارات وكرة القدم؟', options:['روكيت ليغ','تراكمانيا','تويستد ميتال','فورزا هورايزن'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg16', text:'الاستوديو المطور لفورتنايت؟', options:['إيبك غيمز','رايوت غيمز','يوبيسوفت','فالف'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg17', text:'الأداة المستخدمة لالتقاط البوكيمون؟', options:['بوكِه بول','جرعة علاج','توت','طارد'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg18', text:'اللعبة التي تدور أحداثها في مدينة لوس سانتوس؟', options:['غران ثفت أوتو V','سليبينغ دوغز','سينتس رو','واتش دوغز'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg19', text:'سلسلة الاغتيالات التاريخية من يوبيسوفت؟', options:['أساسنز كريد','فار كراي','أمير بلاد فارس','واتش دوغز'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'vg20', text:'اللعبة المعروفة اختصارًا بـ "ببجي"؟', options:['بلاير أنونز باتل غراوندز','باتل غراوندز بابليك','برو أوربن باتل غراوند','بروجيكت باتلفرونت'], correctIndex:0, difficulty:'easy', points:100 },
// متوسط
{ id:'vg21', text:'في أي عام صدرت النسخة النهائية من ماينكرافت؟', options:['2011','2009','2013','2015'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg22', text:'مطوّر The Witcher 3: Wild Hunt؟', options:['سي دي بروجكت رِد','بيثيسدا غيم ستوديوز','بايووير','أوبسيديان إنترتينمنت'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg23', text:'اسم المملكة في The Legend of Zelda؟', options:['هايرول','سكاي ريم','ميدغارد','إيفاليس'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg24', text:'اسم السيف الأسطوري في زيلدا؟', options:['ماستر سورد','باستر سورد','دراجون سلاير','مونادو'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg25', text:'مطوّر Elden Ring؟', options:['فروم سوفتوير','تيم نينجا','بلاتينيوم غيمز','كابكوم'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg26', text:'أي جزء من GTA يظهر فيه نيكو بيليك؟', options:['GTA IV','GTA V','سان أندرياس','فايس سيتي'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg27', text:'أي دور في Overwatch مسؤول عن الشفاء والدعم؟', options:['الدعم','الدبابة','الضرر','الكشاف'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg28', text:'الشركة المطورة لـ League of Legends؟', options:['ريوت غيمز','فالف','بليزارد إنترتينمنت','يوبيسوفت'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg29', text:'اسم العملة داخل Fortnite؟', options:['في-باكس','كريدتس','كوينز','جِمز'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg30', text:'في Resident Evil الكلاسيكية، ما الأداة اللازمة للحفظ؟', options:['شريط الحبر','قرص يو إس بي','خرطوشة آلة كاتبة','ذاكرة فلاش'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg31', text:'أي سلسلة قتال تضم شخصية كازويا ميشيما؟', options:['تيكن','ستريت فايتر','مورتال كومбат','سول كاليبر'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg32', text:'ما اسم قذيفة الطاقة الشهيرة لريو في Street Fighter؟', options:['هادوكان','شوريوكن','تاتسومكي','فلاش كيك'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg33', text:'الشركة المطورة لـ Pokémon GO؟', options:['نيانتيك','غيم فريك','شركة بوكيمون','نينتندو'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg34', text:'اسم الشركة الخيالية في Portal؟', options:['أبرتشر ساينس','بلاك ميسا','وايلاند-يوتاني','أبستيرغو'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg35', text:'بطل Half-Life؟', options:['غوردون فريمان','أليكس فانس','بارني كالهون','إيلاي فانس'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg36', text:'مطوّر The Last of Us (2013)؟', options:['نوتي دوغ','إنسومنياك غيمز','سانتا مونيكا ستوديو','ساكر بانش'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg37', text:'اسم ابن كراتوس في God of War (2018)؟', options:['أتريوس','بالدور','ميمير','هايمدال'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg38', text:'ما اسم الجهاز الذي يتيح دخول الذكريات الجينية في Assassin’s Creed؟', options:['الأنيموس','إيغل فيجن','أبستيرغو','هيليكس'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg39', text:'من القائد ذو الشارب في سلسلة Modern Warfare؟', options:['الكابتن برايس','سوب ماكتافيش','غوست','ماكاروف'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'vg40', text:'ما اسم التنين الرئيسي في Skyrim؟', options:['ألدوين','بارثوناكس','ميرمولنير','أودافينغ'], correctIndex:0, difficulty:'medium', points:200 },
// صعب
{ id:'vg41', text:'في أي عام صدر أول The Legend of Zelda؟', options:['1986','1984','1988','1990'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg42', text:'ما اسم فريق التطوير الأصلي لسلسلة Silent Hill؟', options:['تيم سايلنت','آي دي سوفتوير','لوكينغ غلاس ستوديوز','ريمدي إنترتينمنت'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg43', text:'في Metroid Fusion، ما اسم الطفيلي الذي يصيب ساموس؟', options:['طفيلي إكس','ميترويد','فازون','كورديسيبس'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg44', text:'في Metroid Prime، ما اسم الكوكب الذي تدور عليه أحداث الجزء الأول؟', options:['تالون 4','SR388','زيبس','إيثر'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg45', text:'من الملحن الرئيسي لموسيقى Morrowind/Oblivion/Skyrim؟', options:['جيريمي سُول','نوبوؤ أويماتسو','كوجي كوندو','ياسونوري ميتسودا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg46', text:'أي استوديو من سوني شارك FromSoftware تطوير Bloodborne؟', options:['ستوديو اليابان','بولي فوني ديجيتال','غيريلا غيمز','ميديا موليكيول'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg47', text:'في Dark Souls، ما اسم النار الأصلية التي يسعى اللوردات للحفاظ عليها؟', options:['اللهب الأول','لهيب الفوضى','لهيب الكلن','لهيب إردتري'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg48', text:'في Warcraft، ما اسم كوكب موطن الأورك الأصلي؟', options:['دراينور','آزيروث','أرغوس','سكيلغه'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg49', text:'في Diablo، ما اسم الأحجار التي تُستخدم لحبس الشياطين؟', options:['أحجار الأرواح','شظايا الدم','أحجار الرون','زمردات الفوضى'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg50', text:'في Mass Effect، ما اسم سفينة القائد شيبارد؟', options:['نورماندي','تمبست','عمود الخريف','صقر الأبنوس'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg51', text:'أيٌّ من التالي ليس عِرقًا في StarCraft؟', options:['كوفيننت','تيران','بروتوس','زِرغ'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg52', text:'في Persona 5، ما اسم المجموعة التي يقودها الجوكر؟', options:['لصوص الأشباح','فريق سيز','الفصل السابع','ديدسيك'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg53', text:'في Final Fantasy VII، ما اسم الشركة المسيطرة على الطاقة في ميدغار؟', options:['شركة شينرا للطاقة الكهربائية','أفالانش','شركة نيبلهيم','سيربيروس'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg54', text:'في BioShock، ما اسم المدينة تحت الماء؟', options:['رافتشر','كولومبيا','ريفن','أتلانتيكا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg55', text:'في Chrono Trigger، ما اسم الكيان الطفيلي الذي يهدد العالم؟', options:['لافوس','غايغاس','ماذر برين','جينوفا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg56', text:'في Hollow Knight، ما اسم المملكة التي تدور فيها الأحداث؟', options:['هالونست','ديرتموث','غرين باث','أشينا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg57', text:'في Monster Hunter، ما اسم القطط الرفيقة للصياد؟', options:['باليكوز','موغلز','نافي','تشاو'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg58', text:'في Dota 2، ما اسم كأس بطولة The International؟', options:['إيجيس الأبطال','كأس السامونرز','كأس بورغ-وارنر','فروستموورن'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg59', text:'تقع أحداث Apex Legends ضمن عالم أي سلسلة؟', options:['تايتنفول','ديستني','هالو','أوفرواتش'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'vg60', text:'في The Last of Us، ما اسم الفطر المسبب للتحولات؟', options:['كورديسيبس','فطر النقر','نيكرومورف','العفن'], correctIndex:0, difficulty:'hard', points:400 }
]};
data.categories.push({ id:videoGames.id, name:videoGames.name, icon:videoGames.icon, questions: prepQuestions(videoGames.qs) });
// ==================== 14 مشاهير أجانب ==============================================================================================
var foreignCelebs = { id:'foreignCelebs', name:'مشاهير أجانب', icon:'🌍', qs:[
// سهل
{ id:'fc1', text:'من الممثل الذي جسّد جاك في فيلم تايتانيك؟', options:['ليوناردو دي كابريو','براد بيت','توم كروز','جوني ديب'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc2', text:'من المغني الذي قدّم أغنية ثريلر؟', options:['مايكل جاكسون','برنس','ستيفي وندر','برونو مارس'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc3', text:'من يجسّد شخصية آيرون مان في عالم مارفل؟', options:['روبرت داوني جونيور','كريس إيفانز','كريس هيمسوورث','مارك رافالو'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc4', text:'من تُعرف بلقب ملكة البوب؟', options:['مادونا','ليدي غاغا','بيونسيه','ريهانا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc5', text:'من هو مؤسس شركة سبيس إكس؟', options:['إيلون ماسك','جيف بيزوس','بيل غيتس','لاري بايج'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc6', text:'فرقة بي تي إس من أي دولة؟', options:['كوريا الجنوبية','اليابان','الصين','تايلاند'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc7', text:'من جسّد الكابتن جاك سبارو في قراصنة الكاريبي؟', options:['جوني ديب','أورلاندو بلوم','هيو جاكمان','كيانو ريفز'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc8', text:'نجم سلسلة المهمة المستحيلة؟', options:['توم كروز','مات ديمون','بن أفليك','جورج كلوني'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc9', text:'ما الاسم الحقيقي لـ ذا روك؟', options:['دواين جونسون','فين ديزل','جيسون ستاثام','جون سينا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc10', text:'من السباح الأكثر تتويجًا في تاريخ الأولمبياد؟', options:['مايكل فيلبس','إيان ثورب','رايان لوكتي','يوسين بولت'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc11', text:'من مؤلفة سلسلة هاري بوتر؟', options:['جيه كيه رولينغ','ستيفن كينغ','سوزان كولينز','جورج آر آر مارتن'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc12', text:'من مغني أغنية شايب أوف يو؟', options:['إد شيران','شون مينديز','جاستن بيبر','سام سميث'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc13', text:'من مغني أغنية بليندينغ لايتس؟', options:['ذا ويكند','برونو مارس','تشارلي بوث','هاري ستايلز'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc14', text:'من يُعرف بلقب ملك بوليوود؟', options:['شاه روخ خان','سلمان خان','عامر خان','أكشاي كومار'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc15', text:'من الممثلة التي جسدت هيرميون غرنجر؟', options:['إيما واتسون','إيما ستون','كيرا نايتلي','ناتالي بورتمان'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc16', text:'من جسّد نيو في فيلم ذا ماتريكس؟', options:['كيانو ريفز','كريستيان بيل','هيو جاكمان','مات ديمون'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc17', text:'من هو مؤسس فيسبوك؟', options:['مارك زوكربيرغ','إيلون ماسك','جاك دورسي','لاري إليسون'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc18', text:'من مغنية أغنية باد رومانس؟', options:['ليدي غاغا','كاتي بيري','أريانا غراندي','دوا ليبا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc19', text:'من اللاعب الأرجنتيني الذي توّج بكأس العالم 2022؟', options:['ليونيل ميسي','أنخل دي ماريا','سيرخيو أغويرو','دييغو مارادونا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fc20', text:'من المغني الرئيسي لفرقة كولدبلاي؟', options:['كريس مارتن','آدم ليفين','براندون فلاورز','أليكس ترنر'], correctIndex:0, difficulty:'easy', points:100 },
// متوسط
{ id:'fc21', text:'في أي سنة صدر فيلم تايتانيك؟', options:['1997','1995','1999','2001'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc22', text:'من مخرج فيلم إنسبشن؟', options:['كريستوفر نولان','جيمس كاميرون','ريدلي سكوت','دينيس فيلنوف'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc23', text:'ما جنسية شاكيرا؟', options:['كولومبية','برازيلية','لبنانية','إسبانية'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc24', text:'من الممثل الذي جسّد وولفرين؟', options:['هيو جاكمان','رايان رينولدز','كريس إيفانز','بن أفليك'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc25', text:'من الممثل الذي يجسّد ديدبول؟', options:['رايان رينولدز','هيو جاكمان','كريس هيمسوورث','جيسون موموا'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc26', text:'من المغني الرئيسي لأغنية ديسباسيتو؟', options:['لويس فونسي','إنريكي إغليسياس','ريكي مارتن','جي بالفين'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc27', text:'ما اسم منسّق الأغاني الذي قدّم فِيدِد؟', options:['آلان ووكر','مارشميلو','زيد','كالفن هاريس'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc28', text:'ما جنسية لاعب التنس نوفاك ديوكوفيتش؟', options:['صربية','إسبانية','سويسرية','كرواتية'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc29', text:'كان فريدي ميركوري المغني الرئيسي لأي فرقة؟', options:['كوين','البيتلز','ال رولينغ ستونز','يو 2'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc30', text:'عن أي فيلم نال ليوناردو دي كابريو أول أوسكار؟', options:['العائد','ذئب وول ستريت','تايتانيك','جزيرة شاتر'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc31', text:'من المغني الرئيسي لفرقة مارون 5؟', options:['آدم ليفين','بريندون يوري','دان رينولدز','كريس مارتن'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc32', text:'فرقة بلاكبينك من أي بلد؟', options:['كوريا الجنوبية','اليابان','الصين','تايلاند'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc33', text:'من مخرج فيلم أفاتار؟', options:['جيمس كاميرون','بيتر جاكسون','جورج لوكاس','جاي جاي أبرامز'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc34', text:'من مغنية أغنية هِلو (2015)؟', options:['أديل','ريهانا','سيا','سيلينا غوميز'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc35', text:'من مؤسس شركة أمازون؟', options:['جيف بيزوس','لاري بايج','سيرغي برين','تيم كوك'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc36', text:'من يجسّد سبايدر-مان في عالم مارفل منذ 2016؟', options:['توم هولاند','أندرو غارفيلد','توبي ماغواير','توم هيدلستون'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc37', text:'من مغني الراب الكندي الملقّب دريزي؟', options:['دريك','ذا ويكند','ناف','شون مينديز'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc38', text:'من الممثلة التي جسدت الأرملة السوداء؟', options:['سكارليت جوهانسون','إليزابيث أولسن','بري لارسون','غال غادوت'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc39', text:'من قدّم أغنية واكا واكا لكأس العالم 2010؟', options:['شاكيرا','جينيفر لوبيز','بيتبول','كاتي بيري'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fc40', text:'من مخرجة فيلم باربي (2023)؟', options:['غريتا غيرويغ','باتي جنكينز','صوفيا كوبولا','أوليفيا وايلد'], correctIndex:0, difficulty:'medium', points:200 },
// صعب
{ id:'fc41', text:'ما الاسم الحقيقي لليدي غاغا؟', options:['ستيفاني جوان أنجلينا جيرمانوتا','روبين ريحانا فينتي','أليشيا بيث مور','كاثرين إليزابيث هادسون'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc42', text:'ما الاسم الحقيقي لذي ويكند؟', options:['أبيل مكونن تسفاي','شون كوري كارتر','أوستن ريتشارد بوست','كاميرون جبريل توماس'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc43', text:'ما الاسم الحقيقي لبرونو مارس؟', options:['بيتر جين هيرنانديز','بول ديفيد هيوسن','غوردون ماثيو توماس سمنر','ستيفلاند هارداواي موريس'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc44', text:'ما علامة التجميل التي أسستها ريهانا؟', options:['فينتي بيوتي','كايلِي كوزمتكس','كي كي دبليو بيوتي','رير بيوتي'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc45', text:'من الممثل الذي فاز بأوسكار أفضل ممثل لعامين متتاليين في التسعينيات؟', options:['توم هانكس','دانيال دي لويس','دنزل واشنطن','شون بن'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc46', text:'من المخرج الأكثر فوزًا بجائزة أوسكار أفضل إخراج؟', options:['جون فورد','ستيفن سبيلبرغ','مارتن سكورسيزي','بيلي وايلدر'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc47', text:'من الفنان الأكثر تتويجًا بجوائز الغرامي حتى الآن؟', options:['بيونسيه','كوينسي جونز','جورج شولتي','تايلور سويفت'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc48', text:'في أي مدينة وُلد كيانو ريفز؟', options:['بيروت','لوس أنجلوس','تورونتو','أوكلاند'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc49', text:'عن أي فيلم فازت ميريل ستريب بأول أوسكار لها؟', options:['كرامر ضد كرامر','اختيار صوفي','السيدة الحديدية','صيد الغزال'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc50', text:'ما الاسم الحقيقي لإمينيم؟', options:['مارشال بروس ماذرز الثالث','كرتس جيمس جاكسون الثالث','كريستوفر براين بريدجز','كالفن كوردوزار برودوس الابن'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc51', text:'ما الاسم عند الميلاد لإلتون جون؟', options:['ريجينالد كينيث دوايت','ديفيد روبرت جونز','غوردون ماثيو توماس سمنر','بول هيوسن'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc52', text:'أي موسيقي ابتكر شخصية زيغي ستاردست؟', options:['ديفيد بوي','برنس','إيغي بوب','ميك جاغر'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc53', text:'من اللاعب الملقّب باليوناني المرعب؟', options:['يانيس أنتيتوكونمبو','نيكولا يوكيتش','لوكا دونتشيتش','باو غاسول'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc54', text:'من الممثلة التي فازت بالأوسكار عن فيلم الساعات (2002)؟', options:['نيكول كيدمان','جوليان مور','كيت بلانشيت','تشارليز ثيرون'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc55', text:'من الممثل الذي فاز بالأوسكار بعد وفاته عن دور الجوكر؟', options:['هيث ليدجر','فيليب سيمور هوفمان','تشادويك بوسمان','بيتر فينش'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc56', text:'ما اسم جولة تايلور سويفت 2023–2024؟', options:['ذا إيراز تور','جولة 1989','جولة ريبوتيشن','لوفر فِست'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc57', text:'من الممثل الوحيد الحاصل على ثلاث جوائز أوسكار أفضل ممثل؟', options:['دانيال دي لويس','جاك نيكلسون','آل باتشينو','أنتوني هوبكنز'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc58', text:'ما الاسم عند الميلاد لبراد بيت؟', options:['وليام برادلي بيت','كريستوفر بيتمن','برادلي ويليام كوبر','توماس جيفري هانكس'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc59', text:'ما الاسم الفني لغوردون ماثيو توماس سمنر؟', options:['ستينغ','بونو','سلاش','سيل'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fc60', text:'من مؤسس علامة أوف-وايت للأزياء؟', options:['فيرجيل أبلوه','توم فورد','أوليفييه روستان','ريكاردو تِتشي'], correctIndex:0, difficulty:'hard', points:400 }
]};
data.categories.push({ id:foreignCelebs.id, name:foreignCelebs.name, icon:foreignCelebs.icon, questions: prepQuestions(foreignCelebs.qs) });
// ==================== 15 جيم أوف ثرونز ==============================================================================================
var got = { id:'got', name:'جيم أوف ثرونز', icon:'🐲', qs:[
// سهل
{ id:'got1', text:'كم عدد مواسم مسلسل جيم أوف ثرونز؟', options:['8','7','6','9'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got2', text:'ما الشبكة التي أنتجت المسلسل؟', options:['إتش بي أو','نتفليكس','أمازون برايم فيديو','إيه إم سي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got3', text:'ما عاصمة الممالك السبع؟', options:['كينغز لاندينغ','وينترفيل','برافوس','دورن'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got4', text:'ما اسم قلعة آل ستارك؟', options:['وينترفيل','التوأمان','الإيري (العشّ)','هارنهال'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got5', text:'ما اسم القارة التي تقع فيها الممالك السبع؟', options:['ويستروس','إيسوس','سوثوريوس','فاليريا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got6', text:'ما لقب دينيرس تارجاريان؟', options:['أم التنانين','ملكة الأشواك','السيدة الحمراء','روح الشمال'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got7', text:'أيٌّ من التالي اسم أحد تنانين دينيرس؟', options:['درُوغون','سموغ','راثيون','سبايرو'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got8', text:'ما اسم الجدار الجليدي الضخم في الشمال؟', options:['الجدار','الجرف','المرصد','الحد العظيم'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got9', text:'من يحرس الجدار ويرتدي السواد؟', options:['حرس الليل','الحرس الذهبي','اللاملوّثون','أبناء الهاربي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got10', text:'ما لقب غريغور كليغان؟', options:['الجبل','الكلب','الذئب','النمر'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got11', text:'ما لقب ساندور كليغان؟', options:['الكلب','الغراب','الثعلب','الصقر'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got12', text:'ما اسم ذئب جون سنو الرهيب؟', options:['غوست','سمر','نايميريا','غراي ويند'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got13', text:'شعار آل ستارك هو؟', options:['ذئب رهيب','أسد ذهبي','غزال متوّج','كراكن'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got14', text:'شعار آل لانيستر هو؟', options:['أسد ذهبي','ذئب رهيب','أخطبوط','سيفان متقاطعان'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got15', text:'كلمات آل ستارك الشهيرة؟', options:['الشتاء قادم','اسمعوا زئيري','النار والدم','نحن لا نزرع'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got16', text:'من زوج دينيرس من الدوثراكي؟', options:['خالد دروغو','جوراه مورمونت','داريو ناهاريس','إيورون غريجوي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got17', text:'من هو الأخ التوأم لسيرسي لانيستر؟', options:['جيمي لانيستر','تايوين لانيستر','تيريون لانيستر','لوراس تايريل'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got18', text:'إلى أي بيت ينتمي تيريون؟', options:['لانيستر','ستارك','تارغيريان','غريجوي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got19', text:'ما اسم القلعة الجزيرة مقرّ آل تارجاريان؟', options:['دراجونستون','هايغاردن','بوابة القمر','هارنهال'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'got20', text:'ما اسم القارة شرق البحر الضيق؟', options:['إيسوس','سوثوريوس','فاليريا','أثمان'], correctIndex:0, difficulty:'easy', points:100 },
// متوسط
{ id:'got21', text:'ما اسم سيف جون سنو المصنوع من الفولاذ الفاليري؟', options:['لونغكلو','آيس','عويل الأرملة','حافظة القسم'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got22', text:'من درّب آريا ستارك على المبارزة في كينغز لاندينغ؟', options:['سيريو فوريل','جاكن هغار','برين أوف تارث','نيد ستارك'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got23', text:'إلى أي إله تتبع جماعة الوجوه بلا ملامح؟', options:['الإله عديد الوجوه','إله الغرق','ربّ النور','الآلهة السبعة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got24', text:'في أي مدينة يوجد بيت الأسود والأبيض؟', options:['برافوس','ميرين','فولنتس','كارت'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got25', text:'من ابن سيرسي الأكبر؟', options:['جوفري','تومِن','لوراس','بران'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got26', text:'من كانت العقل المدبر لقتل الملك جوفري؟', options:['أولينا تايريل','بيتر بايليش','سيرسي لانيستر','مارجيري تايريل'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got27', text:'من قتل تايوين لانيستر؟', options:['تيريون لانيستر','جيمي لانيستر','برون','آريا ستارك'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got28', text:'من أُعلن ملك الشمال في نهاية الموسم السادس؟', options:['جون سنو','روبين آرين','ستانيس باراثيون','رامزي بولتون'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got29', text:'من قتلت رامزي بولتون؟', options:['سانسا ستارك','جون سنو','ثيون غريجوي','بران ستارك'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got30', text:'ما اسم شقيق دينيرس الذي طمع في العرش؟', options:['فيسيريس تارجاريان','ريغار تارجاريان','أيمون تارجاريان','إيغون تارجاريان'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got31', text:'ما اسم المادة الخضراء التي استُخدمت في معركة بلاك ووتر؟', options:['النار البرية','الدراجون غلاس','الزيت الحار','بارود القلعة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got32', text:'ما اسم معقل آل فراي عند النهر؟', options:['التوأمان','هارنهال','ريفررن','هايغاردن'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got33', text:'ما اسم أخت ثيون غريجوي في المسلسل؟', options:['يارا','آشا','ليانا','إيلاريا'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got34', text:'إلى أي إله تؤمن ميليساندرا؟', options:['ربّ النور (رهلور)','الإله عديد الوجوه','إله الغرق','الآلهة السبعة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got35', text:'ما كلمات بيت تارجاريان؟', options:['النار والدم','نحن لا نزرع','اسمعوا زئيري','الشتاء قادم'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got36', text:'من قتل ملك الليل؟', options:['آريا ستارك','جون سنو','بران ستارك','دينيرس تارجاريان'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got37', text:'من هو "ليتل فينغر"؟', options:['بيتر بايليش','فاريس','قايبرن','تورموند'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got38', text:'من مستشار الأسرار الملقّب بـ"العنكبوت"؟', options:['فاريس','بيتر بايليش','قايبرن','بادريك'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got39', text:'ما اسم جيش الخصيان الذي يخدم دينيرس؟', options:['اللاملوّثون (Unsullied)','الدوثراكي','أبناء الهاربي','الحرس الذهبي'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'got40', text:'ما اسم القلعة المرتفعة في الوادي (فالي)؟', options:['الإيري (العشّ)','بوابة القمر','هايغاردن','ريفررن'], correctIndex:0, difficulty:'medium', points:200 },
// صعب
{ id:'got41', text:'كم عدد حلقات المسلسل؟', options:['73','70','75','80'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got42', text:'من هما والدا جون سنو الحقيقيان؟', options:['ريغار تارجاريان وليانا ستارك','روبرت باراثيون وليانا ستارك','نيد ستارك وكاتلين تولي','إيغون تارجاريان وداينا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got43', text:'ما اسم السيف الضخم لآل ستارك المصنوع من الفولاذ الفاليري؟', options:['آيس','لونغكلو','عويل الأرملة','حافظة القسم'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got44', text:'إلى أي سيفين أُعيدت صياغة "آيس"؟', options:['حافظة القسم وعويل الأرملة','لونغكلو وحافظة القسم','آيس ولونغكلو','السهم الأسود وحافظة القسم'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got45', text:'جون سنو هو اللورد القائد رقم كم لحرس الليل؟', options:['998','997','999','1000'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got46', text:'ما اسم سيف آريا ستارك الصغير؟', options:['إبرة','شوكة','السهم','الشعاع'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got47', text:'أين وُلدت دينيرس (ستورم بورن)؟', options:['دراجونستون','بنتوس','ميرين','فاليريا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got48', text:'من وجّه الطعنة القاتلة لروب ستارك؟', options:['روز بولتون','والدر فراي','رامزي بولتون','تايوين لانيستر'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got49', text:'من قتلت والدر فراي انتقامًا للزفاف الأحمر؟', options:['آريا ستارك','سانسا ستارك','برين أوف تارث','كاتلين ستارك'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got50', text:'من كان قائد حرس المدينة (العباءات الذهبية) الذي خان نِد ستارك؟', options:['جانوس سلينت','مِرين ترانت','إيلين باين','مانس رايدر'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got51', text:'رمز بيت غريجوي هو؟', options:['الكراكن','الغزال المتوَّج','الأسد الذهبي','السمكة الفضية'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got52', text:'ما عاصمة إقليم دورن؟', options:['سنسبير','هايغاردن','ريفررن','أولدتاون'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got53', text:'ما اسم سيف جوفري المصنوع من الفولاذ الفاليري؟', options:['عويل الأرملة','حافظة القسم','لونغكلو','آيس'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got54', text:'ما اسم السيف الذي أعطاه جيمي لانيستر لبرين؟', options:['حافظة القسم','عويل الأرملة','لونغكلو','آيس'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got55', text:'ما اللقب الذي يحمله بران ستارك في المواسم الأخيرة؟', options:['الغراب ذو الثلاث عيون','ملك الشمال','الذئب الرمادي','الممسوس'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got56', text:'من العالم الذي أعاد غريغور كليغان (الجبل) للحياة؟', options:['قايبرن','بايسل','فاريس','تايوين'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got57', text:'من التي أدارت طقوس حرق شيرين باراثيون؟', options:['ميليساندرا','سيرسي لانيستر','كاتلين ستارك','ديانيرا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got58', text:'أي مدينة في خليج العبيد حكمتها دينيرس لفترة؟', options:['ميرين','يُنْكاي','أستابور','فولانتس'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got59', text:'كم تنينًا بقي مع دينيرس مع نهاية السلسلة؟', options:['واحد','اثنان','ثلاثة','لا شيء'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'got60', text:'من قتل الملك المجنون إيريس الثاني؟', options:['جيمي لانيستر','نيد ستارك','روبرت باراثيون','تايوين لانيستر'], correctIndex:0, difficulty:'hard', points:400 }
]};
data.categories.push({ id:got.id, name:got.name, icon:got.icon, questions: prepQuestions(got.qs) });
// ==================== 16 كرة قدم ==============================================================================================
var football = { id:'football', name:'كرة قدم', icon:'⚽', qs:[
// سهل
{ id:'fb1', text:'من الفائز بكأس العالم 2022؟', options:['الأرجنتين','فرنسا','البرازيل','ألمانيا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb2', text:'من يُعرف بلقب "الدون"؟', options:['كريستيانو رونالدو','لوكا مودريتش','سيرخيو راموس','دييغو كوستا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb3', text:'من يُعرف بلقب "البرغوث"؟', options:['ليونيل ميسي','نيمار','سيرخيو أغويرو','باولو ديبالا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb4', text:'يلعب محمد صلاح لنادٍ إنجليزي هو؟', options:['ليفربول','تشيلسي','آرسنال','إيفرتون'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb5', text:'أكثر نادٍ تتويجًا بدوري أبطال أوروبا؟', options:['ريال مدريد','ميلان','بايرن ميونخ','برشلونة'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb6', text:'أكثر منتخب فوزًا بكأس العالم؟', options:['البرازيل','ألمانيا','إيطاليا','الأرجنتين'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb7', text:'بطل كأس أمم أوروبا 2024؟', options:['إسبانيا','إنجلترا','إيطاليا','ألمانيا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb8', text:'مباراة ريال مدريد وبرشلونة تُسمّى؟', options:['الكلاسيكو','الديربي','السوبركلاسيكو','السوبر'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb9', text:'ملعب برشلونة يُعرف باسم؟', options:['كامب نو','سانتياغو برنابيو','أولد ترافورد','أنفيلد'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb10', text:'أول منتخب عربي يصل لنصف نهائي كأس العالم؟', options:['المغرب','مصر','السعودية','الجزائر'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb11', text:'الهدّاف التاريخي لكأس العالم؟', options:['ميروسلاف كلوزه','رونالدو نازاريو','بيليه','غيرد مولر'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb12', text:'مهد كرة القدم الحديثة؟', options:['إنجلترا','إسبانيا','إيطاليا','أوروغواي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb13', text:'أين أُقيمت كأس العالم 2022؟', options:['قطر','روسيا','البرازيل','جنوب أفريقيا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb14', text:'مدرب مانشستر سيتي منذ 2016؟', options:['بيب غوارديولا','يورغن كلوب','زين الدين زيدان','توماس توخيل'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb15', text:'بطل دوري أبطال أوروبا 2024؟', options:['ريال مدريد','مانشستر سيتي','إنتر ميلان','بايرن ميونخ'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb16', text:'من يُعرف بـ"السبيشل وان"؟', options:['جوزيه مورينيو','كارلو أنشيلوتي','أنطونيو كونتي','دييغو سيميوني'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb17', text:'ملعب ريال مدريد؟', options:['سانتياغو برنابيو','الميستايا','كامب نو','الماراكانا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb18', text:'بطل الدوري الإنجليزي 2023-24؟', options:['مانشستر سيتي','آرسنال','ليفربول','تشيلسي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb19', text:'أكثر المنتخبات تتويجًا بكأس أمم أفريقيا؟', options:['مصر','الكاميرون','غانا','نيجيريا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'fb20', text:'المنتخب الملقّب بـ"الساموراي الأزرق"؟', options:['اليابان','كوريا الجنوبية','الصين','أستراليا'], correctIndex:0, difficulty:'easy', points:100 },
// متوسط
{ id:'fb21', text:'كم عدد تتويجات ريال مدريد بدوري الأبطال؟', options:['15','14','13','12'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb22', text:'كم مرة فازت البرازيل بكأس العالم؟', options:['5','4','6','3'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb23', text:'من فاز بكأس العالم 2018؟', options:['فرنسا','كرواتيا','ألمانيا','إسبانيا'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb24', text:'الهدّاف التاريخي لدوري أبطال أوروبا؟', options:['كريستيانو رونالدو','ليونيل ميسي','روبرت ليفاندوفسكي','كريم بنزيما'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb25', text:'أكثر لاعب تُوِّج بالكرة الذهبية (Ballon d’Or)؟', options:['ليونيل ميسي','كريستيانو رونالدو','يوهان كرويف','ميشيل بلاتيني'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb26', text:'أين أُقيمت كأس العالم 2014؟', options:['البرازيل','روسيا','جنوب أفريقيا','ألمانيا'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb27', text:'من سجل هدف الفوز في نهائي كأس العالم 2014؟', options:['ماريو غوتزه','ليونيل ميسي','توماس مولر','نيمار'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb28', text:'أين لُعب نهائي دوري الأبطال 2024؟', options:['ويمبلي - لندن','الأولمبيكو - روما','سان دوني - باريس','ملعب النور - لشبونة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb29', text:'كم لاعبًا يبدأ لكل فريق داخل الملعب؟', options:['11','10','12','9'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb30', text:'ما مدة المباراة الأساسية؟', options:['90 دقيقة','80 دقيقة','100 دقيقة','70 دقيقة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb31', text:'بطل أمم أوروبا 2016؟', options:['البرتغال','فرنسا','ألمانيا','إيطاليا'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb32', text:'من يُعرف بلقب "الشياطين الحمر" (نادي)؟', options:['مانشستر يونايتد','ليفربول','آرسنال','ميلان'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb33', text:'لقب "الروسونيري" يعود إلى نادي؟', options:['ميلان','إنتر','يوفنتوس','روما'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb34', text:'هدّاف كأس العالم 2022؟', options:['كيليان مبابي','ليونيل ميسي','أوليفيه جيرو','جوليان ألفاريز'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb35', text:'أفضل لاعب في كأس العالم 2022؟', options:['ليونيل ميسي','لوكا مودريتش','كيليان مبابي','أنطوان غريزمان'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb36', text:'كم بطولة أمم أفريقيا حققتها مصر؟', options:['7','6','8','5'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb37', text:'بطل كأس آسيا 2007؟', options:['العراق','السعودية','اليابان','أستراليا'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb38', text:'أول منتخب عربي شارك في كأس العالم؟', options:['مصر 1934','المغرب 1970','تونس 1978','العراق 1986'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb39', text:'طرفا "ديربي إيطاليا" (Derby d’Italia)؟', options:['يوفنتوس وإنتر','ميلان وإنتر','يوفنتوس وتورينو','روما ولاتسيو'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'fb40', text:'المدرب الذي قاد ريال مدريد لثلاثة ألقاب أبطال 2016–2018؟', options:['زين الدين زيدان','كارلو أنشيلوتي','رافا بينيتيز','جوزيه مورينيو'], correctIndex:0, difficulty:'medium', points:200 },
// صعب
{ id:'fb41', text:'كم كانت نتيجة نهائي كأس العالم 2022 قبل ركلات الترجيح؟', options:['3-3','2-2','1-1','4-4'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb42', text:'في أي سنة تأسس نادي ريال مدريد؟', options:['1902','1899','1905','1912'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb43', text:'صاحب الرقم القياسي في عدد المباريات الدولية؟', options:['كريستيانو رونالدو','بدر المطوع','سيرخيو راموس','أحمد حسن'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb44', text:'أول فريق إسباني حقق الثلاثية (دوري+كأس+دوري الأبطال) في موسم واحد؟', options:['برشلونة','ريال مدريد','أتلتيكو مدريد','فالنسيا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb45', text:'أسرع هدف في تاريخ كأس العالم؟', options:['هاكان شوكور','كريستيانو رونالدو','ديفيد فيا','يورغن كلينسمان'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb46', text:'اسم الحكم الذي أدار نهائي كأس العالم 2022؟', options:['شيمون مارتشينياك','نيستور بيتانا','هاورد ويب','فيليكس بريش'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb47', text:'من فاز بأول كأس عالم 1930؟', options:['أوروغواي','الأرجنتين','البرازيل','إيطاليا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb48', text:'كم مرة فازت ألمانيا بكأس العالم؟', options:['4','3','5','2'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb49', text:'كم ناديًا توّج بثلاثة ألقاب متتالية لكأس أوروبا/دوري الأبطال؟', options:['3','2','4','5'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb50', text:'في أي مدينة يقع ملعب سيغنال إيدونا بارك؟', options:['دورتموند','ميونخ','برلين','جلزنكرشن'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb51', text:'ما نتيجة نهائي دوري الأبطال 2024 بين ريال مدريد ودورتموند؟', options:['2-0 لريال مدريد','1-0 لريال مدريد','2-1 لريال مدريد','3-1 لريال مدريد'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb52', text:'كم هدفًا سجّل ميروسلاف كلوزه في كأس العالم؟', options:['16','15','14','13'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb53', text:'من من هؤلاء سجّل هاتريك في نهائي كأس العالم؟', options:['كيليان مبابي','زين الدين زيدان','غابرييل باتيستوتا','جيرد مولر'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb54', text:'أين استُضيفت كأس العالم 2002؟', options:['كوريا الجنوبية واليابان','اليابان فقط','كوريا الجنوبية فقط','الصين'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb55', text:'كم المسافة بين القائمين في مرمى كرة القدم؟', options:['7.32 متر','7.12 متر','7.50 متر','8.00 متر'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb56', text:'كم ارتفاع العارضة عن الأرض؟', options:['2.44 متر','2.20 متر','2.50 متر','2.75 متر'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb57', text:'أي نادٍ فاز بالدوري الإنجليزي دون هزيمة في موسم 2003-04؟', options:['آرسنال','مانشستر يونايتد','تشيلسي','ليفربول'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb58', text:'من المدرب الأكثر تتويجًا بدوري أبطال أوروبا؟', options:['كارلو أنشيلوتي','زين الدين زيدان','بيب غوارديولا','أليكس فيرغسون'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb59', text:'ما اسم أكاديمية برشلونة الشهيرة لإعداد المواهب؟', options:['لا ماسيا','فالفيردي','لامانتيا','لا فونتين'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'fb60', text:'كم عدد المنتخبات المشاركة في كأس العالم 2026؟', options:['48','40','32','36'], correctIndex:0, difficulty:'hard', points:400 }
]};
data.categories.push({ id:football.id, name:football.name, icon:football.icon, questions: prepQuestions(football.qs) });
// ==================== 17 العراق ==============================================================================================
var iraq = { id:'iraq', name:'العراق', icon:'🇮🇶', qs:[
// سهل
{ id:'iq1', text:'ما عاصمة العراق؟', options:['بغداد','الموصل','البصرة','أربيل'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq2', text:'أي نهر يمر في بغداد؟', options:['دجلة','الفرات','النيل','العاصي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq3', text:'ما النهران الرئيسيان في العراق؟', options:['دجلة والفرات','النيل والفرات','دجلة والنيل','كارون والكرخة'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq4', text:'ما عملة العراق؟', options:['الدينار العراقي','الجنيه العراقي','الليرة العراقية','الريال العراقي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq5', text:'أي محافظة عراقية تطل على الخليج العربي؟', options:['البصرة','ذي قار','واسط','ميسان'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq6', text:'يُعرف العراق تاريخيًا باسم؟', options:['بلاد الرافدين','بلاد الشام','بلاد المغرب','بلاد السِّند'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq7', text:'ما لقب بغداد التاريخي؟', options:['مدينة السلام','مدينة الشمس','عروس البحر','أم الدنيا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq8', text:'ما لقب منتخب العراق لكرة القدم؟', options:['أسود الرافدين','نسور قاسيون','الأخضر','أسود الأطلس'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq9', text:'طبق السمك البغدادي الشهير؟', options:['المسكوف','الكبسة','المنسف','الفتة'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq10', text:'عاصمة إقليم كردستان العراق؟', options:['أربيل','السليمانية','دهوك','كركوك'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq11', text:'كم لغة رسمية للعراق حسب الدستور؟', options:['لغتان','لغة واحدة','ثلاث لغات','أربع لغات'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq12', text:'ما العبارة المكتوبة على العلم العراقي؟', options:['الله أكبر','لا إله إلا الله','الوطن أولًا','وطن شرف إخلاص'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq13', text:'أي مدينة يمر بها شط العرب؟', options:['البصرة','النجف','كربلاء','الرمادي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq14', text:'أكبر محافظة عراقية من حيث المساحة؟', options:['الأنبار','نينوى','ذي قار','صلاح الدين'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq15', text:'الأثر السومري الشهير قرب الناصرية؟', options:['زقورة أور','قلعة أربيل','قلعة صلاح الدين','قلعة سمأل'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq16', text:'أي مدينة أثرية اشتهرت ببوابة عشتار؟', options:['بابل','نينوى','الحضر','آشور'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq17', text:'ما الميناء البحري الرئيسي في العراق؟', options:['ميناء أم قصر','ميناء جدة الإسلامي','ميناء عدن','ميناء الفاو'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq18', text:'من الشاعر العراقي الرائد في الشعر الحر؟', options:['بدر شاكر السياب','محمد مهدي الجواهري','نزار قباني','أحمد شوقي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq19', text:'مدينة عراقية تشتهر بـ"المنارة الحدباء"?', options:['الموصل','بغداد','كربلاء','الكوت'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'iq20', text:'ما رمز الاتصال الدولي للعراق؟', options:['+964','+966','+20','+90'], correctIndex:0, difficulty:'easy', points:100 },
// متوسط
{ id:'iq21', text:'في أي سنة نال العراق استقلاله (الانضمام لعصبة الأمم)؟', options:['1932','1921','1945','1958'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq22', text:'من مؤسس مدينة بغداد العباسية؟', options:['أبو جعفر المنصور','هارون الرشيد','المأمون','المعتصم'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq23', text:'عاصمة محافظة نينوى هي؟', options:['الموصل','تكريت','الحلّة','بعقوبة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq24', text:'يتكوّن شط العرب من التقاء نهري؟', options:['دجلة والفرات','الخابور والبردى','الزابين الكبير والصغير','كارون والكرخة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq25', text:'اسم نظام الكتابة الأقدم في بلاد الرافدين؟', options:['المسمارية','الهيروغليفية','الفينيقية','اليونانية'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq26', text:'أكبر سد مائي في العراق؟', options:['سد الموصل','سد حديثة','سد دوكان','سد دربندخان'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq27', text:'أكبر بحيرة في العراق؟', options:['بحيرة الثرثار','بحيرة الحبانية','بحيرة دوكان','بحيرة سد الموصل'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq28', text:'أهم مورد اقتصادي للعراق؟', options:['النفط','القمح','القطن','الذهب'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq29', text:'الألوان الأساسية لعلم العراق؟', options:['أحمر وأبيض وأسود','أخضر وأبيض وأحمر','أزرق وأبيض وأحمر','أسود وأبيض وأخضر'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq30', text:'تشتهر النجف الأشرف بوجود مرقد؟', options:['الإمام علي بن أبي طالب','الإمام الحسين','الإمام موسى الكاظم','الإمام الرضا'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq31', text:'تشتهر كربلاء بمرقد؟', options:['الإمام الحسين','الإمام علي','الإمام الجواد','الإمام الصادق'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq32', text:'أين يقع "المتحف العراقي"؟', options:['بغداد','البصرة','الموصل','كركوك'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq33', text:'مطار دولي في إقليم كردستان العراق؟', options:['مطار أربيل الدولي','مطار بغداد الدولي','مطار النجف','مطار البصرة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq34', text:'أي من التالي مدينة أثرية في محافظة نينوى؟', options:['الحضر','بابل','أور','واسط'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq35', text:'عاصمة محافظة الأنبار؟', options:['الرمادي','الفلوجة','بعقوبة','الكوت'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq36', text:'عاصمة محافظة صلاح الدين؟', options:['تكريت','سامراء','الرمادي','الموصل'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq37', text:'من صاحب "نصب الحرية" في ساحة التحرير ببغداد؟', options:['جواد سليم','فائق حسن','رفعت الجادرجي','محمد غني حكمت'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq38', text:'عازف عود عراقي شهير عالميًا؟', options:['منير بشير','فريد الأطرش','رياض السنباطي','سيد مكاوي'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq39', text:'يقع طاق كسرى (إيوان المدائن) قرب أي مدينة؟', options:['بغداد','كربلاء','الناصرية','الحلّة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'iq40', text:'عاصمة محافظة واسط؟', options:['الكوت','الحلّة','بعقوبة','الرمادي'], correctIndex:0, difficulty:'medium', points:200 },
// صعب
{ id:'iq41', text:'في أي عام أُعلنت الجمهورية العراقية (سقوط الملكية)؟', options:['1958','1963','1968','1979'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq42', text:'من أول ملوك العراق الحديث؟', options:['الملك فيصل الأول','الملك غازي','الملك فيصل الثاني','الأمير عبد الإله'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq43', text:'ما أعلى قمة جبلية في العراق؟', options:['جبل شيخا دار','هلكورد','حمرين','قنديل'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq44', text:'أي من التالي ليس ضمن قائمة التراث العالمي لليونسكو في العراق؟', options:['قلعة أربيل','الحضر','مدينة سامراء الأثرية','بابل'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq45', text:'أي نهرين يُعدان من روافد دجلة الرئيسيين؟', options:['الزاب الكبير والزاب الصغير','الخابور والبليخ','كارون والكرخة','العاصي والليطاني'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq46', text:'في أي سنة تأسست جامعة بغداد؟', options:['1957','1948','1963','1975'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq47', text:'مدينة عراقية تقع في أقصى الجنوب على الخليج؟', options:['الفاو','الرفاعي','سامراء','تلعفر'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq48', text:'اسم أول جريدة عراقية (1869)؟', options:['الزوراء','الزمان','العراق','المشرق'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq49', text:'كم عدد الأقاليم المعترف بها اتحاديًا في العراق؟', options:['إقليم واحد','إقليمان','لا أقاليم','ثلاثة أقاليم'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq50', text:'أي محافظة تشتهر بوجود "زقورة عكركوف"؟', options:['بغداد','كركوك','نينوى','ذي قار'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq51', text:'أي مدينة عراقية لُقّبت قديمًا بـ"أم الربيعين"؟', options:['الموصل','كركوك','السليمانية','الحلّة'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq52', text:'شارك منتخب العراق في كأس العالم مرة واحدة؛ في أي سنة؟', options:['1986','1982','1990','1994'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq53', text:'فاز العراق بكأس آسيا مرة واحدة؛ في أي سنة؟', options:['2007','2011','2015','1996'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq54', text:'ما اسم السهل الزراعي الكبير في وسط وجنوب العراق؟', options:['السهل الرسوبي','سهل الهرمل','سهل البقاع','سهل الجليل'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq55', text:'ما الاسم الأثري لموقع مدينة آشور؟', options:['قلعة الشرقاط','نمرود','نينوى','خورسباد'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq56', text:'ما اسم مئذنة سامراء الحلزونية الشهيرة؟', options:['الملوية','الحدباء','الزرقاء','العباسية'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq57', text:'من الشاعر العراقي الملقّب بـ"شاعر العرب الأكبر"؟', options:['محمد مهدي الجواهري','بدر شاكر السياب','عبد الوهاب البياتي','جميل صدقي الزهاوي'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq58', text:'اختيرت بغداد عاصمة للثقافة العربية في أي عام؟', options:['2013','2009','2016','2019'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq59', text:'أي مدينة تضم "قلعة كركوك"؟', options:['كركوك','دهوك','السليمانية','حلبجة'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'iq60', text:'أي بحيرة تقع بين محافظتي كربلاء والأنبار؟', options:['بحيرة الرزازة','بحيرة الحبانية','بحيرة دوكان','بحيرة الثرثار'], correctIndex:0, difficulty:'hard', points:400 }
]};
data.categories.push({ id:iraq.id, name:iraq.name, icon:iraq.icon, questions: prepQuestions(iraq.qs) });
// ==================== 18  ماركات ==============================================================================================
var brands = { id:'brands', name:'ماركات', icon:'🏷️', qs:[
// سهل
{ id:'br1', text:'أي شركة شعارها تفاحة مقضومة؟', options:['أبل','سامسونج','هواوي','شاومي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br2', text:'أي شركة شعارها علامة الصح (Swoosh)؟', options:['نايكي','أديداس','بوما','ريبوك'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br3', text:'أديداس تنحدر من أي بلد؟', options:['ألمانيا','إيطاليا','إسبانيا','الولايات المتحدة'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br4', text:'بوما تنحدر من أي بلد؟', options:['ألمانيا','إيطاليا','فرنسا','السويد'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br5', text:'ماركة غوتشي من أي بلد؟', options:['إيطاليا','فرنسا','إسبانيا','الولايات المتحدة'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br6', text:'ماركة لويس فويتون من أي بلد؟', options:['فرنسا','إيطاليا','سويسرا','إسبانيا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br7', text:'من مؤسِّسة ماركة شانيل؟', options:['كوكو شانيل','دوناتيللا فيرساتشي','ميوتشيا برادا','آنا وينتور'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br8', text:'ماركة زارا من أي بلد؟', options:['إسبانيا','إيطاليا','فرنسا','البرتغال'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br9', text:'إيكيا تنحدر من أي بلد؟', options:['السويد','الدنمارك','النرويج','فنلندا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br10', text:'سامسونج من أي بلد؟', options:['كوريا الجنوبية','الصين','اليابان','تايوان'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br11', text:'كوكاكولا شركة من؟', options:['الولايات المتحدة','المملكة المتحدة','ألمانيا','كندا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br12', text:'بيبسي شركة من؟', options:['الولايات المتحدة','فرنسا','إيطاليا','الهند'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br13', text:'تويوتا شركة من؟', options:['اليابان','كوريا الجنوبية','الصين','الولايات المتحدة'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br14', text:'مرسيدس-بنز شركة من؟', options:['ألمانيا','فرنسا','إيطاليا','السويد'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br15', text:'هواوي شركة من؟', options:['الصين','كوريا الجنوبية','اليابان','سنغافورة'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br16', text:'ديور من أي بلد؟', options:['فرنسا','إيطاليا','إسبانيا','سويسرا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br17', text:'نتفليكس متخصصة في؟', options:['بث المحتوى الترفيهي','معدات الشبكات','الألعاب الإلكترونية','السيارات'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br18', text:'المنتج الأساسي لعلامة ريد بُل؟', options:['مشروب طاقة','قهوة','مياه معدنية','شاي مثلّج'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br19', text:'ستاربكس معروفة بـ؟', options:['القهوة والمقاهي','الملابس الرياضية','الأجهزة الذكية','السيارات'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'br20', text:'ماكدونالدز متخصّصة في؟', options:['الوجبات السريعة','الحلوى الفاخرة','المخبوزات فقط','المأكولات البحرية'], correctIndex:0, difficulty:'easy', points:100 },
// متوسط
{ id:'br21', text:'الشعار الإعلاني "Just Do It" يعود إلى؟', options:['نايكي','أديداس','بوما','ريبوك'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br22', text:'الشعار "Think Different" يعود إلى؟', options:['أبل','مايكروسوفت','غوغل','سامسونج'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br23', text:'الشعار "I\'m Lovin\' It" يعود إلى؟', options:['ماكدونالدز','كينتاكي','برغر كينغ','هارديز'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br24', text:'الشعار "Because You\'re Worth It" يعود إلى؟', options:['لوريال باريس','ميبيلين','إستي لودر','ريفـلون'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br25', text:'الشعار "Impossible Is Nothing" يعود إلى؟', options:['أديداس','نايكي','بوما','أندر آرمور'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br26', text:'الشعار "The Ultimate Driving Machine" يعود إلى؟', options:['بي إم دبليو','مرسيدس-بنز','أودي','بورشه'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br27', text:'الشعار "Vorsprung durch Technik" يعود إلى؟', options:['أودي','بي إم دبليو','مرسيدس-بنز','فولكس فاغن'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br28', text:'الشعار "Taste the Feeling" يعود إلى؟', options:['كوكاكولا','بيبسي','ريد بُل','سبرايت'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br29', text:'الشعار "Have a break, have a KitKat" يعود إلى؟', options:['كيت كات','سنكرس','مارس','تويكس'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br30', text:'اختصار KFC يعني؟', options:['كنتاكي فرايد تشيكن','كنتاكي فريش كوفي','كانساس فود كومباني','كينووا فودز كورب'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br31', text:'"بي إم دبليو" اختصار لـ؟', options:['بايريشه موتورِن فيركه (مصانع المحركات البافارية)','برلين موتور وركس','بافاريا موتور كومباني','بافاريا كار ووركس'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br32', text:'H&M من أي بلد؟', options:['السويد','ألمانيا','فرنسا','هولندا'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br33', text:'Uniqlo من أي بلد؟', options:['اليابان','كوريا الجنوبية','الصين','تايوان'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br34', text:'المجموعة الأم لعلامة لويس فويتون؟', options:['LVMH','كيرينغ','ريتشمونت','إنديتكس'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br35', text:'Nespresso تتبع شركة؟', options:['نستله','كوكاكولا','بيبسيكو','دانون'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br36', text:'PlayStation علامة تابعة لـ؟', options:['سوني','نينتندو','مايكروسوفت','سيغا'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br37', text:'"أليكسا" مساعد صوتي تابع لـ؟', options:['أمازون','غوغل','أبل','مايكروسوفت'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br38', text:'iPhone منتج من؟', options:['أبل','سامسونج','شاومي','هواوي'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br39', text:'سلسلة Galaxy للهواتف تعود إلى؟', options:['سامسونج','سوني','نوكيا','أوبو'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'br40', text:'نظام التشغيل Windows من شركة؟', options:['مايكروسوفت','غوغل','أبل','أوراكل'], correctIndex:0, difficulty:'medium', points:200 },
// صعب
{ id:'br41', text:'في أي عام تم ابتكار مشروب كوكاكولا؟', options:['1886','1892','1905','1878'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br42', text:'تأسست نايكي (Blue Ribbon Sports) عام؟', options:['1964','1971','1958','1968'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br43', text:'من صمّمت شعار نايكي (Swoosh)؟', options:['كارولاين ديفيدسون','باولا شير','سوزان كير','إيرمين غيل'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br44', text:'مؤسس أديداس هو؟', options:['أدولف داسلر','رودولف داسلر','هيربرت هاينر','ديتر زيتشه'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br45', text:'اسم "أديداس" مشتق من؟', options:['اختصار لاسم أدولف (أدي) داسلر','العبارة اللاتينية "Ad Astra"','اسم مدينة ألمانية','أحرف عشوائية'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br46', text:'تأسست لويس فويتون عام؟', options:['1854','1864','1884','1894'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br47', text:'تأسست هيرميس (Hermès) عام؟', options:['1837','1883','1900','1850'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br48', text:'IKEA اختصار لـ؟', options:['Ingvar Kamprad Elmtaryd Agunnaryd','International Kitchen European Association','Innovative Kitchen European Appliances','Ivar Karl European AB'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br49', text:'مقر شركة سوني الرئيسي؟', options:['طوكيو','أوساكا','سيول','شنغهاي'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br50', text:'أُطلق طراز بورشه 911 لأول مرة عام؟', options:['1964','1959','1971','1968'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br51', text:'مؤسس زارا هو؟', options:['أمانسيو أورتيغا','أرتورو إليسوندو','ستيفانو غابانا','روبرتو كافالي'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br52', text:'ما الاسم الأصلي لبيبسي عند إطلاقه سنة 1893؟', options:['برادز درينك','بيبسي-كولا','نيو كولا','رويال كراون'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br53', text:'في أي عام تأسست غوغل؟', options:['1998','1996','2001','1994'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br54', text:'في أي عام تأسست أبل؟', options:['1976','1980','1972','1984'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br55', text:'في أي عام تأسست سامسونج؟', options:['1938','1948','1958','1928'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br56', text:'في أي عام تأسست تويوتا؟', options:['1937','1920','1945','1950'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br57', text:'شعار فيراري (الحصان الجامح) استُلهم من؟', options:['الطيار الإيطالي فرانشيسكو باراكا','مدينة مودينا','حصان ليوناردو دا فينشي','مضمار مونزا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br58', text:'اختصار LVMH يعبّر عن؟', options:['Louis Vuitton Moët Hennessy','Luxe Vogue Mode Hermès','Loro Piana Vuitton Moët House','Luxury Vintage Maison Holdings'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br59', text:'شعار ماركة لاكوست هو؟', options:['تمساح','أسد','نمر','حصان'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'br60', text:'من مؤسس شركة Under Armour؟', options:['كيفن بلانك','فيليب نايت','أدي داسلر','رودولف داسلر'], correctIndex:0, difficulty:'hard', points:400 }
]};
data.categories.push({ id:brands.id, name:brands.name, icon:brands.icon, questions: prepQuestions(brands.qs) });
// ==================== 19 تاريخ ==============================================================================================
var history = { id:'history', name:'تاريخ', icon:'🏛️', qs:[
// سهل
{ id:'hs1', text:'من أوّل خليفة راشد؟', options:['أبو بكر الصديق','عمر بن الخطاب','عثمان بن عفان','علي بن أبي طالب'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs2', text:'ما عاصمة الدولة العباسية؟', options:['بغداد','دمشق','الكوفة','القدس'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs3', text:'من العالم الذي صاغ قانون الجاذبية بعد قصة التفاحة؟', options:['إسحاق نيوتن','ألبرت آينشتاين','غاليليو غاليلي','نيكولا تسلا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs4', text:'من قاد رحلة 1492 إلى العالم الجديد؟', options:['كريستوفر كولومبوس','فاسكو دا غاما','فرديناند ماجلان','أميركو فسبوتشي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs5', text:'أين تقع أهرامات الجيزة؟', options:['مصر','السودان','اليونان','العراق'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs6', text:'من مؤسس الإمبراطورية المغولية؟', options:['جنكيز خان','هولاكو','قوبلاي خان','تيمورلنك'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs7', text:'من القائد المسلم في معركة اليرموك؟', options:['خالد بن الوليد','عمرو بن العاص','سعد بن أبي وقاص','أبو عبيدة بن الجراح'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs8', text:'ما العجيبة الوحيدة الباقية من عجائب الدنيا السبع القديمة؟', options:['الهرم الأكبر بالجيزة','حدائق بابل المعلّقة','تمثال رودس','منارة الإسكندرية'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs9', text:'متى اندلعت الحرب العالمية الثانية؟', options:['1939','1914','1945','1936'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs10', text:'من الإمبراطور الفرنسي الذي قاد الحروب النابليونية؟', options:['نابليون بونابرت','لويس الرابع عشر','شارلمان','لويس السادس عشر'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs11', text:'أين نشأت الديمقراطية المباشرة في العصور القديمة؟', options:['أثينا','روما','الإسكندرية','قرطاج'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs12', text:'بوابة عشتار شُيّدت في عهد الملك؟', options:['نبوخذنصر الثاني','سرجون الأكدي','حمورابي','سنحاريب'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs13', text:'الملك المصري الشهير بقناع الذهب؟', options:['توت عنخ آمون','رمسيس الثاني','أخناتون','حتشبسوت'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs14', text:'من فتح القسطنطينية؟', options:['محمد الفاتح','سليم الأول','سليمان القانوني','أورخان'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs15', text:'في أي سنة بدأت الثورة الفرنسية؟', options:['1789','1776','1815','1848'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs16', text:'أي بلد عربي كان يُعرف ببلاد الرافدين؟', options:['العراق','سوريا','الأردن','اليمن'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs17', text:'من صاحب كتاب "المقدمة"؟', options:['ابن خلدون','المسعودي','الطبري','ابن رشد'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs18', text:'من مؤسس الدولة السعودية الأولى؟', options:['محمد بن سعود','محمد علي باشا','عبد العزيز آل سعود','سعود بن عبد العزيز'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs19', text:'ما اسم طريق التجارة التاريخي بين الصين وأوروبا؟', options:['طريق الحرير','طريق التوابل','طريق العنبر','الطريق الملكي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'hs20', text:'في أي بلد يوجد سور الصين العظيم؟', options:['الصين','الهند','اليابان','منغوليا'], correctIndex:0, difficulty:'easy', points:100 },
// متوسط
{ id:'hs21', text:'في أي سنة فُتحت القسطنطينية؟', options:['1453','1517','1071','1204'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs22', text:'من قائد المسلمين في معركة حطّين؟', options:['صلاح الدين الأيوبي','نور الدين زنكي','سيف الدين قطز','الظاهر بيبرس'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs23', text:'من قائد المسلمين في معركة عين جالوت؟', options:['سيف الدين قطز','صلاح الدين الأيوبي','نور الدين زنكي','الظاهر بيبرس'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs24', text:'أي دولة إسلامية اتخذت قرطبة عاصمة في الأندلس؟', options:['الدولة الأموية في الأندلس','الدولة العباسية','الدولة الفاطمية','دولة المرابطين'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs25', text:'أقدم حضارة ظهرت في جنوب العراق عُرفت باسم؟', options:['السومرية','الآشورية','الأكادية','الآرامية'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs26', text:'من أوّل من أتمّ الرحلة البحرية من أوروبا إلى الهند حول رأس الرجاء الصالح؟', options:['فاسكو دا غاما','كريستوفر كولومبوس','بارثولوميو دياز','فرديناند ماجلان'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs27', text:'أي مملكة أوروبية موّلت رحلة كولومبوس؟', options:['إسبانيا','البرتغال','فرنسا','إنجلترا'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs28', text:'متى أُلغيت الخلافة العثمانية رسميًا؟', options:['1924','1918','1922','1932'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs29', text:'كانت معركة اليرموك ضد أي قوة؟', options:['البيزنطيين','الساسانيين','المغول','الفرنجة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs30', text:'من مؤسس الدولة الأموية؟', options:['معاوية بن أبي سفيان','عبد الملك بن مروان','عمرو بن العاص','يزيد بن معاوية'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs31', text:'الزعيم الهندي الذي قاد حركة الاستقلال باللاعنف؟', options:['المهاتما غاندي','جواهر لال نهرو','محمد علي جناح','سوبرهاس تشاندرا بوس'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs32', text:'في أي سنة سقط جدار برلين؟', options:['1989','1990','1986','1991'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs33', text:'متى تأسست منظمة الأمم المتحدة؟', options:['1945','1919','1939','1955'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs34', text:'من اخترع الطباعة بالحروف المتحركة في أوروبا؟', options:['يوهانس غوتنبرغ','ليوناردو دا فينشي','لويس باستور','غاليليو'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs35', text:'أول معركة كبرى في الإسلام؟', options:['بدر','أحد','الخندق','تبوك'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs36', text:'من القائد الذي فتح الأندلس؟', options:['طارق بن زياد','عبد الرحمن الداخل','موسى بن نصير','يوسف بن تاشفين'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs37', text:'أقدم جامعة لا تزال تعمل حتى اليوم؟', options:['جامعة القرويين (فاس)','جامعة الأزهر','جامعة بولونيا','السوربون'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs38', text:'في أي سنة توحّدت ألمانيا (بعد الحرب الباردة)؟', options:['1990','1989','1991','1992'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs39', text:'أول معركة بحرية في التاريخ الإسلامي؟', options:['ذات الصواري','ذي قار','القسطنطينية','القادسية'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'hs40', text:'أي إمبراطور أصدر مرسوم ميلانو (313م) لحرية الديانة المسيحية؟', options:['قسطنطين الكبير','تيودوسيوس الأول','أغسطس','نيرون'], correctIndex:0, difficulty:'medium', points:200 },
// صعب
{ id:'hs41', text:'في أي سنة وقعت معركة ملاذكرد؟', options:['1071','1171','1241','1291'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs42', text:'من الخليفة العباسي الذي أسّس مدينة سامرّاء؟', options:['المعتصم بالله','المأمون','المهدي','الواثق'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs43', text:'في أي عام اكتُشفت مقبرة توت عنخ آمون؟', options:['1922','1914','1932','1905'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs44', text:'دارت معركة القادسية بين المسلمين وأي إمبراطورية؟', options:['الساسانية','البيزنطية','المغولية','الفرنجية'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs45', text:'من يُلقّب بأبي الكيمياء في التراث الإسلامي؟', options:['جابر بن حيان','أبو بكر الرازي','ابن سينا','الكندي'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs46', text:'أي دولة إسلامية هزمت المغول في عين جالوت (1260م)؟', options:['دولة المماليك','الدولة الأيوبية','الدولة المرينية','الدولة العثمانية'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs47', text:'في أي سنة وقعت معركة واترلو؟', options:['1815','1804','1798','1821'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs48', text:'مسلّة القوانين الشهيرة (مسلّة حمورابي) تنتمي إلى حضارة؟', options:['بابل','آشور','الحثّيين','سومر'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs49', text:'من أشهر من استخدم عبارة "الستار الحديدي" عام 1946؟', options:['ونستون تشرشل','جوزيف ستالين','هاري ترومان','شارل ديغول'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs50', text:'حرب المئة عام قامت أساسًا بين؟', options:['إنجلترا وفرنسا','إسبانيا والبرتغال','روسيا وألمانيا','الدانمارك والسويد'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs51', text:'أنهى صلح وستفاليا (1648) أي حرب أوروبية كبرى؟', options:['حرب الثلاثين عامًا','الحرب الفرنسية–البروسية','حروب نابليون','حرب السبع سنوات'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs52', text:'من الرحّالة الذي انطلق من طنجة وطاف العالم الإسلامي في القرن 14؟', options:['ابن بطوطة','ابن جبير','المسعودي','ياقوت الحموي'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs53', text:'من قائد المسلمين في معركة بلاط الشهداء (732م)؟', options:['عبد الرحمن الغافقي','طارق بن زياد','موسى بن نصير','يوسف بن تاشفين'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs54', text:'في أي عام وصل بارثولوميو دياز إلى رأس الرجاء الصالح؟', options:['1488','1492','1517','1469'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs55', text:'من المفكّر الأندلسي الملقّب بـ"الشارح الأكبر" لأرسطو؟', options:['ابن رشد','ابن طفيل','ابن حزم','الزهراوي'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs56', text:'في أي سنة سقطت بغداد بيد المغول؟', options:['1258','1248','1268','1278'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs57', text:'في أي سنة لُقّب تيموجين بـ"جنكيز خان" بعد توحيد قبائل المغول؟', options:['1206','1215','1190','1227'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs58', text:'ما اسم الثورة التي أنهت حكم سلالة تشينغ في الصين وأعلنت الجمهورية؟', options:['ثورة شينهاي','ثورة مايو','الثورة الثقافية','ثورة الملاكمين'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs59', text:'من الملك الآشوري الذي ارتبطت به "مكتبة نينوى"؟', options:['آشور بانيبال','سرجون الثاني','سنحاريب','شمشي-أدد'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'hs60', text:'في أي سنة وُقّعت اتفاقية سايكس–بيكو سرًا؟', options:['1916','1918','1914','1920'], correctIndex:0, difficulty:'hard', points:400 }
]};
data.categories.push({ id:history.id, name:history.name, icon:history.icon, questions: prepQuestions(history.qs) });
// ==================== 20 جغرافية ==============================================================================================
var geography = { id:'geography', name:'جغرافية', icon:'🗺️', qs:[
// سهل
{ id:'ge1', text:'ما أكبر قارة في العالم؟', options:['آسيا','أفريقيا','أمريكا الشمالية','أوروبا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge2', text:'ما أعلى جبل في العالم؟', options:['إيفرست','كي2','كانغتشينجونغا','دينالي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge3', text:'ما عاصمة فرنسا؟', options:['باريس','ليون','مرسيليا','نيس'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge4', text:'ما أكبر محيط على وجه الأرض؟', options:['المحيط الهادئ','المحيط الأطلسي','المحيط الهندي','المحيط المتجمد الشمالي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge5', text:'كم عدد القارات؟', options:['7','6','5','8'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge6', text:'أي بحر يفصل أفريقيا عن أوروبا؟', options:['البحر الأبيض المتوسط','بحر العرب','البحر الأحمر','بحر البلطيق'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge7', text:'ما أطول نهر في أفريقيا؟', options:['النيل','الكونغو','النيجر','زامبيزي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge8', text:'ما أطول سلسلة جبلية على اليابسة؟', options:['جبال الأنديز','جبال الهيمالايا','جبال الألب','جبال روكي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge9', text:'أين تقع الصحراء الكبرى؟', options:['أفريقيا','آسيا','أمريكا الجنوبية','أستراليا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge10', text:'الأهرامات الشهيرة في الجيزة تقع في؟', options:['مصر','السودان','اليونان','إثيوبيا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge11', text:'أي دولة عربية مطلة على المحيط الأطلسي؟', options:['المغرب','تونس','لبنان','الأردن'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge12', text:'ما عاصمة المملكة العربية السعودية؟', options:['الرياض','جدة','مكة','الدمام'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge13', text:'يمر نهر دجلة في دولة؟', options:['العراق','سوريا','لبنان','الأردن'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge14', text:'ما عاصمة اليابان؟', options:['طوكيو','أوساكا','ناغويا','كيوتو'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge15', text:'أي دولة جزرية آسيوية في المحيط الهندي مشهورة بمنتجعاتها فوق الماء؟', options:['المالديف','سيشل','فانواتو','فيجي'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge16', text:'ما أخفض نقطة يابسة على سطح الأرض؟', options:['البحر الميت','صحراء أتاكاما','منخفض القطارة','وادي الموت'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge17', text:'ما عاصمة تركيا؟', options:['أنقرة','إسطنبول','إزمير','بورصة'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge18', text:'أي علم يحتوي ورقة القيقب؟', options:['كندا','الدنمارك','سويسرا','آيرلندا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge19', text:'أي مدينة تُعرف بلقب "مدينة الضباب"؟', options:['لندن','نيويورك','باريس','برلين'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ge20', text:'ما أطول نهر في أمريكا الجنوبية؟', options:['الأمازون','الأورينوكو','بارانا','ساو فرانسيسكو'], correctIndex:0, difficulty:'easy', points:100 },
// متوسط
{ id:'ge21', text:'ما أعلى قمة في أفريقيا؟', options:['كيليمنجارو','راس داشن','توبقال','ستانلي'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge22', text:'ما أطول نهر في آسيا؟', options:['اليانغتسي','الميكونغ','السند','النهر الأصفر'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge23', text:'ما أكبر جزيرة في العالم؟', options:['غرينلاند','غينيا الجديدة','بورنيو','مدغشقر'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge24', text:'أي مضيق يربط البحر الأحمر بخليج عدن؟', options:['باب المندب','هرمز','الدردنيل','البوسفور'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge25', text:'أي بحر يفصل شبه الجزيرة العربية عن أفريقيا؟', options:['البحر الأحمر','البحر المتوسط','بحر العرب','الخليج العربي'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge26', text:'ما عاصمة كازاخستان الحالية؟', options:['أستانا','ألماتي','نور سلطان','أكتاو'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge27', text:'أكبر بحيرة عذبة من حيث المساحة هي؟', options:['سوبيريور','فيكتوريا','بايكال','هرون'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge28', text:'أعمق بحيرة في العالم هي؟', options:['بايكال','تنزانيا (تانجانيقا)','قزوين','فيفر'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge29', text:'أي دولة تُعد أكبر أرخبيل في العالم؟', options:['إندونيسيا','الفلبين','اليابان','المالديف'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge30', text:'أي نهر يمر بمدينة القاهرة؟', options:['النيل','الدانوب','السنغال','الأمازون'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge31', text:'جبال الأورال تفصل بين؟', options:['أوروبا وآسيا','آسيا وأفريقيا','أوروبا وأفريقيا','أوقيانوسيا وأمريكا'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge32', text:'ما الدولتان الحبيستان في أمريكا الجنوبية؟', options:['بوليفيا وباراغواي','بوليفيا وأوروغواي','باراغواي والإكوادور','الإكوادور وبيرو'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge33', text:'ما عاصمة كندا؟', options:['أوتاوا','تورونتو','مونتريال','فانكوفر'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge34', text:'ما أطول نهر في أوروبا؟', options:['الفولغا','الدانوب','الراين','الأودر'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge35', text:'ما عاصمة المغرب؟', options:['الرباط','الدار البيضاء','مراكش','فاس'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge36', text:'أكبر صحراء في شبه الجزيرة العربية؟', options:['الربع الخالي','صحراء النفود','صحراء الدهناء','صحراء سيناء'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge37', text:'ما أعلى شلال في العالم؟', options:['شلال آنجل','شلال يوسمايت','شلال فيكتوريا','شلال نياجارا'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge38', text:'ما عاصمة أستراليا؟', options:['كانبيرا','سيدني','ملبورن','بريسبن'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge39', text:'أي محيط يحد سواحل عُمان واليمن والصومال؟', options:['المحيط الهندي','المحيط الأطلسي','المحيط الهادئ','المحيط المتجمد الجنوبي'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ge40', text:'ما أكبر دولة عربية مساحة؟', options:['الجزائر','السعودية','السودان','ليبيا'], correctIndex:0, difficulty:'medium', points:200 },
// صعب
{ id:'ge41', text:'ما أعلى قمة في أوروبا؟', options:['إلبروس','مون بلان','ماتر هورن','تريغلاف'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge42', text:'ما أطول نظام نهري في أمريكا الشمالية؟', options:['المسيسيبي–ميسوري','القديس لورانس','ريو غراندي','ماكنزي'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge43', text:'ما أعمق خندق محيطي في العالم؟', options:['خندق ماريانا','خندق تونغا','خندق كيرماديك','خندق الفلبين'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge44', text:'أي دولة لديها ثلاث عواصم رسمية (إدارية وتشريعية وقضائية)؟', options:['جنوب أفريقيا','هولندا','بوليفيا','ماليزيا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge45', text:'أي مضيق يربط البحر الأسود ببحر مرمرة؟', options:['البوسفور','الدردنيل','هرمز','بيرينغ'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge46', text:'كم دولة تطل على بحر قزوين؟', options:['5','4','6','7'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge47', text:'ما أكبر دلتا نهرية في العالم؟', options:['دلتا الغانج–براهمابوترا','دلتا النيل','دلتا النيجر','دلتا الميسيسيبي'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge48', text:'ما الدولة الوحيدة غير الساحلية في جنوب شرق آسيا؟', options:['لاوس','كمبوديا','ميانمار','تايلاند'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge49', text:'يمر خط الزوال الرئيسي (0°) عبر حي في لندن يُسمى؟', options:['غرينتش','سوهو','كامدن','تشيلسي'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge50', text:'ما أعلى جبل في أمريكا الشمالية؟', options:['دينالي','لوغان','أكونكاغوا','ويتني'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge51', text:'أي دولة تملك أطول خط ساحلي في العالم؟', options:['كندا','أستراليا','روسيا','إندونيسيا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge52', text:'ما أكبر خليج في العالم من حيث المساحة؟', options:['خليج البنغال','خليج هدسون','خليج المكسيك','خليج عدن'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge53', text:'أي بحر لا يحده يابسة مباشرة؟', options:['بحر سرغاسو','بحر العرب','بحر الصين الجنوبي','بحر اليابان'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge54', text:'أي دولة من التالي محاطة بالكامل بدولة واحدة فقط؟', options:['ليسوتو','باراغواي','بوتان','أندورا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge55', text:'ما أكبر بحيرة في أفريقيا؟', options:['بحيرة فيكتوريا','بحيرة تنجانيقا','بحيرة توركانا','بحيرة ألبرت'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge56', text:'ما اسم أعلى هضبة في العالم؟', options:['هضبة التبت','هضبة ديكان','هضبة الأناضول','هضبة إيران'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge57', text:'ما أطول نهر في أستراليا؟', options:['نهر موراي','نهر دارلنج','نهر فيتزروي','نهر مارغريت'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge58', text:'أي مضيق يفصل أوروبا عن آسيا عند مدخل بحر إيجه؟', options:['الدردنيل','البوسفور','هرمز','ملقا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge59', text:'كم دولة تحدّ الصين برًا؟', options:['14','13','12','11'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ge60', text:'ما أكبر بحر داخلي مغلق في العالم؟', options:['بحر قزوين','بحر آرال','بحر البلطيق','بحر الشمال'], correctIndex:0, difficulty:'hard', points:400 }
]};
data.categories.push({ id:geography.id, name:geography.name, icon:geography.icon, questions: prepQuestions(geography.qs) });
// ==================== 21 عواصم ودول ==============================================================================================
var capitals = { id:'capitals', name:'عواصم ودول', icon:'🏙️', qs:[
    // سهل
    { id:'cp1', text:'ما عاصمة مصر؟', options:['القاهرة','الإسكندرية','أسوان','الأقصر'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp2', text:'ما عاصمة السعودية؟', options:['الرياض','جدة','مكة','الدمام'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp3', text:'ما عاصمة فرنسا؟', options:['باريس','ليون','مرسيليا','نيس'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp4', text:'ما عاصمة إيطاليا؟', options:['روما','ميلانو','نابولي','فلورنسا'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp5', text:'ما عاصمة اليابان؟', options:['طوكيو','أوساكا','كيوتو','يوكوهاما'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp6', text:'ما عاصمة الصين؟', options:['بكين','شنغهاي','غوانزو','شنزن'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp7', text:'ما عاصمة ألمانيا؟', options:['برلين','ميونخ','فرانكفورت','هامبورغ'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp8', text:'ما عاصمة الإمارات؟', options:['أبوظبي','دبي','الشارقة','عجمان'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp9', text:'ما عاصمة الأردن؟', options:['عمّان','إربد','العقبة','جرش'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp10', text:'ما عاصمة لبنان؟', options:['بيروت','طرابلس','صيدا','صور'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp11', text:'ما عاصمة المغرب؟', options:['الرباط','الدار البيضاء','مراكش','فاس'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp12', text:'ما عاصمة تركيا؟', options:['أنقرة','إسطنبول','إزمير','بورصة'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp13', text:'ما عاصمة الهند؟', options:['نيودلهي','مومباي','كولكاتا','بنغالور'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp14', text:'ما عاصمة روسيا؟', options:['موسكو','سانت بطرسبرغ','قازان','سوتشي'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp15', text:'ما عاصمة إسبانيا؟', options:['مدريد','برشلونة','فالنسيا','إشبيلية'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp16', text:'ما عاصمة البرازيل؟', options:['برازيليا','ساو باولو','ريو دي جانيرو','سلفادور'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp17', text:'ما عاصمة كندا؟', options:['أوتاوا','تورونتو','مونتريال','فانكوفر'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp18', text:'ما عاصمة أستراليا؟', options:['كانبيرا','سيدني','ملبورن','بريسبن'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp19', text:'ما عاصمة سوريا؟', options:['دمشق','حلب','حمص','اللاذقية'], correctIndex:0, difficulty:'easy', points:100 },
    { id:'cp20', text:'ما عاصمة الكويت؟', options:['مدينة الكويت','الجهراء','حولي','السالمية'], correctIndex:0, difficulty:'easy', points:100 },
    // متوسط
    { id:'cp21', text:'ما عاصمة النرويج؟', options:['أوسلو','بيرغن','تروندهايم','ستافنغر'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp22', text:'ما عاصمة السويد؟', options:['ستوكهولم','غوتنبرغ','مالمو','أوبسالا'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp23', text:'ما عاصمة الدنمارك؟', options:['كوبنهاغن','آرهوس','أودنسه','ألبورغ'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp24', text:'ما عاصمة فنلندا؟', options:['هلسنكي','تامبيري','أولو','توركو'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp25', text:'ما عاصمة النمسا؟', options:['فيينا','غراتس','سالزبورغ','إنسبروك'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp26', text:'ما عاصمة سويسرا؟', options:['برن','زيورخ','جنيف','بازل'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp27', text:'ما عاصمة البرتغال؟', options:['لشبونة','بورتو','فارو','كويمبرا'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp28', text:'ما عاصمة اليونان؟', options:['أثينا','سالونيك','باتراس','كريت'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp29', text:'ما عاصمة بولندا؟', options:['وارسو','كراكوف','غدانسك','فروتسواف'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp30', text:'ما عاصمة التشيك؟', options:['براغ','برنو','أوسترافا','بلزن'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp31', text:'ما عاصمة المجر؟', options:['بودابست','ديبريتسن','سزجد','ميشكولتس'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp32', text:'ما عاصمة رومانيا؟', options:['بوخارست','كلوج نابوكا','تيميشوارا','كونستانتسا'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp33', text:'ما عاصمة بلغاريا؟', options:['صوفيا','بلوفديف','فارنا','بورغاس'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp34', text:'ما عاصمة كرواتيا؟', options:['زغرب','سبليت','دوبروفنيك','رييكا'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp35', text:'ما عاصمة صربيا؟', options:['بلغراد','نوفي ساد','نيش','كراغوييفاتس'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp36', text:'ما عاصمة الأرجنتين؟', options:['بوينس آيرس','قرطبة','روساريو','مندوزا'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp37', text:'ما عاصمة تشيلي؟', options:['سانتياغو','فالبارايسو','كونسبسيون','أنتوفاغاستا'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp38', text:'ما عاصمة فنزويلا؟', options:['كراكاس','ماراكايبو','فالنسيا','باركيسيميتو'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp39', text:'ما عاصمة كولومبيا؟', options:['بوغوتا','ميديين','كالي','بارانكيا'], correctIndex:0, difficulty:'medium', points:200 },
    { id:'cp40', text:'ما عاصمة بيرو؟', options:['ليما','أريكيبا','كوسكو','تروخيو'], correctIndex:0, difficulty:'medium', points:200 },
    // صعب
    { id:'cp41', text:'ما عاصمة كازاخستان؟', options:['أستانا','ألماتي','شيمكنت','أكتوبي'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp42', text:'ما عاصمة أوزبكستان؟', options:['طشقند','سمرقند','بخارى','خيوة'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp43', text:'ما عاصمة جورجيا؟', options:['تبليسي','باتومي','كوتايسي','غوري'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp44', text:'ما عاصمة أذربيجان؟', options:['باكو','غانجا','سومقاييت','مينغيشيفير'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp45', text:'ما عاصمة أرمينيا؟', options:['يريفان','غيومري','فانادزور','إتشميادزين'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp46', text:'ما عاصمة قيرغيزستان؟', options:['بيشكيك','أوش','جلال أباد','توكموك'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp47', text:'ما عاصمة طاجيكستان؟', options:['دوشنبه','خجند','كولوب','بوخورو'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp48', text:'ما عاصمة تركمانستان؟', options:['عشق أباد','ترکمنباشی','ماری','داشوغوز'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp49', text:'ما عاصمة منغوليا؟', options:['أولان باتور','دارخان','أردنت','تشويبالسان'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp50', text:'ما عاصمة نيبال؟', options:['كاتماندو','بوكارا','لاليتبور','بهاكتابور'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp51', text:'ما عاصمة بنغلاديش؟', options:['دكا','شيتاغونغ','خولنا','سيليت'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp52', text:'ما عاصمة سريلانكا؟', options:['سري جاياواردنابورا كوتي','كولومبو','كاندي','غالي'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp53', text:'ما عاصمة ميانمار؟', options:['نايبيداو','يانغون','ماندالاي','باغان'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp54', text:'ما عاصمة لاوس؟', options:['فيانتيان','لوانغ برابانغ','باكسي','سافاناخيت'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp55', text:'ما عاصمة كمبوديا؟', options:['بنوم بنه','سيام ريب','باتامبانغ','سيهانوكفيل'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp56', text:'ما عاصمة بوتان؟', options:['تيمفو','فونتشولنغ','بارو','باجو'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp57', text:'ما عاصمة إريتريا؟', options:['أسمرة','مصوع','أسب','كرن'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp58', text:'ما عاصمة جيبوتي؟', options:['جيبوتي','علي صبيح','تاجورة','دخيل'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp59', text:'ما عاصمة سورينام؟', options:['باراماريبو','نيو نيكيري','موينغو','ليلندورب'], correctIndex:0, difficulty:'hard', points:400 },
    { id:'cp60', text:'ما عاصمة غيانا؟', options:['جورج تاون','ليندن','نيو أمستردام','آنا ريغينا'], correctIndex:0, difficulty:'hard', points:400 }
]};
data.categories.push({ id:capitals.id, name:capitals.name, icon:capitals.icon, questions: prepQuestions(capitals.qs) });
// ==================== 22 رياضيات وألغاز منطق ============================================================================================
var mathLogic = { id:'mathLogic', name:'رياضيات وألغاز منطق', icon:'🧩', qs:[
// سهل
{ id:'ml1', text:'ما قيمة 7 + 5؟', options:['12','10','11','13'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml2', text:'ما قيمة 9 × 6؟', options:['54','45','56','64'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml3', text:'ما قيمة 15 − 8؟', options:['7','8','6','9'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml4', text:'ما قيمة 3^2؟', options:['9','6','8','12'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml5', text:'كم تساوي 25% من 200؟', options:['50','40','25','60'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml6', text:'ما الجذر التربيعي لـ 49؟', options:['7','6','9','8'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml7', text:'أيٌّ من التالي عدد أولي؟', options:['11','12','15','21'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml8', text:'محيط مستطيل طوله 5 وعرضه 3 يساوي؟', options:['16','15','18','10'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml9', text:'مساحة مستطيل أبعاده 7 × 4؟', options:['28','11','24','21'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml10', text:'متوسط الأعداد 2 و4 و6 و8؟', options:['5','4','6','7'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml11', text:'كم ثانية في 3 دقائق؟', options:['180','120','150','210'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml12', text:'كم درجة قياس الزاوية القائمة؟', options:['90','45','60','120'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml13', text:'أصغر الأعداد التالية هو؟', options:['0.25','0.5','0.75','1'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml14', text:'إذا كان 2x = 10 فما قيمة x؟', options:['5','10','8','12'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml15', text:'كم متر في كيلومتر واحد؟', options:['1000','100','10000','500'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml16', text:'10% من 80 تساوي؟', options:['8','10','12','6'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml17', text:'المضاعف المشترك الأصغر لِـ 4 و6؟', options:['12','24','8','6'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml18', text:'مجموع زوايا المثلث يساوي؟', options:['180','90','270','360'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml19', text:'1/2 + 1/4 = ؟', options:['3/4','2/4','5/4','1'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ml20', text:'اليوم الذي يأتي بعد 3 أيام من الاثنين هو؟', options:['الخميس','الأربعاء','الثلاثاء','الجمعة'], correctIndex:0, difficulty:'easy', points:100 },
// متوسط
{ id:'ml21', text:'12 ÷ 0.5 = ؟', options:['24','6','12','18'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml22', text:'حل المعادلة: 3x + 5 = 20', options:['5','3','7','10'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml23', text:'أكمل المتسلسلة: 2، 5، 8، 11، ؟', options:['14','13','15','16'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml24', text:'مساحة دائرة نصف قطرها 7 (باستخدام π ≈ 22/7)؟', options:['154','44','308','77'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml25', text:'وتر مثلث قائم ضلعا قائمه 6 و8 يساوي؟', options:['10','9','12','14'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml26', text:'احتمال الحصول على عدد زوجي عند رمي نرد؟', options:['1/2','1/3','2/3','1/6'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml27', text:'أي الأعداد التالية يقبل القسمة على 9؟', options:['1728','1730','1717','1720'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml28', text:'بسط الكسر 18/24', options:['3/4','2/3','4/5','5/6'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml29', text:'سيارة تسير بسرعة 60 كم/س لمدة 2.5 ساعة؛ المسافة؟', options:['150 كم','120 كم','100 كم','140 كم'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml30', text:'مجموع 10 أعداد متوسطها 12 يساوي؟', options:['120','12','60','100'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml31', text:'2^5 = ؟', options:['32','16','64','25'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml32', text:'أصغر الأعداد: -3، 0، -1، 2 هو؟', options:['-3','0','-1','2'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml33', text:'ثمن سلعة 200 وتم الخصم 20%؛ السعر بعد الخصم؟', options:['160','180','150','140'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml34', text:'كم عدد الأقطار في مضلع خماسي؟', options:['5','7','8','10'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml35', text:'0.2 × 0.5 = ؟', options:['0.1','1','0.01','0.02'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml36', text:'إذا 2x + y = 10 و x + y = 7 فإن x = ؟', options:['3','2','4','5'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml37', text:'الباقي عند قسمة 100 على 7؟', options:['2','3','4','5'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml38', text:'أيٌّ من التالي يساوي 0.75؟', options:['3/4','2/3','1/2','4/5'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml39', text:'حوّل 90 كم/س إلى م/ث؟', options:['25','20','22.5','30'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ml40', text:'كم عدد الأعداد الأولية بين 10 و20؟', options:['4','3','5','2'], correctIndex:0, difficulty:'medium', points:200 },
// صعب
{ id:'ml41', text:'ثلاثة أعداد فردية متتالية مجموعها 45؛ ما العدد الأكبر؟', options:['17','15','19','13'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml42', text:'خُفِّض سعر سلعة 10% ثم زيد 10%؛ النتيجة؟', options:['أقل من السعر الأصلي بنسبة 1%','يساوي السعر الأصلي تمامًا','أعلى من السعر الأصلي بنسبة 1%','أقل من السعر الأصلي بنسبة 10%'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml43', text:'حل: (x−3)/4 + (x+1)/6 = 5', options:['13.4','12','11','14'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml44', text:'احتمال سحب ورقتين حمراوين متتاليتين من رزمة 52 ورقة دون إرجاع؟', options:['25/102','1/4','1/2','13/51'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml45', text:'إذا 1+2+…+n = 210، فما قيمة n؟', options:['20','21','19','30'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml46', text:'أكبر عدد ثلاثي الأرقام يقبل القسمة على 37 هو؟', options:['999','996','963','925'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml47', text:'إذا كان x% من 200 يساوي 30، فما x؟', options:['15%','10%','20%','25%'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml48', text:'مثلث متساوي الساقين زاوية رأسه 40°؛ قياس كل زاوية قاعدية؟', options:['70','80','60','50'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml49', text:'ما باقي قسمة 10^5 على 7؟', options:['5','1','2','3'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml50', text:'المضاعف المشترك الأصغر للأعداد 12 و15 و20؟', options:['60','90','120','30'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml51', text:'إذا كانت a:b = 3:4 و b:c = 2:5، فما a:c؟', options:['3:10','5:6','2:5','4:15'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml52', text:'كم مرة يتطابق عقربا الساعة والدقائق في 12 ساعة؟', options:['11','12','10','24'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml53', text:'قطار قطع 300 كم بسرعة 75 كم/س؛ الزمن المستغرق؟', options:['4 ساعات','3 ساعات','3.5 ساعات','5 ساعات'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml54', text:'في x^2 − 5x + 6 = 0، ما مجموع الجذرين؟', options:['5','6','1','-5'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml55', text:'قيمة 1 − 1/2 + 1/3 − 1/4 + 1/5 − 1/6 = ؟', options:['37/60','1/2','2/3','3/5'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml56', text:'كم عدد الأعداد بين 1 و100 القابلة للقسمة على 3 و5 معًا؟', options:['6','5','7','8'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml57', text:'متتابعة هندسية: حدها الأول 3 ونسبتها 2؛ الحد السادس؟', options:['96','48','192','64'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml58', text:'ما قيمة 0! ؟', options:['1','0','2','غير معرّف'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml59', text:'كم عدد الترتيبات المختلفة لكلمة LEVEL؟', options:['30','60','120','20'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ml60', text:'إذا 1/x + 1/y = 1/4 (x وy عددان صحيحان موجبان وx ≤ y)، أي زوج يحقق الشرط؟', options:['(5, 20)','(2, 8)','(4, 4)','(6, 6)'], correctIndex:0, difficulty:'hard', points:400 }
]};
data.categories.push({ id:mathLogic.id, name:mathLogic.name, icon:mathLogic.icon, questions: prepQuestions(mathLogic.qs) });
// ==================== 23 لغة عربية ==============================================================================================
var arabicLang = { id:'arabicLang', name:'لغة عربية', icon:'📚', qs:[
// سهل
{ id:'ar1', text:'ما علامة التأنيث الشائعة في نهاية الاسم؟', options:['التاء المربوطة','التاء المفتوحة','الهاء','الألف المقصورة'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar2', text:'ما جمع "كتاب"؟', options:['كُتُب','كتابون','كتابات','أكتبة'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar3', text:'المثنّى من "طالب"؟', options:['طالبان','طالبون','طلبة','طالبات'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar4', text:'ضمير المتكلم المفرد؟', options:['أنا','نحن','أنتَ','هو'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar5', text:'الاسم المُعرب يغيّر آخره حسب؟', options:['الموقع الإعرابي','النوع (مذكر/مؤنث)','الزمن','الصوت'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar6', text:'اللام في "الشمس" تُعد؟', options:['لامًا شمسية تُدغم ولا تُنطق','لامًا قمرية تظهر وتُلفظ','محذوفة كتابةً','مقلوبة ألفًا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar7', text:'اللام في "القمر" تُعد؟', options:['لامًا قمرية تُلفظ','لامًا شمسية تُدغم','محذوفة نطقًا','مقلوبة واوًا'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar8', text:'اسم الإشارة للمفرد المؤنث القريب؟', options:['هذه','هذا','هذان','هؤلاء'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar9', text:'أداة استفهام عن المكان؟', options:['أين','متى','كيف','كم'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar10', text:'أيّ الكلمات تحتوي تاءً مربوطة؟', options:['مدرسة','كتاب','كاتب','مدرست'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar11', text:'ضدّ "حارّ"؟', options:['بارد','طويل','قليل','سريع'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar12', text:'ضدّ "ليل"؟', options:['نهار','مساء','فجر','غسق'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar13', text:'جمع المؤنث السالم من "مهندسة":', options:['مهندسات','مهندسةات','مهندسون','مهندس'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar14', text:'"يكتب" نوعها؟', options:['فعل مضارع','فعل ماضٍ','اسم','حرف'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar15', text:'علامة رفع جمع المذكر السالم؟', options:['الواو','الضمة','الألف','الياء'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar16', text:'اسم الفاعل من "كتب"؟', options:['كاتب','مكتوب','كتاب','كتيّب'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar17', text:'"السيّارة" كلمة؟', options:['معرّفة بـ(ال)','نكرة','فعل','حرف'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar18', text:'الصواب في الكتابة؟', options:['مسؤولية','مسؤلية','مسئوليه','مسوليّة'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar19', text:'أيّ الكلمات همزتها همزة وصل؟', options:['ابن','إنّ','أخذ','أُم'], correctIndex:0, difficulty:'easy', points:100 },
{ id:'ar20', text:'المبتدأ في الجملة "السماءُ صافيةٌ" هو؟', options:['السماءُ','صافيةٌ','الواو','لا يوجد'], correctIndex:0, difficulty:'easy', points:100 },
// متوسط
{ id:'ar21', text:'تثنية "فتاة" تكون؟', options:['فتاتان','فتتان','فتياتان','فتاةان'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar22', text:'في "سافرتُ طلبًا للعلم" إعراب "طلبًا":', options:['مفعولٌ لأجله','مفعولٌ مطلق','حال','تمييز'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar23', text:'اسم الفاعل من "استخرج"؟', options:['مُستخرِج','مُستخرَج','استخراج','خارِج'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar24', text:'"جلس" فعل؟', options:['لازم','متعدٍّ لمفعول','متعدٍّ لمفعولين','مبني للمجهول'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar25', text:'أثر "كان وأخواتها" على الجملة الاسمية؟', options:['ترفع الاسم وتنصب الخبر','تنصب الاسم وترفع الخبر','تجزِم الفعل','تنفي الجملة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar26', text:'أثر "إنّ وأخواتها"؟', options:['تنصب الاسم وترفع الخبر','ترفع الاسم وتنصب الخبر','تجزِم الفعل','تؤكد الفعل فقط'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar27', text:'تمييز الأعداد من 3 إلى 10 يكون؟', options:['جمعًا مجرورًا','مفردًا منصوبًا','مفردًا مجرورًا','جمعًا منصوبًا'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar28', text:'وزن "مكتبة" على الميزان الصرفي؟', options:['مَفعَلة','مفعول','مَفعَل','فعّالة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar29', text:'نوع "ما" في "ما أجملَ السماءَ!"', options:['تعجبيّة','استفهامية','نافية','موصولة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar30', text:'في "حضرَ الطلابُ إلّا زيدًا" إعراب "زيدًا":', options:['مستثنى منصوب','بدل','مفعول به','فاعل'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar31', text:'"كلا" و"كلتا" تُعربان إعراب المثنّى إذا؟', options:['أُضيفتا إلى ضمير','نُكِّرتا','جاءتا مفردتين بلا إضافة','أُضيفتا إلى اسم ظاهر'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar32', text:'ضمير الغائب لجمع المؤنث؟', options:['هنَّ','هم','أنتنَّ','أنتُم'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar33', text:'أيّهما اسم آلة؟', options:['مِكنسة','كاتب','قراءة','مدرسة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar34', text:'يتبع النعتُ المنعوتَ في؟', options:['التعريف والتنكير والجنس والعدد','الزمن والفاعل والمفعول','الوزن الصرفي فقط','الحروف'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar35', text:'العدد مع المعدود المؤنث (من 3–10) يكون؟', options:['مخالفًا للجنس','موافقًا للجنس','مبنيًا للمجهول','فعلًا مضارعًا'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar36', text:'أي كلمة مجرورة؟', options:['البيتِ','المدرسةُ','عملٌ','يَدرُس'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar37', text:'المفعول به في "قرأَ الطالبُ الكتابَ" هو؟', options:['الكتابَ','الطالبُ','قرأَ','لا يوجد'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar38', text:'"لا رجلَ في البيت" نوع "لا"؟', options:['النافية للجنس','الناهية','العاطفة','النافية غير العاملة'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar39', text:'أيّها حرف جر؟', options:['إلى','لعلّ','قد','بل'], correctIndex:0, difficulty:'medium', points:200 },
{ id:'ar40', text:'"اكتبْ" هي؟', options:['فعل أمر','فعل ماضٍ','فعل مضارع','اسم فعل'], correctIndex:0, difficulty:'medium', points:200 },
// صعب
{ id:'ar41', text:'أيّ كلمة ليست ممنوعة من الصرف؟', options:['صحراء','أحمر','سلمى','مسلمون'], correctIndex:3, difficulty:'hard', points:400 },
{ id:'ar42', text:'في "لا رجلَ في الدار" إعراب "رجلَ":', options:['اسمُ لا النافيةِ للجنسِ منصوب','خبر لا مرفوع','مفعولٌ به','مبتدأ'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar43', text:'علامة نصب الفعل المضارع الصحيح الآخر؟', options:['الفتحة','السكون','حذف النون','حذف حرف العلة'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar44', text:'علامة جزم المضارع المعتلّ الآخر؟', options:['حذف حرف العلة','السكون','الفتحة','حذف النون'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar45', text:'أيّ أداة من التالية تجزم المضارع؟', options:['لم','لن','كي','أن'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar46', text:'خبر "كاد" يأتي غالبًا؟', options:['فعلًا مضارعًا','اسمًا مفردًا','جملة اسمية','شبه جملة'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar47', text:'نوع البدل في "أكلتُ الرغيفَ نصفَهُ":', options:['بدل بعضٍ من كلّ','بدل كلّ من كلّ','بدل اشتمال','عطف بيان'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar48', text:'نوع التمييز في "ازدادَ الطالبُ علمًا":', options:['تمييز ملحوظ (نِسبة)','تمييز مفرد','حال','بدل'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar49', text:'إعراب "مسرعًا" في "جاء الرجلُ مسرعًا":', options:['حالٌ منصوب','مفعولٌ لأجله','تمييز','نعت'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar50', text:'علامة جرّ جمع المذكر السالم؟', options:['الياء','الكسرة','الفتحة','الألف'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar51', text:'أيّ كلمة تبدأ بهمزة وصل؟', options:['استغفار','أحمد','أكرم','إنسان'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar52', text:'تمييز الأعداد من 11 إلى 99 يكون؟', options:['مفردًا منصوبًا','جمعًا مجرورًا','مفردًا مجرورًا','جمعًا منصوبًا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar53', text:'نوع اسم "لا" في "لا طالبَ علمٍ مقصّرٌ":', options:['شبيهٌ بالمضاف','مفرد','مضافٌ إلى ضمير','معرّف بـ(ال)'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar54', text:'علامة جزم الأفعال في الأمثلة الخمسة؟', options:['حذف النون','السكون','الفتحة','حذف حرف العلة'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar55', text:'أيّها صيغة مبالغة لاسم الفاعل؟', options:['غفّار','كاتب','مكتوب','مُنطلِق'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar56', text:'اسم المكان من "جلس":', options:['مجلس','جلسة','مجليس','مجلسة'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar57', text:'جمع التكسير من "كريم":', options:['كرماء','أكرم','كرائم','كرمون'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar58', text:'تُجَرّ الأسماء الممنوعة من الصرف بالكسرة إذا؟', options:['أُضيفت أو عُرِّفت بـ(ال)','نُكِّرت فقط','كانت مفردة','كانت جمعًا سالمًا'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar59', text:'"كمْ طالبًا حضر؟" كم هنا؟', options:['استفهامية','خبرية','ناهية','شرطية'], correctIndex:0, difficulty:'hard', points:400 },
{ id:'ar60', text:'في "حضر القومُ غيرَ زيدٍ" إعراب "غيرَ":', options:['مستثنى منصوب','فاعل مرفوع','بدل مجرور','حال منصوب'], correctIndex:0, difficulty:'hard', points:400 }
]};
data.categories.push({ id:arabicLang.id, name:arabicLang.name, icon:arabicLang.icon, questions: prepQuestions(arabicLang.qs) });
// ==================== 24 باسم الكربلائي ==============================================================================================

var bassemKarbalai = { id: 'bassem_bk', name: 'باسميات ', icon: '📿', qs: [
//سهل
{ id: 'bk1', text: 'ما هي كنية الحاج باسم الكربلائي؟', options: ['أبو الفضل', 'أبو تراب', 'أبو علي', 'أبو سجاد'], correctIndex: 2, difficulty: 'easy', points: 100 },
{ id: 'bk2', text: 'في أي مدينة ولد الحاج باسم الكربلائي؟', options: ['النجف الأشرف', 'كربلاء المقدسة', 'البصرة', 'الكاظمية'], correctIndex: 1, difficulty: 'easy', points: 100 },
{ id: 'bk3', text: 'من هو الشاعر صاحب قصيدة "خطار إجاني" المشهورة؟', options: ['ناظم الحاشي', 'جابر الكاظمي', 'عمار الهليل', 'لؤي حبيب الهلال'], correctIndex: 1, difficulty: 'easy', points: 100 },
{ id: 'bk4', text: 'ما اسم ابنه الذي ظهر معه في عدة إصدارات إنشادية؟', options: ['محمد', 'علي باسم', 'حمزة', 'عباس'], correctIndex: 1, difficulty: 'easy', points: 100 },
{ id: 'bk5', text: 'ما هي القصيدة التي حققت شهرة عالمية وتبدأ بـ "تزوروني أعاهدكم"؟', options: ['يسجلني', 'باسم الكربلائي (المشاية)', 'يبني يوجرمني', 'ملايين'], correctIndex: 1, difficulty: 'easy', points: 100 },
{ id: 'bk6', text: 'غادر الحاج باسم العراق في السبعينيات، إلى أي دولة توجه أولاً؟', options: ['لبنان', 'الكويت', 'إيران', 'عمان'], correctIndex: 2, difficulty: 'easy', points: 100 },
{ id: 'bk7', text: 'من هو الشاعر الذي كتب له أغلب قصائد الثمانينيات والتسعينيات؟', options: ['جابر الكاظمي', 'مهدي الجناحي', 'عزيز الفيصلي', 'سعيد الصافي'], correctIndex: 0, difficulty: 'easy', points: 100 },
{ id: 'bk8', text: 'قصيدة "يا لثارات الحسين" مرتبطة بأي مناسبة؟', options: ['عيد الغدير', 'عاشوراء', 'ولادة الإمام المهدي', 'وفاة النبي (ص)'], correctIndex: 1, difficulty: 'easy', points: 100 },
{ id: 'bk9', text: 'ما هو اللقب الذي يُعرف به باسم الكربلائي في الأوساط الحسينية؟', options: ['صوت الشيعة', 'خادم الحسين / ملا باسم', 'قيثارة الطف', 'منشد الثورة'], correctIndex: 1, difficulty: 'easy', points: 100 },
{ id: 'bk10', text: 'في أي عام ولد الحاج باسم الكربلائي؟', options: ['1960', '1966', '1970', '1955'], correctIndex: 1, difficulty: 'easy', points: 100 },
{ id: 'bk11', text: 'قصيدة "صلوات" الشهيرة موجهة لمدح من؟', options: ['الإمام علي', 'الإمام الحسين', 'النبي محمد (ص)', 'الإمام المهدي'], correctIndex: 2, difficulty: 'easy', points: 100 },
{ id: 'bk12', text: 'أين يستقر الحاج باسم الكربلائي حالياً ويقيم أغلب مجالسه؟', options: ['لندن', 'طهران', 'سلطنة عمان', 'الكويت'], correctIndex: 2, difficulty: 'easy', points: 100 },
{ id: 'bk13', text: 'ما اسم القصيدة التي تدور حول حوار بين السيدة زينب والقمر؟', options: ['عباس يا عيوني', 'يبني يا جاسم', 'طفلة أنا', 'شيل العلم'], correctIndex: 0, difficulty: 'easy', points: 100 },
{ id: 'bk14', text: 'قصيدة "ليش غايب" تتحدث عن غياب أي إمام؟', options: ['الإمام الكاظم', 'الإمام المهدي (عج)', 'الإمام الرضا', 'الإمام العسكري'], correctIndex: 1, difficulty: 'easy', points: 100 },
{ id: 'bk15', text: 'ما هو اللون الغالب على ملابس باسم الكربلائي في مجالس العزاء؟', options: ['الأبيض', 'الأخضر', 'الأسود', 'الرمادي'], correctIndex: 2, difficulty: 'easy', points: 100 },
{ id: 'bk16', text: 'قصيدة "تاج السعادة" مخصصة لذكرى زواج من؟', options: ['الإمام الحسن', 'الإمام علي والسيدة فاطمة', 'النبي وخديجة', 'القاسم بن الحسن'], correctIndex: 1, difficulty: 'easy', points: 100 },
{ id: 'bk17', text: 'ما هي اللغة الثانية التي ينشد بها باسم أحياناً بجانب العربية؟', options: ['الإنجليزية', 'الفارسية', 'التركية', 'الفرنسية'], correctIndex: 1, difficulty: 'easy', points: 100 },
{ id: 'bk18', text: 'أي من هؤلاء الشعراء كتب قصيدة "يا بو فاضل"؟', options: ['السيد سعيد الصافي الرميثي', 'ميرزا عادل', 'جابر الكاظمي', 'كاظم منظور'], correctIndex: 0, difficulty: 'easy', points: 100 },
{ id: 'bk19', text: 'ما هو اسم الإصدار الذي ضم قصيدة "أجينه ننشد كربلاء"؟', options: ['مجانينك', 'صلوات', 'عواصف', 'كبريائي'], correctIndex: 0, difficulty: 'easy', points: 100 },
{ id: 'bk20', text: 'كم عدد الأئمة المعصومين الذين تناولهم الحاج باسم في قصائده؟', options: ['5 فقط', 'جميع الأئمة (12)', 'الأربعة الأوائل', 'الإمام الحسين فقط'], correctIndex: 1, difficulty: 'easy', points: 100 },
//متوسط
{id:'bk21', text:'ما اسم أول شريط (كاسيت) رسمي صدر للحاج باسم الكربلائي؟', options:['يمه يا يمه', 'صلوات', 'يا حسين', 'عواصف'], correctIndex:2, difficulty:'medium', points:200 },
{id:'bk22', text:'من هو الملحن الذي تعاون معه باسم كثيراً في إصداراته الحديثة؟', options:['ميشال فاضل', 'محمد هيدوس', 'عمار الهليل', 'نزار فرنسيس'], correctIndex:0, difficulty:'medium', points:200 },
{id:'bk23', text:'قصيدة "بنات النبي" من كلمات الشاعر؟', options:['جابر الكاظمي', 'السيد سعيد الصافي', 'الميرزا عادل الأشكناني', 'إيهاب المالكي'], correctIndex:1, difficulty:'medium', points:200 },
{id:'bk24', text:'في أي عام عاد باسم الكربلائي لأول مرة إلى العراق بعد 2003؟', options:['2005', '2003', '2010', '2008'], correctIndex:1, difficulty:'medium', points:200 },
{id:'bk25', text:'ما اسم القصيدة الفصحى للشاعر مهدي جناح الكاظمي؟', options:['يا قارورة', 'تزوروني', 'علي علي', 'شمس لا تغيب'], correctIndex:0, difficulty:'medium', points:200 },
{id:'bk26', text:'قصيدة "اشرب ماءً واذكر عطش الحسين" تعود لأي أصل؟', options:['الحديث', 'الأموي', 'التراث القديم', 'العباسي'], correctIndex:2, difficulty:'medium', points:200 },
{id:'bk27', text:'أي إصدار من هذه الإصدارات يعتبر إصداراً للأفراح (نوروزي)؟', options:['عواصف', 'صلوات', 'مات الماء', 'لا وريد'], correctIndex:1, difficulty:'medium', points:200 },
{id:'bk28', text:'من هو الشاعر الذي كتب قصيدة "قوارير"؟', options:['جابر الكاظمي', 'الميرزا عادل الأشكناني', 'ناظم الحاشي', 'مهدي جناح الكاظمي'], correctIndex:1, difficulty:'medium', points:200 },
{id:'bk29', text:'ما هو اسم المخرج الذي أخرج كليب "تزوروني"؟', options:['عباس يوسفي', 'كميل طانيوس', 'علاء الأنصاري', 'محمد البدري'], correctIndex:1, difficulty:'medium', points:200 },
{id:'bk30', text:'قصيدة "جربت الموت" تتناول استشهاد أي شخصية؟', options:['الإمام العباس', 'علي الأكبر', 'القاسم بن الحسن', 'مسلم بن عقيل'], correctIndex:1, difficulty:'medium', points:200 },
{id:'bk31', text:'ما هي القصيدة التي تعتبر أطول قصيدة سجلها في استوديو؟', options:['ليث الغابة', 'تزوروني', 'عمار يا عمار', 'يبني يوجرمني'], correctIndex:0, difficulty:'medium', points:200 },
{id:'bk32', text:'تعاون باسم مع الملحن ميشال فاضل في أي ألبوم لأول مرة؟', options:['مجانينك', 'باسم', 'صلوات', 'عواصف'], correctIndex:1, difficulty:'medium', points:200 },
{id:'bk33', text:'قصيدة "كلما أشوفك بالطيف" مهداة لمن؟', options:['الإمام الرضا (ع)', 'الإمام الحسين (ع)', 'السيدة زينب (ع)', 'السيدة فاطمة (ع)'], correctIndex:0, difficulty:'medium', points:200 },
{id:'bk34', text:'من هو الشاعر الكويتي الذي يكتب كثيراً لباسم مؤخراً؟', options:['جابر الكاظمي', 'ناظم الحاشي', 'عبد الله القرمزي', 'لؤي حبيب الهلال'], correctIndex:1, difficulty:'medium', points:200 },
{id:'bk35', text:'في أي حسينية اشتهرت مجالس باسم الكربلائي في الكويت؟', options:['حسينية الرسول الأعظم', 'حسينية كربلاء', 'حسينية عاشور', 'حسينية بن نخي'], correctIndex:1, difficulty:'medium', points:200 },
{id:'bk36', text:'ما هو اسم القصيدة التي أداها وصورها في هولندا؟', options:['الكل في الكل', 'مات الماء', 'شمس لا تغيب', 'يا بو فاضل'], correctIndex:0, difficulty:'medium', points:200 },
{id:'bk37', text:'أي من هذه القصائد هي من كلمات الشيخ الوائلي؟', options:['أي سر فيك', 'خطار إجاني', 'جربت الموت', 'صلوات'], correctIndex:0, difficulty:'medium', points:200 },
{id:'bk38', text:'قصيدة "رضا رضا" تم تسجيلها في أي بلد؟', options:['العراق', 'الكويت', 'إيران (مشهد)', 'لبنان'], correctIndex:2, difficulty:'medium', points:200 },
{id:'bk39', text:'من هو رادود الطفولة الذي تأثر به باسم الكربلائي؟', options:['حمزة الزغير', 'ياسين الرميثي', 'وطن النجفي', 'عبد الرضا النجفي'], correctIndex:0, difficulty:'medium', points:200 },
{id:'bk40', text:'قصيدة "تمنيت" تتحدث عن لسان حال من؟', options:['السيدة زينب', 'السيدة رقية', 'أم البنين', 'ليلى أم علي الأكبر'], correctIndex:1, difficulty:'medium', points:200 },
//صعب
{id:'bk41', text:'من هو المعلم الأول لباسم الذي علمه الألحان في إيران؟', options:['جابر الكاظمي', 'الملا تقي الكربلائي', 'حمزة الزغير', 'الحاج فلاح الكربلائي'], correctIndex:1, difficulty:'hard', points:400 },
{id:'bk42', text:'قصيدة "أنا من أنا" من كلمات أي شاعر؟', options:['جابر الكاظمي', 'السيد عبد الخالق المحنة', 'مهدي جناح الكاظمي', 'علي السقاي'], correctIndex:0, difficulty:'hard', points:400 },
{id:'bk43', text:'في أي عام صدر ألبوم "عواصف"؟', options:['2001', '2004', '2006', '1999'], correctIndex:1, difficulty:'hard', points:400 },
{id:'bk44', text:'ما هي أول قصيدة صورها باسم بطريقة الفيديو كليب السينمائي؟', options:['تزوروني', 'ليس الغريب', 'يا قارورة', 'صلوات'], correctIndex:1, difficulty:'hard', points:400 },
{id:'bk45', text:'القصيدة الفصحى "يا من بكيته السماء بدم" للشاعر؟', options:['السيد راضي القزويني', 'الشريف الرضي', 'مهدي جناح', 'جابر الكاظمي'], correctIndex:0, difficulty:'hard', points:400 },
{id:'bk46', text:'ما اسم القصيدة التي أداها باسم بالعربية والأردية؟', options:['يا علي مددي', 'حسين يا حسين (لندنية)', 'كربلاء لا زلت كرباً', 'شمس وقمر'], correctIndex:1, difficulty:'hard', points:400 },
{id:'bk47', text:'من هو المهندس الصوتي الذي رافق نجاحات باسم في لبنان؟', options:['إدوار مونييه', 'حسام يسري', 'مشفق العلي', 'طوني حداد'], correctIndex:0, difficulty:'hard', points:400 },
{id:'bk48', text:'قصيدة "يبني يوجرمني" التراثية، من هو كاتبها الأصلي؟', options:['جابر الكاظمي', 'كاظم منظور الكربلائي', 'سليم البياتي', 'عبود غفلة'], correctIndex:1, difficulty:'hard', points:400 },
{id:'bk49', text:'ما هو اسم الألبوم الذي تضمن قصيدة "تزوروني"؟', options:['مجانينك', 'بعد ما أشوفك', 'رأيت الحسين', 'الله يحفظك'], correctIndex:0, difficulty:'hard', points:400 },
{id:'bk50', text:'في أي سنة سجل قصيدة "يا ليل طول ساعاتك" لأول مرة استوديو؟', options:['1995', '1992', '1988', '2000'], correctIndex:1, difficulty:'hard', points:400 },
{id:'bk51', text:'قصيدة "أنه أم البنين" (كليب البحر) كلمات من؟', options:['جابر الكاظمي', 'السيد عبد الخالق المحنة', 'علي السقاي', 'وسام الشويلي'], correctIndex:1, difficulty:'hard', points:400 },
{id:'bk52', text:'ما اسم الكتاب الذي يجمع قصائد جابر الكاظمي التي قرأها باسم؟', options:['ديوان الكاظمي', 'دموع القوافي', 'قصائد باسمية', 'وحي الطف'], correctIndex:1, difficulty:'hard', points:400 },
{id:'bk53', text:'أي من هذه القصائد ليست من كلمات جابر الكاظمي؟', options:['خطار إجاني', 'يا قارورة', 'أنا من أنا', 'يمه يا يمه'], correctIndex:1, difficulty:'hard', points:400 },
{id:'bk54', text:'ما هو اسم المقام الموسيقي المشهور في أداء قصيدة "يا حسين"؟', options:['مقام الرست', 'مقام الصبا', 'مقام العجم', 'مقام النهاوند'], correctIndex:0, difficulty:'hard', points:400 },
{id:'bk55', text:'قصيدة "براءة عشق" صدرت في أي عام؟', options:['2013', '2014', '2011', '2016'], correctIndex:1, difficulty:'hard', points:400 },
{id:'bk56', text:'من هو الشاعر الذي كتب "يا بو فاضل طاحت الجفين"؟', options:['حمزة الزغير (تراث)', 'سعيد الصافي', 'مهدي جناح', 'عمار الهليل'], correctIndex:0, difficulty:'hard', points:400 },
{id:'bk57', text:'في كليب "مات الماء"، في أي دولة تم التصوير؟', options:['لبنان', 'أوزبكستان', 'إيران', 'تركيا'], correctIndex:1, difficulty:'hard', points:400 },
{id:'bk58', text:'ما اسم القصيدة التي تتحدث عن السيدة نرجس؟', options:['مليكة', 'ريحانة', 'مريم', 'نرجس الغسق'], correctIndex:0, difficulty:'hard', points:400 },
{id:'bk59', text:'أي قصيدة استُخدم فيها البيانو بشكل أساسي في التوزيع؟', options:['إلى الله', 'خطار إجاني', 'صلوات', 'تجارة لن تبور'], correctIndex:0, difficulty:'hard', points:400 },
{id:'bk60', text:'كم كان عمر باسم عندما بدأ الرادودية رسمياً في المواكب؟', options:['10 سنوات', '13-14 سنة', '20 سنة', '18 سنة'], correctIndex:1, difficulty:'hard', points:400 },
]};
data.categories.push({ id:bassemKarbalai.id, name:bassemKarbalai.name, icon:bassemKarbalai.icon,questions: prepQuestions(bassemKarbalai.qs) });

    return data;
}

// دالة مساعدة لإضافة الحقول الإضافية للأسئلة
function prepQuestions(qs) {
    var result = [];
    for (var i = 0; i < qs.length; i++) {
        var q = qs[i];
        result.push({
            id: q.id,
            text: q.text,
            options: q.options,
            correctIndex: q.correctIndex,
            difficulty: q.difficulty,
            points: q.points,
            image: '',
            usedByUsers: []
        });
    }
    return result;
}

// ===== تهيئة ===========================================================================================================================
function initDB() {
    console.log('=== تهيئة قاعدة البيانات ===');
    if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

    var usersData = getPresetUsers();
    fs.writeFileSync(path.join(DB_DIR, 'users.json'), JSON.stringify(usersData, null, 2), 'utf8');
    console.log('يوزرات:', usersData.users.length);

    if (!fs.existsSync(path.join(DB_DIR, 'games.json'))) {
        fs.writeFileSync(path.join(DB_DIR, 'games.json'), JSON.stringify({ games: [] }, null, 2), 'utf8');
    }

    var qData = getQuestionsData();
    fs.writeFileSync(path.join(DB_DIR, 'questions.json'), JSON.stringify(qData, null, 2), 'utf8');
    console.log('أصناف:', qData.categories.length);

    console.log('=== تهيئة اكتملت ===');
}

// ===== المصادقة =====
app.post('/api/auth/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var data = readJSON('users.json');
    if (!data) return res.json({ success: false, message: 'خطأ' });

    if (data.admin && username === data.admin.username && password === data.admin.password) {
        req.session.userId = 'admin';
        req.session.username = 'admin';
        req.session.isAdmin = true;
        return res.json({ success: true, message: 'مرحباً أدمن!', isAdmin: true });
    }

    if (data.users) {
        for (var i = 0; i < data.users.length; i++) {
            if (data.users[i].username === username && data.users[i].password === password) {
                if (!data.users[i].active) return res.json({ success: false, message: 'اليوزر معطل' });
                req.session.userId = data.users[i].id;
                req.session.username = data.users[i].username;
                req.session.isAdmin = false;
                return res.json({ success: true, message: 'مرحباً ' + username + '!' });
            }
        }
    }
    res.json({ success: false, message: 'بيانات غير صحيحة' });
});

app.get('/api/auth/me', function(req, res) {
    if (req.session && req.session.userId) {
        res.json({ loggedIn: true, userId: req.session.userId, username: req.session.username, isAdmin: req.session.isAdmin || false });
    } else {
        res.json({ loggedIn: false });
    }
});

app.post('/api/auth/logout', function(req, res) { req.session.destroy(); res.json({ success: true }); });

// ===== الأدمن =====
app.get('/api/admin/users', function(req, res) {
    if (!req.session || !req.session.isAdmin) return res.json({ success: false });
    var data = readJSON('users.json');
    if (!data) return res.json({ success: false });
    res.json({ success: true, users: data.users });
});

app.post('/api/admin/add-user', function(req, res) {
    if (!req.session || !req.session.isAdmin) return res.json({ success: false });
    var data = readJSON('users.json');
    if (!data) return res.json({ success: false });
    for (var i = 0; i < data.users.length; i++) {
        if (data.users[i].username === req.body.username) return res.json({ success: false, message: 'موجود' });
    }
    data.users.push({ id: 'u_' + Date.now(), username: req.body.username, password: req.body.password, active: true, usedQuestions: [] });
    writeJSON('users.json', data);
    res.json({ success: true, message: 'تمت الإضافة' });
});

app.post('/api/admin/toggle-user', function(req, res) {
    if (!req.session || !req.session.isAdmin) return res.json({ success: false });
    var data = readJSON('users.json');
    if (!data) return res.json({ success: false });
    for (var i = 0; i < data.users.length; i++) {
        if (data.users[i].id === req.body.userId) {
            data.users[i].active = !data.users[i].active;
            writeJSON('users.json', data);
            return res.json({ success: true, active: data.users[i].active });
        }
    }
    res.json({ success: false });
});

app.post('/api/admin/delete-user', function(req, res) {
    if (!req.session || !req.session.isAdmin) return res.json({ success: false });
    var data = readJSON('users.json');
    if (!data) return res.json({ success: false });
    data.users = data.users.filter(function(u) { return u.id !== req.body.userId; });
    writeJSON('users.json', data);
    res.json({ success: true });
});

// إعادة تعيين أسئلة مستخدم
app.post('/api/admin/reset-user-questions', function(req, res) {
    if (!req.session || !req.session.isAdmin) return res.json({ success: false });
    var userId = req.body.userId;
    var usersData = readJSON('users.json');
    var questionsData = readJSON('questions.json');
    if (!usersData || !questionsData) return res.json({ success: false });

    for (var i = 0; i < usersData.users.length; i++) {
        if (usersData.users[i].id === userId) {
            usersData.users[i].usedQuestions = [];
            break;
        }
    }

    for (var c = 0; c < questionsData.categories.length; c++) {
        for (var q = 0; q < questionsData.categories[c].questions.length; q++) {
            var idx = questionsData.categories[c].questions[q].usedByUsers.indexOf(userId);
            if (idx !== -1) questionsData.categories[c].questions[q].usedByUsers.splice(idx, 1);
        }
    }

    writeJSON('users.json', usersData);
    writeJSON('questions.json', questionsData);
    res.json({ success: true, message: 'تم إعادة تعيين الأسئلة' });
});

// ===== اللعبة =====
app.get('/api/categories', function(req, res) {
    var data = readJSON('questions.json');
    if (!data || !data.categories) return res.json({ success: false });
    var cats = data.categories.map(function(c) {
        return { id: c.id, name: c.name, icon: c.icon, totalQuestions: c.questions.length };
    });
    res.json({ success: true, categories: cats });
});

app.post('/api/games/start', function(req, res) {
    var t1 = req.body.team1Name, t2 = req.body.team2Name;
    var t1c = req.body.team1Categories, t2c = req.body.team2Categories;
    if (!t1 || !t2 || !t1c || t1c.length !== 3 || !t2c || t2c.length !== 3) {
        return res.json({ success: false, message: 'بيانات ناقصة' });
    }

    var userId = req.session.userId || 'guest';
    var qData = readJSON('questions.json');
    var gData = readJSON('games.json');
    if (!qData || !gData) return res.json({ success: false });

    var gameId = 'game_' + Date.now();
    var allCats = t1c.concat(t2c);
    var gameQuestions = [];

    for (var c = 0; c < allCats.length; c++) {
        var cat = null;
        for (var x = 0; x < qData.categories.length; x++) {
            if (qData.categories[x].id === allCats[c]) { cat = qData.categories[x]; break; }
        }
        if (!cat) continue;
        var diffs = ['easy', 'medium', 'hard'];
        for (var d = 0; d < diffs.length; d++) {
            // استبعاد الأسئلة المستخدمة من قبل هذا المستخدم
            var avail = cat.questions.filter(function(q) {
                return q.difficulty === diffs[d] && q.usedByUsers.indexOf(userId) === -1;
            });
            var sel = shuffleArray(avail).slice(0, 2);
            for (var s = 0; s < sel.length; s++) {
                gameQuestions.push({
                    questionId: sel[s].id, categoryId: allCats[c], categoryName: cat.name,
                    text: sel[s].text, options: sel[s].options, correctIndex: sel[s].correctIndex,
                    difficulty: diffs[d], points: sel[s].points, image: sel[s].image || '',
                    answered: false, answeredBy: null, isCorrect: null, selectedOption: null
                });
                // تسجيل استخدام المستخدم لهذا السؤال
                sel[s].usedByUsers.push(userId);
            }
        }
    }

    writeJSON('questions.json', qData);

    gData.games.push({
        id: gameId,
        userId: userId,
        team1: { name: t1, categories: t1c, score: 0, helps: { remove2: 1, extraTime: 1, changeQ: 1 } },
        team2: { name: t2, categories: t2c, score: 0, helps: { remove2: 1, extraTime: 1, changeQ: 1 } },
        questions: gameQuestions,
        status: 'playing',
        createdAt: new Date().toISOString()
    });
    writeJSON('games.json', gData);
    res.json({ success: true, gameId: gameId });
});

app.get('/api/games/:gameId/board', function(req, res) {
    var gData = readJSON('games.json');
    if (!gData) return res.json({ success: false });
    var game = null;
    for (var i = 0; i < gData.games.length; i++) { if (gData.games[i].id === req.params.gameId) { game = gData.games[i]; break; } }
    if (!game) return res.json({ success: false });
    if (game.status === 'finished') return res.json({ success: true, status: 'finished' });

    var board = {};
    for (var j = 0; j < game.questions.length; j++) {
        var q = game.questions[j];
        if (!board[q.categoryName]) board[q.categoryName] = { categoryId: q.categoryId, categoryName: q.categoryName, easy: [], medium: [], hard: [] };
        board[q.categoryName][q.difficulty].push({ questionId: q.questionId, answered: q.answered, points: q.points });
    }
    var arr = [];
    for (var key in board) arr.push(board[key]);

    res.json({
        success: true, board: arr,
        team1: { name: game.team1.name, score: game.team1.score, helps: game.team1.helps },
        team2: { name: game.team2.name, score: game.team2.score, helps: game.team2.helps },
        status: game.status
    });
});

app.get('/api/games/:gameId/question/:questionId', function(req, res) {
    var gData = readJSON('games.json');
    if (!gData) return res.json({ success: false });
    var game = null;
    for (var i = 0; i < gData.games.length; i++) { if (gData.games[i].id === req.params.gameId) { game = gData.games[i]; break; } }
    if (!game) return res.json({ success: false });
    var q = null;
    for (var j = 0; j < game.questions.length; j++) { if (game.questions[j].questionId === req.params.questionId) { q = game.questions[j]; break; } }
    if (!q || q.answered) return res.json({ success: false });
    res.json({ success: true, question: { questionId: q.questionId, categoryName: q.categoryName, text: q.text, options: q.options, difficulty: q.difficulty, points: q.points, image: q.image } });
});

app.post('/api/games/:gameId/use-help', function(req, res) {
    var helpType = req.body.helpType, team = req.body.team, questionId = req.body.questionId;
    var gData = readJSON('games.json');
    if (!gData) return res.json({ success: false });
    var game = null;
    for (var i = 0; i < gData.games.length; i++) { if (gData.games[i].id === req.params.gameId) { game = gData.games[i]; break; } }
    if (!game) return res.json({ success: false });
    var td = (team === 'team1') ? game.team1 : game.team2;
    if (!td.helps[helpType] || td.helps[helpType] <= 0) return res.json({ success: false, message: 'لا تملك' });
    td.helps[helpType]--;

    if (helpType === 'remove2') {
        var q = null;
        for (var j = 0; j < game.questions.length; j++) { if (game.questions[j].questionId === questionId) { q = game.questions[j]; break; } }
        if (!q) return res.json({ success: false });
        var wrong = [];
        for (var k = 0; k < q.options.length; k++) { if (k !== q.correctIndex) wrong.push(k); }
        writeJSON('games.json', gData);
        return res.json({ success: true, helpType: 'remove2', removeIndexes: shuffleArray(wrong).slice(0, 2), helps: td.helps });
    }
    if (helpType === 'extraTime') {
        writeJSON('games.json', gData);
        return res.json({ success: true, helpType: 'extraTime', extraSeconds: 30, helps: td.helps });
    }
    if (helpType === 'changeQ') {
        var oldQ = null, oldIdx = -1;
        for (var m = 0; m < game.questions.length; m++) { if (game.questions[m].questionId === questionId) { oldQ = game.questions[m]; oldIdx = m; break; } }
        if (!oldQ) return res.json({ success: false });
        var qData = readJSON('questions.json');
        var cat = null;
        for (var n = 0; n < qData.categories.length; n++) { if (qData.categories[n].id === oldQ.categoryId) { cat = qData.categories[n]; break; } }
        var avail = [];
        if (cat) {
            for (var p = 0; p < cat.questions.length; p++) {
                if (cat.questions[p].difficulty === oldQ.difficulty && cat.questions[p].id !== oldQ.questionId) {
                    var used = false;
                    for (var r = 0; r < game.questions.length; r++) { if (game.questions[r].questionId === cat.questions[p].id) { used = true; break; } }
                    if (!used && cat.questions[p].usedByUsers.indexOf(game.userId) === -1) avail.push(cat.questions[p]);
                }
            }
        }
        if (avail.length === 0) { td.helps.changeQ++; writeJSON('games.json', gData); return res.json({ success: false, message: 'لا بديل' }); }
        var nq = avail[Math.floor(Math.random() * avail.length)];
        game.questions[oldIdx] = { questionId: nq.id, categoryId: oldQ.categoryId, categoryName: oldQ.categoryName, text: nq.text, options: nq.options, correctIndex: nq.correctIndex, difficulty: nq.difficulty, points: nq.points, image: nq.image || '', answered: false, answeredBy: null, isCorrect: null, selectedOption: null };
        nq.usedByUsers.push(game.userId);
        writeJSON('games.json', gData);
        writeJSON('questions.json', qData);
        return res.json({ success: true, helpType: 'changeQ', helps: td.helps, newQuestion: { questionId: nq.id, categoryName: oldQ.categoryName, text: nq.text, options: nq.options, difficulty: nq.difficulty, points: nq.points, image: nq.image || '' } });
    }
    writeJSON('games.json', gData);
    res.json({ success: false });
});

// تقديم إجابة (مع اختيار الفريق)
app.post('/api/games/:gameId/answer', function(req, res) {
    var questionId = req.body.questionId, selectedOption = req.body.selectedOption, team = req.body.team;
    var gData = readJSON('games.json');
    if (!gData) return res.json({ success: false });
    var game = null;
    for (var i = 0; i < gData.games.length; i++) { if (gData.games[i].id === req.params.gameId) { game = gData.games[i]; break; } }
    if (!game) return res.json({ success: false });
    var question = null;
    for (var j = 0; j < game.questions.length; j++) { if (game.questions[j].questionId === questionId && !game.questions[j].answered) { question = game.questions[j]; break; } }
    if (!question) return res.json({ success: false });

    var isCorrect = (selectedOption === question.correctIndex);
    question.answered = true;
    question.answeredBy = team;
    question.isCorrect = isCorrect;
    question.selectedOption = selectedOption;

    if (isCorrect) {
        if (team === 'team1') game.team1.score += question.points;
        else game.team2.score += question.points;
    }

    var remaining = 0;
    for (var k = 0; k < game.questions.length; k++) { if (!game.questions[k].answered) remaining++; }
    if (remaining === 0) game.status = 'finished';

    writeJSON('games.json', gData);
    res.json({ success: true, isCorrect: isCorrect, correctIndex: question.correctIndex, pointsEarned: isCorrect ? question.points : 0, team1Score: game.team1.score, team2Score: game.team2.score, finished: game.status === 'finished', remaining: remaining });
});

// تعديل النقاط يدوياً
app.post('/api/games/:gameId/edit-score', function(req, res) {
    var team = req.body.team;
    
    var gData = readJSON('games.json');
    if (!gData) return res.json({ success: false });
    
    var game = null;
    for (var i = 0; i < gData.games.length; i++) { 
        if (gData.games[i].id === req.params.gameId) { 
            game = gData.games[i]; 
            break; 
        } 
    }
    
    if (!game) return res.json({ success: false });

    if (team === 'team1') {
        game.team1.score += 100; 
    } else {
        game.team2.score += 100;
    }

    writeJSON('games.json', gData);
    res.json({ success: true, team1Score: game.team1.score, team2Score: game.team2.score });
});

// النتائج
app.get('/api/games/:gameId/results', function(req, res) {
    var gData = readJSON('games.json');
    if (!gData) return res.json({ success: false });
    var game = null;
    for (var i = 0; i < gData.games.length; i++) { if (gData.games[i].id === req.params.gameId) { game = gData.games[i]; break; } }
    if (!game) return res.json({ success: false });
    var winner = 'تعادل!';
    if (game.team1.score > game.team2.score) winner = game.team1.name;
    else if (game.team2.score > game.team1.score) winner = game.team2.name;
    var stats = {};
    for (var j = 0; j < game.questions.length; j++) {
        var q = game.questions[j];
        if (!stats[q.categoryName]) stats[q.categoryName] = { total: 0, correct: 0, points: 0 };
        stats[q.categoryName].total++;
        if (q.isCorrect) { stats[q.categoryName].correct++; stats[q.categoryName].points += q.points; }
    }
    res.json({ success: true, team1: { name: game.team1.name, score: game.team1.score }, team2: { name: game.team2.name, score: game.team2.score }, winner: winner, categoryStats: stats });
});

app.get('/', function(req, res) { res.sendFile(path.join(__dirname, 'public', 'index.html')); });

initDB();
app.listen(PORT, function() {
    console.log('========================================');
    console.log('  سيرفر چگار: http://localhost:' + PORT);
    console.log('  أدمن: reder / reder11');
    console.log('  يوزرات: player01-20 / jkar2024');
    console.log('========================================');
});