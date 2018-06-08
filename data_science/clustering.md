# 클러스터링 ( Clustering )
## Good Clustering
*좋은 클러스터링의 특징*
* high intra-class similarity (같은 클러스터내 개체간 높은 유사도)
* low inter-class similarity  (다른 클러스터의 개체간 낮은 유사도)
* hidden pattern 을 찾아내는 능력
## Distance between clusters
  * **Single link** &nbsp; : 두 클러스터내 개체간 거리중 가장 작은 값
  * **Complete link** &nbsp; : 두 클러스터내 개체간 거리중 가장 큰 값 
  * **Average** &nbsp; : 두 클러스터내 거리의 평균
  * **Centroid** &nbsp; : 두 클러스터의 centroid 의 거리
  * **Medoid** &nbsp; : 두 클러스터의 medoid 의 거리

## Major Clustering Approaches
  * ### Partitioning
    *여러 부분으로 분할한 뒤 평가 하는 방식*
    * ```k-means```
    * ```k-modes```
    * ```k-medoids```
    * ```PAM```
    * ```CLARA```
  * ### Hierarchical
    *계층구조로 data set을 분해 하는 방식*
    * ```Diana```
    * ```Agnes```
    * ```BIRCH```
    * ```ROCK```
    * ```CHAMELEON```
  * ### Density-based
    *connectivity , density function 을 이용한 방식*
    * ```DBSCAN```
    * ```OPTICS```
