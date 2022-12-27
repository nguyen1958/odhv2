import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../commons/api';
import Requetes from '../../commons/Requetes';
import { boolToString, dateToString, libelleOf } from '../../commons/Utils';
import images from '../../constantes/images';
import ListePiecesJointes from '../piecesJointes/ListePiecesJointes';
import ListeLots from '../lots/ListeLots';
import ListeProcedures from '../procedures/ListeProcedures';

const DetailImmeuble = () => {
    const [data, setData] = useState({});
    const {immeuble,rue,syndic,sanitaire} = data;
    const [procedures, setProcedures] = useState([]);
    const [lots, setLots] = useState([]);
    const [natures, setNatures] = useState([]);
    const [documents,setDocuments]=useState([])
    const [photos,setPhotos]=useState([])
    const {state}= useLocation();
    const navigate=useNavigate();

    const sqlImmeuble=`select new map(i as immeuble,r as rue ,s as syndic,sp as sanitaire) from OdhImmeubles i 
    left join OdhRues r on r.odrueId=i.odimRue
    left join OdhSyndics s on s.odsynId=i.odimSyndic
    left join OdhEtatpar sp on sp.odetImmeuble=i.odimId
    where i.odimId=${state.id}`

    const getData = async () => {
        try {  
            const [r1,r2,r3,r4]= await api.requestManySql(sqlImmeuble,
                                            Requetes.proceduresOfImmeuble(state.id),
                                            Requetes.lotsOfImmeuble(state.id),
                                            Requetes.listeNatures)  
            //data objet composant immeuble,rue et syndic                                    )
            setData(r1.data[0])            
            //array procedures
            setProcedures(r2.data)
            //array lots
            setLots(r3.data)
            //array natures 
            setNatures(r4.data)
            //documents et photos
            const r5=await api.post("/getListFiles",{type:"document",immId:state.id})
            const r6=await api.post("/getListFiles",{type:"photos",immId:state.id})
            setDocuments(r5.data)
            setPhotos(r6.data)
            console.log("result getliste",r5,r6)
            }
            catch (error) {
            alert(error)
            }
        }   
    
    useEffect(() => {
        console.log("state in detail",state)
       
        getData()
        return () => {};
    }, []);

    return (
        <div className="detailImmeuble">
            <div className="bold mb-1">
                <span><img src={images.logoImmeuble} /></span>{`Immeuble `}
                <Link to="/immeubles/edit" state={{id:immeuble?.odimId}}>{immeuble?.odimCadsct}-{immeuble?.odimCadp1}</Link> {"/ "}                                                              
                <span>Global</span>            
            </div>    
            <h5 className="header alert alert-secondary" role="alert">
                Vue globale immeuble
            </h5>
            <div className="mx-auto" style={{width:'90%'}}>
{/*=======Données générale======= */}
                <h6>Données générales</h6>
                    <div className="row">
                        <div className="col-2">#ID</div>
                        <div className="col">{immeuble?.odimId}</div>
                        <div className="col-2">Nom immeuble</div>
                        <div className="col">{immeuble?.odimNom}</div>
                    </div> 
                    <div className="row">
                        <div className="col-2">Cadastre(section-parcelles)</div>
                        <div className="col">
                            <Link to="/immeubles/edit" state={{id:immeuble?.odimId}}>
                                {immeuble?.odimCadsct} - {immeuble?.odimCadp1} {immeuble?.odimCadp2} {immeuble?.odimCadp3} {immeuble?.odimCadp4}
                            </Link>      
                        </div>
                        <div className="col-2">No de rue / Rue</div>
                        <div className="col">{immeuble?.odimNum} {rue?.odrueType} {rue?.odrueLiaison} {rue?.odrueNom}</div>
                    </div> 
                    <div className="row">
                        <div className="col-2">Ilot(section-îlot-bâti)</div>
                        <div className="col">{immeuble?.odimIlsct} - {immeuble?.odimIlilot} - {immeuble?.odimIlbat}</div>
                        <div className="col-2">Orientation</div>
                        <div className="col">{immeuble?.odim_position}</div>
                    </div> 
                    <div className="row">
                        <div className="col-2">Date de construction</div>
                        <div className="col">{dateToString(immeuble?.odimDatecrea)}</div>
                        <div className="col-2">Alignement</div>
                        <div className="col">{immeuble?.odimAlignement}</div>
                    </div> 
                    <div className="row">
                        <div className="col-2">Usage</div>
                        <div className="col">{libelleOf(natures,immeuble?.odimGroupe)}</div>
                        <div className="col-2">Etages</div>
                        <div className="col">{immeuble?.odimNiv}</div>
                    </div> 
                    <div className="row">
                        <div className="col-2">Type de propriété</div>
                        <div className="col">{libelleOf(natures,immeuble?.odimType)}</div>
                        <div className="col-2">Hauteur</div>
                        <div className="col">{immeuble?.odimHaut}</div>
                    </div> 
                    <div className="row">
                        <div className="col-2">Syndic</div>
                        <div className="col">{syndic?.odsynCode} - {syndic?.odsynRaison}</div>
                        <div className="col-2">Surface au sol (m2)</div>
                        <div className="col">{immeuble?.odimSurfacesol}</div>
                    </div> 
                    <div className="row">
                        <div className="col-2">Canton</div>
                        <div className="col">{immeuble?.odimCanton}</div>
                        <div className="col-2">Surface totale (m2)</div>
                        <div className="col">{immeuble?.odimSurfacetot}</div>
                    </div> 
                    <div className="row">
                        <div className="col-2">Quartier</div>
                        <div className="col">{libelleOf(natures,immeuble?.odimQuartier)}</div>
                        <div className="col-2">Etat général</div>
                        <div className="col">{libelleOf(natures,immeuble?.odimEtgen)}</div>
                    </div>
                    <div className="row">
                        <div className="col-2">Commentaire</div>
                        <div className="col">{immeuble?.odimDesc}</div>
                    </div>
{/*=======Parties communnes======= */} 
                <h6>Parties communnes</h6>
                    <div className="row">
                        <div className="col-2">Nombres de caves</div>
                        <div className="col">{immeuble?.odimNcaves}</div>
                        <div className="col-2">Locale poubelles</div>
                        <div className="col">{boolToString(immeuble?.odimLocpoub)}</div>
                    </div> 
                    <div className="row">
                        <div className="col-2">Nombre de parkings</div>
                        <div className="col">{immeuble?.odimParking}</div>
                        <div className="col-2">Chauffage</div>
                        <div className="col">{boolToString(immeuble?.odimChauffage)}</div>
                    </div> 
                    <div className="row">
                        <div className="col-2">Nombre d'ascenceurs</div>
                        <div className="col">{immeuble?.odimAscenseur}</div>
                        <div className="col-2">Gaz</div>
                        <div className="col">{boolToString(immeuble?.odimGaz)}</div>
                    </div> 
                    <div className="row">
                        <div className="col-2">Grenier</div>
                        <div className="col">{boolToString(immeuble?.odimGrenier)}</div>
                        <div className="col-2">Eau</div>
                        <div className="col">{boolToString(immeuble?.odimEau)}</div>
                    </div>
                    <div className="row">
                        <div className="col-2">Commentaire</div>
                        <div className="col">{immeuble?.odimPartscomscom}</div>
                    </div> 
{/*=======Environnements======= */} 
                <h6>Environnements</h6>
                    <div className="row">
                        <div className="col-2">Terrain de jeu</div>
                        <div className="col">{boolToString(immeuble?.odimTerjeux)}</div>
                        <div className="col-2">Pelouse</div>
                        <div className="col">{boolToString(immeuble?.odimPelous)}</div>
                    </div> 
                    <div className="row">
                        <div className="col-2">Environnement entretenu</div>
                        <div className="col">{boolToString(immeuble?.odimEnventr)}</div>
                        <div className="col-2">Chauffage</div>
                        <div className="col">{boolToString(immeuble?.odimChauffage)}</div>
                    </div>
                    <div className="row">
                        <div className="col-2">Commentaire</div>
                        <div className="col">{immeuble?.odimEnvcomment}</div>
                    </div>
{/*=======Sanitaire/parasitaire======= */}
                <div className="row align-items-center">
                    <h6 className="col-3 text-uppercase bold">Sanitaire/parasitaire</h6>
                    { sanitaire?.odetTermite === "true" && 
                        <div className="col">
                            <button className="btn btn-success btn-sm bold"
                                onClick={()=>{navigate("/immeubles/declarations",
                                                        {state:{id:sanitaire?.odetId,
                                                        cadastre:`${immeuble.odimCadsct}-${immeuble.odimCadp1}`}})}}>
                                Déclaration termites
                            </button>
                        </div>
                    } 
                </div>                                        
                    <div className="row">
                        <div className="col-2">Plomb</div>
                        <div className="col">{sanitaire?.odetPlomb}</div>
                        <div className="col-2">Salpêtre</div>
                        <div className="col">{boolToString(sanitaire?.odetSalpetre)}</div>
                    </div>
                    <div className="row">
                        <div className="col-2">Amiante</div>
                        <div className="col">{sanitaire?.odetAmiante}</div>
                        <div className="col-2">Humidité</div>
                        <div className="col">{boolToString(sanitaire?.odetHumidite)}</div>
                    </div>
                    <div className="row">
                        <div className="col-2">Moisissure</div>
                        <div className="col">{boolToString(sanitaire?.odetMoisissure)}</div>
                        <div className="col-2">Termite</div>
                        <div className="col">{boolToString(sanitaire?.odetTermite)}</div>
                    </div>
                    <div className="row">
                        <div className="col-2">Commentaire</div>
                        <div className="col">{sanitaire?.odetCommentaire}</div>
                    </div>
{/*=======Documents et photos======= */}
                <div className="row align-items-center">
                    <h6 className="col-3 text-uppercase bold">Documents et photos</h6>
                    <div className="col">
                        <button className="btn btn-success btn-sm bold"
                            onClick={()=>{navigate("/piecesjointes",{state:{immId:state.id,
                                                                    cadastre:`${immeuble.odimCadsct}-${immeuble.odimCadp1}`}})}}>
                            Modifier
                        </button>
                    </div>
                </div>          
                <ListePiecesJointes documents={documents} photos={photos} immId={state.id}  />
{/*=======Syndic======= */}
                <h6>Syndic</h6>
                    <div className="row">
                        <div className="col-2">Code</div>
                        <div className="col"><Link to="/syndics/edit" state={{id:syndic?.odsynId}} >{syndic?.odsynCode}</Link></div>
                        <div className="col-2">Raison sociale</div>
                        <div className="col">{syndic?.odsynRaison}</div>
                    </div>
{/*=======Procédures======= */}
                <div className="row align-items-center">
                    <h6 className="col-3 text-uppercase bold">Procédures</h6>
                    <div className="col">
                        <button className="btn btn-success btn-sm bold"
                            onClick={()=>{navigate("/procedures/edit",{state:{immId:state.id}})}}>
                            Ajouter procédure
                        </button>
                    </div>
                </div>          
                { procedures.length===0 && <div style={{border:'1px solid',padding:'2px 0'}}>Aucune procédure pour cet immeuble</div>}
                { procedures.length>0 && <ListeProcedures data={procedures} />}
{/*=======Lots======= */}
                <div className="row align-items-center">
                    <h6 className="col-3 text-uppercase bold">Lots</h6>
                    <div className="col">
                        <button className="btn btn-success btn-sm bold"
                            onClick={()=>{navigate("/lots/edit",{state:{immId:state.id}})}}>
                            Ajouter lot
                        </button>
                    </div>
                </div> 
                { lots.length===0 && <div style={{border:'1px solid',padding:'2px 0'}}>Aucun lot pour cet immeuble</div>}
                { lots.length>0 && <ListeLots data={lots} />}
{/*=======Propriétaires======= */}
                <h6>Propriétaires</h6>
{/*=======Locataires======= */} 
                <h6>Locataires</h6>
                
            </div>
        </div>
    );
}

export default DetailImmeuble;
