const DOMAINS = [
  {
    id: "art",
    title: "Art",
    description: "Création visuelle, esthétique et mouvements artistiques.",
    deepDive: {
      highlight: "Le clair-obscur de Caravage a révolutionné la narration picturale.",
      concept: "Le mouvement impressionniste a valorisé l’instant plutôt que le détail.",
      recommendation: "Explorez le musée d’Orsay en visite virtuelle.",
      anecdote: "Frida Kahlo a peint plus de 140 œuvres malgré une santé fragile.",
    },
  },
  {
    id: "musique",
    title: "Musique",
    description: "Genres, innovations sonores et créativité musicale.",
    deepDive: {
      highlight: "Le jazz a donné naissance à l’improvisation moderne.",
      concept: "La musique minimaliste repose sur la répétition et la texture.",
      recommendation: "Écoutez une session live de jazz contemporain.",
      anecdote: "Bach a composé plus de 1 000 œuvres connues.",
    },
  },
  {
    id: "sport",
    title: "Sport",
    description: "Performance, tactiques et histoires inspirantes.",
    deepDive: {
      highlight: "Le football total a redéfini la stratégie collective.",
      concept: "La préparation mentale est un pilier de la haute performance.",
      recommendation: "Analysez un match historique avec des tactiques modernes.",
      anecdote: "Kathrine Switzer a défié les normes au marathon de Boston.",
    },
  },
  {
    id: "sciences",
    title: "Sciences",
    description: "Découvertes, recherches et curiosités scientifiques.",
    deepDive: {
      highlight: "La théorie de la relativité a changé notre vision du temps.",
      concept: "La méthode scientifique repose sur l’expérimentation rigoureuse.",
      recommendation: "Suivez une actualité de laboratoire chaque semaine.",
      anecdote: "Marie Curie reste la seule double lauréate Nobel.",
    },
  },
  {
    id: "technologie",
    title: "Technologie",
    description: "Innovation numérique, IA et culture digitale.",
    deepDive: {
      highlight: "L’open source accélère la collaboration mondiale.",
      concept: "L’IA générative apprend des modèles de données massifs.",
      recommendation: "Testez une application low-code pour prototyper.",
      anecdote: "Le premier site web date de 1991.",
    },
  },
  {
    id: "cinema",
    title: "Cinéma",
    description: "Films, narration visuelle et histoire du 7e art.",
    deepDive: {
      highlight: "Le montage soviétique a structuré le langage cinématographique.",
      concept: "La photographie influence l’émotion d’une scène.",
      recommendation: "Découvrez un classique restauré en 4K.",
      anecdote: "Le film 'Metropolis' a inspiré la science-fiction moderne.",
    },
  },
  {
    id: "philosophie",
    title: "Philosophie",
    description: "Pensée critique, sagesse et questionnements.",
    deepDive: {
      highlight: "Le stoïcisme propose une maîtrise intérieure des émotions.",
      concept: "La phénoménologie explore la conscience vécue.",
      recommendation: "Lisez un court dialogue de Platon.",
      anecdote: "Simone de Beauvoir a aussi été éditrice engagée.",
    },
  },
  {
    id: "business",
    title: "Business",
    description: "Stratégies, entrepreneuriat et économie.",
    deepDive: {
      highlight: "Le modèle d’abonnement redéfinit la valeur perçue.",
      concept: "Le design thinking place l’utilisateur au centre.",
      recommendation: "Analysez un cas d’entreprise sociale.",
      anecdote: "L’économie circulaire s’inspire de la nature.",
    },
  },
  {
    id: "histoire",
    title: "Histoire",
    description: "Époques, civilisations et événements majeurs.",
    deepDive: {
      highlight: "La route de la soie a relié des cultures éloignées.",
      concept: "L’histoire comparée révèle des dynamiques communes.",
      recommendation: "Suivez un documentaire sur un empire oublié.",
      anecdote: "La bibliothèque d’Alexandrie était un centre de savoir mondial.",
    },
  },
  {
    id: "creativite",
    title: "Créativité",
    description: "Méthodes, inspiration et expérimentation.",
    deepDive: {
      highlight: "Les contraintes stimulent souvent l’innovation.",
      concept: "Le mind mapping clarifie les idées complexes.",
      recommendation: "Tenez un carnet d’idées quotidien.",
      anecdote: "Léonard de Vinci utilisait des carnets remplis d’esquisses.",
    },
  },
  {
    id: "litterature",
    title: "Littérature",
    description: "Romans, poésie et récits fondateurs.",
    deepDive: {
      highlight: "Le réalisme a transformé la narration au XIXe siècle.",
      concept: "La poésie moderne casse les codes de la rime.",
      recommendation: "Découvrez un recueil de poésie contemporain.",
      anecdote: "Virginia Woolf a innové avec le flux de conscience.",
    },
  },
  {
    id: "psychologie",
    title: "Psychologie",
    description: "Comportements, cognition et bien-être.",
    deepDive: {
      highlight: "L’effet placebo montre la puissance de l’esprit.",
      concept: "Les biais cognitifs influencent nos décisions.",
      recommendation: "Testez une routine de pleine conscience.",
      anecdote: "Le test de Marshmallow a marqué la psychologie sociale.",
    },
  },
];

