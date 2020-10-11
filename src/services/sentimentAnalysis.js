//const vader = require('vader-sentiment');

const negativity = require('Sentimental').negativity;

// let complaints = ['There has been no power supply in my vicity for an hour now',
//              'the municipal workers have not collected the trash cans',            
// ];

// // Add complaints to the array and check the output
// complaints.forEach(complaint => {

//     // const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(complaint);
//     const intensity = negativity(complaint)
    
//     console.log(`${complaint}\n${JSON.stringify(intensity)}\n\n`);

// }) 


const sentiment = (message) =>{
    return negativity(message).score
}

module.exports = sentiment