/* CGC Labs: living ledger field.
   Sparse dot grid drifting on the paper background, hairline connections
   between near neighbors, three brick accent dots, gentle pointer repulsion.
   No dependencies. Static single frame under prefers-reduced-motion. */
(function () {
  "use strict";

  var canvas = document.querySelector(".bg-field");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  var CELL = 130;          // grid cell: one dot per cell, jittered
  var LINK = 120;          // max distance for a connective hairline
  var REPEL_R = 130;       // pointer influence radius
  var REPEL_MAX = 10;      // cap on pointer displacement
  var SPEED = 0.10;        // max drift speed, px per 60fps frame

  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;
  var dots = [];
  var raf = 0, last = 0;
  var pointer = { x: -9999, y: -9999 };

  var TONE = {
    ash: "rgba(184, 177, 162, 0.85)",   // Ash dot
    slate: "rgba(139, 133, 120, 0.6)",  // Slate dot
    brick: "rgba(139, 46, 31, 0.42)"    // Brick accent dot
  };

  function build() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    dots = [];
    var cols = Math.ceil(W / CELL);
    var rows = Math.ceil(H / CELL);
    var brickLeft = 3;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var isBrick = brickLeft > 0 && Math.random() < 0.05;
        if (isBrick) brickLeft--;
        dots.push({
          hx: c * CELL + CELL * (0.15 + Math.random() * 0.7),
          hy: r * CELL + CELL * (0.15 + Math.random() * 0.7),
          x: 0, y: 0,
          vx: (Math.random() - 0.5) * SPEED,
          vy: (Math.random() - 0.5) * SPEED,
          ox: 0, oy: 0,                       // eased pointer offset
          rad: isBrick ? 2.4 : 1.3 + Math.random() * 1.1,
          tone: isBrick ? "brick" : (Math.random() < 0.35 ? "slate" : "ash")
        });
      }
    }
    for (var i = 0; i < dots.length; i++) { dots[i].x = dots[i].hx; dots[i].y = dots[i].hy; }
  }

  function drawFrame(dt) {
    var step = dt ? Math.min(dt / 16.67, 3) : 1;
    var i, j, d;

    /* drift with wrap-around */
    for (i = 0; i < dots.length; i++) {
      d = dots[i];
      d.x += d.vx * step;
      d.y += d.vy * step;
      if (d.x < -20) d.x = W + 20; else if (d.x > W + 20) d.x = -20;
      if (d.y < -20) d.y = H + 20; else if (d.y > H + 20) d.y = -20;

      /* pointer repulsion target, eased */
      var tx = 0, ty = 0;
      if (finePointer) {
        var dx = d.x - pointer.x, dy = d.y - pointer.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0.001 && dist < REPEL_R) {
          var f = (1 - dist / REPEL_R) * REPEL_MAX;
          tx = (dx / dist) * f;
          ty = (dy / dist) * f;
        }
      }
      d.ox += (tx - d.ox) * 0.08 * step;
      d.oy += (ty - d.oy) * 0.08 * step;
    }

    ctx.clearRect(0, 0, W, H);

    /* hairline connections */
    ctx.lineWidth = 1;
    for (i = 0; i < dots.length; i++) {
      var a = dots[i];
      var ax = a.x + a.ox, ay = a.y + a.oy;
      for (j = i + 1; j < dots.length; j++) {
        var b = dots[j];
        var bx = b.x + b.ox, by = b.y + b.oy;
        var dx2 = ax - bx, dy2 = ay - by;
        var d2 = dx2 * dx2 + dy2 * dy2;
        if (d2 < LINK * LINK) {
          var alpha = (1 - Math.sqrt(d2) / LINK) * 0.35;
          ctx.strokeStyle = "rgba(139, 133, 120, " + alpha.toFixed(3) + ")";
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }
    }

    /* dots */
    for (i = 0; i < dots.length; i++) {
      d = dots[i];
      ctx.fillStyle = TONE[d.tone];
      ctx.beginPath();
      ctx.arc(d.x + d.ox, d.y + d.oy, d.rad, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function loop(now) {
    var dt = last ? now - last : 16.67;
    last = now;
    drawFrame(dt);
    raf = requestAnimationFrame(loop);
  }

  function start() {
    if (reduce) { drawFrame(0); return; }
    if (!raf) { last = 0; raf = requestAnimationFrame(loop); }
  }
  function stop() {
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  if (finePointer) {
    window.addEventListener("pointermove", function (e) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    }, { passive: true });
    document.documentElement.addEventListener("pointerleave", function () {
      pointer.x = -9999; pointer.y = -9999;
    });
  }

  var resizeTimer = 0;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { build(); if (reduce) drawFrame(0); }, 150);
  });

  build();
  start();
})();
