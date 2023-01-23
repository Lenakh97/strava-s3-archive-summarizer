import { divideIntoTeams, teamsSummary } from "./divideIntoTeams.js";
import { divideIntoweeks } from "./divideIntoWeeks.js";

export type ArchiveDivided = Record<number, {
	teams: teamsSummary;}>

export const divideArchiveInClubAndWeek = async (week: number, foldername: string): Promise<ArchiveDivided> =>{
	const divideArchive = {} as ArchiveDivided
	const weekData = await divideIntoweeks(week, foldername)
	const teamDivision = divideIntoTeams(weekData) as teamsSummary
	if(divideArchive[week] === undefined){
		divideArchive[week] = {teams: teamDivision}
	}
	return divideArchive
}