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
  title: 'Le Tawhid dans le Coran — L\'Unicité d\'Allah',
  description:
    "Les versets coraniques sur le Tawhid : l'unicité de la divinité (uluhiyya), de la seigneurie (rububiyya) et des noms et attributs d'Allah (asma' wa-l-sifat).",
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

  /* ── Déclaration suprême ─────────────────────────────────────────────── */

  {
    id: 'al-ikhlas',
    title: 'قُلۡ هُوَ ٱللَّهُ أَحَدٌ — La sourate de la pureté absolue',
    groups: [
      {
        main: [{ s: 112, v: 1 }, { s: 112, v: 2 }, { s: 112, v: 3 }, { s: 112, v: 4 }],
      },
    ],
  },

  {
    id: 'ana-allah',
    title: 'إِنَّنِيٓ أَنَا۠ ٱللَّهُ — "Je suis Allah, adore-Moi seul"',
    groups: [
      {
        main: [{ s: 20, v: 14 }],
        contextBefore: [{ s: 20, v: 12 }, { s: 20, v: 13 }],
        contextAfter: [{ s: 20, v: 15 }, { s: 20, v: 16 }],
      },
      {
        main: [{ s: 2, v: 163 }],
        contextAfter: [{ s: 2, v: 164 }],
      },
    ],
  },

  {
    id: 'message-prophetes',
    title: 'لَآ إِلَٰهَ إِلَّآ أَنَا۠ — Le message unique de tous les prophètes',
    groups: [
      {
        main: [{ s: 21, v: 25 }],
        contextBefore: [{ s: 21, v: 24 }],
        contextAfter: [{ s: 21, v: 26 }],
      },
      {
        main: [{ s: 16, v: 36 }],
        contextAfter: [{ s: 16, v: 37 }],
      },
    ],
  },

  /* ── Tawhid al-Rububiyya ─────────────────────────────────────────────── */

  {
    id: 'rabb-al-alamin',
    title: 'رَبُّ ٱلۡعَٰلَمِينَ — Seigneur de l\'univers',
    groups: [
      {
        main: [{ s: 7, v: 54 }],
        contextAfter: [{ s: 7, v: 55 }, { s: 7, v: 56 }],
      },
      {
        main: [{ s: 13, v: 16 }],
        contextBefore: [{ s: 13, v: 15 }],
      },
    ],
  },

  {
    id: 'khaliq-kull-shay',
    title: 'خَٰلِقُ كُلِّ شَيۡءٍ — Créateur de toute chose',
    groups: [
      {
        main: [{ s: 6, v: 102 }],
        contextBefore: [{ s: 6, v: 100 }, { s: 6, v: 101 }],
        contextAfter: [{ s: 6, v: 103 }],
      },
      {
        main: [{ s: 39, v: 62 }, { s: 39, v: 63 }],
        contextBefore: [{ s: 39, v: 61 }],
      },
    ],
  },

  {
    id: 'hayy-qayyum',
    title: 'ٱلۡحَيُّ ٱلۡقَيُّومُ — L\'Éternel Vivant',
    groups: [
      {
        main: [{ s: 2, v: 255 }],
        contextAfter: [{ s: 2, v: 256 }],
      },
      {
        main: [{ s: 57, v: 1 }, { s: 57, v: 2 }, { s: 57, v: 3 }],
        contextAfter: [{ s: 57, v: 4 }],
      },
    ],
  },

  {
    id: 'awwal-akhir',
    title: 'ٱلۡأَوَّلُ وَٱلۡأٓخِرُ — Le Premier, le Dernier, l\'Apparent, le Caché',
    groups: [
      {
        main: [{ s: 55, v: 26 }, { s: 55, v: 27 }],
        contextBefore: [{ s: 55, v: 24 }, { s: 55, v: 25 }],
        contextAfter: [{ s: 55, v: 28 }],
      },
      {
        main: [{ s: 3, v: 2 }],
        contextAfter: [{ s: 3, v: 3 }],
      },
    ],
  },

  /* ── Tawhid al-Uluhiyya ──────────────────────────────────────────────── */

  {
    id: 'ibadah-lillah',
    title: 'إِلَّا لِيَعۡبُدُونِ — Créés pour L\'adorer seul',
    groups: [
      {
        main: [{ s: 51, v: 56 }, { s: 51, v: 57 }, { s: 51, v: 58 }],
        contextBefore: [{ s: 51, v: 55 }],
      },
      {
        main: [{ s: 4, v: 36 }],
        contextAfter: [{ s: 4, v: 37 }],
      },
    ],
  },

  {
    id: 'ilah-wahid',
    title: 'إِلَٰهٞ وَٰحِدٞ — Votre Dieu est un Dieu Unique',
    groups: [
      {
        main: [{ s: 18, v: 110 }],
        contextBefore: [{ s: 18, v: 109 }],
      },
      {
        main: [{ s: 14, v: 52 }],
        contextBefore: [{ s: 14, v: 51 }],
      },
    ],
  },

  {
    id: 'la-shirk',
    title: 'إِنَّ ٱلشِّرۡكَ لَظُلۡمٌ عَظِيمٌ — L\'associationnisme, l\'injustice suprême',
    groups: [
      {
        main: [{ s: 4, v: 48 }],
        contextAfter: [{ s: 4, v: 49 }, { s: 4, v: 50 }],
      },
      {
        main: [{ s: 31, v: 13 }],
        contextBefore: [{ s: 31, v: 12 }],
        contextAfter: [{ s: 31, v: 14 }, { s: 31, v: 15 }],
      },
      {
        main: [{ s: 39, v: 65 }],
        contextAfter: [{ s: 39, v: 66 }],
      },
    ],
  },

  /* ── Tawhid al-Asma' wa-l-Sifat ─────────────────────────────────────── */

  {
    id: 'asma-husna',
    title: 'ٱلۡأَسۡمَآءُ ٱلۡحُسۡنَىٰ — Les plus Beaux Noms d\'Allah',
    groups: [
      {
        main: [{ s: 59, v: 22 }, { s: 59, v: 23 }, { s: 59, v: 24 }],
        contextBefore: [{ s: 59, v: 21 }],
      },
      {
        main: [{ s: 7, v: 180 }],
        contextBefore: [{ s: 7, v: 179 }],
      },
    ],
  },

  {
    id: 'laysa-kamithlihi',
    title: 'لَيۡسَ كَمِثۡلِهِۦ شَيۡءٌ — Rien n\'est semblable à Lui',
    groups: [
      {
        main: [{ s: 42, v: 11 }],
        contextBefore: [{ s: 42, v: 10 }],
        contextAfter: [{ s: 42, v: 12 }],
      },
      {
        main: [{ s: 6, v: 103 }],
        contextBefore: [{ s: 6, v: 101 }, { s: 6, v: 102 }],
      },
    ],
  },

  {
    id: 'shahida-allah',
    title: 'شَهِدَ ٱللَّهُ — Allah atteste Lui-même Son Unicité',
    groups: [
      {
        main: [{ s: 3, v: 18 }],
        contextAfter: [{ s: 3, v: 19 }],
      },
      {
        main: [{ s: 20, v: 8 }],
        contextBefore: [{ s: 20, v: 6 }, { s: 20, v: 7 }],
      },
    ],
  },
]

