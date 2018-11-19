<?php
    $baseurl = "http://publish.gepro-osi.nl/roosters/rooster.php?school=";
    for($i = 0; $i < 50; $i++){
        $url = $baseurl . $i;
        $homepage = file_get_contents($url);
        if($homepage != "De gekozen school komt niet voor op onze server"){
            echo $i;
            echo "<hr>";
        }
    }
?>