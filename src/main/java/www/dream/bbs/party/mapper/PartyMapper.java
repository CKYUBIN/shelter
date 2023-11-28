package www.dream.bbs.party.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.dream.bbs.party.model.AccountabilityVO;
import www.dream.bbs.party.model.OrganizationVO;
import www.dream.bbs.party.model.PartyVO;
import www.dream.bbs.party.model.PersonVO;


@Mapper		//Container에 담기도록 지정
public interface PartyMapper {
	//관리자 입장에서 회사의 발전성 보기 위하여 DAU - Daily active/new/out Member count
	//추세: 막대그래프
	//WAU, MAU
	
	//LRCUD 순서로 함수들을 배치하여 빠르게 따라갈(추적성) 수 있도록 합니다. 
	public List<PersonVO> listAllMember(String ownerId);
	
	public PartyVO findByNick(String nick);
	
	public boolean isValidNick(String nick);

	public int createOrganization(OrganizationVO organization);

	public int createPerson(PersonVO person);

	public int createAccountability(AccountabilityVO accountability);

	/** 회원 탈퇴 처리의 전략은?
	public int updateMember(PersonVO member);
	
	 * isActive !
	public int deactivateParty(PartyVO party);
	 * record delete 
	 */
}
