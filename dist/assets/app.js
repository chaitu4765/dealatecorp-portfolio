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

const clients = ['Adhithya Sai Promoters', 'Spark', 'Sree Surya Infra', 'Ganesh Constructions', 'Sri Conventions', 'Sri Parasakthi Peetam', 'SSM', 'SV Constructions', 'Tirumalsetty', 'UBIC']

const clientBrands = [
  { name: 'Ganesh Constructions', logo: '/assets/logo/ganesh.jpeg', href: '/clients/ganesh-constructions/' },
  { name: 'Tirumalasetty Projects LLP', logo: '/assets/logo/tirumalsetty.jpeg', href: '/clients/tirumalasetty/' },
  { name: 'Sri Parasakthi Peetam', logo: '/assets/logo/sri-parasakthi-peetam.png', href: '/clients/sri-parasakthi-peetam/' },
  { name: 'Sri Venkateswara Constructions', logo: '/assets/logo/sv-constructions.png', href: '/clients/sri-venkateswara-constructions/' },
  { name: 'Sri Conventions', logo: '/assets/logo/sri-conventions (1).png', href: '/clients/sri-conventions/' },
  { name: 'Sree Surya Infra', logo: '/assets/logo/sree surya.jpeg', href: '/clients/sree-surya-infra/' },
  { name: 'SSM', logo: '/assets/logo/ssm.jpeg', href: '/clients/ssm-construction/' },
  { name: 'Adhithya Sai Promoters', logo: '/assets/logo/adithya sai.jpeg', href: '/clients/adhithya-sai-promoters/' },
  { name: 'UBIC', logo: '/assets/logo/UBIC_Primary_Square(Black).png', href: '/clients/ubic/' },
  { name: 'Spark', logo: '/assets/logo/spark-clinic.png', href: '/clients/spark/' }
]

const tirumalasettyWork = [
  { src: '/assets/postors/ts2.jpg', alt: 'Tirumalasetty Projects LLP creative work - TS2 artwork' },
  { src: '/assets/postors/ts1.jpg', alt: 'Tirumalasetty Projects LLP creative work - TS1 artwork' },
  { src: '/assets/postors/tg.png', alt: 'Tirumalasetty Projects LLP creative work - TG artwork' },
  { src: '/assets/poster2/tsin.jpeg', alt: 'Tirumalasetty Projects LLP creative work - TSIN artwork' }
]

const adhithyaGallery = [
  { src: '/assets/postors/aditya.png', alt: 'Adhithya Sai Promoters residential property creative' },
  { src: '/assets/logo/adithya sai.jpeg', alt: 'Adhithya Sai Promoters brand mark' }
]

const sparkHero = '/assets/logo/sph.png'
const sparkWebsite = 'https://ssdental-six.vercel.app/'
const sparkPosters = [
  { src: '/assets/poster2/sp1.jpg', alt: 'Spark creative poster 01' },
  { src: '/assets/poster2/sp2.jpg', alt: 'Spark creative poster 02' },
  { src: '/assets/poster2/sp3.jpg', alt: 'Spark creative poster 03' },
  { src: '/assets/poster2/sp4.jpg', alt: 'Spark creative poster 04' },
  { src: '/assets/poster2/sp5.jpg', alt: 'Spark creative poster 05' },
  { src: '/assets/poster2/sp6.jpg', alt: 'Spark creative poster 06' }
]
const sparkVideos = [
  { src: '/clients/videos/spark1.mp4', label: 'Spark video 01' },
  { src: '/clients/videos/spark2.mp4', label: 'Spark video 02' },
  { src: '/clients/videos/spark3.mp4', label: 'Spark video 03' },
  { src: '/clients/videos/spark4.mp4', label: 'Spark video 04' }
]

const sreeSuryaHero = '/assets/poster2/sree surya.png'
const sreeSuryaWork = [
  { type: 'video', src: '/clients/videos/sri surya.mp4', poster: '/assets/postors/sg.png', label: 'Sree Surya Infra campaign video' },
  { type: 'video', src: '/clients/videos/sri surya.mp4', poster: '/assets/postors/sg.png', label: 'Sree Surya Infra campaign video' }
]

const ganeshHero = '/assets/poster2/ganeshhome.png'
const ganeshWebsite = 'https://ganesh-constructionsweb-w331.vercel.app/'
const ganeshCampaigns = [
  { src: '/assets/postors/gr.jpg', alt: 'Ganesh Constructions promotional artwork' },
  { src: '/assets/postors/go.jpg', alt: 'Ganesh Constructions real estate visual artwork' },
  { src: '/assets/postors/gk.jpg', alt: 'Ganesh Constructions campaign post artwork' },
  { src: '/assets/postors/gj.jpg', alt: 'Ganesh Constructions social creative artwork' },
  { src: '/assets/postors/gin.jpg', alt: 'Ganesh Constructions announcement artwork' },
  { src: '/assets/postors/gi.jpg', alt: 'Ganesh Constructions property promotion artwork' },
  { src: '/assets/postors/gguru.jpg', alt: 'Ganesh Constructions festival campaign artwork' },
  { src: '/assets/postors/ganesh.jpg', alt: 'Ganesh Constructions brand campaign artwork' },
  { src: '/assets/postors/g.jpg', alt: 'Ganesh Constructions campaign creative artwork' }
]

const sriConventionsHero = '/assets/poster2/schero.png'
const sriConventionsWork = [
  { type: 'image', src: '/assets/poster2/sc2.jpg', alt: 'Sri Convention creative work 01', ratio: '1.5' },
  { type: 'image', src: '/assets/poster2/sc3.jpg', alt: 'Sri Convention creative work 02', ratio: '.8' },
  { type: 'video', src: '/assets/poster2/sc4.mp4', alt: 'Sri Convention creative video 03', ratio: '.8' },
  { type: 'image', src: '/assets/poster2/sc5.jpg', alt: 'Sri Convention creative work 04', ratio: '.6625' }
]

const ubicHero = '/assets/poster2/ubich.png'

const parasakthiHero = '/assets/poster2/sp12.png'
const parasakthiWebsite = 'https://www.sriparasakthipeetam.com/'
const svcHero = '/assets/poster2/svc.png'
const svcWebsite = 'https://visionary-builds-iyhh.vercel.app/'
const svcWork = [
  { src: '/assets/postors/svc1.jpg', alt: 'Sri Venkateswara Constructions showcase artwork 1' },
  { src: '/assets/postors/svc2.jpg', alt: 'Sri Venkateswara Constructions showcase artwork 2' },
  { src: '/assets/postors/svc3.jpg', alt: 'Sri Venkateswara Constructions showcase artwork 3' },
  { src: '/assets/postors/svc4.jpg', alt: 'Sri Venkateswara Constructions showcase artwork 4' }
]
const ssmVideo = '/clients/videos/ssm video.mp4'
const ssmWorkVideo = '/clients/videos/ssm.mp4'
const ssmPoster = '/assets/postors/ssmg.png'

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
    title: 'Launch\nSection',
    description: 'Reveal-led client creatives arranged as a polished first showcase after the hero, using the campaign media already in the project.',
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
    description: 'Client campaign images with calm cropping, premium spacing, and clear visual rhythm.',
    left: { type: 'image', src: '/assets/poster2/plan.jpeg', alt: 'Campaign planning creative' },
    right: { type: 'image', src: '/assets/poster2/saree.jpg', alt: 'Saree client creative' }
  },
  {
    category: 'Brand moments',
    title: 'Premium\nPresence',
    description: 'A composed set of client visuals for social-first browsing without placeholder claims or invented results.',
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
    description: 'Client social images arranged for clear viewing, easy navigation, and a warm editorial feel.',
    left: { type: 'image', src: '/assets/poster2/open.jpeg', alt: 'Open campaign creative' },
    right: { type: 'image', src: '/assets/postors/dg.png', alt: 'DG client creative' }
  },
  {
    category: 'Festival campaigns',
    title: 'Ganesh\nStories',
    description: 'Festive and brand-forward client creatives presented as premium carousel pieces.',
    left: { type: 'image', src: '/assets/postors/g.jpg', alt: 'Ganesh client campaign creative' },
    right: { type: 'image', src: '/assets/postors/gguru.jpg', alt: 'Ganesh Guru client creative' }
  },
  {
    category: 'Creative series',
    title: 'Social\nSequences',
    description: 'A set of existing client creatives grouped for repeated browsing without stretching the artwork.',
    left: { type: 'image', src: '/assets/postors/gi.jpg', alt: 'GI client creative' },
    right: { type: 'image', src: '/assets/postors/gin.jpg', alt: 'GIN client creative' }
  },
  {
    category: 'Client posts',
    title: 'Graphic\nCampaigns',
    description: 'Concise campaign frames that keep subjects centered and the layout balanced.',
    left: { type: 'image', src: '/assets/postors/gj.jpg', alt: 'GJ client creative' },
    right: { type: 'image', src: '/assets/postors/gk.jpg', alt: 'GK client creative' }
  },
  {
    category: 'Content sets',
    title: 'Recall\nFrames',
    description: 'Additional client media cards for campaign continuity and brand recall.',
    left: { type: 'image', src: '/assets/postors/go.jpg', alt: 'GO client creative' },
    right: { type: 'image', src: '/assets/postors/gr.jpg', alt: 'GR client creative' }
  },
  {
    category: 'Brand library',
    title: 'Client\nCreatives',
    description: 'Existing brand media from Sree Surya, SSM, Tirumalsetty, and related campaign assets.',
    left: { type: 'image', src: '/assets/postors/sg.png', alt: 'Sree Surya client creative' },
    right: { type: 'image', src: '/assets/postors/ssmg.png', alt: 'SSM client creative' }
  },
  {
    category: 'Portfolio media',
    title: 'Campaign\nDetails',
    description: 'Supporting campaign pieces kept sharp, consistent, and easy to update.',
    left: { type: 'image', src: '/assets/postors/tg.png', alt: 'TG client creative' },
    right: { type: 'image', src: '/assets/postors/ts2.jpg', alt: 'Tirumalsetty client creative' }
  }
]

const clientCampaignRevealMedia = [
  { type: 'image', src: '/assets/postors/ganesh.jpg', alt: 'Ganesh campaign creative' },
  { type: 'image', src: '/assets/poster2/intrior.jpg', alt: 'Interior campaign creative' },
  { type: 'image', src: '/assets/poster2/jew.jpg', alt: 'Jewellery campaign creative' },
  { type: 'image', src: '/assets/poster2/j2.jpeg', alt: 'Jewellery launch campaign creative' },
  { type: 'image', src: '/assets/poster2/lux.jpeg', alt: 'Luxury campaign creative' },
  { type: 'image', src: '/assets/poster2/plan.jpeg', alt: 'Planning campaign creative' },
  { type: 'image', src: '/assets/poster2/saree.jpg', alt: 'Saree campaign creative' },
  { type: 'image', src: '/assets/poster2/cut.jpeg', alt: 'Cut campaign creative' }
]

const clientCampaignRevealSlides = [
  {
    category: 'Campaign reveals',
    title: 'Launch\nSection',
    description: 'Reveal-led client creatives arranged as a polished first showcase after the hero.',
    left: clientCampaignRevealMedia[0],
    right: clientCampaignRevealMedia[1]
  },
  {
    category: 'Campaign reveals',
    title: 'Creative\nDetails',
    description: 'Jewellery-led campaign visuals staged with refined spacing and clean poster motion.',
    left: clientCampaignRevealMedia[2],
    right: clientCampaignRevealMedia[3]
  },
  {
    category: 'Campaign reveals',
    title: 'Premium\nMoments',
    description: 'Luxury and planning creatives presented as a focused visual reveal.',
    left: clientCampaignRevealMedia[4],
    right: clientCampaignRevealMedia[5]
  },
  {
    category: 'Campaign reveals',
    title: 'Social\nStories',
    description: 'Fashion and campaign cut visuals preserved as complete poster artwork.',
    left: clientCampaignRevealMedia[6],
    right: clientCampaignRevealMedia[7]
  }
]

const clientsShowcaseArtworks = clientCampaignRevealMedia
  .filter(media => media && media.type === 'image')

function header() {
  return `<header class="site-header"><a class="brand" href="/" aria-label="Dealatecorp home"><span class="brand-mark">D</span><span><b>DEALATECORP</b><small>For a better tomorrow</small></span></a><button class="menu" aria-label="Open navigation" aria-expanded="false"><i></i><i></i></button><nav>${nav.map(([label, href]) => `<a href="${href}" ${path === href.replace(/\/$/, '') || (path === '/' && href === '/') ? 'aria-current="page"' : ''}>${label}</a>`).join('')}<a class="nav-cta interactive-hover" href="mailto:hello@dealatecorp.com"><span>Start a project</span><i aria-hidden="true">↗</i></a></nav></header>`
}

