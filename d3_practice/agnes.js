/** agnes.js
 *
 * @fileoverview Agglomerative nesting Clustering
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

}

class ClusterNode{
	constructor( left, right , isleaf , did ){
		this._left = left;
		this._right = right;
		this._is_leaf = isleaf;
		this._did = did;
		this._has_parent = false;
		this._level = 0;
		this._cluster = -1;
		if( !this._is_leaf ){
			this._level = ( (this._left.level)>(this._right.level)? (this._left.level): (this._right.level) );
			this._level++;
		}
	}

	static children( node , getfunc ){
		if( node.isLeaf ){
			if( typeof getfunc =='function' )
				getfunc( node );
			return;
		}
		if( node.left != null )
			this.children( node.left, getfunc );
		if( node.right != null )
			this.children( node.right, getfunc );
	}

	get level(){
		return this._level;
	}

	get isLeaf(){
		return this._is_leaf;
	}
	get left(){
		return this._left;
	}
	get right(){
		return this._right;
	}
	get dataId(){
		return this._did;
	}
	get hasParent(){
		return this._has_parent;
	}
	set setParent( b ){
		this._has_parent = b ;
	}
	set cluster( c ){
		this._cluster = c;
	}
	get cluster(){
		return this._cluster;
	}
}

class Agnes{
	constructor( data , distfunc ){
		this._data = data;
		this._clusters=[];
		for( var i=0; i< data.length; i++ ){
			this._clusters[i] = new ClusterNode( null, null, true, i ); 
		}
		this.init( distfunc );
	}

	init( distfunc ){
		this._dist_matrix = [];
		this._dist_matrix.length = this._clusters.length;
		for( var i=0; i< this._clusters.length; i++ ){
			this._dist_matrix[i] = [];
			this._dist_matrix[i].length = this._clusters.length;
		}

		for( var i = 0; i < this._clusters.length - 1; i++ ){
			for( var j = i+1; j < this._clusters.length; j++ ){
				var d = distfunc( this._data[ (this._clusters[i].dataId) ], this._data[ (this._clusters[j].dataId) ] );
				this._dist_matrix[i][j] = d;
				this._dist_matrix[j][i] = d;
			}
		}
	}

	clusterDistance( ca, cb , cluster_distfunc ){
		var cad = [];
		var cbd = [];
		ClusterNode.children( ca, function (d) {	cad.push( d.dataId );	});
		ClusterNode.children( cb, function (d) {	cbd.push( d.dataId );	});

		return this.single_link( cad, cbd );
	}

	single_link( cad, cbd ){
		var max_d = Infinity;
		for( var a = 0; a < cad.length; a++ ){
			for( var b = 0; b < cbd.length; b++ ){
				if( this._dist_matrix[ cad[a] ][ cbd[b] ] < max_d )
					max_d = this._dist_matrix[ cad[a] ][ cbd[b] ];
			}
		}
		return max_d;
	}

	clustering(cluster_distfunc){
		while( this._clusters.length > 1){
			var new_clusters = [];
			var mini = -1;
			var minj = -1;
			var MIN_DIST = Infinity;
			for( var i=0; i< this._clusters.length-1; i++ ){
				for( var j=i+1; j< this._clusters.length; j++ ){
					var cd = this.clusterDistance( this._clusters[i], this._clusters[j]);
					if( cd < MIN_DIST ){
						MIN_DIST = cd;
						mini = i;
						minj = j;
					}
				}

			}
			if( (minj!= -1) && (mini != -1) ){
				new_clusters.push( new ClusterNode( this._clusters[mini], this._clusters[minj],false, -1));	
				for( var k=0; k< this._clusters.length; k++ ){
					if( (k!= minj) && (k!= mini) )
						new_clusters.push( this._clusters[k] );

				}

			}
			this._clusters.length = 0;
			this._clusters = new_clusters;
		}
	}

	get root(){
		return this._clusters[0];
	}

	getclusters( lv ){
		this._cluster_id = 0;
		var root_node = this._clusters[0];
		this.setclusters( lv, root_node );
		var ret = [];
		ClusterNode.children( root_node ,function(d){
				ret.push(d);
			});
		this._cluster_id = 0;
		return ret;
	}
	setclusters( lv, node ){
		if( node == null ) return;
		if( node.isLeaf ){
			node.cluster = this._cluster_id;
			this._cluster_id++;
			return;
		}
		if(node.level == lv ){
			var cld = [];
			ClusterNode.children( node ,function(d){
				cld.push(d);
			});
			
			for( var i=0; i<cld.length; i++ ){
				cld[i].cluster = this._cluster_id;
			}
			this._cluster_id++;

		}else{
			this.setclusters( lv, node.left );
			this.setclusters( lv, node.right );
		}
	}
}