// =========================
// script.js
// =========================

// =========================
// MAP
// =========================

const map = L.map('map', {

  zoomControl:true,
  minZoom:6,
  maxZoom:18

});

// =========================
// LIMITES SP
// =========================

const boundsSP = L.latLngBounds(

  [-25.5,-53.5],
  [-19.5,-44.0]

);

map.setMaxBounds(boundsSP);

map.options.maxBoundsViscosity = 1.0;

// =========================
// DETECTA TEMA
// =========================

const isLightMode =
window.matchMedia(
  '(prefers-color-scheme: light)'
).matches;

// =========================
// MAPA LIGHT
// =========================

const lightMap = L.tileLayer(

  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

  {

    attribution:
    '&copy; OpenStreetMap'

  }

);

// =========================
// MAPA DARK
// =========================

const darkMap = L.tileLayer(

  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',

  {

    attribution:
    '&copy; OpenStreetMap &copy; CARTO'

  }

);

// =========================
// MAPA INICIAL
// =========================

if(isLightMode){

  lightMap.addTo(map);

}else{

  darkMap.addTo(map);

}

// =========================
// ÍCONE CUSTOM
// =========================

const customIcon = L.divIcon({

  className:'custom-marker',

  html:`

    <div class="marker-glow">

      <div class="marker-inner">

        <i class="fa-solid fa-location-dot"></i>

      </div>

    </div>

  `,

  iconSize:[40,40],
  iconAnchor:[20,20]

});

// =========================
// LOCAIS - TATUAPÉ
// =========================

const places = [

  {
    name:"Tatuapé Auto Center",
    lat:-23.5408,
    lng:-46.5735,
    rating:"4.9",
    type:"Mecânica"
  },

  {
    name:"Garage Prime Tatuapé",
    lat:-23.5389,
    lng:-46.5712,
    rating:"4.7",
    type:"Funilaria"
  },

  {
    name:"SpeedCar Mecânica",
    lat:-23.5417,
    lng:-46.5694,
    rating:"4.8",
    type:"Elétrica"
  },

  {
    name:"Auto Elétrica Paulista",
    lat:-23.5432,
    lng:-46.5751,
    rating:"4.6",
    type:"Elétrica"
  },

  {
    name:"Center Pneus Tatuapé",
    lat:-23.5372,
    lng:-46.5677,
    rating:"4.5",
    type:"Pneus"
  },

  {
    name:"Oficina TurboCar",
    lat:-23.5395,
    lng:-46.5780,
    rating:"4.9",
    type:"Mecânica"
  },

  {
    name:"Power Motors",
    lat:-23.5424,
    lng:-46.5659,
    rating:"4.8",
    type:"Revisão"
  },

  {
    name:"AutoFix Premium",
    lat:-23.5360,
    lng:-46.5729,
    rating:"4.7",
    type:"Freios"
  }

];

// =========================
// MODAL
// =========================

const modalOverlay =
document.getElementById(
  "modalOverlay"
);

const closeModal =
document.getElementById(
  "closeModal"
);

// =========================
// MARCADORES
// =========================

places.forEach(place => {

  const marker = L.marker(

    [place.lat,place.lng],

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

    </div>

  `);

  // ABRIR MODAL

  marker.on(

    'click',

    () => {

      modalOverlay.classList.add(
        'active'
      );

    }

  );

});

// =========================
// USUÁRIO
// SENAC TATUAPÉ
// =========================

const userLat = -23.541132;
const userLng = -46.57;

// MARCADOR USUÁRIO

L.marker(

  [userLat,userLng],

  {

    zIndexOffset:999999,

    icon:L.divIcon({

      className:'user-marker',

      html:`

        <div class="user-glow">

          <div class="user-inner">

            <i class="fa-solid fa-location-arrow"></i>

          </div>

        </div>

      `,

      iconSize:[46,46],
      iconAnchor:[23,23]

    })

  }

).addTo(map);

// CENTRALIZA

map.setView(

  [userLat,userLng],

  15

);

// =========================
// FECHAR MODAL
// =========================

closeModal.addEventListener(

  "click",

  () => {

    modalOverlay.classList.remove(
      "active"
    );

  }

);

// =========================
// FECHAR FORA
// =========================

modalOverlay.addEventListener(

  "click",

  e => {

    if(
      e.target === modalOverlay
    ){

      modalOverlay.classList.remove(
        "active"
      );

    }

  }

);

// =========================
// SERVICE ACTIVE
// =========================

const serviceCards =
document.querySelectorAll(
  ".service-card"
);

serviceCards.forEach(card => {

  card.addEventListener(

    "click",

    () => {

      serviceCards.forEach(c => {

        c.classList.remove(
          "active"
        );

      });

      card.classList.add(
        "active"
      );

    }

  );

});

// =========================
// FILTER ACTIVE
// =========================

const filters =
document.querySelectorAll(
  ".filter"
);

filters.forEach(filter => {

  filter.addEventListener(

    "click",

    () => {

      filters.forEach(f => {

        f.classList.remove(
          "active"
        );

      });

      filter.classList.add(
        "active"
      );

    }

  );

});

// =========================
// ALTERA TEMA MAPA
// =========================

window.matchMedia(
  '(prefers-color-scheme: light)'
).addEventListener(

  'change',

  e => {

    if(e.matches){

      map.removeLayer(darkMap);

      lightMap.addTo(map);

    }else{

      map.removeLayer(lightMap);

      darkMap.addTo(map);

    }

  }

);