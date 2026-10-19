(function () {
  "use strict";

  // Réglages de la vitrine
  const CONFIG = {
    email: "valentin.auffray@proton.me",
    prix: "", // ex. "Tarif de lancement : 490 €" (laisser vide pour ne rien afficher)
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

  // ---------- Modèles ----------

  $("liste-modeles").innerHTML = MODELES.map((m) => `
    <article class="modele">
      <a class="modele__apercu" href="demos/${m.id}/" target="_blank" rel="noopener" aria-label="Ouvrir la démo ${esc(m.nom)}">
        <iframe src="demos/${m.id}/" title="Aperçu ${esc(m.nom)}" loading="lazy" tabindex="-1" aria-hidden="true" scrolling="no"></iframe>
      </a>
      <h3>${esc(m.nom)}</h3>
      <p class="modele__pour">${esc(m.pour)}</p>
      <ul class="modele__points">${m.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      <div class="actions">
        <a class="bouton bouton--contour" href="demos/${m.id}/" target="_blank" rel="noopener">Voir la démo</a>
        <button class="bouton" type="button" data-choisir="${m.id}">Choisir ce modèle</button>
      </div>
    </article>`).join("");

  $("choix-modele").innerHTML = MODELES.map((m, i) => `
    <label class="choix__option"><input type="radio" name="modele" value="${m.id}"${i === 0 ? " checked" : ""}> ${esc(m.nom)}</label>`
  ).join("") + `<label class="choix__option"><input type="radio" name="modele" value="aucun"> Je ne sais pas encore</label>`;

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

  document.querySelectorAll("[data-choisir]").forEach((bouton) => {
    bouton.addEventListener("click", () => {
      form.querySelector(`input[name="modele"][value="${bouton.dataset.choisir}"]`).checked = true;
      majApercu();
      $("demande").scrollIntoView();
    });
  });

  // ---------- Mail ----------

  function valeur(nom) {
    const champ = form.elements[nom];
    return champ ? String(champ.value || "").trim() : "";
  }

  function composerMail() {
    const etablissement = valeur("etablissement") || "[nom de l'établissement]";
    const nom = valeur("nom") || "[votre nom]";
    const modele = MODELES.find((m) => m.id === valeur("modele"));
    const police = POLICES.find((p) => p.id === valeur("police"));

    const joints = [];
    const delegues = [];
    const autorisations = [];

    if (valeur("logo") === "joint") joints.push("Logo");
    else delegues.push("Logo : je n'en ai pas, mettez simplement mon nom");

    if (valeur("photos") === "joint") joints.push("Photos");
    else {
      delegues.push("Photos");
      autorisations.push("utiliser des photos libres de droits");
    }

    if (police) {
      joints.push(`Style d'écriture : ${police.nom}`);
    } else {
      delegues.push("Style d'écriture");
      autorisations.push("choisir des polices de caractères gratuites");
    }

    if (valeur("couleurs") === "choisi") {
      joints.push(`Couleurs : ${valeur("couleur1")} (principale), ${valeur("couleur2")} (fond)`);
    } else {
      delegues.push("Couleurs");
      autorisations.push("choisir les couleurs");
    }

    if (valeur("textes") === "joint") joints.push("Textes");
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
      `Modèle choisi : ${modele ? modele.nom : "je ne sais pas encore"}`,
      "",
      "Ce que je vous fournis :",
      ...joints.map((j) => "- " + j),
    ];

    if (delegues.length) {
      lignes.push("", "Ce que je vous laisse choisir :", ...delegues.map((d) => "- " + d));
    }
    if (autorisations.length) {
      const avecA = autorisations.map((a, i) => (i === 0 ? a : "à " + a));
      const liste = avecA.length > 1
        ? avecA.slice(0, -1).join(", ") + " et " + avecA[avecA.length - 1]
        : avecA[0];
      lignes.push("", `Je vous autorise à ${liste} pour mon site.`);
    }

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

  // ---------- Divers ----------

  $("adresse").textContent = CONFIG.email;
  $("mentions-contact").innerHTML = `<a href="mailto:${CONFIG.email}">${CONFIG.email}</a>`;
  $("annee").textContent = new Date().getFullYear();
  if (CONFIG.prix) {
    $("prix").textContent = CONFIG.prix;
    $("prix").hidden = false;
  }

  majApercu();
})();
