import regex from './helpers/regex'
import { WorkingHoursType } from '../api/storesApi'
import { format, getDay, getHours, getMinutes, parseISO } from 'date-fns'
import { ProductType } from '../api/productApi'
import { createAlert } from '../components/Alert'
import { log } from 'expo-updates/build-cli/utils/log'

export const validateEmail = (email: string) => {
	return regex.email.test(email.trim())
}
export const capitalizeFirstLetter = (str: string) => {
	const capitalizedString = str.charAt(0).toUpperCase() + str.slice(1)
	return capitalizedString
}
const daysOfWeek: (keyof WorkingHoursType)[] = [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
]
export const getCurrentDayName = () => {
	const date = new Date()
	const currentDayOfWeek = getDay(date)
	const currentDay = daysOfWeek[currentDayOfWeek]
	return currentDay.toLowerCase()
}

export const getFormatDateToString = (dateString: string) => {
	if (!dateString) return ''
	const date = parseISO(dateString)

	return format(date, 'd MMMM HH:mm')
}
export const deliveryPrice = 70
export const splittingWord = (str) => {
	const words = str?.match(/[A-Z][a-z]+/g)

	if (!words) {
		return ''
	}

	const transformedWords = words.map((word, index) => {
		if (index === 0) {
			return word
		} else {
			return word.toLowerCase()
		}
	})

	return transformedWords.join(' ')
}
export const getTotalPriceOrder = (
	products: {
		amount: number
		product: ProductType
	}[]
) => {
	return products?.reduce((acc, product) => {
		return acc + product?.amount * product?.product?.price
	}, 0)
}

export const getCurrentUntilTimeStoreTo = (workingHoursStores: WorkingHoursType) => {
	if (!workingHoursStores) return ''
	const currentDay = getCurrentDayName()
	const currentHourWorkStores = workingHoursStores[currentDay]
	if (currentHourWorkStores === 'Closed') return 'Closed today'
	const utilTimeStore = currentHourWorkStores?.slice(-5) // get time work(to)
	return utilTimeStore
}
const getInfoTime = (open: boolean, time?: string) => {
	if (time === 'Closed') return 'Closed'
	return `Will ${open ? 'open' : 'close'} at ` + time ?? ''
}

export function isCurrentTimeInRange(workingHoursStores: WorkingHoursType, isInfo = false): any {
	if (!workingHoursStores) return ''
	const date = new Date()
	const currentDayName = getCurrentDayName()

	const currentDayIndex = daysOfWeek.indexOf(currentDayName as keyof WorkingHoursType)
	const nextDayIndex = (currentDayIndex + 1) % 7 // Вычисляем индекс следующего дня
	const nextDayName = daysOfWeek[nextDayIndex]
	const [startTimeNextDay, endTimeNextDay] = workingHoursStores[nextDayName]?.split(' - ')
	const currentHourWorkStores = workingHoursStores[currentDayName]

	if (!currentHourWorkStores || currentHourWorkStores === 'Closed') {
		if (isInfo) return getInfoTime(true, startTimeNextDay)
		return false
	}
	const [startTime, endTime] = currentHourWorkStores?.split(' - ')

	const currentHour = getHours(date)
	const currentMinute = getMinutes(date)

	const [startHour, startMinute] = startTime?.split(':').map(Number)
	const [endHour, endMinute] = endTime?.split(':').map(Number)

	if (startHour > endHour) {
		// Режим работы переходит через полночь
		if (
			currentHour > startHour ||
			(currentHour === startHour && currentMinute >= startMinute) ||
			currentHour < endHour ||
			(currentHour === endHour && currentMinute < endMinute)
		) {
			// Время находится в интервале между началом и концом рабочего дня
			return isInfo ? getInfoTime(false, endTime) : true
		} else {
			// Время находится за пределами рабочего интервала
			return isInfo ? getInfoTime(true, startTimeNextDay) : false
		}
	} else {
		// Режим работы не переходит через полночь
		if (
			(currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) &&
			(currentHour < endHour || (currentHour === endHour && currentMinute < endMinute))
		) {
			// Время находится в интервале между началом и концом рабочего дня
			return isInfo ? getInfoTime(false, endTime) : true
		} else {
			// Время находится за пределами рабочего интервала
			return isInfo ? getInfoTime(true, startTime) : false
		}
	}
}
