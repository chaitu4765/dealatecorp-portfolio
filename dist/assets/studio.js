const film = (id, title, caption) => `<article class="studio-film" aria-label="${title}"><div class="studio-film__heading"><span>Film & production</span><span>${title}</span></div><div class="studio-film__media"><video data-studio-video="${id}" data-src="/assets/studio/${id}-film.mp4" poster="/assets/studio/${id}-poster.jpg" muted loop playsinline preload="none" aria-label="${title} property film"></video><div class="studio-film__controls"><button type="button" data-film-play aria-label="Play ${title} film">Play</button><button type="button" data-film-sound aria-label="Unmute ${title} film" aria-pressed="false">Sound off</button></div></div><p>${caption}</p></article>`

export function studio() {
  return `<section class="dc-studio" id="inside-dc" aria-labelledby="studio-title">
    <div class="studio-heading dc-wrap"><p class="dc-eyebrow">03 / The creative perspective</p><h2 id="studio-title">Creative thinking.<br><span>Made visible.</span></h2><p>From the first conversation to the final frame. A look at the ideas, stories and craft behind DC Creative Labs.</p></div>
    <div class="studio-rail" tabindex="0" aria-label="Creative studio showcase. Scroll horizontally to explore." aria-describedby="studio-help">
      <div class="studio-column studio-ethos"><p class="studio-kicker">Our ethos</p><h3>Listen closely.<br>Think clearly.<br>Create with purpose.</h3><div class="studio-ethos__diagram" aria-label="Strategy and creativity working together"><span>Strategy</span><span>Creativity</span></div><p>We start with your business and the people you want to reach. Then we bring the right ideas, design and channels together.</p><a href="/about/">Inside DC Creative Labs</a></div>
      <div class="studio-column studio-films">${film('surya','Sri Surya','A place to live. A story to tell.')}${film('ssm','SSM Developers','Property stories, brought into focus.')}</div>
      <div class="studio-column studio-campaigns"><figure><img src="/assets/studio/denim-campaign.jpg" width="1080" height="1080" loading="lazy" alt="Denim fashion campaign with cream typography on black fabric"><figcaption>Fashion / Campaign creative</figcaption></figure><figure><img src="/assets/studio/hotel-campaign.jpg" width="1086" height="1086" loading="lazy" alt="Hotel campaign with a twilight building and the headline Where Comfort Meets Luxury"><figcaption>Hospitality / Visual storytelling</figcaption></figure></div>
      <article class="studio-column studio-art"><p class="studio-kicker">Art direction</p><img src="/assets/studio/jewellery-campaign.jpg" width="1122" height="1402" loading="lazy" alt="Jewellery campaign artwork by DC Creative Labs"><div><h3>Every detail<br>sets the tone.</h3><p>Colour, composition and a point of view. Creative that gives a brand its own presence.</p></div></article>
      <div class="studio-column studio-method"><div class="studio-brand"><img src="/assets/icons/dc-logo.png" alt="DC Creative Labs" width="96" height="81"><p>Creative strategies.<br>Digital growth.</p></div><article><p class="studio-kicker">How we work</p><ol><li><span>01</span><div><h3>Understand</h3><p>Know the audience. Define the goal.</p></div></li><li><span>02</span><div><h3>Create</h3><p>Give the strategy a distinctive voice.</p></div></li><li><span>03</span><div><h3>Refine</h3><p>Learn from the response. Improve the next move.</p></div></li></ol><a href="/services/">Explore our services</a></article></div>
    </div>
    <div class="studio-toolbar dc-wrap"><p id="studio-help">Campaigns, films and a shared creative direction.</p><div><button type="button" data-studio-prev aria-label="Previous showcase cards">Previous</button><button type="button" data-studio-motion aria-pressed="false">Pause movement</button><button type="button" data-studio-next aria-label="Next showcase cards">Next</button></div></div>
  </section>`
}

