import { home, initHome } from './home.js'
import { services, initServices } from './services.js'
import { clientsPage as currentClientsPage, initClients } from './clients.js'

const path = location.pathname.replace(/\/$/, '') || '/'

const effects = document.createElement('link')
effects.rel = 'stylesheet'
effects.href = '/assets/effects.css'
const usesEditorialTheme = path === '/' || path === '/services'
if (!usesEditorialTheme) document.head.append(effects)
if (path === '/clients') { const clientsStyles = document.createElement('link'); clientsStyles.rel = 'stylesheet'; clientsStyles.href = '/assets/clients.css'; document.head.append(clientsStyles) }
document.body.classList.toggle('home-page', usesEditorialTheme)
document.body.classList.toggle('is-clients-page', path === '/clients')

const nav = [
  ['Home', '/'], ['Services', '/services/'], ['Clients', '/clients/'], ['About', '/about/']
]



const work = [
  ['Property', 'Sri Surya Infra', 'A clearer digital identity and lead journey for a growing real-estate brand.', 'Brand · Web · Performance', 'blue'],
  ['Healthcare', 'Spark Clinic', 'Local discovery and trust-led content shaped around patient questions.', 'Local SEO · Content · Social', 'copper'],
  ['Construction', 'SV Constructions', 'A premium project narrative built to convert high-intent property buyers.', 'Strategy · Creative · Paid media', 'lime'],
  ['Events', 'Sri Conventions', 'A visual booking journey that brings spaces, moments and enquiries together.', 'Experience · Social · Search', 'violet']
]

const clients = ['Adhithya Sai Promoters', 'Spark', 'Sree Surya Infra', 'Ganesh Constructions', 'Sri Conventions', 'Sri Parasakthi Peetam', 'SSM', 'SV Constructions', 'Tirumalsetty', 'UBIC']

const clientBrands = [
  { name: 'Adhithya Sai Promoters', logo: '/assets/logo/adithya sai.jpeg', href: '/clients/adhithya-sai-promoters/' },
  { name: 'Spark', logo: '/assets/logo/spark-clinic.png' },
  { name: 'Sree Surya Infra', logo: '/assets/logo/sree surya.jpeg' },
  { name: 'Ganesh Constructions', logo: '/assets/logo/ganesh.jpeg' },
  { name: 'Sri Conventions', logo: '/assets/logo/sri-conventions (1).png' },
  { name: 'Sri Parasakthi Peetam', logo: '/assets/logo/sri-parasakthi-peetam.png' },
  { name: 'SSM', logo: '/assets/logo/ssm.jpeg' },
  { name: 'SV Constructions', logo: '/assets/logo/sv-constructions.png' },
  { name: 'Tirumalsetty', logo: '/assets/logo/tirumalsetty.jpeg', href: '/clients/tirumalasetty/' },
  { name: 'UBIC', logo: '/assets/logo/UBIC_Primary_Square(Black).png' }
]

const tirumalasettyWork = [
  { src: '/assets/postors/tg.png', alt: 'Tirumalasetty Projects LLP creative work - TG artwork' },
  { src: '/assets/postors/ts1.jpg', alt: 'Tirumalasetty Projects LLP creative work - TS1 artwork' },
  { src: '/assets/postors/ts2.jpg', alt: 'Tirumalasetty Projects LLP creative work - TS2 artwork' }
]

const adhithyaGallery = [
  { src: '/assets/postors/aditya.png', alt: 'Adhithya Sai Promoters residential property creative' },
  { src: '/assets/logo/adithya sai.jpeg', alt: 'Adhithya Sai Promoters brand mark' }
]

const clientHeroMedia = [
  '/assets/poster2/cut.jpeg',
  '/assets/poster2/dc.jpg',
  '/assets/poster2/dc1.jpg',
  '/assets/poster2/dc2.jpg',
  '/assets/poster2/e.jpg',
  '/assets/poster2/intrior.jpg',
  '/assets/poster2/j2.jpeg',
  '/assets/poster2/jew.jpg',
  '/assets/poster2/logo.png',
  '/assets/poster2/look.jpeg',
  '/assets/poster2/lux.jpeg',
  '/assets/poster2/open.jpeg',
  '/assets/poster2/plan.jpeg',
  '/assets/poster2/saree.jpg',
  '/assets/poster2/SnapInsta.to_797646797_18090950819385046_3461700213577688992_n.jpg',
  '/assets/poster2/sol.jpg',
  '/assets/poster2/sri-conventions.png',
  '/assets/poster2/today.jpg',
  '/assets/poster2/tree.jpeg',
  '/assets/poster2/ts7.jpg',
  '/assets/poster2/unwrap.jpeg',
  '/assets/poster2/WhatsApp Image 2026-09-29 at 2.25.18 PM.jpeg',
  '/assets/poster2/WhatsApp Image 2026-09-29 at 2.25.19 PM (2).jpeg',
  '/assets/poster2/WhatsApp Image 2026-09-29 at 2.25.19 PM.jpeg',
  '/assets/poster2/WhatsApp Image 2026-09-29 at 2.25.21 PM (1).jpeg',
  '/assets/poster2/WhatsApp Image 2026-09-29 at 2.25.21 PM.jpeg',
  '/assets/poster2/WhatsApp Image 2026-09-29 at 2.25.22 PM (2).jpeg',
  '/assets/poster2/WhatsApp Image 2026-09-29 at 2.25.23 PM (1).jpeg',
  '/assets/poster2/WhatsApp Image 2026-09-29 at 2.25.23 PM.jpeg',
  '/assets/poster2/WhatsApp Image 2026-09-29 at 2.25.24 PM (2).jpeg',
  '/assets/poster2/WhatsApp Image 2026-09-29 at 2.25.24 PM (3).jpeg',
  '/assets/poster2/WhatsApp Image 2026-09-29 at 2.25.24 PM.jpeg',
  '/assets/poster2/WhatsApp Image 2026-09-29 at 2.25.25 PM.jpeg',
  '/assets/postors/aditya.png',
  '/assets/postors/dg.png',
  '/assets/postors/g.jpg',
  '/assets/postors/ganeh.jpg',
  '/assets/postors/ganesh.jpg',
  '/assets/postors/gguru.jpg',
  '/assets/postors/gi.jpg',
  '/assets/postors/gin.jpg',
  '/assets/postors/gj.jpg',
  '/assets/postors/gk.jpg',
  '/assets/postors/go.jpg',
  '/assets/postors/gr.jpg',
  '/assets/postors/sg.png',
  '/assets/postors/ssmg.png',
  '/assets/postors/tg.png',
  '/assets/postors/ts.jpg',
  '/assets/postors/ts1.jpg',
  '/assets/postors/ts2.jpg'
]

