/**
 * Simple & Intuitive CBC Interpretation & Analyzer Script
 * Institutions: Riphah International University & Noor-Al-Shifa Hospital
 * Author: Hafiz Muhammad Qasim | SAP ID: 63736 | MS MLS
 * Supervised by: Dr. Sohail | Laboratory Technologist, Noor-Al-Shifa Hospital
 */

document.addEventListener("DOMContentLoaded", () => {
  initModal();
  initTabs();
  initPresets();
  initSlideDeck();
  initInterpretationHandlers();
});

// ==========================================================================
// 1. Pop-up Window (Modal) Logic
// ==========================================================================
function initModal() {
  const modal = document.getElementById("modalOverlay");
  const openBtns = document.querySelectorAll(".btn-open-popup");
  const closeBtn = document.getElementById("modalCloseBtn");
  const fileInput = document.getElementById("popupFileInput");
  const uploadBox = document.getElementById("popupUploadBox");
  const previewBox = document.getElementById("popupPreviewBox");
  const previewImg = document.getElementById("popupPreviewImg");

  openBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (modal) modal.classList.add("active");
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }

  // File Upload handling
  if (uploadBox && fileInput) {
    uploadBox.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          if (previewImg) previewImg.src = event.target.result;
          if (previewBox) previewBox.classList.add("active");
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

// ==========================================================================
// 2. Tabs Switcher (3-Part vs 5-Part)
// ==========================================================================
function initTabs() {
  // On-page tabs
  const tab3 = document.getElementById("tab3Part");
  const tab5 = document.getElementById("tab5Part");
  const form3 = document.getElementById("form3Part");
  const form5 = document.getElementById("form5Part");

  if (tab3 && tab5) {
    tab3.addEventListener("click", () => {
      tab3.classList.add("active");
      tab5.classList.remove("active");
      if (form3) form3.style.display = "block";
      if (form5) form5.style.display = "none";
    });

    tab5.addEventListener("click", () => {
      tab5.classList.add("active");
      tab3.classList.remove("active");
      if (form3) form3.style.display = "none";
      if (form5) form5.style.display = "block";
    });
  }

  // Popup Modal Analyzer Type Switcher
  const popTab3 = document.getElementById("popTab3");
  const popTab5 = document.getElementById("popTab5");
  const popField3 = document.getElementById("popField3Part");
  const popField5 = document.getElementById("popField5Part");

  if (popTab3 && popTab5) {
    popTab3.addEventListener("click", () => {
      popTab3.classList.add("active");
      popTab5.classList.remove("active");
      if (popField3) popField3.style.display = "block";
      if (popField5) popField5.style.display = "none";
    });

    popTab5.addEventListener("click", () => {
      popTab5.classList.add("active");
      popTab3.classList.remove("active");
      if (popField3) popField3.style.display = "none";
      if (popField5) popField5.style.display = "block";
    });
  }
}

// ==========================================================================
// 3. Clinical Presets
// ==========================================================================
const PRESETS = {
  microcytic: {
    hb: 8.2, rbc: 4.1, mcv: 64.5, mch: 19.8, rdw: 18.5, wbc: 7.2, lym: 32, gran: 62, mid: 6.0, plt: 380,
    desc: "Microcytic Hypochromic Anemia (IDA vs Thalassemia Minor)"
  },
  high_mid: {
    hb: 13.5, rbc: 4.7, mcv: 86.0, mch: 29.0, rdw: 13.0, wbc: 11.2, lym: 26, gran: 57, mid: 17.0, plt: 275,
    desc: "Elevated MID Population (Probable Eosinophilia / Allergic Reaction)"
  },
  sepsis: {
    hb: 12.0, rbc: 4.2, mcv: 88.0, mch: 28.5, rdw: 14.2, wbc: 22.8, neu: 88, lym: 7, mono: 4, eos: 0.8, baso: 0.2, plt: 480,
    desc: "Acute Leukocytosis with Neutrophilia (Severe Bacterial Infection / Sepsis Risk)"
  },
  dengue: {
    hb: 17.0, rbc: 5.6, mcv: 90.0, mch: 30.0, rdw: 13.2, wbc: 2.6, neu: 48, lym: 45, mono: 6, eos: 0.8, baso: 0.2, plt: 34,
    desc: "Dengue Shock Triad (Thrombocytopenia + Hemoconcentration + Leukopenia)"
  }
};

function initPresets() {
  document.querySelectorAll(".btn-preset").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.preset;
      applyPresetValues(type);
    });
  });

  // Modal sample buttons
  document.querySelectorAll(".btn-pop-sample").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.sample;
      applyModalSample(type);
    });
  });
}

