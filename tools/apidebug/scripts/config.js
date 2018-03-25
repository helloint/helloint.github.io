// Configuration
var projects = [
	{
		"id": "nba",
		"name": "NBATV",
		"domains": [
			"https://watch.nba.com/",
			"https://nba.neulion.com/",
			"https://dev1.nba.com/"
		],
		"skus": [
			"BLPEANNUAL", "BLPPANNUAL", "BTCBKN", "GGAMECHOICEMONTHLY", "GGAMECHOICE", "GSINGLEGAME"
		]
	},
	{
		"id": "nflgp",
		"name": "NFLGP",
		"domains": [
			"https://gamepass.nfl.com/",
			"https://gamepassqa.nfl.com/",
			"https://gamepassdev1.nfl.com/"
		],
		"skus": [
			"BDSEASON", "BISEASON", "BCSEASON", "BCLITE", "BCTEAMNE", "GCSINGLE"
		]
	},
	{
		"id": "ufc",
		"name": "UFC V3",
		"domains": [
			"https://www.ufc.tv/",
			"https://ufcqav3.neulion.com/",
			"https://dev1.ufc.tv/"
		],
		"skus": [
			"PFIGHTPASSHD", "PPAYPERVIEWHD", "PPAYPERVIEWSD", "BFP6MONPPVHD", "BFP6MONPPVSD"
		]
	},
	{
		"id": "nltv",
		"name": "NeuLion TV",
		"domains": [
			"https://nltv.neulion.com/",
			"https://nltvdev.neulion.com/"
		],
		"skus": [
			"PANNUAL", "PPPV"
		]
	},
	{
		"id": "univisionnow",
		"name": "Univision Now",
		"domains": [
			"https://www2.univisionnow.com/",
			"https://univisionnowv2stage.neulion.com/",
			"https://univisionnowv2.neulion.com/",
			"https://dev.univisionnow.com/"
		],
		"skus": [
			"BMONTHLY", "BUNOWVODM"
		]
	},
	{
		"id": "nchc",
		"name": "NCHC",
		"domains": [
			"https://www.nchc.tv/",
			"https://stagenchc.neulion.com/",
			"https://nchcdev.neulion.com/"
		],
		"skus": [
			"GNCHCANNUAL", "GCCDAY", "GUMDWHO2015"
		]
	},
	{
		"id": "ivyleague",
		"name": "IvyLeague",
		"domains": [
			"http://www.ivyleaguenetwork.com/",
			"https://ivyleaguestage.neulion.com/",
			"https://dev.ivyleague.tv/"
		],
		"skus": [
			"GIVYANNUAL", "GIVY4MONTHS", "GBROWNANNUAL"
		]
	},
	{
		"id": "canal",
		"name": "Canal",
		"domains": [
			"https://canal.neulion.com/",
			"https://canalstage.neulion.com/",
			"https://canaldev.neulion.com/"
		],
		"skus": [
			"PPAYPERVIEW"
		]
	},
	{
		"id": "diemaxtra",
		"name": "DiemaXtra",
		"domains": [
			"https://play.diemaxtra.bg/",
			"https://diemaxtrastage.neulion.com/",
			"https://diemaxtradev.neulion.com/"
		],
		"skus": [
			"B1MONTH", "GSINGLEGAME"
		]
	},
	{
		"id": "espnplayer",
		"name": "ESPNPlayer",
		"domains": [
			"https://www.espnplayer.com/",
			"https://espnplayerqa.neulion.com/",
			"https://dev.espnplayer.com/"
		],
		"skus": [
			"BNCAAANNUAL", "GINDYCARSEASON", "GESPNSELECTMONTHLY"
		]
	},
	{
		"id": "crtv",
		"name": "CRTV",
		"domains": [
			"https://www.crtv.com/",
			"https://crtvstage.neulion.com/",
			"https://crtvdev.neulion.com/"
		],
		"skus": [
			"PANNUAL", "PMONTHLY"
		]
	},
	{
		"id": "insight",
		"name": "insight.tv",
		"domains": [
			"https://www.insight.tv/",
			"https://insightstage.neulion.com/",
			"https://dev1.insight.tv/"
		],
		"skus": [
			"PANNUAL", "PMONTHLY"
		]
	},
	{
		"id": "etnlive",
		"name": "ETN Live",
		"domains": [
			"https://dev1.etnlive.com/",
			"https://etnlive.neulion.com/"
		],
		"skus": [
			"PANNUAL", "PMONTHLY"
		]
	},
	{
		"id": "foxnow",
		"name": "FoxNow",
		"domains": [
			"https://foxstage.neulion.com/",
			"https://dev.foxnow.com/"
		],
		"skus": [
			"BALLACCESSA", "BALLCHANNELS", "LFS1", "BFOX", "CSCREAM-QUEENS-SEASON-2"
		]
	},
	{
		"id": "skyfanpass",
		"name": "Sky Fan Pass",
		"domains": [
			"https://fanpass.co.nz/",
			"https://dev1.fanpass.net/"
		],
		"skus": [
			"BCONTACTENERGYMOBILE", "BVODAFONEMOBILE", "BSPORTMONTHLYMOBILE", "BSPORTMONTHLYMOBILE", "BSPORTWEEK", "BSPORTDAY", "PWWE", "BSRUGS", "BSRUGH", "BSRUGM", "BSRUGW", "BSRUGF", "BNRLS", "BF1S"
		]
	},
	{
		"id": "lidom",
		"name": "Lidom(DRSports)",
		"domains": [
			"https://dev1.lidom.tv/",
			"https://drsportsstage.neulion.com/",
			"https://drsports.neulion.com/"
		],
		"skus": [
			"BSEASONR", "BSEASONA", "BSEASONER", "BSEASONEA", "GSINGLEGAME"
		]
	},
	{
		"id": "ucf",
		"name": "University of Central Florida",
		"domains": [
			"https://ucfknights.tv/",
			"https://dev1.ucfknights.tv/"
		],
		"skus": [
			"BMONTHLY"
		]
	},
	{
		"id": "elevensportsbe",
		"name": "Eleven Sports Belgium",
		"domains": [
			"https://elevensportsbe.neulion.com/",
			"https://dev1.elevensports.be/"
		],
		"skus": [
			"BANNUAL", "BMONTHLY", "BDAY"
		]
	},
	{
		"id": "elevensportssg",
		"name": "Eleven Sports Singapore",
		"domains": [
			"https://elevensportssg.neulion.com/",
			"https://dev1.elevensports.sg/"
		],
		"skus": [
			"BANNUAL", "BMONTHLY", "BANNUALI", "BWEEK", "BTOURNAMENT"
		]
	},
	{
		"id": "elevensportslu",
		"name": "Eleven Sports Luxembourg",
		"domains": [
			"https://elevensportslu.neulion.com/",
			"https://dev1.elevensports.lu/"
		],
		"skus": [
			"BANNUAL", "BMONTHLY", "BDAY"
		]
	},
	{
		"id": "elevensportstw",
		"name": "Eleven Sports Taiwan",
		"domains": [
			"https://elevensportstw.neulion.com/",
			"https://dev1.elevensports.tw/"
		],
		"skus": [
			"BANNUAL", "BMONTHLY", "BWEEK", "BTOURNAMENT"
		]
	},
	{
		"id": "elevensportsmy",
		"name": "Eleven Sports Malaysia",
		"domains": [
			"https://elevensportsmy.neulion.com/",
			"https://dev1.elevensports.my/"
		],
		"skus": [
			"BANNUAL", "BMONTHLY", "BANNUALI", "BDAY"
		]
	},
	{
		"id": "elevensportspl",
		"name": "Eleven Sports Poland",
		"domains": [
			"https://dev1.elevensports.pl/"
		],
		"skus": [
			"BANNUAL", "BMONTHLY", "BMULTIDAY"
		]
	},
	{
		"id": "csmrugby",
		"name": "CSM Rugby",
		"domains": [
			"https://rugbypass.neulion.com/",
			"https://dev1.csmrugby.com/"
		],
		"skus": [
			"BMONTHLY", "BANNUAL"
		]
	},
	{
		"id": "euroleague",
		"name": "Euro League",
		"domains": [
			"http://dev1.euroleague.com/",
			"https://euroleaguestage.neulion.com/"
		],
		"skus": [
			"BSEASON", "BMONTHLY"
		]
	},
	{
		"id": "cycling",
		"name": "Cycling.TV",
		"domains": [
			"https://dev1.cycling.tv/"
		],
		"skus": [
			"BANNUAL", "BQUARTERLY"
		]
	},
	{
		"id": "tce",
		"name": "Tennis Channel Everywhere",
		"domains": [
			"https://tce.neulion.com/"
		],
		"skus": [
			"BANNUAL", "BMONTHLY", "BDAY"
		]
	},
	{
		"id": "csmgolf",
		"name": "CSM Golf",
		"domains": [
			"https://dev1.pgatourlive.com/",
			"https://dev1.worldgolfpass.com/"

		],
		"skus": [
			"BTOURA", "BPTLA", "BWGPA", "BTOURM", "BTOURW"
		]
	},
	{
		"id": "btn2go",
		"name": "BTN2Go",
		"domains": [
			"https://www.btn2go.com/",
			"https://stage4.btn2go.com/",
			"https://dev1.btn2go.com/",
			"https://international.btn2go.com/",
			"https://intlstage4.btn2go.com/",
			"https://intldev1.btn2go.com/"
		],
		"skus": [
			"BANNUAL", "BMONTHLY", "BANNUALILLINOIS", "BMONTHLYMARYLAND"
		]
	},
	{
		id: "socon",
		"name": "Socon",
		"domains": [
			"https://dev.socondigitalnetwork.com/"
		]
	},
	{
		"id": "brighthouse",
		"name": "Bright House",
		"domains": [
			"https://www.bhsnlive.com/"
		],
		"skus": [
			"BMONTHLY", "BDAY"
		]
	}
];
