#!/bin/bash
curl -X POST -H "Content-Type: application/json"  -d @register.json  http://localhost:8080/register | json_pp
