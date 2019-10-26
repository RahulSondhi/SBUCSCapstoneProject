#!/bin/bash
curl -X POST http://localhost:8080/confirm?token="$0"| json_pp