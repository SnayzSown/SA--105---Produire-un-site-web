document.addEventListener("DOMContentLoaded", function() {

    // --- PARTIE 1 : GESTION DE LA LISTE (page sae.html) ---
    const grille = document.getElementById("grille-sae");

    // On vérifie qu'on est bien sur la page liste
    if (grille) {
        // Boucle pour créer chaque carte SAE
        for (let code in SAE) {
            let saeActuelle = SAE[code];
            let lien = document.createElement("a");
            
            // Création du lien vers la page détail
            lien.href = "detail.html?code=" + code;
            lien.className = "sae-card";

            // Remplissage du contenu de la carte
            lien.innerHTML = "<h3>" + code + "</h3>" +
                             "<p>" + saeActuelle.titre + "</p>" +
                             "<span class='fleche'>VOIR ></span>";

            grille.appendChild(lien);
        }
    }

    // --- PARTIE 2 : GESTION DU DÉTAIL (page detail.html) ---
    const titrePage = document.getElementById("titre-sae");
    const contenuPage = document.getElementById("contenu-detail");

    // On vérifie qu'on est bien sur la page détail
    if (titrePage && contenuPage) {
        
        // On récupère le code de la SAE dans l'URL (ex: ?code=SAE1.01)
        let param = new URLSearchParams(window.location.search);
        let codeRecupere = param.get('code');

        // Si le code existe dans notre fichier de données
        if (SAE[codeRecupere]) {
            let donnees = SAE[codeRecupere];

            // 1. Mise à jour du Titre
            titrePage.innerText = codeRecupere + " - " + donnees.titre;

            // 2. Préparation de la Description
            let htmlDescription = "<h3>Description</h3>" + 
                                  "<p>" + donnees.description + "</p>";

            // 3. Préparation des Compétences
            let htmlCompetences = "<h3>Compétences</h3>" + 
                                  "<p>" + donnees.compétences.join(", ") + "</p>";

            // 4. Préparation des Apprentissages Critiques (Boucle)
            let htmlAC = "<h3>Apprentissages Critiques</h3><ul>";
            for (let acCode in donnees.AC) {
                htmlAC += "<li><strong>" + acCode + " :</strong> " + donnees.AC[acCode] + "</li>";
            }
            htmlAC += "</ul>";

            // 5. Préparation des Ressources (Boucle)
            let htmlRessources = "<h3>Ressources</h3><ul>";
            for (let resCode in donnees.ressources) {
                htmlRessources += "<li><strong>" + resCode + " :</strong> " + donnees.ressources[resCode] + "</li>";
            }
            htmlRessources += "</ul>";

            // 6. NOUVEAU : Gestion du bouton PDF
            let htmlPDF = ""; // On commence avec une chaine vide
            
            // On vérifie si le champ "pdf" existe et n'est pas vide
            if (donnees.pdf && donnees.pdf !== "") {
                // target="_blank" permet d'ouvrir le PDF dans un nouvel onglet
                htmlPDF = "<div style='margin-top: 30px; text-align: center;'>" +
                          "<a href='" + donnees.pdf + "' target='_blank' class='btn-pdf'>📄 Voir le rapport PDF</a>" +
                           "</div>";
            }

            // 7. Injection de tout le contenu dans la page
            contenuPage.innerHTML = htmlDescription + htmlCompetences + htmlAC + htmlRessources + htmlPDF;

        } else {
            // Si le code dans l'URL n'est pas bon
            contenuPage.innerHTML = "<p>Erreur : Projet introuvable.</p>";
        }
    }
});