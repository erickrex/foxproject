import { createApp } from 'vue'
import router from './router'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import App from './App.vue'

const defaultClient = new ApolloClient({
    uri: 'https://www.onegraph.com/graphiql',
    cache: new InMemoryCache()
  })

const query = gql`query TwitterDevTo {
    twitter {
      homeTimeline {
        tweets {
          text
        }
      }
    }
    devTo {
      articles {
        nodes {
          title
        }
      }
    }
  }`


defaultClient.query({
    query
}).then(res => res.json()).then(res => console.log(res))

createApp(App).use(router).mount('#app')