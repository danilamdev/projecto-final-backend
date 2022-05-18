import minimist from 'minimist'

const options = { 
   default: { p: 6565},
   alias: {p: 'puerto'}
}
const ARGS = minimist(process.argv.slice(2), options)

export { ARGS }