export const languageLocalStorageKey = 'lng'

export const languageList = [
	{
		language: 'English',
		code: 'en',
		symbol: '🇬🇧'
	},
	{
		language: 'Hindi',
		code: 'hi',
		symbol: '🇮🇳'
	},
	{
		language: 'French',
		code: 'fr',
		symbol: '🇫🇷'
	}
]

export const debounce = () => {
	let timeoutIn: null | ReturnType<typeof setTimeout>;

	return (fn: Function, args: Array<any>, time: number = 1000) => {
		if (timeoutIn) {
			clearTimeout(timeoutIn)
		}
		timeoutIn = setTimeout(() => { fn(...args) }, time);
	}
}