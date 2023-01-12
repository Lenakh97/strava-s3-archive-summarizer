import { readdir, readFile } from 'fs/promises'
import path from 'path'
import { ArchiveDivided, divideArchiveInClubAndWeek } from './lib/divideArchiveInClubAndWeek.js'
import { summarizeActivities } from './lib/summarizeActivities.js'
import { summarizeTeamData } from './lib/summarizeTeamData.js'

const folderName = './archive'
const fileArray = await readdir(folderName)
const allData = []
for (const file of fileArray) {
	const filePath = path.join(folderName, file)
	const rawData = await readFile(filePath)
	const JSONData = JSON.parse(rawData.toString())
	for (const activityData of JSONData) {
		allData.push(activityData)
	}
	continue
}
const allTeamData = summarizeTeamData(allData)
console.log(allTeamData)
const teamActivities = summarizeActivities(allData)
console.log(teamActivities)

//sorting by distance
var distanceItems = Object.keys(allTeamData).map((key) => {
	return [key, allTeamData[key]]
})
distanceItems.sort((a, b) => Object.values(b[1])[0] - Object.values(a[1])[0])
//console.log('Top 3 distance:', distanceItems.slice(0, 3))

//sorting by time
var timeItems = Object.keys(allTeamData).map((key) => {
	return [key, allTeamData[key]]
})
timeItems.sort((a, b) => Object.values(b[1])[1] - Object.values(a[1])[1])
//console.log('Top 3 time', timeItems.slice(0, 3))

const divided = await divideArchiveInClubAndWeek()

export type Winners = Record<string,{winner: string[];}>


export const pickRandomWinners = async (weekNumber: number, divided: ArchiveDivided): Promise<Winners> => {
	const winners = {} as Winners
	const teams = divided[`${weekNumber}`].teams
	for (const team in teams){
		const fileArray = divided[`${weekNumber}`].teams[team].files
		const random = Math.floor(Math.random() * fileArray.length)
		const folderName = './archive'
		const randomFile = fileArray[random]
		const filePath = path.join(folderName, randomFile)
		const rawData = await readFile(filePath)
		const JSONData = JSON.parse(rawData.toString())
		for (let person=0; person<5; person++){
			const randomPerson =  JSONData[Math.floor(Math.random() * JSONData.length)].athlete
			const str = randomPerson.firstname + ', ' + randomPerson.lastname + '; '
			winners[team].winner.push(str)
		}
		
	}
	return winners
}

console.log(await pickRandomWinners(2,divided))