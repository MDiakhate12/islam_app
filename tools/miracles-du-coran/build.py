"""Construit la mosaïque docs/miracles-du-coran/index.html.

Source unique du contenu : docs/miracles-du-coran/lecture-verticale.html (versets, mots, explications,
schémas, sources). Ce script y ajoute les textes courts de recits.py et les titres de titres.json.
Usage : python3 tools/miracles-du-coran/build.py [--liste]
"""
import html, json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
VERT = os.path.join(ROOT, "docs", "miracles-du-coran", "lecture-verticale.html")
OUT = os.path.join(ROOT, "docs", "miracles-du-coran", "index.html")
sys.dont_write_bytecode = True
sys.path.insert(0, HERE)
from recits import R
from pourquoi import WHY, ECART
from ordre import ORDRE

page_v = open(VERT, encoding="utf-8").read()
script = re.findall(r"<script>(.*?)</script>", page_v, flags=re.S)[-1]
data_js = script[:script.index("/* ---------- Rendu")]
res = subprocess.run(["node", "-e", data_js + "\nprocess.stdout.write(JSON.stringify({AR, CH, P, SLUG}));"],
                     capture_output=True, text=True, check=True)
SRC = json.loads(res.stdout)
AR, CH, PLATES, SLUG_V = SRC["AR"], SRC["CH"], SRC["P"], SRC["SLUG"]
P = {p["title"]: p for p in PLATES}
i = page_v.index('<svg width="0" height="0"'); defs = page_v[i:page_v.index("</svg>", i) + 6]
PHEN = json.load(open(os.path.join(HERE, "titres.json"), encoding="utf-8"))

# Cohérence : chaque planche a un récit, un titre et la même adresse dans les deux vues
titles = [p["title"] for p in PLATES]
assert sorted(titles) == sorted(r[0] for r in R), "recits.py ne couvre pas exactement les planches"
assert sorted(titles) == sorted(PHEN), "titres.json ne couvre pas exactement les planches"
for t, slug, *_ in R:
    assert SLUG_V.get(t) == slug, f"adresse différente dans lecture-verticale.html pour « {t} »"
assert set(WHY) <= {r[1] for r in R}, "pourquoi.py nomme un signe inconnu"
assert set(ECART) <= set(WHY), "ECART nomme un signe sans écran Pourquoi"
assert sorted(ORDRE) == sorted(r[1] for r in R), "ordre.py doit nommer chaque signe une fois"

# Les trois récits écrits à la main lors du premier prototype
MANUAL = {
  "byzantins": {"label": "Ar-Rūm, 30:2-4, extrait", "ar": ["30:2", "30:3", ("30:4", "فِي بِضۡعِ", "ۗ")],
                "fr": "« Les Romains ont été vaincus, dans la terre la plus proche ; et après leur défaite, ils vaincront, dans quelques années. »",
                "hl": ["بِضْعِ"], "word": {"w": "بِضْع", "tr": "biḍʿ", "root": "بضع", "mean": "En arabe, un nombre de trois à neuf. L’annonce se donne donc un délai précis."},
                "sentence": "En 614, les Perses prennent Jérusalem et l’Empire byzantin s’effondre. À La Mecque, le Coran annonce sa revanche « dans quelques années ». Huit ans plus tard, Héraclius contre-attaque.", "big": "622"},
  "fer": {"label": "Al-Ḥadīd, 57:25, extrait", "ar": [("57:25", "وَأَنزَلۡنَا ٱلۡحَدِيدَ", " وَلِيَعۡلَمَ")],
          "fr": "« Et Nous avons fait descendre le fer, qui renferme une force redoutable et des bienfaits pour les gens. »",
          "hl": ["أَنزَلْنَا", "ٱلْحَدِيدَ"], "word": {"w": "أَنزَلْنَا", "tr": "anzalnā", "root": "نزل", "mean": "Faire descendre, faire venir d’en haut. Le verset le dit du fer, en toutes lettres."},
          "sentence": "Le fer de la Terre a été forgé dans les étoiles. Et le premier fer que l’homme a travaillé est tombé du ciel, en météorites.", "big": "32 %"},
  "montagnes": {"label": "An-Nabaʾ, 78:6-7", "ar": ["78:6", "78:7"],
                "fr": "« N’avons-Nous pas fait de la terre une couche, et des montagnes des piquets ? »",
                "hl": ["أَوْتَادًا"], "word": {"w": "أَوْتَاد", "tr": "awtād", "root": "وتد", "mean": "Le piquet de la tente : on n’en voit que la tête, l’essentiel est enfoncé dans le sol."},
                "sentence": "Le Tibet s’élève à 5 km. Sous lui, la croûte terrestre est épaisse d’environ 70 km, le double d’une croûte ordinaire. D’une montagne, on ne voit que la tête.", "big": "× 6"},
}
# Mots à surligner en plus des mots clés de la planche
EXTRA_HL = {"lumiere": ["سِرَاجًا", "مُّنِيرًا"], "vie-eau": ["مَآءٍ"],
            "cycle-eau": ["بِقَدَرٍ", "فَأَسْكَنَّاهُ"], "thamud": ["تَنْحِتُونَ", "بُيُوتًا", "جَابُوا", "ٱلصَّخْرَ"]}

