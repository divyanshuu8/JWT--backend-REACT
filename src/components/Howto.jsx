import React from "react";

const HowTo = () => {
  return (
      <div className="container">
        <h1 className="title is-4">How to Use GenNotes</h1>
        
        <div className="content is-medium">
          <p>Follow these simple steps to get started with GenNotes:</p>
          
          <ol>
            <li>
              <strong>Sign Up or Sign In</strong> – Create an account or log into
              your existing account to start using GenNotes.
            </li>
            <li>
              <strong>Choose Your Topic</strong> – Select a topic or enter a
              custom keyword to generate notes.
            </li>
            <li>
              <strong>Generate Notes</strong> – Use our AI-powered tool to create
              comprehensive notes based on your selected topic.
            </li>
            <li>
              <strong>Download Notes</strong> – Once your notes are ready, you can
              easily download them for offline access.
            </li>
            <li>
              <strong>Customize</strong> – Edit the generated notes to match your
              preferences or add additional information.
            </li>
          </ol>

          <p>
            That's it! With GenNotes, you'll have a seamless note-taking
            experience.
          </p>
        </div>
      </div>
  );
};

export default HowTo;
