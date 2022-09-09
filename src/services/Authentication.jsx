import React from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/v1/auth'

const register = (username, email, password) => {
    return axios.post(API_URL + 'register', { username, email, password })
}

const login = (username, password) => {
    return axios.post(API_URL + 'login', { username, password }).then((response) => {
        if (response.data.username) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
    })
}

const logout = () => {
    localStorage.removeItem('user')
    return axios.post(API_URL + 'logout').then((response) => {
        return response.data
    })
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}

export const Authentication = () => {
    register,
    login,
    logout,
    getCurrentUser
}