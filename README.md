## Description:

The project is a recipe search application which uses **[2.2 million recipes dataset](https://github.com/Glorf/recipenlg)** , to perform search in.

The project aims to showcase the utility potential of the SearchBox libraries (React-SearchBox/ Vue-SearchBox).

##### Key Takeaways:
- Appbase.io is blazing fast :dizzy:(and a good Algolia alternative).
- Appbase.io's low latency on a large dataset with recipe search.
- You can do advanced search relevance features - that help with engagement and conversions (through the use of : popular suggestions, recent suggestions, synonyms, query rules et al) that can't be done otherwise with something like Typesense or Elasticsearch itself.

> #### The project is demonstrated using two different frontend libs/ frameworks, namely, `React` & `Vue`.
##  :punch: Recipe Search : `Vue`

### App Preview :
![image](https://user-images.githubusercontent.com/57627350/127728948-3f97098e-ea7c-4716-87f5-9157376776bf.png)

### Structure:

**Assets Directory -**
Assets like images that can be used in the app.

Elements or UI components that can be used in pages to build meaningful content.

**Components Directory -**

Elements or UI components that can be used in pages to build meaningful content.

### Steps to get started:

Install the dependencies using : `npm install`(or yarn)

Create an .env file with  
`VUE_APP_APPBASE_URL = YOUR_APPBASE_URL`  
`VUE_APP_APPBASE_APP_NAME = APPBASE_INDEX_NAME`  
`VUE_APP_APPBASE_APP_CREDENTIALS = APPBASE_CREDENTIALS`

#### Compiles and hot-reloads for development

```
npm run serve
```

#### Compiles and minifies for production

```
npm run build
```

#### Lints and fixes files

```
npm run lint
```
