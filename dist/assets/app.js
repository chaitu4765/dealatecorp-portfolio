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
  return `<header class="site-header"><a class="brand" href="/" aria-label="Dealatecorp home"><span class="brand-mark">D</span><span><b>DEALATECORP</b><small>For a better tomorrow</small></span></a><button class="menu" aria-label="Open navigation" aria-expanded="false"><i></i><i></i></button><nav>${nav.map(([label, href]) => `<a href="${href}" ${path === href.replace(/\/$/, '') || (path === '/' && href === '/') ? 'aria-current="page"' : ''}>${label}</a>`).join('')}<a class="nav-cta interactive-hover" href="mailto:hello@dealatecorp.com"><span>Start a project</span><i aria-hidden="true">↗</i></a></nav></header>`
}

function footer() {
  return `<footer><div><a class="brand brand--footer" href="/"><span class="brand-mark">D</span><span><b>DEALATECORP</b><small>For a better tomorrow</small></span></a><h2>Have an ambitious goal?<br><em>Let’s make it move.</em></h2><a class="text-link" href="mailto:hello@dealatecorp.com">hello@dealatecorp.com</a></div><div class="footer-links">${nav.map(([l,h])=>`<a href="${h}">${l}</a>`).join('')}</div><p class="copyright">© 2026 Dealatecorp. Strategy, creative and performance—connected.</p></footer>`
}

function cta() { return `<section class="cta"><p class="kicker">Your next growth chapter</p><h2>One partner. <em>Every moving part.</em></h2><p>Tell us where the business needs to go. We’ll map the clearest way forward.</p><a class="button button--light interactive-hover" href="mailto:hello@dealatecorp.com"><span>Start a conversation</span><i aria-hidden="true">↗</i></a></section>` }

function clientFeyCards() {
  const center = (clients.length - 1) / 2
  return clients.map((client, index) => {
    const distance = index - center
    return `<span style="--fey-stack-x:${(distance * .7).toFixed(2)}rem;--fey-fan-x:${(distance * 3.15).toFixed(2)}rem;--fey-rotate:${(distance * 1.4).toFixed(2)}deg;--fey-z:${index}"><small>${String(index + 1).padStart(2, '0')}</small><b>${client}</b><i>DC Creative Labs partner</i></span>`
  }).join('')
}

function home() { return `
  <main class="home-new"><section class="hero hero--home-cinema"><div class="hero-copy"><p class="kicker">DC Creative Labs · Hyderabad</p><h1>Create your presence.<br><em>Find your audience.</em><br>Grow your business.</h1><p>Creative strategy and performance marketing, connected around your business goals.</p><a class="scroll-cue" href="#home-story">Scroll to explore <span></span></a></div></section>
  <section class="home-intro"><div class="interactive-grid" aria-hidden="true"></div><div><p class="kicker">Digital growth, connected</p><h2>From visibility<br>to <em>measurable outcomes.</em></h2></div><p>DC Creative Labs helps businesses create brands, connect with the right people and build a lasting online presence. Strategy, creative, media and analytics work as one system—not separate activities.</p></section>
  <section id="home-story" class="home-story"><div class="home-story__top"><div><p class="kicker">What we do</p><h2>Four movements.<br><em>One clear direction.</em></h2></div><div class="story-controls"><button type="button" class="story-prev ripple-button" aria-label="Previous capability">Prev</button><span class="story-count">01 / 04</span><button type="button" class="story-next ripple-button" aria-label="Next capability">Next</button></div></div><div class="story-viewport"><div class="story-track">
    <article class="story-panel story-panel--blue"><div class="story-panel__copy"><span>01</span><p class="kicker">Search visibility</p><h3>Be found when intent is highest.</h3><p>Technical SEO, local search and useful content improve rankings, qualified traffic, enquiries and footfall.</p><div class="tag-row"><b>SEO</b><b>Local SEO</b><b>Content</b></div></div><div class="story-panel__visual"><strong>SEARCH</strong><i>Visibility before volume</i></div></article>
    <article class="story-panel story-panel--pink"><div class="story-panel__copy"><span>02</span><p class="kicker">Content and community</p><h3>Shape the voice people remember.</h3><p>Social content, video and creator partnerships build recognition, trust and meaningful audience connection.</p><div class="tag-row"><b>Social</b><b>YouTube</b><b>Influencers</b></div></div><div class="story-panel__visual"><strong>STORY</strong><i>Attention with purpose</i></div></article>
    <article class="story-panel story-panel--orange"><div class="story-panel__copy"><span>03</span><p class="kicker">Performance media</p><h3>Turn attention into qualified demand.</h3><p>Google, Meta and LinkedIn campaigns connect focused creative with the audiences most likely to act.</p><div class="tag-row"><b>Google Ads</b><b>Meta Ads</b><b>LinkedIn</b></div></div><div class="story-panel__visual"><strong>GROW</strong><i>Demand, deliberately built</i></div></article>
    <article class="story-panel story-panel--green"><div class="story-panel__copy"><span>04</span><p class="kicker">Conversion and insight</p><h3>Make every next move smarter.</h3><p>Landing-page optimization, customer journeys and clear reporting turn digital activity into business learning.</p><div class="tag-row"><b>CRO</b><b>Analytics</b><b>Reporting</b></div></div><div class="story-panel__visual"><strong>MOVE</strong><i>Evidence over assumptions</i></div></article>
  </div></div></section>
  <section class="home-clients"><p class="kicker">Brands growing with us</p><div class="client-fey-stack">${clientFeyCards()}</div><a class="shimmer-button" href="/clients/"><span>Meet our clients</span><i aria-hidden="true">↗</i></a></section>
  ${cta()}</main>` }

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

