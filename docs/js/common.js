(() => {
  const header = document.getElementById('siteHeader');
  if (header) {
    const updateHeader = () => {
      const scrolled = window.scrollY > 30;
      header.classList.toggle('scrolled', scrolled);
    };
    updateHeader();
    window.addEventListener('scroll', () => {
      window.requestAnimationFrame(updateHeader);
    }, { passive: true });
  }

  const toggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('is-open', 'open');
      nav.querySelectorAll('.nav-dropdown').forEach((item) => item.classList.remove('submenu-open'));
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', '打开导航菜单');
    };

    const isMobile = () => window.innerWidth <= 768;

    nav.querySelectorAll('.nav-dropdown > a').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (!isMobile()) return;
        const parent = link.parentElement;
        const submenu = parent.querySelector('.nav-dropdown-menu');
        if (!submenu || !submenu.children.length) {
          return;
        }

        event.preventDefault();
        const isOpen = parent.classList.contains('submenu-open');
        nav.querySelectorAll('.nav-dropdown').forEach((item) => {
          if (item !== parent) item.classList.remove('submenu-open');
        });
        parent.classList.toggle('submenu-open', !isOpen);
      });
    });

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', isOpen);
      nav.classList.toggle('open', isOpen);
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? '关闭导航菜单' : '打开导航菜单');
      if (!isOpen) {
        nav.querySelectorAll('.nav-dropdown').forEach((item) => item.classList.remove('submenu-open'));
      }
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !toggle.contains(event.target) && nav.classList.contains('is-open')) {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-tab]').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const content = JSON.parse(button.dataset.tab);
      document.querySelector('[data-tab-number]').textContent = content.number;
      document.querySelector('[data-tab-title]').textContent = content.title;
      document.querySelector('[data-tab-description]').textContent = content.description;
    });
  });
  const form = document.querySelector('.form');
  const status = document.querySelector('.form-status');
  if (form && status) form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = 'Thank you. Your inquiry has been received.';
    form.reset();
  });
})();
