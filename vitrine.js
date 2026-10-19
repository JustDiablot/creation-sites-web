(function () {
  "use strict";

  // Réglages de la vitrine
  const CONFIG = {
    email: "valentin.auffray@proton.me",
    prixBase: 490,
    prixLancement: 390, // laisser à 0 pour retirer l'offre de lancement
    placesLancement: 3,
    prixModification: 30,
    seuilTroisFois: 750,
  };

  const MODELES = [
    {
      id: "cafe",
      nom: "Café, bar, restaurant",
      pour: "Cafés, bars, brasseries, restaurants",
      points: ["Carte avec allergènes et filtre", "Ouvert ou fermé en temps réel", "Horaires, plan et itinéraire"],
    },
    {
      id: "commerce",
      nom: "Petit commerce",
      pour: "Épiceries, boutiques, fleuristes, cavistes",
      points: ["Vitrine de produits en photos", "Horaires et jours d'ouverture", "Réseaux sociaux et accès"],
    },
    {
      id: "artisan",
      nom: "Artisan, atelier",
      pour: "Menuisiers, boulangers, ateliers, fabriques",
      points: ["Galerie de réalisations", "Étapes du savoir-faire", "Demande de devis par mail ou téléphone"],
    },
  ];

  const INCLUS = [
    "Le modèle de votre choix, à vos couleurs, avec votre logo et vos photos",
    "Jusqu'à 5 sections : présentation, carte ou produits, galerie, horaires, accès",
    "Un affichage soigné sur téléphone, tablette et ordinateur",
    "Deux séries de corrections",
    "Des photos libres de droits si vous n'en avez pas",
    "La mise en ligne et le branchement de votre nom de domaine",
    "Les mentions légales",
  ];

  // Options payantes : affichées sur la page Tarifs et utilisées pour l'estimation du formulaire
  const TARIFS = {
    page: { nom: "Page supplémentaire", prix: 60, unite: "par page" },
    surmesure: { nom: "Modèle sur mesure, différent des modèles proposés", prix: 150 },
    textes: { nom: "Rédaction des textes", prix: 60 },
    logoPropre: { nom: "Récupération et remise au propre d'un logo existant", prix: 25 },
    logoCreation: { nom: "Création d'un logo simple, à partir de votre nom", prix: 90 },
    grandeCarte: { nom: "Saisie d'une grande carte (plus de 40 plats)", prix: 30 },
    anglais: { nom: "Version en anglais", prix: 100 },
    reservation: { nom: "Réservation ou prise de rendez-vous en ligne, avec votre outil (TheFork, Planity, Calendly...)", prix: 60 },
    contact: { nom: "Formulaire de contact", prix: 40 },
    paiement: { nom: "Paiement en ligne de quelques produits (jusqu'à 10)", prix: 150 },
  };

  // Fonctionnalités proposées dans le formulaire (tarif = clé de TARIFS, absent = inclus)
  const FONCTIONS = [
    { nom: "Carte ou menu" },
    { nom: "Galerie photos" },
    { nom: "Liens vers mes réseaux sociaux" },
    { nom: "Mon propre nom de domaine (ex. moncommerce.fr)" },
    { nom: "Réservation ou prise de rendez-vous en ligne", tarif: "reservation" },
    { nom: "Formulaire de contact", tarif: "contact" },
    { nom: "Paiement en ligne de quelques produits", tarif: "paiement" },
    { nom: "Version en anglais", tarif: "anglais" },
    { nom: "Une page en plus", tarif: "page" },
    { nom: "Une grande carte (plus de 40 plats)", tarif: "grandeCarte" },
  ];

  const POLICES = [
    { id: "fraunces", nom: "Classique", famille: "'Fraunces', Georgia, serif" },
    { id: "bricolage", nom: "Moderne", famille: "'Bricolage Grotesque', system-ui, sans-serif" },
    { id: "archivo", nom: "Affirmé", famille: "'Archivo', system-ui, sans-serif" },
  ];

  const $ = (id) => document.getElementById(id);
  const form = $("formulaire");

  function esc(valeur) {
    return String(valeur ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }

  const euros = (n) => `${n} €`;
  const plus = (cle) => `+${euros(TARIFS[cle].prix)}`;

  // ---------- Page de présentation ----------

  if ($("liste-modeles")) $("liste-modeles").innerHTML = MODELES.map((m) => `
    <article class="modele">
      <a class="modele__apercu" href="demos/${m.id}/index.html" target="_blank" rel="noopener" aria-label="Ouvrir la démo ${esc(m.nom)}">
        <iframe src="demos/${m.id}/index.html" title="Aperçu ${esc(m.nom)}" loading="lazy" tabindex="-1" aria-hidden="true" scrolling="no"></iframe>
      </a>
      <h3>${esc(m.nom)}</h3>
      <p class="modele__pour">${esc(m.pour)}</p>
      <ul class="modele__points">${m.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      <div class="actions">
        <a class="bouton bouton--contour" href="demos/${m.id}/index.html" target="_blank" rel="noopener">Voir la démo</a>
        <a class="bouton" href="demande.html?modele=${m.id}">Choisir ce modèle</a>
      </div>
    </article>`).join("");

  if ($("prix")) {
    $("prix").textContent = CONFIG.prixLancement
      ? `À partir de ${euros(CONFIG.prixBase)}, et ${euros(CONFIG.prixLancement)} pour mes ${CONFIG.placesLancement} premiers clients.`
      : `À partir de ${euros(CONFIG.prixBase)}.`;
    $("prix").hidden = false;
  }

  if ($("tarifs-base")) {
    $("tarifs-base").textContent = euros(CONFIG.prixBase);
    $("tarifs-inclus").innerHTML = INCLUS.map((i) => `<li>${esc(i)}</li>`).join("");
    $("tarifs-options").innerHTML = Object.entries(TARIFS).map(([cle, t]) => `
      <tr><th scope="row">${esc(t.nom)}</th><td>${plus(cle)}${t.unite ? " " + t.unite : ""}</td></tr>`).join("") + `
      <tr><th scope="row">Modification après la mise en ligne</th><td>${euros(CONFIG.prixModification)} par demande</td></tr>`;
    if (CONFIG.prixLancement) {
      $("tarifs-lancement").innerHTML = `<strong>Offre de lancement : ${euros(CONFIG.prixLancement)} au lieu de ${euros(CONFIG.prixBase)}</strong> pour mes ${CONFIG.placesLancement} premiers clients, en échange d'un avis et de l'autorisation de présenter votre site comme référence.`;
      $("tarifs-lancement").hidden = false;
    }
    $("tarifs-paiement").textContent = `Jusqu'à ${euros(CONFIG.seuilTroisFois)} : 50 % à la commande, 50 % avant la mise en ligne. Au-delà : en trois fois (commande, première version, mise en ligne).`;
  }

  // ---------- Commun aux deux pages ----------

  $("annee").textContent = new Date().getFullYear();
  if ($("mentions-contact")) $("mentions-contact").innerHTML = `<a href="mailto:${CONFIG.email}">${CONFIG.email}</a>`;

  // ---------- Page de demande ----------

  if (!form) return;

  $("adresse").textContent = CONFIG.email;

  $("choix-modele").innerHTML = MODELES.map((m, i) => `
    <label class="choix__option"><input type="radio" name="modele" value="${m.id}"${i === 0 ? " checked" : ""}> ${esc(m.nom)}</label>`
  ).join("") + `
    <label class="choix__option"><input type="radio" name="modele" value="aucun"> Je ne sais pas encore</label>
    <label class="choix__option autre"><input type="radio" name="modele" value="autre"> Autre, sur mesure (${plus("surmesure")}) :
      <input type="text" name="modele_autre" data-autre="modele" placeholder="ex. coiffeur, garage, association..."></label>`;

  $("options").innerHTML = FONCTIONS.map((f, i) => `
    <label class="choix__option"><input type="checkbox" name="options" value="${i}"> ${esc(f.nom)}
      <span class="prix-option">${f.tarif ? plus(f.tarif) : "inclus"}</span></label>`).join("");

  $("choix-police").innerHTML = POLICES.map((p, i) => `
    <label class="police">
      <input type="radio" name="police" value="${p.id}"${i === 0 ? " checked" : ""}>
      <span class="police__exemple" style="font-family: ${p.famille}">Aa</span>
      <span>${p.nom}</span>
    </label>`).join("") + `
    <label class="police">
      <input type="radio" name="police" value="libre">
      <span class="police__exemple">?</span>
      <span>Choisissez pour moi</span>
    </label>`;

  // Prix affichés à côté des choix qui en ont un
  form.querySelectorAll("[data-tarif]").forEach((el) => {
    el.insertAdjacentHTML("beforeend", ` <span class="prix-option">${plus(el.dataset.tarif)}</span>`);
  });

  const modeleDemande = new URLSearchParams(location.search).get("modele");
  const radioModele = form.querySelector(`input[name="modele"][value="${CSS.escape(modeleDemande || "")}"]`);
  if (radioModele) radioModele.checked = true;

  // ---------- Mail ----------

  function valeur(nom) {
    const champ = form.elements[nom];
    return champ ? String(champ.value || "").trim() : "";
  }

  // Taper dans un champ « Autre » sélectionne automatiquement l'option correspondante
  form.querySelectorAll("[data-autre]").forEach((champ) => {
    champ.addEventListener("input", () => {
      const radio = form.querySelector(`input[name="${champ.dataset.autre}"][value="autre"]`);
      if (champ.value.trim()) radio.checked = true;
    });
  });

  function autre(groupe) {
    return valeur(groupe) === "autre" ? valeur(groupe + "_autre") || "à préciser" : "";
  }

  function estimation() {
    const lignes = [];
    if (valeur("modele") === "autre") lignes.push("surmesure");
    if (valeur("logo") === "recuperer") lignes.push("logoPropre");
    if (valeur("logo") === "creer") lignes.push("logoCreation");
    if (valeur("textes") === "libre") lignes.push("textes");
    form.querySelectorAll('input[name="options"]:checked').forEach((c) => {
      const f = FONCTIONS[Number(c.value)];
      if (f.tarif) lignes.push(f.tarif);
    });
    const total = lignes.reduce((somme, cle) => somme + TARIFS[cle].prix, CONFIG.prixBase);
    return { lignes, total };
  }

  function composerMail() {
    const etablissement = valeur("etablissement") || "[nom de l'établissement]";
    const nom = valeur("nom") || "[votre nom]";
    const modele = MODELES.find((m) => m.id === valeur("modele"));
    const police = POLICES.find((p) => p.id === valeur("police"));

    const joints = [];
    const delegues = [];
    const precisions = [];
    const autorisations = [];

    const logo = valeur("logo");
    if (logo === "joint") joints.push("Logo");
    else if (logo === "recuperer") delegues.push("Logo : récupérez-le et remettez-le au propre");
    else if (logo === "creer") delegues.push("Logo : créez-moi un logo simple");
    else if (logo === "autre") precisions.push("Logo : " + autre("logo"));
    else delegues.push("Logo : je n'en ai pas, mettez simplement mon nom");

    if (valeur("photos") === "joint") joints.push("Photos");
    else if (valeur("photos") === "autre") precisions.push("Photos : " + autre("photos"));
    else {
      delegues.push("Photos");
      autorisations.push("utiliser des photos libres de droits");
    }

    if (police) {
      joints.push(`Style d'écriture : ${police.nom}`);
    } else if (valeur("police") === "autre") {
      precisions.push("Style d'écriture : " + autre("police"));
    } else {
      delegues.push("Style d'écriture");
      autorisations.push("choisir des polices de caractères gratuites");
    }

    if (valeur("couleurs") === "choisi") {
      joints.push(`Couleurs : ${valeur("couleur1")} (principale), ${valeur("couleur2")} (fond)`);
    } else if (valeur("couleurs") === "autre") {
      precisions.push("Couleurs : " + autre("couleurs"));
    } else {
      delegues.push("Couleurs");
      autorisations.push("choisir les couleurs");
    }

    if (valeur("textes") === "joint") joints.push("Textes");
    else if (valeur("textes") === "autre") precisions.push("Textes : " + autre("textes"));
    else {
      delegues.push("Textes");
      autorisations.push("rédiger les textes à partir de nos échanges");
    }

    const lignes = [
      "Bonjour Valentin,",
      "",
      `Je souhaite un site internet pour ${etablissement}.`,
      "",
      `Établissement : ${etablissement}`,
      valeur("activite") ? `Activité : ${valeur("activite")}` : null,
      `Contact : ${nom}${valeur("telephone") ? ", " + valeur("telephone") : ""}`,
      `Modèle choisi : ${modele ? modele.nom : valeur("modele") === "autre" ? "sur mesure, " + autre("modele") : "je ne sais pas encore"}`,
    ];

    if (joints.length) lignes.push("", "Ce que je vous fournis :", ...joints.map((j) => "- " + j));
    if (precisions.length) lignes.push("", "Mes précisions :", ...precisions.map((p) => "- " + p));

    if (delegues.length) {
      lignes.push("", "Ce que je vous laisse faire :", ...delegues.map((d) => "- " + d));
    }
    if (autorisations.length) {
      const avecA = autorisations.map((a, i) => (i === 0 ? a : "à " + a));
      const liste = avecA.length > 1
        ? avecA.slice(0, -1).join(", ") + " et " + avecA[avecA.length - 1]
        : avecA[0];
      lignes.push("", `Je vous autorise à ${liste} pour mon site.`);
    }

    const options = [...form.querySelectorAll('input[name="options"]:checked')].map((c) => FONCTIONS[Number(c.value)].nom);
    if (valeur("options_autre")) options.push(valeur("options_autre"));
    if (options.length) lignes.push("", "Ce que j'aimerais sur le site :", ...options.map((o) => "- " + o));

    const { lignes: supplements, total } = estimation();
    lignes.push("", `Estimation indicative : ${euros(total)}`, `- Site vitrine : ${euros(CONFIG.prixBase)}`);
    supplements.forEach((cle) => lignes.push(`- ${TARIFS[cle].nom} : ${plus(cle)}`));

    lignes.push(
      "",
      "Informations utiles :",
      "Adresse : ",
      "Horaires : ",
      "Réseaux sociaux : ",
      modele && modele.id === "cafe" ? "Carte : en pièce jointe (photo ou PDF)" : null,
      modele && modele.id === "commerce" ? "Produits phares : " : null,
      modele && modele.id === "artisan" ? "Réalisations à mettre en avant : " : null
    );

    if (valeur("remarques")) lignes.push("", "Remarques :", valeur("remarques"));

    lignes.push("", "Cordialement,", nom);

    return {
      objet: `Demande de site internet, ${etablissement}`,
      corps: lignes.filter((l) => l !== null).join("\n"),
    };
  }

  function majApercu() {
    $("couleurs").hidden = valeur("couleurs") !== "choisi";
    const { objet, corps } = composerMail();
    $("apercu").textContent = `Objet : ${objet}\n\n${corps}`;
    $("ouvrir-mail").href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(objet)}&body=${encodeURIComponent(corps)}`;
    $("estimation").textContent = euros(estimation().total);
  }

  $("copier").addEventListener("click", async () => {
    const { objet, corps } = composerMail();
    const texte = `${objet}\n\n${corps}`;
    try {
      await navigator.clipboard.writeText(texte);
      $("info-copie").textContent = `Texte copié. Collez-le dans un mail à ${CONFIG.email}.`;
    } catch {
      $("info-copie").textContent = "La copie automatique n'a pas fonctionné : sélectionnez le texte ci-dessus et copiez-le.";
    }
  });

  form.addEventListener("input", majApercu);
  form.addEventListener("change", majApercu);

  majApercu();
})();
