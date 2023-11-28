package www.dream.bbs.iis.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.dream.bbs.iis.model.TagRelVO;
import www.dream.bbs.iis.model.TagVO;
import www.dream.bbs.iis.repository.TagRelRepository;
import www.dream.bbs.iis.repository.TagRepository;

@Service
public class TagService {
	@Autowired
	private TagRepository tagRepository;
	@Autowired
	private TagRelRepository tagRelRepository;

	public List<TagVO> getAll() {
		return tagRepository.findAll();
	}
	
	public List<TagVO> findByWord(Set<String> keySet) {
		return tagRepository.findByWord(keySet);
	}

	public Optional<TagVO> getTag(String id) {
		return tagRepository.findById(id);
	}

	public String getId(String string) {
		return tagRepository.getId(string);
	}

	public TagVO createTag(TagVO tag) {
		tag.setId(tagRepository.getId("s_tag"));
		return tagRepository.save(tag);
	}

	public void saveAllTagVO(List<TagVO> listNewTags) {
		tagRepository.saveAll(listNewTags);
	}

	public void saveAllTagRelVO(List<TagRelVO> list) {
		tagRelRepository.saveAll(list);
	}

	public void deleteAllByPostId(String id) {
		tagRelRepository.deleteAllByPostId(id);
	}
}