import {readdir} from 'fs/promises'
import path from 'path'

const archiveFiles =  readdir(path.join(process.cwd(), 'archive'))

console.log(archiveFiles)