#!/bin/bash
pushd ../../
x-terminal-emulator -e "mvn clean package && java -jar target/*.jar" ;
popd
pushd ../../tipsy-react/
x-terminal-emulator -e "npm install && npm start"