/* ============================================
   SCHEMATICA — Math: Advanced Calculators
   Trigonometry, Linear Systems, Financial,
   Scientific Notation, Percentage
   ============================================ */

// ──────────────────────────────────────────────
// 1. Trigonometry Calculator
// ──────────────────────────────────────────────

const MathTrigonometry = {
  init() {
    const calcBtn = document.getElementById('calcTrigBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearTrigBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const angleDeg = parseFloat(document.getElementById('trigAngle')?.value);
    const func = document.getElementById('trigFunc')?.value;

    if (isNaN(angleDeg)) {
      App.showResult('trigResult', I18N.get('result'),
        I18N.get('trig_enter_angle') || 'Enter a valid angle in degrees.');
      return;
    }

    const rad = angleDeg * Math.PI / 180;
    const sinVal = Math.sin(rad);
    const cosVal = Math.cos(rad);
    const tanVal = Math.tan(rad);

    let result = '';

    switch (func) {
      case 'sin':
        result = `sin(${angleDeg}) = ${sinVal.toFixed(6)}`;
        break;
      case 'cos':
        result = `cos(${angleDeg}) = ${cosVal.toFixed(6)}`;
        break;
      case 'tan':
        if (Math.abs(cosVal) < 1e-12) {
          result = `tan(${angleDeg}) = ${I18N.get('trig_undefined') || 'Undefined (cos = 0)'}`;
        } else {
          result = `tan(${angleDeg}) = ${tanVal.toFixed(6)}`;
        }
        break;
      case 'all':
      default:
        const cscVal = Math.abs(sinVal) < 1e-12 ? 'Undefined' : (1 / sinVal).toFixed(6);
        const secVal = Math.abs(cosVal) < 1e-12 ? 'Undefined' : (1 / cosVal).toFixed(6);
        const cotVal = Math.abs(sinVal) < 1e-12 ? 'Undefined' : (cosVal / sinVal).toFixed(6);
        const tanStr = Math.abs(cosVal) < 1e-12 ? 'Undefined' : tanVal.toFixed(6);
        result = `sin = ${sinVal.toFixed(6)} | cos = ${cosVal.toFixed(6)} | tan = ${tanStr} | csc = ${cscVal} | sec = ${secVal} | cot = ${cotVal}`;
        break;
    }

    App.showResult('trigResult', I18N.get('result'), result);

    App.showFormulaRef('trigFormula',
      'sin(x) = opp/hyp | cos(x) = adj/hyp | tan(x) = opp/adj = sin/cos | csc = 1/sin | sec = 1/cos | cot = 1/tan',
      'Trigonometric functions relate the angles of a right triangle to the ratios of its sides. These functions originated in ancient Greek astronomy — Hipparchus (c. 190-120 BC) compiled the first known trigonometric table, and Ptolemy (c. 100-170 AD) refined them in the Almagest. The sine function gives the ratio of the opposite side to the hypotenuse, cosine the adjacent to the hypotenuse, and tangent the opposite to the adjacent. The reciprocal functions (cosecant, secant, cotangent) are simply the reciprocals of sine, cosine, and tangent respectively. Key Pythagorean identities include: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, and 1 + cot²θ = csc²θ. Double-angle formulas: sin(2θ) = 2·sinθ·cosθ, cos(2θ) = cos²θ − sin²θ = 2·cos²θ − 1 = 1 − 2·sin²θ. These identities are foundational in physics (wave mechanics, oscillations, AC circuits), engineering (signal processing, structural analysis), and navigation. Tangent is undefined at 90° + n·180° because cosine equals zero at those angles, making the ratio sin/cos undefined.'
    );
  },

  clear() {
    App.clearInputs('#trigCalc');
    document.getElementById('trigResult').innerHTML = '';
    document.getElementById('trigFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 2. 2x2 Linear System (Cramer's Rule)
// ──────────────────────────────────────────────

const MathLinearSystem = {
  init() {
    const calcBtn = document.getElementById('calcLinearBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearLinearBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const a1 = parseFloat(document.getElementById('lsA1')?.value);
    const b1 = parseFloat(document.getElementById('lsB1')?.value);
    const c1 = parseFloat(document.getElementById('lsC1')?.value);
    const a2 = parseFloat(document.getElementById('lsA2')?.value);
    const b2 = parseFloat(document.getElementById('lsB2')?.value);
    const c2 = parseFloat(document.getElementById('lsC2')?.value);

    if ([a1, b1, c1, a2, b2, c2].some(v => isNaN(v))) {
      App.showResult('linearResult', I18N.get('result'),
        I18N.get('ls_fill_all') || 'Fill in all six coefficients (a1, b1, c1, a2, b2, c2).');
      return;
    }

    // Cramer's Rule:
    // D  = a1*b2 - a2*b1
    // Dx = c1*b2 - c2*b1
    // Dy = a1*c2 - a2*c1
    const D  = a1 * b2 - a2 * b1;
    const Dx = c1 * b2 - c2 * b1;
    const Dy = a1 * c2 - a2 * c1;

    let result = '';

    if (Math.abs(D) > 1e-12) {
      const x = Dx / D;
      const y = Dy / D;
      result = `${a1}x + ${b1}y = ${c1} ; ${a2}x + ${b2}y = ${c2} => x = ${x.toFixed(6)} | y = ${y.toFixed(6)}`;
    } else if (Math.abs(Dx) < 1e-12 && Math.abs(Dy) < 1e-12) {
      result = I18N.get('ls_infinite') || 'Infinite solutions: the two equations are dependent (same line).';
    } else {
      result = I18N.get('ls_no_solution') || 'No solution: the two lines are parallel and never intersect.';
    }

    App.showResult('linearResult', I18N.get('result'), result);

    App.showFormulaRef('linearFormula',
      'D = a1*b2 - a2*b1 | x = Dx/D | y = Dy/D | Dx = c1*b2 - c2*b1 | Dy = a1*c2 - a2*c1',
      'Cramer\'s Rule, published by Swiss mathematician Gabriel Cramer in 1750 in his work "Introduction to the Analysis of Algebraic Curves," provides an explicit formula for solving systems of linear equations using determinants. For a 2x2 system a1·x + b1·y = c1 and a2·x + b2·y = c2, the determinant D = a1·b2 − a2·b1 measures the "volume" of the coefficient matrix. If D ≠ 0, the system has a unique solution: x = Dx/D and y = Dy/D, where Dx replaces the x-column with the constants and Dy replaces the y-column. If D = 0 and both Dx = Dy = 0, the equations are dependent (represent the same line), yielding infinitely many solutions. If D = 0 but Dx or Dy ≠ 0, the lines are parallel with no intersection point. Cramer\'s Rule extends to n×n systems but becomes computationally expensive for large n (O(n!) operations vs O(n³) for Gaussian elimination). It is most useful for small systems where explicit formulas are desired, and in theoretical proofs about the existence and uniqueness of solutions.'
    );
  },

  clear() {
    App.clearInputs('#linearCalc');
    document.getElementById('linearResult').innerHTML = '';
    document.getElementById('linearFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 3. Financial Calculator (Simple & Compound Interest)
// ──────────────────────────────────────────────

const MathFinancial = {
  init() {
    const calcBtn = document.getElementById('calcFinBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearFinBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const type = document.getElementById('finType')?.value;
    const P = parseFloat(document.getElementById('finP')?.value);
    const rPct = parseFloat(document.getElementById('finR')?.value);
    const t = parseFloat(document.getElementById('finT')?.value);

    if (isNaN(P) || isNaN(rPct) || isNaN(t) || P < 0 || t < 0) {
      App.showResult('finResult', I18N.get('result'),
        I18N.get('fin_fill_valid') || 'Enter valid values for Principal (P >= 0), Rate (as %), and Time (t >= 0).');
      return;
    }

    const r = rPct / 100; // Convert percentage to decimal
    let result = '';

    if (type === 'simple') {
      // Simple Interest: J = P * r * t
      const interest = P * r * t;
      const total = P + interest;
      result = `J = ${P} × ${rPct}% × ${t} = ${interest.toFixed(2)} | ` +
               `${I18N.get('fin_total_amount') || 'Total Amount'} = P + J = ${total.toFixed(2)}`;
    } else {
      // Compound Interest: M = P * (1 + r)^t
      const total = P * Math.pow(1 + r, t);
      const interest = total - P;
      result = `M = ${P} × (1 + ${rPct}/100)^${t} = ${total.toFixed(2)} | ` +
               `${I18N.get('fin_interest_earned') || 'Interest Earned'} = M - P = ${interest.toFixed(2)}`;
    }

    App.showResult('finResult', I18N.get('result'), result);

    if (type === 'simple') {
      App.showFormulaRef('finFormula',
        'J = P × r × t | Total = P + J = P(1 + r·t)',
        'Simple Interest is the most basic form of interest calculation, where interest accrues only on the original principal amount P. The formula J = P × r × t gives the total interest earned, where P is the principal, r is the annual interest rate (as a decimal), and t is time in years. The total amount repaid is M = P + J = P(1 + rt). Simple interest is used in short-term loans, Treasury bills, and some consumer loans. For example, a $1,000 loan at 5% simple interest for 3 years earns J = 1000 × 0.05 × 3 = $150 in interest, for a total of $1,150. This method was the predominant interest calculation in ancient and medieval commerce, and its mathematical simplicity makes it ideal for introductory financial mathematics and certain legal contexts where compound interest is prohibited (e.g., some Islamic finance traditions).'
      );
    } else {
      App.showFormulaRef('finFormula',
        'M = P × (1 + r)^t | Interest = M - P = P[(1 + r)^t - 1]',
        'Compound Interest, famously called by Albert Einstein the "eighth wonder of the world," calculates interest on both the principal and the accumulated interest from previous periods. The formula M = P × (1 + r)^t gives the total amount after t compounding periods, where P is the principal, r is the interest rate per period (as a decimal), and t is the number of periods. The compound interest earned is M − P = P[(1+r)^t − 1]. The power of compounding becomes dramatic over long time horizons: $1,000 at 5% compounded annually for 30 years grows to $4,321.94, compared to only $2,500 with simple interest. This exponential growth arises because each period\'s interest earns interest in subsequent periods. The formula assumes annual compounding; for n compounding periods per year, use M = P(1 + r/n)^(n·t). The limiting case as n→∞ gives continuous compounding: M = P·e^(rt). Compound interest is the foundation of modern banking, investment analysis, retirement planning, and mortgage calculations.'
      );
    }
  },

  clear() {
    App.clearInputs('#finCalc');
    document.getElementById('finResult').innerHTML = '';
    document.getElementById('finFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 4. Scientific Notation Converter
// ──────────────────────────────────────────────

const MathScientificNotation = {
  init() {
    const calcBtn = document.getElementById('calcSciBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearSciBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const valueStr = document.getElementById('sciValue')?.value?.trim();
    const dir = document.getElementById('sciDir')?.value;

    if (!valueStr) {
      App.showResult('sciResult', I18N.get('result'),
        I18N.get('sci_enter_value') || 'Enter a number to convert.');
      return;
    }

    const num = parseFloat(valueStr);

    if (isNaN(num)) {
      App.showResult('sciResult', I18N.get('result'),
        I18N.get('sci_invalid_number') || 'Enter a valid number.');
      return;
    }

    let result = '';

    if (dir === 'to_sci') {
      // Convert standard number to scientific notation
      if (num === 0) {
        result = `0 = 0 × 10^0`;
      } else {
        const exp = Math.floor(Math.log10(Math.abs(num)));
        const mantissa = num / Math.pow(10, exp);
        result = `${num} = ${mantissa.toFixed(6)} × 10^${exp}`;
      }
    } else {
      // Convert from scientific notation to standard number
      // Parse input like "3.5e6" or "3.5×10^6" or "3.5E6"
      let standardNum = num;
      // Handle "a × 10^b" or "a*10^b" format
      const match = valueStr.match(/^([+-]?\d*\.?\d+)\s*[×x\*]\s*10\^([+-]?\d+)$/i);
      if (match) {
        const mantissa = parseFloat(match[1]);
        const exponent = parseInt(match[2]);
        standardNum = mantissa * Math.pow(10, exponent);
      }
      result = `${valueStr} = ${standardNum}`;
    }

    App.showResult('sciResult', I18N.get('result'), result);

    App.showFormulaRef('sciFormula',
      'Scientific Notation: N = a × 10^n  where 1 ≤ |a| < 10 and n is an integer',
      'Scientific notation expresses numbers as a product of a coefficient (mantissa) and a power of 10, standardized so that the coefficient has exactly one non-zero digit before the decimal point. This system was popularized by Archimedes in his work "The Sand Reckoner" (c. 250 BC), where he devised a way to represent extremely large numbers. The modern form was refined in the 16th-17th century alongside the development of logarithms by John Napier and Henry Briggs. Scientific notation is essential in science and engineering because it compactly represents very large numbers (e.g., the speed of light = 2.998 × 10^8 m/s) and very small numbers (e.g., the charge of an electron = 1.602 × 10^-19 C). The exponent n equals the number of places the decimal point must move to reach the standard form: positive for large numbers (move left), negative for small numbers (move right). Arithmetic is simplified: to multiply, add exponents; to divide, subtract exponents. This is why logarithmic and exponential representations are ubiquitous in physics, chemistry, astronomy, and computational science.'
    );
  },

  clear() {
    App.clearInputs('#sciCalc');
    document.getElementById('sciResult').innerHTML = '';
    document.getElementById('sciFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 5. Percentage Calculator
// ──────────────────────────────────────────────

const MathPercentage = {
  init() {
    const calcBtn = document.getElementById('calcPercBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearPercBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const mode = document.getElementById('percMode')?.value;
    const x = parseFloat(document.getElementById('percX')?.value);
    const y = parseFloat(document.getElementById('percY')?.value);

    if (isNaN(x) || isNaN(y)) {
      App.showResult('percResult', I18N.get('result'),
        I18N.get('perc_fill_values') || 'Enter valid values for X and Y.');
      return;
    }

    let result = '';
    let formulaStr = '';
    let explanation = '';

    switch (mode) {
      case 'of': {
        // X% of Y
        if (x < 0) {
          App.showResult('percResult', I18N.get('result'),
            I18N.get('perc_positive_x') || 'Percentage (X) must be non-negative for this mode.');
          return;
        }
        const answer = (x / 100) * y;
        result = `${x}% of ${y} = ${answer.toFixed(4)}`;
        formulaStr = 'Result = (X / 100) × Y';
        explanation = 'The percentage-of calculation finds what quantity corresponds to X percent of Y. The word "percent" comes from the Latin "per centum," meaning "by the hundred." The formula (X/100) × Y converts the percentage to a decimal fraction and multiplies by the base value. For example, 15% of 200 = (15/100) × 200 = 30. This is the most common percentage operation, used in calculating discounts (20% off $50), tax amounts (8.25% sales tax), tips (18% of $45), interest rates, and statistical proportions. In chemistry, it is used for percent composition, percent yield, and percent by mass calculations.';
        break;
      }
      case 'what_pct': {
        // X is what % of Y
        if (y === 0) {
          App.showResult('percResult', I18N.get('result'),
            I18N.get('perc_nonzero_y') || 'Y (the reference value) cannot be zero.');
          return;
        }
        const pct = (x / y) * 100;
        result = `${x} is ${pct.toFixed(4)}% of ${y}`;
        formulaStr = 'Percentage = (X / Y) × 100';
        explanation = 'This calculation finds what percentage one number (X) is of another (Y). The formula (X/Y) × 100 divides the part by the whole and converts to a percentage by multiplying by 100. For example, if you scored 45 out of 60 on a test, your score is (45/60) × 100 = 75%. This is the inverse of the "percentage of" operation. It is used in grade calculations, efficiency measurements (percent yield in chemistry), market share analysis, error rate calculations, and anywhere a part-to-whole ratio needs to be expressed as a percentage. Division by zero is undefined because there is no meaningful percentage of nothing.';
        break;
      }
      case 'change': {
        // % change from X to Y
        if (x === 0) {
          App.showResult('percResult', I18N.get('result'),
            I18N.get('perc_nonzero_base') || 'The initial value (X) cannot be zero for percent change.');
          return;
        }
        const change = ((y - x) / Math.abs(x)) * 100;
        const direction = change >= 0
          ? (I18N.get('perc_increase') || 'Increase')
          : (I18N.get('perc_decrease') || 'Decrease');
        result = `${I18N.get('perc_change_from') || 'Change from'} ${x} ${I18N.get('perc_to') || 'to'} ${y} = ${Math.abs(change).toFixed(4)}% ${direction}`;
        formulaStr = '% Change = ((Y - X) / |X|) × 100';
        explanation = 'Percent change measures the relative difference between an initial value X and a final value Y, expressed as a percentage of the initial value. The formula ((Y − X)/|X|) × 100 gives a positive result for increases and negative for decreases. The absolute value of X in the denominator ensures the calculation works correctly for negative base values. For example, a price change from $80 to $100 is a ((100−80)/80)×100 = 25% increase. Percent change is critical in economics (GDP growth, inflation), finance (stock returns, revenue growth), science (experimental error, signal change), and everyday life (price comparisons). Note that percent change is asymmetric: a 50% increase from 100 to 150 requires only a 33.3% decrease to return to 100. This asymmetry is why "percentage point" changes are used for rates (e.g., unemployment going from 5% to 7% is a 2 percentage point increase, not a 40% increase).';
        break;
      }
      default:
        App.showResult('percResult', I18N.get('result'),
          I18N.get('perc_select_mode') || 'Select a calculation mode.');
        return;
    }

    App.showResult('percResult', I18N.get('result'), result);
    App.showFormulaRef('percFormula', formulaStr, explanation);
  },

  clear() {
    App.clearInputs('#percCalc');
    document.getElementById('percResult').innerHTML = '';
    document.getElementById('percFormula').innerHTML = '';
  }
};
