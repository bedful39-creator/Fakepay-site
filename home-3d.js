/* ============================================================
   PayMod — real Minecraft block textures, cube rigs, interactions
   Textures are real 16x16 PNG files embedded as data URIs:
   emerald, lapis, redstone, quartz, gold, and diamond blocks.
   No procedural / generated art.
   ============================================================ */

(function () {
  "use strict";

  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var TEX = {
    emerald_block: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAwUlEQVQ4T52R0Q2DQAxD2QKpYoEO0AEqdRJGqToES5QtGKNTVOovxSec+pJQIT6s3EXhOT6adrrNR3UaL3ODw/3zDLq+H1WF2ldfhB7UDecfwNPVJetVAFxY/RZ0VfcA4Ab/NlFnVMxuAvwW3KzEWbZgDREUwA/96gZY5gJAQXTdBaBzBeLDrdlDzSJkAAx75xTApkbgXWE2qxGMLo5bSgH6ePZwAIsww61ChD3OXoBVAM1qzry7Hn9xAYCGwxHh2y/m+kzA61j7uAAAAABJRU5ErkJggg==",
    lapis_block: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAJ1BMVEUmWas3Z5IxYYsrVo0gUJwdSpUgSooeQoUeQHwcOJAbNYgZNYQUMnFwYZSdAAAAfElEQVR42g2Jh2HEAAgD7yT8+w8cQ0xRLbPwgWnTtBN5zC+ZiL9u31w5IZ5XJhd6bAQs9fQs+5q1oCCyJUx53ohHC2TLaMA/Yy5X2/s4eLprrd5XE9GbMipLd9FtJ7dN0Fck3do3igBJRyjgiWzaOe9k5WOmeZrEd4LT8g+iCTMHWBFMGAAAAABJRU5ErkJggg==",
    redstone_block: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAElBMVEUAAABzDACUFACkGAi9IAjmIAgd4YarAAAAAXRSTlMAQObYZgAAAF9JREFUGBkFwYFhBCEABCFGL/1X/G6gPwDAZ5qRRge2x/aMg9d6b/PDEc86s3Ny77ZhuE+HV0C/cawNmObQCchyJDmJOPiZd01yr0hPrD6mJdI6am4syWdOakV8ggT4B9TJMj71DhNqAAAAAElFTkSuQmCC",
    quartz_block: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAElBMVEXy7+3u6ubu5t7q4tri3tDd2csPbMi3AAAAUUlEQVR42jXJsQGDABBFIZ7e/iP7U4WWAwA4heDDexLYUFcwIziGNGG3CSZw2PBgPGegAQ6JGTjJBsiZAYUdkMB3B2lrhhOZDXL1P2H3ehgQfiVEJE/bMmjpAAAAAElFTkSuQmCC",
    gold_block: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAG1BMVEX+/73//ZD/7E/+4Ej/2D71zCf5vSPTljLMjidMMDrkAAAAeklEQVR42hXLsRHCMBAEwPsf5dw5JxB0QAfMQAnUSStEhIALsF8iBj3D5msXKIz5Lp/rLmza3kueFuzrAkfOhnjRp6C4GhzNlE8dS4DxdcFhYK9oLloaMhxgYw642+jATcX42G/Gvw+X5hpuvTLE5nlQNq29TOycFOcf/6MxqUgMRiYAAAAASUVORK5CYII=",
    diamond_block: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAG1BMVEX////V//ae/utw+/Bl9eNL7eY94OUVwsYOur1j/GYQAAAAeklEQVR42hXLsRHCMBAEwPsf5dw5JxB0QAfMQAnUSStEhIALsF8iBj3D5msXKIz5Lp/rLmza3kueFuzrAkfOhnjRp6C4GhzNlE8dS4DxdcFhYK9oLloaMhxgYw642+jATcX42G/Gvw+X5hpuvTLE5nlQNq29TOycFOcf/6MxqUgMRiYAAAAASUVORK5CYII="
  };

  // real PNGs embedded as data URIs — no asset folder needed on the host
  function texPath(name) {
    return TEX[name] || "";
  }

  /* ----------------------------------------------------------
     Cube builder — every face of a block uses its real texture
     ---------------------------------------------------------- */

  var FACES = [
    { cls: "fr", base: "translateZ(HALFpx)" },
    { cls: "bk", base: "rotateY(180deg) translateZ(HALFpx)" },
    { cls: "rt", base: "rotateY(90deg) translateZ(HALFpx)" },
    { cls: "lf", base: "rotateY(-90deg) translateZ(HALFpx)" },
    { cls: "up", base: "rotateX(90deg) translateZ(HALFpx)" },
    { cls: "dn", base: "rotateX(-90deg) translateZ(HALFpx)" }
  ];

  function buildCube(el) {
    var size = parseFloat(el.dataset.size || "154");
    var kind = el.dataset.tex || "emerald";
    var half = size / 2;
    var texName = kind + "_block";
    el.style.width = size + "px";
    el.style.height = size + "px";
    el.innerHTML = "";
    FACES.forEach(function (f) {
      var i = document.createElement("i");
      i.className = f.cls;
      i.style.transform = f.base.replace("HALF", half);
      i.style.backgroundImage = 'url("' + texPath(texName) + '")';
      el.appendChild(i);
    });
    el._rx = parseFloat(el.dataset.rx || "-16");
    el._ry = parseFloat(el.dataset.ry || "30");
    el._phase = Math.random() * Math.PI * 2;
    return el;
  }

  var cubes = [];

  function registerCubes(root) {
    (root || document).querySelectorAll(".h3-cube").forEach(function (el) {
      if (el.dataset.tex) buildCube(el);
      cubes.push(el);
    });
  }

  /* ----------------------------------------------------------
     Orbit rig (closing CTA)
     ---------------------------------------------------------- */

  var arms = [];

  function buildOrbit() {
    var orbit = document.querySelector(".h3-orbit");
    if (!orbit) return;
    var kinds = ["emerald", "gold", "lapis", "diamond", "redstone", "quartz"];
    var count = kinds.length;
    kinds.forEach(function (kind, idx) {
      var arm = document.createElement("div");
      arm.className = "h3-arm";
      var cube = document.createElement("div");
      cube.className = "h3-cube";
      cube.dataset.tex = kind;
      cube.dataset.size = "66";
      arm.appendChild(cube);
      orbit.appendChild(arm);
      buildCube(cube);
      cubes.push(cube);
      arms.push({
        el: arm,
        cube: cube,
        angle: (360 / count) * idx,
        radius: 140,
        offset: idx * 1.1
      });
    });
  }

  /* ----------------------------------------------------------
     Animation loop
     ---------------------------------------------------------- */

  var heroStage = document.getElementById("h3-hero-stage");
  var pointer = { x: 0, y: 0 };
  var pointerTarget = { x: 0, y: 0 };

  if (heroStage) {
    heroStage.addEventListener("pointermove", function (e) {
      var r = heroStage.getBoundingClientRect();
      pointerTarget.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointerTarget.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    });
    heroStage.addEventListener("pointerleave", function () {
      pointerTarget.x = 0;
      pointerTarget.y = 0;
    });
  }

  function animate(t) {
    var time = t / 1000;

    pointer.x += (pointerTarget.x - pointer.x) * 0.06;
    pointer.y += (pointerTarget.y - pointer.y) * 0.06;

    cubes.forEach(function (cube) {
      var rx = cube._rx || -16;
      var ry = cube._ry || 30;
      var phase = cube._phase || 0;
      var bob = Math.sin(time * 0.9 + phase) * 6;
      var wobX = Math.sin(time * 0.55 + phase) * 5;
      var wobY = Math.cos(time * 0.42 + phase) * 8;

      if (cube.closest(".h3-hero-stage")) {
        ry += pointer.x * 22;
        rx += -pointer.y * 16;
      }

      cube.style.transform =
        "translateY(" + bob.toFixed(2) + "px) rotateX(" +
        (rx + wobX).toFixed(2) + "deg) rotateY(" +
        (ry + time * 6 + wobY).toFixed(2) + "deg)";
    });

    arms.forEach(function (arm) {
      var a = arm.angle + time * 14;
      var lift = Math.sin(time * 0.8 + arm.offset) * 14;
      arm.el.style.transform =
        "rotateY(" + a.toFixed(2) + "deg) translateZ(" + arm.radius + "px) translateY(" +
        lift.toFixed(2) + "px)";
    });

    requestAnimationFrame(animate);
  }

  /* ----------------------------------------------------------
     Loader
     ---------------------------------------------------------- */

  function hideLoader() {
    var loader = document.getElementById("rp-loader");
    if (loader) loader.classList.add("done");
  }

  /* ----------------------------------------------------------
     Smooth scroll
     ---------------------------------------------------------- */

  function smoothScrollTo(sel, e) {
    if (e) e.preventDefault();
    var el = document.querySelector(sel);
    if (!el) return;
    el.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" });
  }
  window.smoothScrollTo = smoothScrollTo;

  document.querySelectorAll("[data-scroll]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      smoothScrollTo(a.getAttribute("href"), e);
    });
  });

  document.querySelectorAll("[data-scroll-href]").forEach(function (el) {
    var go = function () { smoothScrollTo(el.dataset.scrollHref); };
    el.addEventListener("click", go);
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
    });
  });

  /* ----------------------------------------------------------
     FAQ — one panel open at a time
     ---------------------------------------------------------- */

  var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ----------------------------------------------------------
     Checkout toast (demo — no real checkout)
     ---------------------------------------------------------- */

  var toast = document.getElementById("rp-toast");
  var toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 3400);
  }

  // direct download — let the browser fetch the .jar, just confirm with a toast
  document.querySelectorAll("[data-download]").forEach(function (el) {
    el.addEventListener("click", function () {
      showToast("FakePay-V4.1.jar incoming — check your downloads folder 😉");
    });
  });

  /* ----------------------------------------------------------
     Numeric tween — time-based so it completes even when
     timers are throttled; instant under reduced motion
     ---------------------------------------------------------- */

  function tweenNumber(el, from, to, dur, fmt) {
    if (el._tween) { clearInterval(el._tween); el._tween = null; }
    var after = function () { if (el._afterTick) el._afterTick(); };
    if (REDUCED) { el.textContent = fmt(to); after(); return; }
    var start = Date.now();
    el._tween = setInterval(function () {
      var p = Math.min(1, (Date.now() - start) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(from + (to - from) * e));
      after();
      if (p >= 1) { clearInterval(el._tween); el._tween = null; }
    }, 40);
  }

  function money(n) {
    return "$" + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function commas(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /* ----------------------------------------------------------
     Hero chips count up once
     ---------------------------------------------------------- */

  document.querySelectorAll(".h3-chips b").forEach(function (b) {
    var raw = b.textContent.trim();
    if (!/^\d/.test(raw)) return;
    var suffix = raw.replace(/^[\d,]+/, "");
    var target = parseInt(raw.replace(/\D/g, ""), 10);
    if (!target || REDUCED) return;
    tweenNumber(b, 0, target, 1400, function (v) { return commas(v) + suffix; });
  });

  /* ----------------------------------------------------------
     Wallet spoof demo (module 01)
     ---------------------------------------------------------- */

  var walletAmount = document.getElementById("wallet-amount");
  var walletBadge = document.getElementById("wallet-badge");
  var REAL_BALANCE = 4109;

  // shrink the amount so long numbers ($1,000,000,000) never spill
  // outside the demo panel
  function fitAmount() {
    if (!walletAmount) return;
    walletAmount.style.fontSize = "";
    if (walletAmount.scrollWidth <= walletAmount.clientWidth) return;
    var base = parseFloat(getComputedStyle(walletAmount).fontSize);
    var size = Math.max(15, Math.floor(base * walletAmount.clientWidth / walletAmount.scrollWidth));
    walletAmount.style.fontSize = size + "px";
    if (walletAmount.scrollWidth > walletAmount.clientWidth) {
      walletAmount.style.fontSize = Math.max(14, size - 2) + "px";
    }
  }

  if (walletAmount) {
    walletAmount._afterTick = fitAmount;
    fitAmount();
  }

  function walletGo(to, dur, fake) {
    if (!walletAmount) return;
    var from = parseInt(walletAmount.textContent.replace(/\D/g, ""), 10) || 0;
    tweenNumber(walletAmount, from, to, dur, money);
    if (walletBadge) {
      walletBadge.textContent = fake ? "Fake" : "Real";
      walletBadge.classList.toggle("off", !fake);
    }
  }

  document.querySelectorAll("[data-wallet-set]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      walletGo(parseInt(btn.dataset.walletSet, 10), 1100, true);
    });
  });

  var walletReset = document.querySelector("[data-wallet-reset]");
  if (walletReset) {
    walletReset.addEventListener("click", function () { walletGo(REAL_BALANCE, 700, false); });
  }

  /* ----------------------------------------------------------
     Stat override demo (module 02)
     ---------------------------------------------------------- */

  var statsOn = true;
  var statsBadge = document.getElementById("stats-badge");
  var statsToggle = document.getElementById("stats-toggle");

  if (statsToggle) {
    statsToggle.addEventListener("click", function () {
      statsOn = !statsOn;
      if (statsBadge) {
        statsBadge.textContent = statsOn ? "Override on" : "Override off";
        statsBadge.classList.toggle("off", !statsOn);
      }
      document.querySelectorAll("#stats-list b").forEach(function (b) {
        var next = statsOn ? b.dataset.on : b.dataset.off;
        var cur = b.textContent;
        var bothNumeric = /^\d[\d,]*$/.test(cur) && /^\d[\d,]*$/.test(next);
        if (bothNumeric && !REDUCED) {
          var from = parseInt(cur.replace(/\D/g, ""), 10) || 0;
          var to = parseInt(next.replace(/\D/g, ""), 10) || 0;
          tweenNumber(b, from, to, 650, function (v) {
            return next.replace(/[\d,]+/, commas(v));
          });
        } else {
          b.classList.add("flip");
          setTimeout(function () {
            b.textContent = next;
            b.classList.remove("flip");
          }, REDUCED ? 0 : 180);
        }
      });
    });
  }

  /* ----------------------------------------------------------
     Fake /pay demo (module 03)
     ---------------------------------------------------------- */

  var payGo = document.getElementById("pay-go");
  var payReceipt = document.getElementById("pay-receipt");

  if (payGo && payReceipt) {
    payGo.addEventListener("click", function () {
      var whoEl = document.getElementById("pay-who");
      var amtEl = document.getElementById("pay-amt");
      var who = ((whoEl && whoEl.value) || "").trim().slice(0, 24) || "someone";
      var amt = parseInt(((amtEl && amtEl.value) || "").replace(/\D/g, ""), 10) || 0;
      payReceipt.textContent = "";
      var a = document.createElement("b");
      a.textContent = money(amt);
      var w = document.createElement("b");
      w.textContent = who;
      payReceipt.appendChild(document.createTextNode("You paid "));
      payReceipt.appendChild(a);
      payReceipt.appendChild(document.createTextNode(" to "));
      payReceipt.appendChild(w);
      payReceipt.appendChild(document.createTextNode(" — visual only, 0 packets sent."));
      payReceipt.classList.remove("show");
      void payReceipt.offsetWidth; // restart the pop animation
      payReceipt.classList.add("show");
    });
  }

  /* ----------------------------------------------------------
     Scroll reveal (with failsafe so content never stays hidden)
     ---------------------------------------------------------- */

  var revealEls = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  function revealAll() {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  if (REDUCED || !("IntersectionObserver" in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
    setTimeout(revealAll, 6000); // failsafe
  }

  /* ----------------------------------------------------------
     Boot
     ---------------------------------------------------------- */

  // footer logo uses the real emerald block texture
  var logo = document.querySelector(".logo-box");
  if (logo) logo.style.backgroundImage = 'url("' + texPath("emerald_block") + '")';

  registerCubes(document);
  buildOrbit();

  /* ----------------------------------------------------------
     Drag-to-rotate every cube (must run after cubes exist)
     ---------------------------------------------------------- */

  cubes.forEach(function (cube) {
    cube.style.touchAction = "none";
    cube.addEventListener("pointerdown", function (e) {
      cube._drag = { x: e.clientX, y: e.clientY, rx: cube._rx, ry: cube._ry };
      cube.classList.add("dragging");
      try { cube.setPointerCapture(e.pointerId); } catch (err) { /* synthetic events */ }
    });
    cube.addEventListener("pointermove", function (e) {
      var d = cube._drag;
      if (!d) return;
      var dx = e.clientX - d.x;
      var dy = e.clientY - d.y;
      cube._ry = d.ry + dx * 0.6;
      cube._rx = Math.max(-80, Math.min(80, d.rx - dy * 0.6));
      cube.style.transform =
        "rotateX(" + cube._rx.toFixed(2) + "deg) rotateY(" + cube._ry.toFixed(2) + "deg)";
    });
    ["pointerup", "pointercancel"].forEach(function (ev) {
      cube.addEventListener(ev, function () {
        cube._drag = null;
        cube.classList.remove("dragging");
      });
    });
  });

  if (REDUCED) {
    // static poses, no rAF loop
    cubes.forEach(function (cube) {
      cube.style.transform = "rotateX(" + (cube._rx || -16) + "deg) rotateY(" + (cube._ry || 30) + "deg)";
    });
    arms.forEach(function (arm) {
      arm.el.style.transform = "rotateY(" + arm.angle + "deg) translateZ(" + arm.radius + "px)";
    });
  } else {
    requestAnimationFrame(animate);
  }

  if (document.readyState === "complete") {
    setTimeout(hideLoader, 350);
  } else {
    window.addEventListener("load", function () { setTimeout(hideLoader, 350); });
  }
  setTimeout(hideLoader, 2500); // failsafe
})();
