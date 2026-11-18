"use strict";

const STORAGE_KEY = "suTakibiState";

const elements = {
  profileForm: document.querySelector("#profileForm"),
  heightInput: document.querySelector("#heightInput"),
  weightInput: document.querySelector("#weightInput"),
  ageInput: document.querySelector("#ageInput"),
  genderInput: document.querySelector("#genderInput"),
  profileError: document.querySelector("#profileError"),
  bmiBadge: document.querySelector("#bmiBadge"),
  bmiResult: document.querySelector("#bmiResult"),
  heightResult: document.querySelector("#heightResult"),
  weightResult: document.querySelector("#weightResult"),
  ageResult: document.querySelector("#ageResult"),
  genderResult: document.querySelector("#genderResult"),
  avatar: document.querySelector("#avatar"),
  avatarBody: document.querySelector("#avatarBody"),
  avatarTitle: document.querySelector("#avatarTitle"),
  avatarSummary: document.querySelector("#avatarSummary"),
  avatarAge: document.querySelector("#avatarAge"),
  avatarGender: document.querySelector("#avatarGender"),
  avatarBmi: document.querySelector("#avatarBmi"),
  targetAmount: document.querySelector("#targetAmount"),
  targetUnit: document.querySelector("#targetUnit"),
  drankAmount: document.querySelector("#drankAmount"),
  progressRing: document.querySelector("#progressRing"),
  progressFill: document.querySelector("#progressFill"),
  progressSummary: document.querySelector("#progressSummary"),
  addWaterForm: document.querySelector("#addWaterForm"),
  customAmount: document.querySelector("#customAmount"),
  resetDayButton: document.querySelector("#resetDayButton"),
  toast: document.querySelector("#toast")
};

function getTodayKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function loadState() {
  const fallback = {
    height: null,
    weight: null,
    age: null,
    gender: null,
    target: null,
    date: getTodayKey(),
    drank: 0
  };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return fallback;

    if (saved.date !== getTodayKey()) {
      saved.date = getTodayKey();
      saved.drank = 0;
    }

    return { ...fallback, ...saved };
  } catch {
    return fallback;
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    showToast("Veriler tarayıcıda kaydedilemedi.");
  }
}

function formatNumber(value) {
  return new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 1
  }).format(value);
}

function calculateBmi(heightCm, weightKg) {
  const heightMeters = heightCm / 100;
  return weightKg / (heightMeters * heightMeters);
}

function getBmiCategory(bmi) {
  if (bmi < 18.5) {
    return { label: "Zayıf", className: "attention" };
  }
  if (bmi < 25) {
    return { label: "Normal kilo", className: "normal" };
  }
  if (bmi < 30) {
    return { label: "Fazla kilo", className: "attention" };
  }
  return { label: "Obezite sınırı", className: "risk" };
}

function calculateWaterTarget(weightKg, age, gender) {
  let millilitersPerKg = 35;

  if (gender === "female") millilitersPerKg *= 0.92;
  if (age >= 60) millilitersPerKg *= 0.9;

  return Math.round((weightKg * millilitersPerKg) / 250) * 250;
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    elements.toast.classList.remove("visible");
  }, 2400);
}

function updateProgress() {
  const target = Number(state.target) || 0;
  const drank = Number(state.drank) || 0;
  const percentage = target > 0 ? Math.min((drank / target) * 100, 100) : 0;
  const remaining = Math.max(target - drank, 0);

  elements.drankAmount.textContent = formatNumber(drank);
  elements.progressFill.style.width = `${percentage}%`;
  elements.progressRing.style.setProperty("--progress", `${percentage * 3.6}deg`);

  if (target > 0) {
    elements.targetAmount.textContent = formatNumber(target);
    elements.targetUnit.textContent = " ml hedef";

    if (drank >= target) {
      elements.progressSummary.textContent = "Günlük su hedefini tamamladın.";
    } else {
      elements.progressSummary.textContent = `${formatNumber(remaining)} ml kaldı`;
    }
  } else {
    elements.targetAmount.textContent = "—";
    elements.targetUnit.textContent = " ml hedef";
    elements.progressSummary.textContent = "Ölçülerini girerek günlük hedefini hesapla.";
  }
}