function footer() {
  if (path === '/clients/tirumalasetty') {
    const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=3rd%20Floor%2C%20Flat%20No.%20303%2C%20Srinivasam%20-%2011%2C%20Sapthagirinagar%2C%20Sujathanagar%2C%20Pendurthi%2C%20Visakhapatnam%2C%20Andhra%20Pradesh%20530051'
    return `<footer class="tirumalasetty-footer-card">
      <div class="tirumalasetty-footer-main">
        <a class="brand brand--footer" href="/"><span class="brand-mark">D</span><span><b>DEALATECORP</b><small>For a better tomorrow</small></span></a>
        <h2>Let's shape the next<br><em>property story.</em></h2>
        <p>Planning a launch, campaign, or branded real estate experience? We can help turn the location, vision, and project details into a clear digital presence.</p>
        <a class="button interactive-hover" href="mailto:hello@dealatecorp.com"><span>Start a project</span><i aria-hidden="true">-&gt;</i></a>
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
      <div class="featured-media-slides">${clientCampaignRevealSlides.map(featuredMediaSlide).join('')}</div>
      <button class="featured-media-arrow featured-media-arrow--prev" type="button" aria-label="Previous featured media">&larr;</button>
      <button class="featured-media-arrow featured-media-arrow--next" type="button" aria-label="Next featured media">&rarr;</button>
      <p class="featured-media-status" aria-live="polite">1 of ${clientCampaignRevealSlides.length}</p>
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
      <a class="button button--light interactive-hover" href="mailto:hello@dealatecorp.com"><span>Start a project</span><i aria-hidden="true">↗</i></a>
    </div>
  </section>`
}

function clientsPage() { return `<main><div id="clients-react-root">${clientsHero()}${featuredMediaCarousel()}${clientBrandShowcase()}${clientsProjectCta()}</div></main>` }

function clientsHero() {
  const total = clientsShowcaseArtworks.length
  const heroCards = clientsShowcaseArtworks.map((media, index) => `<figure class="clients-artwork-card${index === 0 ? ' is-active' : ''}" data-clients-art="${index}" aria-hidden="${index === 0 ? 'false' : 'true'}">
    <img src="${media.src}" alt="${media.alt || `Client creative artwork ${index + 1}`}" loading="${index < 5 ? 'eager' : 'lazy'}" decoding="async">
  </figure>`).join('')
  return `<section class="clients-editorial-hero" aria-labelledby="clients-hero-title">
    <div class="clients-artwork-carousel" data-clients-art-carousel tabindex="0" aria-label="Selected creative artwork carousel">
      <div class="clients-artwork-track">${heroCards}</div>
    </div>
    <div class="clients-artwork-footer">
      <p class="clients-artwork-count">SELECTED CREATIVE / <span data-clients-art-count>01 &mdash; ${String(total).padStart(2, '0')}</span></p>
      <a class="clients-hero-action" href="#client-brands">Explore Our Work <span aria-hidden="true">-&gt;</span></a>
      <div class="clients-artwork-controls" aria-label="Artwork carousel controls">
        <button type="button" data-clients-art-prev aria-label="Previous artwork">&larr;</button>
        <button type="button" data-clients-art-toggle aria-label="Pause artwork carousel" aria-pressed="false">Pause</button>
        <button type="button" data-clients-art-next aria-label="Next artwork">&rarr;</button>
      </div>
    </div>
  </section>`
}

function clientBrandCard(client, index) {
  const content = `<span class="client-brand-index">${String(index + 1).padStart(2, '0')}</span><i class="client-brand-arrow" aria-hidden="true">↗</i><div class="brand-logo-panel"><img src="${client.logo}" alt="${client.name} logo" loading="lazy" decoding="async"></div><b>${client.name}</b>`
  return client.href
    ? `<a class="client-brand-card" href="${client.href}" aria-label="View ${client.name} case study">${content}</a>`
    : `<article class="client-brand-card">${content}</article>`
}

function clientBrandShowcase() {
  return `<section id="client-brands" class="client-brand-showcase" aria-labelledby="client-brands-title">
    <div class="client-brand-transition" aria-hidden="true"><span></span><p>OUR CLIENTS</p><span></span></div>
    <div class="client-brand-head">
      <div>
        <p class="kicker">OUR BRANDING</p>
        <h2 id="client-brands-title">Brands we have<br>worked with</h2>
      </div>
      <div class="client-brand-copy">
        <p class="client-brand-count">SELECTED CLIENTS / ${clientBrands.length}</p>
        <p>A curated wall of client identities, preserved in their original colors.</p>
      </div>
    </div>
    <div class="client-brand-grid">${clientBrands.map(clientBrandCard).join('')}</div>
    <div class="client-brand-foot"><p>EXPLORE THE BRANDS BEHIND OUR WORK</p><span></span></div>
  </section>`
}

function clientsPage() { return `<main><div id="clients-react-root">${clientsHero()}${featuredMediaCarousel()}${clientBrandShowcase()}</div></main>` }

function sparkClientPage() {
  const posterItems = sparkPosters.map((poster, index) => `<button class="spark-poster" type="button" data-spark-poster="${index}" aria-label="Open Poster ${String(index + 1).padStart(2, '0')}">
      <img src="${poster.src}" alt="${poster.alt}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async">
    </button>`).join('')
  const videoContent = sparkVideos.length
    ? `<div class="spark-runway" aria-label="Spark video phone frames">${sparkVideos.map((video, index) => `<div class="spark-phone-frame ${index === 0 ? 'is-active' : ''}" data-spark-video-thumb="${index}" tabindex="0" aria-label="${video.label || `Spark video ${index + 1}`}" ${index === 0 ? 'aria-current="true"' : ''}>
        <span class="spark-phone-notch" aria-hidden="true"></span>
        <video data-spark-video="${index}" autoplay muted loop playsinline preload="metadata" aria-label="${video.label || `Spark video ${index + 1}`}"><source src="${video.src}" type="video/mp4"></video>
        <span class="spark-video-controls" aria-label="Video controls">
          <button class="spark-video-play" type="button" aria-label="Pause ${video.label || `Spark video ${index + 1}`}" aria-pressed="false">Pause</button>
          <button class="spark-video-sound" type="button" aria-label="Turn sound on for ${video.label || `Spark video ${index + 1}`}" aria-pressed="true">Sound off</button>
        </span>
      </div>`).join('')}</div>`
    : `<div class="spark-video-empty"><p class="kicker">02 - Videos</p><h3>Video showcase coming soon</h3><p>No Spark videos were found in the existing assets, so this gallery is ready without loading broken media.</p></div>`

  return `<main class="spark-case">
    <section class="spark-hero" aria-label="Spark hero artwork">
      <img src="${sparkHero}" alt="Spark Dental Hospital hero artwork with dental, skin, and hair-care illustrations" decoding="async">
    </section>
    <section class="spark-overlap-wrap" aria-labelledby="spark-title">
      <div class="spark-description-card" data-spark-overlap-card>
        <div class="spark-description-card__left">
          <p class="kicker">ABOUT THE CLIENT</p>
          <h1 id="spark-title" class="client-about-logo-heading"><img src="/assets/logo/spark-clinic.png" alt="Spark logo" loading="eager" decoding="async"></h1>
          <p>Chodavaram, Andhra Pradesh</p>
          <span aria-hidden="true"></span>
        </div>
        <div class="spark-description-card__right">
          <p>Spark Dental Hospital is a dental clinic located in Chodavaram, Andhra Pradesh, offering specialised services including Root Canal Treatments (RCT) and Laser Dentistry. Established in 2010, the clinic serves the local community with dental care.</p>
        </div>
      </div>
    </section>
    <section class="spark-work" aria-labelledby="spark-work-title">
      <div class="spark-work__head">
        <p class="kicker">Our work</p>
        <h2 id="spark-work-title">Our work</h2>
      </div>
      <section class="spark-work-section spark-posters-section" aria-labelledby="spark-posters-title">
        <div class="spark-section-label"><b></b><p id="spark-posters-title">Posters</p></div>
        <div class="spark-poster-carousel" tabindex="0" aria-label="Spark poster carousel">
          <div class="spark-poster-stage" aria-live="polite">${posterItems}</div>
          <div class="spark-poster-controls">
            <button class="spark-poster-prev" type="button" aria-label="Previous Spark poster">&larr;</button>
            <div class="spark-poster-dots" aria-label="Poster pagination">${sparkPosters.map((_, index) => `<button type="button" data-spark-dot="${index}" aria-label="Show Poster ${String(index + 1).padStart(2, '0')}" ${index === 0 ? 'aria-current="true"' : ''}></button>`).join('')}</div>
            <button class="spark-poster-next" type="button" aria-label="Next Spark poster">&rarr;</button>
          </div>
        </div>
      </section>
      <section class="spark-work-section spark-video-section" aria-labelledby="spark-videos-title">
        <div class="spark-section-label spark-section-label--dark"><span>02</span><b></b><p id="spark-videos-title">Videos</p></div>
        <div class="spark-video-gallery">${videoContent}</div>
      </section>
      <section class="spark-work-section spark-website-section" aria-labelledby="spark-website-title">
        <div class="spark-section-label"><span>03</span><b></b><p id="spark-website-title">Website</p></div>
        <h3>Website showcase</h3>
        <div class="spark-browser-frame">
          <div class="spark-browser-bar" aria-hidden="true"><i></i><i></i><i></i><b>${sparkWebsite.replace(/^https?:\/\//, '')}</b></div>
          <iframe title="Dental website showcase" loading="lazy" src="${sparkWebsite}"></iframe>
        </div>
        <a class="spark-site-button" href="${sparkWebsite}" target="_blank" rel="noopener noreferrer">Website <span aria-hidden="true">↗</span></a>
      </section>
    </section>
    <div class="spark-lightbox" role="dialog" aria-modal="true" aria-label="Spark poster preview" hidden>
      <button class="spark-lightbox-close" type="button" aria-label="Close poster preview">&times;</button>
      <button class="spark-lightbox-prev" type="button" aria-label="Previous poster">&larr;</button>
      <figure><img src="${sparkPosters[0].src}" alt="${sparkPosters[0].alt}"><figcaption>Spark creative</figcaption></figure>
      <button class="spark-lightbox-next" type="button" aria-label="Next poster">&rarr;</button>
    </div>
  </main>`
}

function sreeSuryaInfraPage() {
  return `<main class="sree-surya-case">
  <section class="sree-surya-hero" aria-label="Sree Surya Infra hero artwork">
    <img src="${sreeSuryaHero}" alt="Sree Surya Infra architectural hero artwork" decoding="async">
  </section>
  <section class="sree-surya-intro" aria-labelledby="sree-surya-title">
    <div class="sree-surya-intro__left">
      <p class="kicker">ABOUT THE CLIENT</p>
      <h1 id="sree-surya-title" class="client-about-logo-heading"><img src="/assets/logo/sree surya.jpeg" alt="Sree Surya Infra logo" loading="eager" decoding="async"></h1>
      <p>Building a brighter tomorrow</p>
    </div>
    <div class="sree-surya-intro__right">
      <p class="sree-surya-lead"><strong>Sri Surya Infra</strong>, also known as Sri Surya Infra Projects, operates as a regional real estate developer, contractor, and construction service provider in Andhra Pradesh, with active municipal and residential project involvements in Visakhapatnam.</p>
      <a class="sree-surya-back" href="/clients/">Back to Clients</a>
    </div>
  </section>
  <section class="sree-surya-work" aria-labelledby="sree-surya-work-title" tabindex="0">
    <div class="sree-surya-work__head">
      <p class="kicker">OUR WORK FOR SREE SURYA INFRA</p>
      <h2 id="sree-surya-work-title">Our work for Sree Surya Infra</h2>
      <p>A closer look at the visual content created for the Sree Surya Infra brand.</p>
    </div>
    <div class="sree-surya-showcase" data-sree-active="0">
      <button class="sree-surya-media sree-surya-media--video is-active" type="button" data-sree-panel="0" data-sree-open="video" aria-label="Open Sree Surya video">
        <video autoplay muted loop playsinline preload="metadata" poster="${sreeSuryaWork[0].poster}">
          <source src="${sreeSuryaWork[0].src}" type="video/mp4">
        </video>
        <span class="sree-surya-frame-controls">
          <span class="sree-surya-frame-control sree-surya-frame-play" role="button" tabindex="0" aria-pressed="false" aria-label="Pause Sree Surya video">Pause</span>
          <span class="sree-surya-frame-control sree-surya-frame-sound" role="button" tabindex="0" aria-pressed="true" aria-label="Turn Sree Surya sound on">Sound off</span>
          <label class="sree-surya-volume-label">Volume <input class="sree-surya-volume" type="range" min="0" max="1" step="0.05" value="0" aria-label="Sree Surya video volume"></label>
        </span>
        <span class="sree-surya-media__shine" aria-hidden="true"></span>
      </button>
      <div class="sree-surya-showcase__copy">
        <p class="kicker">CLIENT WORK</p>
        <h3>Made to<br>Stand Out</h3>
        <p>Brand visuals brought together in one immersive showcase.</p>
        <div class="sree-surya-controls">
          <button class="sree-surya-arrow sree-surya-prev" type="button" aria-label="Previous Sree Surya media">&larr;</button>
          <span class="sree-surya-count" aria-live="polite">01 / 02</span>
          <button class="sree-surya-arrow sree-surya-next" type="button" aria-label="Next Sree Surya media">&rarr;</button>
        </div>
      </div>
      <button class="sree-surya-media sree-surya-media--image" type="button" data-sree-panel="1" data-sree-open="video" aria-label="Open Sree Surya video">
        <video muted loop playsinline preload="metadata" poster="${sreeSuryaWork[1].poster}" aria-label="${sreeSuryaWork[1].label}">
          <source src="${sreeSuryaWork[1].src}" type="video/mp4">
        </video>
        <span class="sree-surya-media__shine" aria-hidden="true"></span>
      </button>
    </div>
    <div class="sree-surya-lightbox" role="dialog" aria-modal="true" aria-label="Expanded Sree Surya media" hidden>
      <button class="sree-surya-lightbox__close" type="button" aria-label="Close expanded media">&times;</button>
      <div class="sree-surya-lightbox__body"></div>
    </div>
  </section>
</main>`
}

function ganeshConstructionsPage() {
  const campaignItems = ganeshCampaigns.map((item, index) => `<figure class="ganesh-campaign-card" data-ganesh-card="${index}">
    <img src="${item.src}" alt="${item.alt}" loading="${index < 3 ? 'eager' : 'lazy'}" decoding="async">
  </figure>`).join('')
  return `<main class="ganesh-case">
  <section class="ganesh-hero" aria-labelledby="ganesh-title">
    <img class="ganesh-hero__image" src="${ganeshHero}" alt="Ganesh Constructions residential development hero artwork" decoding="async">
    <div class="ganesh-hero__overlay"></div>
    <div class="ganesh-hero__copy">
      <p class="kicker">Residential development / Visakhapatnam</p>
      <h1 id="ganesh-title">Ganesh Constructions</h1>
      <p>Built on Trust. Driven by Quality. Made to Last.</p>
    </div>
  </section>
  <section class="ganesh-intro" aria-labelledby="ganesh-about-title">
    <div class="ganesh-intro__left">
      <p class="kicker">About the client</p>
      <h2 id="ganesh-about-title" class="client-about-logo-heading"><img src="/assets/logo/ganesh.jpeg" alt="Ganesh Constructions logo" loading="lazy" decoding="async"></h2>
      <p>Residential construction and real estate development</p>
      <a class="ganesh-back" href="/clients/">Back to Clients</a>
    </div>
    <div class="ganesh-intro__right">
      <p class="ganesh-lead">Ganesh Constructions is presented as a residential real estate and construction brand focused on trust, quality, and long-lasting homes for modern property buyers.</p>
      <p>The page brings together the brand identity, hero artwork, and campaign creatives already created for the client, shaping them into a premium Dealatecorp case-study experience.</p>
      <dl class="ganesh-meta">
        <div><dt>Sector</dt><dd>Real estate and construction</dd></div>
        <div><dt>Focus</dt><dd>Residential developments and promotional creatives</dd></div>
        <div><dt>Creative work</dt><dd>Brand visuals, social media campaigns, and launch-style artwork</dd></div>
      </dl>
    </div>
  </section>
  <section class="ganesh-work" aria-labelledby="ganesh-work-title">
    <div class="ganesh-work__head">
      <p class="kicker">Campaign showcase</p>
      <h2 id="ganesh-work-title">Our Works</h2>
      <p>A curated run of campaign visuals developed for Ganesh Constructions, arranged as a smooth editorial reel.</p>
    </div>
    <div class="ganesh-carousel" tabindex="0" aria-label="Ganesh Constructions campaign carousel">
      <div class="ganesh-track">${campaignItems}</div>
    </div>
    <div class="ganesh-controls">
      <button class="ganesh-prev" type="button" aria-label="Move Ganesh campaign carousel backward">&larr;</button>
      <button class="ganesh-toggle" type="button" aria-pressed="false" aria-label="Pause Ganesh campaign carousel">Pause</button>
      <button class="ganesh-next" type="button" aria-label="Move Ganesh campaign carousel forward">&rarr;</button>
    </div>
    <div class="ganesh-browser" data-preview-url="${ganeshWebsite}">
      <div class="ganesh-browser__bar" aria-hidden="true">
        <span></span><span></span><span></span>
        <b>ganesh-constructionsweb-w331.vercel.app</b>
      </div>
      <div class="ganesh-browser__stage">
        <iframe src="${ganeshWebsite}" title="Ganesh Constructions Website Preview" loading="lazy"></iframe>
        <div class="ganesh-browser__fallback">
          <p>Live preview may be restricted by the website. Open the full website below.</p>
        </div>
      </div>
    </div>
    <div class="ganesh-work__actions">
      <p><span>Live Website</span> Website preview for Ganesh Constructions</p>
      <a class="ganesh-site-button" href="${ganeshWebsite}" target="_blank" rel="noopener noreferrer">View Website <span aria-hidden="true">&nearr;</span></a>
    </div>
  </section>
  <section class="ganesh-cta">
    <p class="kicker">Next collaboration</p>
    <h2>Building visibility for brands that build homes.</h2>
    <p>Explore more real estate and development work shaped by Dealatecorp.</p>
    <a class="button" href="mailto:hello@dealatecorp.com">Start a Project</a>
  </section>
</main>`
}

function sriConventionsPage() {
  const workPanels = sriConventionsWork.map((item, index) => {
    const media = item.type === 'video'
      ? `<video controls playsinline preload="metadata" aria-label="${item.alt}"><source src="${item.src}" type="video/mp4"></video>`
      : `<img src="${item.src}" alt="${item.alt}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async">`
    return `<div class="sri-conventions-panel" role="button" tabindex="${index < 3 ? 0 : -1}" data-sc-panel="${index}" data-sc-type="${item.type}" style="--sc-ratio:${item.ratio}" aria-label="Open Sri Convention creative ${String(index + 1).padStart(2, '0')}">
      <figure>${media}<figcaption>Creative ${String(index + 1).padStart(2, '0')}</figcaption></figure>
    </div>`
  }).join('')
  return `<main class="sri-conventions-case">
  <section class="sri-conventions-hero" aria-label="Sri Convention hero artwork">
    <img src="${sriConventionsHero}" alt="Sri Convention premium event hall hero artwork" decoding="async">
  </section>
  <section class="sri-conventions-intro" aria-labelledby="sri-conventions-title">
    <div class="sri-conventions-card" data-sri-conventions-overlap-card>
      <div class="sri-conventions-card__left">
        <p class="kicker">About the client</p>
        <h1 id="sri-conventions-title" class="client-about-logo-heading"><img src="/assets/logo/sri-conventions (1).png" alt="Sri Conventions logo" loading="lazy" decoding="async"></h1>
        <p>Rajayyapeta, Pendurthi &middot; Visakhapatnam</p>
        <span aria-hidden="true"></span>
        <a class="sri-conventions-back" href="/clients/">Back to Clients</a>
      </div>
      <div class="sri-conventions-card__right">
        <p>Sri Convention is a modern banquet hall in Rajayyapeta, Pendurthi, Visakhapatnam. Established in 2025 and located behind Major Defence Academy, it offers an elegant setting and premium amenities for celebrations, with a focus on affordability.</p>
        <dl class="sri-conventions-details">
          <div><dt>Landmark</dt><dd>Behind Major Defence Academy</dd></div>
          <div><dt>Plus Code</dt><dd>R6J9+9R</dd></div>
        </dl>
      </div>
    </div>
  </section>
  <section class="sri-conventions-work" aria-labelledby="sri-conventions-work-title" tabindex="0">
    <div class="sri-conventions-work__head">
      <p class="kicker">Portfolio showcase</p>
      <h2 id="sri-conventions-work-title">Our work for Sri Conventions</h2>
      <p>A closer look at the creative work developed for Sri Convention.</p>
    </div>
    <div class="sri-conventions-showcase" aria-label="Sri Conventions creative carousel">
      <div class="sri-conventions-stage">${workPanels}</div>
      <div class="sri-conventions-controls">
        <button class="sri-conventions-prev" type="button" aria-label="Previous Sri Conventions creative">&larr;</button>
        <span class="sri-conventions-count" aria-live="polite">01 / 04</span>
        <div class="sri-conventions-dots" aria-label="Sri Conventions creative pagination">${sriConventionsWork.map((_, index) => `<button type="button" data-sc-dot="${index}" aria-label="Show Sri Conventions creative ${index + 1}" ${index === 0 ? 'aria-current="true"' : ''}></button>`).join('')}</div>
        <button class="sri-conventions-next" type="button" aria-label="Next Sri Conventions creative">&rarr;</button>
      </div>
    </div>
    <div class="sri-conventions-lightbox" role="dialog" aria-modal="true" aria-label="Sri Conventions creative preview" hidden>
      <button class="sri-conventions-lightbox-close" type="button" aria-label="Close creative preview">&times;</button>
      <button class="sri-conventions-lightbox-prev" type="button" aria-label="Previous creative">&larr;</button>
      <figure class="sri-conventions-lightbox-body"></figure>
      <button class="sri-conventions-lightbox-next" type="button" aria-label="Next creative">&rarr;</button>
    </div>
  </section>
</main>`
}

function ubicPage() {
  return `<main class="ubic-case">
  <section class="ubic-hero" aria-label="UBIC entrepreneur conference hero artwork">
    <img src="${ubicHero}" alt="Hand-drawn entrepreneur conference scene with the UBIC logo" decoding="async" onerror="this.hidden=true;this.nextElementSibling.hidden=false">
    <p class="ubic-hero__fallback" hidden>UBIC hero artwork could not be loaded.</p>
  </section>
  <section class="ubic-intro" aria-labelledby="ubic-title">
    <div class="ubic-card" data-ubic-overlap-card>
      <div class="ubic-card__left">
        <p class="kicker">ABOUT THE CLIENT</p>
        <h1 id="ubic-title">UBIC</h1>
        <p>United Business &amp; Industries Confederation</p>
        <span aria-hidden="true"></span>
      </div>
      <div class="ubic-card__right">
        <p>UBIC is a community for young entrepreneurs to connect, collaborate, and grow. Through membership, entrepreneurs gain access to insights on emerging market trends, exclusive member discounts, and opportunities to build valuable business relationships. Meetings held every 15 days bring members together to exchange ideas, share experiences, and explore new business opportunities.</p>
        <ul class="ubic-benefits" aria-label="UBIC membership benefits">
          <li><span aria-hidden="true">↔</span>Meaningful connections</li>
          <li><span aria-hidden="true">◌</span>Market trend insights</li>
          <li><span aria-hidden="true">%</span>Member discounts</li>
          <li><span aria-hidden="true">15</span>Meetings every 15 days</li>
        </ul>
      </div>
    </div>
  </section>
</main>`
}

function sriParasakthiPeetamPage() {
  return `<main class="parasakthi-case">
  <section class="parasakthi-hero" aria-labelledby="parasakthi-title">
    <img class="parasakthi-hero__image" src="${parasakthiHero}" alt="Sri Parasakthi Peetam divine altar with goddess forms, homam fire, temple lamps and sacred floral decorations" decoding="async">
  </section>
  <section class="parasakthi-card" aria-labelledby="parasakthi-about-title">
    <div class="parasakthi-card__left">
      <p class="kicker">About the client</p>
      <h2 id="parasakthi-about-title" class="client-about-logo-heading"><img src="/assets/logo/sri-parasakthi-peetam.png" alt="Sri Parasakthi Peetam logo" loading="lazy" decoding="async"></h2>
      <p>Vedic &amp; Shakti Sadhana Center</p>
      <a class="parasakthi-back" href="/clients/">Back to Clients</a>
    </div>
    <div class="parasakthi-card__right">
      <p class="parasakthi-lead">Sri Parasakthi Peetam is a prominent divine spiritual center rooted in the traditions of Sanatana Dharma.</p>
      <div class="parasakthi-detail">
        <span>Core Philosophy</span>
        <p>Dedicated to the service of humanity through Devi Upasana, Mother Goddess worship, ancient wisdom, and sacred Vedic rituals.</p>
      </div>
      <div class="parasakthi-detail">
        <span>Key Services</span>
        <p>It specializes in performing personalized Vedic Homams, sacred fire rituals, customized according to an individual's horoscope, Janma Kundali, with the spiritual intention of addressing planetary doshas and karmic hurdles.</p>
      </div>
      <div class="parasakthi-detail">
        <span>Offerings</span>
        <p>Spiritual counseling by Sri Bhanumathi Garu through Shakti Sadhana, Mantra Diksha, and energized Yantras and Maha Meru Sri Chakrams for spiritual well-being, prosperity, protection, and devotional practice.</p>
      </div>
      <dl class="parasakthi-meta">
        <div><dt>Tradition</dt><dd>Sanatana Dharma</dd></div>
        <div><dt>Focus</dt><dd>Devi Upasana &amp; Shakti Sadhana</dd></div>
        <div><dt>Rituals</dt><dd>Vedic Homams</dd></div>
        <div><dt>Offerings</dt><dd>Yantras &amp; Maha Meru Sri Chakrams</dd></div>
      </dl>
    </div>
  </section>
  <section class="parasakthi-work" aria-labelledby="parasakthi-work-title">
    <div class="parasakthi-work__head">
      <p class="kicker">Our Work</p>
      <h2 id="parasakthi-work-title">Digital Experience for<br>Sri Parasakthi Peetam</h2>
      <p>A website experience designed to present sacred traditions, homam services, spiritual guidance, store offerings, and devotional content in a clear and respectful digital format.</p>
    </div>
    <div class="parasakthi-browser" data-preview-url="${parasakthiWebsite}">
      <div class="parasakthi-browser__bar" aria-hidden="true">
        <span></span><span></span><span></span>
        <b>sriparasakthipeetam.com</b>
      </div>
      <div class="parasakthi-browser__stage">
        <iframe src="${parasakthiWebsite}" title="Sri Parasakthi Peetam Website Preview" loading="lazy"></iframe>
        <div class="parasakthi-browser__fallback">
          <img src="${parasakthiHero}" alt="Sri Parasakthi Peetam website preview fallback artwork" loading="lazy" decoding="async">
          <p>Live preview may be restricted by the website. Open the full website below.</p>
        </div>
      </div>
    </div>
    <div class="parasakthi-work__actions">
      <p><span>Live Website</span> Designed &amp; developed for Sri Parasakthi Peetam</p>
      <a class="parasakthi-site-button" href="${parasakthiWebsite}" target="_blank" rel="noopener noreferrer">View Website <span aria-hidden="true">&nearr;</span></a>
    </div>
  </section>
  <section class="parasakthi-cta">
    <p class="kicker">Sacred digital experiences</p>
    <h2>Designing clarity for traditions that carry meaning.</h2>
    <p>We shape digital experiences with restraint, reverence, and the right amount of cinematic presence.</p>
    <a class="button" href="mailto:hello@dealatecorp.com">Start a Project</a>
  </section>
</main>`
}

function sriVenkateswaraConstructionsPage() {
  const showcaseItems = svcWork.map((item, index) => `
      <button class="svc-showcase-card${index === 0 ? ' is-active' : ''}" type="button" data-svc-slide="${index}" aria-label="Open Sri Venkateswara showcase artwork ${index + 1}">
        <img src="${item.src}" alt="${item.alt}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async">
      </button>`).join('')
  const dots = svcWork.map((_, index) => `<button type="button" data-svc-dot="${index}" aria-label="Show Sri Venkateswara artwork ${index + 1}"${index === 0 ? ' aria-current="true"' : ''}></button>`).join('')
  return `<main class="svc-case">
  <section class="svc-hero" aria-label="Sri Venkateswara Constructions hero artwork">
    <img src="${svcHero}" alt="Sri Venkateswara Constructions brand creative" decoding="async">
  </section>
  <section class="svc-card" aria-labelledby="svc-about-title">
    <div class="svc-card__left">
      <p class="kicker">About the client</p>
      <h1 id="svc-about-title" class="client-about-logo-heading"><img src="/assets/logo/sv-constructions.png" alt="Sri Venkateswara Constructions logo" loading="lazy" decoding="async"></h1>
      <a class="svc-back" href="/clients/">Back to Clients</a>
    </div>
    <div class="svc-card__right">
      <p class="svc-lead">Sri Venkateswara Constructions is presented as a builder, contractor, and real estate developer serving Visakhapatnam, Andhra Pradesh, with work spanning residential construction, infrastructure services, and commercial buildings.</p>
      <dl class="svc-meta">
        <div><dt>Sector</dt><dd>Construction</dd></div>
        <div><dt>Work</dt><dd>Website &amp; creative showcase</dd></div>
        <div><dt>Location</dt><dd>Visakhapatnam, Andhra Pradesh</dd></div>
      </dl>
    </div>
  </section>
  <section class="svc-work" aria-labelledby="svc-work-title">
    <div class="svc-work__head">
      <p class="kicker">Our Work</p>
      <h2 id="svc-work-title">Our work for Sri Venkateswara</h2>
      <p>Explore the creative work developed for the Sri Venkateswara Constructions brand.</p>
    </div>
    <div class="svc-showcase" tabindex="0" aria-label="Sri Venkateswara Constructions creative showcase">
      <div class="svc-showcase-track">${showcaseItems}</div>
    </div>
    <div class="svc-controls">
      <button class="svc-prev" type="button" aria-label="Previous Sri Venkateswara artwork">&larr;</button>
      <span class="svc-count" aria-live="polite">01 / 04</span>
      <div class="svc-dots">${dots}</div>
      <button class="svc-next" type="button" aria-label="Next Sri Venkateswara artwork">&rarr;</button>
    </div>
    <div class="svc-work__actions">
      <p><span>Live Website</span> Open the Sri Venkateswara Constructions website in a new tab.</p>
      <a class="svc-site-button" href="${svcWebsite}" target="_blank" rel="noopener noreferrer">View Website <span aria-hidden="true">&nearr;</span></a>
    </div>
    <div class="svc-lightbox" role="dialog" aria-modal="true" aria-label="Sri Venkateswara artwork preview" hidden>
      <button class="svc-lightbox-close" type="button" aria-label="Close artwork preview">&times;</button>
      <button class="svc-lightbox-prev" type="button" aria-label="Previous artwork">&larr;</button>
      <img src="${svcWork[0].src}" alt="${svcWork[0].alt}">
      <button class="svc-lightbox-next" type="button" aria-label="Next artwork">&rarr;</button>
    </div>
  </section>
</main>`
}

function ssmConstructionPage() {
  return `<main class="ssm-case">
  <section class="ssm-hero" aria-labelledby="ssm-title">
    <video class="ssm-hero__video" autoplay muted loop playsinline preload="metadata" poster="${ssmPoster}">
      <source src="${ssmVideo}" type="video/mp4">
    </video>
    <div class="ssm-hero__overlay"></div>
    <div class="ssm-hero__copy">
      <p class="kicker">Architecture / Construction</p>
      <h1 id="ssm-title">SSM Construction</h1>
      <p>Customized Building &amp; Architectural Planning</p>
    </div>
  </section>
  <section class="ssm-description-card" aria-labelledby="ssm-about-title">
    <div class="ssm-card__left">
      <p class="kicker">About the client</p>
      <h2 id="ssm-about-title" class="client-about-logo-heading"><img src="/assets/logo/ssm.jpeg" alt="SSM Construction logo" loading="lazy" decoding="async"></h2>
      <p>Building &amp; Architectural Planning</p>
      <a class="ssm-back" href="/clients/">Back to Clients</a>
    </div>
    <div class="ssm-card__right">
      <p class="ssm-lead"><strong>SSM Construction</strong> is an end-to-end building and architectural planning firm specializing in customized residential, commercial, and structural designs.</p>
      <p>The company focuses on delivering practical, well-planned, and structurally considered building solutions tailored to project-specific requirements.</p>
      <p>SSM Construction can also refer more broadly to construction terminology associated with <strong>Size Stone Masonry</strong>, a commonly used structural foundation technique in civil engineering; however, for this page, SSM Construction is presented primarily as the building and architectural planning firm.</p>
      <div class="ssm-detail">
        <span>Services</span>
        <p>Customized residential, commercial, and structural design planning.</p>
      </div>
      <div class="ssm-detail">
        <span>Approach</span>
        <p>End-to-end planning focused on functionality, structural requirements, and project-specific design.</p>
      </div>
      <div class="ssm-detail">
        <span>Specialization</span>
        <p>Building planning, architectural concepts, residential development, commercial spaces, and structural design.</p>
      </div>
      <dl class="ssm-meta">
        <div><dt>Industry</dt><dd>Construction &amp; Architecture</dd></div>
        <div><dt>Services</dt><dd>End-to-End Planning</dd></div>
        <div><dt>Project Types</dt><dd>Residential &amp; Commercial</dd></div>
        <div><dt>Specialization</dt><dd>Structural &amp; Customized Design</dd></div>
      </dl>
    </div>
  </section>
  <section class="ssm-work" aria-labelledby="ssm-work-title">
    <div class="ssm-work__head">
      <p class="kicker">Our Work</p>
      <h2 id="ssm-work-title">Planning Spaces.<br>Building Possibilities.</h2>
      <p>A showcase of SSM Construction's building, architectural planning, and structural design work.</p>
    </div>
    <div class="ssm-showcase">
      <figure class="ssm-showcase__main">
        <video autoplay muted loop playsinline preload="metadata" poster="${ssmPoster}" aria-label="SSM Construction work showcase video">
          <source src="${ssmWorkVideo}" type="video/mp4">
        </video>
      </figure>
      <div class="ssm-showcase__copy">
        <p class="kicker">Client Work</p>
        <h3>Architectural planning with a sharper brand presence.</h3>
        <p>Dealatecorp presents the SSM Construction visuals with a premium construction-led layout, pairing practical planning language with a clean editorial visual system.</p>
      </div>
    </div>
  </section>
  <section class="ssm-cta">
    <p class="kicker">Next collaboration</p>
    <h2>Building digital presence for teams that build with intent.</h2>
    <p>Explore more construction, real estate, and architecture-focused creative work by Dealatecorp.</p>
    <a class="button" href="mailto:hello@dealatecorp.com">Start a Project</a>
  </section>
</main>`
}

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

function adhithyaSaiPromotersPage() {
  return `<main class="adhithya-case adhithya-case--refresh">
  <section class="adhithya-hero" aria-labelledby="adhithya-title">
    <video class="adhithya-hero__video" autoplay muted loop playsinline preload="metadata" poster="/assets/postors/aditya.png">
      <source src="/clients/videos/aditya.mp4" type="video/mp4">
    </video>
    <div class="adhithya-hero__overlay"></div>
  </section>
  <section id="adhithya-about" class="adhithya-description-card" aria-labelledby="adhithya-about-title">
    <div class="adhithya-card__left">
      <p class="kicker">About the client</p>
      <h2 id="adhithya-about-title" class="client-about-logo-heading"><img src="/assets/logo/adithya sai.jpeg" alt="Adhithya Sai Promoters logo" loading="lazy" decoding="async"></h2>
      <p>Residential promotions and property development</p>
      <img src="/assets/logo/adithya sai.jpeg" alt="Adhithya Sai Promoters logo" loading="lazy" decoding="async">
      <a class="adhithya-back" href="/clients/">Back to Clients</a>
    </div>
    <div class="adhithya-card__right">
      <p class="adhithya-lead"><strong>Adhithya Sai Promoters</strong>, also frequently spelled Aditya Sai Promoters, is a real estate firm based in Visakhapatnam, Andhra Pradesh.</p>
      <p>The company develops and promotes residential properties, with a focus on growing housing zones across the Visakhapatnam region.</p>
      <p>The company operates from Gopalapatnam, serving property buyers exploring residential opportunities in the northern and western corridors of the city.</p>
      <div class="adhithya-detail">
        <span>Services</span>
        <p>Real estate promotions, apartment construction, and plot development for residential buyers.</p>
      </div>
      <div class="adhithya-detail">
        <span>Approach</span>
        <p>Property promotion focused on practical residential opportunities across fast-growing Visakhapatnam corridors.</p>
      </div>
      <div class="adhithya-detail">
        <span>Offerings</span>
        <p>Premium North and South-facing residential flats near Parawada, Visakhapatnam, subject to current availability and confirmation.</p>
      </div>
      <dl class="adhithya-meta">
        <div><dt>Industry</dt><dd>Real Estate</dd></div>
        <div><dt>Services</dt><dd>Residential Promotions</dd></div>
        <div><dt>Project Types</dt><dd>Flats &amp; Plots</dd></div>
        <div><dt>Market</dt><dd>Visakhapatnam Corridors</dd></div>
      </dl>
    </div>
  </section>
  <section class="adhithya-work" aria-labelledby="adhithya-work-title">
    <div class="adhithya-work__head">
      <p class="kicker">Our Work</p>
      <h2 id="adhithya-work-title">Promoting Homes.<br>Shaping Visibility.</h2>
      <p>A premium visual showcase for Adhithya Sai Promoters, using campaign video and brand assets to present the real estate work with clarity and polish.</p>
    </div>
    <div class="adhithya-showcase">
      <figure class="adhithya-showcase__main">
        <video autoplay muted loop playsinline preload="metadata" aria-label="Adhithya Sai Promoters work showcase video">
          <source src="/clients/videos/aditya.mp4" type="video/mp4">
        </video>
      </figure>
      <div class="adhithya-showcase__copy">
        <p class="kicker">Client Work</p>
        <h3>Real estate campaign visuals with a refined property-first presence.</h3>
        <p>The case-study layout frames Adhithya Sai Promoters with a distinct navy, teal, coral, and amber palette while keeping the same premium structure as the SSM Construction page.</p>
      </div>
    </div>
  </section>
  <section class="adhithya-cta">
    <p class="kicker">Next collaboration</p>
    <h2>Building visibility for brands that shape neighbourhoods.</h2>
    <p>Explore more real estate and development work shaped by Dealatecorp.</p>
    <a class="button" href="mailto:hello@dealatecorp.com">Start a Project</a>
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
      <h1 id="tirumalasetty-title" class="client-about-logo-heading"><img src="/assets/logo/tirumalsetty.jpeg" alt="Tirumalasetty Projects LLP logo" loading="lazy" decoding="async"></h1>
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

const pages = {'/':home, '/services':services, '/portfolio':portfolio, '/clients':clientsPage, '/clients/spark':sparkClientPage, '/clients/sree-surya-infra':sreeSuryaInfraPage, '/clients/ganesh-constructions':ganeshConstructionsPage, '/clients/sri-conventions':sriConventionsPage, '/clients/ubic':ubicPage, '/clients/sri-parasakthi-peetam':sriParasakthiPeetamPage, '/clients/sri-venkateswara-constructions':sriVenkateswaraConstructionsPage, '/clients/ssm-construction':ssmConstructionPage, '/clients/adhithya-sai-promoters':adhithyaSaiPromotersPage, '/clients/adithya-sai-promoters':adhithyaSaiPromotersPage, '/clients/tirumalasetty':tirumalasettyPage, '/about':about}
const appRoot = document.querySelector('#app')
if (appRoot) appRoot.innerHTML = `${header()}${(pages[path] || home)()}${footer()}`
document.body.classList.toggle('is-clients-page', path === '/clients')
document.body.classList.toggle('is-spark-page', path === '/clients/spark')
document.body.classList.toggle('is-sree-surya-page', path === '/clients/sree-surya-infra')
document.body.classList.toggle('is-ganesh-page', path === '/clients/ganesh-constructions')
document.body.classList.toggle('is-sri-conventions-page', path === '/clients/sri-conventions')
document.body.classList.toggle('is-ubic-page', path === '/clients/ubic')
document.body.classList.toggle('is-parasakthi-page', path === '/clients/sri-parasakthi-peetam')
document.body.classList.toggle('is-svc-page', path === '/clients/sri-venkateswara-constructions')
document.body.classList.toggle('is-ssm-page', path === '/clients/ssm-construction')
document.body.classList.toggle('is-adhithya-page', path === '/clients/adhithya-sai-promoters' || path === '/clients/adithya-sai-promoters')
document.body.classList.toggle('is-tirumalasetty-page', path === '/clients/tirumalasetty')

const scrollToCurrentHash = () => {
  if (!location.hash) return
  requestAnimationFrame(() => {
    const target = document.querySelector(location.hash)
    if (target) target.scrollIntoView({ block: 'start' })
  })
}
scrollToCurrentHash()
window.addEventListener('load', () => setTimeout(scrollToCurrentHash, 80))

const menu = document.querySelector('.menu')
if (menu) menu.addEventListener('click', () => { const open = document.body.classList.toggle('nav-open'); menu.setAttribute('aria-expanded', String(open)) })

document.addEventListener('click', event => {
  const card = event.target.closest('.client-brand-card[href]')
  if (!card || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  window.location.href = card.href
})

if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target) } }), {threshold:.12})
  document.querySelectorAll('main section, .project, .layer').forEach(el => { el.classList.add('reveal'); reveal.observe(el) })
} else {
  document.querySelectorAll('main section, .project, .layer').forEach(el => el.classList.add('is-visible'))
}

const sriConventionsCase = document.querySelector('.sri-conventions-case')
if (sriConventionsCase) {
  const overlapCard = sriConventionsCase.querySelector('[data-sri-conventions-overlap-card]')
  if (overlapCard && 'ResizeObserver' in window) {
    const setOverlap = () => overlapCard.style.setProperty('--sri-conventions-overlap', `${overlapCard.offsetHeight * .25}px`)
    new ResizeObserver(setOverlap).observe(overlapCard)
    setOverlap()
  } else if (overlapCard) {
    overlapCard.style.setProperty('--sri-conventions-overlap', '92px')
  }

  const workSection = sriConventionsCase.querySelector('.sri-conventions-work')
  const panels = [...sriConventionsCase.querySelectorAll('[data-sc-panel]')]
  const dots = [...sriConventionsCase.querySelectorAll('[data-sc-dot]')]
  const count = sriConventionsCase.querySelector('.sri-conventions-count')
  const lightbox = sriConventionsCase.querySelector('.sri-conventions-lightbox')
  if (workSection && panels.length && dots.length && count && lightbox) {
    const lightboxBody = lightbox.querySelector('.sri-conventions-lightbox-body')
    const closeLightbox = lightbox.querySelector('.sri-conventions-lightbox-close')
    const lightboxPrev = lightbox.querySelector('.sri-conventions-lightbox-prev')
    const lightboxNext = lightbox.querySelector('.sri-conventions-lightbox-next')
    let activeSc = 0
    let lastScFocus = null
    let scAuto = null
    let touchStartX = 0
    let touchStartY = 0
    let lightboxTouchStartX = 0
    let lightboxTouchStartY = 0

    const pauseHiddenVideos = () => {
      panels.forEach((panel, index) => {
        const video = panel.querySelector('video')
        if (video && index !== activeSc) video.pause()
      })
    }
    const setSriConventionsPanel = index => {
      activeSc = (index + panels.length) % panels.length
      panels.forEach((panel, panelIndex) => {
        const raw = panelIndex - activeSc
        const wrapped = raw > panels.length / 2 ? raw - panels.length : raw < -panels.length / 2 ? raw + panels.length : raw
        const position = wrapped === 0 ? 'active' : wrapped === -1 ? 'prev' : wrapped === 1 ? 'next' : 'hidden'
        panel.dataset.position = position
        panel.style.setProperty('--sc-offset', wrapped)
        panel.classList.toggle('is-active', position === 'active')
        panel.setAttribute('aria-pressed', String(position === 'active'))
        panel.tabIndex = Math.abs(wrapped) <= 1 ? 0 : -1
      })
      dots.forEach((dot, dotIndex) => {
        if (dotIndex === activeSc) dot.setAttribute('aria-current', 'true')
        else dot.removeAttribute('aria-current')
      })
      count.textContent = `${String(activeSc + 1).padStart(2, '0')} / ${String(panels.length).padStart(2, '0')}`
      pauseHiddenVideos()
      if (!lightbox.hidden) renderLightbox()
    }
    const stopScAuto = () => {
      if (scAuto) window.clearInterval(scAuto)
      scAuto = null
    }
    const startScAuto = () => {
      stopScAuto()
      scAuto = window.setInterval(() => {
        if (lightbox.hidden) setSriConventionsPanel(activeSc + 1)
      }, 3000)
    }
    const renderLightbox = () => {
      const item = sriConventionsWork[activeSc]
      if (!lightboxBody || !item) return
      lightboxBody.innerHTML = item.type === 'video'
        ? `<video controls playsinline preload="metadata" autoplay src="${item.src}" aria-label="${item.alt}"></video><figcaption>Creative ${String(activeSc + 1).padStart(2, '0')}</figcaption>`
        : `<img src="${item.src}" alt="${item.alt}" decoding="async"><figcaption>Creative ${String(activeSc + 1).padStart(2, '0')}</figcaption>`
    }
    const openLightbox = (index, trigger) => {
      lastScFocus = trigger
      stopScAuto()
      setSriConventionsPanel(index)
      renderLightbox()
      lightbox.hidden = false
      document.body.classList.add('lightbox-open')
      closeLightbox?.focus()
    }
    const closeSriConventionsLightbox = () => {
      lightbox.hidden = true
      lightboxBody.innerHTML = ''
      document.body.classList.remove('lightbox-open')
      if (lastScFocus) lastScFocus.focus()
      startScAuto()
    }
    const moveFromSwipe = (dx, dy) => {
      if (Math.abs(dx) > 38 && Math.abs(dx) > Math.abs(dy)) setSriConventionsPanel(activeSc + (dx < 0 ? 1 : -1))
    }

    panels.forEach((panel, index) => {
      panel.addEventListener('click', event => {
        if (event.target.closest('video') && index === activeSc) return
        if (index === activeSc) openLightbox(index, panel)
        else setSriConventionsPanel(index)
      })
      panel.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return
        event.preventDefault()
        if (index === activeSc) openLightbox(index, panel)
        else setSriConventionsPanel(index)
      })
    })
    dots.forEach(dot => dot.addEventListener('click', () => { setSriConventionsPanel(Number(dot.dataset.scDot)); startScAuto() }))
    sriConventionsCase.querySelector('.sri-conventions-prev')?.addEventListener('click', () => { setSriConventionsPanel(activeSc - 1); startScAuto() })
    sriConventionsCase.querySelector('.sri-conventions-next')?.addEventListener('click', () => { setSriConventionsPanel(activeSc + 1); startScAuto() })
    workSection.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); setSriConventionsPanel(activeSc - 1) }
      if (event.key === 'ArrowRight') { event.preventDefault(); setSriConventionsPanel(activeSc + 1) }
      if ((event.key === 'Enter' || event.key === ' ') && !event.target.closest('button')) {
        event.preventDefault()
        openLightbox(activeSc, panels[activeSc])
      }
    })
    workSection.addEventListener('touchstart', event => {
      const touch = event.changedTouches[0]
      touchStartX = touch.clientX
      touchStartY = touch.clientY
    }, { passive: true })
    workSection.addEventListener('touchend', event => {
      const touch = event.changedTouches[0]
      moveFromSwipe(touch.clientX - touchStartX, touch.clientY - touchStartY)
    }, { passive: true })
    closeLightbox?.addEventListener('click', closeSriConventionsLightbox)
    lightboxPrev?.addEventListener('click', () => setSriConventionsPanel(activeSc - 1))
    lightboxNext?.addEventListener('click', () => setSriConventionsPanel(activeSc + 1))
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeSriConventionsLightbox() })
    lightbox.addEventListener('touchstart', event => {
      const touch = event.changedTouches[0]
      lightboxTouchStartX = touch.clientX
      lightboxTouchStartY = touch.clientY
    }, { passive: true })
    lightbox.addEventListener('touchend', event => {
      const touch = event.changedTouches[0]
      moveFromSwipe(touch.clientX - lightboxTouchStartX, touch.clientY - lightboxTouchStartY)
    }, { passive: true })
    document.addEventListener('keydown', event => {
      if (lightbox.hidden) return
      const focusable = [closeLightbox, lightboxPrev, lightboxNext].filter(Boolean)
      if (event.key === 'Escape') closeSriConventionsLightbox()
      if (event.key === 'ArrowLeft') setSriConventionsPanel(activeSc - 1)
      if (event.key === 'ArrowRight') setSriConventionsPanel(activeSc + 1)
      if (event.key === 'Tab' && focusable.length) {
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    })
    setSriConventionsPanel(0)
    startScAuto()
  }
}

const ubicCase = document.querySelector('.ubic-case')
if (ubicCase) {
  const ubicCard = ubicCase.querySelector('[data-ubic-overlap-card]')
  const setUbicOverlap = () => {
    if (ubicCard) ubicCard.style.setProperty('--ubic-overlap', `${ubicCard.offsetHeight * .25}px`)
  }
  if (ubicCard && 'ResizeObserver' in window) new ResizeObserver(setUbicOverlap).observe(ubicCard)
  setUbicOverlap()
  if (document.fonts) document.fonts.ready.then(setUbicOverlap)
  window.addEventListener('resize', setUbicOverlap)
}

const sparkCase = document.querySelector('.spark-case')
if (sparkCase) {
  const overlapCard = sparkCase.querySelector('[data-spark-overlap-card]')
  if (overlapCard && 'ResizeObserver' in window) {
    const setSparkOverlap = () => overlapCard.style.setProperty('--spark-overlap', `${overlapCard.offsetHeight * .25}px`)
    new ResizeObserver(setSparkOverlap).observe(overlapCard)
    setSparkOverlap()
  } else if (overlapCard) {
    overlapCard.style.setProperty('--spark-overlap', '90px')
  }

  const carousel = sparkCase.querySelector('.spark-poster-carousel')
  const posters = [...sparkCase.querySelectorAll('[data-spark-poster]')]
  const dots = [...sparkCase.querySelectorAll('[data-spark-dot]')]
  const lightbox = sparkCase.querySelector('.spark-lightbox')
  if (carousel && posters.length && dots.length && lightbox) {
    const lightboxImg = lightbox.querySelector('img')
    const lightboxCaption = lightbox.querySelector('figcaption')
    const closeLightbox = lightbox.querySelector('.spark-lightbox-close')
    const lightboxPrev = lightbox.querySelector('.spark-lightbox-prev')
    const lightboxNext = lightbox.querySelector('.spark-lightbox-next')
    let activeSparkPoster = 0
    let lastSparkFocus = null
    let touchStartX = 0
    let touchStartY = 0
    let sparkAuto = null
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const setSparkPoster = (index) => {
      activeSparkPoster = (index + posters.length) % posters.length
      posters.forEach((poster, posterIndex) => {
        const raw = posterIndex - activeSparkPoster
        const wrapped = raw > posters.length / 2 ? raw - posters.length : raw < -posters.length / 2 ? raw + posters.length : raw
        poster.dataset.position = String(wrapped)
        poster.classList.toggle('is-active', wrapped === 0)
        poster.setAttribute('aria-pressed', String(wrapped === 0))
        poster.style.setProperty('--spark-offset', wrapped)
      })
      dots.forEach((dot, dotIndex) => {
        if (dotIndex === activeSparkPoster) dot.setAttribute('aria-current', 'true')
        else dot.removeAttribute('aria-current')
      })
      if (lightboxImg) {
        const currentImg = posters[activeSparkPoster].querySelector('img')
        lightboxImg.src = currentImg.src
        lightboxImg.alt = currentImg.alt
      }
      if (lightboxCaption) lightboxCaption.textContent = 'Spark creative'
    }
    const openSparkLightbox = (index, trigger) => {
      lastSparkFocus = trigger
      stopSparkAuto()
      setSparkPoster(index)
      lightbox.hidden = false
      document.body.classList.add('lightbox-open')
      closeLightbox.focus()
    }
    const closeSparkLightbox = () => {
      lightbox.hidden = true
      document.body.classList.remove('lightbox-open')
      if (lastSparkFocus) lastSparkFocus.focus()
      startSparkAuto()
    }
    const stopSparkAuto = () => {
      if (sparkAuto) window.clearInterval(sparkAuto)
      sparkAuto = null
    }
    const startSparkAuto = () => {
      stopSparkAuto()
      if (motionQuery.matches || !document.hasFocus()) return
      sparkAuto = window.setInterval(() => {
        if (!lightbox.hidden) return
        setSparkPoster(activeSparkPoster + 1)
      }, 2800)
    }

    posters.forEach((poster, index) => poster.addEventListener('click', () => {
      if (index === activeSparkPoster) openSparkLightbox(index, poster)
      else setSparkPoster(index)
    }))
    dots.forEach(dot => dot.addEventListener('click', () => { setSparkPoster(Number(dot.dataset.sparkDot)); startSparkAuto() }))
    sparkCase.querySelector('.spark-poster-prev')?.addEventListener('click', () => { setSparkPoster(activeSparkPoster - 1); startSparkAuto() })
    sparkCase.querySelector('.spark-poster-next')?.addEventListener('click', () => { setSparkPoster(activeSparkPoster + 1); startSparkAuto() })
    carousel.addEventListener('pointerenter', stopSparkAuto)
    carousel.addEventListener('pointerleave', startSparkAuto)
    carousel.addEventListener('focusin', stopSparkAuto)
    carousel.addEventListener('focusout', startSparkAuto)
    carousel.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); setSparkPoster(activeSparkPoster - 1) }
      if (event.key === 'ArrowRight') { event.preventDefault(); setSparkPoster(activeSparkPoster + 1) }
      if (event.key === 'Enter' || event.key === ' ') {
        if (document.activeElement?.matches('[data-spark-poster]')) return
        event.preventDefault()
        openSparkLightbox(activeSparkPoster, posters[activeSparkPoster])
      }
    })
    carousel.addEventListener('touchstart', event => {
      const touch = event.changedTouches[0]
      touchStartX = touch.clientX
      touchStartY = touch.clientY
    }, { passive: true })
    carousel.addEventListener('touchend', event => {
      const touch = event.changedTouches[0]
      const dx = touch.clientX - touchStartX
      const dy = touch.clientY - touchStartY
      if (Math.abs(dx) > 38 && Math.abs(dx) > Math.abs(dy)) setSparkPoster(activeSparkPoster + (dx < 0 ? 1 : -1))
      startSparkAuto()
    }, { passive: true })
    closeLightbox?.addEventListener('click', closeSparkLightbox)
    lightboxPrev?.addEventListener('click', () => setSparkPoster(activeSparkPoster - 1))
    lightboxNext?.addEventListener('click', () => setSparkPoster(activeSparkPoster + 1))
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeSparkLightbox() })
    document.addEventListener('keydown', event => {
      if (lightbox.hidden) return
      if (event.key === 'Escape') closeSparkLightbox()
      if (event.key === 'ArrowLeft') setSparkPoster(activeSparkPoster - 1)
      if (event.key === 'ArrowRight') setSparkPoster(activeSparkPoster + 1)
      if (event.key === 'Tab') {
        const focusable = [...lightbox.querySelectorAll('button')]
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    })
    document.addEventListener('visibilitychange', () => document.hidden ? stopSparkAuto() : startSparkAuto())
    motionQuery.addEventListener('change', startSparkAuto)
    setSparkPoster(0)
    startSparkAuto()
  }

  const sparkVideoGallery = sparkCase.querySelector('.spark-video-gallery')
  if (sparkVideoGallery) {
    const videos = [...sparkVideoGallery.querySelectorAll('video')]
    const thumbs = [...sparkVideoGallery.querySelectorAll('[data-spark-video-thumb]')]
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let galleryVisible = true
    const updateSparkVideoButtons = (frame, video) => {
      const play = frame.querySelector('.spark-video-play')
      const sound = frame.querySelector('.spark-video-sound')
      if (play) {
        play.textContent = video.paused ? 'Play' : 'Pause'
        play.setAttribute('aria-pressed', String(video.paused))
        play.setAttribute('aria-label', `${video.paused ? 'Play' : 'Pause'} ${video.getAttribute('aria-label') || 'Spark video'}`)
      }
      if (sound) {
        sound.textContent = video.muted ? 'Sound off' : 'Sound on'
        sound.setAttribute('aria-pressed', String(video.muted))
        sound.setAttribute('aria-label', `${video.muted ? 'Turn sound on for' : 'Turn sound off for'} ${video.getAttribute('aria-label') || 'Spark video'}`)
      }
    }
    const syncSparkVideos = () => {
      videos.forEach((video, index) => {
        const frame = thumbs[index]
        if (!frame) return
        if (galleryVisible && !document.hidden && !motionQuery.matches) video.play().catch(() => frame.classList.add('needs-user-play'))
        else video.pause()
        updateSparkVideoButtons(frame, video)
      })
    }
    const setSparkFrameActive = (index) => {
      thumbs.forEach((thumb, thumbIndex) => {
        const active = thumbIndex === index
        thumb.classList.toggle('is-active', active)
        if (active) thumb.setAttribute('aria-current', 'true')
        else thumb.removeAttribute('aria-current')
      })
    }
    thumbs.forEach((thumb, index) => {
      const video = videos[index]
      if (!video) return
      const play = thumb.querySelector('.spark-video-play')
      const sound = thumb.querySelector('.spark-video-sound')
      thumb.addEventListener('click', event => {
        if (event.target.closest('.spark-video-controls')) return
        setSparkFrameActive(index)
      })
      play?.addEventListener('click', event => {
        event.stopPropagation()
        if (video.paused) video.play().then(() => thumb.classList.remove('needs-user-play')).catch(() => thumb.classList.add('needs-user-play'))
        else video.pause()
      })
      sound?.addEventListener('click', event => {
        event.stopPropagation()
        videos.forEach((otherVideo, otherIndex) => {
          if (otherIndex !== index) {
            otherVideo.muted = true
            updateSparkVideoButtons(thumbs[otherIndex], otherVideo)
          }
        })
        video.muted = !video.muted
        if (!video.muted) video.play().catch(() => {})
        updateSparkVideoButtons(thumb, video)
      })
      video.addEventListener('play', () => updateSparkVideoButtons(thumb, video))
      video.addEventListener('pause', () => updateSparkVideoButtons(thumb, video))
      video.addEventListener('volumechange', () => updateSparkVideoButtons(thumb, video))
      updateSparkVideoButtons(thumb, video)
    })
    if (videos.length && 'IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver(entries => {
        galleryVisible = entries[0].isIntersecting
        syncSparkVideos()
      }, { threshold: .2 })
      videoObserver.observe(sparkVideoGallery)
    }
    document.addEventListener('visibilitychange', syncSparkVideos)
    motionQuery.addEventListener('change', syncSparkVideos)
    syncSparkVideos()
  }
}

const adhithyaHero = document.querySelector('.adhithya-hero')
if (adhithyaHero) {
  const video = adhithyaHero.querySelector('video')
  const toggle = adhithyaHero.querySelector('.adhithya-video-toggle')
  if (!video || !toggle) {
    console.warn('Adhithya hero controls skipped: video or toggle missing.')
  } else {
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
}

const sreeSuryaWorkSection = document.querySelector('.sree-surya-work')
if (sreeSuryaWorkSection) {
  const showcase = sreeSuryaWorkSection.querySelector('.sree-surya-showcase')
  const panels = [...sreeSuryaWorkSection.querySelectorAll('[data-sree-panel]')]
  const video = sreeSuryaWorkSection.querySelector('.sree-surya-media--video video')
  const playButton = sreeSuryaWorkSection.querySelector('.sree-surya-frame-play')
  const muteButton = sreeSuryaWorkSection.querySelector('.sree-surya-frame-sound')
  const volumeSlider = sreeSuryaWorkSection.querySelector('.sree-surya-volume')
  const count = sreeSuryaWorkSection.querySelector('.sree-surya-count')
  const lightbox = sreeSuryaWorkSection.querySelector('.sree-surya-lightbox')
  if (!showcase || !panels.length || !video || !playButton || !muteButton || !volumeSlider || !count || !lightbox || !sreeSuryaWorkSection.querySelector('.sree-surya-prev') || !sreeSuryaWorkSection.querySelector('.sree-surya-next')) {
    console.warn('Sree Surya controls skipped: required carousel elements missing.')
  } else {
  const lightboxBody = lightbox.querySelector('.sree-surya-lightbox__body')
  const closeLightboxButton = lightbox.querySelector('.sree-surya-lightbox__close')
  if (!lightboxBody || !closeLightboxButton) {
    console.warn('Sree Surya lightbox skipped: required lightbox elements missing.')
  } else {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let activeSree = 0
  let sectionVisible = false
  let userPaused = false
  let lastFocus = null
  let touchStartX = 0
  let touchStartY = 0
  let lastVolume = .7

  video.volume = 0
  const setSreeActive = (index) => {
    activeSree = (index + panels.length) % panels.length
    showcase.dataset.sreeActive = String(activeSree)
    panels.forEach((panel, panelIndex) => panel.classList.toggle('is-active', panelIndex === activeSree))
    count.textContent = `${String(activeSree + 1).padStart(2, '0')} / 02`
  }
  const syncSreeVideo = () => {
    const shouldPlay = sectionVisible && !userPaused && !motionQuery.matches && !document.hidden
    if (shouldPlay) video.play().catch(() => {})
    else video.pause()
    syncSreeControls()
  }
  const syncSreeControls = () => {
    const paused = video.paused || userPaused
    playButton.textContent = paused ? 'Play' : 'Pause'
    playButton.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} Sree Surya video`)
    playButton.setAttribute('aria-pressed', String(paused))
    const muted = video.muted || video.volume === 0
    muteButton.textContent = muted ? 'Sound off' : 'Sound on'
    muteButton.setAttribute('aria-label', `${muted ? 'Turn Sree Surya sound on' : 'Turn Sree Surya sound off'}`)
    muteButton.setAttribute('aria-pressed', String(muted))
    volumeSlider.value = String(video.muted ? 0 : video.volume)
  }
  const closeSreeLightbox = () => {
    lightbox.hidden = true
    lightboxBody.replaceChildren()
    document.body.classList.remove('lightbox-open')
    if (lastFocus) lastFocus.focus()
    syncSreeVideo()
  }
  const openSreeLightbox = (type, trigger) => {
    const item = sreeSuryaWork[Number(trigger.dataset.sreePanel)] || sreeSuryaWork[0]
    lastFocus = trigger
    video.pause()
    lightboxBody.innerHTML = item.type === 'video'
      ? `<video controls autoplay playsinline src="${item.src}" poster="${item.poster}" aria-label="${item.label}"></video>`
      : `<img src="${item.src}" alt="${item.alt}">`
    lightbox.hidden = false
    document.body.classList.add('lightbox-open')
    closeLightboxButton.focus()
  }

  sreeSuryaWorkSection.querySelector('.sree-surya-prev').addEventListener('click', () => setSreeActive(activeSree - 1))
  sreeSuryaWorkSection.querySelector('.sree-surya-next').addEventListener('click', () => setSreeActive(activeSree + 1))
  playButton.addEventListener('click', event => {
    event.stopPropagation()
    userPaused = !userPaused
    syncSreeVideo()
  })
  muteButton.addEventListener('click', event => {
    event.stopPropagation()
    const shouldUnmute = video.muted || video.volume === 0
    if (shouldUnmute) {
      video.muted = false
      video.volume = lastVolume || .7
      userPaused = false
      video.play().catch(() => {})
    } else {
      if (video.volume > 0) lastVolume = video.volume
      video.muted = true
    }
    syncSreeVideo()
  })
  volumeSlider.addEventListener('input', event => {
    event.stopPropagation()
    const nextVolume = Number(volumeSlider.value)
    video.volume = nextVolume
    if (nextVolume > 0) {
      lastVolume = nextVolume
      video.muted = false
      userPaused = false
      video.play().catch(() => {})
    } else {
      video.muted = true
    }
    syncSreeControls()
  })
  ;[playButton, muteButton].forEach(button => button.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    button.click()
  }))
  panels.forEach(panel => panel.addEventListener('click', () => openSreeLightbox(panel.dataset.sreeOpen, panel)))
  sreeSuryaWorkSection.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); setSreeActive(activeSree - 1) }
    if (event.key === 'ArrowRight') { event.preventDefault(); setSreeActive(activeSree + 1) }
  })
  sreeSuryaWorkSection.addEventListener('touchstart', event => {
    const touch = event.changedTouches[0]
    touchStartX = touch.clientX
    touchStartY = touch.clientY
  }, { passive: true })
  sreeSuryaWorkSection.addEventListener('touchend', event => {
    const touch = event.changedTouches[0]
    const dx = touch.clientX - touchStartX
    const dy = touch.clientY - touchStartY
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) setSreeActive(activeSree + (dx < 0 ? 1 : -1))
  }, { passive: true })
  closeLightboxButton.addEventListener('click', closeSreeLightbox)
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeSreeLightbox() })
  document.addEventListener('visibilitychange', syncSreeVideo)
  video.addEventListener('play', syncSreeControls)
  video.addEventListener('pause', syncSreeControls)
  video.addEventListener('volumechange', syncSreeControls)
  video.addEventListener('ended', syncSreeControls)
  document.addEventListener('keydown', event => {
    if (lightbox.hidden) return
    if (event.key === 'Escape') closeSreeLightbox()
    if (event.key === 'Tab') {
      const focusable = [...lightbox.querySelectorAll('button, video')]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
  })
  const sreeVideoObserver = new IntersectionObserver(entries => {
    sectionVisible = entries[0].isIntersecting
    syncSreeVideo()
  }, { threshold: .35 })
  sreeVideoObserver.observe(sreeSuryaWorkSection)
  motionQuery.addEventListener('change', syncSreeVideo)
  setSreeActive(0)
  syncSreeVideo()
  }
  }
}