function applyPresetValues(type) {
  const p = PRESETS[type];
  if (!p) return;

  if (p.mid !== undefined) {
    document.getElementById("tab3Part")?.click();
    setVal("on_hb3", p.hb);
    setVal("on_rbc3", p.rbc);
    setVal("on_mcv3", p.mcv);
    setVal("on_mch3", p.mch);
    setVal("on_rdw3", p.rdw);
    setVal("on_wbc3", p.wbc);
    setVal("on_lym3", p.lym);
    setVal("on_gran3", p.gran);
    setVal("on_mid3", p.mid);
    setVal("on_plt3", p.plt);
  } else {
    document.getElementById("tab5Part")?.click();
    setVal("on_hb5", p.hb);
    setVal("on_rbc5", p.rbc);
    setVal("on_mcv5", p.mcv);
    setVal("on_mch5", p.mch);
    setVal("on_rdw5", p.rdw);
    setVal("on_wbc5", p.wbc);
    setVal("on_neu5", p.neu);
    setVal("on_lym5", p.lym);
    setVal("on_mono5", p.mono);
    setVal("on_eos5", p.eos);
    setVal("on_baso5", p.baso);
    setVal("on_plt5", p.plt);
  }
}

function applyModalSample(type) {
  const p = PRESETS[type];
  if (!p) return;

  // Show stylized sample report scan
  const previewBox = document.getElementById("popupPreviewBox");
  const previewImg = document.getElementById("popupPreviewImg");
  if (previewImg && previewBox) {
    previewImg.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150"><rect width="100%" height="100%" fill="%23ffffff"/><text x="10" y="20" font-family="sans-serif" font-weight="bold" font-size="11" fill="%230f2b48">NOOR-AL-SHIFA HOSPITAL - CBC SCAN</text><line x1="10" y1="28" x2="290" y2="28" stroke="%23cbd5e1" stroke-width="1"/><text x="10" y="48" font-family="monospace" font-size="10" fill="%23334155">HGB: ${p.hb} g/dL | MCV: ${p.mcv} fL</text><text x="10" y="68" font-family="monospace" font-size="10" fill="%23334155">WBC: ${p.wbc} 10^9/L | PLT: ${p.plt} 10^9/L</text><text x="10" y="88" font-family="monospace" font-size="10" fill="%23334155">${p.mid ? 'MID: ' + p.mid + '% (HIGH)' : 'NEU: ' + p.neu + '%'}</text><text x="10" y="125" font-family="sans-serif" font-size="9" fill="%23b45309">Case: ${p.desc}</text></svg>`;
    previewBox.classList.add("active");
  }

  // Populate modal fields
  if (p.mid !== undefined) {
    document.getElementById("popTab3")?.click();
    setVal("pop_hb", p.hb);
    setVal("pop_rbc", p.rbc);
    setVal("pop_mcv", p.mcv);
    setVal("pop_mch", p.mch);
    setVal("pop_rdw", p.rdw);
    setVal("pop_wbc", p.wbc);
    setVal("pop_lym", p.lym);
    setVal("pop_gran", p.gran);
    setVal("pop_mid", p.mid);
    setVal("pop_plt", p.plt);
  } else {
    document.getElementById("popTab5")?.click();
    setVal("pop_hb", p.hb);
    setVal("pop_rbc", p.rbc);
    setVal("pop_mcv", p.mcv);
    setVal("pop_mch", p.mch);
    setVal("pop_rdw", p.rdw);
    setVal("pop_wbc", p.wbc);
    setVal("pop_neu", p.neu);
    setVal("pop_lym5", p.lym);
    setVal("pop_mono", p.mono);
    setVal("pop_eos", p.eos);
    setVal("pop_baso", p.baso);
    setVal("pop_plt", p.plt);
  }
}

