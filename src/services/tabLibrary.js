import baseTabsData from '../data/tabs.json'

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

const LOCAL_STORAGE_KEY = 'tabstudio.localTabs'

/** @type {Tab[]} */
const baseTabs = baseTabsData

/** @type {Tab[]} */
let localTabs = readLocalTabs()

export function getTabs() {
  return [...baseTabs, ...localTabs]
}

/**
 * @param {string} id
 */
export function getTabById(id) {
  return getTabs().find((tab) => tab.id === id) || null
}

/**
 * @param {string} jsonText
 * @returns {{ added: number, errors: string[] }}
 */
export function importTabsFromJsonText(jsonText) {
  /** @type {string[]} */
  const errors = []
  let parsed

  try {
    parsed = JSON.parse(jsonText)
  } catch {
    return { added: 0, errors: ['JSON invalide: impossible a parser.'] }
  }

  const candidates = Array.isArray(parsed) ? parsed : [parsed]

  if (!candidates.length || typeof candidates[0] !== 'object' || candidates[0] === null) {
    return { added: 0, errors: ['Le JSON doit contenir un objet ou un tableau d’objets.'] }
  }

  const existingIds = new Set(getTabs().map((tab) => tab.id))
  /** @type {Tab[]} */
  const validTabs = []

  candidates.forEach((candidate, index) => {
    const { tab, errors: itemErrors } = normalizeTab(candidate)

    if (!tab || itemErrors.length) {
      errors.push(`Tab ${index + 1}: ${itemErrors.join(', ')}`)
      return
    }

    if (existingIds.has(tab.id)) {
      errors.push(`Tab ${index + 1}: id '${tab.id}' deja utilise.`)
      return
    }

    existingIds.add(tab.id)
    validTabs.push(tab)
  })

  if (validTabs.length) {
    localTabs = [...localTabs, ...validTabs]
    writeLocalTabs(localTabs)
  }

  return { added: validTabs.length, errors }
}

/**
 * @param {unknown} value
 * @returns {{ tab: Tab | null, errors: string[] }}
 */
function normalizeTab(value) {
  /** @type {string[]} */
  const errors = []

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    errors.push('structure invalide')
    return { tab: null, errors }
  }

  const raw = value
  const requiredStringFields = ['id', 'title', 'artist', 'instrument', 'tuning', 'difficulty', 'content']
  /** @type {Tab} */
  const tab = {
    id: '',
    title: '',
    artist: '',
    instrument: '',
    tuning: '',
    capo: '',
    difficulty: '',
    tags: [],
    content: '',
  }

  requiredStringFields.forEach((field) => {
    if (typeof raw[field] !== 'string' || raw[field].trim().length === 0) {
      errors.push(`champ '${field}' manquant ou invalide`)
    } else {
      tab[field] = raw[field].trim()
    }
  })

  if (typeof raw.capo === 'string' && raw.capo.trim()) {
    tab.capo = raw.capo.trim()
  } else if (typeof raw.capo === 'number' && Number.isFinite(raw.capo)) {
    tab.capo = String(raw.capo)
  } else {
    errors.push("champ 'capo' manquant ou invalide")
  }

  if (Array.isArray(raw.tags)) {
    const invalidTag = raw.tags.find((tag) => typeof tag !== 'string' || tag.trim().length === 0)
    if (invalidTag) {
      errors.push("champ 'tags' invalide (tableau de textes)")
    } else {
      tab.tags = raw.tags.map((tag) => tag.trim())
    }
  } else {
    errors.push("champ 'tags' manquant ou invalide")
  }

  if (raw.source !== undefined) {
    if (typeof raw.source !== 'string' || raw.source.trim().length === 0) {
      errors.push("champ 'source' invalide")
    } else {
      tab.source = raw.source.trim()
    }
  }

  return { tab, errors }
}

/**
 * @returns {Tab[]}
 */
function readLocalTabs() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return []
  }

  const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * @param {Tab[]} tabs
 */
function writeLocalTabs(tabs) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return
  }

  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tabs))
}
