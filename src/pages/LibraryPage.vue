<script setup>
import { reactive, ref } from 'vue'
import { getTabs, importTabsFromJsonText } from '../services/tabLibrary'

const tabs = ref(getTabs())
const importState = reactive({
  status: 'idle',
  message: '',
  errors: [],
})

async function handleImport(event) {
  const input = event.target
  const file = input?.files?.[0]

  if (!file) {
    return
  }

  try {
    const text = await file.text()
    const result = importTabsFromJsonText(text)
    tabs.value = getTabs()

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
    importState.message = "Erreur pendant la lecture du fichier."
    importState.errors = []
  } finally {
    input.value = ''
  }
}
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

    <div class="grid gap-6 md:grid-cols-2">
      <article v-for="tab in tabs" :key="tab.id" class="card bg-base-200 shadow-sm">
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
  </section>
</template>
