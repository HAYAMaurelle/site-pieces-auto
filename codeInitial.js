//Recuperation des pieces depuis le fichier json
const reponse = await fetch('pieces-autos.json');
const pieces= await reponse.json();

//creation des balises
for (let i = 0; i < pieces.length; i++){
    const article = pieces[i];
    //recuperation de l'element du DOM qui accueilleras les fiches
    const sectionFiches = document.querySelector(".fiches");

    //creation d'une balise dédié à une pieces automobile
    const pieceElement = document.createElement("article");

    //creation des balises
    const imageElement = document.createElement("img");
    imageElement.src=article.image;

    const nomElement = document.createElement("h2");
    nomElement.innerText=article.nom;

    const prixElement = document.createElement("p");
    prixElement.innerText=`prix : ${article.prix} €(${article.prix < 35 ? "€" : "€€€"})`;

    const categorieElement = document.createElement("p");
    categorieElement.innerText=article.categorie ??"aucune categorie";

    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";

    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponibilite? "En stock" : "Rupture de stock";

    sectionFiches.appendChild(pieceElement);

    pieceElement.appendChild(imageElement);

    pieceElement.appendChild(nomElement);

    pieceElement.appendChild(prixElement);

    pieceElement.appendChild(categorieElement);

    pieceElement.appendChild(descriptionElement);

    pieceElement.appendChild(stockElement);
}
//gestion des boutons
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click",function(){
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a,b){
        return a.prix - b.prix;
        
    });
    console.log(piecesOrdonnees);
});
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click",function(){
    const piecesFiltrees = pieces.filter(function (piece){
        return piece.prix <= 35;

    });
    console.log(piecesFiltrees);
});

const noms = pieces.map(piece => piece.nom);
for (let i = pieces.length -1; i >= 0; i--){
    if(pieces[i].prix > 35){
        //supprimer le nom
        noms.splice(i,1);
    }
}

//creation de la liste
const abordablesElements = document.createElement('ul');
//ajout de chaque nom à la liste
for(let i = 0;i< noms.length; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
    
}
//ajout de l'en tete puis de la liste au bloc resultats filtres
document.querySelector('.abordables')
.appendChild(abordablesElements);

//code exerice
const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);

for(let i = pieces.length -1; i>=0; i--){
    if(pieces[i].disponibilite===false){
        //supprimmer un element à partir de l'indice i
        nomsDisponibles.splice(i,1);
        prixDisponibles.splice(i,1);
        
    }
}

//creation de la liste
const disponibleElements = document.createElement('ul');
//ajout de chaque nom à la liste
for(let i = 0;i< nomsDisponibles.length; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]}-${prixDisponibles[i]} €`;
    abordablesElements.appendChild(nomElement);
    disponibleElements.appendChild(nomElement);
    
}
document.querySelector('.disponibles').appendChild(disponibleElements);