const ganeshCarousel = document.querySelector('.ganesh-carousel')
if (ganeshCarousel) {
  const track = ganeshCarousel.querySelector('.ganesh-track')
  const cards = [...ganeshCarousel.querySelectorAll('.ganesh-campaign-card')]
  const toggle = document.querySelector('.ganesh-toggle')
  const prev = document.querySelector('.ganesh-prev')
  const next = document.querySelector('.ganesh-next')
  if (!track || !cards.length || !toggle || !prev || !next) {
    console.warn('Ganesh carousel skipped: required carousel elements missing.')
  } else {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let userPaused = false
  let activeGanesh = 0
  let ganeshTimer = null

  const setGaneshSlide = (index) => {
    if (!cards.length) return
    activeGanesh = (index + cards.length) % cards.length
    const card = cards[activeGanesh]
    const maxOffset = Math.max(0, track.scrollWidth - ganeshCarousel.clientWidth)
    const centeredOffset = card.offsetLeft - ((ganeshCarousel.clientWidth - card.offsetWidth) / 2)
    const offset = Math.min(Math.max(0, centeredOffset), maxOffset)
    track.style.transform = `translate3d(${-offset}px,0,0)`
    cards.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === activeGanesh))
  }
  const stopGaneshAuto = () => {
    if (ganeshTimer) window.clearInterval(ganeshTimer)
    ganeshTimer = null
  }
  const startGaneshAuto = () => {
    stopGaneshAuto()
    if (userPaused || motionQuery.matches) return
    ganeshTimer = window.setInterval(() => setGaneshSlide(activeGanesh + 1), 2600)
  }
  const setGaneshState = () => {
    const paused = userPaused || motionQuery.matches
    ganeshCarousel.classList.toggle('is-paused', paused)
    toggle.textContent = paused ? 'Resume' : 'Pause'
    toggle.setAttribute('aria-pressed', String(userPaused))
    toggle.setAttribute('aria-label', `${paused ? 'Resume' : 'Pause'} Ganesh campaign carousel`)
    if (paused) stopGaneshAuto()
    else startGaneshAuto()
  }
  const nudgeGanesh = (direction) => {
    setGaneshSlide(activeGanesh + direction)
    setGaneshState()
  }

  toggle.addEventListener('click', () => {
    userPaused = !userPaused
    setGaneshState()
  })
  prev.addEventListener('click', () => nudgeGanesh(-1))
  next.addEventListener('click', () => nudgeGanesh(1))
  ganeshCarousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); nudgeGanesh(-1) }
    if (event.key === 'ArrowRight') { event.preventDefault(); nudgeGanesh(1) }
  })
  ganeshCarousel.addEventListener('mouseenter', setGaneshState)
  ganeshCarousel.addEventListener('mouseleave', setGaneshState)
  ganeshCarousel.addEventListener('focusin', setGaneshState)
  ganeshCarousel.addEventListener('focusout', setGaneshState)
  window.addEventListener('resize', () => setGaneshSlide(activeGanesh))
  motionQuery.addEventListener('change', () => {
    setGaneshSlide(activeGanesh)
    setGaneshState()
  })
  setGaneshSlide(0)
  setGaneshState()
  }
}

