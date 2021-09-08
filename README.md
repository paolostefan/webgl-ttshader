# WebGL (2) shader

Collezione di esperimenti basilari di shader scritti per WebGL2.

Ogni esperimento estende la classe [glCapsule](src/glCapsule.ts), che contiene i metodi per inizializzare _Vertex_ e _Fragment shader_ e altri metodi di uso frequente.

## Installazione

Dalla directory principale del repo, date il comando:

```sh
npm i
```

## Come utilizzare un esperimento

1. In [index.ts](src/index.ts) impostate la variabile `renderer` ad una istanza della classe derivata da **glCapsule**, ad es.: `renderer = new raymarcher();`
2. Dalla directory principale del repo, eseguite lo script `npm run start` oppure `npm run build` per generare i relativi file in [dist](dist/) .

## License

No license available. All rights reserved.
