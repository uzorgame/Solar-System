import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { Lensflare, LensflareElement } from "three/examples/jsm/objects/Lensflare.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
const NASA_API_KEY = "CH3TuB34hg317ulEggcZCMlKgCCPYQeTzdzJDNCz";
const BASE_URL = import.meta.env.BASE_URL || '/';
let currentLanguage = localStorage.getItem('appLanguage') || 'en';
const translations = {
  en: {
    missionControl: "Control",
    speed: "Speed (Earth Time)",
    bloom: "Bloom",
    pause: "Pause",
    reset: "Reset",
    hideUI: "Hide UI",
    showUI: "Show UI",
    cameraControl: "Camera Control",
    stopFollow: "Stop Follow",
    toggle: "Toggle",
    orbits: "Orbits",
    spaceProbeOrbits: "Space Probe Orbits",
    moons: "Moons",
    realAsteroids: "Real Asteroids",
    comets: "Comets",
    asteroidBelts: "Asteroid Belts",
    allBelts: "All Belts",
    mainBelt: "Main Belt",
    trojans: "Trojans",
    kuiper: "Kuiper",
    scattered: "Scattered",
    solarExplorer: "SOLAR SYSTEM EXPLORER",
    planets: "8 Planets",
    dwarfPlanets: "11 Dwarf Planets",
    asteroidBeltsCount: "4 Asteroid Belts",
    tno: "Trans-Neptunian Objects",
    moonsCount: "50+ Moons",
    glowingOrbits: "Glowing Orbit Rings",
    nasaData: "Real-time NASA Data",
    followSun: "Follow Sun",
    celestialBodies: "Celestial Bodies",
    showPlanetNames: "Show Planet Names",
    showMoonNames: "Show Moon Names",
    orbitalPeriod: "Orbital Period",
    sizeRelative: "Size (Relative to Earth)",
    distanceFromSun: "Distance from Sun",
    discoveryYear: "Discovery Year",
    moons: "Moons",
    controls: "Controls",
    mouseOrbit: "Mouse: Orbit around object",
    scrollZoom: "Scroll: Zoom in/out",
    rKeyReset: "R key or Reset: Stop following",
    oKeyOrbits: "O key: Toggle glowing orbits",
    followPlanet: "FOLLOW PLANET",
    backToPlanet: "BACK TO PLANET",
    planet: "PLANET",
    dwarfPlanet: "DWARF PLANET",
    asteroid: "ASTEROID",
    tno: "TNO",
    celestialBody: "CELESTIAL BODY",
    moon: "MOON",
    slow: "Slow",
    fast: "Fast",
    days: "days",
    hours: "hours",
    years: "years",
    year: "year",
    orbiting: "Orbiting",
    moonsLabel: "Moons:",
    spaceProbes: "Space Probes",
    spaceProbesLabel: "Space Probes:",
    followSpaceProbe: "Follow",
    distance: "Distance:",
    size: "Size:",
    discovered: "Discovered:",
    au: "AU",
    earth: "Earth",
    unknown: "Unknown",
    ancient: "Ancient",
    na: "N/A",
    followMoon: "Follow",
    period: "Period",
    planetRadii: "planet radii",
    star: "STAR",
    sunInfo: "The star at the center of our Solar System. A G-type main-sequence star (G2V) that formed approximately 4.6 billion years ago. Contains 99.86% of the Solar System's mass. Surface temperature: 5,778 K. Core temperature: ~15 million K. Rotates around the galactic center in ~225-250 million years.",
    sunSizeRelative: "109.2x Earth",
    sunDistance: "0 AU (Center)",
    sunOrbitalPeriod: "~225-250 million years",
    galacticOrbit: "Galactic Orbit",
    follow: "FOLLOW"
  },
  uk: {
    missionControl: "Керування",
    speed: "Швидкість (Час Землі)",
    bloom: "Світіння",
    pause: "Пауза",
    reset: "Скинути",
    hideUI: "Приховати інтерфейс",
    showUI: "Показати інтерфейс",
    cameraControl: "Керування камерою",
    stopFollow: "Зупинити відстеження",
    toggle: "Перемикач",
    orbits: "Орбіти",
    spaceProbeOrbits: "Орбіти Космічні Апарати",
    moons: "Супутники",
    realAsteroids: "Справжні астероїди",
    comets: "Комети",
    asteroidBelts: "Пояси астероїдів",
    allBelts: "Всі пояси",
    mainBelt: "Головний пояс",
    trojans: "Троянці",
    kuiper: "Койпера",
    scattered: "Розсіяний",
    solarExplorer: "ДОСЛІДНИК СОНЯЧНОЇ СИСТЕМИ",
    planets: "8 Планет",
    dwarfPlanets: "11 Карликових планет",
    asteroidBeltsCount: "4 Пояси астероїдів",
    tno: "Транснептунові об'єкти",
    moonsCount: "50+ Супутників",
    glowingOrbits: "Світіння орбіт",
    nasaData: "Дані NASA в реальному часі",
    followSun: "Відстежити Сонце",
    celestialBodies: "Небесні тіла",
    showPlanetNames: "Показати назви планет",
    showMoonNames: "Показати назви супутників",
    orbitalPeriod: "Орбітальний період",
    sizeRelative: "Розмір (відносно Землі)",
    distanceFromSun: "Відстань від Сонця",
    discoveryYear: "Рік відкриття",
    moons: "Супутники",
    controls: "Керування",
    mouseOrbit: "Миша: Обертання навколо об'єкта",
    scrollZoom: "Прокрутка: Збільшення/зменшення",
    rKeyReset: "Клавіша R або Скинути: Зупинити відстеження",
    oKeyOrbits: "Клавіша O: Перемикати світіння орбіт",
    followPlanet: "ВІДСТЕЖИТИ ПЛАНЕТУ",
    backToPlanet: "ПОВЕРНУТИСЬ ДО ПЛАНЕТИ",
    planet: "ПЛАНЕТА",
    dwarfPlanet: "КАРЛИКОВА ПЛАНЕТА",
    asteroid: "АСТЕРОЇД",
    tno: "ТНО",
    celestialBody: "НЕБЕСНЕ ТІЛО",
    moon: "СУПУТНИК",
    slow: "Повільно",
    fast: "Швидко",
    days: "днів",
    hours: "годин",
    years: "років",
    year: "рік",
    orbiting: "Обертається навколо",
    moonsLabel: "Супутники:",
    spaceProbes: "Космічні апарати",
    spaceProbesLabel: "Космічні апарати:",
    followSpaceProbe: "Відстежити",
    distance: "Відстань:",
    size: "Розмір:",
    discovered: "Відкрито:",
    au: "АО",
    earth: "Землі",
    unknown: "Невідомо",
    ancient: "Старовинне",
    na: "Н/Д",
    followMoon: "Відстежити",
    period: "Період",
    planetRadii: "радіусів планети",
    star: "ЗІРКА",
    sunInfo: "Зірка в центрі нашої Сонячної системи. Зірка головної послідовності типу G (G2V), що сформувалася приблизно 4,6 мільярда років тому. Містить 99,86% маси Сонячної системи. Температура поверхні: 5,778 K. Температура ядра: ~15 мільйонів K. Обертається навколо галактичного центру за ~225-250 мільйонів років.",
    sunSizeRelative: "109,2x Землі",
    sunDistance: "0 АО (Центр)",
    sunOrbitalPeriod: "~225-250 мільйонів земних років",
    galacticOrbit: "Галактична орбіта",
    follow: "ВІДСТЕЖИТИ"
  },
  cs: {
    missionControl: "Ovládání",
    speed: "Rychlost (Zemský čas)",
    bloom: "Záře",
    pause: "Pauza",
    reset: "Obnovit",
    hideUI: "Skrýt rozhraní",
    showUI: "Zobrazit rozhraní",
    cameraControl: "Ovládání kamery",
    stopFollow: "Zastavit sledování",
    toggle: "Přepínač",
    orbits: "Dráhy",
    spaceProbeOrbits: "Dráhy kosmických sond",
    moons: "Měsíce",
    realAsteroids: "Skutečné asteroidy",
    comets: "Komety",
    asteroidBelts: "Pásy asteroidů",
    allBelts: "Všechny pásy",
    mainBelt: "Hlavní pás",
    trojans: "Trojané",
    kuiper: "Kuiperův",
    scattered: "Rozptýlený",
    solarExplorer: "PRŮZKUMNÍK SLUNEČNÍ SOUSTAVY",
    planets: "8 Planet",
    dwarfPlanets: "11 Trpasličích planet",
    asteroidBeltsCount: "4 Pásy asteroidů",
    tno: "Transneptunická tělesa",
    moonsCount: "50+ Měsíců",
    glowingOrbits: "Zářící dráhy",
    nasaData: "Data NASA v reálném čase",
    followSun: "Sledovat Slunce",
    celestialBodies: "Nebeská tělesa",
    showPlanetNames: "Zobrazit názvy planet",
    showMoonNames: "Zobrazit názvy měsíců",
    orbitalPeriod: "Orbitální perioda",
    sizeRelative: "Velikost (vzhledem k Zemi)",
    distanceFromSun: "Vzdálenost od Slunce",
    discoveryYear: "Rok objevu",
    moons: "Měsíce",
    controls: "Ovládání",
    mouseOrbit: "Myš: Otočení kolem objektu",
    scrollZoom: "Kolečko: Přiblížení/oddálení",
    rKeyReset: "Klávesa R nebo Obnovit: Zastavit sledování",
    oKeyOrbits: "Klávesa O: Přepnout zářící dráhy",
    followPlanet: "SLEDOVAT PLANETU",
    backToPlanet: "VRÁTIT SE K PLANETĚ",
    planet: "PLANETA",
    dwarfPlanet: "TRPASLIČÍ PLANETA",
    asteroid: "ASTEROID",
    tno: "TNO",
    celestialBody: "NEBESKÉ TĚLESO",
    moon: "MĚSÍC",
    slow: "Pomalu",
    fast: "Rychle",
    days: "dní",
    hours: "hodin",
    years: "let",
    year: "rok",
    orbiting: "Obíhá kolem",
    moonsLabel: "Měsíce:",
    spaceProbes: "Kosmické sondy",
    spaceProbesLabel: "Kosmické sondy:",
    followSpaceProbe: "Sledovat",
    distance: "Vzdálenost:",
    size: "Velikost:",
    discovered: "Objeveno:",
    au: "AU",
    earth: "Země",
    unknown: "Neznámé",
    ancient: "Starověké",
    na: "N/A",
    followMoon: "Sledovat",
    period: "Perioda",
    planetRadii: "poloměrů planety",
    star: "HVĚZDA",
    sunInfo: "Hvězda ve středu naší Sluneční soustavy. Hvězda hlavní posloupnosti typu G (G2V), která se zformovala přibližně před 4,6 miliardami let. Obsahuje 99,86% hmotnosti Sluneční soustavy. Teplota povrchu: 5,778 K. Teplota jádra: ~15 milionů K. Obíhá kolem galaktického centra za ~225-250 milionů let.",
    sunSizeRelative: "109,2x Země",
    sunDistance: "0 AU (Střed)",
    sunOrbitalPeriod: "~225-250 milionů pozemských let",
    galacticOrbit: "Galaktická orbita",
    follow: "SLEDOVAT"
  }
};
const bodyDescriptions = {
  en: {
    Sun: "The star at the center of our Solar System. A G-type main-sequence star (G2V) that formed approximately 4.6 billion years ago. Contains 99.86% of the Solar System's mass. Surface temperature: 5,778 K. Core temperature: ~15 million K. Rotates around the galactic center in ~225-250 million years. The Sun's energy, produced through nuclear fusion in its core, sustains all life on Earth and drives the climate and weather systems of all planets in the solar system.",
    Mercury: "Mercury is the closest planet to the Sun and the smallest planet in our solar system, completing an orbit in just 88 Earth days. Despite being closest to the Sun, it experiences extreme temperature variations from -173°C at night to 427°C during the day due to its lack of atmosphere. The planet has a heavily cratered surface similar to Earth's Moon and possesses a large iron core that makes up about 75% of its radius.",
    Venus: "Venus is the hottest planet in our solar system with surface temperatures reaching 462°C, hot enough to melt lead. Its thick, toxic atmosphere consists mainly of carbon dioxide with clouds of sulfuric acid, creating a runaway greenhouse effect. Despite being similar in size to Earth, Venus rotates backwards and has a day longer than its year, making it one of the most inhospitable places in the solar system.",
    Earth: "Earth is the only known planet in the universe to harbor life, with conditions perfectly balanced for complex ecosystems to thrive. Approximately 71% of its surface is covered by oceans, and it has a protective atmosphere rich in nitrogen and oxygen that shields life from harmful solar radiation. Our planet has one natural satellite, the Moon, which influences tides and has been crucial in the development of life on Earth.",
    Mars: "Mars, known as the Red Planet due to iron oxide (rust) covering its surface, is home to the largest volcano in the solar system, Olympus Mons, which stands 21 kilometers high. The planet features Valles Marineris, a massive canyon system that would stretch across the entire United States, and evidence of ancient river valleys suggesting water once flowed on its surface. Scientists continue to search for signs of past or present life on Mars, making it a prime target for future human exploration.",
    Vesta: "Vesta is the second-largest asteroid in the main asteroid belt and one of the largest objects in the solar system that has not been classified as a dwarf planet. It has a differentiated interior with a metallic core, mantle, and basaltic crust, similar to terrestrial planets, suggesting it may have been on the path to becoming a planet. The Dawn spacecraft visited Vesta in 2011-2012, revealing its complex geology and providing valuable insights into the early solar system.",
    Pallas: "Pallas is the third-largest asteroid in the main asteroid belt, discovered in 1802 by Heinrich Wilhelm Olbers, making it one of the first asteroids ever found. Unlike most asteroids, Pallas has a highly inclined orbit that takes it far above and below the plane of the solar system, suggesting it may be a remnant protoplanet from the early formation of our solar system. Scientists believe Pallas may contain water ice and have a composition similar to carbonaceous chondrite meteorites.",
    Jupiter: "Jupiter is the largest planet in our solar system, so massive that it could contain all other planets combined, and it acts as a cosmic vacuum cleaner, protecting inner planets from asteroids and comets. Its Great Red Spot is a persistent storm larger than Earth that has been raging for at least 400 years, with winds exceeding 400 kilometers per hour. The gas giant has 95 known moons, including the four large Galilean moons—Io, Europa, Ganymede, and Callisto—each with unique characteristics and potential for harboring life.",
    Saturn: "Saturn is famous for its spectacular ring system, composed of billions of ice and rock particles ranging from microscopic grains to house-sized chunks, creating one of the most beautiful sights in the solar system. Despite being a gas giant, Saturn is less dense than water and would theoretically float if placed in a giant bathtub. The planet has 146 confirmed moons, including Titan, which is larger than Mercury and has a thick atmosphere with liquid methane lakes, making it a target for future exploration.",
    Uranus: "Uranus is an ice giant planet uniquely tilted on its side at a 98-degree angle, likely due to a massive collision early in its history, causing extreme seasonal variations where each pole experiences 42 years of continuous sunlight followed by 42 years of darkness. Unlike other gas giants, Uranus emits very little internal heat, making it the coldest planet in the solar system with atmospheric temperatures dropping to -224°C. The planet has 28 known moons and a system of 13 faint rings discovered in 1977, all orbiting in the planet's equatorial plane.",
    Neptune: "Neptune is the windiest planet in our solar system, with speeds reaching up to 2,100 kilometers per hour, nearly supersonic winds driven by the planet's rapid rotation and internal heat. Its deep blue color comes from methane in its atmosphere, which absorbs red light and reflects blue wavelengths, though the exact mechanism creating such vivid colors remains a mystery. The planet's Great Dark Spot, a storm system similar to Jupiter's Great Red Spot, was observed by Voyager 2 in 1989 but had disappeared when the Hubble Space Telescope looked for it in 1994.",
    Ceres: "Ceres is the largest object in the asteroid belt and the only dwarf planet located in the inner solar system, reclassified from asteroid to dwarf planet in 2006 along with Pluto. Recent observations suggest Ceres may have a subsurface ocean of liquid water beneath its icy crust, making it a potential target in the search for life beyond Earth. NASA's Dawn spacecraft spent over three years studying Ceres, discovering bright spots of salt deposits and organic materials, indicating it may have been geologically active in the past.",
    Pluto: "Pluto, once considered the ninth planet, was reclassified as a dwarf planet in 2006, sparking debate among astronomers and the public about what defines a planet. The distant world features a heart-shaped region called Tombaugh Regio, a vast nitrogen ice plain, and mountains of water ice that reach heights of several kilometers. Pluto forms a binary system with its largest moon Charon, where both objects orbit around a common center of mass located outside Pluto's surface, making them more like a double-planet system than a typical planet-moon pair.",
    Eris: "Eris is the most massive known dwarf planet and was the discovery that ultimately led to Pluto's reclassification, as astronomers realized there were many similar-sized objects in the outer solar system. Located in the scattered disc region, Eris has a highly eccentric orbit that takes it from 38 to 97 astronomical units from the Sun, and it takes 558 years to complete one orbit. The dwarf planet has a very reflective surface covered in methane ice, making it one of the brightest objects in the outer solar system, and it has one known moon named Dysnomia.",
    Makemake: "Makemake is the third-largest known dwarf planet in the solar system, named after the creator god of the Rapa Nui people of Easter Island, reflecting its discovery's cultural significance. Its reddish surface color is likely due to tholins, complex organic molecules formed when methane is exposed to solar radiation, giving it a unique appearance among Kuiper Belt objects. Unlike other dwarf planets, Makemake appears to have no atmosphere, and it has one small, dark moon discovered in 2016, designated S/2015 (136472) 1, though it's commonly called MK 2.",
    Haumea: "Haumea is an elongated dwarf planet that spins faster than any other known large object in the solar system, completing a rotation in just 4 hours, which has stretched it into an ellipsoid shape resembling a flattened football. This rapid rotation is thought to be the result of a massive collision in the distant past that also created Haumea's two known moons, Hi'iaka and Namaka, and its ring system discovered in 2017. The dwarf planet's surface is covered in crystalline water ice, unusually bright and reflective, suggesting it may have been resurfaced recently by geological processes.",
    Sedna: "Sedna is one of the most distant known objects in the solar system, located in the extended scattered disc region, with an extremely elongated orbit that takes it from 76 to 936 astronomical units from the Sun. It takes approximately 11,400 Earth years for Sedna to complete a single orbit, meaning it has completed less than one orbit since the last ice age on Earth. The object's discovery in 2003 challenged our understanding of the solar system's boundaries and raised questions about the existence of a hypothetical Planet X or other distant massive objects that might have influenced its unusual orbit.",
    Quaoar: "Quaoar is a classical Kuiper Belt object named after the creator god of the Tongva people native to the Los Angeles area, representing one of the larger worlds in this distant region of the solar system. In 2023, astronomers discovered that Quaoar has a ring system, which is unusual because rings typically form inside what's called the Roche limit, where tidal forces would prevent moon formation, but Quaoar's rings are well outside this limit. The object has one known moon, Weywot, discovered in 2007, which orbits Quaoar and provides clues about the object's mass and formation history.",
    Orcus: "Orcus is a large plutino, meaning it shares a 2:3 orbital resonance with Neptune, completing two orbits around the Sun for every three orbits Neptune makes, similar to Pluto's relationship with Neptune. Sometimes called the 'anti-Pluto' because when Pluto is at perihelion (closest to the Sun), Orcus is at aphelion (farthest), and vice versa, creating an interesting orbital symmetry. The dwarf planet candidate has one large moon named Vanth, discovered in 2005, which is unusually large relative to Orcus, comprising about 3% of the system's total mass, suggesting it may have formed from a major collision.",
    Gonggong: "Gonggong is a red-colored scattered disc object named after a Chinese water god with red hair and a serpent's tail, reflecting both its reddish appearance and distant, chaotic orbit. The object has an unusually slow rotation period of approximately 22.4 hours, one of the slowest known rotation rates for objects of its size in the outer solar system. Gonggong has one known moon, Xiangliu, discovered in 2016, which takes about 25 days to orbit and provides important information about Gonggong's mass and the dynamics of this distant system.",
    Varuna: "Varuna is a large classical Kuiper Belt object named after the Hindu god of water and the celestial ocean, representing one of the trans-Neptunian objects that helped astronomers understand the diversity of the outer solar system. The object has an elongated, ellipsoidal shape rather than being spherical, caused by its rapid rotation period of approximately 6.34 hours, one of the fastest known rotation rates for objects in this region. Observations suggest Varuna has a dark, red-colored surface typical of many Kuiper Belt objects, likely covered in complex organic compounds called tholins formed by radiation interacting with ices.",
    Ixion: "Ixion is a large plutino, sharing the same 2:3 orbital resonance with Neptune as Pluto, positioned in the Kuiper Belt where many such resonant objects are found. The object has a very red surface color, among the reddest known in the outer solar system, suggesting it may have experienced significant thermal evolution or contains specific organic compounds that produce this coloration. Ixion's discovery in 2001 contributed to the growing understanding of the Kuiper Belt's population and structure, though much remains unknown about its physical properties and composition.",
    Salacia: "Salacia is a large trans-Neptunian object located in the classical Kuiper Belt, representing one of the substantial worlds in this distant region beyond Neptune's orbit. The object has a relatively low density, suggesting it may be composed largely of water ice mixed with rock, typical of many objects in the outer solar system. Salacia has one known moon, Actaea, discovered in 2006, which orbits at a distance that provides valuable information about the system's mass and helps astronomers understand how such binary systems form in the Kuiper Belt.",
    "2007 OR10": "2007 OR10, unofficially nicknamed 'Snow White' before receiving its official name, is one of the largest known dwarf planet candidates in the solar system, discovered in 2007 during a survey of the outer solar system. The object has a very red surface color, among the reddest of known trans-Neptunian objects, suggesting it contains significant amounts of organic compounds called tholins or has experienced extensive surface processing. It has one small moon discovered in 2016, which takes approximately 19 days to orbit and has helped scientists determine 2007 OR10's mass and confirm it as one of the largest objects in the scattered disc region."
  },
  uk: {
    Sun: "Зірка в центрі нашої Сонячної системи. Зірка головної послідовності типу G (G2V), що сформувалася приблизно 4,6 мільярда років тому. Містить 99,86% маси Сонячної системи. Температура поверхні: 5,778 K. Температура ядра: ~15 мільйонів K. Обертається навколо галактичного центру за ~225-250 мільйонів років. Енергія Сонця, що виробляється через ядерний синтез у його ядрі, підтримує все життя на Землі та керує кліматом та погодними системами всіх планет у сонячній системі.",
    Mercury: "Меркурій — найближча до Сонця планета та найменша планета в нашій сонячній системі, яка здійснює оберт навколо Сонця всього за 88 земних днів. Незважаючи на близькість до Сонця, він зазнає екстремальних коливань температури від -173°C вночі до 427°C вдень через відсутність атмосфери. Планета має сильно кратеровану поверхню, подібну до Місяця Землі, та велике залізне ядро, яке становить близько 75% його радіуса.",
    Venus: "Венера — найспекотніша планета в нашій сонячній системі з температурою поверхні до 462°C, достатньою для плавлення свинцю. Її товста, токсична атмосфера складається переважно з діоксиду вуглецю з хмарами сірчаної кислоти, створюючи ефект парникового газу, що розвивається. Незважаючи на подібність за розміром до Землі, Венера обертається в зворотному напрямку і має день довший за рік, що робить її одним з найнепридатніших для життя місць у сонячній системі.",
    Earth: "Земля — єдина відома планета у Всесвіті, де існує життя, з умовами, ідеально збалансованими для процвітання складних екосистем. Приблизно 71% її поверхні покрито океанами, і вона має захисну атмосферу, багату азотом та киснем, яка захищає життя від шкідливого сонячного випромінювання. Наша планета має один природний супутник — Місяць, який впливає на припливи і відливи та був ключовим у розвитку життя на Землі.",
    Mars: "Марс, відомий як Червона планета через оксид заліза (іржа), що покриває його поверхню, є домівкою найбільшого вулкана в сонячній системі — Олімпу, який сягає 21 кілометра заввишки. Планета має систему каньйонів Валліс Марінеріс, яка простяглася б через всю територію Сполучених Штатів, та докази древніх річкових долин, що свідчать про те, що колись на її поверхні текла вода. Вчені продовжують шукати ознаки минулого або теперішнього життя на Марсі, що робить його пріоритетною метою для майбутнього дослідження людиною.",
    Vesta: "Веста — другий за величиною астероїд у головному поясі астероїдів та один з найбільших об'єктів у сонячній системі, який не був класифікований як карликова планета. Вона має диференційовану внутрішню структуру з металевим ядром, мантією та базальтовою корою, подібну до земних планет, що вказує на те, що вона могла стати планетою. Космічний апарат Dawn відвідав Весту у 2011-2012 роках, розкривши її складну геологію та надавши цінну інформацію про ранню сонячну систему.",
    Pallas: "Паллада — третій за величиною астероїд у головному поясі астероїдів, відкритий у 1802 році Генріхом Вільгельмом Ольберсом, що робить його одним з перших відкритих астероїдів. На відміну від більшості астероїдів, Паллада має високо нахилену орбіту, яка виводить її далеко вище та нижче площини сонячної системи, що вказує на те, що вона може бути залишком протопланети з раннього формування нашої сонячної системи. Вчені вважають, що Паллада може містити водяний лід і мати склад, подібний до вуглецевих хондритних метеоритів.",
    Jupiter: "Юпітер — найбільша планета в нашій сонячній системі, настільки масивна, що він міг би вмістити всі інші планети разом узяті, і він діє як космічний пилосос, захищаючи внутрішні планети від астероїдів та комет. Його Велика червона пляма — це постійний шторм, більший за Землю, який бушує щонайменше 400 років, з вітрами, що перевищують 400 кілометрів на годину. Газовий гігант має 95 відомих супутників, включаючи чотири великі галілеєві супутники — Іо, Європу, Ганімед і Каллісто, кожен з яких має унікальні характеристики та потенціал для існування життя.",
    Saturn: "Сатурн відомий своєю видовищною системою кілець, складену з мільярдів частинок льоду та каменю від мікроскопічних зерен до уламків розміром з будинок, створюючи один з найкрасивіших видів у сонячній системі. Незважаючи на те, що він газовий гігант, Сатурн менш щільний за воду і теоретично міг би плавати, якби його помістили в гігантську ванну. Планета має 146 підтверджених супутників, включаючи Титан, який більший за Меркурій і має товсту атмосферу з рідкими метановими озерами, що робить його метою для майбутнього дослідження.",
    Uranus: "Уран — крижаний гігант, унікально нахилений набік під кутом 98 градусів, ймовірно, через масивне зіткнення на початку його історії, що спричиняє екстремальні сезонні коливання, коли кожен полюс зазнає 42 років безперервного сонячного світла, за якими слідують 42 роки темряви. На відміну від інших газових гігантів, Уран випромінює дуже мало внутрішнього тепла, що робить його найхолоднішою планетою в сонячній системі з температурою атмосфери до -224°C. Планета має 28 відомих супутників та систему з 13 слабких кілець, відкритих у 1977 році, які всі обертаються в екваторіальній площині планети.",
    Neptune: "Нептун — найвітряніша планета в нашій сонячній системі, зі швидкостями до 2100 кілометрів на годину, майже надзвукові вітри, спричинені швидким обертанням планети та внутрішнім теплом. Його глибокий синій колір походить від метану в атмосфері, який поглинає червоне світло та відбиває сині хвилі, хоча точний механізм створення таких яскравих кольорів залишається загадкою. Велика темна пляма планети — система штормів, подібна до Великої червоної плями Юпітера, була спостережена Voyager 2 у 1989 році, але зникла, коли космічний телескоп Хаббл шукав її у 1994 році.",
    Ceres: "Церера — найбільший об'єкт у поясі астероїдів та єдина карликова планета, розташована у внутрішній сонячній системі, перекласифікована з астероїда на карликову планету у 2006 році разом з Плутоном. Недавні спостереження вказують на те, що Церера може мати підповерхневий океан рідкої води під своєю крижаною корою, що робить її потенційною метою в пошуках життя поза Землею. Космічний апарат Dawn NASA провів більше трьох років, вивчаючи Цереру, відкривши яскраві плями сольових відкладень та органічних матеріалів, що вказує на те, що вона могла бути геологічно активною в минулому.",
    Pluto: "Плутон, колись вважався дев'ятою планетою, був перекласифікований як карликова планета у 2006 році, що викликало дискусії серед астрономів та громадськості про те, що визначає планету. Віддалений світ має серцеподібну область під назвою Рівнина Томбо, величезну рівнину з азотного льоду, та гори з водяного льоду, які сягають висоти кількох кілометрів. Плутон утворює бінарну систему зі своїм найбільшим супутником Хароном, де обидва об'єкти обертаються навколо спільного центру маси, розташованого поза поверхнею Плутона, що робить їх більш схожими на подвійну планетну систему, ніж типову пару планета-супутник.",
    Eris: "Ерида — наймасивніша відома карликова планета та була відкриттям, яке в кінцевому підсумку призвело до перекласифікації Плутона, оскільки астрономи усвідомили, що існує багато подібних за розміром об'єктів у зовнішній сонячній системі. Розташована в області розсіяного диска, Ерида має високо ексцентричну орбіту, яка виводить її від 38 до 97 астрономічних одиниць від Сонця, і їй потрібно 558 років, щоб завершити один оберт. Карликова планета має дуже відбивну поверхню, покриту метановим льодом, що робить її одним з найяскравіших об'єктів у зовнішній сонячній системі, і вона має один відомий супутник під назвою Дісномія.",
    Makemake: "Макемаке — третя за величиною відома карликова планета в сонячній системі, названа на честь бога-творця народу рапануї з острова Пасхи, що відображає культурне значення її відкриття. Її червонуватий колір поверхні, ймовірно, обумовлений толінами — складними органічними молекулами, утвореними при впливі метану на сонячне випромінювання, що надає їй унікальний вигляд серед об'єктів поясу Койпера. На відміну від інших карликових планет, Макемаке, схоже, не має атмосфери, і вона має один малий, темний супутник, відкритий у 2016 році, позначений S/2015 (136472) 1, хоча його зазвичай називають MK 2.",
    Haumea: "Хаумея — витягнута карликова планета, яка обертається швидше за будь-який інший відомий великий об'єкт у сонячній системі, завершуючи обертання всього за 4 години, що розтягнуло її в еліпсоїдну форму, схожу на сплюснутий м'яч. Це швидке обертання, ймовірно, є результатом масивного зіткнення в далекому минулому, яке також створило два відомі супутники Хаумеї — Хі'іаку та Намаку, та її систему кілець, відкриту у 2017 році. Поверхня карликової планети покрита кристалічним водяним льодом, незвично яскравим та відбивним, що вказує на те, що вона могла бути нещодавно переформатована геологічними процесами.",
    Sedna: "Седна — один з найвіддаленіших відомих об'єктів у сонячній системі, розташований в розширеній області розсіяного диска, з надзвичайно витягнутою орбітою, яка виводить її від 76 до 936 астрономічних одиниць від Сонця. Їй потрібно приблизно 11,400 земних років, щоб завершити один оберт, що означає, що вона завершила менше одного оберту з часів останнього льодовикового періоду на Землі. Відкриття об'єкта у 2003 році кинуло виклик нашому розумінню меж сонячної системи та підняло питання про існування гіпотетичної Планети X або інших віддалених масивних об'єктів, які могли вплинути на її незвичайну орбіту.",
    Quaoar: "Кваоар — класичний об'єкт поясу Койпера, названий на честь бога-творця народу тонґва, корінного населення району Лос-Анджелеса, що представляє один з більших світів у цій віддаленій області сонячної системи. У 2023 році астрономи відкрили, що Кваоар має систему кілець, що є незвичайним, оскільки кільця зазвичай формуються всередині того, що називається межею Роша, де приливні сили перешкоджали б утворенню супутників, але кільця Кваоара знаходяться значно за цією межею. Об'єкт має один відомий супутник, Вейвот, відкритий у 2007 році, який обертається навколо Кваоара і надає підказки про масу об'єкта та історію його формування.",
    Orcus: "Орк — великий плутино, що означає, що він має резонанс орбіти 2:3 з Нептуном, завершуючи два оберти навколо Сонця за кожні три оберти Нептуна, подібно до зв'язку Плутона з Нептуном. Іноді називається 'анти-Плутон', оскільки коли Плутон знаходиться в перигелії (найближче до Сонця), Орк знаходиться в афелії (найдалі), і навпаки, створюючи цікаву орбітальну симетрію. Кандидат у карликові планети має один великий супутник під назвою Вант, відкритий у 2005 році, який незвично великий відносно Орка, становлячи близько 3% загальної маси системи, що вказує на те, що він міг утворитися внаслідок великого зіткнення.",
    Gonggong: "Гонґонґ — червоний об'єкт розсіяного диска, названий на честь китайського бога води з червоним волоссям і хвостом змії, що відображає як його червонуватий вигляд, так і віддалену, хаотичну орбіту. Об'єкт має незвично повільний період обертання приблизно 22,4 години, один з найповільніших відомих швидкостей обертання для об'єктів його розміру у зовнішній сонячній системі. Гонґонґ має один відомий супутник, Сянлю, відкритий у 2016 році, якому потрібно близько 25 днів, щоб обернутися, і він надає важливу інформацію про масу Гонґонґа та динаміку цієї віддаленої системи.",
    Varuna: "Варуна — великий класичний об'єкт поясу Койпера, названий на честь індуїстського бога води та небесного океану, що представляє один з транснептунових об'єктів, які допомогли астрономам зрозуміти різноманітність зовнішньої сонячної системи. Об'єкт має витягнуту, еліпсоїдальну форму замість сферичної, спричинену його швидким періодом обертання приблизно 6,34 години, одним з найшвидших відомих швидкостей обертання для об'єктів у цій області. Спостереження вказують на те, що Варуна має темну, червонувату поверхню, типову для багатьох об'єктів поясу Койпера, ймовірно, покриту складними органічними сполуками, званими толінами, утвореними впливом випромінювання на льоди.",
    Ixion: "Іксіон — великий плутино, що має той самий резонанс орбіти 2:3 з Нептуном, як Плутон, розташований у поясі Койпера, де знаходиться багато таких резонансних об'єктів. Об'єкт має дуже червоний колір поверхні, один з найчервоніших відомих у зовнішній сонячній системі, що вказує на те, що він міг зазнати значну теплову еволюцію або містить конкретні органічні сполуки, що створюють це забарвлення. Відкриття Іксіона у 2001 році сприяло зростаючому розумінню популяції та структури поясу Койпера, хоча багато залишається невідомим про його фізичні властивості та склад.",
    Salacia: "Салація — великий транснептуновий об'єкт, розташований у класичному поясі Койпера, що представляє один з значних світів у цій віддаленій області за орбітою Нептуна. Об'єкт має відносно низьку щільність, що вказує на те, що він може складатися переважно з водяного льоду, змішаного з каменем, типово для багатьох об'єктів у зовнішній сонячній системі. Салація має один відомий супутник, Актею, відкритий у 2006 році, який обертається на відстані, що надає цінну інформацію про масу системи та допомагає астрономам зрозуміти, як такі бінарні системи формуються в поясі Койпера.",
    "2007 OR10": "2007 OR10, неофіційно прозваний 'Білосніжкою' перед отриманням офіційної назви, є одним з найбільших відомих кандидатів у карликові планети в сонячній системі, відкритий у 2007 році під час огляду зовнішньої сонячної системи. Об'єкт має дуже червоний колір поверхні, один з найчервоніших серед відомих транснептунових об'єктів, що вказує на те, що він містить значні кількості органічних сполук, званих толінами, або зазнав значну обробку поверхні. Він має один малий супутник, відкритий у 2016 році, якому потрібно приблизно 19 днів, щоб обернутися, і який допоміг вченим визначити масу 2007 OR10 та підтвердити його як один з найбільших об'єктів у області розсіяного диска."
  },
  cs: {
    Sun: "Hvězda ve středu naší Sluneční soustavy. Hvězda hlavní posloupnosti typu G (G2V), která se zformovala přibližně před 4,6 miliardami let. Obsahuje 99,86% hmotnosti Sluneční soustavy. Teplota povrchu: 5,778 K. Teplota jádra: ~15 milionů K. Obíhá kolem galaktického centra za ~225-250 milionů let. Energie Slunce, produkovaná jadernou fúzí v jeho jádru, udržuje veškerý život na Zemi a pohání klimatické a meteorologické systémy všech planet ve sluneční soustavě.",
    Mercury: "Merkur je planeta nejblíže ke Slunci a nejmenší planeta v naší sluneční soustavě, která dokončí oběh za pouhých 88 pozemských dní. Navzdory blízkosti ke Slunci zažívá extrémní teplotní výkyvy od -173°C v noci do 427°C během dne kvůli absenci atmosféry. Planeta má silně kráterovaný povrch podobný Měsíci Země a má velké železné jádro, které tvoří asi 75% jeho poloměru.",
    Venus: "Venuše je nejteplejší planeta v naší sluneční soustavě s povrchovými teplotami dosahujícími 462°C, dostatečně horká na roztavení olova. Její hustá, toxická atmosféra se skládá převážně z oxidu uhličitého s mraky kyseliny sírové, což vytváří nekontrolovatelný skleníkový efekt. Navzdory podobné velikosti se Zemí se Venuše otáčí pozpátku a má den delší než rok, což z ní činí jedno z nejnepřátelštějších míst ve sluneční soustavě.",
    Earth: "Země je jediná známá planeta ve vesmíru, která hostí život, s podmínkami dokonale vyváženými pro prosperitu složitých ekosystémů. Přibližně 71% jejího povrchu je pokryto oceány a má ochrannou atmosféru bohatou na dusík a kyslík, která chrání život před škodlivým slunečním zářením. Naše planeta má jeden přirozený satelit, Měsíc, který ovlivňuje příliv a odliv a byl klíčový pro vývoj života na Zemi.",
    Mars: "Mars, známý jako Rudá planeta kvůli oxidu železa (rez), který pokrývá jeho povrch, je domovem největší sopky ve sluneční soustavě, Olympus Mons, která dosahuje výšky 21 kilometrů. Planeta má Valles Marineris, masivní systém kaňonů, který by se táhl přes celé Spojené státy, a důkazy o starověkých říčních údolích naznačující, že na jeho povrchu kdysi tekla voda. Vědci stále hledají známky minulého nebo současného života na Marsu, což z něj činí hlavní cíl pro budoucí lidský průzkum.",
    Vesta: "Vesta je druhý největší asteroid v hlavním pásu asteroidů a jeden z největších objektů ve sluneční soustavě, který nebyl klasifikován jako trpasličí planeta. Má diferencovaný vnitřek s kovovým jádrem, pláštěm a bazaltickou kůrou, podobně jako terestrické planety, což naznačuje, že mohla být na cestě stát se planetou. Kosmická sonda Dawn navštívila Vestu v letech 2011-2012, odhalila její složitou geologii a poskytla cenné poznatky o rané sluneční soustavě.",
    Pallas: "Pallas je třetí největší asteroid v hlavním pásu asteroidů, objevený v roce 1802 Heinrichem Wilhelmem Olbersem, což z něj činí jeden z prvních objevených asteroidů. Na rozdíl od většiny asteroidů má Pallas vysoce nakloněnou dráhu, která ji vede daleko nad a pod rovinu sluneční soustavy, což naznačuje, že může být pozůstatkem protoplanety z raného formování naší sluneční soustavy. Vědci se domnívají, že Pallas může obsahovat vodní led a mít složení podobné uhlíkatým chondritickým meteoritům.",
    Jupiter: "Jupiter je největší planeta v naší sluneční soustavě, tak masivní, že by mohl obsahovat všechny ostatní planety dohromady, a působí jako kosmický vysavač, chránící vnitřní planety před asteroidy a kometami. Jeho Velká rudá skvrna je trvalá bouře větší než Země, která zuří nejméně 400 let, s větry přesahujícími 400 kilometrů za hodinu. Plynný obr má 95 známých měsíců, včetně čtyř velkých galileovských měsíců - Io, Europa, Ganymede a Callisto - každý s jedinečnými vlastnostmi a potenciálem pro hostování života.",
    Saturn: "Saturn je známý svým spektakulárním systémem prstenců, složeným z miliard částic ledu a kamene od mikroskopických zrn až po kusy velikosti domu, což vytváří jeden z nejkrásnějších pohledů ve sluneční soustavě. Navzdory tomu, že je plynný obr, je Saturn méně hustý než voda a teoreticky by mohl plavat, pokud by byl umístěn do obří vany. Planeta má 146 potvrzených měsíců, včetně Titanu, který je větší než Merkur a má hustou atmosféru s tekutými metanovými jezery, což z něj činí cíl pro budoucí průzkum.",
    Uranus: "Uran je ledový obr jedinečně nakloněný na bok v úhlu 98 stupňů, pravděpodobně kvůli masivní kolizi na počátku jeho historie, což způsobuje extrémní sezónní výkyvy, kdy každý pól zažívá 42 let nepřetržitého slunečního světla následovaných 42 lety temnoty. Na rozdíl od jiných plynných obrů Uran vyzařuje velmi málo vnitřního tepla, což z něj činí nejchladnější planetu ve sluneční soustavě s atmosférickými teplotami klesajícími na -224°C. Planeta má 28 známých měsíců a systém 13 slabých prstenců objevených v roce 1977, všechny obíhající v rovníkové rovině planety.",
    Neptune: "Neptune je největrnější planeta v naší sluneční soustavě, s rychlostmi dosahujícími až 2 100 kilometrů za hodinu, téměř nadzvukové větry poháněné rychlou rotací planety a vnitřním teplem. Jeho hluboká modrá barva pochází z metanu v atmosféře, který absorbuje červené světlo a odráží modré vlnové délky, ačkoli přesný mechanismus vytváření tak živých barev zůstává záhadou. Velká tmavá skvrna planety, systém bouří podobný Velké rudé skvrně Jupitera, byla pozorována Voyagerem 2 v roce 1989, ale zmizela, když ji Hubbleův vesmírný dalekohled hledal v roce 1994.",
    Ceres: "Ceres je největší objekt v pásu asteroidů a jediná trpasličí planeta umístěná ve vnitřní sluneční soustavě, překlasifikovaná z asteroidu na trpasličí planetu v roce 2006 spolu s Plutem. Nedávná pozorování naznačují, že Ceres může mít podpovrchový oceán tekuté vody pod svou ledovou kůrou, což z ní činí potenciální cíl v hledání života mimo Zemi. Kosmická sonda Dawn NASA strávila více než tři roky studiem Ceres, objevila jasné skvrny solných usazenin a organických materiálů, což naznačuje, že mohla být v minulosti geologicky aktivní.",
    Pluto: "Pluto, kdysi považované za devátou planetu, bylo překlasifikováno jako trpasličí planeta v roce 2006, což vyvolalo debatu mezi astronomy a veřejností o tom, co definuje planetu. Vzdálený svět má oblast ve tvaru srdce zvanou Tombaugh Regio, rozsáhlou planinu z dusíkového ledu a hory z vodního ledu dosahující výšek několika kilometrů. Pluto tvoří binární systém se svým největším měsícem Charonem, kde oba objekty obíhají kolem společného těžiště umístěného mimo povrch Pluta, což z nich činí spíše dvojplanetu než typickou planetu-měsíc.",
    Eris: "Eris je nejmasivnější známá trpasličí planeta a byl to objev, který nakonec vedl k překlasifikaci Pluta, protože astronomové si uvědomili, že ve vnější sluneční soustavě existuje mnoho podobně velkých objektů. Nacházející se v oblasti rozptýleného disku má Eris vysoce excentrickou dráhu, která ji vede od 38 do 97 astronomických jednotek od Slunce, a trvá jí 558 let dokončit jeden oběh. Trpasličí planeta má velmi reflexní povrch pokrytý metanovým ledem, což z ní činí jeden z nejjasnějších objektů ve vnější sluneční soustavě, a má jeden známý měsíc pojmenovaný Dysnomia.",
    Makemake: "Makemake je třetí největší známá trpasličí planeta ve sluneční soustavě, pojmenovaná po bohu stvořiteli lidu Rapa Nui z Velikonočního ostrova, což odráží kulturní význam jejího objevu. Její načervenalá barva povrchu je pravděpodobně způsobena tholiny, složitými organickými molekulami vytvořenými, když je metan vystaven slunečnímu záření, což jí dává jedinečný vzhled mezi objekty Kuiperova pásu. Na rozdíl od jiných trpasličích planet se zdá, že Makemake nemá atmosféru a má jeden malý, tmavý měsíc objevený v roce 2016, označený S/2015 (136472) 1, ačkoli se běžně nazývá MK 2.",
    Haumea: "Haumea je protáhlá trpasličí planeta, která se otáčí rychleji než jakýkoli jiný známý velký objekt ve sluneční soustavě, dokončuje rotaci za pouhé 4 hodiny, což ji natáhlo do elipsoidního tvaru připomínajícího zploštělý míč. Tato rychlá rotace je považována za výsledek masivní kolize v dávné minulosti, která také vytvořila dva známé měsíce Haumey, Hi'iaka a Namaka, a její systém prstenců objevený v roce 2017. Povrch trpasličí planety je pokryt krystalickým vodním ledem, neobvykle jasným a reflexním, což naznačuje, že mohl být nedávno přetvořen geologickými procesy.",
    Sedna: "Sedna je jeden z nejvzdálenějších známých objektů ve sluneční soustavě, nacházející se v rozšířené oblasti rozptýleného disku, s extrémně protáhlou dráhou, která ji vede od 76 do 936 astronomických jednotek od Slunce. Trvá jí přibližně 11 400 pozemských let dokončit jeden oběh, což znamená, že dokončila méně než jeden oběh od poslední doby ledové na Zemi. Objev objektu v roce 2003 zpochybnil naše chápání hranic sluneční soustavy a vyvolal otázky o existenci hypotetické Planety X nebo jiných vzdálených masivních objektů, které mohly ovlivnit její neobvyklou dráhu.",
    Quaoar: "Quaoar je klasický objekt Kuiperova pásu pojmenovaný po bohu stvořiteli lidu Tongva původem z oblasti Los Angeles, představující jeden z větších světů v této vzdálené oblasti sluneční soustavy. V roce 2023 astronomové objevili, že Quaoar má systém prstenců, což je neobvyklé, protože prstence se obvykle tvoří uvnitř toho, co se nazývá Rocheova mez, kde by slapové síly zabránily vzniku měsíce, ale prstence Quaoaru jsou daleko za touto mezí. Objekt má jeden známý měsíc, Weywot, objevený v roce 2007, který obíhá Quaoar a poskytuje vodítka o hmotnosti objektu a historii jeho formování.",
    Orcus: "Orcus je velký plutino, což znamená, že sdílí orbitální rezonanci 2:3 s Neptunem, dokončuje dva oběhy kolem Slunce za každé tři oběhy Neptuna, podobně jako vztah Pluta s Neptunem. Někdy se nazývá 'anti-Pluto', protože když je Pluto v perihelu (nejblíže ke Slunci), Orcus je v afelu (nejdále), a naopak, což vytváří zajímavou orbitální symetrii. Kandidát na trpasličí planetu má jeden velký měsíc pojmenovaný Vanth, objevený v roce 2005, který je neobvykle velký vzhledem k Orcu, tvořící asi 3% celkové hmotnosti systému, což naznačuje, že mohl vzniknout z velké kolize.",
    Gonggong: "Gonggong je načervenalý objekt rozptýleného disku pojmenovaný po čínském bohu vody s červenými vlasy a hadím ocasem, což odráží jak jeho načervenalý vzhled, tak vzdálenou, chaotickou dráhu. Objekt má neobvykle pomalou periodu rotace přibližně 22,4 hodiny, jednu z nejpomalejších známých rychlostí rotace pro objekty jeho velikosti ve vnější sluneční soustavě. Gonggong má jeden známý měsíc, Xiangliu, objevený v roce 2016, kterému trvá asi 25 dní oběh a poskytuje důležité informace o hmotnosti Gonggongu a dynamice tohoto vzdáleného systému.",
    Varuna: "Varuna je velký klasický objekt Kuiperova pásu pojmenovaný po hinduistickém bohu vody a nebeského oceánu, představující jeden z transneptunických objektů, které pomohly astronomům pochopit rozmanitost vnější sluneční soustavy. Objekt má protáhlý, elipsoidní tvar spíše než kulový, způsobený jeho rychlou periodou rotace přibližně 6,34 hodiny, jednou z nejrychlejších známých rychlostí rotace pro objekty v této oblasti. Pozorování naznačují, že Varuna má tmavý, načervenalý povrch typický pro mnoho objektů Kuiperova pásu, pravděpodobně pokrytý složitými organickými sloučeninami zvanými tholiny vytvořenými interakcí záření s ledy.",
    Ixion: "Ixion je velký plutino, sdílející stejnou orbitální rezonanci 2:3 s Neptunem jako Pluto, umístěný v Kuiperově pásu, kde se nachází mnoho takových rezonančních objektů. Objekt má velmi červenou barvu povrchu, jednu z nejčervenějších známých ve vnější sluneční soustavě, což naznačuje, že mohl zažít významnou tepelnou evoluci nebo obsahuje specifické organické sloučeniny, které produkují toto zbarvení. Objev Ixionu v roce 2001 přispěl k rostoucímu pochopení populace a struktury Kuiperova pásu, ačkoli mnoho zůstává neznámého o jeho fyzických vlastnostech a složení.",
    Salacia: "Salacia je velký transneptunický objekt nacházející se v klasickém Kuiperově pásu, představující jeden z významných světů v této vzdálené oblasti za oběžnou dráhou Neptuna. Objekt má relativně nízkou hustotu, což naznačuje, že může být složen převážně z vodního ledu smíchaného s horninou, typicky pro mnoho objektů ve vnější sluneční soustavě. Salacia má jeden známý měsíc, Actaea, objevený v roce 2006, který obíhá ve vzdálenosti, která poskytuje cenné informace o hmotnosti systému a pomáhá astronomům pochopit, jak se takové binární systémy formují v Kuiperově pásu.",
    "2007 OR10": "2007 OR10, neoficiálně přezdívaný 'Sněhurka' před získáním oficiálního názvu, je jedním z největších známých kandidátů na trpasličí planetu ve sluneční soustavě, objevený v roce 2007 během průzkumu vnější sluneční soustavy. Objekt má velmi červenou barvu povrchu, jednu z nejčervenějších známých transneptunických objektů, což naznačuje, že obsahuje významné množství organických sloučenin zvaných tholiny nebo zažil rozsáhlé povrchové zpracování. Má jeden malý měsíc objevený v roce 2016, kterému trvá přibližně 19 dní oběh a pomohl vědcům určit hmotnost 2007 OR10 a potvrdit ji jako jeden z největších objektů v oblasti rozptýleného disku."
  }
};
const moonDescriptions = {
  en: {
    "Earth-Moon": "The Moon is Earth's only natural satellite and the fifth largest moon in the solar system, forming approximately 4.5 billion years ago from debris created when a Mars-sized object collided with the early Earth. It influences Earth's tides through gravitational forces, creating the daily rise and fall of ocean waters that have shaped coastal ecosystems and navigation throughout human history. The Moon's surface is covered in ancient lava flows and impact craters, with no atmosphere or liquid water, making it a record of early solar system history preserved in pristine condition.",
    "Mars-Phobos": "Phobos is the larger and innermost of Mars's two moons, discovered by Asaph Hall in 1877, with an irregular potato-like shape that suggests it may be a captured asteroid. It orbits Mars at such a close distance—only 6,000 kilometers from the surface—that it completes three full orbits in a single Martian day, appearing to rise in the west and set in the east from the Martian surface. Phobos is gradually spiraling inward toward Mars due to tidal forces and is predicted to either crash into the planet or break apart into a ring system within the next 50 million years.",
    "Mars-Deimos": "Deimos is the smaller and outermost moon of Mars, also discovered in 1877 by Asaph Hall, taking approximately 30 hours to complete one orbit around the Red Planet. Despite being only 12.4 kilometers in diameter, its smooth surface is covered in a layer of loose regolith that has filled in most of its craters, giving it a much less rugged appearance than its sibling moon Phobos. The moon's low density and irregular shape suggest it, like Phobos, may have been a captured asteroid from the outer asteroid belt or even the Kuiper Belt region.",
    "Jupiter-Io": "Io is the innermost of Jupiter's four Galilean moons and the most volcanically active body in the entire solar system, with over 400 active volcanoes spewing sulfur and silicate material hundreds of kilometers into space. Its intense volcanic activity is driven by tidal heating caused by Jupiter's enormous gravitational pull and the orbital resonance with Europa and Ganymede, which flexes Io's interior and generates immense heat. The moon's surface is constantly being resurfaced by lava flows, making it one of the youngest surfaces in the solar system, covered in sulfur compounds that give it a vibrant yellow, orange, and red coloration.",
    "Jupiter-Europa": "Europa is one of Jupiter's four largest moons, covered by a layer of water ice estimated to be 15-25 kilometers thick, beneath which scientists believe lies a global ocean of liquid water potentially twice the volume of Earth's oceans. The moon's subsurface ocean is kept liquid by tidal heating from Jupiter's gravitational forces, and observations suggest it may contain more water than all of Earth's oceans combined. Europa is considered one of the most promising places in the solar system to search for extraterrestrial life, as its ocean may have the necessary conditions and chemistry to support microbial organisms, making it a high-priority target for future space missions.",
    "Jupiter-Ganymede": "Ganymede is the largest moon in the solar system, even larger than the planet Mercury, and is the only moon known to have its own magnetic field, suggesting it has a liquid iron core similar to Earth's. Its surface shows evidence of both ancient, heavily cratered dark regions and younger, grooved terrain formed by tectonic activity, indicating a complex geological history spanning billions of years. Recent observations suggest Ganymede may have a subsurface ocean sandwiched between layers of ice, possibly containing more water than all of Earth's oceans, making it another potential habitat for life in the outer solar system.",
    "Jupiter-Callisto": "Callisto is the outermost of Jupiter's four Galilean moons and the most heavily cratered object in the solar system, with its ancient surface preserving a record of impacts dating back nearly 4 billion years. Unlike the other Galilean moons, Callisto shows no evidence of geological activity or internal heating, making it essentially a frozen, geologically dead world that has remained largely unchanged since the early solar system. Scientists believe Callisto may also harbor a subsurface ocean beneath its icy crust, kept liquid by the decay of radioactive elements, though its surface shows no signs of the tectonic activity seen on Europa or Ganymede.",
    "Jupiter-Amalthea": "Amalthea is the fifth largest moon of Jupiter and one of the innermost moons, discovered by Edward Emerson Barnard in 1892, making it the last planetary satellite to be discovered by direct visual observation. It has an irregular potato-shaped form, covered in a dark red material that may consist of sulfur compounds expelled from Io's volcanoes, giving it one of the reddest surfaces in the solar system. The moon's low density suggests it is composed of porous, loosely packed material, possibly ice or rubble, and it emits more heat than it receives from the Sun, indicating internal heating from Jupiter's tidal forces.",
    "Jupiter-Himalia": "Himalia is the largest irregular moon of Jupiter, discovered by Charles Dillon Perrine in 1904, and is the largest member of the Himalia group of moons that share similar orbital characteristics. It has an irregular, elongated shape typical of captured asteroids, with a dark surface that reflects only about 3% of incoming sunlight, suggesting a composition rich in carbonaceous material. The moon orbits Jupiter at an average distance of about 11.5 million kilometers, taking approximately 250 days to complete one orbit, and is part of a cluster of small moons that may be fragments from a larger body that broke apart.",
    "Jupiter-Lysithea": "Lysithea is a small irregular moon of Jupiter, discovered by Seth Barnes Nicholson in 1938, belonging to the Himalia group of prograde moons that orbit in the same direction as Jupiter's rotation. With a diameter of only about 36 kilometers, it has an irregular shape and a dark surface typical of captured asteroids, reflecting very little light from the Sun. The moon shares similar orbital characteristics with other members of the Himalia group, suggesting they may all be fragments from the same parent body that was captured by Jupiter's gravity early in the solar system's history.",
    "Jupiter-Elara": "Elara is an irregular moon of Jupiter, discovered by Charles Dillon Perrine in 1905, and is the second largest member of the Himalia group after Himalia itself. It has a dark, reddish surface with low reflectivity, suggesting a composition rich in carbonaceous material similar to C-type asteroids found in the outer asteroid belt. The moon orbits Jupiter at an average distance of about 11.7 million kilometers, completing one orbit in approximately 259 days, and like other members of its group, is believed to be a captured asteroid rather than forming in orbit around Jupiter.",
    "Saturn-Mimas": "Mimas is one of Saturn's inner moons, famous for its Death Star-like appearance created by the massive Herschel crater, which spans one-third of the moon's diameter and has a central peak nearly as tall as Mount Everest. The impact that created this crater nearly shattered Mimas, as evidence of fractures on the opposite side of the moon suggests the shock waves nearly broke it apart. Despite being relatively small at only 396 kilometers in diameter, Mimas has a significant influence on Saturn's rings, helping to create and maintain the gap between the A and B rings through gravitational resonance.",
    "Saturn-Enceladus": "Enceladus is one of Saturn's most intriguing moons, featuring active ice geysers that erupt from its south pole, spewing water vapor and ice particles into space and creating Saturn's E-ring. Beneath its icy surface lies a global subsurface ocean of liquid water, kept warm by tidal heating from Saturn's gravity and the orbital resonance with Dione, making it one of the most promising places to search for life beyond Earth. The moon's surface is geologically young, showing evidence of recent resurfacing and complex terrain including tiger-stripe fractures, smooth plains, and extensive cryovolcanic activity that continually renews its surface.",
    "Saturn-Tethys": "Tethys is a medium-sized icy moon of Saturn, heavily cratered with one of the most prominent features being the giant Odysseus crater, which spans two-fifths of the moon's diameter and has been nearly flattened by the moon's icy surface over time. The moon has a density close to that of water ice, suggesting it is composed almost entirely of ice with only a small amount of rock, and its surface shows evidence of extensive ancient impacts. Tethys shares its orbit with two smaller Trojan moons, Telesto and Calypso, which orbit at stable Lagrange points 60 degrees ahead and behind Tethys in its path around Saturn.",
    "Saturn-Dione": "Dione is Saturn's fourth largest moon, featuring bright ice cliffs up to several hundred meters tall on its trailing hemisphere and mysterious wispy terrain that was revealed by the Cassini spacecraft to be complex systems of ice cliffs and valleys. The moon has a higher density than its sibling moons Tethys and Rhea, suggesting it contains a greater proportion of rocky material in its interior, possibly indicating a differentiated structure with a rocky core. Dione shares an orbital resonance with Enceladus, with Dione completing one orbit for every two orbits of Enceladus, and this resonance helps maintain Enceladus's eccentric orbit, contributing to its geological activity.",
    "Saturn-Rhea": "Rhea is Saturn's second largest moon and the largest moon without a substantial atmosphere, though recent observations suggest it may have a very thin oxygen and carbon dioxide atmosphere created by the interaction of surface water ice with Saturn's magnetosphere. The moon has a heavily cratered ancient surface, with bright wispy streaks on its trailing hemisphere that were discovered to be extensive systems of ice cliffs formed by tectonic activity early in the moon's history. Rhea's low density suggests it is composed of about 75% water ice and 25% rocky material, and it may have a small rocky core, making it one of the least dense large moons in the solar system.",
    "Saturn-Titan": "Titan is Saturn's largest moon and the second largest moon in the solar system, larger than the planet Mercury, and is the only moon known to have a dense atmosphere rich in nitrogen with clouds and precipitation of liquid methane and ethane. Its surface features extensive lakes and seas of liquid hydrocarbons, primarily methane and ethane, particularly concentrated near the poles, making it the only world besides Earth known to have stable bodies of liquid on its surface. The moon's thick orange haze obscures its surface from visible light, but radar and infrared observations have revealed diverse terrain including mountains, dunes, river channels, and possibly cryovolcanoes, suggesting complex geological processes similar to Earth but operating at much colder temperatures.",
    "Saturn-Hyperion": "Hyperion is one of Saturn's most unusual moons, having a chaotic, sponge-like appearance with a highly irregular shape and an extremely porous, low-density structure that suggests it may be mostly empty space filled with ice. It has a chaotic rotation, tumbling unpredictably rather than spinning on a fixed axis, making it one of only a few known objects in the solar system to exhibit such behavior, likely due to its irregular shape and the gravitational influences of Saturn and Titan. The moon's surface is covered in deep, dark craters that give it a spongy appearance, with the dark material likely rich in organic compounds, and its low density suggests it has survived numerous impacts by absorbing them rather than shattering.",
    "Saturn-Iapetus": "Iapetus is one of Saturn's most distinctive moons, famous for its extreme two-tone coloration with a dark leading hemisphere that reflects only about 4% of sunlight and a bright trailing hemisphere that reflects over 60% of sunlight, creating a dramatic visual contrast. The dark material, primarily composed of carbonaceous compounds and possibly organic tholins, is concentrated on the leading hemisphere, suggesting it may have been swept up from Phoebe's dust ring or deposited by material from other outer moons. The moon also features a massive equatorial ridge system, reaching heights of up to 20 kilometers, that wraps around much of its equator and gives it a walnut-like appearance, though the origin of this unique feature remains a subject of scientific debate.",
    "Saturn-Phoebe": "Phoebe is one of Saturn's outer moons, orbiting in a retrograde direction opposite to Saturn's rotation, which strongly suggests it is a captured object, likely an asteroid or Kuiper Belt object that was gravitationally captured by Saturn. It has a dark, heavily cratered surface with a low albedo, reflecting only about 6% of incoming sunlight, and observations suggest it is rich in water ice and carbonaceous material typical of objects from the outer solar system. The moon is the source of a vast dust ring around Saturn, as its dark surface material is constantly being knocked off by micrometeorite impacts, creating a ring that extends far into Saturn's system and may contribute material to other moons like Iapetus.",
    "Uranus-Ariel": "Ariel is the brightest and geologically youngest of Uranus's five major moons, with a relatively smooth surface marked by extensive networks of fault valleys and canyons that suggest past geological activity. The moon's surface shows evidence of resurfacing, with relatively few impact craters compared to its sibling moons, indicating that cryovolcanic activity or other geological processes have erased ancient terrain. Ariel's canyons, some reaching depths of 10 kilometers, may have formed from internal expansion or tectonic forces, and the moon likely contains a mixture of water ice and rock, possibly with a rocky core.",
    "Uranus-Umbriel": "Umbriel is the darkest of Uranus's five major moons, with a uniformly dark surface that reflects only about 16% of incoming sunlight, suggesting it is covered in dark material, possibly carbon-rich compounds or organic tholins. The moon has an ancient, heavily cratered surface with very few signs of geological activity, making it one of the most primitive-looking bodies in the solar system, essentially unchanged since the early bombardment period. Umbriel's most prominent feature is Wunda, a large bright ring near its equator, likely a bright material exposed by an impact, contrasting sharply with the otherwise dark surface.",
    "Uranus-Titania": "Titania is the largest of Uranus's moons, with a diameter of about 1,578 kilometers, and features a complex geological history with evidence of both ancient cratering and more recent tectonic activity. The moon's surface is marked by extensive systems of canyons and fault valleys, some reaching depths of several kilometers, suggesting that the moon expanded early in its history, possibly due to the freezing of a subsurface ocean. Titania likely has a rocky core surrounded by a mantle of water ice, and its surface shows a mix of heavily cratered ancient terrain and smoother regions that may have been resurfaced by cryovolcanic activity.",
    "Uranus-Oberon": "Oberon is the outermost and second-largest of Uranus's major moons, with a heavily cratered ancient surface that shows little evidence of geological activity, making it one of the most primitive moons in the solar system. Its surface is marked by numerous large impact craters, including a large mountain at the center of one crater that may be the central peak formed during impact, and dark material concentrated in crater floors suggests cryovolcanic activity may have occurred in the distant past. The moon likely consists of a mixture of water ice and rock, with a possible rocky core, and its dark surface material may contain carbonaceous compounds or organic materials.",
    "Uranus-Miranda": "Miranda is the smallest and innermost of Uranus's five major moons, but it is also the most geologically complex and unusual, featuring extreme variations in terrain including regions of heavily cratered ancient surface, smooth plains, and massive fault canyons up to 20 kilometers deep. The moon's chaotic surface features, including three large 'coronae' or oval-shaped regions with distinct geological patterns, suggest a violent past possibly involving multiple impacts or internal heating and resurfacing events. Scientists believe Miranda may have been shattered by a massive impact and then reassembled, or that intense tidal heating early in its history caused extreme geological activity that created its patchwork appearance.",
    "Uranus-Puck": "Puck is the largest of Uranus's inner moons, discovered by the Voyager 2 spacecraft in 1985, and has a roughly spherical shape with a diameter of about 162 kilometers, making it one of the larger small moons in the solar system. Its surface is dark and heavily cratered, with a low albedo suggesting it is composed of water ice mixed with dark, carbonaceous material, typical of objects from the outer solar system. The moon orbits close to Uranus, within the planet's ring system, and its orbit is nearly circular and lies in Uranus's equatorial plane, consistent with the other inner moons.",
    "Neptune-Triton": "Triton is Neptune's largest moon and the seventh largest moon in the solar system, unique for orbiting in a retrograde direction opposite to Neptune's rotation, strongly suggesting it was a captured Kuiper Belt object rather than forming in orbit around Neptune. The moon has an extremely cold surface with temperatures around -235°C, yet it shows evidence of active cryovolcanism with nitrogen geysers erupting from its south pole, driven by seasonal heating from the Sun. Triton's surface is geologically young and complex, featuring smooth plains of frozen nitrogen, cantaloupe-like terrain with dimples and ridges, and a thin nitrogen atmosphere, making it one of the most active icy moons in the outer solar system.",
    "Neptune-Nereid": "Nereid is Neptune's third-largest moon, discovered by Gerard Kuiper in 1949, and has the most eccentric orbit of any moon in the solar system, ranging from 1.4 to 9.7 million kilometers from Neptune, taking 360 days to complete one highly elliptical orbit. Its extreme orbital characteristics suggest it may have been disrupted from a regular orbit by the capture of Triton, or it could be a captured asteroid or Kuiper Belt object that was gravitationally disturbed. The moon's surface is dark and likely composed of water ice mixed with dark material, and very little is known about its physical characteristics due to its distance and the limited observations from Voyager 2.",
    "Neptune-Proteus": "Proteus is Neptune's second-largest moon and the largest irregularly shaped moon in the solar system, discovered by Voyager 2 in 1989, with a diameter of about 420 kilometers but a non-spherical shape suggesting it has not achieved hydrostatic equilibrium. Despite its size, it was not discovered earlier because it is very dark, reflecting only about 6% of incoming sunlight, and orbits very close to Neptune, making it difficult to observe from Earth. The moon's surface is heavily cratered with no signs of geological activity, and it is likely composed of water ice mixed with dark, carbonaceous material, typical of objects from the outer solar system.",
    "Neptune-Larissa": "Larissa is one of Neptune's inner moons, discovered by Harold J. Reitsema, William B. Hubbard, Larry A. Lebofsky, and David J. Tholen in 1981 through observations of stellar occultations, and later confirmed by Voyager 2 in 1989. It has an irregular, non-spherical shape with an average diameter of about 194 kilometers, and its surface is dark and heavily cratered, suggesting it is composed of water ice mixed with dark material. The moon orbits very close to Neptune, within the planet's ring system, and like the other inner moons, its orbit is nearly circular and lies in Neptune's equatorial plane.",
    "Pluto-Charon": "Charon is Pluto's largest moon and the largest moon relative to its parent body in the solar system, with a diameter about half that of Pluto, making the Pluto-Charon system essentially a binary planet where both objects orbit around a common center of mass located outside Pluto's surface. The moon is tidally locked to Pluto, meaning both bodies always show the same face to each other, and Charon's surface shows evidence of water ice and possibly ammonia hydrates, with a reddish north polar region likely composed of tholins. The discovery of Charon in 1978 allowed scientists to accurately determine Pluto's mass and size, and the moon may have formed from a giant impact early in the solar system's history, similar to how Earth's Moon formed.",
    "Eris-Dysnomia": "Dysnomia is the only known moon of the dwarf planet Eris, discovered in 2005 by Mike Brown and the Laser Guide Star Adaptive Optics team using the Keck telescopes, and is named after the daughter of Eris in Greek mythology. The moon is much smaller than Eris, with an estimated diameter of about 700 kilometers, and orbits Eris at a distance of about 37,000 kilometers, taking approximately 16 days to complete one orbit. Observations of Dysnomia's orbit have allowed scientists to determine Eris's mass, revealing it to be about 27% more massive than Pluto, which was a key factor in the reclassification of Pluto as a dwarf planet.",
    "Makemake-MK 2": "MK 2, officially designated S/2015 (136472) 1, is the only known moon of the dwarf planet Makemake, discovered in 2016 by the Hubble Space Telescope, and is a small, dark moon with an estimated diameter of about 175 kilometers. The moon orbits Makemake at a distance of at least 21,000 kilometers, and its dark surface, which reflects only about 4% of incoming sunlight, contrasts sharply with Makemake's bright, icy surface. The discovery of MK 2 provides important information about Makemake's mass and formation history, and its dark appearance suggests it may be covered in carbonaceous material similar to many Kuiper Belt objects.",
    "Haumea-Hi'iaka": "Hi'iaka is the larger of Haumea's two known moons, discovered in 2005 by Mike Brown's team, and is named after the Hawaiian goddess of dance and the patron goddess of the Big Island of Hawaii. The moon has a diameter of about 310 kilometers and orbits Haumea at a distance of approximately 49,500 kilometers, completing one orbit in about 49 days, and its surface appears to be covered in water ice. Hi'iaka's orbit and characteristics have been crucial in determining Haumea's mass and confirming the dwarf planet's unusual elongated, ellipsoidal shape and rapid rotation.",
    "Haumea-Namaka": "Namaka is the smaller, inner moon of Haumea, also discovered in 2005, and is named after a Hawaiian water spirit, the daughter of Haumea in Hawaiian mythology. The moon has an estimated diameter of about 170 kilometers and orbits Haumea at a closer distance than Hi'iaka, approximately 25,657 kilometers, completing one orbit in about 18 days. Namaka's orbit is highly inclined and elliptical, and observations of its orbital motion have revealed complex interactions with Hi'iaka, providing insights into Haumea's unusual shape and the dynamics of this distant binary system.",
    "Quaoar-Weywot": "Weywot is the only known moon of the Kuiper Belt object Quaoar, discovered in 2007 by Michael Brown using the Hubble Space Telescope, and is named after the sky god and son of Quaoar in Tongva mythology. The moon has an estimated diameter of about 170 kilometers and orbits Quaoar at a distance of approximately 14,500 kilometers, taking about 12 days to complete one orbit. Observations of Weywot's orbit have allowed scientists to determine Quaoar's mass and revealed the surprising discovery in 2023 that Quaoar has a ring system located outside the Roche limit, challenging our understanding of ring formation.",
    "Earth-OREST": "OREST, the wandering satellite - discovery year 2019 - a traveling satellite in the cold cosmos, known for its attraction to the new and unknown. A small satellite in the vast unknown cosmos with the whole world ahead. Such small satellites always remind us that there is always a path ahead that no one has walked before. For it, space is not silence and darkness, but an infinite world of possibilities that are just waiting to be discovered.",
    "Earth-EMMA": "EMMA, the elegant satellite - discovery year 2020 - at a time when the world stopped, she came to revive it and give colors to everyday grayness. EMMA carves her own path in the darkness - a small but significant road that reminds us: even in the boundless cosmos there is a place for warmth and tenderness. A symbol of quiet rebirth and that humanity is capable of sincerity.",
    "Mars-MAVEN": "MAVEN (Mars Atmosphere and Volatile EvolutioN) is a NASA spacecraft orbiting Mars since 2014, studying the planet's upper atmosphere, ionosphere, and interactions with the Sun and solar wind. The mission aims to understand how Mars lost its atmosphere and water over time, providing crucial insights into the planet's climate history and potential for past habitability. MAVEN's elliptical orbit allows it to sample different altitudes of the Martian atmosphere.",
    "Jupiter-JUNO": "JUNO is a NASA spacecraft that arrived at Jupiter in 2016, entering a highly elliptical polar orbit to study the gas giant's composition, gravity field, magnetic field, and polar magnetosphere. The mission has revealed stunning details about Jupiter's atmosphere, including its Great Red Spot, and has provided insights into the planet's formation and evolution. JUNO's unique orbit allows it to avoid Jupiter's intense radiation belts while conducting close-up observations.",
    "Saturn-Cassini–Huygens": "Cassini–Huygens was a joint NASA/ESA/ASI mission that spent 13 years studying Saturn, its rings, and moons. Launched in 1997, Cassini entered orbit around Saturn in 2004 and conducted groundbreaking observations until its mission ended in 2017 with a deliberate plunge into Saturn's atmosphere. The Huygens probe successfully landed on Titan in 2005, becoming the first spacecraft to land on a moon in the outer solar system. Cassini's highly elliptical orbit allowed it to study Saturn's magnetosphere, rings, and numerous moons, including discovering geysers on Enceladus and lakes on Titan, revolutionizing our understanding of the Saturnian system.",
    "Orcus-Vanth": "Vanth is the only known moon of the dwarf planet candidate Orcus, discovered in 2005 by Mike Brown and his team using the Hubble Space Telescope, and is unusually large relative to Orcus, comprising about 3% of the system's total mass. The moon has an estimated diameter of about 443 kilometers, making it one of the largest known trans-Neptunian object satellites, and orbits Orcus at a distance of approximately 9,000 kilometers, taking about 9.5 days to complete one orbit. Vanth's large size relative to Orcus suggests it may have formed from a major collision, similar to how Earth's Moon formed, and its orbit is nearly circular and aligned with Orcus's equator.",
    "Gonggong-Xiangliu": "Xiangliu is the only known moon of the scattered disc object Gonggong, discovered in 2016 by a team using the Hubble Space Telescope, and is named after the nine-headed snake monster from Chinese mythology that served the water god Gonggong. The moon has an estimated diameter of about 300 kilometers and orbits Gonggong at a distance of approximately 24,000 kilometers, taking about 25 days to complete one orbit in a nearly circular path. Observations of Xiangliu's orbit have been crucial in determining Gonggong's mass, and the moon's discovery has provided important insights into the formation and evolution of distant objects in the outer solar system.",
    "Salacia-Actaea": "Actaea is the only known moon of the trans-Neptunian object Salacia, discovered in 2006 by Keith Noll, Harold Levison, Denise Stephens, and Will Grundy using the Hubble Space Telescope, and is named after a Nereid (sea nymph) from Greek mythology. The moon has an estimated diameter of about 303 kilometers and orbits Salacia at a distance of approximately 5,619 kilometers, completing one orbit in about 5.5 days. Actaea's discovery and orbital observations have allowed scientists to determine Salacia's mass and density, revealing it to be a relatively low-density object composed primarily of water ice, typical of many large Kuiper Belt objects.",
    "2007 OR10-S/2016 (225088) 1": "S/2016 (225088) 1 is the only known moon of the dwarf planet candidate 2007 OR10, discovered in 2016 by a team led by Csaba Kiss using the Hubble Space Telescope, and is a small moon with an estimated diameter of about 237 kilometers. The moon orbits 2007 OR10 at a distance of at least 15,000 kilometers, and its discovery helped scientists determine the object's mass, confirming 2007 OR10 as one of the largest objects in the scattered disc region. The moon's properties and orbital characteristics provide important clues about the formation and evolution of this distant, reddish-colored dwarf planet candidate, which was unofficially nicknamed 'Snow White' before receiving its provisional designation."
  },
  uk: {
    "Earth-Moon": "Місяць є єдиним природним супутником Землі та п'ятим за величиною супутником у Сонячній системі, сформованим приблизно 4,5 мільярда років тому з уламків, створених, коли об'єкт розміром з Марс зіткнувся з ранньою Землею. Він впливає на припливи та відпливи Землі через гравітаційні сили, створюючи щоденний підйом та спад океанських вод, які сформували прибережні екосистеми та навігацію протягом всієї історії людства. Поверхня Місяця покрита древніми лавовими потоками та ударними кратерами, без атмосфери або рідкої води, що робить його записом ранньої історії Сонячної системи, збереженим у первозданному стані.",
    "Mars-Phobos": "Фобос є більшим та найближчим з двох супутників Марса, відкритим Асафом Холлом у 1877 році, з неправильною картоплеподібною формою, що вказує на те, що він може бути захопленим астероїдом. Він обертається навколо Марса на такій близькій відстані - лише 6000 кілометрів від поверхні - що він завершує три повні оберти за один марсіанський день, здаючись, що він сходить на заході та заходить на сході з марсіанської поверхні. Фобос поступово спірально наближається до Марса через приливні сили та, за прогнозами, або впаде на планету, або розпадеться на систему кілець протягом наступних 50 мільйонів років.",
    "Mars-Deimos": "Деймос є меншим та найвіддаленішим супутником Марса, також відкритим Асафом Холлом у 1877 році, для завершення одного оберту навколо Червоної планети йому потрібно приблизно 30 годин. Незважаючи на діаметр лише 12,4 кілометри, його гладка поверхня покрита шаром пухкого реголіту, який заповнив більшість його кратерів, надаючи йому набагато менш скелястого вигляду, ніж його супутник Фобос. Низька щільність супутника та неправильна форма вказують на те, що він, як і Фобос, міг бути захопленим астероїдом з зовнішнього поясу астероїдів або навіть з регіону поясу Койпера.",
    "Jupiter-Io": "Іо є найближчим з чотирьох галілеєвих супутників Юпітера та найбільш вулканічно активним тілом у всій Сонячній системі, з понад 400 активними вулканами, що викидають сірку та силікатний матеріал на сотні кілометрів у космос. Його інтенсивна вулканічна активність спричинена приливним нагріванням, викликаним величезною гравітаційною силою Юпітера та орбітальною резонансом з Європою та Ганімедом, що згинає внутрішню частину Іо та генерує величезне тепло. Поверхня супутника постійно перекривається лавовими потоками, що робить її однією з наймолодших поверхонь у Сонячній системі, покритою сірковими сполуками, які надають їй яскравого жовтого, помаранчевого та червоного забарвлення.",
    "Jupiter-Europa": "Європа є одним з чотирьох найбільших супутників Юпітера, покритим шаром водяного льоду, оціненим у 15-25 кілометрів завтовшки, під яким, як вважають вчені, лежить глобальний океан рідкої води, потенційно вдвічі більший за об'єм океанів Землі. Підповерхневий океан супутника підтримується рідким завдяки приливному нагріванню від гравітаційних сил Юпітера, і спостереження вказують на те, що він може містити більше води, ніж всі океани Землі разом узяті. Європа вважається одним з найперспективніших місць у Сонячній системі для пошуку позаземного життя, оскільки її океан може мати необхідні умови та хімію для підтримки мікробних організмів, що робить її пріоритетною ціллю для майбутніх космічних місій.",
    "Jupiter-Ganymede": "Ганімед є найбільшим супутником у Сонячній системі, навіть більшим за планету Меркурій, і є єдиним відомим супутником, який має власне магнітне поле, що вказує на те, що він має рідке залізне ядро, подібне до земного. Його поверхня показує докази як древніх, сильно кратерованих темних регіонів, так і молодшого, борозенчатого рельєфу, утвореного тектонічною активністю, що вказує на складну геологічну історію, що охоплює мільярди років. Недавні спостереження вказують на те, що Ганімед може мати підповерхневий океан, затиснутий між шарами льоду, можливо, містити більше води, ніж всі океани Землі, що робить його ще одним потенційним середовищем для життя у зовнішній Сонячній системі.",
    "Jupiter-Callisto": "Каллісто є найвіддаленішим з чотирьох галілеєвих супутників Юпітера та найбільш кратерованим об'єктом у Сонячній системі, з його древньою поверхнею, що зберігає запис ударів, що датуються майже 4 мільярдами років тому. На відміну від інших галілеєвих супутників, Каллісто не показує жодних доказів геологічної активності або внутрішнього нагрівання, що робить його по суті замерзлим, геологічно мертвим світом, який залишився значною мірою незмінним з ранньої Сонячної системи. Вчені вважають, що Каллісто також може містити підповерхневий океан під своєю крижаною корою, підтримуваний рідким завдяки розпаду радіоактивних елементів, хоча його поверхня не показує жодних ознак тектонічної активності, видимої на Європі або Ганімеді.",
    "Jupiter-Amalthea": "Амальтея є п'ятим за величиною супутником Юпітера та одним з найближчих супутників, відкритим Едвардом Емерсоном Барнардом у 1892 році, що робить його останнім планетарним супутником, відкритим прямим візуальним спостереженням. Він має неправильну картоплеподібну форму, покриту темно-червоним матеріалом, який може складатися з сіркових сполук, викинутих з вулканів Іо, надаючи йому один з найчервоніших поверхонь у Сонячній системі. Низька щільність супутника вказує на те, що він складається з пористого, вільно упакованого матеріалу, можливо льоду або уламків, і він випромінює більше тепла, ніж отримує від Сонця, що вказує на внутрішнє нагрівання від приливних сил Юпітера.",
    "Jupiter-Himalia": "Гімалія є найбільшим нерегулярним супутником Юпітера, відкритим Чарльзом Діллоном Перріном у 1904 році, і є найбільшим членом групи супутників Гімалія, які мають подібні орбітальні характеристики. Вона має неправильну, видовжену форму, типову для захоплених астероїдів, з темною поверхнею, яка відбиває лише близько 3% вхідного сонячного світла, що вказує на склад, багатий на вуглецевий матеріал. Супутник обертається навколо Юпітера на середній відстані близько 11,5 мільйонів кілометрів, для завершення одного оберту йому потрібно приблизно 250 днів, і він є частиною скупчення малих супутників, які можуть бути уламками більшого тіла, що розпалося.",
    "Jupiter-Lysithea": "Лісітея є малим нерегулярним супутником Юпітера, відкритим Сетом Барнсом Ніколсоном у 1938 році, належить до групи проградних супутників Гімалія, які обертаються в тому ж напрямку, що й обертання Юпітера. З діаметром лише близько 36 кілометрів, вона має неправильну форму та темну поверхню, типову для захоплених астероїдів, відбиваючи дуже мало світла від Сонця. Супутник має подібні орбітальні характеристики з іншими членами групи Гімалія, що вказує на те, що вони всі можуть бути уламками одного батьківського тіла, захопленого гравітацією Юпітера на початку історії Сонячної системи.",
    "Jupiter-Elara": "Елара є нерегулярним супутником Юпітера, відкритим Чарльзом Діллоном Перріном у 1905 році, і є другим за величиною членом групи Гімалія після самої Гімалії. Вона має темну, червонувату поверхню з низькою відбивною здатністю, що вказує на склад, багатий на вуглецевий матеріал, подібний до астероїдів типу C, знайдених у зовнішньому поясі астероїдів. Супутник обертається навколо Юпітера на середній відстані близько 11,7 мільйонів кілометрів, завершуючи один оберт приблизно за 259 днів, і, як інші члени її групи, вважається захопленим астероїдом, а не сформованим на орбіті навколо Юпітера.",
    "Saturn-Mimas": "Мімас є одним з внутрішніх супутників Сатурна, відомим своїм виглядом, подібним до Зірки Смерті, створеним масивним кратером Гершель, який охоплює одну третину діаметра супутника та має центральний пік майже такий же високий, як гора Еверест. Удар, який створив цей кратер, майже розбив Мімас, оскільки докази тріщин на протилежній стороні супутника вказують на те, що ударні хвилі майже розбили його. Незважаючи на відносно малий розмір лише 396 кілометрів у діаметрі, Мімас має значний вплив на кільця Сатурна, допомагаючи створювати та підтримувати проміжок між кільцями A та B через гравітаційний резонанс.",
    "Saturn-Enceladus": "Енцелад є одним з найцікавіших супутників Сатурна, що має активні крижані гейзери, які вивергаються з його південного полюса, викидаючи водяну пару та крижані частинки в космос і створюючи E-кільце Сатурна. Під його крижаною поверхнею лежить глобальний підповерхневий океан рідкої води, підтримуваний теплим завдяки приливному нагріванню від гравітації Сатурна та орбітального резонансу з Діоною, що робить його одним з найперспективніших місць для пошуку життя поза Землею. Поверхня супутника геологічно молода, показуючи докази недавнього перекриття та складного рельєфу, включаючи тигрові смуги тріщин, гладкі рівнини та широку криовулканічну активність, яка постійно оновлює його поверхню.",
    "Saturn-Tethys": "Тефія є середнього розміру крижаним супутником Сатурна, сильно кратерованим з однією з найвиразніших особливостей - гігантським кратером Одіссей, який охоплює дві п'ятих діаметра супутника та був майже вирівняний крижаною поверхнею супутника з часом. Супутник має щільність, близьку до щільності водяного льоду, що вказує на те, що він складається майже повністю з льоду з лише невеликою кількістю скелі, і його поверхня показує докази широких древніх ударів. Тефія ділить свою орбіту з двома меншими троянськими супутниками, Телесто та Каліпсо, які обертаються на стабільних точках Лагранжа на 60 градусів попереду та позаду Тефії на її шляху навколо Сатурна.",
    "Saturn-Dione": "Діона є четвертим за величиною супутником Сатурна, що має яскраві крижані скелі заввишки до кількох сотень метрів на її задній півкулі та загадковий тонкий рельєф, який космічний апарат Кассіні виявив як складні системи крижаних скель та долин. Супутник має вищу щільність, ніж його супутники Тефія та Рея, що вказує на те, що він містить більшу частку скельного матеріалу в своєму внутрішньому просторі, можливо, вказуючи на диференційовану структуру з скельним ядром. Діона має орбітальний резонанс з Енцеладом, причому Діона завершує один оберт на кожні два оберти Енцелада, і цей резонанс допомагає підтримувати ексцентричну орбіту Енцелада, сприяючи його геологічній активності.",
    "Saturn-Rhea": "Рея є другим за величиною супутником Сатурна та найбільшим супутником без значної атмосфери, хоча недавні спостереження вказують на те, що вона може мати дуже тонку атмосферу кисню та вуглекислого газу, створену взаємодією поверхневого водяного льоду з магнітосферою Сатурна. Супутник має сильно кратеровану древню поверхню з яскравими тонкими смугами на її задній півкулі, які були виявлені як широкі системи крижаних скель, утворених тектонічною активністю на початку історії супутника. Низька щільність Реї вказує на те, що вона складається приблизно з 75% водяного льоду та 25% скельного матеріалу, і вона може мати невелике скельне ядро, що робить її одним з найменш щільних великих супутників у Сонячній системі.",
    "Saturn-Titan": "Титан є найбільшим супутником Сатурна та другим за величиною супутником у Сонячній системі, більшим за планету Меркурій, і є єдиним відомим супутником, який має щільну атмосферу, багату на азот, з хмарами та опадами рідкого метану та етану. Його поверхня має широкі озера та моря рідких вуглеводнів, переважно метану та етану, особливо сконцентровані біля полюсів, що робить його єдиним світом, крім Землі, про який відомо, що має стабільні тіла рідини на своїй поверхні. Густа помаранчева мряка супутника затуляє його поверхню від видимого світла, але радарні та інфрачервоні спостереження виявили різноманітний рельєф, включаючи гори, дюни, річкові канали та, можливо, криовулкани, що вказує на складні геологічні процеси, подібні до земних, але що працюють при набагато нижчих температурах.",
    "Saturn-Hyperion": "Гіперіон є одним з найнезвичайніших супутників Сатурна, маючи хаотичний, губкоподібний вигляд з високо неправильною формою та надзвичайно пористою, низькощільною структурою, що вказує на те, що він може бути переважно порожнім простором, заповненим льодом. Він має хаотичне обертання, непередбачувано перекидаючись, а не обертаючись на фіксованій осі, що робить його одним з небагатьох відомих об'єктів у Сонячній системі, які виявляють таку поведінку, ймовірно через його неправильну форму та гравітаційні впливи Сатурна та Титана. Поверхня супутника покрита глибокими, темними кратерами, що надають йому губкоподібного вигляду, з темним матеріалом, ймовірно багатим на органічні сполуки, і його низька щільність вказує на те, що він пережив численні удари, поглинаючи їх, а не розбиваючись.",
    "Saturn-Iapetus": "Япет є одним з найвиразніших супутників Сатурна, відомим своїм екстремальним двокольоровим забарвленням з темною передньою півкулею, яка відбиває лише близько 4% сонячного світла, та яскравою задньою півкулею, яка відбиває понад 60% сонячного світла, створюючи драматичний візуальний контраст. Темний матеріал, переважно складається з вуглецевих сполук та, можливо, органічних толінів, сконцентрований на передній півкулі, що вказує на те, що він міг бути зібраний з пилового кільця Феби або відкладений матеріалом з інших зовнішніх супутників. Супутник також має масивну систему екваторіального хребта, що досягає висот до 20 кілометрів, яка обгортає більшу частину його екватора та надає йому вигляду волоського горіха, хоча походження цієї унікальної особливості залишається предметом наукової дискусії.",
    "Saturn-Phoebe": "Феба є одним з зовнішніх супутників Сатурна, обертається в ретроградному напрямку, протилежному до обертання Сатурна, що сильно вказує на те, що вона є захопленим об'єктом, ймовірно астероїдом або об'єктом поясу Койпера, який був гравітаційно захоплений Сатурном. Вона має темну, сильно кратеровану поверхню з низьким альбедо, відбиваючи лише близько 6% вхідного сонячного світла, і спостереження вказують на те, що вона багата на водяний лід та вуглецевий матеріал, типовий для об'єктів з зовнішньої Сонячної системи. Супутник є джерелом величезного пилового кільця навколо Сатурна, оскільки її темний поверхневий матеріал постійно збивається мікрометеоритними ударами, створюючи кільце, яке простягається далеко в систему Сатурна та може сприяти матеріалом іншим супутникам, таким як Япет.",
    "Uranus-Ariel": "Аріель є найяскравішим та геологічно наймолодшим з п'яти головних супутників Урана, з відносно гладкою поверхнею, позначеною широкими мережами долин розломів та каньйонів, що вказують на минулу геологічну активність. Поверхня супутника показує докази перекриття, з відносно невеликою кількістю ударних кратерів порівняно з його супутниками, що вказує на те, що криовулканічна активність або інші геологічні процеси стерли древній рельєф. Каньйони Аріеля, деякі досягають глибини 10 кілометрів, могли сформуватися з внутрішнього розширення або тектонічних сил, і супутник, ймовірно, містить суміш водяного льоду та скелі, можливо, з скельним ядром.",
    "Uranus-Umbriel": "Умбріель є найтемнішим з п'яти головних супутників Урана, з рівномірно темною поверхнею, яка відбиває лише близько 16% вхідного сонячного світла, що вказує на те, що вона покрита темним матеріалом, можливо вуглецевими сполуками або органічними толінами. Супутник має древню, сильно кратеровану поверхню з дуже невеликою кількістю ознак геологічної активності, що робить його одним з найпримітивніших тіл у Сонячній системі, по суті незмінним з раннього періоду бомбардування. Найвиразнішою особливістю Умбріеля є Вунда, велике яскраве кільце біля її екватора, ймовірно яскравий матеріал, виставлений ударом, що різко контрастує з інакше темною поверхнею.",
    "Uranus-Titania": "Титанія є найбільшим з супутників Урана, з діаметром близько 1578 кілометрів, і має складну геологічну історію з доказами як древнього кратерування, так і більш недавньої тектонічної активності. Поверхня супутника позначена широкими системами каньйонів та долин розломів, деякі досягають глибини кількох кілометрів, що вказує на те, що супутник розширився на початку своєї історії, можливо через замерзання підповерхневого океану. Титанія, ймовірно, має скельне ядро, оточене мантією з водяного льоду, і її поверхня показує суміш сильно кратерованого древнього рельєфу та більш гладких регіонів, які могли бути перекриті криовулканічною активністю.",
    "Uranus-Oberon": "Оберон є найвіддаленішим та другим за величиною з головних супутників Урана, з сильно кратерованою древньою поверхнею, яка показує мало доказів геологічної активності, що робить його одним з найпримітивніших супутників у Сонячній системі. Його поверхня позначена численними великими ударними кратерами, включаючи велику гору в центрі одного кратера, яка може бути центральним піком, утвореним під час удару, і темний матеріал, сконцентрований у днах кратерів, вказує на те, що криовулканічна активність могла відбуватися в далекому минулому. Супутник, ймовірно, складається з суміші водяного льоду та скелі, з можливим скельним ядром, і його темний поверхневий матеріал може містити вуглецеві сполуки або органічні матеріали.",
    "Uranus-Miranda": "Міранда є найменшим та найближчим з п'яти головних супутників Урана, але вона також є найбільш геологічно складною та незвичайною, маючи екстремальні варіації в рельєфі, включаючи регіони сильно кратерованої древньої поверхні, гладкі рівнини та масивні каньйони розломів завглибшки до 20 кілометрів. Хаотичні поверхневі особливості супутника, включаючи три великі 'корони' або овальні регіони з різними геологічними патернами, вказують на бурхливе минуле, можливо, що включає множинні удари або внутрішнє нагрівання та події перекриття. Вчені вважають, що Міранда могла бути розбита масивним ударом, а потім знову зібрана, або що інтенсивне приливне нагрівання на початку її історії спричинило екстремальну геологічну активність, яка створила її латаний вигляд.",
    "Uranus-Puck": "Пак є найбільшим з внутрішніх супутників Урана, відкритим космічним апаратом Voyager 2 у 1985 році, і має приблизно сферичну форму з діаметром близько 162 кілометрів, що робить його одним з більших малих супутників у Сонячній системі. Його поверхня темна та сильно кратерована, з низьким альбедо, що вказує на те, що він складається з водяного льоду, змішаного з темним, вуглецевим матеріалом, типовий для об'єктів з зовнішньої Сонячної системи. Супутник обертається близько до Урана, всередині системи кілець планети, і його орбіта майже кругла та лежить в екваторіальній площині Урана, узгоджено з іншими внутрішніми супутниками.",
    "Neptune-Triton": "Тритон є найбільшим супутником Нептуна та сьомим за величиною супутником у Сонячній системі, унікальним тим, що обертається в ретроградному напрямку, протилежному до обертання Нептуна, що сильно вказує на те, що він був захопленим об'єктом поясу Койпера, а не сформованим на орбіті навколо Нептуна. Супутник має надзвичайно холодну поверхню з температурами близько -235°C, проте він показує докази активної криовулканічної активності з азотними гейзерами, що вивергаються з його південного полюса, спричиненими сезонним нагріванням від Сонця. Поверхня Тритона геологічно молода та складна, маючи гладкі рівнини замерзлого азоту, диняний рельєф з ямками та хребтами, і тонку азотну атмосферу, що робить його одним з найактивніших крижаних супутників у зовнішній Сонячній системі.",
    "Neptune-Nereid": "Нереїда є третім за величиною супутником Нептуна, відкритим Жераром Койпером у 1949 році, і має найбільш ексцентричну орбіту з усіх супутників у Сонячній системі, коливаючись від 1,4 до 9,7 мільйонів кілометрів від Нептуна, для завершення одного високо еліптичного оберту їй потрібно 360 днів. Її екстремальні орбітальні характеристики вказують на те, що вона могла бути порушена з регулярної орбіти захопленням Тритона, або вона могла бути захопленим астероїдом або об'єктом поясу Койпера, який був гравітаційно порушений. Поверхня супутника темна і, ймовірно, складається з водяного льоду, змішаного з темним матеріалом, і дуже мало відомо про її фізичні характеристики через її відстань та обмежені спостереження з Voyager 2.",
    "Neptune-Proteus": "Протей є другим за величиною супутником Нептуна та найбільшим неправильної форми супутником у Сонячній системі, відкритим Voyager 2 у 1989 році, з діаметром близько 420 кілометрів, але не сферичною формою, що вказує на те, що він не досяг гідростатичної рівноваги. Незважаючи на свій розмір, він не був відкритий раніше, оскільки він дуже темний, відбиває лише близько 6% вхідного сонячного світла, і обертається дуже близько до Нептуна, що ускладнює спостереження з Землі. Поверхня супутника сильно кратерована без ознак геологічної активності, і він, ймовірно, складається з водяного льоду, змішаного з темним, вуглецевим матеріалом, типовий для об'єктів з зовнішньої Сонячної системи.",
    "Neptune-Larissa": "Ларісса є одним з внутрішніх супутників Нептуна, відкритим Гарольдом Дж. Рейтсемою, Вільямом Б. Хаббардом, Ларрі А. Лебофським та Девідом Дж. Толеном у 1981 році через спостереження зоряних затемнень, і пізніше підтвердженим Voyager 2 у 1989 році. Вона має неправильну, не сферичну форму з середнім діаметром близько 194 кілометрів, і її поверхня темна та сильно кратерована, що вказує на те, що вона складається з водяного льоду, змішаного з темним матеріалом. Супутник обертається дуже близько до Нептуна, всередині системи кілець планети, і, як інші внутрішні супутники, її орбіта майже кругла та лежить в екваторіальній площині Нептуна.",
    "Pluto-Charon": "Харон є найбільшим супутником Плутона та найбільшим супутником відносно свого батьківського тіла у Сонячній системі, з діаметром близько половини Плутона, що робить систему Плутон-Харон по суті подвійною планетою, де обидва об'єкти обертаються навколо спільного центру маси, розташованого поза поверхнею Плутона. Супутник приливно заблокований до Плутона, що означає, що обидва тіла завжди показують один і той же бік один одному, і поверхня Харона показує докази водяного льоду та, можливо, аміачних гідратів, з червонуватим північним полярним регіоном, ймовірно складається з толінів. Відкриття Харона у 1978 році дозволило вченим точно визначити масу та розмір Плутона, і супутник міг сформуватися з гігантського удару на початку історії Сонячної системи, подібно до того, як сформувався Місяць Землі.",
    "Eris-Dysnomia": "Дісномія є єдиним відомим супутником карликової планети Ерида, відкритим у 2005 році Майком Брауном та командою Laser Guide Star Adaptive Optics, використовуючи телескопи Keck, і названа на честь дочки Ериди в грецькій міфології. Супутник набагато менший за Ериду, з оціненим діаметром близько 700 кілометрів, і обертається навколо Ериди на відстані близько 37 000 кілометрів, для завершення одного оберту йому потрібно приблизно 16 днів. Спостереження орбіти Дісномії дозволили вченим визначити масу Ериди, виявивши, що вона приблизно на 27% масивніша за Плутон, що було ключовим фактором у перекласифікації Плутона як карликової планети.",
    "Makemake-MK 2": "MK 2, офіційно позначений S/2015 (136472) 1, є єдиним відомим супутником карликової планети Макемаке, відкритим у 2016 році космічним телескопом Габбл, і є малим, темним супутником з оціненим діаметром близько 175 кілометрів. Супутник обертається навколо Макемаке на відстані принаймні 21 000 кілометрів, і його темна поверхня, яка відбиває лише близько 4% вхідного сонячного світла, різко контрастує з яскравою, крижаною поверхнею Макемаке. Відкриття MK 2 надає важливу інформацію про масу Макемаке та історію його формування, і його темний вигляд вказує на те, що він може бути покритий вуглецевим матеріалом, подібним до багатьох об'єктів поясу Койпера.",
    "Haumea-Hi'iaka": "Хі'іака є більшим з двох відомих супутників Хаумеї, відкритим у 2005 році командою Майка Брауна, і названа на честь гавайської богині танцю та покровительки Великого острова Гаваї. Супутник має діаметр близько 310 кілометрів і обертається навколо Хаумеї на відстані приблизно 49 500 кілометрів, завершуючи один оберт приблизно за 49 днів, і її поверхня, здається, покрита водяним льодом. Орбіта та характеристики Хі'іаки були вирішальними у визначенні маси Хаумеї та підтвердженні незвичайної видовженої, еліпсоїдальної форми карликової планети та швидкого обертання.",
    "Haumea-Namaka": "Намака є меншим, внутрішнім супутником Хаумеї, також відкритим у 2005 році, і названа на честь гавайського водяного духа, дочки Хаумеї в гавайській міфології. Супутник має оцінений діаметр близько 170 кілометрів і обертається навколо Хаумеї на ближчій відстані, ніж Хі'іака, приблизно 25 657 кілометрів, завершуючи один оберт приблизно за 18 днів. Орбіта Намаки високо нахилена та еліптична, і спостереження її орбітального руху виявили складні взаємодії з Хі'іакою, надаючи уявлення про незвичайну форму Хаумеї та динаміку цієї віддаленої подвійної системи.",
    "Quaoar-Weywot": "Вейвот є єдиним відомим супутником об'єкта поясу Койпера Кваоар, відкритим у 2007 році Майклом Брауном, використовуючи космічний телескоп Габбл, і названий на честь небесного бога та сина Кваоара в міфології Тонгва. Супутник має оцінений діаметр близько 170 кілометрів і обертається навколо Кваоара на відстані приблизно 14 500 кілометрів, для завершення одного оберту йому потрібно близько 12 днів. Спостереження орбіти Вейвота дозволили вченим визначити масу Кваоара та виявили дивовижне відкриття у 2023 році, що Кваоар має систему кілець, розташовану поза межею Роша, що кидає виклик нашому розумінню формування кілець.",
    "Orcus-Vanth": "Вант є єдиним відомим супутником кандидата в карликові планети Орк, відкритим у 2005 році Майком Брауном та його командою, використовуючи космічний телескоп Габбл, і незвично великим відносно Орка, складаючи близько 3% загальної маси системи. Супутник має оцінений діаметр близько 443 кілометрів, що робить його одним з найбільших відомих супутників транснептунових об'єктів, і обертається навколо Орка на відстані приблизно 9000 кілометрів, для завершення одного оберту йому потрібно близько 9,5 днів. Великий розмір Ванта відносно Орка вказує на те, що він міг сформуватися з великого зіткнення, подібно до того, як сформувався Місяць Землі, і його орбіта майже кругла та вирівняна з екватором Орка.",
    "Gonggong-Xiangliu": "Сянлю є єдиним відомим супутником об'єкта розсіяного диска Гонггонг, відкритим у 2016 році командою, використовуючи космічний телескоп Габбл, і названим на честь дев'ятиголового змійного монстра з китайської міфології, який служив водяному богу Гонггонгу. Супутник має оцінений діаметр близько 300 кілометрів і обертається навколо Гонггонга на відстані приблизно 24 000 кілометрів, для завершення одного оберту йому потрібно близько 25 днів по майже круговій траєкторії. Спостереження орбіти Сянлю були вирішальними у визначенні маси Гонггонга, і відкриття супутника надало важливі уявлення про формування та еволюцію віддалених об'єктів у зовнішній Сонячній системі.",
    "Salacia-Actaea": "Актея є єдиним відомим супутником транснептунового об'єкта Салація, відкритим у 2006 році Кітом Ноллом, Гарольдом Левісоном, Деніз Стівенс та Віллом Гранді, використовуючи космічний телескоп Габбл, і названа на честь Нереїди (морської німфи) з грецької міфології. Супутник має оцінений діаметр близько 303 кілометрів і обертається навколо Салації на відстані приблизно 5619 кілометрів, завершуючи один оберт приблизно за 5,5 днів. Відкриття та орбітальні спостереження Актеї дозволили вченим визначити масу та щільність Салації, виявивши, що вона є відносно низькощільною об'єктом, що складається переважно з водяного льоду, типовий для багатьох великих об'єктів поясу Койпера.",
    "2007 OR10-S/2016 (225088) 1": "S/2016 (225088) 1 є єдиним відомим супутником кандидата в карликові планети 2007 OR10, відкритим у 2016 році командою на чолі з Чабою Кіссом, використовуючи космічний телескоп Габбл, і є малим супутником з оціненим діаметром близько 237 кілометрів. Супутник обертається навколо 2007 OR10 на відстані принаймні 15 000 кілометрів, і його відкриття допомогло вченим визначити масу об'єкта, підтвердивши 2007 OR10 як один з найбільших об'єктів у регіоні розсіяного диска. Властивості та орбітальні характеристики супутника надають важливі підказки про формування та еволюцію цього віддаленого, червонуватого кандидата в карликові планети, який неофіційно був названий 'Білосніжкою' перед отриманням тимчасового позначення.",
    "Earth-OREST": "Орест, мандрівний супутник - рік відкриття 2019 - подорожуючий супутник у холодному космосі відомий своєю тягою до нового та незвіданого. Маленький супутник в величезному невідомому космосі у якого весь світ попереду. Такі маленькі супутники завжди нагадують, що попереду завжди є дорога, якою ще ніхто не ходив. Для нього космос — не тиша й пітьма, а нескінченний світ можливостей, які тільки чекають, щоб їх відкрили.",
    "Earth-EMMA": "Емма, витончений супутник - рік відкриття 2020 - у час, коли світ зупинився, вона прийшла, щоб його оживити і дати кольори буденній сірості. Емма прокладає власну стежку у темряві - маленьку, але значущу дорогу, що нагадує: навіть у безмежному космосі є місце теплу й ніжності. Символом тихого відродження і що людство здатне на щире.",
    "Mars-MAVEN": "MAVEN (Mars Atmosphere and Volatile EvolutioN) — це космічний апарат NASA, який обертається навколо Марса з 2014 року, вивчаючи верхню атмосферу планети, іоносферу та взаємодії з Сонцем та сонячним вітром. Місія спрямована на розуміння того, як Марс втратив свою атмосферу та воду з часом, надаючи важливі дані про кліматичну історію планети та потенціал для минулої придатності до життя. Еліптична орбіта MAVEN дозволяє йому вибірково досліджувати різні висоти марсіанської атмосфери.",
    "Jupiter-JUNO": "JUNO — це космічний апарат NASA, який прибув до Юпітера в 2016 році, вийшовши на високоеліптичну полярну орбіту для вивчення складу газового гіганта, гравітаційного поля, магнітного поля та полярної магнітосфери. Місія розкрила вражаючі деталі про атмосферу Юпітера, включаючи Велику червону пляму, та надала інформацію про формування та еволюцію планети. Унікальна орбіта JUNO дозволяє йому уникати інтенсивних радіаційних поясів Юпітера, проводячи близькі спостереження.",
    "Saturn-Cassini–Huygens": "Cassini–Huygens була спільною місією NASA/ESA/ASI, яка провела 13 років, вивчаючи Сатурн, його кільця та супутники. Запущена в 1997 році, Cassini вийшла на орбіту навколо Сатурна в 2004 році та проводила революційні спостереження до завершення місії в 2017 році з навмисним падінням в атмосферу Сатурна. Зонд Huygens успішно приземлився на Титан в 2005 році, ставши першим космічним апаратом, який приземлився на супутник у зовнішній Сонячній системі. Високоеліптична орбіта Cassini дозволила їй вивчати магнітосферу Сатурна, кільця та численні супутники, включаючи відкриття гейзерів на Енцеладі та озер на Титані, революціонізуючи наше розуміння системи Сатурна."
  },
  cs: {
    "Earth-Moon": "Měsíc je jediný přirozený satelit Země a pátý největší měsíc ve sluneční soustavě, vytvořený přibližně před 4,5 miliardami let z trosek vytvořených, když objekt velikosti Marsu narazil do rané Země. Ovlivňuje příliv a odliv Země prostřednictvím gravitačních sil, vytváří denní vzestup a pokles oceánských vod, které formovaly pobřežní ekosystémy a navigaci v celé lidské historii. Povrch Měsíce je pokryt starověkými lávovými toky a impaktními krátery, bez atmosféry nebo tekuté vody, což z něj činí záznam rané historie sluneční soustavy zachovaný v nedotčeném stavu.",
    "Mars-Phobos": "Phobos je větší a nejvnitřnější ze dvou měsíců Marsu, objevený Asaphem Hallem v roce 1877, s nepravidelným bramborovitým tvarem, který naznačuje, že může být zachycený asteroid. Obíhá Mars ve velmi blízké vzdálenosti - pouze 6 000 kilometrů od povrchu - že dokončí tři plné oběhy za jeden marťanský den, zdá se, že vychází na západě a zapadá na východě z povrchu Marsu. Phobos se postupně spirálovitě přibližuje k Marsu kvůli slapovým silám a předpovídá se, že buď narazí do planety, nebo se rozpadne na systém prstenců během příštích 50 milionů let.",
    "Mars-Deimos": "Deimos je menší a nejvzdálenější měsíc Marsu, také objevený Asaphem Hallem v roce 1877, trvá mu přibližně 30 hodin dokončit jeden oběh kolem Rudé planety. Navzdory průměru pouze 12,4 kilometru je jeho hladký povrch pokryt vrstvou volného regolitu, který vyplnil většinu jeho kráterů, což mu dává mnohem méně drsný vzhled než jeho sourozenecký měsíc Phobos. Nízká hustota měsíce a nepravidelný tvar naznačují, že stejně jako Phobos mohl být zachycený asteroid z vnějšího pásu asteroidů nebo dokonce z oblasti Kuiperova pásu.",
    "Jupiter-Io": "Io je nejvnitřnější ze čtyř galileovských měsíců Jupitera a nejvulkaničtější těleso v celé sluneční soustavě, s více než 400 aktivními sopkami chrlícími síru a silikátový materiál stovky kilometrů do vesmíru. Jeho intenzivní vulkanická aktivita je poháněna slapovým ohřevem způsobeným obrovskou gravitační silou Jupitera a orbitální rezonancí s Europou a Ganymedem, která ohýbá vnitřek Io a generuje obrovské teplo. Povrch měsíce je neustále přetvářen lávovými toky, což z něj činí jeden z nejmladších povrchů ve sluneční soustavě, pokrytý sírovými sloučeninami, které mu dávají živou žlutou, oranžovou a červenou barvu.",
    "Jupiter-Europa": "Europa je jeden ze čtyř největších měsíců Jupitera, pokrytý vrstvou vodního ledu odhadovanou na 15-25 kilometrů tlustou, pod kterou vědci věří, že leží globální oceán tekuté vody potenciálně dvakrát větší než oceány Země. Podpovrchový oceán měsíce je udržován tekutý slapovým ohřevem z gravitačních sil Jupitera a pozorování naznačují, že může obsahovat více vody než všechny oceány Země dohromady. Europa je považována za jedno z nejslibnějších míst ve sluneční soustavě pro hledání mimozemského života, protože její oceán může mít nezbytné podmínky a chemii pro podporu mikrobiálních organismů, což z ní činí prioritní cíl pro budoucí vesmírné mise.",
    "Jupiter-Ganymede": "Ganymede je největší měsíc ve sluneční soustavě, dokonce větší než planeta Merkur, a je jediný známý měsíc, který má vlastní magnetické pole, což naznačuje, že má tekuté železné jádro podobné Zemi. Jeho povrch vykazuje důkazy jak starověkých, silně kráterovaných tmavých oblastí, tak mladšího, rýhovaného terénu vytvořeného tektonickou aktivitou, což naznačuje složitou geologickou historii sahající miliardy let. Nedávná pozorování naznačují, že Ganymede může mít podpovrchový oceán vložený mezi vrstvy ledu, možná obsahující více vody než všechny oceány Země, což z něj činí další potenciální prostředí pro život ve vnější sluneční soustavě.",
    "Jupiter-Callisto": "Callisto je nejvzdálenější ze čtyř galileovských měsíců Jupitera a nejvíce kráterované těleso ve sluneční soustavě, s jeho starověkým povrchem zachovávajícím záznam dopadů sahající téměř 4 miliardy let zpět. Na rozdíl od ostatních galileovských měsíců Callisto nevykazuje žádné důkazy geologické aktivity nebo vnitřního ohřevu, což z něj činí v podstatě zmrzlý, geologicky mrtvý svět, který zůstal do značné míry nezměněn od rané sluneční soustavy. Vědci se domnívají, že Callisto může také hostit podpovrchový oceán pod svou ledovou kůrou, udržovaný tekutý rozpadem radioaktivních prvků, ačkoli jeho povrch nevykazuje žádné známky tektonické aktivity viděné na Europě nebo Ganymedu.",
    "Jupiter-Amalthea": "Amalthea je pátý největší měsíc Jupitera a jeden z nejvnitřnějších měsíců, objevený Edwardem Emersonem Barnardem v roce 1892, což z něj činí poslední planetární satelit objevený přímým vizuálním pozorováním. Má nepravidelný bramborovitý tvar, pokrytý tmavě červeným materiálem, který může sestávat ze sírových sloučenin vyloučených ze sopek Io, což mu dává jeden z nejčervenějších povrchů ve sluneční soustavě. Nízká hustota měsíce naznačuje, že je složen z porézního, volně sbaleného materiálu, možná ledu nebo sutiny, a vyzařuje více tepla, než přijímá od Slunce, což naznačuje vnitřní ohřev ze slapových sil Jupitera.",
    "Jupiter-Himalia": "Himalia je největší nepravidelný měsíc Jupitera, objevený Charlesem Dillonem Perrinem v roce 1904, a je největším členem skupiny měsíců Himalia, které sdílejí podobné orbitální charakteristiky. Má nepravidelný, protáhlý tvar typický pro zachycené asteroidy, s tmavým povrchem, který odráží pouze asi 3% příchozího slunečního světla, což naznačuje složení bohaté na uhlíkatý materiál. Měsíc obíhá Jupiter ve průměrné vzdálenosti asi 11,5 milionu kilometrů, trvá mu přibližně 250 dní dokončit jeden oběh, a je součástí shluku malých měsíců, které mohou být fragmenty z většího tělesa, které se rozpadlo.",
    "Jupiter-Lysithea": "Lysithea je malý nepravidelný měsíc Jupitera, objevený Sethem Barnesem Nicholsonem v roce 1938, patřící do skupiny progradních měsíců Himalia, které obíhají ve stejném směru jako rotace Jupitera. S průměrem pouze asi 36 kilometrů má nepravidelný tvar a tmavý povrch typický pro zachycené asteroidy, odrážející velmi málo světla od Slunce. Měsíc sdílí podobné orbitální charakteristiky s ostatními členy skupiny Himalia, což naznačuje, že mohou být všichni fragmenty ze stejného mateřského tělesa, které bylo zachyceno gravitací Jupitera na počátku historie sluneční soustavy.",
    "Jupiter-Elara": "Elara je nepravidelný měsíc Jupitera, objevený Charlesem Dillonem Perrinem v roce 1905, a je druhým největším členem skupiny Himalia po samotné Himalii. Má tmavý, načervenalý povrch s nízkou reflexivitou, což naznačuje složení bohaté na uhlíkatý materiál podobný C-typovým asteroidům nalezeným ve vnějším pásu asteroidů. Měsíc obíhá Jupiter ve průměrné vzdálenosti asi 11,7 milionu kilometrů, dokončuje jeden oběh přibližně za 259 dní, a stejně jako ostatní členové své skupiny je považován za zachycený asteroid spíše než za formovaný na oběžné dráze kolem Jupitera.",
    "Saturn-Mimas": "Mimas je jeden z vnitřních měsíců Saturnu, známý svým vzhledem podobným Hvězdě smrti vytvořeným masivním kráterem Herschel, který pokrývá jednu třetinu průměru měsíce a má centrální vrchol téměř tak vysoký jako Mount Everest. Dopad, který vytvořil tento kráter, téměř rozbil Mimase, protože důkazy o zlomech na opačné straně měsíce naznačují, že rázové vlny ho téměř rozbily. Navzdory relativně malé velikosti pouze 396 kilometrů v průměru má Mimas významný vliv na prstence Saturnu, pomáhá vytvářet a udržovat mezeru mezi prstenci A a B prostřednictvím gravitační rezonance.",
    "Saturn-Enceladus": "Enceladus je jeden z nejzajímavějších měsíců Saturnu, vyznačující se aktivními ledovými gejzíry, které vybuchují z jeho jižního pólu, chrlí vodní páru a ledové částice do vesmíru a vytvářejí E-prstenec Saturnu. Pod jeho ledovým povrchem leží globální podpovrchový oceán tekuté vody, udržovaný teplý slapovým ohřevem z gravitace Saturnu a orbitální rezonancí s Dionou, což z něj činí jedno z nejslibnějších míst pro hledání života mimo Zemi. Povrch měsíce je geologicky mladý, vykazuje důkazy nedávného přetváření a složitého terénu včetně tygřích pruhů zlomů, hladkých plání a rozsáhlé kryovulkanické aktivity, která neustále obnovuje jeho povrch.",
    "Saturn-Tethys": "Tethys je středně velký ledový měsíc Saturnu, silně kráterovaný s jedním z nejvýraznějších rysů, kterým je obří kráter Odysseus, který pokrývá dvě pětiny průměru měsíce a byl téměř zploštěn ledovým povrchem měsíce v průběhu času. Měsíc má hustotu blízkou hustotě vodního ledu, což naznačuje, že je složen téměř výhradně z ledu s pouze malým množstvím horniny, a jeho povrch vykazuje důkazy rozsáhlých starověkých dopadů. Tethys sdílí svou oběžnou dráhu se dvěma menšími trojskými měsíci, Telesto a Calypso, které obíhají na stabilních Lagrangeových bodech 60 stupňů před a za Tethysem na jeho dráze kolem Saturnu.",
    "Saturn-Dione": "Dione je čtvrtý největší měsíc Saturnu, vyznačující se jasnými ledovými útesy až několik set metrů vysokými na jeho zadní polokouli a tajemným jemným terénem, který odhalila kosmická sonda Cassini jako složité systémy ledových útesů a údolí. Měsíc má vyšší hustotu než jeho sourozenecké měsíce Tethys a Rhea, což naznačuje, že obsahuje větší podíl horninového materiálu ve svém vnitřku, možná naznačuje diferencovanou strukturu s horninovým jádrem. Dione sdílí orbitální rezonanci s Enceladem, přičemž Dione dokončuje jeden oběh za každé dva oběhy Encelada, a tato rezonance pomáhá udržovat excentrickou dráhu Encelada, přispívá k jeho geologické aktivitě.",
    "Saturn-Rhea": "Rhea je druhý největší měsíc Saturnu a největší měsíc bez podstatné atmosféry, ačkoli nedávná pozorování naznačují, že může mít velmi tenkou atmosféru kyslíku a oxidu uhličitého vytvořenou interakcí povrchového vodního ledu s magnetosférou Saturnu. Měsíc má silně kráterovaný starověký povrch, s jasnými jemnými pruhy na jeho zadní polokouli, které byly objeveny jako rozsáhlé systémy ledových útesů vytvořené tektonickou aktivitou na počátku historie měsíce. Nízká hustota Rhey naznačuje, že je složena z asi 75% vodního ledu a 25% horninového materiálu, a může mít malé horninové jádro, což z ní činí jeden z nejméně hustých velkých měsíců ve sluneční soustavě.",
    "Saturn-Titan": "Titan je největší měsíc Saturnu a druhý největší měsíc ve sluneční soustavě, větší než planeta Merkur, a je jediný známý měsíc, který má hustou atmosféru bohatou na dusík s mraky a srážkami tekutého metanu a ethanu. Jeho povrch má rozsáhlá jezera a moře tekutých uhlovodíků, především metanu a ethanu, zvláště koncentrovaná poblíž pólů, což z něj činí jediný svět kromě Země, o kterém je známo, že má stabilní tělesa tekutin na svém povrchu. Hustá oranžová mlha měsíce zakrývá jeho povrch před viditelným světlem, ale radarová a infračervená pozorování odhalila rozmanitý terén včetně hor, dun, říčních kanálů a možná kryovulkánů, což naznačuje složité geologické procesy podobné Zemi, ale působící při mnohem chladnějších teplotách.",
    "Saturn-Hyperion": "Hyperion je jeden z nejneobvyklejších měsíců Saturnu, má chaotický, houbovitý vzhled s vysoce nepravidelným tvarem a extrémně porézní, nízkohustotní strukturou, která naznačuje, že může být většinou prázdný prostor naplněný ledem. Má chaotickou rotaci, nepředvídatelně se převrací spíše než rotuje na pevné ose, což z něj činí jeden z mála známých objektů ve sluneční soustavě, které vykazují takové chování, pravděpodobně kvůli jeho nepravidelnému tvaru a gravitačním vlivům Saturnu a Titanu. Povrch měsíce je pokryt hlubokými, tmavými krátery, které mu dávají houbovitý vzhled, s tmavým materiálem pravděpodobně bohatým na organické sloučeniny, a jeho nízká hustota naznačuje, že přežil četné dopady tím, že je absorboval spíše než rozbil.",
    "Saturn-Iapetus": "Iapetus je jeden z nejvýraznějších měsíců Saturnu, známý svým extrémním dvoutónovým zbarvením s tmavou přední polokoulí, která odráží pouze asi 4% slunečního světla, a jasnou zadní polokoulí, která odráží přes 60% slunečního světla, což vytváří dramatický vizuální kontrast. Tmavý materiál, složený převážně z uhlíkatých sloučenin a možná organických tholinů, je koncentrován na přední polokouli, což naznačuje, že mohl být zameten z prachového prstence Phoebe nebo uložen materiálem z jiných vnějších měsíců. Měsíc má také masivní systém rovníkového hřebene, dosahující výšek až 20 kilometrů, který obepíná velkou část jeho rovníku a dává mu vlašský ořechový vzhled, ačkoli původ této jedinečné vlastnosti zůstává předmětem vědecké debaty.",
    "Saturn-Phoebe": "Phoebe je jeden z vnějších měsíců Saturnu, obíhající v retrográdním směru opačném k rotaci Saturnu, což silně naznačuje, že je zachycený objekt, pravděpodobně asteroid nebo objekt Kuiperova pásu, který byl gravitačně zachycen Saturnem. Má tmavý, silně kráterovaný povrch s nízkým albedem, odrážející pouze asi 6% příchozího slunečního světla, a pozorování naznačují, že je bohatý na vodní led a uhlíkatý materiál typický pro objekty z vnější sluneční soustavy. Měsíc je zdrojem rozsáhlého prachového prstence kolem Saturnu, protože jeho tmavý povrchový materiál je neustále odstraňován mikrometeoritickými dopady, vytvářející prstenec, který sahá daleko do systému Saturnu a může přispívat materiálem k jiným měsícům jako Iapetus.",
    "Uranus-Ariel": "Ariel je nejjasnější a geologicky nejmladší z pěti hlavních měsíců Uranu, s relativně hladkým povrchem označeným rozsáhlými sítěmi zlomových údolí a kaňonů, které naznačují minulou geologickou aktivitu. Povrch měsíce vykazuje důkazy přetváření, s relativně málo impaktními krátery ve srovnání s jeho sourozeneckými měsíci, což naznačuje, že kryovulkanická aktivita nebo jiné geologické procesy vymazaly starověký terén. Kaňony Ariela, některé dosahující hloubek 10 kilometrů, mohly vzniknout z vnitřní expanze nebo tektonických sil, a měsíc pravděpodobně obsahuje směs vodního ledu a horniny, možná s horninovým jádrem.",
    "Uranus-Umbriel": "Umbriel je nejtmavší z pěti hlavních měsíců Uranu, s jednotně tmavým povrchem, který odráží pouze asi 16% příchozího slunečního světla, což naznačuje, že je pokryt tmavým materiálem, možná uhlíkatými sloučeninami nebo organickými tholiny. Měsíc má starověký, silně kráterovaný povrch s velmi málo známkami geologické aktivity, což z něj činí jedno z nejprimitivnějších těles ve sluneční soustavě, v podstatě nezměněné od raného období bombardování. Nejvýraznějším rysem Umbriela je Wunda, velký jasný prstenec poblíž jeho rovníku, pravděpodobně jasný materiál vystavený dopadem, ostře kontrastující s jinak tmavým povrchem.",
    "Uranus-Titania": "Titania je největší z měsíců Uranu, s průměrem asi 1 578 kilometrů, a vyznačuje se složitou geologickou historií s důkazy jak starověkého kráterování, tak nedávnější tektonické aktivity. Povrch měsíce je označen rozsáhlými systémy kaňonů a zlomových údolí, některé dosahující hloubek několika kilometrů, což naznačuje, že měsíc se rozšířil na počátku své historie, možná kvůli zamrznutí podpovrchového oceánu. Titania pravděpodobně má horninové jádro obklopené pláštěm z vodního ledu, a její povrch vykazuje směs silně kráterovaného starověkého terénu a hladších oblastí, které mohly být přetvořeny kryovulkanickou aktivitou.",
    "Uranus-Oberon": "Oberon je nejvzdálenější a druhý největší z hlavních měsíců Uranu, s silně kráterovaným starověkým povrchem, který vykazuje málo důkazů geologické aktivity, což z něj činí jeden z nejprimitivnějších měsíců ve sluneční soustavě. Jeho povrch je označen četnými velkými impaktními krátery, včetně velké hory ve středu jednoho kráteru, která může být centrálním vrcholem vytvořeným během dopadu, a tmavý materiál koncentrovaný v podlahách kráterů naznačuje, že kryovulkanická aktivita mohla nastat v dávné minulosti. Měsíc pravděpodobně sestává ze směsi vodního ledu a horniny, s možným horninovým jádrem, a jeho tmavý povrchový materiál může obsahovat uhlíkaté sloučeniny nebo organické materiály.",
    "Uranus-Miranda": "Miranda je nejmenší a nejvnitřnější z pěti hlavních měsíců Uranu, ale je také geologicky nejsložitější a nejneobvyklejší, vyznačující se extrémními variacemi v terénu včetně oblastí silně kráterovaného starověkého povrchu, hladkých plání a masivních zlomových kaňonů až 20 kilometrů hlubokých. Chaotické povrchové rysy měsíce, včetně tří velkých 'koron' nebo oválných oblastí s odlišnými geologickými vzory, naznačují násilnou minulost možná zahrnující více dopadů nebo vnitřní ohřev a přetváření událostí. Vědci se domnívají, že Miranda mohla být rozbita masivním dopadem a pak znovu sestavena, nebo že intenzivní slapový ohřev na počátku její historie způsobil extrémní geologickou aktivitu, která vytvořila její patchworkový vzhled.",
    "Uranus-Puck": "Puck je největší z vnitřních měsíců Uranu, objevený kosmickou sondou Voyager 2 v roce 1985, a má přibližně kulovitý tvar s průměrem asi 162 kilometrů, což z něj činí jeden z větších malých měsíců ve sluneční soustavě. Jeho povrch je tmavý a silně kráterovaný, s nízkým albedem naznačujícím, že je složen z vodního ledu smíchaného s tmavým, uhlíkatým materiálem, typicky pro objekty z vnější sluneční soustavy. Měsíc obíhá blízko Uranu, uvnitř systému prstenců planety, a jeho oběžná dráha je téměř kruhová a leží v rovníkové rovině Uranu, konzistentně s ostatními vnitřními měsíci.",
    "Neptune-Triton": "Triton je největší měsíc Neptuna a sedmý největší měsíc ve sluneční soustavě, jedinečný pro obíhání v retrográdním směru opačném k rotaci Neptuna, což silně naznačuje, že byl zachycený objekt Kuiperova pásu spíše než formovaný na oběžné dráze kolem Neptuna. Měsíc má extrémně chladný povrch s teplotami kolem -235°C, přesto vykazuje důkazy aktivní kryovulkanismu s dusíkovými gejzíry vybuchujícími z jeho jižního pólu, poháněnými sezónním ohřevem od Slunce. Povrch Tritonu je geologicky mladý a složitý, vyznačující se hladkými pláněmi zmrzlého dusíku, melounovitým terénem s důlky a hřebeny, a tenkou dusíkovou atmosférou, což z něj činí jeden z nejaktivnějších ledových měsíců ve vnější sluneční soustavě.",
    "Neptune-Nereid": "Nereid je třetí největší měsíc Neptuna, objevený Gerardem Kuiperem v roce 1949, a má nejexcentričtější oběžnou dráhu ze všech měsíců ve sluneční soustavě, sahající od 1,4 do 9,7 milionu kilometrů od Neptuna, trvá 360 dní dokončit jeden vysoce eliptický oběh. Jeho extrémní orbitální charakteristiky naznačují, že mohl být narušen z pravidelné oběžné dráhy zachycením Tritonu, nebo by mohl být zachycený asteroid nebo objekt Kuiperova pásu, který byl gravitačně narušen. Povrch měsíce je tmavý a pravděpodobně složen z vodního ledu smíchaného s tmavým materiálem, a velmi málo je známo o jeho fyzických charakteristikách kvůli jeho vzdálenosti a omezeným pozorováním z Voyageru 2.",
    "Neptune-Proteus": "Proteus je druhý největší měsíc Neptuna a největší nepravidelně tvarovaný měsíc ve sluneční soustavě, objevený Voyagerem 2 v roce 1989, s průměrem asi 420 kilometrů, ale nesférickým tvarem naznačujícím, že nedosáhl hydrostatické rovnováhy. Navzdory své velikosti nebyl objeven dříve, protože je velmi tmavý, odráží pouze asi 6% příchozího slunečního světla, a obíhá velmi blízko Neptuna, což ztěžuje pozorování ze Země. Povrch měsíce je silně kráterovaný bez známek geologické aktivity, a pravděpodobně je složen z vodního ledu smíchaného s tmavým, uhlíkatým materiálem, typicky pro objekty z vnější sluneční soustavy.",
    "Neptune-Larissa": "Larissa je jeden z vnitřních měsíců Neptuna, objevený Haroldem J. Reitsemou, Williamem B. Hubbardem, Larrym A. Lebofskym a Davidem J. Tholenem v roce 1981 prostřednictvím pozorování hvězdných zákrytů, a později potvrzený Voyagerem 2 v roce 1989. Má nepravidelný, nesférický tvar s průměrným průměrem asi 194 kilometrů, a její povrch je tmavý a silně kráterovaný, což naznačuje, že je složena z vodního ledu smíchaného s tmavým materiálem. Měsíc obíhá velmi blízko Neptuna, uvnitř systému prstenců planety, a stejně jako ostatní vnitřní měsíce je její oběžná dráha téměř kruhová a leží v rovníkové rovině Neptuna.",
    "Pluto-Charon": "Charon je největší měsíc Pluta a největší měsíc vzhledem ke svému mateřskému tělesu ve sluneční soustavě, s průměrem asi poloviny Pluta, což činí systém Pluto-Charon v podstatě dvojplanetou, kde oba objekty obíhají kolem společného těžiště umístěného mimo povrch Pluta. Měsíc je slapově uzamčen k Plutovi, což znamená, že obě tělesa vždy ukazují stejnou tvář k sobě, a povrch Charonu vykazuje důkazy vodního ledu a možná amoniakových hydrátů, s načervenalou severní polární oblastí pravděpodobně složenou z tholinů. Objev Charonu v roce 1978 umožnil vědcům přesně určit hmotnost a velikost Pluta, a měsíc mohl vzniknout z obřího dopadu na počátku historie sluneční soustavy, podobně jako Měsíc Země.",
    "Eris-Dysnomia": "Dysnomia je jediný známý měsíc trpasličí planety Eris, objevený v roce 2005 Mikem Brownem a týmem Laser Guide Star Adaptive Optics pomocí dalekohledů Keck, a je pojmenována po dceři Eris v řecké mytologii. Měsíc je mnohem menší než Eris, s odhadovaným průměrem asi 700 kilometrů, a obíhá Eris ve vzdálenosti asi 37 000 kilometrů, trvá mu přibližně 16 dní dokončit jeden oběh. Pozorování oběžné dráhy Dysnomie umožnila vědcům určit hmotnost Eris, odhalila, že je asi o 27% masivnější než Pluto, což byl klíčový faktor v překlasifikaci Pluta jako trpasličí planety.",
    "Makemake-MK 2": "MK 2, oficiálně označený S/2015 (136472) 1, je jediný známý měsíc trpasličí planety Makemake, objevený v roce 2016 Hubbleovým vesmírným dalekohledem, a je malý, tmavý měsíc s odhadovaným průměrem asi 175 kilometrů. Měsíc obíhá Makemake ve vzdálenosti nejméně 21 000 kilometrů, a jeho tmavý povrch, který odráží pouze asi 4% příchozího slunečního světla, ostře kontrastuje s jasným, ledovým povrchem Makemake. Objev MK 2 poskytuje důležité informace o hmotnosti Makemake a historii jeho formování, a jeho tmavý vzhled naznačuje, že může být pokryt uhlíkatým materiálem podobným mnoha objektům Kuiperova pásu.",
    "Haumea-Hi'iaka": "Hi'iaka je větší ze dvou známých měsíců Haumey, objevený v roce 2005 týmem Mika Browna, a je pojmenován po havajské bohyni tance a patronce Velkého ostrova Havaje. Měsíc má průměr asi 310 kilometrů a obíhá Haumeu ve vzdálenosti přibližně 49 500 kilometrů, dokončuje jeden oběh za asi 49 dní, a jeho povrch se zdá být pokryt vodním ledem. Oběžná dráha a charakteristiky Hi'iaky byly klíčové při určování hmotnosti Haumey a potvrzování neobvyklého protáhlého, elipsoidního tvaru trpasličí planety a rychlé rotace.",
    "Haumea-Namaka": "Namaka je menší, vnitřní měsíc Haumey, také objevený v roce 2005, a je pojmenován po havajském vodním duchu, dceři Haumey v havajské mytologii. Měsíc má odhadovaný průměr asi 170 kilometrů a obíhá Haumeu v bližší vzdálenosti než Hi'iaka, přibližně 25 657 kilometrů, dokončuje jeden oběh za asi 18 dní. Oběžná dráha Namaky je vysoce nakloněná a eliptická, a pozorování jejího orbitálního pohybu odhalila složité interakce s Hi'iakou, poskytující poznatky o neobvyklém tvaru Haumey a dynamice tohoto vzdáleného binárního systému.",
    "Quaoar-Weywot": "Weywot je jediný známý měsíc objektu Kuiperova pásu Quaoar, objevený v roce 2007 Michaelem Brownem pomocí Hubbleova vesmírného dalekohledu, a je pojmenován po nebeském bohu a synovi Quaoara v mytologii Tongva. Měsíc má odhadovaný průměr asi 170 kilometrů a obíhá Quaoar ve vzdálenosti přibližně 14 500 kilometrů, trvá mu asi 12 dní dokončit jeden oběh. Pozorování oběžné dráhy Weywota umožnila vědcům určit hmotnost Quaoara a odhalila překvapivý objev v roce 2023, že Quaoar má systém prstenců umístěný mimo Rocheovu mez, což zpochybňuje naše chápání formování prstenců.",
    "Orcus-Vanth": "Vanth je jediný známý měsíc kandidáta na trpasličí planetu Orcus, objevený v roce 2005 Mikem Brownem a jeho týmem pomocí Hubbleova vesmírného dalekohledu, a je neobvykle velký vzhledem k Orcu, tvořící asi 3% celkové hmotnosti systému. Měsíc má odhadovaný průměr asi 443 kilometrů, což z něj činí jeden z největších známých satelitů transneptunických objektů, a obíhá Orcus ve vzdálenosti přibližně 9 000 kilometrů, trvá mu asi 9,5 dne dokončit jeden oběh. Velká velikost Vanthu vzhledem k Orcu naznačuje, že mohl vzniknout z velké kolize, podobně jako Měsíc Země, a jeho oběžná dráha je téměř kruhová a zarovnaná s rovníkem Orcu.",
    "Gonggong-Xiangliu": "Xiangliu je jediný známý měsíc objektu rozptýleného disku Gonggong, objevený v roce 2016 týmem pomocí Hubbleova vesmírného dalekohledu, a je pojmenován po devítihlavé hadí příšeře z čínské mytologie, která sloužila vodnímu bohu Gonggongu. Měsíc má odhadovaný průměr asi 300 kilometrů a obíhá Gonggong ve vzdálenosti přibližně 24 000 kilometrů, trvá mu asi 25 dní dokončit jeden oběh v téměř kruhové dráze. Pozorování oběžné dráhy Xiangliu byla klíčová při určování hmotnosti Gonggongu, a objev měsíce poskytl důležité poznatky o formování a evoluci vzdálených objektů ve vnější sluneční soustavě.",
    "Salacia-Actaea": "Actaea je jediný známý měsíc transneptunického objektu Salacia, objevený v roce 2006 Keithem Nollem, Haroldem Levisonem, Denise Stephensovou a Wilem Grundym pomocí Hubbleova vesmírného dalekohledu, a je pojmenována po Nereidě (mořské nymfě) z řecké mytologie. Měsíc má odhadovaný průměr asi 303 kilometrů a obíhá Salacii ve vzdálenosti přibližně 5 619 kilometrů, dokončuje jeden oběh za asi 5,5 dne. Objev a orbitální pozorování Actaei umožnila vědcům určit hmotnost a hustotu Salacie, odhalila, že je relativně nízkohustotní objekt složený převážně z vodního ledu, typicky pro mnoho velkých objektů Kuiperova pásu.",
    "2007 OR10-S/2016 (225088) 1": "S/2016 (225088) 1 je jediný známý měsíc kandidáta na trpasličí planetu 2007 OR10, objevený v roce 2016 týmem vedeným Csabou Kissem pomocí Hubbleova vesmírného dalekohledu, a je malý měsíc s odhadovaným průměrem asi 237 kilometrů. Měsíc obíhá 2007 OR10 ve vzdálenosti nejméně 15 000 kilometrů, a jeho objev pomohl vědcům určit hmotnost objektu, potvrdil 2007 OR10 jako jeden z největších objektů v oblasti rozptýleného disku. Vlastnosti a orbitální charakteristiky měsíce poskytují důležité vodítka o formování a evoluci tohoto vzdáleného, načervenalého kandidáta na trpasličí planetu, který byl neoficiálně přezdíván 'Sněhurka' před získáním prozatímního označení.",
    "Earth-OREST": "OREST, toulavý satelit - rok objevu 2019 - putující satelit v chladném vesmíru, známý svou přitažlivostí k novému a neznámému. Malý satelit v obrovském neznámém vesmíru, který má celý svět před sebou. Takové malé satelity vždy připomínají, že před námi je vždy cesta, po které ještě nikdo nešel. Pro něj vesmír není ticho a temnota, ale nekonečný svět možností, které jen čekají, až budou objeveny.",
    "Earth-EMMA": "EMMA, elegantní satelit - rok objevu 2020 - v době, kdy se svět zastavil, přišla, aby ho oživila a dala barvy všední šedi. EMMA si proklestila vlastní stezku v temnotě - malou, ale významnou cestu, která připomíná: i v bezhraničném vesmíru je místo pro teplo a něhu. Symbol tichého znovuzrození a toho, že lidstvo je schopno upřímnosti.",
    "Mars-MAVEN": "MAVEN (Mars Atmosphere and Volatile EvolutioN) je kosmická sonda NASA obíhající kolem Marsu od roku 2014, která studuje horní atmosféru planety, ionosféru a interakce se Sluncem a slunečním větrem. Mise si klade za cíl pochopit, jak Mars ztratil svou atmosféru a vodu v průběhu času, což poskytuje klíčové poznatky o klimatické historii planety a potenciálu pro minulou obyvatelnost. Elipsovitá orbita MAVEN umožňuje sondě vzorkovat různé výšky marsovské atmosféry.",
    "Jupiter-JUNO": "JUNO je kosmická sonda NASA, která dorazila k Jupiteru v roce 2016, vstoupila na vysoce eliptickou polární orbitu, aby studovala složení plynného obra, gravitační pole, magnetické pole a polární magnetosféru. Mise odhalila úžasné detaily o Jupiterově atmosféře, včetně Velké rudé skvrny, a poskytla poznatky o formování a vývoji planety. Unikátní orbita JUNO umožňuje sondě vyhnout se intenzivním radiačním pásům Jupiteru při provádění blízkých pozorování.",
    "Saturn-Cassini–Huygens": "Cassini–Huygens byla společná mise NASA/ESA/ASI, která strávila 13 let studiem Saturnu, jeho prstenců a měsíců. Vypuštěna v roce 1997, Cassini vstoupila na orbitu kolem Saturnu v roce 2004 a prováděla převratná pozorování až do ukončení mise v roce 2017 záměrným ponořením do atmosféry Saturnu. Sonda Huygens úspěšně přistála na Titanu v roce 2005, stala se prvním kosmickým aparátem, který přistál na měsíci ve vnější sluneční soustavě. Vysoce eliptická orbita Cassini umožnila studovat magnetosféru Saturnu, prstence a četné měsíce, včetně objevení gejzírů na Enceladu a jezer na Titanu, což revolučně změnilo naše chápání saturnského systému."
  }
};
function getBodyInfo(bodyName) {
  return bodyDescriptions[currentLanguage]?.[bodyName] || bodyDescriptions['en'][bodyName] || "";
}
function getMoonInfo(planetName, moonName) {
  const key = `${planetName}-${moonName}`;
  return moonDescriptions[currentLanguage]?.[key] || moonDescriptions['en'][key] || "";
}
function t(key) {
  return translations[currentLanguage][key] || translations['en'][key] || key;
}
function updateLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('appLanguage', lang);
  updateUITexts();
  const card = document.getElementById('planetInfoCard');
  if (card && card.style.display === 'block' && currentPlanetIndex !== null) {
    const body = celestialBodies[currentPlanetIndex];
    showPlanetInfoCard(body, currentPlanetIndex);
  }
}
function updateUITexts() {
  const missionControl = document.querySelector('.control-header h3');
  if (missionControl) {
    missionControl.innerHTML = `${t('missionControl')} <span class="control-toggle-icon">►</span>`;
  }
  const speedLabel = document.querySelector('label[for="speedControl"]');
  if (speedLabel) speedLabel.textContent = t('speed');
  const bloomLabel = document.querySelector('label[for="bloomControl"]');
  if (bloomLabel) bloomLabel.textContent = t('bloom');
  const cameraControlLabel = document.querySelector('.control-group label');
  if (cameraControlLabel && cameraControlLabel.textContent.includes('Camera')) {
    cameraControlLabel.textContent = t('cameraControl');
  }
  const toggleLabel = document.querySelectorAll('.control-group label');
  toggleLabel.forEach(label => {
    if (label.textContent === 'Toggle') label.textContent = t('toggle');
    if (label.textContent === 'Asteroid Belts') label.textContent = t('asteroidBelts');
  });
  const pauseBtn = document.getElementById('pauseBtn');
  if (pauseBtn) pauseBtn.textContent = t('pause');
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) resetBtn.textContent = t('reset');
  const hideUIBtn = document.getElementById('hideUIBtn');
  if (hideUIBtn) hideUIBtn.textContent = t('hideUI');
  const showUIBtn = document.getElementById('showUIBtn');
  if (showUIBtn) showUIBtn.textContent = t('showUI');
  const stopFollowBtn = document.getElementById('stopFollowBtn');
  if (stopFollowBtn) stopFollowBtn.textContent = t('stopFollow');
  const orbitsBtn = document.getElementById('orbitsBtn');
  if (orbitsBtn) orbitsBtn.textContent = t('orbits');
  const spaceProbeOrbitsBtn = document.getElementById('spaceProbeOrbitsBtn');
  if (spaceProbeOrbitsBtn) spaceProbeOrbitsBtn.textContent = t('spaceProbeOrbits');
  
  // Update planet info card labels if card is visible
  const labels = document.querySelectorAll('.info-item-label');
  if (labels.length >= 4) {
    labels[0].textContent = t('orbitalPeriod');
    labels[1].textContent = t('sizeRelative');
    labels[2].textContent = t('distanceFromSun');
    labels[3].textContent = t('discoveryYear');
  }
  const moonsBtn = document.getElementById('moonsBtn');
  if (moonsBtn) moonsBtn.textContent = t('moons');
  const realAsteroidsBtn = document.getElementById('realAsteroidsBtn');
  if (realAsteroidsBtn) realAsteroidsBtn.textContent = t('realAsteroids');
  const cometsBtn = document.getElementById('cometsBtn');
  if (cometsBtn) cometsBtn.textContent = t('comets');
  const allAsteroidsBtn = document.getElementById('allAsteroidsBtn');
  if (allAsteroidsBtn) allAsteroidsBtn.textContent = t('allBelts');
  const mainAsteroidsBtn = document.getElementById('mainAsteroidsBtn');
  if (mainAsteroidsBtn) mainAsteroidsBtn.textContent = t('mainBelt');
  const trojansBtn = document.getElementById('trojansBtn');
  if (trojansBtn) trojansBtn.textContent = t('trojans');
  const kuiperBtn = document.getElementById('kuiperBtn');
  if (kuiperBtn) kuiperBtn.textContent = t('kuiper');
  const scatteredBtn = document.getElementById('scatteredBtn');
  if (scatteredBtn) scatteredBtn.textContent = t('scattered');
  const celestialHeader = document.querySelector('.celestial-header h4');
  if (celestialHeader) {
    celestialHeader.innerHTML = `${t('celestialBodies')} <span class="toggle-icon">►</span>`;
  }
  const labelToggle = document.getElementById('labelToggle');
  if (labelToggle) labelToggle.textContent = t('showPlanetNames');
  const moonLabelToggle = document.getElementById('moonLabelToggle');
  if (moonLabelToggle) moonLabelToggle.textContent = t('showMoonNames');
  updatePlanetList();
  setTimeout(() => {
    const followSunBtn = document.getElementById('followSunBtn');
    if (followSunBtn) {
      followSunBtn.textContent = t('followSun');
    }
  }, 50);
  const orbitalPeriodLabel = document.querySelector('#planetInfoCard .info-item-label');
  if (orbitalPeriodLabel) {
    const labels = document.querySelectorAll('#planetInfoCard .info-item-label');
    labels.forEach(label => {
      const text = label.textContent.trim();
      if (text === 'Orbital Period' || text === 'Орбітальний період') {
        label.textContent = t('orbitalPeriod');
      } else if (text === 'Size (Relative to Earth)' || text === 'Розмір (відносно Землі)') {
        label.textContent = t('sizeRelative');
      } else if (text === 'Distance from Sun' || text === 'Відстань від Сонця') {
        label.textContent = t('distanceFromSun');
      } else if (text === 'Discovery Year' || text === 'Рік відкриття') {
        label.textContent = t('discoveryYear');
      }
    });
    const followPlanetBtn = document.getElementById('followPlanetBtn');
    if (followPlanetBtn) {
      followPlanetBtn.textContent = t('followPlanet');
    }
    const moonsTitle = document.querySelector('#moonsSection h4');
    if (moonsTitle) {
      const count = document.getElementById('moonCount');
      const countText = count ? count.textContent : '0';
      moonsTitle.innerHTML = `${t('moons')} (<span id="moonCount">${countText}</span>)`;
    }
    // Update space probes section title
    const spaceProbesTitle = document.getElementById('spaceProbesTitle');
    if (spaceProbesTitle) {
      const probeCount = document.getElementById('spaceProbeCount');
      const probeCountText = probeCount ? probeCount.textContent : '0';
      spaceProbesTitle.innerHTML = `${t('spaceProbes')} (<span id="spaceProbeCount">${probeCountText}</span>)`;
    }
  }
}
// Global variables for orbit visibility
let showSpaceProbeOrbits = true;
const scene = new THREE.Scene();
// Set initial background color (will be replaced when texture loads)
scene.background = new THREE.Color(0x000814);
scene.fog = new THREE.Fog(0x000814, 180, 250);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.rotateSpeed = 0.3;
controls.zoomSpeed = 0.8;
controls.panSpeed = 0.5;

