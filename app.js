const submitAnswersBtn = document.getElementById("submit-answers-btn");
const restartBtn = document.getElementById("restart-btn");
const showCorrectionBtn = document.getElementById("show-correction-btn");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const homeBtn = document.getElementById("home-btn");
const backSubjectsBtn = document.getElementById("back-subjects-btn");
const backLeaderboardBtn = document.getElementById("back-leaderboard-btn");
const backSpaceBtn = document.getElementById("back-space-btn");
const userNameDisplay = document.getElementById("user-name-display");
const quizUserName = document.getElementById("quiz-user-name");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const questionCount = document.getElementById("question-count");
const scoreLive = document.getElementById("score-live");
const timerDisplay = document.getElementById("timer-display");
const finalMessage = document.getElementById("final-message");
const reviewList = document.getElementById("review-list");
const leaderboardList = document.getElementById("leaderboard-list");
const subjectsCard = document.getElementById("subjects-card");
const subjectChoiceSelect = document.getElementById("subject-choice");
const topicChoiceSelect = document.getElementById("topic-choice");
const subjectMessage = document.getElementById("subject-message");
const selectedQuestionCount = document.getElementById("selected-question-count");
const beginQuizBtn = document.getElementById("begin-quiz-btn");
const generalQuizBtn = document.getElementById("general-quiz-btn");
const preparationDeBtn = document.getElementById("preparation-de-btn");
const loginNameInput = document.getElementById("login-name");
const authMessage = document.getElementById("auth-message");
const sessionLabel = document.getElementById("session-label");
const studentHistoryList = document.getElementById("student-history-list");

const authCard = document.getElementById("auth-card");
const quizCard = document.getElementById("quiz-card");
const resultCard = document.getElementById("result-card");
const leaderboardCard = document.getElementById("leaderboard-card");
const studentSpaceCard = document.getElementById("student-space-card");

const USERS_KEY = "quizPromoUsers";
const SESSION_KEY = "quizPromoSession";
const LEADERBOARD_KEY = "quizPromoLeaderboard";

let currentQuestions = [];
let score = 0;
let currentUser = "";
let currentUserName = "";
let selectedMode = "";
let selectedSubjectName = "";
let selectedTopicName = "";
let userAnswers = [];
const answersReview = [];
let quizSubmitted = false;
let autoSubmitLocked = false;
let lastAutoSubmitReason = "";
let quizTimerInterval = null;
let quizTimeRemaining = 60 * 60;


function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function cleanQuestionText(text) {
  return String(text || "")
    .replace(/^(QCM|QCD|Cas clinique|Cas pratique|Vrai\/Faux)\s*\d*\s*/i, "")
    .replace(/\([^)]*\)\s*:?\s*/, "")
    .replace(/^[:：]\s*/, "")
    .trim();
}

function updateTimerDisplay() {
  if (!timerDisplay) return;
  timerDisplay.textContent = `Temps restant: ${formatTime(quizTimeRemaining)}`;
}

function stopQuizTimer() {
  if (quizTimerInterval) {
    clearInterval(quizTimerInterval);
    quizTimerInterval = null;
  }
}

function startQuizTimer() {
  stopQuizTimer();
  quizTimeRemaining = 60 * 60;
  updateTimerDisplay();

  quizTimerInterval = setInterval(() => {
    quizTimeRemaining -= 1;
    updateTimerDisplay();

    if (quizTimeRemaining <= 0) {
      stopQuizTimer();
      autoSubmitQuiz("temps de 60 minutes depassé");
    }
  }, 1000);
}

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
}

function setUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSession(name) {
  localStorage.setItem(SESSION_KEY, name);
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function setAuthMessage(message, isError = false) {
  authMessage.textContent = message;
  authMessage.style.color = isError ? "#dc2626" : "#16a34a";
}


function setSubjectMessage(message, isError = false) {
  subjectMessage.textContent = message;
  subjectMessage.style.color = isError ? "#dc2626" : "#16a34a";
}



function resetSubjectSelection() {
  selectedMode = "";
  selectedSubjectName = "";
  selectedTopicName = "";
  subjectChoiceSelect.innerHTML = "";
  topicChoiceSelect.innerHTML = "";
  setSubjectMessage("");
  beginQuizBtn.classList.add("hidden");
  updateBeginQuizButtonState();
  subjectChoiceSelect.disabled = true;
  topicChoiceSelect.disabled = true;
}

function updateBeginQuizButtonState() {
  const shouldShow = selectedMode && selectedSubjectName && selectedTopicName;
  beginQuizBtn.disabled = !shouldShow;
  beginQuizBtn.classList.toggle("hidden", !shouldShow);
}

function createPlaceholderOption(text) {
  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = text;
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  return placeholderOption;
}

function populateSubjectSelect(subjects, placeholderText, mode) {
  resetSubjectSelection();
  selectedMode = mode;
  subjectChoiceSelect.disabled = false;

  const placeholderOption = createPlaceholderOption(placeholderText);
  subjectChoiceSelect.appendChild(placeholderOption);

  subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject.subjectName;
    option.textContent = subject.displayName || subject.subjectName;
    subjectChoiceSelect.appendChild(option);
  });

  selectedSubjectName = "";
  selectedTopicName = "";
  renderTopicsForSelectedSubject("");
}



function showStudentArea(name) {
  currentUser = name;
  currentUserName = ALLOWED_ACCESS_CODES[name] || name;
  sessionLabel.textContent = `Code d'acces: ${name}`;
  userNameDisplay.textContent = `👤 ${currentUserName}`;

  authCard.classList.add("hidden");
  subjectsCard.classList.remove("hidden");
  studentSpaceCard.classList.add("hidden");
  resultCard.classList.add("hidden");
  quizCard.classList.add("hidden");

  initSubjectSelection();
}

function isAllowedMatricule(matricule) {
  return ALLOWED_MATRICULES.includes(matricule);
}

function ensureAllowedUsers() {
  const users = getUsers();
  let hasChanges = false;

  ALLOWED_MATRICULES.forEach((matricule) => {
    if (!users[matricule]) {
      users[matricule] = { history: [] };
      hasChanges = true;
    }
  });

  if (hasChanges) {
    setUsers(users);
  }
}

function loginStudent() {
  const name = loginNameInput.value.trim().toUpperCase();

  if (!name) {
    setAuthMessage("Renseigne ton code d'acces.", true);
    return;
  }

  if (!isAllowedMatricule(name)) {
    setAuthMessage("Code d'acces non autorise.", true);
    return;
  }

  setSession(name);
  setAuthMessage("Connexion reussie.");
  showStudentArea(name);
}

function logoutStudent() {
  stopQuizTimer();
  clearSession();
  currentUser = "";
  currentUserName = "";
  setAuthMessage("Deconnecte.");
  loginNameInput.value = "";
  subjectsCard.classList.add("hidden");
  quizCard.classList.add("hidden");
  resultCard.classList.add("hidden");
  studentSpaceCard.classList.add("hidden");
  authCard.classList.remove("hidden");
}

function restoreSession() {
  // La session n'est pas restaurée automatiquement
  // L'utilisateur doit toujours entrer son code d'accès en premier
}

function renderTopicsForSelectedSubject(subjectName) {
  topicChoiceSelect.innerHTML = "";
  topicChoiceSelect.disabled = !subjectName;

  const placeholderOption = createPlaceholderOption(
    subjectName ? "Choisis un sujet" : "Choisis une matière d'abord"
  );
  topicChoiceSelect.appendChild(placeholderOption);

  if (subjectName) {
    const subjectConfig = SUBJECTS_CONFIG.find((item) => item.subjectName === subjectName);
    const topics = subjectConfig?.topics || [];

    shuffleArray(topics).forEach((topic) => {
      const option = document.createElement("option");
      option.value = topic;
      option.textContent = topic.replace(/^(Sujet\s*\d+)\s*-\s*.*/i, "$1");
      topicChoiceSelect.appendChild(option);
    });
  }

  selectedTopicName = topicChoiceSelect.value || "";
  updateBeginQuizButtonState();
  updateSelectedQuestionCount();
}

function updateQuizButtonLabel() {
  generalQuizBtn.textContent = "QUIZ";
}

