// data array
const destinations = [
  {
    name: "SALAWATI",
    desc: "Pulau eksotis dengan hutan tropis lebat dan keanekaragaman hayati bawah laut.",
    image: "assets/asset/salawatimain"
  },
  {
    name: "WAIGEO",
    desc: "Pulau terbesar di Raja Ampat, rumah bagi burung burung langka.",
    image: "assets/asset/waigeomain"
  },
  {
    name: "BATANTA",
    desc: "Terkenal dengan air terjun tersembunyi dan penginapan terapung di atas laut jernih.",
    image: "assets/asset/batantamain"
  },
  {
    name: "MISOOL",
    desc: "Gugusan pulau karang menakjubkan dengan laguna biru toska yang memanjakan mata.",
    image: "assets/asset/misoolmain"
  }
];

//nunjuk index ke berapa
let currentIndex = 1; 

//kenalin ke js
const destTitle = document.getElementById("destTitle");
const destDesc = document.getElementById("destDesc");
const cardsContainer = document.getElementById("cardsContainer");
const leftNumber = document.getElementById("leftNumber");
const currentPage = document.getElementById("currentPage");
const totalPage = document.getElementById("totalPage");

//mempercantik angka, menambah angka 0 diawal dan maksud 2 disitu ada 2 digit angka
totalPage.textContent = String(destinations.length).padStart(2, "0");

//buat ganti slide
function updateSlider() {
  const activeData = destinations[currentIndex];

  // mengupdate judul dan deskripsi
  destTitle.textContent = activeData.name;
  destDesc.textContent = activeData.desc;

  // mengupdate indikator angka
  const slideNumber = currentIndex + 1;
  leftNumber.textContent = slideNumber;
  currentPage.textContent = String(slideNumber).padStart(2, "0");

  // menggeser posisi dot putih di kiri
  const maxTop = 86; // Batas bawah persentase garis
  const progressPercent = (currentIndex / (destinations.length - 1)) * maxTop;
  leftNumber.style.top = `${progressPercent}%`;

  // susun ulang kartu di kanan, supaya looping, infinity
  cardsContainer.innerHTML = "";
  for (let i = 0; i < destinations.length; i++) {
    const itemIndex = (currentIndex + i) % destinations.length;
    const item = destinations[itemIndex];

    const card = document.createElement("div");
    card.className = `card-item ${i === 0 ? "active" : ""}`;

    // bikin gambar jadi punya sensor sentuh, exm: kalo di pencet gambarnya jadi gede
    card.addEventListener("click", () => {
      currentIndex = itemIndex;
      updateSlider();
    });

    // bikin titik bulat di setiap foto
    let dotsHTML = "";
    for (let d = 0; d < 5; d++) {
      // 4 titik penuh 1 redup
      dotsHTML += `<span class="${d < 4 ? "filled" : ""}"></span>`;
    }

    //bikin huruf kapitalnya cuma didepan kata
    const formattedName = item.name.charAt(0) + item.name.slice(1).toLowerCase();

    //bikin elemen baru di html
    card.innerHTML = `
      <h3>${formattedName}</h3>
      <div class="card-dots">${dotsHTML}</div>
      <img src="${item.image}" alt="${formattedName}">
    `;

    //masukin kartu yang udh dimodif ke variabel card
    cardsContainer.appendChild(card);
  }
}

// tombol next
document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % destinations.length;
  updateSlider();
});

// tombol sebelum
document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + destinations.length) % destinations.length;
  updateSlider();
});

// manggil function
updateSlider();
