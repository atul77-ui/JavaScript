// ─────────────────────────────────────────────────────────────────────────────
// CineLog — app.js
// ─────────────────────────────────────────────────────────────────────────────

const OMDB_API_KEY = "b51842a6"; 

// ── DATA LAYER ────────────────────────────────────────────────────────────────
let movies;
try {
    const raw = localStorage.getItem("cinelog-movies");
    const parsed = raw ? JSON.parse(raw) : null;
    // make sure it's actually an array, not null or some old broken value
    movies = Array.isArray(parsed) ? parsed : null;
} catch (e) {
    console.warn("Corrupted localStorage — resetting.", e);
    localStorage.removeItem("cinelog-movies");
    movies = null;
}

// if nothing valid in storage, seed with one starter film
if (!movies) {
    movies = [
        {
            id: Date.now(),
            title: "Spirited Away",
            year: 2001,
            genre: "Animation",
            status: "want",
            poster: null,
        },
    ];
    saveMovies();
}

function saveMovies() {
    localStorage.setItem("cinelog-movies", JSON.stringify(movies));
}

// ── POSTER FETCH (OMDB) ───────────────────────────────────────────────────────
async function fetchPoster(title, year) {
    if (!OMDB_API_KEY) return null;
    try {
        const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=${OMDB_API_KEY}`;
        const res  = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        return data.Poster && data.Poster !== "N/A" ? data.Poster : null;
    } catch (e) {
        console.warn("Poster fetch failed:", e);
        return null;
    }
}

// ── BADGE HELPER ──────────────────────────────────────────────────────────────
function getBadge(status) {
    const map = {
        want:     { cls: "badge-want",     text: "Want to Watch" },
        watching: { cls: "badge-watching", text: "Watching"      },
        watched:  { cls: "badge-watched",  text: "Watched"       },
    };
    return map[status] || map.want;
}

// ── CARD BUILDER ──────────────────────────────────────────────────────────────
function createCard(movie) {
    const badge = getBadge(movie.status);
    const posterHtml = movie.poster
        ? `<img src="${movie.poster}" alt="${movie.title} poster" loading="lazy" />`
        : `<span class="poster-initial">${movie.title[0].toUpperCase()}</span>`;

    return `
    <div class="movie-card" data-id="${movie.id}">
        <div class="card-poster">
            ${posterHtml}
        </div>
        <div class="card-body">
            <div class="card-title" title="${movie.title}">${movie.title}</div>
            <div class="card-meta">${movie.year}&nbsp;&middot;&nbsp;${movie.genre}</div>
            <div class="card-footer">
                <span class="status-badge ${badge.cls}">${badge.text}</span>
                <div class="card-actions">
                    <button
                        class="card-btn mark-watched-btn"
                        title="Mark as watched"
                        data-id="${movie.id}"
                        ${movie.status === "watched" ? 'style="color:#3a7a52"' : ""}
                    >
                        <i class="fa-${movie.status === "watched" ? "solid" : "regular"} fa-circle-check"></i>
                    </button>
                    <button class="card-btn delete delete-btn" title="Remove" data-id="${movie.id}">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
}

// ── EMPTY STATE ───────────────────────────────────────────────────────────────
function emptyStateHtml(message = "No films here yet") {
    return `
    <div class="empty-state">
        <span class="empty-glyph">◎</span>
        <div class="empty-title">${message}</div>
        <div class="empty-sub">Add a film using the button above</div>
    </div>`;
}

// ── RENDER ────────────────────────────────────────────────────────────────────
let activeFilter = "all";
let searchQuery  = "";

function getFilteredMovies() {
    return movies.filter((m) => {
        const matchesFilter = activeFilter === "all" || m.status === activeFilter;
        const matchesSearch =
            searchQuery === "" ||
            m.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });
}

function renderMovies() {
    const grid     = document.getElementById("movie-grid");
    const filtered = getFilteredMovies();

    if (filtered.length === 0) {
        const msg = searchQuery
            ? `No results for "${searchQuery}"`
            : "No films in this category";
        grid.innerHTML = emptyStateHtml(msg);
    } else {
        grid.innerHTML = filtered.map(createCard).join("");
    }

    updateStats();
}

// ── STATS BAR ─────────────────────────────────────────────────────────────────
function updateStats() {
    document.getElementById("total-count").textContent    = movies.length;
    document.getElementById("watched-count").textContent  = movies.filter(m => m.status === "watched").length;
    document.getElementById("watching-count").textContent = movies.filter(m => m.status === "watching").length;
    document.getElementById("want-count").textContent     = movies.filter(m => m.status === "want").length;
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
const modalOverlay = document.getElementById("modal-overlay");

document.getElementById("open-modal-btn").addEventListener("click", () => {
    modalOverlay.classList.add("open");
    document.getElementById("input-title").focus();
});

document.getElementById("close-modal-btn").addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

function closeModal() {
    modalOverlay.classList.remove("open");
    resetForm();
}

// ── FORM VALIDATION & SUBMISSION ──────────────────────────────────────────────
const form = document.getElementById("add-movie-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const title  = document.getElementById("input-title").value.trim();
    const year   = parseInt(document.getElementById("input-year").value, 10);
    const genre  = document.getElementById("input-genre").value;
    const status = document.getElementById("input-status").value;

    const submitBtn       = form.querySelector(".form-submit-btn");
    submitBtn.textContent = "Adding…";
    submitBtn.disabled    = true;

    const poster = await fetchPoster(title, year);

    movies.push({ id: Date.now(), title, year, genre, status, poster });
    saveMovies();

    if (activeFilter !== "all" && activeFilter !== status) {
        setFilter("all");
    }

    renderMovies();
    closeModal();

    submitBtn.textContent = "Add to Collection";
    submitBtn.disabled    = false;
});

function validateForm() {
    const title  = document.getElementById("input-title").value.trim();
    const year   = parseInt(document.getElementById("input-year").value, 10);
    const genre  = document.getElementById("input-genre").value;
    const status = document.getElementById("input-status").value;

    const titleErr  = !title;
    const yearErr   = !year || year < 1888 || year > 2099;
    const genreErr  = !genre;
    const statusErr = !status;

    setError("error-title",  titleErr);
    setError("error-year",   yearErr);
    setError("error-genre",  genreErr);
    setError("error-status", statusErr);

    return !(titleErr || yearErr || genreErr || statusErr);
}

function setError(id, show) {
    document.getElementById(id)?.classList.toggle("show", show);
}

["input-title", "input-year", "input-genre", "input-status"].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", () => {
        setError(id.replace("input-", "error-"), false);
    });
});

