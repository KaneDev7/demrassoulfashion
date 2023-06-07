
export function getUniqueProductArr(array, key) {
    const map = new Map();

    for (const item of array) {
      const value = item[key].toLowerCase();
      if (map.has(value)) {
        const existingItem = map.get(value);
        Object.assign(existingItem, item);
      } else {
        map.set(value, item);
      }
    }
    return Array.from(map.values());
  }
  

 // conversion rgb en exadecimal 
 export function rgbToHex(r,g,b){
    let hexR = r.toString(16).padStart(2, "0");
    let hexG = g.toString(16).padStart(2, "0");
    let hexB = b.toString(16).padStart(2, "0");
    return "#" + hexR + hexG + hexB;
}

// Fonction pour tronquer les textes trop long
export function reduceTextLength(text, maxLength){
  if(text.length >= maxLength){
    return Array.from(text).slice(0,maxLength).join('') + '....'
  }
  return text 
}


// Fonction pour mettre en majuscule le premier lettre d'une phrase ou d'un mot
export function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Fonction pour convertir la date en format anglais
function convertirFormatDate(date) {
  const [jour, mois, annee] = date.split('/');
  return `${annee}-${mois}-${jour}`;
}

// Fonction pour calculer la difference de jour entre deux dates  
export function calculerDifferenceEnJours(date1, date2) {
  const dateISO1 = convertirFormatDate(date1);
  const dateISO2 = convertirFormatDate(date2);

  const dateObj1 = new Date(dateISO1);
  const dateObj2 = new Date(dateISO2);

  const differenceEnMillisecondes = Math.abs(dateObj2 - dateObj1);
  const differenceEnJours = Math.ceil(differenceEnMillisecondes / (1000 * 60 * 60 * 24));

  return differenceEnJours;

}

// Fonction pour vérifier la validité d'une email
export const isValidEmail = (email) => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
  };