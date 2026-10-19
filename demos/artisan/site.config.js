// Contenu du site : c'est le seul fichier à modifier pour un nouveau client.
window.SITE = {
  nom: "Atelier Charmille",
  type: "HomeAndConstructionBusiness", // référencement Google
  accroche: "Menuiserie sur mesure : cuisines, escaliers, agencements",
  description: "Menuiserie artisanale en Essonne : cuisines, escaliers, dressings et agencements sur mesure en bois massif. Devis gratuit.",

  sections: ["savoirfaire", "realisations", "apropos", "devis", "infos"],
  theme: { police: "archivo" },
  accueil: {
    disposition: "large",
    surtitre: "Menuiserie, Essonne",
    bouton: { texte: "Demander un devis", section: "devis" },
    legendePhoto: "Photo de l'atelier ou d'une réalisation",
  },
  titres: { apropos: "L'atelier" },

  couleurs: {
    fond: "#f1efea",
    texte: "#1b1b1a",
    accent: "#a9532a",
  },

  photos: {
    principale: "img/atelier.jpg",
    secondaire: "img/menuisier.jpg",
    legendeSecondaire: "Photo de l'artisan au travail",
  },

  savoirfaire: {
    intro: "Chaque projet est unique. Du premier rendez-vous à la pose, vous avez un seul interlocuteur.",
    etapes: [
      { titre: "Visite et conseil", texte: "Je viens chez vous pour prendre les mesures, comprendre vos besoins et vous conseiller sur les essences de bois et les finitions." },
      { titre: "Plans et devis", texte: "Vous recevez des plans détaillés et un devis clair sous une semaine. On ajuste ensemble jusqu'à ce que tout vous convienne." },
      { titre: "Fabrication et pose", texte: "Tout est fabriqué à l'atelier, puis posé chez vous avec soin. Le chantier est laissé propre, et la garantie décennale vous couvre." },
    ],
  },

  realisations: {
    intro: "Quelques projets récents, réalisés pour des particuliers de la région.",
    liste: [
      { titre: "Cuisine en chêne massif", photo: "img/cuisine.jpg", legende: "Chêne huilé, plan de travail en bois debout, Brunoy" },
      { titre: "Escalier suspendu", photo: "img/escalier.jpg", legende: "Frêne et garde-corps en acier, Yerres" },
      { titre: "Bibliothèque sur mesure", photo: "img/bibliotheque.jpg", legende: "Toute hauteur avec échelle coulissante, Montgeron" },
      { titre: "Dressing sous combles", photo: "img/dressing.jpg", legende: "Optimisation des rampants, Épinay-sous-Sénart" },
      { titre: "Terrasse en bois", photo: "img/terrasse.jpg", legende: "Pin traité classe 4, 35 m², Boussy-Saint-Antoine" },
      { titre: "Porte d'entrée", photo: "img/porte.jpg", legende: "Chêne massif, vitrage feuilleté, Brunoy" },
    ],
  },

  apropos: [
    "Menuisier depuis plus de quinze ans, j'ai ouvert l'atelier en 2016 après avoir travaillé chez plusieurs ébénistes de la région. Je travaille uniquement le bois massif, choisi chez des scieries françaises.",
    "Petit atelier, grandes exigences : je ne prends qu'un nombre limité de chantiers à la fois pour garder le temps de bien faire. Résultat, des meubles qui traversent les années.",
  ],

  devis: {
    intro: "Un projet de cuisine, d'escalier ou de rangement ? Décrivez-le en quelques lignes, je vous rappelle sous 48 heures.",
    points: ["Devis gratuit et sans engagement", "Déplacement offert dans toute l'Essonne", "Garantie décennale"],
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
    linkedin: "",
  },

  legal: {
    raisonSociale: "Nom de l'entreprise",
    forme: "Entreprise individuelle",
    siret: "000 000 000 00000",
    rcs: "",
    tva: "",
    directeurPublication: "Prénom Nom",
    hebergeur: { nom: "Nom de l'hébergeur", adresse: "Adresse de l'hébergeur", site: "" },
  },

  credit: { texte: "Modèle de démonstration, site réalisé par Valentin Auffray", url: "../../index.html" },
};
