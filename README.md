## Description:

The project is a recipe search application which uses **[2.2 million recipes dataset](https://github.com/Glorf/recipenlg)** , to perform search in.

The project aims to showcase the utility potential of the SearchBox libraries (React-SearchBox/ Vue-SearchBox).

##### Key Takeaways:
- Appbase.io is blazing fast :dizzy:(and a good Algolia alternative).
- Appbase.io's low latency on a large dataset with recipe search.
- You can do advanced search relevance features - that help with engagement and conversions (through the use of : popular suggestions, recent suggestions, synonyms, query rules et al) that can't be done otherwise with something like Typesense or Elasticsearch itself.

> #### The project is demonstrated using two different frontend libs/ frameworks, namely, `React` & `Vue`.
##  :punch: Recipe Search : `React`

### App Preview :


### Structure:

- **Assets Directory -**
Assets like images that can be used in the app.

- **Helper Directory -**

    Contains constants and util functions used throughout the code.

- **Components Directory -**

    Elements or UI components that can be used in pages to build meaningful content.

### Steps to get started:

Install the dependencies using : `npm install`(or yarn)

> Create an .env file with
`REACT_APP_APPBASE_URL = YOUR_APPBASE_URL`
`REACT_APP_APPBASE_APP_NAME = APPBASE_INDEX_NAME`
`REACT_APP_APPBASE_APP_CREDENTIALS = APPBASE_CREDENTIALS`

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm build`

Creates fresh build
