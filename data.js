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
        series: true,  // indicates this is a series
        seasons: [
            {
                season: 1,
                quality1080p: {
                    size: "6.2GB",
                    link: "https://example.com/strangerthings_s1_1080p.mkv"
                },
                quality720p: {
                    size: "3.4GB",
                    link: "https://example.com/strangerthings_s1_720p.mkv"
                }
            },
            {
                season: 2,
                quality1080p: {
                    size: "6.8GB",
                    link: "https://example.com/strangerthings_s2_1080p.mkv"
                },
                quality720p: {
                    size: "3.6GB",
                    link: "https://example.com/strangerthings_s2_720p.mkv"
                }
            },
            {
                season: 3,
                quality1080p: {
                    size: "7.5GB",
                    link: "https://example.com/strangerthings_s3_1080p.mkv"
                },
                quality720p: {
                    size: "4.0GB",
                    link: "https://example.com/strangerthings_s3_720p.mkv"
                }
            },
            {
                season: 4,
                quality1080p: {
                    size: "8.2GB",
                    link: "https://example.com/strangerthings_s4_1080p.mkv"
                },
                quality720p: {
                    size: "4.5GB",
                    link: "https://example.com/strangerthings_s4_720p.mkv"
                }
            }
        ]
    }

];
