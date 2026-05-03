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
        main: [{ s: 3, v: 19 }, { s: 3, v: 20 }],
        contextBefore: [{ s: 3, v: 18 }],
      },
      {
        main: [{ s: 3, v: 84 }, { s: 3, v: 85 }],
        contextBefore: [{ s: 3, v: 83 }],
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
        contextAfter: [{ s: 2, v: 133 }, { s: 2, v: 134 }],
      },
      {
        main: [{ s: 3, v: 67 }],
        contextBefore: [{ s: 3, v: 64 }, { s: 3, v: 65 }, { s: 3, v: 66 }],
        contextAfter: [{ s: 3, v: 68 }],
      },
      { main: [{ s: 3, v: 95 }] },
      {
        main: [{ s: 16, v: 120 }],
        contextAfter: [
          { s: 16, v: 121 }, { s: 16, v: 122 }, { s: 16, v: 123 },
          { s: 16, v: 124 }, { s: 16, v: 125 },
        ],
      },
      {
        main: [{ s: 4, v: 125 }],
        contextBefore: [{ s: 4, v: 124 }],
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
      { main: [{ s: 5, v: 44 }] },
      {
        main: [{ s: 7, v: 126 }],
        contextBefore: [
          { s: 7, v: 103 }, { s: 7, v: 104 }, { s: 7, v: 105 }, { s: 7, v: 106 },
          { s: 7, v: 107 }, { s: 7, v: 108 }, { s: 7, v: 109 }, { s: 7, v: 110 },
          { s: 7, v: 111 }, { s: 7, v: 112 }, { s: 7, v: 113 }, { s: 7, v: 114 },
          { s: 7, v: 115 }, { s: 7, v: 116 }, { s: 7, v: 117 }, { s: 7, v: 118 },
          { s: 7, v: 119 }, { s: 7, v: 120 }, { s: 7, v: 121 }, { s: 7, v: 122 },
          { s: 7, v: 123 }, { s: 7, v: 124 }, { s: 7, v: 125 },
        ],
      },
    ],
  },
  {
    id: 'Jesus et les apôtres (hawariyyun)',
    title: "Les Ḥawariyyūn — Les disciples de Jesus ('Issa Ibn Maryam) se proclament Muslims",
    groups: [
      {
        main: [{ s: 3, v: 52 }],
        contextAfter: [{ s: 3, v: 53 }],
      },
      { main: [{ s: 5, v: 111 }] },
    ],
  },
  {
    id: 'saba',
    title: 'Sulayman et la Reine de Saba — Deux soumissions, un seul Islam',
    groups: [
      {
        main: [{ s: 27, v: 42 }],
        contextBefore: [
          { s: 27, v: 38 }, { s: 27, v: 39 }, { s: 27, v: 40 }, { s: 27, v: 41 },
        ],
      },
      {
        main: [{ s: 27, v: 44 }],
        contextBefore: [
          { s: 27, v: 29 }, { s: 27, v: 30 }, { s: 27, v: 31 },
          { s: 27, v: 32 }, { s: 27, v: 43 },
        ],
      },
    ],
  },
  {
    id: 'muhammad',
    title: 'Muhammad ﷺ — Sceau des prophètes, Muslim parmi les Muslims',
    groups: [
      {
        main: [{ s: 6, v: 161 }, { s: 6, v: 162 }, { s: 6, v: 163 }],
        contextBefore: [{ s: 6, v: 159 }, { s: 6, v: 160 }],
        contextAfter: [{ s: 6, v: 164 }, { s: 6, v: 165 }],
      },
      {
        main: [{ s: 39, v: 12 }],
        contextBefore: [{ s: 39, v: 11 }],
        contextAfter: [{ s: 39, v: 13 }],
      },
      {
        main: [{ s: 4, v: 65 }],
        contextBefore: [{ s: 4, v: 64 }],
        contextAfter: [{ s: 4, v: 66 }, { s: 4, v: 67 }, { s: 4, v: 68 }, { s: 4, v: 69 }, { s: 4, v: 70 }],
      },
      {
        main: [{ s: 6, v: 14 }],
        contextBefore: [{ s: 6, v: 12 }, { s: 6, v: 13 }],
        contextAfter: [
          { s: 6, v: 15 }, { s: 6, v: 16 }, { s: 6, v: 17 }, { s: 6, v: 18 },
          { s: 6, v: 19 }, { s: 6, v: 20 }, { s: 6, v: 21 },
        ],
      },
      {
        main: [{ s: 27, v: 81 }],
        contextBefore: [
          { s: 27, v: 76 }, { s: 27, v: 77 }, { s: 27, v: 78 },
          { s: 27, v: 79 }, { s: 27, v: 80 },
        ],
        contextAfter: [{ s: 27, v: 82 }],
      },
      {
        main: [{ s: 22, v: 54 }],
        contextBefore: [
          { s: 22, v: 49 }, { s: 22, v: 50 }, { s: 22, v: 51 },
          { s: 22, v: 52 }, { s: 22, v: 53 },
        ],
        contextAfter: [{ s: 22, v: 55 }, { s: 22, v: 56 }, { s: 22, v: 57 }],
      },
      {
        main: [{ s: 21, v: 108 }],
        contextBefore: [{ s: 21, v: 105 }, { s: 21, v: 106 }, { s: 21, v: 107 }],
        contextAfter: [{ s: 21, v: 109 }, { s: 21, v: 110 }, { s: 21, v: 111 }, { s: 21, v: 112 }],
      },
      {
        main: [{ s: 11, v: 14 }],
        contextBefore: [{ s: 11, v: 12 }, { s: 11, v: 13 }],
        contextAfter: [{ s: 11, v: 15 }, { s: 11, v: 16 }, { s: 11, v: 17 }],
      },
      {
        main: [{ s: 40, v: 66 }],
        contextBefore: [{ s: 40, v: 64 }, { s: 40, v: 65 }],
      },
      {
        main: [{ s: 27, v: 91 }],
        contextAfter: [{ s: 27, v: 92 }, { s: 27, v: 93 }],
      },
    ],
  },
  {
    id: 'continuite',
    title: "La continuité prophétique — Une seule Oummah soumise à Allah",
    groups: [
      { main: [{ s: 42, v: 13 }] },
      { main: [{ s: 2, v: 136 }] },
      {
        main: [{ s: 29, v: 46 }],
        contextBefore: [{ s: 29, v: 45 }],
        contextAfter: [{ s: 29, v: 47 }, { s: 29, v: 48 }, { s: 29, v: 49 }],
      },
      {
        main: [{ s: 28, v: 53 }],
        contextBefore: [{ s: 28, v: 51 }, { s: 28, v: 52 }],
        contextAfter: [{ s: 28, v: 54 }, { s: 28, v: 55 }, { s: 28, v: 56 }],
      },
    ],
  },
  {
    id: 'soumission-voie',
    title: 'La soumission — voie universelle vers le salut',
    groups: [
      {
        main: [{ s: 3, v: 102 }],
        contextBefore: [
          { s: 3, v: 92 }, { s: 3, v: 93 }, { s: 3, v: 94 }, { s: 3, v: 95 },
          { s: 3, v: 96 }, { s: 3, v: 97 }, { s: 3, v: 98 }, { s: 3, v: 99 },
          { s: 3, v: 100 }, { s: 3, v: 101 },
        ],
        contextAfter: [{ s: 3, v: 103 }, { s: 3, v: 104 }, { s: 3, v: 105 }],
      },
      {
        main: [{ s: 2, v: 111 }, { s: 2, v: 112 }],
        contextBefore: [{ s: 2, v: 109 }, { s: 2, v: 110 }],
        contextAfter: [{ s: 2, v: 113 }],
      },
      {
        main: [{ s: 31, v: 22 }],
        contextBefore: [{ s: 31, v: 21 }],
        contextAfter: [{ s: 31, v: 23 }, { s: 31, v: 24 }, { s: 31, v: 25 }, { s: 31, v: 26 }],
      },
      {
        main: [{ s: 41, v: 33 }],
        contextBefore: [{ s: 41, v: 30 }, { s: 41, v: 31 }, { s: 41, v: 32 }],
        contextAfter: [{ s: 41, v: 34 }, { s: 41, v: 35 }, { s: 41, v: 36 }],
      },
      {
        main: [{ s: 16, v: 81 }],
        contextBefore: [{ s: 16, v: 78 }, { s: 16, v: 79 }, { s: 16, v: 80 }],
        contextAfter: [{ s: 16, v: 82 }, { s: 16, v: 83 }],
      },
      {
        main: [{ s: 16, v: 87 }],
        contextBefore: [{ s: 16, v: 84 }, { s: 16, v: 85 }, { s: 16, v: 86 }],
        contextAfter: [{ s: 16, v: 88 }, { s: 16, v: 89 }, { s: 16, v: 90 }, { s: 16, v: 91 }],
      },
      {
        main: [{ s: 15, v: 2 }],
        contextBefore: [{ s: 15, v: 1 }],
        contextAfter: [{ s: 15, v: 3 }],
      },
      {
        main: [{ s: 33, v: 31 }],
        contextBefore: [{ s: 33, v: 28 }, { s: 33, v: 29 }, { s: 33, v: 30 }],
      },
      {
        main: [{ s: 30, v: 53 }],
        contextBefore: [{ s: 30, v: 52 }],
      },
      {
        main: [{ s: 39, v: 54 }],
        contextBefore: [{ s: 39, v: 52 }, { s: 39, v: 53 }],
        contextAfter: [{ s: 39, v: 55 }],
      },
      {
        main: [{ s: 46, v: 15 }],
        contextBefore: [{ s: 46, v: 13 }, { s: 46, v: 14 }],
        contextAfter: [{ s: 46, v: 16 }],
      },
      {
        main: [{ s: 68, v: 35 }],
        contextBefore: [{ s: 68, v: 34 }],
        contextAfter: [{ s: 68, v: 36 }],
      },
      { main: [{ s: 5, v: 3 }] },
      {
        main: [{ s: 22, v: 34 }],
        contextBefore: [{ s: 22, v: 31 }, { s: 22, v: 32 }, { s: 22, v: 33 }],
        contextAfter: [{ s: 22, v: 35 }],
      },
      {
        main: [{ s: 33, v: 35 }],
        contextAfter: [{ s: 33, v: 36 }],
      },
      {
        main: [{ s: 43, v: 69 }],
        contextBefore: [{ s: 43, v: 67 }, { s: 43, v: 68 }],
        contextAfter: [{ s: 43, v: 70 }, { s: 43, v: 71 }, { s: 43, v: 72 }, { s: 43, v: 73 }],
      },
      {
        main: [{ s: 16, v: 89 }],
        contextBefore: [{ s: 16, v: 86 }, { s: 16, v: 87 }, { s: 16, v: 88 }],
      },
      {
        main: [{ s: 16, v: 102 }],
        contextBefore: [{ s: 16, v: 97 }, { s: 16, v: 98 }, { s: 16, v: 99 }, { s: 16, v: 100 }, { s: 16, v: 101 }],
        contextAfter: [{ s: 16, v: 103 }, { s: 16, v: 104 }, { s: 16, v: 105 }],
      },
    ],
  },
  {
    id: 'conclusion-prophetes',
    title: "Suis leur direction — Tous ces prophètes se sont soumis, leurs œuvres eussent été vaines autrement",
    groups: [
      {
        main: [
          { s: 6, v: 82 }, { s: 6, v: 83 },
          { s: 6, v: 84 }, { s: 6, v: 85 }, { s: 6, v: 86 }, { s: 6, v: 87 }, 
          { s: 6, v: 88 }, { s: 6, v: 89 }, { s: 6, v: 90 }],
        contextBefore: [
          
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
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <PassageAudioButton verses={group.main.map(r => ({ s: r.s, v: r.v }))} label="Versets" />
            <PassageAudioButton verses={allRefs} label="Passage complet" />
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
        @keyframes versePlay { from { background: rgba(201,168,76,0.35); } to { background: rgba(201,168,76,0.18); } }
        [data-verse-playing="true"] { animation: versePlay 0.5s ease-out forwards !important; border-left-color: #C9A84C !important; }
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
            <a
              href="/parents-dans-le-coran"
              style={{
                fontSize: '0.72rem',
                padding: '4px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(192,132,252,0.35)',
                color: '#C084FC',
                textDecoration: 'none',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              ◆ Les parents dans le Coran →
            </a>
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
