# UI/UX Audit — Ahmad Sharara Portfolio

**Site:** https://ahmad-sharara.vercel.app/ · **Repo:** `ahmadsharara39/Portfolio` · **Stack:** React 19 + Vite + Tailwind v4 + Framer Motion
**Method:** Code-grounded audit of the actual source (client-rendered SPA → the code is the source of truth), reasoning about rendered output and responsive breakpoints from components and Tailwind classes. Nine independent senior-reviewer passes (positioning, hierarchy, type/color, navigation, projects, responsive, accessibility, motion, performance). **79 findings.**
**Limitation:** No live browser automation / Lighthouse / device screenshots were available in this environment. Contrast, layout, and perf claims are computed/derived from code; the items marked _"verify live"_ deserve a real-device and Lighthouse confirmation.

---

## A. Executive Summary

This is a genuinely well-built portfolio that already sits well above the typical developer-portfolio baseline — the token-based theming, the light/dark system, the accessibility scaffolding (skip link, focus rings, reduced-motion plumbing, an exemplary contact form), and the disciplined type scale are the work of someone who clearly cares about craft. The hero looks intentional and professional, the experience timeline is scannable, and the metadata (title, OG, real og-image) is better than most. **Where it falls short is precisely where hiring decisions are made.** The single biggest problem is that **no project shows a screenshot or any visual proof of a working product** — every card renders the same abstract "circuit" graphic, so the section a recruiter came to see reads as a row of identical placeholders, and even the flagship FlowPilot has its code button hidden. Second, **positioning is diluted**: five cycling job titles across three job families, a buzzword-led value line, and no GitHub link above the fold leave the 5–10 second question "what is he and what has he shipped?" unanswered. Third, the site spends a lot of its budget on **always-on decoration** — a full-page particle canvas doing O(n²) work sized to the whole document, several parallel animation loops (some running invisibly on mobile), and a ~1.5s fake preloader that hides already-rendered content — which costs performance, battery, and focus, and works against the "trustworthy/senior" read for exactly the technical audience it's trying to impress. The content is also thin on **outcomes**: descriptions are feature lists rather than problem → role → decision → result, and one metric ("98.6% accuracy") is stated without context in a way that can undercut trust in the genuinely good numbers next to it. **Is it ready for professional applications?** It's *close* — presentable today, but I would not run a serious job search on it until the P0/P1 items (screenshots, positioning, preloader/particle cost, sharpened project copy) are done. Those are mostly small-to-medium efforts with outsized hiring impact.

**Overall: ~6.5 / 10** — strong engineering and accessibility craft, held back by proof/credibility gaps, diluted positioning, and an over-heavy decoration/animation budget.

---

## B. Scorecard

| # | Category | Score | One-line rationale |
|---|----------|:-----:|--------------------|
| 1 | First impression | **6** | Polished and clearly "an engineer," but the identity line is mid-typing and, on desktop, the whole right column is decoration with zero proof. |
| 2 | Professional positioning | **5** | Five cycling titles across three job families, a buzzword value line, no GitHub above the fold, and a vague availability pill — the aim is unfocused. |
| 3 | Visual hierarchy | **7** | Clean, disciplined type ladder and consistent cards; dragged down by inconsistent section widths, empty project-card headers, and everything glowing at once. |
| 4 | Typography | **7** | Strong Inter + JetBrains Mono discipline and controlled measure; sub-11px labels, an unused weight, and a double-defined line-height cost points. |
| 5 | Color & styling | **7** | Above-average token architecture and a real light-theme pass; over-used four-accent "rainbow" + effect density read as over-designed for a trust audience. |
| 6 | Navigation | **7** | Competent scroll-spy, aria-current, skip link, one-click recruiter paths; incomplete mobile-menu model, no scroll-padding, no persistent contact/GitHub. |
| 7 | Project presentation | **6** | Honest repo handling and some real metrics, but **no screenshots**, flagship code hidden, feature-list copy, and one implausible-looking metric. |
| 8 | Responsiveness | **7** | Genuinely responsive (not a squished desktop); hurt by a clipped hero role at 390px, the scrollHeight-sized particle canvas, and mobile dead space. |
| 9 | Accessibility | **7** | Above-average foundations; gaps: no in-page motion pause (WCAG 2.2.2), unlabeled decorative canvases, dark `text-muted` contrast, unnamed sections. |
| 10 | Interaction design | **6** | Tasteful micro-interactions and real reduced-motion effort, undercut by a content-gating preloader and too many simultaneous loops. |
| 11 | Performance | **5** | Good icon tree-shaking and no LCP image, but up-to-4 always-on rAF loops, an O(n²) full-document canvas, a fake TTI delay, no code-splitting, 1.2 MB OG image. |
| 12 | Overall polish | **6.5** | High craft with real gaps; a handful of P0/P1 fixes would move this to an 8. |

---

## C. Detailed Findings

Severity legend: **Critical** > **High** > **Medium** > **Low**. Effort: Small / Medium / Large.
Cross-cutting issues (ParticleField cost, `text-muted` contrast, Preloader, sub-11px text, mobile-menu model) are written in full once in their "home" dimension and cross-referenced elsewhere to avoid repetition.

### C1. First Impression & Professional Positioning

**[High] Five cycling role titles dilute positioning and contradict the meta title**
- **Where:** `Hero.jsx:7-13` (roles) vs `index.html` `<title>`/OG ("AI & Software Engineer").
- **Problem:** Rotates "Automation & Integration Engineer", "AI Engineer", "Full-Stack Builder", "Integration Architect", "Automation Specialist" — three automation synonyms, one AI, one full-stack. No single answer to "what is he?"; the tab/OG title says something else again.
- **Why / who:** Recruiters skim for a one-line role match; five overlapping titles read as unsure of the niche and fragment SEO. Affects every top-of-funnel skimmer.
- **Fix:** Anchor **one** static primary identity (aligned with the meta title), optionally cycle only sub-specializations beneath. Drop the near-duplicates and "Architect."
- **Example:** `primaryTitle = 'AI & Automation Engineer'`; sub-line cycles `['NLP & ML pipelines','API & workflow integration','Full-stack delivery']`.
- **Effort:** Small

**[High] No GitHub or LinkedIn link above the fold**
- **Where:** `Hero.jsx:134-162` (CTAs), `Navbar.jsx:54-84` — neither links to GitHub/LinkedIn.
- **Problem:** For an engineer, code is the #1 trust signal, yet the only external action up top is Resume; GitHub/LinkedIn appear only far down in Contact.
- **Why / who:** Technical evaluators look for GitHub in the first seconds; its absence forces a hunt and undercuts the "View My Work" promise. Affects founders, eng managers, senior devs.
- **Fix:** Persistent GitHub + LinkedIn icon links in the Navbar (next to ThemeToggle) and/or as small secondary links under the hero CTAs, visible at all breakpoints.
- **Effort:** Small

