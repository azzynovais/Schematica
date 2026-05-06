/* ============================================
   SCHEMATICA — Biology: Advanced Calculators
   Chi-Square, DNA/RNA, Blood Type, BMI
   ============================================ */

// ──────────────────────────────────────────────
// 1. Chi-Square Goodness of Fit Test
// ──────────────────────────────────────────────

const BioChiSquare = {
  // Critical values for chi-square distribution at p = 0.05
  // Indexed by degrees of freedom (df = k - 1)
  CRITICAL_VALUES: {
    1: 3.841,  2: 5.991,  3: 7.815,  4: 9.488,  5: 11.070,
    6: 12.592, 7: 14.067, 8: 15.507, 9: 16.919, 10: 18.307,
    11: 19.675, 12: 21.026, 13: 22.362, 14: 23.685, 15: 24.996,
    16: 26.296, 17: 27.587, 18: 28.869, 19: 30.144, 20: 31.410
  },

  init() {
    const calcBtn = document.getElementById('calcChiBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearChiBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const obsStr = document.getElementById('chiObs')?.value?.trim();
    const expStr = document.getElementById('chiExp')?.value?.trim();

    if (!obsStr || !expStr) {
      App.showResult('chiResult', I18N.get('result'),
        I18N.get('chi_enter_data') || 'Enter comma-separated observed and expected values.');
      return;
    }

    const observed = obsStr.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const expected = expStr.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));

    if (observed.length === 0 || expected.length === 0) {
      App.showResult('chiResult', I18N.get('result'),
        I18N.get('chi_valid_data') || 'Enter valid numbers separated by commas.');
      return;
    }

    if (observed.length !== expected.length) {
      App.showResult('chiResult', I18N.get('result'),
        I18N.get('chi_same_length') || 'Observed and expected must have the same number of categories.');
      return;
    }

    if (observed.length > 10) {
      App.showResult('chiResult', I18N.get('result'),
        I18N.get('chi_max_10') || 'Maximum 10 categories supported.');
      return;
    }

    if (expected.some(e => e <= 0)) {
      App.showResult('chiResult', I18N.get('result'),
        I18N.get('chi_positive_expected') || 'All expected values must be positive.');
      return;
    }

    // Calculate X² = Σ((O - E)² / E)
    let chiSquare = 0;
    const details = [];

    for (let i = 0; i < observed.length; i++) {
      const diff = observed[i] - expected[i];
      const contribution = (diff * diff) / expected[i];
      chiSquare += contribution;
      details.push(`Cat${i + 1}: (O=${observed[i]} - E=${expected[i]})²/E = ${contribution.toFixed(4)}`);
    }

    const df = observed.length - 1;
    const criticalVal = this.CRITICAL_VALUES[df] || null;
    const significant = criticalVal !== null ? chiSquare > criticalVal : null;

    let interpStr = '';
    if (significant !== null) {
      interpStr = significant
        ? (I18N.get('chi_reject') || 'Reject H0: significant difference (p < 0.05)')
        : (I18N.get('chi_fail_reject') || 'Fail to reject H0: no significant difference (p >= 0.05)');
    }

    const resultParts = [
      `X² = ${chiSquare.toFixed(4)}`,
      `df = ${df}`,
      criticalVal !== null ? `Critical (α=0.05) = ${criticalVal}` : '',
      interpStr
    ].filter(Boolean).join(' | ');

    const detailStr = details.join(' | ');

    App.showResult('chiResult', I18N.get('result'), `${resultParts}<br><small>${detailStr}</small>`);

    let criticalTableHtml = '<br><small>Critical values (α=0.05): ';
    for (let d = 1; d <= Math.min(df + 3, 10); d++) {
      const marker = d === df ? ' <strong>' : '';
      const markerEnd = d === df ? '</strong>' : '';
      criticalTableHtml += `df=${d}:${marker}${this.CRITICAL_VALUES[d]}${markerEnd}  `;
    }
    criticalTableHtml += '</small>';

    App.showFormulaRef('chiFormula',
      'X² = Σ((Oᵢ - Eᵢ)² / Eᵢ) | df = k - 1 | Compare with χ² critical at α = 0.05',
      'The Chi-Square (χ²) Goodness of Fit Test determines whether observed frequency data significantly differ from expected frequencies under a null hypothesis. It was developed by English statistician Karl Pearson in 1900 and is one of the most widely used statistical tests in biology. The formula X² = Σ((O−E)²/E) sums the squared differences between observed (O) and expected (E) frequencies, each divided by the expected frequency. The division by E standardizes each term so that larger expected values do not dominate the sum. The degrees of freedom df = k − 1 (where k is the number of categories) account for the constraint that the total observed must equal the total expected. If the calculated X² exceeds the critical value from the chi-square distribution table at the chosen significance level (typically α = 0.05), we reject the null hypothesis, concluding that the observed data do not fit the expected distribution. In biology, this test is used to verify Mendelian ratios (e.g., 3:1 monohybrid, 9:3:3:1 dihybrid), Hardy-Weinberg equilibrium, and ecological distribution patterns. Assumptions: (1) data are frequency counts, (2) observations are independent, (3) all expected values should be ≥ 5 for the approximation to be valid (if not, use Fisher\'s exact test).'
    );

    // Append critical values table to formula ref
    const formulaContainer = document.getElementById('chiFormula');
    if (formulaContainer) {
      formulaContainer.innerHTML += criticalTableHtml;
    }
  },

  clear() {
    App.clearInputs('#chiCalc');
    document.getElementById('chiResult').innerHTML = '';
    document.getElementById('chiFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 2. DNA / RNA Transcription & Complement
// ──────────────────────────────────────────────

const BioDNARNA = {
  // Standard genetic code (codon -> amino acid)
  CODON_TABLE: {
    'UUU':'Phe','UUC':'Phe','UUA':'Leu','UUG':'Leu',
    'CUU':'Leu','CUC':'Leu','CUA':'Leu','CUG':'Leu',
    'AUU':'Ile','AUC':'Ile','AUA':'Ile','AUG':'Met',
    'GUU':'Val','GUC':'Val','GUA':'Val','GUG':'Val',
    'UCU':'Ser','UCC':'Ser','UCA':'Ser','UCG':'Ser',
    'CCU':'Pro','CCC':'Pro','CCA':'Pro','CCG':'Pro',
    'ACU':'Thr','ACC':'Thr','ACA':'Thr','ACG':'Thr',
    'GCU':'Ala','GCC':'Ala','GCA':'Ala','GCG':'Ala',
    'UAU':'Tyr','UAC':'Tyr','UAA':'Stop','UAG':'Stop',
    'CAU':'His','CAC':'His','CAA':'Gln','CAG':'Gln',
    'AAU':'Asn','AAC':'Asn','AAA':'Lys','AAG':'Lys',
    'GAU':'Asp','GAC':'Asp','GAA':'Glu','GAG':'Glu',
    'UGU':'Cys','UGC':'Cys','UGA':'Stop','UGG':'Trp',
    'CGU':'Arg','CGC':'Arg','CGA':'Arg','CGG':'Arg',
    'AGU':'Ser','AGC':'Ser','AGA':'Arg','AGG':'Arg',
    'GGU':'Gly','GGC':'Gly','GGA':'Gly','GGG':'Gly'
  },

  init() {
    const calcBtn = document.getElementById('calcDnaBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearDnaBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const input = document.getElementById('dnaInput')?.value?.trim().toUpperCase();
    const op = document.getElementById('dnaOp')?.value;

    if (!input) {
      App.showResult('dnaResult', I18N.get('result'),
        I18N.get('dna_enter_strand') || 'Enter a DNA strand (5\' to 3\').');
      return;
    }

    // Validate input — must contain only A, T, G, C
    if (!/^[ATGC]+$/.test(input)) {
      App.showResult('dnaResult', I18N.get('result'),
        I18N.get('dna_invalid_bases') || 'DNA strand must contain only A, T, G, C.');
      return;
    }

    let result = '';
    let formulaStr = '';
    let explanation = '';

    if (op === 'transcribe') {
      // Transcription: DNA -> mRNA (A->U, T->A, G->C, C->G)
      const mrna = input.replace(/A/g, 'U_').replace(/T/g, 'A_').replace(/G/g, 'C_').replace(/C/g, 'G_').replace(/_/g, '');
      result = `DNA (5'→3'): ${input}<br>mRNA (5'→3'): ${mrna}`;
      formulaStr = 'DNA → mRNA: A→U, T→A, G→C, C→G';
      explanation = 'Transcription is the process by which an mRNA molecule is synthesized from a DNA template strand, catalyzed by the enzyme RNA polymerase. It was first demonstrated by Sydney Brenner, François Jacob, and Matthew Meselson in 1961. During transcription, RNA polymerase reads the DNA template strand in the 3\'→5\' direction and synthesizes mRNA in the 5\'→3\' direction. The base pairing rules for transcription are: Adenine (A) in DNA pairs with Uracil (U) in RNA (replacing Thymine), Thymine (T) pairs with Adenine (A), Guanine (G) pairs with Cytosine (C), and Cytosine (C) pairs with Guanine (G). The key difference from DNA replication is that RNA uses Uracil (U) instead of Thymine (T). In eukaryotes, the initial transcript (pre-mRNA) undergoes processing — 5\' capping, 3\' polyadenylation, and splicing of introns — before becoming mature mRNA that exits the nucleus for translation.';
    } else if (op === 'complement') {
      // Complement strand: A->T, T->A, G->C, C->G
      const complement = input.replace(/A/g, 'T_').replace(/T/g, 'A_').replace(/G/g, 'C_').replace(/C/g, 'G_').replace(/_/g, '');
      result = `DNA (5'→3'): ${input}<br>Complement (3'→5'): ${complement}`;
      formulaStr = 'Complement strand: A↔T, G↔C';
      explanation = 'DNA complementarity is the foundational principle of molecular biology, established by Erwin Chargaff in 1950 (Chargaff\'s rules: A = T and G = C) and explained structurally by Watson and Crick in their landmark 1953 paper describing the double helix. In double-stranded DNA, each base pairs with its complement via hydrogen bonds: Adenine (A) pairs with Thymine (T) through two hydrogen bonds, and Guanine (G) pairs with Cytosine (C) through three hydrogen bonds. The two strands run antiparallel: one in the 5\'→3\' direction, the other in the 3\'→5\' direction. This complementarity is essential for DNA replication (each strand serves as a template for a new complementary strand), PCR amplification (primers bind to complementary sequences), DNA sequencing, and DNA repair mechanisms. The stronger G-C bond (3 hydrogen bonds vs 2 for A-T) means DNA with higher GC content has a higher melting temperature, a fact exploited in molecular biology techniques like Southern blotting and DNA fingerprinting.';
    } else if (op === 'translate') {
      // First transcribe to mRNA, then translate to amino acids
      const mrna = input.replace(/A/g, 'U_').replace(/T/g, 'A_').replace(/G/g, 'C_').replace(/C/g, 'G_').replace(/_/g, '');
      const aminoAcids = [];

      for (let i = 0; i + 2 < mrna.length; i += 3) {
        const codon = mrna.substring(i, i + 3);
        const aa = this.CODON_TABLE[codon] || '?';
        aminoAcids.push(aa);
      }

      // Check if there's a partial codon at the end
      const remainder = mrna.length % 3;
      if (remainder > 0) {
        aminoAcids.push(`[${mrna.slice(-remainder)}?]`);
      }

      const aaSequence = aminoAcids.join(' - ');
      result = `DNA (5'→3'): ${input}<br>mRNA (5'→3'): ${mrna}<br>Amino Acids: ${aaSequence}`;
      formulaStr = 'Translation: mRNA codons → Amino Acids (Standard Genetic Code)';
      explanation = 'Translation is the process by which ribosomes synthesize proteins from an mRNA template, reading it in triplets called codons. The genetic code was deciphered between 1961 and 1966 by Marshall Nirenberg, Har Gobind Khorana, and others, earning them the 1968 Nobel Prize. The standard genetic code uses 64 codons (4³ possible triplets) to encode 20 standard amino acids plus 3 stop signals (UAA, UAG, UGA). The code is degenerate (redundant): most amino acids are encoded by multiple codons (e.g., Leucine has 6 codons). AUG serves as both the start codon (initiating translation) and codes for Methionine. Translation proceeds in three phases: (1) Initiation — the small ribosomal subunit binds the mRNA and the initiator tRNA carrying Met finds the AUG start codon; (2) Elongation — tRNAs deliver amino acids matching each codon, and the ribosome catalyzes peptide bond formation; (3) Termination — a stop codon (UAA, UAG, or UGA) enters the A-site and release factors trigger polypeptide release. The genetic code is nearly universal across all life, providing strong evidence for a common ancestor, with minor variations in mitochondria and some protozoa.';
    }

    App.showResult('dnaResult', I18N.get('result'), result);
    App.showFormulaRef('dnaFormula', formulaStr, explanation);
  },

  clear() {
    App.clearInputs('#dnaCalc');
    document.getElementById('dnaResult').innerHTML = '';
    document.getElementById('dnaFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 3. Blood Type Compatibility
// ──────────────────────────────────────────────

const BioBloodType = {
  // Blood type compatibility data
  COMPATIBILITY: {
    'A+':  { donateTo: ['A+', 'AB+'],           receiveFrom: ['A+', 'A-', 'O+', 'O-'] },
    'A-':  { donateTo: ['A+', 'A-', 'AB+', 'AB-'], receiveFrom: ['A-', 'O-'] },
    'B+':  { donateTo: ['B+', 'AB+'],           receiveFrom: ['B+', 'B-', 'O+', 'O-'] },
    'B-':  { donateTo: ['B+', 'B-', 'AB+', 'AB-'], receiveFrom: ['B-', 'O-'] },
    'AB+': { donateTo: ['AB+'],                  receiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    'AB-': { donateTo: ['AB+', 'AB-'],           receiveFrom: ['A-', 'B-', 'AB-', 'O-'] },
    'O+':  { donateTo: ['A+', 'B+', 'AB+', 'O+'], receiveFrom: ['O+', 'O-'] },
    'O-':  { donateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], receiveFrom: ['O-'] }
  },

  init() {
    const calcBtn = document.getElementById('calcBloodBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());
  },

  calculate() {
    const bloodType = document.getElementById('bloodType')?.value;

    if (!bloodType || !this.COMPATIBILITY[bloodType]) {
      App.showResult('bloodResult', I18N.get('result'),
        I18N.get('blood_select_type') || 'Select a blood type.');
      return;
    }

    const data = this.COMPATIBILITY[bloodType];

    const donateStr = data.donateTo.join(', ');
    const receiveStr = data.receiveFrom.join(', ');

    const resultHtml = `
      <div><strong>${I18N.get('blood_your_type') || 'Your Blood Type'}:</strong> ${bloodType}</div>
      <div><strong>${I18N.get('blood_can_donate') || 'Can Donate To'}:</strong> ${donateStr}</div>
      <div><strong>${I18N.get('blood_can_receive') || 'Can Receive From'}:</strong> ${receiveStr}</div>
    `;

    App.showResult('bloodResult', I18N.get('result'), resultHtml);

    App.showFormulaRef('bloodFormula',
      'ABO System: A has A-antigens, B has B-antigens, AB has both, O has none | Rh+: D-antigen present, Rh-: absent',
      'The ABO blood group system was discovered by Austrian physician Karl Landsteiner in 1901, earning him the 1930 Nobel Prize in Physiology or Medicine. The system classifies blood based on the presence or absence of two antigens (A and B) on the surface of red blood cells. Type A blood has A-antigens and anti-B antibodies in plasma; Type B has B-antigens and anti-A antibodies; Type AB has both antigens and no antibodies (universal recipient); Type O has no antigens and both antibodies (universal donor for red blood cells). The Rh (Rhesus) factor, discovered by Landsteiner and Alexander Wiener in 1937, adds another layer: Rh-positive individuals have the D-antigen on their red blood cells, while Rh-negative individuals do not and can develop anti-D antibodies if exposed to Rh-positive blood. This is critical in pregnancy: an Rh-negative mother carrying an Rh-positive fetus may develop antibodies that attack subsequent Rh-positive fetuses (hemolytic disease of the newborn), preventable with RhoGAM injections. Compatibility rules: a recipient\'s antibodies must not react with the donor\'s antigens, otherwise agglutination (clumping) and hemolysis occur, which can be fatal. O- red blood cells can be given to anyone (no A, B, or D antigens), while AB+ plasma can be given to anyone (no anti-A, anti-B, or anti-D antibodies).'
    );
  }
};


// ──────────────────────────────────────────────
// 4. Body Mass Index (BMI)
// ──────────────────────────────────────────────

const BioBMI = {
  init() {
    const calcBtn = document.getElementById('calcBmiBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearBmiBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
  },

  calculate() {
    const weight = parseFloat(document.getElementById('bmiWeight')?.value);
    const heightCm = parseFloat(document.getElementById('bmiHeight')?.value);

    if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
      App.showResult('bmiResult', I18N.get('result'),
        I18N.get('bmi_fill_valid') || 'Enter valid weight (kg) and height (cm). Both must be positive.');
      return;
    }

    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);

    let category = '';
    if (bmi < 18.5) {
      category = I18N.get('bmi_underweight') || 'Underweight';
    } else if (bmi < 25) {
      category = I18N.get('bmi_normal') || 'Normal weight';
    } else if (bmi < 30) {
      category = I18N.get('bmi_overweight') || 'Overweight';
    } else {
      category = I18N.get('bmi_obese') || 'Obese';
    }

    App.showResult('bmiResult', I18N.get('result'),
      `BMI = ${bmi.toFixed(2)} kg/m² | ${I18N.get('bmi_category') || 'Category'}: ${category}`);

    App.showFormulaRef('bmiFormula',
      'BMI = weight (kg) / [height (m)]² | Underweight: <18.5 | Normal: 18.5-24.9 | Overweight: 25-29.9 | Obese: ≥30',
      'The Body Mass Index (BMI) was devised by Belgian mathematician Adolphe Quetelet between 1830 and 1850 as part of his work on "social physics," and was originally called the Quetelet Index. The formula BMI = weight/height² provides a simple numeric measure of a person\'s weight relative to their height, allowing health professionals to quickly classify individuals into weight categories. The World Health Organization (WHO) adopted BMI as the standard for assessing overweight and obesity in the 1990s, using the thresholds: Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), and Obese (≥30). BMI is useful as a population-level screening tool because it is easy to measure and correlates with health risks: higher BMI is associated with increased risk of cardiovascular disease, type 2 diabetes, certain cancers, and musculoskeletal disorders. However, BMI has important limitations: (1) it does not distinguish between muscle mass and fat mass — athletes may have high BMI due to muscle; (2) it does not account for fat distribution — visceral fat (abdominal) is more dangerous than subcutaneous fat; (3) the thresholds were primarily validated on European populations and may not apply equally to all ethnicities (e.g., Asian populations have higher disease risk at lower BMI); (4) it does not account for age, sex, or bone structure. For a more complete assessment, waist circumference, body fat percentage, and metabolic markers should be considered alongside BMI.'
    );
  },

  clear() {
    App.clearInputs('#bmiCalc');
    document.getElementById('bmiResult').innerHTML = '';
    document.getElementById('bmiFormula').innerHTML = '';
  }
};
