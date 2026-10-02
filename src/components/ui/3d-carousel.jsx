import { useCallback, useEffect, useRef, useState } from "react";

const wrap = (index, count) => ((index % count) + count) % count;

// The supplied cylinder interaction, adapted to local photos and films.
// Photos open at full size; films load and play inside their carousel frame.
export function ThreeDPhotoCarousel({ items, brand }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [preview, setPreview] = useState(null);
  const [film, setFilm] = useState(null);
  const stage = useRef(null);
  const ring = useRef(null);
  const dialog = useRef(null);
  const video = useRef(null);
  const opener = useRef(null);
  const angle = useRef(0);
  const radius = useRef(0);
  const target = useRef(null);
  const velocity = useRef(0);
  const current = useRef(0);
  const drag = useRef(null);
  const suppressClick = useRef(false);
  const motion = useRef({
    playing: false,
    hovered: false,
    focused: false,
    visible: false,
    reduced: false,
    preview: false,
    film: false,
  });
  const count = items.length;
  const step = 360 / count;
  const selected = preview === null ? null : items[preview];
  const photoCount = items.filter((item) => item.type !== "video").length;

  const paint = useCallback(
    (next, updateActive = true) => {
      angle.current = next;
      if (ring.current)
        ring.current.style.transform = `translateZ(${-radius.current}px) rotateY(${next}deg)`;
      const index = wrap(Math.round(-next / step), count);
      if (updateActive && index !== current.current) {
        current.current = index;
        setActive(index);
      }
    },
    [count, step],
  );

  useEffect(() => {
    motion.current.playing = playing;
  }, [playing]);

  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const preference = () => {
      motion.current.reduced = query.matches;
      if (query.matches) setPlaying(false);
    };
    preference();
    setPlaying(!query.matches && count > 1);
    query.addEventListener("change", preference);
    const resize = () => {
      const width = stage.current?.getBoundingClientRect().width || innerWidth;
      const cardWidth = Math.min(360, width * 0.68);
      radius.current =
        count === 1
          ? 0
          : Math.max(
              cardWidth * 0.65,
              (cardWidth + 24) / (2 * Math.tan(Math.PI / Math.max(3, count))),
            );
      stage.current?.style.setProperty("--media-card-width", `${cardWidth}px`);
      stage.current?.style.setProperty("--media-radius", `${radius.current}px`);
      paint(angle.current, false);
    };
    resize();
    const sizes = new ResizeObserver(resize);
    sizes.observe(stage.current);
    const observer = new IntersectionObserver(
      ([entry]) => {
        motion.current.visible = entry.isIntersecting;
        if (!entry.isIntersecting) video.current?.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(stage.current);
    let frame;
    let last;
    const tick = (time) => {
      const delta = Math.min(50, time - (last ?? time));
      last = time;
      const state = motion.current;
      if (!document.hidden && !drag.current && !state.preview) {
        if (target.current !== null) {
          const difference = target.current - angle.current;
          if (Math.abs(difference) < 0.05 || state.reduced) {
            paint(target.current);
            target.current = null;
          } else
            paint(angle.current + difference * Math.min(1, delta / 90), false);
        } else if (
          Math.abs(velocity.current) > 0.001 &&
          !state.reduced &&
          !state.film
        ) {
          paint(angle.current + velocity.current * delta);
          velocity.current *= Math.exp(-delta / 180);
        } else if (
          count > 1 &&
          state.playing &&
          state.visible &&
          !state.hovered &&
          !state.focused &&
          !state.film &&
          !state.reduced
        ) {
          paint(angle.current - delta * 0.006);
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      sizes.disconnect();
      observer.disconnect();
      query.removeEventListener("change", preference);
    };
  }, [count, paint]);

  useEffect(() => {
    if (preview === null) return;
    const element = dialog.current;
    if (!element.open) element.showModal();
  }, [preview]);

  useEffect(() => {
    if (film === null) return;
    const player = video.current;
    player.focus({ preventScroll: true });
    player.play()?.catch(() => {}); // Native controls remain available if playback is blocked.
    const hide = () => {
      if (document.hidden) player.pause();
    };
    document.addEventListener("visibilitychange", hide);
    return () => {
      player.pause();
      document.removeEventListener("visibilitychange", hide);
    };
  }, [film]);

  const stopFilm = () => {
    video.current?.pause();
    motion.current.film = false;
    setFilm(null);
  };
  const navigate = (index) => {
    stopFilm();
    setPlaying(false);
    velocity.current = 0;
    const next = wrap(index, count);
    current.current = next;
    setActive(next);
    const base = -next * step;
    target.current = base + Math.round((angle.current - base) / 360) * 360;
    if (motion.current.reduced) {
      paint(target.current);
      target.current = null;
    }
  };
  const open = (index, button) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    opener.current = button;
    if (items[index].type === "video") {
      navigate(index);
      motion.current.film = true;
      setFilm(index);
      return;
    }
    stopFilm();
    motion.current.preview = true;
    velocity.current = 0;
    setPreview(index);
  };
  const close = () => {
    if (dialog.current?.open) dialog.current.close();
    motion.current.preview = false;
    setPreview(null);
    opener.current?.focus();
  };
  const changePreview = (direction) => {
    setPreview((index) => {
      let next = wrap(index + direction, count);
      while (items[next].type === "video") next = wrap(next + direction, count);
      return next;
    });
  };
  const finishDrag = (event) => {
    if (!drag.current || drag.current.id !== event.pointerId) return;
    suppressClick.current = drag.current.moved;
    drag.current = null;
    if (stage.current.hasPointerCapture?.(event.pointerId))
      stage.current.releasePointerCapture(event.pointerId);
    stage.current.classList.remove("is-dragging");
  };

  return (
    <div
      className="media-orbit"
      aria-label={`${brand} media carousel`}
      aria-roledescription="carousel"
      onMouseEnter={() => {
        motion.current.hovered = true;
      }}
      onMouseLeave={() => {
        motion.current.hovered = false;
      }}
      onFocusCapture={() => {
        motion.current.focused = true;
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          motion.current.focused = false;
      }}
      onKeyDown={(event) => {
        if (preview !== null || event.target.closest("video")) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          navigate(active + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}
    >
      <div
        className="media-orbit__stage"
        ref={stage}
        onPointerDown={(event) => {
          if (event.button !== 0 || count < 2 || event.target.closest("video"))
            return;
          suppressClick.current = false;
          velocity.current = 0;
          target.current = null;
          drag.current = {
            id: event.pointerId,
            x: event.clientX,
            angle: angle.current,
            lastX: event.clientX,
            time: event.timeStamp,
            moved: false,
          };
        }}
        onPointerMove={(event) => {
          const pointer = drag.current;
          if (!pointer || pointer.id !== event.pointerId) return;
          const distance = event.clientX - pointer.x;
          if (!pointer.moved && Math.abs(distance) < 7) return;
          if (!pointer.moved) stopFilm();
          pointer.moved = true;
          suppressClick.current = true;
          stage.current.setPointerCapture?.(event.pointerId);
          stage.current.classList.add("is-dragging");
          setPlaying(false);
          velocity.current =
            ((event.clientX - pointer.lastX) * 0.18) /
            Math.max(1, event.timeStamp - pointer.time);
          pointer.lastX = event.clientX;
          pointer.time = event.timeStamp;
          paint(pointer.angle + distance * 0.18);
        }}
        onPointerUp={finishDrag}
        onPointerCancel={(event) => {
          velocity.current = 0;
          finishDrag(event);
        }}
      >
        <div className="media-orbit__ring" ref={ring}>
          {items.map((item, index) => (
            <div
              className="media-orbit__card"
              key={item.id}
              style={{ "--media-angle": `${index * step}deg` }}
              aria-current={index === active ? "true" : undefined}
            >
              {film === index ? (
                <>
                  <div className="media-orbit__image media-orbit__player">
                    <video
                      ref={video}
                      src={item.src}
                      poster={item.poster || item.thumbnail}
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      tabIndex={0}
                      aria-label={item.alt || item.title}
                    />
                  </div>
                  <span className="media-orbit__card-label">
                    <span>{item.title}</span>
                    <span>In frame</span>
                  </span>
                </>
              ) : (
                <button
                  className="media-orbit__open"
                  type="button"
                  aria-label={`${item.type === "video" ? "Play" : "Open"} ${item.title}`}
                  tabIndex={index === active ? 0 : -1}
                  onDragStart={(event) => event.preventDefault()}
                  onClick={(event) => {
                    if (event.detail === 0) suppressClick.current = false;
                    open(index, event.currentTarget);
                  }}
                >
                  <span className="media-orbit__image">
                    <img
                      src={item.thumbnail || item.poster || item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                    />
                    {item.type === "video" && (
                      <span className="media-orbit__play" aria-hidden="true">
                        ▶
                      </span>
                    )}
                  </span>
                  <span className="media-orbit__card-label">
                    <span>{item.title}</span>
                    <span aria-hidden="true">
                      {item.type === "video" ? "Play ▶" : "↗"}
                    </span>
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="media-orbit__controls">
        {count > 1 && (
          <button
            type="button"
            aria-label="Previous photo or film"
            onClick={() => navigate(active - 1)}
          >
            ←
          </button>
        )}
        <p
          className="media-orbit__count"
          aria-live={playing ? "off" : "polite"}
        >
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(count).padStart(2, "0")}
          <span>{items[active].title}</span>
        </p>
        {count > 1 && (
          <button
            type="button"
            aria-label="Next photo or film"
            onClick={() => navigate(active + 1)}
          >
            →
          </button>
        )}
        {count > 1 && (
          <button
            type="button"
            className="media-orbit__motion"
            aria-label={
              playing ? "Pause carousel rotation" : "Play carousel rotation"
            }
            aria-pressed={playing}
            onClick={() => {
              stopFilm();
              setPlaying((value) => !value);
            }}
          >
            {playing ? "Pause" : "Rotate"}
          </button>
        )}
      </div>
      <p className="media-orbit__hint">
        {count > 1
          ? "Drag to explore · Play films in their frame · Select photos to expand"
          : items[0].type === "video"
            ? "Play the film in its frame"
            : "Select the photo to expand"}
      </p>
      <dialog
        ref={dialog}
        className="client-media__lightbox"
        aria-label={`${brand} media preview`}
        onClose={close}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.target.closest("video")) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            event.stopPropagation();
            changePreview(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <button
          type="button"
          autoFocus
          aria-label="Close media preview"
          onClick={close}
        >
          Close ×
        </button>
        {selected && (
          <div className="media-orbit__expanded" key={selected.src}>
            <img src={selected.src} alt={selected.alt} />
          </div>
        )}
        <div className="media-orbit__preview-controls">
          {photoCount > 1 && (
            <button
              type="button"
              aria-label="Previous media preview"
              onClick={() => changePreview(-1)}
            >
              ←
            </button>
          )}
          <span>{selected?.title}</span>
          {photoCount > 1 && (
            <button
              type="button"
              aria-label="Next media preview"
              onClick={() => changePreview(1)}
            >
              →
            </button>
          )}
        </div>
      </dialog>
    </div>
  );
}
