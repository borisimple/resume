# Boris Krstić — portfolio

React + TypeScript + Vite verzija portfolija sa [borisk.framer.website](https://borisk.framer.website/), pripremljena za **https://borisimple.github.io/resume/**.

Sadržaj i izgled preneti su sa javnog sajta 23. oktobra 2026. Framer projekat `zRdQv8o7l5N4vMMi9GEn` korišćen je samo za čitanje; original nije menjan niti ponovo objavljivan.

## Lokalno pokretanje

Potrebni su Node.js 24 LTS i npm. Ako koristiš nvm, dovoljno je `nvm use` u ovom folderu.

```sh
npm ci
npm run dev
```

Otvori **http://127.0.0.1:5173/resume/**. Putanja `/resume/` je deo konfiguracije i lokalno.

Za proveru produkcione verzije:

```sh
npm run build
npm run preview
```

Otvori **http://127.0.0.1:4173/resume/**. Produkcioni fajlovi su u `dist/`.

## Objava u postojećem GitHub repozitorijumu

Javni repozitorijum je [borisimple/resume](https://github.com/borisimple/resume), a njegova podrazumevana grana je `master` (provereno 23. oktobra 2026). Workflow u `.github/workflows/deploy.yml` već prati tu granu.

1. Raspakuj ZIP. U drugom folderu preuzmi postojeći repozitorijum:

   ```sh
   git clone https://github.com/borisimple/resume.git
   cd resume
   git switch master
   git pull --ff-only
   git branch backup-before-react-portfolio
   ```

2. Kopiraj **sadržaj** raspakovanog foldera `boris-portfolio` u koren kloniranog `resume` repozitorijuma. Uključi skrivene fajlove i foldere `.github`, `.gitignore` i `.nvmrc`. Novi `index.html` treba da bude direktno u korenu repozitorijuma. Zameni istoimene fajlove. Sačuvaj postojeći `.git` folder; tako se čuva istorija i pristup repozitorijumu. Stari CSS i slike mogu ostati, jer ih nova verzija ne učitava.

   Na macOS/Linux možeš kopirati ovako, nakon što zameniš izvornu putanju stvarnom putanjom raspakovanog foldera:

   ```sh
   rsync -av --exclude='.git/' --exclude='node_modules/' --exclude='dist/' /putanja/do/boris-portfolio/ ./
   ```

3. Proveri novu verziju, pa pošalji kod:

   ```sh
   npm ci
   npm run build
   git add .
   git commit -m "Replace resume with React portfolio"
   git push origin master
   ```

   Ako želiš pregled pre zamene, napravi radnu granu pre commit-a (`git switch -c portfolio-react-vite`), pošalji nju i spoji Pull Request u `master` kada bude spreman.

4. U GitHub repozitorijumu otvori **Settings → Pages → Build and deployment → Source → GitHub Actions**. Zatim otvori **Actions → Deploy portfolio to GitHub Pages**. Ako je push urađen pre promene Pages podešavanja, pokreni **Run workflow** na grani `master` ili ponovi neuspešno izvršavanje.

5. Kada oba posla (`build` i `deploy`) završe zeleno, sajt je na **https://borisimple.github.io/resume/**. Workflow koristi ugrađeni `GITHUB_TOKEN`; ručno dodavanje tokena ili GitHub secrets nije potrebno.

Ako kasnije preimenuješ granu u `main`, promeni `branches: [master]` u workflow-u u `branches: [main]`. `base: '/resume/'` ostaje u `vite.config.ts` dok je ime repozitorijuma `resume`.

## Šta je preneto

- Uvod, osam projektnih kartica, iskustvo, engineering highlights, sertifikati, about, toolbox i kontakt.
- Dve nezavisne Masonry kolone od 810 px, sa originalnim redosledom projekata u svakoj koloni. Ispod 810 px kartice se čitaju redom u jednoj koloni.
- Pet originalnih slika sajtova, lokalni Geist i Satoshi fontovi i originalni SVG oblici Microsoft, LinkedIn, Flickr i Pexels logotipa.
- Power Apps popup sa sva tri originalna projekta, skrolovanjem, Escape zatvaranjem, zatvaranjem klikom van panela i povratkom fokusa na karticu.
- Sve originalne projektne, društvene i email destinacije. Armada portal i interni Power Apps projekti nemaju javne URL-ove u originalu, pa nisu dodati izmišljeni linkovi.
- Jednake visine i širine društvenih kartica, jednostavno podizanje kartica na hover i podrška za reduced motion. Nema blur efekata.

Kopija ima sopstvene React komponente i CSS. Ne učitava Framer runtime, Framer analitiku, Framer badge, udaljene slike ili udaljene fontove. Na vrlo uskim telefonima tipografija se dodatno prilagođava da sadržaj ostane čitljiv. Dodata je mala lokalna BK favicon ikonica.

## Izmena sadržaja

| Fajl | Sadržaj |
| --- | --- |
| `src/data/portfolio.json` | Projekti, linkovi, iskustvo, highlights, sertifikati i društveni profili |
| `src/App.tsx` | Glavne sekcije i naslovi |
| `src/components/PowerAppsModal.tsx` | Sva tri opisa u popup-u |
| `src/components/ProjectCard.tsx` | Slike, logo paneli i prikaz projekata |
| `src/components/Masonry.tsx` | Responsive raspored projektnih kartica |
| `src/styles.css` | Boje, tipografija, razmaci i hover efekti |
| `public/assets/` | Lokalni medijski fajlovi i fontovi |
| `vite.config.ts` | GitHub Pages base path |
| `.github/workflows/deploy.yml` | Automatska izgradnja i objava |

## Provere

`npm run build` pokreće TypeScript proveru i Vite produkcionu izgradnju. Rezultati izvršenih provera navedeni su u `QA.md`.

Uključeni su i Playwright testovi za responsive raspored, slike, linkove i popup. Za njihovo zasebno pokretanje:

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

Za ručnu proveru širina dok radi `npm run dev`, otvori **http://127.0.0.1:5173/resume/tests/viewport.html**. Ovaj pomoćni HTML nije deo produkcione izgradnje.

## Izvori

Poreklo lokalnih fajlova i njihovi SHA-256 otisci su u `ASSETS.json`; obaveštenja o fontovima i logotipima su u `THIRD_PARTY.md`.

Workflow prati [Vite uputstvo za GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages) i [GitHub dokumentaciju za Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). Verzije Actions koraka vezane su za proverene commit-e.

## Migracija ovog checkout-a

Ovaj checkout je prebačen sa Bootstrap/Gulp verzije na React/Vite. Git istorija i `.vscode` podešavanja su sačuvani. `public/service-worker.js` gasi stari service worker posle objave: uklanja samo stavke starog `sw-cache` keša koje pripadaju ovom sajtu i odjavljuje staru registraciju. Nova aplikacija ne registruje service worker.

Migracioni testovi za stari service worker pokreću se komandom `npm test` i uključeni su u GitHub Actions pre build-a. Proveravaju gašenje stare registracije, uklanjanje samo keša ovog sajta i očuvanje podataka drugih sajtova na istom domenu.
