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
  title: 'Le sens de la vie — Pourquoi Allah nous a créés',
  description:
    "Parcours des versets coraniques sur le sens de la vie et de la création — pourquoi Allah a créé les cieux, la terre, l'homme et la mort.",
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

    /* ── Bloc III : La création n'est pas vaine ─────────────────────────── */

    {
      id: 'creation-pas-vaine',
      title: "La création n'est pas vaine — مَا خَلَقۡنَا ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضَ بَٰطِلٗا",
      groups: [
        {
          main: [{ s: 3, v: 190 }, { s: 3, v: 191 }],
          contextAfter: [{ s: 3, v: 192 }, { s: 3, v: 193 }, { s: 3, v: 194 }],
        },
        {
          main: [{ s: 44, v: 38 }, { s: 44, v: 39 }],
          contextAfter: [{ s: 44, v: 40 }, { s: 44, v: 41 }, { s: 44, v: 42 }],
        },
        {
          main: [{ s: 38, v: 27 }],
        },
        {
          main: [{ s: 46, v: 3 }],
          contextBefore: [{ s: 46, v: 1 }, { s: 46, v: 2 }],
          contextAfter: [{ s: 46, v: 4 }, { s: 46, v: 5 }, { s: 46, v: 6 }],
        },
      ],
    },
    {
      id: 'crees-de-rien',
      title: "Ni créés de rien, ni créateurs eux-mêmes — أَمۡ خُلِقُواْ مِنۡ غَيۡرِ شَيۡءٍ",
      groups: [
        {
          main: [{ s: 52, v: 35 }, { s: 52, v: 36 }],
          contextBefore: [{ s: 52, v: 33 }, { s: 52, v: 34 }],
          contextAfter: [{ s: 52, v: 37 }],
        },
      ],
    },

    {
      id: 'signes-creation-yunus',
      title: "Les signes dans la création — pour les gens qui savent et qui craignent",
      groups: [
        {
          main: [{ s: 10, v: 5 }, { s: 10, v: 6 }, { s: 10, v: 7 }, { s: 10, v: 8 }, { s: 10, v: 9 }],
          contextBefore: [{ s: 10, v: 3 }, { s: 10, v: 4 }],
        },
      ],
    },  
  /* ── Bloc II : La finalité de la création ───────────────────────────── */

  {
    id: 'finalite-creation',
    title: "La finalité suprême — Pour que nous l'adorons",
    groups: [
      {
        main: [{ s: 51, v: 56 }],
        contextAfter: [{ s: 51, v: 57 }, { s: 51, v: 58 }],
      },
    ],
  },
  {
    id: 'misericorde',
    title: "C'est pour Sa miséricorde qu'Il les a créés — Pour nous faire miséricorde",
    groups: [
      {
        main: [{ s: 11, v: 119 }],
        contextBefore: [{ s: 11, v: 118 }],
      },
    ],
  },
  {
    id: 'connaitre-puissance',
    title: "Pour qu'on connaisse Allah — Pour que vous sachiez qu'Allah est Omnipotent et Omniscient",
    groups: [
      {
        main: [{ s: 65, v: 12 }],
        contextBefore: [{ s: 65, v: 11 }],
      },
    ],
  },

  /* ── Bloc IV : La vie comme épreuve ─────────────────────────────────── */

  {
    id: 'vie-mort-epreuve',
    title: "La mort et la vie — Pour révéler le meilleur parmi nous",
    groups: [
      {
        main: [{ s: 67, v: 1 }, { s: 67, v: 2 }],
        contextAfter: [{ s: 67, v: 3 }, { s: 67, v: 4 }, { s: 67, v: 5 }],
      },
    ],
  },
  {
    id: 'homme-epreuve',
    title: "Pour être éprouvé et guidé — L'homme créé pour être éprouvé et guidé",
    groups: [
      {
        main: [{ s: 76, v: 2 }, { s: 76, v: 3 }],
        contextBefore: [{ s: 76, v: 1 }],
      },
    ],
  },
  /* ── Bloc V : La rétribution et la justice divine ───────────────────── */

  {
    id: 'retribuer-actes',
    title: "Pour rétribuer chaque âme selon ses actes — Le bien et le mal ne sont pas égaux",
    groups: [
      {
        main: [{ s: 75, v: 36 }],
        contextAfter: [{ s: 75, v: 37 }, { s: 75, v: 38 }, { s: 75, v: 39 }, { s: 75, v: 40 }],
      },
      {
        main: [{ s: 68, v: 35 }, { s: 68, v: 36 }],
        contextBefore: [{ s: 68, v: 33 }, { s: 68, v: 34 }],
      },
      {
        main: [{ s: 45, v: 21 }, { s: 45, v: 22 }],
        contextBefore: [{ s: 45, v: 20 }],
        contextAfter: [{ s: 45, v: 24 }],
      },
      {
        main: [{ s: 38, v: 27 }, { s: 38, v: 28 }],
        contextBefore: [{ s: 38, v: 26 }],
      },
      {
        main: [{ s: 40, v: 58 }],
        contextBefore: [{ s: 40, v: 57 }],
        contextAfter: [{ s: 40, v: 59 }],
      },
      {
        main: [{ s: 53, v: 31 }],
        contextBefore: [{ s: 53, v: 29 }, { s: 53, v: 30 }],
        contextAfter: [{ s: 53, v: 32 }],
      },
      {
        main: [{ s: 99, v: 7 }, { s: 99, v: 8 }],
        contextBefore: [{ s: 99, v: 6 }],
      },
    ],
  }
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

