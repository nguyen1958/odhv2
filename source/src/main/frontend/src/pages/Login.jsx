import React, { useReducer } from 'react'
import api from '../commons/api'
import images from '../constantes/images'

const initialState = {}

const reducer = (state, action) => {
    switch (action.type) {
        case 'field': {
            return { ...state, [action.field]: action.value }
        }
        case 'failed': {
            return { ...state, error: 'IDENTIFICATION INCORRECTE ...' }
        }
        default: return state
    }
}

const Login = ({ setLogin }) => {
    console.log("in login ENV=",process.env)
    const [state, dispatch] = useReducer(reducer, initialState)
    const { error, identifiant, password } = state
    const changeHandler = (e) => {
        dispatch({ type: 'field', field: e.target.name, value: e.target.value })
    }
    const handlerClick = async () => {
        try {
            console.log("clickHandler...")
            const user = await api.post('/authentifier', { login: identifiant, password: password })
            if (user.data) {
                sessionStorage.setItem("user", JSON.stringify(user.data))
                setLogin(user.data)
            }
            else {
                dispatch({ type: 'failed' })
            }
            console.log("user",user)
        }
        catch(error){
            console.log("in catch error",error)
            alert(error)
        }       
    }

    return (
        <div style={{ backgroundImage: `url(${images.fondLogin})`, backgroundRepeat: 'no-repeat'}}>
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="col-4 text-center" style={{transform:'translateY(50%)'}}>
                    <img src={images.logoToulon} alt="logoToulon" /><br />
                    <a href="http://www.toulon.fr" target="_blank" rel="noreferrer">Mairie de Toulon</a>
                </div>
                <div className="col-4">
                    {error && <div className="error">{error}</div>}
                    <div className="card">
                        <div className="card-header login text-center bg-info">
                            <img src={images.logoUser} alt="logo user" />
                            <h3 className="card-title">Authentification</h3>
                        </div>
                        <div className="card-body">
                            <form className="login">
                                <span className="font-weight-bold">Identifiant</span>
                                <input type="text" name="identifiant" value={identifiant || ''} onChange={changeHandler} />
                                <span className="font-weight-bold">Mot de passe</span>
                                <input type="password" name="password" value={password || ''} onChange={changeHandler} />
                                <div className="row justify-content-center">
                                    <button type="button" className="btn btn-primary" onClick={handlerClick}>Log In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <span className="copy">Copyright &copy; Analogon sarl</span>
                </div>
                <div className="col-4 text-center" style={{transform:'translateY(150%)'}}>
                    <img src={images.logoAnalogon} alt="logoAnalogon" /><br />
                    <a href="http://www.analogon.fr" target="_blank" rel="noreferrer">Pour visiter notre site web, cliquez ici</a>
                </div>
                
               
                
            
            </div>
        </div>
        
    );
}

export default Login;