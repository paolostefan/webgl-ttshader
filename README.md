# WebGL (2) shader

Collezione di esperimenti basilari di shader scritti per WebGL2.

Ogni esperimento estende la classe [glCapsule](src/glCapsule.ts), che contiene i metodi per inizializzare _Vertex_ e _Fragment shader_ e altri metodi di uso frequente.

Gli shader veri e propri (dentro [src/shaders](src/shaders)) sono compatibili con **OpenGL ES** versione 3.0+.

## Installazione

Dalla directory principale del repo, date il comando:

```sh
npm i
```

## Come utilizzare un esperimento

1. In [index.ts](src/index.ts) impostate la variabile `renderer` ad una istanza della classe derivata da **glCapsule**, ad es.: `renderer = new raymarcher();`
2. Dalla directory principale del repo, eseguite lo script `npm run start` oppure `npm run build` per generare i relativi file in [dist](dist/) .

## Perché questo nome (webgl-ttshader)?

Inizialmente doveva essere un "two triangles shader". Alcuni renderer (come Mandelbrot e Raytracer) lo sono, altri invece sono programmi OpenGL a tutti gli effetti.

## License

No license available. All rights reserved.
