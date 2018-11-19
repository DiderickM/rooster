<?php
    //Collect the input.
    $url = base64_decode($_GET['tagPass']);
    //Scrape the data
    $content = file_get_contents($url);
    $dom = new DOMDocument;
    @$dom->loadHTML($content);
    $xpath = new DOMXPath($dom);
    $hrefs = $xpath->evaluate('/html/body/div/table/tr/td/table/tr/td/table/tr/td[@class="tableCell"]');
<<<<<<< HEAD

=======
    echo "<table>";
>>>>>>> 46fa44150331d9749962231dd26f328b2b4b28ad
    foreach($hrefs as $node) {
        $test = str_replace("&amp;nbsp", "", $dom->saveHTML($node));
        $result .= $test;
    }
    
    echo '<table>' . $result . '</table>';    
?>