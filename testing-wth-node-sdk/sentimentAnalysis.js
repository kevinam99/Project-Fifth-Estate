const vader = require('vader-sentiment');

let complaints = ['why has The electricity has been down for an hour.',
             'the municipality has not collected the trash',            
];

// Add complaints to the array and check the output
complaints.forEach(complaint => {
    const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(complaint);
    console.log(`${complaint}\n${JSON.stringify(intensity)}\n\n`);
}) 