function updateSelectedQuestionCount() {
  if (!selectedSubjectName || !selectedTopicName || !QUIZ_QUESTIONS_BY_SUBJECT_AND_TOPIC) {
    selectedQuestionCount.textContent = "";
    return;
  }

  const count = QUIZ_QUESTIONS_BY_SUBJECT_AND_TOPIC[selectedSubjectName]?.[selectedTopicName]?.length || 0;
  selectedQuestionCount.textContent = count
    ? `Nombre de questions pour ce sujet : ${count}`
    : "Aucune question disponible pour ce sujet.";
}

function applyPreparationDEFilter() {
  const selectedSubjects = PREPARATION_DE_SUBJECTS
    .map((filter) => {
      const subject = SUBJECTS_CONFIG.find((item) => item.subjectName === filter.subjectName);
      return subject ? { ...subject, displayName: filter.label } : null;
    })
    .filter(Boolean);

  const uniqueSubjects = [...new Map(selectedSubjects.map((item) => [item.subjectName, item])).values()];
  populateSubjectSelect(uniqueSubjects, "Choisis une matière", "preparation");
  setSubjectMessage("Mode Préparation DE activé.");
}

function handleGeneralQuizButton() {
  populateSubjectSelect(SUBJECTS_CONFIG, "Choisis une matière", "quiz");
  setSubjectMessage("Mode Quiz activé.");
}

function handlePreparationDeButton() {
  applyPreparationDEFilter();
}

function initSubjectSelection() {
  resetSubjectSelection();
  subjectChoiceSelect.appendChild(createPlaceholderOption("Choisis le mode Quiz ou Préparation DE"));
  topicChoiceSelect.appendChild(createPlaceholderOption("Choisis une matière d'abord"));
}

function startQuiz() {
  if (!currentUser) {
    setAuthMessage("Connecte-toi d'abord pour lancer le quiz.", true);
    return;
  }

  if (!selectedSubjectName) {
    setSubjectMessage("Selectionne une matiere.", true);
    return;
  }

  if (!selectedTopicName) {
    setSubjectMessage("Selectionne un sujet.", true);
    return;
  }

  currentQuestions = shuffleArray(
    QUIZ_QUESTIONS_BY_SUBJECT_AND_TOPIC[selectedSubjectName]?.[selectedTopicName] || []
  );
  if (currentQuestions.length === 0) {
    setSubjectMessage("Aucune question disponible pour ce sujet.", true);
    return;
  }

  score = 0;
  quizSubmitted = false;
  autoSubmitLocked = false;
  lastAutoSubmitReason = "";
  userAnswers = Array(currentQuestions.length).fill(null);
  answersReview.length = 0;
  subjectsCard.classList.add("hidden");
  resultCard.classList.add("hidden");
  quizCard.classList.remove("hidden");
  quizUserName.textContent = `👤 ${currentUserName}`;

  renderAllQuestions();
  startQuizTimer();
}

function renderAllQuestions() {
  questionCount.textContent = `Questions: ${currentQuestions.length}`;
  scoreLive.textContent = "Score: -";
  updateTimerDisplay();
  questionText.textContent = "";
  answersContainer.innerHTML = "";

  currentQuestions.forEach((q, questionIndex) => {
    const wrapper = document.createElement("div");
    wrapper.className = "review-item";
    wrapper.innerHTML = `<strong>${questionIndex + 1}. ${cleanQuestionText(q.question)}</strong>`;

    const expectedAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
    const isMultipleAnswer = expectedAnswers.length > 1;

    q.options.forEach((optionText, optionIndex) => {
      const label = document.createElement("label");
      label.style.display = "block";
      label.style.marginTop = "8px";

      const input = document.createElement("input");
      input.type = isMultipleAnswer ? "checkbox" : "radio";
      input.name = `question-${questionIndex}`;
      input.value = String(optionIndex);
      input.style.width = "auto";
      input.style.marginRight = "8px";
      input.addEventListener("change", () => {
        if (isMultipleAnswer) {
          const selected = Array.from(
            document.querySelectorAll(`input[name="question-${questionIndex}"]:checked`)
          ).map((item) => Number(item.value));
          userAnswers[questionIndex] = selected.length ? selected : null;
        } else {
          userAnswers[questionIndex] = optionIndex;
        }
      });

      label.appendChild(input);
      label.append(optionText);
      wrapper.appendChild(label);
    });

    answersContainer.appendChild(wrapper);
  });
}

