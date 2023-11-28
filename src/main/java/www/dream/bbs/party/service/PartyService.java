package www.dream.bbs.party.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import www.dream.bbs.party.mapper.PartyMapper;
import www.dream.bbs.party.model.AccountabilityVO;
import www.dream.bbs.party.model.OrganizationVO;
import www.dream.bbs.party.model.PersonVO;

@Service
public class PartyService implements UserDetailsService {
	@Autowired
	private PartyMapper partyMapper;
	
	private PasswordEncoder pwdEnc = new BCryptPasswordEncoder();

	public List<PersonVO> listAllMember(String ownerId) {
		return partyMapper.listAllMember(ownerId);
	}

	public int createOrganization(OrganizationVO organization) {
		organization.encodePwd(pwdEnc);
		return partyMapper.createOrganization(organization);
	}

	public int createManager(OrganizationVO organization, PersonVO person) {
		person.encodePwd(pwdEnc);
		int cnt = partyMapper.createPerson(person);

		partyMapper.createAccountability(new AccountabilityVO("manager", organization.getId(), person.getId()));
		return cnt;
	}

	/** 회원 가입 */
	public int createMember(PersonVO person) {
		person.encodePwd(pwdEnc);
		int cnt = partyMapper.createPerson(person);

		partyMapper
				.createAccountability(new AccountabilityVO("member", person.getOrganization().getId(), person.getId()));
		return cnt;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return partyMapper.findByNick(username);
	}

	public boolean checkNick(String nick) {
		return partyMapper.isValidNick(nick);
	}
}
