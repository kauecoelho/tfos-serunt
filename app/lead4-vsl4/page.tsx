"use client";

import React, { useEffect, useRef } from "react";
import Script from "next/script";
import { SLIDES, type Part, type Slide } from "./slides-data";

declare global {
  interface Window {
    Reveal: any;
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   LASER POINTER — desenha o cursor caneta estilo Apple Pencil sobre o canvas
   Tip em (x, y) · corpo inclinado ~35° para cima-direita
───────────────────────────────────────────────────────────────────────────── */
function drawPencilCursor(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();

  // Translada para a posição do cursor (ponta da caneta = hotspot)
  ctx.translate(x, y);
  // Rotaciona: +35° → corpo sobe para a DIREITA (caneta inclinada para a direita)
  ctx.rotate((35 * Math.PI) / 180);

  const tipH  = 7;   // triângulo da ponta (grafite escuro)
  const bandH = 2;   // faixa metálica entre ponta e corpo
  const bodyH = 20;  // corpo principal (prata/branco)
  const capH  = 3;   // tampa traseira
  const w     = 5;   // largura do corpo

  // ── Sombra (dá profundidade ao cursor) ──────────────────────────────────
  ctx.shadowColor   = "rgba(0, 0, 0, 0.38)";
  ctx.shadowBlur    = 5;
  ctx.shadowOffsetX = -1.5; // sombra cai para a esquerda (luz vindo da direita)
  ctx.shadowOffsetY =  1.5;

  // ── Ponta: triângulo grafite escuro ─────────────────────────────────────
  ctx.beginPath();
  ctx.moveTo(0, 0);               // ponta exata (hotspot)
  ctx.lineTo(-w / 2, -tipH);
  ctx.lineTo( w / 2, -tipH);
  ctx.closePath();
  ctx.fillStyle = "#1C1C2E";
  ctx.fill();

  ctx.shadowColor = "transparent"; // desativa sombra para o resto

  // ── Faixa metálica ───────────────────────────────────────────────────────
  ctx.fillStyle = "#9B9BA8";
  ctx.fillRect(-w / 2, -tipH - bandH, w, bandH);

  // ── Corpo principal (branco-prata) ───────────────────────────────────────
  ctx.fillStyle   = "#EAEAEE";
  ctx.strokeStyle = "#C4C4CC";
  ctx.lineWidth   = 0.6;
  ctx.fillRect(-w / 2, -tipH - bandH - bodyH, w, bodyH);
  ctx.strokeRect(-w / 2, -tipH - bandH - bodyH, w, bodyH);

  // ── Reflexo lateral (simula superfície brilhante) ────────────────────────
  ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
  ctx.fillRect(-w / 2 + 1, -tipH - bandH - bodyH + 2, 1.5, bodyH - 4);

  // ── Tampa traseira ───────────────────────────────────────────────────────
  ctx.fillStyle = "#B0B0BC";
  ctx.fillRect(-w / 2, -tipH - bandH - bodyH - capH, w, capH);

  ctx.restore();
}

/* ─────────────────────────────────────────────────────────────────────────────
   RENDER HELPERS — funções puras, fora do componente para máxima performance
───────────────────────────────────────────────────────────────────────────── */

/** Mapeia um array de Part para spans coloridos + texto inline. */
function renderParts(parts: Part[]): React.ReactNode {
  return parts.map((part, i) =>
    part.color ? (
      <span key={i} className={`c-${part.color}`}>{part.text}</span>
    ) : (
      <React.Fragment key={i}>{part.text}</React.Fragment>
    )
  );
}

/** Renderiza uma section completa baseada nos dados do slide. */
function renderSlide(slide: Slide): React.ReactNode {
  const {
    id,
    variant = "phrase",
    parts = [],
    logos = [],
    tableTitle,
    tableHeader,
    tableRows = [],
    label,
    cycleItems = [],
  } = slide;

  const labelEl = label ? (
    <div className="slide-label">{label}</div>
  ) : null;

  switch (variant) {

    /* ── Fundo vermelho · fonte grande · impacto máximo ─────────────────── */
    case "red-impact":
      return (
        <section key={id} className="s-red-impact">
          {labelEl}
          <p className="st st-impact">{renderParts(parts)}</p>
        </section>
      );

    /* ── Fundo azul-escuro · texto claro · virada emocional ─────────────── */
    case "dark":
      return (
        <section key={id} className="s-dark">
          {labelEl}
          <p className="st">{renderParts(parts)}</p>
        </section>
      );

    /* ── Pílulas com nomes de empresas ──────────────────────────────────── */
    case "list-logos":
      return (
        <section key={id}>
          {labelEl}
          <div className="logo-grid">
            {logos.map((name, i) => (
              <span key={i} className="logo-pill">{name}</span>
            ))}
          </div>
        </section>
      );

    /* ── Tabela de dados ─────────────────────────────────────────────────── */
    case "table":
      return (
        <section key={id} className="s-table">
          {labelEl}
          {tableTitle && <p className="tbl-title">{tableTitle}</p>}
          <div className="tbl-wrap">
            <table>
              {tableHeader && (
                <thead>
                  <tr>
                    {tableHeader.map((h, i) => <th key={i}>{h}</th>)}
                  </tr>
                </thead>
              )}
              <tbody>
                {tableRows.map((row, i) => (
                  <tr key={i}>
                    {row.cells.map((cell, j) => <td key={j}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );

    /* ── Dividido: texto à esquerda + placeholder de print à direita ─────── */
    case "split":
      return (
        <section key={id} className="s-split">
          {labelEl}
          <div className="split-left">
            <p className="st">{renderParts(parts)}</p>
          </div>
          <div className="split-right">
            <span className="img-icon">📱</span>
            <span>Print WhatsApp</span>
            <span>1080 × 1920</span>
          </div>
        </section>
      );

    /* ── Fundo verde · fonte grande · impacto positivo ───────────────────── */
    case "green-impact":
      return (
        <section key={id} className="s-green-impact">
          {labelEl}
          <p className="st st-impact">{renderParts(parts)}</p>
        </section>
      );

    /* ── Placeholder fullscreen de imagem ────────────────────────────────── */
    case "image":
      return (
        <section key={id} className="s-image">
          {labelEl}
          <div className="img-full-placeholder">
            <span className="img-icon">🖼️</span>
            <span>Imagem / Print</span>
            <span>1920 × 1080</span>
          </div>
        </section>
      );

    /* ── Fluxograma B→E→T→A ──────────────────────────────────────────────── */
    case "cycle":
      return (
        <section key={id} className="s-cycle">
          {labelEl}
          <div className="cycle-flow">
            {cycleItems.map((item, i) => (
              <React.Fragment key={i}>
                <div className="cycle-box">
                  <div className="cycle-letter">{item.letter}</div>
                  <div className="cycle-name">{item.name}</div>
                  <div className="cycle-desc">{item.description}</div>
                </div>
                {i < cycleItems.length - 1 && (
                  <div className="cycle-arrow">→</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>
      );

    /* ── Frase padrão (phrase) ───────────────────────────────────────────── */
    default:
      return (
        <section key={id}>
          {labelEl}
          <p className="st">{renderParts(parts)}</p>
        </section>
      );
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENTE PRINCIPAL
───────────────────────────────────────────────────────────────────────────── */
export default function PauloBastos() {
  // ── Reveal ─────────────────────────────────────────────────────────────
  const initialized = useRef(false);

  // ── Laser ──────────────────────────────────────────────────────────────
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const laserOn      = useRef(false);   // toggle: L liga / L desliga
  const rightDown    = useRef(false);   // botão direito do mouse pressionado
  const mouse        = useRef({ x: 0, y: 0 });
  const points       = useRef<Array<{ x: number; y: number; t: number }>>([]);
  const rafId        = useRef(0);

  /* ── Progresso ──────────────────────────────────────────────────────── */
  function updateProgress() {
    if (typeof window === "undefined" || !window.Reveal?.isReady?.()) return;
    const indices = window.Reveal.getIndices();
    const total   = window.Reveal.getTotalSlides();
    if (!total) return;
    const fill = document.getElementById("pb-fill");
    if (fill) fill.style.width = `${((indices.h + 1) / total) * 100}%`;
  }

  /* ── Reveal init ────────────────────────────────────────────────────── */
  function initReveal() {
    if (typeof window === "undefined" || !window.Reveal || initialized.current) return;
    initialized.current = true;

    window.Reveal.initialize({
      hash:                 true,
      transition:           "fade",
      transitionSpeed:      "default",
      backgroundTransition: "none",
      progress:             false,
      controls:             false,
      center:               false,
      slideNumber:          "c/t",
      width:                "100%",
      height:               "100%",
      margin:               0,
      minScale:             1,
      maxScale:             1,
      touch:                true,
      // Reveal.js usa 'l' (keyCode 76) como atalho VIM → próximo slide.
      // Desativamos para não conflitar com o toggle do laser pointer.
      keyboard: { 76: null },
    });

    window.Reveal.on("ready",        updateProgress);
    window.Reveal.on("slidechanged", () => {
      updateProgress();
      points.current = []; // limpa o rastro ao trocar de slide
    });
  }

  /* ── Lifecycle: Reveal ──────────────────────────────────────────────── */
  useEffect(() => {
    if (typeof window !== "undefined" && window.Reveal) initReveal();
    return () => {
      if (typeof window !== "undefined" && initialized.current) {
        try { window.Reveal?.destroy?.(); } catch (_) { /* noop */ }
      }
      initialized.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Lifecycle: Laser Pointer ───────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dimensiona o canvas para cobrir o viewport inteiro
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Toggle via tecla L (press = liga, press novamente = desliga) ──
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "l" || e.key === "L") && !e.repeat) {
        laserOn.current = !laserOn.current;
        if (laserOn.current) {
          document.body.style.cursor = "none";
        } else {
          rightDown.current       = false;
          points.current          = [];
          document.body.style.cursor = "";
        }
      }
    };

    // Segurança: desativa se a janela perder foco
    const onBlur = () => {
      if (!laserOn.current) return;
      laserOn.current         = false;
      rightDown.current       = false;
      points.current          = [];
      document.body.style.cursor = "";
    };

    // ── Botão esquerdo: clicar e segurar para riscar ──────────────────
    const onMouseDown = (e: MouseEvent) => {
      if (!laserOn.current || e.button !== 0) return;
      rightDown.current = true;
      points.current.push({ x: e.clientX, y: e.clientY, t: Date.now() });
    };
    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 0) rightDown.current = false;
    };
    // Previne menu de contexto acidental quando laser está ativo
    const onContextMenu = (e: MouseEvent) => {
      if (laserOn.current) e.preventDefault();
    };

    // ── Rastreamento do mouse ──────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // Só adiciona pontos ao rastro quando botão direito está pressionado
      if (laserOn.current && rightDown.current) {
        points.current.push({ x: e.clientX, y: e.clientY, t: Date.now() });
      }
    };

    // ── Touch (mobile/tablet) ─────────────────────────────────────────
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      laserOn.current = true;
      document.body.style.cursor = "none";
      const t = e.touches[0];
      mouse.current = { x: t.clientX, y: t.clientY };
      points.current.push({ x: t.clientX, y: t.clientY, t: Date.now() });
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!laserOn.current || !e.touches.length) return;
      e.preventDefault(); // evita scroll da página durante o traçado
      const t = e.touches[0];
      mouse.current = { x: t.clientX, y: t.clientY };
      points.current.push({ x: t.clientX, y: t.clientY, t: Date.now() });
    };
    const onTouchEnd = () => {
      laserOn.current     = false;
      points.current      = [];
      document.body.style.cursor = "";
    };

    // ── RAF: loop de renderização ─────────────────────────────────────
    const FADE_MS = 1200;

    const loop = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) { rafId.current = requestAnimationFrame(loop); return; }

      const now = Date.now();

      // Remove pontos mais velhos que FADE_MS
      points.current = points.current.filter(p => now - p.t < FADE_MS);

      // Limpa o frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Desenha o rastro (cauda de cometa) ──────────────────────────
      const pts = points.current;
      if (pts.length > 1) {
        for (let i = 1; i < pts.length; i++) {
          const p0 = pts[i - 1];
          const p1 = pts[i];

          // opacity: 0.9 quando fresco → 0 quando expira
          const age     = now - p1.t;
          const opacity = Math.max(0, 1 - age / FADE_MS) * 0.9;

          // Gradiente de cor ao longo do rastro: #FF4500 → #FF6B00
          // (mais velho = vermelho, mais novo = laranja)
          const progress = i / pts.length;           // 0 = início, 1 = fim
          const g = Math.round(69 + (107 - 69) * progress); // canal G: 69→107

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = `rgb(255, ${g}, 0)`;
          ctx.lineWidth   = 6;
          ctx.lineCap     = "round";
          ctx.lineJoin    = "round";
          ctx.globalAlpha = opacity;
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // ── Desenha o cursor caneta na posição atual do mouse ────────────
      if (laserOn.current) {
        drawPencilCursor(ctx, mouse.current.x, mouse.current.y);
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    // ── Registra todos os listeners ───────────────────────────────────
    window.addEventListener("keydown",      onKeyDown);
    window.addEventListener("blur",         onBlur);
    window.addEventListener("mousedown",    onMouseDown);
    window.addEventListener("mouseup",      onMouseUp);
    window.addEventListener("contextmenu",  onContextMenu);
    window.addEventListener("mousemove",    onMouseMove);
    window.addEventListener("touchstart",   onTouchStart, { passive: true });
    window.addEventListener("touchmove",    onTouchMove,  { passive: false });
    window.addEventListener("touchend",     onTouchEnd);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("keydown",     onKeyDown);
      window.removeEventListener("blur",        onBlur);
      window.removeEventListener("mousedown",   onMouseDown);
      window.removeEventListener("mouseup",     onMouseUp);
      window.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("mousemove",   onMouseMove);
      window.removeEventListener("touchstart",  onTouchStart);
      window.removeEventListener("touchmove",   onTouchMove);
      window.removeEventListener("touchend",    onTouchEnd);
      window.removeEventListener("resize",      resize);
      document.body.style.cursor = "";
    };
  }, []);

  /* ── Render ─────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── Fontes e CSS externo ──────────────────────────────────────── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/reveal.js@4.6.1/dist/reveal.css"
      />

      {/* ── Estilos globais ───────────────────────────────────────────── */}
      <style>{`

        :root {
          --bg:     #F7F6F3;
          --text:   #1A1A2E;
          --red:    #E63946;
          --orange: #F4A261;
          --teal:   #2A9D8F;
          --yellow: #FFD700;
          --card:   #FFFFFF;
          --border: #E8E5DE;
          --muted:  rgba(26, 26, 46, 0.45);
        }

        html, body {
          margin:     0 !important;
          padding:    0 !important;
          width:      100%;
          height:     100%;
          overflow:   hidden;
          background: var(--bg) !important;
        }

        .reveal {
          font-family: 'Open Sans', sans-serif !important;
          background:  var(--bg)   !important;
          color:       var(--text) !important;
        }

        .reveal .slides { text-align: center; }

        .reveal section {
          padding:         5vw 12vw !important;
          box-sizing:      border-box !important;
          display:         flex !important;
          flex-direction:  column !important;
          justify-content: center !important;
          align-items:     center !important;
          text-align:      center !important;
          height:          100% !important;
          background:      var(--bg)   !important;
          color:           var(--text) !important;
        }

        .reveal .progress { display: none !important; }

        .reveal .slide-number {
          font-family:    'Open Sans', sans-serif !important;
          font-size:      11px !important;
          font-weight:    400 !important;
          letter-spacing: 0.06em;
          color:          var(--muted) !important;
          background:     transparent !important;
          bottom:         28px !important;
          right:          36px !important;
          padding:        0 !important;
        }
        .reveal .slide-number-delimiter { margin: 0 3px; }

        /* Barra de progresso customizada */
        #pb-track {
          position:       fixed;
          top: 0; left: 0;
          width:          100%;
          height:         2px;
          background:     rgba(26, 26, 46, 0.07);
          z-index:        10000;
          pointer-events: none;
        }
        #pb-fill {
          height:     100%;
          width:      0%;
          background: var(--text);
          transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Canvas do laser — overlay fixo, não bloqueia eventos do Reveal */
        #laser-canvas {
          position:       fixed;
          top:            0;
          left:           0;
          width:          100vw;
          height:         100vh;
          z-index:        9998;
          pointer-events: none;
        }

        /* Texto único para todos os slides de frase */
        .st {
          font-family:    'Open Sans', sans-serif;
          font-weight:    700;
          font-size:      clamp(1.9rem, 3.8vw, 3.4rem);
          line-height:    1.25;
          letter-spacing: -0.015em;
          color:          var(--text);
          margin:         0;
          max-width:      85%;
        }

        /* Utilitários de cor */
        .c-red    { color: var(--red)    !important; }
        .c-orange { color: var(--orange) !important; }
        .c-teal   { color: var(--teal)   !important; }
        .c-yellow { color: var(--yellow) !important; }

        /* Componentes para slides especiais (tabelas / comparações) */
        .card {
          background:    var(--card);
          border:        1px solid var(--border);
          border-radius: 12px;
          box-shadow:    0 4px 24px rgba(26, 26, 46, 0.07);
          padding:       24px 32px;
        }
        .tbl-wrap {
          border-radius: 12px;
          overflow:      hidden;
          box-shadow:    0 4px 20px rgba(26, 26, 46, 0.08);
          width:         100%;
        }
        .tbl-wrap table {
          width:           100%;
          border-collapse: collapse;
          font-family:     'Open Sans', sans-serif;
          font-size:       clamp(0.85rem, 1.4vw, 1rem);
        }
        .tbl-wrap thead th {
          padding:     16px 24px;
          font-weight: 600;
          text-align:  left;
          background:  var(--text);
          color:       #fff;
        }
        .tbl-wrap tbody tr:nth-child(odd)  { background: #fff; }
        .tbl-wrap tbody tr:nth-child(even) { background: var(--bg); }
        .tbl-wrap tbody td {
          padding:     16px 24px;
          font-weight: 400;
          text-align:  left;
          color:       var(--text);
        }
        .gap-sm { margin-top: 1.5vh; }
        .gap-md { margin-top: 3vh;   }
        .gap-lg { margin-top: 5vh;   }

        /* ── Variante: Red Impact ──────────────────────────────────────── */
        /* Precisamos superar ".reveal section { background: var(--bg) !important }" */
        .reveal section.s-red-impact {
          background: var(--red) !important;
        }
        .reveal section.s-red-impact .st {
          color: #fff !important;
        }
        /* Fonte maior e mais pesada para slides de impacto máximo */
        .st-impact {
          font-size:      clamp(2.4rem, 5.5vw, 5.2rem) !important;
          font-weight:    800 !important;
          line-height:    1.1  !important;
          letter-spacing: -0.025em !important;
        }

        /* ── Variante: Dark ────────────────────────────────────────────── */
        .reveal section.s-dark {
          background: #1A1A2E !important;
        }
        .reveal section.s-dark .st {
          color: #F0EFEC !important;
        }
        /* Versões mais claras para legibilidade em fundo escuro */
        .reveal section.s-dark .c-teal { color: #5DD6C8 !important; }
        .reveal section.s-dark .c-red  { color: #FF6B6B !important; }

        /* ── Variante: List Logos ──────────────────────────────────────── */
        .logo-grid {
          display:         flex;
          flex-wrap:       wrap;
          gap:             18px;
          justify-content: center;
          align-items:     center;
          max-width:       78%;
        }
        .logo-pill {
          font-family:    'Open Sans', sans-serif;
          font-size:      clamp(0.95rem, 1.8vw, 1.25rem);
          font-weight:    600;
          color:          var(--text);
          background:     #fff;
          border:         1.5px solid var(--border);
          border-radius:  999px;
          padding:        10px 28px;
          box-shadow:     0 2px 14px rgba(26, 26, 46, 0.09);
          white-space:    nowrap;
          letter-spacing: -0.01em;
        }

        /* ── Variante: Table ───────────────────────────────────────────── */
        .s-table {
          padding: 4vh 7vw !important;
          gap:     2vh;
        }
        .tbl-title {
          font-family:    'Open Sans', sans-serif;
          font-size:      clamp(1.1rem, 2.2vw, 1.65rem);
          font-weight:    700;
          color:          var(--text);
          letter-spacing: -0.015em;
          margin:         0 0 2.5vh;
        }
        /* Sobrescreve alinhamento para tabelas: coluna 1 negrito */
        .tbl-wrap tbody td:first-child {
          font-weight: 700;
          color:       var(--text);
        }

        /* ── Label de pilar (B / E / T / A) ──────────────────────────────── */
        .reveal .slides section { position: relative; }
        .slide-label {
          position:       absolute;
          top:            3vh;
          left:           4vw;
          background:     var(--teal);
          color:          #fff;
          padding:        5px 20px;
          border-radius:  999px;
          font-size:      0.7rem;
          font-weight:    700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          z-index:        10;
          pointer-events: none;
        }
        .reveal section.s-dark .slide-label {
          background: rgba(255, 255, 255, 0.14);
          color:      #F0EFEC;
        }
        .reveal section.s-red-impact .slide-label {
          background: rgba(255, 255, 255, 0.2);
          color:      #fff;
        }

        /* ── Variante: Split (texto + placeholder wpp) ────────────────────── */
        .reveal section.s-split {
          flex-direction:  row      !important;
          padding:         3vh 5vw  !important;
          gap:             5vw;
          align-items:     center;
          justify-content: center;
          text-align:      left;
        }
        .split-left {
          flex:       1;
          text-align: left;
        }
        .split-left .st {
          font-size:   clamp(0.95rem, 1.75vw, 1.55rem) !important;
          line-height: 1.7  !important;
          text-align:  left !important;
          max-width:   100% !important;
        }
        .split-right {
          flex:            0 0 auto;
          width:           calc(58vh * 9 / 16);
          height:          58vh;
          background:      #EDECEA;
          border:          2px dashed #C8C4BC;
          border-radius:   18px;
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          justify-content: center;
          color:           #A09C96;
          font-size:       0.72rem;
          font-weight:     600;
          text-align:      center;
          gap:             10px;
          letter-spacing:  0.07em;
          text-transform:  uppercase;
        }
        .split-right .img-icon {
          font-size: 1.9rem;
          opacity:   0.4;
        }

        /* ── Coluna de destaque (última coluna das tabelas) ───────────────────── */
        .tbl-wrap tbody td:last-child {
          font-weight: 700;
          color:       var(--teal);
        }

        /* ── Variante: Green Impact ──────────────────────────────────────────── */
        .reveal section.s-green-impact {
          background: var(--teal) !important;
        }
        .reveal section.s-green-impact .st {
          color: #fff !important;
        }
        .reveal section.s-green-impact .c-teal {
          color: #fff !important;
        }
        .reveal section.s-green-impact .slide-label {
          background: rgba(255, 255, 255, 0.2);
          color:      #fff;
        }

        /* ── Variante: Image (placeholder fullscreen) ────────────────────────── */
        .reveal section.s-image {
          padding: 0 !important;
        }
        .img-full-placeholder {
          width:           100%;
          height:          100%;
          background:      #EDECEA;
          border:          3px dashed #C8C4BC;
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          justify-content: center;
          color:           #A09C96;
          font-size:       0.85rem;
          font-weight:     600;
          gap:             14px;
          letter-spacing:  0.08em;
          text-transform:  uppercase;
        }
        .img-full-placeholder .img-icon {
          font-size: 3.2rem;
          opacity:   0.4;
        }

        /* ── Variante: Cycle (fluxograma B→E→T→A) ───────────────────────────── */
        .reveal section.s-cycle {
          padding: 4vh 5vw !important;
        }
        .cycle-flow {
          display:         flex;
          flex-direction:  row;
          align-items:     stretch;
          justify-content: center;
          gap:             0;
          width:           100%;
        }
        .cycle-box {
          flex:            1;
          background:      #fff;
          border:          1.5px solid var(--border);
          border-radius:   16px;
          padding:         28px 18px;
          display:         flex;
          flex-direction:  column;
          align-items:     center;
          text-align:      center;
          gap:             10px;
          box-shadow:      0 2px 16px rgba(26, 26, 46, 0.07);
        }
        .cycle-letter {
          width:           52px;
          height:          52px;
          border-radius:   50%;
          background:      var(--teal);
          color:           #fff;
          font-size:       1.5rem;
          font-weight:     800;
          display:         flex;
          align-items:     center;
          justify-content: center;
          letter-spacing:  -0.02em;
        }
        .cycle-name {
          font-size:      clamp(0.9rem, 1.5vw, 1.15rem);
          font-weight:    700;
          color:          var(--text);
          letter-spacing: -0.01em;
        }
        .cycle-desc {
          font-size:   clamp(0.7rem, 1.1vw, 0.85rem);
          font-weight: 400;
          color:       var(--muted);
          line-height: 1.5;
        }
        .cycle-arrow {
          font-size:   2rem;
          color:       var(--teal);
          padding:     0 14px;
          flex-shrink: 0;
          align-self:  center;
          opacity:     0.7;
        }

      `}</style>

      {/* ── Reveal.js ─────────────────────────────────────────────────── */}
      <Script
        src="https://cdn.jsdelivr.net/npm/reveal.js@4.6.1/dist/reveal.js"
        strategy="afterInteractive"
        onLoad={initReveal}
      />

      {/* ── Barra de progresso ────────────────────────────────────────── */}
      <div id="pb-track"><div id="pb-fill" /></div>

      {/* ── Canvas do Laser Pointer ───────────────────────────────────── */}
      <canvas id="laser-canvas" ref={canvasRef} />

      {/* ════════════════════════════════════════════════════════════════
          APRESENTAÇÃO — renderizada a partir de slides-data.ts
          Edite slides-data.ts para alterar o conteúdo sem tocar aqui.
      ════════════════════════════════════════════════════════════════ */}
      <div className="reveal">
        <div className="slides">
          {SLIDES.map((s) => renderSlide(s))}
        </div>
      </div>
    </>
  );
}
