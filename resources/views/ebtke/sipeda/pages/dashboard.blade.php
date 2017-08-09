@extends('ebtke.sipeda.layout.main')
@section('content')

    <!-- page content -->
    <div class="bg__gray">
		<div class="page-title">
			<div class="title_left">
		        <h3>DASHBOARD </h3>
		        <p>SIPEDIA MANAGEMENT SYSTEM</p>
		    </div>
		</div>
	</div>
	<!-- <div id="c1"></div>
	<script src="https://a.alipayobjects.com/g/datavis/g2/2.3.6/g2.js"></script> -->

	<!-- <script>
      var data = [
        {genre: 'Sports', sold: 275},
        {genre: 'Strategy', sold: 115},
        {genre: 'Action', sold: 120},
        {genre: 'Shooter', sold: 350},
        {genre: 'Other', sold: 150},
      ]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
      // Step 1: 创建 Chart 对象
      var chart = new G2.Chart({
        id: 'c1', // 指定图表容器 ID
        width : 600, // 指定图表宽度复制代码
        height : 300 // 指定图表高度
      });
      // Step 2: 载入数据源,定义列信息
      chart.source(data, {
        genre: {
          alias: '游戏种类' // 列定义，定义该属性显示的别名
        },
        sold: {
          alias: '销售量'
        }
      });
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart.interval().position('genre*sold').color('genre')
      // Step 4: 渲染图表
      chart.render();
    </script> -->
@endsection

