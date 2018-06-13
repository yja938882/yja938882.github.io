# Preprocessing 
## Data Quality
  * ```Accuracy```
  * ```Completeness```
  * ```Consistensy```
  * ```Timeliness```
  * ```Believability```
  * ```Interpretability```

---

## Major Tasks in Data Processing
  * **Data Cleaning**
    * missing value 채우기, noisy, outlier처리, inconsistent 해결  
    
  * **Data Integration**
    * 여러 DB, data cube, file 통합
    
  * **Data Reduction**
    * Dimensionality reduction
    * Numerosity reduction
    * Data compression
    
  * **Data transformation and discretization**
    * Normalization
    * Discretization
  
---

## Data Cleaning
  * **Handling missing data**
     * ignore the tuple
     * fill manually
     * \"unknown\"으로 채우기
     * attribute 의 mean 으로 채우기
     * 같은 class 의 attribute 의 mean 으로 채우기
     * most probable value - Baaysian formula, Decision tree
     
  * **Handling noisy data**
     * Clustering -> detect and remove outlier 
     * Computer \+ Human inspection -> detect and check
     
---
## Data Integration
  * Schema integration : 여러 다른 source의 meta data 합치기
  * Entity identification problem : 여러 다른 source 에서 entity 를 식별하기
  * Detecting and resolving data value conflicts : 다른 source 에서 다른 attribute value 처리  
  
  * **Object identification**
    * 다른 DB 에서 다른 이름을 가진 attribute 나 object 식별
  * **Derivable data**
    * 다른 table에서 도출될수 있는 attribute
  * **Redundant attribute detecting**
    * ```chi-square test( nominal data )```  
    * ```Correlation coefficient( numeric data )```
    * ```Covariance( Numeric data )```

---
