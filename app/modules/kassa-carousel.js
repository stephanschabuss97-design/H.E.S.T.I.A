const ACTIVE_CLASS = "is-active";
const PREV_CLASS = "is-prev";
const NEXT_CLASS = "is-next";
const HIDDEN_CLASS = "is-hidden";
const SWIPE_THRESHOLD = 36;

function normalizeIndex(index, itemCount) {
  return ((index % itemCount) + itemCount) % itemCount;
}

function getRelativeState(index, activeIndex, itemCount) {
  if (index === activeIndex) {
    return "active";
  }

  if (index === normalizeIndex(activeIndex - 1, itemCount)) {
    return "prev";
  }

  if (index === normalizeIndex(activeIndex + 1, itemCount)) {
    return "next";
  }

  return "hidden";
}

function setLinkTabStop(link, isActive) {
  if (!link) {
    return;
  }

  if (isActive) {
    link.removeAttribute("tabindex");
    return;
  }

  link.setAttribute("tabindex", "-1");
}

function initKassaCarouselInstance(root, doc, touchlog) {
  if (!root) {
    return null;
  }

  const items = Array.from(root.querySelectorAll("[data-kassa-carousel-item]"));
  const links = items.map((item) => item.querySelector("[data-kassa-carousel-link]"));
  const prevButton = root.querySelector("[data-kassa-carousel-prev]");
  const nextButton = root.querySelector("[data-kassa-carousel-next]");
  const stage = root.querySelector("[data-kassa-carousel-stage]");
  const position = root.querySelector("[data-kassa-carousel-position]");

  if (!items.length) {
    return null;
  }

  let activeIndex = items.findIndex((item) => item.classList.contains(ACTIVE_CLASS));
  if (activeIndex < 0) {
    activeIndex = 0;
  }

  let dragStart = null;

  function sync(nextIndex, options = {}) {
    const itemCount = items.length;
    const previousIndex = activeIndex;
    activeIndex = normalizeIndex(nextIndex, itemCount);
    const direction = options.direction || Math.sign(activeIndex - previousIndex) || 0;

    root.dataset.kassaCarouselActive = String(activeIndex);
    root.dataset.kassaCarouselDirection = String(direction);

    items.forEach((item, index) => {
      const state = getRelativeState(index, activeIndex, itemCount);
      const isActive = state === "active";

      item.classList.toggle(ACTIVE_CLASS, isActive);
      item.classList.toggle(PREV_CLASS, state === "prev");
      item.classList.toggle(NEXT_CLASS, state === "next");
      item.classList.toggle(HIDDEN_CLASS, state === "hidden");
      item.dataset.kassaCarouselState = state;

      if (isActive) {
        item.removeAttribute("aria-hidden");
      } else {
        item.setAttribute("aria-hidden", "true");
      }

      setLinkTabStop(links[index], isActive);
    });

    if (position) {
      position.textContent = `${activeIndex + 1} / ${itemCount}`;
    }

    if (options.focusActiveLink) {
      links[activeIndex]?.focus({ preventScroll: true });
    }

    if (touchlog && previousIndex !== activeIndex) {
      touchlog.add(`[kassa] carousel active=${activeIndex + 1}/${itemCount}`, {
        eventId: "kassa-carousel-active"
      });
    }
  }

  function move(delta, options = {}) {
    sync(activeIndex + delta, {
      ...options,
      direction: delta
    });
  }

  prevButton?.addEventListener("click", () => {
    move(-1);
  });

  nextButton?.addEventListener("click", () => {
    move(1);
  });

  root.addEventListener("keydown", (event) => {
    const focusActiveLink = event.target?.matches?.("[data-kassa-carousel-link]") === true;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1, { focusActiveLink });
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1, { focusActiveLink });
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      sync(0, { direction: -1, focusActiveLink });
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      sync(items.length - 1, { direction: 1, focusActiveLink });
    }
  });

  links.forEach((link, index) => {
    if (link) {
      link.draggable = false;
    }

    link?.addEventListener("click", (event) => {
      if (index === activeIndex) {
        return;
      }

      event.preventDefault();
      sync(index, { direction: index > activeIndex ? 1 : -1, focusActiveLink: true });
    });
  });

  function beginDrag(id, x, y) {
    dragStart = { id, x, y, captured: false };
  }

  function maybeCaptureDrag(event) {
    if (!dragStart || dragStart.id !== event.pointerId || dragStart.captured) {
      return;
    }

    const deltaX = event.clientX - dragStart.x;
    const deltaY = event.clientY - dragStart.y;
    if (Math.abs(deltaX) < 12 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragStart.captured = true;
  }

  function finishDrag(id, x, y) {
    if (!dragStart || dragStart.id !== id) {
      return;
    }

    const deltaX = x - dragStart.x;
    const deltaY = y - dragStart.y;
    dragStart = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    move(deltaX < 0 ? 1 : -1);
  }

  stage?.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary) {
      return;
    }

    beginDrag(event.pointerId, event.clientX, event.clientY);
  });

  stage?.addEventListener("pointermove", (event) => {
    maybeCaptureDrag(event);
  });

  stage?.addEventListener("pointerup", (event) => {
    if (dragStart?.captured) {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    }

    finishDrag(event.pointerId, event.clientX, event.clientY);
  });

  doc.addEventListener("pointerup", (event) => {
    finishDrag(event.pointerId, event.clientX, event.clientY);
  });

  stage?.addEventListener("pointercancel", () => {
    dragStart = null;
  });

  stage?.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });

  sync(activeIndex);

  return {
    getActiveIndex() {
      return activeIndex;
    },
    setActiveIndex(index) {
      sync(index);
    }
  };
}

export function initKassaCarousel(doc = document, touchlog = null) {
  const roots = Array.from(doc.querySelectorAll("[data-kassa-carousel]"));
  if (!roots.length) {
    return null;
  }

  const instances = roots
    .map((root) => initKassaCarouselInstance(root, doc, touchlog))
    .filter(Boolean);

  if (instances.length === 1) {
    return instances[0];
  }

  return instances;
}
