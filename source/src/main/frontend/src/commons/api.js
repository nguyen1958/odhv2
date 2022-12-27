import axios from 'axios'

    const axiosInstance= axios.create({
        baseURL: process.env.REACT_APP_BASENAME || ''
    })

    axiosInstance.interceptors.response.use(response=>{
            //console.log("interceptor response",response.data)
            return response
        },
        error => {
            console.log("interceptor error response",error.response)
            //(error.response.data.type+"\n"+error.response.data.message)
            if(error.response.data.status){
                throw(new Error(`
    Status:${error.response.data.status}
    Path:${error.response.data.path}
    Error:${error.response.data.error}`))
            }
            else{
                throw(new Error(`
    ${error.response.data.type}
    ${error.response.data.erreur}
    Cause:${error.response.data.message}`))
            }         
        })

    const api = {
        //full url address server
        //1-test si document inexistant, une erreur est intercepté par interceptor response, alerter l'erreur
        //2-si ok appel window.open pour telecharger le document 
        show: async (uri)=>{
            try{
                await api.get(`${process.env.REACT_APP_APIURL}/${uri}`)
                window.open(`${process.env.REACT_APP_APIURL}/${uri}`)    
            }
            catch(error){
                alert(error)
            }
        },    
        requestSql:(sql)=>{
           return axiosInstance.post("/requestSql", sql,
                                {headers: {"Content-Type": "plain/text"}})
        },
    
        requestManySql:(...list)=>{
            //console.log("list",list)
            return axios.all(list.map( sql => api.requestSql(sql)))
        },
    
        requestQuery:(sql)=>{
            return axiosInstance.post("/updateQuery", sql,
                                {headers: {"Content-Type": "plain/text"}})
        },
    
        get:(resource,config={})=>{
            //console.log(resource,config)
            return axiosInstance.get(resource, {...config})
        },
    
        post:(resource,data=null,config={})=>{
            console.log(resource,data,config)
            return axiosInstance.post(resource,data,{...config})
        }
    }
    

export default api;