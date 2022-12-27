class Requetes {
    /*Liste utilisée pour la balise select */
    static listeRues= `select distinct new map( odrueId as id, concat(odrueType,' ',odrueLiaison,' ',odrueNom) as nomrue) 
                                                from OdhRues order by odrueNom`;
    static listeSyndics= `select distinct new map(odsynId as id, odsynCode as code,
                                                odsynRaison as raisonSocial,
                                                concat(odsynRpren,' ',odsynRnom) as nom) 
                                                from OdhSyndics order by odsynRnom,odsynRpren`;

    static listeProprietaires= `select distinct new map(odproId as id, 
                                                concat(odproPren,' ',odproNom) as nom) 
                                                from OdhProprietaires order by odproNom,odproPren`;

    static listeLocatiares= `select distinct new map(odlocId as id,
                                                concat(odlocPren,' ',odlocNom) as nom) 
                                                from OdhLocataires order by odlocNom,odlocPren`;



    static listeNatures=`from OdhNatures`;

    static listeActivites=`from OdhNatures where odntType='A' and odntNom not like '...%' order by  odntNom`;
    static listeEtatGenerals=`from OdhNatures where odntType='E' and odntNom not like '...%'  order by  odntNom`;
    static listeQuartiers=`from OdhNatures where odntType='Q' and odntNom not like '...%'  order by  odntNom`;
    static listeUsages=`from OdhNatures where odntType='G' and odntNom not like '...%'  order by  odntNom`;
    static listeTypeProprietes=`from OdhNatures where odntType='T' and odntNom not like '...%'  order by  odntNom`;
    static listeBienLoues=`from OdhNatures where odntType='B' and odntNom not like '...%'  order by  odntNom`;
    static listeTypeTraitSanitaires=`from OdhNatures where odntType='D' and odntNom not like '...%'  order by  odntNom`;
    static listeDeclarantSanitaires=`from OdhNatures where odntType='G' and odntNom not like '...%'  order by  odntNom`;
    static listeTypeRelogements=`from OdhNatures where odntType='H' and odntNom not like '...%'  order by  odntNom`;
    static listeTypeEntreprises=`from OdhNatures where odntType='S' and odntNom not like '...%'  order by  odntNom`;
    static listeTypeInterventions=`from OdhNatures where odntType='V' and odntNom not like '...%' order by  odntNom`;
    static listeTypeProcedures=`from OdhNatures where odntType='P' and odntNom not like '...%'  order by  odntNom`;
    static listeTypeTraitements=`from OdhNatures where odntType='R' and odntNom not like '...%'  order by  odntNom`;
    static listeDeclarants=`from OdhNatures where odntType='D' and odntNom not like '...%'  order by  odntNom`;
    static listeTypePossessions=`from OdhNatures where odntType='U' and odntNom not like '...%'  order by  odntNom`;
    static listeTypeLot=`from OdhNatures where odntType='L' and odntNom not like '...%'  order by  odntNom`; /* f1,f2,f4...*/
    static listeTypeOptions=`select distinct odntType from OdhNatures order by  odntType`

    static proprietaires=`from OdhProprietaires`;
    static locataires=`from OdhLocataires`;
    static experts=`from OdhExperts`;
    static suiveurs=`from OdhSuiveurs`;
    static syndics=`from OdhSyndics`;
    static relogements=`select new map(rl as relogement,n.odntNom as type) from OdhRelogements rl
                        left join OdhNatures n on rl.odreType=n.odntId`;
    static rues=`from OdhRues`;
    static entreprises=`from OdhEntreprises`;
    static utilisateurs=`from OdhUtilisateurs`;

//Utilisateurs
    static utilisateurById(id) {
        return `from OdhUtilisateurs where odutiId=${id}`
    }
//Proprietaire
    static proprietiareById(id) {
        return `from OdhProprietaires where odproId=${id}`
    }
    static nbLotProprietaire(id){
        return `select count(*) from OdhLots where odlotProprietaire=${id}`
    }
//Locataires
    static locataireById(id) {
        return `from OdhLocataires where odlocId=${id}`
    }
    static nbLotLocataire(id){
        return `select count(*) from OdhLots where odlotLocataire=${id}`
    }
//Rues
    static rueById(id) {
        return `from OdhRues where odrueId=${id}`
    }
//Experts
static expertById(id) {
    return `from OdhExperts where odexpId=${id}`
}
//Suiveurs
static suiveurById(id) {
    return `from OdhSuiveurs where odsuId=${id}`
}
//Syndics
static syndicById(id) {
    return `from OdhSyndics where odsynId=${id}`
}
//Entreprises
static entrepriseById(id) {
    return `from OdhEntreprises where odenId=${id}`
}
//Relogements
static relogementById(id) {
    return `from OdhRelogements where odreId=${id}`
}
//Options
static optionById(id) {
    return `from OdhNatures where odntId=${id}`
}
static optionByType(type) {
    return `from OdhNatures where odntType='${type}'`
}



//Immeuble
    static listeImmeubles=`select new map(o.odimId as id,
                            concat(o.odimCadsct,'-',o.odimCadp1) as cadastre,
                            concat(o.odimNum,' ',r.odrueType,' ',r.odrueLiaison,' ',r.odrueNom) as adresse)
                            from OdhImmeubles o
                            left join OdhRues r on o.odimRue=r.odrueId
                            order by r.odrueNom`;

    static immeublesById(id) {
        return `select new map(o as immeuble,s as sanitaire,
                                (select count(odimrId) from OdhProceduresimr where odimrImmeuble=o.odimId) as nbprocedure,
                                (select count(odlotId) from OdhLots where odlotImmeuble=o.odimId) as nblot) 
                                from OdhImmeubles o 
                                left join OdhEtatpar s on s.odetImmeuble=o.odimId
                                where o.odimId=${id}`
    }

    static infoImmeuble(id) {
        return `select new map(o.odimId as id,
                                concat(o.odimCadsct,'-',o.odimCadp1) as cadastre,
                                q.odntNom as quartier,r.odrueVille as ville,r.odrueCodeposte as cp,
                                concat(o.odimNum,' ',r.odrueType,' ',r.odrueLiaison,' ',r.odrueNom) as adresse,
                                (select count(odimrId) from OdhProceduresimr where odimrImmeuble=o.odimId) as nbprocedure,
                                (select count(odlotId) from OdhLots where odlotImmeuble=o.odimId) as nblot) 
                                from OdhImmeubles o 
                                left join OdhRues r on o.odimRue=r.odrueId
                                left join OdhNatures q on q.odntId=o.odimQuartier
                                where o.odimId=${id}`
    }

    static proceduresOfImmeuble(id) {
        return `select new map( o.odimrId as id,o.odimrDate as date,o.odimrDatefin as datefin,
                                o.odimrPeril as type,concat(s.odsuPren,' ',s.odsuNom) as suiveur,
                                i.odimId as immId) 
                from OdhProceduresimr o 
                left join OdhImmeubles i on i.odimId=o.odimrImmeuble
                left join OdhSuiveurs s on o.odimrSuiveur=s.odsuId
                where o.odimrImmeuble=${id}`
    }

    static lotsOfImmeuble(id) {
        return `select new map(o.odlotId as id,concat(o.odlotCodebat,'-',o.odlotCodeimm) as lot,
                                i.odimId as immId, concat(i.odimCadsct,'-',i.odimCadp1) as cadastre,
                                concat(i.odimNum,' ',r.odrueType,' ',r.odrueLiaison,' ',r.odrueNom) as adresse,
                                p.odproId as proId,concat(p.odproCivil,' ',p.odproNom,' ',p.odproPren) as proprietaire,
                                l.odlocId as locId,concat(l.odlocCivil,' ',l.odlocNom,' ',l.odlocPren) as locataire,
                                n.odntNom as typelot) 
                from OdhLots o
                left join OdhImmeubles i on i.odimId=o.odlotImmeuble
                left join OdhRues r on i.odimRue=r.odrueId
                left join OdhProprietaires p on o.odlotProprietaire=p.odproId
                left join OdhLocataires l on o.odlotLocataire=l.odlocId
                left join OdhNatures n on o.odlotType=n.odntId
                where o.odlotImmeuble=${id}`    
    }

    static lotsOfProprietaire(id) {
        return `select new map(o.odlotId as id,concat(o.odlotCodebat,'-',o.odlotCodeimm) as lot,
                                i.odimId as immId, concat(i.odimCadsct,'-',i.odimCadp1) as cadastre,
                                concat(i.odimNum,' ',r.odrueType,' ',r.odrueLiaison,' ',r.odrueNom) as adresse,
                                p.odproId as proId,concat(p.odproCivil,' ',p.odproNom,' ',p.odproPren) as proprietaire,
                                l.odlocId as locId,concat(l.odlocCivil,' ',l.odlocNom,' ',l.odlocPren) as locataire,
                                n.odntNom as typelot) 
                from OdhLots o
                left join OdhImmeubles i on i.odimId=o.odlotImmeuble
                left join OdhRues r on i.odimRue=r.odrueId
                left join OdhProprietaires p on o.odlotProprietaire=p.odproId
                left join OdhLocataires l on o.odlotLocataire=l.odlocId
                left join OdhNatures n on o.odlotType=n.odntId
                where o.odlotProprietaire=${id}`     
    }

    static lotsOfLocataire(id) {
        return `select new map(o.odlotId as id,concat(o.odlotCodebat,'-',o.odlotCodeimm) as lot,
                                i.odimId as immId, concat(i.odimCadsct,'-',i.odimCadp1) as cadastre,
                                concat(i.odimNum,' ',r.odrueType,' ',r.odrueLiaison,' ',r.odrueNom) as adresse,
                                p.odproId as proId,concat(p.odproCivil,' ',p.odproNom,' ',p.odproPren) as proprietaire,
                                l.odlocId as locId,concat(l.odlocCivil,' ',l.odlocNom,' ',l.odlocPren) as locataire,
                                n.odntNom as typelot) 
                from OdhLots o
                left join OdhImmeubles i on i.odimId=o.odlotImmeuble
                left join OdhRues r on i.odimRue=r.odrueId
                left join OdhProprietaires p on o.odlotProprietaire=p.odproId
                left join OdhLocataires l on o.odlotLocataire=l.odlocId
                left join OdhNatures n on o.odlotType=n.odntId
                where o.odlotLocataire=${id}`    
    }

//Declaration
    static declarationsOfEtatpar(id) {
        return `from OdhDeclarations where oddeEtatpar=${id}`
    }
//Procedures
    static procedureById(id) {
        return `from OdhProceduresimr where odimrId=${id}`
    }
//lots
    static infoLot(id) {
        return `select new map(odlotId as id,
                                odlotCodebat as bat,
                                odlotCodeesc as esc,
                                odlotCodeniv as niv,
                                odlotCodeimm as imm)
                                from OdhLots
                                where odlotId=${id}`
    }

    static lotById(id) {
        return `select new map(o as lot,s as sanitaire) 
                from OdhLots o
                left join OdhEtatpar s on s.odetLot=o.odlotId 
                where o.odlotId=${id}`
    }

    static locslotById(id) {
        return `select new map(o.odllId as odllId,
                                o.odllLot as odllLot,
                                o.odllDatede as odllDatede,
                                o.odllDatea as odllDatea,
                                o.odllObservations as odllObservations,
                                o.odllLocataire as odllLocataire,
                                concat(l.odlocPren,' ',l.odlocNom) as locataire)
                from OdhLocslot o
                left join OdhLocataires l on l.odlocId=o.odllLocataire 
                where o.odllLot=${id}`
    }

    static propslotById(id) {
        return `select new map(o.odplId as odplId,
                    o.odplLot as odplLot,
                    o.odplDatede as odplDatede,
                    o.odplDatea as odplDatea,
                    o.odplObservations as odplObservations,
                    o.odplNature as odplNature,
                    o.odplProprietaire as odplProprietaire,
                    concat(p.odproPren,' ',p.odproNom) as proprietaire,
                    n.odntNom as nature)
        from OdhPropslot o
        left join OdhProprietaires p on p.odproId=o.odplProprietaire 
        left join OdhNatures n on n.odntId =o.odplNature
        where o.odplLot=${id}`
    }


    static natureprocEltByProcId(id) {
        return `select id.elt from OdhNatproc where id.odnpProc=${id}`
    }
    static expprocEltByProcId(id) {
        return `select id.elt from OdhExpproc where id.odepProc=${id}`
    }

    static proprietairesOfImmeuble(id) {
        return `from OdhProprietaires where odlotImmeuble=${id}`
    }

    static locatairesOfImmeuble(id) {
        return `from OdhLocataires where odlotImmeuble=${id}`
    }

}

export default Requetes