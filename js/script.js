// On attend que la page soit totalement chargée avant de lancer le script
document.addEventListener("DOMContentLoaded", function() {

    // --- PARTIE 1 : GESTION DE LA LISTE (page sae.html) ---
    
    // On cherche l'élément HTML qui a l'id "grille-sae"
    const grille = document.getElementById("grille-sae");

    // Si cet élément existe, c'est qu'on est sur la page sae.html
    if (grille) {
        
        // On utilise une boucle "for...in" pour parcourir ton fichier data.js
        // "code" vaudra "SAE1.01", puis "SAE1.02", etc.
        for (let code in SAE) {
            
            // On récupère les infos de la SAE correspondante (titre, description...)
            let saeActuelle = SAE[code];

            // On crée un lien <a> (qui servira de bouton)
            let lien = document.createElement("a");
            
            // --- PASSAGE DE PARAMÈTRE DANS L'URL ---
            // C'est ici qu'on applique la méthode de ton prof.
            // On crée un lien vers detail.html en ajoutant "?code=SAE1.01" à la fin
            lien.href = "detail.html?code=" + code;
            
            // On ajoute la classe CSS "carte" pour le style
            lien.className = "sae-card";

            // On remplit l'intérieur du lien avec du HTML (Code + Titre + Flèche)
            lien.innerHTML = "<h3>" + code + "</h3>" +
                             "<p>" + saeActuelle.titre + "</p>" +
                             "<span class='fleche'>VOIR ></span>";

            // Enfin, on ajoute ce nouveau lien dans la grille
            grille.appendChild(lien);
        }
    }

    // --- PARTIE 2 : GESTION DU DÉTAIL (page detail.html) ---

    // On cherche l'élément où on doit écrire le titre
    const titrePage = document.getElementById("titre-sae");
    // On cherche l'élément où on doit écrire le contenu
    const contenuPage = document.getElementById("contenu-detail");

    // Si ces éléments existent, c'est qu'on est sur la page detail.html
    if (titrePage && contenuPage) {

        // --- RÉCUPÉRATION DU PARAMÈTRE URL ---
        // On utilise l'outil URLSearchParams sur l'URL actuelle (location.search)
        // Exactement comme dans l'exemple "lecture_param.html"
        let param = new URLSearchParams(window.location.search);
        
        // On récupère la valeur associée au mot "code" (ex: "SAE1.01")
        let codeRecupere = param.get('code');

        // On vérifie si le code existe bien dans notre fichier data.js
        if (SAE[codeRecupere]) {
            
            // On récupère les données de cette SAE spécifique
            let donnees = SAE[codeRecupere];

            // 1. On met à jour le titre de la page (H1)
            titrePage.innerText = codeRecupere + " - " + donnees.titre;

            // 2. On prépare le HTML pour la description
            let htmlDescription = "<h3>Description</h3>" + 
                                  "<p>" + donnees.description + "</p>";

            // 3. On prépare le HTML pour les compétences
            // .join(', ') permet de transformer la liste ["A", "B"] en texte "A, B"
            let htmlCompetences = "<h3>Compétences</h3>" + 
                                  "<p>" + donnees.compétences.join(", ") + "</p>";

            // 4. On prépare le HTML pour les Apprentissages Critiques (AC)
            // Comme les AC sont une liste d'objets, on doit faire une boucle
            let htmlAC = "<h3>Apprentissages Critiques</h3><ul>";
            
            for (let acCode in donnees.AC) {
                // acCode = "AC11.01", donnees.AC[acCode] = "Présenter une organisation..."
                htmlAC += "<li><strong>" + acCode + " :</strong> " + donnees.AC[acCode] + "</li>";
            }
            htmlAC += "</ul>"; // On ferme la liste

            // 5. On injecte tout ce HTML dans la page
            contenuPage.innerHTML = htmlDescription + htmlCompetences + htmlAC;

        } else {
            // Si le code n'est pas trouvé (ex: url modifiée manuellement)
            contenuPage.innerHTML = "<p>Erreur : Projet introuvable.</p>";
        }
    }
});