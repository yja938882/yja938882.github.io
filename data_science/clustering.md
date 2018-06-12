# Clustering 
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
    * ```DIANA```
    * ```AGNES```
    * ```BIRCH```
    * ```ROCK```
    * ```CHAMELEON```
  * ### Density-based
    *connectivity , density function 을 이용한 방식*
    * ```DBSCAN```
    * ```OPTICS```
    
---

## Partitioning Approaches
  ```K-Means``` ```K-Modes``` ```K-Medoids``` ```PAM``` ```CLALA```  
  
---

### K-Means  
  ```
  centroid 가 클러스터를 대표
  ```
  * #### Algorithm
  ```
  1. K 개의 object 를 선택, cluster의 center로 사용
  2. 각 object를 가장 가까운 center에 cluster에 포함
  3. cluster 의 center 를 다시 계산
  4. 변화가 없을 때 까지 2로 돌아가서 반복
  ```
  * #### 장점
  ```
  efficient : O(nkt) [ n: #object, k: #cluster, t: #iteration ] k,t <<<< n 
  ```
  * #### 단점
  ```
  local optimum 에서 종료
  k를 지정 해주어야함
  noise 와 outlier에 영향을 많이 받음
  non-convex 형태의 클러스터를 찾는데 적합하지 않음.
  mean 을 정의할 수 있어야한다.( Categorical 한 데이터의 경우 mean 을 정의하기 힘듬 )
  ```
  
---

### K-Modes
  Caregorical 한 데이터를 다룬다.
  ```
  mode 가 cluster 를 대표
  ```
  * #### Dissimilarity
  ```
  D(X,Y) = Σ δ(Xi,Xj) 
  δ(Xi,Yi) =  0 ( Xi == Yi )
           =  1 ( Xi != Yi )
  ```
  
---

### K-Medoids
   ```
   Medoid 가 cluster 를 대표
   ```
   
---

### PAM 
  **Partitioning Around Medoids**
  * #### Algorithm
  ```
  1. k 개의 object 선택
  2. 선택된 object i 와 선택되지 않은 object h 에 대하여 TCih 계산 ( TCih : i,h swapping cost )
  3. if( TCih < 0 ) i 와 h 교환 
     then 선택되지 않은 object 들을 가장 가까운 cluster 로 포함
  4. 변화가 없을 때 까지 2.로 가서 반복
  ```
  * #### 장점
  ```
  outlier 와 noise의 영향을 적게 받는다.
  ```
  * #### 단점
  ```
  Does not scale well : O( tk(n-k)^2 ) [ n: #object, k: #cluster, t: #iteration ]
  ```

---

### CLALA
  **Clustering Large Applicaion**
  ```
  여러개의 sample을 추출한뒤 각각에 PAM을 적용, 가장 좋은 결과를 사용
  ```
  * #### 장점
  ```
  PAM 보다 큰 데이터를 다룰 수 있음
  ```
  * #### 단점
  ```
  Sample 크기에 따라 효율성이 결정된다.
  Sample이 data set 을 잘 반영하지 못할 수 있다.
  ```
  
---

## Hierarchical Approaches
  ```AGNES``` ```DIANA``` ```BIRCH``` ```ROCK``` ```CHAMELEON```  
  
---

### AGNES
  **Agglomerative Nesting**
  ```
  single link Method 와 dissimilarity matrix 를 이용
  dissimilarity 가 작은 노드 두개를 합치는 것을 반복
  결국 모든 노드가 같은 클러스터에 속하게 됨
  ```

---

### DIANA
  **Divisive Analysis**
  ```
  AGNES의 역순으로 진행
  결국 모든 노드는 각각 자신이 클러스터를 형성
  ```
  * #### Algorithm
  ```
  1. 초기, 모든 object 가 하나의 클러스터에 속함
  2. 가장 큰 클러스터를 2개의 클러스터로 나눔
  3. 모든 클러스터가 하나의 object 로 구성될 때 까지 2.반복
  ```
  
---

