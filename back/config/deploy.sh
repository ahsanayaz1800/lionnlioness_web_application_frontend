#!/bin/sh

path=$(cd $( dirname ${BASH_SOURCE[0]})  && pwd )/lionnlioness.sql;
MYSQL_PASS=""  # Leave it empty if there's no password

# cd //Users/lcordeno/Applications/MAMP/mysql/bin;
cd C://xampp/mysql/bin
./mysql < $path -u root -p$Lionlioness@1234;

echo "Database deployed!"



