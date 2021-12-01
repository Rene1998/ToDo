import moment from 'moment'


export const _endsIn = (deadline: Date):string => {
	const duration = moment.duration(moment.unix(Number(deadline)).diff(moment()))

	const years = Math.abs(duration.years())
	const months = Math.abs(duration.months())
	const days = Math.abs(duration.days())
	const hours = Math.abs(duration.hours())
	const minutes = Math.abs(duration.minutes())
	const seconds = Math.abs(duration.seconds())

	return `
		${ years ? `${years} ${years == 1 ? 'year' : 'years'},` : '' }
		${ months ? `${months} ${months == 1 ? 'month' : 'months'},` : '' }
		${ days ? `${days} ${days == 1 ? 'day' : 'days'},` : '' }
		${ hours ? `${hours} ${hours == 1 ? 'hour' : 'hours'},` : '' }
		${ minutes ? `${minutes} ${minutes == 1 ? 'minute' : 'minutes'},` : '' }
		${ seconds ? `${seconds} ${seconds == 1 ? 'second' : 'seconds'}` : '' }
	` //expected output: 2 years, 1 month, 13 days, 13 hours, 5 minutes, 14 seconds
}

export const _created_at = (date: number):string => moment.unix(date).format('MMM D[,] YYYY')

export const _formatDeadline = (deadlineDate: string, deadlineTime: string): number => 
	moment(`${deadlineDate} ${deadlineTime}`, 'yyyy-MM-DD HH:mm').unix()
