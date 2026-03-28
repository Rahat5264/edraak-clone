const fs = require('fs');
const path = 'd:/Edraak systems web/data/content.json';
const c = JSON.parse(fs.readFileSync(path, 'utf8'));
const items = (c.caseStudies && c.caseStudies.items) || [];
(async () => {
  for (let i = 0; i < Math.min(3, items.length); i++) {
    const img = items[i].image;
    console.log(`Item ${i+1} -> ${img}`);
    try {
      const res = await fetch(img, { method: 'HEAD', redirect: 'follow' });
      console.log(`  status: ${res.status} ${res.statusText}`);
    } catch (e) {
      console.log(`  error: ${String(e)}`);
    }
  }
})().catch(e=>console.error(e));
