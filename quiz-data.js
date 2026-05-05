// Questions santé corrigées.
// Chaque matière possède 5 sujets différents.
// Les questions sont générées selon la matière ET selon le sujet choisi.

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function q(question, options, answer, explanation) {
  return { question, options, answer, explanation };
}

function getSubjectProfile(subjectName) {
  const s = normalizeText(subjectName);

  if (s.includes("imagerie")) {
    return {
      domaine: "imagerie médicale",
      cible: "patient orienté pour examen d’imagerie",
      role: "préparer le patient, vérifier la prescription et surveiller les incidents",
      risque: "erreur d’identification, exposition inutile ou réaction au produit de contraste",
      urgence: "dyspnée, malaise, allergie ou grossesse non signalée",
      outil: "prescription, fiche d’examen, matériel de protection et dossier patient",
    };
  }

  if (s.includes("vaccination") || s.includes("injection")) {
    return {
      domaine: "vaccination et sécurité des injections",
      cible: "enfant, adolescent ou adulte à vacciner",
      role: "préparer la séance, conserver les vaccins et éliminer les déchets piquants",
      risque: "rupture de chaîne du froid, MAPI ou accident d’exposition au sang",
      urgence: "réaction anaphylactique ou malaise après injection",
      outil: "carnet de vaccination, glacière, seringue autobloquante et boîte de sécurité",
    };
  }

  if (s.includes("pediatr")) {
    return {
      domaine: "pédiatrie et PCIMNE",
      cible: "nourrisson ou enfant malade",
      role: "rechercher les signes de danger, classer la maladie et conseiller la mère",
      risque: "déshydratation, détresse respiratoire, convulsion ou malnutrition",
      urgence: "incapacité de boire, léthargie, convulsions ou tirage sévère",
      outil: "fiche PCIMNE, thermomètre, SRO, balance et courbe de croissance",
    };
  }

  if (s.includes("gyne") || s.includes("obst") || s.includes("sonu") || s.includes("postnat") || s.includes("ventouse") || s.includes("amiu") || s.includes("sexuelle") || s.includes("familiale") || s.includes("vih")) {
    return {
      domaine: "gynécologie, obstétrique et santé reproductive",
      cible: "femme enceinte, accouchée ou patiente en santé reproductive",
      role: "surveiller la mère, le fœtus ou le nouveau-né et organiser la référence",
      risque: "hémorragie, infection, pré-éclampsie, avortement compliqué ou souffrance fœtale",
      urgence: "saignement abondant, convulsion, fièvre élevée ou douleur intense",
      outil: "partogramme, tensiomètre, carnet CPN, kit d’accouchement et registre",
    };
  }

  if (s.includes("chirurgie") || s.includes("neurochirurgie")) {
    return {
      domaine: "soins chirurgicaux",
      cible: "patient en préopératoire ou postopératoire",
      role: "préparer l’intervention, surveiller les constantes, la douleur et la plaie",
      risque: "hémorragie, infection du site opératoire, choc ou complication anesthésique",
      urgence: "saignement abondant, détresse respiratoire ou trouble de conscience",
      outil: "dossier opératoire, pansement stérile, fiche de surveillance et antalgiques prescrits",
    };
  }

  if (s.includes("cardiologie")) {
    return { domaine: "cardiologie", cible: "patient cardio-vasculaire", role: "surveiller la tension, le pouls, la dyspnée et l’observance", risque: "AVC, insuffisance cardiaque, choc ou complication hypertensive", urgence: "douleur thoracique, dyspnée sévère ou TA très élevée", outil: "tensiomètre, stéthoscope, fiche de surveillance et traitement prescrit" };
  }
  if (s.includes("endocrinologie")) {
    return { domaine: "endocrinologie", cible: "patient diabétique ou thyroïdien", role: "surveiller la glycémie, les signes cliniques et éduquer le patient", risque: "hypoglycémie, hyperglycémie, coma ou complication thyroïdienne", urgence: "sueurs, tremblements, confusion, coma ou dyspnée compressive", outil: "glucomètre, bandelettes, carnet de suivi et traitement prescrit" };
  }
  if (s.includes("nephrologie")) {
    return { domaine: "néphrologie", cible: "patient atteint d’affection rénale", role: "surveiller la diurèse, les œdèmes, la TA et les bilans", risque: "insuffisance rénale, surcharge hydrique ou trouble électrolytique", urgence: "anurie, dyspnée, œdèmes massifs ou trouble de conscience", outil: "bocal de diurèse, balance, tensiomètre et feuille d’entrée-sortie" };
  }
  if (s.includes("psychiatrie") || s.includes("neuropsychiatrie")) {
    return { domaine: "psychiatrie", cible: "patient présentant un trouble psychique", role: "écouter, sécuriser, surveiller le comportement et favoriser l’observance", risque: "agitation, fugue, automutilation, violence ou rupture thérapeutique", urgence: "agitation extrême, idées suicidaires ou confusion aiguë", outil: "entretien infirmier, grille d’observation, traitement prescrit et protocole d’urgence" };
  }
  if (s.includes("dermatologie")) {
    return { domaine: "dermatologie", cible: "patient présentant une lésion cutanée", role: "observer la peau, prévenir l’infection et réaliser les soins locaux", risque: "surinfection, escarre, brûlure compliquée ou douleur", urgence: "brûlure étendue, nécrose ou infection sévère", outil: "gants, antiseptique, pansement stérile et fiche de plaie" };
  }

  if (s.includes("droit") || s.includes("fonction publique") || s.includes("redaction") || s.includes("gestion hospitaliere") || s.includes("entrepreneuriat") || s.includes("supervision") || s.includes("gouvernance") || s.includes("documents normatifs") || s.includes("securite sociale")) {
    return {
      domaine: "administration, gestion et responsabilité professionnelle",
      cible: "service, usager ou équipe de santé",
      role: "organiser le travail, respecter les textes, tracer les activités et communiquer clairement",
      risque: "faute professionnelle, conflit, mauvaise coordination ou absence de preuve",
      urgence: "incident grave, plainte, rupture de service ou problème de sécurité",
      outil: "registre, rapport, note administrative, protocole et indicateurs",
    };
  }

  if (s.includes("memoire") || s.includes("projet de soins") || s.includes("stage") || s.includes("cas cliniques")) {
    return {
      domaine: "méthodologie, stage et projet de soins",
      cible: "étudiant, patient ou communauté étudiée",
      role: "collecter des données, analyser le problème, planifier les actions et évaluer",
      risque: "objectif flou, biais, données incomplètes ou non-respect de l’éthique",
      urgence: "erreur méthodologique majeure ou situation dépassant les compétences",
      outil: "questionnaire, grille d’observation, plan de soins, rapport et indicateurs",
    };
  }

  return {
    domaine: "santé publique et soins infirmiers",
    cible: "patient, famille ou communauté",
    role: "évaluer la situation, prioriser les soins, éduquer et référer si nécessaire",
    risque: "complication, retard de prise en charge ou mauvaise observance",
    urgence: "détresse vitale, altération de l’état général ou signe de danger",
    outil: "fiche de surveillance, protocole, registre et matériel de soins",
  };
}

