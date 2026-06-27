// API.js
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwiwnwP-nacNg2Y2lWzrZ5PcgUqfR-dKyQ8rlSc0jOgAF_pN-O2ErL-XGjZ-2kZn00O/exec";

async function callAppsScriptAPI(action, data = {}) {
  try {
    const payload = { action, ...data };
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain", // Menghindari preflight CORS
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("Jaringan bermasalah.");
    return await response.json();
  } catch (error) {
    console.error(`API Error pada aksi [${action}]:`, error);
    // Fallback UI handler agar web tidak freeze saat error terjadi
    if (typeof showSccToast === "function") {
      showSccToast("Gagal terhubung ke Cloud Database Server.", "error");
    }
    throw error;
  }
}

// Global engine bridge untuk menggantikan google.script.run
window.safeGoogleRun = {
  handlers: { success: () => {}, failure: () => {} },
  
  withSuccessHandler: function(callback) {
    this.handlers.success = callback;
    return this;
  },
  withFailureHandler: function(callback) {
    this.handlers.failure = callback;
    return this;
  },

  // mapping otomatis semua engine fungsi backend ke API.js
  cekKaryawan: async function(noPolisi) {
    const res = await callAppsScriptAPI("cekKaryawan", { noPolisi });
    this.handlers.success(res);
  },
  liveCekKendaraanKeluar: async function(noPolisi) {
    const res = await callAppsScriptAPI("liveCekKendaraanKeluar", { noPolisi });
    this.handlers.success(res);
  },
  getKaryawanData: async function() {
    const res = await callAppsScriptAPI("getKaryawanData");
    this.handlers.success(res);
  },
  tambahKaryawan: async function(noPolisi, nama, divisi, jenis, foto) {
    const res = await callAppsScriptAPI("tambahKaryawan", { noPolisi, nama, divisi, jenis, foto });
    this.handlers.success(res);
  },
  cariKaryawanByNopol: async function(noPolisi) {
    const res = await callAppsScriptAPI("cariKaryawanByNopol", { noPolisi });
    this.handlers.success(res);
  },
  hapusKaryawanServer: async function(noPolisi) {
    const res = await callAppsScriptAPI("hapusKaryawanServer", { noPolisi });
    this.handlers.success(res);
  },
  getPetugasData: async function() {
    const res = await callAppsScriptAPI("getPetugasData");
    this.handlers.success(res);
  },
  editPetugasServer: async function(oldEmail, nama, email, password, fotoBase64) {
    const res = await callAppsScriptAPI("editPetugasServer", { oldEmail, nama, email, password, fotoBase64 });
    this.handlers.success(res);
  },
  hapusPetugasServer: async function(email) {
    const res = await callAppsScriptAPI("hapusPetugasServer", { email });
    this.handlers.success(res);
  },
  registerUser: async function(nama, email, password, fotoBase64) {
    const res = await callAppsScriptAPI("registerUser", { nama, email, password, fotoBase64 });
    this.handlers.success(res);
  },
  kendaraanMasuk: async function(noPolisi, jenis, kategori, urlFoto) {
    const res = await callAppsScriptAPI("kendaraanMasuk", { noPolisi, jenis, kategori, urlFoto });
    this.handlers.success(res);
  },
  kendaraanKeluar: async function(noPolisi, urlFotoKeluar) {
    const res = await callAppsScriptAPI("kendaraanKeluar", { noPolisi, urlFotoKeluar });
    this.handlers.success(res);
  },
  getDashboardData: async function() {
    const res = await callAppsScriptAPI("getDashboardData");
    this.handlers.success(res);
  },
  updateUserProfile: async function(email, nama, fotoBase64) {
    const res = await callAppsScriptAPI("updateUserProfile", { email, nama, fotoBase64 });
    this.handlers.success(res);
  },
  loginUser: async function(email, password) {
    const res = await callAppsScriptAPI("loginUser", { email, password });
    this.handlers.success(res);
  },
  tambahDataDarurat: async function(nama, telp, jabatan, status) {
    const res = await callAppsScriptAPI("tambahDataDarurat", { nama, telp, jabatan, status });
    this.handlers.success(res);
  }
};