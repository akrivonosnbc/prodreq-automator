# prodreq-automator
Automates creation of requests on the Producer Dashboard.

**Installation Instructions**
___
1. `cd prodreq-automator`
2. `npm i`
3. `npm run drive`

**Running Through Terminal**
___
1. Open new Terminal tab
2. Run automation script in the format below.

*Automation Script Format*

```
node index.js
	--username	=	"{ SSO ID }"
	--password	=	"{ SSO Password }"
	--device	=	"{ mobile / desktop }"
	--request	=	"{ crew / edit/ file_ingest / studio }"
	--type		=	"{ (bureau_camera / breaking_news / general) / (standard / long / msnbc / am) / '' / '' }"
	--loop		=	{ true / false }
	--count		=	{ (integer) }
	--instances	=	{ (integer) }
	--cases		=	{ Test Cases .csv File }
```

*Sample Run Script*

`node index.js --username="123456789" --password="Password!123!" --device="mobile" --request="crew" --type="bureau_camera" --loop="true" --count="2" --instances="3" --cases="test"`

**Running Through REST Service**
___
1. Open new Terminal tab
2. `npm run serve`
3. `POST` the following data to the endpoint `/:request`, where `:request` is the type of request (i.e. `crew`).

*Sample Endpoint*

`http://localhost:3000/crew`

*Request Format*

```
{
	"device": "{ mobile / desktop }",
	"type": "{ (bureau_camera / breaking_news / general) / (standard / long / msnbc / am) / '' / '' }",
	"loop": { true / false },
	"count": { (integer) },
	"instances": { (integer) },
	"cases": [ (Array of test cases in JSON format) ]
}
```

*Sample Request*

```
{
	"device":"desktop",
	"type":"single_camera",
	"loop":true,
	"count":1,
	"instances":1,
	"cases": [
		{
			"PHONE": "123-456-7890",
			"CC": "Test CC",
			"DIVISION_INDEX": "1",
			"SHOW_PROJECT_NAME": "OTHER",
			"SHOW_PROJECT_OTHER": "Test Other",
			"BUDGET_CODE": "12345",
			"PREPARATION_START_TIME_HOUR": "12",
			"PREPARATION_START_TIME_MINUTES": "00",
			"PREPARATION_START_TIME_TIME_OF_DAY": "AM",
			"START_TIME_HOUR": "2",
			"START_TIME_MINUTES": "00",
			"START_TIME_TIME_OF_DAY": "PM",
			"END_TIME_HOUR": "11",
			"END_TIME_MINUTES": "00",
			"END_TIME_TIME_OF_DAY": "AM",
			"SET_LOCATION_1": "rCentre",
			"SET_OPTION_1": "3",
			"SET_LOCATION_2": "field",
			"SET_OPTION_2": "123 Address St.",
			"SET_LOCATION_3": "noLoc",
			"SET_OPTION_3": ""
		}
	]
}
```
