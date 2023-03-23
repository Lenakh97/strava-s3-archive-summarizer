import { Winners } from "../sendWinners"
import { ArchiveDivided } from "./divideArchiveInClubAndWeek"
import { readFile } from 'fs/promises'
import path from 'path'

export const pickRandomWinners2 = async (
	weekNumber: number,
	divided: ArchiveDivided,
	folderName: string
): Promise<Winners> => {
	const winners = {} as Winners
	const teams = divided[`${weekNumber}`].teams
	for (const team in teams) {
        winners[team] = {
            winner: [],
        }
        const fileArray = divided[`${weekNumber}`].teams[team].files
	    let teamNameArray = [] as any[]
        for (const file of fileArray){
            let filePath = path.join(folderName, file)
		    let rawData = await readFile(filePath)
		    const activityData = JSON.parse(rawData.toString())
            for (const activity of activityData){
                let name = activity.athlete.firstname + ' ' + activity.athlete.lastname
                teamNameArray.push(name)
            }
        }
        for (let person = 0; person <5; person++){
            if (teamNameArray.length === 0){
                continue
            }
            let randomPerson = teamNameArray[Math.floor(Math.random() * teamNameArray.length)]
            winners[team].winner.push(randomPerson)
            teamNameArray = teamNameArray.filter(i => i !== randomPerson)
        }
	}
	return winners
}