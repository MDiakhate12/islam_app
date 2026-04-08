import type { Metadata } from 'next'
import { Amiri } from 'next/font/google'
import { VerseAudioButton, PassageAudioButton } from './AudioButton'
import type { VerseRef as AudioVerseRef } from './AudioButton'

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "L'Islam, religion de tous les Prophètes",
  description:
    "De Adam à Muhammad ﷺ — Parcours des versets coraniques attestant que l'Islam est la religion unique prêchée par tous les prophètes.",
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
    id: 'religion-unique',
    title: "L'Islam, unique religion agréée par Allah",
    groups: [
      {
        main: [{ s: 3, v: 19 }],
        contextBefore: [{ s: 3, v: 18 }],
        contextAfter: [{ s: 3, v: 20 }],
      },
      {
        main: [{ s: 3, v: 85 }],
        contextBefore: [{ s: 3, v: 83 }, { s: 3, v: 84 }],
        contextAfter: [
          { s: 3, v: 86 }, { s: 3, v: 87 }, { s: 3, v: 88 },
          { s: 3, v: 89 }, { s: 3, v: 90 }, { s: 3, v: 91 }, { s: 3, v: 92 },
        ],
      },
    ],
  },
  {
    id: 'ibrahim-soumis',
    title: 'Ibrahim — Père des nations, soumis à Allah avant toute révélation',
    groups: [
      {
        main: [
          { s: 2, v: 131 },
          { s: 2, v: 132 },
        ],
        contextBefore: [{ s: 2, v: 128 }, { s: 2, v: 129 }, { s: 2, v: 130 }],
        contextAfter: [{ s: 2, v: 133 }],
      },
      {
        main: [{ s: 3, v: 67 }],
        contextBefore: [{ s: 3, v: 64 }, { s: 3, v: 65 }, { s: 3, v: 66 }],
        contextAfter: [{ s: 3, v: 68 }],
      },
    ],
  },
  {
    id: 'ibrahim-nom',
    title: 'Ibrahim — Le premier à nous nommer « Muslims »',
    groups: [
      {
        main: [{ s: 22, v: 78 }],
        contextBefore: [{ s: 22, v: 77 }],
      },
    ],
  },
  {
    id: 'nuh',
    title: "Nuh — L'appel à la soumission à l'aube de la prophétie",
    groups: [
      {
        main: [{ s: 10, v: 72 }],
        contextBefore: [{ s: 10, v: 71 }],
        contextAfter: [{ s: 10, v: 73 }],
      },
    ],
  },
  {
    id: 'yusuf',
    title: "Yusuf — Au terme de l'épreuve, demander à mourir en Muslim",
    groups: [
      {
        main: [{ s: 12, v: 101 }],
        contextBefore: [{ s: 12, v: 100 }],
        contextAfter: [{ s: 12, v: 102 }],
      },
    ],
  },
  {
    id: 'musa',
    title: 'Musa — Appeler son peuple à demeurer fidèles Muslims',
    groups: [
      {
        main: [{ s: 10, v: 84 }],
        contextBefore: [{ s: 10, v: 83 }],
        contextAfter: [{ s: 10, v: 85 }, { s: 10, v: 86 }],
      },
    ],
  },
  {
    id: 'hawariyyun',
    title: "Les Ḥawariyyūn — Les disciples d'Isa se proclament Muslims",
    groups: [
      {
        main: [{ s: 3, v: 52 }],
        contextAfter: [{ s: 3, v: 53 }],
      },
    ],
  },
  {
    id: 'saba',
    title: 'La Reine de Saba — De la grandeur royale à la soumission à Allah',
    groups: [
      {
        main: [{ s: 27, v: 44 }],
        contextBefore: [
          { s: 27, v: 29 },
          { s: 27, v: 30 },
          { s: 27, v: 31 },
          { s: 27, v: 32 },
          { s: 27, v: 42 },
          { s: 27, v: 43 },
        ],
      },
    ],
  },
  {
    id: 'muhammad',
    title: 'Muhammad ﷺ — Sceau des prophètes, Muslim parmi les Muslims',
    groups: [
      {
        main: [{ s: 6, v: 163 }],
        contextBefore: [{ s: 6, v: 162 }],
      },
      {
        main: [{ s: 39, v: 12 }],
        contextBefore: [{ s: 39, v: 11 }],
        contextAfter: [{ s: 39, v: 13 }],
      },
    ],
  },
  {
    id: 'continuite',
    title: "La continuité prophétique — Une seule Oummah soumise à Allah",
    groups: [
      { main: [{ s: 42, v: 13 }] },
      { main: [{ s: 2, v: 136 }] },
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
        borderLeft: isMain ? '3px solid #C9A84C' : '3px solid rgba(201,168,76,0.15)',
        background: isMain ? 'rgba(201,168,76,0.05)' : 'transparent',
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
              color: '#C9A84C',
              background: 'rgba(201,168,76,0.12)',
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
          border: '1px solid rgba(201,168,76,0.1)',
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
              borderTop: '1px solid rgba(201,168,76,0.06)',
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
        border: '1px solid rgba(201,168,76,0.1)',
        overflow: 'hidden',
        marginBottom: '1.25rem',
      }}
    >
      {/* Main verse(s) — always visible */}
      {mainVerses.map(({ verse, surah }) => (
        <VerseBlock
          key={`main-${surah.id}-${verse.id}`}
          surah={surah}
          verse={verse}
          isMain
          amiriClass={amiriClass}
        />
      ))}

      {/* Passage audio button */}
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
              borderTop: '1px solid rgba(201,168,76,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <PassageAudioButton verses={allRefs} />
          </div>
        )
      })()}

      {/* Collapsible full passage */}
      <details
        style={{
          borderTop: '1px solid rgba(201,168,76,0.08)',
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
          <span style={{ color: '#C9A84C', fontSize: '0.8rem' }}>◈</span>
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

export default async function IslamPage() {
  const quran = await fetchQuran()

  return (
    <>
      <style>{`
        @keyframes islamSpin { to { transform: rotate(360deg); } }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        details[open] > summary { color: #C9A84C; }
        details[open] > summary::before { content: '▲ '; font-size: 0.6rem; }
        details:not([open]) > summary::before { content: '▼ '; font-size: 0.6rem; }
        details[open] > summary .ctx-label::after { content: ' — réduire'; }
        details:not([open]) > summary .ctx-label::after { content: ''; }
        .nav-link:hover { color: #C9A84C !important; background: rgba(201,168,76,0.06) !important; }
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
                'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <p
            className={amiri.className}
            dir="rtl"
            style={{
              fontSize: '1.5rem',
              color: '#C9A84C',
              marginBottom: '1.25rem',
              letterSpacing: '0.05em',
            }}
          >
            إِنَّ الدِّينَ عِندَ اللَّهِ الْإِسْلَامُ
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
            L&apos;Islam,{' '}
            <span style={{ color: '#C9A84C' }}>religion de tous les Prophètes</span>
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
            De Adam à Muhammad ﷺ — Un seul Dieu, une seule religion, une chaîne de
            prophètes soumis à Allah.
          </p>

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
                  border: '1px solid rgba(201,168,76,0.25)',
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
        </header>

        <div
          className="main-grid"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.5rem 5rem',
            display: 'grid',
            gridTemplateColumns: '220px 1fr',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* ── Sidebar ── */}
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
              const [prophet, subtitle] = s.title.split('—')
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
                  <span style={{ color: '#C9A84C', fontWeight: 600 }}>
                    {prophet.trim()}
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

          {/* ── Main content ── */}
          <main>
            {SECTIONS.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                style={{ marginBottom: '3.5rem', scrollMarginTop: '2rem' }}
              >
                {/* Section header */}
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
                      background: 'rgba(201,168,76,0.12)',
                      border: '1px solid rgba(201,168,76,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      color: '#C9A84C',
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
                          <span style={{ color: '#C9A84C' }}>
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
                    borderLeft: '1px solid rgba(201,168,76,0.12)',
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
                borderTop: '1px solid rgba(201,168,76,0.12)',
                marginTop: '2rem',
              }}
            >
              <p
                className={amiri.className}
                dir="rtl"
                style={{
                  fontSize: '1.6rem',
                  color: '#C9A84C',
                  marginBottom: '1rem',
                  lineHeight: 2,
                }}
              >
                وَمَن يَبْتَغِ غَيْرَ الْإِسْلَامِ دِينًا فَلَن يُقْبَلَ مِنْهُ وَهُوَ فِي الْآخِرَةِ مِنَ الْخَاسِرِينَ
              </p>
              <p
                style={{
                  color: '#64748B',
                  fontSize: '0.875rem',
                  fontStyle: 'italic',
                }}
              >
                « Quiconque cherche une religion autre que l&apos;Islam, cela ne lui sera
                point accepté, et il sera, dans l&apos;au-delà, parmi les perdants. »
              </p>
              <p
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.7rem',
                  color: '#C9A84C',
                  fontFamily: 'monospace',
                  letterSpacing: '0.06em',
                }}
              >
                Āl ʿImrān 3:85
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
