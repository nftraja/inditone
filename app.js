// ===============================
// INDItone FINAL APP ENGINE
// ===============================

// ===== DRAWER =====
function toggleDrawer(){
  document.getElementById("drawer").classList.add("active");
  document.getElementById("overlay").classList.add("active");
}

function closeDrawer(){
  document.getElementById("drawer").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
}

// ===== GET QUERY PARAM =====
function getQueryParam(param){
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// ===== CATEGORY NAME MAP =====
const categoryMap = {
  "movies":"Movies",
  "webseries":"Web Series",
  "music":"Music",
  "sports":"Sports",
  "livetv":"Live TV",
  "shortvideo":"Short Video",
  "podcasts":"Podcasts"
};

// ===== LOAD DATA =====
async function loadPlatforms(){
  try{
    const res = await fetch("data/platforms.json");
    return await res.json();
  }catch(e){
    console.error("JSON load error", e);
    return [];
  }
}

// ===== RENDER CATEGORY =====
function renderCategoryTitle(type){
  const title = categoryMap[type] || "Category";
  const titleEl = document.getElementById("categoryTitle");
  const pageTitle = document.getElementById("pageTitle");

  if(titleEl) titleEl.innerText = title;
  if(pageTitle) pageTitle.innerText = title;
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

// ===== CTA TEXT =====
function getCTA(category){
  switch(category){
    case "music":
      return "🎧 Listen Now";
    case "movies":
    case "webseries":
    case "livetv":
      return "🎬 Watch Now";
    case "sports":
      return "⚽ Watch Live";
    default:
      return "🌐 Open Platform";
  }
}

// ===== RENDER PLATFORMS =====
async function renderPlatforms(){

  const type = getQueryParam("type");
  if(!type) return;

  renderCategoryTitle(type);

  const data = await loadPlatforms();

  const container = document.getElementById("platformContainer");
  if(!container) return;

  const filtered = data.filter(item => item.category === type);

  if(filtered.length === 0){
    container.innerHTML = `
      <div class="glass-card">
        <div class="card-title">No Platforms Found</div>
        <div class="card-desc">Platforms will be added soon.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(createCard).join("");
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {

  // CATEGORY PAGE ONLY
  if(window.location.pathname.includes("category.html")){
    renderPlatforms();
  }

});