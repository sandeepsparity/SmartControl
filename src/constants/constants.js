// TEMPERATURE SCREEN 
export const TEMPERATURE_ACTIONS = {
  HEAT :'heat',
  RESET:'reset',
  COOL :'cool' 
};
const buttonStyles = (backgroundColor) => 
{
  return { 
    marginBottom: 15,
    backgroundColor: backgroundColor,
    marginLeft: 20,
    marginRight: 20,
    height: 60 
  };
};
export const ACTION_BUTTON_STYLE = {
  HEAT : buttonStyles('rgb(241, 101, 39)'),
  RESET: buttonStyles('rgb(177,181,184)'),
  COOL : buttonStyles('rgb(106, 194, 191)')
};
export const ACTION_BUTTON_TEXT = {
  HEAT :'WARM MY PLACE',
  RESET:'I"M COMFY',
  COOL :'COOL MY PLACE'
};




