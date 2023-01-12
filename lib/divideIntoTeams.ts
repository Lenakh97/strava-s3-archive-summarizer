export type teamsSummary = Record<string,{
	files: string[];}>

export const divideIntoTeams = (weeklyData: string[]): teamsSummary =>{

	const teamsSummary = {} as teamsSummary
	for (const file of weeklyData){
		let teamName=""
		teamName = file.slice(30,36)
		
		if (teamsSummary[teamName] === undefined){
			teamsSummary[teamName] = {
				files: [file]
			}
		}
		else{
			teamsSummary[teamName].files.push(file)
		}
	}
	return teamsSummary
}