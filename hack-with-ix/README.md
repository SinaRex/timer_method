# This repository contains the API and UI containers for #HackWithIX


To run this API directly on your laptop:
- install node.js 6.9 (npm is a part of that)
- clone the repository
- change directory to the repository root, then:

```
cd api
npm install
node server.js
```

To run the UI directly on your laptop:
- install node.js 6.x (npm is a part of that)

```
cd ui
npm install
node server.js
```
Pro tips:
- [Download React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- Download a JSON viewing chrome extension

(For those interested) - To run this API inside a Docker container:
- install docker and docker-compose
- clone this repository
- change directory to the repository root, then:

```
docker-compose pull
docker-compose up -d
```

Once running, to make requests to this server, use localhost:8000 as your FQDN.

Examples using curl (you could type these URLs in your browser too).
```
curl "http://localhost:8000/"
curl "http://localhost:8000/servers"
curl "http://localhost:8000/performance?dc=NA&id=NA0002"
curl "http://localhost:8000/impressions?dc=NA"
```

Routes available:

GET /
- Hello world

GET /servers
- Returns a list of servers
- Response contains two fields, a "message" field containing a string and a "data" field containing an array.
- Each member of the "data" field array contains the following fields:
 - "dc": A string containing the data centre the server is located in
 - "id": A string containing the unique ID of the server
 - "online": A number containing the UTC time at which the server was first onlined
 - "status":
  - "GREEN" if the server is functioning normally
  - "YELLOW" if the server is experiencing minor problems
  - "ORANGE" if the server is experiencing significant problems
  - "RED" if the server is experiencing critical problems
  - "GREY" if the server is offline

Example response:
```
{
  "message": "OK",
  "data": [
    {
      "dc":"NA",
      "id":"NA0001",
      "online":1427745960000,
      "status":"GREEN"
    },
    {
      "dc":"NA",
      "id":"NA0002",
      "online":1427747460000,
      "status":"GREEN"
    },
    {
      "dc":"EU",
      "id":"EU0004",
      "online":1455361020000,
      "status":"ORANGE"
    }
  ]
}
```

GET /impressions
- Return impressions and spend details for a data centre
- Parameters:
 - dc:   required, two upper case characters
 from: optional, number corresponding to the Javascript date from which to retrive data
 - to:   optional, number corresponding to the Javascript date up to which to retrieve data
- Response contains two fields, a "message" field containing a string and a "data" field containing an array.
 - The "data" field array contains server performance measurements over 10-minute time slices.
- Each member of the "data" field array contains the following fields:
 - timestamp:   the UTC time when the 10-minute measurement slice ended
 - platform:    what type of device/application the ad was served to (can be "desktop", "mobile" or "app")
 - format:      what type of ad was served (can be "video" or "banner")
 - impressions: the number of impressions served in the timeslice
 - spend:       the total cpm spend on this platform and format during the timeslice

Example response:
```
{
  "message": "OK",
  "data": [
    {
      "timestamp":1478302800000,
      "platform":"app",
      "format":"video",
      "impressions":3832,
      "spend":76592.70706271428
    },
    {
      "timestamp":1478302800000,
      "platform":"app",
      "format":"banner",
      "impressions":10724,
      "spend":61691.60489606392
    }
  ]
}
```

GET /performance
- Return performance details for a data centre and or/server
- Parameters
 - dc:     required, two upper case characters
 - server: required, two upper case characters followed by four digits, or "ALL" for an aggregate for all servers in a data centre
 - from:   optional, number corresponding to the Javascript date from which to retrive data
 - to:     optional, number corresponding to the Javascript date up to which to retrieve data
- Response contains two fields, a "message" field containing a string and a "data" field containing an array.
 - The "data" field array contains server performance measurements over 10-minute time slices.
- Each member of the "data" field array contains the following fields:
 - timestamp: the UTC time when the 10-minute measurement slice ended
 - requests: the number of requests serviced by the server in this 10-minute period
 - timing: an array with four members containing performance buckets for server responses: 
  - number of responses that took under 0.01s to serve,
  - number of responses that took under 0.01-0.1s to serve,
  - number of responses that took under 0.1-1s to serve,
  - number of responses that took 1s or more to serve
 - mean: a number containing the mean response time for all requests in this time period
 - lag: delay in milliseconds between the time slice ending and performance data arriving at the monitoring server
 - warns: number of warning messages generated by the server during the time slice

Example response:
```
{
  "message": "OK",
  "data": [
    {
      "timestamp":1477639800000,
      "requests":83231,
      "timing":[76068,4665,2175,323],
      "mean":0.02414521750382912,
      "lag":12224,
      "warns":23
    },
    {
      "timestamp":1477640400000,
      "requests":79976,
      "timing":[75635,3586,685,70],
      "mean":0.026952236984808437,
      "lag":12233,
      "warns":16
    }
  ]
}
```

Note:
 - All numeric timestamps are in UTC and measured in milliseconds from the epoch.
 - To convert from a timestamp to a Javascript Date object: ```new Date(timestamp);```