export function initStudio() {
  const section=document.querySelector('.dc-studio')
  if(!section) return
  const rail=section.querySelector('.studio-rail')
  const toggle=section.querySelector('[data-studio-motion]')
  const reduced=matchMedia('(prefers-reduced-motion: reduce)')
  const automatic=matchMedia('(min-width: 850px) and (hover: hover)')
  const videos=[...section.querySelectorAll('video')]
  const visibleVideos=new Set()
  let visible=false,paused=false,hover=false,focused=false,frame=0,last=0,direction=1,position=0,disposed=false
  function stop(){cancelAnimationFrame(frame);frame=0;last=0}
  function tick(time){
    const delta=last?Math.min(time-last,50):0;last=time
    const end=rail.scrollWidth-rail.clientWidth
    if(end>0){
      position=Math.max(0,Math.min(end,position+direction*delta*.027))
      rail.scrollLeft=position
      if(position>=end)direction=-1
      if(position<=0)direction=1
    }
    frame=requestAnimationFrame(tick)
  }
  function sync(){
    stop()
    const canMove=automatic.matches&&!reduced.matches
    toggle.disabled=!canMove
    toggle.textContent=reduced.matches?'Reduced motion on':!automatic.matches?'Swipe to explore':paused?'Play movement':'Pause movement'
    toggle.setAttribute('aria-pressed',String(paused))
    if(visible&&!paused&&!hover&&!focused&&canMove&&!document.hidden&&!disposed){position=rail.scrollLeft;frame=requestAnimationFrame(tick)}
  }
  function load(video){if(!video.getAttribute('src')){video.src=video.dataset.src;video.load()}}
  function syncVideo(video){
    const button=video.closest('article').querySelector('[data-film-play]')
    button.textContent=video.paused?'Play':'Pause'
    button.setAttribute('aria-label',`${video.paused?'Play':'Pause'} ${video.getAttribute('aria-label')}`)
  }
  function mediaState(){
    videos.forEach(video=>{
      if(!visibleVideos.has(video)||document.hidden){video.pause();return}
      if(!reduced.matches&&video.dataset.userPaused!=='true'){load(video);video.play().catch(()=>syncVideo(video))}
    })
  }
  const motion=()=>{if(reduced.matches)videos.forEach(video=>video.pause());sync();mediaState()}
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:0})
  intersection.observe(section)
  const mediaObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{entry.isIntersecting?visibleVideos.add(entry.target):visibleVideos.delete(entry.target)});mediaState()},{threshold:.2})
  videos.forEach(video=>{
    mediaObserver.observe(video)
    const article=video.closest('article'),play=article.querySelector('[data-film-play]'),sound=article.querySelector('[data-film-sound]')
    video.addEventListener('play',()=>syncVideo(video));video.addEventListener('pause',()=>syncVideo(video))
    play.addEventListener('click',()=>{if(video.paused){video.dataset.userPaused='false';load(video);video.play().catch(()=>syncVideo(video))}else{video.dataset.userPaused='true';video.pause()}})
    sound.addEventListener('click',()=>{
      const muted=!video.muted
      videos.forEach(other=>{other.muted=true;const b=other.closest('article').querySelector('[data-film-sound]');b.textContent='Sound off';b.setAttribute('aria-pressed','false');b.setAttribute('aria-label',`Unmute ${other.getAttribute('aria-label')}`)})
      video.muted=muted;sound.textContent=muted?'Sound off':'Sound on';sound.setAttribute('aria-pressed',String(!muted));sound.setAttribute('aria-label',`${muted?'Unmute':'Mute'} ${video.getAttribute('aria-label')}`)
      if(!muted){paused=true;load(video);video.dataset.userPaused='false';video.play().catch(()=>syncVideo(video));sync()}
    })
  })
  toggle.addEventListener('click',()=>{paused=!paused;sync()})
  rail.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hover=true;sync()}})
  rail.addEventListener('pointerleave',()=>{hover=false;sync()})
  rail.addEventListener('pointerdown',()=>{paused=true;sync()},{passive:true})
  rail.addEventListener('wheel',()=>{paused=true;sync()},{passive:true})
  rail.addEventListener('focusin',()=>{focused=true;sync()})
  rail.addEventListener('focusout',event=>{if(!rail.contains(event.relatedTarget)){focused=false;sync()}})
  const move=step=>{paused=true;sync();rail.scrollBy({left:step*Math.min(rail.clientWidth*.8,640),behavior:reduced.matches?'instant':'smooth'})}
  section.querySelector('[data-studio-prev]').addEventListener('click',()=>move(-1))
  section.querySelector('[data-studio-next]').addEventListener('click',()=>move(1))
  const visibilityChange=()=>{sync();mediaState()}
  reduced.addEventListener('change',motion);automatic.addEventListener('change',sync);document.addEventListener('visibilitychange',visibilityChange)
  window.addEventListener('pagehide',event=>{stop();videos.forEach(video=>video.pause());if(event.persisted)return;disposed=true;intersection.disconnect();mediaObserver.disconnect();reduced.removeEventListener('change',motion);automatic.removeEventListener('change',sync);document.removeEventListener('visibilitychange',visibilityChange)})
  window.addEventListener('pageshow',()=>{if(!disposed){sync();mediaState()}})
  sync()
}
