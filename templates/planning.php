<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

?>
<link rel="stylesheet" href="./css/planning.css">
<script src="./js/planning.js"></script>

<div>
	<div class="all">
		<div id="prev" onclick="changeMonth(this)">P</div>
		<div id="calendar" class="calendar">
			<div class="year policeTitre tailleTitre">
				<div class="yearValue"></div>
				<div class="monthValueString"></div>
				<div class="monthValue" style="display: none;"></div>
			</div>
			

			<div class="weekdays policeTexte">
				<div class="weekday">Lun</div>
				<div class="weekday">Mar</div>
				<div class="weekday">Mer</div>
				<div class="weekday">Jeu</div>
				<div class="weekday">Ven</div>
				<div class="weekday">Sam</div>
				<div class="weekday">Dim</div>
			</div>

			<div class="days policeTexte"></div>
		</div>
		<div id="next" onclick="changeMonth(this)">N</div>
	</div>

    <script>
        fillCalendar();
    </script>
</div>