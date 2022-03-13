const csv = require('csvtojson');
const fs = require('fs');

function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;

}

//Read csv file
csv()
    .fromFile(__dirname + '/10_conference_tsne.csv')
    .then((data) => {
        var stream = fs.createWriteStream('10_data.json', { flags: 'w' });
        var arr = [];
        //CSV -> JSON

        const map = new Map();

        data.forEach((entry) => {

            //add color to label
            if (map.has(entry.label)) {
                entry.color = map.get(entry.label);
            } else {
                const newColor = getRandomColor();
                // console.log(newColor);
                map.set(entry.label, newColor);
                entry.color = newColor;
            }

            arr.push(entry);
        })

        const json = { data: arr };

        stream.write(JSON.stringify(json));
    })
