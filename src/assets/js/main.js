// Site script: progressive enhancement only. The site works without it.

// Mark the current section in the nav.
const here = location.pathname;
document.querySelectorAll('.site-nav [data-match]').forEach((link) => {
    const matches = link.dataset.match.split(' ').some((prefix) => here.startsWith(prefix));
    if (matches) link.setAttribute('aria-current', 'page');
});

// Code blocks: wrap, add a filename tab and a copy button, then highlight.
const COPY_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>';
const CHECK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>';

const blocks = document.querySelectorAll('main pre');
blocks.forEach((pre) => {
    const wrap = document.createElement('div');
    wrap.className = 'code-wrap';
    pre.replaceWith(wrap);

    if (pre.dataset.filename) {
        const title = document.createElement('div');
        title.className = 'code-title';
        title.textContent = pre.dataset.filename;
        wrap.before(title);
    }
    wrap.append(pre);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-btn';
    button.innerHTML = `${COPY_ICON}<span>copy</span>`;
    button.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(pre.textContent.trim());
            button.dataset.copied = '';
            button.innerHTML = `${CHECK_ICON}<span>copied</span>`;
        } catch {
            const range = document.createRange();
            range.selectNodeContents(pre);
            getSelection().removeAllRanges();
            getSelection().addRange(range);
            button.innerHTML = `${COPY_ICON}<span>select</span>`;
        }
        setTimeout(() => {
            delete button.dataset.copied;
            button.innerHTML = `${COPY_ICON}<span>copy</span>`;
        }, 1200);
    });
    wrap.append(button);
});

if (blocks.length) {
    Promise.all([
        import('/assets/vendor/speed-highlight/dist/index.js'),
        import('/assets/vendor/speed-highlight/dist/detect.js'),
    ]).then(([{ highlightElement }, { detectLanguage }]) => {
        blocks.forEach((pre) => {
            const text = pre.textContent;
            const declared = (pre.querySelector('code')?.className || pre.className).match(/language-([\w-]+)/);
            const lang = declared ? declared[1] : detectLanguage(text) || 'plain';
            const source = pre.querySelector('code') ? text : null;
            if (source !== null) pre.textContent = source;
            highlightElement(pre, lang === 'sh' || lang === 'shell' ? 'bash' : lang, 'oneline');
        });
    }).catch(() => { /* unhighlighted code is fine */ });
}
