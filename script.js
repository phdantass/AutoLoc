const vehicles = [
  {
    id: 'amg-gt',
    name: 'Mercedes-Benz AMG GT',
    brand: 'Mercedes-Benz',
    year: 2024,
    km: 1800,
    fuel: 'Gasolina',
    category: 'Esportivo',
    price: 720000,
    badge: 'Novo destaque',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200',
    description: 'Coupe esportivo com pacote premium, interior em couro e baixa quilometragem.',
    specs: ['Motor V8 biturbo', 'Cambio automatico', 'Garantia premium', 'Historico verificado']
  },
  {
    id: 'porsche-911',
    name: 'Porsche 911 Carrera',
    brand: 'Porsche',
    year: 2023,
    km: 5200,
    fuel: 'Gasolina',
    category: 'Coupe',
    price: 850000,
    badge: 'Mais buscado',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200',
    description: 'Icone de performance com procedencia completa e acabamento impecavel.',
    specs: ['Motor boxer', 'Pacote Sport Chrono', 'Revisoes em dia', 'IPVA quitado']
  },
  {
    id: 'ferrari-488',
    name: 'Ferrari 488 GTB',
    brand: 'Ferrari',
    year: 2023,
    km: 2100,
    fuel: 'Gasolina',
    category: 'Superesportivo',
    price: 2800000,
    badge: 'Exclusivo',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200',
    description: 'Superesportivo selecionado para clientes de alta exigencia e colecionadores.',
    specs: ['Motor V8 central', 'Fibra de carbono', 'Laudo cautelar', 'Entrega assistida']
  },
  {
    id: 'bmw-m4',
    name: 'BMW M4 Competition',
    brand: 'BMW',
    year: 2024,
    km: 3400,
    fuel: 'Gasolina',
    category: 'Esportivo',
    price: 780000,
    badge: 'Pronta entrega',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200',
    description: 'Performance diaria com tecnologia embarcada, bancos esportivos e tracao precisa.',
    specs: ['510 cv', 'Head-up display', 'Som premium', 'Garantia de fabrica']
  },
  {
    id: 'range-rover',
    name: 'Range Rover Sport',
    brand: 'Land Rover',
    year: 2022,
    km: 12600,
    fuel: 'Diesel',
    category: 'SUV',
    price: 640000,
    badge: 'SUV premium',
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=1200',
    description: 'SUV de luxo com conforto superior, tracao integral e acabamento refinado.',
    specs: ['4x4', 'Teto panoramico', '7 modos de conducao', 'Assistentes ativos']
  },
  {
    id: 'audi-rs6',
    name: 'Audi RS6 Avant',
    brand: 'Audi',
    year: 2024,
    km: 2900,
    fuel: 'Gasolina',
    category: 'Wagon',
    price: 980000,
    badge: 'Alta performance',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200',
    description: 'Espaco familiar com performance extrema, tracao quattro e visual exclusivo.',
    specs: ['Quattro', 'Bang & Olufsen', 'Suspensao adaptativa', 'Interior Alcantara']
  }
];

const services = [
  {
    icon: 'wrench',
    title: 'Manutencao',
    description: 'Revisoes, diagnosticos e cuidados preventivos com rede especializada.',
    action: 'Agendar manutencao'
  },
  {
    icon: 'map-pin',
    title: 'Rastreamento',
    description: 'Monitoramento em tempo real com alertas inteligentes e suporte integrado.',
    action: 'Ativar rastreamento'
  },
  {
    icon: 'shield-check',
    title: 'Seguro',
    description: 'Coberturas sob medida para proteger seu patrimonio com tranquilidade.',
    action: 'Cotacao de seguro'
  },
  {
    icon: 'credit-card',
    title: 'Financiamento',
    description: 'Simulacao consultiva, taxas competitivas e aprovacao agil.',
    action: 'Simular parcelas'
  },
  {
    icon: 'badge-check',
    title: 'Vistoria premium',
    description: 'Laudo completo, historico do veiculo e validacao documental.',
    action: 'Solicitar vistoria'
  },
  {
    icon: 'truck',
    title: 'Entrega assistida',
    description: 'Entrega segura com checklist, explicacao dos recursos e suporte inicial.',
    action: 'Consultar entrega'
  }
];

const BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0
});

const KM = new Intl.NumberFormat('pt-BR');

const favoriteKey = 'autoloc:favorites';
const leadKey = 'autoloc:leads';
const profileKey = 'autoloc:profile';
const sellerStoreKey = 'autoloc:seller:store';
const sellerVehiclesKey = 'autoloc:seller:vehicles';
const sellerServicesKey = 'autoloc:seller:services';
const sellerProductsKey = 'autoloc:seller:products';
const roleKey = 'autoloc:role';

function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  return [...scope.querySelectorAll(selector)];
}

function formatPrice(value) {
  return BRL.format(value);
}

function formatKm(value) {
  return `${KM.format(value)} km`;
}

function readStorage(key, fallback) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function createId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getFavorites() {
  try {
    const favorites = JSON.parse(localStorage.getItem(favoriteKey)) || [];
    return Array.isArray(favorites) ? favorites : [];
  } catch {
    return [];
  }
}

function setFavorites(ids) {
  localStorage.setItem(favoriteKey, JSON.stringify([...new Set(ids)]));
  updateFavoriteBadges();
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const next = favorites.includes(id)
    ? favorites.filter((item) => item !== id)
    : [...favorites, id];

  setFavorites(next);
  renderCurrentPage();
}

