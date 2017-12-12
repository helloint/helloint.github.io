// Configuration
var domains = [
	"https://dev.mlssoccer.com/mlsmdl/",
	"https://www.premierleaguepass.com/plp/",
	"https://dev1.gmovies.com/gmovies/",
	"https://ahl.neulion.com/ahl/",
	"https://whl.neulion.com/whl/",
	"https://dev.espnplayer.com/espnplayer/",
	"https://watch.pivot.tv/pivottv/",
	"https://watch.sportsnet.ca/world/",
	"https://watch.sportsnet.ca/gsoc/",
	"https://www.top14pass.com/top14/",
	"https://insinc.neulion.com/bnn/",
	"https://insinc.neulion.com/cbc/"
];
var skuGroups = [
	{
		"id": "mlsmdl",
		"name": "Major League Soccer",
		"skus": [
			{
				id: "61",
				name: "Season Pass"
			},
			{
				id: "63",
				name: "Monthly Pass"
			},
			{
				id: "64",
				name: "Team Pass - Chicago Fire"
			},
			{
				id: "73",
				name: "Team Pass - FC Dallas"
			},
			{
				id: "66",
				name: "Team Pass - D.C. United"
			}
		]
	},
	{
		"id": "plp",
		"name": "Premier League Pass",
		"skus": [
			{
				id: "95",
				name: "Season Pass"
			},
			{
				id: "96",
				name: "Season Pass Monthly"
			}
		]
	},
	{
		"id": "gmovies",
		"name": "gMovies",
		"skus": [
			{
				id: "37",
				name: "Combo"
			},
			{
				id: "38",
				name: "Movies"
			},
			{
				id: "39",
				name: "Music"
			}
		]
	},
	{
		"id": "ahl",
		"name": "AHL",
		"skus": [
			{
				id: "1146",
				name: "All Access - Regular Season"
			},
			{
				id: "1028",
				name: "Team Pass - Lehigh Valley Phantoms"
			},
			{
				id: "1026",
				name: "Away Pass - Lehigh Valley Phantoms"
			},
			{
				id: "1019",
				name: "5-Game Pack"
			},
			{
				id: "1020",
				name: "10-Game Pack"
			}
		]
	},
	{
		"id": "whl",
		"name": "WHL",
		"skus": [
			{
				id: "780",
				name: "PlayOff Alberta Round 1"
			},
			{
				id: "807",
				name: "PlayOff Alberta Round 2"
			},
			{
				id: "834",
				name: "PlayOff Alberta Round 3"
			},
			{
				id: "861",
				name: "PlayOff Alberta Final"
			},
			{
				id: "759",
				name: "PlayOff All Access"
			}
		]
	},
	{
		"id": "espnplayer",
		"name": "ESPN Player",
		"skus": [
			{
				id: "185",
				name: "NCAA College Annual Pass"
			},
			{
				id: "215",
				name: "ESPN Select Monthly Recurring Pass"
			},
			{
				id: "216",
				name: "ESPN Select 24hour Pass"
			},
			{
				id: "192",
				name: "IndyCar Season Pass"
			}
		]
	},
	{
		"id": "sportsnet",
		"name": "Sportsnet World Now",
		"skus": [
			{
				id: "18",
				name: "ICC Cricket World Cup Package"
			},
			{
				id: "3",
				name: "Full Digital Package Annual"
			},
			{
				id: "5",
				name: "All Football Package Annual"
			},
			{
				id: "6",
				name: "All Rugby Package Annual"
			}
		]
	},
	{
		"id": "sportsnetgsoc",
		"name": "Sportsnet World GSOC",
		"skus": [
			{
				id: "20",
				name: "Elite 10 Tournament Pass 2016"
			},
			{
				id: "21",
				name: "Players’ Championship Tournament Pass 2016"
			},
			{
				id: "22",
				name: "Champions Cup Tournament Pass 2016"
			},
			{
				id: "23",
				name: "Players Championship and Champions Cup Bundle"
			}
		]
	},
	{
		"id": "bnn",
		"name": "BNN Network",
		"skus": [
			{
				id: "39",
				name: "12 months"
			}
		]
	},
	{
		"id": "cbc",
		"name": "CBC Network",
		"skus": [
			{
				id: "32",
				name: "12 months"
			}
		]
	}
];