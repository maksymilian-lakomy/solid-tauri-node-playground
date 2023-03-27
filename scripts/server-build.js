import execa from 'execa';
import fs from 'node:fs';
import { oraPromise } from 'ora';

const createBundle = async () =>
  execa('node_modules/.bin/esbuild', [
    './server', '--bundle', '--outfile=dist/server.js', '--platform=node'
  ]);

const createServerPackage = async () =>
  execa('node_modules/.bin/pkg', ['package.json', '--output', 'src-tauri/binaries/app']);

  const moveBinaries = async () => {
    const extension = process.platform === 'win32' ? ".exe" : ""
    const rustInfo = (await execa('rustc', ['-vV'])).stdout;
    const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
  
    if (!targetTriple) {
      console.error('Failed to determine platform target triple')
    }
  
    fs.renameSync(
      `src-tauri/binaries/app${extension}`,
      `src-tauri/binaries/app-${targetTriple}${extension}`
    );
  }
  
  const main = async () => {
    try {
      await createBundle();
    } catch (e) { 
      console.warn("Create bundle failed:", e)
      throw e
    }
  
    try {
      await createServerPackage();
    } catch (e) {
      console.warn("Create server package failed:", e)
      throw e
    }
    try {
      await moveBinaries();
    } catch (e) {
      console.warn("Move binaries failed:", e);
      throw e
    }
  }
  
  await oraPromise(main, { text: 'Building server binaries\n', successText: 'Building server binaries done\n', failText: 'Cannot build server binaries\n'});
