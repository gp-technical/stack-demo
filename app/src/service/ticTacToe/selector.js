import name from './name'

const get = state => state[name]
const getUserId = state => get(state).userId
const getUsers = state => get(state).users
const getFull = state => get(state).full
const getBoardSquares = state => get(state).boardSquares
const getXIsNext = state => get(state).xIsNext
const getReenablePlay = state => get(state).reenablePlay

export default { getUserId, get, getUsers, getFull, getBoardSquares, getXIsNext, getReenablePlay }
