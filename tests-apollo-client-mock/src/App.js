import { useQuery, gql } from "@apollo/client";
import "./App.css";

export const GET_ALL_WILDERS = gql`
  query ReadWilders {
    readWilders {
      id
      name
      city
      bio
      avatarUrl
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_ALL_WILDERS);
  console.log('%c⧭', 'color: #ff0000', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return (
    <div className="App">
      {data.readWilders.map((w) => (
        <li key={w.id}>{w.name}</li>
      ))}
    </div>
  );
}

export default App;
