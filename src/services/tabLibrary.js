/**
 * @typedef {Object} Tab
 * @property {string} id
 * @property {string} title
 * @property {string} artist
 * @property {string} instrument
 * @property {string} tuning
 * @property {string} capo
 * @property {string} difficulty
 * @property {string[]} tags
 * @property {string} content
 * @property {string=} source
 */

/** @type {Tab[]} */
const tabs = [
  {
    id: 'sunrise-groove',
    title: 'Sunrise Groove',
    artist: 'The Morning Lines',
    instrument: 'Guitare',
    tuning: 'Standard (E A D G B E)',
    capo: '2',
    difficulty: 'Facile',
    tags: ['acoustique', 'pop', 'arpeges'],
    content: `Intro

E|-----0-----0-----0-----0---|
B|---1-----1-----1-----1-----|
G|-2-----2-----2-----2-------|
D|---------------------------|
A|---------------------------|
E|---------------------------|

Couplet

E|-----0-----0-----0-----0---|
B|---1-----1-----1-----1-----|
G|-2-----2-----2-----2-------|
D|---------------------------|
A|-----0-----------2-----2---|
E|-----------3---------------|`,
  },
  {
    id: 'midnight-bassline',
    title: 'Midnight Bassline',
    artist: 'City Lights',
    instrument: 'Basse',
    tuning: 'Standard (E A D G)',
    capo: 'Aucun',
    difficulty: 'Intermediaire',
    tags: ['groove', 'funk', 'slap'],
    content: `Main

G|----------------|----------------|
D|-----------5-7--|-----------5-7--|
A|-----5-7-8------|-----5-7-8------|
E|-5-8------------|-5-8------------|

Break

G|----------------|
D|-----7-5--------|
A|-5-7-----7-5----|
E|-------------8--|`,
  },
  {
    id: 'coastline-ukulele',
    title: 'Coastline',
    artist: 'Blue Tides',
    instrument: 'Ukulele',
    tuning: 'Standard (G C E A)',
    capo: 'Aucun',
    difficulty: 'Facile',
    tags: ['chill', 'strumming', 'ete'],
    content: `Intro

A|--2---2---0---0-|
E|--3---3---2---2-|
C|--2---2---2---2-|
G|--0---0---0---0-|

Refrain

A|--5---5---3---3-|
E|--5---5---3---3-|
C|--4---4---2---2-|
G|--0---0---0---0-|`,
  },
]

export function getTabs() {
  return tabs
}

/**
 * @param {string} id
 */
export function getTabById(id) {
  return tabs.find((tab) => tab.id === id) || null
}
