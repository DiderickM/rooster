<?php
    //Collect the input.
    $input = $_REQUEST["tagPass"];  
    $inputSplit = explode(" ", $input); 
    
    //Collect the url.
    $url = $inputSplit[0];
    
    //Collect the id.
    $tagName = $inputSplit[1];
    
    //Collect the index.
    $index = $inputSplit[2];
    
    //Scrape the data.
    $content = file_get_contents($url);
    $dom = new DOMDocument;
    @$dom->loadHTML($content);
    $scrapedContent = $dom->getElementsByTagName($tagName);
    $collectedContent = "";
    
    if($index == "all"){
        foreach ($scrapedContent as $currentContent){
            $collectedContent = $collectedContent.$currentContent->nodeValue;
        }
    }else{
        $realIndex = intval($index);
        $collectedContent = $scrapedContent->item($realIndex)->nodeValue;
    }

    echo $collectedContent;
?>