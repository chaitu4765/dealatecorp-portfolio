const path = location.pathname.replace(/\/$/, '') || '/'

const effects = document.createElement('link')
effects.rel = 'stylesheet'
effects.href = '/assets/effects.css'
document.head.append(effects)

const nav = [
  ['Home', '/'], ['Services', '/services/'], ['Clients', '/clients/'], ['About', '/about/']
]

const serviceLayers = [
  ['01', 'Brand foundation', 'Positioning, identity and messaging that make every campaign feel unmistakably yours.'],
  ['02', 'Content systems', 'A repeatable editorial engine for social, video, articles and campaign creative.'],
  ['03', 'Search visibility', 'Technical SEO, local discovery and useful content built around real customer intent.'],
  ['04', 'Performance media', 'Google and Meta campaigns designed around qualified demand, not empty reach.'],
  ['05', 'Digital experiences', 'Fast, focused websites and landing pages that turn attention into action.'],
  ['06', 'Conversion & CRM', 'Better journeys, automation and follow-up systems that help more leads become customers.'],
  ['07', 'Growth intelligence', 'Clear reporting and strategic reviews that connect marketing activity to business movement.']
]

const work = [
  ['Property', 'Sri Surya Infra', 'A clearer digital identity and lead journey for a growing real-estate brand.', 'Brand · Web · Performance', 'blue'],
  ['Healthcare', 'Spark Clinic', 'Local discovery and trust-led content shaped around patient questions.', 'Local SEO · Content · Social', 'copper'],
  ['Construction', 'SV Constructions', 'A premium project narrative built to convert high-intent property buyers.', 'Strategy · Creative · Paid media', 'lime'],
  ['Events', 'Sri Conventions', 'A visual booking journey that brings spaces, moments and enquiries together.', 'Experience · Social · Search', 'violet']
]

const clients = ['Sri Surya Infra', 'Spark Clinic', 'SV Constructions', 'Sri Conventions', 'Ganesh Constructions', 'Aditya Sai Promoters', 'Tirumalasetty Properties', 'SSM Developers']

function header() {
  return `<header class="site-header"><a class="brand" href="/" aria-label="Dealatecorp home"><span class="brand-mark">D</span><span><b>DEALATECORP</b><small>For a better tomorrow</small></span></a><button class="menu" aria-label="Open navigation" aria-expanded="false"><i></i><i></i></button><nav>${nav.map(([label, href]) => `<a href="${href}" ${path === href.replace(/\/$/, '') || (path === '/' && href === '/') ? 'aria-current="page"' : ''}>${label}</a>`).join('')}<a class="nav-cta" href="mailto:hello@dealatecorp.com">Start a project</a></nav></header>`
}

function footer() {
  return `<footer><div><a class="brand brand--footer" href="/"><span class="brand-mark">D</span><span><b>DEALATECORP</b><small>For a better tomorrow</small></span></a><h2>Have an ambitious goal?<br><em>Let’s make it move.</em></h2><a class="text-link" href="mailto:hello@dealatecorp.com">hello@dealatecorp.com</a></div><div class="footer-links">${nav.map(([l,h])=>`<a href="${h}">${l}</a>`).join('')}</div><p class="copyright">© 2026 Dealatecorp. Strategy, creative and performance—connected.</p></footer>`
}

function cta() { return `<section class="cta"><p class="kicker">Your next growth chapter</p><h2>One partner. <em>Every moving part.</em></h2><p>Tell us where the business needs to go. We’ll map the clearest way forward.</p><a class="button button--light" href="mailto:hello@dealatecorp.com">Start a conversation</a></section>` }

function home() { return `
  <main><section class="hero hero--home"><div class="hero-copy"><p class="kicker">Independent growth partner · Hyderabad</p><h1>Growth, <em>deliberately</em> designed.</h1><p>Dealatecorp connects strategy, creative, technology and performance marketing so ambitious businesses can move with clarity.</p><div class="actions"><a class="button" href="/services/">Explore our system</a><a class="text-link" href="/portfolio/">See selected work</a></div></div><div class="hero-index"><span>01</span><p>Think clearly<br>Build beautifully<br>Grow measurably</p></div></section>
  <section class="statement"><p class="kicker">What makes us different</p><h2>Not a list of services.<br><em>A connected growth system.</em></h2><p class="lead">Most marketing breaks at the hand-offs. We bring the thinking, making and measuring into one room—so the brand gets stronger as performance improves.</p></section>
  <section class="split-feature"><div class="feature-image"></div><div class="feature-copy"><p class="kicker">Seven layers · One direction</p><h2>Every discipline earns its place.</h2><p>From your first strategic decision to your next qualified lead, each layer is designed to reinforce the others.</p><a class="button button--dark" href="/services/">How the system works</a></div></section>
  <section class="work-preview"><div class="section-head"><div><p class="kicker">Selected work</p><h2>Built around the <em>business problem.</em></h2></div><a class="text-link" href="/portfolio/">View all projects</a></div><div class="project-grid">${work.slice(0,2).map(projectCard).join('')}</div></section>${cta()}</main>` }

