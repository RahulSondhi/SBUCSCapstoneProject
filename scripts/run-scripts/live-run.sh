#!/bin/bash
pushd ../../
x-terminal-emulator -e "mvn spring-boot:run" ;
popd
pushd ../../tipsy-react/
x-terminal-emulator -e "npm start"


