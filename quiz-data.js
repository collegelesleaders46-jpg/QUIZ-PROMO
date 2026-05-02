// Questions santé générées automatiquement.
// Chaque matière possède 5 sujets, et chaque sujet contient 65 questions.
// Formats inclus : QCM, QCD, cas clinique, cas pratique, vrai/faux.
// Le champ answer accepte soit un nombre (réponse unique), soit un tableau (plusieurs réponses).

function normalizeText(value) {
  return (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getSubjectProfile(subjectName) {
  const s = normalizeText(subjectName);

  if (s.includes("imagerie")) {
    return {
      domaine: "imagerie médicale",
      cible: "patient devant bénéficier d’un examen d’imagerie",
      signe: "douleur, suspicion de lésion ou besoin de confirmation diagnostique",
      risque: "irradiation inutile ou erreur d’identification",
      action: "vérifier l’identité, la prescription et préparer le patient",
      urgence: "allergie au produit de contraste, grossesse ou détresse respiratoire",
      outil: "radiographie, échographie, scanner ou IRM selon l’indication",
      education: "expliquer l’examen, rassurer le patient et retirer les objets métalliques si nécessaire",
    };
  }

  if (s.includes("vaccination") || s.includes("injection") || s.includes("hygiene") || s.includes("bios")) {
    return {
      domaine: "hygiène hospitalière et sécurité des soins",
      cible: "patient exposé à un soin invasif ou à une vaccination",
      signe: "risque infectieux, matériel souillé ou rupture d’asepsie",
      risque: "infection associée aux soins ou accident d’exposition au sang",
      action: "respecter l’hygiène des mains, l’asepsie et l’élimination sécurisée des déchets",
      urgence: "piqûre accidentelle, réaction allergique grave ou contamination massive",
      outil: "solution hydroalcoolique, gants, boîte de sécurité et matériel stérile",
      education: "sensibiliser sur le lavage des mains et le respect des mesures barrières",
    };
  }

  if (s.includes("pediatr")) {
    return {
      domaine: "pédiatrie et PCIMNE",
      cible: "nourrisson ou enfant malade",
      signe: "fièvre, diarrhée, toux, refus de téter ou altération de l’état général",
      risque: "déshydratation, convulsion, malnutrition ou détresse respiratoire",
      action: "évaluer les signes de danger, surveiller les constantes et référer si nécessaire",
      urgence: "convulsion, léthargie, incapacité de boire ou respiration difficile",
      outil: "courbe de croissance, SRO, thermomètre et fiche PCIMNE",
      education: "conseiller l’allaitement, l’hygiène, la vaccination et la consultation précoce",
    };
  }

  if (
    s.includes("gyne") || s.includes("obst") || s.includes("sonu") || s.includes("postnat") ||
    s.includes("ventouse") || s.includes("amiu") || s.includes("avortement") ||
    s.includes("sexuelle") || s.includes("familiale") || s.includes("ist") || s.includes("vih")
  ) {
    return {
      domaine: "gynécologie, obstétrique et santé de reproduction",
      cible: "femme enceinte, accouchée ou patiente en santé reproductive",
      signe: "saignement, douleur pelvienne, aménorrhée, fièvre ou tension élevée",
      risque: "hémorragie, pré-éclampsie, infection, avortement compliqué ou souffrance fœtale",
      action: "évaluer l’état maternel, surveiller les constantes et organiser la référence",
      urgence: "hémorragie, convulsion, fièvre élevée, douleur intense ou travail compliqué",
      outil: "partogramme, tensiomètre, test urinaire, carnet de CPN et matériel d’accouchement",
      education: "conseiller la CPN, la planification familiale, les signes de danger et l’observance",
    };
  }

  if (s.includes("chirurgie") || s.includes("neurochirurgie")) {
    return {
      domaine: "soins infirmiers spécialisés en chirurgie",
      cible: "patient en préopératoire ou postopératoire",
      signe: "douleur, plaie, fièvre, saignement ou diminution de la mobilité",
      risque: "infection du site opératoire, hémorragie, choc ou complication anesthésique",
      action: "surveiller la plaie, la douleur, les constantes et l’état de conscience",
      urgence: "saignement abondant, détresse respiratoire ou chute brutale de la tension",
      outil: "pansement stérile, fiche de surveillance, antalgiques prescrits et matériel d’asepsie",
      education: "expliquer les soins de plaie, l’hygiène et les signes d’alerte postopératoires",
    };
  }

  if (
    s.includes("cardiologie") || s.includes("endocrinologie") || s.includes("oncologie") ||
    s.includes("nephrologie") || s.includes("hepato") || s.includes("dermatologie") ||
    s.includes("geriatrie") || s.includes("psychiatrie") || s.includes("neuropsychiatrie") ||
    s.includes("orL".toLowerCase()) || s.includes("ophtalmologie") || s.includes("odonto")
  ) {
    return {
      domaine: "soins infirmiers spécialisés en médecine",
      cible: "patient suivi pour une pathologie médicale",
      signe: "douleur, fièvre, fatigue, dyspnée ou déséquilibre des constantes",
      risque: "décompensation, complication aiguë, mauvaise observance ou aggravation",
      action: "surveiller les constantes, appliquer la prescription et éduquer le patient",
      urgence: "douleur thoracique, dyspnée sévère, trouble de conscience ou choc",
      outil: "tensiomètre, thermomètre, glucomètre, fiche de surveillance et dossier patient",
      education: "expliquer le traitement, les rendez-vous, l’alimentation et les signes d’alerte",
    };
  }

  if (
    s.includes("droit") || s.includes("responsabilite") || s.includes("securite sociale") ||
    s.includes("fonction publique") || s.includes("redaction administrative") ||
    s.includes("gestion hospitaliere") || s.includes("entrepreneuriat") ||
    s.includes("supervision") || s.includes("gouvernance") || s.includes("documents normatifs")
  ) {
    return {
      domaine: "administration, gestion et responsabilité professionnelle",
      cible: "service de santé, équipe soignante ou usager",
      signe: "besoin d’organisation, traçabilité, conformité ou amélioration de la qualité",
      risque: "faute professionnelle, mauvaise coordination, absence de preuve ou conflit",
      action: "respecter les procédures, documenter les actes et communiquer clairement",
      urgence: "incident grave, plainte, rupture de service ou problème de sécurité du patient",
      outil: "registre, rapport, note administrative, protocole et indicateurs de suivi",
      education: "rappeler les droits, devoirs, responsabilités et règles de communication",
    };
  }

  if (s.includes("memoire") || s.includes("document final") || s.includes("projet de soins")) {
    return {
      domaine: "méthodologie, mémoire et projet de soins infirmiers",
      cible: "étudiant ou équipe réalisant une étude ou un projet de soins",
      signe: "problème de soins, besoin de recherche ou situation à améliorer",
      risque: "objectif flou, données mal recueillies, biais ou projet non évalué",
      action: "définir le problème, fixer les objectifs, collecter les données et évaluer les résultats",
      urgence: "erreur méthodologique majeure ou non-respect de l’éthique",
      outil: "questionnaire, grille d’observation, plan de rédaction et indicateurs d’évaluation",
      education: "expliquer la méthode, la confidentialité et l’importance des données fiables",
    };
  }

  if (s.includes("stage")) {
    return {
      domaine: "stage clinique et communautaire",
      cible: "stagiaire en situation de soins",
      signe: "besoin d’apprentissage, d’encadrement ou de rapport de stage",
      risque: "geste non maîtrisé, défaut de supervision ou erreur de transmission",
      action: "respecter le champ de compétence, demander supervision et tracer les soins",
      urgence: "situation dépassant les compétences du stagiaire ou risque pour le patient",
      outil: "carnet de stage, objectifs, fiche de soins, rapport et grille d’évaluation",
      education: "développer l’esprit professionnel, l’éthique et la communication avec l’équipe",
    };
  }

  return {
    domaine: "santé publique et soins infirmiers",
    cible: "patient, famille ou communauté",
    signe: "problème de santé, besoin de prévention ou demande de soins",
    risque: "complication, transmission de maladie ou retard de prise en charge",
    action: "évaluer la situation, prioriser les soins et référer si nécessaire",
    urgence: "détresse vitale, altération de l’état général ou signe de danger",
    outil: "fiche de surveillance, protocole, matériel de soins et registre",
    education: "sensibiliser sur la prévention, l’hygiène et le recours précoce aux soins",
  };
}

function q(question, options, answer, explanation) {
  return { question, options, answer, explanation };
}

function q(question, options, answer, explanation) {
  return { question, options, answer, explanation };
}

function buildQuestionSet(subjectName, topicName) {
  const p = getSubjectProfile(subjectName);
  const label = `${subjectName} — ${topicName}`;
  const questions = [];

  const qcmStems = [
    ["les objectifs prioritaires", ["Prévenir les complications", "Négliger la traçabilité", "Assurer une prise en charge correcte", "Retarder la référence"], [0, 2], "Les objectifs prioritaires sont la prévention et la qualité de la prise en charge."],
    ["les éléments de surveillance", ["Constantes vitales", "État général", "Couleur préférée du patient", "Signes de danger"], [0, 1, 3], "La surveillance repose sur les constantes, l’état général et les signes de danger."],
    ["les signes d’alerte", [p.signe, p.urgence, "Absence totale de plainte", "Aggravation brutale"], [0, 1, 3], "Un signe d’alerte impose une évaluation rapide."],
    ["les mesures de sécurité", ["Identifier le patient", "Respecter l’asepsie", "Oublier la prescription", "Tracer l’acte réalisé"], [0, 1, 3], "La sécurité associe identification, asepsie et traçabilité."],
    ["les risques principaux", [p.risque, "Erreur de transmission", "Absence d’éducation", "Repos uniquement"], [0, 1, 2], "Ces risques peuvent aggraver l’état du patient ou la qualité des soins."],
    ["les actions infirmières adaptées", [p.action, "Surveiller l’évolution", "Informer selon le besoin", "Ignorer les plaintes"], [0, 1, 2], "L’infirmier agit par évaluation, surveillance, information et orientation."],
    ["les outils utiles", [p.outil, "Dossier patient", "Protocole du service", "Objet personnel sans lien"], [0, 1, 2], "Les outils professionnels facilitent la qualité et la continuité des soins."],
    ["les éléments d’éducation sanitaire", [p.education, "Expliquer les signes d’alerte", "Encourager l’automédication dangereuse", "Favoriser l’observance"], [0, 1, 3], "L’éducation doit être claire, préventive et sécurisante."],
    ["les principes de communication", ["Écouter activement", "Utiliser un langage simple", "Humilier le patient", "Vérifier la compréhension"], [0, 1, 3], "La communication respecte le patient et confirme la compréhension."],
    ["les règles de traçabilité", ["Noter les actes", "Signer les transmissions", "Modifier les données sans raison", "Mentionner les anomalies"], [0, 1, 3], "La traçabilité doit être fidèle, datée et utile."],
    ["les précautions avant un soin", ["Préparer le matériel", "Informer le patient", "Vérifier la prescription", "Commencer sans hygiène des mains"], [0, 1, 2], "La préparation évite les erreurs et les infections."],
    ["les critères de référence", [p.urgence, "Aggravation malgré les soins", "Signe de danger", "Simple demande non urgente uniquement"], [0, 1, 2], "La référence est indiquée devant un danger ou une aggravation."],
    ["les facteurs de qualité", ["Respect des protocoles", "Travail en équipe", "Évaluation des résultats", "Improvisation permanente"], [0, 1, 2], "La qualité dépend de règles suivies et d’une évaluation régulière."],
    ["les erreurs à éviter", ["Oublier la surveillance", "Administrer sans prescription", "Communiquer les anomalies", "Négliger l’identification"], [0, 1, 3], "Ces erreurs exposent le patient à des complications."],
    ["les responsabilités professionnelles", ["Respecter le secret professionnel", "Agir dans ses compétences", "Tracer les soins", "Diffuser les informations privées"], [0, 1, 2], "Le secret, la compétence et la traçabilité font partie de la responsabilité."],
  ];

  qcmStems.forEach((item, index) => {
    questions.push(q(
      `QCM ${index + 1} (${label}) : Dans le cadre de ${p.domaine}, quels sont ${item[0]} ?`,
      item[1],
      item[2],
      item[3]
    ));
  });

  const qcdStems = [
    ["Quel est le premier réflexe devant une situation inhabituelle ?", ["Évaluer rapidement la situation", "Quitter le poste", "Attendre sans surveiller", "Donner un traitement au hasard"], 0, "La première étape est toujours l’évaluation."],
    ["Quel document permet de garder une preuve des soins ?", ["Le dossier ou registre de soins", "Une note non signée", "Un message oral seulement", "Une photo personnelle"], 0, "La preuve professionnelle repose sur la traçabilité écrite."],
    ["Quelle attitude protège le mieux le patient ?", ["Respecter les protocoles", "Improviser", "Cacher les erreurs", "Éviter les transmissions"], 0, "Les protocoles sécurisent les soins."],
    ["Quelle action est prioritaire devant un signe de danger ?", ["Alerter ou référer selon le protocole", "Rassurer seulement", "Reporter la surveillance", "Ignorer le signe"], 0, "Le signe de danger impose une réaction rapide."],
    ["Quel élément doit être vérifié avant un acte ?", ["L’identité du patient", "La météo", "La couleur du mur", "Le nom d’un voisin"], 0, "L’identification évite les erreurs de patient."],
    ["Quel comportement respecte l’éthique ?", ["Préserver la confidentialité", "Divulguer le diagnostic", "Se moquer du patient", "Refuser toute explication"], 0, "La confidentialité est une obligation."],
    ["Quelle donnée est une constante vitale ?", ["La tension artérielle", "Le niveau d’étude", "La profession du voisin", "La marque du téléphone"], 0, "La tension artérielle fait partie des constantes surveillées."],
    ["Quelle mesure réduit le risque infectieux ?", ["Hygiène des mains", "Réutilisation du matériel souillé", "Absence de nettoyage", "Non-port des gants quand ils sont indiqués"], 0, "L’hygiène des mains est essentielle."],
    ["Quelle action favorise l’observance ?", ["Expliquer clairement le traitement", "Donner des informations contradictoires", "Menacer le patient", "Ne rien expliquer"], 0, "L’explication claire aide le patient à suivre les consignes."],
    ["Quel élément montre une aggravation ?", ["Altération de l’état général", "Amélioration de l’appétit", "Disparition de la douleur", "Constantes normales"], 0, "L’altération de l’état général est un signe d’alerte."],
    ["Quelle attitude convient au stagiaire ?", ["Demander supervision en cas de doute", "Faire seul un acte non maîtrisé", "Cacher une erreur", "Signer à la place d’un autre"], 0, "Le stagiaire doit respecter ses limites."],
    ["Quelle action améliore la continuité des soins ?", ["Faire des transmissions claires", "Garder les informations pour soi", "Effacer les notes", "Changer la prescription"], 0, "Les transmissions assurent la continuité."],
    ["Quel principe guide la priorisation ?", ["Traiter d’abord l’urgence", "Suivre l’ordre d’arrivée uniquement", "Choisir au hasard", "Attendre la fin du service"], 0, "La gravité détermine la priorité."],
    ["Quel signe justifie une surveillance rapprochée ?", [p.signe, "Patient stable sans plainte", "Demande administrative simple", "Résultat normal"], 0, "Le signe clinique impose une surveillance."],
    ["Quel est le bon moyen d’éduquer le patient ?", ["Utiliser des mots simples", "Employer uniquement des termes complexes", "Refuser les questions", "Parler sans vérifier la compréhension"], 0, "Le langage simple facilite la compréhension."],
  ];

  qcdStems.forEach((item, index) => {
    questions.push(q(
      `QCD ${index + 16} (${label}) : ${item[0]}`,
      item[1],
      item[2],
      item[3]
    ));
  });

  const clinicalCases = [
    [`Cas clinique ${31} (${label}) : Un ${p.cible} présente ${p.signe}. Quelle est la conduite initiale ?`, ["Évaluer les constantes et rechercher les signes de danger", "Attendre sans examen", "Administrer un médicament non prescrit", "Le renvoyer sans conseil"], 0, "L’évaluation clinique oriente la prise en charge."],
    [`Cas clinique ${32} (${label}) : La situation évoque ${p.risque}. Quelle complication faut-il prévenir ?`, [p.risque, "Un simple inconfort sans conséquence", "Une amélioration spontanée certaine", "Une absence de risque"], 0, "Le risque principal doit être identifié tôt."],
    [`Cas clinique ${33} (${label}) : Après un soin, le patient se plaint d’une aggravation brutale. Que faire ?`, ["Alerter, surveiller et préparer la référence si nécessaire", "Cacher l’information", "Laisser le patient seul", "Arrêter toute surveillance"], 0, "L’aggravation impose une alerte et une surveillance."],
    [`Cas clinique ${34} (${label}) : Le dossier ne comporte pas les constantes récentes. Quelle action est correcte ?`, ["Reprendre les constantes et les noter", "Inventer des chiffres", "Laisser vide définitivement", "Effacer l’observation"], 0, "Les données doivent être réelles, récentes et tracées."],
    [`Cas clinique ${35} (${label}) : Le patient ne comprend pas les consignes. Quelle réponse est adaptée ?`, ["Réexpliquer simplement et vérifier la compréhension", "Le blâmer", "Parler plus vite", "Ne plus répondre"], 0, "L’éducation doit être adaptée au niveau de compréhension."],
    [`Cas clinique ${36} (${label}) : Un signe de danger apparaît : ${p.urgence}. Quelle décision est prioritaire ?`, ["Organiser une prise en charge urgente", "Reporter au lendemain", "Donner seulement de l’eau", "Ignorer car le patient parle encore"], 0, "Un signe de danger nécessite une action urgente."],
    [`Cas clinique ${37} (${label}) : Le matériel utile n’est pas prêt. Que doit faire l’infirmier ?`, ["Préparer le matériel avant le soin", "Commencer malgré tout", "Utiliser du matériel inconnu", "Demander au patient de chercher le matériel"], 0, "La préparation du matériel sécurise le soin."],
    [`Cas clinique ${38} (${label}) : Une erreur de transmission est constatée. Quelle conduite tenir ?`, ["Corriger officiellement et informer l’équipe", "Cacher l’erreur", "Accuser le patient", "Supprimer tout le dossier"], 0, "La correction doit être transparente et tracée."],
    [`Cas clinique ${39} (${label}) : Le patient refuse un soin par peur. Quelle attitude adopter ?`, ["Écouter, expliquer et respecter la décision selon les règles", "Forcer immédiatement", "Se moquer de lui", "Ne rien expliquer"], 0, "Le consentement et l’information sont essentiels."],
    [`Cas clinique ${40} (${label}) : Une famille demande des conseils de prévention. Que répondre ?`, [p.education, "Conseiller l’automédication systématique", "Dire qu’aucune prévention n’existe", "Éviter toute explication"], 0, "La prévention repose sur des conseils adaptés."],
  ];

  clinicalCases.forEach((item) => questions.push(q(item[0], item[1], item[2], item[3])));

  const practicalCases = [
    [`Cas pratique ${41} (${label}) : Tu dois organiser une activité liée à ${p.domaine}. Quelle étape vient d’abord ?`, ["Identifier le problème et fixer les objectifs", "Commencer sans plan", "Éviter l’équipe", "Ne pas évaluer"], 0, "Toute activité commence par l’identification du besoin."],
    [`Cas pratique ${42} (${label}) : Tu accueilles ${p.cible}. Quelle action améliore la qualité ?`, ["Accueil, identification et explication du soin", "Accueil brusque", "Aucune présentation", "Absence d’écoute"], 0, "Un bon accueil favorise la confiance."],
    [`Cas pratique ${43} (${label}) : Tu observes ${p.signe}. Quelle information dois-tu transmettre ?`, ["Les signes observés, les constantes et les actions faites", "Seulement ton opinion", "Rien si le service est chargé", "Des informations inventées"], 0, "La transmission doit être précise et utile."],
    [`Cas pratique ${44} (${label}) : Tu dois prévenir ${p.risque}. Quelle stratégie est correcte ?`, [p.action, "Supprimer la surveillance", "Refuser l’éducation", "Changer seul la prescription"], 0, "La prévention passe par des actions professionnelles adaptées."],
    [`Cas pratique ${45} (${label}) : Tu prépares le matériel. Quel élément est indispensable ?`, [p.outil, "Matériel souillé", "Matériel périmé", "Matériel non identifié"], 0, "Le matériel doit être adapté et sécurisé."],
    [`Cas pratique ${46} (${label}) : Une situation dépasse tes compétences. Que faire ?`, ["Alerter le responsable et référer", "Faire semblant de maîtriser", "Cacher le problème", "Abandonner le patient"], 0, "Il faut reconnaître ses limites professionnelles."],
    [`Cas pratique ${47} (${label}) : Tu dois faire une sensibilisation. Quel message est pertinent ?`, [p.education, "Éviter la consultation", "Arrêter les traitements sans avis", "Ignorer les signes d’alerte"], 0, "La sensibilisation doit protéger la santé."],
    [`Cas pratique ${48} (${label}) : Tu constates une rupture d’asepsie. Quelle conduite adopter ?`, ["Arrêter le geste, corriger et reprendre proprement", "Continuer comme si de rien n’était", "Utiliser le même matériel", "Cacher la rupture"], 0, "Une rupture d’asepsie doit être corrigée immédiatement."],
    [`Cas pratique ${49} (${label}) : Tu évalues les résultats d’une activité. Que dois-tu utiliser ?`, ["Des indicateurs et des données fiables", "Des rumeurs", "Des impressions seulement", "Aucune donnée"], 0, "L’évaluation repose sur des indicateurs."],
    [`Cas pratique ${50} (${label}) : À la fin de la prise en charge, quelle action est nécessaire ?`, ["Donner les conseils, noter les soins et programmer le suivi", "Ne rien écrire", "Ne donner aucun conseil", "Interrompre le suivi"], 0, "La clôture correcte inclut conseil, traçabilité et suivi."],
  ];

  practicalCases.forEach((item) => questions.push(q(item[0], item[1], item[2], item[3])));

  const trueFalseQuestions = [
    [`Vrai/Faux 51 (${label}) : ${p.action} fait partie d’une conduite professionnelle correcte.`, ["Vrai", "Faux"], 0, "Cette action améliore la sécurité et la qualité des soins."],
    [`Vrai/Faux 52 (${label}) : Il faut toujours vérifier l’identité du patient avant un soin.`, ["Vrai", "Faux"], 0, "L’identification évite les erreurs de patient et sécurise le soin."],
    [`Vrai/Faux 53 (${label}) : La traçabilité des actes n’est pas nécessaire si le soin a été bien réalisé.`, ["Vrai", "Faux"], 1, "Tout soin doit être noté pour assurer le suivi et la responsabilité professionnelle."],
    [`Vrai/Faux 54 (${label}) : ${p.risque} peut être prévenu par une bonne surveillance et des mesures adaptées.`, ["Vrai", "Faux"], 0, "La surveillance et la prévention réduisent les complications."],
    [`Vrai/Faux 55 (${label}) : En cas de signe de danger, il faut attendre plusieurs jours avant d’agir.`, ["Vrai", "Faux"], 1, "Un signe de danger impose une réaction rapide et une référence si besoin."],
    [`Vrai/Faux 56 (${label}) : L’éducation du patient ou de la famille aide à prévenir les complications.`, ["Vrai", "Faux"], 0, "L’éducation favorise l’observance, la prévention et le recours précoce aux soins."],
    [`Vrai/Faux 57 (${label}) : ${p.outil} peut être utile dans la prise en charge.`, ["Vrai", "Faux"], 0, "Le matériel ou l’outil adapté facilite une prise en charge correcte."],
    [`Vrai/Faux 58 (${label}) : L’infirmier peut changer une prescription médicale sans raison ni autorisation.`, ["Vrai", "Faux"], 1, "La prescription doit être respectée ; toute modification doit suivre les règles du service."],
    [`Vrai/Faux 59 (${label}) : Une communication claire avec l’équipe améliore la continuité des soins.`, ["Vrai", "Faux"], 0, "Les transmissions fiables assurent une meilleure continuité des soins."],
    [`Vrai/Faux 60 (${label}) : La confidentialité du patient doit être respectée.`, ["Vrai", "Faux"], 0, "Le secret professionnel protège les informations du patient."],
    [`Vrai/Faux 61 (${label}) : Si une situation dépasse tes compétences, tu dois alerter un responsable.`, ["Vrai", "Faux"], 0, "Reconnaître ses limites protège le patient et le soignant."],
    [`Vrai/Faux 62 (${label}) : L’hygiène des mains est inutile lorsque les mains semblent propres.`, ["Vrai", "Faux"], 1, "L’hygiène des mains reste indispensable avant et après les soins."],
    [`Vrai/Faux 63 (${label}) : Un patient a le droit de recevoir des explications simples sur son soin.`, ["Vrai", "Faux"], 0, "L’information claire favorise le consentement et la confiance."],
    [`Vrai/Faux 64 (${label}) : Il est acceptable d’inventer des constantes si le service est chargé.`, ["Vrai", "Faux"], 1, "Les constantes doivent être réelles et correctement notées."],
    [`Vrai/Faux 65 (${label}) : Le suivi après la prise en charge permet de vérifier l’évolution du patient.`, ["Vrai", "Faux"], 0, "Le suivi permet d’évaluer les résultats et d’adapter la prise en charge."],
  ];

  trueFalseQuestions.forEach((item) => questions.push(q(item[0], item[1], item[2], item[3])));

  return questions;
}

const QUIZ_QUESTIONS_BY_SUBJECT_AND_TOPIC = {};

SUBJECTS_CONFIG.forEach((subject) => {
  QUIZ_QUESTIONS_BY_SUBJECT_AND_TOPIC[subject.subjectName] = {};
  subject.topics.forEach((topic) => {
    QUIZ_QUESTIONS_BY_SUBJECT_AND_TOPIC[subject.subjectName][topic] = buildQuestionSet(
      subject.subjectName,
      topic
    );
  });
});
