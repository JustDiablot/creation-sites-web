// Contenu du site : c'est le seul fichier à modifier pour un nouveau client.
window.SITE = {
  nom: "Maison Ipsum",
  type: "Store", // Store, GroceryStore, Florist, ClothingStore... (référencement Google)
  accroche: "Épicerie fine et produits du terroir",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Épicerie fine : produits, horaires et accès.",

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
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus, posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum.",
    "Donec ullamcorper nulla non metus auctor fringilla. Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis ornare vel eu leo.",
  ],

  produits: {
    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis.",
    liste: [
      { nom: "Huiles et vinaigres", description: "Lorem ipsum dolor sit amet." },
      { nom: "Fromages", description: "Lorem ipsum dolor sit amet." },
      { nom: "Charcuterie", description: "Lorem ipsum dolor sit amet." },
      { nom: "Vins et spiritueux", description: "Lorem ipsum dolor sit amet." },
      { nom: "Épicerie sucrée", description: "Lorem ipsum dolor sit amet." },
      { nom: "Paniers cadeaux", description: "Lorem ipsum dolor sit amet.", prix: "À partir de 25 €" },
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
  noteHoraires: "Lorem ipsum dolor sit amet.",

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