const featuredMediaSlides = [
  {
    category: 'Campaign reveals',
    title: 'Brand\nStories',
    description: 'Campaigns, brand stories and creative work for the businesses we partner with.',
    left: { type: 'image', src: '/assets/postors/ganesh.jpg', alt: 'Ganesh launch creative' },
    right: { type: 'image', src: '/assets/poster2/ts7.jpg', alt: 'Campaign launch creative' }
  },
  {
    category: 'Reveal visuals',
    title: 'Unwrap The\nMoment',
    description: 'Warm editorial frames for launch posts, product reveals, and scroll-stopping campaign introductions.',
    left: { type: 'image', src: '/assets/poster2/unwrap.jpeg', alt: 'Unwrap campaign creative' },
    right: { type: 'image', src: '/assets/poster2/intrior.jpg', alt: 'Interior client creative media frame' }
  },
  {
    category: 'Product stories',
    title: 'Retail Creative\nFrames',
    description: 'Clean product-focused visuals for jewellery, saree, lifestyle, and shopping-led campaign storytelling.',
    left: { type: 'image', src: '/assets/poster2/look.jpeg', alt: 'Look campaign creative' },
    right: { type: 'image', src: '/assets/poster2/jew.jpg', alt: 'Jewellery client creative' }
  },
  {
    category: 'Fashion campaigns',
    title: 'Soft Sell\nStories',
    description: 'Fashion and lifestyle campaigns that connect the product with a distinctive brand story.',
    left: { type: 'image', src: '/assets/poster2/plan.jpeg', alt: 'Campaign planning creative' },
    right: { type: 'image', src: '/assets/poster2/saree.jpg', alt: 'Saree client creative' }
  },
  {
    category: 'Brand moments',
    title: 'Premium\nPresence',
    description: 'Creative work that gives each brand a recognisable voice and visual identity.',
    left: { type: 'image', src: '/assets/poster2/tree.jpeg', alt: 'Tree campaign creative' },
    right: { type: 'image', src: '/assets/poster2/j2.jpeg', alt: 'Jewellery campaign creative' }
  },
  {
    category: 'Opening edits',
    title: 'Luxury\nLaunches',
    description: 'Polished creative cards for launch posts, premium services, and client identity moments.',
    left: { type: 'image', src: '/assets/poster2/cut.jpeg', alt: 'Cut campaign creative' },
    right: { type: 'image', src: '/assets/poster2/lux.jpeg', alt: 'Luxury campaign creative' }
  },
  {
    category: 'Social openings',
    title: 'Open With\nImpact',
    description: 'Social campaigns built around a clear idea and a memorable first impression.',
    left: { type: 'image', src: '/assets/poster2/open.jpeg', alt: 'Open campaign creative' },
    right: { type: 'image', src: '/assets/postors/dg.png', alt: 'DG client creative' }
  },
  {
    category: 'Festival campaigns',
    title: 'Ganesh\nStories',
    description: 'Festival campaigns that bring cultural moments and brand messages together.',
    left: { type: 'image', src: '/assets/postors/g.jpg', alt: 'Ganesh client campaign creative' },
    right: { type: 'image', src: '/assets/postors/gguru.jpg', alt: 'Ganesh Guru client creative' }
  },
  {
    category: 'Creative series',
    title: 'Social\nSequences',
    description: 'Consistent visual stories across a series of social posts.',
    left: { type: 'image', src: '/assets/postors/gi.jpg', alt: 'GI client creative' },
    right: { type: 'image', src: '/assets/postors/gin.jpg', alt: 'GIN client creative' }
  },
  {
    category: 'Client posts',
    title: 'Graphic\nCampaigns',
    description: 'Graphic design and campaign imagery for client communications.',
    left: { type: 'image', src: '/assets/postors/gj.jpg', alt: 'GJ client creative' },
    right: { type: 'image', src: '/assets/postors/gk.jpg', alt: 'GK client creative' }
  },
  {
    category: 'Content sets',
    title: 'Recall\nFrames',
    description: 'Creative series that keep the brand story consistent across posts.',
    left: { type: 'image', src: '/assets/postors/go.jpg', alt: 'GO client creative' },
    right: { type: 'image', src: '/assets/postors/gr.jpg', alt: 'GR client creative' }
  },
  {
    category: 'Brand library',
    title: 'Client\nCreatives',
    description: 'Campaign work for Sree Surya, SSM and the businesses we partner with.',
    left: { type: 'image', src: '/assets/postors/sg.png', alt: 'Sree Surya client creative' },
    right: { type: 'image', src: '/assets/postors/ssmg.png', alt: 'SSM client creative' }
  },
  {
    category: 'Portfolio media',
    title: 'Campaign\nDetails',
    description: 'Property and brand campaigns shaped around each client’s story.',
    left: { type: 'image', src: '/assets/postors/tg.png', alt: 'TG client creative' },
    right: { type: 'image', src: '/assets/postors/ts2.jpg', alt: 'Tirumalsetty client creative' }
  }
]