const storyViewport = document.querySelector('.story-viewport')
if (storyViewport) {
  const panels = [...storyViewport.querySelectorAll('.story-panel')]
  const counter = document.querySelector('.story-count')
  let activeStory = 0
  const showStory = (index) => {
    activeStory = (index + panels.length) % panels.length
    panels[activeStory].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
    counter.textContent = `${String(activeStory + 1).padStart(2, '0')} / ${String(panels.length).padStart(2, '0')}`
  }
  document.querySelector('.story-prev').addEventListener('click', () => showStory(activeStory - 1))
  document.querySelector('.story-next').addEventListener('click', () => showStory(activeStory + 1))
  storyViewport.addEventListener('scroll', () => {
    const closest = panels.reduce((best, panel, index) => {
      const distance = Math.abs(panel.offsetLeft - storyViewport.scrollLeft)
      return distance < best.distance ? { index, distance } : best
    }, { index: 0, distance: Infinity })
    activeStory = closest.index
    counter.textContent = `${String(activeStory + 1).padStart(2, '0')} / ${String(panels.length).padStart(2, '0')}`
  }, { passive: true })
}

const siteHeader = document.querySelector('.site-header')
const updateHeader = () => siteHeader.classList.toggle('site-header--scrolled', window.scrollY > 24)
updateHeader()
window.addEventListener('scroll', updateHeader, { passive: true })

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = window.matchMedia('(pointer: fine)').matches

if (!reducedMotion && finePointer) {
  const aura = document.createElement('div')
  aura.className = 'pointer-aura'
  document.body.append(aura)
  window.addEventListener('pointermove', (event) => {
    aura.style.setProperty('--pointer-x', `${event.clientX}px`)
    aura.style.setProperty('--pointer-y', `${event.clientY}px`)
    aura.classList.add('pointer-aura--visible')
  }, { passive: true })

  document.querySelectorAll('.button, .nav-cta, .story-controls button').forEach(control => {
    control.addEventListener('pointermove', event => {
      const rect = control.getBoundingClientRect()
      control.style.setProperty('--magnetic-x', `${(event.clientX - rect.left - rect.width / 2) * .12}px`)
      control.style.setProperty('--magnetic-y', `${(event.clientY - rect.top - rect.height / 2) * .12}px`)
    })
    control.addEventListener('pointerleave', () => {
      control.style.setProperty('--magnetic-x', '0px')
      control.style.setProperty('--magnetic-y', '0px')
    })
  })

  document.querySelectorAll('.story-panel, .project').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - .5
      const y = (event.clientY - rect.top) / rect.height - .5
      card.style.setProperty('--tilt-x', `${(-y * 1.4).toFixed(2)}deg`)
      card.style.setProperty('--tilt-y', `${(x * 1.4).toFixed(2)}deg`)
      card.style.setProperty('--glow-x', `${((x + .5) * 100).toFixed(1)}%`)
      card.style.setProperty('--glow-y', `${((y + .5) * 100).toFixed(1)}%`)
    })
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg')
      card.style.setProperty('--tilt-y', '0deg')
    })
  })
}

const gridSection = document.querySelector('.home-intro')
if (gridSection && finePointer) {
  gridSection.addEventListener('pointermove', event => {
    const rect = gridSection.getBoundingClientRect()
    gridSection.style.setProperty('--grid-x', `${event.clientX - rect.left}px`)
    gridSection.style.setProperty('--grid-y', `${event.clientY - rect.top}px`)
    gridSection.style.setProperty('--grid-cell-x', `${Math.floor((event.clientX - rect.left) / 54) * 54}px`)
    gridSection.style.setProperty('--grid-cell-y', `${Math.floor((event.clientY - rect.top) / 54) * 54}px`)
    gridSection.classList.add('home-intro--grid-active')
  }, { passive: true })
  gridSection.addEventListener('pointerleave', () => gridSection.classList.remove('home-intro--grid-active'))
}

document.querySelectorAll('.ripple-button').forEach(button => {
  button.addEventListener('click', event => {
    const rect = button.getBoundingClientRect()
    const ripple = document.createElement('span')
    ripple.className = 'button-ripple'
    ripple.style.left = `${event.clientX - rect.left}px`
    ripple.style.top = `${event.clientY - rect.top}px`
    button.append(ripple)
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true })
  })
})
