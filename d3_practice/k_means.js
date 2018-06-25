
function disimilarity( a , b ){
		var dx = parseFloat(a.x) - parseFloat(b.x);
		var dy = parseFloat(a.y) - parseFloat(b.y);
		return Math.sqrt(dx*dx + dy*dy);
}

function generateRandomPoints( min_x, max_x, min_y, max_y , num ){
	var rand_pts=[];
	for( var i = 0; i < num; i++ ){
		rand_pts[i] = {
			x : (Math.random() * ( max_x - min_x ) + min_x),
			y : (Math.random() * ( max_y - min_y ) + min_y )
		};
	}
	return rand_pts;
}

class Cluster{
	constructor( x, y ,id ){
		this._x = x;
		this._y = y;
		this._id = id;
	}
	set( x, y ){
		this._x = x;
		this._y = y;
	}
	get x(){
		return this._x;
	}
	get y(){
		return this._y;
	}
	get id(){
		return this._id;
	}
}

class K_Means{
	constructor( k , d ){
		this._k = k;
		this._d = d;
		this.init( k, d );
	}
	init( k, d ){
		this._clusters = [];
		var check = [];
		for( var i = 0; i < d.length; i++ ){
			check[i] = false;
			this._d[i].cluster_id = -1;
		}
		for( var cid = 0; cid < k ; ){
			var idx = Math.floor( Math.random() * ( d.length-1 ) );
			if( check[ idx ] ) continue;
			check[idx] = true;
			this._clusters[cid] = new Cluster( d[idx].x, d[idx].y , cid );
			cid ++;
		}
	}
	get clusters(){
		return this._clusters;
	}
	set_nearest_cluster( callback ){
		var end = true;
		for( var i = 0; i < this._d.length; i++ ){
			for( var j = 0; j< this._clusters.length; j++ ){
				if( this._d[i].cluster_id == -1 || 
					parseFloat( disimilarity(this._d[i], this._clusters[j])) < parseFloat( disimilarity(this._d[i], this._clusters[this._d[i].cluster_id])))
				{
					this._d[i].cluster_id = j;
					end = false;
				}
			}
		}
		if( typeof callback == "function" )
			callback( this._d , this._clusters );

		return end;
	}
	update_centroid( callback ){
		var cxs = [];
		var cys = [];
		var cnt = [];
		cxs.length = this._k;
		cxs.fill( 0 );
		cys.length = this._k;
		cys.fill( 0 );
		cnt.length = this._k;
		cnt.fill( 0 );

		for( var i = 0; i < this._d.length; i++ ){
			cxs[ this._d[i].cluster_id ] += this._d[i].x;
			cys[ this._d[i].cluster_id ] += this._d[i].y;
			cnt[ this._d[i].cluster_id ]++;
		}
		for( var i = 0; i < this._k; i++ ){
			cxs[ i ] /= cnt[ i ];
			cys[ i ] /= cnt[ i ];
			this._clusters[ i ].set( cxs[ i ], cys[ i ] );
		}
		if( typeof callback == "function")
			callback( this._d , this._clusters);
	}
	clustering( callback1, callback2 ){
		while( !set_nearest_cluster( callback1 ) ){
			update_centroid( callback2 );
		}
	}
}