function getTopicProfile(topicName, subjectName) {
  const t = normalizeText(topicName);
  const s = normalizeText(subjectName);

  const rules = [
    ["radiographie", ["Radiographie conventionnelle", "vérifier la prescription, protéger le patient et retirer les objets gênants", "grossesse non signalée ou erreur de zone à explorer", "tablier plombé et bon d’examen"]],
    ["echographie", ["Échographie", "installer le patient et expliquer que l’examen utilise les ultrasons", "mauvaise préparation ou vessie insuffisamment remplie selon l’examen", "gel, sonde et fiche de rendez-vous"]],
    ["scanner", ["Scanner et produit de contraste", "rechercher une allergie, vérifier la créatinine et surveiller après injection", "allergie au produit de contraste ou extravasation", "voie veineuse, produit de contraste et chariot d’urgence"]],
    ["irm", ["IRM et sécurité", "retirer tout objet métallique et vérifier les implants", "accident lié au métal ou claustrophobie", "questionnaire IRM et consignes de sécurité"]],
    ["chaine du froid", ["Chaîne du froid", "conserver les vaccins entre les températures recommandées et contrôler la pastille", "vaccin inefficace par rupture de chaîne du froid", "glacière, accumulateurs et thermomètre"]],
    ["mapi", ["Gestion des MAPI", "identifier, traiter rapidement et notifier toute manifestation post-vaccinale", "réaction allergique grave ou panique collective", "fiche de notification MAPI et adrénaline"]],
    ["signes generaux", ["Signes généraux de danger", "rechercher les signes de danger avant toute classification PCIMNE", "référence tardive d’un enfant grave", "fiche PCIMNE"]],
    ["diarrhee", ["Diarrhée et déshydratation", "évaluer les signes de déshydratation et administrer le SRO", "déshydratation sévère ou choc", "SRO, zinc et plan de réhydratation"]],
    ["paludisme", ["Fièvre et paludisme chez l’enfant", "rechercher la fièvre, faire le test si indiqué et traiter selon protocole", "convulsion ou paludisme grave", "TDR, thermomètre et antipaludique prescrit"]],
    ["hypertension", ["Hypertension artérielle", "mesurer correctement la TA et rechercher les signes de gravité", "AVC ou complication hypertensive", "tensiomètre et carnet de suivi"]],
    ["diabete", ["Diabète sucré", "contrôler la glycémie et reconnaître hypo/hyperglycémie", "coma hypoglycémique ou hyperglycémique", "glucomètre et sucre rapide"]],
    ["goitre", ["Goitre et pathologies thyroïdiennes", "observer le cou, rechercher les signes compressifs et orienter", "dyspnée compressive ou trouble hormonal", "palpation cervicale et bilan prescrit"]],
    ["hemorragie", ["Hémorragies obstétricales", "évaluer le saignement, masser l’utérus si indiqué et alerter", "choc hémorragique", "utérotonique prescrit, voie veineuse et fiche de surveillance"]],
    ["pre-eclampsie", ["Pré-éclampsie et éclampsie", "mesurer la TA, rechercher céphalées, œdèmes et protéinurie", "convulsion ou AVC maternel", "tensiomètre, bandelette urinaire et sulfate de magnésium prescrit"]],
    ["partogramme", ["Surveillance du travail", "suivre la dilatation, les contractions et le rythme cardiaque fœtal", "travail prolongé ou souffrance fœtale", "partogramme et doppler/pinard"]],
    ["postoperatoire", ["Surveillance postopératoire", "surveiller conscience, douleur, plaie, constantes et diurèse", "hémorragie ou détresse respiratoire", "fiche postopératoire et pansement"]],
    ["pansements", ["Pansements et plaies", "respecter l’asepsie et observer l’évolution de la plaie", "infection du site opératoire", "set de pansement stérile"]],
    ["memoire", ["Mémoire", "formuler une problématique, choisir une méthode et présenter les résultats", "biais, plagiat ou objectifs imprécis", "questionnaire, grille d’analyse et plan de mémoire"]],
    ["diagnostic communautaire", ["Diagnostic communautaire", "collecter les données avec la communauté et prioriser les problèmes", "action non adaptée aux besoins réels", "questionnaire, entretien et carte communautaire"]],
    ["rapport", ["Rapport", "présenter clairement activités, résultats, difficultés et recommandations", "rapport incomplet ou non justifié", "plan de rapport et données collectées"]],
  ];

  for (const [keyword, data] of rules) {
    if (t.includes(keyword)) {
      return { axe: data[0], action: data[1], danger: data[2], outil: data[3] };
    }
  }

  return {
    axe: topicName || subjectName,
    action: `appliquer les principes spécifiques du thème « ${topicName} »`,
    danger: "erreur de prise en charge ou retard d’orientation",
    outil: "protocole du service, fiche de surveillance et registre",
  };
}