function submitAllAnswers() {
  finalizeQuizSubmission({ allowIncomplete: true, reason: "" });
}

function finalizeQuizSubmission({ allowIncomplete = false, reason = "" } = {}) {
  if (quizSubmitted || currentQuestions.length === 0) return;

  if (!allowIncomplete && userAnswers.some((answer) => answer === null)) {
    questionText.textContent = "Reponds a toutes les questions avant de valider.";
    return;
  }

  quizSubmitted = true;
  stopQuizTimer();
  lastAutoSubmitReason = reason;
  let goodAnswers = 0;
  let badAnswers = 0;
  let unanswered = 0;
  answersReview.length = 0;

  currentQuestions.forEach((q, questionIndex) => {
    const chosenAnswer = userAnswers[questionIndex];
    const expectedAnswers = Array.isArray(q.answer) ? [...q.answer].sort((a, b) => a - b) : [q.answer];
    const chosenAnswers = Array.isArray(chosenAnswer)
      ? [...chosenAnswer].sort((a, b) => a - b)
      : chosenAnswer === null
      ? []
      : [chosenAnswer];
    const isCorrect =
      chosenAnswers.length === expectedAnswers.length &&
      chosenAnswers.every((answer, index) => answer === expectedAnswers[index]);
    
    if (isCorrect) {
      goodAnswers += 1;
    } else if (chosenAnswer === null) {
      unanswered += 1;
    } else {
      badAnswers += 1;
    }

    answersReview.push({
      question: cleanQuestionText(q.question),
      isCorrect,
      explanation: q.explanation,
      goodAnswer: expectedAnswers.map((answerIndex) => q.options[answerIndex]).join(" / "),
      userAnswer: chosenAnswers.length === 0
        ? "Non repondu"
        : chosenAnswers.map((answerIndex) => q.options[answerIndex]).join(" / "),
    });
  });

  // Calcul du score: (bonnes reponses - mauvaises reponses) * 20 / total
  const total = currentQuestions.length;
  score = Math.max(0, Math.round(((goodAnswers - badAnswers) * 20) / total));

  showResults(reason, goodAnswers, badAnswers, unanswered, total);
}

function autoSubmitQuiz(reason) {
  const quizIsOpen =
    currentUser &&
    currentQuestions.length > 0 &&
    !quizSubmitted &&
    !quizCard.classList.contains("hidden");

  if (!quizIsOpen || autoSubmitLocked) return;

  autoSubmitLocked = true;
  finalizeQuizSubmission({ allowIncomplete: true, reason });
}

function showResults(reason = "", goodAnswers = 0, badAnswers = 0, unanswered = 0, total = 0) {
  quizCard.classList.add("hidden");
  resultCard.classList.remove("hidden");

  const goodPercent = Math.round((goodAnswers / total) * 100);
  const badPercent = Math.round((badAnswers / total) * 100);
  
  let resultDetails = `
    <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
      <h3 style="margin-top: 0; color: #0369a1;">Détails du Score</h3>
      <p><strong>Score:</strong> ${score}/20</p>
      <p><strong>Bonnes réponses:</strong> ${goodAnswers}/${total} (${goodPercent}%)</p>
      <p><strong>Mauvaises réponses:</strong> ${badAnswers}/${total} (${badPercent}%)</p>
      <p><strong>Non répondues:</strong> ${unanswered}/${total}</p>
    </div>
  `;
  
  finalMessage.innerHTML = reason
    ? `${currentUser}, ton devoir a ete envoye automatiquement (${reason}).${resultDetails}`
    : `${currentUser}, tu as termine le quiz.${resultDetails}`;

  reviewList.innerHTML = "";
  answersReview.forEach((item) => {
    const div = document.createElement("div");
    div.className = `review-item ${item.isCorrect ? "good" : "bad"}`;
    div.innerHTML = `
      <strong>${item.question}</strong><br/>
      Ta reponse: ${item.userAnswer}<br/>
      Bonne reponse: ${item.goodAnswer}<br/>
      <em>${item.explanation}</em>
    `;
    reviewList.appendChild(div);
  });

  saveScore(currentUser, score);
  renderLeaderboard();
}