function header() {
  return `<header class="site-header"><a class="brand" href="/" aria-label="Dealatecorp home"><span class="brand-mark">D</span><span><b>DEALATECORP</b><small>For a better tomorrow</small></span></a><button class="menu" aria-label="Open navigation" aria-expanded="false"><i></i><i></i></button><nav>${nav.map(([label, href]) => `<a href="${href}" ${path === href.replace(/\/$/, '') || (path.startsWith('/clients/') && href === '/clients/') || (path === '/' && href === '/') ? 'aria-current="page"' : ''}>${label}</a>`).join('')}<a class="nav-cta interactive-hover" href="mailto:hr@dealatecorp.com"><span>Start a project</span><i aria-hidden="true">↗</i></a></nav></header>`
}

function footer() {
  if (path === '/clients/tirumalasetty') {
    const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=3rd%20Floor%2C%20Flat%20No.%20303%2C%20Srinivasam%20-%2011%2C%20Sapthagirinagar%2C%20Sujathanagar%2C%20Pendurthi%2C%20Visakhapatnam%2C%20Andhra%20Pradesh%20530051'
    return `<footer class="tirumalasetty-footer-card">
      <div class="tirumalasetty-footer-main">
        <a class="brand brand--footer" href="/"><span class="brand-mark">D</span><span><b>DEALATECORP</b><small>For a better tomorrow</small></span></a>
        <h2>Let's shape the next<br><em>property story.</em></h2>
        <p>Planning a launch, campaign, or branded real estate experience? We can help turn the location, vision, and project details into a clear digital presence.</p>
        <a class="button interactive-hover" href="mailto:hr@dealatecorp.com"><span>Start a project</span><i aria-hidden="true">-&gt;</i></a>
      </div>
      <address class="tirumalasetty-footer-address">
        <span class="kicker">Address</span>
        <strong>Tirumalasetty Projects LLP</strong>
        <p>3rd Floor, Flat No. 303, Srinivasam - 11, Sapthagirinagar, Sujathanagar, Pendurthi, Visakhapatnam, Andhra Pradesh - 530051</p>
        <a class="tirumalasetty-map-link" href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
      </address>
      <p class="copyright">© 2026 Dealatecorp. Strategy, creative and performance connected.</p>
    </footer>`
  }
  return `<footer><div><a class="brand brand--footer" href="/"><span class="brand-mark">D</span><span><b>DEALATECORP</b><small>For a better tomorrow</small></span></a><h2>Have an ambitious goal?<br><em>Let’s make it move.</em></h2><a class="text-link" href="mailto:hr@dealatecorp.com">hr@dealatecorp.com</a></div><div class="footer-links">${nav.map(([l,h])=>`<a href="${h}">${l}</a>`).join('')}</div><p class="copyright">© 2026 Dealatecorp. Strategy, creative and performance—connected.</p></footer>`
}

function cta() { return `<section class="cta"><p class="kicker">Your next growth chapter</p><h2>One partner. <em>Every moving part.</em></h2><p>Tell us where the business needs to go. We’ll map the clearest way forward.</p><a class="button button--light interactive-hover" href="mailto:hr@dealatecorp.com"><span>Start a conversation</span><i aria-hidden="true">↗</i></a></section>` }

function clientFeyCards() {
  const center = (clients.length - 1) / 2
  return clients.map((client, index) => {
    const distance = index - center
    return `<span style="--fey-stack-x:${(distance * .7).toFixed(2)}rem;--fey-fan-x:${(distance * 3.15).toFixed(2)}rem;--fey-rotate:${(distance * 1.4).toFixed(2)}deg;--fey-z:${index}"><small>${String(index + 1).padStart(2, '0')}</small><b>${client}</b><i>DC Creative Labs partner</i></span>`
  }).join('')
}

function projectCard([category,title,desc,tags,color]) { return `<article class="project ${color}"><div class="project-art"><span>${title.split(' ').map(x=>x[0]).join('').slice(0,2)}</span></div><p class="kicker">${category}</p><h3>${title}</h3><p>${desc}</p><small>${tags}</small></article>` }

function portfolio() { return `<main><section class="page-intro"><p class="kicker">Selected work</p><h1>Work that moves<br><em>business forward.</em></h1><p>Different sectors. Different constraints. One standard: make the work useful, memorable and measurable.</p></section><section class="portfolio-grid">${work.map(projectCard).join('')}</section>${cta()}</main>` }

function clientsHero() {
  const heroCards = clientHeroMedia.map((src, index) => `<figure class="clients-hero-card">
    <img src="${src}" alt="Client creative showcase image ${index + 1}" loading="${index < 10 ? 'eager' : 'lazy'}" decoding="async">
  </figure>`).join('')
  return `<section class="clients-arc-hero" aria-labelledby="clients-hero-title">
    <div class="clients-arc-panel">
      <div class="clients-arc-copy">
        <p class="clients-hero-pill">Creative work. Real client stories.</p>
      <h1 id="clients-hero-title">Engage Audiences<br>with Stunning Videos</h1>
        <p>Discover the stories, campaigns, and digital experiences we create for the businesses we partner with.</p>
      </div>
      <div class="clients-arc-viewport" aria-label="Auto-scrolling client media row" tabindex="0">
        <div class="clients-arc-track">
          <div class="clients-arc-sequence">${heroCards}</div>
          <div class="clients-arc-sequence" aria-hidden="true">${heroCards}</div>
        </div>
      </div>
      <div class="clients-arc-cta">
        <span class="clients-hero-note clients-hero-note--left" aria-hidden="true">Let’s explore</span>
        <a class="clients-hero-action" href="#featured-media">Explore Our Work</a>
        <button class="clients-arc-toggle" type="button" aria-pressed="false" aria-label="Pause client media movement">Pause</button>
        <span class="clients-hero-note clients-hero-note--right" aria-hidden="true">Elevate your brand</span>
      </div>
    </div>
  </section>`
}

