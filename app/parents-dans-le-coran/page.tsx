import type { Metadata } from 'next'
import { Amiri } from 'next/font/google'
import { VerseAudioButton, PassageAudioButton } from '../islam-in-quran/AudioButton'
import type { VerseRef as AudioVerseRef } from '../islam-in-quran/AudioButton'

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Les parents dans le Coran — Birr ul walidayn',
  description:
    "Parcours complet des versets coraniques sur les parents — le commandement divin, le rang de la mère, les prophètes modèles, la dua de l'enfant et les limites de l'obéissance.",
}

/* ─── Types ──────────────────────────────────────────────────────────── */

interface Verse {
  id: number
  text: string
  translation: string
}

interface Surah {
  id: number
  name: string
  transliteration: string
  translation: string
  type: string
  total_verses: number
  verses: Verse[]
}

type VerseRef = { s: number; v: number }

interface VerseGroup {
  main: VerseRef[]
  contextBefore?: VerseRef[]
  contextAfter?: VerseRef[]
}

interface Section {
  id: string
  title: string
  groups: VerseGroup[]
}

/* ─── Curated sections ───────────────────────────────────────────────── */

const SECTIONS: Section[] = [

  /* ── Bloc I : Le commandement divin ─────────────────────────────────── */

  {
    id: 'tawhid-parents',
    title: "وَبِٱلۡوَٰلِدَيۡنِ إِحۡسَٰنًا — Juste après l'adoration d'Allah seul",
    groups: [
      {
        main: [{ s: 17, v: 23 }, { s: 17, v: 24 }],
        contextBefore: [{ s: 17, v: 22 }],
        contextAfter: [{ s: 17, v: 25 }],
      },
    ],
  },
  {
    id: 'commandements',
    title: "وَبِٱلۡوَٰلِدَيۡنِ إِحۡسَٰنًا — Le même commandement dans toutes les révélations",
    groups: [
      {
        main: [{ s: 6, v: 151 }],
        contextBefore: [{ s: 6, v: 150 }],
        contextAfter: [{ s: 6, v: 152 }, { s: 6, v: 153 }],
      },
      {
        main: [{ s: 4, v: 36 }],
        contextBefore: [{ s: 4, v: 35 }],
      },
      {
        main: [{ s: 2, v: 83 }],
        contextAfter: [{ s: 2, v: 84 }],
      },
    ],
  },

  /* ── Bloc II : La mère ────────────────────────────────────────────────── */

  {
    id: 'luqman-conseil',
    title: "وَهۡنًا عَلَىٰ وَهۡنٖ — Luqman à son fils : la mère, sa fatigue, et la limite",
    groups: [
      {
        main: [{ s: 31, v: 14 }, { s: 31, v: 15 }],
        contextBefore: [{ s: 31, v: 13 }],
      },
    ],
  },
  {
    id: 'rang-mere',
    title: "حَمَلَتۡهُ أُمُّهُۥ كُرۡهٗا — Elle l'a porté avec peine et mis au monde avec peine",
    groups: [
      {
        main: [{ s: 46, v: 15 }],
        contextAfter: [{ s: 46, v: 16 }, { s: 46, v: 17 }, { s: 46, v: 18 }],
      },
    ],
  },

  /* ── Bloc III : Dépenser pour ses parents ────────────────────────────── */

  {
    id: 'infaq-parents',
    title: "لِلۡوَٰلِدَيۡنِ — Les premiers à qui vous dépensez",
    groups: [
      {
        main: [{ s: 2, v: 215 }],
        contextBefore: [{ s: 2, v: 214 }],
      },
    ],
  },

  /* ── Bloc IV : Les prophètes modèles ─────────────────────────────────── */

  {
    id: 'yahya-isa',
    title: "بَرَّاً بِوَٰلِدَيۡهِ — Yahya et Isa, la bonté filiale comme marque des prophètes",
    groups: [
      {
        main: [{ s: 19, v: 14 }],
        contextBefore: [{ s: 19, v: 12 }, { s: 19, v: 13 }],
        contextAfter: [{ s: 19, v: 15 }],
      },
      {
        main: [{ s: 19, v: 32 }],
        contextBefore: [{ s: 19, v: 30 }, { s: 19, v: 31 }],
        contextAfter: [{ s: 19, v: 33 }],
      },
    ],
  },
  {
    id: 'yusuf-parents',
    title: "وَرَفَعَ أَبَوَيۡهِ عَلَى ٱلۡعَرۡشِ — Yusuf élève ses parents sur le trône",
    groups: [
      {
        main: [{ s: 12, v: 99 }, { s: 12, v: 100 }],
        contextBefore: [{ s: 12, v: 97 }, { s: 12, v: 98 }],
        contextAfter: [{ s: 12, v: 101 }],
      },
    ],
  },

  /* ── Bloc V : La dua pour ses parents ────────────────────────────────── */

  {
    id: 'dua-prophetes',
    title: "رَبِّ ٱرۡحَمۡهُمَا — La dua que nous ont enseignée les prophètes",
    groups: [
      {
        main: [{ s: 27, v: 19 }],
        contextBefore: [{ s: 27, v: 18 }],
        contextAfter: [{ s: 27, v: 20 }],
      },
      {
        main: [{ s: 14, v: 41 }],
        contextBefore: [{ s: 14, v: 40 }],
        contextAfter: [{ s: 14, v: 42 }],
      },
      {
        main: [{ s: 71, v: 28 }],
        contextBefore: [{ s: 71, v: 26 }, { s: 71, v: 27 }],
      },
    ],
  },

  /* ── Bloc VI : La limite de l'obéissance ─────────────────────────────── */

  {
    id: 'limite-shirk',
    title: "وَإِن جَٰهَدَاكَ — S'ils t'invitent au shirk, ne leur obéis pas",
    groups: [
      {
        main: [{ s: 29, v: 8 }],
        contextAfter: [{ s: 29, v: 9 }],
      },
    ],
  },

  /* ── Bloc VII : Ibrahim et son père ─────────────────────────────────── */

  {
    id: 'ibrahim-dialogue',
    title: "يَٰٓأَبَتِ — Ibrahim interpelle son père avec douceur",
    groups: [
      {
        main: [
          { s: 19, v: 42 }, { s: 19, v: 43 }, { s: 19, v: 44 },
          { s: 19, v: 45 }, { s: 19, v: 46 }, { s: 19, v: 47 },
        ],
        contextBefore: [{ s: 19, v: 41 }],
      },
    ],
  },
  {
    id: 'ibrahim-bara',
    title: "فَلَمَّا تَبَيَّنَ لَهُۥٓ — Quand la mécréance du père fut certaine, Ibrahim s'en désavoua",
    groups: [
      {
        main: [{ s: 26, v: 86 }],
        contextBefore: [{ s: 26, v: 83 }, { s: 26, v: 84 }, { s: 26, v: 85 }],
        contextAfter: [{ s: 26, v: 87 }],
      },
      {
        main: [{ s: 60, v: 4 }],
        contextBefore: [{ s: 60, v: 3 }],
        contextAfter: [{ s: 60, v: 5 }],
      },
      {
        main: [{ s: 9, v: 113 }, { s: 9, v: 114 }],
        contextAfter: [{ s: 9, v: 115 }],
      },
    ],
  },

  /* ── Bloc VIII : La justice prime le lien filial ─────────────────────── */

  {
    id: 'justice-parents',
    title: "وَلَوۡ عَلَىٰٓ أَنفُسِكُمۡ أَوِ ٱلۡوَٰلِدَيۡنِ — La justice prime même le lien filial",
    groups: [
      {
        main: [{ s: 4, v: 135 }],
        contextBefore: [{ s: 4, v: 134 }],
        contextAfter: [{ s: 4, v: 136 }],
      },
    ],
  },
]

