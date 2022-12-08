import { allData } from "./summarizeTeamData";


type Summary = Record<string,{
  distance: number;
  elapsed_time: number;}>

export const summarizeActivities = (activityData: allData): Record<string,{
    distance: number;
    elapsed_time: number;
  }> => {
    
    const summary = {} as Summary
    for (const activity of activityData){
      let activityName = ""
      activityName = activity.type
      if (summary[activityName] === undefined){
        summary[activityName] = {
          distance:  activity.distance,
          elapsed_time:  activity.elapsed_time
        }
      }
      else{
        summary[activityName] = {
          distance: summary[activityName]?.distance + (activity.distance),
          elapsed_time: summary[activityName]?.elapsed_time + activity.elapsed_time
        }
      }
    }
    return summary
}