def groups_of(p, keys):
    """Chaque verset ou passage cité, en entier, avec les mots clés surlignés."""
    out = []
    for ref, sura, fr in p["v"]:
        s, a, b = verses(ref)
        ar = " ".join(with_ayah(mark(AR[f"{s}:{n}"], keys)[0], n) for n in range(a, b + 1))
        size = sum(len(AR[f"{s}:{n}"]) for n in range(a, b + 1))
        frh = " ".join(f"<sup>{a + i}</sup>{nb(html.escape(x))}" for i, x in enumerate(fr)) if isinstance(fr, list) else nb(html.escape(fr))
        out.append({"label": f"{sura}, {ref}", "ar_html": ar, "fr_html": frh, "size": "" if size < 140 else ("m" if size < 320 else "s"),
                    "ayahs": [f"{s}:{n}" for n in range(a, b + 1)]})
    return out

# Extraits de plusieurs versets quand un seul couperait la phrase
EXV = {"cortex-prefrontal": [15, 16], "sexe-pere": [45, 46]}

def norm(t):
    t = re.sub("\u0649[\u064B-\u0652]*\u0670", "\u0627", t)  # ىٰ se lit ā : دَحَىٰهَآ (Médine) = دَحَاهَا
    t = re.sub("[ً-ٰٟۖ-ۭـ]", "", t)
    # ى et ي confondus : le texte de Médine écrit souvent ي là où d’autres éditions écrivent ى
    return re.sub("[ٱأإآ]", "ا", t).replace("ا", "").replace("ى", "ي").replace("ة", "ه")

# Mots courants qu’une clé courte attrape à tort : فَلَمَّا (أَفَلَ), ٱلسَّبِيلِ (سَبَإ), لَّعَلِّيٓ (ٱلْأَعْلَىٰ)
STOP = {"فلم", "لسبيل", "لعلي"}

def mark(text, keys):
    keys = [norm(k) for k in keys if len(norm(k)) >= 2]
    toks = [f"<mark>{html.escape(t)}</mark>" if norm(t) not in STOP and any(k in norm(t) for k in keys) else html.escape(t) for t in text.split(" ")]
    return " ".join(toks), any(k in norm(text) for k in keys)

def nb(t): return re.sub(r"(\d) (?=\d{3}\b|%|km\b|m\b|g\b|h\b|°)", "\\1\u00a0", re.sub(" ([:;?!»])", "\u00a0\\1", t).replace("« ", "«\u00a0"))

def ind(n): return str(n).translate(str.maketrans("0123456789", "٠١٢٣٤٥٦٧٨٩"))

def with_ayah(h, n):
    """Le numéro du verset reste collé au dernier mot, sans passer seul à la ligne."""
    head, _, last = h.rpartition(" ")
    return (head + " " if head else "") + f'<span class="nw">{last}<span class="ayah">{ind(n)}</span></span>'

def verses(ref):
    s, r = ref.split(":")
    a, b = (map(int, r.split("-")) if "-" in r else (int(r), int(r)))
    return s, a, b

def fr_join(fr, a, ns):
    if isinstance(fr, str): return fr
    t = " ".join(fr[n - a].strip().lstrip("«").rstrip("»").strip() for n in ns)
    return f"« {'… ' if t[:1].islower() else ''}{t}{'' if t[-1:] in '.!?' else ' …'} »"

# « Aller plus loin » : textes découpés en paragraphes courts, noms des savants et des ouvrages en valeur
ABBR = {"av", "apr", "env", "cf", "p", "pp", "vol", "éd", "al", "b", "n°"}
SAVANTS = ["Ṭabarī", "Qurṭubī", "Ibn ʿĀshūr", "Ibn Kathīr", "Ibn ʿAbbās", "Ibn Zayd", "Ibn Fāris", "Ibn Qutayba", "Ibn ʿAṭiyya",
           "Ibn Manẓūr", "Qatāda", "Mujāhid", "al-Rāghib", "Al-Rāghib", "al-Rāzī", "Rāzī", "Bukhārī", "Muslim", "Tirmidhī",
           "al-Ḥasan al-Baṣrī", "al-Baṣrī", "Al-Zajjāj", "al-Zajjāj", "al-Azharī", "al-Jawharī", "al-Minhāl", "Saʿīd b. Jubayr",
           "Baghawī", "Zamakhsharī", "Lisān al-ʿArab", "Maqāyīs",
           "Muḥammad b. Ḥumayd al-Rāzī", "Ibn Ḥajar", "Abū Ḥātim", "al-Ḥasan", "Al-Ḥasan", "Sufyān al-Thawrī", "ʿAlī"]
