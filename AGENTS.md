# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

---

# Projet : site de versets coraniques thématiques

Site Next.js (App Router) qui regroupe des versets du Coran par thème, en arabe + traduction française, avec lecture audio. Chaque thème est une page autonome sous `app/<slug>/page.tsx`. L'utilisateur parle français : répondre en français.

## Lancer le projet

```bash
npm install
npm run dev          # http://localhost:3000
```

- `.claude/launch.json` (suivi dans git) lance le serveur sur le port **3001** avec un chemin `node` absolu propre au poste d'origine (`~/.nvm/.../v24.14.1`). Sur un autre poste, adapter `runtimeExecutable` (par ex. `npm` + `["run", "dev", "--", "-p", "3001"]`). Même remarque pour `start-dev.sh`.
- Après toute modification visible, vérifier la page dans le navigateur (preview) avant de conclure.

## Pages existantes

`app/page.tsx` redirige vers `/islam-in-quran`.

| Route | Thème | Couleur `ACCENT` | Symbole du lien de nav |
|---|---|---|---|
| `/islam-in-quran` | L'Islam, religion de tous les Prophètes | `#C9A84C` (or) | `←` |
| `/amour-allah` | L'Amour d'Allah | `#E8507A` (rose) | `♥` |
| `/sens-de-la-vie` | Le sens de la vie | `#10B981` (émeraude) | `✦` |
| `/isa-ibn-maryam` | Isa ibn Maryam | `#60A5FA` (bleu) | `✶` |
| `/les-heures-du-croyant` | Les heures du croyant | `#F59E0B` (ambre) | `☀` |
| `/parents-dans-le-coran` | Les parents dans le Coran | `#C084FC` (violet) | `◆` |
| `/beau-caractere` | Le beau caractère | `#2DD4BF` (turquoise) | `✿` |
| `/tawhid` | Le Tawhid (unicité d'Allah) | `#F97316` (orange) | `◉` |

Une nouvelle page doit avoir une couleur **et** un symbole qui ne sont pas déjà dans ce tableau. Mettre le tableau à jour.

## Architecture d'une page

Chaque page est un **server component async** autonome. Pas de base de données : les données viennent d'un JSON public.

- **Données** : `fetch('https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_fr.json', { next: { revalidate: 604800 } })`. Tableau de 114 sourates `{ id, name, transliteration, translation, type, total_verses, verses: [{ id, text, translation }] }`. Accès : `quran[s - 1].verses.find(v => v.id === n)`.
- **Contenu** : un tableau `SECTIONS: Section[]` en haut du fichier, seul endroit à éditer pour changer le contenu.
  ```ts
  type VerseRef = { s: number; v: number }
  interface VerseGroup { main: VerseRef[]; contextBefore?: VerseRef[]; contextAfter?: VerseRef[] }
  interface Section { id: string; title: string; groups: VerseGroup[] }
  ```
  - `title` = `"<arabe> — <français>"`. Le séparateur `—` est obligatoire : il sert à découper le titre.
  - `main` = versets affichés en évidence ; `contextBefore` / `contextAfter` = versets du passage, repliés dans un `<details>` « Voir le passage complet ».
- **Constantes de thème** : `ACCENT`, `ACCENT_DIM` (0.15), `ACCENT_FAINT` (0.07), `ACCENT_BORDER` (0.1). Certaines couleurs sont aussi écrites en `rgba(r,g,b,α)` en dur dans le fichier : lors d'une copie, remplacer toutes les occurrences.
- **Police arabe** : `Amiri` via `next/font/google`, appliquée avec `className={amiri.className}` et `dir="rtl"`.

### Composants partagés : `app/islam-in-quran/AudioButton.tsx` (client)

- `VerseAudioButton({ surahId, verseId })` : lecture d'un verset.
- `PassageAudioButton({ verses, label })` : lecture séquentielle d'une liste de `VerseRef`.
- Audio : `https://everyayah.com/data/Alafasy_128kbps/{sss}{vvv}.mp3` (Mishary Alafasy).
- **Surbrillance du verset en cours** : manipulation DOM pure, sans état React. Chaque `VerseBlock` porte `data-verse-id="{s}-{v}"` ; le composant audio ajoute `data-verse-playing="true"` sur le verset joué. Chaque page doit donc avoir l'attribut `data-verse-id` **et** ce CSS dans son `<style>` :
  ```css
  @keyframes versePlay { from { background: rgba(R,G,B,0.3); } to { background: rgba(R,G,B,0.15); } }
  [data-verse-playing="true"] { animation: versePlay 0.5s ease-out forwards !important; border-left-color: ACCENT !important; }
  ```

### Conventions d'interface (validées par l'utilisateur, à respecter)

- **Barre latérale** : le **français en gros** (couleur `ACCENT`), l'**arabe en petit** dessous (`0.68rem`, serif). Ne pas inverser.
- **Boutons audio d'une carte** : « Versets » (versets `main` seulement, affiché si `main` en a plus d'un) **et** « Passage complet » (contexte + main), côte à côte sous les versets principaux. Une carte sans contexte n'affiche que les boutons par verset, plus « Écouter le passage » si elle compte plusieurs versets.
- **Grille principale** (`.main-grid`) : `maxWidth: '1450px', margin: '0 1.5rem', padding: '0 1rem 2rem', display: 'grid', gridTemplateColumns: '263px 15fr', gap: '0.5rem', alignItems: 'start'`. La barre latérale est masquée sous 1024px.
- **Hero** : nav vers toutes les autres pages, verset arabe d'accroche, titre `h1` avec une partie en `ACCENT`, sous-titre, pastilles d'ancres vers les sections. **Clôture** : un verset final en arabe, sa traduction et sa référence.
- Thème sombre : fond `#060C18 → #07101E`, cartes `#0C1B30`.

