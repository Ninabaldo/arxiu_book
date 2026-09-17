# Contingut del llibre (edició)

## Què editar

Obre i edita:

**[`ca.md`](./ca.md)** — tot el text en català en un sol document.

Format de cada capítol:

```md
**1. No perquè et necessiti**

Primer paràgraf…

Segon paràgraf…
```

Desa el fitxer. Si tens `npm run dev` en marxa, el llibre s’actualitza sol
(sincronitza capítols + regenera el seed). Recarrega el navegador si no ho veus.

## Comandes

| Comanda | Què fa |
|---|---|
| `npm run dev` | Arrenca la web + vigila `ca.md` |
| `npm run content:sync` | Sincronitza ara mateix sense esperar |

## Altres idiomes

Els cossos en ES / EN / FR continuen a:

`src/content/chapters/01.es.txt`, `01.en.txt`, `01.fr.txt`, …

(Els títols CA del manuscript actualitzen `meta.json` → títol català de l’índex.)