const parasakthiBrowser = document.querySelector('.parasakthi-browser')
if (parasakthiBrowser) {
  const iframe = parasakthiBrowser.querySelector('iframe')
  if (iframe) {
  const showPreview = () => {
    parasakthiBrowser.classList.add('is-preview-loaded')
  }
  const showFallback = () => {
    parasakthiBrowser.classList.add('is-fallback')
  }
  iframe.addEventListener('load', showPreview, { once: true })
  iframe.addEventListener('error', showFallback, { once: true })
  }
}

document.querySelectorAll('.ganesh-browser, .svc-browser').forEach(browser => {
  const iframe = browser.querySelector('iframe')
  if (!iframe) return
  iframe.addEventListener('load', () => browser.classList.add('is-preview-loaded'), { once: true })
  iframe.addEventListener('error', () => browser.classList.add('is-fallback'), { once: true })
})

const svcShowcase = document.querySelector('.svc-showcase')
if (svcShowcase) {
  const track = svcShowcase.querySelector('.svc-showcase-track')
  const cards = [...svcShowcase.querySelectorAll('.svc-showcase-card')]
  const dots = [...document.querySelectorAll('[data-svc-dot]')]
  const count = document.querySelector('.svc-count')
  const prev = document.querySelector('.svc-prev')
  const next = document.querySelector('.svc-next')
  const lightbox = document.querySelector('.svc-lightbox')
  if (!track || !cards.length || !count || !prev || !next || !lightbox) {
    console.warn('Sri Venkateswara showcase skipped: required elements missing.')
  } else {
    const lightboxImage = lightbox.querySelector('img')
    const close = lightbox.querySelector('.svc-lightbox-close')
    const lightPrev = lightbox.querySelector('.svc-lightbox-prev')
    const lightNext = lightbox.querySelector('.svc-lightbox-next')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let activeSvc = 0
    let svcTimer = null
    let lastFocus = null
    let userPausedSvc = false

    const setSvcSlide = (index) => {
      activeSvc = (index + cards.length) % cards.length
      const card = cards[activeSvc]
      const maxOffset = Math.max(0, track.scrollWidth - svcShowcase.clientWidth)
      const centeredOffset = card.offsetLeft - ((svcShowcase.clientWidth - card.offsetWidth) / 2)
      const offset = Math.min(Math.max(0, centeredOffset), maxOffset)
      track.style.transform = `translate3d(${-offset}px,0,0)`
      cards.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === activeSvc))
      dots.forEach((dot, dotIndex) => dot.setAttribute('aria-current', String(dotIndex === activeSvc)))
      count.textContent = `${String(activeSvc + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`
      if (lightboxImage && !lightbox.hidden) {
        lightboxImage.src = svcWork[activeSvc].src
        lightboxImage.alt = svcWork[activeSvc].alt
      }
    }
    const stopSvcAuto = () => {
      if (svcTimer) window.clearInterval(svcTimer)
      svcTimer = null
    }
    const startSvcAuto = () => {
      stopSvcAuto()
      if (userPausedSvc || motionQuery.matches || document.hidden) return
      svcTimer = window.setInterval(() => setSvcSlide(activeSvc + 1), 4000)
    }
    const openSvcLightbox = (index, trigger) => {
      lastFocus = trigger
      setSvcSlide(index)
      if (lightboxImage) {
        lightboxImage.src = svcWork[activeSvc].src
        lightboxImage.alt = svcWork[activeSvc].alt
      }
      lightbox.hidden = false
      document.body.classList.add('lightbox-open')
      if (close) close.focus()
      stopSvcAuto()
    }
    const closeSvcLightbox = () => {
      lightbox.hidden = true
      document.body.classList.remove('lightbox-open')
      if (lastFocus) lastFocus.focus()
      startSvcAuto()
    }

    prev.addEventListener('click', () => { setSvcSlide(activeSvc - 1); startSvcAuto() })
    next.addEventListener('click', () => { setSvcSlide(activeSvc + 1); startSvcAuto() })
    dots.forEach(dot => dot.addEventListener('click', () => { setSvcSlide(Number(dot.dataset.svcDot)); startSvcAuto() }))
    cards.forEach(card => card.addEventListener('click', () => openSvcLightbox(Number(card.dataset.svcSlide), card)))
    svcShowcase.addEventListener('mouseenter', stopSvcAuto)
    svcShowcase.addEventListener('mouseleave', startSvcAuto)
    svcShowcase.addEventListener('focusin', stopSvcAuto)
    svcShowcase.addEventListener('focusout', startSvcAuto)
    if (close) close.addEventListener('click', closeSvcLightbox)
    if (lightPrev) lightPrev.addEventListener('click', () => setSvcSlide(activeSvc - 1))
    if (lightNext) lightNext.addEventListener('click', () => setSvcSlide(activeSvc + 1))
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeSvcLightbox() })
    svcShowcase.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); setSvcSlide(activeSvc - 1); startSvcAuto() }
      if (event.key === 'ArrowRight') { event.preventDefault(); setSvcSlide(activeSvc + 1); startSvcAuto() }
    })
    document.addEventListener('keydown', event => {
      if (lightbox.hidden) return
      if (event.key === 'Escape') closeSvcLightbox()
      if (event.key === 'ArrowLeft') setSvcSlide(activeSvc - 1)
      if (event.key === 'ArrowRight') setSvcSlide(activeSvc + 1)
    })
    document.addEventListener('visibilitychange', startSvcAuto)
    window.addEventListener('resize', () => setSvcSlide(activeSvc))
    motionQuery.addEventListener('change', startSvcAuto)
    setSvcSlide(0)
    startSvcAuto()
  }
}