### BIRCH
  **Balanced Iterative Reducing and Clustering using Hierarchies**
   ```
   1. Scan DB -> Construct CF tree
   2. leaf nodes 를 대상으로 Clustering Algorithm 을 수행
   ```
  * #### CF( Clustering Featrue )
  ```
  CF = ( N, LS, SS )
  N : # of data , LS : 각 dimension 끼리의 합 벡터, SS : 각 dimension 끼리의 제곱 합 벡터
  CF 를 통해 Centroid, Radius 값을 도출해 낼 수 있다.
  ```
  * #### CF tree
  ```
  non-leaf node 는 children 의 CF sum 을 가지고 있다.
  leaf node 에는 CF가 위치한다.
  2 parameters 가 필요하다.
   - Branching factor : 최대 children 수
   - Threshold : leaf node 에 들어가는 sub-cluster 의 최대 diameter 값.
  ```
  * #### 장점
  ```
  CF tree 를 이용해 추가되는 Cluster 를 incrementally 하게 관리할 수 있다.
  leaf nodes 에 object 들이 압축되어 들어가 있어서 처리하는 데이터양이 줄어든다.
  ```
  * #### 단점
  ```
  Numeric 데이터만 다룰 수 있다.
  Data record의 순서가 결과에 영향을 준다.
  ```
   
---

### ROCK
  **Robust Clustring Using Links**  
  Categorical 한 데이터를 다루기 위한 방법.
  * #### Jaccard coefficient
  ```
  sim(T1, T2) = |T1 ∩ T2| / |T1 ∪ T2 |
  ```
  * #### Links
  ```
  links = \# of common neighbors 
  ( neighbor : threshold 이상의 Jaccard Coefficient 를 가지는 데이터 )
  ```
---

### CHAMELEON
  **Hierarchical Clustering Using Dynamic Modeling**  
  Relative interconnectivity 와 Relative Closeness 가 높은 두 클러스터를 하나로 합친다.
  ```
  1. k-NN ( k-nearest neighbor ) graph 를 만든다
  2 - A : Graph partitioning algorithm 을 사용한다
  2 - B : agglomerative hierarchical clustering algorithm 을 사용한다.
  ```
  * #### Relative interconnectivity
  ![](https://github.com/yja938882/yja938882.github.io/blob/master/data_science/relative_interconnectivity.jpg)
  * #### Relative closeness
  ![](https://github.com/yja938882/yja938882.github.io/blob/master/data_science/relative_closeness.png)
  
---

## Density-Based Approaches
  ```DBSCAN``` ```OPTICS```
  * #### Two Parameters
    ```
    Eps : neighorhood 를 결정짓는 최대 반지름 
    MinPts : Eps 내에 있어야하는 최소 neighborhood 갯수
    ```
  * #### Core point
    q 가 **core point** 이다.
    ```
    = q 의 Eps 이내에 MinPts 이상의 point 가 존재한다.
    ```
  * #### Directly density-reachable
    p 가 q 로 부터 **directly density reachable** 하다.
    ```
    = q 가 core point 이고, p 가 q 의 Eps 이내에 있다.
    ```
  * #### Density-reachable
    p 가 q 로부터 **Density reachable** 하다.
    ```
    = p(1) ,p(2) ,,, p(n) 이 있을 때, p(1) = q, p(n) = p 라고하면
    p(i+1) 이 p(i) 로 부터 directly density rechable 하다.( chain of point )
    ```
  * #### Density-connected
    p 와 q 가 **Density connected** 하다.
    ```
    = p, q가 어떤 o 로부터 desity reachable 하다.
    ```
  
---

### DBSCAN
  **Density Base Spatial Clustering of Applications with Noise**  
  Density connetected point 의 최대 set 을 cluster 로 정의
  * #### Algorithm
    ```
    1. point p 를 선택한다.
    2. p 로 부터 density rechable 한 모든 point 를 찾는다.
    3. p 가 core point 라면 cluster 를 형성한다.
    4. p 가 core 가 아니거나 p로 부터 density rechable 한 점이 없다면 1.로 돌아간다.
    5. 모든 점에 대해서 수행한다.
    ```
  * #### 장점
    ```
    arbitrarily 한 모양의 클러스터도 찾을 수 있다.
    noise 를 찾을 수 있다.
    outlier 에 영향을 덜 받는다.
    ```
  * #### 단점
    ```
    적절한 Eps 와 MinPts를 찾아야하는 문제
    ```
  
---

### OPTICS
  **Ordering Points To Identify the Clustering**
  
