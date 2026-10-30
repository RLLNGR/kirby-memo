// GÉNÉRÉ par scripts/build-panel.mjs depuis src/panel.js — ne pas modifier ici, puis : npm run build
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
      ...(() => {
var render = function render(){var _vm=this,_c=_vm._self._c;return _c('k-panel-inside',{staticClass:"k-memo-view"},[_c('div',{staticClass:"k-memo"},[_c('header',{staticClass:"k-memo-ink k-memo-header"},[_c('h1',[_vm._v(_vm._s(_vm.$t('memo.title')))]),_c('code',[_vm._v(_vm._s(_vm.file))])]),(_vm.sections.length)?_vm._l((_vm.sections),function(html,i){return _c('section',{key:i,staticClass:"k-memo-block k-memo-text",domProps:{"innerHTML":_vm._s(html)}})}):_c('p',{staticClass:"k-memo-block k-memo-message"},[_vm._v(" "+_vm._s(_vm.$t(_vm.exists ? 'memo.empty' : 'memo.missing', { file: _vm.file }))+" ")])],2)])
}
var staticRenderFns = []
return { render, staticRenderFns }
})(),
    },
  },
})
