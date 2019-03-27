## kitchen soup

information system for a soup kitchen

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run dev`

Runs the above npm start script and the server script.<br>
The web server will run on [http://localhost:5000](http://localhost:5000).


## Dev notes for Julian, Victoria, Maylene:

- using a non-relational database because it's easier<br>
- normalizing the ingredients list from recipes doesn't make sense<br>
- our data is very dependent (some inventory entries would have donor data, others not); doesn't make sense to enforce with a SQL database<br>
(peep nonrelational vs relational)<br>
- you'll have to change our ER diagram submissions to reflect this change and justify the change in the report<br>