**[High] On desktop, the above-the-fold shows zero proof (stat bar is `lg:hidden`)**
- **Where:** `Hero.jsx:179-191` (stat bar `lg:hidden`) vs `166-176` (NeuralNetworkViz `hidden lg:flex`).
- **Problem:** The only quantified proof (3+/7+/88%) renders only on mobile; on laptops the prime right column is a decorative canvas conveying nothing.
- **Why / who:** The fold should convey what proves value; handing desktop's best real estate to ornament reads style-over-substance. Affects the primary desktop hiring audience.
- **Fix:** Surface the stat trio (or concrete proof chips: "FlowPilot AI — live demo", "88% sentiment accuracy", "7+ shipped projects") on desktop too — overlay compact cards on/near the viz; keep decoration as a backdrop.
- **Effort:** Medium

**[High] Three competing primary-weight CTAs (plus a 4th Resume in the nav)**
- **Where:** `Hero.jsx:140-161` (View My Work / Get in Touch / Resume) + `Navbar.jsx:71-80` (Resume pill).
- **Problem:** "Get in Touch" and "Resume" are equal weight side-by-side, and Resume is *also* a highlighted nav pill → effectively four CTAs, two of them Resume.
- **Why / who:** Multiple equal CTAs create decision friction; the standard is one primary + one secondary. Affects all visitors, especially time-pressed recruiters.
- **Fix:** Keep one primary ("View My Work") + one secondary ("Get in Touch"); demote hero Resume to a small text link (nav already has it). Reallocate freed space to a GitHub link.
- **Effort:** Small

**[Medium] Value proposition is a buzzword-led capability list, not an outcome**
- **Where:** `Hero.jsx:121-132`.
- **Problem:** "Building intelligent systems — from NLP pipelines and ML models to automation workflows…" opens on a generic phrase and lists tech, not the outcome a client/employer gets.
- **Fix:** One outcome-first sentence, keep the colored keyword spans. e.g. _"I help teams cut manual work and ship AI features — building NLP/ML models and automation workflows that connect their tools end-to-end."_ **(Author should confirm the exact positioning.)**
- **Effort:** Small

**[Medium] Identity line is animated → first-impression snapshot is often a half-typed word**
- **Where:** `Hero.jsx:108-119` + `useTypingEffect` `24-49`.
- **Problem:** The defining positioning string types character-by-character, so the critical first glance frequently reads mid-word; only reduced-motion users get a stable title.
- **Fix:** Render the primary title statically/complete; reserve any typing for a secondary sub-line (pairs with "anchor one identity"). Typing effects also read slightly cliché.
- **Effort:** Small

**[Medium] Availability pill omits work type and location recruiters filter on**
- **Where:** `Hero.jsx:84-95`.
- **Problem:** "Available for opportunities" states no type (full-time/contract/intern) or location/remote/timezone; no location anywhere above the fold.
- **Fix:** Make it specific with **accurate** info, e.g. "Available for full-time · Remote / Lebanon". **(Author must supply real availability + location.)**
- **Effort:** Small

**[Medium] Aesthetic is a generic dark-neon "AI dev template" with no ownable signature**
- **Where:** `Hero.jsx:57-59` (orbs), `15-22` (floating badges), gradient-glow name, mono cursor, site-wide ParticleField.
- **Problem:** Neural orbs + particle field + gradient headline + floating tech-name badges is the exact kit thousands of AI portfolios use — cleanly executed but not distinctive or memorable; the badges are decorative name-drops.
- **Fix:** Trade some decoration for one authentic signature near the fold — a real FlowPilot demo preview/GIF or a headline metric. Convert floating badges into a compact, informative "core stack" row.
- **Effort:** Medium

**[Low] "88% NLP Acc." lacks the context needed to be credible** — `Hero.jsx:185`. Bare accuracy with no model/task/dataset reads as cherry-picked. Tie it to the project ("88% — Arabic tweet sentiment model") and link it. Effort: Small.

**[Low] Floating tech badges (%-positioned) can collide with hero content at mid-large widths** — `Hero.jsx:62-79`. Absolute %-coords inside an overflow-hidden section can overlap the name/subhead/viz and pull the eye off the CTAs. Constrain to outer margins/behind content, test lg–2xl, reduce count/opacity. Effort: Small.

### C2. Visual Hierarchy & Layout

**[High] Project card headers are 176px of near-empty decorative space in the most important section**
- **Where:** `Projects.jsx:276-292` (`h-44` header, icon at `text/15`).
- **Problem:** Each card devotes 176px to a faint gradient wash, a decorative circuit SVG, and one barely-visible icon — no screenshot, no metric, and every card's header looks identical.
- **Why / who:** Hierarchy fails where it matters most; the eye can't tell the NLP card from the solar card, and the impressive numbers (88%, R² 0.94, 98.6%) are buried in body text. Affects recruiters doing the 5–10s skim.
- **Fix:** Add real screenshots (see C5-Critical), or shrink the dead header and promote the strongest metric to a prominent stat chip; raise the icon to ≥`text/40`.
- **Effort:** Medium

**[High] Full-page animated ParticleField + stacked decorative layers flatten emphasis**
- **Where:** `ParticleField.jsx:87` (≤180 nodes), `:186` (opacity 0.7); layered with orbs, 2× DataStream, grid/dot patterns, per-card scan-lines.
- **Problem:** A fixed canvas over the whole scrollHeight plus orbs, matrix-rain, backgrounds, scan-lines, pulsing dots, typing and a bouncing scroll hint means many independent motions everywhere at once — no rest state, so nothing is emphasized by motion.
- **Fix:** Drop ParticleField opacity to ~0.38 and cap nodes lower and/or confine it to the Hero; remove one redundant Contact DataStream; reserve motion elsewhere for hover/reveal. (See also C8/C9 for the perf angle.)
- **Effort:** Medium

**[Medium] Inconsistent section max-widths break the vertical alignment spine** — `About/Skills/Projects/Contact` use `max-w-7xl`, `Experience/Education` use `max-w-4xl`, Hero `max-w-6xl`. Section eyebrow/title left edges jump ~190px/side as you scroll. Fix: one outer width for all section headers; narrow only the inner body (e.g. wrap the Experience timeline in `max-w-4xl` inside a `max-w-7xl` section). Effort: Small.

**[Medium] Education is a full `py-24` section for a single one-line card** — `Education.jsx:7-27`, positioned between Projects and Contact so the reader hits a near-empty screen right before the CTA. Fix: reduce to `py-12`/`py-16`, fold into About/Experience, or move just above the Footer so Projects flows into Contact. Effort: Small.

**[Medium] Uneven Skills tag counts produce ragged grid rows** — `Skills.jsx:5-42` in a `sm:2/lg:3` grid: Databases has 3 tags, AI/ML and Frameworks have 11, so the short card leaves a conspicuous gap and reads as "weak in databases" purely from layout. Fix: `auto-rows-fr` for equal heights and/or reorder so the 3-tag card isn't beside an 11-tag card. Effort: Small.

