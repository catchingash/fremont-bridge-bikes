# Fremont Bridge Bikes #
[See it live!](http://catchingash.github.io/fremont-bridge-bikes/)

## Known issues ##
  - The weather data is currently unavailable. The API that I was using has restricted access to historical data, and I have not had a chance to find a new API.
  - The weather is not synced correctly for users that are not located in Seattle, or if the current daylight savings do not match the daylight savings on the date viewed.

## Initial Project Roadmap ##
1. What is the goal of the project?
  - To provide a visual representation of bike traffic on the Fremont bridge.
1.  Who is the target audience (can be just yourself)?
  - Curious Seattle residents who are interested in biking culture.
1. What are your personal learning goals?
  - Integrating with 3rd party APIs
  - Learning more about how to animate
  - Learn more about how to visually represent data
  - Learn more about how to create a visually minimalist design
1. What technologies/frameworks/patterns will you be employing?
  - This will be done entirely in HTML/CSS + JavaScript.
  - All testing will be completed manually.
  - Data from APIs:
    - [Fremont Bridge Bike Traffic](https://data.seattle.gov/resource/65db-xm6k.json) from the City of Seattle (powered by Socrata)
    - [Historical weather data](http://openweathermap.org/history) from Open Weather Map
1. What are the tech and/or skill dependencies of your project?
  - Some math for determining how many bike images + rate of movement based on the data
  - Integrating with 3rd party APIs
  - CSS animations
1. What does success look like for this project? What does _done_ mean?
  - The final product will display the hourly weather and bike traffic for a given day.
    - The bike traffic will be displayed either as a list of hours with animations for bike traffic for each hour, or as a single time-lapse of the entire day.
  - The user can choose the day displayed.
