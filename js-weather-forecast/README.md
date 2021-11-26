# weather-forecast

Weather forecast application shows temperatures for
next seven days of selected city. You can choose over
from 200 000 cities. You start typing in input and application
will help you and show you first 15 matches. Values
found for selected city are displayed as 7 boxes and
graph below. All values and cities are drawn from
https://openweathermap.org/api.

## Supported web browsers

1. Mozilla Firefox
2. Google chrome
3. Safari
4. Microsoft Edge

## Installation and start up

Download from git and run index.html file in your web browser.
Html files are run directly, which means you put instead of 
url path, path to file in web browser.

## Inside structure 

Whole application is wrapped in one component named App. This component
links other components together.

### City picker

City picker is component which loads JSON file with cities you can choose
from. Meanwhile, JSON file is loaded input is disabled. After JSON file loads
and parses. User is allowed to search and choose from cities. When user types
whisperer shows first 15 matches.

### Forecast

After selection city this component shows forecast for in city for next
week with temperatures and graph created by external library Chart.js
https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js.

### Sword.js

As internal framework for rendering and DOM manipulation 
is used my framework Sword.js https://github.com/orenholis/Sword.js.