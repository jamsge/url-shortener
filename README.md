This is a simple URL shortener that I made using Node.js and Express for my Free Code Camp API and Microservice certification.

## How to use
First install dependencies in the newly cloned repository using
`npm install`

To start the service, do
`npm start`
and the service will start running on port 3000.  

To create a new shortened URL, `POST` a URL address (with field name "url") to /api/shorturl/new. The shortened URL is returned in field "shortened_url."
URLs should follow the format `http(s)://www.domain.com/routes/if/you/have/them

To visit the URL using the new shortened URL, go to /api/shorturl/{short_url} and you should be redirected to the the corresponding site.

## How it works
All URLs are retrieved, added, and saved in the "urls.json" file inside of an array. The URL's index in the array corresponds the the short_url returned to the user after the POST request.

## Future TODO that I hopefully remember to work on:
- [] Create a spiffy looking index page with functional GET and POST test forms
- [] Use a database like mongo instead of a JSON file to store URLs
- [] Add comments to code to explain what the heck is going on
