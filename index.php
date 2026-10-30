<?php

namespace Rllngr\KirbyMemo;

use Kirby\Cms\App as Kirby;
use Kirby\Exception\PermissionException;
use Kirby\Filesystem\F;

/** `rllngr.kirby-memo.access` = true (tous), false (personne) ou une liste de rôles */
function access(): bool
{
    $user   = kirby()->user();
    $option = option('rllngr.kirby-memo.access', true);
    if (!$user || $option === false) return false;
    return $option === true || in_array($user->role()->name(), (array) $option, true);
}

/** `rllngr.kirby-memo.file` : chemin absolu, ou relatif au dossier `site` */
function root(): string
{
    $file = option('rllngr.kirby-memo.file', 'memo.md');
    if (preg_match('#^(/|[a-zA-Z]:[\\\\/])#', $file)) return $file;
    return kirby()->root('site') . '/' . $file;
}

/** Le chemin à montrer : relatif au dossier parent de `site`, sinon tel quel */
function label(string $root): string
{
    $base = dirname(kirby()->root('site')) . '/';
    return str_starts_with($root, $base) ? substr($root, strlen($base)) : $root;
}

/** Le Markdown rendu, un bloc par titre de niveau 2. Le fichier vient du dépôt : son HTML est de confiance. */
function sections(string $text): array
{
    $html = kirby()->markdown($text, ['extra' => true]);
    return array_values(array_filter(array_map('trim', preg_split('/(?=<h2[\s>])/', $html))));
}

Kirby::plugin('rllngr/kirby-memo', [
    'info' => [
        'version' => '1.0.0',
    ],
    'options' => [
        'file'   => 'memo.md',
        'access' => true,
    ],
    'areas' => [
        'memo' => fn () => [
            'label' => t('memo.title'),
            'icon'  => 'book',
            'menu'  => access(),
            'link'  => 'memo',
            'views' => [
                [
                    'pattern' => 'memo',
                    'action'  => function () {
                        if (!access()) {
                            throw new PermissionException(t('memo.forbidden'));
                        }
                        $root = root();
                        $text = is_file($root) && is_readable($root) ? F::read($root) : null;
                        return [
                            'component' => 'k-memo-view',
                            'title'     => t('memo.title'),
                            'props'     => [
                                'file'     => label($root),
                                'exists'   => $text !== null,
                                'sections' => $text ? sections($text) : [],
                            ],
                        ];
                    },
                ],
            ],
        ],
    ],
    'translations' => [
        'fr' => require __DIR__ . '/translations/fr.php',
        'en' => require __DIR__ . '/translations/en.php',
    ],
]);