NAMES = re.compile(r"(?<![\wʿʾ])(" + "|".join(sorted(map(re.escape, SAVANTS), key=len, reverse=True)) + r")(?![\wʿʾ])")

def sentences(t):
    """Phrases, sans couper après une abréviation (av. J.-C., b. Jubayr, et al.)."""
    out, cur = [], ""
    for part in re.split(r"(?<=[.!?])(\s+)(?=[«A-ZÀ-ÖØ-ÞĀ-ſḀ-ỿʿʾ(])", t):
        cur += part
        if not part.strip(): continue
        last = re.findall(r"([\w.\-ʿʾ°]+)\.$", cur.strip())
        if last and (len(last[0].split(".")[-1]) <= 2 or last[0] in ABBR or last[0].endswith("J.-C")): continue
        out.append(cur.strip()); cur = ""
    if cur.strip(): out.append(cur.strip())
    return out

def paras(t, target=240):
    """Paragraphes d’environ deux phrases ; un nouveau quand un autre savant prend la parole ou que le paragraphe deviendrait trop long."""
    ps, cur = [], ""
    for s in sentences(t):
        if cur and len(cur) >= 120 and (NAMES.match(s) or len(cur) + len(s) > 360): ps.append(cur); cur = ""
        cur = f"{cur} {s}".strip()
        if len(cur) >= target: ps.append(cur); cur = ""
    if cur:
        if ps and len(cur) < 90: ps[-1] += " " + cur
        else: ps.append(cur)
    return ps

def paras_html(t, names=False):
    out = [nb(html.escape(x)) for x in paras(t)]
    return [NAMES.sub(r'<b class="nm">\1</b>', x) for x in out] if names else out

RELIG = re.compile(r"(^|\.)(quran\.com|tafsir\.app|sunnah\.com|dorar\.net|islamweb\.net|shamela\.ws|maajim\.com)$")
def host(u): return re.sub(r"^https?://([^/]+).*$", r"\1", u)

def excerpt(key, words):
    """L’extrait du verset key, au caractère près dans le texte de Médine, retrouvé à partir de ses mots."""
    toks = AR[key].split(" "); want = [norm(w) for w in words.split()]
    clean = [re.sub("[\u06D6-\u06DC]+$", "", x) for x in toks]
    for i in range(len(toks) - len(want) + 1):
        if [norm(x) for x in clean[i:i + len(want)]] == want:
            return " ".join(toks[i:i + len(want) - 1] + [clean[i + len(want) - 1]])
    raise AssertionError(f"extrait introuvable dans {key} : {words}")

def resolve(c, p):
    """Carte prête à afficher : extrait coranique retrouvé, sources « rel » ou « ext » reprises de la planche."""
    c = dict(c)
    if "quote" in c:
        key, words = c.pop("quote"); c["ar"], c["key"] = excerpt(key, words), key
    links = c.get("links", [])
    if links in ("rel", "ext"):
        links = [s for s in p["src"] if bool(RELIG.search(host(s[1]))) == (links == "rel")][:2 if links == "rel" else 3]
        # « Verset » seul ne dit rien dans une carte : on y ajoute la référence lue dans l’adresse
        links = [[f"{l} {m.group(1)}:{m.group(2)}" if l in ("Verset", "Versets") and (m := re.search(r"quran\.com/(\d+)/([\d-]+)$", u)) else l, u] for l, u in links]
    c["links"] = links
    return c