// Create unified loading manager for all resources
const loadingManager = new THREE.LoadingManager();
let totalItems = 0;
let loadedItems = 0;

// Update loading progress
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  loadedItems = itemsLoaded;
  totalItems = itemsTotal;
  const percentage = Math.round((itemsLoaded / itemsTotal) * 100);
  
  const loadingPercentage = document.getElementById('loadingPercentage');
  const loadingBar = document.getElementById('loadingBar');
  
  if (loadingPercentage) {
    loadingPercentage.textContent = percentage + '%';
  }
  if (loadingBar) {
    loadingBar.style.width = percentage + '%';
  }
};

// Hide loading screen when all resources are loaded
loadingManager.onLoad = () => {
  console.log("All resources loaded!");
  // Wait a bit to ensure everything is ready, then hide loading screen
  setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      // Remove from DOM after animation completes
      setTimeout(() => {
        if (loadingScreen.parentNode) {
          loadingScreen.parentNode.removeChild(loadingScreen);
        }
      }, 500);
    }
  }, 300);
};

loadingManager.onError = (url) => {
  console.error("Error loading resource:", url);
};

const loader = new THREE.TextureLoader(loadingManager);
const ambientLight = new THREE.AmbientLight(new THREE.Color(0.13, 0.13, 0.13), 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(new THREE.Color(1.0, 1.0, 1.0), 10.0, 1000, 0.5);
pointLight.position.set(0, 0, 0);
pointLight.castShadow = false;
scene.add(pointLight);
const fillLight = new THREE.PointLight(new THREE.Color(0.2, 0.4, 1.0), 2.0, 100, 1);
fillLight.position.set(50, 50, -100);
scene.add(fillLight);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: loader.load(`${BASE_URL}textures/sun.jpg`),
  emissive: new THREE.Color(1.5, 1.2, 0.8),
  emissiveIntensity: 1.8,
  toneMapped: false,
  color: new THREE.Color(1.2, 1.1, 0.9)
});
const sun = new THREE.Mesh(new THREE.SphereGeometry(5, 64, 64), sunMaterial);
scene.add(sun);
const textureLoader = new THREE.TextureLoader(loadingManager);
const textureFlare0 = textureLoader.load(`${BASE_URL}textures/lensflare0.png`);
const textureFlare2 = textureLoader.load(`${BASE_URL}textures/lensflare2.png`);
const lensflare = new Lensflare();
lensflare.addElement(new LensflareElement(textureFlare0, 512, 0, new THREE.Color(1, 0.9, 0.8)));
lensflare.addElement(new LensflareElement(textureFlare2, 128, 0.2, new THREE.Color(1, 1, 0.6)));
lensflare.addElement(new LensflareElement(textureFlare2, 64, 0.4, new THREE.Color(0.8, 0.8, 1)));
lensflare.addElement(new LensflareElement(textureFlare2, 32, 0.6, new THREE.Color(1, 0.8, 0.6)));
sun.add(lensflare);
async function fetchAsteroidOrbitalElements(designation = 'Ceres') {
  const url = `https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=${designation}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.orb) {
      const orb = data.orb;
      return {
        a: parseFloat(orb.a),
        e: parseFloat(orb.e),
        i: parseFloat(orb.i),
        om: parseFloat(orb.om),
        w: parseFloat(orb.w),
        ma: parseFloat(orb.ma)
      };
    }
  } catch (err) {
    console.error('Asteroid API error:', err);
  }
  return null;
}
function keplerToCartesian(orb, epochJD = 2460000) {
  const DEG2RAD = Math.PI / 180;
  const a = orb.a;
  const e = orb.e;
  const i = orb.i * DEG2RAD;
  const om = orb.om * DEG2RAD;
  const w = orb.w * DEG2RAD;
  let M = orb.ma * DEG2RAD;
  let E = M;
  for (let j = 0; j < 10; j++) {
    E = M + e * Math.sin(E);
  }
  const nu = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));
  const r = a * (1 - e * Math.cos(E));
  const x_orb = r * Math.cos(nu);
  const y_orb = r * Math.sin(nu);
  const x = x_orb * (Math.cos(w) * Math.cos(om) - Math.sin(w) * Math.sin(om) * Math.cos(i)) - y_orb * (Math.sin(w) * Math.cos(om) + Math.cos(w) * Math.sin(om) * Math.cos(i));
  const y = x_orb * (Math.cos(w) * Math.sin(om) + Math.sin(w) * Math.cos(om) * Math.cos(i)) + y_orb * (Math.cos(w) * Math.cos(om) * Math.cos(i) - Math.sin(w) * Math.sin(om));
  const z = x_orb * Math.sin(w) * Math.sin(i) + y_orb * Math.cos(w) * Math.sin(i);
  return { x, y, z };
}

// Calculate position on elliptical orbit (simplified 2D elliptical orbit)
function calculateEllipticalOrbit(orbit, meanAnomaly) {
  const a = orbit.semiMajorAxis;
  const e = orbit.eccentricity;
  const w = orbit.argumentOfPeriapsis || 0;
  const i = orbit.inclination || 0;
  
  // Solve Kepler's equation for eccentric anomaly
  let E = meanAnomaly;
  for (let j = 0; j < 10; j++) {
    E = meanAnomaly + e * Math.sin(E);
  }
  
  // Calculate true anomaly
  const nu = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));
  
  // Calculate distance from center
  const r = a * (1 - e * e) / (1 + e * Math.cos(nu));
  
  // Calculate position in orbital plane
  const x_orb = r * Math.cos(nu + w);
  const y_orb = r * Math.sin(nu + w);
  
  // Apply inclination (rotate around x-axis)
  const x = x_orb;
  const y = y_orb * Math.cos(i);
  const z = y_orb * Math.sin(i);
  
  return { x, y, z };
}
async function fetchNEOs() {
  const url = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${NASA_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.near_earth_objects || [];
  } catch (err) {
    console.error('NEO API error:', err);
    return [];
  }
}
async function fetchSentryObjects() {
  const url = 'https://ssd-api.jpl.nasa.gov/sentry.api';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data || [];
  } catch (err) {
    console.error('Sentry API error:', err);
    return [];
  }
}
async function fetchComets() {
  const url = 'https://ssd-api.jpl.nasa.gov/cad.api?body=COM';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data || [];
  } catch (err) {
    console.error('Comet API error:', err);
    return [];
  }
}
async function fetchFamousAsteroids() {
  const famousAsteroids = [
    'Apophis',      
    'Bennu',        
    'Ryugu',        
    'Didymos',      
    'Dimorphos',    
    'Itokawa',      
    'Psyche',       
    'Vesta',        
    'Ceres',        
    'Pallas',       
    'Hygiea',       
    'Eros',         
    'Gaspra',       
    'Ida',          
    'Mathilde',     
    'Steins',       
    'Lutetia',      
    'Dinkinesh',    
    'Toutatis',     
    'Florence',     
    'Icarus',       
    'Geographos',   
    'Castalia',     
    'Toro',         
    'Amor',         
    'Apollo',       
    'Anteros',      
    'Ganymed',      
    'Ivar',         
    'Daphne',       
    'Europa',       
    'Davida',       
    'Interamnia',   
    'Hebe',         
    'Iris',         
    'Flora',        
    'Metis',        
    'Parthenope',   
    'Eunomia',      
    'Juno',         
    'Astraea',      
    'Thisbe',       
    'Cybele',       
    'Herculina',    
    'Sylvia',       
    'Patroclus',    
    'Hektor',       
    'Euphrosyne',   
    'Fortuna',      
    'Massalia',     
    'Lutetia',      
    'Kleopatra',    
    'Dactyl',       
    'Linus',        
    'Eurybates',    
    'Polymele',     
    'Leucus',       
    'Orus',         
    'Donaldjohanson' 
  ];
  const asteroidData = [];
  for (const asteroid of famousAsteroids) {
    try {
      const orb = await fetchAsteroidOrbitalElements(asteroid);
      if (orb) {
        asteroidData.push({ name: asteroid, orb: orb });
      }
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch (error) {
      console.error(`Error fetching ${asteroid}:`, error);
    }
  }
  return asteroidData;
}
const realAsteroids = [];
const cometObjects = [];
const famousAsteroids = [];
async function addRealAsteroids() {
  try {
    const famousData = await fetchFamousAsteroids();
    console.log(`Fetched ${famousData.length} famous asteroids`);
    for (const data of famousData) {
      const pos = keplerToCartesian(data.orb);
      const AU_TO_SCENE = 15;
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.2 + Math.random() * 0.1, 12, 12),
        new THREE.MeshStandardMaterial({ 
          color: 0x00ff00, 
          emissive: 0x003300
        })
      );
      mesh.position.set(pos.x * AU_TO_SCENE, pos.y * AU_TO_SCENE, pos.z * AU_TO_SCENE);
      mesh.userData = { type: 'famous', name: data.name, data: data };
      scene.add(mesh);
      famousAsteroids.push(mesh);
      const orbitPoints = [];
      for (let i = 0; i <= 100; i++) {
        const angle = (i / 100) * Math.PI * 2;
        const fakeOrb = { ...data.orb, ma: angle * 180 / Math.PI };
        const orbitPos = keplerToCartesian(fakeOrb);
        orbitPoints.push(new THREE.Vector3(
          orbitPos.x * AU_TO_SCENE,
          orbitPos.y * AU_TO_SCENE,
          orbitPos.z * AU_TO_SCENE
        ));
      }
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00ff00,
        transparent: true,
        opacity: 0.3
      });
      const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
      scene.add(orbitLine);
    }
    const neoObjects = await fetchNEOs();
    console.log(`Fetched ${neoObjects.length} NEOs`);
    for (let i = 0; i < Math.min(30, neoObjects.length); i++) {
      const neo = neoObjects[i];
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.15 + Math.random() * 0.1, 8, 8),
        new THREE.MeshStandardMaterial({ 
          color: 0xff5555, 
          emissive: 0x330000
        })
      );
      mesh.userData = { type: 'neo', data: neo };
      scene.add(mesh);
      realAsteroids.push(mesh);
    }
    const sentryObjects = await fetchSentryObjects();
    console.log(`Fetched ${sentryObjects.length} Sentry objects`);
    for (let i = 0; i < Math.min(20, sentryObjects.length); i++) {
      const obj = sentryObjects[i];
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.18 + Math.random() * 0.1, 8, 8),
        new THREE.MeshStandardMaterial({ 
          color: 0xffaa00, 
          emissive: 0x332200
        })
      );
      mesh.userData = { type: 'sentry', data: obj };
      scene.add(mesh);
      realAsteroids.push(mesh);
    }
  } catch (error) {
    console.error('Error adding real asteroids:', error);
  }
}
async function addComets() {
  try {
    const comets = await fetchComets();
    console.log(`Fetched ${comets.length} comets`);
    for (let i = 0; i < Math.min(15, comets.length); i++) {
      const comet = comets[i];
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 8, 8),
        new THREE.MeshStandardMaterial({ 
          color: 0x55aaff, 
          emissive: 0x002233
        })
      );
      const tailGeometry = new THREE.ConeGeometry(0.08, 3, 8);
      const tailMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x88ccff,
        transparent: true,
        opacity: 0.7
      });
      const tail = new THREE.Mesh(tailGeometry, tailMaterial);
      tail.rotation.z = Math.PI;
      tail.position.x = -1.5;
      mesh.add(tail);
      const distance = 30 + Math.random() * 40;
      const angle = Math.random() * Math.PI * 2;
      mesh.position.set(
        Math.cos(angle) * distance,
        (Math.random() - 0.5) * 10,
        Math.sin(angle) * distance
      );
      mesh.userData = { type: 'comet', data: comet };
      scene.add(mesh);
      cometObjects.push(mesh);
    }
  } catch (error) {
    console.error('Error adding comets:', error);
  }
}
const asteroidBelts = {
  main: [],
  inner: [],      
  outer: [],      
  middle: [],     
  trojans: [],
  kuiper: [],
  scattered: [],
  oort: []        
};
function createEnhancedAsteroidBelt() {
  const innerCount = 150;
  const innerInnerRadius = 19.5;
  const innerOuterRadius = 21.5;
  for (let i = 0; i < innerCount; i++) {
    const angle = (i / innerCount) * Math.PI * 2 + Math.random() * 0.5;
    const radius = innerInnerRadius + Math.random() * (innerOuterRadius - innerInnerRadius);
    const size = 0.01 + Math.random() * 0.06;
    const asteroidType = Math.random();
    let color;
    if (asteroidType < 0.5) {
      color = new THREE.Color(0.4, 0.26, 0.13); 
    } else if (asteroidType < 0.8) {
      color = new THREE.Color(0.6, 0.6, 0.6); 
    } else {
      color = new THREE.Color(0.5, 0.4, 0.3); 
    }
    const asteroidGeo = new THREE.SphereGeometry(size, 6, 6);
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: color,
      emissive: color.clone().multiplyScalar(0.1),
      emissiveIntensity: 0.15,
      roughness: 1.0,
      metalness: asteroidType > 0.8 ? 0.3 : 0.1,
      toneMapped: false
    });
    const asteroid = new THREE.Mesh(asteroidGeo, asteroidMat);
    asteroid.position.x = Math.cos(angle) * radius;
    asteroid.position.z = Math.sin(angle) * radius;
    asteroid.position.y = (Math.random() - 0.5) * 0.8;
    asteroid.rotation.x = Math.random() * Math.PI;
    asteroid.rotation.y = Math.random() * Math.PI;
    asteroid.rotation.z = Math.random() * Math.PI;
    scene.add(asteroid);
    asteroidBelts.inner.push({
      mesh: asteroid,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      },
      orbitSpeed: 0.003 + Math.random() * 0.002,
      radius: radius,
      angle: angle,
      type: 'inner-belt'
    });
  }
  const middleCount = 200;
  const middleInnerRadius = 21.5;
  const middleOuterRadius = 23.5;
  for (let i = 0; i < middleCount; i++) {
    const angle = (i / middleCount) * Math.PI * 2 + Math.random() * 0.5;
    const radius = middleInnerRadius + Math.random() * (middleOuterRadius - middleInnerRadius);
    const size = 0.01 + Math.random() * 0.07;
    const asteroidType = Math.random();
    let color;
    if (asteroidType < 0.4) {
      color = new THREE.Color(0.4, 0.26, 0.13);
    } else if (asteroidType < 0.75) {
      color = new THREE.Color(0.6, 0.6, 0.6);
    } else {
      color = new THREE.Color(0.5, 0.4, 0.3);
    }
    const asteroidGeo = new THREE.SphereGeometry(size, 6, 6);
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: color,
      emissive: color.clone().multiplyScalar(0.12),
      emissiveIntensity: 0.18,
      roughness: 1.0,
      metalness: asteroidType > 0.75 ? 0.3 : 0.1,
      toneMapped: false
    });
    const asteroid = new THREE.Mesh(asteroidGeo, asteroidMat);
    asteroid.position.x = Math.cos(angle) * radius;
    asteroid.position.z = Math.sin(angle) * radius;
    asteroid.position.y = (Math.random() - 0.5) * 1.0;
    asteroid.rotation.x = Math.random() * Math.PI;
    asteroid.rotation.y = Math.random() * Math.PI;
    asteroid.rotation.z = Math.random() * Math.PI;
    scene.add(asteroid);
    asteroidBelts.middle.push({
      mesh: asteroid,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      },
      orbitSpeed: 0.0025 + Math.random() * 0.002,
      radius: radius,
      angle: angle,
      type: 'middle-belt'
    });
  }
  const outerCount = 150;
  const outerInnerRadius = 23.5;
  const outerOuterRadius = 25.5;
  for (let i = 0; i < outerCount; i++) {
    const angle = (i / outerCount) * Math.PI * 2 + Math.random() * 0.5;
    const radius = outerInnerRadius + Math.random() * (outerOuterRadius - outerInnerRadius);
    const size = 0.01 + Math.random() * 0.08;
    const asteroidType = Math.random();
    let color;
    if (asteroidType < 0.3) {
      color = new THREE.Color(0.4, 0.26, 0.13);
    } else if (asteroidType < 0.7) {
      color = new THREE.Color(0.6, 0.6, 0.6);
    } else {
      color = new THREE.Color(0.5, 0.4, 0.3);
    }
    const asteroidGeo = new THREE.SphereGeometry(size, 6, 6);
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: color,
      emissive: color.clone().multiplyScalar(0.1),
      emissiveIntensity: 0.2,
      roughness: 1.0,
      metalness: asteroidType > 0.7 ? 0.3 : 0.1,
      toneMapped: false
    });
    const asteroid = new THREE.Mesh(asteroidGeo, asteroidMat);
    asteroid.position.x = Math.cos(angle) * radius;
    asteroid.position.z = Math.sin(angle) * radius;
    asteroid.position.y = (Math.random() - 0.5) * 1.2;
    asteroid.rotation.x = Math.random() * Math.PI;
    asteroid.rotation.y = Math.random() * Math.PI;
    asteroid.rotation.z = Math.random() * Math.PI;
    scene.add(asteroid);
    asteroidBelts.outer.push({
      mesh: asteroid,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      },
      orbitSpeed: 0.002 + Math.random() * 0.0015,
      radius: radius,
      angle: angle,
      type: 'outer-belt'
    });
  }
}
function createJupiterTrojans() {
  const asteroidCount = 100;
  const jupiterDistance = 25;
  for (let i = 0; i < asteroidCount / 2; i++) {
    const baseAngle = Math.PI / 3;
    const angle = baseAngle + (Math.random() - 0.5) * 1.0;
    const radius = jupiterDistance + (Math.random() - 0.5) * 4;
    const size = 0.02 + Math.random() * 0.05;
    const asteroidGeo = new THREE.SphereGeometry(size, 6, 6);
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0.35, 0.25, 0.15),
      emissive: new THREE.Color(0.15, 0.1, 0.05),
      emissiveIntensity: 0.2,
      roughness: 1.0,
      metalness: 0.05,
      toneMapped: false
    });
    const asteroid = new THREE.Mesh(asteroidGeo, asteroidMat);
    asteroid.position.x = Math.cos(angle) * radius;
    asteroid.position.z = Math.sin(angle) * radius;
    asteroid.position.y = (Math.random() - 0.5) * 1.0;
    scene.add(asteroid);
    asteroidBelts.trojans.push({
      mesh: asteroid,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.015
      },
      orbitSpeed: 0.000084,
      radius: radius,
      angle: angle,
      type: 'trojan-l4'
    });
  }
  for (let i = 0; i < asteroidCount / 2; i++) {
    const baseAngle = -Math.PI / 3;
    const angle = baseAngle + (Math.random() - 0.5) * 1.0;
    const radius = jupiterDistance + (Math.random() - 0.5) * 4;
    const size = 0.02 + Math.random() * 0.05;
    const asteroidGeo = new THREE.SphereGeometry(size, 6, 6);
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0.35, 0.25, 0.15),
      emissive: new THREE.Color(0.15, 0.1, 0.05),
      emissiveIntensity: 0.2,
      roughness: 1.0,
      metalness: 0.05,
      toneMapped: false
    });
    const asteroid = new THREE.Mesh(asteroidGeo, asteroidMat);
    asteroid.position.x = Math.cos(angle) * radius;
    asteroid.position.z = Math.sin(angle) * radius;
    asteroid.position.y = (Math.random() - 0.5) * 1.0;
    scene.add(asteroid);
    asteroidBelts.trojans.push({
      mesh: asteroid,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.015
      },
      orbitSpeed: 0.000084,
      radius: radius,
      angle: angle,
      type: 'trojan-l5'
    });
  }
}
function createKuiperBelt() {
  const asteroidCount = 200;
  const innerRadius = 44;
  const outerRadius = 58;
  for (let i = 0; i < asteroidCount; i++) {
    const angle = (i / asteroidCount) * Math.PI * 2 + Math.random() * 1.0;
    const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
    const size = 0.03 + Math.random() * 0.08;
    const asteroidType = Math.random();
    let color;
    if (asteroidType < 0.3) {
      color = new THREE.Color(0.6, 0.7, 0.8); 
    } else if (asteroidType < 0.6) {
      color = new THREE.Color(0.5, 0.4, 0.3); 
    } else {
      color = new THREE.Color(0.7, 0.5, 0.4); 
    }
    const asteroidGeo = new THREE.SphereGeometry(size, 6, 6);
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: color,
      emissive: color.clone().multiplyScalar(0.2),
      emissiveIntensity: 0.4,
      roughness: 0.9,
      metalness: 0.05,
      toneMapped: false
    });
    const asteroid = new THREE.Mesh(asteroidGeo, asteroidMat);
    asteroid.position.x = Math.cos(angle) * radius;
    asteroid.position.z = Math.sin(angle) * radius;
    asteroid.position.y = (Math.random() - 0.5) * 3.0;
    asteroid.rotation.x = Math.random() * Math.PI;
    asteroid.rotation.y = Math.random() * Math.PI;
    asteroid.rotation.z = Math.random() * Math.PI;
    scene.add(asteroid);
    asteroidBelts.kuiper.push({
      mesh: asteroid,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      },
      orbitSpeed: 0.0000015 + Math.random() * 0.000002,
      radius: radius,
      angle: angle,
      type: 'kuiper'
    });
  }
}
function createScatteredDisk() {
  const asteroidCount = 80;
  const innerRadius = 58;
  const outerRadius = 80;
  for (let i = 0; i < asteroidCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
    const size = 0.04 + Math.random() * 0.1;
    const color = new THREE.Color(0.6, 0.3, 0.2);
    const asteroidGeo = new THREE.SphereGeometry(size, 6, 6);
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: color,
      emissive: color.clone().multiplyScalar(0.25),
      emissiveIntensity: 0.5,
      roughness: 1.0,
      metalness: 0.02,
      toneMapped: false
    });
    const asteroid = new THREE.Mesh(asteroidGeo, asteroidMat);
    asteroid.position.x = Math.cos(angle) * radius;
    asteroid.position.z = Math.sin(angle) * radius;
    asteroid.position.y = (Math.random() - 0.5) * 10.0;
    asteroid.rotation.x = Math.random() * Math.PI;
    asteroid.rotation.y = Math.random() * Math.PI;
    asteroid.rotation.z = Math.random() * Math.PI;
    scene.add(asteroid);
    asteroidBelts.scattered.push({
      mesh: asteroid,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.008,
        z: (Math.random() - 0.5) * 0.008
      },
      orbitSpeed: 0.0000008 + Math.random() * 0.000001,
      radius: radius,
      angle: angle,
      type: 'scattered'
    });
  }
}
function createOortCloud() {
  const asteroidCount = 50;
  const innerRadius = 80;
  const outerRadius = 120;
  for (let i = 0; i < asteroidCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
    const size = 0.05 + Math.random() * 0.12;
    const color = new THREE.Color(0.8, 0.6, 0.9); 
    const asteroidGeo = new THREE.SphereGeometry(size, 6, 6);
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: color,
      emissive: color.clone().multiplyScalar(0.3),
      emissiveIntensity: 0.6,
      roughness: 1.0,
      metalness: 0.01,
      toneMapped: false
    });
    const asteroid = new THREE.Mesh(asteroidGeo, asteroidMat);
    asteroid.position.x = Math.cos(angle) * radius;
    asteroid.position.z = Math.sin(angle) * radius;
    asteroid.position.y = (Math.random() - 0.5) * 20.0;
    asteroid.rotation.x = Math.random() * Math.PI;
    asteroid.rotation.y = Math.random() * Math.PI;
    asteroid.rotation.z = Math.random() * Math.PI;
    scene.add(asteroid);
    asteroidBelts.oort.push({
      mesh: asteroid,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.005
      },
      orbitSpeed: 0.0000003 + Math.random() * 0.0000005,
      radius: radius,
      angle: angle,
      type: 'oort'
    });
  }
}
createEnhancedAsteroidBelt();
createJupiterTrojans();
createKuiperBelt();
createScatteredDisk();
createOortCloud();
const celestialBodies = [
  {
    name: "Sun",
    size: 5,
    dist: 0,
    speed: 0,
    initialAngle: 0,
    texture: "sun.jpg",
    roughness: 0.0,
    metalness: 0.0,
    type: "star",
    info: "The star at the center of our Solar System. A G-type main-sequence star (G2V) that formed approximately 4.6 billion years ago. Contains 99.86% of the Solar System's mass. Surface temperature: 5,778 K. Core temperature: ~15 million K. Rotates around the galactic center in ~225-250 million years.",
    discoveryYear: "Ancient",
    realAU: 0,
    orbitalPeriodDays: null,
    sizeRelativeEarth: 109.2,
    moons: []
  },
  {
    name: "Mercury",
    size: 0.5,
    dist: 8,
    speed: 0.0041,
    initialAngle: 2.1,
    texture: "mercury.jpg",
    roughness: 1, 
    metalness: 0.02,
    type: "planet",
    info: "Closest planet to the Sun. Surface temperatures range from -173°C to 427°C. Has no atmosphere and no moons. Orbital period: 87.97 days (sidereal).",
    discoveryYear: "Ancient",
    realAU: 0.39,
    orbitalPeriodDays: 87.97,
    moons: []
  },
  {
    name: "Venus",
    size: 0.9,
    dist: 11,
    speed: 0.0016,
    initialAngle: 4.8,
    texture: "venus.jpg",
    roughness: 0.6,
    metalness: 0.05,
    type: "planet",
    info: "Hottest planet in our solar system with surface temperatures of 462°C. Has a thick, toxic atmosphere of carbon dioxide. Orbital period: 224.7 days (sidereal).",
    discoveryYear: "Ancient",
    realAU: 0.72,
    orbitalPeriodDays: 224.7,
    moons: []
  },
  {
    name: "Earth",
    size: 1,
    dist: 15,
    speed: 0.001,
    initialAngle: 3.45,
    texture: "earth.jpg",
    roughness: 0.5, 
    metalness: 0.01,
    type: "planet",
    info: "The only known planet with life. 71% of surface covered by water. Has one natural satellite. Orbital period: 365.256 days (sidereal).",
    discoveryYear: "N/A",
    realAU: 1.0,
    orbitalPeriodDays: 365.256,
    spaceProbes: [
      {
        name: "OREST",
        modelPath: "emu_spacesuit.glb",
        size: 0.05775,
        // Circular orbit around Moon
        orbit: {
          semiMajorAxis: 0.35, // Distance in planet radii (Moon orbit radius)
          eccentricity: 0.0, // Circular orbit
          inclination: 0.0,
          argumentOfPeriapsis: 0,
          meanAnomaly: 0,
          orbitalPeriod: 0.0001 // Very slow orbit
        },
        color: new THREE.Color(1.0, 1.0, 1.0),
        info: "OREST, the wandering satellite - discovery year 2019 - a traveling satellite in the cold cosmos, known for its attraction to the new and unknown."
      },
      {
        name: "EMMA",
        modelPath: "emu_spacesuit.glb",
        size: 0.05775,
        // Circular orbit around Moon
        orbit: {
          semiMajorAxis: 0.35, // Distance in planet radii (Moon orbit radius)
          eccentricity: 0.0, // Circular orbit
          inclination: 0.0,
          argumentOfPeriapsis: 0,
          meanAnomaly: Math.PI / 3, // Start at different angle
          orbitalPeriod: 0.0001 // Very slow orbit
        },
        color: new THREE.Color(1.0, 1.0, 1.0),
        info: "EMMA, the elegant satellite - discovery year 2020 - at a time when the world stopped, she came to revive it and give colors to everyday grayness."
      }
    ],
    moons: [
      { 
        name: "Moon", 
        size: 0.2835, 
        dist: 2.5, 
        speed: 0.037, 
        color: new THREE.Color(0.53, 0.53, 0.53), 
        info: "Earth's only natural satellite. Formed 4.5 billion years ago.", 
        initialAngle: 1.2
      }
    ]
  },
  {
    name: "Mars",
    size: 0.8,
    dist: 19,
    speed: 0.00053,
    initialAngle: 0.9,
    texture: "mars.jpg",
    roughness: 0.75,
    metalness: 0.02,
    type: "planet",
    info: "The Red Planet. Has the largest volcano (Olympus Mons) and canyon (Valles Marineris) in the solar system. Orbital period: 686.98 days (1.88 years, sidereal).",
    discoveryYear: "Ancient",
    realAU: 1.52,
    orbitalPeriodDays: 686.98,
    moons: [
      { name: "Phobos", size: 0.05, dist: 1.5, speed: 0.32, color: new THREE.Color(0.4, 0.26, 0.13), info: "Largest moon of Mars. Orbits Mars 3 times per day.", initialAngle: 0.5 },
      { name: "Deimos", size: 0.03, dist: 2.2, speed: 0.08, color: new THREE.Color(0.4, 0.26, 0.13), info: "Smaller, outer moon of Mars. Takes 30 hours to orbit Mars.", initialAngle: 2.1 }
    ],
    spaceProbes: [
      {
        name: "MAVEN",
        modelPath: "Mars Atmosphere and Volatile EvolutioN (MAVEN) (A).glb",
        size: 0.0693, // Increased by 20% (0.05775 * 1.2)
        // Elliptical orbit parameters (semi-major axis in planet radii, eccentricity, inclination, etc.)
        orbit: {
          semiMajorAxis: 1.5, // Average distance in planet radii
          eccentricity: 0.3, // Elliptical orbit
          inclination: 0.1, // Slight inclination in radians
          argumentOfPeriapsis: 0, // Argument of periapsis
          meanAnomaly: 0, // Starting position
          orbitalPeriod: 4.5 // Hours (MAVEN's orbital period)
        },
        color: new THREE.Color(0.8, 0.8, 0.9),
        info: "Mars Atmosphere and Volatile EvolutioN mission studying Mars' upper atmosphere."
      }
    ]
  },
  {
    name: "Vesta",
    size: 0.15,
    dist: 20.5,
    speed: 0.00029,
    initialAngle: 5.2,
    color: new THREE.Color(0.8, 0.8, 0.8),
    roughness: 1.0,
    metalness: 0.1,
    type: "asteroid",
    info: "Second-largest asteroid. Has a differentiated interior with basaltic surface. Visited by Dawn spacecraft. Orbital period: 3.63 years (1,325 days, sidereal).",
    discoveryYear: "1807",
    realAU: 2.36,
    orbitalPeriodDays: 1325,
    moons: []
  },
  {
    name: "Pallas",
    size: 0.12,
    dist: 21.2,
    speed: 0.00022,
    initialAngle: 1.8,
    color: new THREE.Color(0.67, 0.67, 0.67),
    roughness: 1.0,
    metalness: 0.05,
    type: "asteroid",
    info: "Third-largest asteroid. Highly inclined orbit. Possibly a protoplanet. Orbital period: 4.62 years (1,687 days, sidereal).",
    discoveryYear: "1802",
    realAU: 2.77,
    orbitalPeriodDays: 1687,
    moons: []
  },
  {
    name: "Jupiter",
    size: 2,
    dist: 25,
    speed: 0.000084,
    initialAngle: 2.7,
    texture: "jupiter.jpg",
    roughness: 0.9,
    metalness: 0.0,
    type: "planet",
    info: "Largest planet in our solar system. Great Red Spot is a storm larger than Earth. Has 95 known moons. Orbital period: 11.86 years (sidereal).",
    discoveryYear: "Ancient",
    realAU: 5.2,
    orbitalPeriodDays: 4332.59,
    spaceProbes: [
      {
        name: "JUNO",
        modelPath: "Juno.glb",
        size: 0.07623, // Increased by 20% + 10% (0.05775 * 1.2 * 1.1)
        // Elliptical orbit parameters
        orbit: {
          semiMajorAxis: 3.5, // Average distance in planet radii (increased to avoid collision with planet)
          eccentricity: 0.4, // Highly elliptical orbit
          inclination: 0.05, // Slight inclination
          argumentOfPeriapsis: 0,
          meanAnomaly: 0,
          orbitalPeriod: 14 // Days (JUNO's orbital period)
        },
        color: new THREE.Color(0.9, 0.9, 0.95),
        info: "JUNO mission studying Jupiter's composition, gravity field, magnetic field, and polar magnetosphere."
      }
    ],
    moons: [
      { name: "Io", size: 0.15, dist: 3.5, speed: 0.56, color: new THREE.Color(1.0, 1.0, 0.6), info: "Most volcanically active body in the solar system.", initialAngle: 0.8 },
      { name: "Europa", size: 0.13, dist: 4.2, speed: 0.28, color: new THREE.Color(0.53, 0.81, 0.92), info: "Ice-covered moon with subsurface ocean. Potential for life.", initialAngle: 1.5 },
      { name: "Ganymede", size: 0.22, dist: 5.1, speed: 0.14, color: new THREE.Color(0.55, 0.49, 0.42), info: "Largest moon in the solar system. Has its own magnetic field.", initialAngle: 3.2 },
      { name: "Callisto", size: 0.20, dist: 6.0, speed: 0.06, color: new THREE.Color(0.41, 0.41, 0.41), info: "Most heavily cratered body in the solar system.", initialAngle: 4.9 },
      { name: "Amalthea", size: 0.08, dist: 2.8, speed: 2.0, color: new THREE.Color(0.6, 0.4, 0.2), info: "Fifth largest moon of Jupiter. Irregular potato shape.", initialAngle: 5.2 },
      { name: "Himalia", size: 0.05, dist: 7.5, speed: 0.013, color: new THREE.Color(0.5, 0.5, 0.5), info: "Largest irregular moon of Jupiter.", initialAngle: 2.1 },
      { name: "Lysithea", size: 0.02, dist: 8.2, speed: 0.010, color: new THREE.Color(0.4, 0.4, 0.4), info: "Small irregular moon in Jupiter's prograde group.", initialAngle: 4.7 },
      { name: "Elara", size: 0.03, dist: 8.0, speed: 0.011, color: new THREE.Color(0.45, 0.45, 0.45), info: "Irregular moon discovered in 1905.", initialAngle: 1.8 }
    ]
  },
  {
    name: "Saturn",
    size: 1.7,
    dist: 31,
    speed: 0.000034,
    initialAngle: 5.8,
    texture: "saturn.jpg",
    hasRings: true,
    roughness: 0.9,
    metalness: 0.0,
    type: "planet",
    info: "Famous for its prominent ring system. Less dense than water. Has 146 known moons. Orbital period: 29.46 years (sidereal).",
    discoveryYear: "Ancient",
    realAU: 9.58,
    orbitalPeriodDays: 10759.22,
    moons: [
      { name: "Mimas", size: 0.06, dist: 2.8, speed: 1.05, color: new THREE.Color(0.7, 0.7, 0.7), info: "Death Star-like appearance with giant Herschel crater.", initialAngle: 0.9 },
      { name: "Enceladus", size: 0.08, dist: 3.2, speed: 0.73, color: new THREE.Color(0.94, 0.97, 1.0), info: "Ice geysers from south pole. Subsurface ocean.", initialAngle: 4.1 },
      { name: "Tethys", size: 0.09, dist: 3.7, speed: 0.52, color: new THREE.Color(0.8, 0.8, 0.85), info: "Heavily cratered icy moon with large Odysseus crater.", initialAngle: 2.7 },
      { name: "Dione", size: 0.09, dist: 4.1, speed: 0.37, color: new THREE.Color(0.75, 0.75, 0.8), info: "Ice cliffs and wispy terrain on trailing hemisphere.", initialAngle: 5.5 },
      { name: "Rhea", size: 0.12, dist: 4.8, speed: 0.22, color: new THREE.Color(0.7, 0.7, 0.75), info: "Second largest moon of Saturn with thin oxygen atmosphere.", initialAngle: 1.3 },
      { name: "Titan", size: 0.21, dist: 5.5, speed: 0.063, color: new THREE.Color(1.0, 0.65, 0.0), info: "Has thick atmosphere and liquid methane lakes.", initialAngle: 2.3 },
      { name: "Hyperion", size: 0.04, dist: 6.2, speed: 0.048, color: new THREE.Color(0.6, 0.5, 0.4), info: "Chaotic rotation and sponge-like appearance.", initialAngle: 3.8 },
      { name: "Iapetus", size: 0.11, dist: 7.0, speed: 0.014, color: new THREE.Color(0.3, 0.3, 0.3), info: "Two-tone coloration, dark leading hemisphere.", initialAngle: 0.5 },
      { name: "Phoebe", size: 0.03, dist: 8.5, speed: 0.006, color: new THREE.Color(0.25, 0.25, 0.25), info: "Retrograde irregular moon, likely captured asteroid.", initialAngle: 4.9 }
    ],
    spaceProbes: [
      {
        name: "Cassini–Huygens",
        modelPath: "Cassini–Huygens Space Probe.glb",
        size: 0.08, // Appropriate size relative to Saturn
        // Elliptical orbit parameters - same as JUNO but 2x larger
        orbit: {
          semiMajorAxis: 7, // 2x JUNO's semiMajorAxis (3.5 * 2 = 7)
          eccentricity: 0.4, // Same as JUNO
          inclination: 0.05, // Same as JUNO
          argumentOfPeriapsis: 0, // Argument of periapsis
          meanAnomaly: 0, // Starting position
          orbitalPeriod: 16 // Days (Cassini's typical orbital period)
        },
        color: new THREE.Color(0.85, 0.88, 0.92),
        info: "Cassini–Huygens mission studying Saturn, its rings, and moons including the Huygens probe landing on Titan."
      }
    ]
  },
  {
    name: "Uranus",
    size: 1.2,
    dist: 37,
    speed: 0.000012,
    initialAngle: 1.2,
    texture: "uranus.jpg",
    roughness: 0.85,
    metalness: 0.0,
    type: "planet",
    info: "Ice giant tilted on its side (98° axial tilt). Has faint rings and 28 known moons. Orbital period: 84.01 years (sidereal).",
    discoveryYear: "1781",
    realAU: 19.22,
    orbitalPeriodDays: 30688.5,
    moons: [
      { name: "Ariel", size: 0.08, dist: 2.2, speed: 0.39, color: new THREE.Color(0.6, 0.6, 0.65), info: "Youngest surface among Uranian moons with fault valleys.", initialAngle: 2.1 },
      { name: "Umbriel", size: 0.08, dist: 2.5, speed: 0.23, color: new THREE.Color(0.4, 0.4, 0.45), info: "Darkest of Uranus's major moons.", initialAngle: 4.8 },
      { name: "Titania", size: 0.11, dist: 3.0, speed: 0.12, color: new THREE.Color(0.55, 0.55, 0.6), info: "Largest moon of Uranus with deep canyons.", initialAngle: 1.7 },
      { name: "Oberon", size: 0.10, dist: 3.4, speed: 0.075, color: new THREE.Color(0.5, 0.5, 0.55), info: "Outermost major moon with ancient cratered surface.", initialAngle: 5.3 },
      { name: "Miranda", size: 0.06, dist: 1.8, speed: 0.67, color: new THREE.Color(0.53, 0.53, 0.53), info: "Most unusual moon with extreme geological features.", initialAngle: 3.7 },
      { name: "Puck", size: 0.03, dist: 1.5, speed: 1.18, color: new THREE.Color(0.45, 0.45, 0.5), info: "Small irregular moon discovered by Voyager 2.", initialAngle: 0.8 }
    ]
  },
  {
    name: "Neptune",
    size: 1.1,
    dist: 42,
    speed: 0.0000061,
    initialAngle: 6.1,
    texture: "neptune.jpg",
    roughness: 0.85,
    metalness: 0.0,
    type: "planet",
    info: "Windiest planet with speeds up to 2,100 km/h. Deep blue color from methane in atmosphere. Orbital period: 164.79 years (sidereal).",
    discoveryYear: "1846",
    realAU: 30.07,
    orbitalPeriodDays: 60182,
    moons: [
      { name: "Triton", size: 0.11, dist: 3.0, speed: 0.17, color: new THREE.Color(0.53, 0.81, 0.92), info: "Largest moon of Neptune. Orbits retrograde. Nitrogen geysers.", initialAngle: 0.9 },
      { name: "Nereid", size: 0.02, dist: 4.8, speed: 0.003, color: new THREE.Color(0.5, 0.5, 0.5), info: "Highly eccentric orbit, likely captured Kuiper Belt object.", initialAngle: 3.2 },
      { name: "Proteus", size: 0.03, dist: 2.2, speed: 0.89, color: new THREE.Color(0.4, 0.4, 0.4), info: "Largest irregular-shaped moon of Neptune.", initialAngle: 5.7 },
      { name: "Larissa", size: 0.015, dist: 1.8, speed: 1.81, color: new THREE.Color(0.35, 0.35, 0.35), info: "Small inner moon discovered by Voyager 2.", initialAngle: 2.4 }
    ]
  },
  {
    name: "Ceres",
    size: 0.3,
    dist: 22,
    speed: 0.00022,
    texture: "ceres.jpg",
    roughness: 1.0,
    metalness: 0.0,
    type: "dwarf",
    info: "Largest object in asteroid belt. Has water ice and possible subsurface ocean. Visited by Dawn spacecraft. Orbital period: 4.6 years (1,682 days, sidereal).",
    discoveryYear: "1801",
    realAU: 2.77,
    orbitalPeriodDays: 1682,
    moons: []
  },
  {
    name: "Pluto",
    size: 0.4,
    dist: 48,
    speed: 0.000004,
    initialAngle: 5.3,
    texture: "Pluto.jpg",
    roughness: 1.0,
    metalness: 0.0,
    type: "dwarf",
    info: "Former ninth planet. Has heart-shaped nitrogen plains. Binary system with Charon. Orbital period: 248.09 years (sidereal).",
    discoveryYear: "1930",
    realAU: 39.48,
    orbitalPeriodDays: 90553,
    moons: [
      { name: "Charon", size: 0.2, dist: 1.8, speed: 0.16, color: new THREE.Color(0.5, 0.5, 0.5), info: "Largest moon relative to its parent planet. Tidally locked to Pluto.", initialAngle: 1.8 }
    ]
  },
  {
    name: "Eris",
    size: 0.35,
    dist: 52,
    speed: 0.0000018,
    initialAngle: 2.7,
    texture: "eris.jpg",
    roughness: 1.0,
    metalness: 0.0,
    type: "dwarf",
    info: "Most massive dwarf planet. Discovery led to Pluto's reclassification. Very reflective surface. Orbital period: 558.04 years (sidereal).",
    discoveryYear: "2005",
    realAU: 67.78,
    orbitalPeriodDays: 203760,
    moons: [
      { name: "Dysnomia", size: 0.04, dist: 2.0, speed: 0.067, color: new THREE.Color(0.6, 0.6, 0.6), info: "Only known moon of Eris.", initialAngle: 4.5 }
    ]
  },
  {
    name: "Makemake",
    size: 0.25,
    dist: 50,
    speed: 0.0000032,
    initialAngle: 1.9,
    texture: "makemake.jpg",
    roughness: 1.0,
    metalness: 0.0,
    type: "dwarf",
    info: "Third-largest dwarf planet. Reddish surface likely due to organic compounds. No atmosphere. Orbital period: 306.88 years (sidereal).",
    discoveryYear: "2005",
    realAU: 45.79,
    orbitalPeriodDays: 112062,
    moons: [
      { name: "MK 2", size: 0.02, dist: 1.5, speed: 0.083, color: new THREE.Color(0.4, 0.4, 0.4), info: "Small, dark moon of Makemake.", initialAngle: 0.7 }
    ]
  },
  {
    name: "Haumea",
    size: 0.28,
    dist: 51,
    speed: 0.0000035,
    initialAngle: 4.2,
    texture: "haumea.jpg",
    roughness: 0.8,
    metalness: 0.1,
    type: "dwarf",
    info: "Elongated dwarf planet that spins every 4 hours. Has ring system and crystalline water ice surface. Orbital period: 285.46 years (sidereal).",
    discoveryYear: "2004",
    realAU: 43.13,
    orbitalPeriodDays: 104293,
    moons: [
      { name: "Hi'iaka", size: 0.05, dist: 2.2, speed: 0.02, color: new THREE.Color(0.87, 0.87, 0.87), info: "Larger moon of Haumea.", initialAngle: 2.9 },
      { name: "Namaka", size: 0.03, dist: 1.8, speed: 0.056, color: new THREE.Color(0.8, 0.8, 0.8), info: "Smaller, inner moon of Haumea.", initialAngle: 5.1 }
    ]
  },
  {
    name: "Sedna",
    size: 0.2,
    dist: 65,
    speed: 0.00000009,
    initialAngle: 0.1,
    texture: "Sedna.png",
    roughness: 1.0,
    metalness: 0.0,
    type: "dwarf",
    info: "Extremely distant object in extended scattered disk. Orbital period: 11,400 years (sidereal).",
    discoveryYear: "2003",
    realAU: 506,
    orbitalPeriodDays: 4161000,
    moons: []
  },
  {
    name: "Quaoar",
    size: 0.18,
    dist: 54,
    speed: 0.0000035,
    initialAngle: 3.1,
    texture: "quaoar.png",
    roughness: 1.0,
    metalness: 0.0,
    type: "dwarf",
    info: "Classical Kuiper Belt object. Has ring system and one known moon. Orbital period: 288.83 years (sidereal).",
    discoveryYear: "2002",
    realAU: 43.58,
    orbitalPeriodDays: 105423,
    moons: [
      { name: "Weywot", size: 0.02, dist: 1.6, speed: 0.083, color: new THREE.Color(0.33, 0.33, 0.33), info: "Moon of Quaoar.", initialAngle: 1.3 }
    ]
  },
  {
    name: "Orcus",
    size: 0.16,
    dist: 49,
    speed: 0.000004,
    initialAngle: 5.7,
    texture: "orcus.png",
    roughness: 1.0,
    metalness: 0.0,
    type: "dwarf",
    info: "Plutino in 2:3 resonance with Neptune. Sometimes called 'anti-Pluto'. Orbital period: 247.29 years (sidereal).",
    discoveryYear: "2004",
    realAU: 39.17,
    orbitalPeriodDays: 90265,
    moons: [
      { name: "Vanth", size: 0.06, dist: 1.9, speed: 0.1, color: new THREE.Color(0.27, 0.27, 0.27), info: "Large moon of Orcus.", initialAngle: 4.8 }
    ]
  },
  {
    name: "Gonggong",
    size: 0.19,
    dist: 56,
    speed: 0.0000018,
    initialAngle: 2.4,
    texture: "gonggong.png",
    roughness: 1.0,
    metalness: 0.0,
    type: "dwarf",
    info: "Red-colored scattered disk object. Has slow rotation period of 22 hours. Orbital period: 554.37 years (sidereal).",
    discoveryYear: "2007",
    realAU: 67.38,
    orbitalPeriodDays: 202345,
    moons: [
      { name: "Xiangliu", size: 0.03, dist: 1.7, speed: 0.1, color: new THREE.Color(0.4, 0.4, 0.4), info: "Moon of Gonggong.", initialAngle: 3.8 }
    ]
  },
  {
    name: "Varuna",
    size: 0.12,
    dist: 53,
    speed: 0.0000027,
    initialAngle: 4.7,
    color: new THREE.Color(0.41, 0.41, 0.41),
    roughness: 1.0,
    metalness: 0.0,
    type: "tno",
    info: "Large classical Kuiper Belt object. Elongated shape with rapid rotation. Orbital period: 283.2 years (sidereal).",
    discoveryYear: "2000",
    realAU: 42.9,
    orbitalPeriodDays: 103368,
    moons: []
  },
  {
    name: "Ixion",
    size: 0.11,
    dist: 49.5,
    speed: 0.000004,
    initialAngle: 0.8,
    color: new THREE.Color(0.55, 0.27, 0.07),
    roughness: 1.0,
    metalness: 0.0,
    type: "tno",
    info: "Plutino with very red surface. May have experienced thermal evolution. Orbital period: 248.09 years (sidereal).",
    discoveryYear: "2001",
    realAU: 39.48,
    orbitalPeriodDays: 90553,
    moons: []
  },
  {
    name: "Salacia",
    size: 0.13,
    dist: 50.3,
    speed: 0.0000035,
    initialAngle: 2.9,
    color: new THREE.Color(0.6, 0.6, 0.65),
    roughness: 1.0,
    metalness: 0.0,
    type: "tno",
    info: "Large trans-Neptunian object with a known moon. Orbital period: 274.04 years (sidereal).",
    discoveryYear: "2004",
    realAU: 42.18,
    orbitalPeriodDays: 99980,
    moons: [
      { name: "Actaea", size: 0.04, dist: 1.4, speed: 0.09, color: new THREE.Color(0.5, 0.5, 0.55), info: "Moon of Salacia, discovered in 2006.", initialAngle: 1.9 }
    ]
  },
  {
    name: "2007 OR10",
    size: 0.16,
    dist: 55.2,
    speed: 0.0000019,
    initialAngle: 3.7,
    color: new THREE.Color(0.45, 0.15, 0.10),
    roughness: 1.0,
    metalness: 0.0,
    type: "dwarf",
    info: "One of the largest known dwarf planets, very red in color. Orbital period: 546.97 years (sidereal).",
    discoveryYear: "2007",
    realAU: 53.08,
    orbitalPeriodDays: 199644,
    moons: [
      { name: "S/2016 (225088) 1", size: 0.025, dist: 1.6, speed: 0.08, color: new THREE.Color(0.4, 0.4, 0.4), info: "Small moon of 2007 OR10.", initialAngle: 5.1 }
    ]
  }
];
// Load STL model for Vesta
const stlLoader = new STLLoader(loadingManager);
let vestaSTLGeometry = null;
let vestaMeshRef = null; // Reference to vesta mesh for geometry update

stlLoader.load(
  `${BASE_URL}Models/Asteroid/Vesta/vesta_moon.stl`,
  (geometry) => {
    vestaSTLGeometry = geometry;
    console.log('Vesta STL model loaded successfully');
    // Update vesta geometry if mesh already exists
    if (vestaMeshRef) {
      // Calculate bounding box to scale model to vesta size
      geometry.computeBoundingBox();
      const box = geometry.boundingBox;
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const vestaSize = 0.15; // Vesta size from data
      const scale = vestaSize / maxDim;
      geometry.scale(scale, scale, scale);
      vestaMeshRef.geometry.dispose();
      vestaMeshRef.geometry = geometry;
      console.log('Vesta geometry updated with STL model');
    }
  },
  (progress) => {
    if (progress.lengthComputable) {
      console.log('Loading vesta STL:', (progress.loaded / progress.total * 100) + '%');
    }
  },
  (error) => {
    console.error('Error loading vesta STL:', error);
  }
);

// Load GLB models for space probes
const dracoLoader = new DRACOLoader(loadingManager);
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);
let emuGLTFModel = null;
let mavenGLTFModel = null;
let junoGLTFModel = null;
let cassiniGLTFModel = null;

// Create procedural texture for MAVEN spacecraft
function createMAVENTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');
  
  // Base metallic silver color - brighter and more vibrant
  const baseColor = { r: 200, g: 205, b: 215 };
  
  // Fill with base color
  ctx.fillStyle = `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Create structured panel pattern (like real spacecraft)
  const panelSize = 200;
  for (let y = 0; y < canvas.height; y += panelSize) {
    for (let x = 0; x < canvas.width; x += panelSize) {
      // Vary panel colors more significantly
      const variation = 15 + Math.random() * 25;
      const panelColor = {
        r: Math.max(160, Math.min(240, baseColor.r + (Math.random() > 0.5 ? variation : -variation))),
        g: Math.max(165, Math.min(240, baseColor.g + (Math.random() > 0.5 ? variation : -variation))),
        b: Math.max(180, Math.min(240, baseColor.b + (Math.random() > 0.5 ? variation : -variation)))
      };
      
      ctx.fillStyle = `rgb(${panelColor.r}, ${panelColor.g}, ${panelColor.b})`;
      ctx.fillRect(x, y, panelSize - 2, panelSize - 2);
      
      // Add panel borders
      ctx.strokeStyle = `rgb(${panelColor.r - 25}, ${panelColor.g - 25}, ${panelColor.b - 25})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, panelSize - 2, panelSize - 2);
    }
  }
  
  // Add solar panel areas (darker blue-gray)
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const width = 150 + Math.random() * 200;
    const height = 80 + Math.random() * 120;
    
    ctx.fillStyle = `rgb(${baseColor.r - 40}, ${baseColor.g - 35}, ${baseColor.b - 20})`;
    ctx.fillRect(x, y, width, height);
    
    // Add solar cell grid pattern
    ctx.strokeStyle = `rgb(${baseColor.r - 60}, ${baseColor.g - 55}, ${baseColor.b - 40})`;
    ctx.lineWidth = 1;
    const cellSize = 20;
    for (let cy = y; cy < y + height; cy += cellSize) {
      ctx.beginPath();
      ctx.moveTo(x, cy);
      ctx.lineTo(x + width, cy);
      ctx.stroke();
    }
    for (let cx = x; cx < x + width; cx += cellSize) {
      ctx.beginPath();
      ctx.moveTo(cx, y);
      ctx.lineTo(cx, y + height);
      ctx.stroke();
    }
  }
  
  // Add structural seams (darker lines)
  ctx.strokeStyle = `rgb(${baseColor.r - 50}, ${baseColor.g - 50}, ${baseColor.b - 50})`;
  ctx.lineWidth = 3;
  for (let i = 0; i < 30; i++) {
    ctx.beginPath();
    const x1 = Math.random() * canvas.width;
    const y1 = Math.random() * canvas.height;
    const length = 100 + Math.random() * 300;
    const angle = Math.random() * Math.PI * 2;
    const x2 = x1 + Math.cos(angle) * length;
    const y2 = y1 + Math.sin(angle) * length;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  
  // Add hardware details (screws, bolts, connectors) - darker
  ctx.fillStyle = `rgb(${baseColor.r - 60}, ${baseColor.g - 60}, ${baseColor.b - 60})`;
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = 3 + Math.random() * 4;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add highlight to screws
    ctx.fillStyle = `rgb(${baseColor.r - 30}, ${baseColor.g - 30}, ${baseColor.b - 30})`;
    ctx.beginPath();
    ctx.arc(x - size * 0.3, y - size * 0.3, size * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `rgb(${baseColor.r - 60}, ${baseColor.g - 60}, ${baseColor.b - 60})`;
  }
  
  // Add metallic highlights (brighter areas)
  const highlightGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
  highlightGradient.addColorStop(0.3, 'rgba(240, 245, 255, 0.15)');
  highlightGradient.addColorStop(0.7, 'rgba(220, 225, 235, 0.1)');
  highlightGradient.addColorStop(1, 'rgba(200, 210, 220, 0.15)');
  ctx.fillStyle = highlightGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add subtle noise for realistic surface texture
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 12;
    data[i] = Math.max(0, Math.min(255, data[i] + noise));     // R
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // G
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // B
  }
  ctx.putImageData(imageData, 0, 0);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.needsUpdate = true;
  
  return texture;
}

// Create normal map for MAVEN (surface details) - proper format
function createMAVENNormalMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');
  
  // Base normal color (flat surface pointing up) - RGB format: (128, 128, 255)
  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add subtle panel grooves (slightly recessed)
  ctx.strokeStyle = 'rgb(110, 110, 250)';
  ctx.lineWidth = 2;
  const panelSize = 200;
  for (let y = 0; y < canvas.height; y += panelSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  for (let x = 0; x < canvas.width; x += panelSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  
  // Add very subtle surface variation (almost flat)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    // Keep normal map subtle - only small variations
    const noise = (Math.random() - 0.5) * 5;
    data[i] = Math.max(120, Math.min(135, data[i] + noise));     // R
    data[i + 1] = Math.max(120, Math.min(135, data[i + 1] + noise)); // G
    data[i + 2] = Math.max(250, Math.min(255, data[i + 2])); // B (always high for up direction)
  }
  ctx.putImageData(imageData, 0, 0);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.needsUpdate = true;
  
  return texture;
}

// Create roughness map for MAVEN (variations in surface smoothness)
function createMAVENRoughnessMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  
  // Base roughness (smooth metallic)
  ctx.fillStyle = 'rgb(80, 80, 80)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add variations (some areas more rough, some smoother)
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = 30 + Math.random() * 50;
    const roughness = 60 + Math.random() * 40;
    
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgb(${roughness}, ${roughness}, ${roughness})`);
    gradient.addColorStop(1, 'rgb(80, 80, 80)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.needsUpdate = true;
  
  return texture;
}

// Pre-generate textures for MAVEN
const mavenTexture = createMAVENTexture();
const mavenNormalMap = createMAVENNormalMap();
const mavenRoughnessMap = createMAVENRoughnessMap();
let spaceObjectMeshesRefs = []; // References to space object meshes for model update
let spaceProbeMeshesRefs = []; // References to space probe meshes for model update

gltfLoader.load(
  `${BASE_URL}Models/emu_spacesuit.glb`,
  (gltf) => {
    emuGLTFModel = gltf;
    console.log('EMU spacesuit GLB model loaded successfully', gltf);
    console.log('GLB scene:', gltf.scene);
    console.log('GLB scene type:', gltf.scene.type);
    console.log('GLB scene children:', gltf.scene.children.length);
    if (gltf.scene.children.length > 0) {
      console.log('First child:', gltf.scene.children[0]);
    }
    console.log('Space object refs count:', spaceObjectMeshesRefs.length);
    console.log('Space probe refs count:', spaceProbeMeshesRefs.length);
    // Update space object meshes if they already exist
    spaceObjectMeshesRefs.forEach((ref, index) => {
      if (ref && ref.pivot && ref.spaceObjRef && emuGLTFModel && emuGLTFModel.scene) {
        console.log(`Updating space object ${index + 1} (${ref.name})`);
        const clonedScene = emuGLTFModel.scene.clone();
        
        // Fix materials - replace with opaque materials to ensure visibility
        clonedScene.traverse((child) => {
          if (child.isMesh) {
            if (child.material) {
              // Handle array of materials
              const materials = Array.isArray(child.material) ? child.material : [child.material];
              const newMaterials = materials.map((material) => {
                if (material) {
                  // Create new opaque material, preserving texture if available
                  const newMaterial = new THREE.MeshStandardMaterial({
                    map: material.map || null,
                    normalMap: material.normalMap || null,
                    roughnessMap: material.roughnessMap || null,
                    metalnessMap: material.metalnessMap || null,
                    emissiveMap: material.emissiveMap || null,
                    color: material.color ? material.color.clone() : new THREE.Color(0.9, 0.9, 0.9),
                    roughness: material.roughness !== undefined ? material.roughness : 0.7,
                    metalness: material.metalness !== undefined ? material.metalness : 0.3,
                    emissive: material.emissive ? material.emissive.clone() : new THREE.Color(0, 0, 0),
                    transparent: false,
                    opacity: 1.0,
                    alphaTest: 0,
                    depthWrite: true,
                    blending: THREE.NormalBlending
                  });
                  // If texture exists, ensure it's loaded
                  if (newMaterial.map) {
                    newMaterial.map.needsUpdate = true;
                  }
                  return newMaterial;
                }
                return new THREE.MeshStandardMaterial({ color: 0xffffff });
              });
              // Update material reference
              if (Array.isArray(child.material)) {
                child.material = newMaterials;
              } else {
                child.material = newMaterials[0];
              }
            } else {
              // If no material, create a default opaque material
              child.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
            }
            // Enable shadows
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        // Calculate bounding box to scale model
        const box = new THREE.Box3().setFromObject(clonedScene);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 0.05775; // Space object size from data (increased by 15% total: 10% + 5%)
        const scale = targetSize / maxDim;
        
        // Replace the sphere mesh with the GLB model
        const oldMesh = ref.mesh;
        const pivot = ref.pivot;
        if (pivot && oldMesh) {
          // Store old position relative to pivot
          const oldPosition = oldMesh.position.clone();
          const oldRotation = oldMesh.rotation.clone();
          
          // Remove old mesh from pivot
          pivot.remove(oldMesh);
          
          // Dispose old mesh resources
          if (oldMesh.geometry) oldMesh.geometry.dispose();
          if (oldMesh.material) {
            if (Array.isArray(oldMesh.material)) {
              oldMesh.material.forEach(mat => mat.dispose());
            } else {
              oldMesh.material.dispose();
            }
          }
          
          // Reset scale before applying new scale
          clonedScene.scale.set(1, 1, 1);
          // Apply calculated scale
          clonedScene.scale.multiplyScalar(scale);
          
          // Set position and rotation for new model
          clonedScene.position.copy(oldPosition);
          clonedScene.rotation.copy(oldRotation);
          
          // Add new model to pivot
          pivot.add(clonedScene);
          
          // Update references
          ref.mesh = clonedScene;
          if (ref.spaceObjRef) {
            ref.spaceObjRef.mesh = clonedScene;
          }
          
          console.log(`Space object ${index + 1} (${ref.name}) geometry updated with GLB model. Type:`, clonedScene.type, 'Children:', clonedScene.children.length, 'Position:', clonedScene.position, 'Scale:', clonedScene.scale);
        } else {
          console.warn(`Space object ${index + 1} (${ref.name}) has no pivot or oldMesh:`, { hasPivot: !!pivot, hasOldMesh: !!oldMesh });
        }
      } else {
        console.warn(`Space object ${index + 1} update skipped:`, {
          hasRef: !!ref,
          hasPivot: !!(ref && ref.pivot),
          hasSpaceObjRef: !!(ref && ref.spaceObjRef),
          hasModel: !!emuGLTFModel,
          hasScene: !!(emuGLTFModel && emuGLTFModel.scene)
        });
      }
    });
    
    // Update space probe meshes for OREST and EMMA
    spaceProbeMeshesRefs.forEach((ref) => {
      if ((ref.name === "OREST" || ref.name === "EMMA") && ref.pivot && ref.probeRef && emuGLTFModel && emuGLTFModel.scene) {
        console.log(`Updating ${ref.name} space probe geometry with GLB model`);
        const clonedScene = emuGLTFModel.scene.clone();
        
        // Fix materials
        clonedScene.traverse((child) => {
          if (child.isMesh) {
            if (child.material) {
              const materials = Array.isArray(child.material) ? child.material : [child.material];
              const newMaterials = materials.map((material) => {
                if (material) {
                  return new THREE.MeshStandardMaterial({
                    map: material.map || null,
                    normalMap: material.normalMap || null,
                    roughnessMap: material.roughnessMap || null,
                    metalnessMap: material.metalnessMap || null,
                    emissiveMap: material.emissiveMap || null,
                    color: material.color ? material.color.clone() : new THREE.Color(0.9, 0.9, 0.9),
                    roughness: material.roughness !== undefined ? material.roughness : 0.7,
                    metalness: material.metalness !== undefined ? material.metalness : 0.3,
                    emissive: material.emissive ? material.emissive.clone() : new THREE.Color(0, 0, 0),
                    transparent: false,
                    opacity: 1.0,
                    depthWrite: true,
                    blending: THREE.NormalBlending
                  });
                }
                return new THREE.MeshStandardMaterial({ color: 0xffffff });
              });
              if (Array.isArray(child.material)) {
                child.material = newMaterials;
              } else {
                child.material = newMaterials[0];
              }
            } else {
              child.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
            }
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        // Calculate bounding box to scale model
        const box = new THREE.Box3().setFromObject(clonedScene);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = ref.probeRef.probeData.size / maxDim;
        clonedScene.scale.set(scale, scale, scale);
        
        // Replace old mesh
        const oldMesh = ref.mesh;
        const pivot = ref.pivot;
        if (pivot && oldMesh) {
          const oldPosition = oldMesh.position.clone();
          pivot.remove(oldMesh);
          
          // Dispose old mesh
          if (oldMesh.geometry) oldMesh.geometry.dispose();
          if (oldMesh.material) {
            if (Array.isArray(oldMesh.material)) {
              oldMesh.material.forEach(mat => mat.dispose());
            } else {
              oldMesh.material.dispose();
            }
          }
          
          clonedScene.position.copy(oldPosition);
          pivot.add(clonedScene);
          
          // Update references
          ref.mesh = clonedScene;
          ref.probeRef.mesh = clonedScene;
        }
      }
    });
  },
  (progress) => {
    if (progress.lengthComputable) {
      console.log('Loading EMU GLB:', (progress.loaded / progress.total * 100) + '%');
    }
  },
  (error) => {
    console.error('Error loading EMU GLB:', error);
    console.error('Error message:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
  }
);

// Load MAVEN GLB model
gltfLoader.load(
  `${BASE_URL}Models/Space probe/Mars/Mars Atmosphere and Volatile EvolutioN (MAVEN) (A).glb`,
  (gltf) => {
    mavenGLTFModel = gltf;
    console.log('MAVEN GLB model loaded successfully');
    // Update MAVEN meshes if they already exist
    spaceProbeMeshesRefs.forEach((ref) => {
      if (ref.name === "MAVEN" && ref.pivot && ref.probeRef && mavenGLTFModel && mavenGLTFModel.scene) {
        console.log('Updating MAVEN geometry with GLB model');
        const clonedScene = mavenGLTFModel.scene.clone();
        
        // Fix materials - Apply metallic silver color for MAVEN
        clonedScene.traverse((child) => {
          if (child.isMesh) {
            if (child.material) {
              const materials = Array.isArray(child.material) ? child.material : [child.material];
              const newMaterials = materials.map((material) => {
                if (material) {
                  return new THREE.MeshStandardMaterial({
                    // Use procedural textures for MAVEN
                    map: mavenTexture,
                    normalMap: mavenNormalMap,
                    normalScale: new THREE.Vector2(0.5, 0.5), // Reduce normal map intensity
                    roughnessMap: mavenRoughnessMap,
                    metalnessMap: material.metalnessMap || null,
                    emissiveMap: material.emissiveMap || null,
                    // Brighter metallic silver base color
                    color: new THREE.Color(0.85, 0.87, 0.9),
                    roughness: 0.25,
                    metalness: 0.85,
                    emissive: material.emissive ? material.emissive.clone() : new THREE.Color(0, 0, 0),
                    transparent: false,
                    opacity: 1.0,
                    depthWrite: true,
                    blending: THREE.NormalBlending
                  });
                }
                // Default with procedural textures for MAVEN
                return new THREE.MeshStandardMaterial({ 
                  map: mavenTexture,
                  normalMap: mavenNormalMap,
                  normalScale: new THREE.Vector2(0.5, 0.5), // Reduce normal map intensity
                  roughnessMap: mavenRoughnessMap,
                  color: new THREE.Color(0.85, 0.87, 0.9),
                  metalness: 0.85,
                  roughness: 0.25
                });
              });
              if (Array.isArray(child.material)) {
                child.material = newMaterials;
              } else {
                child.material = newMaterials[0];
              }
            } else {
              // Default with procedural textures for MAVEN
              child.material = new THREE.MeshStandardMaterial({ 
                map: mavenTexture,
                normalMap: mavenNormalMap,
                normalScale: new THREE.Vector2(0.5, 0.5),
                roughnessMap: mavenRoughnessMap,
                color: new THREE.Color(0.85, 0.87, 0.9),
                metalness: 0.85,
                roughness: 0.25
              });
            }
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        // Calculate bounding box to scale model
        const box = new THREE.Box3().setFromObject(clonedScene);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = ref.probeRef.probeData.size / maxDim;
        clonedScene.scale.set(scale, scale, scale);
        
        // Replace old mesh
        const oldMesh = ref.mesh;
        const pivot = ref.pivot;
        if (pivot && oldMesh) {
          const oldPosition = oldMesh.position.clone();
          pivot.remove(oldMesh);
          
          // Dispose old mesh
          if (oldMesh.geometry) oldMesh.geometry.dispose();
          if (oldMesh.material) {
            if (Array.isArray(oldMesh.material)) {
              oldMesh.material.forEach(mat => mat.dispose());
            } else {
              oldMesh.material.dispose();
            }
          }
          
          clonedScene.position.copy(oldPosition);
          pivot.add(clonedScene);
          
          // Force update textures and color for all MAVEN materials after adding to scene
          clonedScene.traverse((child) => {
            if (child.isMesh && child.material) {
              const materials = Array.isArray(child.material) ? child.material : [child.material];
              materials.forEach((mat) => {
                if (mat && mat.isMeshStandardMaterial) {
                  // Apply procedural textures
                  mat.map = mavenTexture;
                  mat.normalMap = mavenNormalMap;
                  mat.normalScale = new THREE.Vector2(0.5, 0.5);
                  mat.roughnessMap = mavenRoughnessMap;
                  mat.color.setRGB(0.85, 0.87, 0.9);
                  mat.metalness = 0.85;
                  mat.roughness = 0.25;
                  mat.needsUpdate = true;
                }
              });
            }
          });
          
          // Update references
          ref.mesh = clonedScene;
          ref.probeRef.mesh = clonedScene;
        }
      }
    });
  },
  (progress) => {
    if (progress.lengthComputable) {
      console.log('Loading MAVEN GLB:', (progress.loaded / progress.total * 100) + '%');
    }
  },
  (error) => {
    console.error('Error loading MAVEN GLB:', error);
  }
);

// Load Juno GLB model
gltfLoader.load(
  `${BASE_URL}Models/Space probe/Jupiter/Juno.glb`,
  (gltf) => {
    junoGLTFModel = gltf;
    console.log('JUNO GLB model loaded successfully');
    // Update JUNO meshes if they already exist
    spaceProbeMeshesRefs.forEach((ref) => {
      if (ref.name === "JUNO" && ref.pivot && ref.probeRef && junoGLTFModel && junoGLTFModel.scene) {
        console.log('Updating JUNO geometry with GLB model');
        const clonedScene = junoGLTFModel.scene.clone();
        
        // Fix materials
        clonedScene.traverse((child) => {
          if (child.isMesh) {
            if (child.material) {
              const materials = Array.isArray(child.material) ? child.material : [child.material];
              const newMaterials = materials.map((material) => {
                if (material) {
                  return new THREE.MeshStandardMaterial({
                    map: material.map || null,
                    normalMap: material.normalMap || null,
                    roughnessMap: material.roughnessMap || null,
                    metalnessMap: material.metalnessMap || null,
                    emissiveMap: material.emissiveMap || null,
                    color: material.color ? material.color.clone() : new THREE.Color(0.9, 0.9, 0.9),
                    roughness: material.roughness !== undefined ? material.roughness : 0.7,
                    metalness: material.metalness !== undefined ? material.metalness : 0.3,
                    emissive: material.emissive ? material.emissive.clone() : new THREE.Color(0, 0, 0),
                    transparent: false,
                    opacity: 1.0,
                    depthWrite: true,
                    blending: THREE.NormalBlending
                  });
                }
                return new THREE.MeshStandardMaterial({ color: 0xffffff });
              });
              if (Array.isArray(child.material)) {
                child.material = newMaterials;
              } else {
                child.material = newMaterials[0];
              }
            } else {
              child.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
            }
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        // Calculate bounding box to scale model
        const box = new THREE.Box3().setFromObject(clonedScene);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = ref.probeRef.probeData.size / maxDim;
        clonedScene.scale.set(scale, scale, scale);
        
        // Replace old mesh
        const oldMesh = ref.mesh;
        const pivot = ref.pivot;
        if (pivot && oldMesh) {
          const oldPosition = oldMesh.position.clone();
          pivot.remove(oldMesh);
          
          // Dispose old mesh
          if (oldMesh.geometry) oldMesh.geometry.dispose();
          if (oldMesh.material) {
            if (Array.isArray(oldMesh.material)) {
              oldMesh.material.forEach(mat => mat.dispose());
            } else {
              oldMesh.material.dispose();
            }
          }
          
          clonedScene.position.copy(oldPosition);
          pivot.add(clonedScene);
          
          // Update references
          ref.mesh = clonedScene;
          ref.probeRef.mesh = clonedScene;
        }
      }
    });
  },
  (progress) => {
    if (progress.lengthComputable) {
      console.log('Loading JUNO GLB:', (progress.loaded / progress.total * 100) + '%');
    }
  },
  (error) => {
    console.error('Error loading JUNO GLB:', error);
  }
);

// Load Cassini-Huygens GLB model
gltfLoader.load(
  `${BASE_URL}Models/Space probe/Saturn/Cassini–Huygens Space Probe.glb`,
  (gltf) => {
    cassiniGLTFModel = gltf;
    console.log('Cassini–Huygens GLB model loaded successfully');
    // Update Cassini meshes if they already exist
    spaceProbeMeshesRefs.forEach((ref) => {
      if (ref.name === "Cassini–Huygens" && ref.pivot && ref.probeRef && cassiniGLTFModel && cassiniGLTFModel.scene) {
        console.log('Updating Cassini–Huygens geometry with GLB model');
        const clonedScene = cassiniGLTFModel.scene.clone();
        
        // Fix materials
        clonedScene.traverse((child) => {
          if (child.isMesh) {
            if (child.material) {
              const materials = Array.isArray(child.material) ? child.material : [child.material];
              const newMaterials = materials.map((material) => {
                if (material) {
                  return new THREE.MeshStandardMaterial({
                    map: material.map || null,
                    normalMap: material.normalMap || null,
                    roughnessMap: material.roughnessMap || null,
                    metalnessMap: material.metalnessMap || null,
                    emissiveMap: material.emissiveMap || null,
                    color: material.color ? material.color.clone() : new THREE.Color(0.85, 0.88, 0.92),
                    roughness: material.roughness !== undefined ? material.roughness : 0.7,
                    metalness: material.metalness !== undefined ? material.metalness : 0.3,
                    emissive: material.emissive ? material.emissive.clone() : new THREE.Color(0, 0, 0),
                    transparent: false,
                    opacity: 1.0,
                    depthWrite: true,
                    blending: THREE.NormalBlending
                  });
                }
                return new THREE.MeshStandardMaterial({ color: 0xffffff });
              });
              if (Array.isArray(child.material)) {
                child.material = newMaterials;
              } else {
                child.material = newMaterials[0];
              }
            } else {
              child.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
            }
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        // Calculate bounding box to scale model
        const box = new THREE.Box3().setFromObject(clonedScene);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = ref.probeRef.probeData.size / maxDim;
        clonedScene.scale.set(scale, scale, scale);
        
        // Replace old mesh
        const oldMesh = ref.mesh;
        const pivot = ref.pivot;
        if (pivot && oldMesh) {
          const oldPosition = oldMesh.position.clone();
          pivot.remove(oldMesh);
          
          // Dispose old mesh
          if (oldMesh.geometry) oldMesh.geometry.dispose();
          if (oldMesh.material) {
            if (Array.isArray(oldMesh.material)) {
              oldMesh.material.forEach(mat => mat.dispose());
            } else {
              oldMesh.material.dispose();
            }
          }
          
          clonedScene.position.copy(oldPosition);
          pivot.add(clonedScene);
        }
        
        // Update references
        ref.mesh = clonedScene;
        ref.probeRef.mesh = clonedScene;
      }
    });
  },
  (progress) => {
    if (progress.lengthComputable) {
      console.log('Loading Cassini–Huygens GLB:', (progress.loaded / progress.total * 100) + '%');
    }
  },
  (error) => {
    console.error('Error loading Cassini–Huygens GLB:', error);
  }
);

const planetMeshes = [];
celestialBodies.forEach((body) => {
  // Skip Sun as it's already created separately
  if (body.name === "Sun") {
    // Use existing sun mesh
    const pivot = new THREE.Object3D();
    pivot.add(sun);
    scene.add(pivot);
    planetMeshes.push({
      mesh: sun,
      pivot: pivot,
      speed: body.speed,
      moons: [],
      type: body.type,
      orbit: null,
      body: body
    });
    return;
  }
  
  let material;
  if (body.texture) {
    const texturePath = `${BASE_URL}textures/${body.texture}`;
    const texture = loader.load(texturePath);
    material = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: body.metalness || 0.05, 
      roughness: body.roughness || 1, 
      emissive: new THREE.Color(0.0, 0.0, 0.0),
    });
  } else {
    material = new THREE.MeshStandardMaterial({
      color: body.color,
      metalness: body.metalness || 0.05,
      roughness: body.roughness || 1,
      emissive: new THREE.Color(0.0, 0.0, 0.0),
    });
  }
  // Use STL geometry for Vesta if available, otherwise use sphere
  let geo;
  if (body.name === "Vesta" && vestaSTLGeometry) {
    geo = vestaSTLGeometry.clone();
    // Calculate bounding box to scale model to vesta size
    geo.computeBoundingBox();
    const box = geo.boundingBox;
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = body.size / maxDim;
    geo.scale(scale, scale, scale);
  } else {
    geo = new THREE.SphereGeometry(body.size, 64, 64);
  }
  const mesh = new THREE.Mesh(geo, material);
  // Store reference to vesta mesh for STL geometry update
  if (body.name === "Vesta") {
    vestaMeshRef = mesh;
  }
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  const pivot = new THREE.Object3D();
  pivot.add(mesh);
  mesh.position.x = body.dist;
  if (body.initialAngle !== undefined) {
    pivot.rotation.y = body.initialAngle;
  }
  scene.add(pivot);
  
  // Skip orbit creation for stars
  if (body.type === 'star') {
    planetMeshes.push({ mesh: mesh, pivot: pivot, body: body });
    return;
  }
  
  const orbitGeo = new THREE.RingGeometry(
    body.dist - 0.05,
    body.dist + 0.05,
    128
  );
  let orbitColor, glowIntensity, baseOpacity;
  if (body.type === 'dwarf') {
    orbitColor = new THREE.Color(0.8, 0.6, 0.0);
    glowIntensity = 0.08;
    baseOpacity = 0.04;
  } else if (body.type === 'asteroid') {
    orbitColor = new THREE.Color(0.6, 0.3, 0.15);
    glowIntensity = 0.06;
    baseOpacity = 0.03;
  } else if (body.type === 'tno') {
    orbitColor = new THREE.Color(0.4, 0.15, 0.5);
    glowIntensity = 0.1;
    baseOpacity = 0.05;
  } else {
    if (body.dist < 20) {
      orbitColor = new THREE.Color(0.3, 0.5, 0.7);
      glowIntensity = 0.03;
      baseOpacity = 0.02;
    } else if (body.dist < 35) {
      orbitColor = new THREE.Color(0.5, 0.4, 0.7);
      glowIntensity = 0.05;
      baseOpacity = 0.03;
    } else {
      orbitColor = new THREE.Color(0.7, 0.3, 0.4);
      glowIntensity = 0.07;
      baseOpacity = 0.04;
    }
  }
  if (body.dist > 45) {
    glowIntensity *= 1.2;
    baseOpacity *= 1.3;
  }
  let orbitMat;
  try {
    orbitMat = new THREE.MeshBasicMaterial({
      color: orbitColor,
      emissive: orbitColor,
      emissiveIntensity: glowIntensity,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: baseOpacity,
      toneMapped: false,
    });
  } catch (error) {
    console.warn("Emissive material failed, using basic material:", error);
    orbitMat = new THREE.MeshBasicMaterial({
      color: orbitColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: baseOpacity * 2,
    });
  }
  const orbit = new THREE.Mesh(orbitGeo, orbitMat);
  orbit.rotation.x = Math.PI / 2;
  orbit.position.y = -0.01;
  if (body.dist > 40) {
    orbit.userData = {
      originalEmissive: glowIntensity,
      pulseSpeed: 0.002 + Math.random() * 0.003,
      pulsePhase: Math.random() * Math.PI * 2
    };
  }
  scene.add(orbit);
  
  // Create space probes with elliptical orbits
  const spaceProbes = [];
  if (body.spaceProbes && body.spaceProbes.length > 0) {
    body.spaceProbes.forEach((probeData) => {
      let probeMesh;
      let gltfModel = null;
      
      // Determine which GLB model to use
      if (probeData.name === "MAVEN" && mavenGLTFModel) {
        gltfModel = mavenGLTFModel;
      } else if (probeData.name === "JUNO" && junoGLTFModel) {
        gltfModel = junoGLTFModel;
      } else if (probeData.name === "Cassini–Huygens" && cassiniGLTFModel) {
        gltfModel = cassiniGLTFModel;
      } else if ((probeData.name === "OREST" || probeData.name === "EMMA") && emuGLTFModel) {
        gltfModel = emuGLTFModel;
      }
      
      // Use GLB model if available, otherwise use sphere
      if (gltfModel && gltfModel.scene) {
        console.log('Using GLB model for', probeData.name);
        const clonedScene = gltfModel.scene.clone();
        
        // Fix materials - Apply special colors for different probes
        clonedScene.traverse((child) => {
          if (child.isMesh) {
            if (child.material) {
              const materials = Array.isArray(child.material) ? child.material : [child.material];
              const newMaterials = materials.map((material) => {
                if (material) {
                  // Special material for MAVEN - with procedural textures
                  if (probeData.name === "MAVEN") {
                    return new THREE.MeshStandardMaterial({
                      // Use procedural textures for MAVEN
                      map: mavenTexture,
                      normalMap: mavenNormalMap,
                      normalScale: new THREE.Vector2(0.5, 0.5),
                      roughnessMap: mavenRoughnessMap,
                      metalnessMap: material.metalnessMap || null,
                      emissiveMap: material.emissiveMap || null,
                      // Brighter metallic silver color for MAVEN spacecraft
                      color: new THREE.Color(0.85, 0.87, 0.9),
                      roughness: 0.25,
                      metalness: 0.85,
                      emissive: material.emissive ? material.emissive.clone() : new THREE.Color(0, 0, 0),
                      transparent: false,
                      opacity: 1.0,
                      depthWrite: true,
                      blending: THREE.NormalBlending
                    });
                  }
                  // Default material for other probes
                  return new THREE.MeshStandardMaterial({
                    map: material.map || null,
                    normalMap: material.normalMap || null,
                    roughnessMap: material.roughnessMap || null,
                    metalnessMap: material.metalnessMap || null,
                    emissiveMap: material.emissiveMap || null,
                    color: material.color ? material.color.clone() : new THREE.Color(0.9, 0.9, 0.9),
                    roughness: material.roughness !== undefined ? material.roughness : 0.7,
                    metalness: material.metalness !== undefined ? material.metalness : 0.3,
                    emissive: material.emissive ? material.emissive.clone() : new THREE.Color(0, 0, 0),
                    transparent: false,
                    opacity: 1.0,
                    depthWrite: true,
                    blending: THREE.NormalBlending
                  });
                }
                // Default material based on probe type
                if (probeData.name === "MAVEN") {
                  return new THREE.MeshStandardMaterial({ 
                    map: mavenTexture,
                    normalMap: mavenNormalMap,
                    roughnessMap: mavenRoughnessMap,
                    color: new THREE.Color(0.7, 0.7, 0.75),
                    metalness: 0.8,
                    roughness: 0.3
                  });
                }
                return new THREE.MeshStandardMaterial({ color: 0xffffff });
              });
              if (Array.isArray(child.material)) {
                child.material = newMaterials;
              } else {
                child.material = newMaterials[0];
              }
            } else {
              // Default material based on probe type
              if (probeData.name === "MAVEN") {
                child.material = new THREE.MeshStandardMaterial({ 
                  map: mavenTexture,
                  normalMap: mavenNormalMap,
                  roughnessMap: mavenRoughnessMap,
                  color: new THREE.Color(0.7, 0.7, 0.75),
                  metalness: 0.8,
                  roughness: 0.3
                });
              } else {
                child.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
              }
            }
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        // Calculate bounding box to scale model
        const box = new THREE.Box3().setFromObject(clonedScene);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = probeData.size / maxDim;
        clonedScene.scale.set(scale, scale, scale);
        
        // Force update textures and color for MAVEN materials after scaling
        if (probeData.name === "MAVEN") {
          clonedScene.traverse((child) => {
            if (child.isMesh && child.material) {
              const materials = Array.isArray(child.material) ? child.material : [child.material];
              materials.forEach((mat) => {
                if (mat && mat.isMeshStandardMaterial) {
                  // Apply procedural textures
                  mat.map = mavenTexture;
                  mat.normalMap = mavenNormalMap;
                  mat.normalScale = new THREE.Vector2(0.5, 0.5);
                  mat.roughnessMap = mavenRoughnessMap;
                  mat.color.setRGB(0.85, 0.87, 0.9);
                  mat.metalness = 0.85;
                  mat.roughness = 0.25;
                  mat.needsUpdate = true;
                }
              });
            }
          });
        }
        
        probeMesh = clonedScene;
      } else {
        // Fallback to sphere
        const probeGeo = new THREE.SphereGeometry(probeData.size, 16, 16);
        const probeMat = new THREE.MeshStandardMaterial({
          color: probeData.color,
          roughness: 0.3,
          metalness: 0.8,
          emissive: probeData.color.clone().multiplyScalar(0.1)
        });
        probeMesh = new THREE.Mesh(probeGeo, probeMat);
      }
      
      const probePivot = new THREE.Object3D();
      probePivot.add(probeMesh);
      
      // For OREST and EMMA, attach to Moon instead of planet
      // We'll find the Moon mesh later in the animation
      if (probeData.name === "OREST" || probeData.name === "EMMA") {
        // Store reference to attach to Moon later
        probePivot.userData.attachToMoon = true;
        // Add to planet mesh for now, will be moved to Moon in animation
        mesh.add(probePivot);
      } else {
        mesh.add(probePivot);
      }
      
      // Initialize elliptical orbit position
      const orbit = probeData.orbit;
      const meanAnomaly = orbit.meanAnomaly || 0;
      const pos = calculateEllipticalOrbit(orbit, meanAnomaly);
      probeMesh.position.set(pos.x, pos.y, pos.z);
      
      // Create elliptical orbit visualization for space probe
      const orbitPoints = [];
      const numPoints = 128;
      for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const pos = calculateEllipticalOrbit(orbit, angle);
        orbitPoints.push(new THREE.Vector3(pos.x, pos.y, pos.z));
      }
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      
      // Use similar colors to planet orbits based on parent planet distance
      let orbitColor, glowIntensity, baseOpacity;
      if (body.dist < 20) {
        orbitColor = new THREE.Color(0.3, 0.5, 0.7);
        glowIntensity = 0.03;
        baseOpacity = 0.02;
      } else if (body.dist < 35) {
        orbitColor = new THREE.Color(0.5, 0.4, 0.7);
        glowIntensity = 0.05;
        baseOpacity = 0.03;
      } else {
        orbitColor = new THREE.Color(0.7, 0.3, 0.4);
        glowIntensity = 0.07;
        baseOpacity = 0.04;
      }
      
      // LineBasicMaterial doesn't support emissive, use regular material with adjusted opacity
      // Make orbits thicker and more visible for space probes
      const orbitMat = new THREE.LineBasicMaterial({
        color: orbitColor,
        transparent: true,
        opacity: baseOpacity * 2.5, // Brighter for better visibility
        linewidth: 3, // Thicker lines (note: may not work in all browsers, but helps where supported)
      });
      
      const orbitLine = new THREE.Line(orbitGeometry, orbitMat);
      // Orbit is relative to planet center, so position at origin
      orbitLine.position.set(0, 0, 0);
      // Attach orbit to the planet mesh (parent of probePivot)
      mesh.add(orbitLine);
      orbitLine.visible = showSpaceProbeOrbits;
      
      // Create space probe reference for animation
      const probeRef = {
        mesh: probeMesh,
        pivot: probePivot,
        orbit: orbit,
        orbitLine: orbitLine, // Store reference to orbit line
        meanAnomaly: meanAnomaly,
        name: probeData.name,
        info: probeData.info,
        body: body, // Store reference to body for Moon lookup
        probeData: probeData // Store probe data for model update
      };
      
      // Store reference for GLB model update
      spaceProbeMeshesRefs.push({
        mesh: probeMesh,
        pivot: probePivot,
        probeRef: probeRef,
        name: probeData.name,
        body: body
      });
      
      spaceProbes.push(probeRef);
    });
  }
  
  if (body.hasRings) {
    const ringTex = loader.load(`${BASE_URL}textures/saturn_ring.png`);
    // Increase ring size by 25%
    const innerRadius = (body.size + 0.5) * 1.25;
    const outerRadius = (body.size + 1.2) * 1.25;
    const ringGeo = new THREE.RingGeometry(
      innerRadius,
      outerRadius,
      64
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: ringTex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
      alphaMap: ringTex,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    // Tilt rings by 15 degrees: start from horizontal (Math.PI / 2) and add tilt
    ring.rotation.x = Math.PI / 2 + Math.PI / 12; // 15 degrees tilt (Math.PI / 12 = 15°)
    ring.castShadow = true;
    ring.receiveShadow = true;
    mesh.add(ring);
  }
  const moons = [];
  if (body.moons && body.moons.length > 0) {
    body.moons.forEach((moonData) => {
      // Use sphere geometry for moons
      const moonGeo = new THREE.SphereGeometry(moonData.size, 32, 32);
      let moonMat;
      // Use texture for Earth's Moon if available
      if (body.name === "Earth" && moonData.name === "Moon") {
        const moonTexture = loader.load(`${BASE_URL}textures/moon.png`);
        moonMat = new THREE.MeshStandardMaterial({
          map: moonTexture,
          roughness: 0.9,
          metalness: 0.1
        });
      } else if (body.name === "Jupiter") {
        // Load textures for Jupiter's moons: Europa, Ganymede, Callisto
        let moonTexturePath = null;
        if (moonData.name === "Europa") {
          moonTexturePath = `${BASE_URL}textures/Jupiter – Europa.png`;
        } else if (moonData.name === "Ganymede") {
          moonTexturePath = `${BASE_URL}textures/Jupiter – Ganymede.png`;
        } else if (moonData.name === "Callisto") {
          moonTexturePath = `${BASE_URL}textures/Jupiter – Callisto.png`;
        }
        
        if (moonTexturePath) {
          const moonTexture = loader.load(moonTexturePath);
          moonMat = new THREE.MeshStandardMaterial({
            map: moonTexture,
            color: moonData.color, // Keep color as fallback/overlay
            roughness: 0.9,
            metalness: 0.1
          });
        } else {
          // For other Jupiter moons (like Io), use color
          moonMat = new THREE.MeshStandardMaterial({
            color: moonData.color,
            roughness: 0.9,
            metalness: 0.1
          });
        }
      } else if (body.name === "Saturn" && moonData.name === "Titan") {
        // Load texture for Saturn's moon Titan
        const moonTexture = loader.load(`${BASE_URL}textures/Saturn - Titan.jpg`);
        moonMat = new THREE.MeshStandardMaterial({
          map: moonTexture,
          color: moonData.color, // Keep color as fallback/overlay
          roughness: 0.9,
          metalness: 0.1
        });
      } else if (body.name === "Pluto" && moonData.name === "Charon") {
        // Load texture for Pluto's moon Charon
        const moonTexture = loader.load(`${BASE_URL}textures/Pluto - Charon.jpg`);
        moonMat = new THREE.MeshStandardMaterial({
          map: moonTexture,
          color: moonData.color, // Keep color as fallback/overlay
          roughness: 0.9,
          metalness: 0.1
        });
      } else {
        moonMat = new THREE.MeshStandardMaterial({
          color: moonData.color,
          roughness: 0.9,
          metalness: 0.1
        });
      }
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      const moonPivot = new THREE.Object3D();
      moonPivot.add(moonMesh);
      moonMesh.position.x = moonData.dist;
      if (moonData.initialAngle !== undefined) {
        moonPivot.rotation.y = moonData.initialAngle;
      }
      mesh.add(moonPivot);
      
      // Create space objects orbiting the moon
      const spaceObjects = [];
      if (moonData.spaceObjects && moonData.spaceObjects.length > 0) {
        moonData.spaceObjects.forEach((spaceObjData, spaceObjIndex) => {
          let spaceObjMesh;
          
          // Use GLB model if available, otherwise use sphere
          if (emuGLTFModel && emuGLTFModel.scene) {
            console.log('Using GLB model for', spaceObjData.name);
            const clonedScene = emuGLTFModel.scene.clone();
            
            // Fix materials - replace with opaque materials to ensure visibility
            clonedScene.traverse((child) => {
              if (child.isMesh) {
                if (child.material) {
                  // Handle array of materials
                  const materials = Array.isArray(child.material) ? child.material : [child.material];
                  const newMaterials = materials.map((material) => {
                    if (material) {
                      // Create new opaque material, preserving texture if available
                      const newMaterial = new THREE.MeshStandardMaterial({
                        map: material.map || null,
                        normalMap: material.normalMap || null,
                        roughnessMap: material.roughnessMap || null,
                        metalnessMap: material.metalnessMap || null,
                        emissiveMap: material.emissiveMap || null,
                        color: material.color ? material.color.clone() : new THREE.Color(0.9, 0.9, 0.9),
                        roughness: material.roughness !== undefined ? material.roughness : 0.7,
                        metalness: material.metalness !== undefined ? material.metalness : 0.3,
                        emissive: material.emissive ? material.emissive.clone() : new THREE.Color(0, 0, 0),
                        transparent: false,
                        opacity: 1.0,
                        alphaTest: 0,
                        depthWrite: true,
                        blending: THREE.NormalBlending
                      });
                      // If texture exists, ensure it's loaded
                      if (newMaterial.map) {
                        newMaterial.map.needsUpdate = true;
                      }
                      return newMaterial;
                    }
                    return new THREE.MeshStandardMaterial({ color: 0xffffff });
                  });
                  // Update material reference
                  if (Array.isArray(child.material)) {
                    child.material = newMaterials;
                  } else {
                    child.material = newMaterials[0];
                  }
                } else {
                  // If no material, create a default opaque material
                  child.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
                }
                // Enable shadows
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });
            
            // Calculate bounding box to scale model
            const box = new THREE.Box3().setFromObject(clonedScene);
            const size = new THREE.Vector3();
            box.getSize(size);
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = spaceObjData.size / maxDim;
            clonedScene.scale.set(scale, scale, scale);
            spaceObjMesh = clonedScene;
          } else {
            console.log('Using fallback sphere for', spaceObjData.name, '- GLB model not loaded yet (emuGLTFModel:', !!emuGLTFModel, ')');
            // Fallback to sphere if GLB not loaded yet
            const spaceObjGeo = new THREE.SphereGeometry(spaceObjData.size, 16, 16);
            const spaceObjMat = new THREE.MeshStandardMaterial({
              color: spaceObjData.color,
              roughness: 0.3,
              metalness: 0.8,
              emissive: spaceObjData.color.clone().multiplyScalar(0.1)
            });
            spaceObjMesh = new THREE.Mesh(spaceObjGeo, spaceObjMat);
          }
          
          const spaceObjPivot = new THREE.Object3D();
          spaceObjPivot.add(spaceObjMesh);
          spaceObjMesh.position.x = spaceObjData.dist;
          if (spaceObjData.initialAngle !== undefined) {
            spaceObjPivot.rotation.y = spaceObjData.initialAngle;
          }
          moonMesh.add(spaceObjPivot);
          
          // Create space object reference for animation
          const spaceObjRef = {
            mesh: spaceObjMesh,
            pivot: spaceObjPivot,
            speed: spaceObjData.speed,
            name: spaceObjData.name
          };
          
          // Store reference for GLB model update (with link to spaceObjRef)
          spaceObjectMeshesRefs.push({ 
            mesh: spaceObjMesh, 
            pivot: spaceObjPivot, 
            spaceObjRef: spaceObjRef,
            name: spaceObjData.name
          });
          
          spaceObjects.push(spaceObjRef);
        });
      }
      
      moons.push({
        mesh: moonMesh,
        pivot: moonPivot,
        speed: moonData.speed,
        spaceObjects: spaceObjects,
        name: moonData.name
      });
    });
  }
  planetMeshes.push({
    mesh,
    pivot,
    speed: body.speed,
    moons: moons,
    spaceProbes: spaceProbes,
    type: body.type,
    orbit: orbit,
    body: body
  });
});
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.5,
  0.6,
  0.05
);
bloomPass.strength = 0.4;
bloomPass.radius = 0.6;
bloomPass.threshold = 0.05;
composer.addPass(bloomPass);
const outputPass = new OutputPass();
composer.addPass(outputPass);
function createStarfield() {
  const starCount = 20000;
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i += 3) {
    const radius = 150 + Math.random() * 250;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1); 
    starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
    starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    starPositions[i + 2] = radius * Math.cos(phi);
    const colorVariation = 0.7 + Math.random() * 0.3;
    const blueTint = 0.8 + Math.random() * 0.2;
    starColors[i] = colorVariation;
    starColors[i + 1] = colorVariation * blueTint;
    starColors[i + 2] = 1.0;
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
  const starMaterial = new THREE.PointsMaterial({
    size: 0.8,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 1.0,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
  return stars;
}
const starfield = createStarfield();
let frameCount = 0;
let animationSpeed = 0.4;
let isPaused = false;
let currentDate = new Date();
let timePerFrame = 1000 * 60 * 60 * 24;
let showOrbits = true;
let showAsteroids = true;
let showMoons = true;
let showPlanetLabels = false;
const planetLabels = [];
let followingPlanet = null;
let followOffset = new THREE.Vector3(10, 5, 10);
let lastPlanetPosition = new THREE.Vector3();
let userCameraOffset = new THREE.Vector3();
function createPlanetLabels() {
  planetMeshes.forEach((planetObj, index) => {
    const body = celestialBodies[index];
    const labelDiv = document.createElement('div');
    labelDiv.className = 'planet-label';
    labelDiv.textContent = body.name;
    labelDiv.style.display = 'none';
    document.body.appendChild(labelDiv);
    planetLabels.push({
      element: labelDiv,
      planetMesh: planetObj.mesh,
      body: body
    });
  });
}
function updatePlanetLabels() {
  if (!showPlanetLabels) return;
  planetLabels.forEach(label => {
    const vector = new THREE.Vector3();
    label.planetMesh.getWorldPosition(vector);
    vector.project(camera);
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (vector.y * -0.5 + 0.5) * window.innerHeight;
    label.element.style.left = x + 'px';
    label.element.style.top = (y - 20) + 'px';
    if (vector.z > 1) {
      label.element.style.display = 'none';
    } else {
      label.element.style.display = showPlanetLabels ? 'block' : 'none';
    }
  });
}
let showMoonLabels = false;
const moonLabels = [];
function createMoonLabels() {
  planetMeshes.forEach((planetObj, planetIndex) => {
    const body = celestialBodies[planetIndex];
    if (body.moons && body.moons.length > 0) {
      body.moons.forEach((moonData, moonIndex) => {
        const labelDiv = document.createElement('div');
        labelDiv.className = 'moon-label';
        labelDiv.textContent = moonData.name;
        labelDiv.style.display = 'none';
        document.body.appendChild(labelDiv);
        moonLabels.push({
          element: labelDiv,
          moonMesh: planetObj.moons[moonIndex].mesh,
          moonData: moonData
        });
      });
    }
  });
}
function updateMoonLabels() {
  if (!showMoonLabels) return;
  moonLabels.forEach(label => {
    const vector = new THREE.Vector3();
    label.moonMesh.getWorldPosition(vector);
    vector.project(camera);
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (vector.y * -0.5 + 0.5) * window.innerHeight;
    label.element.style.left = x + 'px';
    label.element.style.top = (y - 15) + 'px';
    if (vector.z > 1) {
      label.element.style.display = 'none';
    } else {
      label.element.style.display = showMoonLabels ? 'block' : 'none';
    }
  });
}
createPlanetLabels();
createMoonLabels();
function animate() {
  requestAnimationFrame(animate);
  if (frameCount % 60 === 0) {
    console.log(`Animation running. Frame: ${frameCount}, Paused: ${isPaused}, Speed: ${animationSpeed}`);
  }
  frameCount++;
  if (!isPaused) {
    let realTimeMultiplier = animationSpeed === 0 ? 0.0001 : animationSpeed;
    if (animationSpeed === 0) {
      currentDate = new Date();
    } else {
      const deltaTime = timePerFrame * realTimeMultiplier / 60;
      currentDate.setTime(currentDate.getTime() + deltaTime);
    }
    sun.rotation.y += 0.002 * realTimeMultiplier;
    planetMeshes.forEach((p) => {
  p.pivot.rotation.y += p.speed * realTimeMultiplier;
  p.mesh.rotation.y += 0.01 * realTimeMultiplier;
      if (p.orbit && p.orbit.userData && p.orbit.userData.pulseSpeed) {
        try {
          const time = Date.now() * 0.001;
          const pulse = Math.sin(time * p.orbit.userData.pulseSpeed + p.orbit.userData.pulsePhase) * 0.3 + 0.7;
          if (p.orbit.material.emissiveIntensity !== undefined) {
            p.orbit.material.emissiveIntensity = p.orbit.userData.originalEmissive * pulse;
          }
          if (!p.orbit.userData.originalOpacity) {
            p.orbit.userData.originalOpacity = p.orbit.material.opacity;
          }
          p.orbit.material.opacity = p.orbit.userData.originalOpacity * (0.8 + pulse * 0.2);
        } catch (error) {
          console.warn("Orbit pulsing animation error:", error);
        }
      }
      if (p.moons && p.moons.length > 0) {
        p.moons.forEach((moon) => {
          moon.pivot.rotation.y += moon.speed * realTimeMultiplier;
          // For Earth's Moon: tidal locking - compensate orbital rotation to always face Earth
          // For other moons: normal rotation
          const body = celestialBodies[planetMeshes.indexOf(p)];
          const isEarthMoon = body && body.name === "Earth" && moon.name === "Moon";
          if (isEarthMoon) {
            // Compensate orbital rotation to keep Moon facing Earth (tidal locking)
            moon.mesh.rotation.y -= moon.speed * realTimeMultiplier;
          } else {
            // Normal rotation for other moons
            moon.mesh.rotation.y += 0.02 * realTimeMultiplier;
          }
          // Update space objects orbiting the moon
          if (moon.spaceObjects && moon.spaceObjects.length > 0) {
            // Get moon's world position for EMU objects to face it
            const moonWorldPos = new THREE.Vector3();
            moon.mesh.getWorldPosition(moonWorldPos);
            
            moon.spaceObjects.forEach((spaceObj) => {
              spaceObj.pivot.rotation.y += spaceObj.speed * realTimeMultiplier;
              
              // Get world position of this space object
              const spaceObjWorldPos = new THREE.Vector3();
              spaceObj.pivot.getWorldPosition(spaceObjWorldPos);
              
              // If this is an EMU object (OREST or EMMA), make it face the Moon
              if (spaceObj.name === "OREST" || spaceObj.name === "EMMA") {
                // Calculate direction from this EMU to the Moon
                const directionToMoon = new THREE.Vector3().subVectors(moonWorldPos, spaceObjWorldPos).normalize();
                
                // Calculate rotation to face the Moon
                // Model faces forward along X axis initially (left side was facing, so rotate 90 degrees)
                const forward = new THREE.Vector3(1, 0, 0);
                const quaternion = new THREE.Quaternion().setFromUnitVectors(forward, directionToMoon);
                
                // Apply additional 160-degree rotation to the left (counter-clockwise around Y axis)
                const additionalRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -160 * Math.PI / 180); // -160 degrees
                quaternion.multiply(additionalRotation);
                
                // Apply rotation to the mesh
                if (spaceObj.mesh) {
                  spaceObj.mesh.quaternion.copy(quaternion);
                  // Add slight rotation around Y axis for natural look (very slow)
                  spaceObj.mesh.rotation.y += 0.002 * realTimeMultiplier;
                } else if (spaceObj.mesh && spaceObj.mesh.children && spaceObj.mesh.children.length > 0) {
                  // If it's a Group, apply to all children
                  spaceObj.mesh.children.forEach(child => {
                    if (child.rotation !== undefined) {
                      child.quaternion.copy(quaternion);
                      child.rotation.y += 0.002 * realTimeMultiplier;
                    }
                  });
                }
              } else {
                // For non-EMU objects, use normal rotation
                // Rotate GLB model (which is a Group/Object3D) or Mesh
                if (spaceObj.mesh && spaceObj.mesh.rotation !== undefined) {
                  spaceObj.mesh.rotation.y += 0.005 * realTimeMultiplier; // Reduced from 0.05
                } else if (spaceObj.mesh && spaceObj.mesh.children && spaceObj.mesh.children.length > 0) {
                  // If it's a Group, rotate all children
                  spaceObj.mesh.children.forEach(child => {
                    if (child.rotation !== undefined) {
                      child.rotation.y += 0.005 * realTimeMultiplier; // Reduced from 0.05
                    }
                  });
                }
              }
            });
          }
        });
      }
      
      // Update space probes with elliptical orbits
      if (p.spaceProbes && p.spaceProbes.length > 0) {
        p.spaceProbes.forEach((probe) => {
          // Special handling for OREST and EMMA - they orbit around Moon
          if (probe.name === "OREST" || probe.name === "EMMA") {
            // Find Moon mesh
            const moon = p.moons && p.moons.length > 0 ? p.moons.find(m => m.name === "Moon") : null;
            if (moon && moon.mesh) {
              // Attach to Moon if not already attached
              if (probe.pivot.parent !== moon.mesh) {
                const oldParent = probe.pivot.parent;
                if (oldParent) {
                  oldParent.remove(probe.pivot);
                }
                moon.mesh.add(probe.pivot);
              }
              
              // Update mean anomaly - use speed from orbit
              const speed = probe.orbit.orbitalPeriod > 0 ? (2 * Math.PI) / (probe.orbit.orbitalPeriod * 24 * 3600) : 0.0001;
              probe.meanAnomaly += speed * realTimeMultiplier * (timePerFrame / 1000);
              if (probe.meanAnomaly > 2 * Math.PI) {
                probe.meanAnomaly -= 2 * Math.PI;
              }
              
              // Calculate position relative to Moon
              const pos = calculateEllipticalOrbit(probe.orbit, probe.meanAnomaly);
              probe.mesh.position.set(pos.x, pos.y, pos.z);
              
              // Make probe face Moon (similar to old behavior)
              const moonWorldPos = new THREE.Vector3();
              moon.mesh.getWorldPosition(moonWorldPos);
              const probeWorldPos = new THREE.Vector3();
              probe.pivot.getWorldPosition(probeWorldPos);
              const directionToMoon = new THREE.Vector3().subVectors(moonWorldPos, probeWorldPos).normalize();
              const forward = new THREE.Vector3(1, 0, 0);
              const quaternion = new THREE.Quaternion().setFromUnitVectors(forward, directionToMoon);
              const additionalRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -160 * Math.PI / 180);
              quaternion.multiply(additionalRotation);
              if (probe.mesh.quaternion) {
                probe.mesh.quaternion.copy(quaternion);
              }
            }
          } else {
            // Normal space probes orbiting the planet
            // Update mean anomaly based on orbital period
            const orbitalPeriod = probe.orbit.orbitalPeriod;
            // Convert to seconds
            const periodInSeconds = orbitalPeriod < 1 ? orbitalPeriod * 3600 : orbitalPeriod * 24 * 3600;
            // Calculate angular speed in radians per second
            const angularSpeedRadPerSec = (2 * Math.PI) / periodInSeconds;
            // Convert to radians per frame (assuming 60 FPS)
            const frameTime = timePerFrame / 1000; // Convert to seconds
            const angularSpeed = angularSpeedRadPerSec * frameTime;
            
            // Update mean anomaly
            probe.meanAnomaly += angularSpeed * realTimeMultiplier;
            if (probe.meanAnomaly > 2 * Math.PI) {
              probe.meanAnomaly -= 2 * Math.PI;
            }
            
            // Calculate new position on elliptical orbit
            const pos = calculateEllipticalOrbit(probe.orbit, probe.meanAnomaly);
            probe.mesh.position.set(pos.x, pos.y, pos.z);
          }
        });
      }
    });
    Object.values(asteroidBelts).forEach(belt => {
      belt.forEach((asteroid) => {
        asteroid.mesh.rotation.x += asteroid.rotationSpeed.x * realTimeMultiplier;
        asteroid.mesh.rotation.y += asteroid.rotationSpeed.y * realTimeMultiplier;
        asteroid.mesh.rotation.z += asteroid.rotationSpeed.z * realTimeMultiplier;
      asteroid.angle += asteroid.orbitSpeed * realTimeMultiplier;
        asteroid.mesh.position.x = Math.cos(asteroid.angle) * asteroid.radius;
        asteroid.mesh.position.z = Math.sin(asteroid.angle) * asteroid.radius;
      });
    });
      starfield.rotation.y += 0.0001 * realTimeMultiplier;
  }
  controls.update();
  if (followingPlanet) {
    const planetPos = new THREE.Vector3();
    followingPlanet.mesh.getWorldPosition(planetPos);
    if (followingType === 'sun') {
      controls.target.copy(planetPos);
    } else {
      const planetMovement = planetPos.clone().sub(lastPlanetPosition);
      if (!lastPlanetPosition.equals(new THREE.Vector3(0, 0, 0))) {
        camera.position.add(planetMovement);
        controls.target.add(planetMovement);
      } else {
        camera.position.copy(planetPos.clone().add(followOffset));
        controls.target.copy(planetPos);
      }
    }
    lastPlanetPosition.copy(planetPos);
  }
  updatePlanetLabels();
  updateMoonLabels();
  const distanceToSun = camera.position.distanceTo(sun.position);
  const maxDistance = 100;
  const minDistance = 10;
  const normalizedDistance = Math.max(0, Math.min(1, (distanceToSun - minDistance) / (maxDistance - minDistance)));
  if (bloomPass && !isBloomManual) {
    bloomPass.strength = 0.5 + (1 - normalizedDistance) * 1.0;
    bloomPass.radius = 0.6 + (1 - normalizedDistance) * 0.4;
  } else if (bloomPass && isBloomManual) {
    bloomPass.strength = manualBloomStrength;
    bloomPass.radius = 0.6 + (1 - normalizedDistance) * 0.2;
  }
  try {
    composer.render();
  } catch (error) {
    console.error("Composer rendering failed, falling back to direct rendering:", error);
    renderer.render(scene, camera);
  }
}
async function initializeRealObjects() {
  try {
    console.log("Initializing real-time NASA data...");
    await addRealAsteroids();
    await addComets();
    console.log("Real-time NASA data initialization complete");
  } catch (error) {
    console.error("Error initializing real objects:", error);
  }
}
setTimeout(() => {
  animate();
  initializeRealObjects();
}, 200);
const speedControl = document.getElementById('speedControl');
const speedValue = document.getElementById('speedValue');
if (speedControl && speedValue) {
  speedControl.addEventListener('input', (e) => {
    animationSpeed = parseFloat(e.target.value);
    if (animationSpeed === 0) {
      speedValue.textContent = '0x Real Earth Time';
    } else if (animationSpeed < 1) {
      // Use toFixed(2) to show 0.05 correctly, but remove trailing zero for .0, .5, etc.
      const formatted = animationSpeed % 1 === 0 ? animationSpeed.toFixed(0) : 
                        animationSpeed % 0.1 === 0 ? animationSpeed.toFixed(1) : 
                        animationSpeed.toFixed(2);
      speedValue.textContent = formatted + 'x Slow';
    } else {
      speedValue.textContent = animationSpeed.toFixed(1) + 'x Fast';
    }
  });
}
const hideUIBtn = document.getElementById('hideUIBtn');
const showUIBtn = document.getElementById('showUIBtn');
const uiControls = document.getElementById('uiControls');
const celestialPanel = document.querySelector('.celestial-panel');
if (hideUIBtn && showUIBtn && uiControls) {
  hideUIBtn.addEventListener('click', () => {
    uiControls.classList.add('ui-hidden');
    if (celestialPanel) celestialPanel.classList.add('ui-hidden');
    showUIBtn.style.display = 'block';
  });
  showUIBtn.addEventListener('click', () => {
    uiControls.classList.remove('ui-hidden');
    if (celestialPanel) celestialPanel.classList.remove('ui-hidden');
    showUIBtn.style.display = 'none';
  });
}
let isBloomManual = false;
let manualBloomStrength = 0.4;
const bloomControl = document.getElementById('bloomControl');
const bloomValue = document.getElementById('bloomValue');
if (bloomControl && bloomValue) {
  isBloomManual = true;
  manualBloomStrength = 0.4;
  bloomPass.strength = 0.4;
  bloomControl.value = 0.4;
  bloomValue.textContent = '0.4';
  bloomControl.addEventListener('input', (e) => {
    const strength = parseFloat(e.target.value);
    manualBloomStrength = strength;
    isBloomManual = true;
    bloomPass.strength = strength;
    bloomValue.textContent = strength.toFixed(1);
    const bloomModeBtn = document.getElementById('bloomModeBtn');
    if (bloomModeBtn) {
      bloomModeBtn.textContent = 'Auto Bloom';
      bloomModeBtn.classList.add('active');
    }
    console.log(`Manual bloom set to: ${strength}`);
  });
}
const bloomModeBtn = document.getElementById('bloomModeBtn');
if (bloomModeBtn) {
  bloomModeBtn.addEventListener('click', () => {
    isBloomManual = !isBloomManual;
    bloomModeBtn.textContent = isBloomManual ? 'Auto Bloom' : 'Manual Bloom';
    bloomModeBtn.classList.toggle('active', isBloomManual);
    if (!isBloomManual) {
      console.log('Switched to automatic bloom mode');
    } else {
      console.log('Switched to manual bloom mode');
      bloomPass.strength = manualBloomStrength;
    }
  });
  bloomModeBtn.textContent = isBloomManual ? 'Auto Bloom' : 'Manual Bloom';
  bloomModeBtn.classList.toggle('active', isBloomManual);
}
const pauseBtn = document.getElementById('pauseBtn');
if (pauseBtn) {
  pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    pauseBtn.classList.toggle('active', isPaused);
  });
}
const resetBtn = document.getElementById('resetBtn');
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    stopFollowingPlanet();
  });
}
const orbitsBtn = document.getElementById('orbitsBtn');
if (orbitsBtn) {
  orbitsBtn.addEventListener('click', () => {
    showOrbits = !showOrbits;
    orbitsBtn.classList.toggle('active', showOrbits);
    planetMeshes.forEach(planet => {
      if (planet.orbit) {
        planet.orbit.visible = showOrbits;
      }
    });
  });
}
const spaceProbeOrbitsBtn = document.getElementById('spaceProbeOrbitsBtn');
if (spaceProbeOrbitsBtn) {
  spaceProbeOrbitsBtn.addEventListener('click', () => {
    showSpaceProbeOrbits = !showSpaceProbeOrbits;
    spaceProbeOrbitsBtn.classList.toggle('active', showSpaceProbeOrbits);
    // Toggle visibility of all space probe orbits
    planetMeshes.forEach(planet => {
      if (planet.spaceProbes && planet.spaceProbes.length > 0) {
        planet.spaceProbes.forEach(probe => {
          if (probe.orbitLine) {
            probe.orbitLine.visible = showSpaceProbeOrbits;
          }
        });
      }
    });
  });
}
const mainAsteroidsBtn = document.getElementById('mainAsteroidsBtn');
if (mainAsteroidsBtn) {
  mainAsteroidsBtn.addEventListener('click', () => {
    // Main belt consists of inner, middle, and outer parts
    const isVisible = !asteroidBelts.inner[0]?.mesh.visible ||
                      !asteroidBelts.middle[0]?.mesh.visible ||
                      !asteroidBelts.outer[0]?.mesh.visible;
    mainAsteroidsBtn.classList.toggle('active', isVisible);
    // Toggle all three parts of the main belt
    asteroidBelts.inner.forEach(asteroid => {
      asteroid.mesh.visible = isVisible;
    });
    asteroidBelts.middle.forEach(asteroid => {
      asteroid.mesh.visible = isVisible;
    });
    asteroidBelts.outer.forEach(asteroid => {
      asteroid.mesh.visible = isVisible;
    });
  });
}
const trojansBtn = document.getElementById('trojansBtn');
if (trojansBtn) {
  trojansBtn.addEventListener('click', () => {
    const isVisible = !asteroidBelts.trojans[0]?.mesh.visible;
    trojansBtn.classList.toggle('active', isVisible);
    asteroidBelts.trojans.forEach(asteroid => {
      asteroid.mesh.visible = isVisible;
    });
  });
}
const kuiperBtn = document.getElementById('kuiperBtn');
if (kuiperBtn) {
  kuiperBtn.addEventListener('click', () => {
    const isVisible = !asteroidBelts.kuiper[0]?.mesh.visible;
    kuiperBtn.classList.toggle('active', isVisible);
    asteroidBelts.kuiper.forEach(asteroid => {
      asteroid.mesh.visible = isVisible;
    });
  });
}
const scatteredBtn = document.getElementById('scatteredBtn');
if (scatteredBtn) {
  scatteredBtn.addEventListener('click', () => {
    const isVisible = !asteroidBelts.scattered[0]?.mesh.visible;
    scatteredBtn.classList.toggle('active', isVisible);
    asteroidBelts.scattered.forEach(asteroid => {
      asteroid.mesh.visible = isVisible;
    });
  });
}
const moonsBtn = document.getElementById('moonsBtn');
if (moonsBtn) {
  moonsBtn.addEventListener('click', () => {
    showMoons = !showMoons;
    moonsBtn.classList.toggle('active', showMoons);
    planetMeshes.forEach(planet => {
      if (planet.moons) {
        planet.moons.forEach(moon => {
          moon.mesh.visible = showMoons;
        });
      }
    });
  });
}
const labelToggle = document.getElementById('labelToggle');
if (labelToggle) {
  labelToggle.addEventListener('click', () => {
    showPlanetLabels = !showPlanetLabels;
    labelToggle.classList.toggle('active', showPlanetLabels);
    labelToggle.textContent = showPlanetLabels ? 'Hide Planet Names' : 'Show Planet Names';
    planetLabels.forEach(label => {
      label.element.style.display = showPlanetLabels ? 'block' : 'none';
    });
  });
}
const moonLabelToggle = document.getElementById('moonLabelToggle');
if (moonLabelToggle) {
  moonLabelToggle.addEventListener('click', () => {
    showMoonLabels = !showMoonLabels;
    moonLabelToggle.classList.toggle('active', showMoonLabels);
    moonLabelToggle.textContent = showMoonLabels ? 'Hide Moon Names' : 'Show Moon Names';
    moonLabels.forEach(label => {
      label.element.style.display = showMoonLabels ? 'block' : 'none';
    });
  });
}
const realAsteroidsBtn = document.getElementById('realAsteroidsBtn');
if (realAsteroidsBtn) {
  realAsteroidsBtn.addEventListener('click', () => {
    const isVisible = !realAsteroids[0]?.visible;
    realAsteroidsBtn.classList.toggle('active', isVisible);
    realAsteroids.forEach(asteroid => {
      asteroid.visible = isVisible;
    });
  });
}
const cometsBtn = document.getElementById('cometsBtn');
if (cometsBtn) {
  cometsBtn.addEventListener('click', () => {
    const isVisible = !cometObjects[0]?.visible;
    cometsBtn.classList.toggle('active', isVisible);
    cometObjects.forEach(comet => {
      comet.visible = isVisible;
    });
  });
}
const allAsteroidsBtn = document.getElementById('allAsteroidsBtn');
if (allAsteroidsBtn) {
  allAsteroidsBtn.addEventListener('click', () => {
    const allVisible = !asteroidBelts.inner[0]?.mesh.visible ||
                       !asteroidBelts.middle[0]?.mesh.visible ||
                       !asteroidBelts.outer[0]?.mesh.visible ||
                       !asteroidBelts.trojans[0]?.mesh.visible ||
                       !asteroidBelts.kuiper[0]?.mesh.visible ||
                       !asteroidBelts.scattered[0]?.mesh.visible ||
                       !asteroidBelts.oort[0]?.mesh.visible;
    allAsteroidsBtn.classList.toggle('active', allVisible);
    // Toggle all asteroid belts
    Object.values(asteroidBelts).forEach(belt => {
      belt.forEach(asteroid => {
        asteroid.mesh.visible = allVisible;
      });
    });
    // Update individual buttons - main belt is active if all its parts are visible
    if (mainAsteroidsBtn) {
      const mainBeltVisible = asteroidBelts.inner[0]?.mesh.visible && 
                              asteroidBelts.middle[0]?.mesh.visible && 
                              asteroidBelts.outer[0]?.mesh.visible;
      mainAsteroidsBtn.classList.toggle('active', mainBeltVisible);
    }
    if (trojansBtn) trojansBtn.classList.toggle('active', allVisible);
    if (kuiperBtn) kuiperBtn.classList.toggle('active', allVisible);
    if (scatteredBtn) scatteredBtn.classList.toggle('active', allVisible);
  });
}
function updatePlanetList() {
const planetList = document.getElementById('planetList');
  if (!planetList) return;
  planetList.innerHTML = '';
  const groupedBodies = {
    star: celestialBodies.filter(b => b.type === 'star'),
    planet: celestialBodies.filter(b => b.type === 'planet'),
    dwarf: celestialBodies.filter(b => b.type === 'dwarf'),
    asteroid: celestialBodies.filter(b => b.type === 'asteroid'),
    tno: celestialBodies.filter(b => b.type === 'tno')
  };
  const typeLabels = {
    star: t('star'),
    planet: t('planet'),
    dwarf: t('dwarfPlanet'), 
    asteroid: `MAJOR ${t('asteroid')}`,
    tno: t('tno')
  };
  Object.entries(groupedBodies).forEach(([type, bodies]) => {
    if (bodies.length === 0) return;
    const categoryHeader = document.createElement('div');
    categoryHeader.className = 'category-header';
    categoryHeader.innerHTML = `<strong>${typeLabels[type]}</strong>`;
    planetList.appendChild(categoryHeader);
    bodies.forEach((body, localIndex) => {
      const globalIndex = celestialBodies.indexOf(body);
      const planetItem = document.createElement('div');
      planetItem.className = `planet-item ${body.type}`;
      const moonText = body.moons && body.moons.length > 0 ? 
        `<br><small>${t('moonsLabel')} ${body.moons.length}</small>` : '';
      const sizeText = body.sizeRelativeEarth ? 
        `${t('size')} ${body.sizeRelativeEarth}x ${t('earth')}` : 
        `${t('size')} ${body.size}`;
      
      // For stars, don't show distance and discovery year
      let planetItemHTML = `<strong>${body.name}</strong>`;
      if (body.type === 'star') {
        planetItemHTML += `<br><small>${sizeText}</small>`;
      } else {
        const distanceText = `${t('distance')} ${body.dist} ${t('au')}`;
        planetItemHTML += `<br><small>${distanceText} | ${sizeText}</small>`;
        planetItemHTML += `<br><small>${t('discovered')} ${body.discoveryYear}</small>`;
      }
      planetItemHTML += moonText;
      planetItem.innerHTML = planetItemHTML;
      planetItem.addEventListener('click', () => {
        showPlanetInfoCard(body, globalIndex);
        const planet = planetMeshes[globalIndex];
        if (planet) {
          followingPlanet = planet;
          const distance = Math.max(body.size * 8, 15);
          followOffset.set(distance, distance * 0.5, distance);
          lastPlanetPosition.set(0, 0, 0);
          userCameraOffset.set(0, 0, 0);
          const planetPos = new THREE.Vector3();
          planet.mesh.getWorldPosition(planetPos);
          camera.position.copy(planetPos.clone().add(followOffset));
          controls.target.copy(planetPos);
          controls.update();
        }
      });
      planetList.appendChild(planetItem);
    });
  });
  
  // Add space probes to the list
  const spaceProbesList = [];
  planetMeshes.forEach((planetObj, planetIndex) => {
    if (planetObj.spaceProbes && planetObj.spaceProbes.length > 0) {
      const body = celestialBodies[planetIndex];
      planetObj.spaceProbes.forEach((probe) => {
        spaceProbesList.push({
          probe: probe,
          planetIndex: planetIndex,
          planetName: body.name,
          body: body
        });
      });
    }
  });
  
  if (spaceProbesList.length > 0) {
    const categoryHeader = document.createElement('div');
    categoryHeader.className = 'category-header';
    categoryHeader.innerHTML = `<strong>${t('spaceProbes')}</strong>`;
    planetList.appendChild(categoryHeader);
    
    spaceProbesList.forEach((item) => {
      const probeItem = document.createElement('div');
      probeItem.className = 'planet-item space-probe';
      const orbitalPeriod = item.probe.orbit.orbitalPeriod;
      const periodText = orbitalPeriod < 1 ? `${(orbitalPeriod * 24).toFixed(1)} ${t('hours') || 'hours'}` : `${orbitalPeriod.toFixed(1)} ${t('days')}`;
      probeItem.innerHTML = `
        <strong>${item.probe.name}</strong>
        <br><small>${t('orbiting') || 'Orbiting'}: ${item.planetName}</small>
        <br><small>${t('period')}: ${periodText}</small>
      `;
      probeItem.style.cursor = 'pointer';
      probeItem.addEventListener('click', () => {
        showPlanetInfoCard(item.body, item.planetIndex);
        // Scroll to space probes section
        setTimeout(() => {
          const spaceProbesSection = document.getElementById('spaceProbesSection');
          if (spaceProbesSection) {
            spaceProbesSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 100);
      });
      planetList.appendChild(probeItem);
    });
  }
}
if (document.getElementById('planetList')) {
  updatePlanetList();
}
function showPlanetInfoCard(body, planetIndex) {
  const card = document.getElementById('planetInfoCard');
  const planetName = document.getElementById('planetName');
  const planetIcon = document.getElementById('planetIcon');
  const planetTypeBadge = document.getElementById('planetTypeBadge');
  const orbitalPeriod = document.getElementById('orbitalPeriod');
  const sizeRelative = document.getElementById('sizeRelative');
  const distanceFromSun = document.getElementById('distanceFromSun');
  const discoveryYear = document.getElementById('discoveryYear');
  const planetDescription = document.getElementById('planetDescription');
  const moonsSection = document.getElementById('moonsSection');
  const moonCount = document.getElementById('moonCount');
  const moonsContainer = document.getElementById('moonsContainer');
  planetIcon.textContent = '';
  planetName.textContent = body.name.toUpperCase();
  const typeLabels = {
    'planet': t('planet'),
    'dwarf': t('dwarfPlanet'),
    'asteroid': t('asteroid'),
    'tno': t('tno')
  };
  planetTypeBadge.textContent = typeLabels[body.type] || t('celestialBody');
  
  // Handle orbital period
  if (body.type === 'star') {
    orbitalPeriod.textContent = t('sunOrbitalPeriod');
    // Change label to "Galactic Orbit"
    const orbitalPeriodLabel = document.querySelectorAll('.info-item-label')[0];
    if (orbitalPeriodLabel) {
      orbitalPeriodLabel.textContent = t('galacticOrbit');
    }
  } else {
    // Use real orbital period if available, otherwise calculate from realAU, otherwise fallback to old formula
    let orbitalPeriodYears;
    if (body.orbitalPeriodDays !== undefined) {
      orbitalPeriodYears = body.orbitalPeriodDays / 365.256;
    } else if (body.realAU !== undefined) {
      orbitalPeriodYears = Math.sqrt(Math.pow(body.realAU, 3));
    } else {
      orbitalPeriodYears = Math.sqrt(Math.pow(body.dist, 3));
    }
    
    if (orbitalPeriodYears < 1) {
      orbitalPeriod.textContent = `${Math.round(orbitalPeriodYears * 365.256)} ${t('days')}`;
    } else if (orbitalPeriodYears < 10) {
      orbitalPeriod.textContent = `${orbitalPeriodYears.toFixed(1)} ${t('years')}`;
    } else {
      orbitalPeriod.textContent = `${Math.round(orbitalPeriodYears)} ${t('years')}`;
    }
  }
  
  // Handle size relative to Earth
  if (body.sizeRelativeEarth !== undefined) {
    sizeRelative.textContent = t('sunSizeRelative');
  } else {
    sizeRelative.textContent = `${body.size}x ${t('earth')}`;
  }
  
  // Handle distance from Sun - hide for stars
  if (body.type === 'star') {
    // Hide distance from Sun item
    const distanceItem = distanceFromSun.closest('.info-item');
    if (distanceItem) {
      distanceItem.style.display = 'none';
    }
  } else {
    // Use realAU if available, otherwise use dist
    const displayDistance = body.realAU !== undefined ? body.realAU : body.dist;
    distanceFromSun.textContent = `${displayDistance.toFixed(2)} ${t('au')}`;
    // Show distance item for non-stars
    const distanceItem = distanceFromSun.closest('.info-item');
    if (distanceItem) {
      distanceItem.style.display = 'block';
    }
  }
  
  // Handle discovery year - hide for stars
  if (body.type === 'star') {
    // Hide discovery year item
    const discoveryItem = discoveryYear.closest('.info-item');
    if (discoveryItem) {
      discoveryItem.style.display = 'none';
    }
  } else {
    discoveryYear.textContent = body.discoveryYear === 'Ancient' ? t('ancient') : 
                                 body.discoveryYear === 'N/A' ? t('na') : body.discoveryYear;
    // Show discovery year item for non-stars
    const discoveryItem = discoveryYear.closest('.info-item');
    if (discoveryItem) {
      discoveryItem.style.display = 'block';
    }
  }
  const translatedInfo = getBodyInfo(body.name);
  const originalPlanetDescription = translatedInfo || body.info;
  planetDescription.textContent = originalPlanetDescription;
  
  // Find info-grid section (planet info)
  const infoGridSection = document.querySelector('.info-grid')?.closest('.info-section');
  
  // Show planet info grid (in case it was hidden from moon view)
  if (infoGridSection) {
    infoGridSection.style.display = 'block';
  }
  
  // Hide back to planet button if it exists
  const backToPlanetBtn = document.getElementById('backToPlanetBtn');
  if (backToPlanetBtn) {
    backToPlanetBtn.closest('.info-section').style.display = 'none';
  }
  
  // Reset planet name cursor and onclick
  if (planetName) {
    planetName.style.cursor = 'default';
    planetName.onclick = null;
    planetName.title = '';
  }
  // Update all info labels regardless of current language
  const labels = document.querySelectorAll('.info-item-label');
  if (labels.length >= 4) {
    if (body.type === 'star') {
      labels[0].textContent = t('galacticOrbit');
    } else {
      labels[0].textContent = t('orbitalPeriod');
    }
    labels[1].textContent = t('sizeRelative');
    labels[2].textContent = t('distanceFromSun');
    labels[3].textContent = t('discoveryYear');
  }
  const moonsSectionTitle = moonsSection.querySelector('h4');
  if (moonsSectionTitle) {
    moonsSectionTitle.innerHTML = `${t('moons')} (<span id="moonCount">${body.moons ? body.moons.length : 0}</span>)`;
  }
  const followPlanetBtn = document.getElementById('followPlanetBtn');
  if (followPlanetBtn) {
    if (body.type === 'star') {
      followPlanetBtn.textContent = t('follow');
    } else {
      followPlanetBtn.textContent = t('followPlanet');
    }
  }
  if (body.moons && body.moons.length > 0) {
    moonsSection.style.display = 'block';
    moonCount.textContent = body.moons.length;
    moonsContainer.innerHTML = '';
    body.moons.forEach((moon, moonIndex) => {
      const moonItem = document.createElement('div');
      moonItem.className = 'moon-item';
      const orbitalPeriodDays = moon.speed > 0 ? (2 * Math.PI / moon.speed).toFixed(1) : 'Unknown';
      moonItem.innerHTML = `
        <div class="moon-name">${moon.name}</div>
        <div class="moon-info">
          <span>
            ${t('size')}: ${moon.size}x ${t('earth')}<br>
            ${t('distance')}: ${moon.dist} ${t('planetRadii')}<br>
            ${t('period')}: ${orbitalPeriodDays} ${t('days')}
          </span>
        </div>
        <div class="moon-follow-btn">
          <button class="follow-moon-btn">${t('followMoon')}</button>
        </div>
      `;
      moonItem.style.cursor = 'pointer';
      const moonNameDiv = moonItem.querySelector('.moon-name');
      const moonInfoDiv = moonItem.querySelector('.moon-info');
      const planetDescription = document.getElementById('planetDescription');
      const planetName = document.getElementById('planetName');
      const planetTypeBadge = document.getElementById('planetTypeBadge');
      
      const showMoonDescription = () => {
        if (moon.info) {
          const translatedMoonInfo = getMoonInfo(body.name, moon.name);
          const moonDescription = translatedMoonInfo || moon.info;
          
          // Find info-grid section (planet info)
          const infoGridSection = document.querySelector('.info-grid')?.closest('.info-section');
          
          // Store original planet info if not already stored
          if (!planetName.dataset.originalName) {
            planetName.dataset.originalName = body.name.toUpperCase();
            planetName.dataset.originalType = typeLabels[body.type] || t('celestialBody');
            planetName.dataset.originalDescription = planetDescription.textContent;
          }
          
          // Hide planet info grid
          if (infoGridSection) {
            infoGridSection.style.display = 'none';
          }
          
          // Create or show back to planet button
          let backToPlanetBtn = document.getElementById('backToPlanetBtn');
          if (!backToPlanetBtn) {
            backToPlanetBtn = document.createElement('button');
            backToPlanetBtn.id = 'backToPlanetBtn';
            backToPlanetBtn.className = 'follow-planet-btn';
            backToPlanetBtn.textContent = t('backToPlanet');
            backToPlanetBtn.style.marginBottom = '15px';
            
            // Insert before planet description
            const planetDescSection = planetDescription.closest('.info-section');
            if (planetDescSection && planetDescSection.parentNode) {
              const backButtonSection = document.createElement('div');
              backButtonSection.className = 'info-section';
              backButtonSection.appendChild(backToPlanetBtn);
              planetDescSection.parentNode.insertBefore(backButtonSection, planetDescSection);
            }
          } else {
            backToPlanetBtn.style.display = 'block';
            backToPlanetBtn.closest('.info-section').style.display = 'block';
          }
          
          // Update planet description with moon info
          if (planetDescription) {
            planetDescription.textContent = moonDescription;
          }
          
          // Update header to show moon name
          if (planetName) {
            planetName.textContent = moon.name.toUpperCase();
            planetName.style.cursor = 'pointer';
            planetName.title = t('clickToReturn') || 'Click to return to planet description';
          }
          
          // Update type badge to show it's a moon
          if (planetTypeBadge) {
            planetTypeBadge.textContent = t('moon');
          }
          
          // Add click handler to back button to return to planet description
          backToPlanetBtn.onclick = () => {
            // Show planet info grid
            if (infoGridSection) {
              infoGridSection.style.display = 'block';
            }
            
            // Hide back button
            if (backToPlanetBtn) {
              const backButtonSection = backToPlanetBtn.closest('.info-section');
              if (backButtonSection) {
                backButtonSection.style.display = 'none';
              }
            }
            
            // Restore planet info
            if (planetName) {
              planetName.textContent = planetName.dataset.originalName;
              planetName.onclick = null;
              planetName.style.cursor = 'default';
              planetName.title = '';
            }
            if (planetTypeBadge) {
              planetTypeBadge.textContent = planetName.dataset.originalType;
            }
            if (planetDescription) {
              planetDescription.textContent = planetName.dataset.originalDescription;
            }
          };
        }
      };
      
      moonNameDiv.addEventListener('click', showMoonDescription);
      moonInfoDiv.addEventListener('click', showMoonDescription);
      const followMoonBtn = moonItem.querySelector('.follow-moon-btn');
      followMoonBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const planetObj = planetMeshes[planetIndex];
        if (planetObj.moons && planetObj.moons[moonIndex]) {
          followMoon(planetObj.moons[moonIndex].mesh, moon, body.name);
          hidePlanetInfoCard();
        }
      });
      moonsContainer.appendChild(moonItem);
      
      // Add space objects if they exist
      if (moon.spaceObjects && moon.spaceObjects.length > 0) {
        moon.spaceObjects.forEach((spaceObj, spaceObjIndex) => {
          const spaceObjItem = document.createElement('div');
          spaceObjItem.className = 'moon-item';
          const spaceObjOrbitalPeriodDays = spaceObj.speed > 0 ? (2 * Math.PI / spaceObj.speed).toFixed(1) : 'Unknown';
          // Use display size for OREST and EMMA, otherwise use actual size
          const displaySize = (spaceObj.name === "OREST" || spaceObj.name === "EMMA") ? 0.0000001357 : spaceObj.size;
          spaceObjItem.innerHTML = `
            <div class="moon-name">${spaceObj.name}</div>
            <div class="moon-info">
              <span>
                ${t('size')}: ${displaySize}x ${t('earth')}<br>
                ${t('distance')}: ${spaceObj.dist} ${t('planetRadii')}<br>
                ${t('period')}: ${spaceObjOrbitalPeriodDays} ${t('days')}
              </span>
            </div>
            <div class="moon-follow-btn">
              <button class="follow-moon-btn">${t('followMoon')}</button>
            </div>
          `;
          spaceObjItem.style.cursor = 'pointer';
          const spaceObjNameDiv = spaceObjItem.querySelector('.moon-name');
          const spaceObjInfoDiv = spaceObjItem.querySelector('.moon-info');
          
          const showSpaceObjDescription = () => {
            const translatedSpaceObjInfo = getMoonInfo('Earth', spaceObj.name);
            const spaceObjDescription = translatedSpaceObjInfo || spaceObj.info || '';
            
            // Find info-grid section (planet info)
            const infoGridSection = document.querySelector('.info-grid')?.closest('.info-section');
            
            // Store original planet info if not already stored
            if (!planetName.dataset.originalName) {
              planetName.dataset.originalName = body.name.toUpperCase();
              planetName.dataset.originalType = typeLabels[body.type] || t('celestialBody');
              planetName.dataset.originalDescription = planetDescription.textContent;
            }
            
            // Hide planet info grid
            if (infoGridSection) {
              infoGridSection.style.display = 'none';
            }
            
            // Create or show back to planet button
            let backToPlanetBtn = document.getElementById('backToPlanetBtn');
            if (!backToPlanetBtn) {
              backToPlanetBtn = document.createElement('button');
              backToPlanetBtn.id = 'backToPlanetBtn';
              backToPlanetBtn.className = 'follow-planet-btn';
              backToPlanetBtn.textContent = t('backToPlanet');
              backToPlanetBtn.style.marginBottom = '15px';
              
              // Insert before planet description
              const planetDescSection = planetDescription.closest('.info-section');
              if (planetDescSection && planetDescSection.parentNode) {
                const backButtonSection = document.createElement('div');
                backButtonSection.className = 'info-section';
                backButtonSection.appendChild(backToPlanetBtn);
                planetDescSection.parentNode.insertBefore(backButtonSection, planetDescSection);
              }
            } else {
              backToPlanetBtn.style.display = 'block';
              backToPlanetBtn.closest('.info-section').style.display = 'block';
            }
            
            // Update planet description with space object info
            if (planetDescription && spaceObjDescription) {
              planetDescription.textContent = spaceObjDescription;
            }
            
            // Update header to show space object name
            if (planetName) {
              planetName.textContent = spaceObj.name.toUpperCase();
              planetName.style.cursor = 'pointer';
              planetName.title = t('clickToReturn') || 'Click to return to planet description';
            }
            
            // Update type badge to show it's a space object
            if (planetTypeBadge) {
              planetTypeBadge.textContent = t('moon');
            }
            
            // Add click handler to back button to return to planet description
            backToPlanetBtn.onclick = () => {
              // Show planet info grid
              if (infoGridSection) {
                infoGridSection.style.display = 'block';
              }
              
              // Hide back button
              if (backToPlanetBtn) {
                const backButtonSection = backToPlanetBtn.closest('.info-section');
                if (backButtonSection) {
                  backButtonSection.style.display = 'none';
                }
              }
              
              // Restore planet info
              if (planetName) {
                planetName.textContent = planetName.dataset.originalName;
                planetName.onclick = null;
                planetName.style.cursor = 'default';
                planetName.title = '';
              }
              if (planetTypeBadge) {
                planetTypeBadge.textContent = planetName.dataset.originalType;
              }
              if (planetDescription) {
                planetDescription.textContent = planetName.dataset.originalDescription;
              }
            };
          };
          
          spaceObjNameDiv.addEventListener('click', showSpaceObjDescription);
          spaceObjInfoDiv.addEventListener('click', showSpaceObjDescription);
          
          const followSpaceObjBtn = spaceObjItem.querySelector('.follow-moon-btn');
          followSpaceObjBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const planetObj = planetMeshes[planetIndex];
            if (planetObj.moons && planetObj.moons[moonIndex] && planetObj.moons[moonIndex].spaceObjects && planetObj.moons[moonIndex].spaceObjects[spaceObjIndex]) {
              followMoon(planetObj.moons[moonIndex].spaceObjects[spaceObjIndex].mesh, spaceObj, body.name);
              hidePlanetInfoCard();
            }
          });
          
          moonsContainer.appendChild(spaceObjItem);
        });
      }
    });
  } else {
    moonsSection.style.display = 'none';
  }
  
  // Add space probes section
  const planetObj = planetMeshes[planetIndex];
  let spaceProbesSection = document.getElementById('spaceProbesSection');
  if (!spaceProbesSection) {
    // Create space probes section if it doesn't exist
    spaceProbesSection = document.createElement('div');
    spaceProbesSection.className = 'info-section';
    spaceProbesSection.id = 'spaceProbesSection';
    const spaceProbesTitle = document.createElement('h4');
    spaceProbesTitle.id = 'spaceProbesTitle';
    spaceProbesTitle.innerHTML = `${t('spaceProbes')} (<span id="spaceProbeCount">0</span>)`;
    spaceProbesSection.appendChild(spaceProbesTitle);
    const spaceProbesContainer = document.createElement('div');
    spaceProbesContainer.className = 'moons-section';
    spaceProbesContainer.id = 'spaceProbesContainer';
    spaceProbesSection.appendChild(spaceProbesContainer);
    // Insert after moons section
    if (moonsSection && moonsSection.parentNode) {
      moonsSection.parentNode.insertBefore(spaceProbesSection, moonsSection.nextSibling);
    }
  }
  
  // Update space probes section title with current language
  const spaceProbesTitle = document.getElementById('spaceProbesTitle');
  if (spaceProbesTitle) {
    const probeCount = planetObj && planetObj.spaceProbes ? planetObj.spaceProbes.length : 0;
    spaceProbesTitle.innerHTML = `${t('spaceProbes')} (<span id="spaceProbeCount">${probeCount}</span>)`;
  }
  
  const spaceProbesContainer = document.getElementById('spaceProbesContainer');
  const spaceProbeCount = document.getElementById('spaceProbeCount');
  
  if (planetObj && planetObj.spaceProbes && planetObj.spaceProbes.length > 0) {
    spaceProbesSection.style.display = 'block';
    if (spaceProbeCount) {
      spaceProbeCount.textContent = planetObj.spaceProbes.length;
    }
    if (spaceProbesContainer) {
      spaceProbesContainer.innerHTML = '';
      planetObj.spaceProbes.forEach((probe, probeIndex) => {
        const probeItem = document.createElement('div');
        probeItem.className = 'moon-item';
        const orbitalPeriod = probe.orbit.orbitalPeriod;
        const periodText = orbitalPeriod < 1 ? `${(orbitalPeriod * 24).toFixed(1)} ${t('hours') || 'hours'}` : `${orbitalPeriod.toFixed(1)} ${t('days')}`;
        probeItem.innerHTML = `
          <div class="moon-name">${probe.name}</div>
          <div class="moon-info">
            <span>
              ${t('size')}: ${probe.orbit.semiMajorAxis.toFixed(2)}x ${t('planetRadii')}<br>
              ${t('period')}: ${periodText}
            </span>
          </div>
          <div class="moon-follow-btn">
            <button class="follow-moon-btn">${t('followSpaceProbe')}</button>
          </div>
        `;
        probeItem.style.cursor = 'pointer';
        const probeNameDiv = probeItem.querySelector('.moon-name');
        const probeInfoDiv = probeItem.querySelector('.moon-info');
        
        const showProbeDescription = () => {
          const translatedProbeInfo = getMoonInfo(body.name, probe.name);
          const probeDescription = translatedProbeInfo || probe.info || '';
          
          // Find info-grid section (planet info)
          const infoGridSection = document.querySelector('.info-grid')?.closest('.info-section');
          
          // Store original planet info if not already stored
          if (!planetName.dataset.originalName) {
            planetName.dataset.originalName = body.name.toUpperCase();
            planetName.dataset.originalType = typeLabels[body.type] || t('celestialBody');
            planetName.dataset.originalDescription = planetDescription.textContent;
          }
          
          // Hide planet info grid
          if (infoGridSection) {
            infoGridSection.style.display = 'none';
          }
          
          // Create or show back to planet button
          let backToPlanetBtn = document.getElementById('backToPlanetBtn');
          if (!backToPlanetBtn) {
            backToPlanetBtn = document.createElement('button');
            backToPlanetBtn.id = 'backToPlanetBtn';
            backToPlanetBtn.className = 'follow-planet-btn';
            backToPlanetBtn.textContent = t('backToPlanet');
            backToPlanetBtn.style.marginBottom = '15px';
            
            // Insert before planet description
            const planetDescSection = planetDescription.closest('.info-section');
            if (planetDescSection && planetDescSection.parentNode) {
              const backButtonSection = document.createElement('div');
              backButtonSection.className = 'info-section';
              backButtonSection.appendChild(backToPlanetBtn);
              planetDescSection.parentNode.insertBefore(backButtonSection, planetDescSection);
            }
          } else {
            backToPlanetBtn.style.display = 'block';
            backToPlanetBtn.closest('.info-section').style.display = 'block';
          }
          
          // Update planet description with probe info
          if (planetDescription) {
            planetDescription.textContent = probeDescription;
          }
          
          // Update header to show probe name
          if (planetName) {
            planetName.textContent = probe.name.toUpperCase();
            planetName.style.cursor = 'pointer';
            planetName.title = t('clickToReturn') || 'Click to return to planet description';
          }
          
          // Update type badge to show it's a space probe
          if (planetTypeBadge) {
            planetTypeBadge.textContent = t('spaceProbes');
          }
          
          // Add click handler to back button to return to planet description
          backToPlanetBtn.onclick = () => {
            // Show planet info grid
            if (infoGridSection) {
              infoGridSection.style.display = 'block';
            }
            
            // Hide back button
            if (backToPlanetBtn) {
              const backButtonSection = backToPlanetBtn.closest('.info-section');
              if (backButtonSection) {
                backButtonSection.style.display = 'none';
              }
            }
            
            // Restore planet info
            if (planetName) {
              planetName.textContent = planetName.dataset.originalName;
              planetName.onclick = null;
              planetName.style.cursor = 'default';
              planetName.title = '';
            }
            if (planetTypeBadge) {
              planetTypeBadge.textContent = planetName.dataset.originalType;
            }
            if (planetDescription) {
              planetDescription.textContent = planetName.dataset.originalDescription;
            }
          };
        };
        
        probeNameDiv.addEventListener('click', showProbeDescription);
        probeInfoDiv.addEventListener('click', showProbeDescription);
        const followProbeBtn = probeItem.querySelector('.follow-moon-btn');
        followProbeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (planetObj.spaceProbes && planetObj.spaceProbes[probeIndex]) {
            followSpaceProbe(planetObj.spaceProbes[probeIndex].mesh, probe, body.name);
            hidePlanetInfoCard();
          }
        });
        spaceProbesContainer.appendChild(probeItem);
      });
    }
  } else {
    spaceProbesSection.style.display = 'none';
  }
  
  card.style.display = 'block';
  currentPlanetIndex = planetIndex;
  updateFollowButtonState(planetIndex);
}
let currentPlanetIndex = null;
let followingTarget = null; 
let followingType = null;
let isRotatingCamera = false; // Track if user is actively rotating camera
let mouseDownTime = 0; // Track when mouse was pressed down
let mouseMoveDistance = 0; // Track mouse movement distance 
function updateFollowButtonState(planetIndex) {
  const followBtn = document.getElementById('followPlanetBtn');
  const stopFollowBtn = document.getElementById('stopFollowBtn');
  const currentPlanet = planetMeshes[planetIndex];
  currentPlanetIndex = planetIndex;
  if (followingTarget === currentPlanet && followingType === 'planet') {
    followBtn.textContent = 'STOP FOLLOWING';
    followBtn.classList.add('following');
    if (stopFollowBtn) {
      stopFollowBtn.style.display = 'block';
      stopFollowBtn.classList.add('active');
    }
  } else {
    followBtn.textContent = 'FOLLOW PLANET';
    followBtn.classList.remove('following');
    if (stopFollowBtn && !followingTarget) {
      stopFollowBtn.style.display = 'none';
      stopFollowBtn.classList.remove('active');
    }
  }
}
function followPlanet(planetIndex) {
  const body = celestialBodies[planetIndex];
  const planet = planetMeshes[planetIndex];
  followingTarget = planet;
  followingType = 'planet';
  followingPlanet = planet; 
  const distance = Math.max(body.size * 8, 15);
  followOffset.set(distance, distance * 0.5, distance);
  lastPlanetPosition.set(0, 0, 0);
  userCameraOffset.set(0, 0, 0);
  controls.enableZoom = true;
  controls.minDistance = distance * 0.1;
  controls.maxDistance = distance * 3;
  updateFollowButtonState(planetIndex);
  console.log(`Now following ${body.name}`);
}
function followMoon(moonMesh, moonData, parentPlanetName) {
  followingTarget = moonMesh;
  followingType = 'moon';
  followingPlanet = { mesh: moonMesh }; 
  const distance = Math.max(moonData.size * 12, 8);
  followOffset.set(distance, distance * 0.5, distance);
  lastPlanetPosition.set(0, 0, 0);
  userCameraOffset.set(0, 0, 0);
  controls.enableZoom = true;
  controls.minDistance = distance * 0.1;
  controls.maxDistance = distance * 4;
  const stopFollowBtn = document.getElementById('stopFollowBtn');
  if (stopFollowBtn) {
    stopFollowBtn.style.display = 'block';
    stopFollowBtn.classList.add('active');
  }
  console.log(`Now following ${moonData.name} of ${parentPlanetName}`);
}

function followSpaceProbe(probeMesh, probeData, parentPlanetName) {
  followingTarget = probeMesh;
  followingType = 'spaceProbe';
  followingPlanet = { mesh: probeMesh };
  const distance = Math.max(probeData.orbit.semiMajorAxis * 3, 5);
  followOffset.set(distance, distance * 0.5, distance);
  lastPlanetPosition.set(0, 0, 0);
  userCameraOffset.set(0, 0, 0);
  controls.enableZoom = true;
  // Allow much closer zoom for space probes
  // For JUNO and MAVEN, allow even closer zoom (0.15 = much closer than 0.35)
  if (probeData.name === "JUNO" || probeData.name === "MAVEN") {
    controls.minDistance = 0.15;
  } else {
    controls.minDistance = 0.35;
  }
  controls.maxDistance = distance * 4;
  const stopFollowBtn = document.getElementById('stopFollowBtn');
  if (stopFollowBtn) {
    stopFollowBtn.style.display = 'block';
    stopFollowBtn.classList.add('active');
  }
  console.log(`Now following ${probeData.name} of ${parentPlanetName}`);
}
function followSun() {
  followingTarget = sun;
  followingType = 'sun';
  followingPlanet = { mesh: sun }; 
  const sunPos = new THREE.Vector3();
  sun.getWorldPosition(sunPos);
  camera.position.set(sunPos.x + 25, sunPos.y + 12, sunPos.z + 25);
  controls.target.copy(sunPos);
  controls.enableZoom = true;
  controls.minDistance = 2;  
  controls.maxDistance = 100; 
  lastPlanetPosition.set(0, 0, 0);
  userCameraOffset.set(0, 0, 0);
  const stopFollowBtn = document.getElementById('stopFollowBtn');
  if (stopFollowBtn) {
    stopFollowBtn.style.display = 'block';
    stopFollowBtn.classList.add('active');
  }
  console.log('Now following the Sun (zoom enabled)');
}
function stopFollowingPlanet() {
  followingPlanet = null;
  followingTarget = null;
  followingType = null;
  lastPlanetPosition.set(0, 0, 0);
  userCameraOffset.set(0, 0, 0);
  camera.position.set(0, 30, 70);
  controls.target.set(0, 0, 0);
  controls.reset();
  controls.enableZoom = true;
  controls.minDistance = 0.1;
  controls.maxDistance = 1000;
  hidePlanetInfoCard();
  const followBtn = document.getElementById('followPlanetBtn');
  const stopFollowBtn = document.getElementById('stopFollowBtn');
  if (followBtn) {
    followBtn.textContent = 'FOLLOW PLANET';
    followBtn.classList.remove('following');
  }
  if (stopFollowBtn) {
    stopFollowBtn.style.display = 'none';
    stopFollowBtn.classList.remove('active');
  }
  console.log('Stopped following and reset view');
}
function hidePlanetInfoCard() {
  const card = document.getElementById('planetInfoCard');
  card.style.display = 'none';
}
function onMouseClick(event) {
  if (event.target.closest('.controls') || 
      event.target.closest('.celestial-panel') || 
      event.target.closest('.planet-info-card')) {
    return;
  }
  
  // Block clicks on planets when following space probe and user was rotating camera
  if (followingType === 'spaceProbe' && (isRotatingCamera || mouseMoveDistance > 5)) {
    // User was rotating camera around space probe, don't process planet clicks
    return;
  }
  
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  let clickableObjects = [];
  const planetMeshObjects = planetMeshes.map(p => p.mesh);
  clickableObjects = clickableObjects.concat(planetMeshObjects);
  let moonMeshes = [];
  planetMeshes.forEach((planetObj, planetIndex) => {
    if (planetObj.moons && planetObj.moons.length > 0) {
      planetObj.moons.forEach(moon => {
        moonMeshes.push({
          mesh: moon.mesh,
          moonData: moon,
          planetIndex: planetIndex,
          planetName: celestialBodies[planetIndex].name
        });
      });
    }
  });
  clickableObjects.push(sun);
  const intersects = raycaster.intersectObjects(clickableObjects);
  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object;
    if (intersectedObject === sun) {
      // Find Sun in celestialBodies array
      const sunIndex = celestialBodies.findIndex(body => body.name === "Sun");
      if (sunIndex !== -1) {
        const sunBody = celestialBodies[sunIndex];
        showPlanetInfoCard(sunBody, sunIndex);
      } else {
        followSun();
      }
      return;
    }
    const planetIndex = planetMeshObjects.indexOf(intersectedObject);
    if (planetIndex !== -1) {
      const body = celestialBodies[planetIndex];
      showPlanetInfoCard(body, planetIndex);
    }
  } else {
    hidePlanetInfoCard();
  }
}
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('click', onMouseClick);

// Track camera rotation to prevent accidental planet clicks when viewing space probes
let lastMousePosition = { x: 0, y: 0 };
let isMouseDown = false;

renderer.domElement.addEventListener('mousedown', (event) => {
  if (event.button === 0) { // Left mouse button
    isMouseDown = true;
    mouseDownTime = Date.now();
    mouseMoveDistance = 0;
    lastMousePosition.x = event.clientX;
    lastMousePosition.y = event.clientY;
    isRotatingCamera = false;
  }
});

renderer.domElement.addEventListener('mousemove', (event) => {
  if (isMouseDown) {
    const dx = event.clientX - lastMousePosition.x;
    const dy = event.clientY - lastMousePosition.y;
    mouseMoveDistance += Math.sqrt(dx * dx + dy * dy);
    lastMousePosition.x = event.clientX;
    lastMousePosition.y = event.clientY;
    
    // If mouse moved significantly, user is rotating camera
    if (mouseMoveDistance > 3) {
      isRotatingCamera = true;
    }
  }
});

renderer.domElement.addEventListener('mouseup', (event) => {
  if (event.button === 0) { // Left mouse button
    isMouseDown = false;
    // Reset rotation flag after a short delay to allow click processing
    setTimeout(() => {
      isRotatingCamera = false;
      mouseMoveDistance = 0;
    }, 100);
  }
});

renderer.domElement.addEventListener('mouseleave', () => {
  isMouseDown = false;
  isRotatingCamera = false;
  mouseMoveDistance = 0;
});
document.getElementById('closePlanetInfo').addEventListener('click', hidePlanetInfoCard);
document.getElementById('followPlanetBtn').addEventListener('click', () => {
  if (currentPlanetIndex !== null) {
    if (followingTarget === planetMeshes[currentPlanetIndex] && followingType === 'planet') {
      stopFollowingPlanet();
    } else {
      followPlanet(currentPlanetIndex);
    }
  }
});
const stopFollowBtn = document.getElementById('stopFollowBtn');
if (stopFollowBtn) {
  stopFollowBtn.addEventListener('click', () => {
    stopFollowingPlanet();
  });
}
document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'followSunBtn') {
    followSun();
}
});
document.addEventListener('DOMContentLoaded', () => {
  const originalPlanetItemHandler = planetItem => {
    const originalHandler = planetItem.onclick;
    planetItem.onclick = function(event) {
      if (originalHandler) originalHandler.call(this, event);
      const planetName = this.querySelector('strong').textContent;
      const planetIndex = celestialBodies.findIndex(body => body.name === planetName);
      if (planetIndex !== -1) {
        showPlanetInfoCard(celestialBodies[planetIndex], planetIndex);
      }
    };
  };
});
window.addEventListener('keydown', (event) => {
  switch(event.key.toLowerCase()) {
    case ' ': 
      event.preventDefault();
      const pauseBtn = document.getElementById('pauseBtn');
      if (pauseBtn) pauseBtn.click();
      break;
    case 'r': 
      const resetBtn = document.getElementById('resetBtn');
      if (resetBtn) resetBtn.click();
      break;
    case 'f': 
      stopFollowingPlanet();
      break;
    case 'o': 
      const orbitsBtn = document.getElementById('orbitsBtn');
      if (orbitsBtn) orbitsBtn.click();
      break;
    case 'a': 
      const asteroidButtons = [
        document.getElementById('mainAsteroidsBtn'),
        document.getElementById('trojansBtn'),
        document.getElementById('kuiperBtn'),
        document.getElementById('scatteredBtn')
      ];
      let foundVisible = false;
      for (let i = 0; i < asteroidButtons.length; i++) {
        if (asteroidButtons[i] && asteroidButtons[i].classList.contains('active')) {
          asteroidButtons[i].click();
          const nextIndex = (i + 1) % asteroidButtons.length;
          if (asteroidButtons[nextIndex]) {
            asteroidButtons[nextIndex].click();
          }
          foundVisible = true;
          break;
        }
      }
      if (!foundVisible && asteroidButtons[0]) {
        asteroidButtons[0].click();
      }
      break;
    case 'm': 
      const moonsBtn = document.getElementById('moonsBtn');
      if (moonsBtn) moonsBtn.click();
      break;
    case 'h': 
      const hideUIBtn = document.getElementById('hideUIBtn');
      const showUIBtn = document.getElementById('showUIBtn');
      if (hideUIBtn && showUIBtn) {
        if (showUIBtn.style.display === 'block') {
          showUIBtn.click();
        } else {
          hideUIBtn.click();
        }
      }
      break;
    case '+':
    case '=': 
      event.preventDefault();
      const speedControl = document.getElementById('speedControl');
      if (speedControl) {
        const currentSpeed = parseFloat(speedControl.value);
        const newSpeed = Math.min(10, currentSpeed + 0.5);
        speedControl.value = newSpeed;
        speedControl.dispatchEvent(new Event('input'));
      }
      break;
    case '-': 
      event.preventDefault();
      const speedControlDec = document.getElementById('speedControl');
      if (speedControlDec) {
        const currentSpeed = parseFloat(speedControlDec.value);
        const newSpeed = Math.max(0, currentSpeed - 0.5);
        speedControlDec.value = newSpeed;
        speedControlDec.dispatchEvent(new Event('input'));
      }
      break;
    case 'b': 
      event.preventDefault();
      isBloomManual = !isBloomManual;
      const bloomModeBtn = document.getElementById('bloomModeBtn');
      if (bloomModeBtn) {
        bloomModeBtn.textContent = isBloomManual ? 'Auto Bloom' : 'Manual Bloom';
        bloomModeBtn.classList.toggle('active', isBloomManual);
      }
      if (!isBloomManual) {
        console.log('🌟 Switched to automatic bloom mode (dynamic with distance)');
      } else {
        console.log('Switched to manual bloom mode (slider control)');
        bloomPass.strength = manualBloomStrength;
      }
      break;
  }
});
controls.enablePan = true;
controls.enableZoom = true;
controls.enableRotate = true;
controls.minDistance = 0.5;
controls.maxDistance = 200;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI;
controls.autoRotate = false;
controls.autoRotateSpeed = 0.3;
controls.target.set(0, 0, 0);
camera.position.set(0, 30, 70);
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  updatePlanetLabels();
  updateMoonLabels();
});
document.addEventListener('DOMContentLoaded', () => {
  const langEnBtn = document.getElementById('langEn');
  const langUkBtn = document.getElementById('langUk');
  const langCsBtn = document.getElementById('langCs');
  
  // Set active language button
  if (currentLanguage === 'uk') {
    if (langEnBtn) langEnBtn.classList.remove('active');
    if (langUkBtn) langUkBtn.classList.add('active');
    if (langCsBtn) langCsBtn.classList.remove('active');
  } else if (currentLanguage === 'cs') {
    if (langEnBtn) langEnBtn.classList.remove('active');
    if (langUkBtn) langUkBtn.classList.remove('active');
    if (langCsBtn) langCsBtn.classList.add('active');
  } else {
    if (langEnBtn) langEnBtn.classList.add('active');
    if (langUkBtn) langUkBtn.classList.remove('active');
    if (langCsBtn) langCsBtn.classList.remove('active');
  }
  
  if (langEnBtn) {
    langEnBtn.addEventListener('click', () => {
      updateLanguage('en');
      if (langEnBtn) langEnBtn.classList.add('active');
      if (langUkBtn) langUkBtn.classList.remove('active');
      if (langCsBtn) langCsBtn.classList.remove('active');
    });
  }
  if (langUkBtn) {
    langUkBtn.addEventListener('click', () => {
      updateLanguage('uk');
      if (langEnBtn) langEnBtn.classList.remove('active');
      if (langUkBtn) langUkBtn.classList.add('active');
      if (langCsBtn) langCsBtn.classList.remove('active');
    });
  }
  if (langCsBtn) {
    langCsBtn.addEventListener('click', () => {
      updateLanguage('cs');
      if (langEnBtn) langEnBtn.classList.remove('active');
      if (langUkBtn) langUkBtn.classList.remove('active');
      if (langCsBtn) langCsBtn.classList.add('active');
    });
  }
  setTimeout(() => {
    updateUITexts();
  }, 100);
});
