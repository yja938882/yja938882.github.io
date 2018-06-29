function generateRandomPoints( min_x, max_x, min_y, max_y , num , option ){
	var rand_pts=[];
	switch( option.name ){
		case 'linear':
		{
			var seed = { x: min_x , y : max_y };
			var scope = option.scope;
			
			for( var i = 0; i < num; i++ ){
				if( i > num * 0.9 ){
					rand_pts[i] = {
						x : (Math.random() * ( max_x - min_x ) + min_x),
						y : (Math.random() * ( max_y - min_y ) + min_y )
					};
				}else{
					var lx = (Math.random() * ( max_x - min_x ) + min_x);
					var ly = lx * scope;
					var errx = Math.random()*option.err - option.err/2;
					var erry = Math.random()*option.err - option.err/2;
					rand_pts[i] = {
						x : lx + errx,
						y : ly + erry 
					};
				}
				
			}
			break;
		}
		case 'circular':
		{
			var r = [];
			var seeds = [];
			seeds.length = option.k;
			r.length = option.k;
			var k = option.k;
			for( var i=0; i< option.k; i++ ){
				seeds[i] = {
					x : (Math.random() * ( max_x - min_x ) + min_x),
					y : (Math.random() * ( max_y - min_y ) + min_y)
				};
				r[i] = (Math.random() * ( ( max_x - min_x )/4));
			}
			for( var i=0; i< num; i++ ){
				if( i > (num - option.outlier) ){
					rand_pts[i] = {
						x : (Math.random() * ( max_x - min_x ) + min_x),
						y : (Math.random() * ( max_y - min_y ) + min_y )
					};
				}else{
					var rx = (Math.random() * ( 2 * r[i%k] ) + seeds[i%k].x - r[i%k] );
					var ry = Math.sqrt( Math.abs( (r[i%k] * r[i%k]) - ( (rx-seeds[i%k].x) * (rx-seeds[i%k].x) )) ) * Math.pow(-1,i%2+1) + seeds[i%k].y;
				
					var errx = Math.random()*option.err - option.err/2;
					var erry = Math.random()*option.err - option.err/2;
					rx += errx;
					ry += erry;

					if( rx < min_x ) rx+= min_x;
					if( rx > max_x ) rx-= max_x;
					if( ry > max_y ) ry-= max_y;
					if( ry < min_y ) ry+= min_y;

					rand_pts[i] = {
						x : rx ,
						y : ry 
					};
				}
			}
			break;
		}
		default :
		{
			for( var i = 0; i < num; i++ ){
				rand_pts[i] = {
					x : (Math.random() * ( max_x - min_x ) + min_x),
					y : (Math.random() * ( max_y - min_y ) + min_y )
				};
			}
			break;
		}
	}
	return rand_pts;
}