/* ─── Data ───────────────────────────────────────────────────────────── */

async function fetchQuran(): Promise<Surah[]> {
  const res = await fetch(
    'https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_fr.json',
    { next: { revalidate: 604800 } },
  )
  if (!res.ok) throw new Error('Impossible de charger le Coran')
  return res.json()
}

function getVerse(
  quran: Surah[],
  s: number,
  v: number,
): { verse: Verse; surah: Surah } | null {
  const surah = quran[s - 1]
  if (!surah) return null
  const verse = surah.verses.find(vr => vr.id === v)
  if (!verse) return null
  return { verse, surah }
}

/* ─── Sub-components ─────────────────────────────────────────────────── */

const ACCENT = '#C084FC'
const ACCENT_DIM = 'rgba(192,132,252,0.15)'
const ACCENT_FAINT = 'rgba(192,132,252,0.07)'
const ACCENT_BORDER = 'rgba(192,132,252,0.1)'

function VerseBlock({
  surah,
  verse,
  isMain,
  amiriClass,
}: {
  surah: Surah
  verse: Verse
  isMain: boolean
  amiriClass: string
}) {
  return (
    <div
      data-verse-id={`${surah.id}-${verse.id}`}
      style={{
        borderLeft: isMain ? `3px solid ${ACCENT}` : `3px solid ${ACCENT_DIM}`,
        background: isMain ? ACCENT_FAINT : 'transparent',
        padding: '1rem 1.25rem',
        marginBottom: '2px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.6rem',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              fontSize: '0.68rem',
              fontFamily: 'monospace',
              color: ACCENT,
              background: 'rgba(192,132,252,0.12)',
              padding: '2px 10px',
              borderRadius: '999px',
              letterSpacing: '0.06em',
            }}
          >
            {surah.transliteration} {surah.id}:{verse.id}
          </span>
          <VerseAudioButton surahId={surah.id} verseId={verse.id} />
        </div>
        <span style={{ fontSize: '0.8rem', color: '#64748B', fontFamily: 'serif' }}>
          {surah.name}
        </span>
      </div>

      <p
        className={amiriClass}
        dir="rtl"
        style={{
          textAlign: 'right',
          fontSize: '1.4rem',
          lineHeight: '2.4',
          color: isMain ? '#F5E6C8' : '#B8A07A',
          marginBottom: '0.75rem',
        }}
      >
        {verse.text}
      </p>

      <p
        style={{
          color: isMain ? '#CBD5E1' : '#6B7280',
          fontSize: '0.875rem',
          lineHeight: '1.75',
          fontStyle: 'italic',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          paddingTop: '0.6rem',
        }}
      >
        {verse.translation}
      </p>
    </div>
  )
}

