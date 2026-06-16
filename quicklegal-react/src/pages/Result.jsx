import React, { useEffect } from "react";

function Result() {
  useEffect(() => {
    // We use a small timeout (100ms) to make sure the div is 
    // actually in the DOM before Google tries to find it.
    const timer = setTimeout(() => {
      if (window.google && window.google.search) {
        window.google.search.cse.element.go();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="result-page-container">
      <div className="container" style={{ marginTop: "40px", minHeight: "80vh" }}>
        <h2 style={{ marginBottom: "20px", color: "#2c3e50", textAlign: "center" }}>
          Legal Search Results
        </h2>
        
        {/* CRITICAL FIX: 
          Added data-queryParameterName="search" to match your URL.
        */}
        <div 
          className="gcse-searchresults-only" 
          data-queryParameterName="search"
        ></div>
      </div>
    </div>
  );
}

export default Result;
