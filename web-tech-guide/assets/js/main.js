/* ============================================================
   Web Technology ETE Study Guide — Global JavaScript
   ============================================================ */

/* ---------- Theme Toggle ---------- */
function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  document.body.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.body.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', next);
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.innerHTML = theme === 'dark'
    ? '<i class="bi bi-sun-fill"></i>'
    : '<i class="bi bi-moon-fill"></i>';
}

/* ---------- Progress Bar ---------- */
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ---------- Back to Top ---------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- Copy Code ---------- */
function copyCode(btn) {
  const wrapper = btn.closest('.code-wrapper');
  const code = wrapper ? wrapper.querySelector('code') : null;
  if (!code) return;
  navigator.clipboard.writeText(code.innerText).then(() => {
    btn.innerHTML = '<i class="bi bi-check-lg"></i> Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = code.innerText;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.innerHTML = '<i class="bi bi-check-lg"></i> Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}

/* ---------- Refresh Preview ---------- */
function refreshPreview(btn) {
  const container = btn.closest('.preview-container');
  const frame = container ? container.querySelector('.preview-frame') : null;
  if (!frame) return;
  const src = frame.getAttribute('data-srcdoc') || frame.getAttribute('srcdoc');
  frame.srcdoc = '';
  setTimeout(() => { frame.srcdoc = src; }, 100);
}

/* ---------- Sidebar Scrollspy (manual) ---------- */
function initScrollspy() {
  const sections = document.querySelectorAll('.question-section[id]');
  const navLinks = document.querySelectorAll('.sidebar .nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-20% 0px -75% 0px' });

  sections.forEach(sec => observer.observe(sec));
}

/* ---------- Search (index.html) ---------- */
const ALL_QUESTIONS = [
  // Unit 1
  { unit: 'Unit 1', num: 'Q1', text: 'Client–Server Architecture with diagram', url: 'unit1/index.html#u1-q1' },
  { unit: 'Unit 1', num: 'Q2', text: 'Basic Internet protocols used in web technology', url: 'unit1/index.html#u1-q2' },
  { unit: 'Unit 1', num: 'Q3', text: 'HTML5 audio and video tags for embedding multimedia', url: 'unit1/index.html#u1-q3' },
  { unit: 'Unit 1', num: 'Q4', text: 'Canvas and SVG in HTML5', url: 'unit1/index.html#u1-q4' },
  { unit: 'Unit 1', num: 'Q5', text: 'XML structure and namespaces with example', url: 'unit1/index.html#u1-q5' },
  { unit: 'Unit 1', num: 'Q6', text: 'DOM event handling with examples', url: 'unit1/index.html#u1-q6' },
  { unit: 'Unit 1', num: 'Q7', text: 'Portfolio website using HTML5 semantic elements', url: 'unit1/index.html#u1-q7' },
  { unit: 'Unit 1', num: 'Q8', text: 'HTML5 travel blog integrating multimedia and navigation', url: 'unit1/index.html#u1-q8' },
  { unit: 'Unit 1', num: 'Q9', text: 'Responsive HTML5 web page using semantic elements', url: 'unit1/index.html#u1-q9' },
  { unit: 'Unit 1', num: 'Q10', text: 'Multi-page company website using HTML5 semantic tags', url: 'unit1/index.html#u1-q10' },
  // Unit 2
  { unit: 'Unit 2', num: 'Q1', text: 'Form elements in HTML5', url: 'unit2/index.html#u2-q1' },
  { unit: 'Unit 2', num: 'Q2', text: 'CSS specificity with examples', url: 'unit2/index.html#u2-q2' },
  { unit: 'Unit 2', num: 'Q3', text: 'Different CSS styling techniques in web page design', url: 'unit2/index.html#u2-q3' },
  { unit: 'Unit 2', num: 'Q4', text: 'CSS 3D effects and animations without JavaScript', url: 'unit2/index.html#u2-q4' },
  { unit: 'Unit 2', num: 'Q5', text: 'Importance of Bootstrap in modern responsive websites', url: 'unit2/index.html#u2-q5' },
  { unit: 'Unit 2', num: 'Q6', text: 'CSS Box Model with example and diagram', url: 'unit2/index.html#u2-q6' },
  { unit: 'Unit 2', num: 'Q7', text: 'Bootstrap mobile-first approach with example', url: 'unit2/index.html#u2-q7' },
  { unit: 'Unit 2', num: 'Q8', text: 'Bootstrap Grid System and responsive layouts', url: 'unit2/index.html#u2-q8' },
  { unit: 'Unit 2', num: 'Q9', text: 'Bootstrap image classes for responsive images', url: 'unit2/index.html#u2-q9' },
  { unit: 'Unit 2', num: 'Q10', text: 'Bootstrap tables and their features', url: 'unit2/index.html#u2-q10' },
  { unit: 'Unit 2', num: 'Q11', text: 'Web page using DIV tag CSS classes and box properties', url: 'unit2/index.html#u2-q11' },
  { unit: 'Unit 2', num: 'Q12', text: 'Bootstrap admin dashboard with tables alerts and navbar', url: 'unit2/index.html#u2-q12' },
  { unit: 'Unit 2', num: 'Q13', text: 'Three types of CSS and their purpose', url: 'unit2/index.html#u2-q13' },
  { unit: 'Unit 2', num: 'Q14', text: 'Different types of CSS Selectors with example', url: 'unit2/index.html#u2-q14' },
  { unit: 'Unit 2', num: 'Q15', text: 'CSS 3D transformation techniques', url: 'unit2/index.html#u2-q15' },
  // Unit 3
  { unit: 'Unit 3', num: 'Q1', text: 'AJAX working with a suitable program', url: 'unit3/index.html#u3-q1' },
  { unit: 'Unit 3', num: 'Q2', text: 'Purpose of jQuery and its advantages', url: 'unit3/index.html#u3-q2' },
  { unit: 'Unit 3', num: 'Q3', text: 'JavaScript operators in detail with examples', url: 'unit3/index.html#u3-q3' },
  { unit: 'Unit 3', num: 'Q4', text: 'DOM manipulation in JavaScript', url: 'unit3/index.html#u3-q4' },
  { unit: 'Unit 3', num: 'Q5', text: 'JavaScript functions and objects with examples', url: 'unit3/index.html#u3-q5' },
  { unit: 'Unit 3', num: 'Q6', text: 'JavaScript application using arrays and objects', url: 'unit3/index.html#u3-q6' },
  { unit: 'Unit 3', num: 'Q7', text: 'JavaScript to validate credit card payment form', url: 'unit3/index.html#u3-q7' },
  { unit: 'Unit 3', num: 'Q8', text: 'JavaScript form handling and validations', url: 'unit3/index.html#u3-q8' },
  { unit: 'Unit 3', num: 'Q9', text: 'jQuery webpage using animations and effects', url: 'unit3/index.html#u3-q9' },
  { unit: 'Unit 3', num: 'Q10', text: 'AJAX client-server architecture and XMLHttpRequest', url: 'unit3/index.html#u3-q10' },
  // Unit 4
  { unit: 'Unit 4', num: 'Q1', text: 'Architecture of Apache Tomcat with diagram', url: 'unit4/index.html#u4-q1' },
  { unit: 'Unit 4', num: 'Q2', text: 'Client-side vs server-side scripting', url: 'unit4/index.html#u4-q2' },
  { unit: 'Unit 4', num: 'Q3', text: 'Servlet life cycle and different phases', url: 'unit4/index.html#u4-q3' },
  { unit: 'Unit 4', num: 'Q4', text: 'JDBC architecture with diagram', url: 'unit4/index.html#u4-q4' },
  { unit: 'Unit 4', num: 'Q5', text: 'Servlet request and response handling', url: 'unit4/index.html#u4-q5' },
  { unit: 'Unit 4', num: 'Q6', text: 'Deploying a basic Servlet or JSP application', url: 'unit4/index.html#u4-q6' },
  { unit: 'Unit 4', num: 'Q7', text: 'Initialization parameters to configure Servlets', url: 'unit4/index.html#u4-q7' },
  { unit: 'Unit 4', num: 'Q8', text: 'Connecting Java application with database using JDBC', url: 'unit4/index.html#u4-q8' },
  { unit: 'Unit 4', num: 'Q9', text: 'jQuery hide show and toggle methods', url: 'unit4/index.html#u4-q9' },
  { unit: 'Unit 4', num: 'Q10', text: 'Advantages of AJAX in web applications', url: 'unit4/index.html#u4-q10' },
  { unit: 'Unit 4', num: 'Q11', text: 'Database connectivity using JDBC and Servlets', url: 'unit4/index.html#u4-q11' },
  { unit: 'Unit 4', num: 'Q12', text: 'AJAX-based webpage for dynamic content loading', url: 'unit4/index.html#u4-q12' },
  { unit: 'Unit 4', num: 'Q13', text: 'Deploy Java web application with Apache Tomcat', url: 'unit4/index.html#u4-q13' },
  { unit: 'Unit 4', num: 'Q14', text: 'Web application using Servlets sessions and JDBC', url: 'unit4/index.html#u4-q14' },
  { unit: 'Unit 4', num: 'Q15', text: 'Session tracking techniques in Java Servlets', url: 'unit4/index.html#u4-q15' },
  // Unit 5
  { unit: 'Unit 5', num: 'Q1', text: 'JSP vs Servlets with examples', url: 'unit5/index.html#u5-q1' },
  { unit: 'Unit 5', num: 'Q2', text: 'Servlets as controllers in MVC architecture', url: 'unit5/index.html#u5-q2' },
  { unit: 'Unit 5', num: 'Q3', text: 'Architecture and key features of Spring Framework', url: 'unit5/index.html#u5-q3' },
  { unit: 'Unit 5', num: 'Q4', text: 'Features and advantages of Spring Boot', url: 'unit5/index.html#u5-q4' },
  { unit: 'Unit 5', num: 'Q5', text: 'JSP program using directives and expression tags', url: 'unit5/index.html#u5-q5' },
  { unit: 'Unit 5', num: 'Q6', text: 'MVC paradigm in JSP-based web applications', url: 'unit5/index.html#u5-q6' },
  { unit: 'Unit 5', num: 'Q7', text: 'Spring Boot web application with directory structure', url: 'unit5/index.html#u5-q7' },
  { unit: 'Unit 5', num: 'Q8', text: 'Spring Framework Spring MVC and Spring Boot features', url: 'unit5/index.html#u5-q8' },
  { unit: 'Unit 5', num: 'Q9', text: 'JSP program with directives declarations and scriptlets', url: 'unit5/index.html#u5-q9' },
  { unit: 'Unit 5', num: 'Q10', text: 'Basic Spring MVC application with controller and view', url: 'unit5/index.html#u5-q10' },
];

function initSearch() {
  const input = document.getElementById('global-search');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    results.innerHTML = '';
    if (!q) { results.style.display = 'none'; return; }

    const matches = ALL_QUESTIONS.filter(item =>
      item.text.toLowerCase().includes(q) ||
      item.unit.toLowerCase().includes(q) ||
      item.num.toLowerCase().includes(q)
    ).slice(0, 10);

    if (!matches.length) {
      results.innerHTML = '<div class="search-result-item text-muted">No results found</div>';
      results.style.display = 'block';
      return;
    }

    matches.forEach(item => {
      const a = document.createElement('a');
      a.className = 'search-result-item';
      a.href = item.url;
      a.innerHTML = `<div>${item.text}</div><div class="search-result-unit">${item.unit} · ${item.num}</div>`;
      results.appendChild(a);
    });
    results.style.display = 'block';
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrapper')) {
      results.style.display = 'none';
    }
  });
}

