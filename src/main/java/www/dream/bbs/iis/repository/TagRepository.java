package www.dream.bbs.iis.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import www.dream.bbs.iis.model.TagVO;

public interface TagRepository extends JpaRepository<TagVO, String>{
	@Query(value="select NEXT_PK(:idType)", nativeQuery = true)
	String getId(@Param("idType") String idType);
	
	//단어 목록을 기반으로 TagVO 목록 찾기
	@Query(nativeQuery = true, value="SELECT * from t_tag where word IN (:words)")
	List<TagVO> findByWord(@Param("words") Set<String> words);
}