function updateProfileDisplay() {
  if (!state.height || !state.weight || !state.age || !state.gender) return;

  const bmi = calculateBmi(state.height, state.weight);
  const category = getBmiCategory(bmi);
  const genderLabel = state.gender === "female" ? "Kadın" : "Erkek";
  const ageClass = state.age < 18 ? "age-teen" : state.age < 60 ? "age-adult" : "age-senior";
  const bodyWidth = Math.max(0.78, Math.min(1.48, 1 + (bmi - 22) * 0.023));
  const bodyHeight = 0.88 + ((state.height - 100) / 150) * 0.24;

  elements.heightInput.value = state.height;
  elements.weightInput.value = state.weight;
  elements.ageInput.value = state.age;
  elements.genderInput.value = state.gender;
  elements.heightResult.textContent = `${formatNumber(state.height)} cm`;
  elements.weightResult.textContent = `${formatNumber(state.weight)} kg`;
  elements.bmiResult.textContent = formatNumber(bmi);
  elements.ageResult.textContent = `${formatNumber(state.age)} yaş`;
  elements.genderResult.textContent = genderLabel;
  elements.bmiBadge.textContent = category.label;
  elements.bmiBadge.className = `badge ${category.className}`;
  elements.avatar.classList.toggle("gender-female", state.gender === "female");
  elements.avatar.classList.remove("age-teen", "age-adult", "age-senior");
  elements.avatar.classList.add(ageClass);
  elements.avatarBody.setAttribute(
    "transform",
    `translate(110 0) scale(${bodyWidth} ${bodyHeight}) translate(-110 0)`
  );
  elements.avatar.setAttribute(
    "aria-label",
    `${state.age} yaşında, ${genderLabel.toLocaleLowerCase("tr-TR")}, ${formatNumber(state.height)} cm ve ${formatNumber(state.weight)} kg profile göre yaklaşık vücut şekilli sevimli avatar`
  );
  elements.avatarTitle.textContent = "İşte senin sevimli avatarın!";
  elements.avatarSummary.textContent = `${formatNumber(state.height)} cm boyundaki profilin için avatarının vücut şekli boy-kilo oranına göre uyarlandı.`;
  elements.avatarAge.textContent = `Yaş: ${formatNumber(state.age)}`;
  elements.avatarGender.textContent = `Cinsiyet: ${genderLabel}`;
  elements.avatarBmi.textContent = `VKİ: ${formatNumber(bmi)} · ${category.label}`;
}

elements.profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const height = Number(elements.heightInput.value);
  const weight = Number(elements.weightInput.value);
  const age = Number(elements.ageInput.value);
  const gender = elements.genderInput.value;

  if (!Number.isFinite(height) || height < 100 || height > 250) {
    elements.profileError.textContent = "Boyunu 100 ile 250 cm arasında gir.";
    elements.heightInput.focus();
    return;
  }

  if (!Number.isFinite(weight) || weight < 25 || weight > 300) {
    elements.profileError.textContent = "Kilonu 25 ile 300 kg arasında gir.";
    elements.weightInput.focus();
    return;
  }

  if (!Number.isInteger(age) || age < 10 || age > 100) {
    elements.profileError.textContent = "Yaşı 10 ile 100 arasında gir.";
    elements.ageInput.focus();
    return;
  }

  if (gender !== "female" && gender !== "male") {
    elements.profileError.textContent = "Cinsiyet bilgisini seç.";
    elements.genderInput.focus();
    return;
  }

  elements.profileError.textContent = "";
  state.height = height;
  state.weight = weight;
  state.age = age;
  state.gender = gender;
  state.target = calculateWaterTarget(weight, age, gender);
  saveState();
  updateProfileDisplay();
  updateProgress();
  showToast("Ölçülerin ve su hedefin güncellendi.");
});

elements.addWaterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = Number(elements.customAmount.value);

  if (!state.target) {
    showToast("Önce ölçülerini gir.");
    elements.heightInput.focus();
    return;
  }

  if (!Number.isInteger(amount) || amount < 1 || amount > 5000) {
    showToast("1 ile 5000 ml arasında bir miktar gir.");
    return;
  }

  state.drank += amount;
  saveState();
  updateProgress();
  elements.customAmount.value = "";
  showToast(`${formatNumber(amount)} ml ekledi.`);
});

document.querySelectorAll("[data-add]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!state.target) {
      showToast("Önce ölçülerini gir.");
      elements.heightInput.focus();
      return;
    }

    const amount = Number(button.dataset.add);
    state.drank += amount;
    saveState();
    updateProgress();
    showToast(`${formatNumber(amount)} ml ekledi.`);
  });
});

elements.resetDayButton.addEventListener("click", () => {
  if (state.drank === 0) {
    showToast("Bugün henüz su kaydı yok.");
    return;
  }

  const shouldReset = window.confirm("Bugünün su kaydı sıfırlansın mı?");
  if (!shouldReset) return;

  state.drank = 0;
  saveState();
  updateProgress();
  showToast("Bugünün kaydı sıfırlandı.");
});

let state = loadState();
updateProfileDisplay();
updateProgress();
