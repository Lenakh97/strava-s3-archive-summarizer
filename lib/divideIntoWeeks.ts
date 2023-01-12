import { readdir } from "fs/promises"
import { getFirstDate } from "./getFirstDate.js"

export const divideIntoweeks = async (weekNumber: number, folderName: string) => {
    
	const firstFileName = await getFirstDate()
	const firstDateWeek1 = new Date(firstFileName.slice(0, 10)).getTime()
	const startDate = new Date(
		firstDateWeek1 + 1000 * 60 * 60 * 24 * 7 * (weekNumber - 1),
	)
	const finishDay = new Date(
		firstDateWeek1 + 1000 * 60 * 60 * 24 * 7 * weekNumber,
	)
	const weeklyData = []
	const fileArray = await readdir(folderName)
	for (const file of fileArray) {
		const fileDate = new Date(file.slice(0, 10))
		if (fileDate >= startDate && fileDate < finishDay) {
			weeklyData.push(file)
		}
	}
	return weeklyData
}