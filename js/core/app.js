/* ============================================
   SCHEMATICA — Main App Controller
   Router, Navigation, and Page Management
   ============================================ */

const App = {
  _currentPage: 'home',
  _pages: {},
  _sidebarOpen: false,

  init() {
    I18N.init();
    this.cacheDom();
    this.bindEvents();
    this.renderPeriodicTable();
    this.handleRoute();
    this.updateLanguageUI();
    this.initScrollTop();

    // Register language change listener
    I18N.onLanguageChange(() => {
      this.updateAllTexts();
      this.updateLanguageUI();
    });

    // Handle browser back/forward
    window.addEventListener('hashchange', () => this.handleRoute());

    // Mobile language switcher visibility
    this._updateMobileLangVisibility();
    window.addEventListener('resize', () => this._updateMobileLangVisibility());
  },

  _updateMobileLangVisibility() {
    const mobileLangEls = document.querySelectorAll('.mobile-lang');
    const isMobile = window.innerWidth <= 768;
    mobileLangEls.forEach(el => {
      el.style.display = isMobile ? 'flex' : 'none';
    });
  },

  cacheDom() {
    this.dom = {
      sidebar: document.getElementById('sidebar'),
      overlay: document.getElementById('overlay'),
      menuToggle: document.getElementById('menuToggle'),
      content: document.getElementById('content'),
      scrollTopBtn: document.getElementById('scrollTop'),
      pages: document.querySelectorAll('.page'),
      sidebarLinks: document.querySelectorAll('.sidebar__link'),
      langBtns: document.querySelectorAll('.lang-btn'),
    };
  },

  bindEvents() {
    // Mobile menu toggle
    this.dom.menuToggle.addEventListener('click', () => this.toggleSidebar());
    this.dom.overlay.addEventListener('click', () => this.closeSidebar());

    // Sidebar navigation
    this.dom.sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        this.navigate(page);
        this.closeSidebar();
      });
    });

    // Language buttons (header + mobile sidebar)
    this.dom.langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        I18N.setLanguage(btn.dataset.lang);
      });
    });
    document.querySelectorAll('.mobile-lang .lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        I18N.setLanguage(btn.dataset.lang);
      });
    });

    // Tool cards on home page
    document.querySelectorAll('.tool-card[data-page]').forEach(card => {
      card.addEventListener('click', () => {
        this.navigate(card.dataset.page);
      });
    });

    // Scroll to top
    this.dom.scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }
  },

  navigate(page) {
    window.location.hash = page;
  },

  handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'home';
    this.showPage(hash);
  },

  showPage(pageId) {
    this._currentPage = pageId;

    // Hide all pages
    this.dom.pages.forEach(p => p.classList.remove('active'));

    // Show target page
    const target = document.getElementById(`page-${pageId}`);
    if (target) {
      target.classList.add('active');
    } else {
      // Default to home
      document.getElementById('page-home').classList.add('active');
      this._currentPage = 'home';
    }

    // Update sidebar active state
    this.dom.sidebarLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.page === this._currentPage);
    });

    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Initialize page-specific logic
    if (this._pages[pageId] && this._pages[pageId].init) {
      this._pages[pageId].init();
    }
  },

  registerPage(id, pageObj) {
    this._pages[id] = pageObj;
  },

  toggleSidebar() {
    this._sidebarOpen = !this._sidebarOpen;
    this.dom.sidebar.classList.toggle('open', this._sidebarOpen);
    this.dom.overlay.classList.toggle('active', this._sidebarOpen);
  },

  closeSidebar() {
    this._sidebarOpen = false;
    this.dom.sidebar.classList.remove('open');
    this.dom.overlay.classList.remove('active');
  },

  updateLanguageUI() {
    const lang = I18N.getLanguage();
    this.dom.langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    document.querySelectorAll('.mobile-lang .lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    this.updateAllTexts();
  },

  updateAllTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const text = I18N.get(key);
      if (el.tagName === 'INPUT' && el.type !== 'submit') {
        el.placeholder = text;
      } else if (el.dataset.i18nHtml) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });
  },

  handleSearch(query) {
    const q = query.toLowerCase().trim();
    const links = document.querySelectorAll('.sidebar__link');
    links.forEach(link => {
      const text = link.textContent.toLowerCase();
      link.style.display = (!q || text.includes(q)) ? 'flex' : 'none';
    });
  },

  renderPeriodicTable() {
    const container = document.getElementById('periodicTableGrid');
    if (!container) return;

    // Create 7 rows x 18 cols grid
    const grid = new Array(7 * 18).fill(null);

    PERIODIC_TABLE.forEach(el => {
      let row = el.per - 1;
      let col = el.grp - 1;

      // Lanthanides and Actinides: place them in rows 8-9 (special rows)
      if (el.cat === 'lanthanide') {
        row = 8;
        col = 2 + (el.z - 57);
      } else if (el.cat === 'actinide') {
        row = 9;
        col = 2 + (el.z - 89);
      }

      if (row < 10 && col < 18) {
        grid[row * 18 + col] = el;
      }
    });

    container.innerHTML = '';
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 18; col++) {
        const el = grid[row * 18 + col];
        if (el) {
          const div = document.createElement('div');
          div.className = `pt-element pt-${el.cat}`;
          div.innerHTML = `
            <span class="pt-element__number">${el.z}</span>
            <span class="pt-element__symbol">${el.sym}</span>
            <span class="pt-element__mass">${el.mass.toFixed(el.mass < 10 ? 3 : 2)}</span>
          `;
          div.title = `${el.name} (${el.sym}) - ${el.mass}`;
          div.addEventListener('click', () => {
            App.showElementInfo(el);
          });
          container.appendChild(div);
        } else {
          const empty = document.createElement('div');
          empty.className = 'pt-element';
          empty.style.visibility = 'hidden';
          container.appendChild(empty);
        }
      }
    }
  },

  showElementInfo(el) {
    const modal = document.getElementById('elementModal');
    const content = document.getElementById('elementModalContent');
    content.innerHTML = `
      <div class="card card--chemistry">
        <div class="flex justify-between items-center mb-4">
          <span class="tag tag--chemistry">${el.cat}</span>
          <button class="btn btn--sm" onclick="document.getElementById('elementModal').classList.add('hidden');document.getElementById('elementModal').style.display='';">X</button>
        </div>
        <div class="text-center mb-4">
          <div style="font-size:3rem;font-family:var(--font-heading);font-weight:700;">${el.sym}</div>
          <div style="font-size:var(--fs-lg);">${el.name}</div>
          <div style="color:var(--clr-muted);">Z = ${el.z}</div>
        </div>
        <hr class="divider">
        <div class="flex justify-between">
          <div><strong>${I18N.get('molar_mass_result')}:</strong> ${el.mass} g/mol</div>
          <div><strong>Group:</strong> ${el.grp}</div>
        </div>
        <div class="flex justify-between mt-2">
          <div><strong>Period:</strong> ${el.per}</div>
        </div>
      </div>
    `;
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  },

  initScrollTop() {
    window.addEventListener('scroll', () => {
      this.dom.scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
    });
  },

  // Utility: show result in a result box
  showResult(containerId, label, value) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `
        <div class="result-box">
          <div class="result-label">${label}</div>
          <div class="result-value">${value}</div>
        </div>
      `;
    }
  },

  // Utility: show formula reference
  showFormulaRef(containerId, formula, explanation) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `
        <div class="formula-ref">
          <div class="formula-ref__title">${I18N.get('formula_source')}</div>
          <div class="formula-ref__formula">${formula}</div>
          <div class="formula-ref__explanation"><strong>${I18N.get('why_this')}</strong> ${explanation}</div>
        </div>
      `;
    }
  },

  // Utility: clear inputs
  clearInputs(containerSelector) {
    document.querySelectorAll(`${containerSelector} .input-field`).forEach(input => {
      input.value = '';
    });
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
