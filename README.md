# Food Square
Social network for food lovers.

Food Square was developed as an open source application as a part of bachelor thesis titled ***Design and implementation of an open source web application about cooking*** by David Poslušný at [***Faculty of Informatics and Statistics of Prague University of Economics and Business***](https://fis.vse.cz).

ℹ️ This bachelor thesis **was defended on 31.1.2023 with the grade of 1**. Link to the paper can be found [**here**](https://vskp.vse.cz/88311). ℹ️

This repository contains source code of the **client side** of the application

The other repository that contains the **server side** of the application can be found [here](https://github.com/itsDaiton/food-square-api).

Live demo of the application can be found here: **https://food-square.site**

![image](https://user-images.githubusercontent.com/72783924/222009100-6076bc96-f99f-4a7c-a3d8-d60eb0c47267.png)




## Features

- **Account**
  - create account in the application
  - sign in from multiple devices
  - edit your account information
  - upload a profile picture
  - follow other users
- **Recipes**
  - create your own recipes
    - add ingredients
    - choose different categories
  - display details about recipe
    - meal type
    - preparation/cooking time
    - instructions
    - categories
    - ingredients and their nutritional values
  - share your recipe between other users
  - add recipes to your favorites
  - filter between recipes based on desired criteria
- **Reviews**
  - review other user's recipes
  - display all existing reviews
  - sort between best/worst rated recipes
  - show reviews for a specific recipe
- **Comments**
  - add multiple comments to recipes
- **Ingredients**
  - display all available ingredients
  - look up specific ingredients
- **Liking**
  - like a comment or a review
- **Meal planning**
  - get a generated meal plan based on:
    - categories
    - amount of meals
    - desired calories
  - save your meal plan
- **Theming**
  - switch between light and dark mode
## Built With
### Framework
- [React.js](https://reactjs.org)

### Styling
- [Material UI](https://mui.com)

### Package management
- [npm](https://www.npmjs.com)

### Additional packages
- [axios](https://axios-http.com) - for sending API requests
- [React Router](https://reactrouter.com) - for client side routing
- [validator.js](https://www.npmjs.com/package/validator) - for validating form inputs
- [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware) - for configuring proxy in local development
## Get Started

### Prerequisites

- [npm](https://www.npmjs.com)

### Installation

Clone the project

```
git clone https://github.com/itsDaiton/food-square.git
```

Open the project

```
cd food-square
```

Install dependencies

```
npm install
```

Configure project variables
- for local development, configure `.env` file
- use `http://localhost:8080` as URL, if you're using API of this project and running it locally
- guide how to locally run the API of this project can be found [here](https://github.com/itsDaiton/food-square-api/blob/main/README.md).
```
REACT_APP_API_URL='local api url' 
```
- for production, configure `.env.production` file
```
REACT_APP_API_URL='api url'
```

Start a local server
```
npm start
```
Create a production build
```
npm run build
```
### Deployment
- Create a feature branch for your changes
- Deploy your code
- After your development is done, create a pull request
## Contributting

Contributions, issues, and feature requests are welcome. If you would like to contribute to this project, please see `CONTRIBUTING`.

## License

Project is distributed under the MIT License. See `LICENSE` for more information.

## Testing

Application testing was carried out using the [***Postman***](https://www.postman.com) software. Collection of all tests can be found [**here**](https://github.com/itsDaiton/food-square-api/tree/main/docs/tests).

## Contact

You can contact the author of the project under this [e-mail](mailto:david.poslusny@gmail.com).

## Acknowledgments

- Ing. Vojtěch Růžička 
