const { spawnSync, spawn } = require('child_process')
const { stat } = require('fs')

const pkg = require('./package.json')
const deps = Object.keys(pkg.dependencies)
const devDeps = Object.keys(pkg.devDependencies)

stat('node_modules/', (err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  if (stats.isDirectory()) {
    console.log('Removing node modules')
    spawnSync('rm', ['-rf', 'node_modules/'])
  }
})

console.log('Installing dependencies')

const depsChild = spawn('yarn', ['add', deps.join(' ')], { stdio: 'pipe' })

depsChild.stdout.pipe(process.stdout)

depsChild.on('message', message => {
  console.log(message)
})

depsChild.on('error', err => {
  console.error(err)
})

depsChild.on('exit', code => {
  console.error('Command exited with code %d', code)

  console.log('Installing dev dependencies')

  const devDepsChild = spawn('yarn', ['add', '--dev', devDeps.join(' ')], {
    stdio: 'pipe',
  })

  devDepsChild.stdout.pipe(process.stdout)

  devDepsChild.on('message', message => {
    console.log(message)
  })

  devDepsChild.on('error', err => {
    console.error(err)
  })

  devDepsChild.on('exit', code => {
    console.error('Command exited with code %d', code)
  })
})
