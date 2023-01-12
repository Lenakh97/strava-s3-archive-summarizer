import { divideIntoTeams, teamsSummary } from "./divideIntoTeams.js";
import { divideIntoweeks } from "./divideIntoWeeks.js";

export type ArchiveDivided = Record<number, {
	teams: teamsSummary;}>


export const divideArchiveInClubAndWeek = async (): Promise<ArchiveDivided> =>{
	const divideArchive = {} as ArchiveDivided
	for (let week=1; week<5; week++){
		const weekData = await divideIntoweeks(week, './archive')
		console.log(weekData)
		const teamDivision = divideIntoTeams(weekData) as teamsSummary
		if(divideArchive[week] === undefined){
			divideArchive[week] = {teams: teamDivision}
		}
	}
	return divideArchive
}