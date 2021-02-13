export const loadingSpinner = document.querySelector('#loading-spinner');
export const locationNameLabel = document.querySelector('#location-name');
export const postInput = document.querySelector('#post-input');
export const regex = new RegExp(/\d{3}-?\d{4}/);

export const generateLabel = (tag, prependTo, id, className) => {
	if (document.querySelector(`#${id}`)) {
		document.querySelector(`#${id}`).remove();
	}
	const label = document.createElement(tag);
	if (className) {
		label.classList.add(className);
	}
	if (id) {
		label.id = id;
	}
	prependTo.prepend(label);

	return document.querySelector(`#${id}`);
};

export function getLocationName(api) {
	//takes api results & filters parameters
	const validTypes = api
		.filter(
			(item) =>
				(item.types.includes('postal_code') ||
					item.types.includes('country')) === false
		)
		.map((item) => item.long_name)
		.reduce((next, curr) => curr + ', ' + next);
	return validTypes;
}

export function pickDay(day) {
	const daysOfTheWeek = {
		0: 'Sunday',
		1: 'Monday',
		2: 'Tuesday',
		3: 'Wednesday',
		4: 'Thursday',
		5: 'Friday',
		6: 'Saturday',
	};
	return daysOfTheWeek[day];
}