function resetForm() {
    form.reset();
    ["error-title", "error-year", "error-genre", "error-status"].forEach((id) =>
        setError(id, false)
    );
}

// ── CARD ACTIONS ──────────────────────────────────────────────────────────────
document.getElementById("movie-grid").addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-btn");
    if (deleteBtn) {
        const id   = parseInt(deleteBtn.dataset.id, 10);
        const card = deleteBtn.closest(".movie-card");
        if (card) {
            card.style.transition = "opacity 0.25s, transform 0.25s";
            card.style.opacity    = "0";
            card.style.transform  = "scale(0.94)";
            setTimeout(() => {
                movies = movies.filter(m => m.id !== id);
                saveMovies();
                renderMovies();
            }, 240);
        }
        return;
    }

    const watchBtn = e.target.closest(".mark-watched-btn");
    if (watchBtn) {
        const id    = parseInt(watchBtn.dataset.id, 10);
        const movie = movies.find(m => m.id === id);
        if (movie) {
            movie.status = movie.status === "watched" ? "want" : "watched";
            saveMovies();
            renderMovies();
        }
        return;
    }
});

// ── SEARCH ────────────────────────────────────────────────────────────────────
document.getElementById("search-input").addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderMovies();
});

// ── FILTER TABS ───────────────────────────────────────────────────────────────
function setFilter(filter) {
    activeFilter = filter;
    document.querySelectorAll(".filter-tab").forEach(btn => {
        btn.classList.toggle("active", btn.id === `filter-${filter}`);
    });
    renderMovies();
}

document.getElementById("filter-all").addEventListener("click",      () => setFilter("all"));
document.getElementById("filter-want").addEventListener("click",     () => setFilter("want"));
document.getElementById("filter-watching").addEventListener("click", () => setFilter("watching"));
document.getElementById("filter-watched").addEventListener("click",  () => setFilter("watched"));

// ── INITIAL RENDER ────────────────────────────────────────────────────────────
renderMovies();
