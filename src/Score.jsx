import React from 'react';

const Score = ({ score }) => {
    return (
       <div>
         <h2 className="text-xl font-bold mb-2">Your Score: {score}</h2>
       </div>
    );
   };

export default Score;
   
