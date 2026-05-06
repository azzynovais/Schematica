/* ============================================
   SCHEMATICA — Math: Quadratic, Statistics, Logarithms
   ============================================ */

const MathCalculator = {
  init() {
    // Quadratic
    const quadBtn = document.getElementById('calcQuadraticBtn');
    if (quadBtn) quadBtn.addEventListener('click', () => this.calcQuadratic());
    const clearQuad = document.getElementById('clearQuadraticBtn');
    if (clearQuad) clearQuad.addEventListener('click', () => this.clearQuadratic());

    // Statistics
    const statBtn = document.getElementById('calcStatisticsBtn');
    if (statBtn) statBtn.addEventListener('click', () => this.calcStatistics());
    const clearStat = document.getElementById('clearStatisticsBtn');
    if (clearStat) clearStat.addEventListener('click', () => this.clearStatistics());

    // Logarithms
    const logBtn = document.getElementById('calcLogBtn');
    if (logBtn) logBtn.addEventListener('click', () => this.calcLog());
    const clearLog = document.getElementById('clearLogBtn');
    if (clearLog) clearLog.addEventListener('click', () => this.clearLog());

    // Combinations/Permutations
    const combBtn = document.getElementById('calcCombBtn');
    if (combBtn) combBtn.addEventListener('click', () => this.calcCombPerm());
    const clearComb = document.getElementById('clearCombBtn');
    if (clearComb) clearComb.addEventListener('click', () => this.clearComb());

    // Rule of Three
    const r3Btn = document.getElementById('calcRule3Btn');
    if (r3Btn) r3Btn.addEventListener('click', () => this.calcRuleOfThree());
    const clearR3 = document.getElementById('clearRule3Btn');
    if (clearR3) clearR3.addEventListener('click', () => this.clearRule3());
  },

  calcQuadratic() {
    const a = parseFloat(document.getElementById('quadA')?.value);
    const b = parseFloat(document.getElementById('quadB')?.value);
    const c = parseFloat(document.getElementById('quadC')?.value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
      App.showResult('quadraticResult', I18N.get('result'), 'Enter valid coefficients. A must not be zero.');
      return;
    }

    const delta = b * b - 4 * a * c;
    let rootsStr = '';

    if (delta > 0) {
      const x1 = (-b + Math.sqrt(delta)) / (2 * a);
      const x2 = (-b - Math.sqrt(delta)) / (2 * a);
      rootsStr = `x1 = ${x1.toFixed(4)} | x2 = ${x2.toFixed(4)}`;
    } else if (delta === 0) {
      const x = -b / (2 * a);
      rootsStr = `x = ${x.toFixed(4)} (double root)`;
    } else {
      const real = (-b / (2 * a)).toFixed(4);
      const imag = (Math.sqrt(-delta) / (2 * a)).toFixed(4);
      rootsStr = `x1 = ${real} + ${imag}i | x2 = ${real} - ${imag}i`;
    }

    App.showResult('quadraticResult', I18N.get('result'),
      `Delta = ${delta.toFixed(4)} | ${rootsStr}`);

    App.showFormulaRef('quadraticFormula',
      'x = (-b +/- sqrt(b^2 - 4ac)) / (2a)',
      'The quadratic formula solves any equation of the form ax^2 + bx + c = 0. The discriminant (b^2 - 4ac) determines the nature of the roots: positive means two real roots, zero means one repeated root, and negative means two complex conjugate roots. This formula has been known since ancient Babylonian mathematics (~2000 BC).'
    );
  },

  clearQuadratic() {
    App.clearInputs('#quadraticCalc');
    document.getElementById('quadraticResult').innerHTML = '';
    document.getElementById('quadraticFormula').innerHTML = '';
  },

  calcStatistics() {
    const dataStr = document.getElementById('statData')?.value;
    if (!dataStr) return;

    const data = dataStr.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    if (data.length === 0) {
      App.showResult('statisticsResult', I18N.get('result'), 'Enter comma-separated numbers.');
      return;
    }

    const sorted = [...data].sort((a, b) => a - b);
    const n = data.length;
    const sum = data.reduce((a, b) => a + b, 0);
    const mean = sum / n;

    // Median
    let median;
    const mid = Math.floor(n / 2);
    median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    // Mode
    const freqMap = {};
    data.forEach(v => { freqMap[v] = (freqMap[v] || 0) + 1; });
    const maxFreq = Math.max(...Object.values(freqMap));
    const modes = Object.keys(freqMap).filter(k => freqMap[k] === maxFreq).map(Number);
    const modeStr = maxFreq === 1 ? 'No mode' : modes.join(', ');

    // Variance & Std Dev
    const variance = data.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);

    App.showResult('statisticsResult', I18N.get('result'),
      `n=${n} | Mean=${mean.toFixed(4)} | Median=${median.toFixed(4)} | Mode=${modeStr} | StdDev=${stdDev.toFixed(4)} | Var=${variance.toFixed(4)}`);

    App.showFormulaRef('statisticsFormula',
      'Mean = Sum(x_i)/n | Var = Sum((x_i - mean)^2)/n | StdDev = sqrt(Var)',
      'These are fundamental descriptive statistics. The mean measures the central tendency, the median is robust to outliers, the mode identifies the most frequent value, and the standard deviation measures dispersion. The variance is the square of the standard deviation. For a sample (not population), divide by (n-1) instead of n (Bessels correction).'
    );
  },

  clearStatistics() {
    App.clearInputs('#statisticsCalc');
    document.getElementById('statisticsResult').innerHTML = '';
    document.getElementById('statisticsFormula').innerHTML = '';
  },

  calcLog() {
    const base = parseFloat(document.getElementById('logBase')?.value);
    const value = parseFloat(document.getElementById('logValue')?.value);

    if (isNaN(value) || value <= 0) {
      App.showResult('logResult', I18N.get('result'), 'Value must be positive.');
      return;
    }

    const ln = Math.log(value);
    const log10 = Math.log10(value);

    let logBase = '';
    if (!isNaN(base) && base > 0 && base !== 1) {
      logBase = ` | log_${base}(${value}) = ${(ln / Math.log(base)).toFixed(6)}`;
    }

    App.showResult('logResult', I18N.get('result'),
      `ln(${value}) = ${ln.toFixed(6)} | log10(${value}) = ${log10.toFixed(6)}${logBase}`);

    App.showFormulaRef('logFormula',
      'log_b(x) = ln(x) / ln(b) | ln = natural log (base e)',
      'Logarithms are the inverse of exponentiation. The natural logarithm (ln) uses base e (2.71828...), and common logarithm uses base 10. Change of base formula allows computing logarithms in any base. Logarithms were invented by John Napier in 1614 and are essential in chemistry for pH calculations and in physics for decibel scales.'
    );
  },

  clearLog() {
    App.clearInputs('#logCalc');
    document.getElementById('logResult').innerHTML = '';
    document.getElementById('logFormula').innerHTML = '';
  },

  calcCombPerm() {
    const n = parseInt(document.getElementById('combN')?.value);
    const r = parseInt(document.getElementById('combR')?.value);

    if (isNaN(n) || isNaN(r) || n < 0 || r < 0 || r > n) {
      App.showResult('combResult', I18N.get('result'), 'Enter valid n and r where 0 <= r <= n.');
      return;
    }

    function factorial(num) {
      if (num <= 1) return 1;
      let result = 1;
      for (let i = 2; i <= num; i++) result *= i;
      return result;
    }

    const perm = factorial(n) / factorial(n - r);
    const comb = factorial(n) / (factorial(r) * factorial(n - r));

    App.showResult('combResult', I18N.get('result'),
      `P(${n},${r}) = ${perm} | C(${n},${r}) = ${comb}`);

    App.showFormulaRef('combFormula',
      'P(n,r) = n! / (n-r)! | C(n,r) = n! / (r! * (n-r)!)',
      'Permutations count arrangements where order matters (e.g., arranging books on a shelf). Combinations count selections where order does not matter (e.g., choosing a committee). The key difference is that combinations divides by r! to account for the r! ways to order each selection.'
    );
  },

  clearComb() {
    App.clearInputs('#combCalc');
    document.getElementById('combResult').innerHTML = '';
    document.getElementById('combFormula').innerHTML = '';
  },

  calcRuleOfThree() {
    const a = parseFloat(document.getElementById('r3A')?.value);
    const b = parseFloat(document.getElementById('r3B')?.value);
    const c = parseFloat(document.getElementById('r3C')?.value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
      App.showResult('rule3Result', I18N.get('result'), 'Fill in A, B, and C (A cannot be zero).');
      return;
    }

    const x = (b * c) / a;

    App.showResult('rule3Result', I18N.get('result'),
      `A : B = C : X  =>  X = ${x.toFixed(4)}`);

    App.showFormulaRef('rule3Formula',
      'A / B = C / X  =>  X = (B * C) / A',
      'The Rule of Three (or proportion) is one of the oldest mathematical tools. If A is to B as C is to X, then X = (B*C)/A. This is widely used in chemistry for stoichiometric proportions, dilution calculations, and any proportional relationship between quantities.'
    );
  },

  clearRule3() {
    App.clearInputs('#rule3Calc');
    document.getElementById('rule3Result').innerHTML = '';
    document.getElementById('rule3Formula').innerHTML = '';
  }
};
