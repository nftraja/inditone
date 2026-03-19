// ===============================
// INDITONE FINAL APP ENGINE (LOCKED)
// ULTRA STABLE VERSION (JSON SAFE)
// ===============================


// ===== DRAWER CONTROL =====
function toggleDrawer(){
  document.getElementById("drawer").classList.add("active");
  document.getElementById("overlay").classList.add("active");
  document.body.classList.add("drawer-open"); // lock scroll
}

function closeDrawer(){
  document.getElementById("drawer").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
  document.body.classList.remove("drawer-open");
}


// ===== QUERY PARAM =====
function getQueryParam(param){
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}


// ===== CATEGORY MAP =====
const categoryMap = {
  "movies":"Movies",
  "webseries":"Web Series",
  "music":"Music",
  "sports":"Sports",
  "livetv":"Live TV",
  "shortvideo":"Short Video",
  "podcasts":"Podcasts",
  "anime":"Anime",
  "gaming":"Gaming",
  "reviews":"Reviews",
  "trailers":"Trailers",
  "lyrics":"Lyrics",
  "fan-community":"Fan Community",
  "concerts":"Concerts",
  "radio":"Radio",
  "music-tools":"Music Tools",
  "awards":"Awards",
  "tickets":"Tickets",
  "entertainment":"Entertainment",
  "cartoons":"Cartoon World"
};


// ===== NORMALIZE FUNCTION (🔥 MAIN FIX) =====
function normalize(str){
  return (str || "")
    .toLowerCase()
    .replace(/[\s-_]/g,""); // remove space, dash, underscore
}


// ===== LOAD JSON (FINAL FIXED BLOCK) =====
async function loadPlatforms(){
  try{

    // ✅ SAME DIRECTORY FETCH (FINAL)
    const res = await fetch("./platforms.json");

    if(!res.ok){
      throw new Error("HTTP error " + res.status);
    }

    const data = await res.json();

    // 🔥 SAFETY CHECK (INVALID JSON HANDLING)
    if(!Array.isArray(data)){
      console.error("❌ Invalid JSON format");
      return [];
    }

    return data;

  }catch(e){
    console.error("❌ JSON LOAD ERROR:", e);

    // 🔥 UI SAFE RETURN
    return [];
  }
}

// ===== RENDER CATEGORY TITLE =====
function renderCategoryTitle(type){
  const title = categoryMap[type] || "Category";

  const titleEl = document.getElementById("categoryTitle");
  const pageTitle = document.getElementById("pageTitle");

  if(titleEl) titleEl.innerText = title;
  if(pageTitle) pageTitle.innerText = title;
}


// ===== CTA TEXT =====
function getCTA(category){

  const cat = normalize(category);

  switch(cat){

    case "music":
      return "🎧 Listen Now";

    case "movies":
    case "webseries":
    case "livetv":
    case "anime":
    case "cartoons":
      return "🎬 Watch Now";

    case "sports":
      return "⚽ Watch Live";

    case "gaming":
      return "🎮 Play Now";

    case "podcasts":
      return "🎙 Listen Podcast";

    case "radio":
      return "📻 Listen Live";

    case "lyrics":
      return "📝 View Lyrics";

    case "trailers":
      return "▶ Watch Trailer";

    case "reviews":
      return "⭐ Read Review";

    case "tickets":
      return "🎟 Book Now";

    default:
      return "🌐 Open Platform";
  }
}


// ===== CREATE CARD =====
function createCard(item){
  return `
    <div class="list-card">

      <div class="list-title">${item.name}</div>

      <div class="list-desc">
        ${item.description}
      </div>

      <a href="${item.url}" target="_blank" class="btn">
        ${getCTA(item.category)}
      </a>

    </div>
  `;
}


// ===== RENDER PLATFORMS =====
async function renderPlatforms(){

  const type = getQueryParam("type");

  if(!type){
    console.warn("⚠️ No category type found");
    return;
  }

  renderCategoryTitle(type);

  const container = document.getElementById("platformContainer");

  if(!container){
    console.warn("⚠️ platformContainer not found");
    return;
  }

  // 🔥 LOADING UI
  container.innerHTML = `
    <div class="glass-card">
      <div class="card-title">Loading...</div>
      <div class="card-desc">Fetching platforms...</div>
    </div>
  `;

  const data = await loadPlatforms();

  // 🔥 SMART FILTER (JSON SAFE)
  const filtered = data.filter(item => {
    if(Array.isArray(item.category)){
      return item.category.some(cat => normalize(cat) === normalize(type));
    }
    return normalize(item.category) === normalize(type);
  });

  // EMPTY STATE
  if(filtered.length === 0){
    container.innerHTML = `
      <div class="glass-card">
        <div class="card-title">No Platforms Found</div>
        <div class="card-desc">
          Platforms will be added soon for this category.
        </div>
      </div>
    `;
    return;
  }

  // RENDER
  container.innerHTML = filtered.map(createCard).join("");
}


// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {

  if(document.getElementById("platformContainer")){
    renderPlatforms();
  }

});


// ===============================
// 🔥 CACHE FIX
// ===============================
window.addEventListener("pageshow", function(event){
  if(event.persisted){
    window.location.reload();
  }
});


// ===============================
// 🔥 ZOOM + DOUBLE TAP BLOCK
// ===============================
document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
});

document.addEventListener("dblclick", function (e) {
  e.preventDefault();
});