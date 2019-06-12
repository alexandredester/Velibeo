// Fonctionnement de l'API JC DECAUX(https://developer.jcdecaux.com/#/opendata/vls?page=dynamic)
 
// Récupérer la liste des stations d'un conntrat (velib = paris)
// https://api.jcdecaux.com/vls/v1/stations?contract={contract_name} (contract_name peut valoir 'paris', 'nantes', etc ... 

// récupérer les infos d'une stations
//https://api.jcdecaux.com/vls/v1/stations/{station_number}?contract={contract_name}




const CLE_API = 'b75fc87074e67e03300cee9a3b482294b4a717f0'; 
// Pour lancer des appels URL à l'API, vous devez obtenir une clé API en vous inscrivant sur https://developer.jcdecaux.com

/*
* Nous créons une fonction getAllStations(). 
* Lancée au démarrage, elle est chargée de récupérer les datas via une requête Ajax 
* et de les afficher dans index.html
*/
function getAllStations() {

   $.ajax({
       url : 'https://api.jcdecaux.com/vls/v1/stations/',
       type : 'GET',
       dataType : 'json',
       data : {contract : 'paris', apiKey : CLE_API}
       })
      .done(function(reponse, statut){
        console.log(statut);
        console.log(reponse);
       // Le console.log nous indique que la réponse comme un tableau d'objets dans lequel chaque objet est une station qui comporte plusieurs données comme suit :
       //[  
       //{
       //"number": ​31705,     
       //"name": "31705 - CHAMPEAUX (BAGNOLET)",     
       //"address": "RUE DES CHAMPEAUX (PRES DE LA GARE ROUTIERE) - 93170 BAGNOLET",     
       //"position":       
       //   {         
       //       "lat": ​48.8645278209514,        
       //       "lng": ​2.416170724425901     
       //   },     
       // "banking": true,     
       // "bonus": true,     
       // "status": "OPEN",     
       // "contract_name": "Paris",     
       // "bike_stands": ​50,     
       // "available_bike_stands": ​49,     
       // "available_bikes": ​1,     
       // "last_update": ​1457640392000  
       // },
       //        ....
       // ]
         
          // Dans une boucle for, nous allons créer des <li> avec createElement() et les injecter avec appendChild()
          // pour des raisons de performance, dans des itérations  nous préfererons cette méthode à un innerHTML.
          for(var i=0; i<reponse.length; i++) {
              
            // On sélectionne le conteneur HTML qui recevra les data (ici le ul présent sur le index.html)
            var container = document.querySelector('ul.nav-primary__items');
            // container.innerHTML+='<li>'+reponse[i]['address']+'</li>';
            
            // Puis On crée en JS un premier élement HTML : la balise <li> avec la méthode .createElement()
            var liOuter = document.createElement('li');
            // On peut donner une class ou n'importe quel autre attribut à notre élément <li> avec setAttribute()
            liOuter.setAttribute('class', 'nav-primary__items');

            // On donne un attribut data-station à notre <li>, qui contient le numéro de la station en valeur
            liOuter.setAttribute('data-station', reponse[i]['number']);
            // On donne également à la blaise <li> un attribut title qui montre les datas vélos dispo, et places dispo
            liOuter.setAttribute('title', reponse[i]['available_bikes']+' vélos disponibles | '+ reponse[i]['available_bike_stands']+' places disponibles');
            // On crée un noeud texte qui contiendra l'adresse
            var title = document.createTextNode(reponse[i]['address']);
            
            // On utilise append Child pour faire apparaître le texte dans le li
            liOuter.appendChild(title);
           
            // et enfin on utilise appendChild pour faire apparaitre en javascript nos li>a>text dans notre conteneur <ul> qui existe sur la page index.html
            container.appendChild(liOuter);
          };
       })
       .fail(function(resultat, statut){
          // On peut traiter ici l'erreur si elle se produit lors de l'appel AJAX
          // en récupérerant les datas du retour jXHR
          console.log(resultat);
          console.log(statut);
       });


       
    } // Fin fonction getAllStations()




/*
*  Nous créons une autre fonction chargée de récupérer les données liées à une station.
*  Elle est déclenché au clic de l'utilisateur sur un élément <li> de la liste des stations
*/
function getStationDatas(event) {
    
     event.preventDefault;
     
     // Pour cibler l'élément au clic, nous utilisons la délgation d'évènement avec event.target
     // (voir http://javascript.developpez.com/actu/85848/Comprendre-la-delegation-d-evenement-en-JavaScript/)
     var initElem = event.target; 
     // Puis nous récupérons au clic la valeur de l'attribut data-station de l'élémént <li> avec dataset
     var idStation = initElem.dataset.station;
     console.log(idStation); 

     // On lance la requête Ajax (ici avec l'ancienne méthode de jQuery)
     // Pour récupérer uniquement les datas d'une station au clic de l'utilisateur
     $.ajax({
       url : 'https://api.jcdecaux.com/vls/v1/stations/'+idStation,
       type : 'GET',
       dataType : 'json',
       data : {contract : 'paris', apiKey : CLE_API},
       
       success : function(reponse, statut){
       console.log(reponse);
       
       $('h1').html(reponse['name']);
       $('p.velibDispo strong').html('Il reste '+reponse['available_bikes']+ ' Vélibs disponibles à cette station.');
       $('.address').html(reponse['address']); 
       $('.bikeStands').html(reponse['available_bike_stands']+' parkings disponibles.');
       $('.localisation').html(reponse['position']['lat']+' ; '+ reponse['position']['lng']);
   
       $('.infosVelib').fadeIn('slow'); 
       },

       error : function(resultat, statut, erreur){
          // On peut traiter ici l'erreur si elle se produit lors de l'appel AJAX
          console.log(resultat);
          console.log(statut);
          console.log(erreur);
       },


    }); 
    
} // Fin Fonction getStationDatas()