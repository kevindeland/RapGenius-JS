var vows = require("vows"),
    geniusClient = require("./../src/geniusClient"),
    assert = require("assert"),
    util = require("util");


vows.describe("New lyrics checker").addBatch({

    "When searching for the lyrics of given song":{
        topic: function(){
//            var songUrl = "/Justin-bieber-sorry-lyrics";
            var songUrl = "/Kanye-west-power-lyrics";
            geniusClient.searchSimpleSongLyrics(songUrl, "rap", this.callback);
            
        },

        "The parsed lyrics are returned in an object": function(err, response){
            console.log(response);
            return;
            assert.ok(!err);
            assert.ok(!(response instanceof Error));
            assert.ok(response instanceof Lyrics.Lyrics);
            assert.deepEqual(response.songId, 1791);
            assert.deepEqual(response.songTitle, "Gorgeous");
            assert.deepEqual(response.mainArtist, "Kanye West");
            assert.deepEqual(response.producingArtists, ["Kanye West", "Mike Dean", "No I.D."]);
            assert.deepEqual(response.featuringArtists, ["Kid Cudi", "Raekwon"]);
            assert.ok(response.sections.length > 0);
            assert.deepEqual(response.sections[0].name, "[Produced by Kanye West, Mike Dean &amp; No I.D.]");
        }
    }
}).run();
