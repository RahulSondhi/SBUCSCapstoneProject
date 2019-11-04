#!/bin/bash
if [ ! $1 ]; then
        echo " It uses 3 parameters: [import|export] [database_name] [dir_to_store|dir_to_import]"
        echo " Example of use:"
        echo " ./mongo.sh export my_database dump/"
        echo " ./mongo.sh import my_database dump/"
        exit 1
fi
operation=$1
db=$2
out_dir=$3
if [ ! $out_dir ]; then
        out_dir="./dump"
else
        mkdir -p $out_dir
fi

if [ $operation == 'export' ]; then
    tmp_file="fadlfhsdofheinwvw.js"
    echo "print('_ ' + db.getCollectionNames())" > $tmp_file
    cols=`mongo $db $tmp_file | grep '_' | awk '{print $2}' | tr ',' ' '`
    for c in $cols
    do
        mongoexport -d $db -c $c -o "$out_dir/${c}.json"
    done
    rm $tmp_file

fi

if [ $operation == 'import' ]; then

    cd $out_dir

    # if you want to drop before import uncomment this line
    #mongo $db --eval "db.dropDatabase();"
    for i in *.json; do
       mongoimport --db $db --collection ${i/.json/} --file $i
    done
fi
exit 1