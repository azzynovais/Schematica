/* ============================================
   SCHEMATICA — Periodic Table Data
   ============================================ */

const PERIODIC_TABLE = [
  { z:1,  sym:'H',  name:'Hydrogen',   mass:1.008,    cat:'nonmetal',      grp:1,  per:1 },
  { z:2,  sym:'He', name:'Helium',     mass:4.003,    cat:'noble',         grp:18, per:1 },
  { z:3,  sym:'Li', name:'Lithium',    mass:6.941,    cat:'alkali',        grp:1,  per:2 },
  { z:4,  sym:'Be', name:'Beryllium',  mass:9.012,    cat:'alkaline',      grp:2,  per:2 },
  { z:5,  sym:'B',  name:'Boron',      mass:10.81,    cat:'metalloid',     grp:13, per:2 },
  { z:6,  sym:'C',  name:'Carbon',     mass:12.011,   cat:'nonmetal',      grp:14, per:2 },
  { z:7,  sym:'N',  name:'Nitrogen',   mass:14.007,   cat:'nonmetal',      grp:15, per:2 },
  { z:8,  sym:'O',  name:'Oxygen',     mass:15.999,   cat:'nonmetal',      grp:16, per:2 },
  { z:9,  sym:'F',  name:'Fluorine',   mass:18.998,   cat:'halogen',       grp:17, per:2 },
  { z:10, sym:'Ne', name:'Neon',       mass:20.180,   cat:'noble',         grp:18, per:2 },
  { z:11, sym:'Na', name:'Sodium',     mass:22.990,   cat:'alkali',        grp:1,  per:3 },
  { z:12, sym:'Mg', name:'Magnesium',  mass:24.305,   cat:'alkaline',      grp:2,  per:3 },
  { z:13, sym:'Al', name:'Aluminum',   mass:26.982,   cat:'post-transition',grp:13, per:3 },
  { z:14, sym:'Si', name:'Silicon',    mass:28.086,   cat:'metalloid',     grp:14, per:3 },
  { z:15, sym:'P',  name:'Phosphorus', mass:30.974,   cat:'nonmetal',      grp:15, per:3 },
  { z:16, sym:'S',  name:'Sulfur',     mass:32.065,   cat:'nonmetal',      grp:16, per:3 },
  { z:17, sym:'Cl', name:'Chlorine',   mass:35.453,   cat:'halogen',       grp:17, per:3 },
  { z:18, sym:'Ar', name:'Argon',      mass:39.948,   cat:'noble',         grp:18, per:3 },
  { z:19, sym:'K',  name:'Potassium',  mass:39.098,   cat:'alkali',        grp:1,  per:4 },
  { z:20, sym:'Ca', name:'Calcium',    mass:40.078,   cat:'alkaline',      grp:2,  per:4 },
  { z:21, sym:'Sc', name:'Scandium',   mass:44.956,   cat:'transition',    grp:3,  per:4 },
  { z:22, sym:'Ti', name:'Titanium',   mass:47.867,   cat:'transition',    grp:4,  per:4 },
  { z:23, sym:'V',  name:'Vanadium',   mass:50.942,   cat:'transition',    grp:5,  per:4 },
  { z:24, sym:'Cr', name:'Chromium',   mass:51.996,   cat:'transition',    grp:6,  per:4 },
  { z:25, sym:'Mn', name:'Manganese',  mass:54.938,   cat:'transition',    grp:7,  per:4 },
  { z:26, sym:'Fe', name:'Iron',       mass:55.845,   cat:'transition',    grp:8,  per:4 },
  { z:27, sym:'Co', name:'Cobalt',     mass:58.933,   cat:'transition',    grp:9,  per:4 },
  { z:28, sym:'Ni', name:'Nickel',     mass:58.693,   cat:'transition',    grp:10, per:4 },
  { z:29, sym:'Cu', name:'Copper',     mass:63.546,   cat:'transition',    grp:11, per:4 },
  { z:30, sym:'Zn', name:'Zinc',       mass:65.38,    cat:'transition',    grp:12, per:4 },
  { z:31, sym:'Ga', name:'Gallium',    mass:69.723,   cat:'post-transition',grp:13, per:4 },
  { z:32, sym:'Ge', name:'Germanium',  mass:72.630,   cat:'metalloid',     grp:14, per:4 },
  { z:33, sym:'As', name:'Arsenic',    mass:74.922,   cat:'metalloid',     grp:15, per:4 },
  { z:34, sym:'Se', name:'Selenium',   mass:78.971,   cat:'nonmetal',      grp:16, per:4 },
  { z:35, sym:'Br', name:'Bromine',    mass:79.904,   cat:'halogen',       grp:17, per:4 },
  { z:36, sym:'Kr', name:'Krypton',    mass:83.798,   cat:'noble',         grp:18, per:4 },
  { z:37, sym:'Rb', name:'Rubidium',   mass:85.468,   cat:'alkali',        grp:1,  per:5 },
  { z:38, sym:'Sr', name:'Strontium',  mass:87.62,    cat:'alkaline',      grp:2,  per:5 },
  { z:39, sym:'Y',  name:'Yttrium',    mass:88.906,   cat:'transition',    grp:3,  per:5 },
  { z:40, sym:'Zr', name:'Zirconium',  mass:91.224,   cat:'transition',    grp:4,  per:5 },
  { z:41, sym:'Nb', name:'Niobium',    mass:92.906,   cat:'transition',    grp:5,  per:5 },
  { z:42, sym:'Mo', name:'Molybdenum', mass:95.95,    cat:'transition',    grp:6,  per:5 },
  { z:43, sym:'Tc', name:'Technetium', mass:98.0,     cat:'transition',    grp:7,  per:5 },
  { z:44, sym:'Ru', name:'Ruthenium',  mass:101.07,   cat:'transition',    grp:8,  per:5 },
  { z:45, sym:'Rh', name:'Rhodium',    mass:102.91,   cat:'transition',    grp:9,  per:5 },
  { z:46, sym:'Pd', name:'Palladium',  mass:106.42,   cat:'transition',    grp:10, per:5 },
  { z:47, sym:'Ag', name:'Silver',     mass:107.87,   cat:'transition',    grp:11, per:5 },
  { z:48, sym:'Cd', name:'Cadmium',    mass:112.41,   cat:'transition',    grp:12, per:5 },
  { z:49, sym:'In', name:'Indium',     mass:114.82,   cat:'post-transition',grp:13, per:5 },
  { z:50, sym:'Sn', name:'Tin',        mass:118.71,   cat:'post-transition',grp:14, per:5 },
  { z:51, sym:'Sb', name:'Antimony',   mass:121.76,   cat:'metalloid',     grp:15, per:5 },
  { z:52, sym:'Te', name:'Tellurium',  mass:127.60,   cat:'metalloid',     grp:16, per:5 },
  { z:53, sym:'I',  name:'Iodine',     mass:126.90,   cat:'halogen',       grp:17, per:5 },
  { z:54, sym:'Xe', name:'Xenon',      mass:131.29,   cat:'noble',         grp:18, per:5 },
  { z:55, sym:'Cs', name:'Cesium',     mass:132.91,   cat:'alkali',        grp:1,  per:6 },
  { z:56, sym:'Ba', name:'Barium',     mass:137.33,   cat:'alkaline',      grp:2,  per:6 },
  { z:57, sym:'La', name:'Lanthanum',  mass:138.91,   cat:'lanthanide',    grp:3,  per:6 },
  { z:58, sym:'Ce', name:'Cerium',     mass:140.12,   cat:'lanthanide',    grp:3,  per:6 },
  { z:59, sym:'Pr', name:'Praseodymium',mass:140.91,  cat:'lanthanide',    grp:3,  per:6 },
  { z:60, sym:'Nd', name:'Neodymium',  mass:144.24,   cat:'lanthanide',    grp:3,  per:6 },
  { z:61, sym:'Pm', name:'Promethium', mass:145.0,    cat:'lanthanide',    grp:3,  per:6 },
  { z:62, sym:'Sm', name:'Samarium',   mass:150.36,   cat:'lanthanide',    grp:3,  per:6 },
  { z:63, sym:'Eu', name:'Europium',   mass:151.96,   cat:'lanthanide',    grp:3,  per:6 },
  { z:64, sym:'Gd', name:'Gadolinium', mass:157.25,   cat:'lanthanide',    grp:3,  per:6 },
  { z:65, sym:'Tb', name:'Terbium',    mass:158.93,   cat:'lanthanide',    grp:3,  per:6 },
  { z:66, sym:'Dy', name:'Dysprosium', mass:162.50,   cat:'lanthanide',    grp:3,  per:6 },
  { z:67, sym:'Ho', name:'Holmium',    mass:164.93,   cat:'lanthanide',    grp:3,  per:6 },
  { z:68, sym:'Er', name:'Erbium',     mass:167.26,   cat:'lanthanide',    grp:3,  per:6 },
  { z:69, sym:'Tm', name:'Thulium',    mass:168.93,   cat:'lanthanide',    grp:3,  per:6 },
  { z:70, sym:'Yb', name:'Ytterbium',  mass:173.05,   cat:'lanthanide',    grp:3,  per:6 },
  { z:71, sym:'Lu', name:'Lutetium',   mass:174.97,   cat:'lanthanide',    grp:3,  per:6 },
  { z:72, sym:'Hf', name:'Hafnium',    mass:178.49,   cat:'transition',    grp:4,  per:6 },
  { z:73, sym:'Ta', name:'Tantalum',   mass:180.95,   cat:'transition',    grp:5,  per:6 },
  { z:74, sym:'W',  name:'Tungsten',   mass:183.84,   cat:'transition',    grp:6,  per:6 },
  { z:75, sym:'Re', name:'Rhenium',    mass:186.21,   cat:'transition',    grp:7,  per:6 },
  { z:76, sym:'Os', name:'Osmium',     mass:190.23,   cat:'transition',    grp:8,  per:6 },
  { z:77, sym:'Ir', name:'Iridium',    mass:192.22,   cat:'transition',    grp:9,  per:6 },
  { z:78, sym:'Pt', name:'Platinum',   mass:195.08,   cat:'transition',    grp:10, per:6 },
  { z:79, sym:'Au', name:'Gold',       mass:196.97,   cat:'transition',    grp:11, per:6 },
  { z:80, sym:'Hg', name:'Mercury',    mass:200.59,   cat:'transition',    grp:12, per:6 },
  { z:81, sym:'Tl', name:'Thallium',   mass:204.38,   cat:'post-transition',grp:13, per:6 },
  { z:82, sym:'Pb', name:'Lead',       mass:207.2,    cat:'post-transition',grp:14, per:6 },
  { z:83, sym:'Bi', name:'Bismuth',    mass:208.98,   cat:'post-transition',grp:15, per:6 },
  { z:84, sym:'Po', name:'Polonium',   mass:209.0,    cat:'post-transition',grp:16, per:6 },
  { z:85, sym:'At', name:'Astatine',   mass:210.0,    cat:'halogen',       grp:17, per:6 },
  { z:86, sym:'Rn', name:'Radon',      mass:222.0,    cat:'noble',         grp:18, per:6 },
  { z:87, sym:'Fr', name:'Francium',   mass:223.0,    cat:'alkali',        grp:1,  per:7 },
  { z:88, sym:'Ra', name:'Radium',     mass:226.0,    cat:'alkaline',      grp:2,  per:7 },
  { z:89, sym:'Ac', name:'Actinium',   mass:227.0,    cat:'actinide',      grp:3,  per:7 },
  { z:90, sym:'Th', name:'Thorium',    mass:232.04,   cat:'actinide',      grp:3,  per:7 },
  { z:91, sym:'Pa', name:'Protactinium',mass:231.04,  cat:'actinide',      grp:3,  per:7 },
  { z:92, sym:'U',  name:'Uranium',    mass:238.03,   cat:'actinide',      grp:3,  per:7 },
  { z:93, sym:'Np', name:'Neptunium',  mass:237.0,    cat:'actinide',      grp:3,  per:7 },
  { z:94, sym:'Pu', name:'Plutonium',  mass:244.0,    cat:'actinide',      grp:3,  per:7 },
  { z:95, sym:'Am', name:'Americium',  mass:243.0,    cat:'actinide',      grp:3,  per:7 },
  { z:96, sym:'Cm', name:'Curium',     mass:247.0,    cat:'actinide',      grp:3,  per:7 },
  { z:97, sym:'Bk', name:'Berkelium',  mass:247.0,    cat:'actinide',      grp:3,  per:7 },
  { z:98, sym:'Cf', name:'Californium',mass:251.0,    cat:'actinide',      grp:3,  per:7 },
  { z:99, sym:'Es', name:'Einsteinium',mass:252.0,    cat:'actinide',      grp:3,  per:7 },
  { z:100,sym:'Fm', name:'Fermium',    mass:257.0,    cat:'actinide',      grp:3,  per:7 },
  { z:101,sym:'Md', name:'Mendelevium',mass:258.0,    cat:'actinide',      grp:3,  per:7 },
  { z:102,sym:'No', name:'Nobelium',   mass:259.0,    cat:'actinide',      grp:3,  per:7 },
  { z:103,sym:'Lr', name:'Lawrencium', mass:266.0,    cat:'actinide',      grp:3,  per:7 },
  { z:104,sym:'Rf', name:'Rutherfordium',mass:267.0,  cat:'transition',    grp:4,  per:7 },
  { z:105,sym:'Db', name:'Dubnium',    mass:268.0,    cat:'transition',    grp:5,  per:7 },
  { z:106,sym:'Sg', name:'Seaborgium', mass:269.0,    cat:'transition',    grp:6,  per:7 },
  { z:107,sym:'Bh', name:'Bohrium',    mass:270.0,    cat:'transition',    grp:7,  per:7 },
  { z:108,sym:'Hs', name:'Hassium',    mass:277.0,    cat:'transition',    grp:8,  per:7 },
  { z:109,sym:'Mt', name:'Meitnerium', mass:278.0,    cat:'transition',    grp:9,  per:7 },
  { z:110,sym:'Ds', name:'Darmstadtium',mass:281.0,   cat:'transition',    grp:10, per:7 },
  { z:111,sym:'Rg', name:'Roentgenium',mass:282.0,    cat:'transition',    grp:11, per:7 },
  { z:112,sym:'Cn', name:'Copernicium',mass:285.0,    cat:'transition',    grp:12, per:7 },
  { z:113,sym:'Nh', name:'Nihonium',   mass:286.0,    cat:'post-transition',grp:13,per:7 },
  { z:114,sym:'Fl', name:'Flerovium',  mass:289.0,    cat:'post-transition',grp:14,per:7 },
  { z:115,sym:'Mc', name:'Moscovium',  mass:290.0,    cat:'post-transition',grp:15,per:7 },
  { z:116,sym:'Lv', name:'Livermorium',mass:293.0,    cat:'post-transition',grp:16,per:7 },
  { z:117,sym:'Ts', name:'Tennessine', mass:294.0,    cat:'halogen',       grp:17, per:7 },
  { z:118,sym:'Og', name:'Oganesson',  mass:294.0,    cat:'noble',         grp:18, per:7 },
];

