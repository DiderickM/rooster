<?php

    header('Content-type: application/json');

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
        $resTotal[$rem][$uur] = seoUrl(strip_tags($res));
    }

    echo '<pre>'; print_r($resTotal); echo '</pre>';
    function seoUrl($string) {
        //Lower case everything
        $string = strtolower($string);
        //Make alphanumeric (removes all other characters)
        $string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
        //Clean up multiple dashes or whitespaces
        $string = preg_replace("/[\s-]+/", " ", $string);
        //Convert whitespaces and underscore to dash
        $string = preg_replace("/[\s_]/", ",", $string);
        $string = substr($string, 1, -1); // Remove the last comma
        return $string;
    }

    echo json_encode($resTotal);
?>