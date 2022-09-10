import axios from 'axios'

const API_URL = 'http://localhost:8080/api/v1/auth'

const register = (username, email, password, clearErrors, setEmailError, setPasswordError, setUsernameError) => {
    return axios.post(API_URL + '/register', { username, email, password }).then((response) => {
        clearErrors()     
        console.log(response)
    }).catch((error) => {
        if (error.response.data.errorList) {
            clearErrors()
            console.log(error.response.data.errorList)
            error.response.data.errorList.forEach(err => {
                if(err.field === 'email') {
                    setEmailError(err.message)
                  }
                  
                  if(err.field === 'password') {
                    setPasswordError(err.message)
                  }
          
                  if(err.field === 'username') {
                    setUsernameError(err.message)
                  }               
            })
        }    
    })
}

const login = (username, password, clearError, setError) => {
    return axios.post(API_URL + '/login', { username, password }, { withCredentials: true }).then((response) => {
        clearError()
        console.log(response)
        if (response.data.username) {
            localStorage.setItem('user', JSON.stringify(response.data))
            console.log(response.data)
        }
    }).catch((error) => {
        if (error.response.data) {
            clearError()
            console.log(error.response.data)
            setError(error.response.data.message)
        }
    })
}

const logout = () => {
    localStorage.removeItem('user')
    return axios.post(API_URL + '/logout').then((response) => {
        return response.data
    })
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}

 const Authentication = {
        register,
        login,
        logout,
        getCurrentUser,
}

export default Authentication