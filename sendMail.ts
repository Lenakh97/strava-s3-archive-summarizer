import AWS from 'aws-sdk'
const email = new AWS.SES({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  })
export const sendMail= async(week : number) => {
    var params = {
        Destination: {
         BccAddresses: [
         ], 
         CcAddresses: [
            "lena.haraldseid@nordicsemi.no"
         ], 
         ToAddresses: [
            "kaja.koren@nordicsemi.no"
        
         ]
        }, 
        Message: {
         Body: {
          Html: {
           Charset: "UTF-8", 
           Data: "This message body contains HTML formatting. It can, for example, contain links like this one: <a class=\"ulink\" href=\"http://docs.aws.amazon.com/ses/latest/DeveloperGuide\" target=\"_blank\">Amazon SES Developer Guide</a>."
          }, 
          Text: {
           Charset: "UTF-8", 
           Data: "This is the message body in text format."
          }
         }, 
         Subject: {
          Charset: "UTF-8", 
          Data: `Winners week ${week}`
         }
        }, 
        ReplyToAddresses: [
        ], 
        ReturnPath: "", 
        ReturnPathArn: "", 
        Source: "lena.haraldseid@nordicsemi.no", 
        SourceArn: ""
       };
    email.sendEmail(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);    
    });
}