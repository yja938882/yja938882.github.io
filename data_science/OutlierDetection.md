# Outlier Detection
## Outlier
  normal object 와 당대적으로 dissinilar 한 object

---

## Outlier detection methods
  * ```Statistics-based outlier detection```
  * ```Distance-based outlier detection```
  * ```Density-based outlier detection```
  * ```RWR-based outlier detection```
  
---

### Statistics-based Outlier Detection
  ```
  Data set 에 가장 적합한 SDM( Statistical Distribution Model ) 를 찾는다
  SDM을 따르지 않는 object 를 outlier 로 판별
  ```
  * #### 단점
    ```
    대부분의 실제 데이터는 SDM을 따르지 않음
    Multi dimentional dataset 에서 SDM 을 찾기 쉽지않음
    ```
 
 ---
 
### Distance-based Outlier Detection
  ```
  object 간의 distance 를 이용
  다른 object 와 threshold 이상의 distance 를 가진 object 를 outlier 로 판별
  ```
  * #### DB-outlier
    ```
    location feature : # of other objects within distance d 사용 
    일정 threshold 이하의 location feature 를 가지면 outlier
    ```
  * #### 단점
    ```
    local density problem 이 존재.
    ```

 ---
 
 ### Density-based Outlier Detection
   ```
   density 가 주변 neighbor 보다 많이 낮으면 outlier 로 판정
   ```
   * #### 단점
     ```
     micore-cluster problem 이 존재
     ```

---
   
### RWR-based Outlier Detection
  ```
  integrated graph 를 model 
  RWR( Random Walk with Restart ) 수행
  ```
    
  * #### Outrank-a
    ```
    complete weighted graph 사용 ( edge weight : object 간의 similarity )     
    ```
  * #### Outrank-b
    ```
    threshold 이하의 edge 를 지움
    ```
  * #### 단점
    ```
    fringe 를 ourlier 로 판별할 수 있음
    ```
     
 ---    
