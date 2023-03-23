import AWS from 'aws-sdk'
import { divideArchiveInClubAndWeek } from './lib/divideArchiveInClubAndWeek.js'
//import { pickRandomWinners } from './lib/pickRandomWinners.js'
import { pickRandomWinners2 } from './lib/pickRandomWinners2.js'
import { weekFolderName } from './lib/weekFolderName.js'
import { weekNumber } from './lib/weekNumber.js'
//import { sendMail } from './sendMail.js'

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  })

export type Winners = Record<string,{winner: string[];}>

const sendWinnersToBucket = async (folderName: string) => {
    const week = weekNumber()
    const weekFolder = weekFolderName()
	  const divided = await divideArchiveInClubAndWeek(week, folderName)
    console.log('divided', divided)
    const winners = await pickRandomWinners2(week,divided, folderName)
    const winners2 = await pickRandomWinners2(week,divided, folderName)
    console.log('2',winners2)
    console.log(winners)
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
        }*/
        
      });
      /*const json = JSON.stringify(winners)
      const parsed = JSON.parse(json)
      const content = (`Winners week ${week}:` + 
      '<br> <b>Omega:</b> ' + 
      parsed['232813'].winner.map((winnerName: string) => '<br>' + winnerName ) +
      '<br> <b>Oslo:</b>' + 
      parsed['838200'].winner.map((winnerName: string) => '<br>' + winnerName ) +
      '<br> <b>Trondheim:</b>' + 
      parsed['838203'].winner.map((winnerName: string) => '<br>' + winnerName ) +
      '<br> <b>Finland: </b>' + 
      parsed['838205'].winner.map((winnerName: string) => '<br>' + winnerName ) +
      '<br> <b>APAC: </b>' + 
      parsed['838207'].winner.map((winnerName: string) => '<br>' + winnerName ) +
      '<br> <b>USA: </b>' + 
      parsed['838209'].winner.map((winnerName: string) => '<br>' + winnerName ) +
      '<br> <b>Europe:</b>' + 
      parsed['838211'].winner.map((winnerName: string) => '<br>' + winnerName ) +
      '<br> <b>Poland:</b>' + 
      parsed['982093'].winner.map((winnerName: string) => '<br>' + winnerName ))
    sendMail(week, content)*/
}

sendWinnersToBucket('./archive');