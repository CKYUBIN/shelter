package www.dream.bbs.fileattachment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import www.dream.bbs.fileattachment.model.dto.AttachFileDTO;

public interface AttachFileRepository extends JpaRepository<AttachFileDTO, String>{
	/** list up
	select *
	from t_attach
	where Owner_Type = #{ownerType}
	And Owner_Id = #{ownerId}
	 * */
	List<AttachFileDTO> findByOwnerTypeAndOwnerId(String ownerType, String ownerId);
	
	/** create 
	@Query(nativeQuery = true,
			value="insert into t_attach(owner_type, owner_id, uuid, path, name, type_ordinal) "
					+ "values(:obj.ownerType, :obj.ownerId, :obj.uuid, :obj.uploadPath, :obj.originalFilePureName, :obj.typeOrdinal)")
	int saveAttachFileDTO(@Param("obj") AttachFileDTO obj);
*/
	
	/** delete */
	/** delete all */
	int deleteAllByOwnerTypeAndOwnerId(String ownerType, String ownerId);
}
