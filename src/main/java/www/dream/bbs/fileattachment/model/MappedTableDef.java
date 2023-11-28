package www.dream.bbs.fileattachment.model;

import java.util.List;

import www.dream.bbs.fileattachment.model.dto.AttachFileDTO;

public interface MappedTableDef {
	public String getMappedTableName();
	public String getId();
	public List<AttachFileDTO> getListAttachFile();
}
