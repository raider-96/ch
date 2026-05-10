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
            { id: 'u1', username: 'player01', password: 'jkar2024', active: true, usedQuestions: [] },
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
    var data = { categories: [] };

    var cats = [
        { id: 'sport', name: 'رياضة', icon: '⚽', qs: [
            { id: 'sp1', text: 'من هو هداف كأس العالم 2022؟', options: ['كيليان مبابي', 'ليونيل ميسي', 'جيرو', 'ألفاريز'], correctIndex: 0, difficulty: 'easy', points: 100 },
            { id: 'sp2', text: 'كم مرة فاز البرازيل بكأس العالم؟', options: ['3', '4', '5', '6'], correctIndex: 2, difficulty: 'easy', points: 100 },
            { id: 'sp3', text: 'في أي عام أقيمت أول كأس عالم؟', options: ['1926', '1930', '1934', '1928'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'sp4', text: 'من فاز بكأس العالم 2018؟', options: ['كرواتيا', 'فرنسا', 'بلجيكا', 'إنجلترا'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'sp5', text: 'من أكثر لاعب فوزا بالكرة الذهبية؟', options: ['رونالدو', 'ميسي', 'بلاتيني', 'كرويف'], correctIndex: 1, difficulty: 'medium', points: 200 },
            { id: 'sp6', text: 'أكثر نادي فوزا بدوري الأبطال؟', options: ['برشلونة', 'بايرن', 'ريال مدريد', 'ميلان'], correctIndex: 2, difficulty: 'medium', points: 200 },
            { id: 'sp7', text: 'من فاز بكأس آسيا 2023؟', options: ['قطر', 'السعودية', 'اليابان', 'الأردن'], correctIndex: 0, difficulty: 'medium', points: 200 },
            { id: 'sp8', text: 'ملعب نهائي مونديال 2022؟', options: ['البيت', 'الثمامة', 'لوسيل', 'أحمد بن علي'], correctIndex: 2, difficulty: 'medium', points: 200 },
            { id: 'sp9', text: 'أهداف غيرد مولر في مونديال 1970؟', options: ['8', '10', '12', '14'], correctIndex: 1, difficulty: 'hard', points: 400 },
            { id: 'sp10', text: 'أول عربي بنهائي دوري الأبطال؟', options: ['محمد صلاح', 'بن عطية', 'محرز', 'خضيرا'], correctIndex: 0, difficulty: 'hard', points: 400 }
        ]},
        { id: 'series', name: 'مسلسلات', icon: '🎬', qs: [
            { id: 'sr1', text: 'من بطل مسلسل باب الحارة؟', options: ['تيم حسن', 'عباس النوري', 'وائل شرف', 'سامر المصري'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'sr2', text: 'مسلسل الهيبة من بطولة؟', options: ['باسم مغنية', 'تيم حسن', 'قصي خولي', 'مكسيم خليل'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'sr3', text: 'جنسية مسلسل وادي الذئاب؟', options: ['سوري', 'تركي', 'مصري', 'لبناني'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'sr4', text: 'بطل مسلسل عمر المختار؟', options: ['أنتوني كوين', 'عمر الشريف', 'أحمد مظهر', 'العلايلي'], correctIndex: 0, difficulty: 'easy', points: 100 },
            { id: 'sr5', text: 'بطلة مسلسل حريم السلطان؟', options: ['بيرين سات', 'مريم أوزرلي', 'توبا', 'نور'], correctIndex: 1, difficulty: 'medium', points: 200 },
            { id: 'sr6', text: 'مسلسل خلف الشمس من أي سنة؟', options: ['2005', '2008', '2010', '2012'], correctIndex: 1, difficulty: 'medium', points: 200 },
            { id: 'sr7', text: 'من أخرج Game of Thrones؟', options: ['بينيوف فقط', 'عدة مخرجين', 'جاكسون', 'نولان'], correctIndex: 1, difficulty: 'medium', points: 200 },
            { id: 'sr8', text: 'مسلسل عراقي عن الأحياء الشعبية؟', options: ['الذئب وعيون المدينة', 'تحت موسى', 'النسر', 'بيوت الطين'], correctIndex: 0, difficulty: 'medium', points: 200 },
            { id: 'sr9', text: 'متى عرض رأفت الهجان؟', options: ['1986', '1988', '1990', '1992'], correctIndex: 1, difficulty: 'hard', points: 400 },
            { id: 'sr10', text: 'وادي الذئاب كم موسم؟', options: ['7', '9', '10', '13'], correctIndex: 2, difficulty: 'hard', points: 400 }
        ]},
        { id: 'geography', name: 'جغرافية', icon: '🌍', qs: [
            { id: 'ge1', text: 'عاصمة أستراليا؟', options: ['سيدني', 'ملبورن', 'كانبيرا', 'بريزبن'], correctIndex: 2, difficulty: 'easy', points: 100 },
            { id: 'ge2', text: 'أطول نهر في العالم؟', options: ['النيل', 'الأمازون', 'المسيسبي', 'اليانغتسي'], correctIndex: 0, difficulty: 'easy', points: 100 },
            { id: 'ge3', text: 'قارة البرازيل؟', options: ['أمريكا الشمالية', 'أمريكا الجنوبية', 'أوروبا', 'أفريقيا'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'ge4', text: 'عاصمة كازاخستان؟', options: ['ألماتي', 'أستانا', 'بيشكيك', 'طشقند'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'ge5', text: 'أصغر دولة في العالم؟', options: ['موناكو', 'الفاتيكان', 'سان مارينو', 'مالطا'], correctIndex: 1, difficulty: 'medium', points: 200 },
            { id: 'ge6', text: 'البحر بين أوروبا وأفريقيا؟', options: ['الأحمر', 'المتوسط', 'العرب', 'الأسود'], correctIndex: 1, difficulty: 'medium', points: 200 },
            { id: 'ge7', text: 'عدد الدول العربية؟', options: ['20', '22', '24', '18'], correctIndex: 1, difficulty: 'medium', points: 200 },
            { id: 'ge8', text: 'أكبر جزيرة في العالم؟', options: ['مدغشقر', 'غرينلاند', 'بورنيو', 'سومطرة'], correctIndex: 1, difficulty: 'medium', points: 200 },
            { id: 'ge9', text: 'أكبر عدد بحيرات بأي دولة؟', options: ['روسيا', 'كندا', 'البرازيل', 'فنلندا'], correctIndex: 1, difficulty: 'hard', points: 400 },
            { id: 'ge10', text: 'أعمق محيط؟', options: ['الأطلسي', 'الهندي', 'الهادئ', 'المتجمد'], correctIndex: 2, difficulty: 'hard', points: 400 }
        ]},
        { id: 'history', name: 'تاريخ', icon: '📜', qs: [
            { id: 'hi1', text: 'تأسيس الدولة العراقية؟', options: ['1920', '1921', '1932', '1918'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'hi2', text: 'أول ملك للعراق؟', options: ['فيصل الأول', 'فيصل الثاني', 'غازي', 'عبد الإله'], correctIndex: 0, difficulty: 'easy', points: 100 },
            { id: 'hi3', text: 'فتح القسطنطينية؟', options: ['1453', '1492', '1517', '1258'], correctIndex: 0, difficulty: 'easy', points: 100 },
            { id: 'hi4', text: 'من فتح مصر؟', options: ['خالد بن الوليد', 'عمرو بن العاص', 'سعد بن أبي وقاص', 'أبو عبيدة'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'hi5', text: 'سقوط بغداد بيد المغول؟', options: ['1258', '1187', '1300', '1220'], correctIndex: 0, difficulty: 'medium', points: 200 },
            { id: 'hi6', text: 'من بنى بغداد؟', options: ['هارون الرشيد', 'أبو جعفر المنصور', 'المأمون', 'المعتصم'], correctIndex: 1, difficulty: 'medium', points: 200 },
            { id: 'hi7', text: 'قائد ثورة العشرين؟', options: ['الهاشمي', 'عدة زعماء قبائل', 'نوري السعيد', 'الكيلاني'], correctIndex: 1, difficulty: 'medium', points: 200 },
            { id: 'hi8', text: 'معركة المسلمين ضد الفرس؟', options: ['حطين', 'اليرموك', 'القادسية', 'بدر'], correctIndex: 2, difficulty: 'medium', points: 200 },
            { id: 'hi9', text: 'معركة صلاح الدين 1187؟', options: ['عين جالوت', 'حطين', 'اليرموك', 'القادسية'], correctIndex: 1, difficulty: 'hard', points: 400 },
            { id: 'hi10', text: 'ثورة 14 تموز متى؟', options: ['1956', '1958', '1960', '1963'], correctIndex: 1, difficulty: 'hard', points: 400 }
        ]},
        { id: 'cartoon', name: 'كارتون قديم', icon: '📺', qs: [
            { id: 'ca1', text: 'فتاة تعيش مع جدها بالجبال؟', options: ['ساندي بل', 'هايدي', 'سالي', 'ريمي'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'ca2', text: 'اسم القط في توم وجيري؟', options: ['جيري', 'توم', 'سيلفستر', 'غارفيلد'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'ca3', text: 'كرتون كرة القدم الشهير؟', options: ['كابتن ماجد', 'سلام دانك', 'أبطال الملاعب', 'كرة القدم'], correctIndex: 0, difficulty: 'easy', points: 100 },
            { id: 'ca4', text: 'روبوت مازنجر؟', options: ['مازنجر Z', 'غرندايزر', 'فولترون', 'جايكنغ'], correctIndex: 0, difficulty: 'easy', points: 100 },
            { id: 'ca5', text: 'صديق غرندايزر؟', options: ['كوجي', 'دايسكي', 'هيكارو', 'تيتسويا'], correctIndex: 1, difficulty: 'medium', points: 200 },
            { id: 'ca6', text: 'أجزاء Dragon Ball؟', options: ['3', '4', '5', '6'], correctIndex: 2, difficulty: 'medium', points: 200 },
            { id: 'ca7', text: 'كرتون عن محقق صغير؟', options: ['كونان', 'سندباد', 'زينة ونحول', 'ساسوكي'], correctIndex: 0, difficulty: 'medium', points: 200 },
            { id: 'ca8', text: 'فتاة يتيمة في المدرسة؟', options: ['سالي', 'هايدي', 'ساندي بل', 'ريمي'], correctIndex: 0, difficulty: 'medium', points: 200 },
            { id: 'ca9', text: 'بداية عرض مغامرات سندباد؟', options: ['1975', '1978', '1980', '1983'], correctIndex: 1, difficulty: 'hard', points: 400 },
            { id: 'ca10', text: 'صانع ميكي ماوس؟', options: ['والت ديزني', 'سبيلبرغ', 'ميازاكي', 'تشاك جونز'], correctIndex: 0, difficulty: 'hard', points: 400 }
        ]},
        { id: 'celebrities', name: 'مشاهير', icon: '⭐', qs: [
            { id: 'ce1', text: 'من ملك البوب؟', options: ['إلفيس', 'مايكل جاكسون', 'برنس', 'تمبرليك'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'ce2', text: 'من لعب Iron Man؟', options: ['كريس إيفانز', 'روبرت داوني', 'هيمسوورث', 'رافالو'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'ce3', text: 'كوكب الشرق؟', options: ['فيروز', 'أم كلثوم', 'وردة', 'صباح'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'ce4', text: 'سيدة الشاشة العربية؟', options: ['سعاد حسني', 'فاتن حمامة', 'هند رستم', 'شادية'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'ce5', text: 'قيصر الأغنية العربية؟', options: ['كاظم الساهر', 'ماجد المهندس', 'حسام الرسام', 'عبد الجبار'], correctIndex: 0, difficulty: 'medium', points: 200 },
            { id: 'ce6', text: 'الشحرورة؟', options: ['فيروز', 'صباح', 'وردة', 'نجاة'], correctIndex: 1, difficulty: 'medium', points: 200 },
            { id: 'ce7', text: 'أوسكار أفضل ممثل 2024؟', options: ['كيليان مورفي', 'برادلي كوبر', 'دي كابريو', 'رايت'], correctIndex: 0, difficulty: 'medium', points: 200 },
            { id: 'ce8', text: 'صوت سبونج بوب بالعربي؟', options: ['طارق العربي', 'أحمد مصطفى', 'عدة ممثلين', 'محمد رجب'], correctIndex: 2, difficulty: 'medium', points: 200 },
            { id: 'ce9', text: 'سنة ميلاد كاظم الساهر؟', options: ['1957', '1961', '1963', '1965'], correctIndex: 1, difficulty: 'hard', points: 400 },
            { id: 'ce10', text: 'أول عربي نوبل بالأدب؟', options: ['طه حسين', 'نجيب محفوظ', 'أدونيس', 'درويش'], correctIndex: 1, difficulty: 'hard', points: 400 }
        ]},
        { id: 'characters', name: 'شخصيات', icon: '👤', qs: [
            { id: 'ch1', text: 'مؤسس مايكروسوفت؟', options: ['جوبز', 'بيل غيتس', 'زوكربيرغ', 'ماسك'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'ch2', text: 'مؤسس تسلا؟', options: ['بيزوس', 'إيلون ماسك', 'لاري بيج', 'تيم كوك'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'ch3', text: 'أول رئيس أمريكي؟', options: ['جيفرسون', 'واشنطن', 'لنكولن', 'آدمز'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'ch4', text: 'أول امرأة نوبل؟', options: ['ماري كوري', 'فرانكلين', 'أوستن', 'إيرهارت'], correctIndex: 0, difficulty: 'easy', points: 100 },
            { id: 'ch5', text: 'مخترع الجبر؟', options: ['ابن سينا', 'الخوارزمي', 'ابن الهيثم', 'الرازي'], correctIndex: 1, difficulty: 'medium', points: 200 },
            { id: 'ch6', text: 'فاتح الأندلس؟', options: ['طارق بن زياد', 'موسى بن نصير', 'عقبة', 'خالد'], correctIndex: 0, difficulty: 'medium', points: 200 },
            { id: 'ch7', text: 'مؤسس الدولة الأموية؟', options: ['عبد الملك', 'معاوية', 'يزيد', 'مروان'], correctIndex: 1, difficulty: 'medium', points: 200 },
            { id: 'ch8', text: 'مكتشف الدورة الدموية الصغرى؟', options: ['ابن سينا', 'الرازي', 'ابن النفيس', 'الزهراوي'], correctIndex: 2, difficulty: 'medium', points: 200 },
            { id: 'ch9', text: 'نظرية النسبية؟', options: ['نيوتن', 'آينشتاين', 'هوكينغ', 'بور'], correctIndex: 1, difficulty: 'hard', points: 400 },
            { id: 'ch10', text: 'مخترع المصباح؟', options: ['تسلا', 'إديسون', 'بيل', 'واط'], correctIndex: 1, difficulty: 'hard', points: 400 }
        ]},
        { id: 'brands', name: 'ماركات', icon: '🏷️', qs: [
            { id: 'br1', text: 'شعار التفاحة المقضومة؟', options: ['سامسونغ', 'آبل', 'هواوي', 'جوجل'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'br2', text: 'شعار Just Do It؟', options: ['أديداس', 'بوما', 'نايكي', 'ريبوك'], correctIndex: 2, difficulty: 'easy', points: 100 },
            { id: 'br3', text: 'سيارة شعارها الحصان الجامح؟', options: ['لامبورغيني', 'فيراري', 'بورش', 'ماكلارين'], correctIndex: 1, difficulty: 'easy', points: 100 },
            { id: 'br4', text: 'شعار الخطوط الثلاثة؟', options: ['نايكي', 'بوما', 'أديداس', 'ريبوك'], correctIndex: 2, difficulty: 'easy', points: 100 },
            { id: 'br5', text: 'بلد تأسيس تويوتا؟', options: ['كوريا', 'الصين', 'اليابان', 'ألمانيا'], correctIndex: 2, difficulty: 'medium', points: 200 },
            { id: 'br6', text: 'ماركة شعارها الأسد؟', options: ['بيجو', 'رينو', 'ستروين', 'فيات'], correctIndex: 0, difficulty: 'medium', points: 200 },
            { id: 'br7', text: 'أغلى ماركة أزياء 2024؟', options: ['غوتشي', 'لويس فيتون', 'شانيل', 'هيرميس'], correctIndex: 1, difficulty: 'medium', points: 200 },
            { id: 'br8', text: 'مؤسس أمازون؟', options: ['ماسك', 'جيف بيزوس', 'غيتس', 'زوكربيرغ'], correctIndex: 1, difficulty: 'medium', points: 200 },
            { id: 'br9', text: 'تأسيس كوكا كولا؟', options: ['1886', '1892', '1900', '1876'], correctIndex: 0, difficulty: 'hard', points: 400 },
            { id: 'br10', text: 'مؤسس زارا؟', options: ['أرماني', 'أورتيغا', 'لورين', 'كلاين'], correctIndex: 1, difficulty: 'hard', points: 400 }
        ]}
    ];

    for (var i = 0; i < cats.length; i++) {
        var c = cats[i];
        var questions = [];
        for (var j = 0; j < c.qs.length; j++) {
            var q = c.qs[j];
            questions.push({
                id: q.id, text: q.text, options: q.options,
                correctIndex: q.correctIndex, difficulty: q.difficulty,
                points: q.points, image: '', usedByUsers: []
            });
        }
        data.categories.push({ id: c.id, name: c.name, icon: c.icon, questions: questions });
    }
    return data;
}

// ===== تهيئة =====
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
    var team = req.body.team, newScore = parseInt(req.body.newScore);
    var gData = readJSON('games.json');
    if (!gData) return res.json({ success: false });
    var game = null;
    for (var i = 0; i < gData.games.length; i++) { if (gData.games[i].id === req.params.gameId) { game = gData.games[i]; break; } }
    if (!game) return res.json({ success: false });

    if (team === 'team1') game.team1.score = newScore;
    else game.team2.score = newScore;

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