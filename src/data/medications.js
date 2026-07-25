export const MEDICATION_DATABASE = [
  // ==========================================
  // 1. LÁZ- ÉS FÁJDALOMCSILLAPÍTÓ SZIRUPOK
  // ==========================================
  {
    id: 'paracetamol_120',
    name: 'Paracetamol szirup (120 mg / 5 ml)',
    tradeNames: 'Mexalen, Panadol Baby, Ben-u-ron',
    category: 'Láz- és fájdalomcsillapító',
    activeIngredient: 'Paracetamol',
    form: 'szirup',
    concentrationMg: 120,
    concentrationMl: 5,
    unit: 'ml',
    defaultMgPerKg: 12.5,
    minMgPerKg: 10,
    maxMgPerKg: 15,
    maxDailyMgPerKg: 60,
    maxSingleMg: 1000,
    maxDailyMg: 4000,
    frequency: '3-4x naponta',
    frequencyTimesDay: 4,
    minHoursBetween: 6,
    parentWarnings: [
      'Két adag között legalább 6 óra teljen el!',
      'Alaposan rázza fel használat előtt!',
      'Ne adja más paracetamol tartalmú készítménnyel együtt!',
      'Lázcsillapításra hűtőfürdő vagy borogatás is alkalmazható.'
    ],
    notes: 'Max. 4 alkalommal adható 24 órán belül.'
  },
  {
    id: 'ibuprofen_100',
    name: 'Ibuprofen szirup (100 mg / 5 ml)',
    tradeNames: 'Nurofen Junior, Algoflex Baby, Ibuprofen',
    category: 'Láz- és fájdalomcsillapító',
    activeIngredient: 'Ibuprofen',
    form: 'szirup',
    concentrationMg: 100,
    concentrationMl: 5,
    unit: 'ml',
    defaultMgPerKg: 10,
    minMgPerKg: 5,
    maxMgPerKg: 10,
    maxDailyMgPerKg: 30,
    maxSingleMg: 400,
    maxDailyMg: 1200,
    frequency: '3-4x naponta',
    frequencyTimesDay: 3,
    minHoursBetween: 6,
    parentWarnings: [
      'Két adag között legalább 6-8 óra teljen el!',
      'Lehetőleg étkezés közben vagy után adandó!',
      'Használat előtt alaposan rázza fel!',
      'Bőséges folyadékbevitel javasolt.'
    ],
    notes: 'Legjobb gyulladáscsökkentő és lázcsillapító hatás.'
  },
  {
    id: 'ibuprofen_200',
    name: 'Ibuprofen Forte szirup (200 mg / 5 ml)',
    tradeNames: 'Nurofen Forte, Algoflex Forte szirup',
    category: 'Láz- és fájdalomcsillapító',
    activeIngredient: 'Ibuprofen',
    form: 'szirup',
    concentrationMg: 200,
    concentrationMl: 5,
    unit: 'ml',
    defaultMgPerKg: 10,
    minMgPerKg: 5,
    maxMgPerKg: 10,
    maxDailyMgPerKg: 30,
    maxSingleMg: 400,
    maxDailyMg: 1200,
    frequency: '3x naponta',
    frequencyTimesDay: 3,
    minHoursBetween: 8,
    parentWarnings: [
      'Forte kiszerelés! Pontos mérés szükséges!',
      'Két adag között legalább 8 óra teljen el!',
      'Étkezés közben vegye be a gyermek!',
      'Bőséges folyadékkal adjuk.'
    ],
    notes: 'Magasabb hatóanyag-tartalom, kisebb térfogat beadása szükséges.'
  },
  {
    id: 'flamborin_csepp',
    name: 'Flamborin cseppek (500 mg / ml - Metamizol)',
    tradeNames: 'Flamborin, Algopyrin csepp',
    category: 'Láz- és fájdalomcsillapító',
    activeIngredient: 'Metamizol-nátrium',
    form: 'csepp',
    concentrationMg: 500,
    concentrationMl: 1,
    unit: 'csepp',
    dropFactor: 20, // 1 ml = 20 drops = 500 mg
    defaultMgPerKg: 10,
    minMgPerKg: 8,
    maxMgPerKg: 15,
    maxDailyMgPerKg: 40,
    maxSingleMg: 1000,
    maxDailyMg: 4000,
    frequency: '3-4x naponta',
    frequencyTimesDay: 4,
    minHoursBetween: 6,
    parentWarnings: [
      'Erős, makacs láz és fájdalom esetén javasolt.',
      'Csecsemőknek 3 hónapos korig (vagy 5 kg alatt) nem adható!',
      'Alacsony vérnyomás esetén fokozott figyelemmel adandó.'
    ],
    notes: '20 csepp = 1 ml = 500 mg metamizol.'
  },
  {
    id: 'cataflam_csepp',
    name: 'Cataflam cseppek (15 mg / ml - Diclofenac)',
    tradeNames: 'Cataflam, Diclofenac cseppek',
    category: 'Láz- és fájdalomcsillapító',
    activeIngredient: 'Diclofenac-kálium',
    form: 'csepp',
    concentrationMg: 15,
    concentrationMl: 1,
    unit: 'csepp',
    dropFactor: 30, // 1 ml = 30 drops = 15 mg (0.5 mg/drop)
    defaultMgPerKg: 1,
    minMgPerKg: 0.5,
    maxMgPerKg: 2,
    isDailyDoseCalc: true,
    maxDailyMgPerKg: 2,
    maxDailyMg: 150,
    frequency: '2-3x naponta elosztva',
    frequencyTimesDay: 3,
    minHoursBetween: 8,
    parentWarnings: [
      'Étkezés után adandó, kevés vízzel!',
      'A napi adagot (cél dózis) 2 vagy 3 részre osztva kell beadni.',
      '1 éves kor alatt nem javasolt!'
    ],
    notes: 'Gyulladáscsökkentő és erős fájdalomcsillapító hatás. (1 ml = 30 csepp = 15 mg)'
  },

  // ==========================================
  // 2. KÚPOK & KRUPP ROHAMOLDÓK
  // ==========================================
  {
    id: 'rectodelt_100',
    name: 'Rectodelt 100 mg kúp (Prednisolon)',
    tradeNames: 'Rectodelt kúp',
    category: 'Kúp / Krupp rohamoldó',
    activeIngredient: 'Prednisolon',
    form: 'kúp',
    concentrationMg: 100,
    concentrationMl: 1,
    unit: 'kúp',
    defaultMgPerKg: 100,
    minMgPerKg: 100,
    maxMgPerKg: 100,
    isFixedUnitDose: true,
    fixedUnitText: '1 kúp roham esetén',
    maxDailyMgPerKg: 100,
    maxDailyMg: 100,
    frequency: '1x szükség esetén rohamkor',
    frequencyTimesDay: 1,
    minHoursBetween: 24,
    parentWarnings: [
      'SÜRGŐSSÉGI KRUPP ROHAM KÚP! Csak ugató köhögés, nehézlégzés esetén adandó!',
      '1 kúp mélyen a végbélbe helyezendő!',
      'Kruppos roham esetén nyisson ablakot, hűvös párás levegő belégzése javasolt!',
      'Ha a nehézlégzés 15-20 perc után nem javul, hívjon mentőt (112)!'
    ],
    notes: 'Kruppos (Laryngitis acuta) rohamos ugató köhögésre. Csak orvosi utasításra!'
  },
  {
    id: 'nurofen_kup_60',
    name: 'Nurofen 60 mg kúp (6 - 12.5 kg csecsemőknek)',
    tradeNames: 'Nurofen 60mg kúp',
    category: 'Kúp / Krupp rohamoldó',
    activeIngredient: 'Ibuprofen',
    form: 'kúp',
    concentrationMg: 60,
    concentrationMl: 1,
    unit: 'kúp',
    defaultMgPerKg: 60,
    minMgPerKg: 60,
    maxMgPerKg: 60,
    isFixedUnitDose: true,
    fixedUnitText: '1 kúp / alkalom (6-12.5 kg)',
    maxDailyMgPerKg: 180,
    maxDailyMg: 180,
    frequency: '3x naponta (kb. 8 óránként)',
    frequencyTimesDay: 3,
    minHoursBetween: 8,
    parentWarnings: [
      'Hányás esetén kifejezetten ajánlott kúp forma!',
      'Két adag között legalább 6-8 óra teljen el!',
      '6 kg testsúly alatti csecsemőnek nem adható!'
    ],
    notes: 'Gyomorpanaszok vagy szirup kihányása esetén ideális.'
  },
  {
    id: 'nurofen_kup_125',
    name: 'Nurofen 125 mg kúp (12.5 - 20 kg gyermekeknek)',
    tradeNames: 'Nurofen 125mg kúp',
    category: 'Kúp / Krupp rohamoldó',
    activeIngredient: 'Ibuprofen',
    form: 'kúp',
    concentrationMg: 125,
    concentrationMl: 1,
    unit: 'kúp',
    defaultMgPerKg: 125,
    minMgPerKg: 125,
    maxMgPerKg: 125,
    isFixedUnitDose: true,
    fixedUnitText: '1 kúp / alkalom (12.5-20 kg)',
    maxDailyMgPerKg: 375,
    maxDailyMg: 375,
    frequency: '3x naponta (kb. 8 óránként)',
    frequencyTimesDay: 3,
    minHoursBetween: 8,
    parentWarnings: [
      '12.5 kg feletti gyermekeknek ajánlott.',
      'Két kúp beadása között min. 6-8 óra teljen el.'
    ],
    notes: 'Gyors lázcsillapító hatás hányással járó megbetegedésnél.'
  },
  {
    id: 'germicid_c',
    name: 'Germicid C kúp (Paracetamol + Aminophenazon)',
    tradeNames: 'Germicid C kúp',
    category: 'Kúp / Krupp rohamoldó',
    activeIngredient: 'Paracetamol + Aminophenazon',
    form: 'kúp',
    concentrationMg: 100,
    concentrationMl: 1,
    unit: 'kúp',
    defaultMgPerKg: 100,
    minMgPerKg: 100,
    maxMgPerKg: 100,
    isFixedUnitDose: true,
    fixedUnitText: '1 kúp / alkalom',
    maxDailyMgPerKg: 300,
    maxDailyMg: 300,
    frequency: '2-3x naponta',
    frequencyTimesDay: 3,
    minHoursBetween: 8,
    parentWarnings: [
      'Receptköteles kombinált lázcsillapító kúp!',
      'Magas, nehezen csillapítható láz esetén.',
      'Két kúp között legalább 6-8 óra teljen el.'
    ],
    notes: 'Klasszikus magyar gyermekorvosi receptköteles lázcsillapító kúp.'
  },

  // ==========================================
  // 3. KÖHÖGÉSCSILLAPÍTÓK & NYÁKOLDÓK
  // ==========================================
  {
    id: 'ambroxol_15',
    name: 'Ambroxol szirup (15 mg / 5 ml)',
    tradeNames: 'Halixol, Ambroxol, Mucosolvan',
    category: 'Köhögéscsillapító & Nyákoldó',
    activeIngredient: 'Ambroxol-hidroklorid',
    form: 'szirup',
    concentrationMg: 15,
    concentrationMl: 5,
    unit: 'ml',
    defaultMgPerKg: 1.5,
    minMgPerKg: 1.2,
    maxMgPerKg: 2.0,
    maxDailyMgPerKg: 4.5,
    maxDailyMg: 45,
    frequency: '2-3x naponta (reggel, kora délután)',
    frequencyTimesDay: 3,
    minHoursBetween: 6,
    parentWarnings: [
      'Hurutos, váladékos köhögésre javasolt nyákoldó!',
      'Este 17:00 után NE adja be, mert az éjszakai köhögési ingert fokozza!',
      'Bőséges folyadékfogyasztás szükséges a váladék elfolyósításához.'
    ],
    notes: 'Kiváló köptető és nyákoldó szirup.'
  },
  {
    id: 'acc_junior',
    name: 'ACC Junior szirup (20 mg / ml)',
    tradeNames: 'ACC 100, ACC Junior',
    category: 'Köhögéscsillapító & Nyákoldó',
    activeIngredient: 'Acetylcystein',
    form: 'szirup',
    concentrationMg: 20,
    concentrationMl: 1,
    unit: 'ml',
    defaultMgPerKg: 10,
    minMgPerKg: 8,
    maxMgPerKg: 15,
    maxDailyMgPerKg: 30,
    maxDailyMg: 400,
    frequency: '2x naponta (reggel és kora délután)',
    frequencyTimesDay: 2,
    minHoursBetween: 8,
    parentWarnings: [
      'Sűrű, tapadós nyák elfolyósítására!',
      'Késő délután / este már ne adjuk!',
      'Alaposan igyon rá a gyermek sok vizet vagy teát.'
    ],
    notes: 'Acetilcisztein tartalmú hurutoldó.'
  },
  {
    id: 'sinecod_05',
    name: 'Sinecod szirup (1.5 mg / ml)',
    tradeNames: 'Sinecod szirup / cseppek',
    category: 'Köhögéscsillapító & Nyákoldó',
    activeIngredient: 'Butamirat-citrát',
    form: 'szirup',
    concentrationMg: 1.5,
    concentrationMl: 1,
    unit: 'ml',
    defaultMgPerKg: 0.25,
    minMgPerKg: 0.2,
    maxMgPerKg: 0.4,
    maxDailyMgPerKg: 1.0,
    maxDailyMg: 15,
    frequency: '3x naponta',
    frequencyTimesDay: 3,
    minHoursBetween: 6,
    parentWarnings: [
      'KIZÁRÓLAG SZÁRAZ, INGERKÖHÖGÉSRE! Hurutos váladéknál ne alkalmazza!',
      'Éjszakai száraz köhögési rohamok csillapítására ideális.'
    ],
    notes: 'Központi hatású száraz köhögéscsillapító.'
  },

  // ==========================================
  // 4. ANTIBIOTIKUMOK (SZÉLESÍTETT)
  // ==========================================
  {
    id: 'amoxicillin_250',
    name: 'Amoxicillin szirup (250 mg / 5 ml)',
    tradeNames: 'Ospamox, Duomox, Amoxi-Clav',
    category: 'Antibiotikum',
    activeIngredient: 'Amoxicillin',
    form: 'szirup',
    concentrationMg: 250,
    concentrationMl: 5,
    unit: 'ml',
    defaultMgPerKg: 50,
    minMgPerKg: 40,
    maxMgPerKg: 90,
    isDailyDoseCalc: true,
    maxDailyMgPerKg: 90,
    maxDailyMg: 3000,
    frequency: '3x naponta (8 óránként)',
    frequencyTimesDay: 3,
    minHoursBetween: 8,
    parentWarnings: [
      'Pontosan 8 óránként adandó az egyenletes vérszintért!',
      'Az előírt kúra végéig kell adni, ne hagyja abba korábban!',
      'Hűtőszekrényben tárolandó (felbontás után)!'
    ],
    notes: 'Középfülgyulladás vagy tüdőgyulladás esetén magasabb dózis (80-90 mg/kg/nap) javasolt.'
  },
  {
    id: 'amoxicillin_clav_457',
    name: 'Amoxicillin + Klavulánsav szirup (457 mg / 5 ml)',
    tradeNames: 'Augmentin Duo 457mg / AKTAVAN',
    category: 'Antibiotikum',
    activeIngredient: 'Amoxicillin + Klavulánsav',
    form: 'szirup',
    concentrationMg: 457,
    concentrationMl: 5,
    unit: 'ml',
    defaultMgPerKg: 45,
    minMgPerKg: 40,
    maxMgPerKg: 70,
    isDailyDoseCalc: true,
    maxDailyMgPerKg: 70,
    maxDailyMg: 2800,
    frequency: '2x naponta (12 óránként)',
    frequencyTimesDay: 2,
    minHoursBetween: 12,
    parentWarnings: [
      'Étkezés elején adandó a gyomor védelmében!',
      'Pontosan 12 óránként adandó (reggel-este)!',
      'Hűtőben tartandó, használat előtt felrázandó!'
    ],
    notes: 'Emelt hatóanyagú, napi 2 adagolású szuszpenzió.'
  },
  {
    id: 'cefzil_125',
    name: 'Cefzil szirup (125 mg / 5 ml - Cefprozil)',
    tradeNames: 'Cefzil szirup',
    category: 'Antibiotikum',
    activeIngredient: 'Cefprozil',
    form: 'szirup',
    concentrationMg: 125,
    concentrationMl: 5,
    unit: 'ml',
    defaultMgPerKg: 20,
    minMgPerKg: 15,
    maxMgPerKg: 30,
    isDailyDoseCalc: true,
    maxDailyMgPerKg: 30,
    maxDailyMg: 1000,
    frequency: '2x naponta (12 óránként)',
    frequencyTimesDay: 2,
    minHoursBetween: 12,
    parentWarnings: [
      'Cephalosporin típusú antibiotikum.',
      'Pontosan 12 óránként adandó (reggel és este).'
    ],
    notes: 'Felső légúti és fül-orr-gégészeti fertőzésekre.'
  },
  {
    id: 'cedax_36',
    name: 'Cedax szirup (36 mg / ml - Ceftibuten)',
    tradeNames: 'Cedax szusp.',
    category: 'Antibiotikum',
    activeIngredient: 'Ceftibuten',
    form: 'szirup',
    concentrationMg: 36,
    concentrationMl: 1,
    unit: 'ml',
    defaultMgPerKg: 9,
    minMgPerKg: 9,
    maxMgPerKg: 9,
    isDailyDoseCalc: true,
    maxDailyMgPerKg: 9,
    maxDailyMg: 400,
    frequency: '1x naponta (24 óránként)',
    frequencyTimesDay: 1,
    minHoursBetween: 24,
    parentWarnings: [
      'Naponta mindössze 1 ALKALOMMAL adandó!',
      'Éhgyomorra vagy étkezés közben is bevehető.'
    ],
    notes: '3. generációs cephalosporin, kényelmes napi 1x-i adagolással.'
  },
  {
    id: 'azithromycin_200',
    name: 'Azithromycin szirup (200 mg / 5 ml)',
    tradeNames: 'Sumamed forte, Azibiot, Azitromycin',
    category: 'Antibiotikum',
    activeIngredient: 'Azithromycin',
    form: 'szirup',
    concentrationMg: 200,
    concentrationMl: 5,
    unit: 'ml',
    defaultMgPerKg: 10,
    minMgPerKg: 10,
    maxMgPerKg: 10,
    maxDailyMgPerKg: 10,
    maxDailyMg: 500,
    frequency: '1x naponta (3 napig)',
    frequencyTimesDay: 1,
    minHoursBetween: 24,
    parentWarnings: [
      'Naponta csak EGYSZER, azonos időpontban adandó!',
      'A kezelés időtartama 3 nap!',
      'Étkezés előtt 1 órával vagy étkezés után 2 órával adandó.'
    ],
    notes: 'Hosszú felezési idejű macrolid antibiotikum (3 napos kúra).'
  },
  {
    id: 'suprax_szirup',
    name: 'Suprax szirup (100 mg / 5 ml - Cefixim)',
    tradeNames: 'Suprax szirup',
    category: 'Antibiotikum',
    activeIngredient: 'Cefixim',
    form: 'szirup',
    concentrationMg: 100,
    concentrationMl: 5,
    unit: 'ml',
    defaultMgPerKg: 8,
    minMgPerKg: 8,
    maxMgPerKg: 8,
    isDailyDoseCalc: true,
    maxDailyMgPerKg: 8,
    maxDailyMg: 400,
    frequency: '1x vagy 2x naponta',
    frequencyTimesDay: 1,
    minHoursBetween: 12,
    parentWarnings: [
      'Napi adag beadható egyben (24 óránként) vagy két részletben (12 óránként).',
      'Elkészítés után hűtőben tárolandó (max 14 napig).'
    ],
    notes: 'Széles spektrumú harmadik generációs cephalosporin.'
  },
  {
    id: 'klacid_szirup',
    name: 'Klacid szirup (250 mg / 5 ml - Clarithromycin)',
    tradeNames: 'Klacid szirup',
    category: 'Antibiotikum',
    activeIngredient: 'Clarithromycin',
    form: 'szirup',
    concentrationMg: 250,
    concentrationMl: 5,
    unit: 'ml',
    defaultMgPerKg: 15,
    minMgPerKg: 15,
    maxMgPerKg: 15,
    isDailyDoseCalc: true,
    maxDailyMgPerKg: 15,
    maxDailyMg: 1000,
    frequency: '2x naponta (12 óránként)',
    frequencyTimesDay: 2,
    minHoursBetween: 12,
    parentWarnings: [
      'Pontosan 12 óránként adandó.',
      'Étkezéstől függetlenül beadható, esetleg egy kis folyadékkal.',
      'Szobahőmérsékleten tárolandó (nem szabad hűtőbe tenni)!'
    ],
    notes: 'Macrolid antibiotikum légúti fertőzésekre.'
  },

  // ==========================================
  // 5. HÁNYÁSCSILLAPÍTÓK & GÖRCSOLDÓK
  // ==========================================
  {
    id: 'daedalonetta',
    name: 'Daedalonetta kúp (Dimenhydrinat)',
    tradeNames: 'Daedalonetta kúp',
    category: 'Hányáscsillapító & Görcsoldó',
    activeIngredient: 'Dimenhydrinat',
    form: 'kúp',
    concentrationMg: 25,
    concentrationMl: 1,
    unit: 'kúp',
    defaultMgPerKg: 25,
    minMgPerKg: 25,
    maxMgPerKg: 25,
    isFixedUnitDose: true,
    fixedUnitText: '1 kúp hányás/utazás esetén',
    maxDailyMgPerKg: 75,
    maxDailyMg: 75,
    frequency: '2-3x naponta szükség szerint',
    frequencyTimesDay: 2,
    minHoursBetween: 8,
    parentWarnings: [
      'Hányás, utazási betegség (tengeribetegség) csillapítására!',
      'Álmodékonyságot, bágyadtságot okozhat.',
      'Két kúp között legalább 6-8 óra teljen el.'
    ],
    notes: 'Gyermekkori hányáscsillapító és utazási rosszullét elleni kúp.'
  },
  {
    id: 'nospa_40',
    name: 'No-Spa 40 mg tabletta (Drotaverin)',
    tradeNames: 'No-Spa',
    category: 'Hányáscsillapító & Görcsoldó',
    activeIngredient: 'Drotaverin-hidroklorid',
    form: 'tabletta',
    concentrationMg: 40,
    concentrationMl: 1,
    unit: 'tbl',
    defaultMgPerKg: 40,
    minMgPerKg: 20,
    maxMgPerKg: 40,
    isFixedUnitDose: true,
    fixedUnitText: '1/2 vagy 1 tabletta',
    maxDailyMgPerKg: 120,
    maxDailyMg: 160,
    frequency: '2-3x naponta',
    frequencyTimesDay: 3,
    minHoursBetween: 8,
    parentWarnings: [
      'Bélgörcs, görcsös hasfájás csillapítására.',
      'Kisgyermekeknél a tabletta összetörve, kevés folyadékban beadható.'
    ],
    notes: 'Simaizom-görcsoldó tabletta.'
  },

  // ==========================================
  // 6. GYERMEK ORRCSEPEK & ORRSPRAY-K
  // ==========================================
  {
    id: 'nasivin_kids',
    name: 'Nasivin Kids orrspray (0.025% Oxymetazolin)',
    tradeNames: 'Nasivin Kids 0.025%',
    category: 'Gyermek Orrcsepp & Orrspray',
    activeIngredient: 'Oxymetazolin',
    form: 'orrspray',
    concentrationMg: 0.25,
    concentrationMl: 1,
    unit: 'fújás',
    defaultMgPerKg: 1,
    minMgPerKg: 1,
    maxMgPerKg: 1,
    isFixedUnitDose: true,
    fixedUnitText: '1-1 fújás orrlyukanként',
    maxDailyMgPerKg: 3,
    maxDailyMg: 3,
    frequency: '2-3x naponta',
    frequencyTimesDay: 3,
    minHoursBetween: 8,
    parentWarnings: [
      '⚠️ MAXIMÁLISAN 5 NAPIG HASZNÁLHATÓ! Hosszabb használat orrnyálkahártya-károsodást okozhat!',
      '1-1 fújás mindkét orrlyukba nyálkahártya-lohasztásra.',
      'Alvás előtt kifejezetten ajánlott az orrlégzés biztosítására.'
    ],
    notes: 'Orrdugulást lohasztó gyermek orrspray (1-6 éves korig).'
  },
  {
    id: 'nasivin_baby',
    name: 'Nasivin Baby orrcsepp (0.01% Oxymetazolin)',
    tradeNames: 'Nasivin Baby 0.01%',
    category: 'Gyermek Orrcsepp & Orrspray',
    activeIngredient: 'Oxymetazolin',
    form: 'orrcsepp',
    concentrationMg: 0.1,
    concentrationMl: 1,
    unit: 'csepp',
    defaultMgPerKg: 1,
    minMgPerKg: 1,
    maxMgPerKg: 1,
    isFixedUnitDose: true,
    fixedUnitText: '1-1 csepp orrlyukanként',
    maxDailyMgPerKg: 3,
    maxDailyMg: 3,
    frequency: '2-3x naponta',
    frequencyTimesDay: 3,
    minHoursBetween: 8,
    parentWarnings: [
      '⚠️ Csecsemő orrcsepp: MAXIMÁLISAN 5 NAPIG HASZNÁLHATÓ!',
      'Szopizás/etetés előtt 10 perccel célszerű becseppenteni az orrlégzéshez.'
    ],
    notes: 'Csecsemőknek 1 éves korig.'
  },

  // ==========================================
  // 7. ANTIHISZTAMINOK
  // ==========================================
  {
    id: 'cetirizin_10',
    name: 'Cetirizin cseppek (10 mg / ml)',
    tradeNames: 'Zyrtec, Cetirizin, Parlazin',
    category: 'Antihisztamin',
    activeIngredient: 'Cetirizin-dihidroklorid',
    form: 'csepp',
    concentrationMg: 10,
    concentrationMl: 1,
    unit: 'csepp / ml',
    dropFactor: 20,
    defaultMgPerKg: 0.25,
    minMgPerKg: 0.2,
    maxMgPerKg: 0.3,
    maxDailyMgPerKg: 0.5,
    maxDailyMg: 10,
    frequency: '1-2x naponta',
    frequencyTimesDay: 1,
    minHoursBetween: 12,
    parentWarnings: [
      'Este adandó, mert enyhe álmodékonyságot okozhat!',
      '1 ml kb. 20 cseppnek felel meg (0.5 mg/csepp).'
    ],
    notes: 'Allergiás tünetek, csalánkiütés, szénanátha kezelésére.'
  },
  {
    id: 'desloratadin_05',
    name: 'Desloratadin szirup (0.5 mg / ml)',
    tradeNames: 'Aerius, Desloratadin szirup',
    category: 'Antihisztamin',
    activeIngredient: 'Desloratadin',
    form: 'szirup',
    concentrationMg: 0.5,
    concentrationMl: 1,
    unit: 'ml',
    defaultMgPerKg: 0.125,
    minMgPerKg: 0.1,
    maxMgPerKg: 0.2,
    maxDailyMgPerKg: 0.25,
    maxDailyMg: 5,
    frequency: '1x naponta',
    frequencyTimesDay: 1,
    minHoursBetween: 24,
    parentWarnings: [
      'Naponta 1 alkalommal adandó.',
      'Étkezéstől függetlenül bevehető.'
    ],
    notes: 'Nem álmosító 2. generációs antihisztamin.'
  },
  {
    id: 'fenistil_csepp',
    name: 'Fenistil cseppek (1 mg / ml - Dimetinden)',
    tradeNames: 'Fenistil, Dimetinden cseppek',
    category: 'Antihisztamin',
    activeIngredient: 'Dimetinden-maleát',
    form: 'csepp',
    concentrationMg: 1,
    concentrationMl: 1,
    unit: 'csepp',
    dropFactor: 20, // 1 ml = 20 drops = 1 mg
    defaultMgPerKg: 0.1,
    minMgPerKg: 0.1,
    maxMgPerKg: 0.1,
    isDailyDoseCalc: true,
    maxDailyMgPerKg: 0.1,
    maxDailyMg: 3,
    frequency: '3x naponta elosztva',
    frequencyTimesDay: 3,
    minHoursBetween: 8,
    parentWarnings: [
      'Erős álmosító hatása lehet, este javasolt elkezdeni a szedését.',
      'A kiszámolt napi adagot 3 részletben kell beadni.',
      'Közvetlenül étkezés előtt adandó kanálban, nem forró italba cseppentve.'
    ],
    notes: '1. generációs antihisztamin. (1 ml = 20 csepp)'
  },

  // ==========================================
  // 8. VITAMINOK & VASPÓTLÁS
  // ==========================================
  {
    id: 'vigantol_d3',
    name: 'Vigantol cseppek (D3-vitamin 500 NE / csepp)',
    tradeNames: 'Vigantol 20.000 Nemzetközi Egység/ml',
    category: 'Vitamin & Vaspótlás',
    activeIngredient: 'Kolekalciferol (D3-vitamin)',
    form: 'csepp',
    concentrationMg: 1,
    concentrationMl: 1,
    unit: 'csepp',
    defaultMgPerKg: 1,
    minMgPerKg: 1,
    maxMgPerKg: 2,
    isFixedUnitDose: true,
    fixedUnitText: '1 csepp (500 NE) / nap',
    maxDailyMgPerKg: 2,
    maxDailyMg: 2,
    frequency: '1x naponta (reggel)',
    frequencyTimesDay: 1,
    minHoursBetween: 24,
    parentWarnings: [
      'Napi 1 csepp (500 NE) D-vitamin pótlás csecsemőknek és kisgyermekeknek.',
      'Közvetlenül kanálba cseppentve, kis tejjel vagy tápszerrel adjuk be.'
    ],
    notes: 'Rachitis megelőzésére és csontfejlődés támogatására.'
  },
  {
    id: 'maltofer_csepp',
    name: 'Maltofer cseppek (50 mg Fe / ml)',
    tradeNames: 'Maltofer cseppek',
    category: 'Vitamin & Vaspótlás',
    activeIngredient: 'Vas(III)-hidroxid-polimatóz',
    form: 'csepp',
    concentrationMg: 50,
    concentrationMl: 1,
    unit: 'csepp',
    dropFactor: 20, // 1 csepp = 2.5 mg elemental iron
    defaultMgPerKg: 2,
    minMgPerKg: 1,
    maxMgPerKg: 5,
    maxDailyMgPerKg: 5,
    maxDailyMg: 100,
    frequency: '1-2x naponta',
    frequencyTimesDay: 1,
    minHoursBetween: 12,
    parentWarnings: [
      'Vashiányos állapotok és vérszegénység kezelésére.',
      'Gyümölcslével (C-vitaminnal) együtt adva a felszívódás jobb!',
      'A székletet sötétre / feketére színezheti, ez teljesen természetes.'
    ],
    notes: 'Jól tolerálható vaspótló cseppek.'
  },

  // ==========================================
  // 9. ELEKTROLIT & REHIDRATÁLÓ (ORS)
  // ==========================================
  {
    id: 'salhydron_ors',
    name: 'Salhydron / ORS rehidratáló oldat (Elektrolit)',
    tradeNames: 'Salhydron, Humana Elektrolyt, Hipp ORS',
    category: 'Elektrolit / Rehidratáló',
    activeIngredient: 'Elektrolit és Glükóz por',
    form: 'oldat',
    concentrationMg: 1,
    concentrationMl: 1,
    unit: 'ml',
    defaultMgPerKg: 50,
    minMgPerKg: 30,
    maxMgPerKg: 100,
    isDailyDoseCalc: false,
    maxDailyMgPerKg: 150,
    maxDailyMg: 2000,
    frequency: 'Kis kortyokban folyamatosan',
    frequencyTimesDay: 4,
    minHoursBetween: 2,
    parentWarnings: [
      'Hányás, hasmenés esetén kiszámított 50 ml/kg adandó 4 óra alatt!',
      'Kávéskanállal / fecskendővel 5 percenként 1 kis korty adandó!',
      'Ne ízesítse cukorral! Hűtve könnyebben elfogadják a gyermekek.'
    ],
    notes: 'Gyermekkori kiszáradás megelőzésére és kezelésére oralis rehidrációs oldat (ORS).'
  },

  // ==========================================
  // 10. FONÓ-S MAGISZTRÁLIS VÉNYEK (FoNo VII)
  // ==========================================
  {
    id: 'mixtura_pectoralis',
    name: 'Mixtura pectoralis paed. (FoNo VII Gyermek Köptető)',
    tradeNames: 'Magisztrális FoNo kanalas orvosság',
    category: 'Magisztrális FoNo Vények',
    activeIngredient: 'Sulfogaiacolum + Solutio ammoniae diluta',
    form: 'szirup',
    concentrationMg: 100,
    concentrationMl: 5,
    unit: 'ml',
    defaultMgPerKg: 10,
    minMgPerKg: 5,
    maxMgPerKg: 15,
    maxDailyMgPerKg: 45,
    maxDailyMg: 500,
    frequency: '3x naponta (1-1 kávéskanál)',
    frequencyTimesDay: 3,
    minHoursBetween: 8,
    parentWarnings: [
      'Klasszikus gyógyszertári FoNo köptető oldat.',
      'Étkezés után adandó bőséges teával.',
      'Estére már ne adjuk!'
    ],
    notes: 'Magyar Gyógyszerkönyvi (FoNo VII) receptúrás gyermek köptető.'
  },
  {
    id: 'elixirium_thymi',
    name: 'Elixirium thymi compositum (FoNo VII Kakukkfű Elixír)',
    tradeNames: 'FoNo Kakukkfű szirup',
    category: 'Magisztrális FoNo Vények',
    activeIngredient: 'Thymi extractum + Thymi aetheroleum',
    form: 'szirup',
    concentrationMg: 100,
    concentrationMl: 5,
    unit: 'ml',
    defaultMgPerKg: 10,
    minMgPerKg: 5,
    maxMgPerKg: 15,
    maxDailyMgPerKg: 45,
    maxDailyMg: 500,
    frequency: '3x naponta',
    frequencyTimesDay: 3,
    minHoursBetween: 8,
    parentWarnings: [
      'Természetes kakukkfű kivonatot tartalmazó köhögés elleni szirup.',
      'Kellemes kakukkfű illatú, gyógyszertári készítmény.'
    ],
    notes: 'FoNo VII gyógyszertári kakukkfű elixír köhögésre.'
  },

  // ==========================================
  // 11. INHALÁCIÓS ASZTMA / KRUPP GYÓGYSZEREK
  // ==========================================
  {
    id: 'pulmicort_025',
    name: 'Pulmicort 0.25 mg/ml szuszpenzió inhalációra',
    tradeNames: 'Pulmicort',
    category: 'Inhalációs Asztma / Krupp',
    activeIngredient: 'Budezonid',
    form: 'oldat',
    concentrationMg: 0.25,
    concentrationMl: 1,
    unit: 'ml',
    defaultMgPerKg: 0.1, // Not strictly weight based, but usually 0.25-1mg/day
    minMgPerKg: 0.05,
    maxMgPerKg: 0.2,
    isDailyDoseCalc: true,
    maxDailyMgPerKg: 0.5,
    maxDailyMg: 2,
    frequency: '2x naponta',
    frequencyTimesDay: 2,
    minHoursBetween: 12,
    parentWarnings: [
      'Inhalátor gépbe töltendő (fiziológiás sóoldattal hígítva)!',
      'Használat után azonnal arcot kell mosni és fogat kell mosni a szájgomba elkerülése végett!',
      'Krupp vagy asztmás roham megelőzésére és kezelésére.'
    ],
    notes: 'Inhalációs szteroid.'
  },
  {
    id: 'ventolin_evohaler',
    name: 'Ventolin Evohaler (100 µg/adag)',
    tradeNames: 'Ventolin Evohaler',
    category: 'Inhalációs Asztma / Krupp',
    activeIngredient: 'Szalbutamol',
    form: 'puff',
    concentrationMg: 0.1, // 100 mcg = 0.1 mg
    concentrationMl: 1,
    unit: 'puff',
    defaultMgPerKg: 0.1,
    minMgPerKg: 0.1,
    maxMgPerKg: 0.1,
    isFixedUnitDose: true,
    fixedUnitText: '1-2 puff / alkalom',
    maxDailyMgPerKg: 0.8,
    maxDailyMg: 0.8, // 8 puff
    frequency: 'Szükség szerint (rohamoldó)',
    frequencyTimesDay: 4,
    minHoursBetween: 4,
    parentWarnings: [
      'SÜRGŐSSÉGI ROHAMOLDÓ! (Hörgőtágító)',
      'Kisgyermekeknél "babyhaler" / toldalékhenger (spacer) segítségével kell beadni!',
      'Remegést, szapora szívverést okozhat (ez ismert mellékhatás).'
    ],
    notes: 'Asztmás roham esetén az elsődleges választás.'
  },
  {
    id: 'flixotide_50',
    name: 'Flixotide Evohaler (50 µg/adag)',
    tradeNames: 'Flixotide 50 mcg',
    category: 'Inhalációs Asztma / Krupp',
    activeIngredient: 'Flutikazon',
    form: 'puff',
    concentrationMg: 0.05, // 50 mcg
    concentrationMl: 1,
    unit: 'puff',
    defaultMgPerKg: 0.05,
    minMgPerKg: 0.05,
    maxMgPerKg: 0.05,
    isFixedUnitDose: true,
    fixedUnitText: '1-2 puff / alkalom',
    maxDailyMgPerKg: 0.2,
    maxDailyMg: 0.2,
    frequency: '2x naponta',
    frequencyTimesDay: 2,
    minHoursBetween: 12,
    parentWarnings: [
      'Megelőző (fenntartó) kezelés! Hirtelen rohamra NEM jó!',
      'Toldalékhenger (spacer) használata javasolt.',
      'Alkalmazás után fogmosás / szájöblítés kötelező!'
    ],
    notes: 'Inhalációs szteroid fenntartó kezelésre.'
  },
  {
    id: 'berodual',
    name: 'Berodual inhalációs oldat',
    tradeNames: 'Berodual',
    category: 'Inhalációs Asztma / Krupp',
    activeIngredient: 'Ipratropium-bromid + Fenoterol',
    form: 'csepp',
    concentrationMg: 1, // Doesn't perfectly map to mg/kg, usually dosed in drops
    concentrationMl: 1,
    unit: 'csepp',
    dropFactor: 20,
    defaultMgPerKg: 1,
    minMgPerKg: 1,
    maxMgPerKg: 1,
    isFixedUnitDose: true,
    fixedUnitText: '10-20 csepp / alkalom (sóval)',
    maxDailyMgPerKg: 3,
    maxDailyMg: 3,
    frequency: '3-4x naponta inhalálva',
    frequencyTimesDay: 4,
    minHoursBetween: 4,
    parentWarnings: [
      'Inhalátor gépbe töltendő (3-4 ml fiziológiás sóoldattal hígítva)!',
      'Kiváló hörgőtágító erős hurutos/asztmás tünetekre.',
      'A cseppeket pontosan kell számolni!'
    ],
    notes: 'Kombinált hörgőtágító. 1 csepp / testtömeg kg (max 20 csepp) gyakori szabály.'
  }
];

export const PRESET_ADVICE_TAGS = [
  'Használat előtt alaposan rázza fel!',
  'Étel közben vagy közvetlenül utána adandó.',
  'Éhgyomorra (étkezés előtt 1 órával) adandó.',
  'Bőséges folyadékkal adjuk!',
  'Két adag között legalább 6 óra teljen el!',
  'Két adag között legalább 8 óra teljen el!',
  'Magas láz esetén hűtőfürdő / borogatás is javasolt.',
  'Váltott lázcsillapítás: Paracetamol és Ibuprofen 4 óránként felváltva adható!',
  '⚠️ MAXIMÁLISAN 5 NAPIG HASZNÁLHATÓ (orrcsepp/orrspray)!',
  'Este 17:00 után már NE adja be a nyákoldót!',
  'Pontosan a megadott óránként adandó.',
  'Hűtőszekrényben tárolandó (2-8 °C).',
  'Fecskendővel pontosan mérje ki az adagot.'
];
