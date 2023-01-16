import { readFile } from 'fs/promises'
import path from 'path'
import { Winners } from '../sendWinners'
import { ArchiveDivided } from './divideArchiveInClubAndWeek'

export const pickRandomWinners = async (
	weekNumber: number,
	divided: ArchiveDivided,
): Promise<Winners> => {
	const winners = {} as Winners
	const teams = divided[`${weekNumber}`].teams
	for (const team in teams) {
		let JSONData = await getJSONData(divided, weekNumber, team)
		console.log(JSONData)
		for (let person = 0; person < 4; person++) {
			let randomPerson =
				JSONData[Math.floor(Math.random() * JSONData.length)].athlete
			let str = randomPerson.firstname + ', ' + randomPerson.lastname + '; '
			if (winners[team] === undefined) {
				winners[team] = {
					winner: [str],
				}
			}
			let counter = 0
			while (winners[team].winner.includes(str) && counter < 150) {
				let rnd = Math.random()
				randomPerson = JSONData[Math.floor(rnd * JSONData.length)].athlete
				str = randomPerson.firstname + ', ' + randomPerson.lastname + '; '
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
) => {
	const fileArray = divided[`${weekNumber}`].teams[team].files
	const folderName = './archive'
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