function VerseGroupCard({
  group,
  quran,
  amiriClass,
}: {
  group: VerseGroup
  quran: Surah[]
  amiriClass: string
}) {
  const hasContext =
    (group.contextBefore?.length ?? 0) > 0 || (group.contextAfter?.length ?? 0) > 0

  const mainVerses = group.main
    .map(ref => getVerse(quran, ref.s, ref.v))
    .filter(Boolean) as { verse: Verse; surah: Surah }[]

  if (mainVerses.length === 0) return null

  if (!hasContext) {
    return (
      <div
        style={{
          borderRadius: '12px',
          background: '#0C1B30',
          border: `1px solid ${ACCENT_BORDER}`,
          overflow: 'hidden',
          marginBottom: '1.25rem',
        }}
      >
        {mainVerses.map(({ verse, surah }) => (
          <VerseBlock
            key={`${surah.id}-${verse.id}`}
            surah={surah}
            verse={verse}
            isMain
            amiriClass={amiriClass}
          />
        ))}
        {mainVerses.length > 1 && (
          <div style={{ padding: '0.5rem 1.25rem', borderTop: `1px solid rgba(192,132,252,0.06)` }}>
            <PassageAudioButton verses={group.main.map(r => ({ s: r.s, v: r.v }))} />
          </div>
        )}
      </div>
    )
  }

  const contextBeforeVerses = (group.contextBefore ?? [])
    .map(ref => getVerse(quran, ref.s, ref.v))
    .filter(Boolean) as { verse: Verse; surah: Surah }[]

  const contextAfterVerses = (group.contextAfter ?? [])
    .map(ref => getVerse(quran, ref.s, ref.v))
    .filter(Boolean) as { verse: Verse; surah: Surah }[]

  const allRefs: AudioVerseRef[] = [
    ...(group.contextBefore ?? []).map(r => ({ s: r.s, v: r.v })),
    ...group.main.map(r => ({ s: r.s, v: r.v })),
    ...(group.contextAfter ?? []).map(r => ({ s: r.s, v: r.v })),
  ]

  return (
    <div
      style={{
        borderRadius: '12px',
        background: '#0C1B30',
        border: `1px solid ${ACCENT_BORDER}`,
        overflow: 'hidden',
        marginBottom: '1.25rem',
      }}
    >
      {mainVerses.map(({ verse, surah }) => (
        <VerseBlock
          key={`main-${surah.id}-${verse.id}`}
          surah={surah}
          verse={verse}
          isMain
          amiriClass={amiriClass}
        />
      ))}

      <div
        style={{
          padding: '0.5rem 1.25rem',
          borderTop: `1px solid rgba(192,132,252,0.06)`,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}
      >
        {mainVerses.length > 1 && (
          <PassageAudioButton
            verses={group.main.map(r => ({ s: r.s, v: r.v }))}
            label="Versets"
          />
        )}
        <PassageAudioButton verses={allRefs} label="Passage complet" />
      </div>

      <details style={{ borderTop: `1px solid rgba(192,132,252,0.08)` }}>
        <summary
          style={{
            cursor: 'pointer',
            padding: '0.6rem 1.25rem',
            fontSize: '0.72rem',
            color: '#64748B',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            userSelect: 'none',
            listStyle: 'none',
          }}
        >
          <span style={{ color: ACCENT, fontSize: '0.8rem' }}>◈</span>
          Voir le passage complet
        </summary>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
          {contextBeforeVerses.map(({ verse, surah }) => (
            <VerseBlock
              key={`ctx-b-${surah.id}-${verse.id}`}
              surah={surah} verse={verse} isMain={false} amiriClass={amiriClass}
            />
          ))}
          {mainVerses.map(({ verse, surah }) => (
            <VerseBlock
              key={`ctx-m-${surah.id}-${verse.id}`}
              surah={surah} verse={verse} isMain amiriClass={amiriClass}
            />
          ))}
          {contextAfterVerses.map(({ verse, surah }) => (
            <VerseBlock
              key={`ctx-a-${surah.id}-${verse.id}`}
              surah={surah} verse={verse} isMain={false} amiriClass={amiriClass}
            />
          ))}
        </div>
      </details>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────── */

export default async function ParentsDansLeCoranPage() {
  const quran = await fetchQuran()

  return (
    <>
      <style>{`
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        details[open] > summary { color: ${ACCENT}; }
        details[open] > summary::before { content: '▲ '; font-size: 0.6rem; }
        details:not([open]) > summary::before { content: '▼ '; font-size: 0.6rem; }
        .nav-link:hover { color: ${ACCENT} !important; background: rgba(192,132,252,0.06) !important; }
        @keyframes versePlay { from { background: rgba(192,132,252,0.35); } to { background: rgba(192,132,252,0.18); } }
        [data-verse-playing="true"] { animation: versePlay 0.5s ease-out forwards !important; border-left-color: ${ACCENT} !important; }
        @media (max-width: 1024px) {
          .sidebar { display: none !important; }
          .main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) { .hero-title { font-size: 1.8rem !important; } }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #060C18 0%, #07101E 100%)',
          color: '#E2E8F0',
        }}
      >
        {/* ── Hero ── */}
        <header
          style={{
            textAlign: 'center',
            padding: '5rem 1.5rem 3rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(192,132,252,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Navigation */}
          <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="/islam-in-quran"
              style={{ fontSize: '0.72rem', color: '#475569', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.08)', padding: '4px 12px', borderRadius: '999px', transition: 'all 0.2s' }}
              className="nav-link"
            >
              ← L&apos;Islam, religion de tous les Prophètes
            </a>
            <a
              href="/amour-allah"
              style={{ fontSize: '0.72rem', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(232,80,122,0.35)', color: '#E8507A', textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
            >
              ♥ L&apos;Amour d&apos;Allah
            </a>
            <a
              href="/sens-de-la-vie"
              style={{ fontSize: '0.72rem', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(16,185,129,0.35)', color: '#10B981', textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
            >
              ✦ Le sens de la vie
            </a>
            <a
              href="/isa-ibn-maryam"
              style={{ fontSize: '0.72rem', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(96,165,250,0.35)', color: '#60A5FA', textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
            >
              ✶ Isa ibn Maryam
            </a>
            <a
              href="/les-heures-du-croyant"
              style={{ fontSize: '0.72rem', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(245,158,11,0.35)', color: '#F59E0B', textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
            >
              ☀ Les heures du croyant
            </a>
          </div>

          <p
            className={amiri.className}
            dir="rtl"
            style={{ fontSize: '1.5rem', color: ACCENT, marginBottom: '1.25rem', letterSpacing: '0.05em' }}
          >
            وَبِٱلۡوَٰلِدَيۡنِ إِحۡسَٰنًا
          </p>
          <h1
            className="hero-title"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem', color: '#F8FAFC' }}
          >
            Les parents{' '}
            <span style={{ color: ACCENT }}>dans le Coran</span>
          </h1>
          <p
            style={{ color: '#94A3B8', fontSize: '1rem', maxWidth: '40rem', margin: '0 auto', lineHeight: 1.7 }}
          >
            Le commandement, le rang de la mère, les prophètes modèles et les nuances de l&apos;obéissance — de Luqman à Ibrahim.
          </p>

          {/* Anchor pills */}
          <div
            style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}
          >
            {SECTIONS.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  fontSize: '0.72rem',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  border: '1px solid rgba(192,132,252,0.25)',
                  color: '#94A3B8',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
                className="nav-link"
              >
                {s.title.includes('—') ? s.title.split('—')[1].trim() : s.title}
              </a>
            ))}
          </div>
        </header>

        {/* ── Grid ── */}
        <div
          className="main-grid"
          style={{
            maxWidth: '1450px',
            margin: '0 1.5rem',
            padding: '0 1rem 2rem',
            display: 'grid',
            gridTemplateColumns: '263px 15fr',
            gap: '0.5rem',
            alignItems: 'start',
          }}
        >
          {/* ── Sidebar ── */}
          <nav
            className="sidebar"
            style={{ position: 'sticky', top: '2rem', display: 'flex', flexDirection: 'column', gap: '2px' }}
          >
            <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#475569', marginBottom: '0.75rem', paddingLeft: '0.5rem' }}>
              Navigation
            </p>
            {SECTIONS.map(s => {
              const [arabic, french] = s.title.split('—')
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="nav-link"
                  style={{ display: 'block', padding: '0.45rem 0.75rem', borderRadius: '8px', textDecoration: 'none', color: '#64748B', fontSize: '0.78rem', lineHeight: 1.4, transition: 'all 0.2s' }}
                >
                  <span style={{ color: ACCENT, fontWeight: 600 }}>{french ? french.trim() : arabic.trim()}</span>
                  {french && (
                    <>
                      <br />
                      <span style={{ fontSize: '0.68rem', color: '#475569', fontFamily: 'serif' }}>{arabic.trim()}</span>
                    </>
                  )}
                </a>
              )
            })}
          </nav>

          {/* ── Main content ── */}
          <main>
            {SECTIONS.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                style={{ marginBottom: '3.5rem', scrollMarginTop: '2rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      background: 'rgba(192,132,252,0.12)',
                      border: '1px solid rgba(192,132,252,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      color: ACCENT,
                      fontFamily: 'monospace',
                      fontWeight: 700,
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h2
                    style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', fontWeight: 600, color: '#F1F5F9', lineHeight: 1.35 }}
                  >
                    {section.title.includes('—') ? (
                      <>
                        <span style={{ color: ACCENT }}>{section.title.split('—')[0].trim()}</span>
                        <span style={{ color: '#475569' }}> — </span>
                        <span>{section.title.split('—').slice(1).join('—').trim()}</span>
                      </>
                    ) : (
                      section.title
                    )}
                  </h2>
                </div>

                <div style={{ borderLeft: `1px solid rgba(192,132,252,0.12)`, paddingLeft: '1.5rem', marginLeft: '1rem' }}>
                  {section.groups.map((group, gIdx) => (
                    <VerseGroupCard key={gIdx} group={group} quran={quran} amiriClass={amiri.className} />
                  ))}
                </div>
              </section>
            ))}

            {/* Closing */}
            <div
              style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                borderTop: `1px solid rgba(192,132,252,0.12)`,
                marginTop: '2rem',
              }}
            >
              <p
                className={amiri.className}
                dir="rtl"
                style={{ fontSize: '1.6rem', color: ACCENT, marginBottom: '1rem', lineHeight: 2 }}
              >
                رَّبِّ ٱرۡحَمۡهُمَا كَمَا رَبَّيَانِي صَغِيرٗا
              </p>
              <p style={{ color: '#64748B', fontSize: '0.875rem', fontStyle: 'italic' }}>
                « Mon Seigneur, fais-leur miséricorde comme ils m&apos;ont élevé tout petit. »
              </p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: ACCENT, fontFamily: 'monospace', letterSpacing: '0.06em' }}>
                Al-Isrāʾ 17:24
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