const ACCENT = '#10B981'
const ACCENT_DIM = 'rgba(16,185,129,0.15)'
const ACCENT_FAINT = 'rgba(16,185,129,0.08)'
const ACCENT_BORDER = 'rgba(16,185,129,0.1)'

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
              background: ACCENT_DIM,
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
          <VerseBlock key={`${surah.id}-${verse.id}`} surah={surah} verse={verse} isMain amiriClass={amiriClass} />
        ))}
        {mainVerses.length > 1 && (
          <div style={{ padding: '0.5rem 1.25rem', borderTop: `1px solid ${ACCENT_FAINT}` }}>
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
        <VerseBlock key={`main-${surah.id}-${verse.id}`} surah={surah} verse={verse} isMain amiriClass={amiriClass} />
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
              borderTop: `1px solid ${ACCENT_FAINT}`,
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

      <details style={{ borderTop: `1px solid rgba(16,185,129,0.08)` }}>
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
            <VerseBlock key={`ctx-b-${surah.id}-${verse.id}`} surah={surah} verse={verse} isMain={false} amiriClass={amiriClass} />
          ))}
          {mainVerses.map(({ verse, surah }) => (
            <VerseBlock key={`ctx-m-${surah.id}-${verse.id}`} surah={surah} verse={verse} isMain amiriClass={amiriClass} />
          ))}
          {contextAfterVerses.map(({ verse, surah }) => (
            <VerseBlock key={`ctx-a-${surah.id}-${verse.id}`} surah={surah} verse={verse} isMain={false} amiriClass={amiriClass} />
          ))}
        </div>
      </details>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────── */

