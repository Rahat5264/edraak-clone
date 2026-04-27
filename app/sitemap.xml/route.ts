import fs from 'fs';
import path from 'path';

const SITE_URL = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.edraaksystems.com').replace(/\/$/, '');
const APP_DIR = path.join(process.cwd(), 'app');
const DATA_DIR = path.join(process.cwd(), 'data');

function slugify(s: any) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function readJSONDataFiles() {
  const files: { file: string; full: string; content: any; mtime: string }[] = [];
  try {
    const entries = await fs.promises.readdir(DATA_DIR, { withFileTypes: true });
    for (const e of entries) {
      if (e.isFile() && e.name.endsWith('.json')) {
        const full = path.join(DATA_DIR, e.name);
        try {
          const raw = await fs.promises.readFile(full, 'utf8');
          const content = JSON.parse(raw);
          const stat = await fs.promises.stat(full);
          files.push({ file: e.name, full, content, mtime: stat.mtime.toISOString() });
        } catch (err) {
          // ignore parse/read errors
        }
      }
    }
  } catch (e) {
    // ignore
  }
  return files;
}

function traverseJSON(value: any, keyPath: string[], cb: (val: any, keyPath: string[]) => void) {
  cb(value, keyPath);
  if (Array.isArray(value)) {
    for (const item of value) traverseJSON(item, keyPath.concat(['[]']), cb);
    return;
  }
  if (value && typeof value === 'object') {
    for (const k of Object.keys(value)) traverseJSON(value[k], keyPath.concat([k]), cb);
  }
}

