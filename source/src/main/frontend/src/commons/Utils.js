//Convertir date to string
//d recu au format yyyy-MM-dd convertir en objet date puis reconvertir en string forma dd/MM/yyy
export const dateToString=(d)=>{
    return d ? new Date(d).toLocaleDateString():''
  }


//Convertir "dd/mm/yyyy" to "yyyy-mm-dd"
export const dateToStringSql=(d)=>{
  const s=dateToString(d)
  //console.log('datesql',s ? s.split("/").reverse().join("-") : '')
  return s ? s.split("/").reverse().join("-") : ''
}

//Convertir string date to date
//datePicker attend un objet de type date
export const stringToDate=(s)=>{
        return s ? new Date(s) : null
}
//Chercher dans odhNatures le nom correspondant à id
export const libelleOf=(natures,id)=>{
  const resultat=natures.find(e  => e.odntId==id);
  return resultat?resultat.odntNom:"";
}
//Convertir boolean en "OUI" ou "NON"
export const boolToString=(bol)=>{
  return bol=="true" ? "OUI" : "NON"
}