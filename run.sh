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
    if [ $success -eq 0 ];
    then
        echo " -> success"
    else
        echo " -> failed"
    fi
    if [ -z $2 ] 
    then
        outputreference="verify/$(dirname $1)/$(basename $1 .js).log"
        echo -e "Your output 						      | Original output" 
        diff --ignore-space-change --side-by-side --suppress-common-lines <(tail -n +2 "$output") <(tail -n +2 "$outputreference")
        if [ $? -ne 0 ];
        then
            success=1
        fi
    fi
    kill -9 $pid &> /dev/null
    rm -rf server.log
    return $success
}

function run_folder() {
    output=$2
    if [ -z $2 ] 
    then
        output=server.log
    fi
    rustywebserver 8000 ./public > "$output" &
    pid=$!
    echo "Server running PID $pid"
    echo "Running folder $1"
    success=0
    for file in $(cd verify && find $1 -mindepth 1 -maxdepth 2 -type f -name '*.js' | sort)
    do
        echo "Running file $file"
        timeout -s 9 10 node "verify/$file"
        if [ $? -ne 0 ];
        then
            echo " -> failed"
            success=1
        else 
            echo " -> success"
        fi
        # echo file $(basename $folder)/$(basename $file)
        # run_test $(basename $folder)/$(basename $file)
    done
    if [ -z $2 ] 
    then
        outputreference="verify/$1.log"
        echo -e "Your output 						      | Original output" 
        diff --ignore-space-change --side-by-side --suppress-common-lines <(tail -n +2 "$output") <(tail -n +2 "$outputreference")
        if [ $? -ne 0 ];
        then
            success=1
        fi
    fi
    kill -9 $pid &> /dev/null
    rm -rf server.log
    return $success
}

if which rustywebserver &> /dev/null
then
    chmod 000 public/forbidden.html

    success=0
    case $1 in
        single)
            run_single $2
            success=$?
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
                run_folder $folder "verify/$folder.log"
            done
            ;;
        folder)
            run_folder $2
            success=$?
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
    exit $success    
else
    exit 1
fi
