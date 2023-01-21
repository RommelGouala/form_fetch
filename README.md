# Next.js + Tailwind CSS Example

This example shows how to use [Tailwind CSS](https://tailwindcss.com/) [(v3.2)](https://tailwindcss.com/blog/tailwindcss-v3-2) with Next.js. It follows the steps outlined in the official [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs).

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) or preview live with [StackBlitz](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-tailwindcss)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss&project-name=with-tailwindcss&repository-name=with-tailwindcss)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-tailwindcss with-tailwindcss-app
```

```bash
yarn create next-app --example with-tailwindcss with-tailwindcss-app
```

```bash
pnpm create next-app --example with-tailwindcss with-tailwindcss-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

# form_fetch

## Description

A responsive webpage with a user creation form.

* Check the Webpage: 

https://form-fetch-r.netlify.app/

or Copy Url

```bash 
https://form-fetch-r.netlify.app/
```

## Installation
Clone the repository
Copy code
```bash
git clone https://github.com/RommelGouala/form_fetch.git
```
Install dependencies
Copy code
```bash
npm install
```
Start the development server
Copy code

```bash
npm run dev
```

## Usage

To use the Form component, follow these steps:

* Clone the repository to your local machine by running 
```bash 
git clone https://github.com/RommelGouala/form_fetch.git
```
in your terminal.

* Navigate to the project directory by running cd FetchForm.
* Install the necessary dependencies by running npm install or yarn install.
* Start the development server by running 
```bash
npm run dev
```
or 
```bash
yarn dev
```

* Open your browser and navigate to http://localhost:3000 to view the Form component.
* To submit the form, make sure to fill in the required fields and click the submit button.
* If the form is submitted successfully, a message will be displayed indicating that the form has been posted.
* You can also use the Form component in your own project by importing it and using it in your code.

* To import the component, add this line of code at the top of your file:

Copy code
```bash
import Form from './components/Form'
```

* Then, you can use the component in your JSX like this:

Copy code
```bash
<Form />
```
Make sure to provide the necessary dependencies and configurations to make the Form component work properly in your project.

Please Note that you will have to provide the correct url for the form to work.

# Environment Variables
You will need to create a .env file in the root directory and set the following environment variables:

NEXT_PUBLIC_Fetch_Form_API: The url to fetch the data for the form.
Please make sure that this file is included in the .gitignore file so that the sensitive information is not uploaded on Github.

* Get request: will make a request to the backend and populate the options inside the states and occupations Select input elements.
* Post request: send the form to the same address mentioned above "NEXT_PUBLIC_Fetch_Form_API".


For examples: 

Data req from Back End                                                   

| Data req from Back End        |
| ------------------------------|
| {                                              
|    "occupations":[     
|                "occupations1",    
|                "occupations2",     
|                "occupations3",      
|                                ],                        
|   "states": [                
|                {"name": "Alabama","abbreviation": "AL"},   
|                {"name": "Alaska","abbreviation": "AK"}     
|                ]                                               
|    }                            



| Data send to Back End:  The User Form submission |
|:------------------------------------------------:| 
|{                                                                  
|    "name": yourname, 
|    "email": youremail, 
|    "password": yourpassword,
|    "occupations": occupations3,
|   "state": {"name": "Alaska","abbreviation": "AK"}
|}                                                   




