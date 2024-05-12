import { useState, useEffect } from 'react';
import './App.css';

const useImageURL = () => {
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/photos/1", { mode: "cors" }),
          fetch("https://jsonplaceholder.typicode.com/photos/2", { mode: "cors" })
        ]);

        const data = await Promise.all(responses.map(async response => {
          if (!response.ok) {
            throw new Error("Server error!!");
          }
          return await response.json();
        }));

        setImageURLs(data.map((response: { url: string }) => response.url));
      } catch (error) {
        if (error instanceof Error) { 
          setError(error); 
        } else {
          setError(new Error("An unknown error occurred")); 
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { imageURLs, error, loading };
};

function App() {
  const { imageURLs, error, loading } = useImageURL();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <h1>Images</h1>
      {imageURLs.map((imageURL, index) => (
        <div key={index}>
          <img src={imageURL} alt={`Image ${index}`} />
        </div>
      ))}
    </>
  );
}

export default App;