async function collectPages(dir: string) {
  const pages: { path: string; lastmod: string }[] = [];

  // load content.json products for validation of product pages
  let contentProducts: any[] = [];
  try {
    const contentFile = path.join(DATA_DIR, 'content.json');
    const raw = await fs.promises.readFile(contentFile, 'utf8');
    const cj = JSON.parse(raw);
    contentProducts = Array.isArray(cj.products) ? cj.products : [];
  } catch (e) {
    contentProducts = [];
  }

  // 1) collect static pages (non-dynamic)
  async function walk(current: string) {
    const entries = await fs.promises.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        // ignore route groups, api and common non-route folders
        if (
          entry.name.startsWith('(') ||
          entry.name.startsWith('.') ||
          entry.name === 'api' ||
          entry.name === 'components' ||
          entry.name === 'styles' ||
          entry.name === 'public' ||
          entry.name === 'node_modules' ||
          entry.name === 'scripts'
        ) {
          continue;
        }
        await walk(full);
      } else {
        if (/^page\.(tsx|ts|jsx|js)$/.test(entry.name)) {
          const rel = path.relative(APP_DIR, full);
          const dirOfFile = path.dirname(rel);
          // skip dynamic routes and route groups for static collection
          if (dirOfFile.split(path.sep).some(p => p.startsWith('[') || p.startsWith('('))) continue;

          let urlPath = '/';
          if (dirOfFile && dirOfFile !== '.') {
            const segs = dirOfFile.split(path.sep).filter(Boolean);
            urlPath = '/' + segs.join('/');
          }

          // If this is a static product page (e.g. app/products/<slug>/page.tsx),
          // validate that the product actually exists in data/content.json to avoid broken pages.
          const parts = dirOfFile.split(path.sep).filter(Boolean);
          if (parts[0] === 'products' && parts.length >= 2) {
            try {
              const src = await fs.promises.readFile(full, 'utf8');
              const m = src.match(/find\s*\(\s*[^\)]*p\s*=>\s*p\.title\s*===\s*['\"]([^'\"]+)['\"]\s*\)/);
              if (m && m[1]) {
                const expectedTitle = m[1];
                const exists = contentProducts.some(p => (p && (p.title || '').toString()) === expectedTitle);
                if (!exists) continue; // skip broken product page
              }
            } catch (e) {
              // if we can't read/parse, fall back to including the page
            }
          }

          const s = await fs.promises.stat(full);
          pages.push({ path: urlPath, lastmod: s.mtime.toISOString() });
        }
      }
    }
  }

  try {
    await walk(dir);
  } catch (e) {
    // if app dir not found or other fs errors, continue
  }

  // 2) discover dynamic route bases (directories like /products/[slug])
  const dynamicBases = new Set<string>();
  async function walkForDynamics(current: string) {
    const entries = await fs.promises.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (!entry.isDirectory()) continue;
      if (
        entry.name.startsWith('(') ||
        entry.name.startsWith('.') ||
        entry.name === 'api' ||
        entry.name === 'components' ||
        entry.name === 'styles' ||
        entry.name === 'public' ||
        entry.name === 'node_modules' ||
        entry.name === 'scripts'
      ) {
        continue;
      }
      if (entry.name.startsWith('[')) {
        const rel = path.relative(APP_DIR, current);
        const baseRoute = rel && rel !== '.' ? '/' + rel.split(path.sep).filter(Boolean).join('/') : '';
        dynamicBases.add(baseRoute || '/');
        // do not recurse into bracketed folder
        continue;
      }
      await walkForDynamics(full);
    }
  }

  try {
    await walkForDynamics(dir);
  } catch (e) {
    // ignore
  }

  // 3) read data files and try to enumerate slugs for each dynamic base
  const dataFiles = await readJSONDataFiles();
  for (const base of Array.from(dynamicBases)) {
    const baseName = base.startsWith('/') ? base.slice(1) : base;
    const normalizedBase = slugify(baseName || '');
    const slugs = new Set<string>();
    const slugMtime = new Map<string, string>();

    for (const df of dataFiles) {
      traverseJSON(df.content, [], (val, keyPath) => {
        if (!Array.isArray(val)) return;
        const keyName = keyPath.length ? String(keyPath[keyPath.length - 1]) : path.basename(df.file, '.json');
        const normKey = slugify(keyName);
        const fileBase = slugify(path.basename(df.file, '.json'));
        if (normKey === normalizedBase || fileBase === normalizedBase) {
          for (const item of val) {
            if (typeof item === 'string') {
              const s = slugify(item);
              if (s) { slugs.add(s); slugMtime.set(s, df.mtime); }
            } else if (item && typeof item === 'object') {
              let s: string | null = null;
              if (typeof item.slug === 'string') s = slugify(item.slug);
              else if (typeof item.title === 'string') s = slugify(item.title);
              else if (typeof item.name === 'string') s = slugify(item.name);
              if (s) { slugs.add(s); slugMtime.set(s, df.mtime); }
            }
          }
        }
      });
    }

    // fallback: loose matching when exact key not found (try to match parent keys or filenames)
    if (slugs.size === 0) {
      for (const df of dataFiles) {
        traverseJSON(df.content, [], (val, keyPath) => {
          if (!Array.isArray(val)) return;
          const keyPathStr = keyPath.join('.');
          if (!keyPathStr) return;
          if (slugify(keyPathStr).includes(normalizedBase) || slugify(df.file).includes(normalizedBase)) {
            for (const item of val) {
              if (typeof item === 'string') {
                const s = slugify(item);
                if (s) { slugs.add(s); slugMtime.set(s, df.mtime); }
              } else if (item && typeof item === 'object') {
                let s: string | null = null;
                if (typeof item.slug === 'string') s = slugify(item.slug);
                else if (typeof item.title === 'string') s = slugify(item.title);
                else if (typeof item.name === 'string') s = slugify(item.name);
                if (s) { slugs.add(s); slugMtime.set(s, df.mtime); }
              }
            }
          }
        });
      }
    }

    for (const s of slugs) {
      const urlPath = (base === '/' || base === '') ? `/${s}` : `${base}/${s}`;
      const lastmod = slugMtime.get(s) || new Date().toISOString();
      pages.push({ path: urlPath, lastmod });
    }
  }

  // dedupe by path
  const map = new Map<string, { path: string; lastmod: string }>();
  for (const p of pages) map.set(p.path, p);
  return Array.from(map.values());
}

function computePriority(route: string) {
  if (route === '/') return '1.0';
  // make product detail pages more prominent
  if (route.startsWith('/products/')) return '0.9';
  const depth = route.split('/').filter(Boolean).length;
  if (depth === 1) return '0.8';
  if (depth === 2) return '0.6';
  return '0.5';
}

function computeChangefreq(route: string) {
  if (route === '/') return 'daily';
  return 'weekly';
}

export async function GET() {
  const pages = await collectPages(APP_DIR);

  // ensure home page first
  pages.sort((a, b) => (a.path === '/' ? -1 : b.path === '/' ? 1 : a.path.localeCompare(b.path)));

  const urlEntries = pages
    .map(p => {
      const priority = computePriority(p.path);
      const changefreq = computeChangefreq(p.path);
      return `  <url>\n    <loc>${SITE_URL}${p.path}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, s-maxage=3600'
    }
  });
}

// Notes:
// - Set SITE_URL or NEXT_PUBLIC_SITE_URL to your site root (e.g. https://example.com)
// - This route auto-discovers new static pages in the app directory (it skips dynamic [slug] routes)