function saveScore(name, score) {
  const oldData = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]");
  oldData.push({
    name,
    score,
    date: new Date().toLocaleDateString("fr-FR"),
    mode: lastAutoSubmitReason ? "automatique" : "manuel",
  });
  oldData.sort((a, b) => b.score - a.score);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(oldData.slice(0, 10)));

  const users = getUsers();
  if (!users[name]) return;
  users[name].history.unshift({
    score,
    date: new Date().toLocaleDateString("fr-FR"),
    mode: lastAutoSubmitReason ? "automatique" : "manuel",
    reason: lastAutoSubmitReason,
  });
  users[name].history = users[name].history.slice(0, 10);
  setUsers(users);
}

function renderLeaderboard() {
  const data = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]");
  leaderboardList.innerHTML = "";

  if (data.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Aucun score pour le moment.";
    leaderboardList.appendChild(li);
    return;
  }

  data.forEach((row) => {
    const li = document.createElement("li");
    li.textContent = `${row.name} - ${row.score}/20 (${row.date})`;
    leaderboardList.appendChild(li);
  });
}

function renderStudentHistory() {
  const users = getUsers();
  const history = users[currentUser]?.history || [];
  studentHistoryList.innerHTML = "";

  if (history.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Aucun resultat pour le moment.";
    studentHistoryList.appendChild(li);
    return;
  }

  history.forEach((row) => {
    const li = document.createElement("li");
    li.textContent = `${row.score}/20 (${row.date})${row.mode === "automatique" ? " - envoi automatique" : ""}`;
    studentHistoryList.appendChild(li);
  });
}


// Surveillance anti-triche : si l'etudiant quitte la page, revient,
// change d'application, recoit un appel ou une notification qui fait perdre
// le focus a la page, le devoir est valide automatiquement.
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    autoSubmitQuiz("sortie de la page");
  } else {
    autoSubmitQuiz("retour sur la page");
  }
});

window.addEventListener("blur", () => {
  autoSubmitQuiz("appel, notification ou changement de fenetre");
});

window.addEventListener("pagehide", () => {
  autoSubmitQuiz("fermeture ou changement de page");
});

window.addEventListener("beforeunload", () => {
  autoSubmitQuiz("fermeture ou actualisation de la page");
});

submitAnswersBtn.addEventListener("click", submitAllAnswers);
loginBtn.addEventListener("click", loginStudent);
logoutBtn.addEventListener("click", logoutStudent);
subjectChoiceSelect.addEventListener("change", () => {
  selectedSubjectName = subjectChoiceSelect.value;
  renderTopicsForSelectedSubject(selectedSubjectName);
  updateBeginQuizButtonState();
});
topicChoiceSelect.addEventListener("change", () => {
  selectedTopicName = topicChoiceSelect.value;
  updateBeginQuizButtonState();
  updateSelectedQuestionCount();
});
beginQuizBtn.addEventListener("click", startQuiz);
generalQuizBtn.addEventListener("click", handleGeneralQuizButton);
preparationDeBtn.addEventListener("click", handlePreparationDeButton);
showCorrectionBtn.addEventListener("click", () => {
  const isHidden = reviewList.classList.toggle("hidden");
  showCorrectionBtn.textContent = isHidden ? "Voir la correction" : "Masquer la correction";
});
backSubjectsBtn.addEventListener("click", () => {
  logoutStudent();
});
homeBtn.addEventListener("click", () => {
  resultCard.classList.add("hidden");
  stopQuizTimer();
  subjectsCard.classList.remove("hidden");
  resetSubjectSelection();
  initSubjectSelection();
});
backLeaderboardBtn.addEventListener("click", () => {
  leaderboardCard.classList.add("hidden");
  subjectsCard.classList.remove("hidden");
});
backSpaceBtn.addEventListener("click", () => {
  subjectsCard.classList.remove("hidden");
  studentSpaceCard.classList.add("hidden");
});
restartBtn.addEventListener("click", () => {
  resultCard.classList.add("hidden");
  stopQuizTimer();
  subjectsCard.classList.remove("hidden");
  resetSubjectSelection();
  initSubjectSelection();
});

ensureAllowedUsers();
renderLeaderboard();
restoreSession();
