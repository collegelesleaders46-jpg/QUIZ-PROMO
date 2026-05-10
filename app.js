

const submitAnswersBtn = document.getElementById("submit-answers-btn");
const restartBtn = document.getElementById("restart-btn");
const showCorrectionBtn = document.getElementById("show-correction-btn");
const loginBtn = document.getElementById("login-btn");
const recoverCodeOpenBtn = document.getElementById("recover-code-open-btn");
const backRecoverCodeBtn = document.getElementById("back-recover-code-btn");
const recoverCodeBtn = document.getElementById("recover-code-btn");
const recoverLoginBtn = document.getElementById("recover-login-btn");
const logoutBtn = document.getElementById("logout-btn");
const homeBtn = document.getElementById("home-btn");
const backSubjectsBtn = document.getElementById("back-subjects-btn");
const backCameraBtn = document.getElementById("back-camera-btn");
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
const displayModeChoiceSelect = document.getElementById("display-mode-choice");
const subjectMessage = document.getElementById("subject-message");
const selectedQuestionCount = document.getElementById("selected-question-count");
const beginQuizBtn = document.getElementById("begin-quiz-btn");
const generalQuizBtn = document.getElementById("general-quiz-btn");
const preparationDeBtn = document.getElementById("preparation-de-btn");
const loginNameInput = document.getElementById("login-name");
const recoverFullNameInput = document.getElementById("recover-full-name");
const recoverPhoneInput = document.getElementById("recover-phone");
const authMessage = document.getElementById("auth-message");
const recoverCodeMessage = document.getElementById("recover-code-message");
const sessionLabel = document.getElementById("session-label");
const studentHistoryList = document.getElementById("student-history-list");
const cameraWarning = document.getElementById("camera-warning");
const enableCameraBtn = document.getElementById("enable-camera-btn");
const takePhotoBtn = document.getElementById("take-photo-btn");
const cameraPreview = document.getElementById("camera-preview");
const cameraCanvas = document.getElementById("camera-canvas");
const photoPreview = document.getElementById("photo-preview");
const cameraMessage = document.getElementById("camera-message");
const singleQuestionNav = document.getElementById("single-question-nav");
const prevQuestionBtn = document.getElementById("prev-question-btn");
const nextQuestionBtn = document.getElementById("next-question-btn");

const authCard = document.getElementById("auth-card");
const recoverCodeCard = document.getElementById("recover-code-card");
const startCard = document.getElementById("start-card");
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
let cameraStream = null;
let hasCapturedPhoto = false;
let selectedMode = "";
let selectedSubjectName = "";
let selectedTopicName = "";
let selectedDisplayMode = "all";
let currentQuestionIndex = 0;
let userAnswers = [];
const answersReview = [];
let quizSubmitted = false;
let autoSubmitLocked = false;
let lastAutoSubmitReason = "";
let quizTimerInterval = null;
let singleQuestionTimerInterval = null;
let singleQuestionTimeRemaining = 30;
let quizTimeRemaining = 60 * 60;



function lockChoiceMenus() {
  if (subjectChoiceSelect) subjectChoiceSelect.disabled = true;
  if (topicChoiceSelect) topicChoiceSelect.disabled = true;
  if (displayModeChoiceSelect) displayModeChoiceSelect.disabled = true;
}

function unlockChoiceMenus() {
  if (subjectChoiceSelect) subjectChoiceSelect.disabled = false;
  // Sujet reste bloque tant qu'une matiere n'est pas choisie.
  if (topicChoiceSelect) topicChoiceSelect.disabled = !selectedSubjectName;
  if (displayModeChoiceSelect) displayModeChoiceSelect.disabled = false;
}

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
  stopSingleQuestionTimer();

  // 30 secondes par question en mode affichage complet.
  quizTimeRemaining = currentQuestions.length * 30;
  updateTimerDisplay();

  quizTimerInterval = setInterval(() => {
    quizTimeRemaining -= 1;
    updateTimerDisplay();

    if (quizTimeRemaining <= 0) {
      stopQuizTimer();
      autoSubmitQuiz("temps total dépassé");
    }
  }, 1000);
}


