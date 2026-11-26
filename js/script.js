// data array
const destinations = [
  {
    name: "SALAWATI",
    desc: "Pulau eksotis dengan hutan tropis lebat dan keanekaragaman hayati bawah laut.",
    image: "assets/asset/salawatimain.png"
  },
  {
    name: "WAIGEO",
    desc: "Pulau terbesar di Raja Ampat, rumah bagi burung burung langka.",
    image: "assets/asset/waigeomain.png"
  },
  {
    name: "BATANTA",
    desc: "Terkenal dengan air terjun tersembunyi dan penginapan terapung di atas laut jernih.",
    image: "assets/asset/batantamain.png"
  },
  {
    name: "MISOOL",
    desc: "Gugusan pulau karang menakjubkan dengan laguna biru toska yang memanjakan mata.",
    image: "assets/asset/misoolmain.png"
  }
];

//nunjuk index ke berapa
let currentIndex = 1;

//kenalin ke js
const destTitle = document.getElementById("destTitle");
const destDesc = document.getElementById("destDesc");
const mainImage = document.getElementById("mainDestinationImage");
const mainName = document.getElementById("mainName");
const mainDots = document.getElementById("mainDots");
const cardsContainer = document.getElementById("cardsContainer");
const currentPage = document.getElementById("currentPage");
const totalPage = document.getElementById("totalPage");
const scrollTrack = document.getElementById("scrollTrack");
const scrollActive = document.getElementById("scrollActive");

if (destTitle) {
  //mempercantik angka, menambah angka 0 diawal dan maksud 2 disitu ada 2 digit angka
  totalPage.textContent = String(destinations.length).padStart(2, "0");

  function makeDots() {
    // bikin titik bulat di setiap foto
    let dotsHTML = "";
    for (let d = 0; d < 5; d++) {
      // 4 titik penuh 1 redup
      dotsHTML += `<span class="${d < 4 ? "filled" : ""}"></span>`;
    }
    return dotsHTML;
  }

  //bikin huruf kapitalnya cuma didepan kata
  function formatName(name) {
    return name.charAt(0) + name.slice(1).toLowerCase();
  }

  for (let i = 0; i < destinations.length; i++) {
    const dot = document.createElement("span");
    dot.className = "scroll-dot";
    dot.style.top = `${(i / (destinations.length - 1)) * 100}%`;
    scrollTrack.appendChild(dot);
  }

  //buat ganti slide
  function updateSlider() {
    const activeData = destinations[currentIndex];
    const activeName = formatName(activeData.name);

    // mengupdate judul dan deskripsi
    destTitle.textContent = activeData.name;
    destDesc.textContent = activeData.desc;

    mainImage.src = activeData.image;
    mainImage.alt = "Pulau " + activeName;
    mainName.textContent = activeName;
    mainDots.innerHTML = makeDots();

    // mengupdate indikator angka
    const slideNumber = currentIndex + 1;
    currentPage.textContent = String(slideNumber).padStart(2, "0");

    // menggeser posisi dot putih di kiri
    scrollActive.textContent = slideNumber;
    scrollActive.style.top = `${(currentIndex / (destinations.length - 1)) * 100}%`;

    // susun ulang kartu di kanan, supaya looping, infinity
    cardsContainer.innerHTML = "";
    for (let i = 1; i < destinations.length; i++) {
      const itemIndex = (currentIndex + i) % destinations.length;
      const item = destinations[itemIndex];

      const card = document.createElement("div");
      card.className = "card-item";

      // bikin gambar jadi punya sensor sentuh, exm: kalo di pencet gambarnya jadi gede
      card.addEventListener("click", () => {
        currentIndex = itemIndex;
        updateSlider();
      });

      const formattedName = formatName(item.name);

      //bikin elemen baru di html
      card.innerHTML = `
        <h3>${formattedName}</h3>
        <div class="card-dots">${makeDots()}</div>
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

  const scrollProgress = document.getElementById("scrollProgress");
  new IntersectionObserver(([entry]) => {
    scrollProgress.classList.toggle("hide", !entry.isIntersecting);
  }, { threshold: 0.4 }).observe(document.getElementById("home"));

  // manggil function
  updateSlider();
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

const nav = document.querySelector('nav');
const hamburger = document.querySelector('.hamburger');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    nav.querySelectorAll('ul a').forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            hamburger.setAttribute('aria-expanded', false);
        });
    });
}