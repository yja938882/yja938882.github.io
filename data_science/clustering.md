# 클러스터링 ( Clustering )
## Good Clustering
*좋은 클러스터링의 특징*
* high intra-class similarity (같은 클러스터내 개체간 높은 유사도)
* low inter-class similarity  (다른 클러스터의 개체간 낮은 유사도)
* hidden pattern 을 찾아내는 능력
---
## Distance between clusters
  * **Single link** &nbsp; : 두 클러스터내 개체간 거리중 가장 작은 값
  * **Complete link** &nbsp; : 두 클러스터내 개체간 거리중 가장 큰 값 
  * **Average** &nbsp; : 두 클러스터내 거리의 평균
  * **Centroid** &nbsp; : 두 클러스터의 centroid 의 거리
  * **Medoid** &nbsp; : 두 클러스터의 medoid 의 거리
---
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
---
## K-Means  
  ```
  centroid 가 클러스터를 대표
   ```
  * ### Algorithm
  ```
  1. K개의 object를 선택, cluster의 center로 사용
  2. 각 object를 가장 가까운 center에 cluster에 포함
  3. cluster의 center를 다시 계산
  4. 변화가 없을 때 까지 2.로 돌아가서 반복.
  ```
  * ### 장점
  ```
  efficient : O(nkt) [ n: #object, k: #cluster, t: #iteration ] k,t <<<< n 
  ```
  * ### 단점
  ```
  - local optimum 에서 종료
  - k를 지정 해주어야함
  - noise 와 outlier에 영향을 많이 받음
  - non-convex 형태의 클러스터를 찾는데 적합하지 않음
  ```
---
