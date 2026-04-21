/* ============================================
   PARTS SPEC ROW ANIMATIONS
============================================ */
function initSpecRows() {
    const rows = document.querySelectorAll('.spec-row');
    if (!rows.length) return;

    const obs = new IntersectionObserver(entries => {
        const visible = entries.filter(e => e.isIntersecting);
        visible
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
            .forEach((entry, i) => {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 80);
                obs.unobserve(entry.target);
            });
    }, { threshold: 0.2 });

    rows.forEach(r => obs.observe(r));
}

/* ============================================
   COUNTER ANIMATIONS
============================================ */
function animateCount(el, target, duration) {
    const start = performance.now();
    function tick(now) {
        const pct = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - pct, 3);
        el.textContent = Math.floor(ease * target);
        if (pct < 1) requestAnimationFrame(tick);
        else el.textContent = target;
    }
    requestAnimationFrame(tick);
}

function initCounters() {
    const cards = document.querySelectorAll('.stat-card[data-target]');
    if (!cards.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const card = entry.target;
            const target = parseInt(card.dataset.target, 10);
            const cval = card.querySelector('.cval');
            if (cval) animateCount(cval, target, 1800);
            obs.unobserve(card);
        });
    }, { threshold: 0.5 });

    cards.forEach(c => obs.observe(c));
}

/* ============================================
   SCROLL FADE-IN ANIMATIONS
============================================ */
function initScrollFade() {
    const els = document.querySelectorAll('.tl-item, .hl-card, .fb-card, .stat-card');

    const obs = new IntersectionObserver(entries => {
        const visible = entries.filter(e => e.isIntersecting);
        visible
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
            .forEach((entry, i) => {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 55);
                obs.unobserve(entry.target);
            });
    }, { threshold: 0.08 });

    els.forEach(el => obs.observe(el));
}

/* ============================================
   INIT
============================================ */
document.addEventListener('DOMContentLoaded', () => {
    initSpecRows();
    initCounters();
    initScrollFade();
});
