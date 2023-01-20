import type { NextPage } from 'next'
import Head from 'next/head'
import {Form } from '../components/index'

const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Fetchrewards</title>
        <link rel="icon" href="https://fetch.com/favicon.png" type="image/png"/>
      </Head>
      <Form/>

    </div>
  )
}

export default Home
