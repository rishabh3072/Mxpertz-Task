import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import StoryDetail from "./StoryDetail.js"; // Import StoryDetail component

function App() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://mxpertztestapi.onrender.com/api/sciencefiction")
      .then((response) => {
        setStories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Router>
      <div className="App">
        <h1>Science Fiction Stories</h1>

        <Routes>
          {/* Main route to show the story listing */}
          <Route
            path="/"
            element={
              <div className="stories-container">
                {stories.map((story) => (
                  <div key={story._id} className="story-card">
                    <h2>{story.Title}</h2>
                    <p>
                      <strong>Status:</strong> {story.Status}
                    </p>

                    {/* Display story images */}
                    <div className="story-images">
                      {story.Image &&
                        story.Image.map((image, index) => (
                          <img
                            key={index}
                            src="/download.jpeg"
                    style={{ width: "40px", height: "40px" }}
                            alt={`Story Image ${index}`}
                            className="story-image"
                          />
                        ))}
                    </div>

                    {/* Link to open detailed story page in new tab */}
                    <a
                      href={`/story/${story._id}`}
                      target="_blank" // Open in new tab
                      rel="noopener noreferrer" // Security best practice
                      className="details-link"
                    >
                      Read Full Story
                    </a>
                  </div>
                ))}
              </div>
            }
          />

          {/* Route for story details */}
          <Route path="/story/:id" element={<StoryDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
