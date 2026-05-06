/* ============================================
   SCHEMATICA — Chemistry: Stoichiometry
   ============================================ */

const ChemistryStoichiometry = {
  init() {
    const idealGasBtn = document.getElementById('calcIdealGasBtn');
    if (idealGasBtn) idealGasBtn.addEventListener('click', () => this.calcIdealGas());

    const limitingBtn = document.getElementById('calcLimitingBtn');
    if (limitingBtn) limitingBtn.addEventListener('click', () => this.calcLimitingReagent());

    const yieldBtn = document.getElementById('calcYieldBtn');
    if (yieldBtn) yieldBtn.addEventListener('click', () => this.calcPercentYield());

    const clearGas = document.getElementById('clearIdealGasBtn');
    if (clearGas) clearGas.addEventListener('click', () => this.clearIdealGas());

    const clearLimit = document.getElementById('clearLimitingBtn');
    if (clearLimit) clearLimit.addEventListener('click', () => this.clearLimiting());

    const clearYield = document.getElementById('clearYieldBtn');
    if (clearYield) clearYield.addEventListener('click', () => this.clearYield());
  },

  calcIdealGas() {
    const P = parseFloat(document.getElementById('igPressure')?.value);
    const V = parseFloat(document.getElementById('igVolume')?.value);
    const n = parseFloat(document.getElementById('igMoles')?.value);
    const T = parseFloat(document.getElementById('igTemp')?.value);
    const R = 0.0821; // L*atm/(mol*K)

    const vals = [P, V, n, T];
    const missing = vals.filter(v => isNaN(v)).length;

    if (missing !== 1) {
      App.showResult('idealGasResult', I18N.get('result'), 'Fill in exactly 3 of the 4 fields (P, V, n, T) to solve for the missing one.');
      return;
    }

    let result = '';
    if (isNaN(P)) {
      const calcP = (n * R * T) / V;
      result = `P = ${calcP.toFixed(4)} atm`;
    } else if (isNaN(V)) {
      const calcV = (n * R * T) / P;
      result = `V = ${calcV.toFixed(4)} L`;
    } else if (isNaN(n)) {
      const calcN = (P * V) / (R * T);
      result = `n = ${calcN.toFixed(4)} mol`;
    } else if (isNaN(T)) {
      const calcT = (P * V) / (n * R);
      result = `T = ${calcT.toFixed(4)} K`;
    }

    App.showResult('idealGasResult', I18N.get('result'), result);

    App.showFormulaRef('idealGasFormula',
      'PV = nRT  (R = 0.0821 L*atm/mol*K)',
      'The Ideal Gas Law combines Boyles law (P1V1 = P2V2), Charles law (V1/T1 = V2/T2), and Avogadros law (V1/n1 = V2/n2) into one equation. It describes the behavior of ideal gases. Real gases deviate at high pressures or low temperatures, corrected by the van der Waals equation.'
    );
  },

  clearIdealGas() {
    App.clearInputs('#idealGasCalc');
    document.getElementById('idealGasResult').innerHTML = '';
    document.getElementById('idealGasFormula').innerHTML = '';
  },

  calcLimitingReagent() {
    const moles1 = parseFloat(document.getElementById('lrMoles1')?.value);
    const coeff1 = parseFloat(document.getElementById('lrCoeff1')?.value);
    const moles2 = parseFloat(document.getElementById('lrMoles2')?.value);
    const coeff2 = parseFloat(document.getElementById('lrCoeff2')?.value);

    if (isNaN(moles1) || isNaN(coeff1) || isNaN(moles2) || isNaN(coeff2) || coeff1 === 0 || coeff2 === 0) {
      App.showResult('limitingResult', I18N.get('result'), 'Fill in all fields with valid numbers.');
      return;
    }

    const ratio1 = moles1 / coeff1;
    const ratio2 = moles2 / coeff2;
    const limiting = ratio1 < ratio2 ? 'Reagent 1' : 'Reagent 2';
    const excess = ratio1 < ratio2 ? 'Reagent 2' : 'Reagent 1';

    App.showResult('limitingResult', I18N.get('result'),
      `Limiting: ${limiting} (ratio: ${Math.min(ratio1, ratio2).toFixed(4)}) | Excess: ${excess} (ratio: ${Math.max(ratio1, ratio2).toFixed(4)})`);

    App.showFormulaRef('limitingFormula',
      'Limiting Reagent: min(n_A / a, n_B / b)',
      'The limiting reagent is determined by comparing the mole-to-coefficient ratio for each reactant. The reactant with the smallest ratio is the limiting reagent because it produces the least amount of product. This follows from the stoichiometric coefficients in the balanced equation.'
    );
  },

  clearLimiting() {
    App.clearInputs('#limitingCalc');
    document.getElementById('limitingResult').innerHTML = '';
    document.getElementById('limitingFormula').innerHTML = '';
  },

  calcPercentYield() {
    const theoretical = parseFloat(document.getElementById('yieldTheoretical')?.value);
    const actual = parseFloat(document.getElementById('yieldActual')?.value);

    if (isNaN(theoretical) || isNaN(actual) || theoretical === 0) {
      App.showResult('yieldResult', I18N.get('result'), 'Fill in both theoretical and actual yield values.');
      return;
    }

    const percent = (actual / theoretical) * 100;

    App.showResult('yieldResult', I18N.get('result'),
      `Percent Yield = ${percent.toFixed(2)}% (Actual: ${actual}, Theoretical: ${theoretical})`);

    App.showFormulaRef('yieldFormula',
      '% Yield = (Actual Yield / Theoretical Yield) x 100',
      'Percent yield measures the efficiency of a reaction. The theoretical yield is the maximum product possible based on stoichiometry, while the actual yield is what is obtained experimentally. Reactions rarely achieve 100% yield due to side reactions, incomplete reactions, and product loss during purification.'
    );
  },

  clearYield() {
    App.clearInputs('#yieldCalc');
    document.getElementById('yieldResult').innerHTML = '';
    document.getElementById('yieldFormula').innerHTML = '';
  }
};
