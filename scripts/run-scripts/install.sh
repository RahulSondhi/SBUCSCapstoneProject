#!/bin/bash
pkgs='maven default-jre default-jdk mongodb npm nodejs'
if ! dpkg -s $pkgs >/dev/null 2>&1; then
  sudo apt update
  sudo apt-get install $pkgs
fi