const storyViewport = document.querySelector('.story-viewport')
if (storyViewport) {
  const panels = [...storyViewport.querySelectorAll('.story-panel')]
  const counter = document.querySelector('.story-count')
  const prevStory = document.querySelector('.story-prev')
  const nextStory = document.querySelector('.story-next')
  if (!panels.length || !counter || !prevStory || !nextStory) {
    console.warn('Story controls skipped: required elements missing.')
  } else {
  let activeStory = 0
  const showStory = (index) => {
    activeStory = (index + panels.length) % panels.length
    panels[activeStory].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
    counter.textContent = `${String(activeStory + 1).padStart(2, '0')} / ${String(panels.length).padStart(2, '0')}`
  }
  prevStory.addEventListener('click', () => showStory(activeStory - 1))
  nextStory.addEventListener('click', () => showStory(activeStory + 1))
  storyViewport.addEventListener('scroll', () => {
    const closest = panels.reduce((best, panel, index) => {
      const distance = Math.abs(panel.offsetLeft - storyViewport.scrollLeft)
      return distance < best.distance ? { index, distance } : best
    }, { index: 0, distance: Infinity })
    activeStory = closest.index
    counter.textContent = `${String(activeStory + 1).padStart(2, '0')} / ${String(panels.length).padStart(2, '0')}`
  }, { passive: true })
  }
}

