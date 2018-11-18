<?php
    //Collect the input.
    $input = $_REQUEST["tagPass"];  
    $inputSplit = explode(" ", base64_decode($input)); 
    
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
    $i = 0;

    foreach ($scrapedContent as $currentContent) {
        $node = $scrapedContent->item($i);
        $collectedContent .= $node->nodeValue . ",";
        $i++;
    }

    $collectedContent = substr($collectedContent, 0, -1); // Remove the last comma

    echo $collectedContent;
?>