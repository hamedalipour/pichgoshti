import fs from 'node:fs';

const p = JSON.parse(fs.readFileSync('content/posts.json', 'utf8'));

function addLink(slug, text, href) {
  const post = p.find(x => x.slug === slug);
  if (!post) { console.log('NOT FOUND:', slug); return; }
  const hrefs = post.blocks.filter(b => b.type === 'link').map(b => b.href);
  if (hrefs.includes(href)) {
    console.log(`skip ${slug} -> ${href} (exists)`);
    return;
  }
  post.blocks.push({ type: 'link', text, href });
  console.log(`added ${slug} -> ${href} (${text})`);
}

// پنل شکسته دوو/اسنوا از صفحات با ترافیک بالا
addLink('snowa-repair-cost', 'تعمیر تلویزیون پنل شکسته اسنوا؛ قیمت و تشخیص', '/blog/broken-panel-duo-snowa/');
addLink('daewoo-repair-cost', 'تعمیر تلویزیون پنل شکسته دوو؛ قیمت و تشخیص', '/blog/broken-panel-duo-snowa/');
addLink('tv-repair-cost', 'تعمیر تلویزیون پنل شکسته دوو و اسنوا؛ قیمت ۱۴۰۵', '/blog/broken-panel-duo-snowa/');
addLink('panel-vs-new-tv', 'تعمیر تلویزیون پنل شکسته دوو و اسنوا؛ قیمت ۱۴۰۵', '/blog/broken-panel-duo-snowa/');
addLink('black-screen-with-sound', 'تعمیر تلویزیون پنل شکسته دوو و اسنوا؛ قیمت ۱۴۰۵', '/blog/broken-panel-duo-snowa/');

// نصب دیواری دوو/اسنوا از صفحات مرتبط
addLink('wall-mount-guide', 'نصب تلویزیون دوو و اسنوا روی دیوار؛ قیمت و VESA', '/blog/wall-mount-duo-snowa/');
addLink('tv-repair-cost', 'نصب تلویزیون دوو و اسنوا روی دیوار؛ قیمت و VESA ۱۴۰۵', '/blog/wall-mount-duo-snowa/');

fs.writeFileSync('content/posts.json', JSON.stringify(p, null, 2));
console.log('Done. Internal links added.');
