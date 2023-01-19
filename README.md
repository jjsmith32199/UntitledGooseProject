# UntitledGooseProject
This is a project for webpage 'CinEvents'

## Task for UntitledGooseProject

In this project, the task is to build and create a real-world front-end application with following requirements:

* Use a CSS framework other than Bootstrap.

* Building an interactive and responsive webpage.

* Use at least two server-side APIs.

* Does not use alerts, confirms, or prompts (use modals).

* Use client-side storage to store persistent data.

* Have a polished UI.

## User Story

```
AS AN avid film lover,
I WANT to be informed on the real-world historical context of the film
SO THAT I [ ]
```

## Acceptance Criteria
```
GIVEN CinEvent webpage with form inputs
WHEN I search for a movie title
THEN I am presented with movie title, year, director(s), actors, video trailer, and comtemporary events those are related to its year 
WHEN I click 'Add to Watch List' button
THEN I can save that movie to watch list
WHEN I click 'Watch List' button
THEN I am presented with the list of added movies, and if I click the button again, watch list is hidden
```

## Description

* A link to deployed application:

The following images demonstrate the application functionality:
![CinEvents Webpage.](./assets/images/[filename])


![CinEvents Webpage with result.](./assets/images/[filename])

![Watch List for CinEvents Webpage.](./assets/images/[filename])



## How to use

* User can search movie information by seraching movie name from search bar next to 'Watch List' button. Search input is not uppercase/lowercase sensitive, but it is recommended that user inputs precise movie name for the accurate result. (Note: Movie name must be searched without its released year.)

* User can add the searched movie to their watchlist by clicking 'Add to Watch List' button above the movie title. 

* User can see or hide their watch list by clicking 'Watch List' button next to the search bar. 

* **Note:** There is a quota limit for Youtube API. After user search certain amount of movie names, Youtube trailer may not available. If Youtube video trailer is not available due to server issue or fail to load due to quota limit, it will show error message, "Sorry! Trailer is not found/available!" 


## Directions for Future Development

* Indicator for how much Youtube quota has left **OR** implement Youtube trailer with no quota limit

* Optimization for Youtube API (Currently, Youtube trailer loads little slower than OMDB and Wikipedia data.)

* 

## Credits

* Justin Smith(@jjsmith32199)

* Christopher Hughey(@eddercoppen)

* Taeyoung Park(@taeyoungP)

* Jonathan Aguilar(@aguilarj5)


> * OMDB API: [link]

> * Youtube API: https://developers.google.com/youtube/v3/docs/search/list  |  How to utilize Youtube API, referenced from: https://stackoverflow.com/questions/18953499/youtube-api-to-fetch-all-videos-on-a-channel 

> * Wikipedia API: [link]

> * CSS Framework used for this project: Bulma, [link]

> * Code to move item in the array to end of the list: https://stackoverflow.com/questions/24909371/move-item-in-array-to-last-position

> * How to create Modal Box, referenced from: https://www.w3schools.com/howto/howto_css_modals.asp 

- - -