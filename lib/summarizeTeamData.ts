export type allData 
    = {
        resource_state: number;
        athlete: {
            resource_state: number;
            firstname: string;
            lastname: string;
        };
        name: string;
        distance: number;
        moving_time: number;
        elapsed_time: number;
        total_elevation_gain: number;
        type: string;
        sport_type: string;
}[]

type Summary = Record<string,{
  distance: number;
  elapsed_time: number;}>

export const summarizeTeamData = (allData: allData): Record<string,{
    distance: number;
    elapsed_time: number;
  }> => {
    
    const summary = {} as Summary
    for (const activity of allData){
      let name = ""
      name = activity.athlete.firstname + " " + activity.athlete.lastname
      if (summary[name] === undefined){
        summary[name] = {
          distance:  activity.distance,
          elapsed_time:  activity.elapsed_time
        }
      }
      else{
        summary[name] = {
          distance: summary[name]?.distance + (activity.distance),
          elapsed_time: summary[name]?.elapsed_time + activity.elapsed_time
        }
      }
    }
    return summary
}