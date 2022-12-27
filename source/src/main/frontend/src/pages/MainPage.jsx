import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import images from '../constantes/images';

const MainPage = ({ setLogin }) => {
    console.log("Main page")
    const navigate = useNavigate()
    const clickHandler=()=>{
        sessionStorage.clear()
        setLogin(null)
        navigate('/',true)
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md  justify-content-between" role="navigation">
                <div className="navbar-header">
                    <img src={images.logoBrand} style={{height:'50px'}} alt="logoBrand" />
                    <span style={{fontSize:'500',fontStyle:'italic',fontWeight:'bold',marginLeft:'20px'}}>L'observatoire de l'habitat</span>
                </div>
                <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>   
                <div className="navbar navbar-collapse justify-content-center" id="navbarMenu">
                    <div className="btn-group mr-1">
                        <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                            Immeubles
                        </button>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to="immeubles">Recherche immeubles</Link>
                            <Link className="dropdown-item" to="immeubles/edit">Création immeuble</Link>
                            <Link className="dropdown-item" to="proprietaires">Proprietaires</Link>                          
                            <Link className="dropdown-item" to="locataires">Locataires</Link>
                            
                        </div>
                    </div>
                    <div className="btn-group mr-1">
                        <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" onClick={()=> navigate("/listing")}>
                            Listing
                        </button>           
                    </div>
                    <div className="btn-group mr-1">
                        <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                            Référentiels
                        </button>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to="rues">Rues</Link>
                            <Link className="dropdown-item" to="experts">Experts</Link>
                            <Link className="dropdown-item" to="suiveurs">Suiveurs</Link>
                            <Link className="dropdown-item" to="syndics">Syndics</Link>
                            <Link className="dropdown-item" to="entreprises">Entreprises</Link>    
                            <Link className="dropdown-item" to="relogements">Relogements</Link>                    
                            <Link className="dropdown-item" to="options">Options</Link>   
                        </div>
                    </div>
                    <div className="btn-group mr-1">
                        <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                            Administration
                        </button>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to="utilisateurs">Utilisateurs</Link>
                 
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-sm btn-secondary navbar-btn" onClick={clickHandler}>Déconnexion</button>
            </nav>
            <div className="container-fluid">
                <Outlet />
            </div>
        </div>
        


    );
}

export default MainPage;