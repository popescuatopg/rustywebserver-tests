#!/bin/bash

function run_single() {
    output=$2
    if [ -z $2 ] 
    then
        output=server.log
    fi
    rustywebserver 8000 ./public > "$output" &
    pid=$!
    echo "Server running PID $pid"
    echo "Running script $1"
    timeout -s 9 10 node verify/$1
    success=$?
    if [ -z $2 ] 
    then
        outputreference="verify/$(dirname $1)/$(basename $1 .js).log"
        diff <(tail -n +2 "$output") <(tail -n +2 "$outputreference")
    fi
    kill -9 $pid &> /dev/null
    rm -rf server.log
}

if which rustywebserver &> /dev/null
then
    chmod 000 public/forbidden.html

    case $1 in
        single)
            run_single $2
            ;;
        
        outputs)
            for folder in $(cd verify && find . -mindepth 1 -maxdepth 1 -type d | sort)
            do
                echo $folder
                for file in $(cd verify && find $folder -mindepth 1 -maxdepth 2 -type f -name '*.js' | sort)
                do
                    run_single $file "verify/$(dirname $file)/$(basename $file .js).log"
                    # echo file $(basename $folder)/$(basename $file)
                    # run_test $(basename $folder)/$(basename $file)
                done
            done
            ;;
        print)
            for folder in $(cd verify && find . -mindepth 1 -maxdepth 1 -type d | sort)
            do
                echo $folder
                for file in $(cd verify && find $folder -mindepth 1 -maxdepth 2 -type f -name '*.js' | sort)
                do
                    echo "cd rustywebserver-tests && ./run.sh single $(dirname $file)/$(basename $file)"
                    # run_single $file "verify/$(dirname $file)/$(basename $file .js).log"
                    # echo file $(basename $folder)/$(basename $file)
                    # run_test $(basename $folder)/$(basename $file)
                done
            done
            ;;
    esac

    chmod 644 public/forbidden.html    
else
    exit 1
fi
