Trabajo Práctico: Consumo de The Simpsons API con TypeScript
Objetivo
Desarrollar una aplicación web que consuma The Simpsons API para mostrar personajes con sus imágenes y frases célebres, utilizando TypeScript.
 Parte 1: Configuración inicial del proyecto
 1.1 Estructura del proyecto

simpsons-api-project/
│
├── src/
│   ├── main.ts
│   └── styles.css
│
├── dist/
│   └── main.js
│
├── index.html
├── package.json
├── tsconfig.json
└── README.md

 1.2 Inicializar npm
Comando: npm init -y
Este comando inicializa un nuevo proyecto Node.js y crea el archivo package.json, donde se guarda la configuración del proyecto, scripts y dependencias.
 1.3 Instalar TypeScript
Comando: npm install typescript --save-dev
Se usa --save-dev porque TypeScript solo se necesita durante el desarrollo, no cuando la aplicación se ejecuta en producción.
1.4 Configurar TypeScript
Archivo tsconfig.json con las opciones: target, module, lib, outDir, rootDir, strict, etc.
Explicación:
- strict: activa comprobaciones estrictas de tipos.
- target: indica la versión de JavaScript (ES2020).
- outDir: define la carpeta donde se guardan los JS compilados.
 1.5 Scripts en package.json
Scripts: build y watch.
- npm run build: compila TypeScript a JavaScript.
- npm run watch: recompila automáticamente al detectar cambios.
Parte 2: Documentación de la API
Base URL: https://thesimpsonsapi.com/api/characters
La API devuelve personajes con campos id, name, phrases y portrait_path.
Las imágenes se obtienen concatenando: https://cdn.thesimpsonsapi.com/500 + portrait_path
Interfaces TypeScript

interface SimpsonCharacter {
  id: number;
  name: string;
  phrases: string[];
  portrait_path?: string | null;
}

interface IResponseApi {
  count: number;
  results: SimpsonCharacter[];
}

 Parte 3: HTML
El HTML incluye header, botón 'Cargar Personajes', spinner, sección de error, contenedor dinámico de personajes y footer con link a la API.
Parte 5: Lógica en TypeScript

Funciones implementadas:
- showLoading() / hideLoading()
- showError(message)
- createCharacterCard(character)
- renderCharacters(characters)
- fetchCharacters()

Se agregaron event listeners al botón 'Cargar Personajes' para ejecutar fetchCharacters().

 Parte 6: Ejecución y pruebas

Comandos:
- npm run build → compila el proyecto
- npm run watch → compila automáticamente
- npx http-server → levanta un servidor local para evitar errores CORS

Vista general

Al presionar 'Cargar Personajes' aparece el spinner, luego las tarjetas con imagen, nombre y frase.
Si ocurre un error, se muestra un mensaje durante 5 segundos.
El diseño es responsive y las tarjetas se acomodan en grilla.

 Autor
Maxi — Tecnicatura en Programación, UTN. Trabajo Práctico: Consumo de The Simpsons API con TypeScript.
