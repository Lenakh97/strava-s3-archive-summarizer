import { readdir, readFile } from 'fs/promises'
import path from 'path'
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
console.log('Top 3 distance:', distanceItems.slice(0, 3))

//sorting by time
var timeItems = Object.keys(allTeamData).map((key) => {
	return [key, allTeamData[key]]
})
timeItems.sort((a, b) => Object.values(b[1])[1] - Object.values(a[1])[1])
console.log('Top 3 time', timeItems.slice(0, 3))
