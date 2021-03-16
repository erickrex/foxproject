import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

//testing ApolloClient, had to import react??
const defaultClient = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql/',
    cache: new InMemoryCache()
})

const query = gql`
    query {
        characters {
            results {
                name
            }
        }
    }
`

defaultClient.query({
  query
})
  .then(res => console.log(res))

createApp(App).use(router).mount('#app')