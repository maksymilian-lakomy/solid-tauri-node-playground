import execa from 'execa'
import chokidar from 'chokidar'

const build = async () => {
  try {
    await execa('node', ['scripts/server-build.js'], { all: true }).stderr.pipe(process.stdout)
  } catch (e) {
    console.error(e)
  }
}

const watch = async () => {
  const watcher = chokidar.watch('server/*', { persistent: true })
  
  watcher.on('change', build)
  build()
}

watch().catch((e) => {
  throw e
})
