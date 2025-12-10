# Project Dependencies Documentation / Документація залежностей проєкту

This document describes all dependencies of the Solar System project and their purpose.

Цей документ описує всі залежності проєкту Solar System та їх призначення.

---

## English / Англійська

## 📦 Main Dependencies (dependencies)

### three (^0.177.0)

**What it is:**
- Three.js is a powerful JavaScript library for creating and displaying 3D graphics in the browser.

**Why it's needed:**
- Creating 3D scenes with planets, stars, and space objects
- Managing camera and lighting
- Loading and displaying 3D models (GLB/GLTF formats)
- Rendering planet textures
- Creating orbits and movement trajectories
- Post-processing effects (bloom, glow)

**Where it's used:**
- `main.js` — all 3D logic of the project
- Creating scene, camera, renderer
- Loading space probe models
- Animating planet and moon movement

**Why it's important:**
Without Three.js, it would be impossible to create an interactive 3D visualization of the Solar System. It's the foundation of the entire project.

---

## 🛠️ Development Dependencies (devDependencies)

### vite (^7.0.0)

**What it is:**
- Vite is a modern tool for building and developing web applications.

**Why it's needed:**
- Fast development server with hot-reload (automatic updates on changes)
- Optimized project build for production
- ES6+ module processing without additional configuration
- Code optimization and minification during build

**Where it's used:**
- `npm run dev` command — starts the development server
- `npm run build` command — creates an optimized version in the `dist/` folder
- `npm run preview` command — preview of the built version

**Why it's important:**
Vite provides fast development and convenient project building. Without it, you would have to configure Webpack or another bundler manually.

---

## 📋 Dependency Structure in node_modules

### Why does node_modules look "mixed up"?

The `node_modules` folder contains not only the project's direct dependencies, but also all their dependencies (transitive dependencies). For example:

- `three` → requires many subfolders to work
- `vite` → requires many tools for building

Each library installs its own dependencies, so the structure may seem chaotic.

### Main folders in node_modules:

#### @esbuild/
- Tool for fast JavaScript compilation
- Used by Vite for optimization

#### @rollup/
- Tool for module bundling
- Used by Vite to create the final build

#### @types/
- TypeScript type definitions
- Helps code editors understand data types

#### esbuild/
- Fast JavaScript compiler
- Used by Vite for code transformation

#### fdir/
- Library for file system operations
- Used by Vite for file searching

#### nanoid/
- Unique ID generator
- Used by various build tools

#### picocolors/
- Lightweight library for colored console output
- Used by Vite for beautiful log display

#### picomatch/
- Library for file path matching (glob patterns)
- Used by Vite for file filtering

#### postcss/
- Tool for CSS processing
- Used by Vite for working with styles

#### rollup/
- Main module bundling tool
- Used by Vite to create the final bundle

#### source-map-js/
- Source maps handling (for debugging)
- Helps track errors in source code

#### three/
- Main 3D graphics library
- **This is the main project dependency**

#### tinyglobby/
- Utility for working with file paths
- Used by build tools

#### vite/
- Build and development tool
- **This is the main development dependency**

---

## 🔍 How to understand what each dependency does?

### For regular users:

1. **three** — creates 3D graphics (planets, stars, space)
2. **vite** — helps run and build the project

Other dependencies are "internal" tools needed for these two main libraries to work.

### For developers:

If you need to understand why a specific dependency is needed:
1. Open `package.json` — only direct dependencies are listed there
2. Other dependencies are installed automatically as dependencies of dependencies
3. You can check the documentation for each library on npmjs.com

---

## ⚠️ Important to know

### Don't modify node_modules manually!

- All changes will be lost on the next dependency installation
- Folder structure is critical for project operation
- Folder names must match package names

### If you need to update dependencies:

```bash
# Update all dependencies to latest versions
npm update

# Update a specific dependency
npm install three@latest
npm install vite@latest
```

### If something broke:

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Useful Links