## Ajouter une nouvelle page (checklist)

1. Copier la page la plus récente (`app/tawhid/page.tsx` ou `app/beau-caractere/page.tsx`) vers `app/<slug>/page.tsx`.
2. Choisir une couleur et un symbole libres (voir tableau), puis remplacer `ACCENT*` et **toutes** les `rgba(...)` de l'ancienne couleur.
3. Mettre à jour `metadata`, le nom de la fonction de page, le verset du hero, le titre, le sous-titre et le verset de clôture.
4. Écrire `SECTIONS`. Règles de contenu :
   - **Vérifier chaque référence** dans `public/data/quran_fr.json` (copie locale du même JSON) avant de l'utiliser, voir la commande plus bas. Ne jamais citer un numéro de verset de mémoire sans vérifier.
   - Ne pas faire figurer deux fois le même verset sur une page, que ce soit en `main` ou en contexte.
   - Donner à chaque verset principal un contexte avant ou après quand le passage l'éclaire.
5. Ajouter le lien `<symbole> <Titre> →` dans la nav du hero de **toutes** les autres pages (après le dernier lien), et mettre dans la nouvelle page les liens vers toutes les autres.
6. Vérifier dans le navigateur : rendu, barre latérale, boutons audio, surbrillance.
7. Mettre à jour le tableau des pages ci-dessus.

Vérifier un verset en local :

```bash
python3 -c "import json;q=json.load(open('public/data/quran_fr.json'));s,v=2,255;x=q[s-1]['verses'][v-1];print(q[s-1]['transliteration'],s,v);print(x['text']);print(x['translation'])"
```

## Autres fichiers

- `get_ayat.py` / `salam_verses.txt` : script de recherche ponctuel (versets contenant la racine « سلم ») et son résultat.
- `docs/index.html` : page HTML statique indépendante (« Les Meilleurs d'entre Vous »), hors de l'app Next.
- `components/`, `hooks/`, `lib/` : vides. Les dépendances `mongodb`, `mongoose`, `nodemailer` et `@emailjs/browser` ne sont pas utilisées par le site (héritées du gabarit `next_ecommerce_koris_digital`).

## Git

- Branche unique `main`, remote `https://github.com/MDiakhate12/islam_app.git`.
- Messages de commit courts dans le style existant (`New page <slug> + nav links`).
- Ne committer et pousser que lorsque l'utilisateur le demande ; il dit en général « commit et push ».
- `.claude/settings.local.json` est suivi par git mais contient des permissions propres au poste : ne pas committer ses modifications locales.
