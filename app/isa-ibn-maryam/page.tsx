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
  title: "Isa ibn Maryam — Jésus dans le Coran",
  description:
    "Parcours complet des versets coraniques sur Isa ibn Maryam (Jésus fils de Marie) — sa naissance miraculeuse, sa mission, ses miracles, sa nature véritable et le Jour du Jugement.",
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

  /* ── Bloc I : La naissance miraculeuse ──────────────────────────────── */

  {
    id: 'annonce-marie',
    title: "L'annonce à Marie — Allah t'a choisie et purifiée sur toutes les femmes",
    groups: [
      {
        main: [{ s: 3, v: 45 }, { s: 3, v: 46 }, { s: 3, v: 47 }],
        contextBefore: [{ s: 3, v: 42 }, { s: 3, v: 43 }, { s: 3, v: 44 }],
      },
    ],
  },
  {
    id: 'naissance',
    title: "La naissance miraculeuse — Isa parle dans le berceau",
    groups: [
      {
        main: [{ s: 19, v: 19 }, { s: 19, v: 20 }, { s: 19, v: 21 }],
        contextBefore: [{ s: 19, v: 16 }, { s: 19, v: 17 }, { s: 19, v: 18 }],
        contextAfter: [
          { s: 19, v: 22 }, { s: 19, v: 23 }, { s: 19, v: 24 },
          { s: 19, v: 25 }, { s: 19, v: 26 },
        ],
      },
      {
        main: [{ s: 19, v: 30 }, { s: 19, v: 31 }, { s: 19, v: 32 }, { s: 19, v: 33 }],
        contextBefore: [{ s: 19, v: 27 }, { s: 19, v: 28 }, { s: 19, v: 29 }],
      },
    ],
  },
  {
    id: 'cree-comme-adam',
    title: "Créé comme Adam — par la Parole divine, sans père",
    groups: [
      {
        main: [{ s: 3, v: 59 }],
        contextAfter: [{ s: 3, v: 60 }],
      },
      {
        main: [{ s: 21, v: 91 }],
        contextBefore: [{ s: 21, v: 89 }, { s: 21, v: 90 }],
        contextAfter: [{ s: 21, v: 92 }],
      },
    ],
  },

  /* ── Bloc II : Sa mission ────────────────────────────────────────────── */

  {
    id: 'mission-miracles',
    title: "Sa mission — miracles et appel à la soumission",
    groups: [
      {
        main: [{ s: 3, v: 48 }, { s: 3, v: 49 }, { s: 3, v: 50 }, { s: 3, v: 51 }],
      },
      {
        main: [{ s: 5, v: 110 }],
      },
      {
        main: [{ s: 2, v: 87 }],
        contextAfter: [{ s: 2, v: 88 }],
      },
    ],
  },
  {
    id: 'injil',
    title: "L'Évangile — confirmation de la Torah et lumière pour les hommes",
    groups: [
      {
        main: [{ s: 5, v: 46 }, { s: 5, v: 47 }],
        contextBefore: [{ s: 5, v: 44 }, { s: 5, v: 45 }],
        contextAfter: [{ s: 5, v: 48 }, { s: 5, v: 49 }],
      },
    ],
  },
  {
    id: 'annonce-ahmad',
    title: "Il annonce le Prophète Ahmad — بِرَسُولٖ يَأۡتِي مِنۢ بَعۡدِي ٱسۡمُهُۥٓ أَحۡمَدُ",
    groups: [
      {
        main: [{ s: 61, v: 6 }],
        contextBefore: [{ s: 61, v: 5 }],
        contextAfter: [{ s: 61, v: 7 }, { s: 61, v: 8 }],
      },
    ],
  },
  {
    id: 'pacte-prophetes',
    title: "Le pacte des prophètes — la même religion prescrite à tous",
    groups: [
      {
        main: [{ s: 33, v: 7 }],
        contextAfter: [{ s: 33, v: 8 }],
      },
      {
        main: [{ s: 42, v: 13 }],
        contextAfter: [{ s: 42, v: 14 }],
      },
    ],
  },
  {
    id: 'hawariyyun',
    title: "Les Hawariyyun — ses disciples se soumettent à Allah",
    groups: [
      {
        main: [{ s: 3, v: 52 }, { s: 3, v: 53 }],
      },
      {
        main: [{ s: 61, v: 14 }],
        contextBefore: [{ s: 61, v: 13 }],
      },
    ],
  },
  {
    id: 'table',
    title: "La Table servie — un signe du ciel",
    groups: [
      {
        main: [{ s: 5, v: 112 }, { s: 5, v: 113 }, { s: 5, v: 114 }, { s: 5, v: 115 }],
        contextBefore: [{ s: 5, v: 111 }],
      },
    ],
  },

  /* ── Bloc III : Sa nature véritable ─────────────────────────────────── */

  {
    id: 'serviteur-allah',
    title: "Il est un serviteur d'Allah — إِنِّي عَبۡدُ ٱللَّهِ",
    groups: [
      {
        main: [{ s: 19, v: 34 }, { s: 19, v: 35 }, { s: 19, v: 36 }],
        contextAfter: [
          { s: 19, v: 37 }, { s: 19, v: 38 }, { s: 19, v: 39 }, { s: 19, v: 40 },
        ],
      },
      {
        main: [{ s: 43, v: 59 }],
        contextBefore: [{ s: 43, v: 57 }, { s: 43, v: 58 }],
        contextAfter: [
          { s: 43, v: 60 }, { s: 43, v: 61 }, { s: 43, v: 62 },
          { s: 43, v: 63 }, { s: 43, v: 64 }, { s: 43, v: 65 },
        ],
      },
      {
        main: [{ s: 4, v: 171 }, { s: 4, v: 172 }],
      },
    ],
  },
  {
    id: 'trinite-rejetee',
    title: "La Trinité et la filiation rejetées — Allah n'est pas le troisième d'une trinité",
    groups: [
      {
        main: [{ s: 5, v: 17 }],
        contextAfter: [{ s: 5, v: 18 }],
      },
      {
        main: [{ s: 5, v: 72 }, { s: 5, v: 73 }],
        contextAfter: [{ s: 5, v: 74 }, { s: 5, v: 75 }],
      },
      {
        main: [{ s: 9, v: 30 }, { s: 9, v: 31 }],
        contextAfter: [{ s: 9, v: 32 }],
      },
      {
        main: [{ s: 5, v: 77 }],
        contextBefore: [{ s: 5, v: 76 }],
        contextAfter: [{ s: 5, v: 78 }, { s: 5, v: 79 }],
      },
    ],
  },
  {
    id: 'cieux-eclatent',
    title: "Les cieux sur le point d'éclater — Ils prêtent un fils au Tout-Miséricordieux",
    groups: [
      {
        main: [{ s: 19, v: 88 }, { s: 19, v: 89 }, { s: 19, v: 90 }, { s: 19, v: 91 }, { s: 19, v: 92 }, { s: 19, v: 93 }],
        contextAfter: [{ s: 19, v: 94 }, { s: 19, v: 95 }],
      },
    ],
  },
  {
    id: 'allah-pas-engendre',
    title: "Allah n'a pas engendré — Il n'a pas de fils, pas de compagne",
    groups: [
      {
        main: [{ s: 112, v: 1 }, { s: 112, v: 2 }, { s: 112, v: 3 }, { s: 112, v: 4 }],
      },
      {
        main: [{ s: 6, v: 101 }],
        contextAfter: [{ s: 6, v: 102 }, { s: 6, v: 103 }],
      },
    ],
  },

  /* ── Bloc IV : Son élévation ─────────────────────────────────────────── */

  {
    id: 'pas-crucifie',
    title: "Il n'a pas été crucifié — Allah l'a élevé vers Lui",
    groups: [
      {
        main: [{ s: 4, v: 157 }, { s: 4, v: 158 }, { s: 4, v: 159 }],
        contextBefore: [{ s: 4, v: 155 }, { s: 4, v: 156 }],
      },
      {
        main: [{ s: 3, v: 55 }],
        contextBefore: [{ s: 3, v: 54 }],
        contextAfter: [{ s: 3, v: 56 }, { s: 3, v: 57 }],
      },
    ],
  },
  {
    id: 'signe-univers',
    title: "Un signe pour les mondes — وَجَعَلۡنَٰهَا وَٱبۡنَهَآ ءَايَةٗ لِّلۡعَٰلَمِينَ",
    groups: [
      {
        main: [{ s: 23, v: 50 }],
        contextBefore: [{ s: 23, v: 49 }],
      },
    ],
  },

  /* ── Bloc V : La déviation de ses suiveurs ──────────────────────────── */

  {
    id: 'deviation-suiveurs',
    title: "La déviation de ses suiveurs — ils ont oublié et inventé",
    groups: [
      {
        main: [{ s: 5, v: 14 }],
        contextBefore: [{ s: 5, v: 13 }],
        contextAfter: [{ s: 5, v: 15 }, { s: 5, v: 16 }],
      },
      {
        main: [{ s: 57, v: 27 }],
        contextBefore: [{ s: 57, v: 26 }],
      },
    ],
  },

  /* ── Bloc VI : Le Jour du Jugement ───────────────────────────────────── */

  {
    id: 'jugement',
    title: "Le Jour du Jugement — Isa désavoue ceux qui l'ont adoré",
    groups: [
      {
        main: [
          { s: 5, v: 116 }, { s: 5, v: 117 }, { s: 5, v: 118 },
          { s: 5, v: 119 }, { s: 5, v: 120 },
        ],
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

const ACCENT = '#60A5FA'
const ACCENT_DIM = 'rgba(96,165,250,0.15)'
const ACCENT_FAINT = 'rgba(96,165,250,0.06)'
const ACCENT_BORDER = 'rgba(96,165,250,0.1)'

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
              background: 'rgba(96,165,250,0.12)',
              padding: '2px 10px',
              borderRadius: '999px',
              letterSpacing: '0.06em',
            }}
          >
            {surah.transliteration} {surah.id}:{verse.id}
          </span>
          <VerseAudioButton surahId={surah.id} verseId={verse.id} />
        </div>
        <span
          style={{
            fontSize: '0.8rem',
            color: '#64748B',
            fontFamily: 'serif',
          }}
        >
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
          <div
            style={{
              padding: '0.5rem 1.25rem',
              borderTop: `1px solid rgba(96,165,250,0.06)`,
            }}
          >
            <PassageAudioButton
              verses={group.main.map(r => ({ s: r.s, v: r.v }))}
            />
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

      {(() => {
        const allRefs: AudioVerseRef[] = [
          ...(group.contextBefore ?? []).map(r => ({ s: r.s, v: r.v })),
          ...group.main.map(r => ({ s: r.s, v: r.v })),
          ...(group.contextAfter ?? []).map(r => ({ s: r.s, v: r.v })),
        ]
        return (
          <div
            style={{
              padding: '0.5rem 1.25rem',
              borderTop: `1px solid rgba(96,165,250,0.06)`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <PassageAudioButton verses={allRefs} />
          </div>
        )
      })()}

      <details
        style={{
          borderTop: `1px solid rgba(96,165,250,0.08)`,
        }}
      >
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
              surah={surah}
              verse={verse}
              isMain={false}
              amiriClass={amiriClass}
            />
          ))}
          {mainVerses.map(({ verse, surah }) => (
            <VerseBlock
              key={`ctx-m-${surah.id}-${verse.id}`}
              surah={surah}
              verse={verse}
              isMain
              amiriClass={amiriClass}
            />
          ))}
          {contextAfterVerses.map(({ verse, surah }) => (
            <VerseBlock
              key={`ctx-a-${surah.id}-${verse.id}`}
              surah={surah}
              verse={verse}
              isMain={false}
              amiriClass={amiriClass}
            />
          ))}
        </div>
      </details>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────── */

