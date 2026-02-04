<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { getTabs, importTabsFromJsonText } from '../services/tabLibrary'

const tabs = ref([])
const loadState = reactive({
  status: 'loading',
  message: '',
})

const filters = reactive({
  query: '',
  instrument: 'Tous',
  difficulty: 'Tous',
  tag: 'Tous',
})

const importState = reactive({
  status: 'idle',
  message: '',
  errors: [],
})

const instruments = computed(() => {
  const values = new Set(tabs.value.map((tab) => tab.instrument))
  return ['Tous', ...values]
})

const difficulties = computed(() => {
  const values = new Set(tabs.value.map((tab) => tab.difficulty))
  return ['Tous', ...values]
})

const tags = computed(() => {
  const values = new Set()
  tabs.value.forEach((tab) => tab.tags.forEach((tag) => values.add(tag)))
  return ['Tous', ...values]
})

const filteredTabs = computed(() => {
  const query = filters.query.trim().toLowerCase()

  return tabs.value.filter((tab) => {
    const matchesQuery =
      !query ||
      tab.title.toLowerCase().includes(query) ||
      tab.artist.toLowerCase().includes(query) ||
      tab.tags.some((tag) => tag.toLowerCase().includes(query))

    const matchesInstrument = filters.instrument === 'Tous' || tab.instrument === filters.instrument
    const matchesDifficulty = filters.difficulty === 'Tous' || tab.difficulty === filters.difficulty
    const matchesTag = filters.tag === 'Tous' || tab.tags.includes(filters.tag)

    return matchesQuery && matchesInstrument && matchesDifficulty && matchesTag
  })
})

const isFiltering = computed(
  () =>
    filters.query.trim().length > 0 ||
    filters.instrument !== 'Tous' ||
    filters.difficulty !== 'Tous' ||
    filters.tag !== 'Tous'
)

const emptyStateMessage = computed(() => {
  if (!tabs.value.length) {
    return 'Aucune tablature disponible. Importe un fichier JSON pour commencer.'
  }

  if (isFiltering.value) {
    return 'Aucune tablature ne correspond a ces filtres.'
  }

  return 'Aucune tablature disponible.'
})

function refreshTabs() {
  loadState.status = 'loading'
  loadState.message = ''

  try {
    tabs.value = getTabs()
    loadState.status = 'ready'
  } catch {
    loadState.status = 'error'
    loadState.message = 'Impossible de charger la bibliotheque locale.'
  }
}

async function handleImport(event) {
  const input = event.target
  const file = input?.files?.[0]

  if (!file) {
    return
  }

  try {
    const text = await file.text()
    const result = importTabsFromJsonText(text)
    refreshTabs()

    if (result.errors.length) {
      importState.status = result.added ? 'warning' : 'error'
      importState.message = result.added
        ? `${result.added} tablature(s) importee(s) avec des avertissements.`
        : 'Import impossible: certaines tablatures sont invalides.'
      importState.errors = result.errors
    } else {
      importState.status = 'success'
      importState.message = `${result.added} tablature(s) importee(s) avec succes.`
      importState.errors = []
    }
  } catch {
    importState.status = 'error'
    importState.message = 'Erreur pendant la lecture du fichier.'
    importState.errors = []
  } finally {
    input.value = ''
  }
}

onMounted(() => {
  refreshTabs()
})
</script>

<template>
  <section class="space-y-6">
    <div class="space-y-2">
      <p class="text-sm uppercase tracking-widest text-base-content/60">Bibliotheque</p>
      <h1 class="text-3xl font-semibold">Tablatures</h1>
      <p class="max-w-2xl text-base-content/70">
        Selection locale pour commencer rapidement. Clique sur une tablature pour ouvrir le lecteur.
      </p>
    </div>

    <div class="card bg-base-200 shadow-sm">
      <div class="card-body space-y-3">
        <div>
          <h2 class="card-title">Importer des tablatures (JSON)</h2>
          <p class="text-sm text-base-content/70">
            Importe un objet ou un tableau d'objets respectant le format JSON du projet.
          </p>
        </div>
        <input
          class="file-input file-input-bordered w-full max-w-lg"
          type="file"
          accept=".json,application/json"
          @change="handleImport"
        />

        <div v-if="importState.status !== 'idle'" class="space-y-2">
          <div
            class="alert"
            :class="{
              'alert-success': importState.status === 'success',
              'alert-warning': importState.status === 'warning',
              'alert-error': importState.status === 'error',
            }"
          >
            <span>{{ importState.message }}</span>
          </div>
          <ul v-if="importState.errors.length" class="list-disc pl-4 text-sm text-base-content/70">
            <li v-for="error in importState.errors" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card bg-base-200 shadow-sm">
      <div class="card-body gap-4">
        <div>
          <h2 class="card-title">Recherche et filtres</h2>
          <p class="text-sm text-base-content/70">
            Filtre par instrument, difficulte ou style pour retrouver rapidement une tablature.
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-4">
          <label class="form-control">
            <span class="label-text text-sm">Recherche</span>
            <input
              v-model="filters.query"
              class="input input-bordered"
              type="search"
              placeholder="Titre, artiste, tag..."
            />
          </label>

          <label class="form-control">
            <span class="label-text text-sm">Instrument</span>
            <select v-model="filters.instrument" class="select select-bordered">
              <option v-for="instrument in instruments" :key="instrument" :value="instrument">
                {{ instrument }}
              </option>
            </select>
          </label>

          <label class="form-control">
            <span class="label-text text-sm">Difficulte</span>
            <select v-model="filters.difficulty" class="select select-bordered">
              <option v-for="difficulty in difficulties" :key="difficulty" :value="difficulty">
                {{ difficulty }}
              </option>
            </select>
          </label>

          <label class="form-control">
            <span class="label-text text-sm">Style</span>
            <select v-model="filters.tag" class="select select-bordered">
              <option v-for="tag in tags" :key="tag" :value="tag">
                {{ tag }}
              </option>
            </select>
          </label>
        </div>
      </div>
    </div>

    <div v-if="loadState.status === 'loading'" class="alert alert-info">
      <span>Chargement de la bibliotheque...</span>
    </div>

    <div v-else-if="loadState.status === 'error'" class="alert alert-error">
      <span>{{ loadState.message }}</span>
    </div>

    <div v-else>
      <div v-if="filteredTabs.length === 0" class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">Aucun resultat</h2>
          <p class="text-sm text-base-content/70">{{ emptyStateMessage }}</p>
        </div>
      </div>

      <div v-else class="grid gap-6 md:grid-cols-2">
        <article v-for="tab in filteredTabs" :key="tab.id" class="card bg-base-200 shadow-sm">
          <div class="card-body">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="card-title">{{ tab.title }}</h2>
                <p class="text-sm text-base-content/70">{{ tab.artist }}</p>
              </div>
              <span class="badge badge-outline">{{ tab.instrument }}</span>
            </div>

            <div class="flex flex-wrap gap-2 text-sm">
              <span class="badge badge-ghost">{{ tab.difficulty }}</span>
              <span v-for="tag in tab.tags" :key="tag" class="badge badge-ghost">{{ tag }}</span>
            </div>

            <div class="text-sm text-base-content/70">
              <p>Tuning : {{ tab.tuning }}</p>
              <p>Capo : {{ tab.capo }}</p>
            </div>

            <div class="card-actions justify-end">
              <RouterLink class="btn btn-primary" :to="{ name: 'reader', params: { id: tab.id } }">
                Lire
              </RouterLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
