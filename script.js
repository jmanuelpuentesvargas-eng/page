const albums = [
  ['BAD', 2007, 'El comienzo de una leyenda.', ['Midnight Pulse', 'BAD', 'Golden Floor']],
  ['DANGEROUS', 2011, 'Una etapa más madura y experimental.', ['Risk', 'Neon Heart', 'Dangerous']],
  ['HISTORY', 2015, 'Johan abrió su corazón y contó su historia.', ['History', 'Mirror Lights', 'Letter to Tomorrow']],
  ['THIS IS IT', 2019, 'El inicio de una nueva etapa artística.', ['This Is It', 'Final Call', 'Encore']],
  ['XSCAPE', 2021, 'Escapar del dolor y reconstruirse.', ['Xscape', 'Runaway Sky', 'Rebuild']],
  ['DECADE', 2024, 'Diez años de evolución reunidos en un proyecto.', ['Decade', 'Arena', 'Liberian Girl']],
  ['DECADE DELUXE', 2025, 'Nuevas canciones y experiencia exclusiva.', ['Get Your Weight Off Of Me', 'Deluxe Night', 'Aftershow']],
  ['ONE MORE CHANCE', 2026, 'Amor, superación y nuevos comienzos.', ['One More Chance', 'New Dawn', 'Stay']]
];

const stops = [
  { country: 'España', city: 'Madrid', stadium: 'Santiago Bernabéu', dates: '23–25 septiembre 2026', capacity: '81,000', status: '⚠️ Últimos boletos', x: 48, y: 45 },
  { country: 'México', city: 'Ciudad de México', stadium: 'Foro Sol', dates: '15 octubre 2026', capacity: '65,000', status: '✅ Disponible', x: 24, y: 58 },
  { country: 'Estados Unidos', city: 'Los Ángeles', stadium: 'SoFi Stadium', dates: '2 noviembre 2026', capacity: '70,000', status: '❌ Agotado', x: 18, y: 43 },
  { country: 'Argentina', city: 'Buenos Aires', stadium: 'River Plate', dates: '18 noviembre 2026', capacity: '84,000', status: '✅ Disponible', x: 38, y: 78 }
];

const albumGrid = document.querySelector('#albumGrid');
const dialog = document.querySelector('#albumDialog');
const detail = document.querySelector('#albumDetail');

albums.forEach(([title, year, story, songs]) => {
  const card = document.createElement('button');
  card.className = 'album-card reveal';
  card.innerHTML = `<div class="cover">${title}</div><p class="eyebrow">${year}</p><h3>${title}</h3><p>${story}</p>`;
  card.addEventListener('click', () => {
    detail.innerHTML = `<div class="cover">${title}</div><p class="eyebrow">${year}</p><h2>${title}</h2><p>${story}</p><h3>Canciones</h3><ul>${songs.map(song => `<li>${song}</li>`).join('')}</ul><p>Incluye archivo de fotos, videos oficiales y notas de producción para fans.</p>`;
    dialog.showModal();
  });
  albumGrid.append(card);
});

document.querySelector('.close').addEventListener('click', () => dialog.close());

const tourMap = document.querySelector('#tourMap');
function showStop(stop) {
  let info = tourMap.querySelector('.pin-info');
  if (!info) {
    info = document.createElement('div');
    info.className = 'pin-info';
    tourMap.append(info);
  }
  info.innerHTML = `<strong>${stop.country} · ${stop.city}</strong><p>${stop.stadium}<br>${stop.dates}<br>Capacidad: ${stop.capacity}</p><b>${stop.status}</b>`;
}
stops.forEach((stop, index) => {
  const pin = document.createElement('button');
  pin.className = 'pin';
  pin.style.left = `${stop.x}%`;
  pin.style.top = `${stop.y}%`;
  pin.textContent = stop.country;
  pin.addEventListener('click', () => showStop(stop));
  tourMap.append(pin);
  if (index === 0) showStop(stop);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.16 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
