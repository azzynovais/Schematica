/* ============================================
   SCHEMATICA — Converters: Temperature, Pressure,
   Volume, Mass, Concentration, Energy
   ============================================ */

const Converters = {
  init() {
    // Temperature
    const tempBtn = document.getElementById('calcTempBtn');
    if (tempBtn) tempBtn.addEventListener('click', () => this.convertTemp());

    // Pressure
    const pressBtn = document.getElementById('calcPressBtn');
    if (pressBtn) pressBtn.addEventListener('click', () => this.convertPress());

    // Volume
    const volBtn = document.getElementById('calcVolBtn');
    if (volBtn) volBtn.addEventListener('click', () => this.convertVol());

    // Mass
    const massBtn = document.getElementById('calcMassConvBtn');
    if (massBtn) massBtn.addEventListener('click', () => this.convertMass());

    // Concentration
    const concBtn = document.getElementById('calcConcConvBtn');
    if (concBtn) concBtn.addEventListener('click', () => this.convertConcentration());

    // Energy
    const energyBtn = document.getElementById('calcEnergyBtn');
    if (energyBtn) energyBtn.addEventListener('click', () => this.convertEnergy());

    // Clear
    document.getElementById('clearTempBtn')?.addEventListener('click', () => this.clearTemp());
    document.getElementById('clearPressBtn')?.addEventListener('click', () => this.clearPress());
    document.getElementById('clearVolBtn')?.addEventListener('click', () => this.clearVol());
    document.getElementById('clearMassConvBtn')?.addEventListener('click', () => this.clearMass());
    document.getElementById('clearConcConvBtn')?.addEventListener('click', () => this.clearConcentration());
    document.getElementById('clearEnergyBtn')?.addEventListener('click', () => this.clearEnergy());
  },

  convertTemp() {
    const value = parseFloat(document.getElementById('tempValue')?.value);
    const from = document.getElementById('tempFrom')?.value;
    const to = document.getElementById('tempTo')?.value;

    if (isNaN(value)) {
      App.showResult('tempResult', I18N.get('result'), 'Enter a valid temperature value.');
      return;
    }

    let celsius;
    // Convert to Celsius first
    switch (from) {
      case 'C': celsius = value; break;
      case 'F': celsius = (value - 32) * 5 / 9; break;
      case 'K': celsius = value - 273.15; break;
      default: celsius = value;
    }

    // Convert from Celsius to target
    let result;
    switch (to) {
      case 'C': result = celsius; break;
      case 'F': result = (celsius * 9 / 5) + 32; break;
      case 'K': result = celsius + 273.15; break;
      default: result = celsius;
    }

    const units = { C: '°C', F: '°F', K: 'K' };
    App.showResult('tempResult', I18N.get('result'),
      `${value} ${units[from]} = ${result.toFixed(4)} ${units[to]}`);

    App.showFormulaRef('tempFormula',
      'C = (F - 32) * 5/9 | F = C * 9/5 + 32 | K = C + 273.15',
      'Temperature conversion formulas are based on the different reference points of each scale. Celsius uses the freezing (0°C) and boiling (100°C) points of water. Fahrenheit uses 32°F and 212°F. Kelvin is the SI unit starting at absolute zero (-273.15°C), where all molecular motion stops. These conversions are essential in chemistry for gas law calculations.'
    );
  },

  clearTemp() {
    App.clearInputs('#tempCalc');
    document.getElementById('tempResult').innerHTML = '';
    document.getElementById('tempFormula').innerHTML = '';
  },

  convertPress() {
    const value = parseFloat(document.getElementById('pressValue')?.value);
    const from = document.getElementById('pressFrom')?.value;
    const to = document.getElementById('pressTo')?.value;

    if (isNaN(value)) {
      App.showResult('pressResult', I18N.get('result'), 'Enter a valid pressure value.');
      return;
    }

    // Convert to atm first
    const toAtm = { atm: 1, mmHg: 1/760, kPa: 1/101.325, torr: 1/760, bar: 1/1.01325, psi: 1/14.696 };
    const atmValue = value * (toAtm[from] || 1);
    const result = atmValue / (toAtm[to] || 1);

    App.showResult('pressResult', I18N.get('result'),
      `${value} ${from} = ${result.toFixed(6)} ${to}`);

    App.showFormulaRef('pressFormula',
      '1 atm = 760 mmHg = 101.325 kPa = 760 torr = 1.01325 bar = 14.696 psi',
      'Pressure conversion factors are based on the standard atmosphere definition. 1 atm was originally defined as the pressure exerted by a column of mercury 760 mm high at 0°C. The Pascal (Pa) is the SI unit, with 101.325 kPa = 1 atm. These conversions are critical in chemistry for gas law calculations and in physics for fluid mechanics.'
    );
  },

  clearPress() {
    App.clearInputs('#pressCalc');
    document.getElementById('pressResult').innerHTML = '';
    document.getElementById('pressFormula').innerHTML = '';
  },

  convertVol() {
    const value = parseFloat(document.getElementById('volValue')?.value);
    const from = document.getElementById('volFrom')?.value;
    const to = document.getElementById('volTo')?.value;

    if (isNaN(value)) {
      App.showResult('volResult', I18N.get('result'), 'Enter a valid volume value.');
      return;
    }

    const toL = { L: 1, mL: 0.001, cm3: 0.001, m3: 1000, gal: 3.78541, qt: 0.946353, pt: 0.473176, floz: 0.0295735 };
    const lValue = value * (toL[from] || 1);
    const result = lValue / (toL[to] || 1);

    App.showResult('volResult', I18N.get('result'),
      `${value} ${from} = ${result.toFixed(6)} ${to}`);

    App.showFormulaRef('volFormula',
      '1 L = 1000 mL = 1000 cm3 = 0.001 m3 = 0.264172 gal',
      'Volume conversions are based on metric (SI) definitions where 1 liter equals 1 cubic decimeter. The US gallon is defined as exactly 3.785411784 liters. These conversions are fundamental in chemistry for preparing solutions, measuring reagents, and performing dilution calculations.'
    );
  },

  clearVol() {
    App.clearInputs('#volCalc');
    document.getElementById('volResult').innerHTML = '';
    document.getElementById('volFormula').innerHTML = '';
  },

  convertMass() {
    const value = parseFloat(document.getElementById('massConvValue')?.value);
    const from = document.getElementById('massFrom')?.value;
    const to = document.getElementById('massTo')?.value;

    if (isNaN(value)) {
      App.showResult('massConvResult', I18N.get('result'), 'Enter a valid mass value.');
      return;
    }

    const toG = { g: 1, kg: 1000, mg: 0.001, ug: 0.000001, lb: 453.592, oz: 28.3495, ton: 1000000 };
    const gValue = value * (toG[from] || 1);
    const result = gValue / (toG[to] || 1);

    App.showResult('massConvResult', I18N.get('result'),
      `${value} ${from} = ${result.toFixed(6)} ${to}`);

    App.showFormulaRef('massConvFormula',
      '1 kg = 1000 g = 1,000,000 mg | 1 lb = 453.592 g | 1 oz = 28.3495 g',
      'Mass conversions bridge the metric (SI) and imperial systems. The kilogram is the SI base unit, defined since 2019 by the Planck constant. In chemistry, grams and milligrams are most commonly used. The microgram (ug) is essential in pharmacology and biochemistry for very small quantities.'
    );
  },

  clearMass() {
    App.clearInputs('#massConvCalc');
    document.getElementById('massConvResult').innerHTML = '';
    document.getElementById('massConvFormula').innerHTML = '';
  },

  convertConcentration() {
    const value = parseFloat(document.getElementById('concConvValue')?.value);
    const molarMass = parseFloat(document.getElementById('concConvMM')?.value);
    const from = document.getElementById('concConvFrom')?.value;
    const to = document.getElementById('concConvTo')?.value;

    if (isNaN(value)) {
      App.showResult('concConvResult', I18N.get('result'), 'Enter a valid concentration value.');
      return;
    }

    // mol/L <-> g/L requires molar mass
    let result;
    if (from === 'molL' && to === 'gL') {
      if (isNaN(molarMass)) {
        App.showResult('concConvResult', I18N.get('result'), 'Enter molar mass for this conversion.');
        return;
      }
      result = value * molarMass;
    } else if (from === 'gL' && to === 'molL') {
      if (isNaN(molarMass)) {
        App.showResult('concConvResult', I18N.get('result'), 'Enter molar mass for this conversion.');
        return;
      }
      result = value / molarMass;
    } else if (from === 'molL' && to === 'mmolL') {
      result = value * 1000;
    } else if (from === 'mmolL' && to === 'molL') {
      result = value / 1000;
    } else if (from === 'gL' && to === 'mgL') {
      result = value * 1000;
    } else if (from === 'mgL' && to === 'gL') {
      result = value / 1000;
    } else if (from === 'ppm' && to === 'mgL') {
      result = value; // approximate for dilute aqueous solutions
    } else if (from === 'mgL' && to === 'ppm') {
      result = value;
    } else if (from === to) {
      result = value;
    } else {
      App.showResult('concConvResult', I18N.get('result'), 'This conversion is not yet supported. Try mol/L <-> g/L.');
      return;
    }

    const units = { molL: 'mol/L', gL: 'g/L', mmolL: 'mmol/L', mgL: 'mg/L', ppm: 'ppm' };
    App.showResult('concConvResult', I18N.get('result'),
      `${value} ${units[from]} = ${result.toFixed(6)} ${units[to]}`);

    App.showFormulaRef('concConvFormula',
      'g/L = mol/L * M (molar mass) | ppm ~ mg/L (aqueous)',
      'Concentration conversions connect molarity (chemical amount) with mass concentration. Molarity (mol/L) is the standard in chemistry because it directly relates to stoichiometry. For dilute aqueous solutions, 1 ppm approximately equals 1 mg/L, since the density of water is ~1 g/mL. This approximation breaks down for concentrated or non-aqueous solutions.'
    );
  },

  clearConcentration() {
    App.clearInputs('#concConvCalc');
    document.getElementById('concConvResult').innerHTML = '';
    document.getElementById('concConvFormula').innerHTML = '';
  },

  convertEnergy() {
    const value = parseFloat(document.getElementById('energyValue')?.value);
    const from = document.getElementById('energyFrom')?.value;
    const to = document.getElementById('energyTo')?.value;

    if (isNaN(value)) {
      App.showResult('energyResult', I18N.get('result'), 'Enter a valid energy value.');
      return;
    }

    const toJ = { J: 1, kJ: 1000, cal: 4.184, kcal: 4184, eV: 1.602e-19, kWh: 3.6e6, BTU: 1055.06 };
    const jValue = value * (toJ[from] || 1);
    const result = jValue / (toJ[to] || 1);

    App.showResult('energyResult', I18N.get('result'),
      `${value} ${from} = ${result.toExponential(6)} ${to}`);

    App.showFormulaRef('energyFormula',
      '1 J = 0.239 cal | 1 cal = 4.184 J | 1 eV = 1.602 x 10^-19 J | 1 kcal = 4.184 kJ',
      'Energy conversions connect the SI unit (Joule) with other common units. The calorie was originally defined as the energy to heat 1 g of water by 1°C. The electron-volt is used in atomic/quantum physics. The kilocalorie (Calorie with capital C in nutrition) equals 1000 calories. These conversions are essential in thermochemistry and nutrition.'
    );
  },

  clearEnergy() {
    App.clearInputs('#energyCalc');
    document.getElementById('energyResult').innerHTML = '';
    document.getElementById('energyFormula').innerHTML = '';
  }
};
