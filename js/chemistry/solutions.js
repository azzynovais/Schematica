/* ============================================
   SCHEMATICA — Chemistry: Solutions & Concentration
   ============================================ */

const ChemistrySolutions = {
  init() {
    // Concentration calculator
    const concBtn = document.getElementById('calcConcentrationBtn');
    if (concBtn) concBtn.addEventListener('click', () => this.calcConcentration());

    // Dilution calculator
    const dilBtn = document.getElementById('calcDilutionBtn');
    if (dilBtn) dilBtn.addEventListener('click', () => this.calcDilution());

    // pH Calculator
    const phBtn = document.getElementById('calcPhBtn');
    if (phBtn) phBtn.addEventListener('click', () => this.calcPh());

    // Clear buttons
    const clearConc = document.getElementById('clearConcentrationBtn');
    if (clearConc) clearConc.addEventListener('click', () => this.clearConcentration());

    const clearDil = document.getElementById('clearDilutionBtn');
    if (clearDil) clearDil.addEventListener('click', () => this.clearDilution());

    const clearPh = document.getElementById('clearPhBtn');
    if (clearPh) clearPh.addEventListener('click', () => this.clearPh());
  },

  calcConcentration() {
    const soluteMass = parseFloat(document.getElementById('concSoluteMass')?.value);
    const molarMass = parseFloat(document.getElementById('concMolarMass')?.value);
    const solutionVol = parseFloat(document.getElementById('concSolutionVol')?.value);

    if (isNaN(soluteMass) || isNaN(molarMass) || isNaN(solutionVol) || solutionVol === 0) {
      App.showResult('concentrationResult', I18N.get('result'), 'Please fill in all fields with valid numbers.');
      return;
    }

    const moles = soluteMass / molarMass;
    const molarity = moles / solutionVol;
    const gPerL = soluteMass / solutionVol;

    App.showResult('concentrationResult', I18N.get('result'),
      `Molarity = ${molarity.toFixed(4)} mol/L | ${gPerL.toFixed(4)} g/L | Moles = ${moles.toFixed(4)} mol`);

    App.showFormulaRef('concentrationFormula',
      'C = n / V = m / (M * V)',
      'Concentration (molarity) is the number of moles of solute divided by the volume of solution in liters. This is the fundamental relationship in solution chemistry, derived from the definition of molar concentration. n = m/M converts mass to moles using the molar mass of the solute.'
    );
  },

  clearConcentration() {
    App.clearInputs('#concentrationCalc');
    document.getElementById('concentrationResult').innerHTML = '';
    document.getElementById('concentrationFormula').innerHTML = '';
  },

  calcDilution() {
    const c1 = parseFloat(document.getElementById('dilC1')?.value);
    const v1 = parseFloat(document.getElementById('dilV1')?.value);
    const c2 = parseFloat(document.getElementById('dilC2')?.value);
    const v2 = parseFloat(document.getElementById('dilV2')?.value);

    // Allow any 3 of 4 values, solve for the missing one
    const vals = [c1, v1, c2, v2];
    const filled = vals.filter(v => !isNaN(v) && v !== 0).length;

    if (filled < 3) {
      App.showResult('dilutionResult', I18N.get('result'), 'Fill in at least 3 of the 4 fields to calculate the missing value.');
      return;
    }

    let result = '';
    if (isNaN(c2) || c2 === 0) {
      const calcC2 = (c1 * v1) / v2;
      result = `C2 = ${calcC2.toFixed(4)} mol/L`;
    } else if (isNaN(v2) || v2 === 0) {
      const calcV2 = (c1 * v1) / c2;
      result = `V2 = ${calcV2.toFixed(4)} L`;
    } else if (isNaN(c1) || c1 === 0) {
      const calcC1 = (c2 * v2) / v1;
      result = `C1 = ${calcC1.toFixed(4)} mol/L`;
    } else if (isNaN(v1) || v1 === 0) {
      const calcV1 = (c2 * v2) / c1;
      result = `V1 = ${calcV1.toFixed(4)} L`;
    }

    App.showResult('dilutionResult', I18N.get('result'), result);

    App.showFormulaRef('dilutionFormula',
      'C1 * V1 = C2 * V2',
      'The dilution equation states that the product of initial concentration and volume equals the product of final concentration and volume. This is based on the conservation of moles: when you dilute a solution, the number of moles of solute remains constant while the volume changes.'
    );
  },

  clearDilution() {
    App.clearInputs('#dilutionCalc');
    document.getElementById('dilutionResult').innerHTML = '';
    document.getElementById('dilutionFormula').innerHTML = '';
  },

  calcPh() {
    const phInput = document.getElementById('phValue')?.value;
    const pohInput = document.getElementById('pohValue')?.value;
    const hInput = document.getElementById('hConc')?.value;
    const ohInput = document.getElementById('ohConc')?.value;

    let ph = null, poh = null, h = null, oh = null;

    if (phInput !== '' && !isNaN(parseFloat(phInput))) {
      ph = parseFloat(phInput);
      poh = 14 - ph;
      h = Math.pow(10, -ph);
      oh = Math.pow(10, -poh);
    } else if (pohInput !== '' && !isNaN(parseFloat(pohInput))) {
      poh = parseFloat(pohInput);
      ph = 14 - poh;
      h = Math.pow(10, -ph);
      oh = Math.pow(10, -poh);
    } else if (hInput !== '' && !isNaN(parseFloat(hInput))) {
      h = parseFloat(hInput);
      ph = -Math.log10(h);
      poh = 14 - ph;
      oh = Math.pow(10, -poh);
    } else if (ohInput !== '' && !isNaN(parseFloat(ohInput))) {
      oh = parseFloat(ohInput);
      poh = -Math.log10(oh);
      ph = 14 - poh;
      h = Math.pow(10, -ph);
    } else {
      App.showResult('phResult', I18N.get('result'), 'Enter a value for pH, pOH, [H+], or [OH-] to calculate the rest.');
      return;
    }

    const acidBase = ph < 7 ? 'ACIDIC' : ph > 7 ? 'BASIC' : 'NEUTRAL';

    App.showResult('phResult', I18N.get('result'),
      `pH = ${ph.toFixed(4)} | pOH = ${poh.toFixed(4)} | [H+] = ${h.toExponential(4)} mol/L | [OH-] = ${oh.toExponential(4)} mol/L | ${acidBase}`);

    App.showFormulaRef('phFormula',
      'pH = -log[H+] | pOH = -log[OH-] | pH + pOH = 14',
      'The pH scale measures the acidity or basicity of a solution. It is defined as the negative base-10 logarithm of the hydrogen ion concentration. At 25 degrees C, the ion product of water (Kw) equals 1.0 x 10^-14, which is why pH + pOH = 14. This was introduced by Soren Sorensen in 1909.'
    );
  },

  clearPh() {
    App.clearInputs('#phCalc');
    document.getElementById('phResult').innerHTML = '';
    document.getElementById('phFormula').innerHTML = '';
  }
};
