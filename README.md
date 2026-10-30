# Kirby Memo

Une page d'aide-mémoire dans le Panel de Kirby 5. Elle affiche en lecture seule un fichier Markdown du site, versionné dans git : les commandes, les paramètres d'URL, les astuces faciles à oublier. Ces notes ne sont pas du contenu, elles n'ont rien à faire dans un champ.

Le plugin fonctionne sur un site classique comme sur un backend headless, et avec `panel.vue.compiler = false` : `index.js` est précompilé.

## Installation

```bash
composer require rllngr/kirby-memo
```

Ou copiez le dossier dans `site/plugins/kirby-memo`.

## Utilisation

Écrivez vos notes dans `site/memo.md`. Chaque titre de niveau 2 ouvre un nouveau bloc. Les tableaux et le reste de Markdown Extra sont pris en charge.

Puis placez le mémo dans le menu, juste au-dessus de « Modifications » :

```php
// site/config/config.php
return [
    'panel' => [
        'menu' => [
            'site',
            'users',
            'system',
            // … vos autres zones
            '-',
            'memo',
        ],
    ],
];
```

Kirby fixe le groupe du bas (Modifications, Votre compte, Déconnexion) et ne permet pas d'y ajouter une entrée. Le séparateur `'-'` fait donc du mémo un groupe à part, avant-dernier, et le CSS du plugin le colle au groupe du bas.

Sans `panel.menu`, le mémo apparaît à la suite des autres zones, en haut du menu. La page reste accessible à `/panel/memo`.

## Options

```php
'rllngr.kirby-memo' => [
    // Chemin absolu, ou relatif au dossier site
    'file'   => 'memo.md',
    // true (tous), false (personne) ou une liste de rôles
    'access' => ['admin'],
],
```

Le fichier s'affiche tel quel, sans filtrage du HTML : n'y mettez que ce que vous committeriez dans le code du site.

## Développement

`src/panel.js` est la source de `index.js`. Après toute modification :

```bash
npm install
npm run build
```

Committez `index.js`, que Kirby charge tel quel.

## Licence

MIT
