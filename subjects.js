const SUBJECTS_TO_DISPLAY = [
  "Imagerie médicale",
  "Documents normatifs",
  "Gestion des catastrophes",
  "Gouvernance et Organisation du Système de Santé Communautaire",
  "Organisation d’une séance de Vaccination / Sécurité des injections",
  "Santé sexuelle et reproductive des adolescents et des jeunes / Planification Familiale / IST / VIH-SIDA",
  "Violences Basées sur Genre / Encadrement (Egalité - Equité)",
  "Hygiène menstruelle",
  "Prise en charge des substances psychoactives",
  "Oncologie",
  "Neuropsychiatrie / Psychiatrie",
  "Endocrinologie",
  "Hépato-gastro-entérologie",
  "Cardiologie",
  "Dermatologie",
  "Néphrologie",
  "Odonto-Stomatologie",
  "Ophtalmologie",
  "Neurochirurgie",
  "ORL",
  "Pédiatrie (PCIMNE)",
  "Gériatrie",
  "Pathologies gynécologiques III",
  "Pathologies obstétricales III",
  "Soins obstétricaux et néonataux d’urgence de base (SONUB)",
  "Soins obstétricaux et néonataux d’urgence complets (SONUC)",
  "Soins infirmiers obstétricaux et néonataux",
  "Consultation Postnatale (CPoN)",
  "Ventouse obstétricale",
  "Aspiration Manuelle Intra-Utérine (AMIU) / Soins Post Avortement",
  "Surveillances thérapeutiques",
  "Élaboration d’un projet de soins infirmiers",
  "Mise en œuvre et évaluation d’un projet de soins infirmiers",
  "Soins infirmiers spécialisés en médecine",
  "Soins infirmiers spécialisés en chirurgie",
  "Soins palliatifs",
  "Présentation de cas cliniques",
  "Droit administratif / Responsabilité médicale",
  "Sécurité sociale",
  "Fonction publique",
  "Rédaction administrative",
  "Gestion Hospitalière",
  "Entrepreneuriat / Gestion de la qualité",
  "Supervision / Suivi – Evaluation",
  "Rédaction du document final (Mémoire)",
  "Processus de mise en stage",
  "Stage en soins infirmiers et obstétricaux + Rapport",
  "Stage communautaire + Rapport"
];

