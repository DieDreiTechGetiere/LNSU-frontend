#!/bin/bash 

echo ""
echo "preparing release for $1"
echo ""


SCRIPT_DIRECTORY=$(cd "$(dirname "$0")"; pwd)

#clear release dir
#rm -r $SCRIPT_DIRECTORY/release/*

#create new release folder
RELEASE_FOLDER="$(date +"%D" | tr '[/]' ' ' | tr -d ' ')"_"$(date +"%T" | tr '[:]' '-')"
mkdir $SCRIPT_DIRECTORY/release/$RELEASE_FOLDER

if [ "$1" == "all" ];then
    #built finalize-built.js
    cd htdocs
    node r.js -o build.js
    cd ..
    
    cp -r $SCRIPT_DIRECTORY/htdocs/app $SCRIPT_DIRECTORY/release/$RELEASE_FOLDER/app
    cp -r $SCRIPT_DIRECTORY/htdocs/css $SCRIPT_DIRECTORY/release/$RELEASE_FOLDER/css
    cp -r $SCRIPT_DIRECTORY/htdocs/media $SCRIPT_DIRECTORY/release/$RELEASE_FOLDER/media
    
elif [ "$1" == "js" ];then
    #built finalize-built.js
    cd htdocs
    node r.js -o build.js
    cd ..
    
    cp -r $SCRIPT_DIRECTORY/htdocs/app $SCRIPT_DIRECTORY/release/$RELEASE_FOLDER/app
    
elif [ "$1" == "css" ];then

    cp -r $SCRIPT_DIRECTORY/htdocs/css $SCRIPT_DIRECTORY/release/$RELEASE_FOLDER/css
    
elif [ "$1" == "media" ];then

    cp -r $SCRIPT_DIRECTORY/htdocs/media $SCRIPT_DIRECTORY/release/$RELEASE_FOLDER/media
    
fi


#upload files via ftps to liveserver
duck -e overwrite --upload ftps://ud19_420@ud19.udmedia.de/html/lnsu-frontend /Users/nmaier/projects/my-projects/2016/LNSU-frontend/release/$RELEASE_FOLDER


# handle git release
git add *
git commit -m "before release"

git checkout master
git merge develop
git add *
git commit -m "Live Server Release $RELEASE_FOLDER"
git push

git checkout develop

exit 1;