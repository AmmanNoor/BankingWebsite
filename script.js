document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.textContent = document.head.appendChild(style);

  const nav = document.querySelector(".nav-container");
  const header = document.querySelector(".header");
  const stickyWatcher = () => {
    const threshold = (header?.offsetHeight || 120)* 0.15;
    if (window.scrollY > threshold) {
      nav?.classList.add("nav-elevated");
    } else {
      nav?.classList.remove("nav-elevated");
    }
  };
  stickyWatcher();
  window.addEventListener("scroll", stickyWatcher);

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const targetId = a.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });


  // Smooth scroll for Blog and Contact links
document.addEventListener("DOMContentLoaded", function () {
  const blogLink = document.querySelector('a[href="#blog"]');
  const contactLink = document.querySelector('a[href="#contact"]');

  const blogSection = document.getElementById("blog");
  const contactSection = document.getElementById("contact");

  function smoothScroll(target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  if (blogLink && blogSection) {
    blogLink.addEventListener("click", function (e) {
      e.preventDefault();
      smoothScroll(blogSection);
    });
  }

  if (contactLink && contactSection) {
    contactLink.addEventListener("click", function (e) {
      e.preventDefault();
      smoothScroll(contactSection);
    });
  }
});


document.querySelectorAll(".dropdown > a").forEach(link => {
  link.addEventListener("click", e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      link.parentElement.classList.toggle("open");
    }
  });
});

  const paras = document.querySelectorAll(".header .para");
  if (paras.length > 1) {
    let idx = 0;
    paras.forEach(p => p.classList.remove("active"));
    const cycle = () => {
      paras.forEach(p => p.classList.remove("active"));
      paras[idx].classList.add("active");
      idx = (idx + 1) % paras.length;
      setTimeout(cycle, 1500); 
    };
    cycle();
  } else if (paras.length === 1) {
    paras[0].classList.add("active");
  }

  const revealTargets = document.querySelectorAll(
    ".boxes, .container-1, .aboutus, .team, .Gallery, .work, .services, .reviews, .price, .Question-section, .loans, .blog, .contact, .footer"
  );
  revealTargets.forEach(el => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => io.observe(el));

  document.querySelectorAll(".question").forEach(q => {
    const header = q.querySelector("h4");
    header?.addEventListener("click", () => {
      q.parentElement?.querySelectorAll(".question.open").forEach(o => o !== q && o.classList.remove("open"));
      q.classList.toggle("open");
    });
  });

  const categories = ["Events", "Party", "Holiday"];
  const cards = document.querySelectorAll(".allpictures .gallerypictures");
  cards.forEach((card, i) => {
    if (!card.dataset.category) {
      card.dataset.category = categories[i % categories.length];
    }
  });

  const showAll = () => cards.forEach(c => (c.style.display = ""));
  const filterBy = (cat) => {
    cards.forEach(c => {
      c.style.display = (cat === "All" || c.dataset.category === cat) ? "" : "none";
    });
  };

  const allBtn = document.querySelector(".gallery-buttons .btn1"); // "All"
  allBtn?.addEventListener("click", () => filterBy("All"));

  document.querySelectorAll(".gallery-buttons .btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.textContent.trim();
      if (["Events", "Party", "Holiday"].includes(cat)) filterBy(cat);
    });
  });

  document.querySelectorAll('.button, .text a[href="#"], .services a[href="#"]').forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const services = document.querySelector(".services");
      services?.scrollIntoView({ behavior: "smooth" });
    });
  });

  document.querySelectorAll(".offers .buynow, .offers .buynow2").forEach(btn => {
    btn.addEventListener("click", () => {
      const tier = btn.closest(".offers")?.querySelector("h7")?.textContent?.trim() || "Selected";
      alert(`Thanks! ${tier} plan selected. (Demo)`);
    });
  });

  const sendBtn = document.querySelector(".Send");
  sendBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    const first = document.querySelector('.names .formname:nth-child(1) .input');
    const last  = document.querySelector('.names .formname:nth-child(2) .input');
    const email = document.querySelector(".formemail .emailinput");
    const subj  = document.querySelector(".Subject .subjectinput");
    const msg   = document.querySelector(".Message .messageinput");

    const errors = [];
    const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    if (!first?.value.trim()) errors.push("First name");
    if (!last?.value.trim())  errors.push("Last name");
    if (!email?.value.trim() || !isEmail(email.value)) errors.push("Valid email");
    if (!subj?.value.trim()) errors.push("Subject");
    if (!msg?.value.trim())  errors.push("Message");

    if (errors.length) {
      alert("Please provide: " + errors.join(", "));
    } else {
      alert("Message sent! (Demo)");
      [first, last, email, subj, msg].forEach(i => i && (i.value = ""));
    }
  });

  document.querySelector(".subscribebtn")?.addEventListener("click", () => {
    const inp = document.querySelector(".subscribeemail");
    if (inp && inp.value.trim()) {
      alert("Subscribed: " + inp.value + " (Demo)");
      inp.value = "";
    } else {
      alert("Please enter an email to subscribe.");
    }
  });

  document.querySelector(".submit")?.addEventListener("click", () => {
    const inp = document.querySelector(".email");
    if (inp && inp.value.trim()) {
      alert("Email submitted: " + inp.value + " (Demo)");
      inp.value = "";
    } else {
      alert("Please enter your email.");
    }
  });

  const sections = [
    ["#hero", document.querySelector(".header")],
    ["#services", document.querySelector(".services")],
    ["#blog", document.querySelector(".blog")],
    ["#contact", document.querySelector(".contact")]
  ].filter(([, el]) => !!el);

  const navLinks = Array.from(document.querySelectorAll(".navbar a"));
  const setActive = () => {
    const y = window.scrollY + 120; // offset for fixed nav
    let current = null;
    sections.forEach(([hash, el]) => {
      const top = el.offsetTop;
      if (y >= top) current = hash;
    });
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === current));
  };
  setActive();
  window.addEventListener("scroll", setActive);
});
