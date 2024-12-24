import React, { useState } from "react";
import Howto from "./Howto";
import toast from "react-hot-toast";

const GenAi = ({ isLoggedIn }) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/GenAi", {
        method: "POST", // Use POST to send data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ responses: message }), // Send the 'message' as 'responses'
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json(); // Parse the JSON data
      console.log(data); // Log or handle the data as needed

      toast.success("Data successfully fetched!");
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  };
  return (
    <>
      <div className="container mb-4">
        {/* Medium-sized heading */}
        <h1 className="title is-4">GenNotes</h1>

        {/* Paragraph describing GenNotes */}
        <p className="content is-medium">
          GenNotes is a powerful and intuitive SaaS platform designed to
          revolutionize the way you create and manage your notes.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Prompt</label>
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Make Notes on How to make Valuation of a company"
                value={message}
                onChange={handleMessageChange}
              ></textarea>
            </div>
          </div>

          <div className="field">
            <div className="is-flex is-justify-content-center">
              {/* Display button text dynamically */}
              <button className="button is-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>

      <div>
        {/* Render this block only if the user is logged in */}
        <div className="pt-4" style={{ borderTop: "1px solid #dee2e6" }}></div>
        {isLoggedIn ? (
          <>
            <div className="container mb-4">
              <h1 className="title is-4">View Notes Generated in Past</h1>
              <button className="button is-primary">Archives</button>
            </div>
          </>
        ) : (
          <div className="container mb-4">
            <h1 className="title is-4">Log-In to View your previous notes.</h1>
          </div>
        )}
      </div>

      <div className="pt-5" style={{ borderTop: "1px solid #dee2e6" }}></div>
      <Howto />
    </>
  );
};

export default GenAi;
