import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./StoryDetail.css";
function StoryDetail() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the specific story by ID
    axios
      .get(`https://mxpertztestapi.onrender.com/api/sciencefiction/${id}`)
      .then((response) => {
        setStory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!story) {
    return <div>Story not found!</div>;
  }

  return (
    <div className="story-detail">
      <h1>{story.Title}</h1>
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

      {/* Story Adventure Section */}
      {story.Storyadvenure && (
        <div className="story-adventure">
          <h3>{story.Storyadvenure.Storytitle}</h3>
          {story.Storyadvenure.content.map((contentItem) => (
            <div key={contentItem._id}>
              {/* Display story content images */}
              {contentItem.Storyimage &&
                contentItem.Storyimage.map((img, idx) => (
                  <img
                    key={idx}
                    src="/download.jpeg"
                    style={{ width: "40px", height: "40px" }}
                    alt={`Content Image ${idx}`}
                    className="content-image"
                  />
                ))}
              {/* Display story paragraphs */}
              {contentItem.Paragraph &&
                contentItem.Paragraph.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
            </div>
          ))}
        </div>
      )}

      {/* Word Explore Section */}
      <div className="word-explore">
        <h3>Word Explore</h3>
        {story.Wordexplore &&
          story.Wordexplore.map((word, idx) => (
            <div key={word._id} className="word-card">
              <h4>{word.Storytitle}</h4>
              <p>
                <strong>Noun:</strong> {word.Noun}
              </p>
              <p>
                <strong>Meaning:</strong> {word.Storyitext}
              </p>
              <p>
                <strong>Synonyms:</strong> {word.Synonyms}
              </p>
              <p>
                <strong>Antonyms:</strong> {word.Antonyms}
              </p>
              <img
                src={word.Storyimage[0]}
                alt={word.Storytitle}
                className="word-image"
              />
            </div>
          ))}
      </div>

      {/* Brain Quest Section */}
      <div className="brain-quest">
        <h3>Brain Quest</h3>
        {story.Brainquest &&
          story.Brainquest.map((quest, idx) => (
            <div key={quest._id} className="quest-card">
              <p>
                <strong>Question:</strong> {quest.Question}
              </p>
              <ul className="ans">
                {quest.Option.map((option, idx) => (
                  <li key={idx}>{option}</li>
                ))}
              </ul>
              <p>
                <strong>Answer:</strong> {quest.Answer}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default StoryDetail;
