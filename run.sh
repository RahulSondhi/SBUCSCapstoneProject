#!/bin/bash
pkgs='maven tree default-jre default-jdk snapd'
if !  dpkg -s $pkgs >/dev/null 2>&1; then
  sudo apt update
  sudo apt-get install $pkgs
fi

mvn clean package && java -jar /target/*.jar