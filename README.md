# prodreq-automator
Automates creation of requests on the Producer Dashboard.

*Installation Instructions*

1. `cd prodreq-automator`
2. `npm i`
3. `npm run serve`
4. Open New Terminal Tab
5. Run automation script in the format below.

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
```

*Sample Automation Script*

`node index.js --username="123456789" --password="Password!123!" --device="mobile" --request="crew" --type="bureau_camera" --loop="true" --count="2" --instances="3"`