function setVal(id, v) {
  const el = document.getElementById(id);
  if (el) el.value = v;
}

function getVal(id) {
  const el = document.getElementById(id);
  return el ? parseFloat(el.value) : NaN;
}

// ==========================================================================
// 4. Clinical Interpretation Engine
// ==========================================================================
function initInterpretationHandlers() {
  // Modal Interpret button
  const popInterpretBtn = document.getElementById("btnPopInterpret");
  if (popInterpretBtn) {
    popInterpretBtn.addEventListener("click", () => {
      const is3Part = document.getElementById("popTab3")?.classList.contains("active");
      const values = {
        hb: getVal("pop_hb"),
        rbc: getVal("pop_rbc"),
        mcv: getVal("pop_mcv"),
        mch: getVal("pop_mch"),
        rdw: getVal("pop_rdw"),
        wbc: getVal("pop_wbc"),
        plt: getVal("pop_plt"),
        mid: is3Part ? getVal("pop_mid") : undefined,
        neu: !is3Part ? getVal("pop_neu") : undefined,
        eos: !is3Part ? getVal("pop_eos") : undefined
      };
      evaluateAndDisplayResults(values, "popResultCard", "popVerdictTitle", "popVerdictDesc", "popFindingsList", "popNextTestsList");
    });
  }

  // On-page Interpret button (3-Part)
  const onInterpretBtn3 = document.getElementById("btnOnInterpret3");
  if (onInterpretBtn3) {
    onInterpretBtn3.addEventListener("click", () => {
      const values = {
        hb: getVal("on_hb3"),
        rbc: getVal("on_rbc3"),
        mcv: getVal("on_mcv3"),
        mch: getVal("on_mch3"),
        rdw: getVal("on_rdw3"),
        wbc: getVal("on_wbc3"),
        plt: getVal("on_plt3"),
        mid: getVal("on_mid3")
      };
      evaluateAndDisplayResults(values, "onResultCard", "onVerdictTitle", "onVerdictDesc", "onFindingsList", "onNextTestsList");
    });
  }

  // On-page Interpret button (5-Part)
  const onInterpretBtn5 = document.getElementById("btnOnInterpret5");
  if (onInterpretBtn5) {
    onInterpretBtn5.addEventListener("click", () => {
      const values = {
        hb: getVal("on_hb5"),
        rbc: getVal("on_rbc5"),
        mcv: getVal("on_mcv5"),
        mch: getVal("on_mch5"),
        rdw: getVal("on_rdw5"),
        wbc: getVal("on_wbc5"),
        plt: getVal("on_plt5"),
        neu: getVal("on_neu5"),
        eos: getVal("on_eos5")
      };
      evaluateAndDisplayResults(values, "onResultCard", "onVerdictTitle", "onVerdictDesc", "onFindingsList", "onNextTestsList");
    });
  }

  // Print buttons
  document.querySelectorAll(".btn-print-action").forEach(btn => {
    btn.addEventListener("click", () => window.print());
  });
}

