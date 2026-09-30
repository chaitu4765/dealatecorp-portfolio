import { studio, initStudio } from './studio.js'
import { clientBrands } from './client-brands.js'

const services = [
  {name:'Branding & Design', title:'A brand that feels unmistakably yours.', text:'Positioning, visual identity and campaign design that give your business a clear, consistent presence.', image:'branding', alt:'Brand design and creative materials', detail:1},
  {name:'Websites & E-commerce', title:'A better experience, from the first click.', text:'Fast websites, focused landing pages and online stores that make it easy for people to explore, enquire and buy.', image:'websites', alt:'A digital design workspace', detail:5},
  {name:'Online Marketing', title:'Reach the people ready to take notice.', text:'Google, Meta and LinkedIn campaigns shaped around your audience, your offer and the action that matters next.', image:'marketing', alt:'Advertising in an urban setting', detail:4},
  {name:'Content & Storytelling', title:'Give people a reason to remember you.', text:'A considered mix of words, design and video that makes your message useful, distinctive and worth sharing.', image:'content', alt:'Creative storytelling workspace', detail:2},
  {name:'AI & Automation', title:'Less busywork. More room to grow.', text:'Practical workflows that connect enquiries, follow-ups and reporting, helping your team move with clarity.', image:'automation', alt:'Technology and connected systems', detail:6},
  {name:'Social Media Management', title:'Show up with something worth saying.', text:'Content planning, creative production and publishing that keep your brand consistent and your audience engaged.', image:'social', alt:'Social media on a mobile device', detail:2},
  {name:'SEO & Analytics', title:'Be discovered. Understand what works.', text:'Search optimisation, local visibility and clear reporting that turn digital activity into informed decisions.', image:'analytics', alt:'Digital analytics and reporting', detail:3},
  {name:'Video Production', title:'Make every frame mean something.', text:'Reels, product stories and campaign films, brought together with purposeful editing and a clear creative direction.', image:'video', alt:'Professional video production equipment', detail:2}
]

const selectedWork = [
  ['interiors','Interiors','Campaign design'],
  ['jewellery','Jewellery','Art direction'],
  ['hospitality','Hospitality','Social creative'],
  ['fashion','Fashion','Campaign design']
]

