<!DOCTYPE html>
<html>
	<head>
		<title>K-Means Clustering with d3</title>
		<style type="text/css">
			#board{
				width: 600px;
				height: 600px;
				float: left;
				border-width: 2px;
				border-style: solid;
			}
			#step{
				width: 80px;
				height: 40px;
				margin-left: 10px;

			}
		</style>
	</head>
	<body>
		<h1> K-Means Clustering with d3.js </h1>	
		<div id="board">
			
		</div>
		<button id="step" onclick ="step()"> step </button>

	<script type="text/javascript" src="http://code.jquery.com/jquery-1.4.3.min.js"></script>
	<script type="text/javascript" src="./d3js/d3.min.js"></script>
	<script type="text/javascript" src="./k_means.js"></script>
	<script>
		function getColor( c ){
			switch( c ){
				case 0 : return 'black';
				case 1 : return 'blue';
				case 2 : return 'red';
				case 3 : return 'green';
			}
		}

		var rd = generateRandomPoints( 10, 580, 10, 580, 1000 );
		var svg = d3.select('#board').append('svg')
				.attr('width','600').attr('height','600').append('g');


		var k = new K_Means(4,rd);
		
		function render( dots , clusters ){
			svg.selectAll('g').remove();
			var g = svg.append('g');
			g.selectAll('.dot')
			.data( dots )
			.enter().append('circle')
			.attr('class','dot')
			.attr('r',3)
			.attr('cx',function(d){ return d.x; })
			.attr('cy',function(d){ return d.y; })
			.attr('id',function(d){ return d.cluster_id; })
			.style('fill',function(d){
				return getColor( d.cluster_id );
			});

			g.selectAll('.dotc')
			.data( clusters )
			.enter().append('circle')
			.attr('class','dotc')
			.attr('r',10)
			.attr('cx',function(d){ return d.x; })
			.attr('cy',function(d){ return d.y; })
			.style('fill',function(d){
				return getColor( d.id );
			});
		}
		var s = 0;
		function step(){
			if( s % 2 ==0)
				k.set_nearest_cluster( render );
			else
				k.update_centroid(render);
			s++;
		}

		var g = svg.append('g');
			g.selectAll('.dot')
			.data( rd )
			.enter().append('circle')
			.attr('class','dot')
			.attr('r',3)
			.attr('cx',function(d){ return d.x; })
			.attr('cy',function(d){ return d.y; })
			.attr('id',function(d){ return d.cluster_id; })
			.style('fill',function(d){
				return 'black' ;
			});
		
	</script>
	</body>
	

</html>
