// Contenu du site : c'est le seul fichier à modifier pour un nouveau client.
window.SITE = {
  nom: "Maison Verlaine",
  type: "Store", // Store, GroceryStore, Florist, ClothingStore... (référencement Google)
  accroche: "Épicerie fine et produits du terroir",
  description: "Épicerie fine de quartier : produits du terroir, fromages affinés, vins de petits producteurs et paniers cadeaux. Horaires et accès.",

  sections: ["apropos", "produits", "horaires", "infos"],
  theme: { police: "bricolage" },
  accueil: {
    surtitre: "Épicerie de quartier",
    bouton: { texte: "Nos produits", section: "produits" },
    legendePhoto: "Photo de la boutique",
  },
  titres: { apropos: "La boutique" },

  couleurs: {
    fond: "#f3f1ea",
    texte: "#1e2a22",
    accent: "#56703c",
  },

  photos: {
    principale: "",
    secondaire: "",
    legendeSecondaire: "Photo des rayons",
  },

  apropos: [
    "Maison Verlaine, c'est une petite épicerie fine ouverte par deux amis passionnés de bons produits. Chaque référence a été goûtée avant d'entrer en rayon : huiles d'olive pressées à froid, fromages affinés en cave, charcuteries de producteurs fermiers.",
    "On travaille en direct avec une trentaine de producteurs, la plupart à moins de 300 km. Besoin d'un conseil pour un plateau de fromages ou d'une idée cadeau ? Passez nous voir, on prend le temps.",
  ],

  produits: {
    intro: "Une sélection courte et soignée, renouvelée au fil des saisons et des arrivages.",
    liste: [
      { nom: "Huiles et vinaigres", description: "Huiles d'olive de Provence et d'Andalousie, vinaigres de Xérès et de cidre." },
      { nom: "Fromages", description: "Une quinzaine de fromages au lait cru, affinés en cave et coupés à la demande." },
      { nom: "Charcuterie", description: "Jambons secs, saucissons et terrines de producteurs fermiers." },
      { nom: "Vins et spiritueux", description: "Vins de vignerons indépendants, bières artisanales et quelques rhums arrangés." },
      { nom: "Épicerie sucrée", description: "Confitures, miels de l'Essonne, chocolats et biscuits de biscuiterie artisanale." },
      { nom: "Paniers cadeaux", description: "Composés selon vos envies et votre budget, emballés sur place.", prix: "À partir de 25 €" },
    ],
    note: "Produits selon arrivages et saisons.",
  },

  contact: {
    adresse: "1 rue Exemple",
    codePostal: "91800",
    ville: "Brunoy",
    telephone: "01 23 45 67 89",
    email: "contact@exemple.fr",
    latitude: 48.6978,
    longitude: 2.5027,
  },

  reseaux: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },

  horaires: {
    lundi: [],
    mardi: [["09:30", "13:00"], ["15:00", "19:30"]],
    mercredi: [["09:30", "13:00"], ["15:00", "19:30"]],
    jeudi: [["09:30", "13:00"], ["15:00", "19:30"]],
    vendredi: [["09:30", "13:00"], ["15:00", "19:30"]],
    samedi: [["09:00", "19:30"]],
    dimanche: [["09:30", "13:00"]],
  },
  noteHoraires: "Ouvert le dimanche matin. Fermetures exceptionnelles annoncées sur Instagram.",

  legal: {
    raisonSociale: "Nom de la société",
    forme: "SARL au capital de 1 000 €",
    siret: "000 000 000 00000",
    rcs: "RCS Évry",
    tva: "",
    directeurPublication: "Prénom Nom",
    hebergeur: { nom: "Nom de l'hébergeur", adresse: "Adresse de l'hébergeur", site: "" },
  },

  credit: { texte: "Modèle de démonstration, site réalisé par Valentin Auffray", url: "../../index.html" },
};
