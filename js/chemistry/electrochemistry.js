/* ============================================
   SCHEMATICA — Chemistry: Electrochemistry
   ============================================ */

const ChemistryElectrochemistry = {
  init() {
    const nernstBtn = document.getElementById('calcNernstBtn');
    if (nernstBtn) nernstBtn.addEventListener('click', () => this.calcNernst());

    const clearNernst = document.getElementById('clearNernstBtn');
    if (clearNernst) clearNernst.addEventListener('click', () => this.clearNernst());
  },

  calcNernst() {
    const E0 = parseFloat(document.getElementById('nernstE0')?.value);
    const n = parseFloat(document.getElementById('nernstN')?.value);
    const Q = parseFloat(document.getElementById('nernstQ')?.value);
    const T = parseFloat(document.getElementById('nernstT')?.value) || 298.15;

    if (isNaN(E0) || isNaN(n) || isNaN(Q) || n === 0) {
      App.showResult('nernstResult', I18N.get('result'), 'Fill in E0, n, and Q with valid numbers.');
      return;
    }

    const R = 8.314; // J/(mol*K)
    const F = 96485; // C/mol
    const E = E0 - ((R * T) / (n * F)) * Math.log(Q);

    App.showResult('nernstResult', I18N.get('result'),
      `E = ${E.toFixed(4)} V`);

    App.showFormulaRef('nernstFormula',
      'E = E0 - (RT/nF) * ln(Q)',
      'The Nernst Equation relates the reduction potential of an electrochemical reaction to the standard electrode potential, temperature, and activities of the chemical species. At 25 degrees C, it simplifies to E = E0 - (0.0592/n)*log(Q). This equation was developed by Walther Nernst in 1889 and is essential for calculating cell potentials under non-standard conditions.'
    );
  },

  clearNernst() {
    App.clearInputs('#nernstCalc');
    document.getElementById('nernstResult').innerHTML = '';
    document.getElementById('nernstFormula').innerHTML = '';
  }
};
