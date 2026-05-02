// ============================================================
// ZONE A MODIFIER MANUELLEMENT
// Ajoute/supprime les codes d'acces autorises dans cet objet.
// Format conseille: "24A001"
// ============================================================
const ALLOWED_ACCESS_CODES = {
  "21": "Alice Dupont",
  "24A002": "l'Etudiant(e)",
  "24": "Claire Rousseau",
  
};

const ALLOWED_MATRICULES = Object.keys(ALLOWED_ACCESS_CODES);