function featuredMediaFrame(media, side, index) {
  if (media.type === 'video') {
    return `<figure class="featured-media-card featured-media-card--${side}">
      <video muted playsinline preload="metadata" poster="${media.poster}" aria-label="${media.label || 'Featured client video'}">
        <source src="${media.src}" type="video/mp4">
      </video>
      <button class="featured-media-mute" type="button" aria-label="Unmute featured video" aria-pressed="true">Muted</button>
    </figure>`
  }
  return `<figure class="featured-media-card featured-media-card--${side}">
    <img src="${media.src}" alt="${media.alt}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async">
  </figure>`
}

function featuredMediaSlide(slide, index) {
  return `<article class="featured-media-slide${index === 0 ? ' is-active' : ''}" data-featured-slide="${index}" aria-hidden="${index === 0 ? 'false' : 'true'}">
    <div class="featured-media-column featured-media-column--left">${featuredMediaFrame(slide.left, 'left', index)}</div>
    <div class="featured-media-copy">
      <p class="kicker">${slide.category}</p>
      <h2>${slide.title.split('\n').join('<br>')}</h2>
      <p>${slide.description}</p>
    </div>
    <div class="featured-media-column featured-media-column--right">${featuredMediaFrame(slide.right, 'right', index)}</div>
  </article>`
}

function featuredMediaCarousel() {
  return `<section id="featured-media" class="featured-media-carousel" aria-label="Featured client media carousel" tabindex="0">
    <div class="featured-media-shell">
      <div class="featured-media-slides">${featuredMediaSlides.map(featuredMediaSlide).join('')}</div>
      <button class="featured-media-arrow featured-media-arrow--prev" type="button" aria-label="Previous featured media">&larr;</button>
      <button class="featured-media-arrow featured-media-arrow--next" type="button" aria-label="Next featured media">&rarr;</button>
      <p class="featured-media-status" aria-live="polite">1 of ${featuredMediaSlides.length}</p>
    </div>
  </section>`
}

function clientBrandCard(client, index) {
  const content = `<span>${String(index + 1).padStart(2, '0')}</span><div class="brand-logo-panel"><img src="${client.logo}" alt="${client.name} logo" loading="lazy" decoding="async"></div><b>${client.name}</b>`
  return client.href
    ? `<a class="client-brand-card" href="${client.href}" aria-label="View ${client.name} case study">${content}</a>`
    : `<article class="client-brand-card">${content}</article>`
}

function clientBrandShowcase() {
  return `<section id="client-brands" class="client-brand-showcase" aria-labelledby="client-brands-title">
    <div class="client-brand-head">
      <p class="kicker">Our Branding</p>
      <h2 id="client-brands-title">Brands we have worked with</h2>
      <p>A curated wall of client identities, preserved in their original colors and presented inside refined glass display cards.</p>
    </div>
    <div class="client-brand-grid">${clientBrands.map(clientBrandCard).join('')}</div>
  </section>`
}

function clientsProjectCta() {
  return `<section class="clients-project-cta">
    <div>
      <p class="kicker">Next collaboration</p>
      <h2>Let’s build your next success story</h2>
      <p>Bring the ambition. We will shape the creative system around it with the same focus, restraint and momentum.</p>
      <a class="button button--light interactive-hover" href="mailto:hr@dealatecorp.com"><span>Start a project</span><i aria-hidden="true">↗</i></a>
    </div>
  </section>`
}

function clientsPage() { return currentClientsPage(featuredMediaCarousel()) }

