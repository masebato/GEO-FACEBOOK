//#region CONSTANTES DE CONFIGURACIÒN 

var http = require('http');
var hostname = '127.0.0.1';
var port = 3000;
var FB = require('fb');

var server = http.createServer(function (req, res) {
    res.statusCode = 200;

    res.setHeader('Content-Type', 'Text/plain');
    res.end('hola mundo/n');

});


//#endregion
//FB.options({: 'v2.11'});

var token = 'EAACEdEose0cBAGmvvvshS7GcMe816US2agsd2p82VxwZAXHiERh8ZAzbUTKkvD6gYUMtZCZAfg8STQqZBcfKAYVSsivF5P1lyY5ZAOpZB60CLDauzIfLZCWUk8JhbZClHTTbZBET6yKXOdxAoVWYnvoxW5hwzFsgNMp1YxdMlBhMh0TVTKUOJnD21ncy09KmxyZBAAy6WxA0O6CtZBu8DeO8TuqK';


function SearchPerson(id) {
    FB.api(id, {
        fields: [],
        access_token: token
    }, function (res) {

        console.log(res);
    });

}

function SearchIdPost(iduser, idpost) {

    FB.api(iduser + '_' + idpost + '/comments', {
        fields: [],
        access_token: token
    }, res => {
        res.data.map(rs => {
            FB.api(rs.from.id + "", {
                fields: ['location'],
                access_token: token
            }, res3 => {

                FB.api(res3.location.id, {
                    fields: [],
                    access_token: token
                }, res4 => {
                    console.log(res4);
                });
            });
        });


    });


}



SearchIdPost('10207581007947552', '10214909673039599');


server.listen(port, hostname, function () {
    console.log('ready 8000');
    //  console.log('Server running at http://${hostname}:${port}/');
});