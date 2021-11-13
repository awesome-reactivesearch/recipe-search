## Description:

The project is a recipe search application which uses **[2.2 million recipes dataset](https://github.com/Glorf/recipenlg)** , to perform search in.

The project aims to showcase the utility potential of the SearchBox libraries (React-SearchBox/ Vue-SearchBox).

##### Key Takeaways:
- Appbase.io is blazing fast :dizzy:(and a good Algolia alternative).
- Appbase.io's low latency on a large dataset with recipe search.
- You can do advanced search relevance features - that help with engagement and conversions (through the use of : popular suggestions, recent suggestions, synonyms, query rules et al) that can't be done otherwise with something like Typesense or Elasticsearch itself.

> #### The project is demonstrated using two different frontend libs/ frameworks, namely, `React` & `Vue`.
##  :punch: Recipe Search : `React`

### CodeSandbox :

<iframe src="https://codesandbox.io/embed/quizzical-wood-4rh1v?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="recipe-search-react"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
### App Preview :
![image](https://user-images.githubusercontent.com/57627350/127728792-8dba8707-90e7-4ea4-90c9-4a60ebaaf6b5.png)


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