function stopSingleQuestionTimer() {
  if (singleQuestionTimerInterval) {
    clearInterval(singleQuestionTimerInterval);
    singleQuestionTimerInterval = null;
  }
}

function startSingleQuestionTimer() {
  stopSingleQuestionTimer();

  if (selectedDisplayMode !== "one") return;

  singleQuestionTimeRemaining = 30;
  if (timerDisplay) {
    timerDisplay.textContent = `Temps restant: ${singleQuestionTimeRemaining}s`;
  }

  singleQuestionTimerInterval = setInterval(() => {
    singleQuestionTimeRemaining -= 1;

    if (timerDisplay) {
      timerDisplay.textContent = `Temps restant: ${singleQuestionTimeRemaining}s`;
    }

    if (singleQuestionTimeRemaining <= 0) {
      stopSingleQuestionTimer();

      if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex += 1;
        renderSingleQuestion();
      } else {
        autoSubmitQuiz("temps de 30 secondes par question dépassé");
      }
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

function setCameraMessage(message, isError = false) {
  cameraMessage.textContent = message;
  cameraMessage.style.color = isError ? "#dc2626" : "#16a34a";
}

function setSubjectMessage(message, isError = false) {
  subjectMessage.textContent = message;
  subjectMessage.style.color = isError ? "#dc2626" : "#16a34a";
}




function stopCameraStream() {
  if (!cameraStream) return;
  cameraStream.getTracks().forEach((track) => track.stop());
  cameraStream = null;
}

function resetCameraState() {
  hasCapturedPhoto = false;
  cameraWarning.classList.remove("hidden");
  takePhotoBtn.disabled = true;
  photoPreview.classList.add("hidden");
  photoPreview.removeAttribute("src");
  cameraPreview.classList.add("hidden");
  cameraPreview.srcObject = null;
  setCameraMessage("");
  stopCameraStream();
}

function resetSubjectSelection() {
  selectedMode = "";
  selectedSubjectName = "";
  selectedTopicName = "";
  subjectChoiceSelect.innerHTML = "";
  topicChoiceSelect.innerHTML = "";
  if (displayModeChoiceSelect) displayModeChoiceSelect.value = "";
  selectedDisplayMode = "";
  currentQuestionIndex = 0;
  setSubjectMessage("Choisis d'abord QUIZ ou Préparation DE.");
  selectedQuestionCount.textContent = "";
  beginQuizBtn.classList.add("hidden");
  beginQuizBtn.disabled = true;
  lockChoiceMenus();
}

function updateBeginQuizButtonState() {
  const hasDisplayMode = displayModeChoiceSelect ? Boolean(displayModeChoiceSelect.value) : true;
  selectedDisplayMode = displayModeChoiceSelect ? displayModeChoiceSelect.value : "all";
  const shouldShow = Boolean(selectedMode && selectedSubjectName && selectedTopicName && hasDisplayMode);
  beginQuizBtn.disabled = !shouldShow;
  beginQuizBtn.classList.toggle("hidden", !shouldShow);

  if (!selectedMode) {
    setSubjectMessage("Choisis d'abord QUIZ ou Préparation DE.");
  } else if (!selectedSubjectName) {
    setSubjectMessage("Choisis maintenant une matière.");
  } else if (!selectedTopicName) {
    setSubjectMessage("Choisis maintenant un sujet.");
  } else if (!hasDisplayMode) {
    setSubjectMessage("Choisis enfin un Mode d'Affichage.");
  } else {
    setSubjectMessage("Tout est prêt. Tu peux commencer.");
  }
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
  unlockChoiceMenus();

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

async function enableCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setCameraMessage("Camera non supportee par ce navigateur.", true);
    return;
  }

  try {
    stopCameraStream();
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    cameraStream = stream;
    cameraPreview.srcObject = stream;
    cameraPreview.classList.remove("hidden");
    takePhotoBtn.disabled = false;
    setCameraMessage("Camera activee. Tu peux prendre une photo.");
  } catch (error) {
    setCameraMessage("Impossible d'acceder a la camera.", true);
  }
}

function takePhoto() {
  if (!cameraStream) {
    setCameraMessage("Active d'abord la camera.", true);
    return;
  }

  const videoWidth = cameraPreview.videoWidth;
  const videoHeight = cameraPreview.videoHeight;
  if (!videoWidth || !videoHeight) {
    setCameraMessage("Attends le chargement de la camera puis reessaie.", true);
    return;
  }

  cameraCanvas.width = videoWidth;
  cameraCanvas.height = videoHeight;
  const context = cameraCanvas.getContext("2d");
  context.drawImage(cameraPreview, 0, 0, videoWidth, videoHeight);
  photoPreview.src = cameraCanvas.toDataURL("image/png");
  photoPreview.classList.remove("hidden");
  hasCapturedPhoto = true;
  cameraWarning.classList.add("hidden");
  setCameraMessage("Photo prise avec succes. Tu peux maintenant choisir une matiere.");
  startCard.classList.add("hidden");
  subjectsCard.classList.remove("hidden");
  initSubjectSelection();
}

function showStudentArea(name) {
  currentUser = name;
  currentUserName = getDisplayNameByAccessCode(name);
  sessionLabel.textContent = `Code d'acces: ${name}`;
  userNameDisplay.textContent = `👤 ${currentUserName}`;
  authCard.classList.add("hidden");
  recoverCodeCard.classList.add("hidden");
  subjectsCard.classList.add("hidden");
  startCard.classList.remove("hidden");
  studentSpaceCard.classList.add("hidden");
  resultCard.classList.add("hidden");
  quizCard.classList.add("hidden");
  resetCameraState();
  resetSubjectSelection();
}

function isAllowedMatricule(matricule) {
  const code = String(matricule || "").trim().toUpperCase();
  const existsInCodeJs = typeof ALLOWED_MATRICULES !== "undefined" && ALLOWED_MATRICULES.includes(code);
  const existsInRecoveryList = !!findRecoveryPersonByCode(code);
  return existsInCodeJs || existsInRecoveryList;
}

function ensureAllowedUsers() {
  const users = getUsers();
  let hasChanges = false;

  const accessCodes = new Set([
    ...(typeof ALLOWED_MATRICULES !== "undefined" ? ALLOWED_MATRICULES : []),
    ...getAccessRecoveryList().map((person) => String(person.code || "").trim().toUpperCase()).filter(Boolean),
  ]);

  accessCodes.forEach((matricule) => {
    if (!users[matricule]) {
      users[matricule] = { history: [] };
      hasChanges = true;
    }
  });

  if (hasChanges) {
    setUsers(users);
  }
}


function normalizeForSearch(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function normalizePhone(value) {
  return String(value || "").replace(/\D/g, "");
}


function getAccessRecoveryList() {
  if (Array.isArray(window.ACCESS_RECOVERY_LIST)) return window.ACCESS_RECOVERY_LIST;
  if (typeof ACCESS_RECOVERY_LIST !== "undefined" && Array.isArray(ACCESS_RECOVERY_LIST)) return ACCESS_RECOVERY_LIST;
  return [];
}

function findRecoveryPersonByCode(code) {
  const normalizedCode = String(code || "").trim().toUpperCase();
  return getAccessRecoveryList().find((person) => String(person.code || "").trim().toUpperCase() === normalizedCode) || null;
}

function getDisplayNameByAccessCode(code) {
  const normalizedCode = String(code || "").trim().toUpperCase();

  // Priorité à liste-acces.js, car c'est la liste avec les noms + numéros Excel
  const person = findRecoveryPersonByCode(normalizedCode);
  if (person) {
    return person.nomPrenoms || person.nom || normalizedCode;
  }

  // Ancienne liste code.js en secours
  if (typeof ALLOWED_ACCESS_CODES !== "undefined" && ALLOWED_ACCESS_CODES[normalizedCode]) {
    return ALLOWED_ACCESS_CODES[normalizedCode];
  }

  return normalizedCode;
}

function setRecoverCodeMessage(message, isError = false) {
  recoverCodeMessage.textContent = message;
  recoverCodeMessage.style.color = isError ? "#dc2626" : "#16a34a";
}

function openRecoverCodePage() {
  authCard.classList.add("hidden");
  recoverCodeCard.classList.remove("hidden");
  recoverFullNameInput.value = "";
  recoverPhoneInput.value = "";
  setRecoverCodeMessage("");
  if (recoverLoginBtn) recoverLoginBtn.classList.add("hidden");
}

function closeRecoverCodePage() {
  recoverCodeCard.classList.add("hidden");
  recoverCodeCard.classList.add("hidden");
  authCard.classList.remove("hidden");
  setRecoverCodeMessage("");
  if (recoverLoginBtn) recoverLoginBtn.classList.add("hidden");
}

function recoverAccessCode() {
  const searchedName = normalizeForSearch(recoverFullNameInput.value);
  const searchedPhone = normalizePhone(recoverPhoneInput.value);

  if (!searchedName && !searchedPhone) {
    setRecoverCodeMessage("Entre ton nom et prenoms ou ton numero de telephone.", true);
    return;
  }

  const list = getAccessRecoveryList();

  const found = list.find((person) => {
    const personName = normalizeForSearch(person.nomPrenoms);
    const personPhone = normalizePhone(person.telephone);
    const nameMatches = searchedName && personName && personName.includes(searchedName);
    const phoneMatches = searchedPhone && personPhone && personPhone === searchedPhone;
    return nameMatches || phoneMatches;
  });

  if (!found) {
    setRecoverCodeMessage("Aucun code trouve. Verifie le nom, les prenoms ou le numero.", true);
    return;
  }

  setRecoverCodeMessage(`Ton code d'acces est : ${found.code}`);
  loginNameInput.value = found.code;
  if (recoverLoginBtn) recoverLoginBtn.classList.remove("hidden");
}

function loginWithRecoveredCode() {
  if (!loginNameInput.value.trim()) {
    setRecoverCodeMessage("Recupere d'abord ton code avant de te connecter.", true);
    return;
  }
  recoverCodeCard.classList.add("hidden");
  authCard.classList.remove("hidden");
  loginStudent();
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
  resetCameraState();
  setAuthMessage("Deconnecte.");
  loginNameInput.value = "";
  subjectsCard.classList.add("hidden");
  startCard.classList.add("hidden");
  quizCard.classList.add("hidden");
  resultCard.classList.add("hidden");
  studentSpaceCard.classList.add("hidden");
  recoverCodeCard.classList.add("hidden");
  authCard.classList.remove("hidden");
}

function restoreSession() {
  // La session n'est pas restaurée automatiquement
  // L'utilisateur doit toujours entrer son code d'accès en premier
}

function getActiveSubjectsConfig() {
  if (selectedMode === "preparation" && typeof PREPARATION_DE_CONFIG !== "undefined") {
    return PREPARATION_DE_CONFIG;
  }
  return SUBJECTS_CONFIG;
}

function renderTopicsForSelectedSubject(subjectName) {
  topicChoiceSelect.innerHTML = "";
  topicChoiceSelect.disabled = !subjectName;

  const placeholderOption = createPlaceholderOption(
    subjectName ? "Choisis un sujet" : "Choisis une matière d'abord"
  );
  topicChoiceSelect.appendChild(placeholderOption);

  if (subjectName) {
    const subjectsConfig = getActiveSubjectsConfig();
    const subjectConfig = subjectsConfig.find((item) => item.subjectName === subjectName);
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
  const preparationConfig = typeof PREPARATION_DE_CONFIG !== "undefined" ? PREPARATION_DE_CONFIG : SUBJECTS_CONFIG;
  const preparationSubjects = typeof PREPARATION_DE_SUBJECTS !== "undefined" ? PREPARATION_DE_SUBJECTS : [];
  const selectedSubjects = preparationSubjects
    .map((filter) => {
      const subject = preparationConfig.find((item) => item.subjectName === filter.subjectName);
      return subject ? { ...subject, displayName: filter.label } : null;
    })
    .filter(Boolean);

  const uniqueSubjects = [...new Map(selectedSubjects.map((item) => [item.subjectName, item])).values()];
  populateSubjectSelect(uniqueSubjects, "Choisis une matière", "preparation");
  updateBeginQuizButtonState();
}

function handleGeneralQuizButton() {
  populateSubjectSelect(SUBJECTS_CONFIG, "Choisis une matière", "quiz");
  updateBeginQuizButtonState();
}

function handlePreparationDeButton() {
  applyPreparationDEFilter();
}

function initSubjectSelection() {
  resetSubjectSelection();
  subjectChoiceSelect.appendChild(createPlaceholderOption("Choisis le mode Quiz ou Préparation DE"));
  topicChoiceSelect.appendChild(createPlaceholderOption("Choisis une matière d'abord"));
  if (displayModeChoiceSelect) displayModeChoiceSelect.value = "";
  lockChoiceMenus();
}

function startQuiz() {
  if (!currentUser) {
    setAuthMessage("Connecte-toi d'abord pour lancer le quiz.", true);
    return;
  }

  if (!hasCapturedPhoto) {
    setCameraMessage("Active la camera et prends une photo avant de commencer.", true);
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
  currentQuestionIndex = 0;
  selectedDisplayMode = displayModeChoiceSelect ? displayModeChoiceSelect.value : "all";
  answersReview.length = 0;

  startCard.classList.add("hidden");
  subjectsCard.classList.add("hidden");
  resultCard.classList.add("hidden");
  quizCard.classList.remove("hidden");
  quizUserName.textContent = `👤 ${currentUserName}`;

  if (selectedDisplayMode === "one") {
    renderSingleQuestion();
  } else {
    renderAllQuestions();
  }
  startQuizTimer();
}

function saveAnswerForQuestion(questionIndex, optionIndex, isMultipleAnswer) {
  if (isMultipleAnswer) {
    const selected = Array.from(
      document.querySelectorAll(`input[name="question-${questionIndex}"]:checked`)
    ).map((item) => Number(item.value));
    userAnswers[questionIndex] = selected.length ? selected : null;
  } else {
    userAnswers[questionIndex] = optionIndex;
  }
}

function buildQuestionElement(q, questionIndex) {
  const wrapper = document.createElement("div");
  wrapper.className = "review-item question-block";
  wrapper.innerHTML = `<strong>${questionIndex + 1}. ${cleanQuestionText(q.question)}</strong>`;

  const expectedAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
  const isMultipleAnswer = expectedAnswers.length > 1;
  const savedAnswer = userAnswers[questionIndex];
  const savedAnswers = Array.isArray(savedAnswer)
    ? savedAnswer
    : savedAnswer === null
    ? []
    : [savedAnswer];

  q.options.forEach((optionText, optionIndex) => {
    const label = document.createElement("label");
    label.className = "answer-choice";

    const input = document.createElement("input");
    input.type = isMultipleAnswer ? "checkbox" : "radio";
    input.name = `question-${questionIndex}`;
    input.value = String(optionIndex);
    input.checked = savedAnswers.includes(optionIndex);
    input.style.width = "auto";
    input.style.marginRight = "8px";
    input.addEventListener("change", () => {
      saveAnswerForQuestion(questionIndex, optionIndex, isMultipleAnswer);
    });

    label.appendChild(input);
    label.append(optionText);
    wrapper.appendChild(label);
  });

  return wrapper;
}

function renderAllQuestions() {
  selectedDisplayMode = "all";
  questionCount.textContent = `Questions: ${currentQuestions.length}`;
  scoreLive.textContent = "Score: -";
  updateTimerDisplay();
  questionText.textContent = "Toutes les questions";
  answersContainer.innerHTML = "";
  if (singleQuestionNav) singleQuestionNav.classList.add("hidden");
  submitAnswersBtn.classList.remove("hidden");
  submitAnswersBtn.textContent = "Valider mes reponses";

  currentQuestions.forEach((q, questionIndex) => {
    answersContainer.appendChild(buildQuestionElement(q, questionIndex));
  });
}

function renderSingleQuestion() {
  selectedDisplayMode = "one";
  const total = currentQuestions.length;
  const q = currentQuestions[currentQuestionIndex];
  questionCount.textContent = `Question ${currentQuestionIndex + 1}/${total}`;
  scoreLive.textContent = "Score: -";
  updateTimerDisplay();
  questionText.textContent = "Question par question";
  answersContainer.innerHTML = "";
  answersContainer.appendChild(buildQuestionElement(q, currentQuestionIndex));
  startSingleQuestionTimer();

  if (singleQuestionNav) singleQuestionNav.classList.remove("hidden");
  if (prevQuestionBtn) prevQuestionBtn.disabled = currentQuestionIndex === 0;
  if (nextQuestionBtn) {
    nextQuestionBtn.textContent = currentQuestionIndex === total - 1 ? "Dernière question" : "Suivant →";
    nextQuestionBtn.disabled = currentQuestionIndex === total - 1;
  }
  submitAnswersBtn.classList.remove("hidden");
  submitAnswersBtn.textContent = currentQuestionIndex === total - 1
    ? "Valider mes reponses"
    : "Valider maintenant";
}

function goToPreviousQuestion() {
  if (selectedDisplayMode !== "one" || currentQuestionIndex <= 0) return;
  currentQuestionIndex -= 1;
  renderSingleQuestion();
}

function goToNextQuestion() {
  if (selectedDisplayMode !== "one" || currentQuestionIndex >= currentQuestions.length - 1) return;
  currentQuestionIndex += 1;
  renderSingleQuestion();
}

function submitAllAnswers() {
  finalizeQuizSubmission({ allowIncomplete: true, reason: "" });
}

function finalizeQuizSubmission({ allowIncomplete = false, reason = "" } = {}) {
  if (quizSubmitted || currentQuestions.length === 0) return;

  if (!allowIncomplete && userAnswers.some((answer) => answer === null)) {
    questionText.textContent = "Reponds aux questions avant de valider.";
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
recoverCodeOpenBtn.addEventListener("click", openRecoverCodePage);
backRecoverCodeBtn.addEventListener("click", closeRecoverCodePage);
recoverCodeBtn.addEventListener("click", recoverAccessCode);
recoverLoginBtn.addEventListener("click", loginWithRecoveredCode);
logoutBtn.addEventListener("click", logoutStudent);
enableCameraBtn.addEventListener("click", enableCamera);
takePhotoBtn.addEventListener("click", takePhoto);
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
if (displayModeChoiceSelect) {
  displayModeChoiceSelect.addEventListener("change", () => {
    selectedDisplayMode = displayModeChoiceSelect.value;
    updateBeginQuizButtonState();
  });
}
if (prevQuestionBtn) prevQuestionBtn.addEventListener("click", goToPreviousQuestion);
if (nextQuestionBtn) nextQuestionBtn.addEventListener("click", goToNextQuestion);
beginQuizBtn.addEventListener("click", startQuiz);
generalQuizBtn.addEventListener("click", handleGeneralQuizButton);
preparationDeBtn.addEventListener("click", handlePreparationDeButton);
showCorrectionBtn.addEventListener("click", () => {
  const isHidden = reviewList.classList.toggle("hidden");
  showCorrectionBtn.textContent = isHidden ? "Voir la correction" : "Masquer la correction";
});
backSubjectsBtn.addEventListener("click", () => {
  subjectsCard.classList.add("hidden");
  startCard.classList.remove("hidden");
  resetSubjectSelection();
});
backCameraBtn.addEventListener("click", () => {
  logoutStudent();
});
homeBtn.addEventListener("click", () => {
  resultCard.classList.add("hidden");
  stopQuizTimer();
  startCard.classList.remove("hidden");
  subjectsCard.classList.add("hidden");
  hasCapturedPhoto = false;
  resetCameraState();
  resetSubjectSelection();
});
backLeaderboardBtn.addEventListener("click", () => {
  leaderboardCard.classList.add("hidden");
  startCard.classList.remove("hidden");
});
backSpaceBtn.addEventListener("click", () => {
  startCard.classList.remove("hidden");
  studentSpaceCard.classList.add("hidden");
});
restartBtn.addEventListener("click", () => {
  resultCard.classList.add("hidden");
  stopQuizTimer();
  startCard.classList.remove("hidden");
  subjectsCard.classList.add("hidden");
  hasCapturedPhoto = false;
  resetCameraState();
  resetSubjectSelection();
});

ensureAllowedUsers();
renderLeaderboard();
restoreSession();
