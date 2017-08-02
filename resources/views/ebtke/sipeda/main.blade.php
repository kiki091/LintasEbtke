<!-- <link rel="stylesheet" type="text/css" href="{{ asset('themes/ebtke/front/build/css/plugins.css') }}">
 -->
<style type="text/css">
* {
    margin: 0;
    padding: 0;
    text-decoration: none;
}
#top {
    background: #555555;
    padding: 10px 0;
}
.container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
.container:after {
    display: table;
    content: " ";
    clear: both;
        -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.container:before {
    display: table;
    content: " ";
}
.secondmenu_left {
    float: right;
    top: 13px;
}
.secondmenu_left ul {
    list-style: none;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    transition: all 0.5s ease;
}
.secondmenu_left li {
    float: left;
}
#top a {
    color: #fff100;
    font-size: 14px;
}

.secondmenu_left li a {
    font-family: 'helvetica-neue';
    color: #FFFFFF;
    font-size: 10px;
    border-right: #FFFFFF solid 1px;
    padding: 1px 15px;
}
@media (min-width: 992px) {
    .container {
        width: 970px;
    }
}
@media (min-width: 768px) {
    .container {
        width: 750px;
    }
}
</style>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
google.charts.load('current', {'packages': ['bar']});
google.charts.setOnLoadCallback(function() {
    $('.service-usage-graph').each(function() {

        var table = new google.visualization.DataTable();
        table.addColumn('string', 'Year');
        table.addColumn('number', 'Rencana Investasi PLTS Rooftop');
        table.addColumn('number', 'Rencana Investasi Pabrikan');
        table.addColumn('number', 'Rencana Investasi Power Producer');
        table.addColumn('number', 'Realisasi Investasi PLTS Rooftop');
        table.addColumn('number', 'Realisasi Investasi Pabrikan');
        table.addColumn('number', 'Realisasi Investasi Power Producer');
        
        table.addRow(['2012', 100, 90, 200,180, 1000,800]);
        table.addRow(['2013', 156, 140, 300,264, 1500,1450]);
        table.addRow(['2014', 200,188, 321, 200, 1300,1280]);
        table.addRow(['2015', 190,175, 350, 340, 1400,1350]);
        table.addRow(['2016', 400,375, 430, 420, 2000,1890]);
        table.addRow(['2017', 500,450, 450,450,2500,2400]);
        var chart = new google.charts.Bar(this);
        var options = google.charts.Bar.convertOptions({
            isStacked: true,
            series: {
                1: { targetAxisIndex: 1 },
                3: { targetAxisIndex: 1 }
            },
            vAxis: {
              viewWindow: {
               /* max: 3000,*/
              }   
            }   
        });
        chart.draw(table, options);
    });
});
</script>
<div id="desktop_content" style="margin-bottom: 15px;">
    <div id="top">
        <div class="container">
            <div id="desktop_content">
                <div id="top-navigation" class="secondmenu_left">
                    <ul class="add_fix">
                        <li>
                            <a style="font-size: 14px;" href="{{ route('sipeda_login') }}">{{ trans('navigation/top_menu.menu_login') }}</a>
                        </li>
                        <li>
                            <a style="font-size: 14px;" href="{{ route('sipeda_login') }}#signup">{{ trans('navigation/top_menu.menu_register') }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<section class="page">
	<h2 style="text-align: center; margin-bottom: 20px">
        Data Rencana Investasi dan Realisasi di bidang EBTKE periode 212-2017   
    </h2>
	<div class="container">
		<div class="row">
            <div class="col-md-2"></div>
			<div class="col-md-10">
				<div class="service-usage-graph" style="width:800px; height:500px;"></div>
			</div>
		</div>
	</div>
</section>

<!-- <script src="{{ asset('themes/ebtke/cms/js/jquery.min.js') }}"></script> -->
<!-- Bootstrap -->
<!-- <script src="{{ asset('themes/ebtke/cms/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('js/bower_components/Chart.js/dist/Chart.min.js') }}"></script> -->

<!-- Custom Theme Scripts -->
<!-- <script src="{{ asset('themes/ebtke/cms/js/custom.min.js') }}"></script> -->