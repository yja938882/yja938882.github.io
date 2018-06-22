class Data_Point{
	constructor( x, y ){
		this._x = x;
		this._y = y;
		this._d = 0;
		this._cluster == null;
	}
	set_cluster( c ){
		this._cluster = c;
		this._d = c.disimilarity(this);
		this._cluster_id = c.id;
	}
	get x( ){
		return this._x;
	}
	get y( ){
		return this._y;
	}
	get cluster( ){
		return this._cluster;
	}
	get disimilarity(){
		return this._d;
	}
	get cluster_id(){
		return this._cluster_id;
	}
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
	disimilarity( dp ){
		var dx = this._x - dp.x;
		var dy = this._y - dp.y;
		return Math.sqrt(dx*dx + dy*dy);
	}
}
function generateRandomPoints( min_x, max_x, min_y, max_y , num ){
	var rand_pts=[];
	for( i = 0; i < num; i++ ){
		rand_pts[i] = new Data_Point(
			Math.random() * ( max_x - min_x ) + min_x,
			Math.random() * ( max_y - min_y ) + min_y );
	}
	return rand_pts;
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
		for( i = 0; i < d.length; i++ ){
			check[i] = false;
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
				if( this._d[i].cluster == null ){
					this._d[i].set_cluster(this._clusters[j]);
					end = false;
				}else if( /*this._d[i].cluster_id != j &&*/
					parseFloat( this._clusters[j].disimilarity(this._d[i]) ) < parseFloat( this._d[i].disimilarity ))
				{
					this._d[i].set_cluster( this._clusters[j] );
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
			callback( this._d , this._clusters );
	}

}
