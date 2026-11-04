# city-live.it

Sito di presentazione di **City Live**, l'app gratuita con gli eventi, le notizie e i servizi della città. L'app è in preparazione, quindi la pagina dice «in arrivo» e raccoglie i contatti di chi vuole essere avvisato via email.

Sito statico (HTML, CSS e un po' di JavaScript, nessuna compilazione), pubblicato con **GitHub Pages** sul dominio `city-live.it` (registrato su Aruba).

## File

| File | A cosa serve |
|---|---|
| `index.html` | La pagina, con testi, stili e dati strutturati per Google |
| `js/citylive.js` | Comparsa dei blocchi e il telefono disegnato che cambia città |
| `assets/logo.svg` | Il marchio (proposta, finché l'app non ha la sua icona definitiva) |
| `assets/` | Icone, immagine di anteprima per i social |
| `404.html` | Pagina per i link sbagliati |
| `CNAME` | Il dominio del sito, non toccarlo |
| `robots.txt`, `sitemap.xml`, `llms.txt` | Indicazioni per i motori di ricerca e per le AI |

Il sito non usa cookie e non fa conteggi.

## Quando l'app esce sugli store

1. In `index.html` i due riquadri `.store-soon` («In arrivo su App Store / Google Play») diventano link veri, come i bottoni `.store-btn` di laquilive.it.
2. I pulsanti «Avvisami quando esce» diventano «Scarica gratis».
3. Nei dati strutturati (`MobileApplication`) si aggiungono `installUrl` e `sameAs` con i link degli store, e in `llms.txt` si toglie «non ancora sugli store».
4. Si aggiorna l'immagine `assets/og-citylive.jpg` (oggi dice «In arrivo»).

## Pubblicare una modifica

```
git add -A
git commit -m "Descrizione della modifica"
git push
```

GitHub Pages aggiorna il sito in 1 o 2 minuti.