export function home() {
  return `<main id="main-content" class="dc-home">
    <section class="dc-hero" aria-labelledby="hero-title">
      <div class="dc-hero__copy">
        <p class="dc-eyebrow">DC Creative Labs <span>Hyderabad, India</span></p>
        <h1 id="hero-title">Good design.<br>Clear strategy.<br><em>Lasting growth.</em></h1>
        <p class="dc-hero__description">We bring brand, content and digital marketing together to help your business find its voice, reach the right people and move forward.</p>
        <div class="dc-actions"><a class="dc-button" href="tel:+919550548811">Let’s talk</a><a class="dc-button dc-button--outline" href="#home-services">Explore our services</a></div>
        <p class="dc-hero__signature">Creative strategies. Digital growth.</p>
      </div>
      <figure class="dc-reel">
        <div class="dc-reel__frame"><video id="dc-reel-video" src="/assets/dc-creative-reel.mp4" poster="/assets/dc-creative-reel-poster.jpg" autoplay loop muted playsinline preload="metadata" aria-label="DC Creative Labs introduction"></video><div class="dc-reel__controls"><button type="button" id="reel-play" aria-label="Pause introduction video">Pause</button><button type="button" id="reel-mute" aria-label="Unmute introduction video" aria-pressed="false">Sound off</button></div></div>
        <figcaption><span>Inside DC Creative Labs</span><span>00:16</span></figcaption>
      </figure>
      <a class="dc-hero__scroll" href="#home-services">Discover what we do <span aria-hidden="true">↓</span></a>
    </section>

    <section class="dc-services-intro dc-wrap" id="home-services" aria-labelledby="services-title"><p class="dc-eyebrow">01 / What we do</p><div><h2 id="services-title">Different disciplines.<br><span>One shared direction.</span></h2><p>From the first impression to the next enquiry, every part of your digital presence should work together.</p></div></section>
    <section class="dc-showcase" aria-label="Explore our eight services">
      <div class="dc-showcase__sticky">
        <div class="dc-service-nav"><p class="dc-eyebrow">Our capabilities</p><nav aria-label="Services">${services.map((s,i)=>`<a href="#service-${i+1}" data-service-link="${i}" ${i===0?'aria-current="true"':''}><span class="dc-service-nav__marker" aria-hidden="true">→</span>${s.name}</a>`).join('')}</nav><a href="#selected-work" class="dc-skip">Skip to our work <span aria-hidden="true">↓</span></a></div>
        <div class="dc-service-stage" aria-hidden="true"><div class="dc-service-stage__images">${services.map((s,i)=>`<figure class="dc-service-visual" data-service-visual="${i}"><img src="/assets/services/${s.image}.jpg" alt="" loading="lazy" width="1000" height="667"><figcaption><span>${String(i+1).padStart(2,'0')}</span>${s.name}</figcaption></figure>`).join('')}</div></div>
        <div class="dc-service-details">${services.map((s,i)=>`<article class="dc-service-detail" data-service-detail="${i}" ${i?'hidden':''}><p class="dc-eyebrow">${String(i+1).padStart(2,'0')} / ${String(services.length).padStart(2,'0')}</p><h3>${s.title}</h3><p>${s.text}</p><a class="dc-service-link" href="/services/#layer-${s.detail}">Explore ${s.name}</a></article>`).join('')}<div class="dc-service-progress"><span class="dc-service-progress__label">${services[0].name}</span><span class="dc-service-progress__count">01 / 08</span><div class="dc-service-progress__track"><i></i></div></div></div>
      </div>
      <div class="dc-service-anchors" aria-hidden="true">${services.map((_,i)=>`<span id="service-${i+1}"></span>`).join('')}</div>
    </section>
    <section class="dc-mobile-services dc-wrap" aria-label="Services">${services.map((s,i)=>`<article><img src="/assets/services/${s.image}.jpg" alt="${s.alt}" loading="lazy" width="1000" height="667"><p class="dc-eyebrow">${String(i+1).padStart(2,'0')} / ${s.name}</p><h3>${s.title}</h3><p>${s.text}</p><a class="dc-service-link" href="/services/#layer-${s.detail}">Explore service</a></article>`).join('')}</section>

    <section id="selected-work" class="dc-work dc-wrap" aria-labelledby="work-title"><div class="dc-section-heading"><div><p class="dc-eyebrow">02 / Selected creative</p><h2 id="work-title">Let the work<br><span>do the talking.</span></h2></div><p>A selection of campaign design and social creative from DC Creative Labs.</p></div><div class="dc-work-grid">${selectedWork.map(([file,name,type],i)=>`<figure class="dc-work-item"><div class="dc-work-item__image"><img src="/assets/work/${file}.jpg" alt="${name} ${type.toLowerCase()} by DC Creative Labs" loading="lazy" width="1080" height="1080"></div><figcaption><h3>${name}</h3><span>${type}</span></figcaption></figure>`).join('')}</div></section>

    ${studio()}

    <section class="dc-clients dc-wrap" aria-labelledby="clients-title"><div class="dc-section-heading"><div><p class="dc-eyebrow">04 / Our clients</p><h2 id="clients-title">Good work starts<br><span>with a good partnership.</span></h2></div><div class="dc-client-actions"><a class="dc-service-link" href="/clients/">Meet our clients</a><button class="dc-client-motion" type="button" aria-pressed="false">Pause motion</button></div></div><div class="dc-client-grid">${clientBrands.map(([name,logo],i)=>`<article class="dc-client-card" style="--float-delay:${i * -0.6}s"><span class="dc-client-card__number" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><div class="dc-client-card__logo"><img src="${logo}" alt="${name} logo" loading="lazy" decoding="async" width="180" height="140"></div><h3>${name}</h3></article>`).join('')}</div></section>

    <section class="dc-contact dc-wrap" id="contact"><p class="dc-eyebrow">Have something in mind?</p><h2>Let’s make<br><span>your next move count.</span></h2><div><a class="dc-button" href="tel:+919550548811">Start a conversation</a><a href="mailto:hr@dealatecorp.com">hr@dealatecorp.com</a></div><p>Hyderabad, India <span>+91 95505 48811</span></p></section>
  </main>`
}

