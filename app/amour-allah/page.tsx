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
  title: "L'Amour d'Allah dans le Coran",
  description:
    "Parcours des versets coraniques sur l'amour d'Allah — Sa miséricorde, Son affection pour les croyants, et la relation d'amour entre le Créateur et Ses serviteurs.",
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
  {
    id: 'rahman-wudda',
    title: "Le Tout-Miséricordieux leur accordera Son amour — سَيَجۡعَلُ لَهُمُ ٱلرَّحۡمَٰنُ وُدّٗا",
    groups: [
      {
        main: [{ s: 19, v: 96 }],
        contextBefore: [{ s: 19, v: 93 }, { s: 19, v: 94 }, { s: 19, v: 95 }],
      },
    ],
  },
  {
    id: 'al-wadud',
    title: "Allah est Al-Wadud — le Très-Affectueux",
    groups: [
      {
        main: [{ s: 85, v: 14 }, { s: 85, v: 15 }],
        contextBefore: [{ s: 85, v: 11 }, { s: 85, v: 12 }, { s: 85, v: 13 }],
      },
      {
        main: [{ s: 11, v: 90 }],
        contextBefore: [{ s: 11, v: 88 }, { s: 11, v: 89 }],
      },
    ],
  },
  {
    id: 'allah-proche',
    title: "Allah est proche — فَإِنِّي قَرِيبٌ أُجِيبُ دَعۡوَةَ ٱلدَّاعِ",
    groups: [
      {
        main: [{ s: 2, v: 186 }],
      },
    ],
  },
  {
    id: 'bienfaisants',
    title: "Allah aime les bienfaisants — المحسنين",
    groups: [
      {
        main: [{ s: 3, v: 133 }, { s: 3, v: 134 }],
        contextAfter: [{ s: 3, v: 135 }, { s: 3, v: 136 }],
      },
    ],
  },
  {
    id: 'informe-mes-serviteurs',
    title: "Informe Mes serviteurs — Je suis le Pardonneur, le Très-Miséricordieux",
    groups: [
      {
        main: [{ s: 15, v: 49 }, { s: 15, v: 50 }],
        contextBefore: [{ s: 15, v: 47 }, { s: 15, v: 48 }],
      },
    ],
  },
  {
    id: 'amour-reciproque',
    title: "يُحِبُّهُمۡ وَيُحِبُّونَهُۥٓ — Un amour réciproque entre Allah et Ses serviteurs",
    groups: [
      {
        main: [{ s: 5, v: 54 }],
        contextBefore: [{ s: 5, v: 52 }, { s: 5, v: 53 }],
        contextAfter: [{ s: 5, v: 55 }, { s: 5, v: 56 }],
      },
    ],
  },
  {
    id: 'suivre-prophete',
    title: "Suivre le Prophète — La voie vers l'amour d'Allah",
    groups: [
      {
        main: [{ s: 3, v: 31 }, { s: 3, v: 32 }],
      },
    ],
  },
  {
    id: 'repentants-purifies',
    title: "Allah aime les repentants et les purifiés",
    groups: [
      {
        main: [{ s: 2, v: 222 }],
      },
    ],
  },
  {
    id: 'patients',
    title: "Allah aime les patients — الصابرين",
    groups: [
      {
        main: [{ s: 3, v: 146 }],
        contextBefore: [{ s: 3, v: 144 }, { s: 3, v: 145 }],
        contextAfter: [{ s: 3, v: 147 }, { s: 3, v: 148 }],
      },
    ],
  },
  {
    id: 'confiants',
    title: "Allah aime ceux qui font confiance — المتوكلين",
    groups: [
      {
        main: [{ s: 3, v: 159 }],
        contextBefore: [{ s: 3, v: 157 }, { s: 3, v: 158 }],
        contextAfter: [{ s: 3, v: 160 }],
      },
    ],
  },
  {
    id: 'equitables',
    title: "Allah aime les équitables — المقسطين",
    groups: [
      {
        main: [{ s: 60, v: 8 }],
        contextAfter: [{ s: 60, v: 9 }],
      },
      {
        main: [{ s: 49, v: 9 }],
        contextAfter: [{ s: 49, v: 10 }],
      },
    ],
  },
  {
    id: 'purifies',
    title: "Allah aime les purifiés — المطهرين",
    groups: [
      {
        main: [{ s: 9, v: 108 }],
        contextBefore: [{ s: 9, v: 107 }],
        contextAfter: [{ s: 9, v: 109 }],
      },
    ],
  },
  {
    id: 'rangs-serres',
    title: "Allah aime ceux qui combattent en rangs serrés",
    groups: [
      {
        main: [{ s: 61, v: 4 }],
        contextBefore: [{ s: 61, v: 2 }, { s: 61, v: 3 }],
      },
    ],
  },
  {
    id: 'misericorde-inscrite',
    title: "Allah S'est prescrit la miséricorde — كَتَبَ رَبُّكُمۡ عَلَىٰ نَفۡسِهِ ٱلرَّحۡمَةَ",
    groups: [
      {
        main: [{ s: 6, v: 54 }],
        contextBefore: [{ s: 6, v: 51 }, { s: 6, v: 52 }, { s: 6, v: 53 }],
      },
    ],
  },
  {
    id: 'misericorde-tout',
    title: "Sa miséricorde englobe toutes choses — وَرَحۡمَتِي وَسِعَتۡ كُلَّ شَيۡءٖ",
    groups: [
      {
        main: [{ s: 7, v: 156 }],
        contextBefore: [{ s: 7, v: 155 }],
        contextAfter: [{ s: 7, v: 157 }],
      },
    ],
  },
  {
    id: 'ne-desesperez-pas',
    title: "Ne désespérez pas de la miséricorde d'Allah",
    groups: [
      {
        main: [{ s: 39, v: 53 }],
        contextAfter: [{ s: 39, v: 54 }, { s: 39, v: 55 }],
      },
    ],
  },
  {
    id: 'ibrahim-khalil',
    title: "Ibrahim — L'ami intime d'Allah (خَلِيلٗا)",
    groups: [
      {
        main: [{ s: 4, v: 125 }],
        contextBefore: [{ s: 4, v: 124 }],
      },
    ],
  },
  {
    id: 'musa-amour',
    title: "Allah lança Son amour sur Musa — وَأَلۡقَيۡتُ عَلَيۡكَ مَحَبَّةٗ مِّنِّي",
    groups: [
      {
        main: [{ s: 20, v: 39 }],
        contextBefore: [{ s: 20, v: 37 }, { s: 20, v: 38 }],
        contextAfter: [{ s: 20, v: 40 }, { s: 20, v: 41 }],
      },
    ],
  },
  {
    id: 'muhammad-rahma',
    title: "Muhammad ﷺ — miséricorde pour l'univers",
    groups: [
      {
        main: [{ s: 21, v: 107 }],
        contextBefore: [{ s: 21, v: 105 }, { s: 21, v: 106 }],
        contextAfter: [{ s: 21, v: 108 }, { s: 21, v: 109 }],
      },
    ],
  },
  {
    id: 'dieu-unique-misericordieux',
    title: "Votre Dieu est Un — le Tout-Miséricordieux, le Très-Miséricordieux",
    groups: [
      {
        main: [{ s: 2, v: 163 }],
        contextAfter: [{ s: 2, v: 164 }, { s: 2, v: 165 }],
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
        borderLeft: isMain ? '3px solid #E8507A' : '3px solid rgba(232,80,122,0.15)',
        background: isMain ? 'rgba(232,80,122,0.05)' : 'transparent',
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
              color: '#E8507A',
              background: 'rgba(232,80,122,0.12)',
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
          border: '1px solid rgba(232,80,122,0.1)',
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
              borderTop: '1px solid rgba(232,80,122,0.06)',
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
        border: '1px solid rgba(232,80,122,0.1)',
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
              borderTop: '1px solid rgba(232,80,122,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <PassageAudioButton verses={group.main.map(r => ({ s: r.s, v: r.v }))} label="Versets" />
            <PassageAudioButton verses={allRefs} label="Passage complet" />
          </div>
        )
      })()}

      <details
        style={{
          borderTop: '1px solid rgba(232,80,122,0.08)',
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
          <span style={{ color: '#E8507A', fontSize: '0.8rem' }}>◈</span>
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

export default async function AmourAllahPage() {
  const quran = await fetchQuran()

  return (
    <>
      <style>{`
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        details[open] > summary { color: #E8507A; }
        details[open] > summary::before { content: '▲ '; font-size: 0.6rem; }
        details:not([open]) > summary::before { content: '▼ '; font-size: 0.6rem; }
        .nav-link:hover { color: #E8507A !important; background: rgba(232,80,122,0.06) !important; }
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
                'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,80,122,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Lien retour */}
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
            <a
              href="/isa-ibn-maryam"
              style={{
                fontSize: '0.72rem',
                padding: '4px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(96,165,250,0.35)',
                color: '#60A5FA',
                textDecoration: 'none',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              ✶ Isa ibn Maryam →
            </a>
            <a
              href="/les-heures-du-croyant"
              style={{
                fontSize: '0.72rem',
                padding: '4px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(245,158,11,0.35)',
                color: '#F59E0B',
                textDecoration: 'none',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              ☀ Les heures du croyant →
            </a>
          </div>

          <p
            className={amiri.className}
            dir="rtl"
            style={{
              fontSize: '1.5rem',
              color: '#E8507A',
              marginBottom: '1.25rem',
              letterSpacing: '0.05em',
            }}
          >
            يُحِبُّهُمۡ وَيُحِبُّونَهُۥٓ
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
            L&apos;Amour d&apos;Allah{' '}
            <span style={{ color: '#E8507A' }}>dans le Coran</span>
          </h1>
          <p
            style={{
              color: '#94A3B8',
              fontSize: '1rem',
              maxWidth: '36rem',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Sa miséricorde infinie, Son affection pour les croyants, et la relation
            d&apos;amour entre le Créateur et Ses serviteurs.
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
                    border: '1px solid rgba(232,80,122,0.25)',
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
          className="main-grid main-grid-stretched"
          style={{
            gridTemplateColumns: SECTIONS.length > 0 ? '263px 1fr' : '1fr',
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
                    <span style={{ color: '#E8507A', fontWeight: 600 }}>
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
                      background: 'rgba(232,80,122,0.12)',
                      border: '1px solid rgba(232,80,122,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      color: '#E8507A',
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
                          <span style={{ color: '#E8507A' }}>
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
                    borderLeft: '1px solid rgba(232,80,122,0.12)',
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
                borderTop: '1px solid rgba(232,80,122,0.12)',
                marginTop: '2rem',
              }}
            >
              <p
                className={amiri.className}
                dir="rtl"
                style={{
                  fontSize: '1.6rem',
                  color: '#E8507A',
                  marginBottom: '1rem',
                  lineHeight: 2,
                }}
              >
                قُلۡ إِن كُنتُمۡ تُحِبُّونَ ٱللَّهَ فَٱتَّبِعُونِي يُحۡبِبۡكُمُ ٱللَّهُ وَيَغۡفِرۡ لَكُمۡ ذُنُوبَكُمۡۚ وَٱللَّهُ غَفُورٞ رَّحِيمٞ
              </p>
              <p
                style={{
                  color: '#64748B',
                  fontSize: '0.875rem',
                  fontStyle: 'italic',
                }}
              >
                « Dis: Si vous aimez Allah, suivez-moi; Allah vous aimera alors et vous
                pardonnera vos péchés. Allah est Pardonneur et Miséricordieux. »
              </p>
              <p
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.7rem',
                  color: '#E8507A',
                  fontFamily: 'monospace',
                  letterSpacing: '0.06em',
                }}
              >
                Āl ʿImrān 3:31
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