const clientsArtworkCarousel = document.querySelector('[data-clients-art-carousel]')
if (clientsArtworkCarousel) {
  const track = clientsArtworkCarousel.querySelector('.clients-artwork-track')
  const cards = [...clientsArtworkCarousel.querySelectorAll('[data-clients-art]')]
  const prev = document.querySelector('[data-clients-art-prev]')
  const next = document.querySelector('[data-clients-art-next]')
  const toggle = document.querySelector('[data-clients-art-toggle]')
  const count = document.querySelector('[data-clients-art-count]')
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let active = 0
  let timer = null
  let userPaused = false
  let inView = true
  let touchStartX = 0
  let touchStartY = 0

  const setPausedLabel = () => {
    const paused = userPaused || motionQuery.matches
    if (!toggle) return
    toggle.textContent = paused ? 'Play' : 'Pause'
    toggle.setAttribute('aria-pressed', String(userPaused))
    toggle.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} artwork carousel`)
  }
  const positionTrack = () => {
    if (!track || !cards.length) return
    const card = cards[active]
    const maxOffset = Math.max(0, track.scrollWidth - clientsArtworkCarousel.clientWidth)
    const centered = card.offsetLeft - ((clientsArtworkCarousel.clientWidth - card.offsetWidth) / 2)
    const offset = Math.min(Math.max(centered, 0), maxOffset)
    track.style.transform = `translate3d(${-offset}px,0,0)`
  }
  const showArtwork = (index) => {
    if (!cards.length) return
    active = (index + cards.length) % cards.length
    cards.forEach((card, cardIndex) => {
      const isActive = cardIndex === active
      card.classList.toggle('is-active', isActive)
      card.setAttribute('aria-hidden', String(!isActive))
    })
    if (count) count.textContent = `${String(active + 1).padStart(2, '0')} — ${String(cards.length).padStart(2, '0')}`
    positionTrack()
  }
  const stopAuto = () => {
    if (timer) window.clearInterval(timer)
    timer = null
  }
  const startAuto = () => {
    stopAuto()
    if (userPaused || motionQuery.matches || document.hidden || !inView) return
    timer = window.setInterval(() => showArtwork(active + 1), 5000)
  }
  const nudgeArtwork = (index) => {
    showArtwork(index)
    startAuto()
  }

  if (!track || !cards.length || !prev || !next || !toggle) {
    console.warn('Clients artwork carousel skipped: required elements missing.')
  } else {
    prev.addEventListener('click', () => nudgeArtwork(active - 1))
    next.addEventListener('click', () => nudgeArtwork(active + 1))
    toggle.addEventListener('click', () => {
      userPaused = !userPaused
      setPausedLabel()
      startAuto()
    })
    clientsArtworkCarousel.addEventListener('keydown', event => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
      event.preventDefault()
      nudgeArtwork(active + (event.key === 'ArrowRight' ? 1 : -1))
    })
    clientsArtworkCarousel.addEventListener('touchstart', event => {
      const touch = event.changedTouches[0]
      touchStartX = touch.clientX
      touchStartY = touch.clientY
    }, { passive: true })
    clientsArtworkCarousel.addEventListener('touchend', event => {
      const touch = event.changedTouches[0]
      const dx = touch.clientX - touchStartX
      const dy = touch.clientY - touchStartY
      if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) nudgeArtwork(active + (dx < 0 ? 1 : -1))
    }, { passive: true })
    clientsArtworkCarousel.addEventListener('mouseenter', stopAuto)
    clientsArtworkCarousel.addEventListener('mouseleave', startAuto)
    clientsArtworkCarousel.addEventListener('focusin', stopAuto)
    clientsArtworkCarousel.addEventListener('focusout', startAuto)
    document.addEventListener('visibilitychange', () => document.hidden ? stopAuto() : startAuto())
    window.addEventListener('resize', positionTrack)
    motionQuery.addEventListener('change', () => { setPausedLabel(); startAuto() })
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        inView = entries[0]?.isIntersecting ?? true
        inView ? startAuto() : stopAuto()
      }, { threshold: .22 })
      observer.observe(clientsArtworkCarousel)
    }
    cards.forEach(card => {
      const img = card.querySelector('img')
      if (img) img.addEventListener('load', positionTrack, { once: true })
    })
    showArtwork(0)
    setPausedLabel()
    startAuto()
  }
}

const featuredCarousel = document.querySelector('.featured-media-carousel')
if (featuredCarousel) {
  const slides = [...featuredCarousel.querySelectorAll('.featured-media-slide')]
  const status = featuredCarousel.querySelector('.featured-media-status')
  const featuredPrev = featuredCarousel.querySelector('.featured-media-arrow--prev')
  const featuredNext = featuredCarousel.querySelector('.featured-media-arrow--next')
  if (!slides.length || !status || !featuredPrev || !featuredNext) {
    console.warn('Featured media carousel skipped: required elements missing.')
  } else {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let activeFeatured = 0
  let touchStartX = 0
  let touchStartY = 0
  let featuredTimer = null

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
  const stopFeaturedAuto = () => {
    if (featuredTimer) window.clearInterval(featuredTimer)
    featuredTimer = null
  }
  const startFeaturedAuto = () => {
    stopFeaturedAuto()
    if (motionQuery.matches || document.hidden) return
    featuredTimer = window.setInterval(() => showFeatured(activeFeatured + 1), 1000)
  }

  featuredPrev.addEventListener('click', () => { showFeatured(activeFeatured - 1); startFeaturedAuto() })
  featuredNext.addEventListener('click', () => { showFeatured(activeFeatured + 1); startFeaturedAuto() })
  featuredCarousel.addEventListener('keydown', event => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    showFeatured(activeFeatured + (event.key === 'ArrowRight' ? 1 : -1))
    startFeaturedAuto()
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
    startFeaturedAuto()
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
  featuredCarousel.addEventListener('mouseenter', stopFeaturedAuto)
  featuredCarousel.addEventListener('mouseleave', startFeaturedAuto)
  featuredCarousel.addEventListener('focusin', stopFeaturedAuto)
  featuredCarousel.addEventListener('focusout', startFeaturedAuto)
  document.addEventListener('visibilitychange', () => document.hidden ? stopFeaturedAuto() : startFeaturedAuto())
  motionQuery.addEventListener('change', () => { setFeaturedVideos(); startFeaturedAuto() })
  window.addEventListener('scroll', setFeaturedVideos, { passive: true })
  window.addEventListener('resize', setFeaturedVideos)
  setFeaturedVideos()
  startFeaturedAuto()
  }
}

const clientsArcHero = document.querySelector('.clients-arc-hero')
if (clientsArcHero) {
  const viewport = clientsArcHero.querySelector('.clients-arc-viewport')
  const track = clientsArcHero.querySelector('.clients-arc-track')
  const sequence = clientsArcHero.querySelector('.clients-arc-sequence')
  const toggle = clientsArcHero.querySelector('.clients-arc-toggle')
  if (!viewport || !track || !sequence || !toggle) {
    console.warn('Clients hero carousel skipped: required elements missing.')
  } else {
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
}

const tiruWork = document.querySelector('.tirumalasetty-work')
if (tiruWork) {
  const panels = [...tiruWork.querySelectorAll('.tirumalasetty-panel')]
  const dots = [...tiruWork.querySelectorAll('[data-tiru-dot]')]
  const count = tiruWork.querySelector('.tiru-count')
  const lightbox = tiruWork.querySelector('.tiru-lightbox')
  const tiruPrev = tiruWork.querySelector('.tiru-prev')
  const tiruNext = tiruWork.querySelector('.tiru-next')
  if (!panels.length || !dots.length || !count || !lightbox || !tiruPrev || !tiruNext) {
    console.warn('Tirumalasetty carousel skipped: required elements missing.')
  } else {
  const lightboxImg = lightbox.querySelector('img')
  const lightboxClose = lightbox.querySelector('.tiru-lightbox-close')
  const lightboxPrev = lightbox.querySelector('.tiru-lightbox-prev')
  const lightboxNext = lightbox.querySelector('.tiru-lightbox-next')
  if (!lightboxImg || !lightboxClose || !lightboxPrev || !lightboxNext) {
    console.warn('Tirumalasetty lightbox skipped: required elements missing.')
  } else {
  let activeTiru = 0
  let lastFocus = null
  let touchStartX = 0
  let touchStartY = 0
  let autoTiru = null
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
    if (motionQuery.matches) return
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
    lightboxClose.focus()
  }
  const closeTiruLightbox = () => {
    lightbox.hidden = true
    document.body.classList.remove('lightbox-open')
    if (lastFocus) lastFocus.focus()
    startTiruAuto()
  }

  const nudgeTiru = (index) => {
    setTiru(index)
    startTiruAuto()
  }
  tiruPrev.addEventListener('click', () => nudgeTiru(activeTiru - 1))
  tiruNext.addEventListener('click', () => nudgeTiru(activeTiru + 1))
  dots.forEach(dot => dot.addEventListener('click', () => nudgeTiru(Number(dot.dataset.tiruDot))))
  panels.forEach(panel => panel.addEventListener('click', () => openTiruLightbox(Number(panel.dataset.tiruPanel), panel)))
  tiruWork.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); nudgeTiru(activeTiru + 1) }
    if (event.key === 'ArrowLeft') { event.preventDefault(); nudgeTiru(activeTiru - 1) }
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
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) nudgeTiru(activeTiru + (dx < 0 ? 1 : -1))
    startTiruAuto()
  }, { passive: true })
  lightboxClose.addEventListener('click', closeTiruLightbox)
  lightboxPrev.addEventListener('click', () => setTiru(activeTiru - 1))
  lightboxNext.addEventListener('click', () => setTiru(activeTiru + 1))
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
  setTiru(0)
  startTiruAuto()
  }
  }
}

const renderClientsReactPage = async () => {
  return
  if (path !== '/clients') return
  const root = document.querySelector('#clients-react-root')
  if (!root) return

  try {
    const [{ default: React }, ReactDOM] = await Promise.all([
      import('https://esm.sh/react@18.3.1'),
      import('https://esm.sh/react-dom@18.3.1/client')
    ])
    const h = React.createElement

    function ClientHeroMedia({ src, index }) {
      const isVideo = src.toLowerCase().endsWith('.mp4')
      return h('figure', { className: `clients-arc-card clients-arc-card--${(index % 5) + 1}` },
        isVideo
          ? h('video', { muted: true, loop: true, autoPlay: true, playsInline: true, preload: 'metadata', 'aria-label': 'Client campaign video' },
              h('source', { src, type: 'video/mp4' })
            )
          : h('img', { src, alt: 'Client campaign creative', loading: index < 6 ? 'eager' : 'lazy', decoding: 'async' })
      )
    }

    function ClientsHero() {
      const [paused, setPaused] = React.useState(false)
      const media = [...clientHeroMedia, ...clientHeroMedia]
      return h('section', { className: `clients-arc-hero ${paused ? 'is-marquee-paused' : ''}`, 'aria-labelledby': 'clients-arc-title' },
        h('div', { className: 'clients-arc-shell' },
          h('div', { className: 'clients-arc-copy' },
            h('p', { className: 'kicker' }, 'Client portfolio'),
            h('h1', { id: 'clients-arc-title' }, 'Client Stories in Motion'),
            h('p', null, 'A cinematic wall of campaigns, brands and launch visuals created for the businesses we work with.'),
            h('div', { className: 'clients-arc-actions' },
              h('a', { className: 'button interactive-hover', href: '#client-brands' }, 'View Clients'),
              h('button', {
                className: 'clients-arc-toggle',
                type: 'button',
                'aria-pressed': String(paused),
                'aria-label': `${paused ? 'Resume' : 'Pause'} client media carousel`,
                onClick: () => setPaused(value => !value)
              }, paused ? 'Resume' : 'Pause')
            )
          )
        ),
        h('div', { className: 'clients-arc-viewport', 'aria-label': 'Client media carousel' },
          h('div', { className: 'clients-arc-track' },
            h('div', { className: 'clients-arc-sequence' }, media.map((src, index) => h(ClientHeroMedia, { src, index, key: `${src}-${index}` })))
          )
        )
      )
    }

    function FeaturedMediaCard({ media }) {
      if (media.type === 'video') {
        return h('div', { className: 'featured-media-card featured-media-card--video' },
          h('video', { autoPlay: true, muted: true, loop: true, playsInline: true, preload: 'metadata', poster: media.poster || '', 'aria-label': media.alt || 'Featured client video' },
            h('source', { src: media.src, type: 'video/mp4' })
          ),
          h('button', {
            className: 'featured-media-mute',
            type: 'button',
            'aria-pressed': 'true',
            onClick: event => {
              const video = event.currentTarget.parentElement.querySelector('video')
              video.muted = !video.muted
              event.currentTarget.textContent = video.muted ? 'Muted' : 'Sound on'
              event.currentTarget.setAttribute('aria-pressed', String(video.muted))
            }
          }, 'Muted')
        )
      }
      return h('div', { className: 'featured-media-card' },
        h('img', { src: media.src, alt: media.alt || 'Featured client creative', loading: 'lazy', decoding: 'async' })
      )
    }

    function FeaturedMediaCarousel() {
      const [active, setActive] = React.useState(0)
      const show = next => setActive((next + featuredMediaSlides.length) % featuredMediaSlides.length)
      React.useEffect(() => {
        const timer = window.setInterval(() => {
          setActive(value => (value + 1) % featuredMediaSlides.length)
        }, 1000)
        return () => window.clearInterval(timer)
      }, [])
      return h('section', { className: 'featured-media-carousel', 'aria-labelledby': 'featured-media-title', tabIndex: 0 },
        h('div', { className: 'featured-media-head' },
          h('p', { className: 'kicker' }, 'Featured Media'),
          h('h2', { id: 'featured-media-title' }, 'Campaigns with presence'),
          h('p', null, 'Selected client media staged as a premium editorial showcase.')
        ),
        h('div', { className: 'featured-media-shell' },
          h('div', { className: 'featured-media-slides' },
            featuredMediaSlides.map((slide, index) => h('article', {
              className: `featured-media-slide ${index === active ? 'is-active' : ''}`,
              'aria-hidden': String(index !== active),
              key: `${slide.category}-${index}`
            },
              h('div', { className: 'featured-media-copy' },
                h('p', { className: 'kicker' }, slide.category),
                h('h3', null, slide.title.split('\n').map((part, partIndex) => h(React.Fragment, { key: partIndex }, part, partIndex < slide.title.split('\n').length - 1 ? h('br') : null))),
                h('p', null, slide.description)
              ),
              h('div', { className: 'featured-media-pair' },
                h(FeaturedMediaCard, { media: slide.left }),
                h(FeaturedMediaCard, { media: slide.right })
              )
            ))
          ),
          h('button', { className: 'featured-media-arrow featured-media-arrow--prev', type: 'button', 'aria-label': 'Previous featured media', onClick: () => show(active - 1) }, '\u2190'),
          h('button', { className: 'featured-media-arrow featured-media-arrow--next', type: 'button', 'aria-label': 'Next featured media', onClick: () => show(active + 1) }, '\u2192'),
          h('p', { className: 'featured-media-status', 'aria-live': 'polite' }, `${active + 1} of ${featuredMediaSlides.length}`)
        )
      )
    }

    function ClientBrandCard({ client, index }) {
      const content = [
        h('span', { key: 'index' }, String(index + 1).padStart(2, '0')),
        h('div', { className: 'brand-logo-panel', key: 'logo' }, h('img', { src: client.logo, alt: `${client.name} logo`, loading: 'lazy', decoding: 'async' })),
        h('b', { key: 'name' }, client.name)
      ]
      return client.href
        ? h('a', { className: 'client-brand-card', href: client.href, 'aria-label': `View ${client.name} case study` }, content)
        : h('article', { className: 'client-brand-card' }, content)
    }

    function ClientBrandShowcase() {
      return h('section', { id: 'client-brands', className: 'client-brand-showcase', 'aria-labelledby': 'client-brands-title' },
        h('div', { className: 'client-brand-head' },
          h('p', { className: 'kicker' }, 'Our Branding'),
          h('h2', { id: 'client-brands-title' }, 'Brands we have worked with'),
          h('p', null, 'A curated wall of client identities, preserved in their original colors and presented inside refined glass display cards.')
        ),
        h('div', { className: 'client-brand-grid' }, clientBrands.map((client, index) => h(ClientBrandCard, { client, index, key: client.name })))
      )
    }

    function ClientsProjectCta() {
      return h('section', { className: 'clients-project-cta' },
        h('div', null,
          h('p', { className: 'kicker' }, 'Next collaboration'),
          h('h2', null, 'Let\u2019s build your next success story'),
          h('p', null, 'Bring the ambition. We will shape the creative system around it with the same focus, restraint and momentum.'),
          h('a', { className: 'button button--light interactive-hover', href: 'mailto:hello@dealatecorp.com' },
            h('span', null, 'Start a project'),
            h('i', { 'aria-hidden': 'true' }, '\u2197')
          )
        )
      )
    }

    function ClientsReactPage() {
      return h(React.Fragment, null,
        h(ClientsHero),
        h(FeaturedMediaCarousel),
        h(ClientBrandShowcase),
        h(ClientsProjectCta)
      )
    }

    ReactDOM.createRoot(root).render(h(ClientsReactPage))
  } catch (error) {
    console.warn('React clients page failed to load; static fallback is still visible.', error)
  }
}
renderClientsReactPage()

const siteHeader = document.querySelector('.site-header')
if (siteHeader) {
  const updateHeader = () => siteHeader.classList.toggle('site-header--scrolled', window.scrollY > 24)
  updateHeader()
  window.addEventListener('scroll', updateHeader, { passive: true })
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = window.matchMedia('(pointer: fine)').matches

if (!reducedMotion && finePointer) {
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
  const showCursor = () => {
    aura.classList.add('pointer-aura--visible')
    cursorDot.classList.add('smooth-cursor--visible')
    cursorRing.classList.add('smooth-cursor--visible')
  }
  const animateCursor = () => {
    ringX += (targetX - ringX) * .16
    ringY += (targetY - ringY) * .16
    cursorDot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
    requestAnimationFrame(animateCursor)
  }
  animateCursor()
  showCursor()
  window.addEventListener('pointermove', (event) => {
    targetX = event.clientX
    targetY = event.clientY
    aura.style.setProperty('--pointer-x', `${event.clientX}px`)
    aura.style.setProperty('--pointer-y', `${event.clientY}px`)
    showCursor()
  }, { passive: true })
  document.addEventListener('pointerover', event => {
    const interactive = event.target.closest('a, button, [tabindex="0"]')
    cursorRing.classList.toggle('smooth-cursor--interactive', Boolean(interactive))
  })
  document.addEventListener('pointerleave', showCursor)

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
