// Contenu du site : c'est le seul fichier à modifier pour un nouveau client.
window.SITE = {
  nom: "Atelier Dolor",
  type: "HomeAndConstructionBusiness", // référencement Google
  accroche: "Menuiserie sur mesure : cuisines, escaliers, agencements",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Menuiserie sur mesure : réalisations, savoir-faire et devis.",

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
    principale: "",
    secondaire: "",
    legendeSecondaire: "Photo de l'artisan au travail",
  },

  savoirfaire: {
    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper.",
    etapes: [
      { titre: "Visite et conseil", texte: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo odio, dapibus ac facilisis in." },
      { titre: "Plans et devis", texte: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur." },
      { titre: "Fabrication et pose", texte: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula." },
    ],
  },

  realisations: {
    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    liste: [
      { titre: "Cuisine en chêne massif", legende: "Lorem ipsum, Brunoy" },
      { titre: "Escalier suspendu", legende: "Lorem ipsum, Yerres" },
      { titre: "Bibliothèque sur mesure", legende: "Lorem ipsum, Montgeron" },
      { titre: "Dressing sous combles", legende: "Lorem ipsum, Épinay-sous-Sénart" },
      { titre: "Terrasse en bois", legende: "Lorem ipsum, Boussy-Saint-Antoine" },
      { titre: "Porte d'entrée", legende: "Lorem ipsum, Brunoy" },
    ],
  },

  apropos: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus, posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum.",
    "Donec ullamcorper nulla non metus auctor fringilla. Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis ornare vel eu leo.",
  ],

  devis: {
    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Décrivez votre projet, nous vous répondons rapidement.",
    points: ["Devis gratuit", "Déplacement en Essonne", "Lorem ipsum dolor sit amet"],
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
