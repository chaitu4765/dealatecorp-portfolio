import { useEffect } from "react";

/** Own imperative media/SVG animation resources for one React mount. */
export function createAnimationScope() {
  let active = true;
  const disposers = [];
  const frames = new Set();
  const timers = new Set();
  const intervals = new Set();
  const scope = {
    get active() {
      return active;
    },
    cleanup(callback) {
      disposers.push(callback);
    },
    on(target, type, listener, options) {
      if (!target || !active) return;
      target.addEventListener(type, listener, options);
      disposers.push(() => target.removeEventListener(type, listener, options));
    },
    observe(Observer, callback, options) {
      const observer = new Observer((...args) => {
        if (active) callback(...args);
      }, options);
      disposers.push(() => observer.disconnect());
      return observer;
    },
    requestAnimationFrame(callback) {
      if (!active) return 0;
      const id = window.requestAnimationFrame((time) => {
        frames.delete(id);
        if (active) callback(time);
      });
      frames.add(id);
      return id;
    },
    cancelAnimationFrame(id) {
      window.cancelAnimationFrame(id);
      frames.delete(id);
    },
    setTimeout(callback, delay) {
      if (!active) return 0;
      const id = window.setTimeout(() => {
        timers.delete(id);
        if (active) callback();
      }, delay);
      timers.add(id);
      return id;
    },
    clearTimeout(id) {
      window.clearTimeout(id);
      timers.delete(id);
    },
    setInterval(callback, delay) {
      if (!active) return 0;
      const id = window.setInterval(() => {
        if (active) callback();
      }, delay);
      intervals.add(id);
      return id;
    },
    clearInterval(id) {
      window.clearInterval(id);
      intervals.delete(id);
    },
    dispose() {
      active = false;
      disposers.reverse().forEach((dispose) => dispose());
      frames.forEach((id) => window.cancelAnimationFrame(id));
      timers.forEach((id) => window.clearTimeout(id));
      intervals.forEach((id) => window.clearInterval(id));
    },
  };
  return scope;
}

export function useAnimationEffect(setup) {
  useEffect(() => {
    const scope = createAnimationScope();
    setup(scope);
    return () => scope.dispose();
  }, [setup]);
}
