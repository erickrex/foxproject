import { createApp, provide, h } from 'vue'
import router from './router'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { DefaultApolloClient } from '@vue/apollo-composable'

import App from './App.vue'
import './assets/tailwind.css'

const defaultClient = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
  })

const query = gql`query {
    allUsers { email }
  }`


defaultClient.query({
    query
}).then(res => console.log(res))

createApp(
    {
      setup () {
        provide(DefaultApolloClient, defaultClient)
      },
      render() {
        return h(App)
      }
    }
  ).use(router).mount('#app')

//createApp(App).use(router).mount('#app')