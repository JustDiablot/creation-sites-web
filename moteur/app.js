(function () {
  "use strict";

  const S = window.SITE;
  const page = document.body.dataset.page;

  const ALLERGENES = {
    gluten: "Gluten",
    crustaces: "Crustacés",
    oeufs: "Œufs",
    poissons: "Poissons",
    arachides: "Arachides",
    soja: "Soja",
    lait: "Lait",
    fruits_a_coque: "Fruits à coque",
    celeri: "Céleri",
    moutarde: "Moutarde",
    sesame: "Sésame",
    sulfites: "Sulfites",
    lupin: "Lupin",
    mollusques: "Mollusques",
  };
  const ICONE = (contenu) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${contenu}</svg>`;
  const REGIMES = {
    vegetarien: {
      nom: "Végétarien",
      icone: ICONE('<path d="M5 19C5 11 10 5 20 4c-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>'),
    },
    vegan: {
      nom: "Vegan",
      icone: ICONE('<path d="M12 21v-8"/><path d="M12 13c0-5-3-8-8-8 0 5 3 8 8 8z"/><path d="M12 13c0-5 3-8 8-8 0 5-3 8-8 8z"/>'),
    },
    sans_gluten: {
      nom: "Sans gluten",
      icone: ICONE(
        '<path d="M12 21V6"/><path d="M12 6c-1-1.5-1-3 0-4 1 1 1 2.5 0 4z"/>' +
        '<path d="M12 10.5c-2.4 0-4-1.6-4-4 2.4 0 4 1.6 4 4zM12 10.5c2.4 0 4-1.6 4-4-2.4 0-4 1.6-4 4z"/>' +
        '<path d="M12 15c-2.4 0-4-1.6-4-4 2.4 0 4 1.6 4 4zM12 15c2.4 0 4-1.6 4-4-2.4 0-4 1.6-4 4z"/>' +
        '<path d="M4 4l16 16"/>'
      ),
    },
  };
  const POLICES = {
    fraunces: '"Fraunces", Georgia, serif',
    bricolage: '"Bricolage Grotesque", system-ui, sans-serif',
    archivo: '"Archivo", system-ui, sans-serif',
  };
  const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
  const SCHEMA_JOURS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Titre par défaut de chaque section (modifiable avec S.titres) et présence dans le menu
  const TITRES = {
    apropos: "La maison",
    carte: "La carte",
    produits: "Nos produits",
    savoirfaire: "Savoir-faire",
    realisations: "Réalisations",
    horaires: "Horaires",
    devis: "Demander un devis",
    infos: "Nous trouver",
  };
  const DANS_LE_MENU = ["carte", "produits", "savoirfaire", "realisations", "horaires", "devis", "infos"];

  const $ = (id) => document.getElementById(id);

  function esc(valeur) {
    return String(valeur ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }

  function formatPrix(prix) {
    if (typeof prix !== "number") return esc(prix);
    return prix.toFixed(2).replace(".", ",") + " €";
  }

  function formatHeure(heure) {
    const [h, m] = heure.split(":");
    return Number(h) + "h" + (m === "00" ? "" : m);
  }

  function enMinutes(heure) {
    const [h, m] = heure.split(":").map(Number);
    return h * 60 + m;
  }

  function lienTel(numero) {
    return "tel:" + numero.replace(/[^\d+]/g, "");
  }

  function slug(texte) {
    return texte.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function titre(section) {
    return (S.titres && S.titres[section]) || TITRES[section];
  }

  function photo(src, legende, classe) {
    return `<figure class="photo ${classe || ""}">${
      src ? `<img src="${esc(src)}" alt="${esc(legende)}" loading="lazy">` : `<div class="photo__vide">${esc(legende)}</div>`
    }</figure>`;
  }

  function itineraire() {
    const c = S.contact;
    return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(`${S.nom}, ${c.adresse}, ${c.codePostal} ${c.ville}`);
  }

  // ---------- Commun ----------

  function appliquerTheme() {
    const racine = document.documentElement.style;
    racine.setProperty("--fond", S.couleurs.fond);
    racine.setProperty("--texte", S.couleurs.texte);
    racine.setProperty("--accent", S.couleurs.accent);
    const theme = S.theme || {};
    racine.setProperty("--titre", POLICES[theme.police] || POLICES.fraunces);
    document.body.classList.add("police--" + (theme.police || "fraunces"));
  }

  function remplirEntete() {
    const liens = page === "accueil"
      ? S.sections.filter((s) => DANS_LE_MENU.includes(s)).map((s) => `<a href="#${s}">${esc(titre(s))}</a>`).join("")
      : `<a href="index.html">Retour au site</a>`;
    $("entete").innerHTML = `
      <div class="conteneur entete__barre">
        <a class="entete__nom" href="${page === "accueil" ? "#haut" : "index.html"}">${esc(S.nom)}</a>
        <nav class="entete__nav" aria-label="Navigation principale">${liens}</nav>
      </div>`;
  }

  function remplirPied() {
    const annee = new Date().getFullYear();
    const credit = S.credit && S.credit.texte
      ? S.credit.url
        ? `<a href="${esc(S.credit.url)}">${esc(S.credit.texte)}</a>`
        : esc(S.credit.texte)
      : "";
    $("pied").innerHTML = `
      <div class="conteneur pied__barre">
        <span>© ${annee} ${esc(S.nom)}</span>
        <a href="mentions-legales.html">Mentions légales</a>
        ${credit ? `<span>${credit}</span>` : ""}
      </div>`;
  }

  // ---------- Horaires ----------

  function maintenantParis() {
    const parties = new Intl.DateTimeFormat("fr-FR", {
      timeZone: "Europe/Paris",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const val = (type) => parties.find((p) => p.type === type).value;
    return { jour: JOURS.indexOf(val("weekday")), minutes: Number(val("hour")) * 60 + Number(val("minute")) };
  }

  function creneaux(indexJour) {
    return S.horaires[JOURS[(indexJour + 7) % 7]] || [];
  }

  // Créneau en cours : ceux du jour, ou ceux de la veille qui finissent après minuit
  function creneauEnCours(jour, minutes) {
    for (const [debut, fin] of creneaux(jour)) {
      const d = enMinutes(debut);
      const f = enMinutes(fin);
      if (f > d ? minutes >= d && minutes < f : minutes >= d) return fin;
    }
    for (const [debut, fin] of creneaux(jour - 1)) {
      const d = enMinutes(debut);
      const f = enMinutes(fin);
      if (f <= d && minutes < f) return fin;
    }
    return null;
  }

  function prochaineOuverture(jour, minutes) {
    for (let decalage = 0; decalage < 7; decalage++) {
      const j = (jour + decalage) % 7;
      for (const [debut] of creneaux(j)) {
        if (decalage > 0 || enMinutes(debut) > minutes) {
          const quand = decalage === 0 ? "" : decalage === 1 ? " demain" : " " + JOURS[j];
          return `ouvre${quand} à ${formatHeure(debut)}`;
        }
      }
    }
    return "";
  }

  function afficherStatut() {
    const statut = $("statut");
    if (!statut) return;
    const { jour, minutes } = maintenantParis();
    const fin = creneauEnCours(jour, minutes);
    if (fin) {
      statut.className = "statut statut--ouvert";
      statut.textContent = `Ouvert maintenant, ferme à ${formatHeure(fin)}`;
    } else {
      const suite = prochaineOuverture(jour, minutes);
      statut.className = "statut statut--ferme";
      statut.textContent = "Fermé" + (suite ? ", " + suite : "");
    }
  }

  // ---------- Sections ----------

  function sectionAccueil() {
    const a = S.accueil || {};
    const principal = a.bouton || { texte: titre(S.sections[1]), section: S.sections[1] };
    const disposition = a.disposition === "large" ? "accueil--large" : "accueil--cote";
    return `
      <section class="accueil ${disposition}" id="haut">
        <div class="conteneur accueil__grille">
          <div class="accueil__texte">
            ${S.horaires ? `<p class="statut" id="statut" aria-live="polite"></p>` : ""}
            ${a.surtitre ? `<p class="surtitre">${esc(a.surtitre)}</p>` : ""}
            <h1>${esc(S.nom)}</h1>
            <p class="accueil__accroche">${esc(S.accroche)}</p>
            <div class="actions">
              <a class="bouton" href="#${principal.section}">${esc(principal.texte)}</a>
              <a class="bouton bouton--contour" href="${lienTel(S.contact.telephone)}">Appeler</a>
            </div>
          </div>
          ${photo(S.photos.principale, a.legendePhoto || "Photo de la devanture", "photo--principale")}
        </div>
      </section>`;
  }

  function sectionApropos() {
    return `
      <div class="conteneur apropos__grille">
        ${photo(S.photos.secondaire, S.photos.legendeSecondaire || "Photo de l'intérieur", "photo--secondaire")}
        <div>
          <h2>${esc(titre("apropos"))}</h2>
          ${S.apropos.map((p) => `<p>${esc(p)}</p>`).join("")}
        </div>
      </div>`;
  }

  function nomsAllergenes(liste) {
    return liste.length ? liste.map((a) => ALLERGENES[a] || esc(a)).join(", ") : "aucun";
  }

  // Allergènes d'une variante : ceux du plat, moins ceux retirés, plus ceux ajoutés
  function allergenesVariante(plat, variante) {
    const base = (plat.allergenes || []).filter((a) => !(variante.retire || []).includes(a));
    return [...new Set([...base, ...(variante.ajoute || [])])];
  }

  function htmlPlat(plat, id) {
    const allergenes = plat.allergenes || [];
    const regimes = (plat.regimes || [])
      .filter((r) => REGIMES[r])
      .map((r) => `<span class="regime regime--${r}" title="${REGIMES[r].nom}" role="img" aria-label="${REGIMES[r].nom}">${REGIMES[r].icone}</span>`)
      .join("");
    const details = [];
    if (plat.description) details.push(`<p>${esc(plat.description)}</p>`);
    if (plat.ingredients && plat.ingredients.length) {
      details.push(`<p><strong>Ingrédients :</strong> ${plat.ingredients.map(esc).join(", ")}</p>`);
    }
    details.push(
      allergenes.length
        ? `<p><strong>Allergènes :</strong> ${nomsAllergenes(allergenes)}</p>`
        : `<p><strong>Allergènes :</strong> aucun des 14 allergènes réglementaires</p>`
    );
    if (plat.variantes && plat.variantes.length) {
      const lignes = plat.variantes.map((v) => {
        const supplement = v.supplement ? `, +${formatPrix(v.supplement)}` : "";
        return `<li>${esc(v.nom)}${supplement} (allergènes : ${nomsAllergenes(allergenesVariante(plat, v))})</li>`;
      });
      details.push(`<p><strong>Possible aussi :</strong></p><ul>${lignes.join("")}</ul>`);
    }
    return `
      <details class="plat" data-plat="${id}">
        <summary class="plat__ligne">
          <span class="plat__nom">${esc(plat.nom)}${regimes}</span>
          <span class="plat__pointilles" aria-hidden="true"></span>
          <span class="plat__prix">${formatPrix(plat.prix)}</span>
          <span class="plat__adaptation"></span>
        </summary>
        <div class="plat__details">${details.join("")}</div>
      </details>`;
  }

  function sectionCarte() {
    const rubriques = S.carte.map((r) => `<a href="#${slug(r.categorie)}">${esc(r.categorie)}</a>`).join("");
    const regimesPresents = new Set(S.carte.flatMap((r) => r.plats.flatMap((p) => p.regimes || [])));
    const legende = Object.keys(REGIMES)
      .filter((cle) => regimesPresents.has(cle))
      .map((cle) => `<li><span class="regime regime--${cle}">${REGIMES[cle].icone}</span>${REGIMES[cle].nom}</li>`)
      .join("");
    const presents = new Set(
      S.carte.flatMap((r) => r.plats.flatMap((p) => [...(p.allergenes || []), ...(p.variantes || []).flatMap((v) => v.ajoute || [])]))
    );
    const cases = Object.keys(ALLERGENES)
      .filter((cle) => presents.has(cle))
      .map((cle) => `<label><input type="checkbox" value="${cle}"> ${ALLERGENES[cle]}</label>`)
      .join("");
    const contenu = S.carte
      .map((r, ri) => `
        <div class="rubrique" id="${slug(r.categorie)}">
          <h3>${esc(r.categorie)}</h3>
          ${r.plats.map((p, pi) => htmlPlat(p, `${ri}-${pi}`)).join("")}
        </div>`)
      .join("");
    return `
      <div class="conteneur conteneur--etroit">
        <h2>${esc(titre("carte"))}</h2>
        <nav class="carte__rubriques" aria-label="Rubriques de la carte">${rubriques}</nav>
        ${legende ? `<ul class="legende" aria-label="Légende">${legende}</ul>` : ""}
        <details class="filtre">
          <summary>Filtrer par allergène</summary>
          <p class="filtre__aide">Cochez les allergènes à éviter : les plats qui en contiennent seront masqués, ou proposés en version adaptée quand c'est possible.</p>
          <div class="filtre__liste" id="filtre-allergenes">${cases}</div>
          <p class="filtre__resultat" id="filtre-resultat" aria-live="polite"></p>
          <p class="filtre__avertissement">Informations données à titre indicatif. En cas d'allergie, signalez-la au personnel : des traces peuvent être présentes.</p>
        </details>
        ${contenu}
        ${S.noteCarte ? `<p class="note">${esc(S.noteCarte)}</p>` : ""}
      </div>`;
  }

  function filtrer() {
    const exclus = [...document.querySelectorAll("#filtre-allergenes input:checked")].map((c) => c.value);
    const compatible = (liste) => !liste.some((a) => exclus.includes(a));
    let masques = 0;
    let adaptes = 0;
    document.querySelectorAll(".plat").forEach((el) => {
      const [ri, pi] = el.dataset.plat.split("-").map(Number);
      const plat = S.carte[ri].plats[pi];
      const adaptation = el.querySelector(".plat__adaptation");
      adaptation.textContent = "";
      el.hidden = false;
      if (compatible(plat.allergenes || [])) return;

      // Le plat de base ne convient pas : on cherche une variante qui convient
      const variante = (plat.variantes || []).find((v) => compatible(allergenesVariante(plat, v)));
      if (variante) {
        adaptation.textContent = "Possible " + variante.nom;
        adaptes++;
      } else {
        el.hidden = true;
        masques++;
      }
    });
    document.querySelectorAll(".rubrique").forEach((r) => {
      r.hidden = !r.querySelector(".plat:not([hidden])");
    });
    const resultat = [];
    if (masques) resultat.push(`${masques} plat${masques > 1 ? "s" : ""} masqué${masques > 1 ? "s" : ""}`);
    if (adaptes) resultat.push(`${adaptes} possible${adaptes > 1 ? "s" : ""} en version adaptée`);
    $("filtre-resultat").textContent = exclus.length ? resultat.join(", ") || "Toute la carte est compatible" : "";
  }

  function sectionProduits() {
    const p = S.produits;
    const cartes = p.liste
      .map((item) => `
        <article class="produit">
          ${photo(item.photo, item.nom, "photo--produit")}
          <div class="produit__texte">
            <h3>${esc(item.nom)}</h3>
            ${item.description ? `<p>${esc(item.description)}</p>` : ""}
            ${item.prix !== undefined ? `<p class="produit__prix">${formatPrix(item.prix)}</p>` : ""}
          </div>
        </article>`)
      .join("");
    return `
      <div class="conteneur">
        <div class="section__entete">
          <h2>${esc(titre("produits"))}</h2>
          ${p.intro ? `<p>${esc(p.intro)}</p>` : ""}
        </div>
        <div class="produits">${cartes}</div>
        ${p.note ? `<p class="note">${esc(p.note)}</p>` : ""}
      </div>`;
  }

  function sectionSavoirfaire() {
    const s = S.savoirfaire;
    const etapes = s.etapes
      .map((e, i) => `
        <li class="etape">
          <span class="etape__numero">${String(i + 1).padStart(2, "0")}</span>
          <h3>${esc(e.titre)}</h3>
          <p>${esc(e.texte)}</p>
        </li>`)
      .join("");
    return `
      <div class="conteneur">
        <div class="section__entete">
          <h2>${esc(titre("savoirfaire"))}</h2>
          ${s.intro ? `<p>${esc(s.intro)}</p>` : ""}
        </div>
        <ol class="etapes">${etapes}</ol>
      </div>`;
  }

  function sectionRealisations() {
    const r = S.realisations;
    const items = r.liste
      .map((item) => `
        <article class="realisation">
          ${photo(item.photo, item.titre, "photo--realisation")}
          <h3>${esc(item.titre)}</h3>
          ${item.legende ? `<p>${esc(item.legende)}</p>` : ""}
        </article>`)
      .join("");
    return `
      <div class="conteneur">
        <div class="section__entete">
          <h2>${esc(titre("realisations"))}</h2>
          ${r.intro ? `<p>${esc(r.intro)}</p>` : ""}
        </div>
        <div class="realisations">${items}</div>
      </div>`;
  }

  function sectionHoraires() {
    const aujourdhui = maintenantParis().jour;
    const lignes = JOURS.map((nom, i) => {
      const plages = creneaux(i);
      const texte = plages.length ? plages.map(([d, f]) => `${formatHeure(d)} à ${formatHeure(f)}`).join(", ") : "Fermé";
      const classe = i === aujourdhui ? ' class="aujourdhui"' : "";
      const marque = i === aujourdhui ? ' <span class="aujourdhui__marque">aujourd\'hui</span>' : "";
      return `<tr${classe}><th scope="row">${nom}${marque}</th><td>${texte}</td></tr>`;
    }).join("");
    return `
      <div class="conteneur conteneur--etroit">
        <h2>${esc(titre("horaires"))}</h2>
        <table class="horaires__table">${lignes}</table>
        ${S.noteHoraires ? `<p class="note">${esc(S.noteHoraires)}</p>` : ""}
      </div>`;
  }

  function sectionDevis() {
    const d = S.devis;
    const c = S.contact;
    const corps = [
      "Bonjour,",
      "",
      "Je souhaiterais un devis pour :",
      "",
      "Dimensions ou quantités (si connues) :",
      "Délai souhaité :",
      "Ville du chantier :",
      "",
      "Merci,",
    ].join("\n");
    const mail = `mailto:${c.email}?subject=${encodeURIComponent("Demande de devis")}&body=${encodeURIComponent(corps)}`;
    const points = (d.points || []).map((p) => `<li>${esc(p)}</li>`).join("");
    return `
      <div class="conteneur devis__grille">
        <div>
          <h2>${esc(titre("devis"))}</h2>
          ${d.intro ? `<p>${esc(d.intro)}</p>` : ""}
          <div class="actions">
            <a class="bouton" href="${mail}">Écrire un mail</a>
            <a class="bouton bouton--contour" href="${lienTel(c.telephone)}">${esc(c.telephone)}</a>
          </div>
        </div>
        ${points ? `<ul class="devis__points">${points}</ul>` : ""}
      </div>`;
  }

  function sectionInfos() {
    const c = S.contact;
    const noms = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", tripadvisor: "Tripadvisor", linkedin: "LinkedIn" };
    const reseaux = Object.entries(S.reseaux || {})
      .filter(([, url]) => url)
      .map(([cle, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener">${noms[cle] || esc(cle)}</a></li>`)
      .join("");
    const d = 0.004;
    const bbox = [c.longitude - d, c.latitude - d / 1.5, c.longitude + d, c.latitude + d / 1.5].join(",");
    return `
      <div class="conteneur infos__grille">
        <div>
          <h2>${esc(titre("infos"))}</h2>
          <address>
            <p>${esc(c.adresse)}<br>${esc(c.codePostal)} ${esc(c.ville)}</p>
            <p><a href="${itineraire()}" target="_blank" rel="noopener">Itinéraire</a></p>
            ${c.telephone ? `<p><a href="${lienTel(c.telephone)}">${esc(c.telephone)}</a></p>` : ""}
            ${c.email ? `<p><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></p>` : ""}
          </address>
          ${reseaux ? `<ul class="reseaux">${reseaux}</ul>` : ""}
        </div>
        <div class="infos__plan">
          <iframe title="Plan d'accès" loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${c.latitude},${c.longitude}"></iframe>
        </div>
      </div>`;
  }

  const RENDUS = {
    apropos: sectionApropos,
    carte: sectionCarte,
    produits: sectionProduits,
    savoirfaire: sectionSavoirfaire,
    realisations: sectionRealisations,
    horaires: sectionHoraires,
    devis: sectionDevis,
    infos: sectionInfos,
  };

  function afficherAccueil() {
    const sections = S.sections
      .filter((s) => RENDUS[s])
      .map((s) => `<section class="section section--${s}" id="${s}" aria-label="${esc(titre(s))}">${RENDUS[s]()}</section>`)
      .join("");
    $("contenu").innerHTML = sectionAccueil() + sections;

    const filtre = $("filtre-allergenes");
    if (filtre) filtre.addEventListener("change", filtrer);

    const principal = (S.accueil && S.accueil.bouton) || { texte: titre(S.sections[1]), section: S.sections[1] };
    $("barre-mobile").innerHTML = `
      <a href="${lienTel(S.contact.telephone)}">Appeler</a>
      <a href="#${principal.section}">${esc(principal.texte)}</a>
      <a href="${itineraire()}" target="_blank" rel="noopener">Itinéraire</a>`;
  }

  // ---------- Référencement ----------

  function referencement() {
    const c = S.contact;
    document.title = `${S.nom} | ${S.accroche}`;
    const description = document.createElement("meta");
    description.name = "description";
    description.content = S.description;
    document.head.appendChild(description);

    const horaires = [];
    if (S.horaires) {
      JOURS.forEach((_, i) => {
        creneaux(i).forEach(([debut, fin]) => {
          horaires.push({ "@type": "OpeningHoursSpecification", dayOfWeek: SCHEMA_JOURS[i], opens: debut, closes: fin });
        });
      });
    }

    const donnees = {
      "@context": "https://schema.org",
      "@type": S.type || "LocalBusiness",
      name: S.nom,
      description: S.description,
      telephone: c.telephone,
      email: c.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: c.adresse,
        postalCode: c.codePostal,
        addressLocality: c.ville,
        addressCountry: "FR",
      },
      geo: { "@type": "GeoCoordinates", latitude: c.latitude, longitude: c.longitude },
      openingHoursSpecification: horaires,
      sameAs: Object.values(S.reseaux || {}).filter(Boolean),
    };
    if (S.sections.includes("carte")) donnees.hasMenu = location.href.split("#")[0] + "#carte";
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(donnees);
    document.head.appendChild(script);
  }

  // ---------- Mentions légales ----------

  function afficherLegal() {
    const l = S.legal;
    const c = S.contact;
    const h = l.hebergeur;
    document.title = `Mentions légales | ${S.nom}`;
    const editeur = [
      `${esc(l.raisonSociale)}, ${esc(l.forme)}`,
      `${esc(c.adresse)}, ${esc(c.codePostal)} ${esc(c.ville)}`,
      `SIRET : ${esc(l.siret)}${l.rcs ? ", " + esc(l.rcs) : ""}`,
      l.tva ? `TVA intracommunautaire : ${esc(l.tva)}` : "",
      `Téléphone : ${esc(c.telephone)}, e-mail : ${esc(c.email)}`,
      `Directeur de la publication : ${esc(l.directeurPublication)}`,
    ].filter(Boolean).join("<br>");
    const hebergeur = [esc(h.nom), esc(h.adresse), h.site ? esc(h.site) : ""].filter(Boolean).join("<br>");
    $("contenu").innerHTML = `
      <div class="section">
        <div class="conteneur conteneur--etroit legal">
          <h1>Mentions légales</h1>
          <h2>Éditeur du site</h2>
          <p>${editeur}</p>
          <h2>Hébergement</h2>
          <p>${hebergeur}</p>
          <h2>Propriété intellectuelle</h2>
          <p>L'ensemble des contenus de ce site (textes, photos, logo) est la propriété de l'éditeur, sauf mention contraire. Toute reproduction sans autorisation est interdite.</p>
          <h2>Données personnelles</h2>
          <p>Ce site ne collecte aucune donnée personnelle et ne dépose aucun cookie de mesure d'audience ou de publicité. Les polices de caractères sont hébergées sur le site lui-même. Le plan est fourni par OpenStreetMap : en l'affichant, votre adresse IP est transmise à ce service.</p>
          <p>Si vous nous contactez par téléphone ou par e-mail, vos informations servent uniquement à vous répondre. Vous pouvez exercer vos droits (accès, rectification, suppression) en écrivant à l'adresse indiquée ci-dessus.</p>
          ${S.credit && S.credit.texte ? `<h2>Réalisation</h2><p>${esc(S.credit.texte)}</p>` : ""}
        </div>
      </div>`;
  }

  // ---------- Lancement ----------

  appliquerTheme();
  remplirEntete();
  remplirPied();

  if (page === "accueil") {
    referencement();
    afficherAccueil();
    afficherStatut();
    setInterval(afficherStatut, 60000);
  } else if (page === "legal") {
    afficherLegal();
  }
})();
