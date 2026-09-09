/* ============================================
   RADAR CHART
============================================ */
const ACCENT = '#0e9655';
const ACCENT_RGB = '14, 150, 85';

function initRadar() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;

    new Chart(canvas.getContext('2d'), {
        type: 'radar',
        data: {
            labels: [
                ['GTM', 'Execution'],
                ['Positioning &', 'Messaging'],
                ['Competitive', 'Intelligence'],
                ['Sales', 'Enablement'],
                ['Customer', 'Marketing'],
                ['Segmentation', '& ICP']
            ],
            datasets: [{
                data: [95, 92, 90, 89, 88, 87],
                backgroundColor: `rgba(${ACCENT_RGB}, 0.1)`,
                borderColor: ACCENT,
                borderWidth: 2,
                pointBackgroundColor: ACCENT,
                pointBorderColor: ACCENT,
                pointHoverBackgroundColor: '#00d4d4',
                pointHoverBorderColor: '#00d4d4',
                pointRadius: 5,
                pointHoverRadius: 7,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            layout: {
                padding: {
                    top: 20,
                    bottom: 20,
                    left: 30,
                    right: 30
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#111827',
                    titleColor: ACCENT,
                    bodyColor: '#c4cde0',
                    borderColor: `rgba(${ACCENT_RGB}, 0.25)`,
                    borderWidth: 1,
                    callbacks: {
                        label: ctx => ' ' + ctx.raw + ' / 99'
                    }
                }
            },
            scales: {
                r: {
                    min: 60,
                    max: 100,
                    ticks: { display: false, stepSize: 10 },
                    grid: {
                        color: 'rgba(15,23,42,0.09)',
                        lineWidth: 1
                    },
                    angleLines: {
                        color: 'rgba(15,23,42,0.09)',
                        lineWidth: 1
                    },
                    pointLabels: {
                        color: '#475569',
                        font: { family: "'Inter', sans-serif", size: 11, weight: '500' },
                        padding: 18
                    }
                }
            }
        }
    });
}

/* ============================================
   ATTRIBUTE BAR ANIMATIONS
============================================ */
function initAttrBars() {
    const bars = document.querySelectorAll('.attr-fill');
    if (!bars.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const fill = entry.target;
            const row = fill.closest('.attr-row');
            const val = parseInt(row.dataset.value, 10);
            setTimeout(() => {
                fill.style.width = (val / 99 * 100).toFixed(1) + '%';
            }, 80);
            obs.unobserve(fill);
        });
    }, { threshold: 0.3 });

    bars.forEach(b => obs.observe(b));
}

/* ============================================
   COUNTER ANIMATIONS
============================================ */
function animateCount(el, target, duration) {
    const start = performance.now();
    function tick(now) {
        const pct = Math.min((now - start) / duration, 1);
        // ease-out cubic
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
        // Sort by position so stagger goes top→bottom
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
    initRadar();
    initAttrBars();
    initCounters();
    initScrollFade();
});
