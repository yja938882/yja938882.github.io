

function disimilarity( a , b ){
		var dx = parseFloat(a.x) - parseFloat(b.x);
		var dy = parseFloat(a.y) - parseFloat(b.y);
		return Math.sqrt(dx*dx + dy*dy);
}

class DBSCAN{
	constructor( eps , minpts , d ){
		this._eps = eps;
		this._minpts = minpts;
		this._d = d;
		this.init(d);
		this._cluster_cnt = 0;
	}
	init( d ){
		this._d.sort( function( a, b ){
			return a.x < b.x ? -1 : a.x > b.x ? 1:0;
		});
		for( var i = 0; i < d.length; i ++ ){
			
			this._d[i].cluster_id = -2;
		}
	}
	clustering( callback ){
		
		this.step(  callback );
		console.log("end");
	}
	step(callback ){
		for( var idx = 0; idx < this._d.length; idx++ ){
			
			if( this._d[idx].cluster_id != -2 ) continue;

			var n = this.getNeighborsRange( idx );

			if( n.length < this._minpts ){
				this._d[idx].cluster_id = -1;
				continue;
			}
			this._cluster_cnt ++;
			this._d[idx].cluster_id = this._cluster_cnt;
			var S = new Set();

			for( var i= 0; i< n.length; i++ ){
				S.add( n[i] );
			}

			for( var i=0; i< n.length; i++ ){
			
				if( this._d[ n[i] ].cluster_id == -1 ){
					this._d[ n[i] ].cluster_id = this._cluster_cnt;
				} 
				if( this._d[ n[i] ].cluster_id != -2 ) continue;
	
				this._d[ n[i] ].cluster_id = this._cluster_cnt;
				var nn = this.getNeighborsRange( n[i] );
			
				if( nn.length >= this._minpts ){
					for( var j = 0 ; j < nn.length ; j++ ){
						if( S.has( nn[j] ) ) continue;
						S.add( nn[j] );
						n.push( nn[j] );
					}
				}
			}	
		}
		console.log( this._cluster_cnt );
		callback( this._d );
	}

	getNeighborsRange( idx ){
		var ret = [];	
		for( var i=0; i< this._d.length; i++ ){
			if( i == idx ) continue;
			if( disimilarity( this._d[i] , this._d[idx] ) <= this._eps ){
				ret.push( i );
			}
		}
		console.log(ret.length);
		return ret;
	}

}
