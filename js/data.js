/* Pasión Matera 7 — catálogo y configuración de marca */

const BRAND = {
  name: "Pasión Matera 7",
  phone: "5491179006737",            // WhatsApp en formato internacional
  phonePretty: "+54 9 11 7900-6737",
  instagram: "https://www.instagram.com/pasionmatera7/",
  instagramHandle: "@pasionmatera7",
};

const CATEGORIES = [
  { id: "todos",      label: "Todos" },
  { id: "combos",     label: "Combos" },
  { id: "imperiales", label: "Imperiales" },
  { id: "algarrobo",  label: "Algarrobo" },
  { id: "torpedos",   label: "Torpedos" },
];

/* price = número en ARS. badge / featured son opcionales. */
const PRODUCTS = [
  // ---------- COMBOS ----------
  { id: "combo-premium",                 name: "Combo Premium ✨🧉",                       category: "combos", price: 87980, badge: "Más vendido", featured: true },
  { id: "combo-imperial-termo",          name: "Combo Imperial Alpaca + Termo 1L Acero",    category: "combos", price: 41300, featured: true },
  { id: "combo-imperial-guarda-alpaca",  name: "Combo Imperial Guarda Alpaca",              category: "combos", price: 37500, featured: true },
  { id: "combo-boca",                    name: "Combo Boca Juniors [Grabado]",              category: "combos", price: 28800, badge: "Grabado" },
  { id: "combo-river",                   name: "Combo River Plate [Grabado]",               category: "combos", price: 28800, badge: "Grabado" },
  { id: "combo-camionero-canasta",       name: "Combo Camionero Algarrobo + Canasta Eco",   category: "combos", price: 25000 },
  { id: "combo-latas-termico",           name: "Combo Latas Forradas + Mate Térmico",       category: "combos", price: 9590,  badge: "Oferta" },

  // ---------- IMPERIALES ----------
  { id: "imperial-river-premium",            name: "Imperial Premium River Plate",          category: "imperiales", price: 62000, badge: "Premium", featured: true },
  { id: "imperial-hojita-borravino",         name: "Imperial Hojita 🍃 Borravino",          category: "imperiales", price: 41985, badge: "Premium", featured: true },
  { id: "imperial-gajo-pelotas-base-alpaca", name: "Imperial Gajo Pelotas Base Alpaca",     category: "imperiales", price: 38000 },
  { id: "imperial-alpaca-con-base",          name: "Imperial de Alpaca con Base",           category: "imperiales", price: 37600 },
  { id: "imperial-esquinero-base-alpaca",    name: "Imperial Esquinero Base Alpaca",        category: "imperiales", price: 36400 },
  { id: "imperial-dije-boca-bronce",         name: "Imperial Dije Boca (Bronce)",           category: "imperiales", price: 35000 },
  { id: "imperial-botitas-alpaca",           name: "Imperial Botitas Alpaca",               category: "imperiales", price: 33500 },
  { id: "imperial-virola-alpaca-cuero-repujado", name: "Imperial Virola Alpaca Cuero Repujado", category: "imperiales", price: 30000 },
  { id: "imperial-alpaca-gajos-pelota",      name: "Imperial Alpaca Gajos de Pelota",       category: "imperiales", price: 30000 },
  { id: "imperial-cuero-croco",              name: "Imperial Cuero Croco",                  category: "imperiales", price: 30000 },
  { id: "imperial-sol-de-mayo-alpaca",       name: "Imperial Sol de Mayo Alpaca",           category: "imperiales", price: 30000 },
  { id: "imperial-cuero-repujado-borravino", name: "Imperial Cuero Repujado Borravino",     category: "imperiales", price: 29000 },
  { id: "imperial-river-alpaca",             name: "Imperial River Alpaca",                 category: "imperiales", price: 29000 },
  { id: "imperial-dije-boca-alpaca",         name: "Imperial Dije Boca (Alpaca)",           category: "imperiales", price: 29000 },
  { id: "imperial-afa",                      name: "Imperial AFA",                          category: "imperiales", price: 29000, badge: "Argentina" },
  { id: "imperial-sol-de-mayo",              name: "Imperial Sol de Mayo ☀️",               category: "imperiales", price: 28990, badge: "Premium" },
  { id: "imperial-escudo-argentina",         name: "Imperial Escudo Argentina",             category: "imperiales", price: 28500, badge: "Argentina" },
  { id: "imperial-virola-alpaca-invertida",  name: "Imperial Virola de Alpaca Invertida",   category: "imperiales", price: 28000 },
  { id: "imperial-virola-cincelada",         name: "Imperial Premium Virola Cincelada",     category: "imperiales", price: 28000 },
  { id: "imperial-vaquita",                  name: "Imperial Vaquita",                      category: "imperiales", price: 25000 },
  { id: "imperial-color-suela",              name: "Imperial Color Suela",                  category: "imperiales", price: 25000 },
  { id: "imperial-azul-alpaca",              name: "Imperial Azul Alpaca",                  category: "imperiales", price: 25000 },
  { id: "imperial-rosa",                     name: "Imperial Virola Alpaca Rosa",           category: "imperiales", price: 25000 },
  { id: "imperial-virola-bronce",            name: "Imperial Virola de Bronce",             category: "imperiales", price: 21000 },
  { id: "imperial-interior-acero",           name: "Imperial Interior de Acero",            category: "imperiales", price: 20000 },
  { id: "imperial-plastico",                 name: "Imperial de Plástico",                  category: "imperiales", price: 9980,  badge: "Económico" },

  // ---------- ALGARROBO ----------
  { id: "algarrobo-base-alpaca",        name: "Mate Algarrobo con Base de Alpaca",       category: "algarrobo", price: 40000 },
  { id: "algarrobo-base-alpaca-bronce", name: "Mate Algarrobo Base Alpaca y Bronce",     category: "algarrobo", price: 40000 },
  { id: "algarrobo-imperial-premium",   name: "Imperial Algarrobo Premium Virola Alpaca",category: "algarrobo", price: 26980, badge: "Premium" },
  { id: "algarrobo-virola-alpaca",      name: "Mate de Algarrobo Virola de Alpaca",      category: "algarrobo", price: 23980 },
  { id: "algarrobo-laqueado",           name: "Mate Algarrobo Laqueado",                 category: "algarrobo", price: 20000 },
  { id: "algarrobo-camionero",          name: "Camionero de Algarrobo",                  category: "algarrobo", price: 15000 },

  // ---------- TORPEDOS ----------
  { id: "torpedo-virola-alpaca-calada",      name: "Torpedo Virola Alpaca Calada",          category: "torpedos", price: 45000, badge: "Premium" },
  { id: "torpedo-cuero-borravino",           name: "Torpedo Cuero Liso Borravino",          category: "torpedos", price: 40000 },
  { id: "torpedo-futbolero",                 name: "Torpedo Futbolero ⚽",                   category: "torpedos", price: 35990, badge: "Edición Fútbol", featured: true },
  { id: "torpedo-criollo-cuero-repujado",    name: "Torpedo Criollo Cuero Repujado Negro",  category: "torpedos", price: 32990 },
  { id: "torpedo-virola-cincelada",          name: "Torpedo Virola Cincelada",              category: "torpedos", price: 30000 },
  { id: "torpedo-algarrobo-virola",          name: "Torpedo de Algarrobo Virola",           category: "torpedos", price: 25000 },
  { id: "torpedo-cuero-negro-calabaza",      name: "Torpedo Cuero Negro Calabaza",          category: "torpedos", price: 25000 },
  { id: "torpedo-virola-acero-calabaza",     name: "Torpedo Virola Acero Calabaza",         category: "torpedos", price: 16950 },
  { id: "torpedo-algarrobo",                 name: "Torpedo Algarrobo",                     category: "torpedos", price: 13980, badge: "Oferta" },
];