function getProfile() {
  const fallback = {
    name: 'Pedro Silva',
    email: 'pedro@email.com',
    phone: '(11) 99999-0000',
    notifications: true,
    financing: true,
    theme: 'dark'
  };

  try {
    return { ...fallback, ...(JSON.parse(localStorage.getItem(profileKey)) || {}) };
  } catch {
    return fallback;
  }
}

function saveProfile(profile) {
  localStorage.setItem(profileKey, JSON.stringify(profile));
}

function getSellerStore() {
  return readStorage(sellerStoreKey, {});
}

function getSellerServices() {
  const servicesList = readStorage(sellerServicesKey, []);
  return Array.isArray(servicesList) ? servicesList : [];
}

function getSellerVehicles() {
  const vehiclesList = readStorage(sellerVehiclesKey, []);
  return Array.isArray(vehiclesList) ? vehiclesList : [];
}

function getSellerProducts() {
  const productsList = readStorage(sellerProductsKey, []);
  return Array.isArray(productsList) ? productsList : [];
}

function saveLead(type, payload) {
  let leads = [];

  try {
    leads = JSON.parse(localStorage.getItem(leadKey) || '[]');
  } catch {
    leads = [];
  }

  if (!Array.isArray(leads)) {
    leads = [];
  }

  leads.push({ type, payload, createdAt: new Date().toISOString() });
  localStorage.setItem(leadKey, JSON.stringify(leads));
}

function toast(message) {
  let element = qs('.toast');

  if (!element) {
    element = document.createElement('div');
    element.className = 'toast';
    document.body.appendChild(element);
  }

  element.textContent = message;
  element.classList.add('show');
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => element.classList.remove('show'), 2600);
}

function createVehicleCard(vehicle) {
  const favorite = isFavorite(vehicle.id);

  return `
    <article class="car-card" data-vehicle-card data-id="${vehicle.id}" data-brand="${vehicle.brand}" data-category="${vehicle.category}" data-year="${vehicle.year}" data-price="${vehicle.price}">
      <div class="car-image">
        <span class="car-badge">${vehicle.badge}</span>
        <button class="favorite-btn ${favorite ? 'active' : ''}" type="button" data-favorite="${vehicle.id}" aria-label="Alternar favorito">
          <i data-lucide="heart"></i>
        </button>
        <img src="${vehicle.image}" alt="${vehicle.name}" />
      </div>
      <div class="car-content">
        <div>
          <h3>${vehicle.name}</h3>
          <p>${vehicle.description}</p>
        </div>
        <div class="car-info">
          <span>${vehicle.year}</span>
          <span>${formatKm(vehicle.km)}</span>
          <span>${vehicle.fuel}</span>
        </div>
        <div class="car-footer">
          <div>
            <span class="price-label">A partir de</span>
            <strong class="price">${formatPrice(vehicle.price)}</strong>
          </div>
          <button class="details-btn" type="button" data-details="${vehicle.id}">Ver detalhes</button>
        </div>
      </div>
    </article>
  `;
}

function createServiceCard(service) {
  return `
    <article class="service-card">
      <span class="service-icon"><i data-lucide="${service.icon}"></i></span>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <button class="service-action" type="button" data-service="${service.title}">${service.action}</button>
    </article>
  `;
}

function renderIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderVehicleGrid(container, list) {
  if (!container) {
    return;
  }

  container.innerHTML = list.length
    ? list.map(createVehicleCard).join('')
    : '<div class="empty-state"><i data-lucide="search-x"></i><h3>Nenhum veiculo encontrado</h3><p>Ajuste a busca ou limpe os filtros para ver mais opcoes.</p></div>';

  renderIcons();
}

function renderServiceGrid(container, list = services) {
  if (!container) {
    return;
  }

  container.innerHTML = list.map(createServiceCard).join('');
  renderIcons();
}

function updateFavoriteBadges() {
  const count = getFavorites().length;
  qsa('[data-favorite-count]').forEach((item) => {
    item.textContent = count;
  });
}

function openVehicleModal(id) {
  const vehicle = vehicles.find((item) => item.id === id);

  if (!vehicle) {
    return;
  }

  const modal = qs('#vehicle-modal');
  if (!modal) {
    return;
  }

  qs('[data-modal-image]', modal).src = vehicle.image;
  qs('[data-modal-image]', modal).alt = vehicle.name;
  qs('[data-modal-title]', modal).textContent = vehicle.name;
  qs('[data-modal-description]', modal).textContent = vehicle.description;
  qs('[data-modal-price]', modal).textContent = formatPrice(vehicle.price);
  qs('[data-modal-meta]', modal).innerHTML = `
    <span>${vehicle.brand}</span>
    <span>${vehicle.year}</span>
    <span>${formatKm(vehicle.km)}</span>
    <span>${vehicle.category}</span>
  `;
  qs('[data-modal-specs]', modal).innerHTML = vehicle.specs.map((spec) => `<li>${spec}</li>`).join('');
  qs('[data-modal-favorite]', modal).dataset.favorite = vehicle.id;
  qs('[data-modal-favorite]', modal).classList.toggle('active', isFavorite(vehicle.id));
  qs('[data-modal-interest]', modal).dataset.interest = vehicle.id;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  renderIcons();
}

function closeModal() {
  qsa('.modal.open').forEach((modal) => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  });
  qs('#modalOverlay')?.classList.remove('active');
  document.body.classList.remove('modal-open');
}

