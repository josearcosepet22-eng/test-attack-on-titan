/**
 * Attack on Titan (Shingeki no Kyojin) - Lógica de la Aplicación
 * Manejo de estado, navegación de preguntas, cálculo de afinidad y renderizado de resultados.
 */

import { CHARACTERS } from './data/characters.js';
import { QUESTIONS } from './data/questions.js';
import heroImg from './assets/images/snk_quiz_hero_1792430580367.jpg';

class SnkQuizApp {
  constructor() {
    this.currentStep = 'WELCOME'; // 'WELCOME' | 'QUIZ' | 'RESULT'
    this.currentIndex = 0;
    this.answers = []; // Array de { questionId, optionIndex, scores }
    this.soundEnabled = true;
    this.audioCtx = null;
    this.selectedModalCharacter = null;

    // Elementos del DOM
    this.appRoot = document.getElementById('app-root');
    this.soundToggleBtn = document.getElementById('sound-toggle-btn');
    this.soundIcon = document.getElementById('sound-icon');

    this.initAudioContext();
    this.initEventListeners();
    this.render();
  }

  initAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch {
      this.soundEnabled = false;
    }
  }

  ensureAudioResumed() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.08) {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      this.ensureAudioResumed();
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // Ignorar restricciones del navegador si no ha habido interacción previa
    }
  }

  playSelectSound() {
    this.playTone(520, 'triangle', 0.12, 0.05);
  }

  playStartSound() {
    this.playTone(330, 'sine', 0.2, 0.06);
    setTimeout(() => this.playTone(493.88, 'triangle', 0.35, 0.07), 100);
  }

  playVictorySound() {
    if (!this.soundEnabled || !this.audioCtx) return;
    const notes = [392, 523.25, 659.25, 783.99]; // Acorde heroico en Sol mayor
    notes.forEach((note, idx) => {
      setTimeout(() => this.playTone(note, 'triangle', 0.35, 0.06), idx * 110);
    });
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.updateSoundIcon();
  }

  updateSoundIcon() {
    if (!this.soundIcon) return;
    if (this.soundEnabled) {
      this.soundIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
        <span class="text-xs text-slate-300 font-medium">Sonido: ON</span>
      `;
    } else {
      this.soundIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
        <span class="text-xs text-slate-400 font-medium">Sonido: OFF</span>
      `;
    }
  }

  initEventListeners() {
    if (this.soundToggleBtn) {
      this.soundToggleBtn.addEventListener('click', () => this.toggleSound());
    }

    // Atajos de teclado para opciones (1-4 y A-D) y Escape para modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.selectedModalCharacter) {
        this.closeCharacterModal();
        return;
      }

      if (this.currentStep !== 'QUIZ') return;
      const key = e.key.toUpperCase();
      let selectedIdx = -1;
      if (['A', '1'].includes(key)) selectedIdx = 0;
      if (['B', '2'].includes(key)) selectedIdx = 1;
      if (['C', '3'].includes(key)) selectedIdx = 2;
      if (['D', '4'].includes(key)) selectedIdx = 3;

      if (selectedIdx !== -1) {
        this.selectOption(selectedIdx);
      }
    });
  }

  startQuiz() {
    this.playStartSound();
    this.currentStep = 'QUIZ';
    this.currentIndex = 0;
    this.answers = [];
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectOption(optionIndex) {
    this.playSelectSound();
    const currentQ = QUESTIONS[this.currentIndex];
    const selectedOption = currentQ.options[optionIndex];

    this.answers[this.currentIndex] = {
      questionId: currentQ.id,
      optionIndex,
      scores: selectedOption.scores
    };

    setTimeout(() => {
      if (this.currentIndex < QUESTIONS.length - 1) {
        this.currentIndex++;
        this.render();
      } else {
        this.finishQuiz();
      }
    }, 180);
  }

  previousQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.render();
    }
  }

  finishQuiz() {
    this.currentStep = 'RESULT';
    this.playVictorySound();
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  restartQuiz() {
    this.currentStep = 'WELCOME';
    this.currentIndex = 0;
    this.answers = [];
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openCharacterModal(charId) {
    const char = CHARACTERS.find(c => c.id === charId);
    if (!char) return;
    this.selectedModalCharacter = char;
    this.renderModal();
  }

  closeCharacterModal() {
    this.selectedModalCharacter = null;
    const modalEl = document.getElementById('character-modal');
    if (modalEl) {
      modalEl.remove();
    }
  }

  calculateAffinities() {
    const scores = {};
    CHARACTERS.forEach(char => {
      scores[char.id] = 0;
    });

    this.answers.forEach(ans => {
      if (!ans || !ans.scores) return;
      Object.entries(ans.scores).forEach(([charId, val]) => {
        if (scores[charId] !== undefined) {
          scores[charId] += val;
        }
      });
    });

    const maxScore = Math.max(...Object.values(scores), 1);

    const sortedList = CHARACTERS.map(char => {
      const raw = scores[char.id] || 0;
      const percentage = Math.min(98, Math.max(22, Math.round((raw / maxScore) * 94) + 4));
      return {
        character: char,
        rawScore: raw,
        percentage
      };
    }).sort((a, b) => b.rawScore - a.rawScore);

    return {
      top: sortedList[0],
      runnerUps: sortedList.slice(1, 4),
      all: sortedList
    };
  }

  render() {
    if (!this.appRoot) return;

    if (this.currentStep === 'WELCOME') {
      this.appRoot.innerHTML = this.renderWelcomeScreen();
      this.bindWelcomeEvents();
    } else if (this.currentStep === 'QUIZ') {
      this.appRoot.innerHTML = this.renderQuizScreen();
      this.bindQuizEvents();
    } else if (this.currentStep === 'RESULT') {
      const affinities = this.calculateAffinities();
      this.appRoot.innerHTML = this.renderResultScreen(affinities);
      this.bindResultEvents(affinities);
    }
  }

  /* ------------------- PANTALLA 1: BIENVENIDA ------------------- */
  renderWelcomeScreen() {
    const heroBg = heroImg || '/images/hero.jpg';

    return `
      <div class="max-w-6xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
        <!-- Hero Card con imagen de fondo cinematográfica -->
        <div class="relative overflow-hidden rounded-2xl snk-card border border-amber-500/30 mb-12">
          <div class="relative h-72 sm:h-96 md:h-[420px] w-full overflow-hidden">
            <img 
              src="${heroBg}" 
              onerror="this.onerror=null; this.src='/images/hero.jpg';"
              alt="Cuerpo de Exploración - Alas de la Libertad" 
              class="w-full h-full object-cover object-center filter brightness-90 contrast-110"
              loading="eager"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/65 to-transparent"></div>
            
            <div class="absolute top-6 left-6 flex items-center gap-2">
              <span class="text-xs uppercase tracking-widest text-amber-400 font-semibold font-cinzel">
                División Militar · Paradis
              </span>
            </div>
          </div>

          <!-- Contenido central de presentación -->
          <div class="p-6 sm:p-10 -mt-20 sm:-mt-24 relative z-10 text-center">
            <h1 class="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4 text-balance">
              ¿Qué personaje de <span class="text-gold-gradient">Attack on Titan</span> sos?
            </h1>
            
            <p class="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
              Enfrenta 10 situaciones críticas de combate, dilemas morales y decisiones tácticas dentro y fuera de las Murallas para revelar tu afinidad psicológica militar.
            </p>

            <!-- Datos técnicos del test -->
            <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-400 mb-8 border-y border-amber-500/20 py-3 max-w-xl mx-auto">
              <span>10 Preguntas Tácticas</span>
              <span aria-hidden="true" class="text-amber-500/50">·</span>
              <span>8 Perfiles de Soldados</span>
              <span aria-hidden="true" class="text-amber-500/50">·</span>
              <span>Cálculo Multidimensional</span>
              <span aria-hidden="true" class="text-amber-500/50">·</span>
              <span>3 Minutos</span>
            </div>

            <!-- Botón de acción principal -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                id="btn-start-quiz" 
                class="w-full sm:w-auto px-10 py-4 rounded-xl font-cinzel font-bold text-base sm:text-lg btn-primary tracking-wider flex items-center justify-center gap-3 group cursor-pointer shadow-xl shadow-green-950/40"
              >
                <span>Entregar mi Corazón (Comenzar)</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Galería Destacada de Personajes (Imágenes Grandes y Visibles) -->
        <div class="mt-8">
          <div class="flex items-center justify-between mb-6 pb-2 border-b border-amber-500/20">
            <div>
              <h2 class="font-cinzel text-xl sm:text-2xl font-bold text-white">
                Personajes Analizables en la Evaluación
              </h2>
              <p class="text-xs sm:text-sm text-slate-400 mt-1">
                Haz clic en cualquier tarjeta para ver su biografía, lema y estilo de combate
              </p>
            </div>
            <span class="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
              8 SOLDADOS
            </span>
          </div>

          <!-- Cuadrícula con imágenes grandes y claras de cada personaje -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            ${CHARACTERS.map(c => `
              <div 
                class="character-card group snk-card rounded-xl overflow-hidden border border-slate-700 hover:border-amber-500/70 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col"
                data-char-id="${c.id}"
                tabindex="0"
                role="button"
                aria-label="Ver perfil de ${c.name}"
              >
                <!-- Contenedor del retrato -->
                <div class="relative aspect-square w-full bg-slate-900 overflow-hidden">
                  <img 
                    src="${c.image}" 
                    onerror="this.onerror=null; this.src='${c.fallbackImage}';"
                    alt="${c.name} - Retrato oficial" 
                    class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 filter brightness-95 contrast-105"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#151b23] via-transparent to-transparent opacity-80"></div>
                  
                  <!-- Kanji japonés sutil en esquina superior -->
                  <div class="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-amber-300 font-cinzel">
                    ${c.japaneseName}
                  </div>
                </div>

                <!-- Info inferior -->
                <div class="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-[#151b23]">
                  <div>
                    <h3 class="font-cinzel font-bold text-sm sm:text-base text-white group-hover:text-amber-400 transition-colors">
                      ${c.name}
                    </h3>
                    <p class="text-xs text-amber-500/90 font-medium truncate mt-0.5">
                      ${c.title}
                    </p>
                  </div>
                  <div class="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span class="truncate max-w-[130px]">${c.division.split('·')[0].trim()}</span>
                    <span class="text-amber-400 group-hover:translate-x-0.5 transition-transform">Ver ficha →</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  bindWelcomeEvents() {
    const startBtn = document.getElementById('btn-start-quiz');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startQuiz());
    }

    const charCards = document.querySelectorAll('.character-card');
    charCards.forEach(card => {
      const id = card.getAttribute('data-char-id');
      card.addEventListener('click', () => this.openCharacterModal(id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openCharacterModal(id);
        }
      });
    });
  }

  /* ------------------- PANTALLA 2: PREGUNTAS ------------------- */
  renderQuizScreen() {
    const q = QUESTIONS[this.currentIndex];
    const total = QUESTIONS.length;
    const progressPercent = Math.round(((this.currentIndex + 1) / total) * 100);
    const existingAnswer = this.answers[this.currentIndex];

    return `
      <div class="max-w-3xl mx-auto px-4 py-6 md:py-10 animate-fade-in">
        <!-- Barra de progreso e indicador de fase -->
        <div class="mb-6">
          <div class="flex items-center justify-between text-xs sm:text-sm text-slate-400 mb-2">
            <span class="font-cinzel tracking-wider text-amber-400 font-bold">
              PREGUNTA ${String(this.currentIndex + 1).padStart(2, '0')} DE ${String(total).padStart(2, '0')}
            </span>
            <span class="text-slate-400 font-mono tabular-nums">${progressPercent}% COMPLETADO</span>
          </div>
          <div class="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700/60">
            <div class="progress-bar-fill h-full rounded-full" style="width: ${progressPercent}%;"></div>
          </div>
        </div>

        <!-- Tarjeta de la pregunta -->
        <div class="snk-card rounded-2xl p-6 sm:p-8 md:p-10 border border-amber-500/25 relative overflow-hidden">
          <!-- Categoría táctica -->
          <div class="flex items-center gap-2 mb-4">
            <span class="text-xs uppercase tracking-wider text-emerald-400 font-semibold font-cinzel">
              ${q.category}
            </span>
          </div>

          <!-- Texto de la pregunta -->
          <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight leading-snug mb-8 font-cinzel text-balance">
            ${q.question}
          </h2>

          <!-- Opciones interactivas -->
          <div class="space-y-3.5">
            ${q.options.map((opt, idx) => {
              const isSelected = existingAnswer && existingAnswer.optionIndex === idx;
              return `
                <div 
                  class="option-card snk-card snk-card-interactive p-4 sm:p-5 rounded-xl flex items-start gap-3.5 sm:gap-4 ${isSelected ? 'snk-card-selected' : ''}" 
                  data-index="${idx}"
                  tabindex="0"
                  role="button"
                  aria-pressed="${isSelected}"
                >
                  <div class="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 font-cinzel font-bold text-sm text-amber-400 shadow-inner">
                    ${opt.letter}
                  </div>
                  <div class="flex-1 text-left">
                    <p class="text-slate-200 text-sm sm:text-base leading-relaxed">
                      ${opt.text}
                    </p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Pie de navegación (atrás y atajo) -->
          <div class="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <div>
              ${this.currentIndex > 0 ? `
                <button 
                  id="btn-prev-question" 
                  class="btn-secondary px-3.5 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                  <span>Anterior</span>
                </button>
              ` : '<span></span>'}
            </div>
            <span class="hidden sm:inline-block">Atajos: Teclas 1 a 4 o A a D</span>
          </div>
        </div>
      </div>
    `;
  }

  bindQuizEvents() {
    const cards = document.querySelectorAll('.option-card');
    cards.forEach(card => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      card.addEventListener('click', () => this.selectOption(idx));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectOption(idx);
        }
      });
    });

    const prevBtn = document.getElementById('btn-prev-question');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previousQuestion());
    }
  }

  /* ------------------- PANTALLA 3: RESULTADOS ------------------- */
  renderResultScreen(affinities) {
    const top = affinities.top.character;
    const topPercentage = affinities.top.percentage;

    return `
      <div class="max-w-4xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
        <!-- Encabezado militar -->
        <div class="text-center mb-8">
          <span class="text-xs uppercase tracking-widest text-amber-400 font-bold font-cinzel">
            INFORME DE EVALUACIÓN MILITAR
          </span>
          <h1 class="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-white mt-2 mb-3">
            Sos compatible con <span class="text-gold-gradient">${top.name}</span>
          </h1>
          <p class="text-slate-400 text-sm max-w-lg mx-auto">
            Basado en tus 10 respuestas ante dilemas morales, espíritu de lucha y estrategia táctica.
          </p>
        </div>

        <!-- Tarjeta Principal del Personaje (Imagen Gigante en Alta Definición) -->
        <div class="snk-card rounded-2xl overflow-hidden border border-amber-500/40 mb-10 shadow-2xl shadow-black/80">
          <div class="grid grid-cols-1 md:grid-cols-12 items-stretch">
            <!-- Retrato de personaje en alta resolución -->
            <div class="md:col-span-5 relative bg-slate-950 overflow-hidden flex items-center justify-center min-h-[360px] md:min-h-full">
              <img 
                src="${top.image}" 
                onerror="this.onerror=null; this.src='${top.fallbackImage}';"
                alt="Retrato oficial de ${top.name}" 
                class="w-full h-full object-cover object-top filter brightness-95 contrast-105"
                loading="eager"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#151b23] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#151b23]"></div>
              
              <!-- Badge de afinidad -->
              <div class="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-amber-500/50 shadow-lg">
                <span class="font-mono tabular-nums text-xl font-bold text-amber-400">${topPercentage}%</span>
                <span class="text-xs text-slate-300 ml-1.5 font-medium">afinidad</span>
              </div>
            </div>

            <!-- Detalles del soldado -->
            <div class="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-[#151b23]">
              <div>
                <div class="flex items-center justify-between gap-4 mb-2">
                  <h2 class="font-cinzel text-2xl sm:text-3xl font-black text-white">
                    ${top.name}
                  </h2>
                  <span class="text-base text-slate-400 font-cinzel">
                    ${top.japaneseName}
                  </span>
                </div>

                <p class="text-amber-400 font-medium text-sm mb-1">
                  ${top.title}
                </p>
                <p class="text-xs text-slate-400 mb-6">
                  ${top.division}
                </p>

                <blockquote class="italic text-slate-200 text-sm sm:text-base border-l-2 border-amber-500/80 pl-4 py-2 my-4 bg-amber-500/5 rounded-r">
                  ${top.quote}
                </blockquote>

                <p class="text-slate-300 text-sm sm:text-base leading-relaxed mt-4 mb-6">
                  ${top.description}
                </p>

                <div class="mb-4">
                  <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Rasgos distintivos
                  </span>
                  <div class="flex flex-wrap gap-2 text-xs text-slate-300">
                    ${top.traits.map(trait => `
                      <span class="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 font-medium">
                        ${trait}
                      </span>
                    `).join('')}
                  </div>
                </div>

                <div class="pt-4 border-t border-slate-800 text-xs text-slate-400">
                  <span class="font-semibold text-slate-300">Estilo de combate:</span> ${top.combatStyle}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desglose de afinidad con TODOS los personajes y sus fotos -->
        <div class="snk-card rounded-2xl p-6 sm:p-8 border border-slate-800 mb-10">
          <h3 class="font-cinzel text-lg sm:text-xl font-bold text-white mb-2">
            Tu Afinidad con los 8 Soldados del Escuadrón
          </h3>
          <p class="text-xs sm:text-sm text-slate-400 mb-6">
            Puntuación calculada en base a las tácticas y valores expresados en tus respuestas:
          </p>

          <div class="space-y-4">
            ${affinities.all.map((item, idx) => `
              <div class="flex items-center gap-3.5 p-2 rounded-xl hover:bg-slate-800/40 transition-colors">
                <!-- Miniatura del personaje con imagen real -->
                <img 
                  src="${item.character.image}" 
                  onerror="this.onerror=null; this.src='${item.character.fallbackImage}';"
                  alt="${item.character.name}"
                  class="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0" 
                  loading="lazy"
                />

                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between text-xs sm:text-sm mb-1.5">
                    <span class="font-medium text-slate-200 truncate">
                      <span class="text-slate-500 font-mono text-xs mr-1.5">#${idx + 1}</span>
                      <span class="font-semibold">${item.character.name}</span>
                      <span class="text-slate-400 text-xs hidden sm:inline-block ml-1.5">(${item.character.title})</span>
                    </span>
                    <span class="font-mono tabular-nums text-slate-300 font-bold ml-2">${item.percentage}%</span>
                  </div>
                  <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/50">
                    <div 
                      class="h-full rounded-full transition-all duration-500" 
                      style="width: ${item.percentage}%; background-color: ${idx === 0 ? '#c69234' : '#1d7344'};"
                    ></div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Botones de Acción -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button 
            id="btn-restart-quiz" 
            class="w-full sm:w-auto px-6 py-3.5 rounded-xl font-cinzel font-bold text-sm btn-primary cursor-pointer flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
            <span>Realizar el Test Nuevamente</span>
          </button>

          <button 
            id="btn-copy-result" 
            class="w-full sm:w-auto px-5 py-3.5 rounded-xl text-sm btn-secondary cursor-pointer flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            <span id="copy-btn-text">Copiar Resultado</span>
          </button>

          <a 
            id="share-x-link" 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="w-full sm:w-auto px-5 py-3.5 rounded-xl text-sm btn-secondary cursor-pointer flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span>Compartir en X</span>
          </a>

          <a 
            id="share-wa-link" 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="w-full sm:w-auto px-5 py-3.5 rounded-xl text-sm btn-secondary cursor-pointer flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4 fill-current text-emerald-400" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.966.541 1.782.88 2.792.88 3.183 0 5.768-2.587 5.768-5.766.001-3.187-2.575-5.77-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.107.005.25.002.368.28.144.341.491 1.198.535 1.285.044.087.073.189.014.305-.058.116-.087.189-.174.289-.087.101-.184.226-.263.303-.09.088-.184.184-.079.365.105.181.467.77 1.002 1.246.689.614 1.269.805 1.45.892.181.087.289.073.397-.052.108-.124.462-.536.586-.72.124-.184.248-.154.417-.091.17.063 1.077.507 1.262.6.185.093.308.139.353.217.045.078.045.452-.099.857z"/>
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    `;
  }

  renderModal() {
    if (!this.selectedModalCharacter) return;
    const c = this.selectedModalCharacter;

    // Remover modal previo si existe
    const existing = document.getElementById('character-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'character-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in';
    modal.innerHTML = `
      <div class="relative w-full max-w-2xl bg-[#151b23] border border-amber-500/50 rounded-2xl overflow-hidden shadow-2xl">
        <!-- Botón de cierre -->
        <button 
          id="btn-close-modal" 
          aria-label="Cerrar modal"
          class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/70 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
        >
          ✕
        </button>

        <div class="grid grid-cols-1 sm:grid-cols-12">
          <!-- Retrato grande del personaje en el modal -->
          <div class="sm:col-span-5 relative bg-slate-950 aspect-square sm:aspect-auto">
            <img 
              src="${c.image}" 
              onerror="this.onerror=null; this.src='${c.fallbackImage}';"
              alt="${c.name}" 
              class="w-full h-full object-cover object-top"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#151b23] via-transparent to-transparent sm:hidden"></div>
          </div>

          <div class="sm:col-span-7 p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-1">
                <h3 class="font-cinzel text-2xl font-bold text-white">${c.name}</h3>
                <span class="text-sm text-slate-400 font-cinzel">${c.japaneseName}</span>
              </div>
              <p class="text-xs text-amber-400 font-semibold mb-1">${c.title}</p>
              <p class="text-xs text-slate-400 mb-4">${c.division}</p>

              <blockquote class="italic text-xs text-slate-200 border-l-2 border-amber-500 pl-3 py-1 bg-amber-500/10 mb-4">
                ${c.quote}
              </blockquote>

              <p class="text-xs text-slate-300 leading-relaxed mb-4">
                ${c.description}
              </p>

              <div class="mb-4">
                <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Rasgos Clave</span>
                <div class="flex flex-wrap gap-1.5 text-xs text-slate-300">
                  ${c.traits.map(t => `<span class="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px]">${t}</span>`).join('')}
                </div>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-800 text-xs text-slate-400">
              <span class="font-semibold text-slate-300">Estilo:</span> ${c.combatStyle}
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = document.getElementById('btn-close-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeCharacterModal());
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeCharacterModal();
      }
    });
  }

  bindResultEvents(affinities) {
    const top = affinities.top.character;
    const topPercentage = affinities.top.percentage;

    const restartBtn = document.getElementById('btn-restart-quiz');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => this.restartQuiz());
    }

    const copyBtn = document.getElementById('btn-copy-result');
    const copyText = document.getElementById('copy-btn-text');
    if (copyBtn && copyText) {
      copyBtn.addEventListener('click', async () => {
        const shareString = `¡Hice el test de Shingeki no Kyojin y soy ${top.name} (${topPercentage}% de afinidad)! «${top.quote}» Descubre tu personaje aquí: ${window.location.href}`;
        try {
          await navigator.clipboard.writeText(shareString);
          copyText.textContent = '¡Copiado con éxito!';
          setTimeout(() => {
            copyText.textContent = 'Copiar Resultado';
          }, 2500);
        } catch {
          copyText.textContent = 'Presiona Ctrl+C';
        }
      });
    }

    const shareText = encodeURIComponent(`¡Hice el test de Attack on Titan y soy ${top.name} (${topPercentage}% de afinidad)! ¿Qué personaje de Shingeki no Kyojin sos vos?`);
    const currentUrl = encodeURIComponent(window.location.href);

    const xLink = document.getElementById('share-x-link');
    if (xLink) {
      xLink.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}&hashtags=AttackOnTitan,ShingekiNoKyojin,AnimeQuiz`;
    }

    const waLink = document.getElementById('share-wa-link');
    if (waLink) {
      waLink.href = `https://api.whatsapp.com/send?text=${shareText}%20${currentUrl}`;
    }
  }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new SnkQuizApp();
});
