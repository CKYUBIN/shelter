--ddl ? data definition language. 데이타 정의어
	create ~~~
	drop ~~~
	truncate ~~~
--dml ? data manupulation language. 데이타 조작어. LCreateUpdateDelete

select id, content, dis_cnt, ...
  from t_post
 where title like '감자전을 먹을 때 %'
   and like_cnt > 100
     ...
insert into t_post(id, title, content) values('XT0ayU', '감자전을 먹을 때 막걸리도 먹자', 'ㅇㅎ류ㅗㄴㄱㅅ허ㅗ') 

update t_post 
   set content = '단골집에 녹두전 추천 할려구요'
 where id='XT0ayU'
 
delete 
  from t_post
 where title like '감자전을 먹을 때 %'
   and like_cnt > 100
--dcl ? data control language.

   pl_sql