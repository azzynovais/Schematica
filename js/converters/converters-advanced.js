/* ============================================
   SCHEMATICA - Converters: Advanced
   Length, Time, Speed, Density, Area, Power
   ============================================ */

// ──────────────────────────────────────────────
// 1. Length Converter
// ──────────────────────────────────────────────

const ConvLength = {
  // All values in meters (SI base unit)
  TO_METERS: {
    nm: 1e-9, um: 1e-6, mm: 0.001, cm: 0.01,
    m: 1, km: 1000,
    in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344
  },

  LABELS: {
    nm: 'nm', um: '\u03BCm', mm: 'mm', cm: 'cm',
    m: 'm', km: 'km',
    in: 'in', ft: 'ft', yd: 'yd', mi: 'mi'
  },

  init() {
    const calcBtn = document.getElementById('calcLenBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearLenBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const value = parseFloat(document.getElementById('lenValue')?.value);
    const from = document.getElementById('lenFrom')?.value;
    const to = document.getElementById('lenTo')?.value;

    if (isNaN(value)) {
      App.showResult('lenResult', I18N.get('result'),
        I18N.get('conv_enter_value') || 'Enter a valid value to convert.');
      return;
    }

    const meters = value * (this.TO_METERS[from] || 1);
    const result = meters / (this.TO_METERS[to] || 1);

    App.showResult('lenResult', I18N.get('result'),
      value + ' ' + (this.LABELS[from] || from) + ' = ' + result.toPrecision(10) + ' ' + (this.LABELS[to] || to));

    App.showFormulaRef('lenFormula',
      '1 m = 100 cm = 1000 mm = 39.3701 in = 3.28084 ft = 1.09361 yd | 1 km = 0.621371 mi | 1 mi = 1.60934 km | 1 in = 2.54 cm (exact)',
      'Length conversion factors bridge the metric (SI) and imperial/US customary systems. The meter has been the SI base unit of length since 1793, originally defined as one ten-millionth of the distance from the equator to the North Pole along a meridian. It was redefined in 1960 using a krypton-86 wavelength, and again in 1983 as the distance light travels in a vacuum in 1/299,792,458 of a second -- linking length to the speed of light, a fundamental constant. The inch is exactly 2.54 cm by international agreement since 1959, which makes all imperial-metric conversions exact. The mile derives from the Roman mille passus (1,000 paces), each pace being 5 Roman feet, yielding 5,000 feet; the modern statute mile is 5,280 feet (added 280 feet by English statute in 1593). The yard is exactly 0.9144 m. Metric prefixes follow powers of 10: milli- (10^-3), micro- (10^-6), nano- (10^-9). These conversions are essential in physics (wavelengths, distances), engineering (blueprint tolerances), and everyday life (travel distances, construction).');
  },

  clear() {
    App.clearInputs('#lenCalc');
    document.getElementById('lenResult').innerHTML = '';
    document.getElementById('lenFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 2. Time Converter
// ──────────────────────────────────────────────

const ConvTime = {
  // All values in seconds (SI base unit)
  TO_SECONDS: {
    s: 1,
    min: 60,
    h: 3600,
    day: 86400,
    week: 604800,
    month: 2592000,
    year: 31536000
  },

  LABELS: {
    s: 's', min: 'min', h: 'h',
    day: 'day', week: 'week', month: 'month (30d)', year: 'year (365d)'
  },

  init() {
    const calcBtn = document.getElementById('calcTimeBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearTimeBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const value = parseFloat(document.getElementById('timeValue')?.value);
    const from = document.getElementById('timeFrom')?.value;
    const to = document.getElementById('timeTo')?.value;

    if (isNaN(value)) {
      App.showResult('timeResult', I18N.get('result'),
        I18N.get('conv_enter_value') || 'Enter a valid value to convert.');
      return;
    }

    const seconds = value * (this.TO_SECONDS[from] || 1);
    const result = seconds / (this.TO_SECONDS[to] || 1);

    App.showResult('timeResult', I18N.get('result'),
      value + ' ' + (this.LABELS[from] || from) + ' = ' + result.toPrecision(10) + ' ' + (this.LABELS[to] || to));

    App.showFormulaRef('timeFormula',
      '1 min = 60 s | 1 h = 3600 s | 1 day = 86,400 s | 1 week = 604,800 s | 1 month = 2,592,000 s (30d) | 1 year = 31,536,000 s (365d)',
      'Time conversion factors are based on the second, the SI base unit of time. The second was originally defined as 1/86,400 of a mean solar day, but since 1967 it has been defined by the cesium-133 atom: the duration of 9,192,631,770 periods of radiation corresponding to the transition between two hyperfine levels of the ground state. This atomic definition provides extraordinary precision, enabling GPS, telecommunications, and fundamental physics experiments. The minute (60 s) and hour (3,600 s) derive from the Sumerian sexagesimal (base-60) number system from around 2000 BC. The day (86,400 s) is based on Earth\'s rotation period. The week (7 days) has ancient Near Eastern origins, possibly related to the seven classical celestial bodies visible to the naked eye. The month (approximately 29.5 days) was originally based on the lunar cycle, but the calendar month varies from 28 to 31 days. The year (365 or 366 days) is based on Earth\'s orbital period around the Sun; the tropical year is approximately 365.2422 days, which is why we need leap years. This converter uses 30 days per month and 365 days per year as approximations; for precise calendar calculations, specific month lengths and leap year rules must be applied.');
  },

  clear() {
    App.clearInputs('#timeCalc');
    document.getElementById('timeResult').innerHTML = '';
    document.getElementById('timeFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 3. Speed Converter
// ──────────────────────────────────────────────

const ConvSpeed = {
  // All values in m/s (SI derived unit)
  TO_MS: {
    ms: 1,
    kmh: 1 / 3.6,
    mph: 0.44704,
    kn: 0.514444,
    fts: 0.3048,
    mach: 343
  },

  LABELS: {
    ms: 'm/s', kmh: 'km/h', mph: 'mph',
    kn: 'kn (knots)', fts: 'ft/s', mach: 'Mach'
  },

  init() {
    const calcBtn = document.getElementById('calcSpeedBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearSpeedBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const value = parseFloat(document.getElementById('speedValue')?.value);
    const from = document.getElementById('speedFrom')?.value;
    const to = document.getElementById('speedTo')?.value;

    if (isNaN(value)) {
      App.showResult('speedResult', I18N.get('result'),
        I18N.get('conv_enter_value') || 'Enter a valid value to convert.');
      return;
    }

    const ms = value * (this.TO_MS[from] || 1);
    const result = ms / (this.TO_MS[to] || 1);

    App.showResult('speedResult', I18N.get('result'),
      value + ' ' + (this.LABELS[from] || from) + ' = ' + result.toPrecision(10) + ' ' + (this.LABELS[to] || to));

    App.showFormulaRef('speedFormula',
      '1 m/s = 3.6 km/h = 2.23694 mph = 1.94384 kn = 3.28084 ft/s | Mach 1 = 343 m/s (at 20C, sea level)',
      'Speed conversion factors connect different measurement systems used worldwide. The meter per second (m/s) is the SI derived unit for speed and velocity. The kilometer per hour (km/h) is the most common road speed unit in countries using the metric system. The mile per hour (mph) is used in the United States, United Kingdom, and a few other countries for road speeds. The knot (nautical mile per hour, 1 kn = 0.5144 m/s) is the standard unit in maritime and aviation navigation, derived from the nautical mile (1,852 m, which is one minute of latitude on Earth). Feet per second (ft/s) is used in some engineering contexts in the US. Mach number, named after Austrian physicist Ernst Mach (1838-1916), is the ratio of an object\'s speed to the local speed of sound. At sea level and 20 degrees C, the speed of sound in air is approximately 343 m/s (1,235 km/h, 767 mph), though it varies with temperature and altitude. Subsonic flight is below Mach 1, transonic is near Mach 1, supersonic is Mach 1-5, and hypersonic is above Mach 5.');
  },

  clear() {
    App.clearInputs('#speedCalc');
    document.getElementById('speedResult').innerHTML = '';
    document.getElementById('speedFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 4. Density Converter
// ──────────────────────────────────────────────

const ConvDensity = {
  // All values in kg/m3 (SI derived unit)
  TO_KGM3: {
    kgm3: 1,
    gcm3: 1000,
    gmL: 1000,
    lbft3: 16.0185,
    lbgal: 119.826
  },

  LABELS: {
    kgm3: 'kg/m3', gcm3: 'g/cm3', gmL: 'g/mL',
    lbft3: 'lb/ft3', lbgal: 'lb/gal'
  },

  init() {
    const calcBtn = document.getElementById('calcDensBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearDensBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const value = parseFloat(document.getElementById('densValue')?.value);
    const from = document.getElementById('densFrom')?.value;
    const to = document.getElementById('densTo')?.value;

    if (isNaN(value)) {
      App.showResult('densResult', I18N.get('result'),
        I18N.get('conv_enter_value') || 'Enter a valid value to convert.');
      return;
    }

    const kgm3 = value * (this.TO_KGM3[from] || 1);
    const result = kgm3 / (this.TO_KGM3[to] || 1);

    App.showResult('densResult', I18N.get('result'),
      value + ' ' + (this.LABELS[from] || from) + ' = ' + result.toPrecision(10) + ' ' + (this.LABELS[to] || to));

    App.showFormulaRef('densFormula',
      '1 g/cm3 = 1000 kg/m3 = 1 g/mL | 1 lb/ft3 = 16.0185 kg/m3 | 1 lb/gal = 119.826 kg/m3 | Water: 1 g/cm3 = 1000 kg/m3',
      'Density conversion factors relate different units for mass per unit volume. The SI unit is kg/m3, though g/cm3 (equivalent to g/mL) is more commonly used in chemistry and materials science because it yields convenient numbers for most substances. The equivalence g/cm3 = g/mL arises because 1 cm3 = 1 mL by definition. Water\'s density at 4 degrees C is approximately 1.000 g/cm3 (1000 kg/m3), which is the reference point for the gram\'s original definition. The pound per cubic foot (lb/ft3) is used in US engineering and construction. The pound per gallon (lb/gal) is used in the US for liquid density specifications, particularly in the petroleum and chemical industries. Key reference densities: air at sea level = 1.225 kg/m3, water = 1000 kg/m3, iron = 7874 kg/m3, gold = 19300 kg/m3. Density is a fundamental material property used in buoyancy calculations (Archimedes\' principle), material identification, quality control in manufacturing, and geological analysis of rock and mineral composition.');
  },

  clear() {
    App.clearInputs('#densCalc');
    document.getElementById('densResult').innerHTML = '';
    document.getElementById('densFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 5. Area Converter
// ──────────────────────────────────────────────

const ConvArea = {
  // All values in m2 (SI derived unit)
  TO_M2: {
    mm2: 1e-6,
    cm2: 1e-4,
    m2: 1,
    km2: 1e6,
    ha: 10000,
    acre: 4046.86,
    ft2: 0.092903,
    in2: 0.00064516
  },

  LABELS: {
    mm2: 'mm2', cm2: 'cm2', m2: 'm2',
    km2: 'km2', ha: 'ha', acre: 'acre',
    ft2: 'ft2', in2: 'in2'
  },

  init() {
    const calcBtn = document.getElementById('calcAreaBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearAreaBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const value = parseFloat(document.getElementById('areaValue')?.value);
    const from = document.getElementById('areaFrom')?.value;
    const to = document.getElementById('areaTo')?.value;

    if (isNaN(value)) {
      App.showResult('areaResult', I18N.get('result'),
        I18N.get('conv_enter_value') || 'Enter a valid value to convert.');
      return;
    }

    const m2 = value * (this.TO_M2[from] || 1);
    const result = m2 / (this.TO_M2[to] || 1);

    App.showResult('areaResult', I18N.get('result'),
      value + ' ' + (this.LABELS[from] || from) + ' = ' + result.toPrecision(10) + ' ' + (this.LABELS[to] || to));

    App.showFormulaRef('areaFormula',
      '1 km2 = 1,000,000 m2 | 1 ha = 10,000 m2 | 1 acre = 4,046.86 m2 | 1 ft2 = 0.092903 m2 | 1 in2 = 6.4516 cm2',
      'Area conversion factors relate units of two-dimensional extent. The square meter (m2) is the SI derived unit of area. Because area is length squared, metric area conversions involve factors of 100 between adjacent prefix levels (e.g., 1 cm2 = 100 mm2, not 10). The hectare (ha) equals 10,000 m2 (a square 100 m by 100 m) and is the standard metric unit for land area in agriculture, forestry, and urban planning. It was defined by the International Committee for Weights and Measures in 1879. The acre, originating from medieval England, represents the area a yoke of oxen could plow in one day; it equals 43,560 ft2 or approximately 4,047 m2. The US survey acre is very slightly different (4,046.8726 m2) but the difference is negligible for most purposes. The square foot (ft2) and square inch (in2) are used in US construction, real estate, and engineering. Key reference areas: a standard soccer field = 7,140 m2 (0.714 ha), New York City = 783.8 km2, the Earth\'s surface = 510 million km2. Area conversions are essential in land surveying, architecture, materials science (surface area to volume ratios), and ecology (habitat size and species diversity relationships).');
  },

  clear() {
    App.clearInputs('#areaCalc');
    document.getElementById('areaResult').innerHTML = '';
    document.getElementById('areaFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 6. Power Converter
// ──────────────────────────────────────────────

const ConvPower = {
  // All values in Watts (SI derived unit)
  TO_W: {
    W: 1,
    kW: 1000,
    hp: 745.7,
    BTUh: 0.293071,
    cals: 4.184
  },

  LABELS: {
    W: 'W', kW: 'kW', hp: 'hp',
    BTUh: 'BTU/h', cals: 'cal/s'
  },

  init() {
    const calcBtn = document.getElementById('calcPowerConvBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearPowerConvBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const value = parseFloat(document.getElementById('powerValue')?.value);
    const from = document.getElementById('powerFrom')?.value;
    const to = document.getElementById('powerTo')?.value;

    if (isNaN(value)) {
      App.showResult('powerConvResult', I18N.get('result'),
        I18N.get('conv_enter_value') || 'Enter a valid value to convert.');
      return;
    }

    const watts = value * (this.TO_W[from] || 1);
    const result = watts / (this.TO_W[to] || 1);

    App.showResult('powerConvResult', I18N.get('result'),
      value + ' ' + (this.LABELS[from] || from) + ' = ' + result.toPrecision(10) + ' ' + (this.LABELS[to] || to));

    App.showFormulaRef('powerConvFormula',
      '1 kW = 1000 W | 1 hp = 745.7 W | 1 BTU/h = 0.293071 W | 1 cal/s = 4.184 W',
      'Power conversion factors relate units of energy transfer rate (energy per unit time). The Watt (W) is the SI derived unit of power, defined as one Joule per second (1 W = 1 J/s), named after Scottish engineer James Watt (1736-1819) who dramatically improved the steam engine. The kilowatt (kW = 1000 W) is the standard unit for electrical power ratings and engine output. The horsepower (hp = 745.7 W) was defined by James Watt himself in 1782 to market his steam engines: he observed that a mine pony could do 22,000 foot-pounds of work per minute and increased this by 50% to 33,000 ft-lbf/min, yielding the mechanical horsepower. There are actually multiple definitions of horsepower (metric hp = 735.5 W, electrical hp = 746 W, boiler hp = 9,809.5 W); this converter uses the mechanical/imperial horsepower (745.7 W). The BTU per hour (BTU/h) is the standard unit for heating and cooling capacity in HVAC systems; one BTU is the energy needed to raise the temperature of one pound of water by one degree Fahrenheit. The calorie per second (cal/s) relates thermal power to the gram-calorie (4.184 J), used in some calorimetry and thermal physics contexts. Key reference values: a typical LED bulb = 10 W, a hair dryer = 1,500 W, a car engine = 150 kW (about 200 hp), a nuclear reactor = 1 GW.');
  },

  clear() {
    App.clearInputs('#powerConvCalc');
    document.getElementById('powerConvResult').innerHTML = '';
    document.getElementById('powerConvFormula').innerHTML = '';
  }
};
