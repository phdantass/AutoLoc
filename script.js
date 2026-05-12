// =========================
// script.js
// =========================

// =========================
// MAPA
// =========================

const map = L.map('map', {

  zoomControl: true,
  minZoom: 6,
  maxZoom: 18

});

// =========================
// LIMITES DO ESTADO
// SÃO PAULO
// =========================

const boundsSP = L.latLngBounds(

  [-25.5, -53.5], // sudoeste
  [-19.5, -44.0]  // nordeste

);

// BLOQUEIA FORA DE SP

map.setMaxBounds(boundsSP);

// TRAVA NAS BORDAS

map.options.maxBoundsViscosity = 1.0;

// FOCA NO ESTADO

map.fitBounds(boundsSP);

// =========================
// TEMA DARK
// =========================

L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  {

    attribution:
      '&copy; OpenStreetMap &copy; CARTO'

  }

).addTo(map);

// =========================
// ÍCONE PERSONALIZADO
// =========================

const customIcon = L.icon({

  iconUrl:
    'https://cdn-icons-png.flaticon.com/512/684/684908.png',

  iconSize:[42,42],
  iconAnchor:[21,42],
  popupAnchor:[0,-35]

});

// =========================
// LOCAIS
// =========================

const places = [

  {
    name:"SpeedParts Auto",
    lat:-23.55052,
    lng:-46.633308,
    rating:"4.8",
    type:"Mecânica"
  },

  {
    name:"Auto Center Prime",
    lat:-22.9068,
    lng:-47.0626,
    rating:"4.6",
    type:"Pneus"
  },

  {
    name:"Mecânica Turbo",
    lat:-23.1791,
    lng:-45.8872,
    rating:"4.9",
    type:"Elétrica"
  },

  {
    name:"Garage Motors",
    lat:-21.1775,
    lng:-47.8103,
    rating:"4.7",
    type:"Funilaria"
  },

  {
    name:"CarFix Center",
    lat:-23.9608,
    lng:-46.3336,
    rating:"4.5",
    type:"Freios"
  }

];

// =========================
// MARCADORES
// =========================

places.forEach(place => {

  const marker = L.marker(

    [place.lat, place.lng],

    { icon:customIcon }

  ).addTo(map);

  // POPUP

  marker.bindPopup(`

    <div class="map-popup">

      <h3>${place.name}</h3>

      <p>
        ⭐ ${place.rating} estrelas
      </p>

      <p>
        🔧 ${place.type}
      </p>

      <button>
        Ver detalhes
      </button>

    </div>

  `);

});

// =========================
// LOCALIZAÇÃO USUÁRIO
// =========================

navigator.geolocation.getCurrentPosition(

  position => {

    const userLat =
      position.coords.latitude;

    const userLng =
      position.coords.longitude;

    // MARCADOR USUÁRIO

    L.circleMarker(

      [userLat,userLng],

      {

        radius:10,
        color:"#00d4ff",
        fillColor:"#00d4ff",
        fillOpacity:1

      }

    ).addTo(map);

  },

  error => {

    console.log(
      "Localização não permitida"
    );

  }

);

// =========================
// SERVICES ACTIVE
// =========================

const serviceCards =
document.querySelectorAll(".service-card");

serviceCards.forEach(card => {

  card.addEventListener("click", () => {

    serviceCards.forEach(c => {

      c.classList.remove("active");

    });

    card.classList.add("active");

  });

});

// =========================
// FILTER ACTIVE
// =========================

const filters =
document.querySelectorAll(".filter");

filters.forEach(filter => {

  filter.addEventListener("click", () => {

    filters.forEach(f => {

      f.classList.remove("active");

    });

    filter.classList.add("active");

  });

});

// =========================
// THEME TOGGLE
// =========================

const themeToggle =
document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle(
    "light-mode"
  );

  const icon =
    themeToggle.querySelector("i");

  if(
    document.body.classList.contains(
      "light-mode"
    )
  ){

    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");

  }else{

    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");

  }

});