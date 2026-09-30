// Native SVG adaptation of Inspira UI Animated Beam. See third-party-notices.txt.
export const serviceCatalog = [
  {id:'seo',name:'Search Engine Optimization',short:'SEO',group:'Search & discovery',icon:'search',color:'#176bf5',description:'Technical, on-page and off-page SEO that strengthens search visibility, organic traffic and qualified enquiries.',includes:['Technical SEO','On-page optimisation','Off-page authority'],alias:3},
  {id:'local-seo',name:'Local SEO',short:'Local SEO',group:'Search & discovery',icon:'pin',color:'#176bf5',description:'A stronger local presence for Google Maps, near-me searches, local enquiries and visits to your business.',includes:['Google Maps visibility','Local search','Business profile optimisation']},
  {id:'google-ads',name:'Google Ads (PPC)',short:'Google Ads',group:'Paid acquisition',icon:'googleads',color:'#4285f4',description:'High-intent paid campaigns that bring the right traffic to your business, with ongoing attention to qualified leads, conversions and ad spend.',includes:['Search campaigns','Audience & keyword targeting','Campaign optimisation'],alias:4},
  {id:'social-media',name:'Social Media Marketing',short:'Social Media',group:'Content & community',icon:'users',color:'#8b5cf6',description:'Platform-focused strategies that grow your audience, encourage engagement and build a consistent brand presence.',includes:['Platform strategy','Audience engagement','Community growth']},
  {id:'meta-ads',name:'Meta Ads',short:'Meta Ads',subtitle:'Facebook & Instagram Ads',group:'Paid acquisition',icon:'meta',color:'#0866ff',description:'Facebook and Instagram advertising that combines purposeful creative with audience targeting to support reach, qualified leads and conversions.',includes:['Facebook Ads','Instagram Ads','Creative & audience testing']},
  {id:'linkedin',name:'LinkedIn Marketing',short:'LinkedIn',group:'B2B marketing',icon:'linkedin',color:'#0a66c2',description:'B2B marketing that builds professional visibility, meaningful connections and qualified business enquiries.',includes:['B2B positioning','Professional audiences','Lead generation']},
  {id:'youtube',name:'YouTube Marketing',short:'YouTube',group:'Video & discovery',icon:'youtube',color:'#ff0033',description:'Video content, YouTube SEO and advertising that help people discover your brand, watch your stories and take the next step.',includes:['Video content','YouTube SEO','YouTube advertising']},
  {id:'content',name:'Content Marketing',short:'Content',group:'Content & community',icon:'file',color:'#8b5cf6',description:'Search-focused content that develops organic authority, earns audience trust and supports long-term website visibility.',includes:['Search-focused content','Brand storytelling','Content planning'],alias:2},
  {id:'email',name:'Email Marketing',short:'Email',group:'Engagement & retention',icon:'mail',color:'#d97706',description:'Personalised email campaigns that nurture leads, keep customers engaged and support repeat purchases and retention.',includes:['Email campaigns','Lead nurturing','Customer retention']},
  {id:'whatsapp',name:'WhatsApp Marketing',short:'WhatsApp',group:'Engagement & retention',icon:'whatsapp',color:'#16a34a',description:'Targeted messaging and automated customer journeys that turn interest into useful conversations, enquiries and customer action.',includes:['Targeted messaging','Automated journeys','Customer engagement'],alias:6},
  {id:'influencer',name:'Influencer Marketing',short:'Influencers',group:'Content & community',icon:'spark',color:'#d946a6',description:'Relevant creator partnerships that help your brand reach new audiences with an authentic voice and trusted recommendations.',includes:['Creator partnerships','Audience relevance','Campaign coordination']},
  {id:'reputation',name:'Online Reputation Management',short:'Reputation',group:'Trust & credibility',icon:'shield',color:'#0d9488',description:'A considered approach to reviews and your digital reputation, helping people feel confident choosing your business.',includes:['Review presence','Brand credibility','Reputation monitoring']},
  {id:'cro',name:'Conversion Rate Optimization',short:'Conversion',group:'Conversion & experience',icon:'target',color:'#ea580c',description:'Landing-page and user-experience improvements that help more of your existing visitors become enquiries and customers.',includes:['Landing pages','Customer journeys','Conversion optimisation'],alias:5},
  {id:'analytics',name:'Marketing Analytics & Reporting',short:'Analytics',group:'Measurement & insight',icon:'analytics',color:'#e37400',description:'Clear campaign reporting and actionable insights that explain performance and help you decide what to improve next.',includes:['Campaign analytics','Performance reports','Actionable insights'],alias:7}
]

