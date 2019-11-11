if [ ! $1 ]; then
        echo " It uses 1 parameters: [database_name]"
        echo " Example of use:"
        echo " ./drop-database.sh my_database"
        exit 1
fi
db=$1
mongo $db --eval "db.dropDatabase();"