// Lookup helpers
const ELEMENT_BY_SYMBOL = {};
PERIODIC_TABLE.forEach(el => {
  ELEMENT_BY_SYMBOL[el.sym] = el;
});

// Parse compound formula like "H2SO4" -> [{sym:'H', count:2}, {sym:'S', count:1}, {sym:'O', count:4}]
function parseCompound(formula) {
  const elements = [];
  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match;
  while ((match = regex.exec(formula)) !== null) {
    const sym = match[1];
    const count = match[2] ? parseInt(match[2]) : 1;
    if (!ELEMENT_BY_SYMBOL[sym]) {
      return { error: `Unknown element: ${sym}`, elements: [] };
    }
    elements.push({ sym, count });
  }
  if (elements.length === 0) {
    return { error: 'Invalid formula', elements: [] };
  }
  return { error: null, elements };
}

// Calculate molar mass from formula
function calcMolarMass(formula) {
  const { error, elements } = parseCompound(formula);
  if (error) return { error, mass: 0, breakdown: [] };
  let totalMass = 0;
  const breakdown = [];
  elements.forEach(({ sym, count }) => {
    const el = ELEMENT_BY_SYMBOL[sym];
    const contribution = el.mass * count;
    totalMass += contribution;
    breakdown.push({ sym, name: el.name, mass: el.mass, count, contribution });
  });
  return { error: null, mass: totalMass, breakdown };
}