function adhithyaSaiPromotersPage() {
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=D%20No.%201-168%2F5%2C%20Sanyal%20Villa%2C%20Gopalapatnam%20Main%20Road%2C%20Susarla%20Colony%2C%20Baji%20Junction%2C%20Gopalapatnam%2C%20Visakhapatnam%20530027%2C%20Andhra%20Pradesh%2C%20India'
  return `<main class="adhithya-case">
  <section class="adhithya-hero" aria-labelledby="adhithya-title">
    <video class="adhithya-hero__video" autoplay muted loop playsinline poster="/assets/postors/aditya.png">
      <source src="/clients/videos/aditya.mp4" type="video/mp4">
    </video>
    <div class="adhithya-hero__overlay"></div>
    <div class="adhithya-hero__copy">
      <p class="adhithya-badge">REAL ESTATE · VISAKHAPATNAM</p>
      <h1 id="adhithya-title">Adhithya Sai Promoters</h1>
      <p>Residential opportunities in Visakhapatnam's growing neighbourhoods.</p>
      <div class="adhithya-hero__actions">
        <a class="adhithya-button" href="#adhithya-about">Discover the Company</a>
        <button class="adhithya-video-toggle" type="button" aria-pressed="false" aria-label="Pause hero video">Pause</button>
      </div>
    </div>
  </section>
  <section id="adhithya-about" class="adhithya-about" aria-labelledby="adhithya-about-title">
    <div class="adhithya-about__intro">
      <p class="kicker">ABOUT THE COMPANY</p>
      <h2 id="adhithya-about-title">Residential spaces. Growing possibilities.</h2>
      <div class="adhithya-logo-surface">
        <img src="/assets/logo/adithya sai.jpeg" alt="Adhithya Sai Promoters logo" loading="lazy" decoding="async">
      </div>
      <a class="adhithya-back" href="/clients/">Back to Clients</a>
    </div>
    <div class="adhithya-about__copy">
      <p>Adhithya Sai Promoters, also frequently spelled Aditya Sai Promoters, is a real estate firm based in Visakhapatnam, Andhra Pradesh. The company develops and promotes residential properties, with a focus on growing housing zones across the Visakhapatnam region.</p>
      <p>The company operates from Gopalapatnam, serving property buyers exploring residential opportunities in the northern and western corridors of the city.</p>
    </div>
  </section>
  <section class="adhithya-specialisations" aria-labelledby="adhithya-specialisations-title">
    <div class="adhithya-section-head">
      <p class="kicker">Business specialisations</p>
      <h2 id="adhithya-specialisations-title">Built around residential growth.</h2>
    </div>
    <div class="adhithya-card-grid">
      <article class="adhithya-card adhithya-card--aqua"><span class="adhithya-icon" aria-hidden="true">B</span><h3>Real Estate Promotions</h3><p>Promoting residential property opportunities across the Visakhapatnam region.</p></article>
      <article class="adhithya-card adhithya-card--peach"><span class="adhithya-icon" aria-hidden="true">H</span><h3>Apartment Construction</h3><p>Residential apartment development for homebuyers exploring the city's growing neighbourhoods.</p></article>
      <article class="adhithya-card adhithya-card--gold"><span class="adhithya-icon" aria-hidden="true">L</span><h3>Plot Development</h3><p>Plot development as part of the company's real estate activities.</p></article>
    </div>
  </section>
  <section class="adhithya-offerings" aria-labelledby="adhithya-offerings-title">
    <div class="adhithya-offerings__copy">
      <p class="kicker">Residential offerings</p>
      <h2 id="adhithya-offerings-title">Explore Residential Opportunities</h2>
      <p>The company has marketed premium North- and South-facing residential flats near Parawada, Visakhapatnam.</p>
      <div class="adhithya-pills"><span>North-facing flats</span><span>South-facing flats</span></div>
      <small>Contact the company to confirm current availability and project details.</small>
    </div>
    <div class="adhithya-gallery">${adhithyaGallery.map(item => `<figure><img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async"></figure>`).join('')}</div>
  </section>
  <section class="adhithya-contact" aria-labelledby="adhithya-contact-title">
    <div class="adhithya-contact__icon" aria-hidden="true">+</div>
    <div>
      <p class="kicker">Office Address</p>
      <h2 id="adhithya-contact-title">Gopalapatnam, Visakhapatnam</h2>
      <address>D No. 1-168/5, Sanyal Villa, Gopalapatnam Main Road, Susarla Colony, Baji Junction, Gopalapatnam, Visakhapatnam - 530027, Andhra Pradesh, India.</address>
      <a class="adhithya-map" href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
    </div>
  </section>
</main>`
}

function tirumalasettyPage() { return `<main class="tirumalasetty-case">
  <section class="tirumalasetty-hero" aria-label="Tirumalasetty Projects LLP hero">
    <img src="/assets/th.jpg" alt="Tirumalasetty Projects LLP architectural hero artwork" decoding="async">
  </section>
  <section class="tirumalasetty-intro" aria-labelledby="tirumalasetty-title">
    <div>
      <p class="kicker">About the client</p>
      <h1 id="tirumalasetty-title">Tirumalasetty Projects LLP</h1>
      <p class="tirumalasetty-location">Visakhapatnam, Andhra Pradesh</p>
    </div>
    <div class="tirumalasetty-copy">
      <p>Tirumalasetty Projects LLP is a real estate and construction firm based in Visakhapatnam, Andhra Pradesh. Its residential developments include Lake Front Villas in Sujathanagar, with a focus on contemporary architecture, well-planned layouts, and premium finishes.</p>
      <dl class="tirumalasetty-info">
        <div><dt>Status</dt><dd>Active</dd></div>
        <div><dt>Incorporated</dt><dd>January 28, 2025</dd></div>
        <div><dt>LLPIN</dt><dd>ACL-6552</dd></div>
        <div><dt>Registrar</dt><dd>ROC, Vijayawada</dd></div>
      </dl>
      <article class="tirumalasetty-feature">
        <p class="kicker">Featured Development</p>
        <h2>Lake Front Villas</h2>
        <p>A residential villa project in Sujathanagar, Chinnamushidiwada, Visakhapatnam, featuring contemporary architecture, planned layouts, premium finishes, and North, South, East, and West facing options.</p>
      </article>
      <details class="tirumalasetty-details">
        <summary>Company Details</summary>
        <p><b>Partners:</b> Singamsetty Dharma Theja, Tirumalasetty Hemanth Kumar, Ajitkumar Tirumalasetty, Revathi Tirumalasetty</p>
        <p><b>Registered office:</b> 3rd Floor, Flat No. 303, Srinivasam - 11, Sapthagirinagar, Sujathanagar, Pendurthi, Visakhapatnam, Andhra Pradesh - 530051</p>
        <p><b>Phone:</b> <a href="tel:+916305386699">6305386699</a> / <a href="tel:+919347995152">9347995152</a></p>
      </details>
    </div>
  </section>
  <section class="tirumalasetty-work" aria-labelledby="tirumalasetty-work-title" tabindex="0">
    <div class="tirumalasetty-work__head">
      <p class="kicker">Our work</p>
      <h2 id="tirumalasetty-work-title">Our work for Tirumalasetty</h2>
      <p>A closer look at the creative work developed for Tirumalasetty Projects LLP.</p>
    </div>
    <div class="tirumalasetty-stage" aria-live="polite">
      ${tirumalasettyWork.map((item, index) => `<button class="tirumalasetty-panel tirumalasetty-panel--${index}" type="button" data-tiru-panel="${index}" aria-label="Open Tirumalasetty artwork ${index + 1}">
        <img src="${item.src}" alt="${item.alt}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async">
      </button>`).join('')}
    </div>
    <div class="tirumalasetty-controls">
      <button class="tiru-prev" type="button" aria-label="Previous Tirumalasetty artwork">&larr;</button>
      <span class="tiru-count">01 / 03</span>
      <div class="tiru-dots" aria-label="Tirumalasetty artwork pagination">${tirumalasettyWork.map((_, index) => `<button type="button" data-tiru-dot="${index}" aria-label="Show artwork ${index + 1}" ${index === 0 ? 'aria-current="true"' : ''}></button>`).join('')}</div>
      <button class="tiru-next" type="button" aria-label="Next Tirumalasetty artwork">&rarr;</button>
       <button class="tiru-toggle" type="button" aria-pressed="false">Pause</button>
    </div>
    <div class="tiru-lightbox" role="dialog" aria-modal="true" aria-label="Tirumalasetty artwork preview" hidden>
      <button class="tiru-lightbox-close" type="button" aria-label="Close artwork preview">&times;</button>
      <button class="tiru-lightbox-prev" type="button" aria-label="Previous artwork">&larr;</button>
      <img src="${tirumalasettyWork[0].src}" alt="${tirumalasettyWork[0].alt}">
      <button class="tiru-lightbox-next" type="button" aria-label="Next artwork">&rarr;</button>
    </div>
  </section>
</main>` }

function about() { return `<main><section class="page-intro"><p class="kicker">About Dealatecorp</p><h1>Built for the gap between<br><em>ideas and outcomes.</em></h1><p>We are an independent growth partner in Hyderabad, bringing business thinking and digital craft under one roof.</p></section><section class="about-manifesto"><div class="about-number">D<span>→</span></div><div><p class="kicker">Our point of view</p><h2>Clarity is the beginning of good growth.</h2><p>More activity is rarely the answer. Better alignment is. We help teams decide what matters, build it with care, and learn quickly from what the market says next.</p><p>That means fewer disconnected campaigns, fewer vanity reports and more useful conversations about customers, conversion and long-term brand value.</p></div></section><section class="values"><article><span>01</span><h3>Think commercially</h3><p>Creative work must understand the business it serves.</p></article><article><span>02</span><h3>Make with care</h3><p>Details shape trust before a sales conversation begins.</p></article><article><span>03</span><h3>Measure honestly</h3><p>Good reporting explains what changed and what to do next.</p></article></section>${cta()}</main>` }

const pages = {'/':home, '/services':services, '/portfolio':portfolio, '/clients':clientsPage, '/clients/adhithya-sai-promoters':adhithyaSaiPromotersPage, '/clients/adithya-sai-promoters':adhithyaSaiPromotersPage, '/clients/tirumalasetty':tirumalasettyPage, '/about':about}
document.querySelector('#app').innerHTML = `${header()}${(pages[path] || home)()}${footer()}`
document.body.classList.toggle('is-clients-page', path === '/clients')
document.body.classList.toggle('is-adhithya-page', path === '/clients/adhithya-sai-promoters' || path === '/clients/adithya-sai-promoters')
document.body.classList.toggle('is-tirumalasetty-page', path === '/clients/tirumalasetty')

const scrollToCurrentHash = () => {
  if (!location.hash) return
  requestAnimationFrame(() => {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)))
    if (target) target.scrollIntoView({ block: 'start' })
  })
}
scrollToCurrentHash()
window.addEventListener('load', () => setTimeout(scrollToCurrentHash, 80))

const menu = document.querySelector('.menu')
menu.addEventListener('click', () => { const open = document.body.classList.toggle('nav-open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation') })
document.addEventListener('keydown', event => { if(event.key === 'Escape' && document.body.classList.contains('nav-open')) {document.body.classList.remove('nav-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.focus()} })
document.querySelectorAll('.site-header nav a').forEach(link => link.addEventListener('click', () => {document.body.classList.remove('nav-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation')}))

const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target) } }), {threshold:.12})
document.querySelectorAll('body:not(.home-page) main section, .project, .layer').forEach(el => { el.classList.add('reveal'); reveal.observe(el) })

const adhithyaHero = document.querySelector('.adhithya-hero')
if (adhithyaHero) {
  const video = adhithyaHero.querySelector('video')
  const toggle = adhithyaHero.querySelector('.adhithya-video-toggle')
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  const setPaused = (paused) => {
    if (paused) video.pause()
    else video.play().catch(() => {})
    toggle.textContent = paused ? 'Play' : 'Pause'
    toggle.setAttribute('aria-pressed', String(paused))
    toggle.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} hero video`)
  }
  toggle.addEventListener('click', () => setPaused(!video.paused))
  if (motionQuery.matches) setPaused(true)
  motionQuery.addEventListener('change', event => setPaused(event.matches))
}

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

