# Provere — 23. oktobar 2026.

## Izvršeno

- `npm run build`: uspešno, uključujući strogu TypeScript proveru.
- Produkciona verzija otvorena iz `dist/` preko Vite preview servera na `/resume/`.
- Svih osam projekata i svih deset jedinstvenih originalnih portfolio destinacija poređeno sa javnim Framer HTML-om: sačuvano.
- Pet slika, četiri SVG logotipa, tri font fajla, favicon, HTML i Geist licenca: HTTP 200 na putanji `/resume/`.
- Nakon skrolovanja svi slikovni resursi učitani. Nema udaljenih slikovnih resursa u stranici. Fontovi se takođe učitavaju lokalno.
- Na sveže učitanom produkcionom prikazu nisu zabeležene nove console greške ili upozorenja.
- Desktop prikaz i mobilni prikaz vizuelno pregledani i poređeni sa originalom; precizirani su originalni line-height i razmaci.
- Nema `blur()` efekata u stilovima.

## Responsive provera u browseru

Širine su proverene kroz iframe sa stvarnim viewport-om te širine. Na svakoj širini prikazano je osam projektnih kartica i tri društvene kartice.

| Širina | Horizontalno prelivanje | Projekti | Društvene kartice |
| --- | --- | --- | --- |
| 320 px | Nema | Jedna kolona, razmak 20 px | Jedna kolona, jednake visine ~253 px |
| 390 px | Nema | Jedna kolona, razmak 20 px | Jedna kolona, jednake visine 250 px |
| 810 px | Nema | Dve Masonry kolone, razmak 20–21 px | Tri kolone, visina 306 px |
| 1024 px | Nema | Dve Masonry kolone, razmak 20–21 px | Tri kolone, visina 306 px |
| 1280 px | Nema | Dve Masonry kolone, razmak 20–21 px | Tri kolone, visina 286 px |
| 1440 px | Nema | Dve Masonry kolone, razmak 20–21 px | Tri kolone, visina 286 px |

## Power Apps popup

Provereni su klik na karticu, otvaranje preko Enter i Space, sva tri projekta, mobilni raspored sa skrolovanjem, dugme za zatvaranje, klik van panela i Escape. Na produkcionoj verziji provereno je da Tab ostaje u popup-u, pozadina ne skroluje dok je otvoren i fokus se vraća na originalnu karticu nakon zatvaranja.

## Granice provere

Playwright regresioni testovi su uključeni u `tests/portfolio.spec.ts`; automatska Playwright suita nije pokrenuta u ovoj sesiji. Provere iznad izvršene su direktno kroz browser i lokalnu produkcionu izgradnju. Nije izvršena provera na fizičkom telefonu niti u svim browserima.

GitHub Actions workflow je pripremljen i njegove reference na Actions commit-e proverene preko javnog GitHub API-ja. Nije pokrenut na GitHub-u: kod nije poslat niti je postojeći GitHub Pages sajt zamenjen. Framer projekat nije menjan.

## Provera zamene lokalnog projekta

U `/Users/krkela/dev/resume` sačuvani su Git istorija i postojeća `.vscode` podešavanja. Stari Bootstrap/Gulp fajlovi zamenjeni su novim projektom. Pokrenuti su `npm ci`, sva tri migraciona testa (`npm test`) i produkcioni build (`npm run build`).
