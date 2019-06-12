jQuery(document).ready(function($) {
    
    // la fonction getAllStations est lancée au chargement
    getAllStations();
    
   /* 
   	*	La fonction getStationsDatas() est lancée au click de l'utilisateur sur un élément <li>
    *	de la liste parente <ul> grâce à event.target 
    */      
    document.querySelector('ul').addEventListener('click', getStationDatas);
});