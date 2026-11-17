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

# Les trois récits écrits à la main lors du premier prototype
MANUAL = {
  "byzantins": {"label": "Ar-Rūm, 30:2-4, extrait", "ar": ["30:2", "30:3", ("30:4", "فِى بِضْعِ", " ۗ")],
                "fr": "« Les Romains ont été vaincus, dans la terre la plus proche ; et après leur défaite, ils vaincront, dans quelques années. »",
                "hl": ["بِضْعِ"], "word": {"w": "بِضْع", "tr": "biḍʿ", "root": "بضع", "mean": "En arabe, un nombre de trois à neuf. L’annonce se donne donc un délai précis."},
                "sentence": "Révélée à La Mecque, avant l’Hégire, l’annonce précède les victoires d’Héraclius : elles tombent dans le délai.", "big": "622"},
  "fer": {"label": "Al-Ḥadīd, 57:25, extrait", "ar": [("57:25", "وَأَنزَلْنَا ٱلْحَدِيدَ", " وَلِيَعْلَمَ")],
          "fr": "« Et Nous avons fait descendre le fer, qui renferme une force redoutable et des bienfaits pour les gens. »",
          "hl": ["أَنزَلْنَا", "ٱلْحَدِيدَ"], "word": {"w": "أَنزَلْنَا", "tr": "anzalnā", "root": "نزل", "mean": "Faire descendre, faire venir d’en haut. Le Coran emploie le même verbe pour la pluie, le Livre, les bestiaux et le vêtement."},
          "sentence": "Le fer de la Terre a été forgé dans les étoiles. Et le premier fer que l’homme a travaillé est tombé du ciel, en météorites.", "big": "32 %"},
  "montagnes": {"label": "An-Nabaʾ, 78:6-7", "ar": ["78:6", "78:7"],
                "fr": "« N’avons-Nous pas fait de la terre une couche, et des montagnes des piquets ? »",
                "hl": ["أَوْتَادًا"], "word": {"w": "أَوْتَاد", "tr": "awtād", "root": "وتد", "mean": "Le piquet de la tente : on n’en voit que la tête, l’essentiel est enfoncé dans le sol."},
                "sentence": "Sous une montagne, une racine de roche légère plonge dans le manteau, environ six fois plus profonde que le relief n’est haut.", "big": "× 6"},
}
# Mots à surligner en plus des mots clés de la planche
EXTRA_HL = {"fer": ["أَنزَلَ"]}

def groups_of(p, keys):
    """Chaque verset ou passage cité, en entier, avec les mots clés surlignés."""
    out = []
    for ref, sura, fr in p["v"]:
        s, a, b = verses(ref)
        ar = " ".join(mark(AR[f"{s}:{n}"], keys)[0] + f'<span class="ayah">{ind(n)}</span>' for n in range(a, b + 1))
        size = sum(len(AR[f"{s}:{n}"]) for n in range(a, b + 1))
        frh = " ".join(f"<sup>{a + i}</sup>{html.escape(x)}" for i, x in enumerate(fr)) if isinstance(fr, list) else html.escape(fr)
        out.append({"label": f"{sura}, {ref}", "ar_html": ar, "fr_html": frh, "size": "" if size < 140 else ("m" if size < 320 else "s")})
    return out

# Extraits de plusieurs versets quand un seul couperait la phrase
EXV = {"cortex-prefrontal": [15, 16], "sexe-pere": [45, 46]}

def norm(t):
    t = re.sub("[ً-ٰٟۖ-ۭـ]", "", t)
    return re.sub("[ٱأإآ]", "ا", t).replace("ا", "").replace("ى", "").replace("ة", "ه")

def mark(text, keys):
    keys = [norm(k) for k in keys if len(norm(k)) >= 2]
    toks = [f"<mark>{html.escape(t)}</mark>" if any(k in norm(t) for k in keys) else html.escape(t) for t in text.split(" ")]
    return " ".join(toks), any(k in norm(text) for k in keys)

def ind(n): return str(n).translate(str.maketrans("0123456789", "٠١٢٣٤٥٦٧٨٩"))

def verses(ref):
    s, r = ref.split(":")
    a, b = (map(int, r.split("-")) if "-" in r else (int(r), int(r)))
    return s, a, b

def fr_join(fr, a, ns):
    if isinstance(fr, str): return fr
    t = " ".join(fr[n - a].strip().lstrip("«").rstrip("»").strip() for n in ns)
    return f"« {'… ' if t[:1].islower() else ''}{t}{'' if t[-1:] in '.!?' else ' …'} »"

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
        ar_html = " ".join(mark(t, m["hl"])[0] + f'<span class="ayah">{ind(k.split(":")[1])}</span>' for k, t in parts)
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
        ar_html = " ".join(mark(AR[f"{s}:{k}"], keys)[0] + f'<span class="ayah">{ind(k)}</span>' for k in ns)
        ref = f"{ns[0]}-{ns[-1]}" if len(ns) > 1 else f"{ns[0]}"
        label = f"{g[1]}, {s}:{ref}" + (", extrait" if (b - a + 1) > len(ns) else "")
        fr = fr_join(g[2], a, ns)
        word = {"w": w0["w"], "tr": w0["tr"], "root": w0["root"], "mean": mean}
        big = stat
    keys = [w["w"] for w in p["words"]] + (MANUAL[slug]["hl"] if slug in MANUAL else []) + EXTRA_HL.get(slug, [])
    stories[slug] = {"slug": slug, "groups": groups_of(p, keys), "title": title, "phen": PHEN[title], "ch": p["ch"], "stat": stat, "big": big, "sentence": sentence,
                     "excerpt": {"label": label, "ar_html": ar_html, "fr": fr}, "word": word,
                     "v": p["v"], "words": p["words"], "mot": p["mot"], "sci": p["sci"], "cap": p["cap"], "svg": p["svg"], "src": p["src"]}
    order.append(slug)

tiles = []
for p in PLATES:
    slug = SLUG_V[p["title"]]
    tiles.append({"ch": p["ch"], "title": p["title"], "phen": PHEN[p["title"]], "slug": slug, "stat": stories[slug]["stat"],
                  "ref": " ; ".join(g[0] for g in p["v"]), "word": "ٱلْحَدِيدَ" if slug == "fer" else p["words"][0]["w"]})

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
