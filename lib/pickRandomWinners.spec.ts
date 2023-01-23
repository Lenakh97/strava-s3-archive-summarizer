import { divideArchiveInClubAndWeek } from "./divideArchiveInClubAndWeek";
import { pickRandomWinners } from "./pickRandomWinners";

describe('pickRandomWinners()', () => {
	it('should generate 5 winners from the correct week', async () => {
		const expected = ["T., V.", "L., M.", "M., P.", "M., K.", "J., N."]
		const divided = await divideArchiveInClubAndWeek(34, './testData/randomWinners')
		const randomWinners = await pickRandomWinners(34, divided, './testData/randomWinners')
		expect(randomWinners['838205'].winner).not.toEqual(expect.arrayContaining(expected))
	})
})
