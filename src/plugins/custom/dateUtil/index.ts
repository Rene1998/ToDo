import moment from 'moment'


export const _endsIn = (deadline: Date):string => {
	const duration = moment.duration(moment.utc(deadline).diff(moment()))

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
	`
}

export const _created_at = (date: number):string => moment.unix(date).format('MMM D[,] YYYY')