export default async function IsaIbnMaryamPage() {
  const quran = await fetchQuran()

  return (
    <>
      <style>{`
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        details[open] > summary { color: ${ACCENT}; }
        details[open] > summary::before { content: '▲ '; font-size: 0.6rem; }
        details:not([open]) > summary::before { content: '▼ '; font-size: 0.6rem; }
        .nav-link:hover { color: ${ACCENT} !important; background: rgba(96,165,250,0.06) !important; }
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
                'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(96,165,250,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Navigation */}
          <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="/islam-in-quran"
              style={{
                fontSize: '0.72rem',
                color: '#475569',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '4px 12px',
                borderRadius: '999px',
                transition: 'all 0.2s',
              }}
              className="nav-link"
            >
              ← L&apos;Islam, religion de tous les Prophètes
            </a>
            <a
              href="/amour-allah"
              style={{
                fontSize: '0.72rem',
                padding: '4px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(232,80,122,0.35)',
                color: '#E8507A',
                textDecoration: 'none',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              ♥ L&apos;Amour d&apos;Allah →
            </a>
            <a
              href="/sens-de-la-vie"
              style={{
                fontSize: '0.72rem',
                padding: '4px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(16,185,129,0.35)',
                color: '#10B981',
                textDecoration: 'none',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              ✦ Le sens de la vie →
            </a>
          </div>

          <p
            className={amiri.className}
            dir="rtl"
            style={{
              fontSize: '1.5rem',
              color: ACCENT,
              marginBottom: '1.25rem',
              letterSpacing: '0.05em',
            }}
          >
            قَالَ إِنِّي عَبۡدُ ٱللَّهِ ءَاتَىٰنِيَ ٱلۡكِتَٰبَ وَجَعَلَنِي نَبِيًّا
          </p>
          <h1
            className="hero-title"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '1rem',
              color: '#F8FAFC',
            }}
          >
            Isa ibn Maryam{' '}
            <span style={{ color: ACCENT }}>dans le Coran</span>
          </h1>
          <p
            style={{
              color: '#94A3B8',
              fontSize: '1rem',
              maxWidth: '38rem',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Jésus fils de Marie — sa naissance miraculeuse, ses miracles, sa mission,
            sa nature véritable et son élévation vers Allah.
          </p>

          {SECTIONS.length > 0 && (
            <div
              style={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap',
              }}
            >
              {SECTIONS.map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  style={{
                    fontSize: '0.72rem',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    border: 'rgba(96,165,250,0.25) 1px solid',
                    color: '#94A3B8',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  className="nav-link"
                >
                  {s.title.split('—')[0].trim()}
                </a>
              ))}
            </div>
          )}
        </header>

        <div
          className="main-grid"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.5rem 5rem',
            display: 'grid',
            gridTemplateColumns: SECTIONS.length > 0 ? '220px 1fr' : '1fr',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* ── Sidebar ── */}
          {SECTIONS.length > 0 && (
            <nav
              className="sidebar"
              style={{
                position: 'sticky',
                top: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              <p
                style={{
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#475569',
                  marginBottom: '0.75rem',
                  paddingLeft: '0.5rem',
                }}
              >
                Navigation
              </p>
              {SECTIONS.map(s => {
                const [theme, subtitle] = s.title.split('—')
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="nav-link"
                    style={{
                      display: 'block',
                      padding: '0.45rem 0.75rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: '#64748B',
                      fontSize: '0.78rem',
                      lineHeight: 1.4,
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ color: ACCENT, fontWeight: 600 }}>
                      {theme.trim()}
                    </span>
                    {subtitle && (
                      <>
                        <br />
                        <span style={{ fontSize: '0.68rem', color: '#475569' }}>
                          {subtitle.trim()}
                        </span>
                      </>
                    )}
                  </a>
                )
              })}
            </nav>
          )}

          {/* ── Main content ── */}
          <main>
            {SECTIONS.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                style={{ marginBottom: '3.5rem', scrollMarginTop: '2rem' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      background: 'rgba(96,165,250,0.12)',
                      border: '1px solid rgba(96,165,250,0.3)',
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
                  <div>
                    <h2
                      style={{
                        fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                        fontWeight: 600,
                        color: '#F1F5F9',
                        lineHeight: 1.35,
                      }}
                    >
                      {section.title.includes('—') ? (
                        <>
                          <span style={{ color: ACCENT }}>
                            {section.title.split('—')[0].trim()}
                          </span>
                          <span style={{ color: '#475569' }}> — </span>
                          <span>{section.title.split('—').slice(1).join('—').trim()}</span>
                        </>
                      ) : (
                        section.title
                      )}
                    </h2>
                  </div>
                </div>

                <div
                  style={{
                    borderLeft: `1px solid rgba(96,165,250,0.12)`,
                    paddingLeft: '1.5rem',
                    marginLeft: '1rem',
                  }}
                >
                  {section.groups.map((group, gIdx) => (
                    <VerseGroupCard
                      key={gIdx}
                      group={group}
                      quran={quran}
                      amiriClass={amiri.className}
                    />
                  ))}
                </div>
              </section>
            ))}

            {/* Closing */}
            <div
              style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                borderTop: `1px solid rgba(96,165,250,0.12)`,
                marginTop: '2rem',
              }}
            >
              <p
                className={amiri.className}
                dir="rtl"
                style={{
                  fontSize: '1.6rem',
                  color: ACCENT,
                  marginBottom: '1rem',
                  lineHeight: 2,
                }}
              >
                مَّا ٱلۡمَسِيحُ ٱبۡنُ مَرۡيَمَ إِلَّا رَسُولٞ قَدۡ خَلَتۡ مِن قَبۡلِهِ ٱلرُّسُلُ
              </p>
              <p
                style={{
                  color: '#64748B',
                  fontSize: '0.875rem',
                  fontStyle: 'italic',
                }}
              >
                « Le Messie, fils de Marie, n&apos;est qu&apos;un Messager.
                Des messagers sont passés avant lui. »
              </p>
              <p
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.7rem',
                  color: ACCENT,
                  fontFamily: 'monospace',
                  letterSpacing: '0.06em',
                }}
              >
                Al-Māʾidah 5:75
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
