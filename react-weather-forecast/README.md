# weather-forecast

Weather forecast application shows temperatures for
next seven days of selected city. You can choose over
from 200 000 cities. You start typing in input and application
will help you and show you first 15 matches. Values
found for selected city are displayed as 7 boxes and
graph below. All values and cities are drawn from
https://openweathermap.org/api. 

For downloading weather data you will need api key which
you found after registration at this link https://home.openweathermap.org/api_keys.
After that copy key and in file `src/scrpits/index.jsx` replace on the line 13
text `Your api key` with you key.

## Supported web browsers

1. Mozilla Firefox
2. Google chrome
3. Safari
4. Microsoft Edge

## Installation and start up

If you want to run project locally you must follow all steps described
below. For running this project you will need nodejs and npm. On this 
page https://medium.com/@hayasnc/how-to-install-nodejs-and-npm-on-mac-using-homebrew-b33780287d8f 
is short guide how to install them on MacOS.

### SASS

For building sass scripts you will need to install sass compiler, which
can be installed in terminal executing command `npm install -g sass`.
After installation, you can simply run `sass [file name].sass [file name].css`
which builds your sass into css file named as you described in command. 

### Project

1. Download from git
2. Open directory react-weather-forecast in terminal with `cd react-weather-forecast`
3. Run `npm i` in terminal
4. Run `npm start` in terminal

You can open app at http://localhost:3000/ in you web browser.

## Inside structure 

Whole application is written in React.js https://reactjs.org/ which is
third party frontend framework from Facebook. 
Main component ReactApp which component links other components together.

### City picker

City picker is component which loads JSON file with cities you can choose
from. Meanwhile, JSON file is loaded input is disabled. After JSON file loads
and parses. User is allowed to search and choose from cities. When user types
whisperer shows first 15 matches.

### Forecast

After selection city this component shows forecast for in city for next
week with temperatures and graph created by external library Chart.js
https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js.