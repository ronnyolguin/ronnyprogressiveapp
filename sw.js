/* importScripts('js/sw-utils.js') */

  const STATIC_CACHE    = 'static-v1';
/* const DYNAMIC_CACHE   = 'dynamic-v1'; */
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    '/',
    'index.html',
    'estilos.css',
    'js/filtro.js',
    'js/main.js',
    /* 'js/sw-utils.js', */
    'img/favicon.ico',
    'img/dise1.jpeg',
    'img/dise2.jpeg',
    'img/dise3.jpeg',
    'img/efectos.png',
    'img/fondo.jpg',
    'img/heart.png',
    'img/logo-ronny.png',
    'img/marketing1.jpeg',
    'img/marketing2.jpeg',
    'img/marketing3.jpeg',
    'img/people1.jpg',
    'img/people2.jpg',
    'img/people3.jpg',
    'img/programacion1.jpeg',
    'img/programacion2.jpeg',
    'img/programacion3.jpeg',
    'img/responsive.png',
    'img/teclado.jpg',
    

    
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'js/jquery.js'
];

self.addEventListener('install', e => {


    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ));

    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache => 
        cache.addAll( APP_SHELL_INMUTABLE ));



    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ])  );

});


 /* self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );

}); */

self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );


});


self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
      caches.match(e.request)
        .then(res => {
          if (res) {
            //recuperar del cache
            return res
          }
          //recuperar de la petición a la url
          return fetch(e.request)
        })
    )
  })


/* self.addEventListener( 'fetch', e => {
    const respuesta= caches.match(e.request ).then( res => {
        if ( res) {
            return res;   
        } else {

            return fetch( e.request ).then( newRes => {
                return actualizaCacheDinamico ( DYNAMIC_CACHE, e.request, newRes );
            });
        }
    });

    e.responseWith( respuesta );
}); */