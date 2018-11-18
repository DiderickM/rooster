<?php
    //Collect the input.
    $input = $_REQUEST["tagPass"];  
    $inputSplit = explode(" ", $input); 
    
    //Collect the url.
    $url = $inputSplit[0];
    
    //Collect the id.
    $id = $inputSplit[1];
    
    //Scrape the data.
    $content = file_get_contents($url);
    $dom = new DOMDocument;
    @$dom->loadHTML($content);
    $scrapedContent = $dom->getElementById($id)->tagName . "\n";

    echo $scrapedContent;
?>