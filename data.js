// Movie & Series Database
const moviesData = [

    // --------------------
    // PARAM SUNDARI
    // --------------------
    {
        title: "Param Sundari",
        category: "Bollywood",
        releaseDate: "2025",
        poster: "posters/param_sundari.jpg",
        quality1080p: {
            size: "1.82GB",
            link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/Param.Sundari.2025.1080p.HEVC.Hindi.WEB-DL.5.1.ESub.x265-%20moviesdrives.cv.mkv?token=1763547000140"
        },
        quality720p: {
            size: "794MB",
            link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/Param.Sundari.2025.720p.HEVC.Hindi.WEB-DL.ESub.x265-%20moviesdrives.cv.mkv?token=1763547127142"
        }
    },

    // --------------------
    // JOLLY LLB 2013
    // --------------------
    {
        title: "Jolly LLB",
        category: "Bollywood",
        releaseDate: "2013",
        poster: "posters/jolly_llb.jpg",
        quality1080p: {
            size: "3.73GB",
            link: "https://pub-2fe28ab4d73e444bb8b6de678d39a70d.r2.dev/3e7f283a13e8ee60243f8d3110bf385e?token=1763574122112"
        },
        quality720p: {
            size: "1.12GB",
            link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/Jolly%20LLB%202013%20BluRay%20720p%20Hindi%20AAC%205.1%20x264%20ESub%20-%20%20moviesdrives.co.mkv?token=1763571646110"
        }
    },

    // --------------------
    // INTERSTELLAR 2014
    // --------------------
    {
        title: "Interstellar",
        category: "Hollywood",
        releaseDate: "2014",
        poster: "posters/interstellar.jpg",
        quality1080p: {
            size: "2.81GB",
            link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/[[%20moviesdrives.com%20]]%20Interstellar.2014.IMAX.1080p.10bit.BluRay.HEVC.x265.Org.NF.Hindi.DDP.5.1.640kbps.+.English.AAC.5.1.ESubs.-%20moviesdrives.com.mkv?token=176357724814"
        },
        quality720p: {
            size: "1.55GB",
            link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/[[%20moviesdrives.com%20]]%20Interstellar.2014.BluRay.IMAX.720p.x265.HEVC.10bit.Hindi.English.AAC.5.1.ESub.-%20moviesdrives.com.mkv?token=176357717712"
        }
    },

    // --------------------
    // STRANGER THINGS SERIES
    // --------------------
    {
        title: "Stranger Things",
        category: "Hollywood",
        releaseDate: "2016",
        poster: "posters/stranger_things.jpg",
        series: true,
        seasons: [
            {
                season: 1,
                quality1080p: { size: "7.1GB", link: "https://mega.blockxpiracy.net/cs/g?x=bARgn4oGSCLZ&n=2kwQ0LZI&fn=Stranger.Things.S01.1080p.Hindi.Eng.Vegamovies.NL.zip" },
                quality720p: { size: "3.3GB", link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/Stranger.Things.S01.720p.Hindi.Eng.moviesdrives.com.zip?token=176358087014" }
            },
            {
                season: 2,
                quality1080p: { size: "8.17GB", link: "https://mega.blockxpiracy.net/cs/g?x=CponL8h2DSxa&n=6wp2QaoY&fn=Stranger.Things.S02.1080p.Hindi.Eng.Vegamovies.NL.zip" },
                quality720p: { size: "3.63GB", link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/Stranger.Things.S02.720p.Hindi.Eng.moviesdrives.com.zip?token=1763581494115" }
            },
            {
                season: 3,
                quality1080p: { size: "6.2GB", link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/Stranger.Things.S03.1080p.Hindi.Eng.moviesdrives.com.zip?token=1763581617116" },
                quality720p: { size: "3.86GB", link: "https://pub-2fe28ab4d73e444bb8b6de678d39a70d.r2.dev/78e8d4a85cdc39774b4c8d8821ff1dd5?token=1763581572116" }
            },
            {
                season: 4,
                volume: 1,
                episodes: "1-7",
                quality1080p: { size: "11.8GB", link: "https://mega.blockxpiracy.net/cs/g?x=En6J7pwCHAhK&n=Ck4wTA5K&fn=Stranger%20Things%20[Season%2004%20Vol.%201]%201080p.Vegamovies.NL-1.zip" },
                quality720p: { size: "2.92GB", link: "https://pub-2fe28ab4d73e444bb8b6de678d39a70d.r2.dev/053b1986a0213897af866984235c5de3?token=1763581699118" }
            },
            {
                season: 4,
                volume: 2,
                episodes: "8-9",
                quality1080p: { size: "3.82GB", link: "https://mega.blockxpiracy.net/cs/g?x=KpyCz4oEmRrT&n=24BW1JyT&fn=Stranger%20Things%20S04E08-9%201080p%20NF%20WEB-DL%20x264%20[Hin+Eng].zip" },
                quality720p: { size: "1.97GB", link: "https://mega.blockxpiracy.net/cs/g?x=us4yvo4XUQxK&n=LhozHQiJ&fn=Stranger.Things.S04-VOL2.E08-9.720p.WEB-DL.Hindi.5.1-English.ESub.x264.zip" }
            }
        ]
    },

    // --------------------
    // CHAINSAW MAN SERIES
    // --------------------
    {
        title: "Chainsaw Man",
        category: "Anime",
        releaseDate: "2022",
        poster: "posters/chainsaw_man.jpg",
        series: true,
        seasons: [
            {
                season: 1,
                quality1080p: {
                    size: "3.7GB",
                    link: "https://pub-8665238777bb4575af3be7b624141905.r2.dev/Chainsaw.Man.S01.1080p.x264.Hindi.English.Japanese.Esubs.%20-%20moviesdrives.com.zip?token=1763587025147"
                },
                quality720p: {
                    size: "2.1GB",
                    link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/Chainsaw.Man.S01.720p.10Bit.Hindi.English.Japanese.Esubs.-.moviesdrives.com.zip?token=1763586950145"
                }
            }
        ]
    },

    // --------------------
    // THE FAMILY MAN SERIES
    // --------------------
    {
        title: "The Family Man",
        category: "Bollywood",
        releaseDate: "2019",
        poster: "posters/the_family_man.jpg",
        series: true,
        seasons: [
            {
                season: 1,
                quality1080p: { size: "8.3GB", link: "https://pub-2fe28ab4d73e444bb8b6de678d39a70d.r2.dev/330cdbceaa8acfd10a64a3051556ce79?token=1763806747115" },
                quality720p: { size: "3.23GB", link: "https://pub-8665238777bb4575af3be7b624141905.r2.dev/The.Family.Man.S01.Hindi.720p.WEB-DL.x264.ESub-[Moviesdrives.cv].zip?token=1763807560" }
            },
            {
                season: 2,
                quality1080p: { size: "7.6GB", link: "https://pub-2fe28ab4d73e444bb8b6de678d39a70d.r2.dev/747212c56d123ef73bbb6f7eda437bc7?token=1763807083117" },
                quality720p: { size: "3.3GB", link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/The.Family.Man.S02.Hindi.720p.WEB-DL.DD5.1.x264-[Moviesdrives.cv].zip?token=1763807895" }
            },
            {
                season: 3,
                quality1080p: { size: "6.35GB", link: "https://true.boblover.click/d5352851bafe0512c6a8aa88dd49e7df?token=1763805427" },
                quality720p: { size: "3.8GB", link: "https://true.boblover.click/122107f9a3137d25ca9ee8551fef24fc?token=1763803584" }
            }
        ]
    },

// --------------------
// INCEPTION 2010
// --------------------
{
    title: "Inception",
    category: "Hollywood",
    releaseDate: "2010",
    poster: "posters/inception.jpg",

    quality720p: {
        size: "1.4GB",
        link: "https://pub-2fe28ab4d73e444bb8b6de678d39a70d.r2.dev/d36127d8a974ad9e793dac303d5aa335?token=1764018110131"
    },

    quality1080p: {
        size: "2.3GB",
        link: "https://true.boblover.click/81f3f913841f36675e591ca798dc9a78?token=1764016462132"
    }
},
// --------------------
// BREAKING BAD SERIES
// --------------------
{
    title: "Breaking Bad",
    category: "Hollywood",
    releaseDate: "2008",
    poster: "posters/breaking_bad.jpg",
    series: true,  // indicates this is a series
    seasons: [
        {
            season: 1,
            quality1080p: {
                size: "7.5GB",
                link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/Breaking.Bad.S01.1080p.BluRay.Hindi.DD2.0-English.5.1.ESub.x264-moviesdrives.com.zip?token=1764018451137"
            },
            quality720p: {
                size: "2.6GB",
                link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/Breaking.Bad.S01.720p.BluRay.Hindi.ORG2.0-English.ESub.x264-moviesdrives.com.zip?token=1764018408136"
            }
        },
        {
            season: 2,
            quality1080p: {
                size: "11.2GB",
                link: "https://pub-2fe28ab4d73e444bb8b6de678d39a70d.r2.dev/37e75803c1011e7d016e5310fa768fc3?token=1764018610"
            },
            quality720p: {
                size: "5.2GB",
                link: "https://pub-b5ecaffddf2344a0ae2222f5e8913e1b.r2.dev/Breaking.Bad.S02.720p.x264.Bluray.Hindi.English.Esubs.-moviesdrives.com.zip?token=1764015981138"
            }
        },
        {
            season: 3,
            quality1080p: {
                size: "11.3GB",
                link: "https://pub-2fe28ab4d73e444bb8b6de678d39a70d.r2.dev/2400325a02d690a3f754e80faa9148ee?token=1764018759"
            },
            quality720p: {
                size: "5.4GB",
                link: "https://pub-b4f6189790d849f486a17274ada684e7.r2.dev/Breaking.Bad.S03.720p.BluRay.Hindi.ORG.2.0-English.ESub.x264.moviesdrives.com.zip"
            }
        },
        {
            season: 4,
            quality1080p: {
                size: "11.1GB",
                link: "https://pub-2fe28ab4d73e444bb8b6de678d39a70d.r2.dev/0631564e1eee9a1a01eda6246d4c27a3?token=1764018919"
            },
            quality720p: {
                size: "5.3GB",
                link: "https://pub-8665238777bb4575af3be7b624141905.r2.dev/Breaking.Bad.S04.720p.BluRay.Hindi.ORG.2.0-English.x264.moviesdrives.com.zip?token=1764018808143"
            }
        },
        {
            season: 5,
            quality1080p: {
                size: "13.5GB",
                link: "https://pub-8665238777bb4575af3be7b624141905.r2.dev/Breaking.Bad.S05.Complete.1080p.BluRay.Hindi.DD2.0-English.5.1.x264.Vegamovies.to.zip?token=1764019017"
            },
            quality720p: {
                size: "6.5GB",
                link: "https://pub-8665238777bb4575af3be7b624141905.r2.dev/Breaking.Bad.S05.720p.BluRay.HIN-ENG.x264.ESub-%20moviesdrives.com.zip?token=1764015981146"
            }
        }
    ]
},
// --------------------
// GAME OF THRONES SERIES
// --------------------
{
    title: "Game Of Thrones",
    category: "Hollywood",
    releaseDate: "2011",
    poster: "posters/game_of_thrones.jpg",
    series: true,  // indicates this is a series
    seasons: [
        {
            season: 1,
            quality1080p: {
                size: "11.5GB",
                link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/httpsgame.of.thrones.s01e10.1080p.x264.bluray.hindi.english.esubs.moviesdrives.com.zip?token=1764019528155"
            },
            quality720p: {
                size: "5GB",
                link: "https://pub-2fe28ab4d73e444bb8b6de678d39a70d.r2.dev/ab2cd36df1ba219e5f8908d821e575c3?token=1764019456154"
            },
            quality480p: {
                size: "1.9GB",
                link: "https://true.boblover.click/f150810e22dc6f5dbae9c3531f32bc08?token=1764019588156"
            }
        },
        {
            season: 2,
            quality1080p: {
                size: "11.2GB",
                link: "https://pub-2fe28ab4d73e444bb8b6de678d39a70d.r2.dev/c075228644250e2fa2efbd20eef83621?token=1764019729158"
            },
            quality720p: {
                size: "5.4GB",
                link: "https://true.boblover.click/54693f05dea3fd4e37be0ed10522d86d?token=1764019688158"
            },
            quality480p: {
                size: "1.6GB",
                link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/Game.of.Thrones.S02.BluRay.480p.Hindi.English.ESub.moviesdrives.com.zip?token=1764019644157"
            }
        },
        {
            season: 3,
            quality1080p: {
                size: "9.2GB",
                link: "https://true.boblover.click/f777eddd2d863d4b47b3d2620787782b?token=176401984310"
            },
            quality720p: {
                size: "4.4GB",
                link: "https://pub-17aa05f0dc574b439c7ef91a1216e119.r2.dev/Game%20of%20Thrones%202013%20S03%20Hindi%20DDP%202.0%20+%20Eng%20AAC%202.0%20%20720p%20BluRay%20HEVC%20x265%20ESubs%20PSA%20%20[moviesdrives.com].zip"
            },
            quality480p: {
                size: "2GB",
                link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/Game.Of.Thrones.S03.480p.BluRay.Hindi.ORG-English.ESub.x264-moviesdrives.com.zip?token=1764019768159"
            }
        },
        {
            season: 4,
            quality1080p: {
                size: "7.5GB",
                link: "https://true.boblover.click/a161d95e4c334cb548bc2535c75a56ea?token=176401996412"
            },
            quality720p: {
                size: "4.7GB",
                link: "https://pub-2dba1d7e471a4b8bba8ed3579443db5c.r2.dev/Game.of.Thrones.S04.720p.BluRay.HIN-ENG.x264-moviesdrives.com.zip"
            },
            quality480p: {
                size: "1.8GB",
                link: "https://mega.blockxpiracy.net/cs/g?x=AI3cvlhBkISa&n=Tho1GKoR&fn=Game.Of.Thrones.S04.Complete.480p.x264.BluRay.Hindi.English.Esubs.Vegamovies.To.zip"
            }
        },
        {
            season: 5,
            quality1080p: {
                size: "8.2GB",
                link: "https://true.boblover.click/52a6bc3a6918672af59253c991ec94e7?token=176402010415"
            },
            quality720p: {
                size: "5GB",
                link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/Game.of.Thrones.S05.720p.BluRay.HIN-ENG.x264.ESub-moviesdrives.com.zip?token=176402006214"
            },
            quality480p: {
                size: "2.2GB",
                link: "https://pub-7ed2ec042b2e4cf48ddce55517eb9cde.r2.dev/Game.of.Thrones.S05.480p.BluRay.HIN-ENG.x264.ESub-moviesdrives.com.zip"
            }
        },
        {
            season: 6,
            quality1080p: {
                size: "7.8GB",
                link: "https://true.boblover.click/5d2cacf56fb87a6f2c2b05b82fde4eff?token=176402021716"
            },
            quality720p: {
                size: "4.6GB",
                link: "https://true.boblover.click/b8f3f48c0a1f4f6b3d0c162a8179d4b9?token=176402016416"
            },
            quality480p: {
                size: "1.8GB",
                link: "https://mega.blockxpiracy.net/cs/g?x=DvR0Chg1wRyA&n=r05hnJAR&fn=Game.Of.Thrones.S06.480p.x264.BluRay.Hindi.English.Esubs.Vegamovies.To.zip"
            }
        },
        {
            season: 7,
            quality1080p: {
                size: "6.7GB",
                link: "https://pub-2fe28ab4d73e444bb8b6de678d39a70d.r2.dev/9dd994017ba44e0da35fde7ef89c92a4?token=176402033618"
            },
            quality720p: {
                size: "3.6GB",
                link: "https://pub-1618d05e29644c42ba22bd345833bf30.r2.dev/Game.of.Thrones.S07.720p.BluRay.HIN-ENG.x264.ESub-moviesdrives.com.zip"
            },
            quality480p: {
                size: "1.4GB",
                link: "https://mega.blockxpiracy.net/cs/g?x=M2RAmsggxZjD&n=zhhVDRDY&fn=Game.Of.Thrones.S07.480p.x264.BluRay.Hindi.English.Esubs.Vegamovies.To.zip"
            }
        },
        {
            season: 8,
            quality1080p: {
                size: "3.4GB",
                link: "https://pub-a60db46801fe4f969e381c50f61fa04b.r2.dev/Game.of.Thrones.S08.1080p.10bit.BluRay.HIN-ENG.x265.ESub-moviesdrives.com.zip"
            },
            quality720p: {
                size: "3.5GB",
                link: "https://pub-6abba2fd77524411b9dd417da32394ee.r2.dev/Game.of.Thrones.S08.720p.BluRay.HIN-ENG.x264.ESub-moviesdrives.com.zip"
            },
            quality480p: {
                size: "1.7GB",
                link: "https://true.boblover.click/34e548c2343d9dbe37b558d1612cf15e?token=176402038219"
            }
        }
    ]
},
// --------------------
// CHAINSAW MAN – THE MOVIE: REZE ARC 2025
// --------------------
{
    title: "Chainsaw Man – The Movie: Reze Arc",
    category: "Anime",
    releaseDate: "2025",
    poster: "posters/chainsaw_man_reze.jpg",

    quality480p: {
        size: "200MB",
        link: "https://pub-b5ecaffddf2344a0ae2222f5e8913e1b.r2.dev/Chainsaw%20Man%20The%20Movie%20Reze%20Arc%202025%20HDTS%20480p%20Hindi%20x264%20-%20Vegamovies.is.mkv?token=1764022274"
    },

    quality720p: {
        size: "815MB",
        link: "https://pub-b5ecaffddf2344a0ae2222f5e8913e1b.r2.dev/Chainsaw%20Man%20The%20Movie%20Reze%20Arc%202025%20HDTS%20720p%20Hindi%20AAC%202.0%20x264%20-%20Vegamovies.is.mkv?token=1764022369"
    },

    quality1080p: {
        size: "1.7GB",
        link: "https://pub-b5ecaffddf2344a0ae2222f5e8913e1b.r2.dev/Chainsaw%20Man%20The%20Movie%20Reze%20Arc%202025%20HDTS%201080p%20Hindi%20AAC%202.0%20x264%20-%20Vegamovies.is.mkv?token=1764020720"
    }
},
// --------------------
// JUJUTSU KAISEN SERIES
// --------------------
{
    title: "Jujutsu Kaisen",
    category: "Anime",
    releaseDate: "2020",
    poster: "posters/jujutsu_kaisen.jpg",
    series: true,  // indicates this is a series
    seasons: [
        {
            season: 1,
            quality1080p: {
                size: "7.7GB",
                link: "https://zrlqm.com/9589000?c=176406589509990TINTV62409R40d6R118cRc4eeR8000RR6V47021&p=10553224-1560383409-4269441498"
            },
            quality720p: {
                size: "4.4GB",
                link: "https://true.boblover.click/d89ccfd56e4a8ac0c6f491638718b3c8?token=1764065845147"
            }
        },
        {
            season: 2,
            quality1080p: {
                size: "7.5GB",
                link: "https://mega.blockxpiracy.net/cs/g?x=lzvRewxhTarY&n=itwwFaKZ&fn=[Vegamovies.to].Jujutsu.Kaisen.S02.[1080p.x265.10bit.WEB-DL].[Multi.Audio].MSub.Vegamovies.to.zip"
            },
            quality720p: {
                size: "3.7GB",
                link: "https://true.boblover.click/a4508df5e30a2e74acd9877030706f4c?token=1764065030148"
            }
        }
    ]
},
{
  title: "IT: Welcome to Derry",
  category: "Hollywood",
  poster: "posters/it_welcome_to_derry.jpg",
  releaseDate: "2025",
  series: true,

  episodes: [
    {
      season: 1,
      episode: 1,
      title: "Episode 1",
      quality720p: {
        size: "380MB",
        link: "https://pub-b5ecaffddf2344a0ae2222f5e8913e1b.r2.dev/IT.Welcome.to.Derry.S01E01.The.Pilot.720p.HS.WEB-DL.AAC2.0.HEVC-[Moviesdrives.cv].mkv?token=1764093481128"
      },
      quality1080p: {
        size: "720MB",
        link: "https://pub-b5ecaffddf2344a0ae2222f5e8913e1b.r2.dev/IT.Welcome.to.Derry.S01E01.1080p.10Bit.WEB-DL.Hindi.2.0-English.5.1.HEVC.x265-[Moviesdrives.cv].mkv?token=1764093818133"
      },
      quality4k: {
        size: "4.4GB",
        link: "https://pub-b5ecaffddf2344a0ae2222f5e8913e1b.r2.dev/IT.Welcome.to.Derry.S01E01.The.Pilot.2160p.HS.WEB-DL.AAC2.0.H.265-[Moviesdrives.cv].mkv?token=1764092586137"
      }
    },

    {
      season: 1,
      episode: 2,
      title: "Episode 2",
      quality720p: {
        size: "418MB",
        link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/IT.Welcome.to.Derry.S01E02.720p.10Bit.WEB-DL.Hindi-English.HEVC.x265-[Moviesdrives.cv].mkv?token=1764093470130"
      },
      quality1080p: {
        size: "930MB",
        link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/IT.Welcome.to.Derry.S01E02.1080p.10Bit.WEB-DL.Hindi.2.0-English.5.1.HEVC.x265-[Moviesdrives.cv].mkv?token=1764093871134"
      },
      quality4k: {
        size: "6.5GB",
        link: "https://pub-58c37aacc5ca4f78ba86b47195edec29.r2.dev/IT%20-%20Welcome%20to%20Derry%20S01E02%202160p%20CRAV%20WEB-DL%2010bit%20HEVC%20[Hindi%20AAC%202.0%20+%20English%20DDPA%205.1]%20x265-[Moviesdrives.cv].mkv?token=1764092908138"
      }
    },

    {
      season: 1,
      episode: 3,
      title: "Episode 3",
      quality720p: {
        size: "370MB",
        link: "https://pub-b5ecaffddf2344a0ae2222f5e8913e1b.r2.dev/IT.Welcome.to.Derry.S01E03.720p.10Bit.WEB-DL.Hindi-English.HEVC.x265-[Moviesdrives.cv].mkv?token=1764093490130"
      },
      quality1080p: {
        size: "800MB",
        link: "https://pub-b5ecaffddf2344a0ae2222f5e8913e1b.r2.dev/IT.Welcome.to.Derry.S01E03.1080p.10Bit.WEB-DL.Hindi.2.0-English.5.1.HEVC.x265-[Moviesdrives.cv].mkv?token=1764093901135"
      },
      quality4k: {
        size: "5.2GB",
        link: "https://pub-b5ecaffddf2344a0ae2222f5e8913e1b.r2.dev/IT%20-%20Welcome%20to%20Derry%20S01E03%202160p%20CRAV%20WEB-DL%2010bit%20HEVC%20[Hindi%20AAC%202.0%20+%20English%20DDPA%205.1]%20x265-[Moviesdrives.cv].mkv?token=1764094182139"
      }
    },

    {
      season: 1,
      episode: 4,
      title: "Episode 4",
      quality720p: {
        size: "411MB",
        link: "https://pub-2fe28ab4d73e444bb8b6de678d39a70d.r2.dev/1003d4b9a70397940b7af671a1918625?token=1764093509131"
      },
      quality1080p: {
        size: "930MB",
        link: "https://pub-2fe28ab4d73e444bb8b6de678d39a70d.r2.dev/648c211ca2df61fba57e17885148d2c2?token=1764093933135"
      },
      quality4k: {
        size: "6.5GB",
        link: "https://pub-2fe28ab4d73e444bb8b6de678d39a70d.r2.dev/0d3f01f7b696d5af39f4123eb0e774dd?token=1764094227140"
      }
    },

    {
      season: 1,
      episode: 5,
      title: "Episode 5",
      quality720p: {
        size: "380MB",
        link: "https://true.boblover.click/17dbaf1a25678701cf049a03ba31dabb?token=1764088095131"
      },
      quality1080p: {
        size: "730MB",
        link: "https://true.boblover.click/4bffc108134b191c27cdbe44074280c5?token=1764093615"
      },
      quality4k: {
        size: "5.7GB",
        link: "https://true.boblover.click/1182454ee5b8e4983339ee7769a971e6?token=1764094271141"
      }
    }
  ]
}

];

