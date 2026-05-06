/* ============================================
   SCHEMATICA — Chemistry: Thermochemistry
   ============================================ */

const ChemistryThermochemistry = {
  init() {
    const gibbsBtn = document.getElementById('calcGibbsBtn');
    if (gibbsBtn) gibbsBtn.addEventListener('click', () => this.calcGibbs());

    const clearGibbs = document.getElementById('clearGibbsBtn');
    if (clearGibbs) clearGibbs.addEventListener('click', () => this.clearGibbs());
  },

  calcGibbs() {
    const H = parseFloat(document.getElementById('gibbsEnthalpy')?.value);
    const S = parseFloat(document.getElementById('gibbsEntropy')?.value);
    const T = parseFloat(document.getElementById('gibbsTemp')?.value);

    if (isNaN(H) || isNaN(S) || isNaN(T) || T <= 0) {
      App.showResult('gibbsResult', I18N.get('result'), 'Fill in all fields. Temperature must be positive (Kelvin).');
      return;
    }

    const G = H - T * S;
    const spontaneity = G < 0 ? 'SPONTANEOUS' : G > 0 ? 'NON-SPONTANEOUS' : 'AT EQUILIBRIUM';

    App.showResult('gibbsResult', I18N.get('result'),
      `G = ${G.toFixed(2)} kJ | ${spontaneity}`);

    App.showFormulaRef('gibbsFormula',
      'G = H - T*S',
      'The Gibbs Free Energy equation determines whether a process is spontaneous at constant temperature and pressure. When G < 0, the process is spontaneous; when G > 0, it is non-spontaneous; and when G = 0, the system is at equilibrium. Note: S must be in kJ/K (not J/K) to match H in kJ. This equation was derived by Josiah Willard Gibbs in the 1870s and is central to chemical thermodynamics.'
    );
  },

  clearGibbs() {
    App.clearInputs('#gibbsCalc');
    document.getElementById('gibbsResult').innerHTML = '';
    document.getElementById('gibbsFormula').innerHTML = '';
  }
};
