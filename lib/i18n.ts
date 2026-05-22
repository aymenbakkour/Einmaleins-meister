import { Language } from "./types";

export const translations = {
  de: {
    back: "Zurück",
    appTitle: "Mathe Meister",
    stats: "Statistiken",
    welcomeBack: "Willkommen zurück, {name}!",
    welcomeNew: "Willkommen!",
    starsCollected: "Du hast bisher {stars} Sterne gesammelt. Weiter so!",
    whatToPractice: "Was möchtest du üben?",
    multiply: "Multiplikation",
    divide: "Division",
    add: "Addition",
    subtract: "Subtraktion",
    difficulty: "Schwierigkeit",
    easy: "Leicht",
    medium: "Mittel",
    hard: "Schwer",
    learn: "Lernen",
    learnDesc: "Schau dir die Reihen an",
    test: "Testen",
    testDesc: "Zeig, was du kannst!",
    print: "Drucken",
    printDesc: "Arbeitsblatt als PDF",
    certificate: "Zertifikat",
    settings: "Einstellungen",
    devBy: "Entwickelt von",
    
    // Learn Mode
    learnTitle: "Die {operation}",
    learnSubtitle: "Wähle eine Zahl, um die Reihe zu lernen",
    theSeries: "Die {num}er-Reihe",
    
    // Test Mode
    questionOf: "Frage {current} / {total}",
    points: "{score} Punkte",
    howMuchIs: "Wie viel ist das?",
    testFinished: "Test beendet!",
    testResult: "Du hast {score} von {total} Fragen richtig beantwortet.",
    perfect: "Perfekt! Du bist ein Mathe-Genie! 🌟",
    great: "Super gemacht! Fast alles richtig! 👍",
    good: "Gut gemacht! Übe noch ein bisschen weiter. 💪",
    tryAgain: "Übung macht den Meister! Versuch es gleich nochmal. 📚",
    playAgain: "Nochmal spielen",
    
    // Print Mode
    createWorksheet: "Arbeitsblatt erstellen",
    printRandom: "Drucke ein zufälliges Übungsblatt aus",
    printPdf: "Drucken / PDF",
    worksheetTitle: "{operation} Übungsblatt",
    name: "Name:",
    date: "Datum:",
    
    // Stats Mode
    yourStats: "Deine Statistiken",
    statsDesc: "Hier siehst du deinen Lernfortschritt",
    totalGames: "Gespielte Spiele",
    totalStars: "Gesammelte Sterne",
    history: "Dein Verlauf",
    clearStats: "Statistiken löschen",
    noGamesYet: "Noch keine Spiele gespielt. Fang gleich an!",
    
    // Settings / Profile
    profileSetup: "Profil einrichten",
    profileSettings: "Profileinstellungen",
    childName: "Name des Kindes",
    birthdate: "Geburtsdatum",
    save: "Speichern",
    language: "Sprache",
    
    // Certificate
    certificateTitle: "Urkunde",
    certificateSubtitle: "Für herausragende Leistungen in Mathematik",
    awardedTo: "Verliehen an",
    forCollecting: "für das Sammeln von",
    starsIn: "Sternen in",
    games: "Spielen",
    mathGenius: "Mathe-Genie",
    downloadPdf: "Als PDF herunterladen",
    
    // Vertical Math
    verticalMath: "Schriftliches Rechnen",
    verticalMathDesc: "Schriftliche Addition & Subtraktion im Zehner-, Hunderter- oder Tausenderraum",
    verticalAdd: "Schriftliche Addition",
    verticalSub: "Schriftliche Subtraktion",
    range: "Bereich",
    tens: "Zehner (bis 100)",
    hundreds: "Hunderter (bis 1000)",
    thousands: "Tausender (bis 10000)",
    explanation: "Erklärung",
    stepByStep: "Schritt-für-Schritt",
    carryOver: "Übertrag",
    borrow: "Übertrag / Entleihen",
    columns: "Stellenwert-Tabelle",
    onesColumn: "Einer (E)",
    tensColumn: "Zehner (Z)",
    hundredsColumn: "Hunderter (H)",
    thousandsColumn: "Tausender (T)",
    additionExplanation: "Schreibe die Zahlen genau untereinander (Einer unter Einer, Zehner unter Zehner usw.). Addiere von rechts nach links. Wenn das Ergebnis 10 oder mehr ist, schreibe den Einer auf und nimm den Zehner als kleinen 'Übertrag' mit in die nächste Spalte.",
    subtractionExplanation: "Schreibe die Zahlen untereinander. Subtrahiere von rechts nach links (obere Zahl minus untere Zahl). Wenn die obere Ziffer kleiner ist als die untere, entleihe 1 Zehner von der linken Spalte (Übertrag/Wechseln), addiere 10 zur oberen Ziffer und ziehe dann ab.",
    startQuiz: "Test starten",
    correct: "Richtig!",
    wrong: "Falsch, versuche es noch einmal!",
    submitAnswer: "Prüfen",
    nextQuestion: "Nächste Frage",
    hint: "Tipp",
  },
  ar: {
    back: "رجوع",
    appTitle: "بطل الرياضيات",
    stats: "الإحصائيات",
    welcomeBack: "مرحباً بعودتك يا {name}!",
    welcomeNew: "مرحباً بك!",
    starsCollected: "لقد جمعت {stars} نجوم حتى الآن. استمر!",
    whatToPractice: "ماذا تريد أن تتمرن؟",
    multiply: "الضرب",
    divide: "القسمة",
    add: "الجمع",
    subtract: "الطرح",
    difficulty: "مستوى الصعوبة",
    easy: "سهل",
    medium: "متوسط",
    hard: "صعب",
    learn: "تعلّم",
    learnDesc: "راجع الجداول",
    test: "اختبار",
    testDesc: "أرنا مهارتك!",
    print: "طباعة",
    printDesc: "ورقة عمل PDF",
    certificate: "الشهادة",
    settings: "الإعدادات",
    devBy: "تطوير",
    
    // Learn Mode
    learnTitle: "جداول {operation}",
    learnSubtitle: "اختر رقماً لتعلم جدوله",
    theSeries: "جدول الـ {num}",
    
    // Test Mode
    questionOf: "سؤال {current} / {total}",
    points: "{score} نقاط",
    howMuchIs: "كم يساوي هذا؟",
    testFinished: "انتهى الاختبار!",
    testResult: "لقد أجبت بشكل صحيح على {score} من أصل {total} أسئلة.",
    perfect: "ممتاز! أنت عبقري في الرياضيات! 🌟",
    great: "عمل رائع! إجاباتك شبه كاملة! 👍",
    good: "أحسنت! تدرب أكثر قليلاً. 💪",
    tryAgain: "الممارسة تصنع التميز! حاول مرة أخرى. 📚",
    playAgain: "العب مرة أخرى",
    
    // Print Mode
    createWorksheet: "إنشاء ورقة عمل",
    printRandom: "اطبع ورقة عمل عشوائية",
    printPdf: "طباعة / PDF",
    worksheetTitle: "ورقة عمل {operation}",
    name: "الاسم:",
    date: "التاريخ:",
    
    // Stats Mode
    yourStats: "إحصائياتك",
    statsDesc: "هنا يمكنك رؤية تقدمك في التعلم",
    totalGames: "الألعاب الملعوبة",
    totalStars: "النجوم المجمعة",
    history: "سجلك",
    clearStats: "مسح الإحصائيات",
    noGamesYet: "لم تلعب أي ألعاب بعد. ابدأ الآن!",
    
    // Settings / Profile
    profileSetup: "إعداد الملف الشخصي",
    profileSettings: "إعدادات الملف الشخصي",
    childName: "اسم الطفل",
    birthdate: "تاريخ الميلاد",
    save: "حفظ",
    language: "اللغة",
    
    // Certificate
    certificateTitle: "شهادة تقدير",
    certificateSubtitle: "للأداء المتميز في الرياضيات",
    awardedTo: "تُمنح إلى",
    forCollecting: "لجمعه",
    starsIn: "نجمة في",
    games: "لعبة",
    mathGenius: "عبقري الرياضيات",
    downloadPdf: "تحميل كـ PDF",
    
    // Vertical Math
    verticalMath: "الحساب العمودي",
    verticalMathDesc: "جمع وطرح عمودي بالأرقام (عشرات، مئات، أو آلاف)",
    verticalAdd: "الجمع العمودي",
    verticalSub: "الطرح العمودي",
    range: "المدى",
    tens: "العشرات (حتى 100)",
    hundreds: "المئات (حتى 1000)",
    thousands: "الآلاف (حتى 10000)",
    explanation: "الشرح الطريقة",
    stepByStep: "خطوة بخطوة",
    carryOver: "الاحتفاظ / باليد",
    borrow: "الاستلاف",
    columns: "جدول المنازل",
    onesColumn: "الآحاد (أ)",
    tensColumn: "العشرات (ع)",
    hundredsColumn: "المئات (م)",
    thousandsColumn: "الآلاف (خ)",
    additionExplanation: "اكتب الأرقام تحت بعضها تمامًا (الآحاد تحت الآحاد، العشرات تحت العشرات، إلخ). اجمع من اليمين إلى اليسار. إذا كان الناتج 10 أو أكثر، نكتب رقم الآحاد ونحتفظ برقم العشرات (كـ باليد) لنجمعه مع العمود التالي.",
    subtractionExplanation: "اكتب الأرقام تحت بعضها تمامًا. اطرح من اليمين إلى اليسار (الرقم العلوي ناقص الرقم السفلي). إذا كان الرقم العلوي أصغر من السفلي، نستلف 1 من العمود التالي على اليسار (يصبح 10)، ثم نطرح بشكل طبيعي.",
    startQuiz: "ابدأ الاختبار",
    correct: "صحيح!",
    wrong: "خطأ، حاول مرة أخرى!",
    submitAnswer: "تحقق من الإجابة",
    nextQuestion: "السؤال التالي",
    hint: "تلميح",
  }
};

export function useTranslation(lang: Language) {
  const t = (key: keyof typeof translations.de, params?: Record<string, string | number>) => {
    let text = translations[lang][key] || translations.de[key];
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };
  return { t };
}