/* ---------- Typewriter Effect ---------- */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const phrases = [
    'Master Web Technology for Your ETE Exams',
    '55 Questions. Complete Answers. Ready to Ace.',
    'HTML5 · CSS3 · JavaScript · Java Servlets · Spring',
    'Built for Students, By Students 🎓',
  ];
  let i = 0, j = 0, deleting = false;
  function tick() {
    const phrase = phrases[i];
    el.textContent = deleting ? phrase.slice(0, j--) : phrase.slice(0, j++);
    let delay = deleting ? 40 : 65;
    if (!deleting && j > phrase.length) { delay = 1800; deleting = true; }
    if (deleting && j < 0) { j = 0; deleting = false; i = (i + 1) % phrases.length; delay = 300; }
    setTimeout(tick, delay);
  }
  tick();
}

/* ---------- Init all ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initProgressBar();
  initBackToTop();
  initScrollspy();
  initSearch();
  initTypewriter();

  // Init highlight.js if present
  if (typeof hljs !== 'undefined') hljs.highlightAll();

  // Store srcdoc on iframes for refresh
  document.querySelectorAll('.preview-frame').forEach(f => {
    if (f.getAttribute('srcdoc') && !f.getAttribute('data-srcdoc')) {
      f.setAttribute('data-srcdoc', f.getAttribute('srcdoc'));
    }
  });
});