const DAILY_MESSAGES = [
  "Aujourd’hui, cultive une curiosité active : chaque question est une porte vers un nouveau monde.",
  "La discipline transforme la connaissance en puissance. Une idée par jour suffit.",
  "L’inspiration naît du mouvement : explore un domaine que tu ne connais pas encore.",
  "Apprends un fait marquant, partage-le, et tu renforces ta mémoire.",
  "Ta culture générale est un superpouvoir : nourris-la avec patience et régularité.",
];

const PREFERENCES_KEY = "lezizidures.preferences";
const memoryStorage = new Map();

const safeStorage = {
  getItem(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return memoryStorage.get(key) || null;
    }
  },
  setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      memoryStorage.set(key, value);
    }
  },
};

const preferenceModal = document.getElementById("preference-modal");
const domainGrid = document.getElementById("domain-grid");
const preferenceGrid = document.getElementById("preference-grid");
const deepDiveGrid = document.getElementById("deep-dive-grid");
const expandGrid = document.getElementById("expand-grid");
const saveSelectionButton = document.getElementById("save-selection");
const resetSelectionButton = document.getElementById("reset-selection");
const editPreferencesButton = document.getElementById("edit-preferences");
const dailyMessage = document.getElementById("daily-message");

const state = {
  selectedDomains: new Set(),
};

const formatDateIndex = (length) => {
  const today = new Date();
  const seed = today.getFullYear() * 1000 + today.getDate();
  return seed % length;
};

const loadPreferences = () => {
  const saved = safeStorage.getItem(PREFERENCES_KEY);
  if (!saved) {
    return [];
  }
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const savePreferences = (preferences) => {
  safeStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
};

const toggleModal = (open) => {
  preferenceModal.classList.toggle("active", open);
  preferenceModal.setAttribute("aria-hidden", String(!open));
};

const renderDailyMessage = () => {
  dailyMessage.textContent = DAILY_MESSAGES[formatDateIndex(DAILY_MESSAGES.length)];
};

const renderDomainSelection = () => {
  domainGrid.innerHTML = "";
  DOMAINS.forEach((domain) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "domain-card";
    card.setAttribute("data-domain", domain.id);
    card.innerHTML = `<h4>${domain.title}</h4><p>${domain.description}</p>`;
    if (state.selectedDomains.has(domain.id)) {
      card.classList.add("selected");
    }
    card.addEventListener("click", () => {
      if (state.selectedDomains.has(domain.id)) {
        state.selectedDomains.delete(domain.id);
      } else {
        state.selectedDomains.add(domain.id);
      }
      renderDomainSelection();
    });
    domainGrid.appendChild(card);
  });
};

const createCard = ({ tag, title, description }) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `<span class="tag">${tag}</span><h3>${title}</h3><p>${description}</p>`;
  return card;
};

const renderPreferenceSection = () => {
  preferenceGrid.innerHTML = "";
  const selected = DOMAINS.filter((domain) => state.selectedDomains.has(domain.id));
  if (selected.length === 0) {
    preferenceGrid.appendChild(
      createCard({
        tag: "Bienvenue",
        title: "Commencez votre sélection",
        description: "Choisissez vos domaines pour recevoir des contenus ciblés.",
      })
    );
    return;
  }
  selected.forEach((domain) => {
    preferenceGrid.appendChild(
      createCard({
        tag: "Aujourd’hui",
        title: domain.title,
        description: domain.description,
      })
    );
  });
};

const renderDeepDiveSection = () => {
  deepDiveGrid.innerHTML = "";
  const selected = DOMAINS.filter((domain) => state.selectedDomains.has(domain.id));
  const list = selected.length > 0 ? selected : DOMAINS.slice(0, 4);
  list.forEach((domain) => {
    deepDiveGrid.appendChild(
      createCard({
        tag: "Fait marquant",
        title: domain.title,
        description: domain.deepDive.highlight,
      })
    );
    deepDiveGrid.appendChild(
      createCard({
        tag: "Concept clé",
        title: domain.title,
        description: domain.deepDive.concept,
      })
    );
    deepDiveGrid.appendChild(
      createCard({
        tag: "Recommandation",
        title: domain.title,
        description: domain.deepDive.recommendation,
      })
    );
    deepDiveGrid.appendChild(
      createCard({
        tag: "Anecdote",
        title: domain.title,
        description: domain.deepDive.anecdote,
      })
    );
  });
};

const renderExpandSection = () => {
  expandGrid.innerHTML = "";
  const selectedIds = new Set(state.selectedDomains);
  const suggestions = DOMAINS.filter((domain) => !selectedIds.has(domain.id))
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  suggestions.forEach((domain) => {
    expandGrid.appendChild(
      createCard({
        tag: "Nouveau domaine",
        title: domain.title,
        description: domain.description,
      })
    );
  });
};

const renderAll = () => {
  renderDailyMessage();
  renderPreferenceSection();
  renderDeepDiveSection();
  renderExpandSection();
};

saveSelectionButton.addEventListener("click", () => {
  const selection = Array.from(state.selectedDomains);
  savePreferences(selection);
  toggleModal(false);
  renderAll();
});

resetSelectionButton.addEventListener("click", () => {
  state.selectedDomains.clear();
  renderDomainSelection();
});

editPreferencesButton.addEventListener("click", () => {
  renderDomainSelection();
  toggleModal(true);
});

const init = () => {
  const savedPreferences = loadPreferences();
  savedPreferences.forEach((id) => state.selectedDomains.add(id));
  renderDomainSelection();
  renderAll();
  if (savedPreferences.length === 0) {
    toggleModal(true);
  }
};

init();