const featuredCarousel = document.querySelector('.featured-media-carousel')
if (featuredCarousel) {
  const slides = [...featuredCarousel.querySelectorAll('.featured-media-slide')]
  const status = featuredCarousel.querySelector('.featured-media-status')
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let activeFeatured = 0
  let touchStartX = 0
  let touchStartY = 0

  const setFeaturedVideos = () => {
    const carouselRect = featuredCarousel.getBoundingClientRect()
    const visibleHeight = Math.min(carouselRect.bottom, window.innerHeight) - Math.max(carouselRect.top, 0)
    const carouselVisible = Math.max(0, visibleHeight) / Math.max(1, carouselRect.height) > .18
    slides.forEach((slide, index) => {
      slide.querySelectorAll('video').forEach(video => {
        if (index === activeFeatured && carouselVisible && !motionQuery.matches) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      })
    })
  }
  const showFeatured = (nextIndex) => {
    activeFeatured = (nextIndex + slides.length) % slides.length
    slides.forEach((slide, index) => {
      const active = index === activeFeatured
      slide.classList.toggle('is-active', active)
      slide.setAttribute('aria-hidden', String(!active))
    })
    status.textContent = `${activeFeatured + 1} of ${slides.length}`
    setFeaturedVideos()
  }

  featuredCarousel.querySelector('.featured-media-arrow--prev').addEventListener('click', () => showFeatured(activeFeatured - 1))
  featuredCarousel.querySelector('.featured-media-arrow--next').addEventListener('click', () => showFeatured(activeFeatured + 1))
  featuredCarousel.addEventListener('keydown', event => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    showFeatured(activeFeatured + (event.key === 'ArrowRight' ? 1 : -1))
  })
  featuredCarousel.addEventListener('touchstart', event => {
    const touch = event.changedTouches[0]
    touchStartX = touch.clientX
    touchStartY = touch.clientY
  }, { passive: true })
  featuredCarousel.addEventListener('touchend', event => {
    const touch = event.changedTouches[0]
    const dx = touch.clientX - touchStartX
    const dy = touch.clientY - touchStartY
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) showFeatured(activeFeatured + (dx < 0 ? 1 : -1))
  }, { passive: true })
  featuredCarousel.querySelectorAll('.featured-media-mute').forEach(button => {
    const video = button.closest('.featured-media-card').querySelector('video')
    button.addEventListener('click', () => {
      video.muted = !video.muted
      button.textContent = video.muted ? 'Muted' : 'Sound on'
      button.setAttribute('aria-pressed', String(video.muted))
      button.setAttribute('aria-label', `${video.muted ? 'Unmute' : 'Mute'} featured video`)
      if (!video.paused) video.play().catch(() => {})
    })
  })
  motionQuery.addEventListener('change', setFeaturedVideos)
  window.addEventListener('scroll', setFeaturedVideos, { passive: true })
  window.addEventListener('resize', setFeaturedVideos)
  setFeaturedVideos()
}

