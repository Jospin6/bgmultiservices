export const parseISODate = (isoDate: string) => {  
    const date = new Date(isoDate); // Convertit la date ISO en un objet Date  

    // Récupérer le jour, le mois et l'année  
    const day = String(date.getUTCDate()).padStart(2, '0'); // Ajoute un zéro devant si nécessaire  
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Les mois commencent à 0, donc on ajoute 1  
    const year = date.getUTCFullYear(); // Récupère l'année  

    // Retourne la date au format souhaité  
    return `${day} ${month} ${year}`;  
}; 