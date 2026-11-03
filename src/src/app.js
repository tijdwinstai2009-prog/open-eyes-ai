
const app = document.getElementById("app");

const translations = {
  nl: {
    welcome: "Welkom bij OPEN EYES AI",
    subtitle: "Volg het bewijs. Verifieer iedere aanwijzing.",
    cases: "Mijn dossiers",
    evidence: "Bewijsbeheer",
    osint: "OSINT onderzoek",
    reports: "Onderzoeksrapporten",
    create: "Nieuw dossier",
    title: "Dossiertitel",
    save: "Dossier aanmaken",
    empty: "Er zijn nog geen dossiers."
  },
  en: {
    welcome: "Welcome to OPEN EYES AI",
    subtitle: "Follow the evidence. Verify every lead.",
    cases: "My cases",
    evidence: "Evidence management",
    osint: "OSINT investigation",
    reports: "Investigation reports",
    create: "New case",
    title: "Case title",
    save: "Create case",
    empty: "No cases yet."
  },
  de: {
    welcome: "Willkommen bei OPEN EYES AI",
    subtitle: "Folge den Beweisen. Überprüfe jeden Hinweis.",
    cases: "Meine Fälle",
    evidence: "Beweisverwaltung",
    osint: "OSINT-Ermittlung",
    reports: "Ermittlungsberichte",
    create: "Neuer Fall",
    title: "Falltitel",
    save: "Fall erstellen",
    empty: "Noch keine Fälle."
  },
  fr: {
    welcome: "Bienvenue chez OPEN EYES AI",
    subtitle: "Suivez les preuves. Vérifiez chaque piste.",
    cases: "Mes dossiers",
    evidence: "Gestion des preuves",
    osint: "Enquête OSINT",
    reports: "Rapports d'enquête",
    create: "Nouveau dossier",
    title: "Titre du dossier",
    save: "Créer le dossier",
    empty: "Aucun dossier."
  },
  ja: {
    welcome: "OPEN EYES AIへようこそ",
    subtitle: "証拠を追跡し、すべての手がかりを検証する。",
    cases: "調査案件",
    evidence: "証拠管理",
    osint: "OSINT調査",
    reports: "調査報告書",
    create: "新しい案件",
    title: "案件名",
    save: "案件を作成",
    empty: "案件はまだありません。"
  }
};

let language = "nl";
let cases = [];

function render() {
  const t = translations[language];

  app.innerHTML = `
    <header>
      <h1>OPEN EYES AI</h1>
      <select id="language">
        <option value="nl">Nederlands</option>
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="fr">Français</option>
        <option value="ja">日本語</option>
      </select>
    </header>

    <main>
      <section class="welcome">
        <h2>${t.welcome}</h2>
        <p>${t.subtitle}</p>
      </section>

      <nav class="modules">
        <button data-page="cases">${t.cases}</button>
        <button data-page="evidence">${t.evidence}</button>
        <button data-page="osint">${t.osint}</button>
        <button data-page="reports">${t.reports}</button>
      </nav>

      <section id="content" class="panel">
        <h2>${t.cases}</h2>
        <button id="new-case">${t.create}</button>
        <div id="case-list"></div>
      </section>
    </main>

    <footer>OPEN EYES AI · BUILD 001</footer>
  `;

  document.getElementById("language").value = language;

  document.getElementById("language").onchange = event => {
    language = event.target.value;
    render();
  };

  document.querySelectorAll("[data-page]").forEach(button => {
    button.onclick = () => showPage(button.dataset.page);
  });

  document.getElementById("new-case").onclick = createCase;

  renderCases();
}

function renderCases() {
  const list = document.getElementById("case-list");
  const t = translations[language];

  if (!cases.length) {
    list.textContent = t.empty;
    return;
  }

  list.replaceChildren();

  cases.forEach(item => {
    const article = document.createElement("article");
    article.className = "case-item";

    const heading = document.createElement("h3");
    heading.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = "Synthetisch testdossier";

    article.append(heading, description);
    list.append(article);
  });
}

function createCase() {
  const t = translations[language];
  const title = prompt(t.title);

  if (!title || !title.trim()) return;

  cases.push({
    id: crypto.randomUUID(),
    title: title.trim()
  });

  renderCases();
}

function showPage(page) {
  const content = document.getElementById("content");
  const labels = translations[language];

  const names = {
    cases: labels.cases,
    evidence: labels.evidence,
    osint: labels.osint,
    reports: labels.reports
  };

  content.replaceChildren();

  const heading = document.createElement("h2");
  heading.textContent = names[page];

  const message = document.createElement("p");
  message.textContent =
    page === "cases"
      ? labels.empty
      : "Deze module wordt in een volgende ontwikkelfase gebouwd.";

  content.append(heading, message);
}

render();
