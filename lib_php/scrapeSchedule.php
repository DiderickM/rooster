<?php
    //Collect the input.
    $url = base64_decode($_GET['tagPass']);
    //Scrape the data
    $content = file_get_contents($url);
    $dom = new DOMDocument;
    @$dom->loadHTML($content);
    $xpath = new DOMXPath($dom);
    $hrefs = $xpath->evaluate('/html/body/div/table/tr/td/table/tr/td/table/tr/td[@class="tableCell"]');
    $result = [];
    $i = 0;

    foreach($hrefs as $node) {
        $test = str_replace("&amp;nbsp", "", $dom->saveHTML($node));
        $result[$i++] = $test;
    }

    for ($j = 0; $j < count($result); $j++) {
        $rem = ($j % 5) + 1;
        $uur = floor(($j+1) / 5);
        $res = preg_replace("/[\r\n]/", " ", $result[$j]);
        $resTotal[$rem][$uur] = strip_tags($res);
    }

    echo '<pre>'; print_r($resTotal); echo '</pre>';

?>