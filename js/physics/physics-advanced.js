/* ============================================
   SCHEMATICA — Physics: Advanced Calculators
   Coulomb, Gravitation, Calorimetry, Torque,
   Doppler, Projectile, Thin Lenses
   ============================================ */

// ──────────────────────────────────────────────
// 1. Coulomb's Law Calculator
// ──────────────────────────────────────────────

const PhysicsCoulomb = {
  init() {
    const calcBtn = document.getElementById('calcCoulombBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearCoulombBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const k = 8.99e9; // N⋅m²/C²
    const q1 = parseFloat(document.getElementById('coulombQ1')?.value);
    const q2 = parseFloat(document.getElementById('coulombQ2')?.value);
    const r  = parseFloat(document.getElementById('coulombR')?.value);
    const F  = parseFloat(document.getElementById('coulombF')?.value);

    const vals = [q1, q2, r, F];
    const filled = vals.filter(v => !isNaN(v)).length;

    if (filled < 3) {
      App.showResult('coulombResult', I18N.get('result'),
        I18N.get('coulomb_fill_3of4') || 'Fill in at least 3 of the 4 fields (q1, q2, r, F) to calculate the missing value.');
      return;
    }

    let result = '';
    if (isNaN(F)) {
      const calcF = k * Math.abs(q1 * q2) / (r * r);
      result = `F = ${calcF.toExponential(6)} N`;
    } else if (isNaN(q1)) {
      const calcQ1 = (F * r * r) / (k * Math.abs(q2));
      result = `q1 = ${calcQ1.toExponential(6)} C`;
    } else if (isNaN(q2)) {
      const calcQ2 = (F * r * r) / (k * Math.abs(q1));
      result = `q2 = ${calcQ2.toExponential(6)} C`;
    } else if (isNaN(r)) {
      const calcR = Math.sqrt((k * Math.abs(q1 * q2)) / F);
      result = `r = ${calcR.toExponential(6)} m`;
    }

    App.showResult('coulombResult', I18N.get('result'), result);

    App.showFormulaRef('coulombFormula',
      'F = k * |q1 * q2| / r^2    (k = 8.99 × 10^9 N·m²/C²)',
      'Coulomb\'s Law describes the electrostatic force between two point charges. It was discovered by French physicist Charles-Augustin de Coulomb in 1785 using a torsion balance to precisely measure the force between charged spheres. The law states that the force is directly proportional to the product of the charges and inversely proportional to the square of the distance between them — mirroring the inverse-square structure of Newton\'s law of gravitation. The constant k = 1/(4πε₀), where ε₀ is the vacuum permittivity. This law is fundamental to all of electrostatics and is the starting point for understanding electric fields, Gauss\'s Law, and Maxwell\'s equations. It works because electric charge creates a radial field, and the force on a second charge is the product of that field with the second charge. The absolute value ensures the magnitude is always positive; the direction (attractive for opposite charges, repulsive for like charges) is determined separately by the signs of the charges.'
    );
  },

  clear() {
    App.clearInputs('#coulombCalc');
    document.getElementById('coulombResult').innerHTML = '';
    document.getElementById('coulombFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 2. Universal Gravitation Calculator
// ──────────────────────────────────────────────

const PhysicsGravitation = {
  init() {
    const calcBtn = document.getElementById('calcGravBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearGravBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const G = 6.674e-11; // N⋅m²/kg²
    const m1 = parseFloat(document.getElementById('gravM1')?.value);
    const m2 = parseFloat(document.getElementById('gravM2')?.value);
    const r  = parseFloat(document.getElementById('gravR')?.value);
    const F  = parseFloat(document.getElementById('gravF')?.value);

    const vals = [m1, m2, r, F];
    const filled = vals.filter(v => !isNaN(v)).length;

    if (filled < 3) {
      App.showResult('gravResult', I18N.get('result'),
        I18N.get('grav_fill_3of4') || 'Fill in at least 3 of the 4 fields (m1, m2, r, F) to calculate the missing value.');
      return;
    }

    let result = '';
    if (isNaN(F)) {
      const calcF = G * m1 * m2 / (r * r);
      result = `F = ${calcF.toExponential(6)} N`;
    } else if (isNaN(m1)) {
      const calcM1 = (F * r * r) / (G * m2);
      result = `m1 = ${calcM1.toExponential(6)} kg`;
    } else if (isNaN(m2)) {
      const calcM2 = (F * r * r) / (G * m1);
      result = `m2 = ${calcM2.toExponential(6)} kg`;
    } else if (isNaN(r)) {
      const calcR = Math.sqrt((G * m1 * m2) / F);
      result = `r = ${calcR.toExponential(6)} m`;
    }

    App.showResult('gravResult', I18N.get('result'), result);

    App.showFormulaRef('gravFormula',
      'F = G * m1 * m2 / r^2    (G = 6.674 × 10^-11 N·m²/kg²)',
      'Newton\'s Law of Universal Gravitation was published by Isaac Newton in his Principia Mathematica in 1687. Newton deduced that every particle of matter attracts every other particle with a force proportional to the product of their masses and inversely proportional to the square of the distance between their centers. This insight unified celestial mechanics (planetary orbits) with terrestrial physics (falling apples) under a single law. The gravitational constant G was not measured until 1798, when Henry Cavendish used a torsion balance experiment to determine it. The law works because mass generates a gravitational field that permeates space; any other mass in that field experiences an attractive force. The inverse-square relationship arises because the gravitational flux spreads over the surface of an expanding sphere (area = 4πr²), diluting the field strength with distance. This law is foundational for orbital mechanics, astrophysics, and cosmology, though it is superseded by Einstein\'s General Relativity for very strong gravitational fields or very high precision.'
    );
  },

  clear() {
    App.clearInputs('#gravCalc');
    document.getElementById('gravResult').innerHTML = '';
    document.getElementById('gravFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 3. Calorimetry / Specific Heat Calculator
// ──────────────────────────────────────────────

const PhysicsCalorimetry = {
  // Common specific heat capacities (J/kg·K)
  SPECIFIC_HEATS: {
    water:    4186,
    aluminum:  900,
    iron:      449,
    copper:    385,
    lead:      128
  },

  init() {
    const calcBtn = document.getElementById('calcCalorBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearCalorBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());

    // Populate common specific heats table on init
    this.showSpecificHeatTable();
  },

  showSpecificHeatTable() {
    const container = document.getElementById('calorFormula');
    if (!container) return;

    let tableHtml = `
      <div class="formula-ref">
        <div class="formula-ref__title">${I18N.get('common_specific_heats') || 'Common Specific Heat Capacities (J/kg·K)'}</div>
        <table style="width:100%;border-collapse:collapse;margin:0.5rem 0;">
          <tr style="border-bottom:1px solid var(--clr-border);">
            <th style="text-align:left;padding:0.25rem 0.5rem;">${I18N.get('substance') || 'Substance'}</th>
            <th style="text-align:right;padding:0.25rem 0.5rem;">c (J/kg·K)</th>
          </tr>`;

    const names = {
      water:    I18N.get('substance_water')    || 'Water',
      aluminum: I18N.get('substance_aluminum') || 'Aluminum',
      iron:     I18N.get('substance_iron')     || 'Iron',
      copper:   I18N.get('substance_copper')   || 'Copper',
      lead:     I18N.get('substance_lead')     || 'Lead'
    };

    for (const [key, value] of Object.entries(this.SPECIFIC_HEATS)) {
      tableHtml += `
          <tr style="border-bottom:1px solid var(--clr-border);">
            <td style="padding:0.25rem 0.5rem;">${names[key] || key}</td>
            <td style="text-align:right;padding:0.25rem 0.5rem;">${value}</td>
          </tr>`;
    }

    tableHtml += `
        </table>
      </div>`;

    container.innerHTML = tableHtml;
  },

  calculate() {
    const Q  = parseFloat(document.getElementById('calorQ')?.value);
    const m  = parseFloat(document.getElementById('calorM')?.value);
    const c  = parseFloat(document.getElementById('calorC')?.value);
    const dT = parseFloat(document.getElementById('calorDT')?.value);

    const vals = [Q, m, c, dT];
    const filled = vals.filter(v => !isNaN(v)).length;

    if (filled < 3) {
      App.showResult('calorResult', I18N.get('result'),
        I18N.get('calor_fill_3of4') || 'Fill in at least 3 of the 4 fields (Q, m, c, ΔT) to calculate the missing value.');
      return;
    }

    let result = '';
    if (isNaN(Q)) {
      const calcQ = m * c * dT;
      result = `Q = ${calcQ.toFixed(4)} J`;
    } else if (isNaN(m)) {
      const calcM = Q / (c * dT);
      result = `m = ${calcM.toFixed(4)} kg`;
    } else if (isNaN(c)) {
      const calcC = Q / (m * dT);
      result = `c = ${calcC.toFixed(4)} J/(kg·K)`;
    } else if (isNaN(dT)) {
      const calcDT = Q / (m * c);
      result = `ΔT = ${calcDT.toFixed(4)} K`;
    }

    App.showResult('calorResult', I18N.get('result'), result);

    App.showFormulaRef('calorFormula',
      'Q = m * c * ΔT',
      'The Specific Heat equation describes the amount of thermal energy (Q) required to change the temperature of a substance. It was first systematically investigated by Scottish physicist Joseph Black in the 1760s, who distinguished between heat capacity and latent heat through careful calorimetric experiments. The specific heat capacity (c) is an intrinsic property of each material — it represents the energy needed to raise 1 kg of a substance by 1 K. Water\'s exceptionally high specific heat (4186 J/kg·K) is why oceans moderate climate and why coastal areas have milder temperatures than inland regions. The equation works because thermal energy is stored in the kinetic and vibrational modes of molecules; materials with more degrees of freedom per unit mass (like water with its complex hydrogen bonding) require more energy to increase molecular motion by a given amount. This relationship is central to calorimetry, climate science, and thermal engineering.'
    );

    // Re-append the specific heats table below the formula reference
    const formulaContainer = document.getElementById('calorFormula');
    if (formulaContainer) {
      let tableHtml = `
        <div class="formula-ref" style="margin-top:0.75rem;">
          <div class="formula-ref__title">${I18N.get('common_specific_heats') || 'Common Specific Heat Capacities (J/kg·K)'}</div>
          <table style="width:100%;border-collapse:collapse;margin:0.5rem 0;">
            <tr style="border-bottom:1px solid var(--clr-border);">
              <th style="text-align:left;padding:0.25rem 0.5rem;">${I18N.get('substance') || 'Substance'}</th>
              <th style="text-align:right;padding:0.25rem 0.5rem;">c (J/kg·K)</th>
            </tr>`;

      const names = {
        water:    I18N.get('substance_water')    || 'Water',
        aluminum: I18N.get('substance_aluminum') || 'Aluminum',
        iron:     I18N.get('substance_iron')     || 'Iron',
        copper:   I18N.get('substance_copper')   || 'Copper',
        lead:     I18N.get('substance_lead')     || 'Lead'
      };

      for (const [key, value] of Object.entries(this.SPECIFIC_HEATS)) {
        tableHtml += `
            <tr style="border-bottom:1px solid var(--clr-border);">
              <td style="padding:0.25rem 0.5rem;">${names[key] || key}</td>
              <td style="text-align:right;padding:0.25rem 0.5rem;">${value}</td>
            </tr>`;
      }

      tableHtml += `</table></div>`;
      formulaContainer.innerHTML += tableHtml;
    }
  },

  clear() {
    App.clearInputs('#calorCalc');
    document.getElementById('calorResult').innerHTML = '';
    // Restore the specific heats table after clearing
    this.showSpecificHeatTable();
  }
};


// ──────────────────────────────────────────────
// 4. Torque Calculator
// ──────────────────────────────────────────────

const PhysicsTorque = {
  init() {
    const calcBtn = document.getElementById('calcTorqueBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearTorqueBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const tau   = parseFloat(document.getElementById('torqueTau')?.value);
    const r     = parseFloat(document.getElementById('torqueR')?.value);
    const F     = parseFloat(document.getElementById('torqueF')?.value);
    const theta = parseFloat(document.getElementById('torqueTheta')?.value);

    const vals = [tau, r, F, theta];
    const filled = vals.filter(v => !isNaN(v)).length;

    if (filled < 3) {
      App.showResult('torqueResult', I18N.get('result'),
        I18N.get('torque_fill_3of4') || 'Fill in at least 3 of the 4 fields (τ, r, F, θ) to calculate the missing value.');
      return;
    }

    let result = '';
    if (isNaN(tau)) {
      const thetaRad = theta * Math.PI / 180;
      const calcTau = r * F * Math.sin(thetaRad);
      result = `τ = ${calcTau.toFixed(6)} N·m`;
    } else if (isNaN(r)) {
      const thetaRad = theta * Math.PI / 180;
      const sinTheta = Math.sin(thetaRad);
      if (Math.abs(sinTheta) < 1e-12) {
        App.showResult('torqueResult', I18N.get('result'),
          I18N.get('torque_sin_zero') || 'sin(θ) ≈ 0: cannot solve for r when the force is along the lever arm.');
        return;
      }
      const calcR = tau / (F * sinTheta);
      result = `r = ${calcR.toFixed(6)} m`;
    } else if (isNaN(F)) {
      const thetaRad = theta * Math.PI / 180;
      const sinTheta = Math.sin(thetaRad);
      if (Math.abs(sinTheta) < 1e-12) {
        App.showResult('torqueResult', I18N.get('result'),
          I18N.get('torque_sin_zero') || 'sin(θ) ≈ 0: cannot solve for F when the force is along the lever arm.');
        return;
      }
      const calcF = tau / (r * sinTheta);
      result = `F = ${calcF.toFixed(6)} N`;
    } else if (isNaN(theta)) {
      // τ = r * F * sin(θ)  =>  sin(θ) = τ / (r * F)
      const sinTheta = tau / (r * F);
      if (Math.abs(sinTheta) > 1) {
        App.showResult('torqueResult', I18N.get('result'),
          I18N.get('torque_invalid_ratio') || 'No valid angle: |τ/(r·F)| > 1. Check your input values.');
        return;
      }
      const calcThetaRad = Math.asin(sinTheta);
      const calcThetaDeg = calcThetaRad * 180 / Math.PI;
      result = `θ = ${calcThetaDeg.toFixed(4)}°`;
    }

    App.showResult('torqueResult', I18N.get('result'), result);

    App.showFormulaRef('torqueFormula',
      'τ = r * F * sin(θ)',
      'Torque (also called moment of force) quantifies the rotational effect of a force applied at a distance from a pivot point. The concept was formalized by Archimedes of Syracuse around 250 BC, who famously said "Give me a lever long enough and a fulcrum on which to place it, and I shall move the world." The modern vector formulation was developed in the 19th century. The equation τ = r × F (cross product) shows that only the component of force perpendicular to the lever arm produces rotation — this is captured by the sin(θ) factor, where θ is the angle between the force vector and the lever arm. Maximum torque occurs when θ = 90° (force perpendicular to the arm), and zero torque when θ = 0° or 180° (force along the arm). Torque is the rotational analog of force: just as F = ma describes linear acceleration, τ = Iα describes angular acceleration (where I is moment of inertia and α is angular acceleration). This is essential for understanding levers, gears, engines, and rotating machinery.'
    );
  },

  clear() {
    App.clearInputs('#torqueCalc');
    document.getElementById('torqueResult').innerHTML = '';
    document.getElementById('torqueFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 5. Doppler Effect Calculator
// ──────────────────────────────────────────────

const PhysicsDoppler = {
  init() {
    const calcBtn = document.getElementById('calcDopplerBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearDopplerBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const f       = parseFloat(document.getElementById('dopplerF')?.value);
    const v_obs   = parseFloat(document.getElementById('dopplerVObs')?.value);
    const v_src   = parseFloat(document.getElementById('dopplerVSrc')?.value);
    const f_prime = parseFloat(document.getElementById('dopplerFPrime')?.value);

    // Speed of sound — editable, default 343 m/s
    let v = parseFloat(document.getElementById('dopplerV')?.value);
    if (isNaN(v) || v <= 0) v = 343;

    const vals = [f, v_obs, v_src, f_prime];
    const filled = vals.filter(val => !isNaN(val)).length;

    if (filled < 3) {
      App.showResult('dopplerResult', I18N.get('result'),
        I18N.get('doppler_fill_3of4') || 'Fill in at least 3 of the 4 fields (f, v_obs, v_src, f\') to calculate the missing value.');
      return;
    }

    // Doppler formula for both observer and source moving:
    // f' = f * (v + v_obs) / (v - v_src)
    // where v_obs positive = toward source, v_src positive = toward observer
    let result = '';

    if (isNaN(f_prime)) {
      // Solve for f'
      const denominator = v - v_src;
      if (Math.abs(denominator) < 1e-12) {
        App.showResult('dopplerResult', I18N.get('result'),
          I18N.get('doppler_sonic_boom') || 'Denominator ≈ 0: source speed equals speed of sound (sonic boom condition).');
        return;
      }
      const calcFPrime = f * (v + v_obs) / denominator;
      result = `f' = ${calcFPrime.toFixed(4)} Hz`;
    } else if (isNaN(f)) {
      // f = f' * (v - v_src) / (v + v_obs)
      const denominator = v + v_obs;
      if (Math.abs(denominator) < 1e-12) {
        App.showResult('dopplerResult', I18N.get('result'),
          I18N.get('doppler_invalid') || 'Cannot solve: denominator ≈ 0 in calculation.');
        return;
      }
      const calcF = f_prime * (v - v_src) / denominator;
      result = `f = ${calcF.toFixed(4)} Hz`;
    } else if (isNaN(v_obs)) {
      // f' = f * (v + v_obs) / (v - v_src)
      // => v_obs = f' * (v - v_src) / f - v
      const denominator = v - v_src;
      if (Math.abs(denominator) < 1e-12 || Math.abs(f) < 1e-12) {
        App.showResult('dopplerResult', I18N.get('result'),
          I18N.get('doppler_invalid') || 'Cannot solve: invalid input combination.');
        return;
      }
      const calcVObs = (f_prime * denominator / f) - v;
      result = `v_obs = ${calcVObs.toFixed(4)} m/s`;
    } else if (isNaN(v_src)) {
      // f' = f * (v + v_obs) / (v - v_src)
      // => v - v_src = f * (v + v_obs) / f'
      // => v_src = v - f * (v + v_obs) / f'
      if (Math.abs(f_prime) < 1e-12) {
        App.showResult('dopplerResult', I18N.get('result'),
          I18N.get('doppler_invalid') || 'Cannot solve: f\' cannot be zero.');
        return;
      }
      const calcVSrc = v - (f * (v + v_obs) / f_prime);
      result = `v_src = ${calcVSrc.toFixed(4)} m/s`;
    }

    App.showResult('dopplerResult', I18N.get('result'), result);

    App.showFormulaRef('dopplerFormula',
      "f' = f * (v + v_obs) / (v - v_src)    [v = speed of sound ≈ 343 m/s at 20°C]",
      'The Doppler Effect describes the change in observed frequency when there is relative motion between a wave source and an observer. It was first proposed by Austrian physicist Christian Doppler in 1842 to explain the color shift of stars, and was experimentally confirmed for sound by Christophorus Buys Ballot in 1845 using musicians on a moving train. When the source and observer approach each other, the observed frequency increases (pitch rises); when they move apart, the frequency decreases (pitch drops). The formula accounts for both source and observer motion: v_obs is positive when the observer moves toward the source, and v_src is positive when the source moves toward the observer. The effect works because motion compresses wave crests in the direction of approach and stretches them in the direction of recession. The Doppler Effect is not limited to sound — it also applies to light (electromagnetic waves), forming the basis for redshift measurements in astronomy that proved the universe is expanding, a discovery made by Edwin Hubble in 1929. In medicine, Doppler ultrasound uses this principle to measure blood flow velocity.'
    );
  },

  clear() {
    App.clearInputs('#dopplerCalc');
    // Restore default speed of sound
    const vInput = document.getElementById('dopplerV');
    if (vInput) vInput.value = '343';
    document.getElementById('dopplerResult').innerHTML = '';
    document.getElementById('dopplerFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 6. Projectile Motion Calculator
// ──────────────────────────────────────────────

const PhysicsProjectile = {
  init() {
    const calcBtn = document.getElementById('calcProjectileBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearProjectileBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const v0    = parseFloat(document.getElementById('projV0')?.value);
    const angle = parseFloat(document.getElementById('projAngle')?.value);

    let g = parseFloat(document.getElementById('projG')?.value);
    if (isNaN(g) || g <= 0) g = 9.81;

    if (isNaN(v0) || isNaN(angle)) {
      App.showResult('projectileResult', I18N.get('result'),
        I18N.get('projectile_fill_required') || 'Enter initial velocity (v0) and launch angle.');
      return;
    }

    if (v0 < 0) {
      App.showResult('projectileResult', I18N.get('result'),
        I18N.get('projectile_positive_v0') || 'Initial velocity must be positive.');
      return;
    }

    const thetaRad = angle * Math.PI / 180;

    // Range: R = v0² * sin(2θ) / g
    const R = (v0 * v0 * Math.sin(2 * thetaRad)) / g;

    // Max Height: H = v0² * sin²(θ) / (2g)
    const H = (v0 * v0 * Math.sin(thetaRad) * Math.sin(thetaRad)) / (2 * g);

    // Time of Flight: T = 2 * v0 * sin(θ) / g
    const T = (2 * v0 * Math.sin(thetaRad)) / g;

    const results = [
      `R = ${R.toFixed(6)} m`,
      `H = ${H.toFixed(6)} m`,
      `T = ${T.toFixed(6)} s`
    ];

    App.showResult('projectileResult', I18N.get('result'), results.join(' | '));

    App.showFormulaRef('projectileFormula',
      'R = v0²·sin(2θ)/g  |  H = v0²·sin²(θ)/(2g)  |  T = 2·v0·sin(θ)/g',
      'Projectile motion equations describe the trajectory of an object launched near the Earth\'s surface under the influence of gravity alone (neglecting air resistance). These results were first derived by Galileo Galilei in the early 1630s and published in his 1638 work "Discourses and Mathematical Demonstrations Relating to Two New Sciences." Galileo\'s key insight was that horizontal and vertical motions are independent — the horizontal velocity remains constant while the vertical velocity changes linearly due to gravity. This decomposition produces the parabolic trajectory. The range R is maximized at θ = 45° because sin(2θ) reaches its maximum of 1 at 2θ = 90°. The maximum height H occurs at the apex where the vertical velocity is zero, and the time of flight T is twice the time to reach the apex. These equations assume: (1) constant gravitational acceleration g, (2) no air resistance, (3) flat terrain, and (4) launch and landing at the same height. For real projectiles, air resistance significantly reduces range and alters the optimal angle below 45°.'
    );
  },

  clear() {
    App.clearInputs('#projectileCalc');
    // Restore default g
    const gInput = document.getElementById('projG');
    if (gInput) gInput.value = '9.81';
    document.getElementById('projectileResult').innerHTML = '';
    document.getElementById('projectileFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 7. Thin Lens Equation Calculator
// ──────────────────────────────────────────────

const PhysicsLenses = {
  init() {
    const calcBtn = document.getElementById('calcLensBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearLensBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const f  = parseFloat(document.getElementById('lensF')?.value);
    const dO = parseFloat(document.getElementById('lensDo')?.value);
    const dI = parseFloat(document.getElementById('lensDi')?.value);

    const vals = [f, dO, dI];
    const filled = vals.filter(v => !isNaN(v)).length;

    if (filled < 2) {
      App.showResult('lensResult', I18N.get('result'),
        I18N.get('lens_fill_2of3') || 'Fill in at least 2 of the 3 fields (f, do, di) to calculate the missing value.');
      return;
    }

    let result = '';
    let calcF, calcDO, calcDI, M;

    if (isNaN(f)) {
      // 1/f = 1/do + 1/di  =>  f = do*di / (do + di)
      if (Math.abs(dO + dI) < 1e-12) {
        App.showResult('lensResult', I18N.get('result'),
          I18N.get('lens_infinity') || 'Object and image distances sum to zero: focal length would be infinite.');
        return;
      }
      calcF = (dO * dI) / (dO + dI);
      M = -dI / dO;
      result = `f = ${calcF.toFixed(6)} cm  |  M = ${M.toFixed(6)}`;
    } else if (isNaN(dO)) {
      // 1/do = 1/f - 1/di  =>  do = f*di / (di - f)
      if (Math.abs(dI - f) < 1e-12) {
        App.showResult('lensResult', I18N.get('result'),
          I18N.get('lens_object_infinity') || 'Image distance equals focal length: object would be at infinity.');
        return;
      }
      calcDO = (f * dI) / (dI - f);
      M = -dI / calcDO;
      result = `do = ${calcDO.toFixed(6)} cm  |  M = ${M.toFixed(6)}`;
    } else if (isNaN(dI)) {
      // 1/di = 1/f - 1/do  =>  di = f*do / (do - f)
      if (Math.abs(dO - f) < 1e-12) {
        App.showResult('lensResult', I18N.get('result'),
          I18N.get('lens_image_infinity') || 'Object distance equals focal length: image would be at infinity (parallel rays).');
        return;
      }
      calcDI = (f * dO) / (dO - f);
      M = -calcDI / dO;
      result = `di = ${calcDI.toFixed(6)} cm  |  M = ${M.toFixed(6)}`;
    }

    // Add image type interpretation
    let interpretation = '';
    const effectiveDI = isNaN(dI) ? calcDI : dI;
    const effectiveF  = isNaN(f)  ? calcF  : f;
    const effectiveDO = isNaN(dO) ? calcDO : dO;

    if (effectiveDI > 0) {
      interpretation = I18N.get('lens_real_image') || 'Real image (inverted, on opposite side of lens)';
    } else if (effectiveDI < 0) {
      interpretation = I18N.get('lens_virtual_image') || 'Virtual image (upright, on same side as object)';
    }

    if (Math.abs(M) > 1) {
      interpretation += ' | ' + (I18N.get('lens_magnified') || 'Magnified');
    } else if (Math.abs(M) < 1 && Math.abs(M) > 0) {
      interpretation += ' | ' + (I18N.get('lens_reduced') || 'Reduced');
    } else if (Math.abs(M) === 1) {
      interpretation += ' | ' + (I18N.get('lens_same_size') || 'Same size');
    }

    result += `  [${interpretation}]`;

    App.showResult('lensResult', I18N.get('result'), result);

    App.showFormulaRef('lensFormula',
      '1/f = 1/do + 1/di  |  M = -di/do',
      'The Thin Lens Equation relates the focal length (f) of a lens to the object distance (do) and image distance (di). It was developed in the 17th century, with major contributions from René Descartes who published his "Dioptrics" in 1637, and from Johannes Kepler who studied optics and lens systems in his 1611 work "Dioptrice." The equation applies to both converging (convex) and diverging (concave) thin lenses under the sign convention where: f is positive for converging lenses and negative for diverging lenses; do is positive for real objects; di is positive for real images (opposite side) and negative for virtual images (same side as object). The magnification M = -di/do tells both the size ratio and orientation: a negative M means the image is inverted (real), while a positive M means it is upright (virtual). The equation works by applying the law of refraction (Snell\'s Law) at each surface of the lens and assuming the lens is thin enough that its thickness can be neglected. This is fundamental to optical instrument design — cameras, microscopes, telescopes, eyeglasses, and projectors all rely on this relationship.'
    );
  },

  clear() {
    App.clearInputs('#lensCalc');
    document.getElementById('lensResult').innerHTML = '';
    document.getElementById('lensFormula').innerHTML = '';
  }
};