const clientsArcHero = document.querySelector('.clients-arc-hero')
if (clientsArcHero) {
  const viewport = clientsArcHero.querySelector('.clients-arc-viewport')
  const track = clientsArcHero.querySelector('.clients-arc-track')
  const sequence = clientsArcHero.querySelector('.clients-arc-sequence')
  const toggle = clientsArcHero.querySelector('.clients-arc-toggle')
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let userPaused = false

  const setCarouselDuration = () => {
    if (!sequence || !track) return
    const duration = Math.max(24, sequence.scrollWidth / 35)
    track.style.setProperty('--clients-marquee-duration', `${duration}s`)
  }
  const setCarouselState = () => {
    const paused = userPaused || motionQuery.matches
    clientsArcHero.classList.toggle('is-marquee-paused', paused)
    toggle.textContent = paused ? 'Resume' : 'Pause'
    toggle.setAttribute('aria-pressed', String(userPaused))
    toggle.setAttribute('aria-label', `${paused ? 'Resume' : 'Pause'} client media carousel`)
  }

  toggle.addEventListener('click', () => {
    userPaused = !userPaused
    setCarouselState()
  })
  sequence.querySelectorAll('img, video').forEach(media => {
    media.addEventListener('load', setCarouselDuration, { once: true })
    media.addEventListener('loadedmetadata', setCarouselDuration, { once: true })
  })
  window.addEventListener('resize', setCarouselDuration)
  motionQuery.addEventListener('change', setCarouselState)
  setCarouselDuration()
  setCarouselState()
}

