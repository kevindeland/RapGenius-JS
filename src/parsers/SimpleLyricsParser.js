var cheerio = require('cheerio');
var chalk = require('chalk');

function parseLyricsHTML(html, type) {
    try {
        var $ = cheerio.load(html);

        var lyrics = $(".song_body-lyrics");

        var lyricsText = lyrics.text();

        var lyricsArray = lyricsText.split("\n");

        var lyricsObject = {};
        lyricsObject.lines = [];

        var section = 'Null Section', temp;
        lyricsArray.forEach(function(line) {
            var line = line.trim();
            console.log('testing line %s in section %s', chalk.green(line), chalk.blue(section));
            if(line.length == 0) {
                // do nothing
                return;
            }
            
            if((temp = line.match(/\[(.*)\]/i)) != null) {
                
                section = temp[1];
                console.log(chalk.red('starting new section'), chalk.yellow(section));
                
                return;
            }

            lyricsObject.lines.push({
                section: section,
                line: line
            });
            
        });

        // remove the first line, which is just a lyrics line
        lyricsObject.lines = lyricsObject.lines.splice(1, lyricsObject.lines.length);
        
        return lyricsObject;
    } catch (e) {
        console.log("An error occurred while trying to parse the lyrics: [html=" + html + "], :\n" + e);
        return new Error("Unable to parse lyrics from RapGenius");
        
    }
}



module.exports.parseLyricsHTML = parseLyricsHTML;
//module.exports.getRandomLine = getRandomLine;
