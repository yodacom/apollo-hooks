import React from 'react';
import logo from './logo.svg';
import './App.css';

import gql from 'graphql-tag'
import { useQuery useMutation } from '@apollo/react-hooks'

// create a variable called mutation to place our graphql mutation list, use createTacos as an example
const mutation = gql`
  mutation createTaco($name: String! $description: String) {
    createTaco(name: $name, description: $description) {
      id name description
    }
  }
`:
// create a variable called query to place our graphql query list, use listTacos as an example
const query = gql`
  query listTacos {
    items {
      id name description
    }
  }
`;


function App() {
  //need a place to hold the values created from our Form Input using useState Hook. Here as example we are using one for name and one for description
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  
  // useQuery hook passing in the query to return the data in the loading state from the query
  const { loading, data } = useQuery(query)

  // useMutation hook - the return value here is a function called createTaco and a check for errors with error. The first argument is our mutation definition "mutation" The second argument to pass in are the variables we are passing into the mutation: name and description. The third argument to useMutation is the refetch queries that we would like to call after the mutation has been successful: listTacos
  const [createTaco, { error }] = useMutation(mutation, {
    variable: { name, description }, refetchQueries: ["listTacos"]
  })
  if (error) {
    console.log("error":, error)
  }
  if (loading) return <h2>Loading...</h2>
  return (
    <div className="App">
      <input onChange={e => setName(e.target.value)}
      />
      <input onChange={e => setDescription(e.target.value)}
      />
      <button onClick={createTaco}>Create Taco</button>
      {/* map over the items array returned from the query returning the item name and the item description */}
      {
        data.listTacos.items.map((item, index) => {
          <div key={item.id}>
            <h2>{item.name</h2>
            <h4>{item.description</h4>
  
        </div>
      })}
    </div>
  );
}
 
export default App;