stories, order = {}, []
for title, slug, stat, sentence, mean in R:
    p = P[title]
    if slug in MANUAL:
        m = MANUAL[slug]; parts = []
        for item in m["ar"]:
            if isinstance(item, tuple):
                key, start, end = item; full = AR[key]; a = full.find(start); b = full.find(end, a + 1)
                assert a >= 0 and b > a, (key, start); parts.append((key, full[a:b].strip()))
            else:
                parts.append((item, AR[item]))
        ar_html = " ".join(with_ayah(mark(t, m["hl"])[0], k.split(":")[1]) for k, t in parts)
        label, fr, word, sentence, big = m["label"], m["fr"], m["word"], m["sentence"], m["big"]
    else:
        w0 = p["words"][0]; keys = [w["w"] for w in p["words"]]; pick = None
        for g in p["v"]:
            s, a, b = verses(g[0])
            for n in range(a, b + 1):
                if mark(AR[f"{s}:{n}"], [w0["w"]])[1]: pick = (g, s, a, b, n); break
            if pick: break
        if not pick:
            g = p["v"][0]; s, a, b = verses(g[0]); pick = (g, s, a, b, a)
        g, s, a, b, n = pick
        ns = EXV.get(slug, [n])
        ar_html = " ".join(with_ayah(mark(AR[f"{s}:{k}"], keys)[0], k) for k in ns)
        ref = f"{ns[0]}-{ns[-1]}" if len(ns) > 1 else f"{ns[0]}"
        label = f"{g[1]}, {s}:{ref}" + (", extrait" if (b - a + 1) > len(ns) else "")
        fr = fr_join(g[2], a, ns)
        word = {"w": w0["w"], "tr": w0["tr"], "root": w0["root"], "mean": mean}
        big = stat
    keys = [w["w"] for w in p["words"]] + (MANUAL[slug]["hl"] if slug in MANUAL else []) + EXTRA_HL.get(slug, [])
    # Tous les mots clés de la planche : le principal d’abord, avec son explication, puis les autres avec leur sens court
    same = lambda x, y: norm(x) in norm(y) or norm(y) in norm(x)
    keywords = [word] + [{"w": w["w"], "tr": w["tr"], "root": w["root"], "mean": w["s"]} for w in p["words"] if not same(w["w"], word["w"])]
    why = [resolve(c, p) for c in WHY.get(slug, []) + ([ECART[slug]] if slug in ECART else [])]
    for c in why:
        assert not ("img" in c and "ar" in c), (slug, c["h"], "image ou verset, pas les deux")
        if "ar" in c: assert c["ar"] in AR[c["key"]], (slug, c["key"], "extrait absent du verset")
    stories[slug] = {"slug": slug, "groups": groups_of(p, keys), "title": title, "phen": PHEN[title], "ch": p["ch"], "stat": stat, "big": big, "sentence": sentence,
                     "why": why, "excerpt": {"label": label, "ar_html": ar_html, "fr": fr}, "word": word, "keywords": keywords,
                     "v": p["v"], "mot_p": paras_html(p["mot"], names=True), "sci_p": paras_html(p["sci"]), "cap": p["cap"], "svg": p["svg"], "src": p["src"]}
    assert " ".join(paras(p["mot"])) == " ".join(p["mot"].split()) and " ".join(paras(p["sci"])) == " ".join(p["sci"].split()), (slug, "découpage infidèle")
    order.append(slug)

def verse_form(w, p):
    """Le mot tel que l’écrit le texte de Médine dans le verset, s’il y figure tel quel."""
    for ref, _, _ in p["v"]:
        s, a, b = verses(ref)
        for n in range(a, b + 1):
            for tok in AR[f"{s}:{n}"].split(" "):
                tok = re.sub("[\u06D6-\u06DC]+$", "", tok)  # signes de pause
                if norm(tok) == norm(w): return tok
                if tok[:2] in ("فَ", "وَ") and norm(tok[2:]) == norm(w): return tok[2:]  # sans la conjonction
    return w

tiles = []
for p in PLATES:
    slug = SLUG_V[p["title"]]
    tiles.append({"ch": p["ch"], "title": p["title"], "phen": PHEN[p["title"]], "slug": slug, "stat": stories[slug]["stat"],
                  "ref": " ; ".join(g[0] for g in p["v"]), "word": verse_form("ٱلْحَدِيدَ" if slug == "fer" else p["words"][0]["w"], p)})

tiles.sort(key=lambda x: ORDRE.index(x["slug"]))

used = set()
for st in stories.values():
    for g in st["v"]:
        s, a, b = verses(g[0]); used.update(f"{s}:{n}" for n in range(a, b + 1))
data = {"tiles": tiles, "chapters": CH, "stories": stories, "AR": {k: AR[k] for k in sorted(used)}}
payload = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
body = open(os.path.join(HERE, "template.html"), encoding="utf-8").read()
body = body.replace("/*__DATA__*/null", payload).replace("<!--__DEFS__-->", defs)
head = ('<!DOCTYPE html>\n<html lang="fr">\n<head>\n<meta charset="UTF-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        '<style>[hidden]{display:none!important}body{margin:0}</style>\n')
cut = body.index("</style>") + len("</style>")
open(OUT, "w", encoding="utf-8").write(head + body[:cut] + "\n</head>\n<body>\n" + body[cut:].strip() + "\n</body>\n</html>\n")
if "--liste" in sys.argv:
    for slug in order:
        st = stories[slug]; print(f"{slug:26} | {st['excerpt']['label']:34} | {st['excerpt']['fr'][:80]}")
print("ok :", os.path.relpath(OUT, ROOT), len(stories), "récits")
