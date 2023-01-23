import { readFile } from 'fs/promises'
import path from 'path'
import { Winners } from '../sendWinners'
import { ArchiveDivided } from './divideArchiveInClubAndWeek'

/*
This function will get random winners in each team for the picked weeknumber. 
If the winner is already picked it will try 150 times to get a new winner by 
picking new files and new random winners. If the winner is not unique after 150
tries we will get the same winner multiple times. This is done in case <5 people
are active in a club. If not we would have an infinite loop.
 */
export const pickRandomWinners = async (
	weekNumber: number,
	divided: ArchiveDivided,
	folderName: string
): Promise<Winners> => {
	const winners = {} as Winners
	const teams = divided[`${weekNumber}`].teams
	for (const team in teams) {
		let JSONData = await getJSONData(divided, weekNumber, team, folderName)
		for (let person = 0; person < 4; person++) {
			let randomPerson =
				JSONData[Math.floor(Math.random() * JSONData.length)].athlete
			let str = randomPerson.firstname + ', ' + randomPerson.lastname
			if (winners[team] === undefined) {
				winners[team] = {
					winner: [str],
				}
			}
			let counter = 0
			while (winners[team].winner.includes(str) && counter < 150) {
				JSONData = await getJSONData(divided, weekNumber, team, folderName)
				let rnd = Math.random()
				randomPerson = JSONData[Math.floor(rnd * JSONData.length)].athlete
				str = randomPerson.firstname + ', ' + randomPerson.lastname
				counter += 1
			}
			winners[team].winner.push(str)
		}
	}
	return winners
}

export const getJSONData = async (
	divided: ArchiveDivided,
	weekNumber: number,
	team: string,
	folderName: string
) => {
	const fileArray = divided[`${weekNumber}`].teams[team].files
	let JSONData = [] as any[]
	while (JSONData[0] === undefined) {
		let random = Math.floor(Math.random() * fileArray.length)
		let randomFile = fileArray[random]
		let filePath = path.join(folderName, randomFile)
		let rawData = await readFile(filePath)
		JSONData = JSON.parse(rawData.toString())
	}
	return JSONData
}