- [Three.js documentation](https://threejs.org/docs/)
- [Vite documentation](https://vitejs.dev/)
- [npm documentation](https://docs.npmjs.com/)

---

## 📝 Dependency Versions

Current versions are specified in `package.json`:
- `three`: ^0.177.0 (compatible with versions 0.177.x)
- `vite`: ^7.0.0 (compatible with versions 7.x.x)

The `^` symbol means that minor updates can be installed automatically.

---

## Українська / Ukrainian

## 📦 Основні залежності (dependencies)

### three (^0.177.0)

**Що це:**
- Three.js — це потужна бібліотека JavaScript для створення та відображення 3D графіки в браузері.

**Навіщо потрібна:**
- Створення 3D сцен з планетами, зірками та космічними об'єктами
- Управління камерою та освітленням
- Завантаження та відображення 3D моделей (формати GLB/GLTF)
- Рендеринг текстур планет
- Створення орбіт та траєкторій руху
- Постобробка ефектів (bloom, glow)

**Де використовується:**
- `main.js` — вся 3D логіка проєкту
- Створення сцени, камери, рендерера
- Завантаження моделей космічних зондів
- Анімація руху планет та супутників

**Чому важлива:**
Без Three.js неможливо було б створити інтерактивну 3D візуалізацію Сонячної системи. Це основа всього проєкту.

---

## 🛠️ Залежності для розробки (devDependencies)

### vite (^7.0.0)

**Що це:**
- Vite — сучасний інструмент для збірки та розробки веб-додатків.

**Навіщо потрібна:**
- Швидкий сервер розробки з hot-reload (автоматичне оновлення при змінах)
- Оптимізована збірка проєкту для продакшену
- Обробка модулів ES6+ без додаткової налаштування
- Оптимізація та мініфікація коду під час збірки

**Де використовується:**
- Команда `npm run dev` — запускає сервер розробки
- Команда `npm run build` — створює оптимізовану версію в папці `dist/`
- Команда `npm run preview` — попередній перегляд зібраної версії

**Чому важлива:**
Vite забезпечує швидку розробку та зручну збірку проєкту. Без неї довелося б налаштовувати Webpack або інший збирач вручну.

---

## 📋 Структура залежностей у node_modules

### Чому node_modules виглядає "перемішано"?

Папка `node_modules` містить не лише прямі залежності проєкту, але й усі їх залежності (транзитивні залежності). Наприклад:

- `three` → потребує багато підпапок для роботи
- `vite` → потребує багато інструментів для збірки

Кожна бібліотека встановлює свої залежності, тому структура може здаватися хаотичною.

### Основні папки в node_modules:

#### @esbuild/
- Інструмент для швидкої компіляції JavaScript
- Використовується Vite для оптимізації

#### @rollup/
- Інструмент для збірки модулів
- Використовується Vite для створення фінальної збірки

#### @types/
- Визначення типів TypeScript
- Допомагає редакторам коду розуміти типи даних

#### esbuild/
- Швидкий компілятор JavaScript
- Використовується Vite для трансформації коду

#### fdir/
- Бібліотека для роботи з файловою системою
- Використовується Vite для пошуку файлів

#### nanoid/
- Генератор унікальних ID
- Використовується різними інструментами збірки

#### picocolors/
- Легковісна бібліотека для кольорового виводу в консоль
- Використовується Vite для красивого відображення логів

#### picomatch/
- Бібліотека для співставлення шляхів файлів (glob patterns)
- Використовується Vite для фільтрації файлів

#### postcss/
- Інструмент для обробки CSS
- Використовується Vite для роботи зі стилями

#### rollup/
- Основний інструмент збірки модулів
- Використовується Vite для створення фінального бандлу

#### source-map-js/
- Робота з source maps (для відлагодження)
- Допомагає відстежувати помилки в вихідному коді

#### three/
- Основна бібліотека 3D графіки
- **Це головна залежність проєкту**

#### tinyglobby/
- Утиліта для роботи зі шляхами файлів
- Використовується інструментами збірки

#### vite/
- Інструмент збірки та розробки
- **Це головна залежність для розробки**

---

## 🔍 Як зрозуміти, що робить кожна залежність?

### Для звичайного користувача:

1. **three** — створює 3D графіку (планети, зірки, космос)
2. **vite** — допомагає запускати та збирати проєкт

Інші залежності — це "внутрішні" інструменти, які потрібні для роботи цих двох основних бібліотек.

### Для розробника:

Якщо потрібно зрозуміти, навіщо потрібна конкретна залежність:
1. Відкрийте `package.json` — там вказані лише прямі залежності
2. Інші залежності встановлюються автоматично як залежності залежностей
3. Можна подивитися в документації кожної бібліотеки на npmjs.com

---

## ⚠️ Важливо знати

### Не змінюйте node_modules вручну!

- Усі зміни будуть втрачені при наступній установці залежностей
- Структура папок критична для роботи проєкту
- Імена папок повинні збігатися з іменами пакетів

### Якщо потрібно оновити залежності:

```bash
# Оновити всі залежності до останніх версій
npm update

# Оновити конкретну залежність
npm install three@latest
npm install vite@latest
```

### Якщо щось зламалося:

```bash
# Видалити node_modules та перевстановити
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Корисні посилання

- [Документація Three.js](https://threejs.org/docs/)
- [Документація Vite](https://vitejs.dev/)
- [Документація npm](https://docs.npmjs.com/)

---

## 📝 Версії залежностей

Поточні версії вказані в `package.json`:
- `three`: ^0.177.0 (сумісно з версіями 0.177.x)
- `vite`: ^7.0.0 (сумісно з версіями 7.x.x)

Символ `^` означає, що можна встановлювати мінорні оновлення автоматично.
