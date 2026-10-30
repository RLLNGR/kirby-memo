// Vue Mémo du Panel — Markdown rendu en PHP (index.php), passé en props par la zone `memo`.
// Habillage de la vue Audience de Moniter : crème, barres d'encre en minuscules, blocs blancs.
// Source de index.js : après toute modification, npm run build (voir scripts/build-panel.mjs).

panel.plugin('rllngr/kirby-memo', {
  components: {
    'k-memo-view': {
      props: {
        file: String,
        exists: Boolean,
        sections: Array,
      },
      template: `
        <k-panel-inside class="k-memo-view">
          <div class="k-memo">
            <header class="k-memo-ink k-memo-header">
              <h1>{{ $t('memo.title') }}</h1>
              <code>{{ file }}</code>
            </header>
            <template v-if="sections.length">
              <section v-for="(html, i) in sections" :key="i" class="k-memo-block k-memo-text" v-html="html"></section>
            </template>
            <p v-else class="k-memo-block k-memo-message">
              {{ $t(exists ? 'memo.empty' : 'memo.missing', { file }) }}
            </p>
          </div>
        </k-panel-inside>
      `,
    },
  },
})
