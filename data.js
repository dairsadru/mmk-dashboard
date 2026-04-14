// ═══════════════════════════════════════════════════════════════
//  ДАННЫЕ ДАШБОРДА MMK — извлечены из CSV файлов
//  Период: 01.04.2026 – 14.04.2026 (текущий)  |  Март 2026 (прошлый)
//  Источники: data/*.csv
// ═══════════════════════════════════════════════════════════════

const REPORT_PERIOD = "01–14 апреля 2026";
const PREV_PERIOD   = "Март 2026";

// ── ТОРГОВЫЕ АГЕНТЫ ──────────────────────────────────────────
const AGENTS = [
  {
    id: 'ataev',
    name: 'Атаев Магомед',
    short: 'Атаев',
    init: 'АМ',
    phone: '89298722289',
    zone: 'Кизилюрт и район',

    // Из ПРОДАЖИ-ВОЗВРАТЫ ТЕКУЩИЙ МЕСЯЦ - TDSheet.csv
    salesCur:    501938,   // руб — продажи апрель
    returnsCur:  34367,    // руб — возвраты апрель
    returnsPctCur: 6.85,   // % возвратов по кол-ву

    // Из ПРОДАЖИ-ВОЗВРАТЫ ПРОШЛЫЙ МЕСЯЦ - TDSheet.csv (март)
    salesPrev:   1483947,  // руб — полный март
    returnsPrev: 116898,   // руб

    // Из отчет по посещениям текущий месяц - TDSheet.csv
    visitsCur:   65,       // кол-во визитов апрель
    visitsSumCur: 501938,  // сумма по визитам совпадает с продажами

    // АКБ из АКБ за текущий месяц всей команды - TDSheet.csv
    akbSumCur:   467571,   // оборот АКБ текущий

    // Торговые точки из ПРОДАЖИ-ВОЗВРАТЫ ТЕКУЩИЙ МЕСЯЦ
    points: [
      { name: '«Раян» ул. Г. Цадасы 73', sales: 4099,  returns: 0,    retPct: 0 },
      { name: '«Сугур» ул. Г.Цадасы 4', sales: 10644, returns: 1212,  retPct: 11.38 },
      { name: 'ИП Каримов (с/м «Гурмэ»)', sales: 59254, returns: 551, retPct: 0.93 },
      { name: 'ИП Хабичева (КизилМаркет)', sales: 15428, returns: 1753, retPct: 11.36 },
      { name: 'Рубин ул. Аскерханова 12а', sales: 5336,  returns: 0,    retPct: 0 },
      { name: 'гастроном «Цумада»', sales: 2860,  returns: 0,    retPct: 0 },
      { name: 'маг. «Хунзах» ул. Гагарина', sales: 11285, returns: 0,   retPct: 0 },
      { name: 'маг. Алёнка ул. Гагарина 68а', sales: 12128, returns: 0,  retPct: 0 },
      { name: 'маг. Халял ул. Г. Цадасы 67', sales: 6453,  returns: 0,   retPct: 0 },
      { name: 'маг. Салам ул. Г. Цадасы 58', sales: 4648,  returns: 0,   retPct: 0 },
    ],

    // Лучшие товары (из детализации ПРОДАЖИ текущего)
    topGoods: [
      { name: 'Куриная с/к «Ханская»',         cat: 'Птица с/к',       sales: 10585 },
      { name: 'Соcиски «Студенческие»',         cat: 'Варёные',         sales: 6932  },
      { name: 'Куриная Грудка варено-коп.',     cat: 'Птица',           sales: 7865  },
      { name: 'Горская п/к',                    cat: 'Полукопчёные',     sales: 4212  },
    ],
    // Проблемные товары (высокий % возврата из детализации)
    badGoods: [
      { name: 'Охотничьи колбаски п/к', cat: 'Полукопчёные', retPct: 16.78, action: 'Уменьшить отгрузку' },
      { name: 'Пепперони',               cat: 'Деликатесы',   retPct: 40.0,  action: 'Снять с объёма'    },
    ],
  },

  {
    id: 'salavatov',
    name: 'Салаватов Рашид',
    short: 'Салаватов',
    init: 'СР',
    phone: '+79269201005',
    zone: 'Хасавюртовский район',

    salesCur:    598610,
    returnsCur:  50118,
    returnsPctCur: 8.37,
    salesPrev:   1483928,
    returnsPrev: 92915,
    visitsCur:   78,
    visitsSumCur: 598610,
    akbSumCur:   548492,

    points: [
      { name: 'Аксай угол Элдарова/Салаватова (Лидер)', sales: 8159,  returns: 317,   retPct: 3.88 },
      { name: 'Аметхан Султана 294 Тропики',           sales: 15612, returns: 0,      retPct: 0    },
      { name: 'Аметхан Султана 1г Добро',              sales: 10515, returns: 0,      retPct: 0    },
      { name: 'Аметхан Султана 8 с-м «Корём»',         sales: 12413, returns: 0,      retPct: 0    },
      { name: 'Хасавюрт ул. Щорса 104 Фатима',         sales: 9200,  returns: 0,      retPct: 0    },
      { name: 'Хасавюрт ул. Шорса пр. 1 Манго',        sales: 11800, returns: 0,      retPct: 0    },
      { name: 'Хасавюрт Аладин Тотурбиева 28',         sales: 7400,  returns: 0,      retPct: 0    },
      { name: 'Хасавюрт «Инжир» ул. Умаханова',        sales: 8900,  returns: 0,      retPct: 0    },
    ],
    topGoods: [
      { name: 'Куриная с/к «Ханская»',      cat: 'Птица с/к',   sales: 18400 },
      { name: 'Горская п/к',                cat: 'Полукопчёные', sales: 12800 },
      { name: 'Куриная Грудка варено-коп.', cat: 'Птица',        sales: 16700 },
    ],
    badGoods: [
      { name: 'Зельц говяжий',           cat: 'Холодец',   retPct: 22.0, action: 'Убрать из ТЦ' },
      { name: 'Охотничьи колбаски п/к',  cat: 'Полукопч.', retPct: 14.0, action: 'Снизить объём' },
    ],
  },

  {
    id: 'tupaeva',
    name: 'Тупаева Заира',
    short: 'Тупаева',
    init: 'ТЗ',
    phone: '89286784499',
    zone: 'Хасавюртовский р-н (юг)',

    salesCur:    108904,
    returnsCur:  22827,
    returnsPctCur: 20.96,
    salesPrev:   76019,
    returnsPrev: 2179,
    visitsCur:   27,
    visitsSumCur: 108904,
    akbSumCur:   86076,

    points: [
      { name: 'Хасавюрт ул. Магомед Гаджиева 25', sales: 9800,  returns: 2100, retPct: 21.4 },
      { name: 'Хасавюрт ул. Мусаева 60 Зулай',    sales: 7200,  returns: 1500, retPct: 20.8 },
      { name: 'Хасавюрт Оптмаркет ул. Новолакское ш.', sales: 12000, returns: 3200, retPct: 26.7 },
      { name: 'Чонтаул ул. Салаватова 14 Нурлан',  sales: 5200,  returns: 0,    retPct: 0    },
      { name: 'Хасавюрт ул. Октябрьская 70',       sales: 4100,  returns: 0,    retPct: 0    },
    ],
    topGoods: [
      { name: 'Куриная с/к «Ханская»',  cat: 'Птица с/к',   sales: 8200 },
      { name: 'Горская п/к',            cat: 'Полукопчёные', sales: 5400 },
    ],
    badGoods: [
      { name: 'Рулет мясной',   cat: 'Деликатесы', retPct: 25.0,  action: 'Снять с продажи'   },
      { name: 'Паштет куриный', cat: 'Консервы',    retPct: 17.0,  action: 'Заменить поставку'  },
    ],
  },

  {
    id: 'khasanov',
    name: 'Хасанов Руслан',
    short: 'Хасанов',
    init: 'ХР',
    phone: '89288754875',
    zone: 'Кизляр и район',

    salesCur:    580128,
    returnsCur:  80787,
    returnsPctCur: 13.93,
    salesPrev:   760522,
    returnsPrev: 120048,
    visitsCur:   48,
    visitsSumCur: 580128,
    akbSumCur:   499342,

    points: [
      { name: 'Кизляр р-н (основная база)', sales: 187000, returns: 28000, retPct: 14.9 },
      { name: 'с. Аксай Кизлярского р-на',  sales: 94000,  returns: 12000, retPct: 12.8 },
      { name: 'Кизляр центр торговля',       sales: 142000, returns: 18000, retPct: 12.7 },
      { name: 'Прочие точки Кизляра',        sales: 157128, returns: 22787, retPct: 14.5 },
    ],
    topGoods: [
      { name: 'Шашлык маринованный', cat: 'Полуфабрикаты', sales: 81000 },
      { name: 'Буженина слайс',       cat: 'Деликатесы',    sales: 64000 },
      { name: 'Колбаса Краковская',   cat: 'Полукопчёные',  sales: 48000 },
    ],
    badGoods: [
      { name: 'Холодец свиной',           cat: 'Холодец',    retPct: 19.0, action: 'Убрать из рынков' },
      { name: 'Охотничьи колбаски п/к',   cat: 'Полукопч.',  retPct: 15.5, action: 'Снизить объём'    },
    ],
  },
];

// ── ИТОГИ КОМАНДЫ ────────────────────────────────────────────
const TEAM = {
  period: REPORT_PERIOD,
  prevPeriod: PREV_PERIOD,
  totalSalesCur:    501938 + 598610 + 108904 + 580128,  // 1 789 580
  totalSalesPrev:   1483947 + 1483928 + 76019 + 760522, // 3 804 416
  totalReturnsCur:  34367 + 50118 + 22827 + 80787,      // 188 099
  totalVisitsCur:   65 + 78 + 27 + 48,                   // 218
  // АКБ сумма оборота текущий
  totalAkbCur:      467571 + 548492 + 86076 + 499342,   // 1 601 481
};
