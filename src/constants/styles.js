export const colors = {
	  deepBlue: `#071F45`
	, blue: `#2C4770`
	, lightBlue: `#5481C8`
	, paleBlue: `#6A7D9C`
	, gray: `#C8CED9`
	, white: `#FDFDFD`
};

export const addButtonStyle = {
	  border: `none`
	, borderRadius: 4
	, backgroundColor: colors.paleBlue
	, color: colors.white
	, margin: `15px 0 0 15px`
	, display: `inline-block`
	, ':focus': {
		outline: `none`
	}
	, ':hover': {
		backgroundColor: colors.lightBlue
	}
};