function setupGlobalEvents() {
  document.addEventListener('click', (event) => {
    const details = event.target.closest('[data-details]');
    const favorite = event.target.closest('[data-favorite]');
    const modalFavorite = event.target.closest('[data-modal-favorite]');
    const close = event.target.closest('[data-close-modal]');
    const interest = event.target.closest('[data-interest]');
    const service = event.target.closest('[data-service]');

    if (details) {
      openVehicleModal(details.dataset.details);
    }

    if (favorite && !modalFavorite) {
      toggleFavorite(favorite.dataset.favorite);
      toast(isFavorite(favorite.dataset.favorite) ? 'Veiculo adicionado aos favoritos.' : 'Veiculo removido dos favoritos.');
    }

    if (modalFavorite) {
      toggleFavorite(modalFavorite.dataset.favorite);
      openVehicleModal(modalFavorite.dataset.favorite);
    }

    if (close) {
      closeModal();
    }

    if (interest) {
      const vehicle = vehicles.find((item) => item.id === interest.dataset.interest);
      saveLead('vehicle', vehicle);
      toast('Interesse registrado. Um consultor entrara em contato.');
      closeModal();
    }

    if (service) {
      saveLead('service', { service: service.dataset.service });
      toast('Solicitacao recebida. Nossa equipe vai continuar o atendimento.');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
}

function setupUserMenu() {
  const profileLinks = qsa('.profile-link');

  if (!profileLinks.length) {
    return;
  }

  let menu = qs('[data-user-menu]');

  if (!menu) {
    menu = document.createElement('div');
    menu.className = 'user-menu';
    menu.dataset.userMenu = '';
    menu.innerHTML = `
      <a href="perfil.html"><i data-lucide="user"></i><span>Meu perfil</span></a>
      <a href="favoritos.html"><i data-lucide="heart"></i><span>Favoritos</span></a>
      <a href="index.html" data-menu-logout><i data-lucide="log-out"></i><span>Sair</span></a>
    `;
    document.body.appendChild(menu);
  }

  function closeUserMenu() {
    menu.classList.remove('open');
    profileLinks.forEach((link) => link.setAttribute('aria-expanded', 'false'));
  }

  function positionMenu(link) {
    const rect = link.getBoundingClientRect();
    const right = Math.max(16, window.innerWidth - rect.right);
    menu.style.top = `${rect.bottom + 10 + window.scrollY}px`;
    menu.style.right = `${right}px`;
  }

  profileLinks.forEach((link) => {
    link.setAttribute('aria-haspopup', 'menu');
    link.setAttribute('aria-expanded', 'false');
    link.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const isOpen = menu.classList.contains('open');

      if (isOpen) {
        closeUserMenu();
        return;
      }

      positionMenu(link);
      menu.classList.add('open');
      link.setAttribute('aria-expanded', 'true');
      renderIcons();
    });
  });

  menu.addEventListener('click', (event) => {
    if (event.target.closest('[data-menu-logout]')) {
      localStorage.removeItem(roleKey);
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.profile-link') && !event.target.closest('[data-user-menu]')) {
      closeUserMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeUserMenu();
    }
  });

  window.addEventListener('resize', closeUserMenu);
  window.addEventListener('scroll', closeUserMenu, { passive: true });
}

function setupSearchPage() {
  const grid = qs('[data-vehicles-grid]');
  const search = qs('[data-search]');
  const sort = qs('[data-sort]');
  const chips = qsa('[data-filter-chip]');

  if (!grid) {
    return;
  }

  function applyFilters() {
    const term = (search?.value || '').trim().toLowerCase();
    const activeChip = qs('[data-filter-chip].active');
    const category = activeChip?.dataset.filterChip || 'Todos';
    let list = vehicles.filter((vehicle) => {
      const text = `${vehicle.name} ${vehicle.brand} ${vehicle.category} ${vehicle.fuel}`.toLowerCase();
      const matchTerm = !term || text.includes(term);
      const matchCategory = category === 'Todos' || vehicle.category === category || vehicle.brand === category;
      return matchTerm && matchCategory;
    });

    if (sort?.value === 'price-asc') {
      list = list.sort((a, b) => a.price - b.price);
    }

    if (sort?.value === 'price-desc') {
      list = list.sort((a, b) => b.price - a.price);
    }

    if (sort?.value === 'year-desc') {
      list = list.sort((a, b) => b.year - a.year);
    }

    renderVehicleGrid(grid, list);
  }

  search?.addEventListener('input', applyFilters);
  sort?.addEventListener('change', applyFilters);
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((item) => item.classList.remove('active'));
      chip.classList.add('active');
      applyFilters();
    });
  });

  applyFilters();
}

function getFilteredVehicles() {
  const search = qs('[data-search]');
  const sort = qs('[data-sort]');
  const term = (search?.value || '').trim().toLowerCase();
  const activeChip = qs('[data-filter-chip].active');
  const category = activeChip?.dataset.filterChip || 'Todos';
  let list = vehicles.filter((vehicle) => {
    const text = `${vehicle.name} ${vehicle.brand} ${vehicle.category} ${vehicle.fuel}`.toLowerCase();
    const matchTerm = !term || text.includes(term);
    const matchCategory = category === 'Todos' || vehicle.category === category || vehicle.brand === category;
    return matchTerm && matchCategory;
  });

  if (sort?.value === 'price-asc') {
    list = list.sort((a, b) => a.price - b.price);
  }

  if (sort?.value === 'price-desc') {
    list = list.sort((a, b) => b.price - a.price);
  }

  if (sort?.value === 'year-desc') {
    list = list.sort((a, b) => b.year - a.year);
  }

  return list;
}