function evaluateAndDisplayResults(v, cardId, titleId, descId, findingsId, testsId) {
  if (isNaN(v.hb) && isNaN(v.wbc) && isNaN(v.plt)) {
    alert("Please enter at least Hemoglobin, WBC, or Platelet values.");
    return;
  }

  let verdict = "Normal CBC Hematological Profile";
  let explanation = "All measured red blood cell, leukocyte, and thrombocyte parameters are within physiological limits.";
  const findings = [];
  const nextTests = [];

  // 1. RBC & Anemia Evaluation
  if (v.hb < 12.0) {
    if (v.mcv < 80.0) {
      // Microcytic Hypochromic
      let mentzer = "";
      if (v.rbc > 0) {
        const mRatio = (v.mcv / v.rbc).toFixed(1);
        mentzer = ` (Mentzer Index: ${mRatio} — ${mRatio > 13 ? 'favors Iron Deficiency' : 'favors Thalassemia Minor'})`;
      }
      verdict = "Microcytic Hypochromic Anemia";
      explanation = `Low Hemoglobin (${v.hb} g/dL) with microcytosis (MCV: ${v.mcv} fL)${mentzer}. The red cells are smaller and paler than normal.`;
      
      findings.push("Decreased mean cell volume (MCV < 80 fL) indicating defective hemoglobinization.");
      if (v.rdw > 15.0) {
        findings.push(`Elevated RDW (${v.rdw}%) indicating marked anisocytosis, highly characteristic of Iron Deficiency.`);
      }

      nextTests.push({ name: "Serum Ferritin Test", reason: "Confirms whether bone marrow iron stores are exhausted (Ferritin < 15-30 ng/mL = Iron Deficiency)." });
      nextTests.push({ name: "Iron Profile (Serum Iron, TIBC, Transferrin Saturation)", reason: "Quantifies circulating iron and total iron-binding capacity." });
      nextTests.push({ name: "Hemoglobin Electrophoresis (HPLC)", reason: "Mandatory to rule out or confirm Beta-Thalassemia Trait (elevated HbA2 > 3.5%)." });
    } else if (v.mcv > 100.0) {
      verdict = "Macrocytic Anemia";
      explanation = `Low Hemoglobin with elevated MCV (${v.mcv} fL), indicating macrocytic megaloblastic or non-megaloblastic erythropoiesis.`;
      findings.push("Enlarged erythrocytes (MCV > 100 fL) frequently caused by impaired DNA synthesis.");
      nextTests.push({ name: "Serum Vitamin B12 & Folate Levels", reason: "Differentiate cobalamin vs folate nutritional deficiency." });
      nextTests.push({ name: "Peripheral Blood Film (PBF)", reason: "Examine for oval macrocytes and hypersegmented neutrophils." });
    } else {
      verdict = "Normocytic Normochromic Anemia";
      explanation = `Depressed Hemoglobin (${v.hb} g/dL) with normal cell volume (MCV: ${v.mcv} fL).`;
      nextTests.push({ name: "Reticulocyte Count", reason: "Differentiates marrow hypoproliferation from acute blood loss or hemolysis." });
    }
  }

  // 2. 3-Part Analyzer Special: Elevated MID Cells
  if (v.mid !== undefined && v.mid > 9.0) {
    verdict += " + Elevated MID Cells (3-Part Analyzer)";
    findings.push(`Elevated MID population (${v.mid}%). In a 3-part analyzer, MID represents combined Monocytes, Eosinophils, and Basophils.`);
    nextTests.push({
      name: "Serum Total IgE Antibody Test",
      reason: "High MID is most frequently caused by Eosinophilia. Serum IgE confirms allergic reaction, atopic asthma, or hypersensitivity."
    });
    nextTests.push({
      name: "Stool Routine Examination (R/E) for Ova & Parasites",
      reason: "Intestinal parasitic/helminthic infestations are a primary cause of reactive eosinophil elevation."
    });
    nextTests.push({
      name: "Absolute Eosinophil Count (AEC) or 5-Part Differential",
      reason: "Verify exact eosinophil and monocyte counts."
    });
  }

  // 3. 5-Part Analyzer: Eosinophilia
  if (v.eos !== undefined && v.eos > 5.0) {
    findings.push(`Eosinophilia detected (${v.eos}%). Suggestive of allergic, parasitic, or dermatological conditions.`);
    nextTests.push({ name: "Serum Total IgE Level", reason: "Confirms atopic allergy or hyper-IgE reaction." });
    nextTests.push({ name: "Stool Examination for Parasites", reason: "Screen for intestinal worms/helminths." });
  }

  // 4. WBC / Leukocyte Evaluation
  if (v.wbc > 11.0) {
    findings.push(`Leukocytosis (Total WBC: ${v.wbc} x10^9/L), indicating active systemic inflammation, bacterial infection, or physiological stress.`);
    if ((v.neu !== undefined && v.neu > 70) || (v.mid !== undefined && v.hb < 12.0 && v.wbc > 18.0)) {
      nextTests.push({ name: "Serum C-Reactive Protein (Quantitative CRP)", reason: "Assess acute systemic bacterial inflammatory activity." });
      nextTests.push({ name: "Serum Procalcitonin (PCT)", reason: "Specific marker distinguishing bacterial sepsis from viral infection." });
      nextTests.push({ name: "Blood Culture & Sensitivity", reason: "Isolate bacteremia pathogen prior to antibiotic therapy." });
    }
  }

  // 5. Platelets Evaluation
  if (v.plt < 150) {
    findings.push(`Thrombocytopenia (Platelets: ${v.plt} x10^9/L).`);
    if (v.plt < 50) {
      findings.push("⚠️ Severe bleeding hazard: Platelets < 50 x10^9/L.");
    }
    if (v.wbc < 4.0 && v.hb > 14.0) {
      verdict = "Dengue Shock / Hemoconcentration Triad";
      explanation = "Marked thrombocytopenia, high hematocrit/hemoglobin, and leukopenia match the clinical criteria for Dengue infection.";
      nextTests.push({ name: "Dengue NS1 Antigen & Dengue IgM/IgG", reason: "Confirm acute arboviral Dengue infection." });
      nextTests.push({ name: "Serial Hematocrit & Platelet Monitoring (every 6h)", reason: "Monitor critical plasma leakage." });
    } else {
      nextTests.push({ name: "Peripheral Smear for Platelet Clumping", reason: "Rule out EDTA-dependent pseudothrombocytopenia." });
    }
  }

  // Populate Result Card
  const card = document.getElementById(cardId);
  if (!card) return;

  document.getElementById(titleId).textContent = verdict;
  document.getElementById(descId).textContent = explanation;

  const fList = document.getElementById(findingsId);
  fList.innerHTML = "";
  if (findings.length === 0) {
    fList.innerHTML = "<li>All parameters are within normal physiological range.</li>";
  } else {
    findings.forEach(f => {
      const li = document.createElement("li");
      li.textContent = f;
      fList.appendChild(li);
    });
  }

  const tList = document.getElementById(testsId);
  tList.innerHTML = "";
  if (nextTests.length === 0) {
    tList.innerHTML = "<p style='font-size:0.85rem; color:#64748b;'>No additional confirmatory tests indicated at this time.</p>";
  } else {
    nextTests.forEach((t, idx) => {
      const div = document.createElement("div");
      div.className = "next-test-item";
      div.innerHTML = `<strong>${idx + 1}. ${t.name}</strong><span>${t.reason}</span>`;
      tList.appendChild(div);
    });
  }

  card.classList.add("active");
  card.scrollIntoView({ behavior: "smooth" });
}

// ==========================================================================
// 5. 3D Slide Deck Presentation Module
// ==========================================================================
let currentSlide = 0;
const TOTAL_SLIDES = 5;

function initSlideDeck() {
  updateSlideView();

  const prevBtn = document.getElementById("slidePrev");
  const nextBtn = document.getElementById("slideNext");

  if (prevBtn) prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : TOTAL_SLIDES - 1;
    updateSlideView();
  });

  if (nextBtn) nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide < TOTAL_SLIDES - 1) ? currentSlide + 1 : 0;
    updateSlideView();
  });
}

function updateSlideView() {
  document.querySelectorAll(".slide-content").forEach((s, idx) => {
    if (idx === currentSlide) {
      s.classList.add("active");
    } else {
      s.classList.remove("active");
    }
  });

  const countEl = document.getElementById("slideCounter");
  if (countEl) countEl.textContent = `Slide ${currentSlide + 1} of ${TOTAL_SLIDES}`;
}
