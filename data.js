// Movie & Series Database
const moviesData = [

    // --------------------
    // PARAM SUNDARI
    // --------------------
    {
        title: "Param Sundari",
        category: "Bollywood",
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
        category: "Hollywood",
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
    // BREAKING BAD SERIES
    // --------------------
    {
        title: "Breaking Bad",
        category: "Hollywood",
        poster: "posters/breaking_bad.jpg",
        series: true,
        seasons: Array.from({length:4}, (_,i) => ({
            season: i+1,
            quality1080p: { size: "", link: "" },
            quality720p: { size: "", link: "" }
        }))
    },

    // --------------------
    // GAME OF THRONES SERIES
    // --------------------
    {
        title: "Game of Thrones",
        category: "Hollywood",
        poster: "posters/game_of_thrones.jpg",
        series: true,
        seasons: Array.from({length:8}, (_,i) => ({
            season: i+1,
            quality1080p: { size: "", link: "" },
            quality720p: { size: "", link: "" }
        }))
    },

    // --------------------
    // MONEY HEIST SERIES
    // --------------------
    {
        title: "Money Heist",
        category: "Hollywood",
        poster: "posters/money_heist.jpg",
        series: true,
        seasons: Array.from({length:5}, (_,i) => ({
            season: i+1,
            quality1080p: { size: "", link: "" },
            quality720p: { size: "", link: "" }
        }))
    },

    // --------------------
    // THE BOYS SERIES
    // --------------------
    {
        title: "The Boys",
        category: "Hollywood",
        poster: "posters/the_boys.jpg",
        series: true,
        seasons: Array.from({length:5}, (_,i) => ({
            season: i+1,
            quality1080p: { size: "", link: "" },
            quality720p: { size: "", link: "" }
        }))
    },

    // --------------------
    // INCEPTION 2010
    // --------------------
    {
        title: "Inception",
        category: "Hollywood",
        poster: "posters/inception.jpg",
        quality1080p: { size: "", link: "" },
        quality720p: { size: "", link: "" }
    }

];
