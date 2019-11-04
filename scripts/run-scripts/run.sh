#!/bin/bash
pushd ../../
x-terminal-emulator -e "mvn clean package && java -jar target/*.jar" ;
popd
pushd ../../mixology-react/
x-terminal-emulator -e "npm install && npm start"