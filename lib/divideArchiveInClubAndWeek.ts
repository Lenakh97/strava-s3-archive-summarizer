import { divideIntoTeams, teamsSummary } from "./divideIntoTeams.js";
import { divideIntoweeks } from "./divideIntoWeeks.js";


export type ArchiveDivided = Record<number, {
	teams: teamsSummary;}>


export const divideArchiveInClubAndWeek = async (week: number): Promise<ArchiveDivided> =>{
	const divideArchive = {} as ArchiveDivided
	for (let i=week; i<week+5; i++){
		const weekData = await divideIntoweeks(i, './archive')
		console.log(weekData)
		const teamDivision = divideIntoTeams(weekData) as teamsSummary
		if(divideArchive[i] === undefined){
			divideArchive[i] = {teams: teamDivision}
		}
	}
	return divideArchive
}