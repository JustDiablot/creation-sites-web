// Contenu du site : c'est le seul fichier à modifier pour un nouveau client.
window.SITE = {
  nom: "Le Café du Coin",
  type: "CafeOrCoffeeShop", // CafeOrCoffeeShop, BarOrPub ou Restaurant (référencement Google)
  accroche: "Café, brasserie et terrasse au cœur de Brunoy",
  description:
    "Café et brasserie au centre de Brunoy : petit-déjeuner, déjeuner du jour, apéritif en terrasse. Carte, horaires et accès.",

  sections: ["apropos", "carte", "horaires", "infos"],
  theme: { police: "fraunces" },
  accueil: { bouton: { texte: "Voir la carte", section: "carte" } },

  couleurs: {
    fond: "#f4efe6",
    texte: "#1f1b17",
    accent: "#7a2e2a",
  },

  // Chemins vers les images du dossier img/ (laisser vide pour un emplacement gris)
  photos: {
    principale: "img/terrasse.jpg",
    secondaire: "img/salle.jpg",
    legendeSecondaire: "Photo de la salle",
  },

  apropos: [
    "Au coin de la rue depuis plus de trente ans, le café a vu passer trois générations d'habitués. On y prend son premier café au comptoir avant le train de 7h42, on y déjeune entre collègues, et on y refait le monde en terrasse le vendredi soir.",
    "En cuisine, des produits frais livrés chaque matin par des fournisseurs de la région, un plat du jour qui change toutes les semaines et des desserts faits maison. Au bar, un café torréfié à Paris, des bières pression et une petite sélection de vins au verre.",
  ],

  contact: {
    adresse: "1 rue Exemple",
    codePostal: "91800",
    ville: "Brunoy",
    telephone: "01 23 45 67 89",
    email: "contact@exemple.fr",
    latitude: 48.6978,
    longitude: 2.5027,
  },

  // Laisser vide ce qui n'existe pas
  reseaux: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    tiktok: "",
    tripadvisor: "",
  },

  // Plusieurs créneaux possibles par jour. Une fermeture après minuit s'écrit normalement ("02:00").
  horaires: {
    lundi: [["07:30", "19:00"]],
    mardi: [["07:30", "19:00"]],
    mercredi: [["07:30", "19:00"]],
    jeudi: [["07:30", "19:00"]],
    vendredi: [["07:30", "15:00"], ["18:00", "01:00"]],
    samedi: [["09:00", "01:00"]],
    dimanche: [],
  },
  noteHoraires: "Cuisine ouverte de 12h à 14h30.",

  // Régimes (icône à côté du plat) : vegetarien, vegan, sans_gluten
  // "sans_gluten" seulement si le client le garantit (mention encadrée par la loi, moins de 20 mg/kg)
  // Variantes : une autre façon de servir le plat (ex. lait végétal). "retire" et "ajoute"
  // modifient la liste d'allergènes du plat. Le filtre propose la variante au lieu de masquer le plat.
  // Allergènes possibles : gluten, crustaces, oeufs, poissons, arachides, soja, lait,
  // fruits_a_coque, celeri, moutarde, sesame, sulfites, lupin, mollusques
  carte: [
    {
      categorie: "Boissons chaudes",
      plats: [
        { nom: "Espresso", prix: 1.8 },
        { nom: "Café allongé", prix: 2 },
        {
          nom: "Cappuccino",
          prix: 3.8,
          ingredients: ["Espresso", "lait entier"],
          allergenes: ["lait"],
          variantes: [
            { nom: "avec boisson de soja", supplement: 0.5, retire: ["lait"], ajoute: ["soja"] },
            { nom: "avec boisson d'avoine", supplement: 0.5, retire: ["lait"], ajoute: ["gluten"] },
          ],
        },
        {
          nom: "Chocolat chaud",
          prix: 4,
          ingredients: ["Chocolat noir (contient de la lécithine de soja)", "lait entier"],
          allergenes: ["lait", "soja"],
          variantes: [
            { nom: "avec boisson de soja", supplement: 0.5, retire: ["lait"], ajoute: ["soja"] },
            { nom: "avec boisson d'avoine", supplement: 0.5, retire: ["lait"], ajoute: ["gluten"] },
          ],
        },
        { nom: "Thé", prix: 3.2, description: "Thé noir, vert ou infusion, en vrac." },
      ],
    },
    {
      categorie: "Boissons fraîches",
      plats: [
        { nom: "Jus de fruits", prix: 3.5, description: "Orange, pomme ou ananas.", regimes: ["vegan", "sans_gluten"] },
        { nom: "Soda", prix: 3.5 },
        { nom: "Bière pression (25 cl)", prix: 4, allergenes: ["gluten"] },
        { nom: "Verre de vin", prix: 5, allergenes: ["sulfites"] },
      ],
    },
    {
      categorie: "À manger",
      plats: [
        {
          nom: "Croque-monsieur",
          prix: 9.5,
          description: "Gratiné au four, servi avec une salade verte.",
          ingredients: ["Pain de mie", "jambon blanc", "emmental", "béchamel"],
          allergenes: ["gluten", "lait", "oeufs"],
        },
        {
          nom: "Salade de saison",
          prix: 12,
          description: "Selon le marché, vinaigrette maison à la moutarde à l'ancienne.",
          ingredients: ["Mesclun", "tomates", "noix", "vinaigrette moutarde"],
          allergenes: ["fruits_a_coque", "moutarde"],
          regimes: ["vegetarien", "sans_gluten"],
        },
        {
          nom: "Assiette de charcuterie",
          prix: 14,
          ingredients: ["Jambon cru", "saucisson", "terrine", "cornichons", "pain"],
          allergenes: ["gluten", "sulfites"],
        },
      ],
    },
    {
      categorie: "Desserts",
      plats: [
        {
          nom: "Moelleux au chocolat",
          prix: 6.5,
          ingredients: ["Chocolat", "beurre", "œufs", "farine", "sucre"],
          allergenes: ["gluten", "lait", "oeufs", "soja"],
          regimes: ["vegetarien"],
        },
        { nom: "Café gourmand", prix: 8, description: "Espresso et trois mignardises.", allergenes: ["gluten", "lait", "oeufs"] },
      ],
    },
  ],
  noteCarte: "Prix nets, service compris. Liste complète des allergènes disponible sur demande.",

  // Mentions légales (obligatoires)
  legal: {
    raisonSociale: "Nom de la société",
    forme: "SARL au capital de 1 000 €",
    siret: "000 000 000 00000",
    rcs: "RCS Évry",
    tva: "",
    directeurPublication: "Prénom Nom",
    hebergeur: {
      nom: "Nom de l'hébergeur",
      adresse: "Adresse de l'hébergeur",
      site: "",
    },
  },

  credit: { texte: "Modèle de démonstration, site réalisé par Valentin Auffray", url: "../../index.html" },
};
