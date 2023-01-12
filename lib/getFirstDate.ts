import { readdir } from "fs/promises"

export const getFirstDate = async () =>{
    const folderName = './archive'
    const fileArray = await readdir(folderName)
    const firstFile = fileArray[0]

    return firstFile
}