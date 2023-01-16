import AWS from 'aws-sdk'
import { divideArchiveInClubAndWeek } from './lib/divideArchiveInClubAndWeek.js'
import { pickRandomWinners } from './lib/pickRandomWinners.js'
import { weekFolderName } from './lib/weekFolderName.js'
import { weekNumber } from './lib/weekNumber.js'
import { sendMail } from './sendMail.js'
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  })


export type Winners = Record<string,{winner: string[];}>

const sendWinnersToBucket = async () => {
    const week = weekNumber()
    const weekFolder = weekFolderName()
	const divided = await divideArchiveInClubAndWeek(week)
    const winners = await pickRandomWinners(week,divided)
    const body = JSON.stringify(winners, null, 2)
    var params = {
        Body: body, 
        Bucket: "strava-winners", 
        Key: `winners-${weekFolder}`
       };
       s3.putObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
        /*
        data = {
         ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
         VersionId: "Bvq0EDKxOcXLJXNo_Lkz37eM3R4pfzyQ"
        }
        */
      });
      console.log(week)
      console.log(weekFolder)
      console.log(divided)
    sendMail(week)

    //email Håkon
}

sendWinnersToBucket();