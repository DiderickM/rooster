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
        $temp = preg_split('/\s+/', $res, -1, PREG_SPLIT_NO_EMPTY);
        $newRes = '';
        for ($l = 0; $l < count($temp); $l++) {
            $newRes .= $temp[$l] . ' ';
        }
        $resTotal[$rem][$uur] = strip_tags($newRes);
    }

    echo json_encode($resTotal);

?>