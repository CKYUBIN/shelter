--느려서 성능은 담보하기 힘들 걸!!
create table T_H(
	id			INT primary key,
	hid			INT,
	name		varchar(255) not null
);

--조상부터 모든 후손
WITH RECURSIVE prevResult AS(
	SELEcT id, name
	  FROM T_H
	 WHERE id = 0

	UNION ALL
	
	SELECT 
		child.id, child.name
		FROM T_H child
		INNER JOIN prevResult
		ON prevResult.id = child.hid
)
SELECT *
FROM prevResult;

--나의 모든 조상 찾기
WITH RECURSIVE prevResult AS(
	SELEcT id, hid, name
	  FROM T_H
	 WHERE id = 4

	UNION ALL
	
	SELECT parent.id, parent.hid, parent.name
		FROM T_H parent
		INNER JOIN prevResult
		ON prevResult.hid = parent.id
)
SELECT *
FROM prevResult;
  
insert into T_H(id, hid, name)
 values(0, null, '하나님');
insert into T_H(id, hid, name)
 values(1, 0, '단군 아들'); 
insert into T_H(id, hid, name)
 values(2, 0, '단군 2nd 아들');
insert into T_H(id, hid, name)
 values(3, 2, '아빠');
insert into T_H(id, hid, name)
 values(4, 3, '나');
insert into T_H(id, hid, name)
 values(5, 4, '내 아들');

--'나'의 조상님들 다 찾아봐요
select me.*
  from T_H me
 where me.name = '나';
 
 select me.*, p1.*
  from T_H me, T_H p1 
 where me.name = '나'
   and me.hid = p1.id;
 
 select me.*, p1.*, p2.*
  from T_H me, T_H p1, T_H p2 
 where me.name = '나'
   and me.hid = p1.id
   and p1.hid = p2.id;

select me.*, p1.*, p2.*, p3.*
  from T_H me, T_H p1, T_H p2, T_H p3 
 where me.name = '나'
   and me.hid = p1.id
   and p1.hid = p2.id
   and p2.hid = p3.id;
   