"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "@/components/providers/theme-provider";
import { Wordmark } from "@/components/ui/logo";

const SECTIONS = [
  { href: "#top", label: "Início" },
  { href: "#manifesto", label: "Manifesto" },
  { href: "#pilares", label: "Pilares" },
  // { href: "#versiculo", label: "Versículo" },
  // { href: "#percurso", label: "Percurso" },
  { href: "#agenda", label: "Agenda" },
  { href: "#galeria", label: "Galeria" },
  { href: "#testemunhos", label: "Testemunhos" },
  { href: "#loja", label: "Loja" },
  // { href: "#contato", label: "Quero correr" },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const MENU_ID = "menu-principal";
const FOCUSABLE = 'a[href], button:not([disabled])';

export function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /**
   * O menu cobre a página inteira, então precisa se comportar como diálogo:
   * o foco entra nele, circula dentro dele, Escape fecha e devolve o foco ao
   * gatilho, e o conteúdo atrás fica inerte em vez de continuar tabulável.
   */
  useEffect(() => {
    if (!menuOpen) return;

    const menu = menuRef.current;
    const trigger = triggerRef.current;
    if (!menu) return;

    const main = document.querySelector("main");
    main?.setAttribute("inert", "");

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const items = () => Array.from(menu.querySelectorAll<HTMLElement>(FOCUSABLE));
    items()[1]?.focus(); // o [0] é o botão de fechar; entra direto no primeiro link

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = items();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !menu.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      main?.removeAttribute("inert");
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between py-4 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(1rem,env(safe-area-inset-top))] md:pl-[max(1.5rem,env(safe-area-inset-left))] md:pr-[max(1.5rem,env(safe-area-inset-right))]">
        <a
          href="#top"
          aria-label="Corre com Cristo · início"
          className="rounded-full py-1.5 md:ml-16"
        >
          <Wordmark />
        </a>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-spring/30 bg-deep/70 text-ink backdrop-blur-md transition-colors hover:border-spring/70"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="flex h-11 items-center gap-2.5 rounded-full border border-spring/30 bg-deep/70 px-4 text-ink backdrop-blur-md transition-colors hover:border-spring/70"
          >
            <span className="relative flex h-3.5 w-4 flex-col justify-between" aria-hidden>
              <span
                className="h-[2px] w-full origin-center rounded-full bg-current transition-transform duration-300"
                style={menuOpen ? { transform: "translateY(6px) rotate(45deg)" } : undefined}
              />
              <span
                className="h-[2px] w-full rounded-full bg-current transition-opacity duration-200"
                style={menuOpen ? { opacity: 0 } : undefined}
              />
              <span
                className="h-[2px] w-full origin-center rounded-full bg-current transition-transform duration-300"
                style={menuOpen ? { transform: "translateY(-6px) rotate(-45deg)" } : undefined}
              />
            </span>
            <span className="telemetry text-xs uppercase tracking-[0.15em]">
              {menuOpen ? "Fechar" : "Menu"}
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="menu"
            ref={menuRef}
            id={MENU_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center overflow-hidden bg-night/95 px-6 backdrop-blur-xl md:px-24"
          >
            {/*
              O X no cabeçalho fica fora do diálogo, e aria-modal esconde tudo que
              está fora dele. Este é o controle de fechar que existe dentro: some
              da tela até receber foco.
            */}
            <button
              type="button"
              onClick={closeMenu}
              className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-6 focus-visible:top-6 focus-visible:z-10 focus-visible:rounded-full focus-visible:bg-spring focus-visible:px-5 focus-visible:py-2.5 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-night md:focus-visible:left-24"
            >
              Fechar menu
            </button>

            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
              style={{ background: "radial-gradient(circle, var(--grad-2), transparent 70%)" }}
            />
            <ul className="relative mx-auto flex w-full max-w-5xl flex-col gap-1">
              {SECTIONS.map((section, index) => (
                <motion.li
                  key={section.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.05 + index * 0.045 }}
                >
                  <a
                    href={section.href}
                    onClick={closeMenu}
                    className="group flex items-baseline gap-4 py-1.5"
                  >
                    <span className="telemetry text-xs text-spring opacity-60">
                      {String(index).padStart(2, "0")}
                    </span>
                    <span className="font-display kinetic text-[clamp(2rem,7vw,4.2rem)] uppercase leading-[0.95] text-ink transition-all duration-300 group-hover:translate-x-3 group-hover:brand-gradient">
                      {section.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}
