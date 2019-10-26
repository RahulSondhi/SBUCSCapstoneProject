#!/bin/bash
curl -X POST -H "Content-Type: application/json"  -d @login.json  http://localhost:8080/login | json_pp
