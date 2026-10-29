function initNavHighlight() {
  const path = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';

  document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((link) => {
    const href = link.getAttribute('href') ?? '';
    const linkPath = href.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
    let isActive = false;

    if (linkPath === '/') {
      isActive = path === '/';
    } else {
      isActive = path === linkPath || path.startsWith(`${linkPath}/`);
    }

    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function initInPageScroll() {
  document.querySelectorAll<HTMLElement>('[data-scroll-target]').forEach((el) => {
    el.addEventListener('click', (event) => {
      const id = el.getAttribute('data-scroll-target');
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      const deferredSection = target.closest<HTMLElement>('[data-deferred-section]');
      deferredSection?.classList.add('is-rendered');
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  });
}

function initSkipLink() {
  document.querySelectorAll<HTMLElement>('[data-skip-to-main]').forEach((button) => {
    button.addEventListener('click', () => {
      const main = document.getElementById('main-content');
      if (!main) return;

      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: false });
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initFaqFilters() {
  document.querySelectorAll('[data-faq-filters]').forEach((container) => {
    const section = container.closest('[data-faq-section]');
    const list = section?.querySelector('[data-faq-list]');
    if (!list) return;

    const items = list.querySelectorAll<HTMLElement>('[data-faq-topic]');
    const chips = container.querySelectorAll<HTMLButtonElement>('[data-faq-filter]');

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const topic = chip.getAttribute('data-faq-filter');
        chips.forEach((c) => c.classList.toggle('is-active', c === chip));
        items.forEach((item) => {
          const itemTopic = item.getAttribute('data-faq-topic');
          const show = topic === 'all' || itemTopic === topic;
          item.toggleAttribute('data-hidden', !show);
        });
      });
    });
  });
}

function initThemeMetaColor() {
  const metaTheme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!metaTheme) return;

  const update = () => {
    metaTheme.content = document.documentElement.classList.contains('dark') ? '#2d6ee2' : '#f5f7fa';
  };

  update();
  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}

function initThemeSwitches() {
  const root = document.documentElement;
  const switches = document.querySelectorAll<HTMLInputElement>('[data-sw-theme-control]');
  if (!switches.length) return;

  const applyTheme = (theme: 'light' | 'dark', persist = false) => {
    root.classList.toggle('dark', theme === 'dark');
    switches.forEach((control) => {
      control.checked = theme === 'dark';
    });
    if (persist) {
      try {
        localStorage.setItem('colorTheme', theme);
      } catch {}
    }
  };

  const readTheme = () => {
    try {
      return localStorage.getItem('colorTheme') || localStorage.getItem('starwind-theme');
    } catch {
      return null;
    }
  };

  applyTheme(readTheme() === 'light' ? 'light' : 'dark');
  switches.forEach((control) => {
    control.addEventListener('change', () => applyTheme(control.checked ? 'dark' : 'light', true));
  });

  window.addEventListener('storage', (event) => {
    if (event.key === 'colorTheme' || event.key === 'starwind-theme') {
      applyTheme(event.newValue === 'light' ? 'light' : 'dark');
    }
  });
}

function initMobileNavigation() {
  document.querySelectorAll<HTMLDetailsElement>('[data-mobile-nav]').forEach((menu) => {
    if (menu.dataset.initialized === 'true') return;
    menu.dataset.initialized = 'true';
    const trigger = menu.querySelector<HTMLElement>('.mobile-nav__trigger');
    const closeButton = menu.querySelector<HTMLElement>('[data-mobile-nav-close]');
    const backdrop = menu.querySelector<HTMLElement>('[data-mobile-nav-backdrop]');
    const close = () => {
      menu.open = false;
      trigger?.focus();
    };
    closeButton?.addEventListener('click', close);
    backdrop?.addEventListener('click', close);
    menu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.open) close();
    });
  });
}

function initDeferredSections() {
  const hero = document.getElementById('hero');
  if (!hero || document.documentElement.dataset.deferredSectionsReady === 'true') return;
  document.documentElement.dataset.deferredSectionsReady = 'true';

  const sections = document.querySelectorAll<HTMLElement>('[data-deferred-section]');
  const reveal = (section: HTMLElement) => section.classList.add('is-rendered');

  if (!('IntersectionObserver' in window)) {
    sections.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -80% 0px', threshold: 0.01 },
  );
  sections.forEach((section) => observer.observe(section));
}

function initCheckoutTracking() {
  document.querySelectorAll<HTMLAnchorElement>('a[href*="levocheats.com/go/"]').forEach((link) => {
    if (link.dataset.checkoutTrackingBound === 'true') return;
    link.dataset.checkoutTrackingBound = 'true';

    link.addEventListener('click', () => {
      const panel = link.closest<HTMLElement>('[data-product-checkout]');
      const trackedWindow = window as Window & { dataLayer?: Record<string, unknown>[] };
      trackedWindow.dataLayer = trackedWindow.dataLayer ?? [];

      let checkoutDestination = 'levocheats.com';
      try {
        checkoutDestination = new URL(link.href).hostname;
      } catch {}

      trackedWindow.dataLayer.push({
        event: 'checkout_click',
        product_slug: panel?.dataset.productSlug ?? 'rust',
        plan_id: panel?.dataset.selectedPlan ?? 'default',
        page_path: window.location.pathname,
        checkout_destination: checkoutDestination,
      });
    });
  });
}

function bootSite() {
  initDeferredSections();
  initFaqFilters();
  initNavHighlight();
  initInPageScroll();
  initSkipLink();
  initThemeMetaColor();
  initThemeSwitches();
  initMobileNavigation();
  initCheckoutTracking();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootSite);
} else {
  bootSite();
}
