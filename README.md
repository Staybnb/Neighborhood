# Neighborhood
This module displays information about the neighborhood of a specific Staybnb listing. 

## Related Projects

  - https://github.com/Staybnb/Nav
  - https://github.com/Staybnb/Listing_Description
  - https://github.com/Staybnb/Booking
  - https://github.com/Staybnb/Reviews

## Development
The database `seed` script will create a local PostgreSQL database that is configured in `database/index.js`. It relies upon a `config.js` file that you must create at the root level of the project with your PostgreSQL database's username (`localDBUser`) and password (`localDBpw`).

From within the root directory:

```sh
npm install
```

To run the application in non-development mode from within the root directory:
```sh
# Compile bundle.js using Webpack
npm run react-prod

# Create the local database
npm run seed

# Start server on localhost
npm start
```

Then access the application at: http://localhost:3001

## Data Schema
This module's data is stored in a PostgreSQL database. There are three tables: 
* **Listings:** each record corresponds to one listing on Staybnb, and includes location information (lat/long) and host-inputted descriptions.
* **Neighborhoods:** each record corresponds to one of 15 neighborhoods in which all listings are located, and includes identifying names for different geographic levels related to the neighborhood as well as seven features of the neighborhood.
* **Landmarks:** each record corresponds to a well-known landmark in London, along with its location (lat/long). This data will be used to display to the client the five nearest landmarks to a given listing.

The schema is shown below.

![database schema](https://github.com/Staybnb/Neighborhood/blob/master/NeighbSchema.png)