function buildQuestionSet(subjectName, topicName) {
  const p = getSubjectProfile(subjectName);
  const tp = getTopicProfile(topicName, subjectName);
  const label = `${subjectName} — ${topicName}`;
  const questions = [];

  const uniqueAngles = [
    ["définition", `Dans le thème « ${tp.axe} », quel élément correspond le mieux à l’objectif principal ?`,
      [`Assurer ${tp.action}`, "Remplacer le diagnostic médical sans compétence", "Ignorer les signes de danger", "Faire un soin sans traçabilité"], 0,
      `L’objectif est de sécuriser la prise en charge autour de ${tp.axe}.`],
    ["rôle infirmier", `Quel est le rôle infirmier prioritaire dans « ${tp.axe} » ?`,
      [tp.action, "Attendre sans surveiller", "Modifier seul la prescription", "Refuser d’informer le patient"], 0,
      `Le rôle infirmier est centré sur l’évaluation, la surveillance, l’information et la sécurité.`],
    ["risque", `Quel risque doit être particulièrement évité dans « ${tp.axe} » ?`,
      [tp.danger, "Amélioration spontanée certaine", "Absence totale de complication", "Diminution systématique du besoin de surveillance"], 0,
      `Ce risque impose une surveillance adaptée.`],
    ["outil", `Quel outil est le plus utile pour ce sujet ?`,
      [tp.outil, "Un objet personnel sans lien", "Une information non vérifiée", "Une transmission orale non tracée"], 0,
      `L’outil adapté facilite la qualité et la continuité des soins.`],
    ["signe d’urgence", `Quel signe impose une réaction rapide dans ce contexte ?`,
      [p.urgence, "Patient stable sans plainte", "Demande administrative simple", "Résultat normal sans symptôme"], 0,
      `Un signe d’urgence nécessite alerte, surveillance et orientation rapide.`],
  ];

  uniqueAngles.forEach((item, index) => {
    questions.push(q(
      `QCD ${index + 1} (${label}) : ${item[1]}`,
      item[2],
      item[3],
      item[4]
    ));
  });

  const qcmItems = [
    [`Quels éléments sont importants pour bien gérer « ${tp.axe} » ?`,
      [tp.action, "Surveiller l’évolution", "Tracer les actes réalisés", "Cacher les anomalies"], [0,1,2],
      "Une bonne prise en charge associe action adaptée, surveillance et traçabilité."],
    [`Quelles mesures renforcent la sécurité du patient dans ce sujet ?`,
      ["Identifier le patient", "Respecter le protocole", "Informer clairement", "Improviser sans vérifier"], [0,1,2],
      "La sécurité repose sur l’identification, le protocole et l’information."],
    [`Quels éléments doivent être transmis à l’équipe ?`,
      ["Signes observés", "Constantes ou données utiles", "Actions réalisées", "Rumeurs non vérifiées"], [0,1,2],
      "Les transmissions doivent être utiles, exactes et professionnelles."],
    [`Quelles erreurs faut-il éviter dans « ${tp.axe} » ?`,
      ["Oublier la surveillance", "Négliger la traçabilité", "Ignorer le danger", "Respecter le protocole"], [0,1,2],
      "Ces erreurs peuvent aggraver l’état du patient ou la qualité du service."],
    [`Quels principes d’éducation sont adaptés ?`,
      ["Utiliser des mots simples", "Vérifier la compréhension", "Donner les signes d’alerte", "Encourager l’automédication dangereuse"], [0,1,2],
      "L’éducation doit être claire, préventive et adaptée."],
  ];
  qcmItems.forEach((item, index) => questions.push(q(`QCM ${index + 6} (${label}) : ${item[0]}`, item[1], item[2], item[3])));

  const cases = [
    [`Cas clinique (${label}) : Un ${p.cible} est reçu pour « ${tp.axe} ». Quelle conduite initiale est correcte ?`,
      [`Évaluer la situation puis ${tp.action}`, "Le renvoyer sans conseil", "Administrer un traitement au hasard", "Ignorer la demande"], 0,
      "La conduite initiale doit commencer par une évaluation professionnelle."],
    [`Cas clinique (${label}) : Pendant la prise en charge, tu suspectes ${tp.danger}. Que faire ?`,
      ["Alerter, surveiller et appliquer le protocole", "Cacher l’information", "Attendre plusieurs jours", "Effacer les données"], 0,
      "Un risque identifié doit être signalé et pris en charge rapidement."],
    [`Cas pratique (${label}) : Tu dois organiser une activité sur « ${tp.axe} ». Quelle première étape est correcte ?`,
      ["Identifier les besoins et préparer le matériel", "Commencer sans plan", "Éviter l’équipe", "Ne pas évaluer"], 0,
      "Toute activité commence par l’identification du besoin et la préparation."],
    [`Cas pratique (${label}) : Une famille demande des conseils. Quelle réponse est la plus adaptée ?`,
      [`Expliquer simplement ${tp.action} et les signes d’alerte`, "Refuser toute explication", "Donner des informations contradictoires", "Conseiller d’éviter la consultation"], 0,
      "Le conseil doit être simple, utile et orienté vers la prévention."],
    [`Cas pratique (${label}) : Quel document ou matériel faut-il prévoir ?`,
      [tp.outil, "Matériel souillé", "Document sans lien", "Aucun support de traçabilité"], 0,
      "Le matériel ou document adapté améliore la qualité du soin."],
  ];
  cases.forEach((item) => questions.push(q(item[0], item[1], item[2], item[3])));

  const trueFalse = [
    [`Vrai/Faux (${label}) : ${tp.action} est une action adaptée à ce sujet.`, ["Vrai", "Faux"], 0, "Cette action correspond au thème choisi."],
    [`Vrai/Faux (${label}) : La traçabilité est inutile si le soin semble bien fait.`, ["Vrai", "Faux"], 1, "Tout soin doit être tracé."],
    [`Vrai/Faux (${label}) : ${tp.danger} peut nécessiter une alerte ou une référence.`, ["Vrai", "Faux"], 0, "Un risque important impose une réaction rapide."],
    [`Vrai/Faux (${label}) : L’éducation du patient ou de la famille peut prévenir les complications.`, ["Vrai", "Faux"], 0, "L’éducation améliore l’observance et le recours précoce aux soins."],
    [`Vrai/Faux (${label}) : Il est acceptable d’inventer des constantes ou des données si le service est chargé.`, ["Vrai", "Faux"], 1, "Les données doivent être réelles et vérifiables."],
  ];
  trueFalse.forEach((item) => questions.push(q(item[0], item[1], item[2], item[3])));

  // Questions complémentaires propres au sujet pour atteindre 30 questions par sujet.
  const complements = [
    ["priorité", `Quelle priorité guide la prise en charge de « ${tp.axe} » ?`, ["Sécuriser le patient avant tout", "Choisir au hasard", "Suivre uniquement l’ordre d’arrivée", "Éviter les transmissions"], 0, "La sécurité et la gravité guident la priorité."],
    ["communication", `Quelle communication est correcte dans ce sujet ?`, ["Écouter et vérifier la compréhension", "Humilier le patient", "Parler uniquement en termes complexes", "Refuser les questions"], 0, "La communication doit être respectueuse et claire."],
    ["surveillance", `Quel élément de surveillance est utile ?`, ["Constantes ou signes cliniques adaptés", "Couleur préférée du patient", "Rumeurs du voisinage", "Données inventées"], 0, "La surveillance repose sur des données réelles."],
    ["référence", `Quand faut-il référer ou alerter ?`, [p.urgence, "Toujours sans raison", "Jamais même en cas de danger", "Seulement après plusieurs semaines"], 0, "Les signes graves nécessitent une référence rapide."],
    ["qualité", `Quel facteur améliore la qualité des soins ?`, ["Respect des protocoles", "Absence de planification", "Improvisation permanente", "Non-respect du secret"], 0, "Les protocoles et l’organisation améliorent la qualité."],
    ["éthique", `Quel principe éthique est essentiel ?`, ["Confidentialité", "Diffusion des informations privées", "Moquerie du patient", "Refus systématique d’information"], 0, "La confidentialité protège le patient."],
    ["prévention", `Quelle action préventive est adaptée à « ${tp.axe} » ?`, [`Informer sur ${tp.danger}`, "Encourager le retard de consultation", "Cacher les risques", "Supprimer le suivi"], 0, "La prévention passe par l’information sur les risques."],
    ["continuité", `Comment assurer la continuité des soins ?`, ["Faire des transmissions claires", "Garder les informations pour soi", "Effacer les notes", "Changer la prescription sans autorisation"], 0, "Les transmissions assurent la continuité."],
    ["matériel", `Avant l’activité liée à « ${tp.axe} », que faut-il vérifier ?`, [tp.outil, "Matériel périmé", "Absence d’hygiène", "Aucun document"], 0, "Le matériel doit être disponible et adapté."],
    ["évaluation", `Après l’intervention, que faut-il évaluer ?`, ["L’évolution et l’efficacité des actions", "Uniquement l’avis d’un voisin", "Rien du tout", "Des données inventées"], 0, "L’évaluation permet d’améliorer la prise en charge."],
  ];
  complements.forEach((item, index) => questions.push(q(`QCD ${index + 21} (${label}) : ${item[1]}`, item[2], item[3], item[4])));

  return questions;
}

const QUIZ_QUESTIONS_BY_SUBJECT_AND_TOPIC = {};

SUBJECTS_CONFIG.forEach((subject) => {
  QUIZ_QUESTIONS_BY_SUBJECT_AND_TOPIC[subject.subjectName] = {};
  subject.topics.forEach((topic) => {
    QUIZ_QUESTIONS_BY_SUBJECT_AND_TOPIC[subject.subjectName][topic] = buildQuestionSet(subject.subjectName, topic);
  });
});
