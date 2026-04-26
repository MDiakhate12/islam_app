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
  title: "Les heures du croyant — L'adoration à travers les temps du jour",
  description:
    "Parcours des versets coraniques sur les moments consacrés à Allah — l'aube, le matin et le soir, la nuit, le tahajjud et le sahar.",
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

  /* ── Bloc I : L'aube — الفجر ────────────────────────────────────────── */

  {
    id: 'quran-fajr',
    title: "قُرۡءَانَ ٱلۡفَجۡرِ كَانَ مَشۡهُودٗا — La récitation à l'aube est attestée",
    groups: [
      {
        main: [{ s: 17, v: 78 }, { s: 17, v: 79 }],
        contextAfter: [{ s: 17, v: 80 }],
      },
    ],
  },
  {
    id: 'tasbih-avant-soleil',
    title: "سَبِّحۡ قَبۡلَ طُلُوعِ ٱلشَّمۡسِ — Glorifie avant le lever du soleil",
    groups: [
      {
        main: [{ s: 50, v: 39 }, { s: 50, v: 40 }],
        contextBefore: [{ s: 50, v: 37 }, { s: 50, v: 38 }],
      },
      {
        main: [{ s: 20, v: 130 }],
        contextBefore: [{ s: 20, v: 128 }, { s: 20, v: 129 }],
      },
      {
        main: [{ s: 52, v: 48 }, { s: 52, v: 49 }],
        contextBefore: [{ s: 52, v: 47 }],
      },
    ],
  },

  /* ── Bloc II : Matin et soir — بكرة وأصيلا ─────────────────────────── */

  {
    id: 'cinq-moments',
    title: "فَسُبۡحَٰنَ ٱللَّهِ حِينَ تُمۡسُونَ — Les cinq moments du tasbih en deux versets",
    groups: [
      {
        main: [{ s: 30, v: 17 }, { s: 30, v: 18 }],
        contextBefore: [{ s: 30, v: 15 }, { s: 30, v: 16 }],
        contextAfter: [{ s: 30, v: 19 }],
      },
    ],
  },
  {
    id: 'dhikr-kathir',
    title: "ٱذۡكُرُواْ ٱللَّهَ ذِكۡرٗا كَثِيرٗا — Rappelez-vous d'Allah abondamment",
    groups: [
      {
        main: [{ s: 33, v: 41 }, { s: 33, v: 42 }],
        contextAfter: [{ s: 33, v: 43 }, { s: 33, v: 44 }],
      },
    ],
  },
  {
    id: 'bukra-asil',
    title: "بُكۡرَةٗ وَأَصِيلٗا — Au matin et au soir",
    groups: [
      {
        main: [{ s: 76, v: 25 }, { s: 76, v: 26 }],
        contextBefore: [{ s: 76, v: 23 }, { s: 76, v: 24 }],
      },
      {
        main: [{ s: 48, v: 9 }],
        contextBefore: [{ s: 48, v: 8 }],
      },
      {
        main: [{ s: 40, v: 55 }],
        contextBefore: [{ s: 40, v: 54 }],
        contextAfter: [{ s: 40, v: 56 }],
      },
      {
        main: [{ s: 19, v: 11 }],
        contextBefore: [{ s: 19, v: 9 }, { s: 19, v: 10 }],
        contextAfter: [{ s: 19, v: 12 }, { s: 19, v: 13 }],
      },
      {
        main: [{ s: 38, v: 18 }],
        contextBefore: [{ s: 38, v: 17 }],
        contextAfter: [{ s: 38, v: 19 }, { s: 38, v: 20 }],
      },
    ],
  },
  {
    id: 'ghuduw-asal',
    title: "بِٱلۡغُدُوِّ وَٱلۡأٓصَالِ — Dans l'humilité du matin et du soir",
    groups: [
      {
        main: [{ s: 7, v: 205 }],
        contextAfter: [{ s: 7, v: 206 }],
      },
      {
        main: [{ s: 24, v: 36 }, { s: 24, v: 37 }],
        contextBefore: [{ s: 24, v: 35 }],
        contextAfter: [{ s: 24, v: 38 }],
      },
      {
        main: [{ s: 13, v: 15 }],
        contextBefore: [{ s: 13, v: 13 }, { s: 13, v: 14 }],
        contextAfter: [{ s: 13, v: 16 }],
      },
    ],
  },
  {
    id: 'ghada-ashiy',
    title: "يَدۡعُونَ رَبَّهُم بِٱلۡغَدَوٰةِ وَٱلۡعَشِيِّ — Reste avec ceux qui invoquent matin et soir",
    groups: [
      {
        main: [{ s: 18, v: 28 }],
        contextBefore: [{ s: 18, v: 27 }],
        contextAfter: [{ s: 18, v: 29 }],
      },
      {
        main: [{ s: 6, v: 52 }],
        contextBefore: [{ s: 6, v: 50 }, { s: 6, v: 51 }],
        contextAfter: [{ s: 6, v: 53 }],
      },
    ],
  },

  /* ── Bloc III : Les deux bouts du jour — طرفي النهار ────────────────── */

  {
    id: 'tarafay-nahar',
    title: "طَرَفَيِ ٱلنَّهَارِ — La prière aux deux bouts du jour efface les fautes",
    groups: [
      {
        main: [{ s: 11, v: 114 }],
        contextBefore: [{ s: 11, v: 112 }, { s: 11, v: 113 }],
        contextAfter: [{ s: 11, v: 115 }],
      },
    ],
  },
  {
    id: 'salawat-mawquta',
    title: "كِتَٰبٗا مَّوۡقُوتٗا — La prière est prescrite à des heures fixes",
    groups: [
      {
        main: [{ s: 4, v: 103 }],
        contextBefore: [{ s: 4, v: 102 }],
      },
      {
        main: [{ s: 2, v: 238 }],
        contextAfter: [{ s: 2, v: 239 }],
      },
    ],
  },

  /* ── Bloc IV : La nuit — آناء الليل ─────────────────────────────────── */

  {
    id: 'tajafa-junub',
    title: "تَتَجَافَىٰ جُنُوبُهُمۡ عَنِ ٱلۡمَضَاجِعِ — Leurs flancs s'arrachent des couches",
    groups: [
      {
        main: [{ s: 32, v: 15 }, { s: 32, v: 16 }, { s: 32, v: 17 }],
        contextAfter: [{ s: 32, v: 18 }],
      },
    ],
  },
  {
    id: 'yabeetun',
    title: "يَبِيتُونَ لِرَبِّهِمۡ سُجَّدٗا وَقِيَٰمٗا — Ils passent la nuit prosternés et debout",
    groups: [
      {
        main: [{ s: 25, v: 64 }],
        contextBefore: [{ s: 25, v: 63 }],
        contextAfter: [{ s: 25, v: 65 }, { s: 25, v: 66 }, { s: 25, v: 67 }],
      },
    ],
  },
  {
    id: 'qanit-layl',
    title: "قَانِتٌ ءَانَآءَ ٱلَّيۡلِ — L'homme dévoué aux heures de la nuit",
    groups: [
      {
        main: [{ s: 39, v: 9 }],
        contextAfter: [{ s: 39, v: 10 }],
      },
    ],
  },

  /* ── Bloc V : Le qiyam al-layl — قيام الليل ─────────────────────────── */

  {
    id: 'qumil-layl',
    title: "قُمِ ٱلَّيۡلَ إِلَّا قَلِيلٗا — Lève-toi la nuit",
    groups: [
      {
        main: [
          { s: 73, v: 1 }, { s: 73, v: 2 }, { s: 73, v: 3 }, { s: 73, v: 4 },
        ],
        contextAfter: [
          { s: 73, v: 5 }, { s: 73, v: 6 }, { s: 73, v: 7 }, { s: 73, v: 8 },
        ],
      },
      {
        main: [{ s: 73, v: 20 }],
      },
    ],
  },

  /* ── Bloc VI : Le sahar — بالأسحار ──────────────────────────────────── */

  {
    id: 'istighfar-sahar',
    title: "وَبِٱلۡأَسۡحَارِ هُمۡ يَسۡتَغۡفِرُونَ — À l'heure de l'aube, ils demandent pardon",
    groups: [
      {
        main: [{ s: 51, v: 17 }, { s: 51, v: 18 }],
        contextBefore: [{ s: 51, v: 15 }, { s: 51, v: 16 }],
        contextAfter: [{ s: 51, v: 19 }, { s: 51, v: 20 }],
      },
      {
        main: [{ s: 3, v: 17 }],
        contextBefore: [{ s: 3, v: 15 }, { s: 3, v: 16 }],
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

const ACCENT = '#F59E0B'
const ACCENT_DIM = 'rgba(245,158,11,0.15)'
const ACCENT_FAINT = 'rgba(245,158,11,0.06)'
const ACCENT_BORDER = 'rgba(245,158,11,0.1)'

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
              background: 'rgba(245,158,11,0.12)',
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
          <div style={{ padding: '0.5rem 1.25rem', borderTop: `1px solid rgba(245,158,11,0.06)` }}>
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
              borderTop: `1px solid rgba(245,158,11,0.06)`,
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

      <details style={{ borderTop: `1px solid rgba(245,158,11,0.08)` }}>
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

export default async function LesHeuresDuCroyantPage() {
  const quran = await fetchQuran()

  return (
    <>
      <style>{`
        details > summary { list-style: none; }
        @keyframes versePlay { from { background: rgba(245,158,11,0.35); } to { background: rgba(245,158,11,0.18); } }
        [data-verse-playing="true"] { animation: versePlay 0.5s ease-out forwards !important; border-left-color: #F59E0B !important; }
        details > summary::-webkit-details-marker { display: none; }
        details[open] > summary { color: ${ACCENT}; }
        details[open] > summary::before { content: '▲ '; font-size: 0.6rem; }
        details:not([open]) > summary::before { content: '▼ '; font-size: 0.6rem; }
        .nav-link:hover { color: ${ACCENT} !important; background: rgba(245,158,11,0.06) !important; }
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
                'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.07) 0%, transparent 70%)',
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
          </div>

          <p
            className={amiri.className}
            dir="rtl"
            style={{ fontSize: '1.5rem', color: ACCENT, marginBottom: '1.25rem', letterSpacing: '0.05em' }}
          >
            وَٱذۡكُرِ ٱسۡمَ رَبِّكَ بُكۡرَةٗ وَأَصِيلٗا
          </p>
          <h1
            className="hero-title"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem', color: '#F8FAFC' }}
          >
            Les heures{' '}
            <span style={{ color: ACCENT }}>du croyant</span>
          </h1>
          <p
            style={{ color: '#94A3B8', fontSize: '1rem', maxWidth: '40rem', margin: '0 auto', lineHeight: 1.7 }}
          >
            De l&apos;aube au sahar — les moments que le Coran consacre au dhikr,
            à la prière, au tasbih et à l&apos;istighfar.
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
                  border: '1px solid rgba(245,158,11,0.25)',
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
                      background: 'rgba(245,158,11,0.12)',
                      border: '1px solid rgba(245,158,11,0.3)',
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

                <div style={{ borderLeft: `1px solid rgba(245,158,11,0.12)`, paddingLeft: '1.5rem', marginLeft: '1rem' }}>
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
                borderTop: `1px solid rgba(245,158,11,0.12)`,
                marginTop: '2rem',
              }}
            >
              <p
                className={amiri.className}
                dir="rtl"
                style={{ fontSize: '1.6rem', color: ACCENT, marginBottom: '1rem', lineHeight: 2 }}
              >
                أَلَا بِذِكۡرِ ٱللَّهِ تَطۡمَئِنُّ ٱلۡقُلُوبُ
              </p>
              <p style={{ color: '#64748B', fontSize: '0.875rem', fontStyle: 'italic' }}>
                « Certes, c&apos;est par le rappel d&apos;Allah que les cœurs se tranquillisent. »
              </p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: ACCENT, fontFamily: 'monospace', letterSpacing: '0.06em' }}>
                Ar-Raʿd 13:28
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
