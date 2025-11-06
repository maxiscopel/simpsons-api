// src/main.ts

// Interfaces según la API (parte 5.1)
export interface SimpsonCharacter {
  id: number;
  age?: number | null;
  birthdate?: string | null;
  gender?: string | null;
  name: string;
  occupation?: string | null;
  portrait_path?: string | null;
  phrases: string[];
  status?: string | null;
}

export interface IResponseApi {
  count: number;
  next?: string | null;
  prev?: string | null;
  pages?: number;
  results: SimpsonCharacter[];
}

/* ---------- Constantes y elementos del DOM (5.2) ---------- */

const API_BASE = 'https://thesimpsonsapi.com/api/characters';
const CDN_BASE = 'https://cdn.thesimpsonsapi.com/500';

const btnLoad = document.getElementById('btnLoad') as HTMLButtonElement;
const loadingEl = document.getElementById('loading') as HTMLElement;
const errorEl = document.getElementById('error') as HTMLElement;
const charactersContainer = document.getElementById('characters') as HTMLElement;

/* ---------- Funciones de UI (5.3) ---------- */

function showLoading(): void {
  loadingEl.classList.remove('hidden');
  errorEl.classList.add('hidden');
}

function hideLoading(): void {
  loadingEl.classList.add('hidden');
}

function showError(message: string): void {
  errorEl.textContent = message;
  errorEl.classList.remove('hidden');

  // Se oculta automáticamente después de 5s
  setTimeout(() => {
    errorEl.classList.add('hidden');
  }, 5000);

  console.error(message);
}

/* ---------- Crear tarjeta de personaje (5.3.6) ---------- */

function createCharacterCard(character: SimpsonCharacter): HTMLElement {
  const card = document.createElement('div');
  card.className = 'character-card';

  // Imagen
  const img = document.createElement('img');
  if (character.portrait_path) {
    img.src = `${CDN_BASE}${character.portrait_path}`;
    img.alt = character.name;
  } else {
    img.alt = `${character.name} (imagen no disponible)`;
  }
  card.appendChild(img);

  // Nombre
  const h3 = document.createElement('h3');
  h3.textContent = character.name;
  card.appendChild(h3);

  // Frase: elegimos la primera si existe, sino un fallback
  const p = document.createElement('p');
  p.className = 'phrase';
  const phrase = Array.isArray(character.phrases) && character.phrases.length > 0
    ? character.phrases[0]
    : 'Sin frases registradas.';
  p.textContent = phrase;
  card.appendChild(p);

  return card;
}

/* ---------- Renderizar personajes (5.3.7) ---------- */

const renderCharacters = (characters: SimpsonCharacter[]): void => {
  // Limpiar existente
  charactersContainer.innerHTML = '';

  if (!Array.isArray(characters) || characters.length === 0) {
    charactersContainer.textContent = 'No se encontraron personajes.';
    return;
  }

  for (const char of characters) {
    const card = createCharacterCard(char);
    charactersContainer.appendChild(card);
  }
};

/* ---------- Fetch de personajes (5.3.8) ---------- */

const fetchCharacters = async (): Promise<void> => {
  showLoading();
  try {
    const resp = await fetch(API_BASE);
    if (!resp.ok) {
      throw new Error(`Error en la respuesta: ${resp.status} ${resp.statusText}`);
    }

    const data: IResponseApi = await resp.json();

    // Validación básica de datos
    if (!data || !Array.isArray(data.results)) {
      throw new Error('Formato de datos inesperado desde la API.');
    }

    // Renderizamos los personajes
    renderCharacters(data.results);
  } catch (error) {
    // Mensaje de error para el usuario y log para devs
    const msg = error instanceof Error ? error.message : 'Error desconocido al obtener personajes.';
    showError(`No se pudieron cargar los personajes: ${msg}`);
  } finally {
    hideLoading();
  }
};

/* ---------- Event listeners (5.4) ---------- */

btnLoad.addEventListener('click', () => {
  // Se podría agregar lógica de paginado o filtro en el futuro
  fetchCharacters();
});

/* Opcional: cargar al abrir la página */
// fetchCharacters();