const supportingCapabilities = [
  {id:'branding',name:'Branding & Design',description:'Positioning, visual identity and campaign design that give your business a clear, consistent presence.'},
  {id:'websites',name:'Websites & E-commerce',description:'Fast websites, focused landing pages and online stores that make it easy for people to explore, enquire and buy.'},
  {id:'automation',name:'AI & Automation',description:'Practical workflows that connect enquiries, follow-ups and reporting, helping your team move with clarity.'},
  {id:'video',name:'Video Production',description:'Reels, product stories and campaign films, brought together with purposeful editing and a clear creative direction.'}
]

const symbolPaths = {
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  pin:'<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  users:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M17 5a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 4v2"/>',
  file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 13h8M8 17h6"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  spark:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
  shield:'<path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Z"/><path d="m8 12 3 3 5-6"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'
}

function icon(service) {
  if (['googleads','meta','youtube','whatsapp','analytics'].includes(service.icon)) return `<img src="/assets/icons/${service.icon}.svg" width="25" height="25" alt="">`
  if(service.icon==='linkedin') return '<b class="service-linkedin" aria-hidden="true">in</b>'
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${symbolPaths[service.icon]}</svg>`
}

function node(service,index) {
  return `<button class="service-node" type="button" data-beam-node="${index}" aria-pressed="${index===2}" aria-controls="service-focus" style="--node-color:${service.color}"><span class="service-node__label">${service.short}</span><span class="service-node__icon">${icon(service)}</span><span class="sr-only">${service.name!==service.short?` — ${service.name}`:''}</span></button>`
}

export function services() {
  const selected = serviceCatalog[2]
  return `<main class="dc-services-page" id="main-content">
    <section class="services-heading dc-wrap" id="layer-1"><p class="dc-eyebrow">DC Creative Labs / Our services</p><h1>Every channel.<br><em>One connected strategy.</em></h1><div><p>Fourteen digital marketing services, built around your business goals. Explore how each one connects to the bigger picture.</p><a class="dc-service-link" href="#service-directory">View every service</a></div></section>
    <section class="service-network-section dc-wrap" aria-labelledby="network-title"><div class="network-heading"><div><p class="dc-eyebrow">The connected approach</p><h2 id="network-title">Your growth, at the centre.</h2></div><p id="network-help">Select a service to explore what it can do for your business.</p></div>
      <div class="service-network" aria-describedby="network-help">
        <svg class="service-beams" aria-hidden="true" focusable="false"><defs></defs></svg>
        <div class="service-network__side service-network__side--left">${serviceCatalog.slice(0,7).map(node).join('')}</div>
        <div class="service-network__hub"><div class="service-network__brand"><img src="/assets/icons/dc-logo.png" width="70" height="59" alt="DC Creative Labs"></div><span>One shared<br>growth strategy</span></div>
        <div class="service-network__side service-network__side--right">${serviceCatalog.slice(7).map((s,i)=>node(s,i+7)).join('')}</div>
      </div>
      <div class="network-toolbar"><span>14 services. One team.</span><button type="button" class="beam-motion-toggle" aria-pressed="false">Pause animation</button></div>
      <div class="service-focus" id="service-focus" style="--selected-color:${selected.color}"><span class="service-focus__number" aria-hidden="true">03 <small>/ 14</small></span><div class="service-focus__copy" aria-live="polite" aria-atomic="true"><p class="dc-eyebrow">${selected.group}</p><h3>${selected.name}</h3><p class="service-focus__description">${selected.description}</p><ul>${selected.includes.map(t=>`<li>${t}</li>`).join('')}</ul></div><a class="dc-button service-focus__cta" href="mailto:hr@dealatecorp.com?subject=${encodeURIComponent('Enquiry: '+selected.name)}">Discuss this service</a></div>
    </section>
    <section class="service-directory dc-wrap" id="service-directory" aria-labelledby="directory-title"><div class="dc-section-heading"><div><p class="dc-eyebrow">The full service suite</p><h2 id="directory-title">A clear role<br><span>for every channel.</span></h2></div><p>Choose the services your business needs today. Build on them as your priorities evolve.</p></div><div class="service-directory__grid">${serviceCatalog.map((s,i)=>`<article id="service-${s.id}">${s.alias?`<span class="service-anchor" id="layer-${s.alias}"></span>`:''}<div class="service-directory__title"><span class="service-directory__icon" style="color:${s.color}">${icon(s)}</span><span class="dc-eyebrow">${String(i+1).padStart(2,'0')} / ${s.group}</span></div><h3>${s.name}</h3>${s.subtitle?`<p class="service-directory__subtitle">${s.subtitle}</p>`:''}<p>${s.description}</p><ul>${s.includes.map(t=>`<li>${t}</li>`).join('')}</ul></article>`).join('')}</div></section>
    <section class="service-directory service-capabilities dc-wrap" aria-labelledby="capabilities-title"><div class="dc-section-heading"><div><p class="dc-eyebrow">Supporting capabilities</p><h2 id="capabilities-title">Brand, digital<br><span>and creative.</span></h2></div><p>Branding, websites, practical automation and video production complement the marketing services above.</p></div><div class="service-directory__grid">${supportingCapabilities.map(s=>`<article id="capability-${s.id}"><h3>${s.name}</h3><p>${s.description}</p></article>`).join('')}</div></section>
    <section class="services-next dc-wrap"><div><p class="dc-eyebrow">Not sure where to begin?</p><h2>Start with your goal.<br><span>We’ll connect the pieces.</span></h2></div><div><p>Tell us about your business, your audience and what you want to achieve next.</p><a class="dc-button" href="tel:+919550548811">Talk to our team</a></div></section>
  </main>`
}

export function initServices() {
  const container=document.querySelector('.service-network')
  if(!container) return
  const svg=container.querySelector('.service-beams')
  const hub=container.querySelector('.service-network__brand')
  const nodes=[...container.querySelectorAll('[data-beam-node]')]
  const focus=document.querySelector('.service-focus')
  const toggle=document.querySelector('.beam-motion-toggle')
  const reduced=matchMedia('(prefers-reduced-motion: reduce)')
  let selected=2,frame=0,paused=false,inView=false,disposed=false
  const NS='http://www.w3.org/2000/svg'
  const make=(tag,attrs,parent)=>{const el=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));parent.append(el);return el}
  const definitions=svg.querySelector('defs')
  const beams=nodes.map((node,i)=>{
    const gradient=make('linearGradient',{id:`service-beam-${i}`,gradientUnits:'userSpaceOnUse',x1:0,x2:0,y1:0,y2:0},definitions)
    make('stop',{offset:'0%','stop-color':serviceCatalog[i].color,'stop-opacity':0},gradient)
    make('stop',{offset:'30%','stop-color':serviceCatalog[i].color,'stop-opacity':1},gradient)
    make('stop',{offset:'65%','stop-color':'#55aaff','stop-opacity':1},gradient)
    make('stop',{offset:'100%','stop-color':'#55aaff','stop-opacity':0},gradient)
    const group=make('g',{'data-beam':i,class:i===selected?'is-selected':''},svg)
    const track=make('path',{class:'beam-track',fill:'none','stroke-linecap':'round'},group)
    const light=make('path',{class:'beam-light',fill:'none',stroke:`url(#service-beam-${i})`,'stroke-linecap':'round'},group)
    return {gradient,group,track,light}
  })
  function motionState(){
    const stopped=paused||reduced.matches||!inView||document.hidden
    stopped?svg.pauseAnimations():svg.unpauseAnimations()
    svg.classList.toggle('is-reduced',reduced.matches)
    toggle.disabled=reduced.matches
    toggle.textContent=reduced.matches?'Reduced motion enabled':paused?'Play animation':'Pause animation'
    toggle.setAttribute('aria-pressed',String(paused||reduced.matches))
  }
  function draw(){
    frame=0
    if(disposed) return
    const rect=container.getBoundingClientRect(),centre=hub.getBoundingClientRect()
    svg.setAttribute('viewBox',`0 0 ${rect.width} ${rect.height}`)
    const ex=centre.left-rect.left+centre.width/2,ey=centre.top-rect.top+centre.height/2
    beams.forEach((beam,i)=>{
      const icon=nodes[i].querySelector('.service-node__icon').getBoundingClientRect()
      const sx=icon.left-rect.left+icon.width/2,sy=icon.top-rect.top+icon.height/2
      const d=`M ${sx} ${sy} Q ${(sx+ex)/2} ${sy} ${ex} ${ey}`
      beam.track.setAttribute('d',d);beam.light.setAttribute('d',d)
      const delta=ex-sx
      beam.gradient.querySelectorAll('animate').forEach(el=>el.remove())
      beam.gradient.setAttribute('x1',sx);beam.gradient.setAttribute('x2',ex)
      if(!reduced.matches){
        const attrs={dur:`${4.5+(i%3)*.7}s`,begin:`-${i*.47}s`,repeatCount:'indefinite',calcMode:'linear'}
        make('animate',{...attrs,attributeName:'x1',values:`${sx-delta*.6};${ex}`},beam.gradient)
        make('animate',{...attrs,attributeName:'x2',values:`${sx};${ex+delta*.6}`},beam.gradient)
      }
    })
    motionState()
  }
  const schedule=()=>{if(!disposed&&!frame)frame=requestAnimationFrame(draw)}
  nodes.forEach((node,i)=>node.addEventListener('click',()=>{
    selected=i
    nodes.forEach((button,j)=>button.setAttribute('aria-pressed',String(i===j)))
    beams.forEach((beam,j)=>beam.group.classList.toggle('is-selected',i===j))
    const s=serviceCatalog[i]
    focus.style.setProperty('--selected-color',s.color)
    focus.querySelector('.service-focus__number').innerHTML=`${String(i+1).padStart(2,'0')} <small>/ 14</small>`
    focus.querySelector('.dc-eyebrow').textContent=s.group
    focus.querySelector('h3').textContent=s.name
    focus.querySelector('.service-focus__description').textContent=s.description
    focus.querySelector('ul').replaceChildren(...s.includes.map(text=>{const li=document.createElement('li');li.textContent=text;return li}))
    focus.querySelector('a').href=`mailto:hr@dealatecorp.com?subject=${encodeURIComponent('Enquiry: '+s.name)}`
    if(innerWidth<640)focus.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'})
  }))
  toggle.addEventListener('click',()=>{paused=!paused;motionState()})
  const observer=new ResizeObserver(schedule)
  observer.observe(container);observer.observe(hub);nodes.forEach(node=>observer.observe(node))
  const visibility=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;motionState()},{rootMargin:'100px'})
  visibility.observe(container)
  const mediaChange=()=>{schedule();motionState()}
  reduced.addEventListener('change',mediaChange)
  document.addEventListener('visibilitychange',motionState)
  document.fonts.ready.then(schedule)
  window.addEventListener('pagehide',event=>{if(event.persisted){svg.pauseAnimations();return}disposed=true;observer.disconnect();visibility.disconnect();cancelAnimationFrame(frame);reduced.removeEventListener('change',mediaChange);document.removeEventListener('visibilitychange',motionState)},{once:true})
  window.addEventListener('pageshow',()=>{if(!disposed){schedule();motionState()}})
  draw()
}