const tiruWork = document.querySelector('.tirumalasetty-work')
if (tiruWork) {
  const panels = [...tiruWork.querySelectorAll('.tirumalasetty-panel')]
  const dots = [...tiruWork.querySelectorAll('[data-tiru-dot]')]
  const count = tiruWork.querySelector('.tiru-count')
  const lightbox = tiruWork.querySelector('.tiru-lightbox')
  const lightboxImg = lightbox.querySelector('img')
  let activeTiru = 0
  let lastFocus = null
  let touchStartX = 0
  let touchStartY = 0
  let autoTiru = null
  let tiruPaused = false
  let tiruVisible = false
  const autoplayToggle = tiruWork.querySelector('.tiru-toggle')
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

  const setTiru = (index) => {
    activeTiru = (index + panels.length) % panels.length
    panels.forEach((panel, panelIndex) => {
      const offset = (panelIndex - activeTiru + panels.length) % panels.length
      panel.dataset.position = offset === 0 ? 'active' : offset === 1 ? 'next' : 'prev'
      panel.setAttribute('aria-pressed', String(panelIndex === activeTiru))
    })
    dots.forEach((dot, dotIndex) => {
      if (dotIndex === activeTiru) dot.setAttribute('aria-current', 'true')
      else dot.removeAttribute('aria-current')
    })
    count.textContent = `${String(activeTiru + 1).padStart(2, '0')} / ${String(panels.length).padStart(2, '0')}`
    lightboxImg.src = tirumalasettyWork[activeTiru].src
    lightboxImg.alt = tirumalasettyWork[activeTiru].alt
  }
  const stopTiruAuto = () => {
    if (autoTiru) window.clearInterval(autoTiru)
    autoTiru = null
  }
  const startTiruAuto = () => {
    stopTiruAuto()
    if (motionQuery.matches || tiruPaused || !tiruVisible || document.hidden) return
    autoTiru = window.setInterval(() => {
      if (!lightbox.hidden) return
      setTiru(activeTiru + 1)
    }, 2200)
  }
  const openTiruLightbox = (index, trigger) => {
    lastFocus = trigger
    stopTiruAuto()
    setTiru(index)
    lightbox.hidden = false
    document.body.classList.add('lightbox-open')
    lightbox.querySelector('.tiru-lightbox-close').focus()
  }
  const closeTiruLightbox = () => {
    lightbox.hidden = true
    document.body.classList.remove('lightbox-open')
    if (lastFocus) lastFocus.focus()
    startTiruAuto()
  }

  tiruWork.querySelector('.tiru-prev').addEventListener('click', () => setTiru(activeTiru - 1))
  tiruWork.querySelector('.tiru-next').addEventListener('click', () => setTiru(activeTiru + 1))
  dots.forEach(dot => dot.addEventListener('click', () => setTiru(Number(dot.dataset.tiruDot))))
  panels.forEach(panel => panel.addEventListener('click', () => openTiruLightbox(Number(panel.dataset.tiruPanel), panel)))
  tiruWork.addEventListener('keydown', event => {
    if (!lightbox.hidden) return
    if (event.key === 'ArrowRight') { event.preventDefault(); setTiru(activeTiru + 1) }
    if (event.key === 'ArrowLeft') { event.preventDefault(); setTiru(activeTiru - 1) }
  })
  tiruWork.addEventListener('touchstart', event => {
    stopTiruAuto()
    const touch = event.changedTouches[0]
    touchStartX = touch.clientX
    touchStartY = touch.clientY
  }, { passive: true })
  tiruWork.addEventListener('touchend', event => {
    const touch = event.changedTouches[0]
    const dx = touch.clientX - touchStartX
    const dy = touch.clientY - touchStartY
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) setTiru(activeTiru + (dx < 0 ? 1 : -1))
    startTiruAuto()
  }, { passive: true })
  lightbox.querySelector('.tiru-lightbox-close').addEventListener('click', closeTiruLightbox)
  lightbox.querySelector('.tiru-lightbox-prev').addEventListener('click', () => setTiru(activeTiru - 1))
  lightbox.querySelector('.tiru-lightbox-next').addEventListener('click', () => setTiru(activeTiru + 1))
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeTiruLightbox() })
  document.addEventListener('keydown', event => {
    if (lightbox.hidden) return
    if (event.key === 'Escape') closeTiruLightbox()
    if (event.key === 'ArrowRight') setTiru(activeTiru + 1)
    if (event.key === 'ArrowLeft') setTiru(activeTiru - 1)
    if (event.key === 'Tab') {
      const focusable = [...lightbox.querySelectorAll('button')]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
  })
  motionQuery.addEventListener('change', startTiruAuto)
  autoplayToggle.addEventListener('click', () => {
    tiruPaused = !tiruPaused
    autoplayToggle.textContent = tiruPaused ? 'Play' : 'Pause'
    autoplayToggle.setAttribute('aria-pressed', String(tiruPaused))
    startTiruAuto()
  })
  const artworkVisibility = new IntersectionObserver(entries => {
    tiruVisible = entries[0].isIntersecting
    startTiruAuto()
  })
  artworkVisibility.observe(tiruWork)
  document.addEventListener('visibilitychange', startTiruAuto)
  setTiru(0)
  startTiruAuto()
}

const siteHeader = document.querySelector('.site-header')
const updateHeader = () => siteHeader.classList.toggle('site-header--scrolled', window.scrollY > 24)
updateHeader()
window.addEventListener('scroll', updateHeader, { passive: true })

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = window.matchMedia('(pointer: fine)').matches

if (!usesEditorialTheme && !reducedMotion && finePointer) {
  const aura = document.createElement('div')
  aura.className = 'pointer-aura'
  document.body.append(aura)
  const cursorDot = document.createElement('div')
  const cursorRing = document.createElement('div')
  cursorDot.className = 'smooth-cursor smooth-cursor--dot'
  cursorRing.className = 'smooth-cursor smooth-cursor--ring'
  document.body.append(cursorDot, cursorRing)
  let targetX = -40
  let targetY = -40
  let ringX = -40
  let ringY = -40
  const animateCursor = () => {
    ringX += (targetX - ringX) * .16
    ringY += (targetY - ringY) * .16
    cursorDot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
    requestAnimationFrame(animateCursor)
  }
  animateCursor()
  window.addEventListener('pointermove', (event) => {
    targetX = event.clientX
    targetY = event.clientY
    aura.style.setProperty('--pointer-x', `${event.clientX}px`)
    aura.style.setProperty('--pointer-y', `${event.clientY}px`)
    aura.classList.add('pointer-aura--visible')
    cursorDot.classList.add('smooth-cursor--visible')
    cursorRing.classList.add('smooth-cursor--visible')
  }, { passive: true })
  document.addEventListener('pointerover', event => {
    const interactive = event.target.closest('a, button, [tabindex="0"]')
    cursorRing.classList.toggle('smooth-cursor--interactive', Boolean(interactive))
  })
  document.addEventListener('pointerleave', () => {
    cursorDot.classList.remove('smooth-cursor--visible')
    cursorRing.classList.remove('smooth-cursor--visible')
  })

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

const reelVideo = document.querySelector('#dc-reel-video')
const reelAudio = document.querySelector('#dc-reel-audio')
if (reelVideo && reelAudio) {
  reelAudio.addEventListener('click', () => {
    reelVideo.muted = !reelVideo.muted
    reelAudio.textContent = reelVideo.muted ? '⌁' : '♪'
    reelAudio.setAttribute('aria-label', reelVideo.muted ? 'Unmute video sound' : 'Mute video sound')
    reelAudio.setAttribute('aria-pressed', String(!reelVideo.muted))
  })
}


if (path === '/') initHome()
if (path === '/services') initServices()
if (path === '/clients') initClients()