const SUBJECTS_CONFIG = [
  {
    subjectName: "Imagerie médicale",
    topics: [
          "Radiographie conventionnelle",
          "Échographie",
          "Scanner et produit de contraste",
          "IRM et sécurité",
          "Préparation et surveillance du patient"
    ],
  },
  {
    subjectName: "Documents normatifs",
    topics: [
          "Protocoles de soins",
          "Registres et traçabilité",
          "Normes d’hygiène",
          "Procédures administratives",
          "Archivage et confidentialité"
    ],
  },
  {
    subjectName: "Gestion des catastrophes",
    topics: [
          "Plan de préparation",
          "Triage des victimes",
          "Organisation des secours",
          "Communication de crise",
          "Surveillance post-catastrophe"
    ],
  },
  {
    subjectName: "Gouvernance et Organisation du Système de Santé Communautaire",
    topics: [
          "Organisation du système de santé",
          "Participation communautaire",
          "Diagnostic communautaire",
          "Planification des activités",
          "Suivi-évaluation communautaire"
    ],
  },
  {
    subjectName: "Organisation d’une séance de Vaccination / Sécurité des injections",
    topics: [
          "Planification d’une séance vaccinale",
          "Chaîne du froid",
          "Administration des vaccins",
          "Gestion des MAPI",
          "Sécurité des injections et déchets"
    ],
  },
  {
    subjectName: "Santé sexuelle et reproductive des adolescents et des jeunes / Planification Familiale / IST / VIH-SIDA",
    topics: [
          "Adolescents et santé sexuelle",
          "Méthodes contraceptives",
          "Conseil en planification familiale",
          "Prévention IST/VIH",
          "Prise en charge syndromique des IST"
    ],
  },
  {
    subjectName: "Violences Basées sur Genre / Encadrement (Egalité - Equité)",
    topics: [
          "Définition et formes de VBG",
          "Accueil et écoute de la victime",
          "Référence médico-légale",
          "Prévention communautaire",
          "Égalité, équité et droits"
    ],
  },
  {
    subjectName: "Hygiène menstruelle",
    topics: [
          "Physiologie du cycle menstruel",
          "Gestion de l’hygiène menstruelle",
          "Prévention des infections",
          "Éducation des adolescentes",
          "Mythes et tabous menstruels"
    ],
  },
  {
    subjectName: "Prise en charge des substances psychoactives",
    topics: [
          "Types de substances psychoactives",
          "Dépistage et signes d’alerte",
          "Sevrage et complications",
          "Conseil et accompagnement",
          "Prévention en milieu scolaire"
    ],
  },
  {
    subjectName: "Oncologie",
    topics: [
          "Signes d’alerte du cancer",
          "Dépistage et prévention",
          "Chimiothérapie et surveillance",
          "Douleur cancéreuse",
          "Soins palliatifs en oncologie"
    ],
  },
  {
    subjectName: "Neuropsychiatrie / Psychiatrie",
    topics: [
          "Troubles anxieux et dépressifs",
          "Psychoses et agitation",
          "Entretien psychiatrique",
          "Observance thérapeutique",
          "Urgences psychiatriques"
    ],
  },
  {
    subjectName: "Endocrinologie",
    topics: [
          "Diabète sucré",
          "Hypoglycémie et hyperglycémie",
          "Goitre et pathologies thyroïdiennes",
          "Éducation du patient diabétique",
          "Surveillance endocrinienne"
    ],
  },
  {
    subjectName: "Hépato-gastro-entérologie",
    topics: [
          "Douleurs abdominales",
          "Hépatites virales",
          "Diarrhée et déshydratation",
          "Ulcère gastro-duodénal",
          "Endoscopie digestive"
    ],
  },
  {
    subjectName: "Cardiologie",
    topics: [
          "Hypertension artérielle",
          "Insuffisance cardiaque",
          "Douleur thoracique",
          "Surveillance du pouls et TA",
          "Éducation cardio-vasculaire"
    ],
  },
  {
    subjectName: "Dermatologie",
    topics: [
          "Lésions cutanées élémentaires",
          "Plaies et pansements",
          "Infections cutanées",
          "Brûlures",
          "Prévention des escarres"
    ],
  },
  {
    subjectName: "Néphrologie",
    topics: [
          "Insuffisance rénale",
          "Surveillance de la diurèse",
          "Œdèmes et HTA rénale",
          "Dialyse",
          "Éducation néphrologique"
    ],
  },
  {
    subjectName: "Odonto-Stomatologie",
    topics: [
          "Hygiène bucco-dentaire",
          "Douleurs dentaires",
          "Infections buccales",
          "Soins après extraction",
          "Prévention caries"
    ],
  },
  {
    subjectName: "Ophtalmologie",
    topics: [
          "Baisse de l’acuité visuelle",
          "Conjonctivite",
          "Traumatisme oculaire",
          "Soins pré/post opératoires",
          "Prévention cécité"
    ],
  },
  {
    subjectName: "Neurochirurgie",
    topics: [
          "Traumatisme crânien",
          "Surveillance neurologique",
          "Hypertension intracrânienne",
          "Soins postopératoires neurochirurgie",
          "Prévention complications neurologiques"
    ],
  },
  {
    subjectName: "ORL",
    topics: [
          "Otite et otalgie",
          "Angine et pharyngite",
          "Épistaxis",
          "Corps étranger ORL",
          "Prévention troubles auditifs"
    ],
  },
  {
    subjectName: "Pédiatrie (PCIMNE)",
    topics: [
          "Signes généraux de danger",
          "Toux ou difficulté respiratoire",
          "Diarrhée et déshydratation",
          "Fièvre et paludisme chez l’enfant",
          "Nutrition et croissance"
    ],
  },
  {
    subjectName: "Gériatrie",
    topics: [
          "Vieillissement physiologique",
          "Chutes chez la personne âgée",
          "Dépendance et autonomie",
          "Polymédication",
          "Prévention escarres et dénutrition"
    ],
  },
  {
    subjectName: "Pathologies gynécologiques III",
    topics: [
          "Fibrome utérin",
          "Infections génitales",
          "Cancer du col",
          "Troubles du cycle",
          "Douleurs pelviennes"
    ],
  },
  {
    subjectName: "Pathologies obstétricales III",
    topics: [
          "Hémorragies obstétricales",
          "Pré-éclampsie et éclampsie",
          "Menace d’accouchement prématuré",
          "Rupture prématurée des membranes",
          "Souffrance fœtale"
    ],
  },
  {
    subjectName: "Soins obstétricaux et néonataux d’urgence de base (SONUB)",
    topics: [
          "Accouchement normal",
          "Hémorragie du post-partum",
          "Réanimation du nouveau-né",
          "Référence obstétricale",
          "Surveillance du post-partum immédiat"
    ],
  },
  {
    subjectName: "Soins obstétricaux et néonataux d’urgence complets (SONUC)",
    topics: [
          "Césarienne et surveillance",
          "Transfusion obstétricale",
          "Complications sévères",
          "Anesthésie obstétricale",
          "Organisation de la référence SONUC"
    ],
  },
  {
    subjectName: "Soins infirmiers obstétricaux et néonataux",
    topics: [
          "Accueil de la parturiente",
          "Surveillance du travail",
          "Soins du nouveau-né",
          "Allaitement précoce",
          "Conseils de sortie"
    ],
  },
  {
    subjectName: "Consultation Postnatale (CPoN)",
    topics: [
          "Surveillance de la mère",
          "Surveillance du nouveau-né",
          "Conseils d’allaitement",
          "Planification familiale post-partum",
          "Signes de danger postnataux"
    ],
  },
  {
    subjectName: "Ventouse obstétricale",
    topics: [
          "Indications de la ventouse",
          "Conditions d’application",
          "Surveillance maternelle",
          "Surveillance néonatale",
          "Complications de la ventouse"
    ],
  },
  {
    subjectName: "Aspiration Manuelle Intra-Utérine (AMIU) / Soins Post Avortement",
    topics: [
          "Indications AMIU",
          "Préparation de la patiente",
          "Technique et asepsie",
          "Surveillance après AMIU",
          "Conseil post-avortement"
    ],
  },
  {
    subjectName: "Surveillances thérapeutiques",
    topics: [
          "Surveillance des constantes",
          "Effets secondaires médicaments",
          "Observance thérapeutique",
          "Surveillance biologique",
          "Éducation du patient"
    ],
  },
  {
    subjectName: "Élaboration d’un projet de soins infirmiers",
    topics: [
          "Collecte des données",
          "Diagnostic infirmier",
          "Objectifs de soins",
          "Planification des interventions",
          "Critères d’évaluation"
    ],
  },
  {
    subjectName: "Mise en œuvre et évaluation d’un projet de soins infirmiers",
    topics: [
          "Exécution des soins",
          "Coordination de l’équipe",
          "Indicateurs d’évaluation",
          "Réajustement du projet",
          "Traçabilité du projet"
    ],
  },
  {
    subjectName: "Soins infirmiers spécialisés en médecine",
    topics: [
          "Accueil du patient médical",
          "Surveillance clinique",
          "Administration des traitements",
          "Éducation thérapeutique",
          "Prévention des complications"
    ],
  },
  {
    subjectName: "Soins infirmiers spécialisés en chirurgie",
    topics: [
          "Préparation préopératoire",
          "Surveillance postopératoire",
          "Pansements et plaies",
          "Douleur postopératoire",
          "Prévention infections et thrombose"
    ],
  },
  {
    subjectName: "Soins palliatifs",
    topics: [
          "Douleur et confort",
          "Communication avec la famille",
          "Soins de fin de vie",
          "Soutien psychologique",
          "Éthique en soins palliatifs"
    ],
  },
  {
    subjectName: "Présentation de cas cliniques",
    topics: [
          "Choix du cas",
          "Recueil des données",
          "Analyse clinique",
          "Plan de soins",
          "Présentation orale"
    ],
  },
  {
    subjectName: "Droit administratif / Responsabilité médicale",
    topics: [
          "Secret professionnel",
          "Responsabilité infirmière",
          "Consentement aux soins",
          "Faute professionnelle",
          "Droits du patient"
    ],
  },
  {
    subjectName: "Sécurité sociale",
    topics: [
          "Principes de sécurité sociale",
          "Affiliation et cotisation",
          "Prestations sociales",
          "Accident du travail",
          "Protection maladie"
    ],
  },
  {
    subjectName: "Fonction publique",
    topics: [
          "Statut du fonctionnaire",
          "Droits et devoirs",
          "Discipline administrative",
          "Avancement et carrière",
          "Congés et permissions"
    ],
  },
  {
    subjectName: "Rédaction administrative",
    topics: [
          "Lettre administrative",
          "Compte rendu",
          "Rapport",
          "Note de service",
          "Procès-verbal"
    ],
  },
  {
    subjectName: "Gestion Hospitalière",
    topics: [
          "Organisation d’un service",
          "Gestion du personnel",
          "Gestion du matériel",
          "Qualité des soins",
          "Tableau de bord hospitalier"
    ],
  },
  {
    subjectName: "Entrepreneuriat / Gestion de la qualité",
    topics: [
          "Idée de projet",
          "Étude de marché",
          "Plan d’affaires",
          "Démarche qualité",
          "Satisfaction des usagers"
    ],
  },
  {
    subjectName: "Supervision / Suivi – Evaluation",
    topics: [
          "Préparation d’une supervision",
          "Outils de suivi",
          "Indicateurs",
          "Analyse des résultats",
          "Plan d’amélioration"
    ],
  },
  {
    subjectName: "Rédaction du document final (Mémoire)",
    topics: [
          "Introduction du mémoire",
          "Problématique",
          "Méthodologie",
          "Résultats et discussion",
          "Conclusion et recommandations"
    ],
  },
  {
    subjectName: "Processus de mise en stage",
    topics: [
          "Objectifs de stage",
          "Choix du terrain",
          "Convention et autorisation",
          "Encadrement du stagiaire",
          "Évaluation du stage"
    ],
  },
  {
    subjectName: "Stage en soins infirmiers et obstétricaux + Rapport",
    topics: [
          "Activités cliniques",
          "Soins infirmiers réalisés",
          "Soins obstétricaux réalisés",
          "Difficultés rencontrées",
          "Rédaction du rapport"
    ],
  },
  {
    subjectName: "Stage communautaire + Rapport",
    topics: [
          "Diagnostic communautaire",
          "Sensibilisation",
          "Visite à domicile",
          "Collecte de données communautaires",
          "Rapport communautaire"
    ],
  },
];
