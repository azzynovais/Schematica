/* ============================================
   SCHEMATICA — Chemistry: Kinetics
   ============================================ */

const ChemistryKinetics = {
  init() {
    const halfLifeBtn = document.getElementById('calcHalfLifeBtn');
    if (halfLifeBtn) halfLifeBtn.addEventListener('click', () => this.calcHalfLife());

    const clearHL = document.getElementById('clearHalfLifeBtn');
    if (clearHL) clearHL.addEventListener('click', () => this.clearHalfLife());
  },

  calcHalfLife() {
    const k = parseFloat(document.getElementById('kineticsK')?.value);
    const order = document.getElementById('kineticsOrder')?.value;
    const initialConc = parseFloat(document.getElementById('kineticsC0')?.value);

    if (isNaN(k) || k <= 0) {
      App.showResult('kineticsResult', I18N.get('result'), 'Enter a valid rate constant (k > 0).');
      return;
    }

    let halfLife = 0;
    let formulaStr = '';

    if (order === '0') {
      halfLife = initialConc / (2 * k);
      formulaStr = 't(1/2) = [A]0 / (2k)';
    } else if (order === '1') {
      halfLife = Math.LN2 / k;
      formulaStr = 't(1/2) = ln(2) / k';
    } else if (order === '2') {
      if (isNaN(initialConc) || initialConc <= 0) {
        App.showResult('kineticsResult', I18N.get('result'), 'For 2nd order, initial concentration must be positive.');
        return;
      }
      halfLife = 1 / (k * initialConc);
      formulaStr = 't(1/2) = 1 / (k * [A]0)';
    }

    App.showResult('kineticsResult', I18N.get('result'),
      `Half-life (order ${order}) = ${halfLife.toFixed(4)} s`);

    const explanations = {
      '0': 'For a zero-order reaction, the half-life depends on the initial concentration. As the reaction proceeds, each successive half-life gets shorter because the rate is constant regardless of concentration.',
      '1': 'For a first-order reaction, the half-life is constant and independent of the initial concentration. This is why radioactive decay (always first-order) is characterized by a constant half-life. Examples include nuclear decay and many enzyme-catalyzed reactions.',
      '2': 'For a second-order reaction, the half-life depends inversely on the initial concentration. Each successive half-life doubles. This is common in reactions where two molecules must collide, such as dimerization reactions.'
    };

    App.showFormulaRef('kineticsFormula',
      formulaStr,
      explanations[order] || '');
  },

  clearHalfLife() {
    App.clearInputs('#kineticsCalc');
    document.getElementById('kineticsResult').innerHTML = '';
    document.getElementById('kineticsFormula').innerHTML = '';
  }
};
