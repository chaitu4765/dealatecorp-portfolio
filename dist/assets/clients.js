const clientBrands = [
  ['Adhithya Sai Promoters','/assets/logo/adithya sai.jpeg'],['Spark Clinic','/assets/logo/spark-clinic.png'],['Sree Surya Infra','/assets/logo/sree surya.jpeg'],['Ganesh Constructions','/assets/logo/ganesh.jpeg'],['Sri Conventions','/assets/logo/sri-conventions (1).png'],['Sri Parasakthi Peetam','/assets/logo/sri-parasakthi-peetam.png'],['SSM','/assets/logo/ssm.jpeg'],['SV Constructions','/assets/logo/sv-constructions.png'],['Tirumalsetty','/assets/logo/tirumalsetty.jpeg'],['UBIC','/assets/logo/UBIC_Primary_Square(Black).png']
]

const clientSectors = [
  ['01','IT Services','Digital products, infrastructure and technology teams'],
  ['02','Digital Marketing','Campaigns, content and growth systems that convert'],
  ['03','Finance','Trusted financial, property and investment partners']
]

const media = [
  ['/assets/poster2/look.jpeg','Fashion campaign'],['/assets/poster2/dc.jpg','Brand campaign'],['/assets/poster2/dc1.jpg','Creative campaign'],['/assets/poster2/e.jpg','Editorial campaign'],['/assets/poster2/intrior.jpg','Interior campaign'],['/assets/poster2/unwrap.jpeg','Jewellery campaign'],['/assets/poster2/WhatsApp Image 2026-09-29 at 2.25.18 PM.jpeg','Hospitality campaign'],['/assets/poster2/plan.jpeg','Launch campaign'],['/assets/poster2/plan.jpeg','Campaign planning'],['/assets/poster2/saree.jpg','Fashion campaign'],['/assets/poster2/today.jpg','Performance creative'],['/assets/poster2/tree.jpeg','Brand story'],['/assets/postors/ganesh.jpg','Client campaign'],['/assets/postors/ts2.jpg','Property campaign']
]

function mediaCard([src,label],i){return `<figure class="clients-media-card"><img src="${src}" alt="${label} by DC Creative Labs" loading="${i<6?'eager':'lazy'}" decoding="async"><figcaption>${label}</figcaption></figure>`}

export function clientsPage(){
  const cards=media.map(mediaCard).join('')
  return `<main class="clients-page"><section class="clients-hero" aria-labelledby="clients-title"><div class="clients-hero__copy"><p class="clients-pill">Creative work. Real client stories.</p><h1 id="clients-title">Built on trust.<br><em>Measured in momentum.</em></h1><p>Discover the brands, campaigns and digital experiences we create with the businesses we partner with.</p></div><div class="clients-media-viewport" tabindex="0" aria-label="Client creative showcase"><div class="clients-media-track"><div class="clients-media-sequence">${cards}</div><div class="clients-media-sequence" aria-hidden="true">${cards}</div></div></div><div class="clients-hero-actions"><a class="clients-action" href="#client-brands">Explore our clients</a><button type="button" class="clients-toggle" aria-pressed="false">Pause movement</button></div></section><section class="client-brand-showcase" id="client-brands" aria-labelledby="brand-title"><div class="client-brand-head"><p class="kicker">Our clients</p><h2 id="brand-title">Brands we have<br><span>worked with.</span></h2><p>A curated wall of client identities, preserved in their original colors and presented with clarity.</p></div><div class="client-sector-grid" aria-label="Client sectors">${clientSectors.map(([number,name,description])=>`<article class="client-sector-card"><span>${number}</span><h3>${name}</h3><p>${description}</p></article>`).join('')}</div><div class="client-brand-grid">${clientBrands.map(([name,logo],i)=>`<article class="client-brand-card"><span>${String(i+1).padStart(2,'0')}</span><div class="brand-logo-panel"><img src="${logo}" alt="${name} logo" loading="lazy" decoding="async"></div><b>${name}</b></article>`).join('')}</div></section><section class="clients-project-cta"><div><p class="kicker">Next collaboration</p><h2>Let’s build your next success story.</h2><p>Bring the ambition. We will shape the creative system around it with focus, restraint and momentum.</p><a class="button button--light" href="mailto:hr@dealatecorp.com">Start a project</a></div></section></main>`
}

export function initClients(){
  const hero=document.querySelector('.clients-hero'), viewport=document.querySelector('.clients-media-viewport'), track=document.querySelector('.clients-media-track'), sequence=document.querySelector('.clients-media-sequence'), toggle=document.querySelector('.clients-toggle')
  if(!hero||!viewport||!track||!sequence||!toggle)return
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'); let userPaused=false
  const setDuration=()=>track.style.setProperty('--clients-duration',`${Math.max(30,sequence.scrollWidth/34)}s`)
  const sync=()=>{const paused=userPaused||reduced.matches;hero.classList.toggle('is-paused',paused);toggle.textContent=paused?'Play movement':'Pause movement';toggle.setAttribute('aria-pressed',String(userPaused));toggle.disabled=reduced.matches}
  toggle.addEventListener('click',()=>{userPaused=!userPaused;sync()}); reduced.addEventListener('change',sync); window.addEventListener('resize',setDuration); viewport.addEventListener('pointerenter',()=>hero.classList.add('is-hovered')); viewport.addEventListener('pointerleave',()=>hero.classList.remove('is-hovered')); viewport.addEventListener('focusin',()=>hero.classList.add('is-hovered')); viewport.addEventListener('focusout',()=>hero.classList.remove('is-hovered')); setDuration();sync()
}
