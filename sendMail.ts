import AWS from 'aws-sdk'

const email = new AWS.SES({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,

	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

export const sendMail = async (week: number, content: any) => {
	var params = {
		Destination: {
			BccAddresses: [],

			CcAddresses: [],

			ToAddresses: [
				'lena.haraldseid@nordicsemi.no',
				'hakon.haugen@nordicsemi.no',
				'lenakh@stud.ntnu.no',
			],
		},

		Message: {
			Body: {
				Html: {
					Charset: 'UTF-8',

					Data: content,
				},

				Text: {
					Charset: 'UTF-8',

					Data: JSON.stringify(content),
				},
			},

			Subject: {
				Charset: 'UTF-8',

				Data: `Winners week ${week}`,
			},
		},

		Source: 'lena.haraldseid@nordicsemi.no',
	}

	email.sendEmail(params, function (err, data) {
		if (err) console.log(err, err.stack) // an error occurred
		else console.log('success', data)
	})
}