/* ─── Data fetching ──────────────────────────────────────────────────── */

async function fetchQuran(): Promise<Surah[]> {
  const res = await fetch(
    'https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_fr.json',
    { next: { revalidate: 86400 } },
  )
  if (!res.ok) throw new Error('Failed to fetch Quran data')
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

const ACCENT = '#F97316'
const ACCENT_DIM = 'rgba(249,115,22,0.15)'
const ACCENT_FAINT = 'rgba(249,115,22,0.07)'
const ACCENT_BORDER = 'rgba(249,115,22,0.1)'

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
              background: 'rgba(249,115,22,0.12)',
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
          color: isMain ? '#E0F2FE' : '#94A3B8',
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
          <div style={{ padding: '0.5rem 1.25rem', borderTop: `1px solid rgba(249,115,22,0.06)` }}>
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
          borderTop: `1px solid rgba(249,115,22,0.06)`,
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

      <details style={{ borderTop: `1px solid rgba(249,115,22,0.08)` }}>
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

export default async function TawhidPage() {
  const quran = await fetchQuran()

  return (
    <>
      <style>{`
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        details[open] > summary { color: ${ACCENT}; }
        details[open] > summary::before { content: '▲ '; font-size: 0.6rem; }
        details:not([open]) > summary::before { content: '▼ '; font-size: 0.6rem; }
        .nav-link:hover { color: ${ACCENT} !important; background: rgba(249,115,22,0.06) !important; }
        @keyframes versePlay { from { background: rgba(249,115,22,0.3); } to { background: rgba(249,115,22,0.15); } }
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
                'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249,115,22,0.07) 0%, transparent 70%)',
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
            <a href="/amour-allah" style={{ fontSize: '0.72rem', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(232,80,122,0.35)', color: '#E8507A', textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              ♥ L&apos;Amour d&apos;Allah
            </a>
            <a href="/sens-de-la-vie" style={{ fontSize: '0.72rem', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(16,185,129,0.35)', color: '#10B981', textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              ✦ Le sens de la vie
            </a>
            <a href="/isa-ibn-maryam" style={{ fontSize: '0.72rem', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(96,165,250,0.35)', color: '#60A5FA', textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              ✶ Isa ibn Maryam
            </a>
            <a href="/les-heures-du-croyant" style={{ fontSize: '0.72rem', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(245,158,11,0.35)', color: '#F59E0B', textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              ☀ Les heures du croyant
            </a>
            <a href="/parents-dans-le-coran" style={{ fontSize: '0.72rem', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(192,132,252,0.35)', color: '#C084FC', textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              ◆ Les parents dans le Coran
            </a>
            <a href="/beau-caractere" style={{ fontSize: '0.72rem', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(45,212,191,0.35)', color: '#2DD4BF', textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              ✿ Le beau caractère
            </a>
          </div>

          <p
            className={amiri.className}
            dir="rtl"
            style={{ fontSize: '1.6rem', color: ACCENT, marginBottom: '1.25rem', letterSpacing: '0.05em' }}
          >
            قُلۡ هُوَ ٱللَّهُ أَحَدٌ
          </p>
          <h1
            className="hero-title"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem', color: '#F8FAFC' }}
          >
            Le{' '}
            <span style={{ color: ACCENT }}>Tawhid</span>
          </h1>
          <p
            style={{ color: '#94A3B8', fontSize: '1rem', maxWidth: '44rem', margin: '0 auto', lineHeight: 1.7 }}
          >
            L&apos;unicité de la divinité, de la seigneurie et des noms et attributs d&apos;Allah — le fondement de l&apos;islam, le message de tous les prophètes.
          </p>

          {/* Anchor pills */}
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {SECTIONS.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  fontSize: '0.72rem',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  border: '1px solid rgba(249,115,22,0.25)',
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
                      background: 'rgba(249,115,22,0.12)',
                      border: '1px solid rgba(249,115,22,0.3)',
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

                <div style={{ borderLeft: `1px solid rgba(249,115,22,0.12)`, paddingLeft: '1.5rem', marginLeft: '1rem' }}>
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
                borderTop: `1px solid rgba(249,115,22,0.12)`,
                marginTop: '2rem',
              }}
            >
              <p
                className={amiri.className}
                dir="rtl"
                style={{ fontSize: '1.6rem', color: ACCENT, marginBottom: '1rem', lineHeight: 2 }}
              >
                شَهِدَ ٱللَّهُ أَنَّهُۥ لَآ إِلَٰهَ إِلَّا هُوَ وَٱلۡمَلَٰٓئِكَةُ وَأُوْلُواْ ٱلۡعِلۡمِ قَآئِمَۢا بِٱلۡقِسۡطِ
              </p>
              <p style={{ color: '#64748B', fontSize: '0.875rem', fontStyle: 'italic' }}>
                « Allah atteste qu&apos;il n&apos;est de dieu que Lui, ainsi que les Anges et les gens du savoir, établis en toute équité. »
              </p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: ACCENT, fontFamily: 'monospace', letterSpacing: '0.06em' }}>
                Āl ʿImrān 3:18
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
