import { readdir } from "fs/promises"
import { weekNumber } from "./weekNumber.js"

export const divideIntoweeks = async (week: number, folderName: string) => {
	const weeklyData = []
	const fileArray = await readdir(folderName)
	for (const file of fileArray){
		const fileDate = new Date (file.slice(0,10))
		const currentWeek = weekNumber(fileDate)
		if (currentWeek === week){
			weeklyData.push(file)
		}
	}
	return weeklyData
}