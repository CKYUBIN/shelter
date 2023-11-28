drop table T_I1;
drop table T_I2;
drop table T_I4;
create table T_I1(id varchar(4));
create table T_I2(id varchar(4));
create table T_I4(id varchar(4));

create table T_IDSEED(
	SEQ integer primary key,
	SEED char(4)
);






delete
FROM T_ID_SEED
where length(id) = 2;

INSERT INTO T_I4(id)
SELECT CONCAT(a.id, b.id)
FROM T_I2 a, T_I2 b
;

INSERT INTO T_IDSEED(SEED, SEQ)
	SELECT tid.id iid, @ROWNUM:=@ROWNUM+1 AS rowNum
		FROM T_I4 tid, (SELECT @ROWNUM:=0) AS R
		ORDER BY iid ASC;
		
select *
  from T_IDSEED
 where seq > 1600000;



 
 
INSERT INTO T_I1(id) VALUES ('a');
INSERT INTO T_I1(id) VALUES ('b');
INSERT INTO T_I1(id) VALUES ('c');
INSERT INTO T_I1(id) VALUES ('d');
INSERT INTO T_I1(id) VALUES ('e');
INSERT INTO T_I1(id) VALUES ('f');
INSERT INTO T_I1(id) VALUES ('g');
INSERT INTO T_I1(id) VALUES ('h');
INSERT INTO T_I1(id) VALUES ('i');
INSERT INTO T_I1(id) VALUES ('j');
INSERT INTO T_I1(id) VALUES ('k');
INSERT INTO T_I1(id) VALUES ('l');
INSERT INTO T_I1(id) VALUES ('m');
INSERT INTO T_I1(id) VALUES ('n');
INSERT INTO T_I1(id) VALUES ('o');
INSERT INTO T_I1(id) VALUES ('p');
INSERT INTO T_I1(id) VALUES ('q');
INSERT INTO T_I1(id) VALUES ('r');
INSERT INTO T_I1(id) VALUES ('s');
INSERT INTO T_I1(id) VALUES ('t');
INSERT INTO T_I1(id) VALUES ('u');
INSERT INTO T_I1(id) VALUES ('v');
INSERT INTO T_I1(id) VALUES ('w');
INSERT INTO T_I1(id) VALUES ('x');
INSERT INTO T_I1(id) VALUES ('y');
INSERT INTO T_I1(id) VALUES ('z');
INSERT INTO T_I1(id) VALUES ('0');
INSERT INTO T_I1(id) VALUES ('1');
INSERT INTO T_I1(id) VALUES ('2');
INSERT INTO T_I1(id) VALUES ('3');
INSERT INTO T_I1(id) VALUES ('4');
INSERT INTO T_I1(id) VALUES ('5');
INSERT INTO T_I1(id) VALUES ('6');
INSERT INTO T_I1(id) VALUES ('7');
INSERT INTO T_I1(id) VALUES ('8');
INSERT INTO T_I1(id) VALUES ('9');
