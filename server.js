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
    var data = { categories: [] };

    // ==================== 1. مسلسلات عربية ====================
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

    // ==================== 2. مسلسلات أجنبية ====================
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

    // ==================== 3. مسلسلات أنمي ====================
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

    // ==================== 4. أفلام عربية ====================
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

    // ==================== 5. أفلام أجنبية ====================
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