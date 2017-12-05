// #region CONSTANTES DE CONFIGURACIÒN 

var http = require('http')
var hostname = '127.0.0.1'
var port = 3000
var FB = require('fb')
var datosJson;
var express = require('express')
var app = express()

var bodyParser = require('body-parser');
var server = http.createServer(function (req, res) {
  res.statusCode = 200

  res.setHeader('Content-Type', 'Text/plain')
  res.end('hola mundo/n')
})


// #endregion
// FB.options({: 'v2.11'})

var token = 'EAACEdEose0cBAPXTjlRDabP6Ni5uQ4bMcZBKrVUW4Wl5tQl9PXsQ541fhSdAwTreyNqMsWRDTCic4kZCH0ymAxUFcVQkQ9ZBR2vGwE4db6uqhkchTnCGhfNTZBhc0MIyQn90OXxPmmkPAZC7RZBvKnOZAPWsVfk0iCGDcDWK9GDTStVSo3tMtbPCZC5AgZBFCIc0ZD'

function SearchIdPost(iduser, idpost) {
  FB.api(iduser + '_' + idpost + '/comments', {
    fields: [],
    access_token: token
  }, res => {
    res.data.map(rs => {
      FB.api(rs.from.id + '', {
        fields: ['location'],
        access_token: token
      }, res3 => {
        FB.api(res3.location.id, {
          fields: [],
          access_token: token
        }, res4 => {
          FB.api(res4.id, {
            fields: ['location'],
            access_token: token

          }, dataLocation => {
            var datos = {

              lat: dataLocation.location.latitude,
              lng: dataLocation.location.longitude
            }
            datosJson = datos;
            JSON.stringify(datos);

            // console.log(dataLocation);                                
          })
        })
      })
    })
  })
}
/**
 * 
 * geojson podemos encontrar el mapa y como armar el json
 * http://geojson.io/#map=9/4.3464/-74.4241
 * 
 * 
 * esta es la api de google, la key
 * API GOOGLE MAPS KEY = AIzaSyBqnJwmcKRZJzMmjss5b8AW6NCHi-66Lkw 
 * 
 * 
 */


SearchIdPost('10207581007947552', '10214909673039599')

app.get('/', function (request, res) {
  res.sendFile(__dirname + '/index.html');
})


app.get('/datos', function (request, res) {
  res.json(datosJson);
})

app.listen(3000, function () {
  console.log('El servidor Esta En llamas!')
})