function services() { return `
  <main><section class="hero hero--services"><div class="hero-copy"><p class="kicker">What we do</p><h1>Seven layers.<br><em>One growth system.</em></h1><p>Digital growth services structured to work together—from brand foundation to measurable demand.</p><a class="scroll-cue" href="#layers">Scroll to explore <span></span></a></div></section>
  <section id="layers" class="layers"><div class="section-head"><div><p class="kicker">The system</p><h2>Strong alone.<br><em>Stronger together.</em></h2></div><p>Choose the layers your business needs now. Keep one connected strategy as you grow.</p></div><div class="layer-list">${serviceLayers.map(([n,t,d],i)=>`<article class="layer" tabindex="0"><span>${n}</span><h3>${t}</h3><p>${d}</p><b aria-hidden="true">${String(i+1).padStart(2,'0')}</b></article>`).join('')}</div></section>
  <section class="process"><p class="kicker">How we work</p><div class="process-grid"><div><span>01</span><h3>Diagnose</h3><p>We find the constraint behind the visible problem.</p></div><div><span>02</span><h3>Design</h3><p>We build the smallest connected system that can create movement.</p></div><div><span>03</span><h3>Deliver</h3><p>Specialists execute, measure and improve in one rhythm.</p></div></div></section>${cta()}</main>` }

function projectCard([category,title,desc,tags,color]) { return `<article class="project ${color}"><div class="project-art"><span>${title.split(' ').map(x=>x[0]).join('').slice(0,2)}</span></div><p class="kicker">${category}</p><h3>${title}</h3><p>${desc}</p><small>${tags}</small></article>` }

function portfolio() { return `<main><section class="page-intro"><p class="kicker">Selected work</p><h1>Work that moves<br><em>business forward.</em></h1><p>Different sectors. Different constraints. One standard: make the work useful, memorable and measurable.</p></section><section class="portfolio-grid">${work.map(projectCard).join('')}</section>${cta()}</main>` }

function clientsPage() { return `<main><section class="page-intro page-intro--center"><p class="kicker">Our clients</p><h1>Built on trust.<br><em>Measured in momentum.</em></h1><p>We work alongside founders and teams who care about the quality of the journey—not just the speed of the result.</p></section><section class="client-wall">${clients.map((c,i)=>`<article><span>${String(i+1).padStart(2,'0')}</span><b>${c}</b></article>`).join('')}</section><section class="quote"><blockquote>“The best client relationships feel less like outsourcing and more like adding a sharper, faster growth team.”</blockquote><p>Our partnership principle</p></section>${cta()}</main>` }

function about() { return `<main><section class="page-intro"><p class="kicker">About Dealatecorp</p><h1>Built for the gap between<br><em>ideas and outcomes.</em></h1><p>We are an independent growth partner in Hyderabad, bringing business thinking and digital craft under one roof.</p></section><section class="about-manifesto"><div class="about-number">D<span>→</span></div><div><p class="kicker">Our point of view</p><h2>Clarity is the beginning of good growth.</h2><p>More activity is rarely the answer. Better alignment is. We help teams decide what matters, build it with care, and learn quickly from what the market says next.</p><p>That means fewer disconnected campaigns, fewer vanity reports and more useful conversations about customers, conversion and long-term brand value.</p></div></section><section class="values"><article><span>01</span><h3>Think commercially</h3><p>Creative work must understand the business it serves.</p></article><article><span>02</span><h3>Make with care</h3><p>Details shape trust before a sales conversation begins.</p></article><article><span>03</span><h3>Measure honestly</h3><p>Good reporting explains what changed and what to do next.</p></article></section>${cta()}</main>` }

const pages = {'/':home, '/services':services, '/portfolio':portfolio, '/clients':clientsPage, '/about':about}
document.querySelector('#app').innerHTML = `${header()}${(pages[path] || home)()}${footer()}`

const menu = document.querySelector('.menu')
menu.addEventListener('click', () => { const open = document.body.classList.toggle('nav-open'); menu.setAttribute('aria-expanded', String(open)) })

const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target) } }), {threshold:.12})
document.querySelectorAll('main section, .project, .layer').forEach(el => { el.classList.add('reveal'); reveal.observe(el) })
