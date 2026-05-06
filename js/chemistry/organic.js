/* ============================================
   SCHEMATICA — Chemistry: Organic & Acid/Base
   ============================================ */

const ChemistryOrganic = {
  functionalGroups: [
    { name: 'Alcohol', prefix: 'hydroxy', suffix: '-ol', formula: 'R-OH', example: 'Ethanol (CH3CH2OH)' },
    { name: 'Aldehyde', prefix: 'oxo', suffix: '-al', formula: 'R-CHO', example: 'Ethanal (CH3CHO)' },
    { name: 'Ketone', prefix: 'oxo', suffix: '-one', formula: 'R-CO-R', example: 'Propanone (CH3COCH3)' },
    { name: 'Carboxylic Acid', prefix: 'carboxy', suffix: '-oic acid', formula: 'R-COOH', example: 'Ethanoic acid (CH3COOH)' },
    { name: 'Ester', prefix: 'alkoxycarbonyl', suffix: '-oate', formula: 'R-COO-R', example: 'Ethyl ethanoate (CH3COOCH2CH3)' },
    { name: 'Ether', prefix: 'alkoxy', suffix: '-ether', formula: 'R-O-R', example: 'Diethyl ether (CH3CH2OCH2CH3)' },
    { name: 'Amine', prefix: 'amino', suffix: '-amine', formula: 'R-NH2', example: 'Methylamine (CH3NH2)' },
    { name: 'Amide', prefix: 'carbamoyl', suffix: '-amide', formula: 'R-CONH2', example: 'Ethanamide (CH3CONH2)' },
    { name: 'Alkene', prefix: 'alkenyl', suffix: '-ene', formula: 'C=C', example: 'Ethene (CH2=CH2)' },
    { name: 'Alkyne', prefix: 'alkynyl', suffix: '-yne', formula: 'C=C (triple)', example: 'Ethyne (CH=CH)' },
    { name: 'Halide', prefix: 'halo', suffix: '-halide', formula: 'R-X', example: 'Chloromethane (CH3Cl)' },
    { name: 'Nitro', prefix: 'nitro', suffix: '-nitro', formula: 'R-NO2', example: 'Nitrobenzene (C6H5NO2)' },
    { name: 'Thiol', prefix: 'mercapto', suffix: '-thiol', formula: 'R-SH', example: 'Ethanethiol (CH3CH2SH)' },
  ],

  init() {
    this.renderFunctionalGroups();
  },

  renderFunctionalGroups() {
    const container = document.getElementById('functionalGroupsList');
    if (!container) return;

    container.innerHTML = this.functionalGroups.map(fg => `
      <div class="card card--chemistry mb-4">
        <div class="flex justify-between items-center mb-2">
          <strong class="font-heading" style="font-size:var(--fs-md);">${fg.name}</strong>
          <span class="tag tag--chemistry">${fg.suffix}</span>
        </div>
        <div class="font-mono text-sm mb-2" style="color:var(--clr-secondary);font-weight:700;">${fg.formula}</div>
        <div class="text-sm text-muted">Prefix: <strong>${fg.prefix}</strong> | Suffix: <strong>${fg.suffix}</strong></div>
        <div class="text-sm mt-2">${fg.example}</div>
      </div>
    `).join('');
  }
};

const ChemistryAcidBase = {
  strongAcids: [
    { name: 'Hydrochloric acid', formula: 'HCl' },
    { name: 'Sulfuric acid', formula: 'H2SO4' },
    { name: 'Nitric acid', formula: 'HNO3' },
    { name: 'Hydrobromic acid', formula: 'HBr' },
    { name: 'Hydroiodic acid', formula: 'HI' },
    { name: 'Perchloric acid', formula: 'HClO4' },
    { name: 'Chloric acid', formula: 'HClO3' },
  ],
  strongBases: [
    { name: 'Sodium hydroxide', formula: 'NaOH' },
    { name: 'Potassium hydroxide', formula: 'KOH' },
    { name: 'Calcium hydroxide', formula: 'Ca(OH)2' },
    { name: 'Barium hydroxide', formula: 'Ba(OH)2' },
    { name: 'Lithium hydroxide', formula: 'LiOH' },
    { name: 'Strontium hydroxide', formula: 'Sr(OH)2' },
  ],

  init() {
    this.renderAcidBaseRef();
  },

  renderAcidBaseRef() {
    const container = document.getElementById('acidBaseRef');
    if (!container) return;

    container.innerHTML = `
      <div class="calc-grid">
        <div>
          <h4 class="font-heading text-uppercase mb-4" style="color:var(--clr-secondary);">Strong Acids</h4>
          ${this.strongAcids.map(a => `
            <div class="card card--chemistry mb-2" style="padding:0.5rem 1rem;">
              <strong class="font-mono">${a.formula}</strong> — ${a.name}
            </div>
          `).join('')}
        </div>
        <div>
          <h4 class="font-heading text-uppercase mb-4" style="color:var(--clr-tertiary);">Strong Bases</h4>
          ${this.strongBases.map(b => `
            <div class="card card--chemistry mb-2" style="padding:0.5rem 1rem;">
              <strong class="font-mono">${b.formula}</strong> — ${b.name}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
};
