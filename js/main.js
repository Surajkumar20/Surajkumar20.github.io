(() => {
  // ============================================================
  //  RECENT WORKS — drop YouTube URLs in here, one per slot.
  //  Accepts any of:
  //    https://www.youtube.com/watch?v=XXXXXXXXXXX
  //    https://youtu.be/XXXXXXXXXXX
  //    https://www.youtube.com/embed/XXXXXXXXXXX
  //    https://www.youtube.com/shorts/XXXXXXXXXXX
  //    XXXXXXXXXXX           (raw 11-char video id)
  //
  //  The `id` field is referenced by project cards in index.html
  //  (see PROJECT_VIDEO_LINKS below) — don't rename them unless you
  //  also update that map.
  // ============================================================
  const RECENT_WORKS = [
    {
      id: "video-kuka",
      title: "KUKA KR300 mold machining",
      youtube: "https://youtu.be/6qHr2WKmyqY",
    },
    {
      id: "video-bfd",
      title: "BFD flight test",
      youtube: "https://youtu.be/UsfFLM9CNmo",
    },
    {
      id: "video-sherpy",
      title: "Sherpy outdoor flight test",
      youtube: "https://youtu.be/UUmthbhAiG4",
    }
    // {
    //   id: "KUKA angled machining",
    //   title: "KUKA KR300 5-axis machining",
    //   youtube: ""
    // }
  ];

  // Project card → which video ids to highlight when clicked.
  const PROJECT_VIDEO_LINKS = {
    kuka: ["video-kuka"],
    pixhawk: ["video-bfd", "video-sherpy"],
  };

  // ---------- footer year ----------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- mobile nav toggle ----------
  const toggle = document.querySelector(".nav-toggle");
  const list = document.getElementById("nav-list");
  if (toggle && list) {
    toggle.addEventListener("click", () => {
      const open = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    list.addEventListener("click", (e) => {
      if (e.target instanceof HTMLAnchorElement) {
        list.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ---------- Recent Works rendering ----------
  function youtubeId(url) {
    if (!url) return null;
    const trimmed = String(url).trim();
    if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
    const m = trimmed.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([\w-]{11})/
    );
    return m ? m[1] : null;
  }

  function renderWorkCard(slot) {
    const figure = document.createElement("figure");
    figure.className = "video-card";
    figure.id = slot.id;

    const id = youtubeId(slot.youtube);
    if (id) {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${id}?rel=0`;
      iframe.title = slot.title;
      iframe.loading = "lazy";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;
      figure.appendChild(iframe);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "video-placeholder";
      placeholder.setAttribute("aria-label", `${slot.title} — video coming soon`);
      placeholder.innerHTML = `
        <span class="video-placeholder-mark">▶</span>
        <span class="video-placeholder-text">Video link coming soon</span>
      `;
      figure.appendChild(placeholder);
    }

    const cap = document.createElement("figcaption");
    cap.textContent = slot.title;
    figure.appendChild(cap);

    return figure;
  }

  const row = document.getElementById("video-row");
  if (row) {
    const frag = document.createDocumentFragment();
    RECENT_WORKS.forEach((slot) => frag.appendChild(renderWorkCard(slot)));
    row.appendChild(frag);
  }

  // ---------- project card → Recent Works video link ----------
  const HIGHLIGHT_MS = 2600;

  function focusVideos(ids) {
    if (!ids || !ids.length) return;
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!targets.length) return;

    document
      .querySelectorAll(".video-card.is-focused")
      .forEach((el) => el.classList.remove("is-focused"));

    targets[0].scrollIntoView({ behavior: "smooth", block: "center" });
    targets.forEach((el) => {
      el.classList.add("is-focused");
      window.setTimeout(() => el.classList.remove("is-focused"), HIGHLIGHT_MS);
    });
  }

  function activate(card) {
    const key = card.dataset.link;
    if (!key) return;
    focusVideos(PROJECT_VIDEO_LINKS[key]);
  }

  document.querySelectorAll(".card-link[data-link]").forEach((card) => {
    card.addEventListener("click", () => activate(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate(card);
      }
    });
  });
})();
