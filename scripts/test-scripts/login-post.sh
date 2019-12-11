#!/bin/bash
curl -X POST -H "Content-Type: application/json"  -d @login.json  http://tipsy-api.us-east-1.elasticbeanstalk.com/login | json_pp