export function initHome() {
  initStudio()
  const clientSection = document.querySelector('.dc-clients')
  const motionToggle = clientSection?.querySelector('.dc-client-motion')
  motionToggle?.addEventListener('click', () => {
    const paused = clientSection.classList.toggle('is-paused')
    motionToggle.setAttribute('aria-pressed', String(paused))
    motionToggle.textContent = paused ? 'Resume motion' : 'Pause motion'
  })
  const section = document.querySelector('.dc-showcase')
  if (!section) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  const desktop = window.matchMedia('(min-width: 1000px) and (min-height: 640px)')
  const visuals = [...section.querySelectorAll('[data-service-visual]')]
  const links = [...section.querySelectorAll('[data-service-link]')]
  const details = [...section.querySelectorAll('[data-service-detail]')]
  const fill = section.querySelector('.dc-service-progress__track i')
  const label = section.querySelector('.dc-service-progress__label')
  const count = section.querySelector('.dc-service-progress__count')
  const stage = section.querySelector('.dc-service-stage')
  let active = -1, frame = 0
  function update() {
    frame = 0
    if (!desktop.matches || reduced.matches) return
    const rect = section.getBoundingClientRect()
    const maxScroll = section.offsetHeight - innerHeight
    const p = Math.max(0,Math.min(1,-rect.top/maxScroll))
    const position = p * (services.length-1)
    const next = Math.round(position)
    if (active !== next) {
      active = next
      links.forEach((link,i) => i === active ? link.setAttribute('aria-current','true') : link.removeAttribute('aria-current'))
      details.forEach((item,i) => item.hidden = i !== active)
      label.textContent = services[active].name
      count.textContent = `${String(active+1).padStart(2,'0')} / 08`
    }
    const spacing = stage.clientHeight * .91
    visuals.forEach((visual,i) => {
      const delta = i-position
      visual.style.transform = `translate3d(${i%2 ? '-5%' : '5%'},${delta*spacing}px,0)`
      visual.style.visibility = Math.abs(delta) < 1.5 ? 'visible' : 'hidden'
    })
    fill.style.transform = `scaleX(${(position+1)/services.length})`
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
  window.addEventListener('scroll',schedule,{passive:true})
  window.addEventListener('resize',schedule)
  desktop.addEventListener('change',schedule)
  reduced.addEventListener('change',schedule)
  links.forEach((link,i) => link.addEventListener('click',event => {
    if (!desktop.matches || reduced.matches) return
    event.preventDefault()
    const top = scrollY + section.getBoundingClientRect().top
    window.scrollTo({top:top + i/(services.length-1)*(section.offsetHeight-innerHeight),behavior:'smooth'})
  }))
  update()

  const video = document.querySelector('#dc-reel-video')
  const play = document.querySelector('#reel-play')
  const mute = document.querySelector('#reel-mute')
  const syncVideo = () => { play.textContent = video.paused ? 'Play' : 'Pause'; play.setAttribute('aria-label',`${video.paused?'Play':'Pause'} introduction video`) }
  if(reduced.matches) video.pause()
  video.addEventListener('play',syncVideo)
  video.addEventListener('pause',syncVideo)
  play.addEventListener('click',()=>{ if(video.paused) video.play().catch(syncVideo); else video.pause() })
  mute.addEventListener('click',()=>{video.muted = !video.muted;mute.textContent=video.muted?'Sound off':'Sound on';mute.setAttribute('aria-label',`${video.muted?'Unmute':'Mute'} introduction video`);mute.setAttribute('aria-pressed',String(!video.muted))})
  syncVideo()
  const reveal = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('dc-visible');reveal.unobserve(entry.target)}}),{threshold:.08})
  document.querySelectorAll('.dc-work-item,.dc-principles article').forEach(el=>{el.classList.add('dc-reveal');reveal.observe(el)})
}
