<!DOCTYPE>
<html>
<head>
	<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
	<link rel="icon" href="media/image/favicon.png" type="image/png">
    
	<title>LNSU - Frontend</title>

	<!-- stylesheet resources -->
	<!-- stylesheets -->
	<link rel="stylesheet" type="text/css" href="css/main.css" />
    <link rel="stylesheet" href="app/includes/libraries/testing/mocha.css"/>
    <link rel="stylesheet" href="app/includes/libraries/testing/qunit.css"/>

	<!-- scripts -->
    <script src="app/includes/libraries/jquery/jquery-1.11.1.min.js"></script>
    <script data-main="app/js/config.js" src="app/includes/libraries/require/require.js"></script>

</head>
<body>
    <!--div id="mocha"></div-->
    
    <?php 
    /*
        function listFolderFiles($dir){
            $ffs = scandir($dir);
            echo '<ol>';
            foreach($ffs as $ff){
                if($ff != '.' && $ff != '..'){
                    echo '<li>'.$ff;
                    if(is_dir($dir.'/'.$ff)) listFolderFiles($dir.'/'.$ff);
                    echo '</li>';
                }
            }
            echo '</ol>';
        }

        listFolderFiles('media/image/');
        */
    ?>
	<div class="loader-pos">
		<div class="loader">
			<img id="loader-img" draggable="false" src="media/image/loader_icon.png"/>
		</div>
	</div>
	<div class="main-stage">
        <div id="main_region"></div>
        <div id="overlay_region"></div>
    </div>
    
</body>
</html>