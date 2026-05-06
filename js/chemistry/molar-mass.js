/* ============================================
   SCHEMATICA — Chemistry: Molar Mass Calculator
   ============================================ */

const ChemistryMolarMass = {
  init() {
    const btn = document.getElementById('calcMolarMassBtn');
    const clearBtn = document.getElementById('clearMolarMassBtn');
    const input = document.getElementById('compoundFormulaInput');
    if (btn) btn.addEventListener('click', () => this.calculate());
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
    if (input) input.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.calculate(); });
  },

  calculate() {
    const formula = document.getElementById('compoundFormulaInput').value.trim();
    if (!formula) return;

    const result = calcMolarMass(formula);
    const resultContainer = document.getElementById('molarMassResult');
    const formulaContainer = document.getElementById('molarMassFormula');

    if (result.error) {
      resultContainer.innerHTML = `<div class="result-box"><div class="result-value" style="color:#FF6B6B;">${result.error}</div></div>`;
      formulaContainer.innerHTML = '';
      return;
    }

    let breakdownHtml = '<table style="width:100%;border-collapse:collapse;margin-top:1rem;">';
    breakdownHtml += '<tr style="border-bottom:2px solid var(--clr-ink);"><th style="text-align:left;padding:4px;">Element</th><th>Mass (g/mol)</th><th>Qty</th><th>Subtotal</th></tr>';
    result.breakdown.forEach(b => {
      breakdownHtml += `<tr style="border-bottom:1px solid var(--clr-muted);">
        <td style="padding:4px;font-weight:700;">${b.sym}</td>
        <td style="text-align:center;padding:4px;">${b.mass}</td>
        <td style="text-align:center;padding:4px;">${b.count}</td>
        <td style="text-align:center;padding:4px;">${b.contribution.toFixed(3)}</td>
      </tr>`;
    });
    breakdownHtml += '</table>';

    resultContainer.innerHTML = `
      <div class="result-box">
        <div class="result-label">${I18N.get('molar_mass_result')}</div>
        <div class="result-value">${result.mass.toFixed(3)} g/mol</div>
      </div>
      ${breakdownHtml}
    `;

    formulaContainer.innerHTML = `
      <div class="formula-ref">
        <div class="formula-ref__title">${I18N.get('formula_source')}</div>
        <div class="formula-ref__formula">M = Sum(n_i * M_i)</div>
        <div class="formula-ref__explanation"><strong>${I18N.get('why_this')}</strong> The molar mass of a compound is the sum of the atomic masses of each element multiplied by the number of atoms of that element in the formula. This follows from the law of conservation of mass and Avogadro's constant (6.022 x 10^23 mol^-1).</div>
      </div>
    `;
  },

  clear() {
    App.clearInputs('#molarMassCalc');
    document.getElementById('molarMassResult').innerHTML = '';
    document.getElementById('molarMassFormula').innerHTML = '';
  }
};