function setupHomePage() {
  const grid = qs('[data-home-vehicles]');
  const serviceGrid = qs('[data-home-services]');
  const search = qs('[data-home-search]');

  renderVehicleGrid(grid, vehicles.slice(0, 3));
  renderServiceGrid(serviceGrid, services.slice(0, 4));

  search?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      window.location.href = `veiculos.html?q=${encodeURIComponent(search.value)}`;
    }
  });
}

function setupFavoritesPage() {
  const grid = qs('[data-favorites-grid]');
  const empty = qs('[data-favorites-empty]');
  const count = qs('[data-favorites-total]');
  const total = qs('[data-favorites-value]');
  const ids = getFavorites();
  const list = vehicles.filter((vehicle) => ids.includes(vehicle.id));

  if (count) {
    count.textContent = list.length;
  }

  if (total) {
    total.textContent = formatPrice(list.reduce((sum, vehicle) => sum + vehicle.price, 0));
  }

  if (empty) {
    empty.hidden = list.length > 0;
  }

  if (grid && list.length === 0) {
    grid.innerHTML = '';
    renderIcons();
    return;
  }

  renderVehicleGrid(grid, list);
}

function setupServicesPage() {
  renderServiceGrid(qs('[data-services-grid]'));
}

function setupServiceMapPage() {
  const mapElement = qs('#map');

  if (!mapElement || typeof L === 'undefined') {
    return;
  }

  const servicePlaces = [
    {
      name: 'AutoMaster Premium',
      lat: -23.5408,
      lng: -46.5735,
      rating: 4.8,
      reviews: 342,
      type: 'Mecânica',
      distance: 1.2,
      open: true,
      price: 3,
      phone: '5511999990001',
      about: 'Mecânica especializada em carros importados e nacionais. Atendimento premium 24h.',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=1600&auto=format&fit=crop',
      tags: ['Troca de óleo e filtros', 'Alinhamento e balanceamento', 'Revisão completa', 'Diagnóstico eletrônico', 'Suspensão', 'Freios']
    },
    {
      name: 'Garage Prime Tatuapé',
      lat: -23.5389,
      lng: -46.5712,
      rating: 4.7,
      reviews: 219,
      type: 'Funilaria',
      distance: 1.5,
      open: true,
      price: 2,
      phone: '5511999990002',
      about: 'Funilaria, pintura e reparos rápidos com acabamento premium para veículos nacionais e importados.',
      image: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=1600&auto=format&fit=crop',
      tags: ['Martelinho de ouro', 'Pintura premium', 'Polimento técnico', 'Restauração de parachoque']
    },
    {
      name: 'SpeedCar Mecânica',
      lat: -23.5417,
      lng: -46.5694,
      rating: 4.9,
      reviews: 188,
      type: 'Mecânica',
      distance: 0.9,
      open: true,
      price: 2,
      phone: '5511999990003',
      about: 'Oficina completa para manutenção preventiva, revisão e diagnóstico em tempo real.',
      image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?q=80&w=1600&auto=format&fit=crop',
      tags: ['Revisão completa', 'Scanner automotivo', 'Freios', 'Suspensão']
    },
    {
      name: 'Auto Elétrica Paulista',
      lat: -23.5432,
      lng: -46.5751,
      rating: 4.6,
      reviews: 156,
      type: 'Elétrica',
      distance: 1.9,
      open: true,
      price: 1,
      phone: '5511999990004',
      about: 'Especialistas em elétrica, bateria, alternador, sensores e módulos eletrônicos.',
      image: 'https://images.unsplash.com/photo-1632823471565-1ecdf5c4062d?q=80&w=1600&auto=format&fit=crop',
      tags: ['Bateria', 'Alternador', 'Módulos', 'Sensores']
    },
    {
      name: 'Center Borracharia Tatuapé',
      lat: -23.5372,
      lng: -46.5677,
      rating: 4.5,
      reviews: 121,
      type: 'Borracharia',
      distance: 2.3,
      open: false,
      price: 1,
      phone: '5511999990005',
      about: 'Borracharia, alinhamento, balanceamento e cambagem com atendimento rápido.',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1600&auto=format&fit=crop',
      tags: ['Pneus novos', 'Conserto de pneus', 'Alinhamento', 'Balanceamento', 'Cambagem']
    },
    {
      name: 'Locadora Prime Motors',
      lat: -23.5360,
      lng: -46.5729,
      rating: 4.7,
      reviews: 203,
      type: 'Locadora',
      distance: 1.7,
      open: true,
      price: 2,
      phone: '5511999990006',
      about: 'Locação de veículos executivos, SUVs e carros reserva com planos flexíveis.',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1600&auto=format&fit=crop',
      tags: ['Carro reserva', 'SUVs', 'Planos mensais', 'Retirada rápida']
    },
    {
      name: 'AutoParts Express',
      lat: -23.5395,
      lng: -46.5780,
      rating: 4.6,
      reviews: 176,
      type: 'Autopeças',
      distance: 2.1,
      open: true,
      price: 1,
      phone: '5511999990007',
      about: 'Autopeças originais e paralelas premium com pronta entrega para manutenção automotiva.',
      image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1600&auto=format&fit=crop',
      tags: ['Filtros', 'Pastilhas', 'Óleo', 'Peças importadas']
    },
    {
      name: 'Studio Estética Auto',
      lat: -23.5445,
      lng: -46.5688,
      rating: 4.8,
      reviews: 147,
      type: 'Estética',
      distance: 1.8,
      open: true,
      price: 2,
      phone: '5511999990008',
      about: 'Higienização, polimento, vitrificação e detalhamento para deixar o veículo impecável.',
      image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1600&auto=format&fit=crop',
      tags: ['Higienização interna', 'Polimento técnico', 'Vitrificação', 'Lavagem premium']
    }
  ];

  let currentPlaces = [...servicePlaces];
  let currentPlace = servicePlaces[0];
  let activeType = 'Mecânica';
  let activeSort = 'near';
  const userLat = -23.541132;
  const userLng = -46.57;

  const map = L.map('map', {
    zoomControl: true,
    minZoom: 6,
    maxZoom: 18
  });

  const boundsSP = L.latLngBounds([-25.5, -53.5], [-19.5, -44.0]);
  map.setMaxBounds(boundsSP);
  map.options.maxBoundsViscosity = 1.0;

  const lightMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  });

  const darkMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO'
  });

  const prefersLight = window.matchMedia('(prefers-color-scheme: light)');
  (prefersLight.matches ? lightMap : darkMap).addTo(map);

  function createPlaceIcon(place) {
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="marker-glow" data-place-marker="${place.name}" data-place-marker-id="${encodeURIComponent(place.name)}" onclick="window.autolocOpenServicePlace && window.autolocOpenServicePlace(this.dataset.placeMarkerId)">
          <div class="marker-inner">
            <i class="fa-solid fa-location-dot"></i>
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
  }

  const userIcon = L.divIcon({
    className: 'user-marker',
    html: `
      <div class="user-glow">
        <div class="user-inner">
          <i class="fa-solid fa-location-arrow"></i>
        </div>
      </div>
    `,
    iconSize: [46, 46],
    iconAnchor: [23, 23]
  });

  L.marker([userLat, userLng], {
    zIndexOffset: 999999,
    icon: userIcon
  }).addTo(map);

  const markerLayer = L.layerGroup().addTo(map);
  map.setView([userLat, userLng], 15);

  function updateStats(list) {
    const total = qs('[data-map-total]');
    const rating = qs('[data-map-rating]');
    const open = qs('[data-map-open]');

    if (total) total.textContent = list.length;
    if (rating) {
      const average = list.length
        ? list.reduce((sum, place) => sum + place.rating, 0) / list.length
        : 0;
      rating.textContent = average.toFixed(1);
    }
    if (open) open.textContent = list.filter((place) => place.open).length;
  }

  function openServiceModal(place) {
    currentPlace = place;
    const overlay = qs('#modalOverlay');

    qs('[data-place-image]').src = place.image;
    qs('[data-place-image]').alt = place.name;
    qs('[data-place-status]').textContent = place.open ? 'Aberto agora' : 'Fechado no momento';
    qs('[data-place-status]').style.background = place.open ? 'var(--green)' : 'var(--red)';
    qs('[data-place-distance]').textContent = `${place.distance.toFixed(1)} km`;
    qs('[data-place-name]').textContent = place.name;
    qs('[data-place-rating]').textContent = place.rating.toFixed(1);
    qs('[data-place-reviews]').textContent = `(${place.reviews} avaliações)`;
    qs('[data-place-about]').textContent = place.about;
    qs('[data-place-hours]').textContent = place.open ? '08:00 - 18:00' : 'Abre amanhã às 08:00';
    qs('[data-place-tags]').innerHTML = place.tags.map((tag) => `
      <div class="tag">
        <i class="fa-solid fa-circle-check"></i>
        ${tag}
      </div>
    `).join('');

    overlay.classList.add('active');
    document.body.classList.add('modal-open');
  }

  window.autolocOpenServicePlace = (encodedName) => {
    const name = decodeURIComponent(encodedName);
    const place = servicePlaces.find((item) => item.name === name);
    if (place) {
      openServiceModal(place);
    }
  };

  function renderMarkers(list) {
    markerLayer.clearLayers();

    list.forEach((place) => {
      const marker = L.marker([place.lat, place.lng], { icon: createPlaceIcon(place) }).addTo(markerLayer);
      marker.bindPopup(`
        <div class="map-popup">
          <h3>${place.name}</h3>
          <p>${place.rating.toFixed(1)} estrelas</p>
          <p>${place.type}</p>
        </div>
      `);
      marker.on('click', () => openServiceModal(place));
    });

    updateStats(list);
  }

  function openPlaceFromMarker(markerElement) {
    const encodedName = markerElement.dataset.placeMarkerId || encodeURIComponent(markerElement.dataset.placeMarker || '');
    const name = decodeURIComponent(encodedName);
    const place = servicePlaces.find((item) => item.name === name);

    if (place) {
      openServiceModal(place);
    }
  }

  function applyServiceFilters() {
    const searchTerm = (qs('[data-service-search]')?.value || '').trim().toLowerCase();

    currentPlaces = servicePlaces.filter((place) => {
      const matchesType = !activeType || place.type === activeType;
      const text = `${place.name} ${place.type} ${place.about} ${place.tags.join(' ')}`.toLowerCase();
      const matchesSearch = !searchTerm || text.includes(searchTerm);
      return matchesType && matchesSearch;
    });

    if (activeSort === 'near') {
      currentPlaces.sort((a, b) => a.distance - b.distance);
    }

    if (activeSort === 'cheap') {
      currentPlaces.sort((a, b) => a.price - b.price);
    }

    if (activeSort === 'rating') {
      currentPlaces.sort((a, b) => b.rating - a.rating);
    }

    renderMarkers(currentPlaces);
  }

  qsa('[data-service-type]').forEach((card) => {
    card.addEventListener('click', () => {
      qsa('[data-service-type]').forEach((item) => item.classList.remove('active'));
      card.classList.add('active');
      activeType = card.dataset.serviceType;
      applyServiceFilters();
    });
  });

  qsa('[data-service-sort]').forEach((button) => {
    button.addEventListener('click', () => {
      qsa('[data-service-sort]').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      activeSort = button.dataset.serviceSort;
      applyServiceFilters();
    });
  });

  qs('[data-service-search]')?.addEventListener('input', applyServiceFilters);
  qs('[data-service-clear]')?.addEventListener('click', () => {
    const search = qs('[data-service-search]');
    if (search) {
      search.value = '';
    }

    activeType = '';
    activeSort = 'near';
    qsa('[data-service-type]').forEach((item) => item.classList.remove('active'));
    qsa('[data-service-sort]').forEach((item) => item.classList.toggle('active', item.dataset.serviceSort === activeSort));
    applyServiceFilters();
  });

  document.addEventListener('click', (event) => {
    const markerElement = event.target.closest('[data-place-marker]');

    if (markerElement) {
      openPlaceFromMarker(markerElement);
    }
  }, true);

  mapElement.addEventListener('click', (event) => {
    const markerElement = event.target.closest('[data-place-marker]');
    if (!markerElement) {
      return;
    }

    openPlaceFromMarker(markerElement);
  });

  qs('#closeModal')?.addEventListener('click', () => closeModal());
  qs('#modalOverlay')?.addEventListener('click', (event) => {
    if (event.target === qs('#modalOverlay')) {
      closeModal();
    }
  });

  qs('[data-route]')?.addEventListener('click', () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${currentPlace.lat},${currentPlace.lng}`, '_blank');
  });

  qs('[data-call]')?.addEventListener('click', () => {
    window.location.href = `tel:+${currentPlace.phone}`;
  });

  qs('[data-whatsapp]')?.addEventListener('click', () => {
    window.open(`https://wa.me/${currentPlace.phone}?text=${encodeURIComponent(`Olá, vim pelo AutoLoc e gostaria de atendimento em ${currentPlace.name}.`)}`, '_blank');
  });

  prefersLight.addEventListener('change', (event) => {
    if (event.matches) {
      map.removeLayer(darkMap);
      lightMap.addTo(map);
    } else {
      map.removeLayer(lightMap);
      darkMap.addTo(map);
    }
  });

  applyServiceFilters();

  window.setTimeout(() => {
    map.invalidateSize();
    map.setView([userLat, userLng], 15);
  }, 250);
}