export default async function SensDelaViePage() {
  const quran = await fetchQuran()

  return (
    <>
      <style>{`
        details > summary { list-style: none; }
        @keyframes versePlay { from { background: rgba(16,185,129,0.35); } to { background: rgba(16,185,129,0.18); } }
        [data-verse-playing="true"] { animation: versePlay 0.5s ease-out forwards !important; border-left-color: #10B981 !important; }
        details > summary::-webkit-details-marker { display: none; }
        details[open] > summary { color: ${ACCENT}; }
        details[open] > summary::before { content: '▲ '; font-size: 0.6rem; }
        details:not([open]) > summary::before { content: '▼ '; font-size: 0.6rem; }
        .nav-link-green:hover { color: ${ACCENT} !important; background: ${ACCENT_FAINT} !important; }
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
              background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Liens retour */}
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="/islam-in-quran"
              style={{ fontSize: '0.72rem', color: '#475569', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.08)', padding: '4px 12px', borderRadius: '999px' }}
              className="nav-link-green"
            >
              ← L&apos;Islam, religion de tous les Prophètes
            </a>
            <a
              href="/amour-allah"
              style={{ fontSize: '0.72rem', color: '#475569', textDecoration: 'none', border: '1px solid rgba(232,80,122,0.2)', padding: '4px 12px', borderRadius: '999px' }}
              className="nav-link-green"
            >
              ♥ L&apos;Amour d&apos;Allah
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
                whiteSpace: 'nowrap',
              }}
            >
              ☀ Les heures du croyant →
            </a>
          </div>

          <p
            className={amiri.className}
            dir="rtl"
            style={{ fontSize: '1.5rem', color: ACCENT, marginBottom: '1.25rem', letterSpacing: '0.05em' }}
          >
            وَمَا خَلَقۡتُ ٱلۡجِنَّ وَٱلۡإِنسَ إِلَّا لِيَعۡبُدُونِ
          </p>
          <h1
            className="hero-title"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem', color: '#F8FAFC' }}
          >
            Le sens de la vie{' '}
            <span style={{ color: ACCENT }}>selon le Coran</span>
          </h1>
          <p
            style={{ color: '#94A3B8', fontSize: '1rem', maxWidth: '38rem', margin: '0 auto', lineHeight: 1.7 }}
          >
            Pourquoi Allah a-t-Il créé les cieux, la terre, l&apos;homme, la mort et la vie ?
            Les réponses du Coran.
          </p>

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
                  border: `1px solid rgba(16,185,129,0.25)`,
                  color: '#94A3B8',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
                className="nav-link-green"
              >
                {s.title.split('—')[0].trim()}
              </a>
            ))}
          </div>
        </header>

        <div
          className="main-grid main-grid-stretched"
          style={{
            gridTemplateColumns: SECTIONS.length > 0 ? '263px 1fr' : '1fr',
          }}
        >
          {/* ── Sidebar ── */}
          <nav
            className="sidebar"
            style={{ position: 'sticky', top: '2rem', display: 'flex', flexDirection: 'column', gap: '2px' }}
          >
            <p
              style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#475569', marginBottom: '0.75rem', paddingLeft: '0.5rem' }}
            >
              Navigation
            </p>
            {SECTIONS.map(s => {
              const [theme, subtitle] = s.title.split('—')
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="nav-link-green"
                  style={{ display: 'block', padding: '0.45rem 0.75rem', borderRadius: '8px', textDecoration: 'none', color: '#64748B', fontSize: '0.78rem', lineHeight: 1.4 }}
                >
                  <span style={{ color: ACCENT, fontWeight: 600 }}>{theme.trim()}</span>
                  {subtitle && (
                    <>
                      <br />
                      <span style={{ fontSize: '0.68rem', color: '#475569' }}>{subtitle.trim()}</span>
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
                      background: ACCENT_DIM,
                      border: `1px solid rgba(16,185,129,0.3)`,
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

                <div
                  style={{ borderLeft: `1px solid rgba(16,185,129,0.12)`, paddingLeft: '1.5rem', marginLeft: '1rem' }}
                >
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
                borderTop: `1px solid rgba(16,185,129,0.12)`,
                marginTop: '2rem',
              }}
            >
              <p
                className={amiri.className}
                dir="rtl"
                style={{ fontSize: '1.6rem', color: ACCENT, marginBottom: '1rem', lineHeight: 2 }}
              >
                أَفَحَسِبۡتُمۡ أَنَّمَا خَلَقۡنَٰكُمۡ عَبَثٗا وَأَنَّكُمۡ إِلَيۡنَا لَا تُرۡجَعُونَ
              </p>
              <p style={{ color: '#64748B', fontSize: '0.875rem', fontStyle: 'italic' }}>
                « Pensiez-vous que Nous vous avions créés sans but,
                et que vous ne seriez pas ramenés vers Nous ? »
              </p>
              <p
                style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: ACCENT, fontFamily: 'monospace', letterSpacing: '0.06em' }}
              >
                Al-Mu&apos;minun 23:115
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
