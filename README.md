# Readme #
- Current work in progress as a base webpack config file to mimic a similar build and folder structure to the process we have currently. 

Currently does the following:
    - Sass compilation + Post CSS autoprefixer
    - Babel ES6 conversion
    - hot-reload CSS (haven't tested how robust JS hot reload is)
    - It's fundamentally just a webpack config file
    - in theory can handle webpack,vue,whatever...

## My thoughts on this...
Right now my priority is to get features in to meet the 'what does the boilerplate need' list. I believe that all of these can be met, but will definitely need more time to get this all working. I don't expect that what i've done here will be the solution, but I think there are a lot of ideas that could be pulled into the eventual solution. Happy to discuss this further in channel :).

To get it up and running:
- Git pull this repo
- npm run build 
- npm run serve