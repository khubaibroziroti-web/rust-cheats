/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Buy Undetected Rust Cheat | Aimbot, ESP & Wallhack',
    description:
      'Buy undetected Rust cheats for PC — aimbot, ESP, wallhack, radar, loot ESP and skin changer. Updated after every Easy Anti-Cheat patch.',
  },
  '/products/rust-cheats/': {
    title: 'Buy Rust Cheat | Elite, HWID Spoofer & Skin Changer',
    description:
      'Shop Rust cheats for PC: Elite aimbot & ESP wallhack, HWID spoofer, UGC recovery and Skin Changer. Instant delivery after checkout.',
  },
  '/products/rust-cheats/elite/': {
    title: 'Buy Rust Elite Cheats | Aimbot, ESP & Loot Assist',
    description:
      'Buy Rust Elite cheats with aimbot, ESP wallhack, loot assist, Auto Finish, Skin Changer and priority EAC patch updates.',
  },
  '/products/rust-cheats/hwid-spoofer/': {
    title: 'Buy Rust HWID Spoofer | Hardware Ban Bypass',
    description:
      'Buy a Rust HWID spoofer for PC hardware bans — disk/MAC tools, compatibility scan and post-spoof checks before you launch cheats again.',
  },
  '/products/rust-cheats/ugc/': {
    title: 'Buy Rust UGC | EAC & game platform Ban Appeal Tools',
    description:
      'Buy Rust UGC (Unban & Governance Control) to organize game platform and EAC ban appeals, dispute workflows and case tracking.',
  },
  '/products/rust-cheats/unlock-all/': {
    title: 'Buy Rust Skin Changer | Unlock All Cosmetics',
    description:
      'Buy Rust Skin Changer / Unlock All — local outfit, wrap and pickaxe previews with your Rust cheats loadout.',
  },
  '/products/rust-cheats/utilities/': {
    title: 'Buy Rust Cheat Utilities | HWID, UGC & Skin Changer',
    description:
      'Buy Rust cheat utilities: HWID spoofer after hardware bans, UGC for game platform/EAC appeals, and local Skin Changer / Unlock All.',
  },
  '/blog/': {
    title: 'Rust Cheat Guides | Aimbot, ESP Wallhack & EAC',
    description:
      'Read Rust cheat guides on aimbot setup, ESP wallhack, Lite vs Pro, Creative practice and Easy Anti-Cheat patch-day checks.',
  },
  '/forum/': {
    title: 'Rust Cheat Forum | Aimbot, ESP & Setup Help',
    description:
      'Rust cheats forum for aimbot configs, ESP wallhack setup, EAC status and product questions before you buy.',
  },
  '/faq/': {
    title: 'Rust Cheat FAQ | Aimbot, ESP, Bans & Setup',
    description:
      'Rust cheats FAQ — tiers, aimbot, ESP wallhack, radar, HWID spoofer, Skin Changer, bans and loader setup before checkout.',
  },
  '/terms/': {
    title: 'Terms for Rust Cheat | License & Refunds',
    description:
      'Terms for buying Rust cheats on getrustcheat.com — license use, delivery, refunds and account risk.',
  },
  '/privacy/': {
    title: 'Privacy Policy | Rust Cheat Shop',
    description:
      'How the Rust cheats shop at getrustcheat.com uses analytics, cookies and contact data.',
  },
  '/affiliate-disclosure/': {
    title: 'Affiliate Disclosure | Rust Cheat Shop',
    description:
      'Learn how affiliate checkout links work on getrustcheat.com and how purchases may support this website.',
  },
  '/about/': {
    title: 'About Rust Cheat | Buy PC Aimbot & ESP',
    description:
      'About Rust Cheat — we sell PC Rust cheats (aimbot, ESP, wallhack), guides and utilities at getrustcheat.com.',
  },
  '/support/': {
    title: 'Rust Cheat Support | Loader, HWID & Checkout',
    description:
      'Rust cheats support for loader setup, aimbot/ESP configs, HWID spoofing and checkout help — 24/7 support team.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