**[Low] Seven identical SectionHeadings create a monotonous scroll rhythm** — `SectionHeading.jsx:3-36`. Same "// label" + extrabold h2 + subtitle + animation six times. Add controlled variation (center one pivotal section, vary the eyebrow accent per section). Effort: Small.

**[Low] Uniform `py-24` on every section gives no density variation** — modulate: keep `py-24` on flagship (Projects/Contact), tighten low-density (Education/Skills) to `py-16`. Effort: Small.

**[Low] Hero packs many competing focal points** — `Hero.jsx:56-209`. Pulsing dot + color-cycling role + 6 floating badges + neural canvas + 3 CTAs + bouncing scroll hint all animate on their own timing. Cut badges 6→3 (or drop) and let name→role→value→CTA dominate. Effort: Small.

**[Low] Featured project loses its balancing visual below `lg`** — `Projects.jsx:190` (pipeline `hidden lg:flex`). Below lg the featured card becomes a tall text block with no distinguishing visual on the most common (mobile) viewport. Add a slim horizontal `Trigger → AI Step → Action` chip row for small screens. Effort: Small.

### C3. Typography & Color / Visual Language

**[High] `text-muted` (#64748b) fails WCAG AA at the small sizes it's used at (dark theme)**
- **Where:** token `index.css:26`; used in `About.jsx:154`, `Hero.jsx:188,199`, `Projects.jsx:131`, `Education.jsx:23`, form placeholders `Contact.jsx`.
- **Problem:** #64748b computes ≈3.8:1 (surface) / ≈4.3:1 (void) — below 4.5:1 — and is applied to `text-xs`/`text-[0.65rem]` labels (mobile stat labels ~10px are the worst case). _(Note: several muted labels were already switched to `text-dim` in a prior pass; the token itself and its remaining uses still fail.)_
- **Fix:** Lift the **dark** token to ~#8291a5–#8b97ab (≥4.5:1 on void/surface); light theme already passes. Or reserve `text-muted` strictly for ≥`text-lg`.
- **Effort:** Small · **verify live** with a contrast checker.

**[Medium] Four-accent "rainbow" + effect density read as over-designed for a trust audience**
- **Where:** three accent colors per sentence (`Hero.jsx:127-131`, `About.jsx:123-127`); scan-line on every card; per-tag glow in Skills; global particle/orb/grid layers.
- **Problem:** neural/synapse/pulse/matrix used simultaneously (often in one sentence) atop a permanent stack of animated layers dilutes the accents' meaning and pushes toward "busy" for conservative recruiters/clients.
- **Fix:** One primary accent (neural) + one secondary (synapse) for emphasis; demote pulse/matrix to semantic-only (error, success/availability). Cap highlighted words to one accent per paragraph; keep scan-lines only on the Featured card.
- **Effort:** Medium

**[Medium] Gradient-clipped headings can vanish in forced-colors / Windows High Contrast** — `index.css:171-183` (`-webkit-text-fill-color:transparent`) on the hero name, "AS." logo, stat numbers. No `@media (forced-colors: active)` fallback → the candidate's own name can render blank. Fix: add a forced-colors fallback restoring `-webkit-text-fill-color: currentColor; color: CanvasText; background:none;`. Effort: Small.

**[Medium] Repeated sub-11px type across badges/pills/stat labels** — `text-[0.6rem]`–`text-[0.72rem]` on tech pills, LIVE badge, mobile stat labels, workflow chips. Tech pills are how reviewers verify the stack; sub-11px + dim is a common AA failure. Fix: 12px (`text-xs`) floor for any content-bearing text; reserve `text-[0.6rem]` for decorative glyphs only. Effort: Small. _(Cross-ref C6.)_

**[Low] Dark surfaces separate almost entirely by border, not luminance** — `index.css:10-15`: `surface` (#141428) is only a few % above `void`; the `elevated` (#1a1a35) token is defined but never used. Nudge `surface` lighter (~#181832) and/or actually deploy `elevated` for nested/hover surfaces to build real depth. Effort: Small.

**[Low] Unused Inter weight 300 loaded (7-weight axis for a 3-weight need)** — `index.html:52`. No `font-light` anywhere. Drop 300 (or switch to the Inter variable font). Effort: Small. _(Cross-ref C9.)_

**[Low] Body line-height defined twice + off-palette hues** — global `line-height:1.7` (`index.css:70`) vs `leading-relaxed` (1.625) on most paragraphs; project gradients use raw `orange/rose/yellow` outside the 4-accent system. Pick one line-height; map decorative gradients onto the accent tokens. Effort: Small.

**[Low] No fluid typography; hero scale plateaus 768–1023px** — `Hero.jsx:101`, `SectionHeading.jsx:19`. Introduce a couple of `clamp()` display sizes so type scales continuously. Effort: Small.

### C4. Navigation & User Flow

**[High] Mobile menu interaction model is incomplete — no Escape, no outside-click close, no focus management, no scroll-lock**
- **Where:** `Navbar.jsx:89-138`.
- **Problem:** Closes only via the toggle or a link tap. No Escape handler, no backdrop dismiss, focus never moves into the panel (nor back to the toggle on close), and body scroll isn't locked (page scrolls behind the open menu).
- **Why / who:** This is the entire nav surface on phones — where much recruiter traffic starts. Keyboard/SR users can't Escape-dismiss; the unlocked scroll feels broken.
- **Fix:** Escape listener + focus management tied to open state; lock body scroll while open; dismiss-on-outside-tap; focus first link on open, restore to toggle on close.
- **Effort:** Medium _(overlaps C7-a11y "mobile menu no Escape")._

**[Medium] BackToTop smooth scroll ignores `prefers-reduced-motion`** — `BackToTop.jsx:21` hard-codes `behavior:'smooth'`; the CSS reduced-motion override doesn't affect JS `scrollTo`. Fix: `behavior: reduce ? 'auto' : 'smooth'` via `useReducedMotion()`. Effort: Small.

**[Medium] No `scroll-padding-top` for the fixed navbar** — `index.css:60-64`. Anchor/deep-link landings sit under the ~72px fixed nav; `py-24` masks it partially and the scroll-spy 120px threshold compensates manually. Fix: `html { scroll-padding-top: 5rem; }`. Effort: Small.

**[Medium] Transparent top-state navbar risks low link legibility over the animated hero** — `Navbar.jsx:43-47,61`. Dim `text-dim` links over the moving particle/orbs at the very first view (worse in light theme). Fix: a faint always-on scrim/gradient + slight blur in the un-scrolled state, or raise inactive-link contrast in the hero state. Effort: Small · **verify live**.

**[Low] Logo home link has no accessible name; no "Home" item / top-of-page active state** — `Navbar.jsx:50-52` ("AS." with `href="#"`); Hero has no `id`, so `active=''` at the top. Add `aria-label="Ahmad Sharara — back to top"`, point to `#main`/`#hero`. Effort: Small. _(Cross-ref C7.)_

**[Low] No direct contact/"hire me" affordance in the nav; mobile Resume is 2 taps** — `Navbar.jsx:54-84`. Add a styled "Get in touch" pill next to Resume; surface Resume in the mobile bar next to ThemeToggle. Effort: Small.

**[Low] Scroll-spy uses an unthrottled scroll listener with per-frame `getBoundingClientRect`** — `Navbar.jsx:21-36` + `BackToTop.jsx:8-12` (two listeners). Replace with `IntersectionObserver`; mark remaining scroll listeners passive. Effort: Medium.

**[Low] Résumé forces download instead of in-tab preview** — `Navbar.jsx:72-79,126-133`, `Hero.jsx:154-161` use `download`. Many recruiters prefer to glance inline first. Fix: `target="_blank" rel="noopener noreferrer"`; keep a separate explicit Download if desired. Effort: Small.

### C5. Project Presentation & Content Credibility

**[Critical] No project has a screenshot or any visual proof of the working product**
- **Where:** `Projects.jsx:276-292` (card media) and `190-222` (FlowPilot right panel); unused `src/assets/hero.png`.
- **Problem:** All 7 projects render the same decorative circuit SVG + a monochrome icon. Not one `<img>` of a UI, dashboard, chart, confusion matrix, or the physical arm. The flagship shows a hand-drawn `workflow.run()` mock instead of a screenshot of the app it links to.
- **Why / who:** A screenshot is the fastest trust signal for an AI+full-stack engineer. Identical abstract art makes every project look hypothetical and the grid templated; "98.6% accuracy" is far more believable next to a chart than a stock icon. Affects everyone doing the skim.
- **Fix:** Add ≥1 real image per project — FlowPilot → live-app screenshot; NLP/ML → the web UI / confidence chart / confusion matrix; Prosthetic Arm → a photo. Render in the existing `h-44` media div behind the gradient; lazy-load. Even 3–4 real shots materially raise credibility. **(Author must supply the images.)**
- **Effort:** Medium

**[High] FlowPilot (the featured flagship) exposes no source code** — `Projects.jsx:20` (`FLOWPILOT_CODE=''`), `175-185` (Code button hidden); date "Jul 2026". The most prominent project offers only a demo + prose; nothing inspectable, and a current-month date with no metrics reads as in-progress. Fix: publish a (trimmed) public repo and set the URL, or show an honest state ("Code — available on request" / "Private repo") + add a screenshot and one concrete usage note. **(Author decision + URL.)** Effort: Small.

**[High] Descriptions are feature lists, not problem → role → decision → outcome** — featured + every card (`Projects.jsx:28-33,44,54,64,74,84,94`). None states the problem, his specific role (solo/team/which parts), the key decision/tradeoff, or an impact. Fix: a compact 3-part frame per card — **Problem** (1 line) · **What I built / my role** (1 line) · **Result** (1 line, measurable). Keep tech tags; say "solo capstone" honestly where true. **(Author-supplied content.)** Effort: Medium. _This is the highest-leverage content fix in the section._

**[High] Context-free "98.6% accuracy" reads as inflated/unverifiable** — `Projects.jsx:64` (ABSA — Financial News). No dataset, baseline, split, or task; near-99% on claim-veracity is a red flag to ML reviewers and drags down the believable 88%/R²=0.94 next to it. Fix: add context (dataset, split, baseline, exact task) or drop the bare number and describe the method; sanity-pass every metric. **(Author-supplied eval details.)** Effort: Small.

**[Medium] Credit Card Fraud project reports no result metric** — `Projects.jsx:73-77`. Method is listed (SMOTE, RF/LR/NB/MLP, Stacking) but no PR-AUC/recall — and for imbalanced fraud, accuracy is meaningless, so the omission is conspicuous. Fix: add PR-AUC or recall@fixed-precision, or frame as a tradeoff study. **(Author-supplied.)** Effort: Small.

**[Medium] No case-study / "read more" depth path for any project** — only an external GitHub link (or demo for FlowPilot). Add one lightweight case study (modal or section) for the 2–3 strongest projects: problem, architecture/screenshot, key decision + tradeoff, result. Effort: Medium.

**[Medium] Apliman intern bullets describe training, not delivered work** — `Experience.jsx:25-28` ("Built strong AI/ML/DL fundamentals…", "Reproduced baseline classifiers…") read as coursework vs the concrete Aligned Tech/Jaber bullets. Reframe around any real artifact/contribution + outcome. Effort: Small.

**[Medium] Skills is partly a tag-dump that dilutes signal** — `Skills.jsx:5-42` (~50 tags). Real strengths sit beside low-signal entries ("SVM" standalone, jQuery, three IDEs). Trim the noise; optionally mark a distinct "Core" set (Python, PyTorch, FastAPI, React, transformers, Make). Effort: Small.

**[Medium] Education card wastes the strongest early-career credibility asset** — `Education.jsx:20-24` shows only degree/university/dates; no GPA/honors, coursework, or a link to the capstone (the Prosthetic Arm / ABSA likely *are* its output). Add honors if strong, a "Capstone → project" link, and 2–3 relevant courses. **(Author-supplied GPA/honors/coursework.)** Effort: Small.

**[Low] Headline stats are narrow/vague and lightly hedged** — `About.jsx:5-9`, `Hero.jsx:185-190`. "88% NLP Accuracy" elevates one project's number to a career stat; "7+/3+" pad exact small counts. Contextualize the metric; drop the "+" on exact numbers or swap for weightier stats ("Live products shipped"). Effort: Small.

**[Low] Typing role list mixes real titles with invented/over-claimed ones** — `Hero.jsx:7-13`; "Architect" over-claims seniority for a 2025 grad. Cut to 2–3 accurate, distinct positionings; drop "Architect." Effort: Small. _(Cross-ref C1.)_

**[Low] About prose leans on a cliché; the terminal is style-over-substance** — `About.jsx:129-139` ("I thrive at the intersection…") + the decorative terminal restating role/location. Replace the cliché with a specific value line; trim the terminal or make it carry a real proof point. Effort: Small.

### C6. Responsive Design (1440 / 1024 / 768 / 390)

**[High] Hero typed-role string is clipped by a fixed `h-10` at 390px** — `Hero.jsx:113-118`; `roles[0]='Automation & Integration Engineer'` (~35 mono chars, ~378px) wraps to two lines in a 40px box on ~342px-wide phones and is clipped — and reduced-motion users see this longest string permanently. Fix: `min-h-[2.5rem]` + allow wrap + smaller mobile font (`text-base sm:text-xl`, `leading-tight`). Effort: Small. **verify live** at 360/390px.

**[High] Fixed ParticleField canvas sized to `document.scrollHeight` — mobile perf + vertical squish** — `ParticleField.jsx:16-19,87,90-132,185`. Buffer is `innerWidth × scrollHeight` (~390×6000 on a phone) doing O(n²) work per frame; and because the box is `fixed inset-0` (viewport height) while the buffer is document-tall, the field is vertically compressed. Fix: size to `innerHeight`, keep fixed to viewport, scale node count/radius down on small screens (or disable the connection pass below a width). Effort: Medium. _(Cross-ref C8/C9.)_

**[Medium] Full horizontal nav turns on at exactly `md=768` and is cramped/overflows** — `Navbar.jsx:49-84` (`hidden md:flex gap-8`, 6 links + Resume + toggle ≈736px vs ~720px inner) → clipped at the right (body `overflow-x:hidden`). Fix: raise the desktop-nav breakpoint to `lg` (hamburger through 1023px) or reduce `gap-8→gap-5` and move Resume into the menu until lg. Effort: Small.

**[Medium] Uniform `py-24` produces excessive vertical dead space on mobile** — 192px between every section content block on a 390px column inflates scroll length. Fix: `py-16 md:py-24`. Effort: Small. _(Cross-ref C2.)_

**[Medium] Project cards carry a 176px decorative header with no screenshot — tall/empty on mobile** — `Projects.jsx:276`. Six ~176px near-empty bands stacked single-column. Fix: `h-28 md:h-44` and/or a real screenshot. Effort: Medium. _(Cross-ref C2/C5.)_

**[Low] About stats forced to 3 columns at 390px squeeze cards and wrap labels** — `About.jsx:141,149,154`. "NLP Accuracy" wraps while "Roles"/"Projects" don't. Fix: `gap-3 sm:gap-4`, `p-4 sm:p-5`, shorten to "NLP Acc." Effort: Small.

**[Low] Sub-11px decorative labels hard to read on mobile** — `Hero.jsx:188`, `Projects.jsx:197/209/217`, `About.jsx:85`. Floor readable labels at `~0.7rem`. Effort: Small. _(Cross-ref C3.)_

**[Low] Experience timeline indent (`pl-10`) eats mobile width** — `Experience.jsx:53,77`. Leaves ~254px for bullets at 390px. Fix: `pl-8 sm:pl-10`, `-left-8 sm:-left-10`, `p-5 sm:p-8`. Effort: Small.

### C7. Accessibility (WCAG 2.2 AA)

**[High] No in-page control to pause/stop the continuously animating background — WCAG 2.2.2 (A) failure**
- **Where:** `ParticleField.jsx:141-156`, floating badges `Hero.jsx:62-79`, `NeuralOrb.jsx:12-18`, `DataStream.jsx:25-51`, scan-line `index.css:197-206`.
- **Problem:** Multiple elements auto-animate >5s (mostly infinitely) in parallel with text. WCAG 2.2.2 requires an in-page pause/stop/hide mechanism; relying solely on OS `prefers-reduced-motion` satisfies 2.3.x but **not** 2.2.2.
- **Why / who:** Users with vestibular/attention/low-vision needs who haven't set an OS preference (common) have no way to calm the page; drifting particles behind body text reduce comprehension.
- **Fix:** One global "Pause animations" toggle (next to ThemeToggle) writing a flag; route canvases through `reduced || userPaused` (they already have `start()/drawStatic()`), gate framer loops, add a paused class to freeze CSS scan/pulse; persist in localStorage.
- **Effort:** Medium

**[Medium] Decorative canvases + preloader SVG not hidden from assistive tech** — `ParticleField`, `NeuralNetworkViz`, `DataStream` `<canvas>` and `Preloader` MiniNetwork `<svg>` lack `aria-hidden` (while card SVGs/icons correctly have it). The `fixed inset-0` particle canvas wraps the whole page in the reading order. Fix: add `aria-hidden="true"` to each. Effort: Small.

**[Medium] `text-text-muted` fails 4.5:1 in dark theme for placeholders + small text** — see **C3-High** (full detail). Form placeholders (`Contact.jsx:46` on `bg-deep`) and ~10px stat labels are the worst cases; light theme already remapped. Effort: Small.

**[Medium] Sections have no accessible name; headings carry the tagline, not the topic** — every `<section id>` lacks `aria-labelledby`/`aria-label`, so SR region navigation lists nothing; and the topic word lives in the non-heading eyebrow while the h2 is a tagline ("Turning data into decisions.", "Things I've built"). Fix: give each h2 an `id` and each section `aria-labelledby` → it; ensure the accessible name conveys the topic. Effort: Small.

**[Medium] Preloader lacks progress semantics and leaves content focusable behind the overlay** — `Preloader.jsx:55-107` + `App.jsx:35`. No `role=status`/`aria-busy`; the bar isn't a `role=progressbar`; the background is `opacity-0` but still in the tab order (keyboard users tab onto invisible controls); the loader `<h2>` precedes the real h1. Fix: `role=progressbar` + `aria-valuenow`, `role=status aria-live`, `inert` the content wrapper while `!loaded`, and `aria-hidden`/hide the loader heading. Effort: Medium. _(See also C8/C9 — best fix is to remove the preloader.)_

**[Low] About terminal reads ~15 lines of pseudo-code to screen readers** — `About.jsx:12-28,88-104`. Decorative boot text + a `const profile` object duplicating adjacent prose. Fix: `aria-hidden="true"` on the terminal. Effort: Small.

**[Low] "AS." logo link has an unclear accessible name and `href="#"`** — `Navbar.jsx:50-52`. Fix: `href="#main"` + `aria-label="Ahmad Sharara — back to top"`. Effort: Small.

**[Low] External `_blank` links give no new-tab warning** — `Contact.jsx:205-209`, `Footer.jsx:22-31`, `Projects.jsx:166-174,314-325` (`rel` is correctly set). Append a visually-hidden "(opens in a new tab)" to the accessible name. Effort: Small.

**[Low] Mobile menu has no Escape-to-close and doesn't move focus** — `Navbar.jsx:89-138` (good disclosure semantics + links removed from DOM when closed, so no hidden trap). Add Escape-to-close returning focus to the toggle. Effort: Small. _(Overlaps C4-High.)_

### C8. Motion & Interaction Design

**[High] Preloader gates 100% of content behind a fake progress bar for ~1.5–2.8s, ignoring reduced motion**
- **Where:** `Preloader.jsx:59-72` + `App.jsx:25,35` (wrapper `opacity-0` until `loaded`).
- **Problem:** The bar is cosmetic (React already rendered it). It increments by `Math.random()*12+3` every 60ms to 100, then waits +300ms +800ms; content stays `opacity-0` the whole time then fades 500ms. Net ~1.5s typical (up to ~2.8s), and there's **no reduced-motion check**.
- **Why / who:** Burns 15–30% of the 5–10s first-impression window on content already in memory; a fake bar on an engineer's site reads style-over-substance. Affects every first-time visitor; reduced-motion/low-bandwidth users worst.
- **Fix:** Remove the preloader (no async data), or hard-cap ~500ms and skip entirely under reduced motion; drive off `document.fonts.ready`/`window 'load'` if kept; delete the trailing timeouts.
- **Effort:** Small

**[High] ParticleField runs two O(n²) loops over ≤180 nodes every frame, full-document-height** — see **C9-High** (full detail: ~32k `sqrt`/frame + per-pair `createLinearGradient`). Effort: Medium.

**[Medium] NeuralNetworkViz + floating badges keep animating while `display:none` on mobile** — `Hero.jsx:170,62-79`. CSS `hidden` doesn't stop rAF/framer loops; the heaviest hero visuals run on phones that never show them. Fix: gate the **mount** on `matchMedia('(min-width:1024px)')`, don't mount-then-hide. Effort: Small. _(Cross-ref C9.)_

**[Medium] The first screen animates ~14 things at once** — two canvas rAF loops + ~12 infinite framer/CSS loops. Cut to 2–3 hero motions; strong cut candidates: the 6 badges (duplicate Skills) and either ParticleField or NeuralNetworkViz (not both) on the hero. Effort: Medium.

**[Medium] Reduced-motion incompletely honored** — `index.css:145-154` only neutralizes CSS animation/transition; framer `whileInView` opacity reveals (SectionHeading/About/Skills/Experience/Projects) still play, and `MotionConfig reducedMotion="user"` keeps opacity — so reduced-motion users still watch every section fade in. Also the Contact "Sending…" spinner (`rotate:360`) freezes under reduced motion. Fix: branch reveals on `useReducedMotion()` (render at final state via a shared wrapper); swap the spinner for an opacity pulse or text. Effort: Medium.

**[Low] DataStream mounted twice + Experience scan-lines run perpetually** — `Contact.jsx:188,191` (two matrix-rain canvases) and `Experience.jsx:89` (`animate-scan` with no hover gate, unlike Projects). Render a single DataStream (or none); gate the Experience scan-line behind `group-hover`. Effort: Small.

**[Low] Card hover reveals have no keyboard-focus equivalent** — `Projects.jsx:272-291`. `group-hover` lift/scan/brighten don't fire on keyboard focus. Add `group-focus-within:` counterparts. Effort: Small.

### C9. Performance & Frontend Quality

**[High] Full-page ParticleField: two O(n²) passes with a per-connection gradient allocation, every frame, over the whole document**
- **Where:** `ParticleField.jsx:16-19,90-113,115-132,141-148`.
- **Problem:** Canvas is `innerWidth × document.scrollHeight` (~11.5M px backing store `clearRect`-ed each frame); `drawConnections` + `drawDataPulses` are each O(n²) (~32k `sqrt`/frame at 180 nodes), and `drawConnections` calls `createLinearGradient` + 2 `addColorStop` **per connected pair** — hundreds of gradient allocations/frame (heavy GC).
- **Why / who:** Single largest continuous CPU cost, running whenever the page is open, for a decorative 0.7-opacity backdrop → sustained main-thread load, fan spin, scroll jank, battery drain. Disproportionately hits mobile/low-end (recruiters on phones).
- **Fix:** (1) size to viewport + translate on scroll; (2) flat `strokeStyle` instead of per-pair gradient; (3) spatial-grid near-neighbor checks; (4) fold `drawDataPulses` into the one connection loop; (5) lower node cap on small screens.
- **Effort:** Medium · **verify live** with a CPU/Lighthouse trace.

**[High] Hidden Hero/Contact canvases keep their rAF loops running on mobile** — `Hero.jsx:170` (`NeuralNetworkViz`), `Contact.jsx:187-192` (two `DataStream`). `display:none` doesn't pause rAF (only tab visibility does), so phones can run 4 rAF loops with 3 invisible. Fix: conditionally **mount** behind `matchMedia` (lg+ / xl+) and/or pause via `IntersectionObserver`. Effort: Small.

**[High] Preloader injects ~1.5s of fake progress delaying already-rendered content** — see **C8-High**. On a client-rendered SPA this stacks on top of blank-`#root`-until-bundle. Fix: remove, or tie to real signals + hard cap ~500ms; delete trailing timeouts. Effort: Small.

**[Medium] No code-splitting / manual chunking — framer-motion + whole app ship as one ~124KB-gzip blocking bundle** — `vite.config.js` is bare; `App.jsx` statically imports all sections. Fix: `manualChunks` to split framer-motion/react into a cacheable vendor chunk; `React.lazy` + `Suspense` below-the-fold sections; biggest win is still trimming framer-motion usage. Effort: Medium.

**[Medium] `og-image.png` is a 1.2MB PNG** — `public/og-image.png` (1,203,486 bytes) for a 1200×630 card (6–12× too big); slow/size-capped scrapers may show no preview when the link is shared. Fix: re-export as optimized JPEG/WebP < ~200KB (or `pngquant`/`oxipng`). Effort: Small.

**[Medium] Inter requested at 7 weights on a render-blocking Google Fonts stylesheet** — `index.html:52` (10 woff2 files). Render-blocking + unused weights + no woff2 preload (late swap → CLS risk). Fix: request only used weights (≈400/500/600/700 Inter, 400/500 Mono); consider self-hosting + `rel=preload`. Effort: Small. _(Cross-ref C3.)_

**[Low] ParticleField reallocates the whole canvas on every resize + `document.body` size change** — `ParticleField.jsx:16-19,166-170`. Mobile URL-bar show/hide fires the ResizeObserver → reallocates a multi-MB canvas mid-scroll (unthrottled). Fix: debounce, size to viewport, observe width-only. Effort: Small.

**[Low] Unused `lucide-react` dependency + unused `src/assets/hero.png`** — `package.json:14` (no imports), `hero.png` (44KB, never referenced). Tree-shaken out, but it's repo hygiene an engineer's work-sample repo should get right. Remove both (and default `vite.svg`/`react.svg` if unused). Effort: Small.

---

## D. Prioritized Action Plan

Deduped across dimensions; ordered by hiring impact ÷ effort.

### P0 — Fix immediately (credibility + first-impression blockers)
1. **Add real project screenshots** (≥3–4, incl. FlowPilot live-app) — _Critical, Medium._ **Needs images from you.** (C5)
2. **Remove or hard-cap the Preloader (~500ms, skip under reduced motion)** — stop hiding already-rendered content. _Small._ (C8/C9)
3. **Sharpen positioning:** one static primary title (aligned to the meta title), drop "Architect"/duplicates, rewrite the value line to an outcome, complete-not-typed headline. _Small._ **Needs your target role + one-line pitch.** (C1/C5)
4. **Put GitHub + LinkedIn above the fold** (Navbar + hero) and **show proof on desktop** (stat/proof chips, not just the canvas). _Small–Medium._ (C1)
5. **Fix the FlowPilot flagship:** real repo link or an honest "private/on request" state + a screenshot + one concrete usage note. _Small._ **Needs repo decision/URL.** (C5)

### P1 — High-impact improvements
6. **Rewrite each project to Problem → Role → Result** and **contextualize/soften the 98.6% metric**; add a result to the fraud project. _Medium._ **Needs your content/metrics.** (C5)
7. **Cut the always-on animation cost:** viewport-size the ParticleField + flat strokes + lower node cap; mount heavy canvases only at their breakpoint; drop one Contact DataStream. _Medium._ (C8/C9)
8. **Add a global "Pause animations" toggle** (WCAG 2.2.2) and **complete reduced-motion** (skip framer reveals, fix the frozen spinner). _Medium._ (C7/C8)
9. **Mobile-menu model:** Escape, outside-click, scroll-lock, focus management. _Medium._ (C4/C7)
10. **Fix the 390px hero role clip** (`min-h` + wrap + smaller mobile font). _Small._ (C6)
11. **Contrast:** lift the dark `text-muted` token to ≥4.5:1; enforce a 12px floor on content-bearing labels/pills. _Small._ (C3/C6/C7)

### P2 — Valuable refinements
12. Consolidate section widths + add `scroll-padding-top`; reduce/relocate the Education section; tighten `py-24 → py-16 md:py-24`. _Small._ (C2/C4/C6)
13. Redesign project cards: shrink the 176px header, promote the headline metric to a stat chip, raise icon contrast. _Medium._ (C2/C5)
14. Nav polish: persistent "Get in touch" pill, résumé opens in a new tab, `aria-label` + real target on the logo, `IntersectionObserver` scroll-spy, un-scrolled scrim. _Small–Medium._ (C4)
15. `aria-hidden` all decorative canvases/terminal; name every `<section>` via `aria-labelledby`; give the Preloader progress semantics (or remove). _Small._ (C7)
16. Optimize `og-image.png` (<200KB); trim Inter weights; `manualChunks` + lazy below-fold sections. _Small–Medium._ (C9)
17. Trim Skills to signal (mark a "Core" set); enrich Education (honors/capstone link). _Small._ **Needs your info.** (C5)

### P3 — Optional polish
18. Reduce four-accent usage to primary+secondary; keep scan-lines only on the Featured card; forced-colors fallback for gradient text. _Small–Medium._ (C3)
19. Fluid `clamp()` type; deploy or delete the `elevated` token; single body line-height; map off-palette gradients to accent tokens. _Small._ (C2/C3)
20. Remove `lucide-react` + unused assets; card `focus-within` states; `SectionHeading` variation. _Small._ (C2/C8/C9)

---

## E. Proposed Design Direction

**Visual personality:** _"An engineer who ships."_ Keep the dark, technical, neural identity — it's on-brand and well-executed — but shift the ratio from *decoration-forward* to *proof-forward*. Let one or two motion moments and one signature element (a real product screenshot/GIF) carry the "wow," and let calm, high-contrast content carry the trust. Restraint is the upgrade, not more effects.

- **Typography system:** Keep Inter + JetBrains Mono (mono reserved for labels/dates/code — already good). Establish an explicit token scale (12 / 14 / 16 / 18 / 24 / 32 / 48 / 72) with a **12px floor** for any content-bearing text. Add two `clamp()` display sizes (hero name, section titles) to remove the 768–1023px plateau. One body line-height (1.7).
- **Color system:** Demote from four co-equal accents to **primary = neural, secondary = synapse**, with **pulse = error/attention** and **matrix = success/availability** as *semantic-only*. Cap inline highlights to one accent per paragraph. Add a third dark surface step (use `elevated`) so cards read as raised without relying solely on borders. Keep the excellent light-theme token pass; add a `forced-colors` fallback.
- **Spacing scale:** 4/8px system (already close). Responsive section rhythm `py-16 md:py-24`; vary padding by payload (flagship roomy, sparse sections tight). Fixed heading left-edge across all sections.
- **Container widths:** One outer width for section **headers** (`max-w-6xl`/`7xl`); narrow only inner bodies (timeline, education). Add `scroll-padding-top: 5rem`.
- **Grid:** Projects `1 / 2 / 3` (keep), Skills `auto-rows-fr` for even rows. Featured project keeps a distinguishing visual at every breakpoint (slim horizontal pipeline below lg).
- **Button hierarchy:** Exactly **one primary** (gradient fill) + **one secondary** (outline) per screen; tertiary = text link. Resume as a persistent nav pill, not a repeated hero button.
- **Card treatment:** Media area earns its height — real screenshot or a compact metric-led band; icon ≥`text/40`; scan-line reserved for the Featured card; `focus-within` mirrors hover.
- **Animation principles:** One hero focal motion + subtle background; everything else is one-shot on reveal or on hover/focus. A global pause control. Never gate content. Never animate invisible/off-screen elements. Full reduced-motion parity.
- **Mobile behavior:** Content order already sound; make it *denser and faster* — no fake preloader, shorter headers, viewport-bounded (not document-tall) background, no invisible animation loops, comfortable tap targets (already largely 44px).

Guardrail: keep it an **engineer's portfolio**, not an agency showpiece — technical information must stay easy to find; decoration must never sit on top of readable content.

---

## F. Section-by-Section Recommendations

- **Navbar** — _Keep_ scroll-spy, aria-current, ThemeToggle, skip link. _Add_ GitHub/LinkedIn icons + a "Get in touch" pill; label the logo and point it to `#main`. _Fix_ the mobile-menu model (Escape/outside-click/scroll-lock/focus) and the `md`→`lg` breakpoint. _Redesign_ the un-scrolled state with a faint scrim.
- **Hero** — _Keep_ the availability pill, gradient name, primary CTA, reduced-motion gating. _Rewrite_ to one static title + outcome value line. _Remove/trim_ 6 badges → 3 (or none), and either ParticleField or NeuralNetworkViz (not both). _Add_ desktop proof (stat/proof chips) and GitHub. _Fix_ the 390px role clip. _Missing:_ location + work type.
- **About** — _Keep_ the two prose paragraphs and counters. _Rewrite_ the cliché close into a specific value statement. _Redesign/aria-hide_ the terminal (trim it or make it carry a real proof point). _Fix_ the 3-col stat squeeze at 390px.
- **Experience** — _Keep_ the timeline (a strength). _Rewrite_ the Apliman bullets toward delivered work. _Fix_ mobile indent (`pl-8`) and gate the perpetual scan-line to hover.
- **Skills** — _Keep_ the categorized cards. _Remove_ low-signal tags (IDE trio, standalone SVM); optionally mark a "Core" set. _Redesign_ for even rows (`auto-rows-fr`).
- **Projects (most important)** — _Keep_ honest repo handling, real metrics, the featured treatment. _Add_ **screenshots** and the FlowPilot repo/honest state. _Rewrite_ every card to Problem→Role→Result; contextualize 98.6%; add a fraud metric. _Redesign_ the empty 176px header into a metric/screenshot band. _Add_ a lightweight case-study path for the top 2–3.
- **Education** — _Keep_ the card. _Reorder_ (tighten padding, or move below Contact). _Add_ honors/GPA (if strong), a capstone→project link, key coursework. _Missing:_ the academic-to-project connection.
- **Contact** — _Keep_ the excellent accessible form and multi-channel cards (a genuine strength). _Remove_ one of the two DataStreams. _Fix_ the GitHub-card contrast already handled; ensure placeholder contrast.
- **Footer** — _Keep_ (socials, year). Fine as-is after the touch-target fix already applied.
- **Preloader** — _Remove_ (or hard-cap + reduced-motion + progress semantics). Highest effort-to-annoyance ratio on the site.
- **Global decoration (ParticleField / Orbs / DataStream)** — _Keep_ as a **hero-scoped**, viewport-bounded, cheaper accent; _remove_ the full-document cost and the invisible mobile loops; _add_ a pause control.

---

## G. Suggested Page Structure

Content supports keeping a single-page site; the improved information architecture:

1. **Navigation** — logo (→top, labeled) · About · Experience · Projects · Skills · Contact · **Resume** · **GitHub/LinkedIn** · Theme · **Pause-motion**
2. **Hero / value proposition** — one static title + outcome line · availability (type + location) · **primary CTA (View Work) + secondary (Get in touch)** · GitHub/LinkedIn · **desktop proof chips**
3. **Selected Projects** (moved up — it's the proof) — Featured (FlowPilot, with screenshot + repo/demo) → grid with screenshots + Problem/Role/Result + headline metric
4. **Professional Experience** — timeline (delivered-work bullets)
5. **Technical Capabilities (Skills)** — trimmed, "Core" highlighted
6. **About** — crisp value statement + focused prose (trimmed terminal)
7. **Education** — compact strip with capstone→project link (or fold into About)
8. **Contact & final CTA** — the strong form + channels
9. **Footer**

Key change vs today: **Projects moves above Experience/Skills** (lead with proof), **Education demotes** to a strip and stops interrupting Projects→Contact, and GitHub/proof rise into the hero.

---

## H. Implementation Roadmap

**Phase 0 — Safe, no content decisions (do first):**
- Remove/hard-cap Preloader (`Preloader.jsx`, `App.jsx`) + reduced-motion skip.
- ParticleField: viewport-size + flat strokes + lower mobile node cap + debounce resize (`ParticleField.jsx`).
- Mount heavy canvases only at breakpoint (`Hero.jsx`, `Contact.jsx`) — introduce a `useMediaQuery` hook.
- Lift dark `--color-text-muted`; 12px label floor; `scroll-padding-top`; `aria-hidden` decorative canvases/terminal (`index.css`, misc).
- Optimize `og-image.png`; trim Inter weights; remove `lucide-react` + unused assets.
- 390px hero role fix (`Hero.jsx`).
_Testing: build, keyboard tab-through, reduced-motion on/off, 390/768/1024/1440, Lighthouse before/after, VoiceOver/NVDA smoke._

**Phase 1 — Positioning + navigation (needs your one-liner/role):**
- Static primary title + outcome value line + complete-not-typed headline (`Hero.jsx`, align `index.html`).
- GitHub/LinkedIn in Navbar + hero; desktop proof chips; CTA reduction.
- Mobile-menu model; "Get in touch" pill; résumé-in-new-tab; logo label/target; IntersectionObserver scroll-spy.
- Global **Pause animations** toggle + a shared reduced-motion reveal wrapper.
_New/refactored: `useMediaQuery`, `usePausedMotion` (or extend ThemeContext), a `Reveal` wrapper, `SocialLinks` component. New token(s): none required; optional `--color-elevated` wired up._

**Phase 2 — Projects credibility (needs your content):**
- Add an `image` field per project + render (screenshots). Rewrite cards to Problem/Role/Result. Fix FlowPilot repo/state. Contextualize metrics. Redesign the card header/media band. Optional case-study modal.
- Reorder sections (Projects up, Education demoted).
_Testing: link checks, image lazy-load + `alt`, CLS check, re-run the responsive + a11y passes._

**Phase 3 — Design-system polish:**
- Accent discipline (primary/secondary), forced-colors fallback, fluid type, section-width unification, `auto-rows-fr` Skills, `manualChunks` + lazy sections, Skills/Education content enrichment.
_Testing: full regression across themes + breakpoints; Lighthouse ≥90 perf/a11y target; verify share-card unfurl._

**Content decisions required from you before Phase 1–2:** target role / one-line pitch, availability type + location, project screenshots, FlowPilot repo decision + URL, the missing/contextualized metrics, Education honors/coursework, and confirmation of any claim you want kept as-is.

---

## Final Summary

### 1. The five most important problems
1. **No project screenshots / visual proof** — the section recruiters come for reads as identical placeholders. _(Critical, C5)_
2. **Fake ~1.5s preloader hides already-rendered content** and ignores reduced motion. _(High, C8/C9)_
3. **Diluted positioning** — 5 cycling titles, buzzword value line, no GitHub above the fold, vague availability. _(High, C1)_
4. **Always-on animation cost** — full-document O(n²) particle canvas + invisible mobile loops → jank/battery, and it undercuts the "senior/trustworthy" read. _(High, C8/C9)_
5. **Feature-list project copy + one implausible-looking metric** — no Problem→Role→Result, and "98.6%" with no context taints the good numbers. _(High, C5)_

### 2. The five highest-impact improvements
1. **Add 3–4 real screenshots** (incl. the FlowPilot live app) behind the existing card headers.
2. **Remove/hard-cap the preloader** and reveal the hero immediately.
3. **Anchor one identity + outcome value line + GitHub/proof above the fold** (desktop included).
4. **Rewrite each project to Problem → Role → Result** and contextualize/soften metrics.
5. **Right-size the animation budget** (viewport-bounded particles, mount canvases only where shown, add a pause control, complete reduced-motion) — cheaper *and* more professional.

### 3. Recommended first implementation phase
**Phase 0 (above)** — all safe, no content decisions: kill/cap the preloader, cut the ParticleField cost + stop invisible mobile loops, dark `text-muted` contrast + 12px floor, `scroll-padding-top`, `aria-hidden` decorative canvases, optimize the OG image, trim fonts/deps, fix the 390px role clip. Highest ratio of user/hiring impact to effort and risk, and it makes the site measurably faster and calmer before any redesign.

### 4. Questions / missing content that block accurate improvements
1. **Primary target role** and a **one-line value pitch** (to anchor positioning + rewrite the hero).
2. **Availability** — full-time / contract / internship — and **location / remote / timezone**.
3. **Project screenshots** (or permission to capture from the live apps) for FlowPilot + the NLP/ML projects + a photo of the prosthetic arm.
4. **FlowPilot repo** — will it be public (URL) or should the card say "private / available on request"?
5. **Metric context** — dataset/split/baseline/task for the 98.6% claim, and a result metric for the fraud project; confirm each headline number.
6. **Education** — GPA/honors (if you want them shown) and which project was the capstone/FYP.
7. Any element you consider **non-negotiable** to keep (e.g., the particle field or terminal) so I calibrate the "reduce decoration" recommendations to your taste.
