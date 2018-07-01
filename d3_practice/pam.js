/** pam.js
 *
 * @fileoverview Partitioning Around Medoids
 * @author yeon
 *
 */

/** 
 * 두 포인트 간의 유클리드 거리 반환.
 * @param {!{x, y}} 
 * @param {!{x, y}} 
 * @return {number}
 */
function euclidean_distance( a, b ){
	var dx = parseFloat( a.x ) - parseFloat( b.x );
	var dy = parseFloat( a.y ) - parseFloat( b.y );
	return Math.sqrt( dx*dx + dy*dy );
}

/** 
 * 두 포인트 간의 맨하탄 거리 반환.
 * @param {!{x, y}} 
 * @param {!{x, y}} 
 * @return {number} 두 포인트 간의 맨하탄 거리.
 */
function manhattan_distance( a, b ){
	var dx = parseFloat( a.x ) - parseFloat( b.x );
	var dy = parseFloat( a.y ) - parseFloat( b.y );
	if( dx < 0 ) dx *= -1.0;
	if( dy < 0 ) dy *= -1.0;
	return dx + dy ;
}

class Cluster{
	/**
	 * @param {number}
	 * @param {number}
	 * @param {number}
	 */
	constructor( x, y ,id ){
		this._x = x;
		this._y = y;
		this._id = id;
	}

	/**
	 * @param {number}
	 * @param {number}
	 */
	set( x, y ){
		this._x = x;
		this._y = y;
	}

	get x(){ return this._x; }
	get y(){ return this._y; }
	get id(){ return this._id; }
}

class Pam{
	/**
	 * @param {number} k cluster 갯수.
	 * @param { !Array< !{x, y} > } data 데이터 베열.
	*/
	constructor( k , data ){
		this._k = k;
		this._d = data;
		this.init( k, data );
	}

	/**
	 * @param {number} k cluster 갯수.
	 * @param { !Array<!{x, y}> } data 데이터 베열.
	*/
	init( k, data ){
		this._clusters = [];
		var check = [];
		for( var i = 0; i < data.length; i++ ){
			check[i] = false;
			this._d[i].cluster_id = -1;
		}
		for( var cid = 0; cid < k ; ){
			var idx = Math.floor( Math.random() * ( data.length-1 ) );
			if( check[ idx ] ) continue;
			check[idx] = true;
			this._clusters[cid] = new Cluster( data[idx].x, data[idx].y , cid );
			cid ++;
		}
	}

	/**
	 * 포인트 들을 가장 가까운 클러스터에 영입.
	 * @param {function} distfunc 두 포인터 간의 거리계산시 사용될 function
	 * @param {function} callback Iteration 의 끝에서 실행될 function.
	 * @return {boolean} end 클러스터링이 끝났는지 여부 반환.
	 */
	set_nearest_cluster( distfunc, callback ){
		var end = true;
		for( var i = 0; i < this._d.length; i++ ){
			for( var j = 0; j< this._clusters.length; j++ ){
				if( this._d[i].cluster_id == -1 || 
					parseFloat( distfunc(this._d[i], this._clusters[j])) < parseFloat( distfunc(this._d[i], this._clusters[this._d[i].cluster_id])))
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

	/**
	 * 클러스터의 Medoids 재조정.
	 * @param {function} callback Iteration 의 끝에서 실행될 function.
	 */
	update_medoids( callback ){
		this._d.sort( function ( a, b ){
				if( a.cluster_id == b.cluster_id ) return 0;
				else if ( a.cluster_id < b.cluster_id ) return -1;
				else return 1;
			});
	
		var c_left = 0;
		var c_right = 0;
		for( var c=0; c < this._k; ){
			while( (c_right < this._d.length) && (this._d[c_right].cluster_id == c) ){
				c_right ++;
			}
			var dist_arr = [];
			for( var i= c_left; i < c_right; i++ ){
				var sum = 0;
				for( var j= c_left; j< c_right; j++ ){
					sum += euclidean_distance( this._d[i], this._d[j] );
				}
				dist_arr[i - c_left] = sum;
			}
			var mind = c_left;
			var MIN_DIST = Infinity;
			for( var i=0; i< dist_arr.length; i++ ){
				if( MIN_DIST > dist_arr[i] ){
					MIN_DIST = dist_arr[i];
					mind = (i+c_left);
				}
			}
			this._clusters[c].set( this._d[mind].x , this._d[mind].y );
			c++;
			c_left = c_right;
		}
		if( typeof callback == "function" )
			callback( this._d , this._clusters );
	}

	/**
	 * 클러스터링 수행.
	 * @param {function} distfunc 포인트간 거리 계산 함수
	 * @param {function} callback1 클러스터 재할당 후 실행.
	 * @param {function} callback2 Centroid 재조정 후 실행.
	 * @param {function} callback3 클러스터링 완료 후 실행.
	 */
	clustering( distfunc, callback1, callback2 ,callback3 ){
		while( !set_nearest_cluster( distfunc, callback1 ) ){
			update_centroid( callback2 );
		}
		if( typeof callback3 == "function" )
			callback3( this._d , this._clusters );
	}

	get clusters(){
		return this._clusters;
	}
}