function setupProfilePage() {
  const profile = getProfile();
  const form = qs('[data-profile-form]');
  const name = qs('[data-profile-name]');
  const email = qs('[data-profile-email]');
  const phone = qs('[data-profile-phone]');
  const initials = qs('[data-profile-initials]');

  if (!form) {
    return;
  }

  form.elements.name.value = profile.name;
  form.elements.email.value = profile.email;
  form.elements.phone.value = profile.phone;
  form.elements.notifications.checked = profile.notifications;
  form.elements.financing.checked = profile.financing;

  name.textContent = profile.name;
  email.textContent = profile.email;
  phone.textContent = profile.phone;
  initials.textContent = profile.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const next = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      phone: form.elements.phone.value,
      notifications: form.elements.notifications.checked,
      financing: form.elements.financing.checked
    };
    saveProfile(next);
    toast('Perfil atualizado com sucesso.');
    name.textContent = next.name;
    email.textContent = next.email;
    phone.textContent = next.phone;
    initials.textContent = next.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  });
}

function setupRoleAccess() {
  let selectedLoginRole = 'consumer';
  const loginForm = qs('[data-login-form]');
  const authTitle = qs('[data-auth-title]');
  const authSubtitle = qs('[data-auth-subtitle]');
  const submitButton = qs('.login-submit');

  qsa('[data-auth-tab]').forEach((tab) => {
    tab.addEventListener('click', () => {
      const isSignup = tab.dataset.authTab === 'signup';
      qsa('[data-auth-tab]').forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');

      if (authTitle) authTitle.textContent = isSignup ? 'Crie sua conta' : 'Bem-vindo!';
      if (authSubtitle) authSubtitle.textContent = isSignup ? 'Escolha seu perfil e comece no AutoLoc.' : 'Entre na sua conta para continuar.';
      if (submitButton) submitButton.textContent = isSignup ? 'Criar conta' : 'Entrar';
    });
  });

  qsa('[data-login-role]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedLoginRole = button.dataset.loginRole;
      qsa('[data-login-role]').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
    });
  });

  loginForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    localStorage.setItem(roleKey, selectedLoginRole);
    window.location.href = selectedLoginRole === 'seller' ? 'vendedorinicio.html' : 'consumidor.html';
  });

  qsa('[data-select-role]').forEach((link) => {
    link.addEventListener('click', () => {
      localStorage.setItem(roleKey, link.dataset.selectRole);
    });
  });

  qsa('[data-clear-role]').forEach((link) => {
    link.addEventListener('click', () => {
      localStorage.removeItem(roleKey);
    });
  });

  if (document.body.dataset.page?.startsWith('seller') && localStorage.getItem(roleKey) !== 'seller') {
    window.location.replace('index.html');
    return true;
  }

  if (localStorage.getItem(roleKey) === 'seller' && !document.body.dataset.page?.startsWith('seller') && document.body.dataset.page !== 'login') {
    document.body.classList.add('seller-viewing-consumer');
    const bar = document.createElement('div');
    bar.className = 'seller-return-bar';
    bar.innerHTML = `
      <span><i data-lucide="store"></i> Visualizando como consumidor</span>
      <a href="vendedorinicio.html">Voltar ao painel</a>
    `;
    document.body.prepend(bar);
  }

  return false;
}

function serializeForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function createSellerItem(item, type) {
  const price = Number(item.price || 0);
  const metaByType = {
    service: `${item.category} • ${item.duration || 'Prazo a combinar'}`,
    product: `${item.category} • ${item.stock || 0} em estoque`,
    vehicle: `${item.brand || 'Marca'} • ${item.year || 'Ano'} • ${item.km || 0} km`
  };
  const meta = metaByType[type] || item.category || 'Cadastro';
  const title = item.name || item.model || 'Item sem nome';

  return `
    <article class="seller-item">
      <div>
        <div class="seller-item-heading">
          <strong>${title}</strong>
          <span class="${item.status === 'Ativo' ? 'is-active' : 'is-paused'}">${item.status}</span>
        </div>
        <p>${item.description || 'Sem descricao cadastrada.'}</p>
        <small>${meta}</small>
      </div>
      <div class="seller-item-side">
        <strong>${formatPrice(price)}</strong>
        <div class="seller-item-actions">
          <button class="edit-action" type="button" data-edit-${type}="${item.id}" aria-label="Editar ${title}">
            <i data-lucide="pencil"></i>
          </button>
          <button class="remove-action" type="button" data-remove-${type}="${item.id}" aria-label="Remover ${title}">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderSellerStore() {
  const store = getSellerStore();
  const form = qs('[data-store-form]');
  const preview = qs('[data-store-preview]');
  const storeName = qs('[data-seller-store-name]');
  const status = qs('[data-seller-status]');

  if (form && store.storeName) {
    Object.entries(store).forEach(([key, value]) => {
      if (form.elements[key]) {
        form.elements[key].value = value;
      }
    });
  }

  if (storeName) {
    storeName.textContent = store.storeName || 'Loja sem nome';
  }

  if (status) {
    status.textContent = store.storeName ? 'Perfil pronto para publicar' : 'Perfil em configuracao';
  }

  if (!preview) {
    return;
  }

  if (!store.storeName) {
    preview.className = 'store-preview-empty';
    preview.textContent = 'Preencha os dados da loja para ver a previa.';
    return;
  }

  preview.className = 'store-preview-card';
  preview.innerHTML = `
    <span>${store.category || 'Loja automotiva'}</span>
    <h3>${store.storeName}</h3>
    <p>${store.about || 'Descricao ainda nao cadastrada.'}</p>
    <div>
      <small><i data-lucide="map-pin"></i>${store.address || 'Endereco nao informado'}</small>
      <small><i data-lucide="clock"></i>${store.hours || 'Horario nao informado'}</small>
      <small><i data-lucide="phone"></i>${store.phone || 'Telefone nao informado'}</small>
    </div>
  `;
}

function renderSellerCollections() {
  const vehiclesList = getSellerVehicles();
  const servicesList = getSellerServices();
  const productsList = getSellerProducts();
  const vehicleContainer = qs('[data-seller-vehicles]');
  const serviceContainer = qs('[data-seller-services]');
  const productContainer = qs('[data-seller-products]');
  const vehicleCount = qs('[data-seller-vehicle-count]');
  const serviceCount = qs('[data-seller-service-count]');
  const productCount = qs('[data-seller-product-count]');
  const vehicleListCount = qs('[data-vehicle-list-count]');
  const serviceListCount = qs('[data-service-list-count]');
  const productListCount = qs('[data-product-list-count]');

  const activeVehicles = vehiclesList.filter((item) => item.status === 'Ativo').length;
  const activeServices = servicesList.filter((item) => item.status === 'Ativo').length;
  const activeProducts = productsList.filter((item) => item.status === 'Ativo').length;

  if (vehicleCount) vehicleCount.textContent = activeVehicles;
  if (serviceCount) serviceCount.textContent = activeServices;
  if (productCount) productCount.textContent = activeProducts;
  if (vehicleListCount) vehicleListCount.textContent = `${vehiclesList.length} itens`;
  if (serviceListCount) serviceListCount.textContent = `${servicesList.length} itens`;
  if (productListCount) productListCount.textContent = `${productsList.length} itens`;

  if (vehicleContainer) {
    vehicleContainer.innerHTML = vehiclesList.length
      ? vehiclesList.map((item) => createSellerItem(item, 'vehicle')).join('')
      : '<div class="seller-empty">Nenhum veiculo cadastrado ainda.</div>';
  }

  if (serviceContainer) {
    serviceContainer.innerHTML = servicesList.length
      ? servicesList.map((item) => createSellerItem(item, 'service')).join('')
      : '<div class="seller-empty">Nenhum servico cadastrado ainda.</div>';
  }

  if (productContainer) {
    productContainer.innerHTML = productsList.length
      ? productsList.map((item) => createSellerItem(item, 'product')).join('')
      : '<div class="seller-empty">Nenhum produto cadastrado ainda.</div>';
  }
}

function renderSellerPage() {
  renderSellerStore();
  renderSellerCollections();
  renderIcons();
}

function setupSellerPage() {
  const storeForm = qs('[data-store-form]');
  const vehicleForm = qs('[data-vehicle-form]');
  const serviceForm = qs('[data-service-form]');
  const productForm = qs('[data-product-form]');
  const editing = {
    vehicle: null,
    service: null,
    product: null
  };

  if (!storeForm && !vehicleForm && !serviceForm && !productForm && !qs('[data-seller-dashboard]')) {
    return;
  }

  function updateSubmitText(form, editingId) {
    if (!form) {
      return;
    }

    const button = qs('button[type="submit"]', form);
    if (!button) {
      return;
    }

    if (!button.dataset.defaultText) {
      button.dataset.defaultText = button.textContent;
    }

    button.textContent = editingId ? 'Salvar alteracoes' : button.dataset.defaultText;
  }

  function fillForm(form, item) {
    Object.entries(item).forEach(([key, value]) => {
      if (key !== 'id' && form.elements[key]) {
        form.elements[key].value = value;
      }
    });
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function saveSellerItem(type, form, key, getItems, successCreate, successUpdate) {
    const items = getItems();
    const data = serializeForm(form);
    const editingId = editing[type];
    const next = editingId
      ? items.map((item) => (item.id === editingId ? { ...item, ...data, id: editingId } : item))
      : [{ id: createId(), ...data }, ...items];

    writeStorage(key, next);
    editing[type] = null;
    form.reset();
    updateSubmitText(form, null);
    toast(editingId ? successUpdate : successCreate);
    renderSellerPage();
  }

  storeForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    writeStorage(sellerStoreKey, serializeForm(storeForm));
    toast('Loja salva com sucesso.');
    renderSellerPage();
  });

  vehicleForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    saveSellerItem('vehicle', vehicleForm, sellerVehiclesKey, getSellerVehicles, 'Veiculo adicionado ao estoque.', 'Veiculo atualizado.');
  });

  serviceForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    saveSellerItem('service', serviceForm, sellerServicesKey, getSellerServices, 'Servico adicionado ao painel.', 'Servico atualizado.');
  });

  productForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    saveSellerItem('product', productForm, sellerProductsKey, getSellerProducts, 'Produto adicionado ao painel.', 'Produto atualizado.');
  });

  document.addEventListener('click', (event) => {
    const editVehicle = event.target.closest('[data-edit-vehicle]');
    const editService = event.target.closest('[data-edit-service]');
    const editProduct = event.target.closest('[data-edit-product]');
    const removeVehicle = event.target.closest('[data-remove-vehicle]');
    const removeService = event.target.closest('[data-remove-service]');
    const removeProduct = event.target.closest('[data-remove-product]');

    if (editVehicle && vehicleForm) {
      const item = getSellerVehicles().find((vehicle) => vehicle.id === editVehicle.dataset.editVehicle);
      if (item) {
        editing.vehicle = item.id;
        fillForm(vehicleForm, item);
        updateSubmitText(vehicleForm, item.id);
        toast('Editando veiculo.');
      }
    }

    if (editService && serviceForm) {
      const item = getSellerServices().find((service) => service.id === editService.dataset.editService);
      if (item) {
        editing.service = item.id;
        fillForm(serviceForm, item);
        updateSubmitText(serviceForm, item.id);
        toast('Editando servico.');
      }
    }

    if (editProduct && productForm) {
      const item = getSellerProducts().find((product) => product.id === editProduct.dataset.editProduct);
      if (item) {
        editing.product = item.id;
        fillForm(productForm, item);
        updateSubmitText(productForm, item.id);
        toast('Editando produto.');
      }
    }

    if (removeVehicle) {
      const next = getSellerVehicles().filter((item) => item.id !== removeVehicle.dataset.removeVehicle);
      writeStorage(sellerVehiclesKey, next);
      if (editing.vehicle === removeVehicle.dataset.removeVehicle) {
        editing.vehicle = null;
        vehicleForm?.reset();
        updateSubmitText(vehicleForm, null);
      }
      toast('Veiculo removido.');
      renderSellerPage();
    }

    if (removeService) {
      const next = getSellerServices().filter((item) => item.id !== removeService.dataset.removeService);
      writeStorage(sellerServicesKey, next);
      if (editing.service === removeService.dataset.removeService) {
        editing.service = null;
        serviceForm?.reset();
        updateSubmitText(serviceForm, null);
      }
      toast('Servico removido.');
      renderSellerPage();
    }

    if (removeProduct) {
      const next = getSellerProducts().filter((item) => item.id !== removeProduct.dataset.removeProduct);
      writeStorage(sellerProductsKey, next);
      if (editing.product === removeProduct.dataset.removeProduct) {
        editing.product = null;
        productForm?.reset();
        updateSubmitText(productForm, null);
      }
      toast('Produto removido.');
      renderSellerPage();
    }
  });

  renderSellerPage();
}

function setupUrlSearch() {
  const search = qs('[data-search]');
  if (!search) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');
  if (query) {
    search.value = query;
  }
}

function renderCurrentPage() {
  const page = document.body.dataset.page;

  if (page === 'home') {
    renderVehicleGrid(qs('[data-home-vehicles]'), vehicles.slice(0, 3));
  }

  if (page === 'vehicles') {
    renderVehicleGrid(qs('[data-vehicles-grid]'), getFilteredVehicles());
  }

  if (page === 'favorites') {
    setupFavoritesPage();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (setupRoleAccess()) {
    return;
  }

  setupGlobalEvents();
  setupUserMenu();
  setupUrlSearch();
  setupHomePage();
  setupSearchPage();
  setupFavoritesPage();
  setupServicesPage();
  setupServiceMapPage();
  setupProfilePage();
  setupSellerPage();
  updateFavoriteBadges();
  renderIcons();
});
