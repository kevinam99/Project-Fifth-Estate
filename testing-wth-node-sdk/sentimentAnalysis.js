const vader = require('vader-sentiment');

let complaints = ['why has The electricity has been down for an hour.',
             'the municipality has not collected the trash',            
];

complaints.forEach(complaint => {
    const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(complaint);
    console.log(`${complaint}\n${JSON.stringify(intensity)}\n\n`);
}) 
